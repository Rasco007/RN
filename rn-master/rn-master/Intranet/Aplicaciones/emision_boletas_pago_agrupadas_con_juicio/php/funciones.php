

<?php
$oper = $_POST['p_oper'];

if ($oper === 'getTotales') {      
    $p_id_sesion = $_POST['p_id_sesion'];     
    $procedure = "PAC_EMISION_BOLETA.FUN_CALCULAR_TOTALES(:p_id_sesion)";     
    $parametros = array(':p_id_sesion'=>$p_id_sesion);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);
}
else if ($oper === 'getTasa980') { 
    $procedure = "PAC_EMISION_BOLETA.FUN_MONTO_TASA_980()";     
    $parametros = array();         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);
}
else if ($oper === 'getConstDiasF') { 
    $procedure = "PAC_EMISION_BOLETA.FUN_DIAS_FUTURO(:p_constante)";     
    $parametros = array(':p_constante'=>'DIAS_INT_FUTURO');         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);
}
?>

