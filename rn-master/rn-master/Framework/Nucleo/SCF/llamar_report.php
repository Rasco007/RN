<?php
    session_start();
    require_once CONFIG_FRAMEWORK_PROY.'path-conf.php';
    require_once CONFIG_FRAMEWORK.'path-conf.php';
    require_once WEBSERVICE_FRAMEWORK.'core/funciones_webserv.php';


	$param['id_menu'] = $_SESSION['SCF_ID_MENU_APP'];
    $param['c_tipo_reporte'] = $_POST['c_tipo_report'];
    $param['param'] = $_POST['parametros'];
    $param['server_name'] = $_POST['server_name'];
    isset($_POST['c_impresion'])?$param['c_impresion'] = $_POST['c_impresion']:'PDF';

    $url = ejecutar_curl(WEBSERVICE_URL.'llamar_report/',$param);

    die($url);

?>