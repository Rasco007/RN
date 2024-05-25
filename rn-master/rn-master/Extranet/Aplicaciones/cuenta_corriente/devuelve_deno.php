<?php
/*require_once('../../funciones/db_pager.php');
require_once('../../funciones/query_loader.php');
require_once('../../funciones/funciones.php');
checklogin();*/
/*require_once(FUNCIONES_FRAMEWORK."db_pager.php");
require_once(FUNCIONES_FRAMEWORK."query_loader.php");
require_once(FUNCIONES_FRAMEWORK.'funciones.php');*/

$n_cuit = $_POST['n_cuit'];
$db_query = new DB_Query("SELECT C.ID_CONTRIBUYENTE as ID_CONTRIBUYENTE, C.D_DENOMINACION as DENOMINACION FROM CONTRIBUYENTES C WHERE C.N_CUIT = :n_cuit");
$parametros = array(':n_cuit' => $n_cuit);
$row_query = $db_query->do_query($parametros);

echo json_encode($row_query[0]);

?>