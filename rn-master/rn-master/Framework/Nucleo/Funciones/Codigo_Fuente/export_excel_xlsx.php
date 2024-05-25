<?php
set_time_limit(7200);
require_once(FRAMEWORK_DIR."Recursos/Spout/src/Spout/Autoloader/autoload.php");
define('XLSX_EXT', '.xlsx');

use Box\Spout\Writer\WriterFactory;
use Box\Spout\Common\Type;
use Box\Spout\Writer\Style\StyleBuilder;
use Box\Spout\Writer\Style\Color;
use Box\Spout\Writer\Style\Border;
use Box\Spout\Writer\Style\BorderBuilder;

session_write_close();
$encabezado = $numericos = $importes = $filtros = array();
$campos_txt_fwk = array('TXT', 'TXTMAY', 'TXTMIN', 'DATE', 'DATETIME', 'HTML');
$campos_int_fwk = array('INT', 'NUM', 'COD_BARRAS', 'SEQ', 'ROWID', 'HORA');
$campos_float_fwk = array('IMP', 'IMP_3', 'PORC', 'DEC');

if ($_POST['src_type'] == 'grid') generar_excel_xlsx_grid();

function generar_excel_xlsx_grid(){
	$title = str_replace(':', '', $_POST['title']);
	$filename = obtener_nombre($title);
	
	header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
	header("Content-Disposition: filename=$filename");  
	header("Pragma: no-cache");  
	header("Expires: 0");
	
	ob_clean();
	flush();
	
	if (!$_POST['columnas']) die('Error: No se han definido las columnas a exportar.');
	$comentario = $_POST['txt_comentario_informe'];	
	/***	SE LIMPIA LA INFORMACION RECIBIDA	***/
	$columnas = str_replace('["',"'",$_POST['columnas']);
	$columnas = str_replace('"]',"'",$columnas);
	$columnas = str_replace('"',"'",$columnas);
	
	$columna_tr = str_replace('["',"'<tr><td>'||",$_POST['columnas']);
	$columna_tr = str_replace('"]',"||'</td></tr>'",$columna_tr);
	$columna_tr = str_replace('","',"||'</td><td>'||",$columna_tr);
			
	$parametros = json_decode($_POST['param']);
	$cond = json_decode($_POST['cond'],true);
	/**********************************************/
	
	/***	OBTENGO COLUMNAS DE GRILLAS			***/
	$sql = "SELECT c.d_column_title title, CASE WHEN c.c_tipo_dato = 'DATETIME' THEN c.d_column_name||'_fhora' ELSE c.d_column_name END name, c.m_visible, c.c_tipo_dato type
			FROM grid_queries q
			JOIN grid_columns c ON c.id_grid_query = q.id_grid_query
			WHERE q.id_menu = :id_menu
				AND q.n_grid = :n_grid
				AND c.c_tipo_dato <> 'HTML'
				AND c.d_column_name IN(".$columnas.") ORDER BY n_column";
	
	$db_query = new DB_Query($sql);
	$param = array(':id_menu' => $_POST['id_menu'],
				   ':n_grid' => $_POST['n_grid']);
				   
	$row_titulos = $db_query->do_query($param);
	/**********************************************/
	$cond = json_decode($_POST['cond'],true);
	$filters = json_decode($_POST['filters'],true); //filtros del searchtoolbar

	//uno los filtros del searchtoolbar y de la busqueda masivos
	$filtros1->busqueda = $cond;
	$filtros1->grilla = $filters;
	/***	OBTENGO CONDICIONES DE BUSQUEDA		***/
	$ql = new QL_Busqueda($_POST['id_menu'],$_POST['n_grid'],$_POST['m_autoquery'],$_POST['adv'],$filtros1);
	$sql = $ql->getQuery();
	
	if ($_POST['sidx'] && $_POST['sord'])$sql = $sql ." ORDER BY ".$_POST['sidx'].' '.$_POST['sord'];
	else if($_POST['sord']) $sql = $sql ." ORDER BY  1 ".$_POST['sord'];
	else $sql = $sql ." ORDER BY  1 asc";
	/**********************************************/
	
	/***			OBTENGO DATOS				***/
	// die(print_r($parametros));
	foreach($row_titulos as $k => $col){
		$cols[] = $col['NAME'];
	}
	
	//$sql = 'SELECT '.str_replace("'","",$columnas).' FROM ('.$sql.')';
	$sql = 'SELECT '.implode(',', $cols).' FROM ('.$sql.')';
	$db_query->setQuery($sql);
 
	$rows = $db_query->do_query($parametros);
	
	/* Sustituyo los carácteres de la función de base fun_xss_filter
	por su correspondiente para que se vean en el Excel */
	$chars_security = ["&lt;", "&gt;", "&quot;", "&apos;", "&#47;"];
	$real_char = ["<", ">", '"', "''", "/"];
	foreach ($rows as &$elem) {
		$elem = str_replace($chars_security, $real_char, $elem);
	}
	/**********************************************/
	global $encabezado, $numericos, $importes, $filtros;

	obtener_columnas_tipos($row_titulos);
	obtener_filtros_txt($_POST['html_filtros']);
	
	$filePath = 'php://output';
	$writer = WriterFactory::create(Type::XLSX);
	$writer->openToFile($filePath);
	agregar_titulo($writer, $title);
	agregar_encabezado_usuario($writer);
	
	if($filtros) agregar_filtros($writer, $filtros);
	if($comentario)agregar_comentario($writer, $comentario);
		
	$border = (new BorderBuilder())
				->setBorderBottom(Color::BLACK, Border::WIDTH_THIN)
				->setBorderTop(Color::BLACK, Border::WIDTH_THIN)
				->setBorderRight(Color::BLACK, Border::WIDTH_THIN)
				->setBorderLeft(Color::BLACK, Border::WIDTH_THIN)
				->build();

	$style = (new StyleBuilder())
				   ->setFontBold()
				   ->setFontColor(Color::WHITE)
				   ->setBorder($border)
				   ->setBackgroundColor(Color::rgb(0,76,153))
				   ->build();
		   
	$writer->addRowWithStyle($encabezado, $style);
	
	$styleContent = (new StyleBuilder())
					->setBorder($border)
					->build();
					
	foreach($rows as $k => $v){
		foreach($numericos as $field) $v[$field] = floatval($v[$field]);
		foreach($importes as $field) $v[$field] = floatval(conv_importe($v[$field]));		
		$writer->addRowWithStyle($v, $styleContent);
	}

	$writer->close();

}

