<?php


checklogin($_POST['id_menu']);
session_write_close();

$init = array(':id_menu' => $_POST['id_menu'], ':n_grid' => $_POST['n_grid']);
$db_query = new DB_Query("select d_column_name,tg.d_dato5 fun_validacion,q.id_grid_query id_grid_query,m.m_obligatorio m_oblig,d_column_title,d_prc_validacion,m.c_tipo_dato c_tipo_dato
									from grid_columns m,tablas_generales tg,grid_queries q
									where q.id_menu = :id_menu
									and q.n_grid = :n_grid
                                    and m.id_grid_query = q.id_grid_query
                                    and m.c_tipo_dato = tg.c_dato
                                    and m_insertable = 'S'
                                    and m.n_tabla_tipo_dato = tg.n_tabla");

$row_columns = $db_query->do_query($init);

for($i=0;$i < count($row_columns);$i++){
	//valido con la funcion parametrizada en el d_dato4 de tablas generales
	if($row_columns[$i]['FUN_VALIDACION'] != null){
		$fun_valida = $row_columns[$i]['FUN_VALIDACION'];
		$response->resultado = $fun_valida($_POST[$row_columns[$i]['D_COLUMN_NAME']],$row_columns[$i]['M_OBLIG'],$row_columns[$i]['D_COLUMN_TITLE']);
		if($response->resultado != 'OK') break;
	}


	$arr_campos[$i] = 	$row_columns[$i]['D_COLUMN_NAME'];
	$arr_datos[$i] =   	$_POST[$row_columns[$i]['D_COLUMN_NAME']];

	//clavo si es txtmay o txtmin el upper/lower (Prox. version mejorar)
	if($row_columns[$i]['C_TIPO_DATO'] == 'TXTMAY'){
		$arr_datos[$i] = strtoupper($_POST[$row_columns[$i]['D_COLUMN_NAME']]);
	}

	if($row_columns[$i]['C_TIPO_DATO'] == 'TXTMIN'){
		$arr_datos[$i] = strtolower($_POST[$row_columns[$i]['D_COLUMN_NAME']]);
	}

}

$parametros[':p_id_query'] = $row_columns[0]['ID_GRID_QUERY'];
$parametros_array[':p_campos'] = $arr_campos;
$parametros_array[':p_datos']  = $arr_datos;

//print_r($parametros_array);
$parametros[':p_oper']   = $_POST['oper'];

if($response->resultado == 'OK' || $response->resultado == null){
	$parametros[':p_error'] = null;
	$parametros[':p_error_ora'] = null;

	if(($response->resultado == 'OK' || $response->resultado == null) && ($row_columns[0]['D_PRC_VALIDACION'] != null)){
		$db_procedure = new DB_procedure("BEGIN ".$row_columns[0]['D_PRC_VALIDACION']."(:p_id_query,:p_oper,:p_datos,:p_campos,:p_error,:p_error_ora);END;");
		$response = $db_procedure->execute_query($parametros,$parametros_array);
	}

	if($response->resultado == 'OK' || $response->resultado == null){
		$db_procedure = new DB_procedure("BEGIN PAC_PHP_GRILLAS.ABM(:p_id_query,:p_oper,:p_datos,:p_campos,:p_error,:p_error_ora);END;");
		$response = $db_procedure->execute_query($parametros,$parametros_array);
	}

}
session_start();
echo (json_encode($response));
