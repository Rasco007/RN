<?php
	$p_oper = $_POST['p_oper'];
	$filtro = $_POST['filtro'];

	if ($p_oper === 'cuit'){
		$db_query = new DB_Query("SELECT id_contribuyente, fun_formato_cuit(n_cuit) as cuit, d_denominacion as denominacion from contribuyentes c where n_cuit = :filtro");

		$par = array(':filtro' => $filtro);
		$row_query = $db_query->do_query($par);

		echo json_encode($row_query[0]);
	}

	if($p_oper === 'denominacion'){
		$db_query = new DB_Query(
			"SELECT v.id_contribuyente, v.cuit, v.denominacion
		FROM (
			SELECT id_contribuyente, fun_formato_cuit(n_cuit) as cuit, d_denominacion as denominacion
			from contribuyentes c where substr (fun_transformar_cadena (d_denominacion), 1, 200) like fun_transformar_cadena ('%' || :filtro || '%')
		) v where rownum <= 5");

		$par = array(':filtro' => $filtro);
		$row_query = $db_query->do_query($par);

		for ($i=0; $i < count($row_query); $i++)
		{
			$options['data_contrib'][] = array(
				'label' => $row_query[$i]['CUIT'].' - '.$row_query[$i]['DENOMINACION'],
				'razon_social' => $row_query[$i]['DENOMINACION'],
				'cuit' => $row_query[$i]['CUIT'],
				'id_contribuyente' => $row_query[$i]['ID_CONTRIBUYENTE']
			);
		}

		echo json_encode($options);
	}

?>