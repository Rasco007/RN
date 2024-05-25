<?php
$accion = isset($_REQUEST["accion"]) ? htmlentities($_REQUEST["accion"]):"";
$p_id_menu_desde = isset($_REQUEST["p_id_menu_desde"]) ? htmlentities($_REQUEST["p_id_menu_desde"]):"";
$p_n_grilla_desde = isset($_REQUEST["p_n_grilla_desde"]) ? htmlentities($_REQUEST["p_n_grilla_desde"]):"";
$p_id_menu_hasta = isset($_REQUEST["p_id_menu_hasta"]) ? htmlentities($_REQUEST["p_id_menu_hasta"]):"";
$p_n_grilla_hasta = isset($_REQUEST["p_n_grilla_hasta"]) ? htmlentities($_REQUEST["p_n_grilla_hasta"]):"";

switch( $accion ){
	case "copiarGrilla":
		$parametros = array(
			':p_id_menu_desde' => $p_id_menu_desde,
			':p_n_grilla_desde' => $p_n_grilla_desde,
			':p_id_menu_hasta' => $p_id_menu_hasta,
			':p_n_grilla_hasta' => $p_n_grilla_hasta,
			':p_error' => NULL,
			':p_error_ora' => NULL
		);
		$sql = "BEGIN PAC_PHP_GRILLAS.copiar_grilla(
													:p_id_menu_desde,
													:p_n_grilla_desde,
													:p_id_menu_hasta,
													:p_n_grilla_hasta,
													:p_error,
													:p_error_ora
												)
												;END;";
		//die($sql);
		$db_procedure = new DB_procedure($sql);
		$response = $db_procedure->execute_query($parametros);
		echo json_encode($response);
		break;
}
?>