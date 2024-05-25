<?php
	$parametres = array( 
		':p_id_workflow_log' => $_POST['p_id_workflow_log'],
		':p_c_tarea' => $_POST['p_c_tarea'],
		':p_c_tarea_ant' => $_POST['p_c_tarea_ant']
	);
    
    $procedure = "PAC_WORKFLOW.FUN_PROCESAR_PARAM_TAREA(:p_id_workflow_log, :p_c_tarea, :p_c_tarea_ant)";

    $resultado = getArrayResult($procedure, $parametres);

	echo json_encode($resultado);
?>