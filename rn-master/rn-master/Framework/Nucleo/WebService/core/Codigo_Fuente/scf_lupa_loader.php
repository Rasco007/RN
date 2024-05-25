<?php
session_start();

$_SESSION['entorno'] = 'WEBSERVICE';
require_once CONFIG_FRAMEWORK_PROY.'path-conf.php';
require_once CONFIG_FRAMEWORK.'path-conf.php';
require_once 'funciones_webserv.php';

if(isset($_GET['status'])){
    switch ($_GET['status']){
        case 'lupa':
            $param['id_menu']   = $_POST['id_menu'];
            $param['filtros'] = json_decode($_POST['filtros']);
            $param['campos'] = json_decode($_POST['campos']);
            $param['id_lista'] = $_POST['tipo'];
            $param['cond'] = $_GET['cond'];
            $param['exacto'] = $_POST['exacto'];
            $param['page'] = $_POST['page'];
            $param['rows'] = $_POST['rows'];
            $param['sidx'] = $_POST['sidx'];
            $param['sord'] = $_POST['sord'];
            $json = ejecutar_curl(WEBSERVICE_URL. 'get_lupa_generica_data/',$param);
        break;
        case 'lupa_cod':
            $param['id_menu']   = $_POST['id_menu'];
            $param['filtros'] = json_decode($_POST['filtros']);
            $param['campos'] = json_decode($_POST['campos']);
            $param['id_lista'] = $_POST['tipo'];
            $param['cond'] = $_POST['cond'];
            $param['exacto'] = $_POST['exacto'];
            $param['page'] = $_POST['page'];
            $param['rows'] = $_POST['rows'];
            $param['sidx'] = $_POST['sidx'];
            $param['sord'] = $_POST['sord'];
            $json = ejecutar_curl(WEBSERVICE_URL. 'get_lupa_cod_data/',$param);
        break;
    }
}
else{
    $param['id_menu'] = $_POST['id_menu'];
    $param['n_grid'] = $_POST['n_grid'];
    $param['autoquery'] = 'S';
    $param['page'] = 1;
    $param['field_order'] = '1';
    $param['sort_ord'] = 'asc';

    $json = ejecutar_curl(WEBSERVICE_URL.'get_jqgrid_header/',$param);

}

echo $json;