<?php

//<editor-folder desc='*****	MANEJO DE ARCHIVOS	*****'>

function listFilesRecursively($dir) {
    $dir = str_replace('/',DIRECTORY_SEPARATOR,$dir);
    $dir = str_replace(ESC_BAR,DIRECTORY_SEPARATOR,$dir);

    $last_char = substr($dir, -1);
    if($last_char == DIRECTORY_SEPARATOR){
        $dir = substr($dir,0,strlen($dir) - 1);
    }

    $result = array();
    $cdir = scandir($dir);
    foreach ($cdir as $key => $value) {
        if (!in_array($value,array(".",".."))) {
            $pathname = $dir . DIRECTORY_SEPARATOR . $value;
            if (is_dir($pathname))
                $result = array_merge($result,listFilesRecursively($pathname));
            else
                $result[] = $pathname;
        }
    }
    return $result;
}

//</editor-folder>

//<editor-folder desc='******** FUNCIONES UTILES ********'>
/*** genera combo de tablas_generales
 * $combo = getComboGral(13, 'nombre', 'clase', 'alert("lorem")', 'IIBB', 'c_dato="PASE_LEGAL"') **/
function getComboGral($num_table, $name, $class='', $onchange='', $selected='', $where=''){
    if($where==''){
        $sql = new DB_Query("SELECT TG.C_DATO, TG.D_DATO 
								FROM TABLAS_GENERALES TG 
								WHERE TG.N_TABLA=:num 
								ORDER BY TG.D_DATO ASC");
    }
    else{
        $sql = new DB_Query("SELECT TG.C_DATO, TG.D_DATO 
								FROM TABLAS_GENERALES TG 
								WHERE TG.N_TABLA=:num AND 
								$where 
								ORDER BY TG.D_DATO ASC");
    }
    $par = array(':num' => $num_table);
    $row_query = $sql->do_query($par);
    $combo = '<select id="'.$name.'" name="'.$name.'" class="'.$class.'" onchange="'.$onchange.'"><option value="">Seleccionar</option>';
    foreach( $row_query as $row){
        $chk = ($row['C_DATO']==$selected)? 'selected="selected"': '';
        $combo .='<option value="'.$row['C_DATO'].'" '.$chk.'>'.$row['D_DATO'].'</option>';
    }
    $combo .="</select>";
    return $combo;
}

function nvl ($key, $else) {
    return ($key!='' ? $key : $else);
}

/***compara como un LIKE de sql $esp = (like_match('ESP-%', $p_tipo)==true)? 'TRUE' : 'FALSE'; ***/
function like_match($pattern, $subject){
    $pattern = str_replace('%', '.*', preg_quote($pattern, '/'));
    return (bool) preg_match("/^{$pattern}$/i", $subject);
}

function existe_en_archivo($path,$cadena){
    $existe = 'false';

    // Vemos si ya existe el objeto.
    $f_objeto = fopen($path, 'r');

    while (($linea = fgets($f_objeto)) !== false && $existe == 'false') {

        // Si esta el nombre del objeto terminamos
        if (strripos($linea,$cadena) === false) {
            null;
        }else{
            $existe = 'true';
        }
    }
    fclose($f_objeto);
    return($existe);
}

/**** corta el texto en cantidad de palabra $short_string = truncateText($long_string, 100, ' '); ***/
function truncateText($string, $limit, $break=".", $pad="...") {
    // return with no change if string is shorter than $limit
    if(strlen($string) <= $limit)
        return $string;

    // is $break present between $limit and the end of the string?
    if(false !== ($breakpoint = strpos($string, $break, $limit))) {
        if($breakpoint < strlen($string) - 1) {
            $string = substr($string, 0, $breakpoint) . $pad;
        }
    }
    return $string;
}

/**** $files=array('file1.jpg', 'file2.jpg', 'file3.gif'); create_zip($files, 'myzipfile.zip', true); ***/
function create_zip($files = array(),$destination = '',$overwrite = false) {
    //if the zip file already exists and overwrite is false, return false
    if(file_exists($destination) && !$overwrite) { return false; }
    //vars
    $valid_files = array();
    //if files were passed in...
    if(is_array($files)) {
        //cycle through each file
        foreach($files as $file) {
            //make sure the file exists
            if(file_exists($file)) {
                $valid_files[] = $file;
            }
        }
    }
    //if we have good files...
    if(count($valid_files)){
        //create the archive
        $zip = new ZipArchive();
        if($zip->open($destination,$overwrite ? ZIPARCHIVE::OVERWRITE : ZIPARCHIVE::CREATE) !== true) {
            return false;
        }
        //add the files
        foreach($valid_files as $file) {
            $zip->addFile($file,$file);
        }
        //debug
        //echo 'The zip archive contains ',$zip->numFiles,' files with a status of ',$zip->status;

        //close the zip -- done!
        $zip->close();

        //check to make sure the file exists
        return file_exists($destination);
    }
    else{
        return false;
    }
}

//</editor-folder>

//<editor-folder desc='******** FUNCIONES DE SISTEMA ********'>

function encripta($archivo) {
    $contenido = file_get_contents($archivo);
    $td = mcrypt_module_open('tripledes', '', 'ecb', '');
    $iv = mcrypt_create_iv (mcrypt_enc_get_iv_size($td), MCRYPT_RAND);

    mcrypt_generic_init($td, mcrypt_enc_get_key_size($td), $iv);
    $contenido_encriptado = mcrypt_generic($td, $contenido);

    $archivo_encriptado = fopen($archivo,'w');
    $ok = fwrite($archivo_encriptado, $contenido_encriptado);

    fclose($archivo_encriptado);
    mcrypt_generic_deinit($td);
    mcrypt_module_close($td);

    if($ok){
        return true;
    }else{
        return false;
    }
}

function get_datos_menu( $id_menu ){
    $logon  = new oci_Logon();
    $voConn= $logon->getCon();
    $query = "SELECT ID_MENU, D_TITULO, D_URL, D_ARCH_MANUAL, ID_MENU_PADRE FROM MENU WHERE ID_MENU =
            (SELECT ID_MENU_PADRE
                FROM MENU
            WHERE ID_MENU = :id_menu)";
    //echo $query;
    $db_query = new DB_Query($query);
    $var = array('id_menu' => $id_menu);
    $row = $db_query->do_query($var);
    $info->id_menu = $row[0]['ID_MENU'];
    $info->titulo = $row[0]['D_TITULO'];
    $info->d_url = '#nogo';
    $info->id_menu_padre = $row[0]['ID_MENU_PADRE'];
    $info->parametros = json_encode(null);
    return $info;
}

//----FUN_ID_LISTA ----- PABLO SPARTA--- 15/4/2010
//----Funcion para devolver el id de la lista en base al titulo
function fun_id_lista($d_descripcion) {

    $db_query = new DB_Query();
    $params = array(':d_descripcion' => $d_descripcion);

    $db_query->setQuery(" SELECT n_id_lista
						  FROM listas
						  WHERE d_descripcion= :d_descripcion");

    $row_query = $db_query->do_query($params);
    return($row_query[0]['N_ID_LISTA']);
}

// Busca le parámetro $p_constante en la tabla parámetros y devuelve el d_variable
function buscar_parametro($p_constante) {

    $db_query = new DB_Query("select fun_devuelve_parametro(:p_constante) valor from dual");
    $par = array(':p_constante' => $p_constante);
    $row = $db_query->do_query($par);

    return $row[0]['VALOR'];

}

//----Funcion para devolver el id del menu en base al titulo
function fun_id_menu($d_descripcion) {
    $db_query = new DB_Query("SELECT id_menu FROM menu WHERE d_titulo=:d_descripcion");
    $param = array(':d_descripcion' => $d_descripcion);
    $vaRow = $db_query->do_query($param);

    return $vaRow[0]['ID_MENU'];
}

//----Funcion para devolver el id del menu en base a su cod.
function fun_id_menu_por_codigo($c_cod_menu) {
    $db_query = new DB_Query("SELECT id_menu FROM menu WHERE c_cod_menu=UPPER(:c_cod_menu)");
    $param = array(':c_cod_menu' => $c_cod_menu);
    $vaRow = $db_query->do_query($param);

    return $vaRow[0]['ID_MENU'];
}

//----Funcion para devolver el id del menu en base a la constante
function fun_id_menu_constante($c_constante) {
    $db_query = new DB_Query("SELECT id_menu FROM menu WHERE c_constante = :c_constante");
    $param = array(':c_constante' => $c_constante);
    $vaRow = $db_query->do_query($param);

    return $vaRow[0]['ID_MENU'];
}

/**
 * Funcion que devuelve un array con los valores:
 *	os => sistema operativo
 *	browser => navegador
 *	version => version del navegador
 */
function createquery($tipo,$equiv,$campo,$text) {

    if (isset($_POST['adv_combo0'])) {
        return(createquery_adv());
    }

    switch($tipo) {
        case "operadores":
            $sql="SELECT f.d_where, tg.d_dato1, tg.d_dato2, tg.d_dato3, tg.d_dato4, tg.d_dato6, f.d_tipo_dato
                  FROM filtros f, filtros_operadores op, parametros p, tablas_generales tg
                  WHERE f.n_id_filtro=op.n_id_filtro
                  AND p.n_tabla = tg.n_tabla
                  AND p.c_constante = 'OPERADORES'
                  AND op.c_operador = tg.c_dato
                  AND tg.c_dato=:equiv
                  AND f.n_id_filtro=:campo";

            $db_query = new DB_Query();
            $db_query->setQuery($sql);
            $param = array(':equiv' => $equiv, ':campo' => $campo);
            $row = $db_query->do_query($param);
            $row = $row[0];

            $condicion=str_replace(REEMP_OPERADOR, $row['D_DATO1'], $row['D_WHERE']); //coloca el operador
            //obtiene el tipo de dato
            switch($row['D_TIPO_DATO']) {
                case "NUMBER":
                    if($equiv=='LIKE' || $equiv=='NLIKE') {
                        $tipo_dato="T";
                    }else{
                        $tipo_dato="N";
                    }
                    break;
                case "DATE":
                    $tipo_dato="F";
                    break;
                case "DATETIME":
                    $tipo_dato="FH";
                    break;
                case "VARCHAR2":
                default:
                    $tipo_dato="T";
                    break;
            }

            if($row['D_DATO6']=='S') {
                //separa los terminos si es una lista
                $text_array=explode(",",$text);
                foreach ($text_array as $array) {
                    if($i==0){
                        $text2.=fun_limpia_dato($array,$tipo_dato);
                    }else{
                        $text2.=",".fun_limpia_dato($array,$tipo_dato);
                    }
                    $i++;
                }
                //coloca los caracteres previos
                $texto=$row['D_DATO2'].$text2.$row['D_DATO3'];
                $condicion=str_replace('¬p_valor¬', $texto , $condicion);
            }else{
                if($row['D_DATO4']=="S") {
                    //coloca los caracteres previos
                    $texto=$row['D_DATO2'].$text.$row['D_DATO3'];

                    //si es un between arma la query correcta
                    if($row['D_DATO1']=="BETWEEN") {

                        if($tipo_dato=="F") {
                            $texto=" TO_DATE('".$_GET['adv_src_desdet']."','dd/mm/rrrr') AND TO_DATE('".$_GET['adv_src_hastat']."','dd/mm/rrrr')";
                        }else{
                            $texto=$_GET['adv_src_desdet']." AND ".$_GET['adv_src_hastat'];
                        }
                    }else{
                        $texto=fun_limpia_dato($texto,$tipo_dato);
                    }
                    $condicion=str_replace(REEMP_PVALOR, $texto, $condicion);
                }else{
                    //IS NULL o IS NOT NULL
                    $condicion=str_replace(REEMP_PVALOR, "", $condicion);
                }
            }

            $condicion=" WHERE ".$condicion;
            break;
    }
    return($condicion);
}

function fun_dato_base($texto,$tipo) {
    $texto=trim($texto);
    switch($tipo) {
        default:
        case "T":
            if (strlen($texto)==0) {
                $texto=null;
            }
            break;
        case "N":
            if (strlen($texto)==0) {
                $texto=null;
            }
            break;
        case "NCF":
            if (strlen($texto)==0) {
                $texto=null;
            }else{
                $texto = str_replace('.', '', $texto);
                $texto = str_replace(',', '.', $texto);
            }
            break;
        case "F":
            if (strlen($texto)<8) {
                $texto=null;
            }else{
                $texto="to_date('".$texto."','dd/mm/rrrr')";
            }
            break;
        case "FH":
            if (strlen($texto)<8) {
                $texto=null;
            }else{
                $texto="to_date('".$texto."','dd/mm/rrrr hh24:mi:ss')";
            }
            break;

    }
    return $texto;
}

//</editor-folder>

//<editor-folder desc='******** FUNCIONES DE VALIDACION ********'>

function fun_valida_obligatoriedad($valor,$m_oblig){
    if($m_oblig == 'S'){
        if (preg_match(DOBLE_BARP, $valor)){
            return true;
        }else{
            return false;
        }

    }
    return true;
}

function fun_valida_texto($valor,$m_oblig,$d_titulo){
    if(!fun_valida_obligatoriedad($valor,$m_oblig)){
        return 'El campo '.$d_titulo.' es obligatorio';
    }else{
        return 'OK';
    }


}

function fun_valida_numerico($valor,$m_oblig,$d_titulo){
    if(!fun_valida_obligatoriedad($valor,$m_oblig)) return 'El campo '.$d_titulo.' es obligatorio';

    if (!preg_match(VAL_NUMERICO, $valor)){
        return 'El campo '.$d_titulo.' no tiene el formato correcto';
    }else{
        return 'OK';
    }
}

function fun_valida_importe($valor,$m_oblig,$d_titulo){
    if(!fun_valida_obligatoriedad($valor,$m_oblig)) return 'El campo '.$d_titulo.' es obligatorio';

    if (!preg_match(VAL_IMPORTE, $valor) && $valor != NULL){
        return 'El campo '.$d_titulo.' no tiene el formato correcto';
    }else{
        return 'OK';
    }
}

function fun_valida_entero($valor,$m_oblig,$d_titulo){
    if(!fun_valida_obligatoriedad($valor,$m_oblig)) return 'El campo '.$d_titulo.' es obligatorio';

    if (!preg_match(VAL_ENTERO, $valor)){
        return 'El campo '.$valor.' no tiene el formato correcto';
    }else{
        return 'OK';
    }


}

function fun_valida_fecha($fecha,$m_oblig,$d_titulo){

    if(!fun_valida_obligatoriedad($fecha,$m_oblig)) return 'El campo '.$d_titulo.' es obligatorio';

    if(!datecheck($fecha,"") && $fecha != NULL){
        $result = 'La fecha ingresada debe tener el siguiente formato dd/mm/aaaa';
    }else{
        $result = 'OK';
    }
    return $result;
}

function datecheck($fecha,$format=""){
    $separator_type= SEPARATOR_TYPE;
    foreach ($separator_type as $separator) {
        $find= stripos($fecha,$separator);
        if($find<>false){
            $separator_used= $separator;
        }
    }
    $input_array= explode($separator_used,$fecha);

    if ($format=="mdy") {
        return checkdate($input_array[0],$input_array[1],$input_array[2]);
    } elseif ($format=="ymd") {
        return checkdate($input_array[1],$input_array[2],$input_array[0]);
    } else {
        return checkdate($input_array[1],$input_array[0],$input_array[2]);
    }
}

function fun_valida_porc($valor,$m_oblig,$d_titulo){
    if(!fun_valida_obligatoriedad($valor,$m_oblig)) return 'El campo '.$d_titulo.' es obligatorio';

    if (!preg_match(VAL_PORC, $valor) && $valor != NULL){
        return 'El campo '.$d_titulo.' no tiene el formato correcto, debe estar entre 0,00-100,00';
    }else{
        return 'OK';
    }
}

function fun_valida_hora($valor,$m_oblig,$d_titulo){
    if(!fun_valida_obligatoriedad($valor,$m_oblig)) return 'El campo '.$d_titulo.' es obligatorio';

    if (!preg_match(VAL_HORA, $valor)){
        return 'El campo '.$valor.' no tiene el formato correcto. Valores posibles entre 00:00 y 23:59';
    }else{
        return 'OK';
    }
}

function get_url_report($c_tipo_report,$parametros,$server_name,$c_impresion, $filtros = null) {

    $param_prc= array(':p_id_reporte'=>null);

    $db_procedure = new DB_Procedure("BEGIN prc_devuelve_id_reporte(:p_id_reporte); END;");

    $null=null;

    $result = $db_procedure->execute_query($param_prc,$null,TRUE);

    $idsession = $param_prc[':p_id_reporte'];

  //*** SECCION FILTROS ***//  

    if($filtros != null){
        for($i = 0 ; $i < sizeof($filtros); $i++){
            $filtros_titulos[] = $filtros[$i][0];
            $filtros_valores[] = $filtros[$i][1];
            $filtros_columna[] = $filtros[$i][2];
            $filtros_linea[] = $filtros[$i][3];            

        }
        $db_procedure = new DB_Procedure("BEGIN PAC_FILTROS_REPORTES.PRC_INSERTA_FILTROS_REPORTES(:p_id_reporte, :p_filtros_titulos, :p_filtros_valores, :p_filtros_columna, :p_filtros_linea); END;");

        $parametros_array[':p_filtros_titulos']  = $filtros_titulos;
        $parametros_array[':p_filtros_valores']  = $filtros_valores;
        $parametros_array[':p_filtros_columna']  = $filtros_columna;
        $parametros_array[':p_filtros_linea']  = $filtros_linea;

        $db_procedure->execute_query($param_prc,$parametros_array);

    }

  //*** FIN SECCION FILTROS ***// 

    $db_query = new DB_Query();

    $db_query->setQuery("SELECT d_reporte, d_nombre_export, prc_puebla, c_tipo_codificacion, m_pdf, m_html, m_excel, m_csv
			   FROM tipos_reportes d
			   WHERE c_tipo_reporte = trim(:c_tipo_report)");

    $param = array(':c_tipo_report' => $c_tipo_report);
    $vaRow = $db_query->do_query($param);
    $d_reporte = $vaRow[0]['D_REPORTE'];
	$d_nombre_export = $vaRow[0]['D_NOMBRE_EXPORT'];
	$prc_puebla = $vaRow[0]['PRC_PUEBLA'];
    $c_tipo_codificacion = $vaRow[0]['C_TIPO_CODIFICACION'];
    $m_pdf = $vaRow[0]['M_PDF'];
    $m_html = $vaRow[0]['M_HTML'];
    $m_excel = $vaRow[0]['M_EXCEL'];
    $m_csv = $vaRow[0]['M_CSV'];

    $formatos = array();
	
	IF($prc_puebla != ''){
        //Llamar al puebla con los parametros enviados, luego modifica los parametros para el reporte y llama al reporte.
        $db_procedure = new DB_Procedure("BEGIN ".$prc_puebla."; END;");

        $array_param = explode('&', $parametros);

        foreach($array_param as $elemento){
            $array_elemento = explode('|',$elemento);
            $param_prc[':'.$array_elemento[0]] = $array_elemento[1];
        }
        $param_prc[':p_id_reporte'] = '';
        $param_prc[':p_error'] = '';
        $param_prc[':p_error_ora'] = '';

        $result = $db_procedure->execute_query($param_prc);

        if($result->resultado != 'OK'){
            die(json_encode($result));
        }else{
            $parametros = 'p_id_reporte|'.$param_prc[':p_id_reporte'];
        }

    }
	
    IF ($c_tipo_codificacion == 'JASPER') {
        $popurl = $d_reporte;

        if ($m_pdf == 'S') {
            $formatos[] = 'PDF';
        }
        if ($m_html == 'S') {
            $formatos[] = 'HTML';
        }
        if ($m_csv == 'S') {
            $formatos[] = 'CSV';
        }
        if($m_excel =='S'){ $formatos[] = 'XLSX'; }

    } ELSEIF ($c_tipo_codificacion == 'ORACLE') {
		$formatos[] = 'PDF';
		
        $db_query = new DB_Query();

        $db_query->setQuery("SELECT d_dato2 SERVIDOR_REPORT,d_dato3 KEY
			        FROM tablas_generales
			        WHERE n_tabla = 918
			        AND d_dato1 = :server_name");

        $param = array(':server_name' => $server_name);
        $vaRow = $db_query->do_query($param);
        $servidor_report = $vaRow[0]['SERVIDOR_REPORT'];
        $key = $vaRow[0]['KEY'];


        if ($key == '' && $key == null) {
            $key = 'key_REPORT';
        }

        $db_query->setQuery("SELECT tg.d_dato1 param_impresion
				  FROM tablas_generales tg,parametros p
				  WHERE p.c_constante = 'PARAMREPORTS'
				  AND p.n_tabla = tg.n_tabla 
				  AND tg.c_dato = :c_impresion");
        
        $param = array(':c_impresion' => $c_impresion);
        $vaRow = $db_query->do_query($param);
        $param_impresion = $vaRow[0]['PARAM_IMPRESION'];

        // $popurl = "http://" . $servidor_report . "/reports/rwservlet?" . $key . "&" . $param_impresion . "&report=" . $d_reporte . "&p_sesion=" . $idsession;
        $popurl = "http://" . $servidor_report . "/reports/rwservlet?" . $key . "&" . $param_impresion . "&report=" . $d_reporte . "&" . str_replace('|','=',$parametros);

    } ELSEIF ($c_tipo_codificacion == 'PHP') {
        $db_query->setQuery("SELECT d_dato6
                                FROM tablas_generales
                                WHERE n_tabla = 918
                                AND d_dato1 = :server_name");
        $param = array(':server_name' => $server_name);
        $vaRow = $db_query->do_query($param);
        $servidor_report = $vaRow[0]['SERVIDOR_REPORT'];

        $popurl = "http://" . $servidor_report . $d_reporte . '/' . $parametros;

    } ELSE {
        die('El tipo de Reporte no es valido');
    }

    $db_procedure = new DB_Procedure("BEGIN prc_ins_web_llamadas(:idsession, :popurl, :parametros, :c_tipo_report); END;");

    $param_prc = array(
        ':idsession' => $idsession,
        ':popurl' => $popurl,
        ':parametros' => $parametros,
		':c_tipo_report' => $c_tipo_report
    );

    $result = $db_procedure->execute_query($param_prc);

	$db_procedure = new DB_Procedure("BEGIN :hash := PAC_ENCRIPTA.encripta_new(:idsession); END;");

    $param_prc = array(
        ':idsession' => $idsession,
		':hash' => $hash
    );

    $result = $db_procedure->execute_query($param_prc);
	
    $response->id_session = $param_prc[':hash'];
    $response->formats = $formatos;
    $response->d_nombre_export = $d_nombre_export;

    return $response;
}

//</editor-folder>

//<editor-folder desc='******** OTRAS FUNCIONALIDADES ********'>

//</editor-folder>

function start_log ($param,$origen,$param_origen) {

    if ($origen == 'FRMWK_PRC' ){
        $v_d_observacion = 'Ejecución DB_PROCEDURE';

        // Buscamos el id_menu_procedure
        $param_prc = array(':id_menu' => $param_origen['id_menu'], ':n_orden' =>$param_origen['n_orden'],':c_usuario' => $_SESSION['usuario']);

        $db_query_log = new DB_Query("SELECT id_menu_procedure 
                                      FROM menu_procedures mp INNER JOIN menu m on m.id_menu = mp.n_id_menu
									  WHERE mp.n_id_menu = :id_menu
									        AND mp.n_orden = :n_orden
									        AND 
									          (m_log = 'S'  OR :c_usuario in (select c_usuario  from usuarios u where u.m_log = 'S') )
									  ");

        $row_query = $db_query_log->do_query($param_prc);
        $id_menu_procedure = $row_query[0]['ID_MENU_PROCEDURE'];

        if ($id_menu_procedure===null) {
            return null;
        }
    }
    elseif ($origen == 'FRMWK_GRID'){
        $v_d_observacion = 'Ejecución GRID_QUERY';

        // Buscamos por id_menu y n_orden en grillas
        $param_prc = array(':p_id_menu' => $param_origen['id_menu'], ':p_n_grid' => $param_origen['n_grid'],':c_usuario' => $_SESSION['usuario']);
        $db_query_log = new DB_Query("  SELECT id_grid_query 
                                        FROM grid_queries INNER JOIN menu USING(id_menu)
                                        WHERE id_menu = :p_id_menu 
                                              AND n_grid = :p_n_grid
                                              AND 
                                                (m_log = 'S'  OR :c_usuario in (select c_usuario from usuarios u where u.m_log = 'S') )
                                     ");
        $row_query = $db_query_log->do_query($param_prc);
        $id_grid_query = $row_query[0]['ID_GRID_QUERY'];

        if ($id_grid_query===null) {
            return null;
        }
    }else{
        $origen = 'FRMWK';
        $v_d_observacion = 'Ejecución FRWMK';
    }

    // Ahora vemos el log.
    $param_prc = array(':p_c_proceso' => $origen,
        ':out_id_log' => null,
        ':p_d_observacion' => $v_d_observacion,
        ':p_id_menu_procedure' => $id_menu_procedure,
        ':p_id_grid_query' => $id_grid_query,
        ':p_d_param' => json_encode($param)
    );

    $sql = "BEGIN 
                 PAC_LOG.START_LOG( :p_c_proceso, 
                                    :out_id_log, 
                                    :p_d_observacion,
                                    :p_id_menu_procedure,
                                    :p_id_grid_query,
                                    :p_d_param
                                  ); 
            END;";

    $db_procedure = new DB_Procedure($sql);
    $null = null;
    $result = $db_procedure->execute_query($param_prc, $null, FALSE, false);

    return $param_prc[':out_id_log'];

}

function end_log($p_id_log) {
    if ($p_id_log != null){
        $param_prc = array(':p_id_log' => $p_id_log);

        $sql = "BEGIN 
                     PAC_LOG.END_LOG(:p_id_log); 
                END;";

        $db_procedure = new DB_Procedure($sql);
        $null = null;
        $result = $db_procedure->execute_query($param_prc, $null, FALSE, false);
    }

}

function fail_log($p_id_log,$p_error,$p_error_ora) {
    if ($p_id_log != null) {
        $param_prc = array(':p_id_log' => $p_id_log,
            ':p_error' => $p_error,
            ':p_error_ora' => $p_error_ora
        );

        $sql = "BEGIN 
                 PAC_LOG.FAIL_LOG( :p_id_log, 
                                   :p_error, 
                                   :p_error_ora
                                  ); 
            END;";

        $db_procedure = new DB_Procedure($sql);
        $null = null;
        $result = $db_procedure->execute_query($param_prc, $null, FALSE, false);
    }
}

require_once FUNCIONES_FRAMEWORK_PROY."funciones_proy.php";
?>