<?php
	$filtro = ($_REQUEST['term']);
	$oper = ($_REQUEST['oper']);

	if($oper == 1){//autocompleta datos del contribuyente por razon social
		$db_query = new DB_Query("SELECT 
										D_DENOMINACION as denominacion,
										fun_formato_cuit(n_cuit) as cuit,
										id_contribuyente,
										fun_cuit_ficticio(n_cuit) cuit_ficticio,
										c_tipo_documento,
										(SELECT 
											d_dato 
										from 
											tablas_generales tg
										where 
											tg.n_tabla = c.n_tabla_tipo_doc
											AND tg.c_dato = c.c_tipo_documento) as d_c_tipo_documento,
										n_documento
									FROM 
										CONTRIBUYENTES c
									WHERE 
										SUBSTR(FUN_TRANSFORMAR_CADENA(D_DENOMINACION),1,200) LIKE FUN_TRANSFORMAR_CADENA('%'||:filtro||'%')
										and f_vig_hasta is null
										and rownum <= 10
										order by SUBSTR(FUN_TRANSFORMAR_CADENA(D_DENOMINACION),1,200)
										");
		$par = array(':filtro' => $filtro);
		$row_query = $db_query->do_query($par);

		//print_r($row_query);

		for ($i=0; $i < count($row_query); $i++){
			$result['data_raz'][] = array(        		
				'razon_social'    => $row_query[$i]['DENOMINACION'],
				'cuit'   		=> $row_query[$i]['CUIT'],
				'cuit_ficticio'   		=> $row_query[$i]['CUIT_FICTICIO'],
				'id_contribuyente'	=> $row_query[$i]['ID_CONTRIBUYENTE'],
				'c_tipo_documento'	=> $row_query[$i]['C_TIPO_DOCUMENTO'],
				'd_c_tipo_documento'	=> $row_query[$i]['D_C_TIPO_DOCUMENTO'],
				'n_documento'	=> $row_query[$i]['N_DOCUMENTO']
			);	
		}

	}
	
	if ($oper == 2){//autocompleta objetos/hechos
		$c_tipo_objeto = $_POST['c_tipo_objeto'];
		
		$db_query = new DB_Query(
			"SELECT DISTINCT d_objeto as OBJETO_HECHO,
				c_tipo_objeto as TIPO_OBJETO,
				tg.d_dato as DESC_TIPO_OBJ
			FROM OBJETOS o,TABLAS_GENERALES tg
			WHERE SUBSTR(FUN_TRANSFORMAR_CADENA(o.d_objeto),1,200) LIKE FUN_TRANSFORMAR_CADENA('%'||:filtro||'%')
				and upper(nvl(:c_tipo_objeto,o.c_tipo_objeto)) = upper(o.c_tipo_objeto)
				and o.f_baja is null
				and tg.n_tabla=372
				and tg.c_dato=c_tipo_objeto
			order by SUBSTR(FUN_TRANSFORMAR_CADENA(o.d_objeto),1,200)
			fetch next 5 rows only"
		);
		
		$par = array(':filtro' => $filtro,':c_tipo_objeto' => $c_tipo_objeto);
		$row_query = $db_query->do_query($par);

		//print_r($row_query);

		for ($i=0; $i < count($row_query); $i++){
			$result['data_obj'][] = array(
				'objeto_hecho' => $row_query[$i]['OBJETO_HECHO'],
				'c_tipo_objeto' => $row_query[$i]['TIPO_OBJETO'],
				'd_tipo_objeto' => $row_query[$i]['DESC_TIPO_OBJ']
			);
		}
	}

	if($oper == 3){//autocompleta campos a través de un cuit valido,no es estrictamente un autocomplete
		
	$db_query = new DB_Query("select fun_cuit_ficticio(:filtro) CUIT_FICTICIO 
							  from dual");
	$parametros = array(':filtro' => $filtro);
	$row_query = $db_query->do_query($parametros);
	$cuit_ficticio=$row_query[0]['CUIT_FICTICIO'];


	$db_query = new DB_Query("select d_denominacion as denominacion,fun_formato_cuit(n_cuit) as cuit,id_contribuyente 
							  from contribuyentes 
							  where n_cuit = :filtro 
							  and f_vig_hasta is null
							  AND ROWNUM <= 5");
	$parametros = array(':filtro' => $filtro);
	$row_query = $db_query->do_query($parametros);
	
	for ($i=0; $i < count($row_query); $i++)
		{
			
			$result['data_raz'][] = array(        		
				'razon_social'    => $row_query[$i]['DENOMINACION'],
				'cuit'   		=> $row_query[$i]['CUIT'],
				'cuit_ficticio' =>$cuit_ficticio,
				'id_contribuyente'	=> $row_query[$i]['ID_CONTRIBUYENTE']
			); 
			
		}

	}

	if($oper == 'calle'){
		$c_localidad = ($_REQUEST['c_localidad']);
		$c_partido = ($_REQUEST['c_partido']);
		$c_provincia= ($_REQUEST['c_provincia']);
		
		$db_query = new DB_Query("Select calle
									from (SELECT DISTINCT D_NOMBRE as calle 
											  FROM CALLES 
											  WHERE fun_transformar_cadena(D_NOMBRE) LIKE fun_transformar_cadena('%'||:filtro||'%')
											  AND C_PROVINCIA=:c_provincia
											  AND C_DEPARTAMENTO=:c_departamento
											  AND C_LOCALIDAD=:c_localidad
											  AND F_BAJA is null)
									where ROWNUM <= 5");
		$par = array(':filtro' => $filtro,':c_provincia' => $c_provincia,':c_departamento' => $c_partido,':c_localidad' => $c_localidad);
		$row_query = $db_query->do_query($par);
		
		//print_r($row_query);
		
		for ($i=0; $i < count($row_query); $i++){
			$result['data_calle'][] = array('d_nombre' => $row_query[$i]['CALLE']);	
		}
	}
	
	echo json_encode($result);
?>