function generar_excel_xlsx_tmp($sql, $param, $cols, $filename, $title, $filtros = null, $comentario = null,
$llevaFecha = true/*Agrego booleano de fecha por requerimientos especificos del proyecto*/){
	$filename = obtener_nombre($filename);
	
	header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
	header("Content-Disposition: filename=$filename");  
	header("Pragma: no-cache");  
	header("Expires: 0");
	
	ob_clean();
	flush();
	
	global $encabezado, $numericos, $importes;
	
	obtener_columnas_tipos($cols);
	
	$db_query = new DB_Query($sql);	
	$rows = $db_query->do_query($param);
	
	$filePath = 'php://output';
	$writer = WriterFactory::create(Type::XLSX);
	$writer->openToFile($filePath);
	agregar_titulo($writer, $title);

	if($llevaFecha)
		agregar_encabezado_usuario($writer);
	if($filtros) agregar_filtros($writer, $filtros);
	if($comentario)agregar_comentario($writer, $comentario);
	
	$border = (new BorderBuilder())
				->setBorderBottom(Color::BLACK, Border::WIDTH_THIN)
				->setBorderTop(Color::BLACK, Border::WIDTH_THIN)
				->setBorderRight(Color::BLACK, Border::WIDTH_THIN)
				->setBorderLeft(Color::BLACK, Border::WIDTH_THIN)
				->build();

	$style = (new StyleBuilder())
				   ->setFontBold()
				   ->setFontColor(Color::WHITE)
				   ->setBorder($border)
				   ->setBackgroundColor(Color::rgb(0,76,153))
				   ->build();
	
	$writer->addRowWithStyle($encabezado, $style);
			   
	$styleContent = (new StyleBuilder())
					->setBorder($border)
					->build();
					
	foreach($rows as $k => $v){
		foreach($numericos as $field) $v[$field] = floatval($v[$field]);
		foreach($importes as $field) $v[$field] = floatval(conv_importe($v[$field]));
		$writer->addRowWithStyle($v, $styleContent);
	}
	
	$writer->close();
}

