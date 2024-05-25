<?php
require_once(FUNCIONES_FRAMEWORK_PROY."TDIExcel.php");

$tipo_archivo = $_POST['tipo_archivo'];

if($tipo_archivo == 'alicuotas'){
    $titulos = array(0 => array('N_CUIT' => 'descrip'),
                     1 => array('C_TRIBUTO' => 'descrip'),
                     2 => array('D_OBJETO_HECHO' => 'descrip'),
                     3 => array('DIFERENCIA' => 'number'),
                     4 => array('NRO_PERSONAL' => 'number'),
                     5 => array('GRUPO' => 'descrip'));
}

if($tipo_archivo == 'deducciones'){
    $titulos = array(0 => array('N_CUIT' => 'descrip'),
                     1 => array('DIFERENCIA' => 'number'),
                     2 => array('NRO_PERSONAL' => 'number'),
                     3 => array('GRUPO' => 'descrip'));
}

if($tipo_archivo == 'imponible'){
    $titulos = array(0 => array('N_CUIT' => 'descrip'),
                     1 => array('N_CUOTA' => 'number'),
                     2 => array('C_TRIBUTO' => 'descrip'),
                     3 => array('D_OBJETO_HECHO' => 'descrip'),
                     4 => array('DECLARADO' => 'number'),
                     5 => array('VERIFICADO' => 'number'),
                     6 => array('NRO_PERSONAL' => 'number'),
                     7 => array('GRUPO' => 'descrip'));
}

$selects = [];
foreach ($titulos as $column) {
    foreach($column as $title => $typeTitle) {
        $selects[] = "1 AS $title";
    }
}

$query = 'SELECT ';
$query .= implode(', ', $selects);
$query .= ' FROM DUAL WHERE 1 = 2';

$excel = new TDIExcelXLSX($tipo_archivo);

$excel->downloadExcel($query,array(),$titulos);
?>