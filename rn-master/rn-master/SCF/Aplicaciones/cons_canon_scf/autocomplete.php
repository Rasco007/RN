<?php
session_start();

$param['id_menu'] = $_POST['p_id_menu'];;

$oper = $_POST['p_oper'];
$p_d_objeto_hecho = $_POST['p_d_objeto_hecho'];
$p_d_nomenclatura = $_POST['p_d_nomenclatura'];

if ($oper === 'getDatos'){
    $param['p_d_objeto_hecho'] = $p_d_objeto_hecho;
    $param['p_d_nomenclatura'] = $p_d_nomenclatura;

    $respuesta = ejecutar_curl(WEBSERVICE_URL.'get_datos_partida_scf/',$param);

    echo ($respuesta);
}