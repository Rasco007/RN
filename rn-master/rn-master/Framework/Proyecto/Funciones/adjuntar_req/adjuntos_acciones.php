<?php
$_POST['p_n_id_menu'] = 42;
$function = $_REQUEST['action'];

switch ($function) {
    case 'levantarTMP':
        try{

            $p_id_solicitud_requisito = $_REQUEST['p_id_solicitud_requisito'];
            $p_c_tipo_param_req = $_REQUEST['p_c_tipo_param_req'];
            $p_id_param_req = $_REQUEST['p_id_param_req'];
            $p_c_estado = $_REQUEST['p_c_estado'];

            $tamanoArchivo = (($_FILES['file']['size'] / 1024) / 1024);
            $tamanoServidor = (file_upload_max_size()/1024/1024);

            if($tamanoArchivo > $tamanoServidor || $tamanoArchivo == 0) {
                throw new Exception('Verifique que el tamaño del archivo no sea superior a '.$tamanoServidor .'Mb');
            }             

            if (
                is_null($p_c_tipo_param_req)
                || is_null($p_c_tipo_param_req)
                || is_null($p_c_tipo_param_req)
                || is_null($p_c_tipo_param_req) ){

                throw new Exception('Verifique que el tamaño del archivo no sea superior a '.file_upload_max_size()/1024/1024 .'Mb');
            }

            echo(json_encode(uploadFileTMP($p_id_solicitud_requisito, $p_c_tipo_param_req, $p_id_param_req, $p_c_estado)));
        }catch (Exception $e){
            $respuesta->respuesta = 'ERROR';
            $respuesta->advert = 'Se genero un error durante el proceso de subida de documento: </br>'.$e->getMessage();
            die(json_encode($respuesta));
        }
        break;
    case 'viewFile':
        $v_id_documento = $_REQUEST['p_id_documento'];
        try{
            echo(json_encode(viewFile($v_id_documento)));
        }catch (Exception $e){
            $respuesta->respuesta = 'ERROR';
            $respuesta->advert = 'Se genero un error durante el proceso de lectura de documento: </br>'.$e->getMessage();
            die(json_encode($respuesta));
        }
        break;
    case 'deleteFile':
        $v_id_documento = $_REQUEST['p_id_documento'];
        try{
            echo(json_encode(deleteFile($v_id_documento)));
        }catch (Exception $e){
            $respuesta->respuesta = 'ERROR';
            $respuesta->advert = 'Se genero un error durante el proceso de borrado de documento: </br>'.$e->getMessage();
            die(json_encode($respuesta));
        }
        break;
}

