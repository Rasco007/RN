<?php
    $job = $_POST['p_obj_invocar'];
    $p_id_workflow_log = $_POST['p_id_workflow_log'];
    $p_c_tarea = $_POST['p_c_tarea'];

    $parametros_array = array(
        ':p_id_workflow_log' => $p_id_workflow_log,
        ':p_c_tarea' => $p_c_tarea,
        ':p_job' => $job,
        ':p_estado' => '',
        ':p_porcentaje' => '',
        ':p_mensaje_error' => '',
        ':p_error' => '',
        ':p_error_ora' => ''
    );

    $sql =
    'begin PAC_WORKFLOW.PRC_PROGRESO_SCHED (
        :p_id_workflow_log,
        :p_c_tarea,
        :p_job,
        :p_estado,
        :p_porcentaje,
        :p_mensaje_error,
        :p_error,
        :p_error_ora);
    end;';


	$db_procedure = new DB_procedure($sql);
	$resultado = $db_procedure->execute_query($parametros_array);
    $resultado->p_estado = $parametros_array[':p_estado'];
    $resultado->p_porcentaje = $parametros_array[':p_porcentaje'];
    $resultado->p_mensaje_error = $parametros_array[':p_mensaje_error'];

	echo json_encode($resultado);
?>