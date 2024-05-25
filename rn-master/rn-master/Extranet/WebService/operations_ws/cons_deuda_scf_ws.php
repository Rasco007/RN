<?php

$app->get('/get_contribuyente_scf/{param}', function($param) use ($app) {
    $obj = json_decode(decodeurl($param));
    $controllerResult = get_contribuyente_scf($obj);
    return $app->json($controllerResult);
});

$app->get('/get_autocomplete_scf/{param}', function($param) use ($app) {
    $obj = json_decode(decodeurl($param));
    $controllerResult = get_autocomplete_scf($obj);
    return $app->json($controllerResult);
});

$app->get('/get_deuda_scf/{param}', function($param) use ($app) {
    $obj = json_decode(decodeurl($param));
    $controllerResult = get_deuda_scf($obj);
    return $app->json($controllerResult);
});

$app->get('/actualizar_deuda_scf/{param}', function($param) use ($app) {
    $obj = json_decode(decodeurl($param));
    $controllerResult = actualizar_deuda_scf($obj);
    return $app->json($controllerResult);
});

$app->get('/emitir_boleta_scf/{param}', function($param) use ($app) {
    $obj = json_decode(decodeurl($param));
    $controllerResult = emitir_boleta_scf($obj);
    return $app->json($controllerResult);
});

function get_contribuyente_scf($param){
    try{
        $result = new stdClass();
        $param_query= array();

        $db_query = new DB_Query(
			"select  id_contribuyente, fun_formato_cuit (n_cuit) as cuit, d_denominacion as denominacion
			from contribuyentes where n_cuit = :p_n_cuit"
		);

        $param_query = array(':p_n_cuit'=>$param->p_n_cuit);

        $row_query = $db_query->do_query($param_query);

        if (count($row_query) > 0){
            $result->contribuyente = $row_query;
            $result->resultado = 'OK';
        }else{
            $result->resultado = 'NOOK';
            $result->error = 'El CUIT ingresado no es válido.';
        }
    }
    catch(Exception $e){
        $result->resultado = 'NOOK';
        $result->error = $e->getMessage();
    }

    return $result;
}

function get_autocomplete_scf($param){
    try{
        $result = new stdClass();
        $param_query= array();

        $db_query = new DB_Query(
			"select  id_contribuyente, fun_formato_cuit (n_cuit) as cuit, d_denominacion as denominacion from contribuyentes
			where substr (fun_transformar_cadena (d_denominacion), 1, 200) like fun_transformar_cadena ('%' || :filtro || '%') and rownum <= 5"
		);

        $param_query = array(':filtro'=>$param->filtro);

        $row_query = $db_query->do_query($param_query);

        for ($i=0; $i < count($row_query); $i++)
        {
            $options['data_contrib'][] = array(
                'label' => $row_query[$i]['CUIT'].' - '.$row_query[$i]['DENOMINACION'],
                'razon_social' => $row_query[$i]['DENOMINACION'],
                'cuit' => $row_query[$i]['CUIT'],
                'id_contribuyente' => $row_query[$i]['ID_CONTRIBUYENTE']
            );
        }

        $result = $options;
    }
    catch(Exception $e){
        $result->resultado = 'NOOK';
        $result->error = $e->getMessage();
    }

    return $result;
}

function get_deuda_scf($param){
    try{
        $result = new stdClass();
        require_once(APLICACIONES.'cons_deuda/php/funciones.php');

        $data = get_sesion_deuda($param->p_d_objeto_hecho, $param->p_c_tributo, $param->p_n_cuit);
        
        if($data->resultado != 'OK'){
           $result = $data;
        }else{
           
            $data_actualizada = actualiza_deuda($data->info[0]['IDSESSION'],$param->p_f_actualizacion);
            $data_actualizada->mensaje = $data->mensaje;
            // print_r($data_actualizada);
             $result = $data_actualizada;    
        }   
    }
    
    catch(Exception $e){
        $result->resultado = 'NOOK';
        $result->error = $e->getMessage();
    }

    return $result;
}

function actualizar_deuda_scf($param){
    try{
        require_once(APLICACIONES.'cons_deuda/php/funciones.php');
        $result = actualiza_deuda($param->p_id_sesion,$param->p_f_actualizacion);
    }
    
    catch(Exception $e){
        $result->resultado = 'NOOK';
        $result->error = $e->getMessage();
    }

    return $result;
}

function emitir_boleta_scf($param){
    try{
        require_once(APLICACIONES.'cons_deuda/php/funciones.php');
        $respuesta = get_id_boleta($param->p_id_sesion, $param->p_c_tributo, $param->p_f_actualizacion, $param->p_filas);
    }
    catch(Exception $e){
        $result->resultado = 'NOOK';
        $result->error = $e->getMessage();
    }

    return ($respuesta);
}

