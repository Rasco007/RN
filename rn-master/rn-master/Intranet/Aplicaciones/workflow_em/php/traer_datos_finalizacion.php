<?php   
    $p_id_workflow_log = $_POST['p_id_workflow_log'];     
    $procedure = "PAC_EMISION_MASIV.FUN_TRAER_EMISION(:p_id_workflow_log)";     
    $parametros = array(':p_id_workflow_log'=>$p_id_workflow_log);         
    $data = getArrayResult($procedure, $parametros);     
    echo json_encode($data);
?>

