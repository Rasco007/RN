<?php
$wsAutoLoadFiles = array(
	"encrypt_match.php",
	"login.php",
	"db_query.php",
	"db_procedure.php",
	"db_pager.php",
	"db_llamada_prc.php",
	"db_llamada_fun.php",
	"query_loader.php",
	"security.php",
	"funciones.php"
);

foreach($wsAutoLoadFiles as $file){
	$filePath = FUNCIONES_FRAMEWORK.$file;
	$optFilePath = FUNCIONES_FRAMEWORK_PROY.$file;
	
	if (file_exists($optFilePath)){
		$filePath = $optFilePath;
	}
	
	require_once $filePath;
}

require_once WEBSERVICE_FRAMEWORK.'vendor/autoload.php';