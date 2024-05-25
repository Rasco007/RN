<?php

session_start();
$logon  = new oci_Logon();
$voConn= $logon->getCon();

$function = $_REQUEST['func'];

switch ($function){
    case 1:
        $id_contribuyente = htmlentities($_POST['id_contribuyente']);
        $c_tipo_imponible = htmlentities($_POST['c_tipo_imponible']);
        $c_tributo = htmlentities($_POST['c_tributo']);
        $d_objeto_hecho = htmlentities($_POST['d_objeto_hecho']);
        $n_posicion_fiscal = htmlentities($_POST['n_posicion_fiscal']);
        $f_actualizacion = htmlentities($_POST['f_actualizacion']);
        $i_diferencia = htmlentities($_POST['i_diferencia']);

        $sql = "    select o.id_obligacion, o.i_saldo, o.f_vto_pago,
                   round((select fun_calculo_interes_base (fun_convierte_a_numero(:v_i_diferencia), o.f_vto_pago, :v_f_actualizacion, 1)
                            from dual), 2) i_interes
              from obligaciones o
             where o.id_contribuyente = :v_id_contribuyente
                   and o.c_tipo_imponible = :v_c_tipo_imponible
                   and o.c_tributo = :v_c_tributo
                   and o.d_objeto_hecho = :v_d_objeto_hecho
                   and o.n_posicion_fiscal = :v_n_posicion_fiscal";
        //die($sql);
        $param_prc = array(':v_i_diferencia'=>$i_diferencia, ':v_f_actualizacion'=>$f_actualizacion, ':v_id_contribuyente'=>$id_contribuyente,
                           ':v_c_tipo_imponible'=>$c_tipo_imponible, ':v_c_tributo'=>$c_tributo, ':v_d_objeto_hecho'=>$d_objeto_hecho,
                           ':v_n_posicion_fiscal'=>$n_posicion_fiscal);
        $db_query = new DB_Query($sql);
        $row_query = $db_query->do_query($param_prc);
        if($row_query == null){
            $response->resultado = 'Error al recuperar datos de obligación';
            die(json_encode($response));
        }

        echo json_encode($row_query[0]);
        break;/* OBTENER DATOS DE LA OBLIGACIÓN CORRESPONDIENTE Y IMPORTE DE INTERES */
    case 2:
        $i_deuda_fiscal = htmlentities($_POST['i_deuda_fiscal']);
        $n_coef_index = htmlentities($_POST['n_coef_index']);
        $i_index = htmlentities($_POST['i_index']);
        $i_intereses = htmlentities($_POST['i_intereses']);
        $i_a_pagar = htmlentities($_POST['i_a_pagar']);
        $id_liq_detalle = htmlentities($_POST['id_liq_detalle']);
        $id_liquidacion = htmlentities($_POST['f_id_liquidacion']);
        $id_obligacion = htmlentities($_POST['f_id_obligacion']);
        $c_sector = htmlentities($_POST['c_sector']);
        $id_tasa = htmlentities($_POST['id_tasa']);
        $oper = htmlentities($_POST['oper']);

        $procedure = "  begin
                          pac_liq_deuda.prc_abm_liq_detalle(:v_oper, :v_id_liq_detalle, :v_id_liquidacion, :v_id_obligacion,
                                                            fun_convierte_a_numero(:v_i_deuda_fiscal), :v_n_coef_index, fun_convierte_a_numero(:v_i_index),
                                                            fun_convierte_a_numero(:v_i_intereses), fun_convierte_a_numero(:v_i_a_pagar),
                                                            :v_c_sector, :v_id_tasa, :p_error, :p_error_ora );
                        end;";
        $param_prc = array(':v_oper'=>$oper, ':v_id_liq_detalle'=>$id_liq_detalle, ':v_id_liquidacion'=>$id_liquidacion,
                           ':v_id_obligacion'=>$id_obligacion, ':v_i_deuda_fiscal'=>$i_deuda_fiscal, ':v_n_coef_index'=>$n_coef_index,
                           ':v_i_index'=>$i_index, ':v_i_intereses'=>$i_intereses, ':v_i_a_pagar'=>$i_a_pagar,
                           ':v_c_sector'=>$c_sector, ':v_id_tasa'=>$id_tasa, ':p_error'=>null, ':p_error_ora'=>null);
        //die(print_r($param_prc));
        $db_procedure = new DB_procedure($procedure);
        $response = $db_procedure->execute_query($param_prc);
        $p_error = str_replace(' <br /># ','',$response->resultado);

        $v_p_error = $param_prc[':p_errpr'];
        $v_p_error_ora = $param_prc[':p_error_ora'];

        if ($p_error != 'OK') {
            $respuesta->resultado ='ERROR: '.$p_error;
            $respuesta->info =('Error Nro:'.$p_error.'<br /> Detalle:'.$p_error_ora);
            oci_close($voConn);
            die(json_encode($respuesta));
        }

        ocicommit($voConn);
        $respuesta->resultado = 'OK';
        oci_close($voConn);
        echo(json_encode($respuesta));
        break;/* LLAMA A PROCEDIMIENTO PARA REALIZAR ABM DE LIQ_DETALLE */
    case 4:
        $id_liquidacion = htmlentities($_POST['id_liquidacion']);
        $param_prc = array(':id_liquidacion'=>$id_liquidacion);

        $db_sql = new DB_Query("SELECT COUNT(*) AS CONT
                                FROM LIQUIDACIONES
                                WHERE ID_LIQUIDACION=:id_liquidacion AND C_TIPO ='P'");
        $tipop = array_shift($db_sql->do_query($param_prc));


        if($tipop['CONT'] > 0){
            $sql = "select distinct
                       c.id_contribuyente, fun_formato_cuit (c.n_cuit) n_cuit,
                       fun_devuelve_domicilio (c.id_contribuyente) d_domicilio,
                       c.d_denominacion, tg.d_dato d_tipo_doc, c.n_documento, o.c_tipo_imponible,
                       o.c_tributo, o.d_objeto_hecho, lc.f_actualizacion,
                       lc.c_tipo
                  from liquidaciones lc
                       left join liquidaciones_det ld on lc.id_liquidacion = ld.id_liquidacion
                       left join obligaciones o on ld.id_obligacion = o.id_obligacion
                       left join contribuyentes c on o.id_contribuyente = c.id_contribuyente
                       left join tablas_generales tg on c.n_tabla_tipo_doc = tg.n_tabla and c.c_tipo_documento = tg.c_dato
                 where 1 = 1 
                 and lc.id_liquidacion = :id_liquidacion";
        }
        else{
            // Obtiene los datos del contribuyente
            $sql = "select distinct
                       c.id_contribuyente, fun_formato_cuit (c.n_cuit) n_cuit,
                       fun_devuelve_domicilio (c.id_contribuyente) d_domicilio,
                       c.d_denominacion, tg.d_dato d_tipo_doc, c.n_documento, lc.c_tipo_imponible,
                       lc.c_tributo, lc.d_objeto_hecho, lc.f_actualizacion, lc.c_tipo,
                       (SELECT tg.d_dato AS d_tipo_imponible
                       FROM tributos t
                            INNER JOIN tablas_generales tg
                               ON T.C_TIPO_IMPONIBLE = TG.C_DATO
                      WHERE     t.c_tipo_imponible = lc.c_tipo_imponible
                            AND t.c_tributo = lc.c_tributo
                            AND TG.N_TABLA = 3) as tributo, 
                       (SELECT t.d_descrip as d_tributo
                        FROM tributos t
                        INNER JOIN tablas_generales tg ON T.C_TIPO_IMPONIBLE = TG.C_DATO
                        WHERE     t.c_tipo_imponible = lc.c_tipo_imponible
                        AND t.c_tributo = lc.c_tributo
                        AND TG.N_TABLA = 3 )as subtributo,
                        lc.id_expediente as id_expediente 
                  from liquidaciones lc
                       left join liquidaciones_det ld on lc.id_liquidacion = ld.id_liquidacion
                       left join obligaciones o on ld.id_obligacion = o.id_obligacion
                       left join contribuyentes c on lc.id_contribuyente = c.id_contribuyente
                       left join tablas_generales tg on c.n_tabla_tipo_doc = tg.n_tabla and c.c_tipo_documento = tg.c_dato
                  where 1 = 1 
                  and lc.c_tipo in ('L','LS','I','IM','IL','BD') 
                  and lc.id_liquidacion = :id_liquidacion";
        }

        $db_query = new DB_Query($sql);
        $row_query = $db_query->do_query($param_prc);

        if($row_query == null){
            $response->resultado = 'Error al recuperar datos de cabecera';
            die(json_encode($response));
        }

        echo json_encode($row_query[0]);
        break;/* OBTENER DATOS DE CABECERA PARA EL DETALLE DE LA CONSUTA */
    case 5:
        $id_inspeccion = htmlentities($_POST['id_inspeccion']);

        $sql = "select listagg (pf.id_personal || ';' || pf.c_tipo_personal, '@') within group (order by pf.c_tipo_personal asc) as l_inspeccion
                  from inspecciones i
                       left join inspecciones_asignacion ia on i.id_inspeccion = ia.id_inspeccion
                       left join personal_fiscalizacion pf on ia.n_inspector = pf.id_personal
                 where i.id_inspeccion = :v_id_inspeccion and pf.c_tipo_personal in ('S', 'I')
                 order by pf.c_tipo_personal asc";
        //die($sql);
        $param_prc = array(':v_id_inspeccion'=>$id_inspeccion);
        $db_query = new DB_Query($sql);
        $row_query = $db_query->do_query($param_prc);
        if($row_query == null){
            $response->resultado = 'Error al recuperar datos';
            die(json_encode($response));
        }

        echo json_encode($row_query[0]);
        break;/* OBTENER DATOS DE INSPECCION (C_INSPECTOR y C_SUPERVISOR) */
    case 6:
        $id_contribuyente = htmlentities($_POST['id_contribuyente']);
        $c_tributo = htmlentities($_POST['c_tributo']);
        $c_tipo_imponible = htmlentities($_POST['c_tipo_imponible']);
        $d_objeto_echo = htmlentities($_POST['d_objeto_echo']);
        $n_pos_fiscal = htmlentities($_POST['n_pos_fiscal']);
        $n_cuota_anticipo = htmlentities($_POST['n_cuota_anticipo']);

        $sql = "select count (*) n_cant
                  from obligaciones o
                 where o.id_contribuyente = :v_id_contribuyente
                       and o.c_tipo_imponible = :v_c_tipo_imponible
                       and o.c_tributo = :v_c_tributo
                       and o.d_objeto_hecho = :v_d_objeto_echo
                       and o.n_posicion_fiscal = :v_n_pos_fiscal
                       and o.n_cuota_anticipo = nvl(:n_cuota_anticipo,0)";
        //die($sql);
        $param_prc = array(':v_id_contribuyente'=>$id_contribuyente, ':v_c_tipo_imponible'=>$c_tipo_imponible, ':v_c_tributo'=>$c_tributo,
                           ':v_d_objeto_echo'=>$d_objeto_echo, ':v_n_pos_fiscal'=>$n_pos_fiscal, ':n_cuota_anticipo'=>$n_cuota_anticipo);
        $db_query = new DB_Query($sql);
        $row_query = $db_query->do_query($param_prc);
        if($row_query == null){
            $response->resultado = 'Error al recuperar datos';
            die(json_encode($response));
        }

        echo json_encode($row_query[0]);
        break;/* VALIDAR DATOS DE OBLIGACION */
    case 7:
        $id_liquidacion = htmlentities($_POST['id_liquidacion']);

        $sql = "select nvl (max (lm.n_orden), 0) + 1 n_orden
                  from liq_det_multas lm
                 where lm.id_liquidacion = :v_id_liquidacion";
        //die($sql);
        $param_prc = array(':v_id_liquidacion'=>$id_liquidacion);
        $db_query = new DB_Query($sql);
        $row_query = $db_query->do_query($param_prc);
        if($row_query == null){
            $response->resultado = 'Error al recuperar datos de liquidación';
            die(json_encode($response));
        }

        echo json_encode($row_query[0]);
        break;/* OBTENER EL MAX. DE N_ORDEN PARA EL DET. DE MULTA 44 */
    case 8:
        $id_liquidacion = htmlentities($_POST['id_liquidacion']);

        $sql = "select nvl(lc.p_multa_45,0) p_multa_45,
                       nvl(lc.i_multa_45,0) i_multa_45,
                       nvl(lc.p_multa_46,0) p_multa_46,
                       nvl(lc.i_multa_46,0) i_multa_46,
                       nvl((sum (lm.i_multa) + sum (lm.n_reincidencia * lm.i_reincidencia)),0) i_multa_44
                  from liq_cab lc
                       left join liq_det_multas lm on lc.id_liquidacion = lm.id_liquidacion
                 where lc.id_liquidacion = :v_id_liquidacion
                 group by lc.p_multa_45, lc.i_multa_45, lc.p_multa_46, lc.i_multa_46";
        //die($sql);
        $param_prc = array(':v_id_liquidacion'=>$id_liquidacion);
        $db_query = new DB_Query($sql);
        $row_query = $db_query->do_query($param_prc);
        if($row_query == null){
            $response->resultado = 'Error al recuperar datos de multas';
            die(json_encode($response));
        }

        echo json_encode($row_query[0]);
        break;/* OBTENER DATOS DE MULTA */
    case 9:
        $i_deuda_fiscal = htmlentities($_POST['i_diferencia']);
        $n_coef_index = '0';
        $i_index = '0';
        $id_liq_detalle = htmlentities($_POST['id_liq_detalle']);
        $id_liquidacion = htmlentities($_POST['f_id_liquidacion']);
        $c_sector = htmlentities($_POST['c_sector']);
        $id_tasa = htmlentities($_POST['id_tasa']);
        $id_contribuyente = htmlentities($_POST['id_contribuyente']);
        $c_tipo_imponible = htmlentities($_POST['c_tipo_imponible']);
        $c_tributo = htmlentities($_POST['c_tributo']);
        $d_objeto_hecho = htmlentities($_POST['d_objeto_hecho']);
        $n_posicion_fiscal_desde = htmlentities($_POST['n_posicion_fiscal']);
        $f_actualizacion = htmlentities($_POST['f_actualizacion']);
        $n_cant = htmlentities($_POST['n_cant']);
        $oper = 'add';

        /*for para realizar n cantidad de veces el alta*/
        for ($i = 1; $i <= $n_cant; $i++) {
            $n_posicion_fiscal = ($n_posicion_fiscal_desde - 1) + $i;
            /*select para recuerar datos de la obligacion*/
            $sql = "select o.id_obligacion, o.i_saldo, o.f_vto_pago,
                           round((select fun_calculo_interes_base(fun_convierte_a_numero(:v_i_deuda_fiscal), o.f_vto_pago, :v_f_actualizacion, 1) from dual), 2) i_interes,
                           fun_convierte_a_numero(:v_i_deuda_fiscal) i_deuda_fiscal
                      from obligaciones o
                     where o.id_contribuyente = :v_id_contribuyente
                           and o.c_tipo_imponible = :v_c_tipo_imponible
                           and o.c_tributo = :v_c_tributo
                           and o.d_objeto_hecho = :v_d_objeto_hecho
                           and o.n_posicion_fiscal = :v_n_posicion_fiscal";
            //die($sql);
            $param_prc = array(':v_i_deuda_fiscal'=>$i_deuda_fiscal, ':v_f_actualizacion'=>$f_actualizacion,
                               ':v_id_contribuyente'=>$id_contribuyente, ':v_c_tipo_imponible'=>$c_tipo_imponible, ':v_c_tributo'=>$c_tributo,
                               ':v_d_objeto_hecho'=>$d_objeto_hecho, ':n_posicion_fiscal'=>$n_posicion_fiscal);
            $db_query = new DB_Query($sql);
            $row_query = $db_query->do_query($param_prc);
            if($row_query == null){
                $response->resultado = 'Error al recuperar datos de obligacion';
                die(json_encode($response));
            }
            $id_obligacion = $row_query[0][ID_OBLIGACION];
            $i_intereses = $row_query[0][I_INTERES];
            $i_a_pagar = $row_query[0][I_DEUDA_FISCAL] + $i_intereses;

            $procedure = "  begin
                              pac_liq_deuda.prc_abm_liq_detalle(:v_oper, :v_id_liq_detalle, :v_id_liquidacion, :v_id_obligacion,
                                                                fun_convierte_a_numero(:v_i_deuda_fiscal), :v_n_coef_index,
                                                                fun_convierte_a_numero(:v_i_index),(:v_i_intereses), (:v_i_a_pagar),
                                                                :v_c_sector, :v_id_tasa, :p_error,:p_error_ora);
                            end;";
            $param_prc = array(':v_oper'=>$oper, ':v_id_liq_detalle'=>$id_liq_detalle, ':v_id_liquidacion'=>$id_liquidacion,
                               ':v_id_obligacion'=>$id_obligacion, ':v_i_deuda_fiscal'=>$i_deuda_fiscal, ':v_n_coef_index'=>$n_coef_index,
                               ':v_i_index'=>$i_index, ':v_i_intereses'=>$i_intereses, ':v_i_a_pagar'=>$i_a_pagar,
                               ':v_c_sector'=>$c_sector, ':v_id_tasa'=>$id_tasa,  ':p_error'=>null, ':p_error_ora'=>null);
            //die(print_r($param_prc));
            $db_procedure = new DB_procedure($procedure);
            $response = $db_procedure->execute_query($param_prc);
            $p_error = str_replace(' <br /># ','',$response->resultado);

            $v_p_error = $param_prc[':p_errpr'];
            $v_p_error_ora = $param_prc[':p_error_ora'];

            if ($p_error != 'OK') {
                $respuesta->resultado ='ERROR';
                $respuesta->info =('Error Nro:'.$p_error.'<br /> Detalle:'.$p_error_ora);
                oci_close($voConn);
                die(json_encode($respuesta));
            }

            ocicommit($voConn);
        }

        $respuesta->resultado = 'OK';
        $respuesta->cant = $n_cant;

        oci_close($voConn);

        echo(json_encode($respuesta));
        break;
    case 10:
        $id_liquidacion = htmlentities($_POST['f_id_liquidacion']);
        $n_posicion_fiscal_desde = htmlentities($_POST['n_posicion_fiscal']);
        $n_tabla_tipo_inf = htmlentities($_POST['n_tabla_tipo_inf']);
        $c_tipo_infraccion = htmlentities($_POST['c_tipo_infraccion']);
        $i_multa = htmlentities($_POST['i_multa']);
        $n_reinc = htmlentities($_POST['n_reinc']);
        $i_reinc = htmlentities($_POST['i_reinc']);
        $n_cant = htmlentities($_POST['n_cant']);
        $oper = 'add';

        /*for para realizar n cantidad de veces el alta*/
        for ($i = 1; $i <= $n_cant; $i++) {
            $n_posicion_fiscal = ($n_posicion_fiscal_desde - 1) + $i;

            $procedure = "  begin
                              pac_liq_deuda.prc_abm_liq_det_multas(:v_oper, :v_id_liquidacion, :v_n_posicion_fiscal, :v_n_tabla_tipo_inf, :v_c_tipo_infraccion,
                                                                   fun_convierte_a_numero(:v_i_multa), :v_n_reinc, fun_convierte_a_numero(:v_i_reinc),
                                                                   :p_error, :p_error_ora);
                            end;";
            $param_prc = array(':v_oper'=>$oper, ':v_id_liquidacion'=>$id_liquidacion, ':v_n_posicion_fiscal'=>$n_posicion_fiscal,
                               ':v_n_tabla_tipo_inf'=>$n_tabla_tipo_inf, ':v_c_tipo_infraccion'=>$c_tipo_infraccion, ':v_i_multa'=>$i_multa,
                               ':v_n_reinc'=>$n_reinc, ':v_i_reinc'=>$i_reinc, ':p_error'=>null, ':p_error_ora'=>null);
            //die(print_r($param_prc));
            $db_procedure = new DB_procedure($procedure);
            $response = $db_procedure->execute_query($param_prc);
            $p_error = str_replace(' <br /># ','',$response->resultado);

            $v_p_error = $param_prc[':p_errpr'];
            $v_p_error_ora = $param_prc[':p_error_ora'];

            if ($p_error != 'OK') {
                $respuesta->resultado ='ERROR';
                $respuesta->info =('Error Nro:'.$p_error.'<br /> Detalle:'.$p_error_ora);
                oci_close($voConn);
                die(json_encode($respuesta));
            }

            ocicommit($voConn);
        }

        $respuesta->resultado = 'OK';
        $respuesta->cant = $n_cant;

        oci_close($voConn);

        echo(json_encode($respuesta));
        break;
    case 11:
        $id_liquidacion = htmlentities($_POST['id_liquidacion']);

        $sql = "select distinct lc.id_inspeccion, c.id_contribuyente, fun_formato_cuit (c.n_cuit) n_cuit, c.d_denominacion,
                       tg.d_dato d_tipo_doc, c.n_documento, lc.f_actualizacion, ins.n_expediente
                  from liq_cab lc
                       inner join liq_detalle ld on lc.id_liquidacion = ld.id_liquidacion
                       inner join contribuyentes c on lc.id_contribuyente = c.id_contribuyente
                       inner join tablas_generales tg on c.n_tabla_tipo_doc = tg.n_tabla and c.c_tipo_documento = tg.c_dato
                       left join inspecciones ins on lc.id_inspeccion = ins.id_inspeccion
                 where 1 = 1 and lc.c_tipo = 'L' and lc.id_liquidacion = :v_id_liquidacion";
        //die($sql);
        $param_prc = array(':v_id_liquidacion'=>$id_liquidacion);
        $db_query = new DB_Query($sql);
        $row_query = $db_query->do_query($param_prc);
        if($row_query == null){
            $response->resultado = 'Error al recuperar datos';
            die(json_encode($response));
        }

        echo json_encode($row_query[0]);
        break;/* OBTENER DATOS DE CABECERA PARA EL DETALLE DE LA CONSUTA */
    case 12:
        $id_liquidacion = htmlentities($_POST['id_liquidacion']);

        $sql = "select distinct lc.p_multa_45, lc.i_multa_45, lc.p_multa_46, lc.i_multa_46
                  from liq_cab lc
                 where 1 = 1 and lc.c_tipo = 'L' and lc.id_liquidacion = :v_id_liquidacion";
        //die($sql);
        $param_prc = array(':v_id_liquidacion'=>$id_liquidacion);
        $db_query = new DB_Query($sql);
        $row_query = $db_query->do_query($param_prc);
        if($row_query == null){
            $response->resultado = 'Error al recuperar datos de cabecera';
            die(json_encode($response));
        }

        echo json_encode($row_query[0]);
        break;/* OBTENER DATOS DE CABECERA PARA EL DETALLE DE LA CONSUTA */
    case 13:
        $id_liquidacion = htmlentities($_POST['id_liquidacion']);

        $sql = "select lc.id_inspeccion,
                       c.id_contribuyente,
                       fun_formato_cuit (c.n_cuit) n_cuit,
                       c.d_denominacion,
                       tg.d_dato d_tipo_doc,
                       c.n_documento,
                       lc.c_tipo_imponible,
                       lc.c_tributo,
                       lc.d_objeto_hecho,
                       lc.f_actualizacion,
                       ex.n_id_expediente,
                       nvl2(ex.n_numero,(ex.n_numero||'-'||ex.n_anio),null) as n_expediente,
                       ex.d_caratula,
                       lc.id_liq_base,
                       lc.c_concepto,
                       lc.c_dato_variable
                  from liq_cab lc
                       inner join contribuyentes c on lc.id_contribuyente = c.id_contribuyente
                       left join tablas_generales tg on c.n_tabla_tipo_doc = tg.n_tabla and c.c_tipo_documento = tg.c_dato
                       left join expedientes ex on lc.id_expediente = ex.n_id_expediente
                       left join inspecciones ins on (lc.id_inspeccion = ins.id_inspeccion or ins.n_id_expediente = ex.n_id_expediente)
                 where lc.c_tipo in ('L','LS','I','IM') and lc.id_liquidacion = :v_id_liquidacion";
        //die($sql);
        $param_prc = array(':v_id_liquidacion'=>$id_liquidacion);
        $db_query = new DB_Query($sql);
        $row_query = $db_query->do_query($param_prc);
        if($row_query == null){
            $response->resultado = 'Error al recuperar datos';
            die(json_encode($response));
        }

        echo json_encode($row_query[0]);
        break;
    case 14:

        $id_liquidacion = htmlentities($_POST['id_liquidacion']);
        $param_prc = array(':v_id_liquidacion'=>$id_liquidacion);

        $db_sql = new DB_Query("SELECT COUNT(*) AS CONT
                                FROM LIQ_CAB
                                WHERE ID_LIQUIDACION=:v_id_liquidacion AND
                                      C_TIPO ='P'");
        $tipop = array_shift($db_sql->do_query($param_prc));

        if($tipop['CONT'] > 0){
            $row_query = array('C_DIR' => 'cons_liq_deuda_det.php');
        }
        else{
            $sql = "select distinct
                       (case
                           when s.id_sello is not null then 'cons_liq_imp_sello.php'
                           when ld.id_liq_detalle is not null then 'cons_liq_deuda_det.php'
                           else 'cons_liq_deuda_det.php'
                        end) as c_dir
                  from liq_cab lc
                       left join liq_detalle ld on lc.id_liquidacion = ld.id_liquidacion
                       left join sellos s on lc.id_liquidacion = s.id_liquidacion
                 where 1 = 1 and lc.c_tipo in ('L','LS') and
                       lc.c_estado != 'CARGA' and
                       lc.id_liquidacion = :v_id_liquidacion";

            $db_query = new DB_Query($sql);
            $row_query = array_shift($db_query->do_query($param_prc));
            if($row_query == null){
                $response->resultado = 'Error al recuperar datos';
                die(json_encode($response));
            }
        }

        echo json_encode($row_query);
        break;
    case 15:
        try{
            $c_usuario = $_SESSION['usuario'];

            $sql = "select count(*) n_perfil
                      from usuarios_perfiles up, perfiles p
                     where up.c_usuario = :c_usuario
                           and up.id_perfil = p.id_perfil
                           and p.d_perfil = 'LIQUIDACION_TOTAL'";

            $param_prc = array(':c_usuario'=>$c_usuario);
            $db_query = new DB_Query($sql);
            $row_query = $db_query->do_query($param_prc);
            $n_perfil = $row_query[0][N_PERFIL];

            if($n_perfil == '1'){
                $respuesta->m_perfil = 'S';
            }else{
                $respuesta->m_perfil = 'N';
            }

            $respuesta->respuesta = 'OK';
            echo(json_encode($respuesta));
        }catch (Exception $e){
            $respuesta->respuesta = 'ERROR';
            $respuesta->advert = 'Se genero un error durante el proceso: </br>'.$e;
            die(json_encode($respuesta));
        }
        break;
    case 16:
        $c_tipo_imponible = htmlentities($_POST['c_tipo_imponible']);
        $c_tributo = htmlentities($_POST['c_tributo']);

        $sql= "select listagg (vw.d_dato, '@') within group (order by vw.d_dato asc) as l_descrip
                 from (select distinct initcap(d_dato2) as d_dato
                         from tablas_generales
                        where n_tabla = 983
                              and d_dato1 like '%;'||:c_tipo_imponible||:c_tributo||';%'
                              and rownum <= 1) vw
                order by vw.d_dato asc";
        $param_prc = array(':c_tipo_imponible'=>$c_tipo_imponible, ':c_tributo'=>$c_tributo);

        $db_query = new DB_Query($sql);
        $row_query = $db_query->do_query($param_prc);

        echo json_encode($row_query[0]);
        break;/* OBTENER DATOS VARIABLES CABECERA DEL TRIBUTO Y SUB-TRIBUTO */
    case 17:
        $c_tipo_imponible = htmlentities($_POST['c_tipo_imponible']);
        $c_tributo = htmlentities($_POST['c_tributo']);
        $c_desc = htmlentities($_POST['c_desc']);

        $sql= "select listagg (vw.c_dato||';'||vw.d_descrip, '@') within group (order by vw.d_descrip asc) as l_desc
                 from (select c_dato, initcap(d_dato) as d_descrip
                         from tablas_generales
                        where n_tabla = 983
                              and d_dato1 like '%;'||:c_tipo_imponible||:c_tributo||';%'
                              and upper(d_dato2) = upper(:c_desc)) vw
                order by vw.d_descrip asc";
        $param_prc = array(':c_tipo_imponible'=>$c_tipo_imponible, ':c_tributo'=>$c_tributo, ':c_desc'=>$c_desc);

        $db_query = new DB_Query($sql);
        $row_query = $db_query->do_query($param_prc);

        echo json_encode($row_query[0]);
        break;/* OBTENER DATOS VARIABLES DEL TRIBUTO Y SUB-TRIBUTO */
    case 18:
        $id_liquidacion = htmlentities($_POST['id_liquidacion']);

        $sql= " select distinct
                       lc.id_liquidacion,
                       nvl2(ex.n_numero,(ex.n_numero||'-'||ex.n_anio),null) as n_expediente,
                       fun_formato_cuit (c.n_cuit) n_cuit,
                       c.d_denominacion,
                       lc.c_tipo_imponible,
                       tg.d_dato as d_tipo_imponible,
                       lc.c_tributo,
                       t.d_descrip as d_tributo,
                       lc.d_objeto_hecho
                  from liq_cab lc
                       left join inspecciones ins on lc.id_inspeccion = ins.id_inspeccion
                       left join expedientes ex on lc.id_expediente = ex.n_id_expediente or ins.n_id_expediente = ex.n_id_expediente
                       inner join contribuyentes c on lc.id_contribuyente = c.id_contribuyente
                       inner join liq_detalle ld on lc.id_liquidacion = ld.id_liquidacion
                       inner join tablas_generales tg on tg.c_dato = lc.c_tipo_imponible
                       inner join tributos t on t.c_tipo_imponible = lc.c_tipo_imponible and t.c_tributo = lc.c_tributo
                 where lc.c_tipo = 'L'
                       and lc.c_estado = 'DDJJ'
                       and tg.n_tabla = 3
                       and lc.c_tipo_imponible not in ('5','6', '7', '10')
                       and lc.id_liquidacion = :id_liquidacion";
        
		$param_prc = array(':id_liquidacion'=>$id_liquidacion);
        $db_query = new DB_Query($sql);
        $row_query = $db_query->do_query($param_prc);

        echo json_encode($row_query[0]);
        break;/* SE RECUPERA DATOS DE CABECERA DE LA LIQUIDACION PASADA A LA CTA. CTE. */
    case 19:
        try{
            $id_expediente = $_POST['c_expediente'];

            $sql = "select spf.id_personal as c_supervisor, spf.d_denominacion as d_supervisor
                      from expedientes se, inspecciones si, personal_fiscalizacion spf, inspecciones_asignacion sia
                     where se.c_codigo = '3252'                           
						   /*and si.n_id_expediente = se.n_id_expediente*/
                           and ((si.n_expediente = se.n_numero and si.n_anio_expediente = se.n_anio) or si.n_id_expediente = se.n_id_expediente)
						   and sia.id_inspeccion = si.id_inspeccion
                           and spf.id_personal = sia.n_inspector
                           and sia.c_rol = 'S'
                           and spf.n_tabla_personal = 321
                           and se.n_id_expediente = :n_id_expediente";

            $param_prc = array(':n_id_expediente'=>$id_expediente);
            $db_query = new DB_Query($sql);
            $row_query = $db_query->do_query($param_prc);
            $c_supervisor = $row_query[0][C_SUPERVISOR];
            $d_supervisor = $row_query[0][D_SUPERVISOR];
            $respuesta->c_supervisor = $c_supervisor;
            $respuesta->d_supervisor = $d_supervisor;

            $sql = "select ipf.id_personal as c_inspector, ipf.d_denominacion as d_inspector
                      from expedientes ie, inspecciones ii, personal_fiscalizacion ipf, inspecciones_asignacion iia
                     where ie.c_codigo = '3252'
                           /*and ii.n_id_expediente = ie.n_id_expediente*/
                           and ((ii.n_expediente = ie.n_numero and ii.n_anio_expediente = ie.n_anio) or ii.n_id_expediente = ie.n_id_expediente)
                           and iia.id_inspeccion = ii.id_inspeccion
                           and ipf.id_personal = iia.n_inspector
                           and iia.c_rol = 'I'
                           and ipf.n_tabla_personal = 321
                           and ie.n_id_expediente = :n_id_expediente";

            $param_prc = array(':n_id_expediente'=>$id_expediente);
            $db_query = new DB_Query($sql);
            $row_query = $db_query->do_query($param_prc);
            $c_inspector = $row_query[0][C_INSPECTOR];
            $d_inspector = $row_query[0][D_INSPECTOR];
            $respuesta->c_inspector = $c_inspector;
            $respuesta->d_inspector = $d_inspector;

            $respuesta->respuesta = 'OK';
            echo(json_encode($respuesta));
        }catch (Exception $e){
            $respuesta->respuesta = 'ERROR';
            $respuesta->advert = 'Se genero un error durante el proceso: </br>'.$e;
            die(json_encode($respuesta));
        }
        break;/* RECUPERAR DATOS DE SUPERVISOR Y INSPECTOR */
    case 20:
        try{
            $sql = "select c_dato as c_codigo, d_dato2 as d_descrip
                      from tablas_generales
                     where n_tabla = 307
                           and d_dato2 is not null
                           and c_dato not in ('CARGA')
                     order by d_dato2 asc";

            $db_query = new DB_Query($sql);
            $row_query = $db_query->do_query();

            echo(json_encode($row_query));
        }catch (Exception $e){
            $respuesta->respuesta = 'ERROR';
            $respuesta->advert = 'Se genero un error durante el proceso: </br>'.$e;
            die(json_encode($respuesta));
        }
        break; //SE RECUPERA LISTADO DE "ESTADOS DE LIQUIDACIONES"
    case 21:
        try{
            $v_id_liquidacion = $_POST['p_id_liquidacion'];

            $sql = "select lc.id_liquidacion, 
                           (select tg.d_dato from tablas_generales tg 
                             where tg.n_tabla = lc.n_tabla_dato_variable and tg.c_dato = lc.c_dato_variable) d_dato_variable,      
                           (select tg.d_dato2 from tablas_generales tg 
                             where tg.n_tabla = lc.n_tabla_estado and tg.c_dato = lc.c_estado) d_estado, 
                           lc.d_observ, lc.c_usuarioalt, lc.c_usuario_cancelacion, lc.id_liq_base
                      from liq_cab lc
                     where lc.id_liquidacion = :p_id_liquidacion
                           and lc.c_tipo in ('L','LS')";
            $db_query = new DB_Query($sql);
            $parametros = array(':p_id_liquidacion' => $v_id_liquidacion);
            $row_query = $db_query->do_query($parametros);

            $v_id_liquidacion = $row_query[0]['ID_LIQUIDACION'];
            $v_d_dato_variable = $row_query[0]['D_DATO_VARIABLE'];
            $v_d_estado = $row_query[0]['D_ESTADO'];
            $v_d_observ = $row_query[0]['D_OBSERV'];
            $v_c_usuarioalt = $row_query[0]['C_USUARIOALT'];
            $v_c_usuario_cancelacion = $row_query[0]['C_USUARIO_CANCELACION'];
            $v_id_liq_base = $row_query[0]['ID_LIQ_BASE'];

            $respuesta->p_id_liquidacion = $v_id_liquidacion;
            $respuesta->p_d_dato_variable = $v_d_dato_variable;
            $respuesta->p_d_estado = $v_d_estado;
            $respuesta->p_d_observ = $v_d_observ;
            $respuesta->p_c_usuarioalt = $v_c_usuarioalt;
            $respuesta->p_c_usuario_cancelacion = $v_c_usuario_cancelacion;
            $respuesta->p_id_liq_base = $v_id_liq_base;
            $respuesta->respuesta = 'OK';
            echo(json_encode($respuesta));
        }catch (Exception $e){
            $respuesta->respuesta = 'ERROR';
            $respuesta->advert = 'Se genero un error durante la recuperación de datos de liquidación: </br>'.$e;
            die(json_encode($respuesta));
        }
        break;//SE RECUPERA DATOS DE CABECERA DE LIQUIDACION PARA MODULO DE CONSULTA
}

?>