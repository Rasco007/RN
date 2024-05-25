<?php

// Remueve el punto en el dirname
function safe_dirname($path) {
	$dirname = dirname($path);
	return $dirname == '.' ? '' : $dirname;
}

//*******************************	ESTRUCTURA PROYECTO	***************************************//
//Se define Funciones del Framework.
define('INTRANET',ROOT_DIR.'Intranet/');
define('INTRANET_BASEPATH',BASEPATH.'Intranet/');
define('CSS_INTRANET',INTRANET_BASEPATH.'CSS/');

//Se define Funciones del Framework.
define('EXTRANET',ROOT_DIR.'Extranet/');
define('EXTRANET_BASEPATH',BASEPATH.'Extranet/');
define('CSS_EXTRANET',EXTRANET_BASEPATH.'CSS/');
define('EXTRANET_WS',EXTRANET.'WebService/');
define('EXTRANET_WS_OP',EXTRANET_WS.'operations_ws/');

//SCF
define ('SCF',ROOT_DIR.'SCF/');
define ('SCF_BASE_PATH',BASEPATH.'SCF/');
define ('CSS_SCF',SCF_BASE_PATH.'CSS/');
define ('SCF_GENERICOS',SCF_BASE_PATH.'genericos/');

//FRMK DEFAULT
define('ENTORNO_FRMWK', 'FRAMEWORK');
define('ENTORNO_INTRANET', 'INTRANET');
define('ENTORNO_EXTRANET', 'EXTRANET');
define('ENTORNO_WEBSERVICE', 'WEBSERVICE');
define('ENTORNO_MANUALES', 'MANUALES');

define('APLICACIONES_FRMWK_DIR', 'APLICACIONES');

//******************************	 CARPETA FRAMEWORK		*******************************//
//Se define la Carpeta Framework,
define('FRAMEWORK_FOLDER_DIR',ROOT_DIR.'Framework/');
define('FRAMEWORK_FOLDER_BASEPATH',BASEPATH.'Framework/');

define('FRAMEWORK_DIR',FRAMEWORK_FOLDER_DIR.'Nucleo/');
define('FRAMEWORK_BASEPATH',FRAMEWORK_FOLDER_BASEPATH.'Nucleo/');

define('SCF_FRAMEWORK',FRAMEWORK_DIR.'SCF/');
define('APLICACIONES_FRAMEWORK',FRAMEWORK_DIR.'Aplicaciones/');
define('APP_FMK_BASEPATH',FRAMEWORK_BASEPATH.'Aplicaciones/');

define('CONFIG_FRAMEWORK',FRAMEWORK_DIR.'Config/');

define('CSS_FRAMEWORK',FRAMEWORK_BASEPATH.'CSS/');

define('FUNCIONES_FRAMEWORK',FRAMEWORK_DIR.'Funciones/');
define('FUNCIONES_BASEPATH',FRAMEWORK_BASEPATH.'Funciones/');

define('IMAGENES_FRAMEWORK',FRAMEWORK_BASEPATH.'Imagenes/');

define('JS_FRAMEWORK',FRAMEWORK_BASEPATH.'JS/');
define('HTML_FRAMEWORK',FRAMEWORK_DIR.'HTML/');

define('RECURSOS_FRAMEWORK',FRAMEWORK_BASEPATH.'Recursos/');
define('RECURSOS_FRAMEWORK_DIR',FRAMEWORK_DIR.'Recursos/');

define('BASESERVICE_FRAMEWORK',FRAMEWORK_BASEPATH.'WebService/');
define('WEBSERVICE_FRAMEWORK',FRAMEWORK_DIR.'WebService/');

define('FRAMEWORK_PROYECTO_DIR',FRAMEWORK_FOLDER_DIR.'Proyecto/');
define('FRAMEWORK_PROYECTO_BASEPATH',FRAMEWORK_FOLDER_BASEPATH.'Proyecto/');

define('APLICACIONES_FRAMEWORK_PROY',FRAMEWORK_PROYECTO_DIR.'Aplicaciones/');
define('APP_FMK_BASEPATH_PROY',FRAMEWORK_PROYECTO_BASEPATH.'Aplicaciones/');

define('CONFIG_FRAMEWORK_PROY',FRAMEWORK_PROYECTO_DIR.'Config/');

define('CSS_FRAMEWORK_PROY',FRAMEWORK_PROYECTO_BASEPATH.'CSS/');

define('FUNCIONES_FRAMEWORK_PROY',FRAMEWORK_PROYECTO_DIR.'Funciones/');
define('FUNCIONES_BASEPATH_PROY',FRAMEWORK_PROYECTO_BASEPATH.'Funciones/');

define('IMAGENES_FRAMEWORK_PROY',FRAMEWORK_PROYECTO_BASEPATH.'Imagenes/');

define('JS_FRAMEWORK_PROY',FRAMEWORK_PROYECTO_BASEPATH.'JS/');
define('HTML_FRAMEWORK_PROY',FRAMEWORK_PROYECTO_DIR.'HTML/');

