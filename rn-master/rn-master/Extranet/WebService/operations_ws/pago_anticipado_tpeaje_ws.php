<?php
$app->get('/comprar_pago_anticipado/{param}', function ($param) use ($app) {
    $obj = json_decode(decodeurl($param));
    $controllerResult = comprar_pago_anticipado($obj);
    return $app->json($controllerResult);
});

function comprar_pago_anticipado($param)
{
    $result = new stdClass();
    try {
        $param_prc = array(
            ':p_d_patente' => $param->p_d_patente,
            ':p_i_importe' => $param->p_i_importe,
            ':p_id_boleta' => NULL,
            ':p_error' => NULL,
            ':p_error_ora' => NULL,
        );

        $sql = "BEGIN PAC_TELEPEAJE.PRC_CARGAR_PAGO_ANTICIPADO(:p_d_patente,
                                                                :p_i_importe,
                                                                :p_id_boleta,
                                                                :p_error,
                                                                :p_error_ora);
                                                                END;";

        $db_procedure = new DB_Procedure($sql);
        $db_procedure->setQuery($sql);
        $results = $db_procedure->execute_query($param_prc);

        if ($param_prc[':p_error']) {
            $result->resultado = 'NOOK';
            $result->error = $param_prc[':p_error'];
        } else {
            $result->p_id_boleta = $param_prc[':p_id_boleta'];
            $result->resultado = 'OK';
        }
    } catch (Exception $e) {
        $result->resultado = 'NOOK';
        $result->error = $e->getMessage();
    }

    return $result;
}