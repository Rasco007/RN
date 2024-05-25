<?php     
$oper = $_POST['p_oper'];

if ($oper === 'getAnio') {    
    $procedure = "PAC_EMISION_BOLETA.FUN_GET_ANIO()";     
    $parametros = array();         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]); 
}
if ($oper === 'getFechaVto') {
    $p_tributo = $_POST['p_tributo'];    
    $p_anio = $_POST['p_anio']; 
    $procedure = "PAC_EMISION_BOLETA.FUN_GET_F_VTO(:p_tributo, :p_anio)";     
    $parametros = array(':p_tributo'=>$p_tributo, ':p_anio'=>$p_anio);           
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]); 
}



?>