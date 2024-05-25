<?php

    $db_query = new DB_Query();
    $db_validate_query = new DB_Query();

    $id_imagen = $_GET['id_imagen'];
    $p_modo = $_GET['modo'];

    // Saco el archivo (no se el nombre)
    foreach($_FILES as $value)
        $archivo = $value;

    
    $allowedExts = array("gif", "jpeg", "jpg", "png","pdf");
    $temp = explode(".", $archivo["name"]);
    $extension = strtolower(end($temp));
    if (in_array($extension, $allowedExts)) {

        if($archivo['error'] !==  UPLOAD_ERR_OK) {
            $arr[UPLOAD_ERR_INI_SIZE] = 'El tamaño del archivo es demasiado grande.';
            $arr[UPLOAD_ERR_FORM_SIZE] = 'El tamaño del archivo es demasiado grande.';
            $arr[UPLOAD_ERR_PARTIAL] = 'El archivo solo pudo ser parcialmente cargado.';
            $arr[UPLOAD_ERR_NO_FILE] = 'No se ha cargado ningún archivo.';
            $arr[UPLOAD_ERR_NO_TMP_DIR] = 'No se ha definido una carpeta temporal.';
            $arr[UPLOAD_ERR_CANT_WRITE] = 'No se ha podido escribir el archivo en el servidor.';
            $arr[UPLOAD_ERR_EXTENSION] = 'No se ha podido cargar el archivo.';
            $response->resultado = $arr[$archivo['error']];
            die(json_encode($response));
        }
		

		$sql_validate = "SELECT COUNT(*)
								 FROM IMAGENES_EMISION_MASIVA
								 WHERE id_imagen = :id_imagen";
        if ($p_modo == 'PDF') {
            $sql = "UPDATE IMAGENES_EMISION_MASIVA
            set b_imagen_pdf = EMPTY_BLOB()
            where id_imagen = :id_imagen
            RETURNING b_imagen_pdf INTO :blobdata";
        } else {
            $sql = "UPDATE IMAGENES_EMISION_MASIVA
            set b_imagen = EMPTY_BLOB()
            where id_imagen = :id_imagen
            RETURNING b_imagen INTO :blobdata";
        }

        $param = array(
			':id_imagen' => $id_imagen,
		);

        $db_validate_query->setQuery($sql_validate);
        $resp = $db_validate_query->do_query($param);

        if($resp[0]['EXISTE'] == 'S'){
            $response->resultado = 'El código de la Imagen ya existe';
            die(json_encode($response));
        }

        $db_query->setQuery($sql);

        $param_blob = array(':blobdata' => $blob);

        try{
            $db_query->do_query($param,OCI_ASSOC,$param_array = null,$param_blob);
            $param_blob[':blobdata']->savefile($archivo['tmp_name']);
            $db_query->db_commit();
            $param_blob[':blobdata']->close();
            $response->resultado = 'OK';
            echo json_encode($response);
        }catch(Exception $error) {
            $response->resultado = $error->getMessage();
            die(json_encode($response));
        }

	}else{
        $response->resultado = 'El archivo seleccionado no es un archivo válido. Debe seleccionar un archivo del tipo "gif", "jpeg", "jpg" o "png"';
        echo json_encode($response);
    }


?>