<?php
session_start();
$p_c_codigo = $_REQUEST['c_codigo'];

$db_query = new DB_Query();

try {
		$sql = "begin
                        SELECT img.b_imagen AS b_imagen,
                               img.c_imagen AS c_imagen,
                               '.png' AS ext
                               INTO :arch, :c_codigo, :ext
                         FROM imagenes img
                         WHERE img.c_imagen = :c_codigo;
                    end;";

	$param[':ext'] = null;
	$param[':c_codigo'] = $p_c_codigo;
	$param_blob = array(':arch' => null);
	$db_query->setQuery($sql);
	$db_query->do_query($param, OCI_ASSOC, $arr, $param_blob);
	$nombre_archivo = 'img_'.$_SESSION['usuario'];

	$ext = $param[':ext'];
	$datos_blob = $param_blob[':arch'];
	$codigo = $param[':c_codigo'];
	$basepath = INTRANET.'archivos_tmp/';
	if (!file_exists($basepath)) {
		mkdir($basepath);
	}
	//$file = '../../../archivos_tmp/'.$nombre_archivo.$codigo.$ext;
	$file = $basepath.$nombre_archivo.$codigo.$ext;
	unlink($file);
	$resp= file_put_contents($file,$datos_blob->load());

	$respuesta->nombre_archivo = $nombre_archivo.$codigo.$ext;
	$respuesta->resultado = 'OK';
} catch (Exception $e) {
	$respuesta->advert = 'ERROR al recuperar imagen: '.$e;
	$respuesta->resultado = 'ERROR';
}

echo json_encode($respuesta);
//-----------------------------------------------------------------------------//
?>