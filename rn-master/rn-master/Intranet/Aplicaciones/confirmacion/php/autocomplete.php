<?php 

$filtro = $_POST['term'];
$oper = $_POST['oper'];

if($oper == 2){
    $procedure = "PAC_PLANES_DE_PAGO.AUTOCOMPLETE_FACP003(:p_n_cuit)";
    $parametros = array(':p_n_cuit'=>$filtro);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);
}



?>