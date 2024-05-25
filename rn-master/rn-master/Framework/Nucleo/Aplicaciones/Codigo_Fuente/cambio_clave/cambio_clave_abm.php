<?php
/*
error_reporting(E_ALL);
ini_set('display_errors', '1');*/
$c_usuario = $_POST['c_usuario'];

include(FRAMEWORK_DIR."Recursos/Aes/aes.class.php");

$aes = new AES();
$password = 'ClaveAes2015Dialog';
$blocksize = 256;  // can be 128, 192 or 256
$pass_vieja = AES::decrypt( $_POST['pass_vieja'], $password, $blocksize );
$pass_nueva = AES::decrypt( $_POST['pass_nueva'], $password, $blocksize );
$pass_nueva_rep = AES::decrypt( $_POST['pass_nueva_rep'], $password, $blocksize );

if((!$pass_vieja) or (!$pass_nueva_rep) or (!$pass_nueva)){
	$response->resultado = 'Debe completar todos los campos.';	
	echo json_encode($response);	
	die();
}

$parametros = array(':c_usuario' => $c_usuario, 
					':pass_vieja' => $pass_vieja,
					':pass_nueva' => $pass_nueva,
					':pass_nueva_rep' => $pass_nueva_rep,
					':id_rel_persona'=>$_SESSION[':id_rel_persona'],
					':p_error' => NULL, 
					':p_error_ora' => NULL);

$db_procedure = new DB_procedure('BEGIN PAC_SEGURIDAD.prc_cambia_clave(:c_usuario,:pass_vieja,:pass_nueva,:pass_nueva_rep,:id_rel_persona,:p_error,:p_error_ora);END;');

$response = $db_procedure->execute_query($parametros);

if($response->resultado == 'OK'){
	session_start();
	$_SESSION['clave_usuario'] = $pass_nueva;
}

echo (json_encode($response));

?>