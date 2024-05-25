<?php

	$id_contribuyente = $_POST['id_contribuyente'];
	$id_obligacion = $_POST['id_obligacion'];

	$db_query = new DB_Query("
	    SELECT distinct n_instancia
		  from instancias 
		 where c_instancia = '035' 
		   and id_contribuyente = :id_contribuyente
		   and id_obligacion_multa = :id_obligacion");

	$param = array(':id_obligacion' => $id_obligacion,
				':id_contribuyente' => $id_contribuyente);
	$row_query = $db_query->do_query($param);

	// cuento cantidad de instancias
	$db_query = new DB_Query("
		SELECT count(1) camt
		  from instancias 
		 where id_contribuyente = :id_contribuyente
		   and n_instancia = :n_instancia");

	$param = array(':id_contribuyente' => $id_contribuyente,
					':n_instancia' => $row_query[0]['N_INSTANCIA']);
	$row_query = $db_query->do_query($param);

	if ($row_query[0]['CANT'] < 1){
    	$result->resultado = 'NOOK';
		$result->error = 'No se encontraron registros de instancias!';
	}else{
    	$result->resultado = 'OK';
	}

	echo json_encode($result);

?>