<?php
$tipo = $_POST['tipo'];
$c_tipo_documento = $_POST['c_tipo_documento'];
$n_documento = $_POST['n_documento'];
$m_persona = $_POST['m_persona'];
$c_sexo = $_POST['c_sexo'];

if($tipo == 'obtener_cuit_ficticio'){
	$db_query = new DB_Procedure("BEGIN
		PAC_CONTRIBUYENTES_TMP.GENERAR_CUIT_FICTICIO(
		    :n_documento,
		    :n_cuit,
		    :p_error,
		    :p_error_ora); END;");
	$par = array(':n_documento' => $n_documento,
		':n_cuit' => $n_cuit,
		':p_error' => $p_error,
		':p_error_ora' => $p_error_ora);

	$row_query = $db_query->execute_query($par);
	$result['n_cuit'] = $par[':n_cuit'];
	$result['p_error'] = $par[':p_error'];
	$result['p_error_ora'] = $par[':p_error_ora'];
}

if($tipo == 'obtener_cuit'){
	$db_query = new DB_Procedure("BEGIN
		PAC_CONTRIBUYENTES_TMP.GENERAR_CUIT(
		    :c_tipo_documento,
		    :n_documento,
		    :m_persona,
		    :c_sexo,
		    :n_cuit,
		    :p_error,
		    :p_error_ora); END;");

	$par = array(':c_tipo_documento' => $c_tipo_documento,
		':n_documento' => $n_documento,
		':m_persona' => $m_persona,
		':c_sexo' => $c_sexo,
		':n_cuit' => $n_cuit,
		':p_error' => $p_error,
		':p_error_ora' => $p_error_ora);

	$row_query = $db_query->execute_query($par);
	$result['n_cuit'] = $par[':n_cuit'];
	$result['p_error'] = $par[':p_error'];
	$result['p_error_ora'] = $par[':p_error_ora'];
}

echo json_encode($result);

?>