<?php
/*require_once('db_query.php');
require_once('db_procedure.php');
require_once('funciones.php');*/
$archivo = $_GET['archivo'];

$nombre_archivo = $_FILES[$archivo]['name'];
$tipo_archivo = $_FILES[$archivo]['type'];
$tamano_archivo = $_FILES[$archivo]['size'];
$dir_actual = $_FILES[$archivo]['tmp_name'];
$proceso = $_GET['nombre_proceso'];

$db_query = new DB_Query();
$db_procedure = new DB_Procedure($sql);

//Se controla si ya se ha levantado un archivo con el mismo nombre para el mismo proceso

$db_query_v = new DB_Query("  SELECT count(*) as SUMA
                                 FROM siat.ARCHIVO_INTERFAZ
                                 WHERE C_DISCO = :nombre_archivo
                                 AND c_proceso = :proceso");
$par = array(':nombre_archivo' => $nombre_archivo, ':proceso' => $proceso);
$row_query_v = $db_query_v->do_query($par);

if(($row_query_v[0]['SUMA']) > 0){
    $arch = fopen($dir_actual, 'r');
    $primera_linea = fgets($arch);
    $partes = explode('|', $primera_linea);
    $nro_envio_aux = ltrim($partes[3], '0');

    //$response->resultado = "La interfaz especificada ya se ha procesado anteriormente";
    $response->resultado = "Linea NRO: 1-El archivo con nro de envío: " . $nro_envio_aux . " ya fue cargado";
    $error = 1;
    die(json_encode($response));
}

//Levantar el archivo
$archivo_insertar = fopen($dir_actual, 'r');
$n_linea = 1;

$sql= 'select siat.id_disco.nextval n_id_disco from dual';

$db_query->setQuery($sql);
$row_query = $db_query->do_query();
$n_id_disco = $row_query[0]['N_ID_DISCO'];

//Se valida que el archivo no esté vacio
$cant_lineas = 0;

while(!feof($archivo_insertar)) {
    $linea = fgets($archivo_insertar);
    $character_mask = " \t\n\r\0\x0B\x1A";
    $linea=trim(utf8_encode($linea), $character_mask);

    if ($linea <> '' || strlen($linea)  >=1) { //Para evitar que me genere una linea vacía o con un caracter.
        $cant_lineas = $cant_lineas + 1;
        $param_prc = array(
            ':p_n_id_disco' => $n_id_disco,
            ':p_n_linea' => $n_linea,
            ':p_c_linea' =>utf8_encode($linea),
            ':p_c_disco' =>$nombre_archivo,
            ':p_c_proceso' =>$proceso,
            ':p_n_medio_pago'=>null,
            ':p_id_obligacion'=>null,
            ':p_d_error'=>null,
            ':p_error'=>null,
            ':p_error_ora' => null
        ); //Quito ':p_n_ddjj'=>null,

        $sql = 'begin SIAT.PKG_RNPA.PRC_INS_ARCHIVO_INTERFAZ(:p_n_id_disco,
														:p_n_linea,
														:p_c_linea,
														:p_c_disco,
														:p_c_proceso,
														:p_n_medio_pago,
														:p_id_obligacion,
														:p_d_error,
														:p_error,
														:p_error_ora);
			end;'; //Quito :p_n_ddjj
        $db_procedure->setQuery($sql);
        //Hay que armar una variable y pasarle al execute_query una variable con null sino pincha cuando quiere hacer el oci_bind_by_name
        $null=null;
        try{
            $result = $db_procedure->execute_query($param_prc,$null,TRUE);
        }catch (Exception $e) {
            $response->resultado =  $e->getMessage();
            die();
        }
        if($result->resultado != 'OK') {
            die(json_encode($result));
        }elseif ($param_prc[':p_error'] != null) {
            $result->resultado = $param_prc[':p_error'];
            die(json_encode($result));
        }
    }
    $n_linea++;
}

fclose($archivo);

if($cant_lineas!=0){
    $db_procedure->db_commit();
    $response->resultado = 'OK';
    $response->disco = $n_id_disco;
}else{
    $response->resultado = 'El archivo que intenta procesar se encuentra vacío';
}
echo json_encode($response);

?>