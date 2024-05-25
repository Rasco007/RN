<?php
    $id_transaccion = $_POST['id_transaccion'];

    $data = array();

    $procedure = "PAC_PADRON_WEB.ute(:p_id_transaccion)";
    $parametros = array(':p_id_transaccion' => $id_transaccion);
    $data = getArrayResult($procedure, $parametros);
    $row_query = $data->datos;

    $data->datos[0]['resultado'] = 'OK';

    echo json_encode($data->datos[0]);


?>