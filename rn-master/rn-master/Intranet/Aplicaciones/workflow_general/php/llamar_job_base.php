<?php
    $job = $_POST['p_obj_invocar'];
    $id_workflow_log = $_POST['p_id_workflow_log'];
    $c_tarea = $_POST['p_c_tarea'];
    $args = json_decode($_POST['p_params'],true);


    $query = "
    DECLARE
    job_name VARCHAR2(100) := '$job';
    BEGIN";

    $query .= "
    PAC_WORKFLOW.PRC_ACTUALIZA_MENSAJE_ERROR ($id_workflow_log,'$c_tarea','');
    ";

    foreach($args as $key => $value) {
        $key++;
        $query .= "
    DBMS_SCHEDULER.SET_JOB_ARGUMENT_VALUE(job_name => job_name, argument_position => $key, argument_value => '$value');";
    }

    $query .= "
    DBMS_SCHEDULER.RUN_JOB(job_name => job_name, use_current_session => FALSE);
    END;
    ";


	$db_procedure = new DB_procedure($query);
	$resultado = $db_procedure->execute_query($parametros);

	echo json_encode($resultado);
?>