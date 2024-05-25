<?php

$app->get('/get_datos_telepeaje_scf/{param}', function($param) use ($app) {
    $obj = json_decode(decodeurl($param));
    $controllerResult = get_datos_telepeaje_scf($obj);
    return $app->json($controllerResult);
});

function get_datos_telepeaje_scf($param){
    try{
        $result = new stdClass();
        $param_query = array();

        $db_query = new DB_Query(
			"select (select n_cuit from contribuyentes where id_contribuyente = v.id_contribuyente) cuit
			from contribuyentes_tributos v where d_objeto_hecho = :p_d_objeto_hecho and c_tributo = 170
			and trunc(sysdate) between f_vig_desde and nvl(nvl(f_vig_hasta, f_cese_provisorio),trunc(sysdate))"
		);

        $param_query = array(
			':p_d_objeto_hecho'=>$param->p_d_objeto_hecho
		);

        $row_query = $db_query->do_query($param_query);

        if (count($row_query) == 1){
            $result->cuit = $row_query[0]['CUIT'];
            $result->resultado = 'OK';
        }else{
            $result->resultado = 'NOOK';
            $result->error = 'El dominio seleccionado no existe o no se encuentra vigente para el tributo.';
        }

    }
    catch(Exception $e){
        $result->resultado = 'NOOK';
        $result->error = $e->getMessage();
    }

    return $result;
}

