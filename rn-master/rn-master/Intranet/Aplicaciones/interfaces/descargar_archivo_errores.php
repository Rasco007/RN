<?php

$param = null;

$n_id_disco = $_POST['p_n_id_disco'];
$p_hay_errores = $_POST['p_hay_errores'];
$path = $_POST['p_path'];
$path_recha = $_POST['p_path_recha'];

$filename = ROOT_DIR.'Intranet/archivos_tmp/'.$path_recha;
if ($p_hay_errores == 'SI'){
    $procedure = "PAC_DEBITO_DIRECTO.fun_descargar_no_procesado(:p_n_id_disco, :p_path)";
}else{
    $procedure = "PAC_DEBITO_DIRECTO.fun_descargar_archivo_errores(:p_n_id_disco, :p_path)";
}

$par = array(
    ':p_n_id_disco' => $n_id_disco,
    ':p_path' => $path
);
$data = getArrayResult($procedure, $par);

$row_query = $data->datos;

if (!$archivo    = fopen("$filename", "w")){
    die("Error al crear el archivo");
}

for($i=0;$i < count($row_query);$i++){
    $registro = $row_query[$i]['LINEA'];
    fwrite($archivo, $registro."\r\n");
    
}

fclose($archivo);

if(file_exists($filename)) {

    header('Content-Description: File Transfer');
    header('Content-Type: application/forced-download; charset=utf-8');
    header('Content-Disposition: attachment; filename='.basename($filename));
    //header('Expires: 0');
    //header('Cache-Control: must-revalidate');
    //header('Pragma: public');
    readfile($filename);
    unlink($filename);
    exit;

}

?>