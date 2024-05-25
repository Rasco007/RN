<?php
/**
 * Carga automática de las funciones, clases y configuración del framework
 */

//Iniciamos la sesión del usuario
session_start();

$_SERVER['PHP_SELF'] = '../'.$_GET['original_url'];
$v = explode('/', $_GET['original_url']);
$entorno = strtoupper($v[0]);
$sub_entorno = strtoupper($v[1]);

if($entorno == 'SCF'){
	$_SESSION['entorno'] = 'SCF';

	// Incluyo scripts de configuración de constantes de PATH
	require '../Proyecto/Config/path-conf.php';
	require '../Nucleo/Config/path-conf.php';
	// Autoload (carga automáticamente archivos necesarios del sistema)
	require CONFIG_FRAMEWORK.'autoload.php';

} else {

	if($_GET['original_url'] == 'Intranet/index.php' || $_GET['original_url'] == 'Extranet/index.php')
		$_SESSION['entorno'] = $entorno;

		
	if (isset($_SESSION['entorno_logeado']))
		$_SESSION['entorno'] = $_SESSION['entorno_logeado'];
	
	//Para casos de aplicaciones que de scf se dirigen a extranet sin login
	if ($_SESSION['entorno'] == 'SCF')
		$_SESSION['entorno'] = 'WEBSERVICE';

	// Incluyo scripts de configuración de constantes de PATH
	require '../Proyecto/Config/path-conf.php';
	require '../Nucleo/Config/path-conf.php';

	// Autoload (carga automáticamente archivos necesarios del sistema)
	require CONFIG_FRAMEWORK.'autoload.php';

	$v = explode('/', $_GET['original_url']);
	$file = $v[count($v)-1];

	if ($file != 'index.php'){

		if ( (noLogeado($_SESSION['logeado']) && (!$_SESSION['scf'])) || pasajeInvalido($_SESSION['entorno_logeado'], $entorno, $_SESSION['scf']))
			disconnect('Forbidden');
		
		//IF para considerar el caso que me encuentro simultaneamente en Intranet y SCF, y se realiza solicitudes de las app del frmwk
		if (($_SESSION['scf']) && ($_SESSION['entorno_logeado'] == ENTORNO_INTRANET) && esAplicacionFramework($entorno, $sub_entorno))
			$_SESSION['entorno'] = $_SESSION['entorno_logeado'];
		
		if ( esAplicacionFramework($entorno, $sub_entorno) && (! entornoValidoAplicacionFramework($_SESSION['entorno_logeado']) ) )
			disconnect('Forbidden');
		
	}

	$manual = false;
	if ( ($entorno == ENTORNO_MANUALES) && (esPDF($file) || esDescargable($file))){
		$manual = true;
		
		if ($sub_entorno != $_SESSION['entorno_logeado'])
			disconnect('Forbidden');
	}

	if(strpos($file, '.js') || strpos($file, '.jpg') || strpos($file, '.png')|| strpos($file, '.gif')|| strpos($file, '.css') == false){
		checklogin();
	}

	if ($manual){
		$ruta_manual = MANUALES_DIR.$file;
		
		if (! file_exists($ruta_manual) )
			die("El manual ".$file." no se encuentra disponible. Vuelva a intentarlo más tarde o comuníquese con el personal correspondiente.");

		if (esPDF($file)){
			header("Content-type: application/pdf");
			header("Content-Disposition: inline; filename=$file");
		}else{
			header('Content-Type: application/vnd.openxmlformats-officedocument.wordprocessingml.document');
			header('Content-Disposition: attachment; filename='.$file.'');
			header('Content-Length: ' . filesize($ruta_manual));
		}
		
		@readfile($ruta_manual);
	}
}
// Llamamos al Archivo originalmente solicitado.
require ROOT_DIR.$_GET['original_url'];

//Seteamos tiempo de sesión.
resetear_tiempo_sesion();

function noLogeado($logeado){
	return (!$logeado);
}

function pasajeInvalido($entorno_logeado, $entorno_url, $scf){
	session_start();
	//Desde SCF se habilita el pasaje a Extranet (Ejemplo soli_clave_fiscal)
	
	if ($scf && (($entorno_url == ENTORNO_EXTRANET && $_SESSION['entorno_logeado'] != ENTORNO_INTRANET) || $entorno_url == ENTORNO_FRMWK)){ 
		//$_SESSION['entorno'] = ENTORNO_EXTRANET;
		return false;
	}
	
	$entorno_log_requerido = array(
								ENTORNO_FRMWK => array(ENTORNO_INTRANET, ENTORNO_EXTRANET),
								ENTORNO_MANUALES => array(ENTORNO_INTRANET, ENTORNO_EXTRANET),
								ENTORNO_INTRANET => array(ENTORNO_INTRANET),
								ENTORNO_EXTRANET => array(ENTORNO_EXTRANET)
	);
	
	return (! in_array($entorno_logeado, $entorno_log_requerido[$entorno_url]));
}

function esAplicacionFramework($entorno, $sub_entorno){
	return (($entorno  == ENTORNO_FRMWK) && ($sub_entorno == APLICACIONES_FRMWK_DIR));
}

function entornoValidoAplicacionFramework($entorno_logeado){
	$entornos_valido_frmwk_app = array(ENTORNO_INTRANET);
	return (in_array($entorno_logeado, $entornos_valido_frmwk_app));
}

function esPDF($file){
	return (strpos($file, '.pdf') !== false);
}

function esDescargable($file){
    //para evaluar si el archivo es para descargar, por ahora pongo solo los DOCX, pero se pueden ir agregando otros...
    $descargable = strpos($file, '.docx') !== false;

    return ($descargable);
}

?>