define('RECURSOS_FRAMEWORK_DIR_PROY',FRAMEWORK_PROYECTO_DIR.'Recursos/');
define('RECURSOS_FRAMEWORK_PROY',FRAMEWORK_PROYECTO_BASEPATH.'Recursos/');

define('BASESERVICE_FRAMEWORK_PROY',FRAMEWORK_PROYECTO_BASEPATH.'WebService/');
define('WEBSERVICE_FRAMEWORK_PROY',FRAMEWORK_PROYECTO_DIR.'WebService/');

//******************************	 CONSTANTES ARCHIVO		*******************************//
// Ruta del php en ejecución.
define('URL_FILE',$_SERVER['PHP_SELF']);

// Nombre del archivo PHP
define('FILENAME', basename(URL_FILE));

//******************************	 CONSTANTES ENTORNO		*******************************//
//Dependiendo del entorno, la constante de directorio del entorno actual es diferente.
if($_SESSION['entorno']=='INTRANET'){
	define('ENTORNO_DIR',INTRANET);
	define('BASEPATH_ENTORNO', BASEPATH.'Intranet/');
	define('MANUALES_DIR',ROOT_DIR.'Manuales/Intranet/');
	define('MANUALES_BASEPATH',BASEPATH.'Manuales/Intranet/');
}
else if ($_SESSION['entorno']=='EXTRANET') {
	define('ENTORNO_DIR',EXTRANET);
	define('BASEPATH_ENTORNO', BASEPATH.'Extranet/');
	define('MANUALES_DIR',ROOT_DIR.'Manuales/Extranet/');
	define('MANUALES_BASEPATH',BASEPATH.'Manuales/Extranet/');
}
else if($_SESSION['entorno']=='WEBSERVICE'){
	define('ENTORNO_DIR',EXTRANET);
	define('BASEPATH_ENTORNO', BASEPATH.'Extranet/');
}else if($_SESSION['entorno']=='SCF'){
	define('ENTORNO_DIR', SCF);
	define('BASEPATH_ENTORNO', BASEPATH.'SCF/');
}

define('MANUALES_SCF_DIR',ROOT_DIR.'Manuales/SCF/');
define('MANUALES_SCF_BASEPATH',BASEPATH.'Manuales/SCF/');

define('APLICACIONES',ENTORNO_DIR.'Aplicaciones/');
define('APLICACIONES_BASEPATH',BASEPATH_ENTORNO.'Aplicaciones/');

define('AUTOLOAD',ENTORNO_DIR.'Autoload/');

/*** constantes definidas para la encriptacion ***/
define ("SEGURIDAD", array('=', ';', '(', ')', '{', '}', '<', '>', '"', '\'', '%3D', '%3B', '%28', '%29', '%7B', '%7D', '%3C', '%3E', '%22', '%27', '&#61', '&#59', '&#40', '&#41', '&#123', '&#125', '&#60', '&#62', '&#34', '&#39'));
define('SEPARATOR_TYPE', array("/","-","."));

define('REEMP_QUERY', '¬valor¬');
define('REEMP_LISTA', '¬p_lista¬');
define('REEMP_OPERADOR', '¬p_operador¬');
define('REEMP_PVALOR', '¬p_valor¬');

/**** defines con signos **/
define('NOT_PLISTA', '¬p_filtro_lista');
define('NOT_SIGN', '¬');
define('NNULL', '\'null\'');
define('ESC_PFILTRO', '\':p_filtro_lista');
define('ESC_CHAR', '\'');
define('ESC_BAR', '\\');
define('DOBLE_ESC', "\\'");
define('TRIPLE_ESC', "\\\"");
define('SINGLE_ESC', "\"");
define('DOBLE_SINGQUOTE', "''");
define('DOBLE_BARP', "/./");

/*** defines para preg_match y regex */
define('VAL_NUMERICO', "/^-?[0-9]{0,12}([,][0-9]{2,2})?$/");
define('VAL_IMPORTE', "/^-?[0-9]{1,3}(\.[0-9]{3})*(,[0-9]+)?$/");
define('VAL_ENTERO', "/^-?[0-9]*$/");
define('VAL_PORC' ,"/^100$|100,00$|^[0-9]{1,2}$|^[0-9]{1,2}\,[0-9]{1,2}$/");
define('VAL_HORA' ,"/^[0-2][0-9]:[0-5][0-9]$/");

/** Variables para servicios WSASS de AFIP **/
//Parametros de autenticación
/** Variables para libreria de AFIP */
define("AFIP_ROOT_DIR", ROOT_DIR."Framework/Nucleo/Funciones/AFIP/");
define("AFIP_BASEPATH", BASEPATH."Framework/Nucleo/Funciones/AFIP/");

/* -->  Variables para servicios WSASS de AFIP **/
define("WSAA_WSDL", "WSDL/wsaa.wsdl"); //WSDL del Web Service de Autorización y Autenticación

/* --> Variables para servicios de Facturación Electronica de AFIP */
define("FA_WSDL", "WSDL/facturaElectronica.wsdl"); //WSDL del Web Service de Autorización y Autenticación

define ("AFIP_PUBKEY", CONFIG_FRAMEWORK_PROY."auth-homologacion.pem");
?>