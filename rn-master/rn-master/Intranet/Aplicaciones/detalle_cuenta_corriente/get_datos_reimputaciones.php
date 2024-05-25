<?php

	$id_contribuyente = $_POST['id_contribuyente'];
	$id_obligacion = $_POST['id_obligacion'];

	$db_query = new DB_Query("
	    SELECT count(1) cant
		FROM ajuste_cta_cte aj  WHERE n_ajuste in (select distinct n_ajuste 
		             from ajuste_cta_cte
		             where id_obligacion = :id_obligacion)
		and id_obligacion != :id_obligacion");

	$param = array(':id_obligacion' => $id_obligacion);
	$row_query = $db_query->do_query($param);

	if ($row_query[0]['CANT'] < 1){
    	$result->resultado = 'NOOK';
		$result->error = 'No existen datos para el contribuyente selecionado.';
	}else{
    	$result->resultado = 'OK';
	}

	echo json_encode($result);

?>