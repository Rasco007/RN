<?php
/*
error_reporting(E_ALL);
ini_set('display_errors', '1');*/
checklogin($_POST['id_menu']);
session_write_close();

$db_query = new DB_Query();
$oper = $_POST['oper'];

$init = array(':id_menu' => $_POST['id_menu'], ':n_orden' => $_POST['n_orden']);
$db_query->setQuery("select d_parametro,d_post,tg.d_dato5 fun_validacion,p.m_obligatorio m_oblig,
                            p.d_descripcion descripcion, p.d_default as d_default, m.d_object_type
					 from MENU_PROCEDURES m, PROCEDURES_PARAMETROS p, tablas_generales tg
					 where m.n_id_menu = :id_menu
					 and m.n_orden = :n_orden
					 and p.c_tipo_dato = tg.c_dato
					 and p.n_tabla_dato = tg.n_tabla
					 and m.id_menu_procedure = p.id_menu_procedure");

$row_query = $db_query->do_query($init);

$tipo_objeto = $row_query[0]['D_OBJECT_TYPE'];

for($i=0;$i < count($row_query);$i++){
	//valido con la funcion parametrizada en el d_dato4 de tablas generales
	if($row_query[$i]['FUN_VALIDACION'] != null && $oper != 'del'){
		$fun_valida = $row_query[$i]['FUN_VALIDACION'];
		$response->resultado = $fun_valida($_POST[$row_query[$i]['D_POST']],$row_query[$i]['M_OBLIG'],$row_query[$i]['DESCRIPCION']);

		if($response->resultado != 'OK') break;
	}

	if(isset($row_query[$i]['M_OBLIG']) && isset($row_query[$i]['D_DEFAULT'])){
		$parametros[":".$row_query[$i]['D_PARAMETRO']] = $row_query[$i]['D_DEFAULT'];
	}
	else{
		$parametros[":".$row_query[$i]['D_PARAMETRO']] = $_POST[$row_query[$i]['D_POST']];
	}
}

if($response->resultado == 'OK' || $response->resultado == null){
	switch ($tipo_objeto){	
		case 'PROCEDURE':
			$parametros[':p_error'] = null;
			$parametros[':p_error_ora'] = null;
			$parametros['menux'] = $_POST['id_menu'];
			$parametros['ordeny'] = $_POST['n_orden'];

			$db_llamada_val = new DB_llamada_prc($_POST['id_menu'],$_POST['n_orden'],'D_VALIDACION');

			if($db_llamada_val->query != 'NOOK'){
				$db_validacion = new DB_procedure ($db_llamada_val->query);

				$response = $db_validacion->execute_query($parametros);
			}

			if($response->resultado == 'OK' || $response->resultado == null){
				$db_llamada_prc = new DB_llamada_prc($_POST['id_menu'],$_POST['n_orden'],'D_PROCEDURE');

				$db_procedure = new DB_procedure ($db_llamada_prc->query);

				$response = $db_procedure->execute_query($parametros);
			}		
			break;
		case 'FUNCTION':

			$db_llamada_fun = new DB_llamada_fun($_POST['id_menu'],$_POST['n_orden'],'D_PROCEDURE');

			$db_query = new DB_Query ($db_llamada_fun->query);

			try{
				$row_query = $db_query->do_query($parametros);
				$response->resultado = 'OK';
				$response->retorno = $row_query[0]['RETORNO'];
			}
			catch(Exc_EjecutarConsulta $e){
				//die($db_query->getQuery());
				$response->resultado = $e->getMessage();
				$response->retorno = null;
			}
			break;
	}
}
session_start();
echo (json_encode($response));

?>