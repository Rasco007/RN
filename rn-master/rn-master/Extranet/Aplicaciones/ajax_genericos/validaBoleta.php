<?php

$oper = $_POST['p_oper'];
$filtro = $_POST['p_filtro'];

if ($oper === 'controlarFechaEmision'){
    $db_query = new DB_Query("
    select web.FUN_CONTROLAR_FECHA(:filtro,15) resultado FROM DUAL");

    $par = array(':filtro' => $filtro);
    $row_query = $db_query->do_query($par);

    $result['resultado'] = $row_query[0]['RESULTADO'];
    echo json_encode($result);
}

?>