<?php
$oper = $_POST['p_oper'];

if ($oper === 'getConst') {        
    $procedure = "PAC_PLANES_DE_PAGO.FUN_OBTENER_CONSTANTES_A_P_P()";     
    $parametros = array();         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);
}
else if ($oper === 'getFechaVto') {
    $procedure = "PAC_PLANES_DE_PAGO.FUN_GET_F_VTO_A_P_P()";     
    $parametros = array();           
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]); 
}
else if ($oper === 'getDatosPlan') {
    $p_id_sesion = $_POST['p_id_sesion']; 
    $procedure = "PAC_PLANES_DE_PAGO.FUN_GET_DATOS_PLAN(:p_id_sesion)";     
    $parametros = array(':p_id_sesion'=>$p_id_sesion);           
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]); 
}
else if ($oper === 'getTotales') {
    $p_id_sesion = $_POST['p_id_sesion']; 
    $procedure = "PAC_PLANES_DE_PAGO.FUN_CALCULAR_TOTALES(:p_id_sesion)";     
    $parametros = array(':p_id_sesion'=>$p_id_sesion);           
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]); 
}
?>