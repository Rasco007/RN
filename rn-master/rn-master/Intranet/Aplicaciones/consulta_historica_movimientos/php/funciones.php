<?php
$oper = $_POST['p_oper'];

if ($oper === 'getDomAnt') {     
    $p_d_patente = $_POST['p_d_patente'];    
    $procedure = "PAC_AUTOMOTOR.FUN_OBTENER_DOMINIO_ANTERIOR(:p_d_patente)";     
    $parametros = array(':p_d_patente'=>$p_d_patente);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);
}
?>