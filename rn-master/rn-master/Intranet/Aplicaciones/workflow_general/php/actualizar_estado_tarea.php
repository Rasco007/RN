<?php
	$parametros = array( 
		':p_id_workflow_log' => $_POST['p_id_workflow_log'],
		':p_c_tarea' => $_POST['p_c_tarea'],
        ':p_c_estado' => $_POST['p_c_estado'],
        ':p_n_duracion' => $_POST['p_n_duracion'],
        ':p_m_calcula_dur' => $_POST['p_m_calcula_dur'],
		':p_error' => $p_error,
		':p_error_ora' => $p_error_ora,
	);

	$db_procedure = new DB_procedure("BEGIN PAC_WORKFLOW.PRC_ACTUALIZAR_TAREA(:p_id_workflow_log, :p_c_tarea, :p_c_estado, :p_n_duracion, :p_m_calcula_dur, :p_error, :p_error_ora);END;");
	$resultado = $db_procedure->execute_query($parametros);

	if ($p_error){
		$resultado->resultado = $p_error;
	}

	echo json_encode($resultado);
?>