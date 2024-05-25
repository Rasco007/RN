<?php

$app->get('/get_datos_partida_scf/{param}', function($param) use ($app) {
    $obj = json_decode(decodeurl($param));
    $controllerResult = get_datos_partida_scf($obj);
    return $app->json($controllerResult);
});

function get_datos_partida_scf($param){
    try{
        $result = new stdClass();

        $procedure = "PAC_CANON_RIEGO.fun_datos_deuda_canon(:p_d_objeto_hecho,:p_d_nomenclatura)";

        $parametros = array(
            ':p_d_objeto_hecho'=>$param->p_d_objeto_hecho,
            ':p_d_nomenclatura'=>$param->p_d_nomenclatura
        );

        $data = getArrayResult($procedure, $parametros);

        if ($data->resultado == 'OK'){
            if (count($data->datos) == 1){
                $result->cuit = $data->datos[0]['CUIT'];
                $result->objeto = $data->datos[0]['OBJETO'];
                $result->nomenclatura = $data->datos[0]['NOMENCLATURA'];
                $result->departamento = $data->datos[0]['DEPARTAMENTO'];
                $result->circunscripcion = $data->datos[0]['CIRCUNSCRIPCION'];
                $result->seccion = $data->datos[0]['SECCION'];
                $result->u_caracteristica = $data->datos[0]['U_CARACTERISTICA'];
                $result->parcela = $data->datos[0]['PARCELA'];
                $result->u_funcional = $data->datos[0]['U_FUNCIONAL'];
                $result->resultado = 'OK';
            }else{
                $result->resultado = 'NOOK';
                $result->error = 'La partida / nomenclatura seleccionada no existe o no se encuentra vigente para el tributo.';
            }
        }else{
            $result->resultado = 'NOOK';
            $result->error = 'Datos ingresados invalidos.';
        }

    }
    catch(Exception $e){
        $result->resultado = 'NOOK';
        $result->error = $e->getMessage();
    }

    return $result;
}

