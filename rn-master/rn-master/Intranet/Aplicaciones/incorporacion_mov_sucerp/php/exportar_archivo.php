<?php
require_once(FUNCIONES_FRAMEWORK_PROY."TDIExcel.php");

$db_query = new DB_Query();

$p_semana = $_POST['p_semana'];
$p_desde = $_POST['p_desde'];
$p_hasta = $_POST['p_hasta'];

$separador = ';';

$par = array(
     ':p_desde' => $p_desde,
     ':p_hasta' => $p_hasta
);

$data = getArrayResult('SIAT.PKG_RNPA.FUN_TRAER_CONS_ERRORES_SUCERP(:p_desde, :p_hasta)', $par);
$filename = ROOT_DIR . $p_semana.'-'.date('Y-m-d') . '.csv';

if (!$archivo    = fopen("$filename", "w")) {
     die("Error al crear el archivo");
}

$linea = '"' . 'TIPO_MOV' . '"' . $separador . 
         '"' . 'DESCRIPCION' . '"' . $separador . 
         '"' . 'DOMINIO' . '"' . $separador . 
         '"' . 'MTM' . '"' . $separador . 
         '"' . 'NRO TRAMITE' . '"' . $separador . 
         '"' . 'CUIT' . '"' . $separador . 
         '"' . 'DENOMINACION' . '"' . $separador .
         '"' . 'FECHA_OP' . '"' . $separador . 
         '"' . 'COD_REGISTRO' . '"' . $separador . 
         '"' . 'REGISTRO' . '"' . $separador . 
         '"' . 'ERROR' . '"' . $separador . 
         '"' . 'UBICACION_ERROR' . '"' . $separador . 
         '"' . 'F_ALTA' . '"'; 
fwrite($archivo, $linea . PHP_EOL);

$par = array();


$row_query = $data->datos;


for ($i = 0; $i < count($row_query); $i++) {
    $linea = 
     $row_query[$i]['TIPO_REGISTRO'] . $separador .
     $row_query[$i]['TIPO'] . $separador .
     $row_query[$i]['DOMINIO_NUEVO'] . $separador .
     $row_query[$i]['FMCAMOD'] . $separador .
     $row_query[$i]['NRO_TRAMITE'] . $separador .
     $row_query[$i]['CUIT'] . $separador .
     $row_query[$i]['DENOMINACION'] . $separador .
     $row_query[$i]['F_OPERACION'] . $separador .
     $row_query[$i]['C_REG_SECC'] . $separador .
     $row_query[$i]['D_REG_SECC'] . $separador .
     $row_query[$i]['ERROR'] . $separador .
     $row_query[$i]['UBICACION_ERROR'] . $separador .
     $row_query[$i]['F_ALTA'];
    fwrite($archivo, $linea . PHP_EOL);
}
fwrite($archivo, PHP_EOL);

if (file_exists($filename)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/forced-download; charset=utf-8');
    header('Content-Disposition: attachment; filename=' . basename($filename));
    readfile($filename);
    unlink($filename);
    exit;
}

$resultado = 'OK';

?>
