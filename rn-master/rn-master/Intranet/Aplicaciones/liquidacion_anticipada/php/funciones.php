<?php
$oper = $_POST['p_oper'];

if ($oper === 'getConst') {        
    $procedure = "PAC_PLANES_DE_PAGO.FUN_OBTENER_CONSTANTES_LIQ()";     
    $parametros = array();         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);
}
else if ($oper === 'getDatosResu') {
    $p_id_contribuyente = $_POST['p_id_contribuyente']; 
    $p_n_plan_pago = $_POST['p_n_plan_pago']; 
    $procedure = "PAC_PLANES_DE_PAGO.FUN_GET_DATOS_RESUMEN(:p_n_plan_pago, :p_id_contribuyente)";     
    $parametros = array(':p_id_contribuyente'=>$p_id_contribuyente, ':p_n_plan_pago'=>$p_n_plan_pago);           
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]); 
}
else if ($oper === 'getDescuento') {
    $p_i_intereses_ori = $_POST['p_i_intereses_ori']; 
    $p_i_interes_mora = $_POST['p_i_interes_mora']; 
    $procedure = "PAC_PLANES_DE_PAGO.FUN_CALCULAR_DESCUENTO(:p_i_intereses_ori, :p_i_interes_mora)";     
    $parametros = array(':p_i_intereses_ori'=>$p_i_intereses_ori, ':p_i_interes_mora'=>$p_i_interes_mora);           
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]); 
}
else if ($oper === 'getTotales') {
    $p_id_sesion = $_POST['p_id_sesion']; 
    $procedure = "PAC_PLANES_DE_PAGO.FUN_CALCULAR_TOTALES_LIQ_ANTI(:p_id_sesion)";     
    $parametros = array(':p_id_sesion'=>$p_id_sesion);           
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]); 
}
?>