<?php
session_start();
$p_id_imagen = $_REQUEST['id_imagen'];
$p_modo = $_REQUEST['modo'];



$db_query = new DB_Query();

try {   
    if ($p_modo == 'PDF') {
        $sql = "begin
                    SELECT b_imagen_pdf,
                    '.jpg' AS ext
                    INTO :arch, :ext
                    FROM IMAGENES_EMISION_MASIVA
                    WHERE id_imagen = :id_imagen;
                end;";
    } else {
        $sql = "begin
                    SELECT b_imagen,
                    '.jpg' AS ext
                    INTO :arch, :ext
                    FROM IMAGENES_EMISION_MASIVA
                    WHERE id_imagen = :id_imagen;
                end;";
    }
    
	$param[':ext'] = null;
    $param[':id_imagen'] = $p_id_imagen;
	$param_blob = array(':arch' => null);
	$db_query->setQuery($sql);
	$db_query->do_query($param, OCI_ASSOC, $arr, $param_blob);
	$nombre_archivo = 'img_'.$_SESSION['usuario'];
    
	$ext = $param[':ext'];
	$datos_blob = $param_blob[':arch'];
	$codigo = $p_id_imagen;
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