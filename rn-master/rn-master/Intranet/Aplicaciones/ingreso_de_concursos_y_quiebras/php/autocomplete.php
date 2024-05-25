<?php 

$filtro = $_POST['term'];
$oper = $_POST['oper'];


if($oper == 1){

    $procedure = "PAC_CONC_QUIEBRA.VALIDA_EXP_HOMOLOGADO(:p_c_expediente)";     
    $parametros = array(':p_c_expediente'=>$filtro);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);


}else
 if($oper == 2){

    $procedure = "PAC_CONC_QUIEBRA.AUTOCOMPLETE_SEGUN_EXPEDIENTE(:p_c_expediente)";     
    $parametros = array(':p_c_expediente'=>$filtro);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);


}



?>