<?php

$archivo = $_FILES['file'];
$proceso = $_POST['nombre_proceso_upload'];

$nombre_archivo = $archivo['name'];
$tipo_archivo = $archivo['type'];
$tamano_archivo = $archivo['size'];
$dir_actual = $archivo['tmp_name'];

$db_query = new DB_Query();
$db_procedure = new DB_Procedure($sql);

//----------------------------------------- VALIDO FORMATO DE ARCHIVO ------------------------------------------------//
if (strcmp($tipo_archivo, "text/plain")){
    header("HTTP/1.1 401 rechazado");
    exit("El formato de archivo no es válido para el procesamiento.");
}

$n_linea = 1;
$fichero = file_get_contents($dir_actual, true);
$type_file = devuelve_tipo_archivo($fichero);

switch($type_file){
    case 'UNICODE':
        $fichero = ucs2html($fichero);
        $fichero = substr($fichero, 3, strlen($fichero));
        $fichero_ar = explode('<br />',nl2br($fichero));
        break;
    case 'UNICODE2':
        $fichero = ucs2html(substr($fichero,3));
        $fichero_ar = explode('<br />',nl2br($fichero));
        break;
    case 'UTF-8':
        $fichero = substr($fichero, 3, strlen($fichero));
        $fichero_ar = explode('<br />',nl2br($fichero));
        break;
    case 'ANSI':
        $fichero = utf8_encode($fichero);
        $fichero_ar = explode('<br />',nl2br($fichero));
        break;
    default:
        $fichero_ar = explode('<br />',nl2br($fichero));
        break;
}

$db_query = new DB_Query();
$db_procedure = new DB_Procedure($sql);

//---------------------------------- VALIDAR NOMBRE DE ARCHIVO -------------------------------------------------------//
/*
$db_query_v = new DB_Query("  SELECT count(*) as SUMA
                                 FROM ARCHIVO_INTERFAZ
                                 WHERE C_DISCO = :nombre_archivo
                                 AND c_proceso = :proceso");
$par = array(':nombre_archivo' => $nombre_archivo, ':proceso' => $proceso);
$row_query_v = $db_query_v->do_query($par);

if(($row_query_v[0]['SUMA']) > 0){
    $response->resultado = "La interfaz especificada ya se ha procesado anteriormente";
    $error = 1;
    die(json_encode($response));
}
*/

$archivo_insertar = fopen($dir_actual, 'r');
$n_linea = 1;

//-------------------------------------- RECUPERANDO SECUENCIA -------------------------------------------------------//
$sql= 'select n_id_disco.nextval n_id_disco from dual';
$db_query->setQuery($sql);
$row_query = $db_query->do_query();
$n_id_disco = $row_query[0]['N_ID_DISCO'];

//---------------------------------------- INSERTANDO LINEAS ---------------------------------------------------------//
for($i=0; $i<count($fichero_ar); $i++){
    $fichero_ar[$i] = trim($fichero_ar[$i]);
    if($fichero_ar[$i] != ''){
        $param_prc = array(
            ':p_modo' => 'I',
            ':p_n_id_disco' => $n_id_disco,
            ':p_n_linea' => $n_linea,
            ':p_c_linea' =>$fichero_ar[$i],
            ':p_c_disco' =>$nombre_archivo,
            ':p_c_proceso' =>$proceso,
            ':p_n_medio_pago'=>null,
            ':p_id_obligacion'=>null,
            ':p_d_error'=>null,
            ':p_n_ddjj'=>null,
            ':p_error'=>null,
            ':p_error_ora' => null
        );

        $sql = 'begin PAC_INSERTAR.PRC_INS_ARCHIVO_INTERFAZ(:p_modo, :p_n_id_disco, :p_n_linea, :p_c_linea, :p_c_disco,
														    :p_c_proceso, :p_n_medio_pago, :p_id_obligacion, :p_d_error,
														    :p_n_ddjj, :p_error, :p_error_ora);
			    end;';

        $db_procedure->setQuery($sql);
        //Hay que armar una variable y pasarle al execute_query una variable con null sino pincha cuando quiere hacer el oci_bind_by_name
        $null=null;
        $result = $db_procedure->execute_query($param_prc,$null,FALSE);
        if($result->resultado != 'OK') {
            die(json_encode($result));
        }elseif ($param_prc[':p_error'] != null) {
            $result->resultado = $param_prc[':p_error'];
            die(json_encode($result));
        }
    }
    $n_linea++;
}

//------------------------------------- COMITEO Y DEVUELVO RESULTADO -------------------------------------------------//
$db_procedure->db_commit();
$response->resultado = 'OK';
$response->n_id_disco = $n_id_disco;
echo json_encode($response);


//-------------------------------------------------- FUNCIONES -------------------------------------------------------//
function devuelve_tipo_archivo($str){
    $str = utf8_encode($str);
    if( strpos('--'.$str, 'ÿþ') > 0 ){
        $retorno = 'UNICODE';
    }else if( strpos('--'.$str, 'þÿ') > 0 ){
        $retorno = 'UNICODE2';
    }else if( strpos('--'.$str, 'ï»') > 0 ){
        $retorno = 'UTF-8';
    }else{
        $retorno = 'ANSI';
    }
    return $retorno;
}

function ucs2html($str) {
    $str=trim($str); // if you are reading from file
    $len=strlen($str);
    $html='';
    for($i=0;$i<$len;$i+=2)
        $html.='&#'.hexdec(dechex(ord($str[$i+1])).
                sprintf("%02s",dechex(ord($str[$i])))).';';
    return html_entity_decode(utf8_decode($html), ENT_COMPAT, 'UTF-8');
}
//--------------------------------------------------------------------------------------------------------------------//

?>
