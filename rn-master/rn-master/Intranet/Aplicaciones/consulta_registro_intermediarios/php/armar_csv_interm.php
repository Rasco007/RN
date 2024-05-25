<?php

$tipo_consulta = $_POST['p_tipo_consulta'];
$separador = $_POST['p_separador'];

$p_n_cuit_interm = $_POST['p_n_cuit_interm'];
$p_d_denom_interm = $_POST['p_d_denom_interm'];
$p_n_doc_interm = $_POST['p_n_doc_interm'];
$p_c_tributo_interm = $_POST['p_c_tributo_interm'];
$p_c_tipo_imp_interm = $_POST['p_c_tipo_imp_interm'];
$p_c_tipo_doc = $_POST['p_c_tipo_doc'];
$p_n_cuit_contrib = $_POST['p_n_cuit_contrib'];
$p_d_denom_contrib = $_POST['p_d_denom_contrib'];
$p_d_obj_hecho_contrib = $_POST['p_d_obj_hecho_contrib'];
$p_existia_alta = $_POST['p_existia_alta'];
$p_tributo_contrib = $_POST['p_tributo_contrib'];
$p_c_provincia = $_POST['p_c_provincia'];
$p_d_localidad = $_POST['p_d_localidad'];
$p_c_postal = $_POST['p_c_postal'];
$p_d_calle = $_POST['p_d_calle'];
$p_n_numero = $_POST['p_n_numero'];
$p_piso = $_POST['p_piso'];
$p_depto = $_POST['p_depto'];
$p_email = $_POST['p_email'];
$p_n_telefono = $_POST['p_n_telefono'];
$p_f_vig_desde = $_POST['p_f_vig_desde'];
$p_f_vig_hasta = $_POST['p_f_vig_hasta'];
$p_cta_contable = $_POST['p_cta_contable'];
$p_orden = $_POST['p_orden'];
$p_c_tipo_doc_hab = $_POST['p_c_tipo_doc_hab'];



if($separador == 'punto_coma'){
    $separador = ';';
}

$par = array(
    ':p_n_cuit_intermedirario' => $p_n_cuit_interm,
    ':p_d_denom_intermediario' => $p_d_denom_interm,
    ':p_n_doc_intermediario' => $p_n_doc_interm,
    ':p_c_tributo_interm' => $p_c_tributo_interm,
    ':p_c_tipo_imp_interm' => $p_c_tipo_imp_interm,
    ':p_c_tipo_doc' => $p_c_tipo_doc,
    ':p_n_cuit_contrib' => $p_n_cuit_contrib,
    ':p_d_denom_contrib' => $p_d_denom_contrib,
    ':p_d_objeto_hecho_contrib' => $p_d_obj_hecho_contrib,
    ':p_existia_alta' => $p_existia_alta,
    ':p_tributo_contrib' => $p_tributo_contrib,
    ':p_c_provincia' => $p_c_provincia,
    ':p_d_localidad' => $p_d_localidad,
    ':p_c_postal' => $p_c_postal,
    ':p_d_calle' => $p_d_calle,
    ':p_n_numero' => $p_n_numero,
    ':p_piso' => $p_piso,
    ':p_depto' => $p_depto,
    ':p_email' => $p_email,
    ':p_n_telefono' => $p_n_telefono,
    ':p_f_vig_desde' => $p_f_vig_desde,
    ':p_f_vig_hasta' => $p_f_vig_hasta,
    ':p_cta_contable' => $p_cta_contable,
    ':p_orden' => $p_orden,
    ':p_c_tipo_doc_hab' => $p_c_tipo_doc_hab
);


if($tipo_consulta == 'ACTUAL'){
    $data = getArrayResult('PAC_IIBB_CM.FUN_TRAER_CONS_ACT_REG_INTERM()', $par);
    $filename = ROOT_DIR . 'registro_intermediarios.csv';
    
} else{
    $data = getArrayResult('PAC_IIBB_CM.FUN_TRAER_CONS_TOD_REG_INTERM()', $par);
    $filename = ROOT_DIR . 'registro_intermediarios_todo.csv';
}



if (!$archivo    = fopen("$filename", "w")) {
    die("Error al crear el archivo");
}

