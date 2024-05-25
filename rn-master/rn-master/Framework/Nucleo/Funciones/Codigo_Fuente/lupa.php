<?php
checklogin();
session_write_close();
$filtros = json_decode($_POST['filtros']);
$campos = json_decode($_POST['campos']);
$id_lista = $_POST['tipo'];
$cond = $_POST['cond'];
$exacto = $_POST['exacto'];

$queryl = new QL_Lista($id_lista,$filtros,$campos,$cond,$exacto);
$db_query = new DB_Query($queryl->getQuery());

$parametros = array(null);

for($j=0;$j<count($filtros);$j++){
	$parametros[0][':p_filtro_lista'.$j.''] = $filtros[$j];
}
$response = $db_query->do_query($parametros[0]);
session_start();
echo json_encode($response[0]);
?>