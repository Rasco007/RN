<?php
/*require_once('db_query.php');
require_once('db_procedure.php');
require_once('funciones.php');*/
session_write_close();
$archivo = $_GET['archivo'];

$nombre_archivo = $_FILES[$archivo]['name']; 
$tipo_archivo = $_FILES[$archivo]['type'];
$tamano_archivo = $_FILES[$archivo]['size'];
$dir_actual = $_FILES[$archivo]['tmp_name'];
$proceso = $_GET['nombre_proceso'];

$db_query = new DB_Query();
$db_procedure = new DB_Procedure($sql);
    // Controles previos a levantar el archivo
/* API: Esto no se puede utilizar porque dejan de andar las interfaces de recaudacion
    // Se controla que el archivo sea tipo txt
    if (strcmp($tipo_archivo, "text/plain")){
        $response->resultado = "La extensi&oacute;n del archivo no es correcta. Solo pueden subirse archivos de texto (txt)";
        $error = 1;
	    die(json_encode($response));
    }
*/

//Se borra el archivo interfaz anterior que contenga errores -- Si hace falta descomentar y agregar el caso en una condicion particular
/*
$db_query_e = new DB_Query("  SELECT DISTINCT n_id_disco as n_id_disco
                                 FROM ARCHIVO_INTERFAZ
                                 WHERE d_error is not null");
$row_query_e = $db_query_e->do_query();


if($row_query_e[0]['N_ID_DISCO']!= null){
        for ($i=0;$row_query_e[$i]['N_ID_DISCO'] !=null; $i++ ){
        $id_disco_e = $row_query_e[$i]['N_ID_DISCO'];
        $db_query_d = new DB_Query("  DELETE
                                      FROM ARCHIVO_INTERFAZ
                                    WHERE n_id_disco = :id_disco_e"
                                    );


        $par = array(':id_disco_e' => $id_disco_e);
        $row_query_d = $db_query_d->do_query($par);
    }
}
*/
//Se controla si ya se ha levantado un archivo con el mismo nombre para el mismo proceso

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

//Levantar el archivo
$archivo_insertar = fopen($dir_actual, 'r');
$n_linea = 1;

$sql= 'select n_id_disco.nextval n_id_disco from dual';

$db_query->setQuery($sql);
$row_query = $db_query->do_query();
$n_id_disco = $row_query[0]['N_ID_DISCO'];

//Se valida que el archivo no esté vacio
$cant_lineas = 0;

while(!feof($archivo_insertar)) {
	$linea = fgets($archivo_insertar);

    if ($linea <> '') { //Para evitar que me genere una linea vacía.
        $cant_lineas = $cant_lineas + 1;
	    $param_prc = array(
					':p_modo' => 'I',
					':p_n_id_disco' => $n_id_disco,
					':p_n_linea' => $n_linea,
					':p_c_linea' =>utf8_encode($linea),
					':p_c_disco' =>$nombre_archivo,
					':p_c_proceso' =>$proceso,
					':p_n_medio_pago'=>null,
					':p_id_obligacion'=>null,
					':p_d_error'=>null,
					':p_n_ddjj'=>null,
					':p_error'=>null,
					':p_error_ora' => null
	    );

	    $sql = 'begin PAC_INSERTAR.PRC_INS_ARCHIVO_INTERFAZ(:p_modo,
														:p_n_id_disco,
														:p_n_linea,
														:p_c_linea,
														:p_c_disco,
														:p_c_proceso,
														:p_n_medio_pago,
														:p_id_obligacion,
														:p_d_error,
														:p_n_ddjj,
														:p_error,
														:p_error_ora);
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

fclose($archivo);

if($cant_lineas!=0){
    $db_procedure->db_commit();
    $response->resultado = 'OK';
    $response->disco = $n_id_disco;
}else{
    $response->resultado = 'El archivo que intenta procesar se encuentra vacío';
}
session_start();
echo json_encode($response);

?>