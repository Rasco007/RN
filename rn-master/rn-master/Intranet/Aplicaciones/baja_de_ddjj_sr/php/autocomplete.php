<?php 

$filtro = $_POST['term'];
$oper = $_POST['oper'];


if($oper == 3){
    $procedure = "PAC_DDJJ_IBCM.AUTOCOMP_CONTRIB_SEGUN_DNI(:p_n_documento)";     
    $parametros = array(':p_n_documento'=>$filtro);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);

}else if($oper == 2){
    $procedure = "PAC_DDJJ_IBCM.AUTOCOMP_CONTRIB_SEGUN_CUIT(:p_n_cuit)";     
    $parametros = array(':p_n_cuit'=>$filtro);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);

}else if($oper == 1){
    $n_posicion_fiscal = $_POST['term1'];
    $n_cuota = $_POST['term2'];

    $procedure = "PAC_DDJJ_IBCM.FUN_TRAER_DATOS_DDJJ(:p_id_contribuyente, :p_n_posicion_fiscal,:p_n_cuota_anticipo)";     
    $parametros = array(':p_id_contribuyente'=>$filtro,
    ':p_n_posicion_fiscal'=>$n_posicion_fiscal,
    ':p_n_cuota_anticipo'=>$n_cuota);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);

}



?>