<?php      
    $procedure = "PAC_DISTRIBUCION_BOL.FUN_PERMISO_AUT_PLANTILLA";     
    $parametros = array();         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data);
?>
