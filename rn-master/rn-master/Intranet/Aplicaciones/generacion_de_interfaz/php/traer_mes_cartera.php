<?php
	$parametres = array( 
		':p_c_tributo' => $_POST['p_c_tributo'],
		':p_c_concepto' => $_POST['p_c_concepto'],
		':p_n_posicion_fiscal' => $_POST['p_n_posicion_fiscal'],
		':p_n_cuota' => $_POST['p_n_cuota']
	);
    
    $procedure = "PAC_WORKFLOW.FUN_TRAER_F_CARTERA(:p_c_tributo, :p_c_concepto, :p_n_posicion_fiscal, :p_n_cuota)";

    $resultado = getArrayResult($procedure, $parametres);

	echo json_encode($resultado);
?>