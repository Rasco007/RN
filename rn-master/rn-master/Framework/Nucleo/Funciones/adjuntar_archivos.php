	<?php
	session_write_close();
	$oper = $_POST['oper'];
	$cod_archivo = $_POST['adj_cod_archivo'];
	$arch_destino = $_POST['adj_archivo_dest'];
	$campo_nom_original = $_POST['adj_campo_nom_original'];
	$campo_path_dest = $_POST['adj_campo_path_dest'];

	if ($oper == 'SUBIR' && (isset($_FILES))) {

		$sql = "select d_dato2 TAM_MB, d_dato3 EXTENSIONES
  					from tablas_Generales t, parametros p
  					where t.n_tabla = p.n_tabla and
						  p.c_constante = 'PATH_ARCHIVOS' and
						  t.c_dato = :cod_archivo";

		$db_query = new DB_Query($sql);
		$parametros = array(':cod_archivo' => $cod_archivo);
		$row_query = $db_query->do_query($parametros);

		$tamaño_max_mb = $row_query[0]['TAM_MB'];
		$ext_permitidas = explode(";", $row_query[0]['EXTENSIONES']);


		$tamano = $_FILES["file_adj_archivo"]['size'] / 1024 / 1024;
		$nom_archivo = $_FILES["file_adj_archivo"]['name'];
		$info = new SplFileInfo($nom_archivo);
		$ext = strtoupper($info->getExtension());

		if ($tamaño_max_mb == '' || $ext_permitidas == '')
		   $resu= 'No se pudo encontrar la parametrización del código de archivo: '.$cod_archivo;

		elseif ($tamano > $tamaño_max_mb)
			$resu= 'El tamaño del archivo ('.
					round($tamano, 1, PHP_ROUND_HALF_UP).
					' MB) excede el permitido de hasta '.$tamaño_max_mb.' MB.';

		elseif (!in_array($ext, $ext_permitidas))
			$resu= 'El archivo ('.$ext.') no es del tipo permitido: '.	implode(",", $ext_permitidas);

		else {
			// Si el directorio donde hay que guardar el archivo no exist se crea
			$pos_ant= 1;
			do {
				$pos = strpos($arch_destino, "/", $pos_ant);
				if ($pos === false)
					$pos = strpos($arch_destino, "\\", $pos_ant);

				if ($pos !== false){
					$pos_ant= $pos+1;
					$directorio = ROOT_DIR.substr($arch_destino, 0, $pos);
					if(!is_dir($directorio))
						mkdir($directorio);
				}
			}while ($pos !== false);


			//$resu=$arch_destino.' - '.$tamaño_max_mb.' - '.$ext_permitidas;

			// Pasando el archivo del directorio temporal en donde PHP deja el archivo,
			// al directorio destino con el nombre indicado en $arch_destino
			if (move_uploaded_file($_FILES['file_adj_archivo']['tmp_name'], ROOT_DIR.$arch_destino)) {
				$resu = "OK";
			} else {
					$resu = "Se ha producido un error al subir el archivo. <br/>(".
							$nom_archivo.' - '.$tamaño_max_mb.' - '.$ext_permitidas.')';
			}

		}

	}

	//---------------------------------------------------------------------------------------------------
	else if ($oper == 'ELIMINAR') {
		if (unlink(ROOT_DIR.$arch_destino)){
			$resu= 'OK';
		}
		else{
			$index = strrpos($arch_destino, '/');
			$nombre_archivo = substr($arch_destino, $index + 1, $index);
			$resu= 'No se pudo eliminar el archivo: '.$nombre_archivo;//: '.$arch_destino;  Comentado ya que muestra el path del servidor
		}
	}
	session_start();
	echo "<script type='text/javascript'>
			parent.resultadoUpload('".$oper."','".$resu."','".$campo_nom_original."','".$campo_path_dest."');
		</script>";
?>
