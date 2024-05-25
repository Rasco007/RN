<?php
$app->get('/get_lista_infracciones_scf/{param}', function($param) use ($app) {
    $obj = json_decode(decodeurl($param));
    $controllerResult = get_lista_infracciones_scf($obj);
    return $app->json($controllerResult);
});

$app->get('/get_dias_habiles_scf/{param}', function($param) use ($app) {
    $obj = json_decode(decodeurl($param));
    $controllerResult = get_dias_habiles_scf($obj);
    return $app->json($controllerResult);
});

function get_lista_infracciones_scf($param){
    try{
        $result = new stdClass();
        $param_query= array();

        $db_query = new DB_Query("select id_infraccion, d_infraccion, d_articulo from PARAM_INFRACCIONES");

        $row_query = $db_query->do_query($param_query);

        $result->infracciones = $row_query;
        $result->resultado = 'OK';

    }
    catch(Exception $e){
        $result->resultado = 'NOOK';
        $result->error = $e->getMessage();
    }

    return $result;
}

function get_dias_habiles_scf($param){
    try{
        $result = new stdClass();
        if ($param->modo === 'disabledDays'){
            $parametros = array(':anio' => date("Y"));

            $query = new DB_Query(
                "select f.f_feriado as feriado from feriados f where extract(year from f.f_feriado) >= :anio"
            );

            $query_result = $query->do_query($parametros);

            if(!$query_result){
                $result->resultado = 'NOOK';
            }else{
                $cant_filas = count($query_result);

                $array_feriados = array();

                for($i=0; $i<$cant_filas;$i++){
                    $array_feriados[$i] = $query_result[$i]['FERIADO'];
                }

                $result->feriados = $array_feriados;
                $result->resultado = 'OK';
            }
        }elseif ($param->modo === 'maxDay'){
            $parametros = null;

            $query = new DB_Query(
                "select web.FUN_BUSCAR_HABIL(trunc(sysdate) + 15) fecha_max from dual"
            );
            $query_result = $query->do_query($parametros);
            if(!$query_result){
                $result->resultado = 'NOOK';
            }else {
                $result->maxDay = $query_result[0]['FECHA_MAX'];
                $result->resultado = 'OK';
            }
        }

    } catch(Exception $e){
        $result->resultado = 'NOOK';
        $result->error = $e->getMessage();
    }

    return $result;
}

