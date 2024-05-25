<?php

if($_POST['func']=='validar_cumplimentado'){
    $c_tipo_plan_pago = htmlentities($_POST['c_tipo_plan_pago']);
    $n_plan_pago = htmlentities($_POST['n_plan_pago']);

    $parametros = array(':c_tipo_plan_pago'=>$c_tipo_plan_pago,':n_plan_pago'=>$n_plan_pago);
    $db_query = new DB_Query("SELECT C_CADUCIDAD, N_TABLA_TIPO_CAD FROM PLANES_DE_PAGO
                              WHERE N_PLAN_PAGO = :n_plan_pago
                              AND C_TIPO_PLAN_PAGO = :c_tipo_plan_pago");

    $ret = array_shift($db_query->do_query($parametros));
    if($ret['N_TABLA_TIPO_CAD']=='39' && $ret['C_CADUCIDAD']=='10'){
        $result->resultado='CUMPLIMENTADO';
        $result->mensaje='<p>El Plan esta Cumplimentado.</p><p>¿Esta seguro que desea continuar?</p>';
    }
    else{
        $result->resultado='OK';
    }
}

if($_POST['func']=='validar_cuotas_list'){
    //die();
    $parametros = array(
        ':tipo_plan'=>htmlentities($_POST['c_tipo_plan_pago']),
        ':n_plan'=>htmlentities($_POST['n_plan_pago'])
    );

    /*** --------------------------------------------------------------- **/
    /*** VERIFICACION DE OBLIGACION ANUAL NO ESTE JUNTO A LAS MENSUALES ***/
    /*** --------------------------------------------------------------- **/
    $db_query = new DB_Query("SELECT C_TIPO_IMPONIBLE, C_TRIBUTO, D_OBJETO_HECHO, N_POSICION_FISCAL,
                              SUBSTR(N_POSICION_FISCAL, 5, 2) AS MES FROM OBLIGACIONES
                              WHERE ID_OBLIGACION IN (
                                SELECT ID_OBLIGACION FROM PLANES_DE_PAGO_DETALLE
                                    WHERE N_PLAN_PAGO = :n_plan
                                    AND C_TIPO_PLAN_PAGO = :tipo_plan
                                    AND TMP_CHECK4UPDT = 1
                              ) AND (C_TIPO_IMPONIBLE = '5' OR C_TIPO_IMPONIBLE='10') AND (C_TRIBUTO = '60' OR C_TRIBUTO='1')");

    $ret = $db_query->do_query($parametros);
    $inmo_auto = count($ret);
    $contador = 0; $mes = 0;
    if($inmo_auto > 1){ /** VERIFICAMOS QUE EL PLAN DE PAGOS SEA INMOBILIARIO Y/O AUTOMOTORES*/
        foreach($ret as $r){
            if($r['MES']=='00'){
                $mes = $mes + 0;
                $v_pos_fiscal = ($r['N_POSICION_FISCAL']*1)+1;
                $param = array(
                    ':v_tipo_imponible'=>$r['C_TIPO_IMPONIBLE'],
                    ':v_tributo'=>$r['C_TRIBUTO'],
                    ':v_objeto_hecho'=>$r['D_OBJETO_HECHO'],
                    ':v_pos'=>$v_pos_fiscal
                );
                $db_qry = new DB_Query("SELECT COUNT(ID_OBLIGACION) AS V_SUMA_POS
                                        FROM OBLIGACIONES
                                        WHERE C_TIPO_IMPONIBLE=:v_tipo_imponible AND
                                      C_TRIBUTO = :v_tributo AND
                                      D_OBJETO_HECHO = :v_objeto_hecho AND
                                      N_POSICION_FISCAL = :v_pos");
                $reto = array_shift($db_qry->do_query($param));
                if($reto['V_SUMA_POS'] == '0'){
                    $contador = $contador + 0;
                }
                else{
                    $contador = $contador + 1;
                }
            }
            else{
                $mes = $mes + 1;
            }
        }

        if($mes > 0){
            $result->resultado='OK';
            $msg = '';
        }
        else{
            if($contador==0){
                $result->resultado = 'INFO';
                $result->mensaje = 'Verifique si no es necesario reliquidar el impuesto para generar las cuotas mensuales y distribuir lo pagado sobre estas cuotas.';
            }
            else{
                $result->resultado='OK';
                $msg = '';
            }
        }
    }
    /**** validamos que no desasocie todas las cuotas */

    $db_resto = new DB_Query("SELECT COUNT(ID_OBLIGACION) AS RESTO FROM PLANES_DE_PAGO_DETALLE ppd
                    WHERE PPD.C_TIPO_PLAN_PAGO = :TIPO_PLAN
                    AND PPD.N_PLAN_PAGO = :N_PLAN
                    AND TMP_CHECK4UPDT = 0 AND M_DESASOCIADO='N'");
    $diferencia = array_shift($db_resto->do_query($parametros));

    //die(print_r($diferencia));

    if($diferencia['RESTO']==0){ //ha querido eliminar todas las obligaciones
        $result->resultado = 'NO_OK';
        $result->mensaje = '<p>No se pueden eliminar todas las obligaciones del Plan de Pagos.</p>
                            <p>Deberia Cancelar el Plan de Pagos.</p>';
    }
    else{
        /*** verificacion de multas rg 33 no deben quedar solo multas debe quedar por
         *   lo menos una obligacion que no sea multa **/
        $db_multa = new DB_Query("SELECT COUNT(*) AS SUMA FROM (
            SELECT ID_OBLIGACION FROM PLANES_DE_PAGO_DETALLE PD
            WHERE N_PLAN_PAGO=:n_plan AND
                  C_TIPO_PLAN_PAGO=:tipo_plan AND
                  C_CONCEPTO_MOV <> 935 AND
                  M_DESASOCIADO <> 'S'
            MINUS
            SELECT ID_OBLIGACION FROM PLANES_DE_PAGO_DETALLE
                WHERE N_PLAN_PAGO = :n_plan
                AND C_TIPO_PLAN_PAGO = :tipo_plan
                AND TMP_CHECK4UPDT = 1)");
        $mult_val = array_shift($db_multa->do_query($parametros));
        if($mult_val['SUMA'] > 0){
            /** HAY POR LO MENOS UNA OBLIGACION NORMAL SIN DESASOCIAR */
            $result->resultado = 'OK';
        }
        else{
            /** NO HAY OBLIGACIONES NORMALES RESTANTES -> ERROR */
            $result->resultado = 'NO_OK';
            $result->mensaje = '<p>No se puede dejar como deuda unicamente a una Multa RG-33.</p>';
        }
    }
    /*** fin */
}

/* GUSTAVO */

if($_POST['func']=='validar_cuotas'){
    $parametros = array(':p_id_obligacion'=>$_POST['id_obligacion'],
                        ':n_plan_pago'=>$_POST['n_plan_pago'],
                        ':c_tipo_plan'=>$_POST['c_tipo_plan']);
    /*** verificacion de multa rg 33 no debe quedar como ultima obligacion */
    $db_multas = new DB_Query("SELECT COUNT(*) AS SUMA FROM PLANES_DE_PAGO_DETALLE PPD
                               WHERE PPD.C_TIPO_PLAN_PAGO = :c_tipo_plan AND
                                  PPD.N_PLAN_PAGO = :n_plan_pago AND
                                  PPD.ID_OBLIGACION = :p_id_obligacion AND
                                  PPD.C_CONCEPTO_MOV = 935");
    $mult_val = array_shift($db_multas->do_query($parametros));
    if($mult_val['SUMA'] == 0){
        $db_query = new DB_Query("SELECT C_TIPO_IMPONIBLE, C_TRIBUTO, D_OBJETO_HECHO, N_POSICION_FISCAL,
                              SUBSTR(N_POSICION_FISCAL, 5, 2) AS MES
                              FROM OBLIGACIONES WHERE ID_OBLIGACION = :p_id_obligacion AND
                              (C_TIPO_IMPONIBLE = '5' OR C_TIPO_IMPONIBLE='10') AND
                              (C_TRIBUTO = '60' OR C_TRIBUTO='1')");
        $ret = array_shift($db_query->do_query($parametros));

        if($ret['MES']=='00'){
            $v_pos_fiscal = ($ret['N_POSICION_FISCAL']*1)+1;
            $param = array(
                ':v_tipo_imponible'=>$ret['C_TIPO_IMPONIBLE'],
                ':v_tributo'=>$ret['C_TRIBUTO'],
                ':v_objeto_hecho'=>$ret['D_OBJETO_HECHO'],
                ':v_pos'=>$v_pos_fiscal
            );
            $db_qry = new DB_Query("SELECT COUNT(ID_OBLIGACION) AS V_SUMA_POS
                                    FROM OBLIGACIONES
                                    WHERE C_TIPO_IMPONIBLE=:v_tipo_imponible AND
                                  C_TRIBUTO = :v_tributo AND
                                  D_OBJETO_HECHO = :v_objeto_hecho AND
                                  N_POSICION_FISCAL = :v_pos");
            $reto = array_shift($db_qry->do_query($param));
            if($reto['V_SUMA_POS'] == '0'){
                $result->resultado = 'INFO';
                $result->mensaje = 'Verifique si no es necesario reliquidar el impuesto para generar las cuotas mensuales y distribuir lo pagadosobre estas cuotas.';
            }
            else{
                $result->resultado='OK';
                $msg = '';
            }
        }
        else{
            $result->resultado='OK';
        }
    }
    else{
        $result->resultado='NOOK';
        $result->mensaje = 'No puede desasociarse una multa RG 33/2015.';
    }
}

if($_POST['func']=='actualizar_check'){
    $tipo_plan = htmlentities($_POST['p_tipo_plan_pago']);
    $num_plan = htmlentities($_POST['p_plan_pago']);
    $valor = htmlentities($_POST['oper']);
    $id_obligacion = htmlentities($_POST['p_id_oblig']);
    if($tipo_plan=='' || $num_plan == '' || $tipo_plan==null || $num_plan == null){
        $result->resultado = 'NO_OK';
        $result->mensaje = '<p>Ha ocurrido un error con el Plan de Pago</p><p>Intentelo nuevamente.</p>';
    }
    else{
        $db_query = new DB_Query("BEGIN
                UPDATE PLANES_DE_PAGO_DETALLE SET TMP_CHECK4UPDT = :valor
                    WHERE C_TIPO_PLAN_PAGO=:tipo_plan
                    AND N_PLAN_PAGO=:num_plan
                    AND ID_OBLIGACION=:id_oblig;
                COMMIT;
            END;");
        $par = array(':tipo_plan' => $tipo_plan,
                     ':num_plan' => $num_plan,
                     ':valor'=> $valor,
                     ':id_oblig'=> $id_obligacion);
        $row_query = $db_query->do_query($par);
        $result->resultado = 'OK';
        $result->mensaje = '';
    }
}

if($_POST['func']=='actualizar_checks_all'){
    $tipo_plan = htmlentities($_POST['p_tipo_plan_pago']);
    $num_plan = htmlentities($_POST['p_plan_pago']);
    $valor = htmlentities($_POST['oper']);
    if($tipo_plan=='' || $num_plan == '' || $tipo_plan==null || $num_plan == null){
        $result->resultado = 'NO_OK';
        $result->mensaje = '<p>Ha ocurrido un error con el Plan de Pago</p><p>Intentelo nuevamente.</p>';
    }
    else{
        $db_query = new DB_Query("BEGIN
                UPDATE PLANES_DE_PAGO_DETALLE SET TMP_CHECK4UPDT = :valor
                    WHERE C_TIPO_PLAN_PAGO=:tipo_plan AND N_PLAN_PAGO=:num_plan;
                COMMIT;
            END;");
        $par = array(':tipo_plan' => $tipo_plan, ':num_plan' => $num_plan, ':valor'=> $valor);
        $row_query = $db_query->do_query($par);
        $result->resultado = 'OK';
        $result->mensaje = '';
    }
}

if($_POST['func']=='verificar_marca_cad'){
    $tipo_impo = htmlentities($_POST['pc_tipo_imponible']);
    $trib = htmlentities($_POST['pc_tributo']);
    $contrib = htmlentities($_POST['p_id_contribuyente']);
    $objeto = htmlentities($_POST['pd_objeto_hecho']);
    $sql = "SELECT COUNT(*) AS OBLIGS_MARCADAS
              FROM ( SELECT FUN_VALIDA_OBL(ID_OBLIGACION, 'P', 'NODJ') AS ESTADO
                  FROM OBLIGACIONES O
                    WHERE  O.C_TIPO_IMPONIBLE = :tipo_impo
                        AND O.C_TRIBUTO = :tributo
                        AND O.ID_CONTRIBUYENTE = :contrib
                        AND O.D_OBJETO_HECHO = NVL(:objeto, o.d_objeto_hecho)
                        AND O.I_SALDO < DEVUELVE_TOLERANCIA(O.ID_OBLIGACION)
                ) V
                WHERE V.ESTADO != 'V'";
    $db_query = new DB_Query($sql);
    $par = array(':tipo_impo' => $tipo_impo,
        ':tributo' => $trib,
        ':contrib'=> $contrib,
        ':objeto' => $objeto);
    $row_query = array_shift($db_query->do_query($par));
    if($row_query['OBLIGS_MARCADAS'] > 0){
        $result->resultado = 'OK';
    }
    else{
        $result->resultado = 'NOOK';
    }
}

/* GUSTAVO */
echo json_encode($result);

?>