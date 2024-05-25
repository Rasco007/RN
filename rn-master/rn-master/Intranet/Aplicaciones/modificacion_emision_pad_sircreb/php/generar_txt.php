<?php

$id_pad_sircreb = $_POST['p_id_pad_sircreb'];
$n_mes_pad_sircreb = $_POST['p_n_mes_pad_sircreb'];
$n_anio_pad_sircreb = $_POST['p_n_anio_pad_sircreb'];
$c_tributo = $_POST['p_c_tributo'];

$separador = '';

$par = array(
    ':p_id_pad_sircreb' => $id_pad_sircreb,
    ':p_n_mes_pad_sircreb' => $n_mes_pad_sircreb,
    ':p_n_anio_pad_sircreb' => $n_anio_pad_sircreb,
);

if($c_tributo == 10){
    $data = getArrayResult('PAC_FBRICCHI.GENERA_TRIBUTO_10(:p_id_pad_sircreb,:p_n_mes_pad_sircreb,:p_n_anio_pad_sircreb)', $par);
    $filename = ROOT_DIR . '916' . $n_anio_pad_sircreb . $n_mes_pad_sircreb .'.txt';

    if (!$archivo = fopen("$filename", "w")) {
        die("Error al crear el archivo");
    }

    $par = array();

    $row_query = $data->datos;


    for ($i = 0; $i < count($row_query); $i++) {

        $linea = '"' . $row_query[$i]['L'] . '"' . $separador .
            '"' . $row_query[$i]['N_CUIT'] . '"' . $separador .
            '"' . $row_query[$i]['CODIGO'] . '"' . $separador .
            '"' . $row_query[$i]['D_RAZON_SOCIAL'] . '"' . $separador .
            '"' . $row_query[$i]['P_N_ANIO_PAD_SIRCREB'] . '"' . $separador .
            '"' . $row_query[$i]['P_N_MES_PAD_SIRCREB'] . '"' . $separador .
            '"' . $row_query[$i]['ANIO_HASTA'] . '"' . $separador .
            '"' . $row_query[$i]['MES_HASTA'] . '"' . $separador .
            '"' . $row_query[$i]['ANIO_DOS'] . '"' . $separador .
            '"' . $row_query[$i]['P_N_MES_PAD_SIRCREB_DOS'] . '"' . $separador .
            '"' . $row_query[$i]['C_ALIC_DEFINITIVA'] . '"' . $separador .

        fwrite($archivo, $linea . PHP_EOL);
    }
    fwrite($archivo, PHP_EOL);
}
else if($c_tributo == 20){

    $data = getArrayResult('PAC_FBRICCHI.GENERA_TRIBUTO_20(:p_id_pad_sircreb,:p_n_mes_pad_sircreb,:p_n_anio_pad_sircreb)', $par);
    $filename = ROOT_DIR . '916' . $n_anio_pad_sircreb . $n_mes_pad_sircreb .'alicuotas.txt';

    if (!$archivo = fopen("$filename", "w")) {
        die("Error al crear el archivo");
    }

    $par = array();

    $row_query = $data->datos;


    for ($i = 0; $i < count($row_query); $i++) {

        $linea = '"' . $row_query[$i]['A'] . '"' . $separador .
            '"' . $row_query[$i]['N_CUIT'] . '"' . $separador .
            '"' . $row_query[$i]['CODIGO'] . '"' . $separador .
            '"' . $row_query[$i]['D_RAZON_SOCIAL'] . '"' . $separador .
            '"' . $row_query[$i]['P_N_ANIO_PAD_SIRCREB'] . '"' . $separador .
            '"' . $row_query[$i]['P_N_MES_PAD_SIRCREB'] . '"' . $separador .
            '"' . $row_query[$i]['ANIO_HASTA'] . '"' . $separador .
            '"' . $row_query[$i]['MES_HASTA'] . '"' . $separador .
            '"' . $row_query[$i]['ANIO_DOS'] . '"' . $separador .
            '"' . $row_query[$i]['P_N_MES_PAD_SIRCREB_DOS'] . '"' . $separador .
            '"' . $row_query[$i]['C_ALIC_DEFINITIVA'] . '"' . $separador .

        fwrite($archivo, $linea . PHP_EOL);
    }
    fwrite($archivo, PHP_EOL);

}

if (file_exists($filename)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/forced-download; charset=utf-8');
    header('Content-Disposition: attachment; filename=' . basename($filename));
    readfile($filename);
    unlink($filename);
    exit;
}

$resultado = 'OK';