<?php
    session_write_close();
	$db_query = new DB_Query();

	$id_sesion_enc = $_GET['id_sesion'];
	$imp = nvl($_GET['c_impresion'],'PDF');
	$wsdl = buscar_parametro('JSR_REPO');
	$username = buscar_parametro('JSR_UNAME');
	$password = buscar_parametro('JSR_PASSWD');
	$report_dir = buscar_parametro('JSR_REP_DIR');
	$format = $_GET['format'];	//variable de impresion de JASPER
	
	if($format == null || $format == ''){
		$format = 'PDF';
	}

	$db_query->setQuery(
		"SELECT d_url, d_parametros_report, id_sesion
		FROM web_llamadas
		WHERE id_sesion_enc = :id_sesion_enc"
	);

	$param = array(':id_sesion_enc' => $id_sesion_enc);
	$vaRow = $db_query->do_query($param);

    $id_sesion = $vaRow[0]['ID_SESION'];
	if (strpos($vaRow[0]['D_URL'], 'http://') === false) {
		$report = $vaRow[0]['D_URL'];
		$parametros = $vaRow[0]['D_PARAMETROS_REPORT'];

        header('Content-type: application/pdf');
        header('Content-Disposition: attachment; filename="'.$_GET['name'].'"');
        $url = $wsdl.$report_dir.$report.'.pdf?p_id_sesion='.$id_sesion;
		
		$url = $url.'&j_username='.$username.'&j_password='.$password;
		
		ini_set('default_socket_timeout', 600);
		ini_set('memory_limit', '500M');

		logear(__LINE__);
		//copy($url,ROOT_DIR.'DOC_ADJUNTOS/tmp/prueba.pdf');
        readfile($url);
		logear(__LINE__);
	}else if($imp == 'PDF'){
		logear(__LINE__);
		$url = $vaRow[0]['D_URL'];


        header('Content-Disposition: attachment; filename="'.$_GET['name'].'"');
        header('Content-type: application/pdf');
		
		ini_set('default_socket_timeout', 600);
		ini_set('memory_limit', '500M');
		logear(__LINE__);
		readfile($url);
		logear(__LINE__);
	}else{
		die($vaRow[0]['D_URL']);
	}
	
function logear($linea){
	
	global $id_sesion;
	global $wsdl;
	global $report;
	global $parametros;
	//global $id_log;

		$db_procedure = new DB_Query("BEGIN
										INSERT INTO log_jasper(id_log_jasper, id_sesion, server, report, parametros, fecha_inicio, fecha_fin, n_linea)
										VALUES(id_log_jasper.nextval, :id_sesion, :server, :report, :parametros, sysdate, null, :linea);
										commit;
									  END;");
		$parametros2 = array(
			':id_sesion' => $id_sesion,
			':server' => $wsdl,
			':report' => $report,
			':parametros' => $parametros,
			':linea' => $linea
		);
	
	$resultado = $db_procedure->do_query($parametros2);
}

?>