$linea = '"' . 'RAZON_SOCIAL_INTERMEDIARIO' . '"' . $separador . 
         '"' . 'CUIT_INTERMEDIARIO' . '"' . $separador . 
         '"' . 'TIPO_DOCUMENTO_INTERMEDIARIO' . '"' . $separador . 
         '"' . 'DOCUMENTO_INTERMEDIARIO' . '"' . $separador . 
         '"' . 'INSCRIPCION_INTERMEDIARIO' . '"' . $separador . 
         '"' . 'C_TRIBUTO_INTERMEDIARIO' . '"' . $separador . 
         '"' . 'DSP_TRIBUTO_INTERMEDIARIO' . '"' . $separador . 
         '"' . 'CUIT' . '"' . $separador . 
         '"' . 'RAZON_SOCIAL' . '"' . $separador . 
         '"' . 'EXISTIA_EN_EL_ALTA?' . '"' . $separador . 
         '"' . 'C_TRIBUTO' . '"' . $separador . 
         '"' . 'DSP_TRIBUTO' . '"' . $separador . 
         '"' . 'INSCRIPCION' . '"' . $separador . 
         '"' . 'C_PROVINCIA' . '"' . $separador . 
         '"' . 'DSP_PROVINCIA' . '"' . $separador . 
         '"' . 'LOCALIDAD' . '"' . $separador . 
         '"' . 'C_POSTAL' . '"' . $separador . 
         '"' . 'CALLE' . '"' . $separador . 
         '"' . 'NUMERO' . '"' . $separador . 
         '"' . 'PISO' . '"' . $separador . 
         '"' . 'DEPTO' . '"' . $separador . 
         '"' . 'EMAIL' . '"' . $separador . 
         '"' . 'TELEFONO' . '"' . $separador . 
         '"' . 'F_VIG_DESDE' . '"' . $separador . 
         '"' . 'F_VIG_HASTA' . '"' . $separador . 
         '"' . 'N_CUENTA_CONTABLE' . '"' . $separador . 
         '"' . 'C_TIPO_DOC_HABILITANTE' . '"' . $separador . 
         '"' . 'DSP_TIPO_DOC_HABILITANTE' . '"' . $separador . 
         '"' . 'F_ALTA' . '"' . $separador . 
         '"' . 'C_USUARIOALT' . '"' . $separador . 
         '"' . 'F_ACTUALIZAC' . '"' . $separador . 
         '"' . 'C_USUARIOACT' . '"';
fwrite($archivo, $linea . PHP_EOL);

$par = array();


$row_query = $data->datos;


for ($i = 0; $i < count($row_query); $i++) {
    $linea = 
        '"' . $row_query[$i]['DSP_INTERMEDIARIO'] . '"' . $separador .
        '"' . $row_query[$i]['N_CUIT_INTERMEDIARIO'] . '"' . $separador .
        '"' . $row_query[$i]['DSP_TIPO_DOC_INTERMEDIARIO'] . '"' . $separador .
        '"' . $row_query[$i]['N_DOCUMENTO_INTERMEDIARIO'] . '"' . $separador .
        '"' . $row_query[$i]['D_OBJETO_HECHO_INTERMEDIARIO'] . '"' . $separador .
        '"' . $row_query[$i]['C_TRIBUTO_INTERMEDIARIO'] . '"' . $separador .
        '"' . $row_query[$i]['DSP_TRIBUTO_INTERMEDIARIO'] . '"' . $separador .
        '"' . $row_query[$i]['N_CUIT'] . '"' . $separador .
        '"' . $row_query[$i]['D_RAZON_SOCIAL'] . '"' . $separador .
        '"' . $row_query[$i]['EXISTIA_EN_ALTA'] . '"' . $separador .
        '"' . $row_query[$i]['C_TRIBUTO'] . '"' . $separador .
        '"' . $row_query[$i]['DSP_TRIBUTO'] . '"' . $separador .
        '"' . $row_query[$i]['D_OBJETO_HECHO'] . '"' . $separador .
        '"' . $row_query[$i]['C_PROVINCIA'] . '"' . $separador .
        '"' . $row_query[$i]['DSP_PROVINCIA'] . '"' . $separador .
        '"' . $row_query[$i]['D_LOCALIDAD'] . '"' . $separador .
        '"' . $row_query[$i]['C_POSTAL'] . '"' . $separador .
        '"' . $row_query[$i]['D_CALLE'] . '"' . $separador .
        '"' . $row_query[$i]['N_NUMERO'] . '"' . $separador .
        '"' . $row_query[$i]['D_PISO'] . '"' . $separador .
        '"' . $row_query[$i]['D_DEPTO'] . '"' . $separador .
        '"' . $row_query[$i]['D_EMAIL'] . '"' . $separador .
        '"' . $row_query[$i]['N_TELEFONO'] . '"' . $separador .
        '"' . $row_query[$i]['F_VIG_DESDE'] . '"' . $separador .
        '"' . $row_query[$i]['F_VIG_HASTA'] . '"' . $separador .
        '"' . $row_query[$i]['N_CUENTA_CONTABLE'] . '"' . $separador .
        '"' . $row_query[$i]['C_TIPO_DOC_HABILITANTE'] . '"' . $separador .
        '"' . $row_query[$i]['DSP_TIPO_DOC_HABILITANTE'] . '"' . $separador .
        '"' . $row_query[$i]['F_ALTA'] . '"' . $separador .
        '"' . $row_query[$i]['C_USUARIOALT'] . '"' . $separador .
        '"' . $row_query[$i]['F_ACTUALIZAC'] . '"' . $separador .
        '"' . $row_query[$i]['C_USUARIOACT'] . '"';
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
