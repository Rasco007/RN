<?php
session_start();
$_SESSION['entorno'] = 'WEBSERVICE';
require_once 'funciones_webserv.php';

$param = $_POST;

if (defined (SECRETKEY)){
	$param_validate['secret'] = SECRETKEY;
	$param_validate['response'] = $_POST['g-recaptcha-response'];
	//$param_validate['remoteip'] = 


	$ch = curl_init();

	curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_TIMEOUT, 100);
	curl_setopt($ch, CURLOPT_POST, true);
	curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($param_validate));
	curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
	curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
	$jsonData = curl_exec($ch);
	//ERROR
	$err     = curl_errno($ch);
	$errmsg  = curl_error($ch) ;
	$header  = curl_getinfo($ch);

	//die($jsonData);

	$objData = json_decode($jsonData);
	if ($objData->success){
		$json = ejecutar_curl(WEBSERVICE_URL.'maestro_abm/', $param);
	}else{
		$ret->resultado = 'Error al validar el Captcha. Intentelo nuevamente más tarde';
		$json = json_encode($ret);
	}
} else {
	$json = ejecutar_curl(WEBSERVICE_URL.'maestro_abm/', $param);
}

echo $json;

?>