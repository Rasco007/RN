<?php
$response = new stdClass();
require_once(FRAMEWORK_PROYECTO_DIR."Recursos/generar_excel/PHPExcel.php");
require_once(FUNCIONES_FRAMEWORK_PROY."genera_excel.php");

$archivo = $_FILES['file'];
$operativo = $_POST['operativo'];

$nombre_archivo = $archivo['name'];
$tipo_archivo = $archivo['type'];
$tamano_archivo = $archivo['size'];
$dir_actual = $archivo['tmp_name'];

//Se valida tipo de archivo
if ($tipo_archivo != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'){
    $response->resultado = "El formato de archivo no es válido para el procesamiento.";
    die(json_encode($response));
}

//Comprobamos que el archivo se corresponda con el declarado en el operativo.
$procedure = "pac_operativos_fisca.fun_valida_archivo(:p_id_operativo, :p_d_archivo)";

$parametros = array(':p_id_operativo' => $operativo, ':p_d_archivo' => $nombre_archivo);

$data = getArrayResult($procedure, $parametros);

$archivo_operativo = $data->datos[0]['ARCHIVO_OPERATIVO'];
$codigo_archivo = $data->datos[0]['CODIGO_ARCHIVO'];

if ($archivo_operativo == null){
    $response->resultado = "El archivo cargado no se corresponde con el declarado en el operativo.";
    die(json_encode($response));
}

if ($codigo_archivo == 1){
    $cant_columnas = 6;
}
if ($codigo_archivo == 2){
    $cant_columnas = 4;
}
if ($codigo_archivo == 3){
    $cant_columnas = 8;
}

//Devolvemos el id_disco del proximo archivo a guardar
$procedure = "pac_operativos_fisca.fun_devuelve_disco()";

$parametros = array();

$data = getArrayResult($procedure, $parametros);

$id_archivo = $data->datos[0]['ID_DISCO'];


//Creamos el excel y hacemos el recorrido por fila y columna
$objPHPExcel = PHPExcel_IOFactory::load($dir_actual);
$filas_insertadas = 0;
$worksheet = $objPHPExcel->getSheet(0);
$highestRow = $worksheet->getHighestRow(); // e.g. 10
$vacias_consecutivas = 0;
$fila = null;
for ($row = 2; $row <= $highestRow; $row++) {
	// controlo si se saltearon muchos renglones en blanco para no tener que procesar hasta el final del archivo
	if($vacias_consecutivas <= 3){
		// vemos si la primer columna tiene algo, si no tiene nada, descartamos toda la fila
		$aux = $worksheet->getCellByColumnAndRow(0, $row);
		if($aux->getValue()){
			for ($col = 0; $col <= $cant_columnas; $col++) {
				$cell = $worksheet->getCellByColumnAndRow($col, $row);
				$val = $cell->getValue();
				if($col == 0 && $val != null) {
					$fila = $val;
				}else if($val != null){
					$fila .= '|' . $val;
				}
			}
			
			$vacias_consecutivas = 0;
		} else {
			$vacias_consecutivas = $vacias_consecutivas + 1;
		}
		
		if($fila != null) {
			$param_prc = array(
				':p_n_id_disco' => $id_archivo,
				':p_c_linea' => $fila,
				':p_n_linea' => $filas_insertadas,
				':p_c_disco' => $nombre_archivo,
				':p_error' => null,
				':p_error_ora' => null
			);

			$sql =
				'begin PAC_OPERATIVOS_FISCA.PRC_INSERTAR_ARCHIVO(
					:p_n_id_disco,
					:p_c_linea,
					:p_n_linea,
					:p_c_disco,
					:p_error,
					:p_error_ora);
				end;';
			$db_procedure = new DB_Procedure($sql);
			$db_procedure->setQuery($sql);

			$null = null;
			$result = $db_procedure->execute_query($param_prc, $null, FALSE);
			if ($result->resultado != 'OK') {
				die(json_encode($result));
			} elseif ($param_prc[':p_error'] != null) {
				$result->resultado = $param_prc[':p_error'];
				die(json_encode($result));
			}

			$fila = null;
			$filas_insertadas = $filas_insertadas + 1;
		}
	}
}

$db_procedure->db_commit();
$response->resultado = 'OK';
$response->id_archivo = $id_archivo;
$response->filas_insertadas = $filas_insertadas;
$response->codigo_archivo = $codigo_archivo;
echo json_encode($response);

?>