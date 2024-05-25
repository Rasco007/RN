<?php

error_reporting(E_ALL);
ini_set('display_errors', '0');

/**
 * Incluyo los archivos del framework (funciones, clases, etc)
 * Nota: los archivos se cargan relativos al raiz del framework.
 */

// Dependiendo del entorno cargamos la configuración correspondiente.
foreach(glob(AUTOLOAD."*.php") as $filename){
    require_once $filename;
}

if($_SESSION['entorno'] != 'SCF'){
	$frmwkAutoLoadFiles = array(
		"encrypt_match.php",
		"login.php",
		"db_query.php",
		"db_procedure.php",
		"db_pager.php",
		"db_llamada_prc.php",
		"db_llamada_fun.php",
		"query_loader.php",
		"security.php",
		"funciones.php"/*,
		"construir_menu.php"*/
	);
	
	loadFrameworkFiles($frmwkAutoLoadFiles);
}else{
	$scfAutoLoadFiles = array(
		"encrypt_match.php",
		"security.php"
	);
	
	loadFrameworkFiles($scfAutoLoadFiles);
	
    require SCF_FRAMEWORK.'funciones_webserv.php';
}

function loadFrameworkFiles($frmwkAutoLoadFiles){
	foreach($frmwkAutoLoadFiles as $file){
		//echo($file);
		$filePath = FUNCIONES_FRAMEWORK.$file;
		$optFilePath = FUNCIONES_FRAMEWORK_PROY.$file;
		
		if (file_exists($optFilePath)){
			//echo($optFilePath);
			$filePath = $optFilePath;
			//echo $filePath;
		}
		
		require_once $filePath;
	}
	//die();
}

?>