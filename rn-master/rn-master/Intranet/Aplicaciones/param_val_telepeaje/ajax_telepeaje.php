<?php

$c_dato = $_POST['c_dato'];
	
$db_query = new DB_Query(
	"SELECT d_dato from tablas_generales where n_tabla=344 and c_dato = :c_dato"
);

$par = array(':c_dato' => $c_dato);
$row_query = $db_query->do_query($par);

echo json_encode($row_query[0]);

?>