function uploadFileTMP($p_id_solicitud_requisito, $p_c_tipo_param_req, $p_id_param_req, $p_c_estado){

    if (isset($_FILES)) {

        if ($p_c_tipo_param_req == 'GEN') {
            /*SE RECUPERA PATH DEL DIRECTORIO EN EL SERVIDOR*/
            $sql = "select  pgr.c_categoria, pgr.d_url_tmp,  pgr.d_url_def, tg.d_dato1 d_dato1, tg.d_dato2 d_dato2
                            from ppal.solicitudes_requisitos sr
                            inner join ppal.param_grupo_requisitos pgr using (c_grupo_req)
                            inner join ppal.PARAM_REQ_genericos prp USING (c_grupo_req)
                            INNER JOIN TABLAS_GENERALES TG  ON  tg.n_tabla = n_tabla_c_req_det  and c_req_det = tg.c_dato
                            WHERE id_param_req_gen = :p_id_param_req_gen";

            $db_query = new DB_Query($sql);
            $parametros = array(':p_id_param_req_gen' => $p_id_param_req);
            $row_query = $db_query->do_query($parametros);

        }

        if ($row_query[0]['D_URL_TMP'] != null) {
            $v_d_path_doc_temp = ROOT_DIR.'Adjuntos/'.$row_query[0]['D_URL_TMP'].date ('Ym').'/';
        }else{
            $v_d_path_doc_temp = null;
        }

        $v_n_max_mb_adjunto = $row_query[0]['D_DATO1'];
        $v_c_ext_admitidos = $row_query[0]['D_DATO2'];
        $v_c_origen = $row_query[0]['C_CATEGORIA'];

        //----------------------------------------------------------------------------------------------------------

        /*SE RECUPERA DATOS DEL DOCUMENTO A ADJUNTAR*/
        $v_file_tamano = (($_FILES['file']['size'] / 1024) / 1024);
        $v_file_tipo = $_FILES['file']['type'];
        $v_file_archivo = $_FILES['file']['name'];

        $info = new SplFileInfo($v_file_archivo);
        $v_file_extencion = strtolower($info->getExtension());

        //----------------------------------------------------------------------------------------------------------


        /*VALIDACIONES SOBRE EL DOCUMENTO A ADJUNTAR*/
        if ($v_file_tamano > $v_n_max_mb_adjunto) {
            $v_status = 'El archivo no debe superar los ' . $v_n_max_mb_adjunto . 'MB.';
        } else {

            // Vemos la Extensión
            if (in_array($v_file_extencion, explode("|", $v_c_ext_admitidos))) {

                //Guardamos en memoria el contenido binario del archivo.
                $gestor = fopen($_FILES['file']['tmp_name'], "r");
                $contenido = fread($gestor, filesize($_FILES['file']['tmp_name']));
                fclose($gestor);

                $nombre_archivo = md5(str_replace(' ', '', date('dmYHs') . microtime() . '' . rand(0, 999999)));

                //Si hay definida una carpeta definida para el filesystem
                if ($v_d_path_doc_temp != null){

                    //Si no existe la carpeta en el servidor, se crea
                    if( !file_exists($v_d_path_doc_temp)){
                        if (!mkdir($v_d_path_doc_temp, 0777, true)) {
                            $v_status = 'Error al crear la carpeta para los documentos adjuntos '.$v_d_path_doc_temp.'.';
                        }
                    }

                    //Cambiamos el nombre.
                    if (move_uploaded_file($_FILES['file']['tmp_name'], $v_d_path_doc_temp . $nombre_archivo . '.' . $v_file_extencion)) {
                        $v_status = "OK";
                    } else {
                        $v_status = "Se ha producido un error al subir el archivo. Cod: ".$_FILES["file"]["error"];
                    }

                }else{
                    $v_status = "OK";
                }
            } else {
                $v_status = 'Solo se permiten documentos con las siguientes extensiones: ' . $v_c_ext_admitidos;
            }

        }
    }

    if ($v_status == 'OK') {
        $logon  = new oci_Logon();
        $sql = "BEGIN PPAL.PAC_SOL_REQUISITOS.CARGA_ADJUNTO( :P_ID_SOLICITUD_REQUISITO,
                                                        :P_C_TIPO_PARAM_REQ,
                                                        :P_ID_PARAM_REQ,
                                                        :P_D_NOMBRE_ORIG,
                                                        :P_D_NOMBRE_CONVERTIDO,
                                                        :P_C_EXTENSION,
                                                        null,
                                                        :P_D_PATH,
                                                        :P_ID_ADJUNTO,
                                                        :P_ERROR, 
                                                        :P_ERROR_ORA,
                                                        :P_C_ESTADO,
                                                        :P_ARCHIVO
                                                        );
                        END;";

        $s = oci_parse($logon -> getCon(), $sql);
        $lob = oci_new_descriptor($logon -> getCon(), OCI_D_LOB);

        oci_bind_by_name($s, ':P_ID_SOLICITUD_REQUISITO',$p_id_solicitud_requisito,4000);
        oci_bind_by_name($s, ':P_C_TIPO_PARAM_REQ',$p_c_tipo_param_req,4000);
        oci_bind_by_name($s, ':P_ID_PARAM_REQ',$p_id_param_req,4000);
        oci_bind_by_name($s, ':P_D_NOMBRE_ORIG',$v_file_archivo,4000);
        oci_bind_by_name($s, ':P_D_NOMBRE_CONVERTIDO',$nombre_archivo,4000);
        oci_bind_by_name($s, ':P_C_EXTENSION',$v_file_extencion,4000);
        oci_bind_by_name($s, ':P_D_PATH',$v_d_path_doc_temp,4000);
        oci_bind_by_name($s, ':P_ID_ADJUNTO',$p_id_adjunto,4000);
        oci_bind_by_name($s, ':P_ERROR', $p_error,4000);
        oci_bind_by_name($s, ':P_ERROR_ORA',$p_error_ora,4000);
        oci_bind_by_name($s, ':P_C_ESTADO',$p_c_estado,4000);
        oci_bind_by_name($s, ':P_ARCHIVO', $lob, -1, OCI_B_BLOB);

        $lob->writeTemporary($contenido, OCI_TEMP_BLOB);

        $result = oci_execute($s,OCI_NO_AUTO_COMMIT);

        if(!$result || ! empty($p_error) || ! empty($p_error_ora)) {

            $v_status = oci_error($s);

            if(! empty($p_error)){
                $v_status = $v_status.' '.$p_error;
            }

            if(! empty($p_error_ora)){
                $v_status = $v_status.' '.$p_error_ora;
            }

            if (!unlink($v_d_path_doc_temp . $nombre_archivo . '.' . $v_file_extencion)) {
                $v_status = $v_status . '<br/>Error al borrar documento en servidor.';
            }

            oci_rollback($logon -> getCon());

        }else{
            oci_commit($logon -> getCon());
        }
        oci_free_statement($s);
    }

    $respuesta = null;
    $respuesta->d_estado = $v_status;
    $respuesta->d_nombre_tmp = $nombre_archivo . '.' . $v_file_extencion;
    $respuesta->d_nombre = $v_file_archivo;
    $respuesta->c_ext_file = $v_file_extencion;
    $respuesta->respuesta = 'OK';
    return($respuesta);
}

