<?php
	$parametres = array( 
		':p_cod_job' => $_POST['p_cod_job'],
		':p_n_anio_masiv' => $_POST['p_n_anio_masiv'],
		':p_n_cuota_masiv' => $_POST['p_n_cuota_masiv']
	);
    
    $procedure = "PAC_WORKFLOW.FUN_TRAER_DETALLES_JOBS(:p_cod_job, :p_n_anio_masiv, :p_n_cuota_masiv)";

    $resultado = getArrayResult($procedure, $parametres);

	echo json_encode($resultado);
?>