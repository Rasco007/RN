<?php
session_start();

$_SESSION['entorno'] = 'WEBSERVICE';
require_once CONFIG_FRAMEWORK_PROY.'path-conf.php';
require_once CONFIG_FRAMEWORK.'path-conf.php';
require_once 'funciones_webserv.php';

if(isset($_GET['status'])){
    switch ($_GET['status']){
        case 'data':
            $param['id_menu']   = $_POST['id_menu'];
            $param['n_grid']    = $_POST['n_grid'];
            $param['autoquery'] = (isset($_POST['autoquery']))? $_POST['autoquery'] : 'S';
            $param['n_orden']   = $_POST['n_orden'];
            $param['param']     = $_POST['param'];
            $param['rows']      = $_POST['rows'];
            $param['page']      = $_POST['page'];
            $param['field_order']= $_POST['sidx'];
            $param['sord']      = $_POST['sord'];

            $json = ejecutar_curl(WEBSERVICE_URL. 'get_jqgrid_data/',$param);
        break;
        case 'form':
            $oper = $_POST['oper'];
            unset($_POST['oper']);
            unset($_POST['id']);
            $param = $_POST;
            $param['p_oper'] = $oper;

            switch($oper){
                case 'add':
                    $url = 'maestro_add/';
                    break;
                case 'del':
                    $url = 'maestro_delete/';
                    break;
                case 'edit':
                    $url = 'maestro_edit/';
                    break;
            }

            $json = ejecutar_curl(WEBSERVICE_URL.$url, $param);
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