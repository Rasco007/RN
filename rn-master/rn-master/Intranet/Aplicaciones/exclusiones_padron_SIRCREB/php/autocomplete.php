<?php 

$filtro = $_POST['term'];
$oper = $_POST['oper'];

if($oper == 2){
    $procedure = "PAC_INGRESO_PAGOS.AUTOCOMPLETE_TRIBA033(:p_n_cuit)";
    $parametros = array(':p_n_cuit'=>$filtro);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);
}



?>