<?php 

$filtro = $_POST['term'];
$filtro1 = $_POST['term1'];
$filtro2 = $_POST['term2'];
$oper = $_POST['oper'];

if($oper == 2){
    $procedure = "PAC_SRASCOVICH.FUN_DEVOLVER_N_ALICUOTA(:p_n_anio_fiscal, 
    :p_n_mes_fiscal,
    :p_c_grupo)";
    $parametros = array(':p_n_anio_fiscal'=>$_POST['term'], 
    ':p_n_mes_fiscal'=>$_POST['term1'], 
    ':p_c_grupo'=>$_POST['term2']);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);

}else if($oper == 3){
    $procedure = "PAC_SRASCOVICH.FUN_DEVOLVER_IMPORTE_TOTAL (:p_n_valuacion,:p_n_alicuota)";
    $parametros = array(':p_n_valuacion'=> $_POST['term'], 
    ':p_n_alicuota'=>$_POST['term1']);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);

}



?>