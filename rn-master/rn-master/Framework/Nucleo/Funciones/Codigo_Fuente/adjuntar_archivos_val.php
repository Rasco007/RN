<?php
	//checklogin();

	$oper = $_POST['oper'];

	//---------------------------------------------------------------------------------------------------------------
	// Devuelve datos para realizar validaciones antes de subir el archivo
	//---------------------------------------------------------------------------------------------------------------
	if ($oper == 'VAL_REQ') {
		session_write_close();
		$cod_archivo = $_POST['cod_archivo'];


		$sql = "select d_dato2 TAM_MB, d_dato3 EXTENSIONES
						from tablas_Generales t, parametros p
						where t.n_tabla = p.n_tabla and
							  p.c_constante = 'PATH_ARCHIVOS' and
							  t.c_dato = :cod_archivo";

		$db_query = new DB_Query($sql);
		$parametros = array(':cod_archivo' => $cod_archivo);
		$row_query = $db_query->do_query($parametros);

		$result['tam_mb'] = $row_query[0]['TAM_MB'];
		$result['extensiones'] = $row_query[0]['EXTENSIONES'];
		session_start();
		echo json_encode($result);
	}

	//---------------------------------------------------------------------------------------------------------------
	// Verifica existencia de archivo
	//---------------------------------------------------------------------------------------------------------------
	elseif ($oper == 'ARCH_EXISTENTE') {
		session_write_close();
		$cod_archivo = $_POST['cod_archivo'];
		$archivo_dest = $_POST['archivo_dest'];

		$sql = "select d_dato PATH_DESTINO
						from tablas_Generales t, parametros p
						where t.n_tabla = p.n_tabla and
							  p.c_constante = 'PATH_ARCHIVOS' and
							  t.c_dato = :cod_archivo";

		$db_query = new DB_Query($sql);
		$parametros = array(':cod_archivo' => $cod_archivo);
		$row_query = $db_query->do_query($parametros);

		$archivo_dest = $row_query[0]['PATH_DESTINO'] . $archivo_dest;

		$result['existe']= file_exists(ROOT_DIR.$archivo_dest);
		$result['path_completo']= $archivo_dest;
		session_start();
		echo json_encode($result);
	}

?>
