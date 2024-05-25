<?php 

$filtro = $_POST['term'];
$filtro1 = $_POST['term1'];
$filtro2 = $_POST['term2'];
$oper = $_POST['oper'];

if($oper == 2){
    $procedure = "PAC_CONS_AUTOMOTORES.FUN_TRAER_AUT_AUTA018 (:p_d_patente, :p_d_patente_vieja)";
    $parametros = array(':p_d_patente'=>$_POST['term'], 
    ':p_d_patente_vieja'=>$_POST['term1']);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);
}



?>