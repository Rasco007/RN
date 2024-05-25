<?php
	session_write_close();
    $c_tipo_report = $_POST['c_tipo_report'];
    $parametros = $_POST['parametros'];
    $server_name = $_POST['server_name'];
    $c_impresion = nvl($_POST['c_impresion'],'PDF');
    $filtros = $_POST["filtros"];

    $url= get_url_report($c_tipo_report,$parametros,$server_name,$c_impresion, $filtros);
	session_start();
    die(json_encode($url));
?>
