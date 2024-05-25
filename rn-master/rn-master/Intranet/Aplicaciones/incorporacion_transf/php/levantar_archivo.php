<?php
$response = new stdClass();
require_once(FRAMEWORK_PROYECTO_DIR."Recursos/generar_excel/PHPExcel.php");
require_once(FUNCIONES_FRAMEWORK_PROY."genera_excel.php");

$archivo = $_GET['archivo'];

$nombre_archivo = $_FILES[$archivo]['name'];
$tipo_archivo = $_FILES[$archivo]['type'];
$tamano_archivo = $_FILES[$archivo]['size'];
$dir_actual = $_FILES[$archivo]['tmp_name'];

//Devolvemos el id_disco del proximo archivo a guardar
$procedure = "pac_bonos.fun_devuelve_disco()";

$parametros = array();

$data = getArrayResult($procedure, $parametros);

$id_archivo = $data->datos[0]['ID_DISCO'];


//Creamos el excel y hacemos el recorrido por fila y columna
$objPHPExcel = PHPExcel_IOFactory::load($dir_actual);
$filas_insertadas = 0;
$worksheet = $objPHPExcel->getSheet(0);
$worksheetTitle     = $worksheet->getTitle();
$highestRow         = $worksheet->getHighestRow(); // e.g. 10
$highestColumn      = $worksheet->getHighestColumn(); // e.g 'F'
$highestColumnIndex = PHPExcel_Cell::columnIndexFromString($highestColumn);
$nrColumns = ord($highestColumn) - 64;
for ($row = 1; $row <= $highestRow; $row++) {
    //print_r($highestRow);
    for ($col = 0; $col <= $cant_lineas; $col++) {
        $cell = $worksheet->getCellByColumnAndRow($col, $row);
        $val = $cell->getValue();
        if($col == 0) {
            $fila = $val;
        }else {
            $fila .= '|' . $val;
        }
    }

    $param_prc = array(
        ':p_n_id_disco' => $id_archivo,
        ':p_c_linea' => $fila,
        ':p_n_linea' => $filas_insertadas,
        ':p_c_disco' => $nombre_archivo + '.csv',
        ':p_error'=>null,
        ':p_error_ora' => null
    );

    $sql =
        'begin pac_bonos.PRC_INSERTAR_ARCHIVO(
				:p_n_id_disco,
				:p_c_linea,
				:p_n_linea,
				:p_c_disco,
				:p_error,
				:p_error_ora);
			end;';
    $db_procedure = new DB_Procedure($sql);
    $db_procedure->setQuery($sql);

    $null=null;
    $result = $db_procedure->execute_query($param_prc,$null,FALSE);
    if($result->resultado != 'OK') {
        die(json_encode($result));
    }elseif ($param_prc[':p_error'] != null) {
        $result->resultado = $param_prc[':p_error'];
        die(json_encode($result));
    }

    $fila = '';
    $filas_insertadas = $filas_insertadas + 1;
}

$db_procedure->db_commit();
$response->resultado = 'OK';
$response->id_archivo = $id_archivo;
$response->filas_insertadas = $filas_insertadas;
$response->codigo_archivo = $codigo_archivo;
echo json_encode($response);

?>