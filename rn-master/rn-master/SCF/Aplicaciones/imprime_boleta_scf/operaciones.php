<?php
session_start();

$param['id_menu'] = $_POST['p_id_menu'];;

$oper = $_POST['p_oper'];
$filtro = $_POST['p_filtro'];

if ($oper === 'boleta_individual'){
    $param['p_id_boleta'] = $_POST['p_id_boleta'];

    $data = ejecutar_curl(WEBSERVICE_URL.'get_boleta_mail_scf/',$param);

    echo $data;
}

if ($oper === 'boleta_grilla'){
    $param['p_id_contrib'] = $_POST['p_id_contrib'];

    $data = ejecutar_curl(WEBSERVICE_URL.'get_boletas_mail_scf/',$param);

    echo $data;
}

if ($oper === 'update_descarga'){
    $param['p_id_boleta'] = $_POST['p_id_boleta'];
    $param['p_nro_envio'] = $_POST['p_nro_envio'];

    $data = ejecutar_curl(WEBSERVICE_URL.'update_descarga/',$param);

    echo $data;
}