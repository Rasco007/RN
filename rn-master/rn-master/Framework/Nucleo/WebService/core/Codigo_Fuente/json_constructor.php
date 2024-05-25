<?php
require_once WEBSERVICE_FRAMEWORK."core/operation_ws.php";

use DB_Query as DB_query;

function get_grilla_loader($id_menu = null, $n_grid = null){
    $param['id_menu'] = $id_menu;
    $param['n_grid'] = $n_grid;
    $param['autoquery'] = 'S';
    $param['page'] = 1;
    $param['field_order'] = '1';
    $param['sort_ord'] = 'asc';
    $result = new stdClass();
    $result = get_menu_grid_loader($param);

    return $result;
}

function get_jqgrid_header($param){
    $result = new stdClass();
    $result = get_header_loader($param);
    return $result;
}

function get_jqgrid_data($param){
    $grid = get_data_loader($param);
    return $grid;
}

function maestro($param){
    $result = new stdClass();
    $procedure = maestro_abm($param);

    if($procedure->resultado!='OK'){
        $result = $procedure;
        $result->code = 'ERROR';
    }
    else{
        $result =  $procedure;
        $result->code = 'OK';
    }
    return $result;
}

function llamar_report($param){

    $result = new stdClass();
    $response = llamar_reporte($param);

    if($response->resultado!= 'OK'){
        $result->code = 'ERROR';
        $result->resultado =  $response->error;
    }
    else{
        $result->code = 'OK';
        $result->resultado =  $response->resultado;
    }
    $result = $response;
    
    return $result;
}

function llamar_report_file($param){
    $result = new stdClass();
    $response = llamar_reporte_file($param);

    if($response->resultado!= 'OK'){
        $result->code = 'ERROR';
        $result->resultado =  $response->error;
    }
    else{
        $result->code = 'OK';
        $result->resultado =  $response->resultado;
    }
    $result = $response;
    
    return $result;     

}

function get_autocomplete_data($param){
    $grid = get_autocomplete_data_loader($param);
    return $grid;
}

function get_lupa_data($param){
    $grid = get_lupa_data_loader($param);
    return $grid;
}

function get_export_pdf_data($param){
    $html = get_export_pdf_data_loader($param);
    return $html;
}

function get_export_excel_data($param){
    $html = get_export_excel_data_loader($param);
    return $html;
}