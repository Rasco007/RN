<?php

	ob_start();
	
	//Solucion provisoria a la falta de memoria para la impresion
	//ini_set('memory_limit',1024*1024*1024);

	/* ************************************** Definicion ******************************************
		Parametros{
			tres esenciales:	$arr_query -> 	contiene cada query correspondiente a cada hoja
												del Excel que se desea crear.
								$arr_nombres_hojas ->	contiene los nombres que seran asignados
														a cada hoja del Excel.
								$arr_titulos ->	contiene un array de strings que cada uno
												conforma una concatenacion de los titulos
												de cada columna que se imprimiran en la
												hoja de Excel. Ej: 'hola,mundo,que,tal'
			siete presindibles:	son parametros que se utilizan para configurar las porpiedades
								del Excel. En el caso de no querer completarlos, debe enviarse
								como parametro la cadena vacia.
		}
		
		Consideraciones{
			* La cantidad de querys debe ser igual que la cantidad de hojas (sino rompe).
			* En un principio solo se va a permitir imprimir pagianas con un maximo de 26
			columnas (se puede escalar para que sean mas, pero hay que modificar la funcion
			que las genera).
			* Si la cantidad de titulos (columnas a imprimir) es menor a la cantidad de columnas
			devueltas por la query, la funcion imprime hasta la columna especificada por el titulo
			(no rompe).
			*Los nombres de las hojas no pueden tener mas de 31 caracteres (limitado por el framework).
		}
	********************************************* FIN ********************************************/	
	
	function genera_excel_PHPExcel(
		$arr_query, 
		$arr_nombres_hojas, 
		$arr_titulos, 
		$filename, 
		$creador, 
		$modificado_por, 
		$titulo, 
		$tema, 
		$descripcion ,
		$palabras_clave, 
		$categoria
	){
		$logon  = new oci_Logon();
		$voConn= $logon->getCon();
		
		ini_set('max_execution_time', 123456);
		
		// Variable Excel
		$objPHPExcel = new PHPExcel();
		
		// Asignamos las propiedades del Excel
		$objPHPExcel
			->getProperties()	
			->setCreator($creador)
			->setLastModifiedBy($modificado_por)
			->setTitle($titulo)
			->setSubject($tema)
			->setDescription($descripcion)
			->setKeywords($palabras_clave)
			->setCategory($categoria);

		/** Error reporting */
		error_reporting(E_ALL);
		ini_set('display_errors', TRUE);
		ini_set('display_startup_errors', TRUE);
		date_default_timezone_set('Europe/London');
		
		$letra_num = '';

		define('EOL',(PHP_SAPI == 'cli') ? PHP_EOL : '<br />');
		
		$cant_hojas = count($arr_nombres_hojas);
		
		for($i = 0; $i <= $cant_hojas - 1; $i++){
			if($i >0){
				$objPHPExcel->createSheet($i);
			}
			$objPHPExcel->setActiveSheetIndex($i);
			
			$titulos = $arr_titulos[$i];
			
			$arr_letras = crearLetrasExcel(count($titulos));
			$cant_columnas = count($titulos) - 1;
			
			for($z = 0; $z <= $cant_columnas; $z++){
			
				/* Agregamos los titulos a cada hoja */
				$letra_num = $arr_letras[$z] . '1';
				$objPHPExcel->getActiveSheet()->setCellValue($letra_num, $titulos[$z]);
				
				//Ajustamos las columnas al tama�o de la informacion
				$objPHPExcel->getActiveSheet()->getColumnDimension($arr_letras[$z])->setAutoSize(true);
			}
			
			unset($titulos);
			
			// Le damos estilo a los titulos
			$linea_titulos = 'A1:'.$letra_num;
			$objPHPExcel->getActiveSheet()->getStyle($linea_titulos)->applyFromArray(
				array(
					'font'    => array(
						'bold'      => true
					),
					'alignment' => array(
						'horizontal' => PHPExcel_Style_Alignment::HORIZONTAL_LEFT,
					),
					'borders' => array(
						'top'     => array(
							'style' => PHPExcel_Style_Border::BORDER_THIN
						)
					),
					'fill' => array(
						'type'       => PHPExcel_Style_Fill::FILL_GRADIENT_LINEAR,
						'rotation'   => 90,
						'startcolor' => array(
							'argb' => 'FFA0A0A0'
						),
						'endcolor'   => array(
							'argb' => 'FFFFFFFF'
						)
					)
				)
			);
			
			// Rename worksheet
			$objPHPExcel->getActiveSheet()->setTitle($arr_nombres_hojas[$i]);
			
			// cargamos los datos
			//echo($arr_query[$i]);
			
			$sql = $arr_query[$i];
			$sql_cant = "SELECT COUNT(*) cant FROM (".$sql.")";

			$db_query_count = new DB_Query($sql_cant);
			$row_cant = $db_query_count->do_query();
			$total = $row_cant[0]['CANT'];
			$divisor = 1000;
			$cociente = ceil($total / $divisor);
			$resto = $total % $divisor;
			
			unset($row_cant);
			unset($db_query_count);
			
			$cant_fetch = 1000;
			$start = 0;
			
			$j = 2;
			for($i=0 ; $i <= $cociente ; $i++) {
				$db_query = new DB_Query();
				
				$query_pager = $sql." OFFSET ".$start." ROWS FETCH NEXT ".$cant_fetch." ROWS ONLY";
				$start += $cant_fetch;
				//die($query_pager);
				$db_query->setQuery($query_pager);
				
				$rows = $db_query->do_query($parametros, OCI_NUM);
				
				unset($db_query);
				unset($query_pager);
				
				//die(var_dump($rows));
				foreach($rows as $row){
					for($y = 0; $y<=$cant_columnas; $y++){
						$letra_num = $arr_letras[$y] . $j;
						//$datos[$letra_num] = $row[$y];
						$objPHPExcel->getActiveSheet()->setNewCell($letra_num,$row[$y]);
					}
					$j++;
				}
				
				unset($rows);
			}
			
			/*
			if(!$row){
				//echo($sql_statement);
				die($sql_statement.' - '.$arr_query[$i]);
			}
			
			//Para poder probar que funciona
			
			$j = 2;
			$terminado = false;
			while(!$terminado){
				
				for($y = 0; $y<=$cant_columnas; $y++){
					$letra_num = $arr_letras[$y] . $j;
					$objPHPExcel->getActiveSheet()->setCellValue($letra_num,$arr_query[$y]);
				}
				if($j == 4){
					$terminado = true;
				}
				$j++;
			}
			*/
			
			//Enmarcamos los datos
			$borde_datos = 'A2:'.$letra_num;
			$objPHPExcel->getActiveSheet()->getStyle($borde_datos)->applyFromArray(
				array(
					'borders' => array(
						'outline' => array(
							'style' => PHPExcel_Style_Border::BORDER_THICK,
							'color' => array('argb' => 'FF000000'),
						)
					)
				)	
			);
		}
		
		// Set active sheet index to the first sheet, so Excel opens this as the first sheet
		$objPHPExcel->setActiveSheetIndex(0);

		//die(var_dump($objPHPExcel->getActiveSheet()->getPureCellCollection()));
		
		// Save Excel 2007 file
		// Configuramos para poder imprimir el .xlsx por el browser (lo descarga directamente)
		header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
		header("Cache-Control: no-store, no-cache, must-revalidate");
		header("Cache-Control: post-check=0, pre-check=0", false);
		header("Pragma: no-cache");
		header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		header('Content-Disposition: attachment; filename="'.$filename.'.xlsx"');
		
		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');
		
		ob_end_clean();
		$objWriter->save('php://output');
		
		$objPHPExcel->disconnectWorksheets();
        unset($objPHPExcel);
	}
	
	function crearLetrasExcel($cant_letras){
		
		$letras = array();
		
		// MPampín
		// Solución al límite de 26 columnas
		for ($i = 0; $i < $cant_letras; $i++) {
			$numero = $i;
			$letra = '';
			do {
				$mod = $numero % 26;
				if($numero == $i) $mod++;
				$numero = floor($numero / 26);
				$letra = chr($mod + 64) . $letra;
			}while($numero > 0);
			$letras[] = $letra;
		}
		
		return $letras;
	}
?>