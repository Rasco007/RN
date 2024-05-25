<?php
	$parametros = array(':anio' => $_POST['anio']);
	
	$query = new DB_Query(
		"select f.f_feriado as feriado from feriados f where extract(year from f.f_feriado) >= (:anio - 1)"
	);
	
	$result = $query->do_query($parametros);
	
	if(!$result){
		$resultado->resultado = 'ERROR';
		die(json_encode($resultado));
	}
	
	$cant_filas = count($result);
	
	$array_feriados = array();
	
	for($i=0; $i<$cant_filas;$i++){
		$array_feriados[$i] = $result[$i]['FERIADO'];
	}
	
	$resultado->resultado = 'OK';
	$resultado->dias = $array_feriados;
	
	echo (json_encode($resultado));
?>