<?php 

$filtro = $_POST['term'];
$oper = $_POST['oper'];


 if($oper == 2){
    $procedure = "PAC_DDJJ_IBCM.AUTOCOMPLETE_SEGUN_CUIT(:p_n_cuit)";     
    $parametros = array(':p_n_cuit'=>$filtro);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);

} else if($oper == 3){
    $filtro1 = $_POST['term1'];

    $procedure = "PAC_DDJJ_IBCM.AUTOCOMP_IMPONIB_CUIT (:p_d_objeto_hecho,:p_c_tributo)";     
    $parametros = array(':p_d_objeto_hecho'=>$filtro,':p_c_tributo'=>$filtro1);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);

}



?>