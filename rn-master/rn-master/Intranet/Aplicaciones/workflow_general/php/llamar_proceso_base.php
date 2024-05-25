<?php
    $params = json_decode($_POST['p_params'],true);

	$parametros = array(
        ':p_mensaje_usuario' => '',
        ':p_error' => '',
        ':p_error_ora' => ''
    );

    $query = "BEGIN ";
    $query .= $_POST['p_obj_invocar'];
    $query .= "(";

    foreach ($params as $key => $value) {
        $query .= ":".$key.", ";
        $parametros[":".$key] = $value;
    }

    $query .= ":p_mensaje_usuario, :p_error, :p_error_ora);END;";

	$db_procedure = new DB_procedure($query);
	$resultado = $db_procedure->execute_query($parametros);

	if ($p_error){
		$resultado->resultado = $p_error;
	}

    foreach ($parametros as $key => $value) {
        $parametros[str_replace(':', '', $key)] = $value;
        unset($parametros[$key]);
    }

    $resultado->p_params = $parametros;

	echo json_encode($resultado);
?>