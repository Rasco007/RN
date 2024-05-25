<?php 

	$db_query = new DB_Query("SELECT id_multa.nextval id_multa from dual");
	$row_query = $db_query->do_query();
	$id_multa = $row_query[0]['ID_MULTA'];
	$response->id_multa = $id_multa;
	
echo json_encode($response);
?>