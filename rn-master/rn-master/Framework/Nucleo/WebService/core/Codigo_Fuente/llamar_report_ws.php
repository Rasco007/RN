<?php
session_start();
$_SESSION['entorno'] = 'WEBSERVICE';

require_once CONFIG_FRAMEWORK_PROY.'path-conf.php';
require_once CONFIG_FRAMEWORK.'path-conf.php';
require_once 'funciones_webserv.php';

$param['id_menu']	= $_POST['id_menu'];
$param['c_tipo_reporte']	= $_POST['c_tipo_report'];
$param['param']	    = $_POST['parametros'];
$param['c_impresion']	    = $_POST['c_impresion'];
$param['server_name']	    = $_POST['server_name'];

$json = ejecutar_curl(WEBSERVICE_URL. 'llamar_report/',$param);

echo $json;