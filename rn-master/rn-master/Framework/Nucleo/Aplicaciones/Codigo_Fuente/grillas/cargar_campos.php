<?php
$p_id_grilla = $_REQUEST["p_id_grilla"];
$p_d_tabla = $_REQUEST["p_d_tabla"];
$p_oper = $_REQUEST["p_oper"];

if ($p_oper == 'aplicar'){

    $p_c_columnas = htmlentities($_POST['p_c_columnas']);

    $parametros = array(
					':p_c_columnas' => $p_c_columnas,
					':p_error' => NULL,
					':p_error_ora' => NULL
				);

    $sql = "BEGIN PAC_PHP_GRILLAS.PRC_APLICAR_CAMPOS_DESDE_TABLA(
                                            :p_c_columnas,
											:p_error,
											:p_error_ora
										)
										;END;";
    //die($sql);
    $db_procedure = new DB_procedure($sql);
    $response = $db_procedure->execute_query($parametros);
    echo json_encode($response);
}

if ($p_oper == 'cargar'){
	$p_d_tabla = str_replace("'","",$p_d_tabla);
    $p_d_tabla = str_replace('"','',$p_d_tabla);

    $parametros = array(
					':p_d_tabla' => $p_d_tabla,
					':p_id_grilla' => $p_id_grilla,
					':p_error' => NULL,
					':p_error_ora' => NULL
				);



    $sql = "BEGIN PAC_PHP_GRILLAS.PRC_CARGAR_CAMPOS_DESDE_TABLA(
											:p_d_tabla,
											:p_id_grilla,
											:p_error,
											:p_error_ora
										)
										;END;";
    //die($sql);
    $db_procedure = new DB_procedure($sql);
    $response = $db_procedure->execute_query($parametros);
    echo json_encode($response);
}
?>