<?php


$param = null;

$p_c_tributo = $_POST['p_tributo'];
$p_n_anio = $_POST['p_n_anio'];
$p_n_cuota = $_POST['p_n_cuota'];


$filename = ROOT_DIR . 'estadisticas_calculo_emision_masiva_' . $p_c_tributo . '_' . $p_n_anio . str_pad($p_n_cuota, 2, "0", STR_PAD_LEFT) . '.csv';


if (!$archivo    = fopen("$filename", "w")) {
    die("Error al crear el archivo");
}

$separador = ';';
$linea = ' ' . $separador . 'Fecha de Impresión: ' . date('d/m/Y');
fwrite($archivo, $linea . PHP_EOL);

$par = array(
    ':p_c_tributo' => $p_c_tributo,
    ':p_n_anio' => $p_n_anio,
    ':p_n_cuota' => $p_n_cuota
);
$data = getArrayResult('PAC_EMISION_MASIV.FUN_TRAER_ESTAD_CALC(:p_c_tributo, :p_n_anio, :p_n_cuota)', $par);
$row_query = $data->datos;

$linea =    ' ' . $separador .
    'Generación MASIVA realizada el ' . $row_query[0]['V_FECH_PROCESO'] . ' a las ' . $row_query[0]['V_HORA_PROCESO'] . ' hs';
fwrite($archivo, $linea . PHP_EOL);
fwrite($archivo, PHP_EOL);

$linea =    ' ' . $separador .
    ' ' . $separador .
    ' ' . $separador .
    'Totales de Control de Cálculo';
fwrite($archivo, $linea . PHP_EOL);
fwrite($archivo, PHP_EOL);

$v_tributo = ($p_c_tributo == '60') ? 'INMOBILIARIO' : 'AUTOMOTOR';
$linea =    ' ' . $separador .
    'Cuota: ' . $p_n_cuota . '/' . $p_n_anio . $separador .
    ' ' . $separador .
    ' ' . $separador .
    ' ' . $separador .
    ' ' . $separador .
    ' ' . $separador .
    'Impuesto: ' . $v_tributo;
fwrite($archivo, $linea . PHP_EOL);
fwrite($archivo, PHP_EOL);

$linea =    ' ' . $separador .
    ' ' . $separador .
    'Cantidad' . $separador .
    'Importe Tributo' . $separador .
    'Importe Tasa' . $separador .
    'Total' . $separador .
    'Tributo Exento' . $separador;
fwrite($archivo, $linea . PHP_EOL);


for ($i = 0; $i < count($row_query); $i++) {
    $linea = ' ' . $separador .
        $row_query[$i]['D_ROTULO'] . $separador .
        $row_query[$i]['N_CANTIDAD'] . $separador .
        $row_query[$i]['I_TRIBUTO'] . $separador .
        $row_query[$i]['I_TASA'] . $separador .
        $row_query[$i]['I_TOTAL'] . $separador .
        $row_query[$i]['I_EXENTO'] . $separador;
    fwrite($archivo, $linea . PHP_EOL);
}
fwrite($archivo, PHP_EOL);

$linea =    ' ' . $separador .
    ' ' . $separador .
    ' ' . $separador .
    'Totales de Control de la Emisión';
fwrite($archivo, $linea . PHP_EOL);
fwrite($archivo, PHP_EOL);

$linea =    ' ' . $separador .
    ' ' . $separador .
    'Cantidad' . $separador .
    'Importe facturado' . $separador .
    'Importe Tasa Dep' . $separador .
    'Acred Tributo' . $separador .
    'Acred Tasa' . $separador .
    'Emitido' . $separador .
    'Emitido Recargo' . $separador;
fwrite($archivo, $linea . PHP_EOL);

$par = array(
    ':p_c_tributo' => $p_c_tributo,
    ':p_n_anio' => $p_n_anio,
    ':p_n_cuota' => $p_n_cuota
);
$data = getArrayResult('PAC_EMISION_MASIV.FUN_TRAER_ESTAD_EMIS(:p_c_tributo, :p_n_anio, :p_n_cuota)', $par);
$row_query = $data->datos;

for ($i = 0; $i < count($row_query); $i++) {
    $linea =    ' ' . $separador .
        $row_query[$i]['D_ROTULO'] . $separador .
        $row_query[$i]['N_CANTIDAD'] . $separador .
        $row_query[$i]['I_TRIBUTO'] . $separador .
        $row_query[$i]['I_TASA'] . $separador .
        $row_query[$i]['I_ACRED_TRIB'] . $separador .
        $row_query[$i]['I_ACRED_TASA'] . $separador .
        $row_query[$i]['I_EMITIDO'] . $separador .
        $row_query[$i]['I_EMITIDO_RECARGO'] . $separador;
    fwrite($archivo, $linea . PHP_EOL);
}
fwrite($archivo, PHP_EOL);

fclose($archivo);

$par = array(
    ':p_id_workflow_log' => $_POST['p_id_workflow_log'],
    ':p_c_tarea' => $_POST['p_c_tarea'],
    ':p_c_estado' => 'R',
    ':p_n_duracion' => 0,
    ':p_m_calcula_dur' => 'N',
    ':p_error' => $p_error,
    ':p_error_ora' => $p_error_ora,
);

$db_procedure = new DB_procedure("BEGIN PAC_WORKFLOW.PRC_ACTUALIZAR_TAREA(:p_id_workflow_log, :p_c_tarea, :p_c_estado, :p_n_duracion, :p_m_calcula_dur, :p_error, :p_error_ora);END;");
$resultado = $db_procedure->execute_query($par);

if (file_exists($filename)) {
    header('Content-Description: File Transfer');
    header('Content-Type: application/forced-download; charset=utf-8');
    header('Content-Disposition: attachment; filename=' . basename($filename));
    readfile($filename);
    unlink($filename);
    exit;
}
