<?php

	require_once(APLICACIONES.'consulta_din/php/constructor_excel.php');
	
	
	$p_id_cons_dinamica = $_POST['p_id_cons_dinamica'];
	$p_id_consulta_din = $_POST['p_id_consulta_din'];
	$p_consulta = $_POST['p_consulta'];
	

	$filename = 'Resultado consulta';
	$parametres = array(
		':p_id_cons_dinamica' => $p_id_cons_dinamica,
		':p_id_consulta_din' => $p_id_consulta_din
	);

	$procedure = "PAC_CONS_DINAMICA.FUN_DATOS_RESU(:p_id_cons_dinamica)";

    $resultado = getArrayResult($procedure, $parametres);
    $row_titulos = $resultado->datos;

	$procedure = "PAC_CONS_DINAMICA.FUN_DATOS_PARAMS(:p_id_consulta_din)";

    $resultado = getArrayResult($procedure, $parametres);
    $rows = $resultado->datos;

	$filtros = array();

	foreach($rows as $row){
		$filtros[$row['D_PARAMETRO']] = is_null($row['D_VALOR']) ? "" : $row['D_VALOR'];
	}
	
	$sql = "select ";
	
	$titulos = array();
	$indexTitles = 0;
	foreach($row_titulos as $titulo){
		$titulos[$indexTitles] = array(str_replace("</br>", " ", $titulo['D_TITULO']) => $titulo['TITLE_TYPE']);
		$indexTitles++;
		if ($indexTitles != 1){
			$sql = $sql.", d_valor".$indexTitles;
		} else {
			$sql = $sql."d_valor".$indexTitles;
		}
	}

	$sql = $sql." from TMP_CONSULTAS_DINAMICAS_RESU where id_consulta_din = :p_id_consulta_din";

	
	$excel = new TDIExcelXLSX($filename);
	
	$excel->downloadExcel($sql,$parametres,$titulos,$filtros, $p_consulta);
?>