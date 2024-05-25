<?php
checklogin();
session_write_close();
$filtros = json_decode($_POST['filtros']);
$campos = json_decode($_POST['campos']);
$id_lista = $_POST['tipo'];
$cond = $_GET['cond'];
$exacto = $_POST['exacto'];

$db_pager = new DB_Pager(new QL_Lista($id_lista,$filtros,$campos,$cond,$exacto),
    'S',
    $_POST['page'],
    htmlentities($_POST['rows']),
    $_POST['sidx'],
    $_POST['sord']
);

$parametros = array(null);

for($j=0;$j<count($filtros);$j++){
   $parametros[0][':p_filtro_lista'.$j.''] = $filtros[$j];
}
$response = $db_pager->do_pager( $parametros[0] );

session_start();
echo json_encode($response);

?>