<?php

/**
 * Carga automática de las funciones, clases y configuración del framework
 */

//Iniciamos la sesión del usuario
session_start();


$_SESSION['entorno'] = 'WEBSERVICE';

// Incluyo scripts de configuración de constantes de PATH (está en framework/config)
require_once '../../Proyecto/Config/path-conf.php';
require_once '../Config/path-conf.php';

// Autoload (carga automáticamente archivos necesarios del sistema)
require 'core/autoload_ws.php';

// Llamamos al Archivo originalmente solicitado.

//require str_replace('Framework/WebService/','',$_GET['original_url']);
require str_replace('Framework/Nucleo/WebService/','',$_GET['original_url']);

//Seteamos tiempo de sesión.
resetear_tiempo_sesion();


?>