<?php
/*
error_reporting(E_ALL);
ini_set('display_errors', '1');*/
ini_set("memory_limit", "-1");
set_time_limit(300);

require_once(FRAMEWORK_DIR."Recursos/Mpdf/6.1/mpdf.php");
session_write_close();

$orientacion = ($_POST['orientacion']);
$title = ($_POST['title']);
$columnas_ar = json_decode($_POST['columnas']);
$parametros = json_decode($_POST['param']);
$cond = json_decode($_POST['cond'],true);
$filters = json_decode($_POST['filters'],true); //filtros del searchtoolbar

//uno los filtros del searchtoolbar y de la busqueda masivos
$filtros->busqueda = $cond;
$filtros->grilla = $filters;

if($orientacion == 'V'){
	$ancho_leyenda = '400px';
	$mpdf=new mPDF('c','A4','','',10,10,35,25,10,10);
}
if($orientacion == 'H'){
	$ancho_leyenda = '750px';
	$mpdf=new mPDF('c','A4-L','','',10,10,35,25,10,10); //LANDSCAPE
}

$mpdf->cacheTables = true;
$mpdf->simpleTables = true;
$mpdf->packTableData = true;


$sql = "SELECT c.d_column_title, c.m_visible, c.d_column_name, c.d_extra_param,
		(select d_titulo from menu where id_menu = :id_menu) as TITULO_MENU,
		(select D_VARIABLE from parametros  where c_constante = 'LEYENDA_REPORT') as LEYENDA_REPORT
		FROM grid_queries q
		JOIN grid_columns c ON c.id_grid_query = q.id_grid_query
		WHERE q.id_menu = :id_menu
			AND q.n_grid = :n_grid
		order by n_column asc";
$db_query = new DB_Query($sql);
$param = array(':id_menu' => $_POST['id_menu'],
	':n_grid' => $_POST['n_grid']);
$row_titulos = $db_query->do_query($param);

$ql = new QL_Busqueda($_POST['id_menu'],$_POST['n_grid'],$_POST['m_autoquery'],$_POST['adv'],$filtros);
$sql = $ql->getQuery();

if($_POST['sidx'] != '' && $_POST['sord'] != null){
	$v_sidx = $_POST['sidx'];
	$v_sord = $_POST['sord'];
}
else{
	$v_sidx = '1';
	$v_sord = 'asc';
}

$sql = $sql ." ORDER BY ".$v_sidx.' '.$v_sord;

$db_query->setQuery($sql);
$rows = $db_query->do_query($parametros, OCI_NUM);
$excel_final = '
	<html>
		<body>
			<style>
				body{font-family: Tahoma;}
				.header{width: 100%;  font-size: 10px; }
				.header .superior{width: 100%;}
				.header .superior .logo{width: 140px; float:left;}
				.header .superior .leyenda_report{ font-weight:bold; font-size: 12px; width: '.$ancho_leyenda.'; float:left; text-align:center;}
				.header .superior .info{width: 130px; float:right; font-size: 10px;}
				.header .titulo{width: 100%; font-size: 15px; font-weight: bold; text-align:center;}
				.table_pdf{
					font-size: 10px;
					border: 1px solid #000;
					border-collapse: collapse;
					margin: 0 auto;
				}
				.table_pdf th, .table_pdf td{border: 1px solid #000; padding:2px}
				.table_pdf th{background:#999999; color:#ffffff;}
				
				
				.caja_filtros{ font-size: 8px; border: solid 1px #000; padding:3px; margin-bottom:5px; border-radius:2px; background:#e0e0e0; }
				.caja_filtros .titulo_filtros{font-weight:bold; font-size: 10px; }
				div.text_filtros{ padding:0 0 0 20px; margin:0; list-style-type: none}
				
				.comentario{font-size: 10px; padding-bottom:5px;}
				
				.footer{ font-size: 10px; border-top: solid 2px #000000; padding:5px 5px 0px 5px ;}
				.footer .nombre_reporte{text-align:left; float: left; width:150px;}
				.footer .pagina{text-align:right; float: right; width:150px;}
			</style>';

if($_POST['html_filtros'] != ''){

	$html_filtros = str_replace('#A_B#','<b>',$_POST['html_filtros']);
	$html_filtros = str_replace('#C_B#','</b>',$html_filtros);

	$html_filtros = str_replace('#A_LI#','',$html_filtros);
	$html_filtros = str_replace('#C_LI#',' &nbsp;&nbsp;&nbsp;&nbsp; ',$html_filtros);

	$html_filtros = str_replace('#FLECHA#','&rarr;',$html_filtros);

	$excel_final .= '<div class="caja_filtros">
						<span class="titulo_filtros">Filtros utilizados</span>
						<div class="text_filtros">
							'.$html_filtros.'
							<div style="clear:both;"></div>
						</div>
					</div>';
}



if($_POST['txt_comentario_informe'] != ''){
	$excel_final .= '<div class="comentario">'.nl2br($_POST['txt_comentario_informe']).'</div>';
}

$excel_final .= '<table class="table_pdf"><tr>';

// Arma los títulos
foreach($row_titulos as $titulo){
	if($titulo['M_VISIBLE'] == 'S' && in_array( $titulo['D_COLUMN_NAME'], $columnas_ar)){
		$excel_final .= '<th>'.$titulo['D_COLUMN_TITLE'].'</th>';
	}
}

$excel_final .= '</tr>';

foreach($rows as $row){

	$excel_final .= '<tr>';
	for($i=0;$i < count($row); $i++) {
		$row_titulos[$i]['D_EXTRA_PARAM'] = str_replace(":","=",$row_titulos[$i]['D_EXTRA_PARAM']);
		$row_titulos[$i]['D_EXTRA_PARAM'] = str_replace(","," ",$row_titulos[$i]['D_EXTRA_PARAM']);
		if($row_titulos[$i]['M_VISIBLE'] == 'S'  && in_array( $row_titulos[$i]['D_COLUMN_NAME'], $columnas_ar)) $excel_final.= '<td '.$row_titulos[$i]['D_EXTRA_PARAM'].'>'.$row[$i] .'</td>';
	}
	$excel_final .= '</tr>';

}

$excel_final .= '</table>
	</body>
</html>';

$filename = $title.'-'.date("YmdHi",time()).'.pdf';
session_start();
$header = '<div class="header">
				<div class="superior">
					<div class="logo">
						<img width="180px" src="../Proyecto/Imagenes/logo_pdf.png" />
					</div>
					<div class="leyenda_report">
						'.$titulo['LEYENDA_REPORT'].'
					</div>
					<div class="info">
						<b>Usuario</b>: '.$_SESSION['usuario'].'<br>
						<b>Fecha</b>: '.date('d/m/Y H:i').'
					</div>
				</div>
				<div class="titulo">'.$titulo['TITULO_MENU'].' &rArr; '.$title.'</div>
			</div>';

$footer = '<div class="footer">
				<div class="nombre_reporte">Cantidad total de registros: '.count($rows).'</div>
				<div class="pagina">P&aacute;gina <span>{PAGENO}</span> de <span>{nb}</span></div>
			</div>';


$mpdf->SetTitle($titulo['TITULO_MENU'].' - '.$title);
$mpdf->SetHTMLHeader($header);
$mpdf->SetHTMLFooter($footer);

$mpdf->WriteHTML(($excel_final));
$mpdf->Output($filename,'I');

resetear_tiempo_sesion();
?>