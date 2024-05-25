<?php
//Carga de archivos con funciones del directorio EXTRANET_WS_OP
foreach(glob(EXTRANET_WS_OP."*.php") as $filename){
    require_once $filename;
}

use DB_Query as DB_query;

function get_vencimientos_data($param){
    $result = new stdClass();
    $result = get_vencimientos_data_loader($param);
    return $result;
}