<?php 

$filtro = $_POST['term'];
$oper = $_POST['oper'];


if($oper == 3){
    $procedure = "pac_fiscalizacion.AUTOCOMPLETE_SEGUN_DNI(:p_n_documento)";
    $parametros = array(':p_n_documento'=>$filtro);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);

}else if($oper == 2){
    $procedure = "pac_fiscalizacion.AUTOCOMPLETE_SEGUN_CUIT(:p_n_cuit)";
    $parametros = array(':p_n_cuit'=>$filtro);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);

}



?>