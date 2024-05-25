<?php
$app->get('/get_boleta_mail_scf/{param}', function($param) use ($app) {
    $obj = json_decode(decodeurl($param));
    $controllerResult = fun_get_boleta_mail_scf($obj);
    return $app->json($controllerResult);
});

$app->get('/get_boletas_mail_scf/{param}', function($param) use ($app) {
    $obj = json_decode(decodeurl($param));
    $controllerResult = fun_get_boletas_mail_scf($obj);
    return $app->json($controllerResult);
});

$app->get('/update_descarga/{param}', function($param) use ($app) {
    $obj = json_decode(decodeurl($param));
    $controllerResult = fun_update_descarga($obj);
    return $app->json($controllerResult);
});

function fun_get_boleta_mail_scf($param){
    // imprimo la boleta
    $result = new stdClass();
    $procedure = "PAC_FUN_ARRAY.fun_datos_boleta(:p_id_boleta_crypt,:p_id_contrib_crypt)";

    $parametros = array(':p_id_boleta_crypt'=>$param->p_id_boleta,':p_id_contrib_crypt'=>null);
    
    $data = getArrayResult($procedure, $parametros);
    
    if ($data->resultado == 'OK'){
        if (count($data->datos) > 0){
            $v_id_sesion = $data->datos[0]["ID_SESION"];
            $v_n_orden = $data->datos[0]["N_ORDEN"];
            $v_id_boleta = $data->datos[0]["ID_BOLETA"];
            $v_nro_envio = $data->datos[0]["NRO_ENVIO"];
            $v_m_imprimir = $data->datos[0]["M_IMPRIMIR"];
            $v_btn_imprimir = $data->datos[0]["BTN_IMPRIMIR"];

            if($v_m_imprimir == 'SI'){
                $url = get_url_report('BOLETA_CANON','c_usuario|&id_sesion|'.$v_id_sesion.'&n_orden_desde|'.$v_n_orden.'&n_orden_hasta|'.$v_n_orden.'&m_todas|N&m_todas_sin_mail|N&c_organismo|&c_region|&c_area|', $_SERVER["HTTP_HOST"],'PDF', null);

                $result->resultado = 'OK';
                $result->id_sesion = $v_id_sesion;
                $result->n_orden = $v_n_orden;
                $result->id_boleta = $v_id_boleta;
                $result->nro_envio = $v_nro_envio;

            }else{
                $result->resultado = 'NOOK';
                $result->m_imprimir = $v_m_imprimir;
                $result->btn_imprimir = $v_btn_imprimir;
            }
        }else{
            $result->resultado = 'NOOK';
            $result->error = 'Los datos ingresados son invalidos.';
        }
    } else {
        $result->error = 'Los datos ingresados son invalidos.';
    }

    return $result;
}

function fun_get_boletas_mail_scf($param){
    $result = new stdClass();
    $procedure = "PAC_FUN_ARRAY.fun_datos_boleta(:p_id_boleta_crypt,:p_id_contrib_crypt)";

    $parametros = array(':p_id_boleta_crypt'=>null,':p_id_contrib_crypt'=>$param->p_id_contrib);
    
    $data = getArrayResult($procedure, $parametros);
    
    if ($data->resultado == 'OK'){
        $cant_filas = count($data->datos);
        if ($cant_filas > 0){
            $result->resultado = 'OK';
            for($i=0; $i < $cant_filas; $i++){
                $grid[$i]->id_sesion = $data->datos[$i]['ID_SESION'];
                $grid[$i]->n_orden = $data->datos[$i]['N_ORDEN'];
                $grid[$i]->id_boleta = $data->datos[$i]['ID_BOLETA'];
                $grid[$i]->n_partida = $data->datos[$i]['D_OBJETO_HECHO'];
                $grid[$i]->d_nomenclatura = $data->datos[$i]['D_NOMENCLATURA'];
                $grid[$i]->n_regante = $data->datos[$i]['N_REGANTE'];
                $grid[$i]->f_vto_1 = $data->datos[$i]['F_VTO_1'];
                $grid[$i]->i_vto_1 = $data->datos[$i]['I_VTO_1'];
                $grid[$i]->f_vto_2 = $data->datos[$i]['F_VTO_2'];
                $grid[$i]->i_vto_2 = $data->datos[$i]['I_VTO_2'];
                $grid[$i]->btn_imprimir = $data->datos[$i]['BTN_IMPRIMIR'];
                $grid[$i]->nro_envio = $data->datos[$i]['NRO_ENVIO'];
            }
            $result->grid = $grid;
        }else{
            $result->resultado = 'NOOK';
            $result->error = 'Los datos ingresados son invalidos.';
        }

    } else {
        $result->resultado = 'NOOK';
        $result->error = 'Los datos ingresados son invalidos.';
    }

    return $result;
}

function fun_update_descarga($param){
    $result = new stdClass();
    $sql =
        "BEGIN 
            SIAT.PKG_BOLETA_PDF.inc_descarga(
                :p_id_boleta,
                :p_nro_envio
                );
        END;";

    $param_prc = array(
        ':p_id_boleta' => $param->p_id_boleta,
        ':p_nro_envio' => $param->p_nro_envio
    );

    $db_procedure = new DB_Procedure($sql);
    $db_procedure->setQuery($sql);
    $results = $db_procedure->execute_query($param_prc);
    $db_procedure->db_commit();
    $result->resultado = 'OK';

    return $result;
}

?>