function conv_importe($imp){
	return str_replace(",",".",str_replace(".","",$imp));
}

function obtener_nombre($nombre){
	$title = ($nombre)?$nombre:"Export_".date("Y-m-d_H-i",time()).'.xlsx';
	$ext = (strripos (strtolower ($title), XLSX_EXT) === false)?XLSX_EXT:'';
	$filename = str_replace(' ','_',$title).$ext;
	return $filename;
}

function agregar_titulo($writer, $titulo){
	$data = array("",$titulo);
	
	$style = (new StyleBuilder())
					->setFontSize(14)
					->setFontBold()
					->setFontUnderline()
					->setFontColor(Color::rgb(51,122,183))
					->build();
		   
	$writer->addRowWithStyle($data, $style);
	$writer->addRow(array(''));
}

function agregar_comentario($writer, $comentario){
	$data = array("Comentario");
	
	$style = (new StyleBuilder())
					->setFontBold()
					->setFontUnderline()
					->setFontColor(Color::rgb(51,122,183))
					->build();
		   
	$writer->addRowWithStyle($data, $style);
	$writer->addRow(array($comentario));
	$writer->addRow(array(''));
}

function agregar_encabezado_usuario($writer){	
	$header = array('Fecha ');
	date_default_timezone_set('America/Argentina/Buenos_Aires');
	$data = array(date('d/m/Y H:i:s', time()));
	
	$style = (new StyleBuilder())
					->setFontBold()
					->setFontUnderline()
					->setFontColor(Color::rgb(51,122,183))
					->build();
		   
	$writer->addRowWithStyle($header, $style);
	$writer->addRow($data);
	$writer->addRow(array(''));
}

function agregar_filtros($writer, $filtros){
	$header = array('Filtros Utilizados');
	$style = (new StyleBuilder())
					->setFontBold()
					->setFontUnderline()
					->setFontColor(Color::rgb(51,122,183))
					->build();
	
	$writer->addRowWithStyle($header, $style);
		   
	foreach($filtros as $v) $writer->addRow($v);
	$writer->addRow(array(''));
}

function obtener_filtros_txt($f){
	global $filtros;
	
	if($f != ''){	
		$filtros = preg_split( "/(#A_LI#)|(#C_LI#)/", $_POST['html_filtros'] );
		$filtros = array_filter($filtros, function($value) { return (($value !== '') && ($value !== ' '));});
		
		foreach($filtros as $k => $v){
			$filtros[$k] = preg_split( "/(#A_B#)|(#C_B#)/", $v );
			$filtros[$k] = array_filter($filtros[$k], function($value) { return (($value !== '') && ($value !== ' '));});
		}
	}
}

function obtener_columnas_tipos($row_titulos){
	global $encabezado, $numericos, $importes, $campos_txt_fwk, $campos_int_fwk, $campos_float_fwk;
	
	foreach ($row_titulos as $v){
		$encabezado[$v['NAME']] = normalizar_formato($v['TITLE']);
		
		if (in_array($v['TYPE'], $campos_txt_fwk)) continue;
		else if (in_array($v['TYPE'], $campos_int_fwk))$numericos[] = strtoupper ($v['NAME']);
		else if (in_array($v['TYPE'], $campos_float_fwk))$importes[] = strtoupper ($v['NAME']);
	}

}

function normalizar_formato($txt){
	$txt = mb_strtoupper($txt);
	$txt = preg_replace("/<BR\s*\/?>/", " ", $txt);
	$txt = strip_tags($txt);
	return $txt;
}

session_start();
?>
