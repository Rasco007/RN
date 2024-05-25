

	$db_query = new DB_Query("SELECT id_instancia.nextval id_instancia from dual");
	$row_query = $db_query->do_query();
	$id_instancia = $row_query[0]['ID_INSTANCIA'];
	$response->id_instancia = $id_instancia;
	
echo json_encode($response);
?>