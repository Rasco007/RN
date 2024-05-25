<?php
session_start();

$param['id_menu'] = $_POST['p_id_menu'];;

$oper = $_POST['p_oper'];
$p_d_objeto_hecho = $_POST['p_d_objeto_hecho'];

if ($oper === 'getDatos'){
    $param['p_d_objeto_hecho'] = $p_d_objeto_hecho;

    $respuesta = ejecutar_curl(WEBSERVICE_URL.'get_datos_telepeaje_scf/',$param);

    echo ($respuesta);
}