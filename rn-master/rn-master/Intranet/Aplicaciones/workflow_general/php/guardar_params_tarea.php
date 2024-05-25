<?php
	$parametros = array( 
		':p_id_workflow_log' => $_POST['p_id_workflow_log'],
		':p_c_tarea' => $_POST['p_c_tarea'],
		':p_error' => $p_error,
		':p_error_ora' => $p_error_ora,
	);

	$parametros_array = array( 
		':p_datos' => $_POST['p_params']
	);

	$db_procedure = new DB_procedure("BEGIN PAC_WORKFLOW.PRC_GUARDAR_PARAM_TAREA(:p_id_workflow_log, :p_c_tarea, :p_datos, :p_error, :p_error_ora);END;");
	$resultado = $db_procedure->execute_query($parametros,$parametros_array);

	if ($p_error){
		$resultado->resultado = $p_error;
	}

	echo json_encode($resultado);
?>