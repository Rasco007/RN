<?php
$user = $_POST['user']; //Usuario a Clonar

//Parametros para el primer PRC
$parametros[':oper'] = 'add';
$parametros[':id_rel_persona'] = fun_dato_base($_POST['id_rel_persona_clone'],'N');
$parametros[':c_usuario'] = fun_dato_base($_POST['user_clone'],'T');
$parametros[':d_denominacion'] = fun_dato_base($_POST['d_denominacion'],'T');
$parametros[':f_baja'] = $_POST['f_baja'];
$parametros[':f_caducidad_clave'] = $_POST['f_caducidad_clave'];
$parametros[':d_mail'] = fun_dato_base($_POST['d_mail'],'T');
$parametros[':d_sello'] = fun_dato_base($_POST['d_sello'],'T');
$parametros[':m_log'] = fun_dato_base($_POST['m_log'],'T');
$parametros[':c_tipo_usuario'] = fun_dato_base($_POST['c_tipo_usuario'],'T');
$parametros[':p_error'] = null;
$parametros[':p_error_ora'] = null;

//Parametros para el segundo PRC
$params[':id_rel_persona_clone'] = fun_dato_base($_POST['id_rel_persona_clone'],'N');
$params[':user_clone'] = fun_dato_base($_POST['user_clone'],'T');
$params[':user_old'] = fun_dato_base($user,'T');
$params[':id_rel_persona'] = fun_dato_base($_POST['id_rel_persona'],'N');
$params[':p_error'] = null;
$params[':p_error_ora'] = null;

// Generamos la contrasena
$sql_c = "select pac_encripta.generar_contrasena(8) as password from dual";

$db_query = new DB_Query($sql_c);
$par = array( null );
$password = $db_query->do_query($par);

if($password){
	$parametros[':c_clave'] = $password[0]['PASSWORD'];
	$db_query = new DB_Procedure(
		"begin PAC_SEGURIDAD.PRC_ABM_USUARIO(
				:oper, 
				:id_rel_persona, 
				:c_usuario,
				:d_denominacion,
				:f_baja,
				:f_caducidad_clave,
				:d_mail,
				:d_sello,
				:c_clave,
				:m_log,
				:c_tipo_usuario,
				:p_error,
				:p_error_ora
			);
			END;"
	);

	$resultado = $db_query->execute_query($parametros);
	$resultado->parametros = $parametros;

	if($resultado->resultado != 'OK'){
		echo json_encode($resultado);
		die();
	}else{

		$clone_prc = new DB_Procedure(
			"begin PAC_SEGURIDAD.PRC_CLONE_USER(
					:user_old,
					:user_clone,
					:id_rel_persona,
					:id_rel_persona_clone,
					:p_error,
					:p_error_ora
				); 
				END;"
		);
		$result = $clone_prc->execute_query($params);
		$result->parametros = $parametros;

		if($result->resultado != 'OK'){
			$db_query->db_query->db_rollback();
		}

		echo json_encode($result);
		die();
	}
}else{
	$resultado->resultado = "Error al generar el password. Por favor intentelo mas tarde";
}

echo json_encode($resultado);
?>