function viewFile($v_id_documento){

    $sql = "
            BEGIN
                select 
                    d_path, 
                    d_nombre_orig, 
                    c_extension, 
                    pac_sol_requisitos.file_to_blob(ARCHIVO) 
                into
                    :d_path,
                    :d_nombre_orig,
                    :c_extension,
                    :p_blob
                from ppal.adjuntos 
                where id_adjunto = :p_id_documento;            
            END;
            ";

    $param[':d_path'] = null;
    $param[':d_nombre_orig'] = null;
    $param[':c_extension'] = null;
    $param[':p_id_documento'] = $v_id_documento;
    $param_blob = array(':p_blob' => null);

    $db_query = new DB_Query($sql);
    $db_query->do_query($param, OCI_ASSOC, $arr, $param_blob);

    $v_d_nombre_orig = $param[':d_nombre_orig'];
    $v_d_path = $param[':d_path'];
    $v_ext = $param[':c_extension'];
    $v_blob = $param_blob[':p_blob'];

    $file = $v_d_path;

    //Si se guardo en el filesystem
    if( $v_d_path != ''){
        if(!file_exists($file)){
            die('No se pudo encontrar el documento que intenta leer');
        }

        header('Content-type: application/'.$v_ext);
        //header('Content-type: application/pdf');
        header('Content-Disposition: inline; filename="' . $v_d_nombre_orig . '"');
        header('Content-Transfer-Encoding: binary');
        header('Content-Length: ' . filesize($file));
        header('Accept-Ranges: bytes');
        @readfile($file);
    }else{

        //Si esta en un BFILE en la BD
        $file = tempnam(sys_get_temp_dir(), 'ADJ');
        $resp= file_put_contents($file,$v_blob->load());

        header('Content-type: application/'.$v_ext);
        header('Content-Disposition: inline; filename="' . $v_d_nombre_orig . '"');
        header('Content-Transfer-Encoding: binary');
        header('Content-Length: ' . filesize($file));
        header('Accept-Ranges: bytes');
        @readfile($file);
        unlink($file);
    }

}

function deleteFile($p_id_adjunto){
    $respuesta = null;

    /*SE RECUPERAN DATOS DEL DOCUMENTO*/
    $sql = "SELECT d_path, d_nombre_orig, d_nombre_convertido 
                    FROM ppal.adjuntos 
                    WHERE id_adjunto = :p_id_adjunto";
    $db_query = new DB_Query($sql);
    $parametros = array(':p_id_adjunto' => $p_id_adjunto);
    $row_query = $db_query->do_query($parametros);

    $v_d_path = $row_query[0]['D_PATH'];

    //----------------------------------------------------------------------------------------------------------
    //Se elimina de la Base. Si hay un BFILE, lo borrará el PRC
    $sql = "BEGIN
                PPAL.PAC_SOL_REQUISITOS.BORRAR_ADJUNTO(:p_id_adjunto, :p_error, :p_error_ora);
            END;";

    $parametros = array(
        ':p_id_adjunto' => $p_id_adjunto,
        ':p_error' => null,
        ':p_error_ora' => null);

    $db_procedure = new DB_Procedure($sql);
    $res = $db_procedure->execute_query($parametros,$null,FALSE);

    if($res->resultado != 'OK') {
        $respuesta->respuesta = 'ERROR';
        $respuesta->advert = $parametros[':p_error'].'</br>'.$parametros[':p_error_ora'];
        $db_procedure->db_rollback();
        die(json_encode($respuesta));
    }

    //----------------------------------------------------------------------------------------------------------
    /*ELIMINO DOCUMENTO ADJUNTO EN SERVIDOR"*/
    /*capaz que no haya archivo, porque puede ser un requisito simbolico!*/
    unlink($v_d_path);

    //----------------------------------------------------------------------------------------------------------
    /*COMMIT DE DATOS Y SE DEVUELVE RESPUESTA*/
    $db_procedure->db_commit();
    $respuesta->respuesta = 'OK';
    return($respuesta);
}

// Returns a file size limit in bytes based on the PHP upload_max_filesize
// and post_max_size
function file_upload_max_size() {
    static $max_size = -1;

    if ($max_size < 0) {
        // Start with post_max_size.
        $post_max_size = parse_size(ini_get('post_max_size'));
        if ($post_max_size > 0) {
            $max_size = $post_max_size;
        }

        // If upload_max_size is less, then reduce. Except if upload_max_size is
        // zero, which indicates no limit.
        $upload_max = parse_size(ini_get('upload_max_filesize'));
        if ($upload_max > 0 && $upload_max < $max_size) {
            $max_size = $upload_max;
        }
    }
    return $max_size;
}

function parse_size($size) {
    $unit = preg_replace('/[^bkmgtpezy]/i', '', $size); // Remove the non-unit characters from the size.
    $size = preg_replace('/[^0-9\.]/', '', $size); // Remove the non-numeric characters from the size.
    if ($unit) {
        // Find the position of the unit in the ordered string which is the power of magnitude to multiply a kilobyte by.
        return round($size * pow(1024, stripos('bkmgtpezy', $unit[0])));
    }
    else {
        return round($size);
    }
}
?>


