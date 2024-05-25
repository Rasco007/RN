<?php
$oper = $_POST['p_oper'];

if ($oper === 'getConst') {        
    $procedure = "PAC_IIBB_CM.FUN_OBTENER_CONSTANTES()";     
    $parametros = array();         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data->datos[0]);
}
?>