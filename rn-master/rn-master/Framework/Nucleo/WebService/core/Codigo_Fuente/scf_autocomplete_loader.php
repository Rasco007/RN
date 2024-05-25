<?php
session_start();

$_SESSION['entorno'] = 'WEBSERVICE';
require_once CONFIG_FRAMEWORK_PROY.'path-conf.php';
require_once CONFIG_FRAMEWORK.'path-conf.php';
require_once 'funciones_webserv.php';

if(isset($_GET['status'])){
    switch ($_GET['status']){
        case 'autocomplete':
            $param['id_menu']   = $_POST['id_menu'];
            $param['param'] = $_POST['param'];
            $param['d_url'] = $_POST['d_url'];
            $param['rows'] = $_POST['rows'];
            $param['page'] = 1;
            $param['field_order'] = 1;
            $param['sord'] = 'asc';
            $json = ejecutar_curl(WEBSERVICE_URL. $_POST['d_url'] .'/',$param);
        break;
    }
}

echo $json;