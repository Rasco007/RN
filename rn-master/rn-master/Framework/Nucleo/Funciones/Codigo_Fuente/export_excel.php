<?php
set_time_limit( 6000 );
ini_set("memory_limit","512M");
$filename = "Export_".date("Y-m-d_H-i",time()).'.xls';
header("Content-type: application/vnd.ms-excel; name='excel'");  
header("Content-Disposition: filename=$filename");  
header("Pragma: no-cache");  
header("Expires: 0"); 
ob_clean();
flush();
session_write_close();

$columnas = str_replace('["',"'",$_POST['columnas']);
$columnas = str_replace('"]',"'",$columnas);
$columnas = str_replace('"',"'",$columnas);


$columna_tr = str_replace('["',"'<tr><td>'||",$_POST['columnas']);
$columna_tr = str_replace('"]',"||'</td></tr>'",$columna_tr);
$columna_tr = str_replace('","',"||'</td><td>'||",$columna_tr);

//die($columna_tr);

$parametros = json_decode($_POST['param']);
$cond = json_decode($_POST['cond'],true);

$sql = "SELECT c.d_column_title, c.m_visible
		FROM grid_queries q
		JOIN grid_columns c ON c.id_grid_query = q.id_grid_query
		WHERE q.id_menu = :id_menu
			and q.n_grid = :n_grid
			AND c.d_column_name IN(".$columnas.")";
			
$db_query = new DB_Query($sql);
$param = array(':id_menu' => $_POST['id_menu'],
			   ':n_grid' => $_POST['n_grid']);
$row_titulos = $db_query->do_query($param);

$ql = new QL_Busqueda($_POST['id_menu'],$_POST['n_grid'],$_POST['m_autoquery'],$_POST['adv'],$cond);
$sql = $ql->getQuery();
$sql = $sql ." ORDER BY ".$_POST['sidx'].' '.$_POST['sord'];


$sql = 'SELECT '.$columna_tr.' as CAMPO FROM ('.$sql.')';

//die($sql);

$db_query->setQuery($sql);
$rows = $db_query->do_query($parametros);

echo '<table><tr>';
foreach($row_titulos as $titulo){
	echo utf8_decode('<th>'.$titulo['D_COLUMN_TITLE'].'</th>');
}
echo '</tr>';

echo utf8_decode(implode('',array_column($rows, 'CAMPO') ));

//foreach($rows as $row)echo $row['CAMPO'];

echo '</table>';

session_start();
resetear_tiempo_sesion();
exit;
?>