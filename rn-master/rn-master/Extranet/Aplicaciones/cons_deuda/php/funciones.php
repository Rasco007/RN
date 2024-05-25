<?php
	function get_sesion_deuda($objeto,$tributo,$cuit,$p_id_tipotransacc = null){
		$conn=new oci_Logon();

		if (!$conn->getCon()) {
			$e = oci_error();
			trigger_error(htmlentities($e['message']), E_USER_ERROR);
		}
		
		if ($conn->getCon()) {
			// Create the cursor and bind it
			$p_cursor = oci_new_cursor($conn->getCon());
			// Create the statement and bind the variables (parameter, value, size)
			$stid = oci_parse($conn->getCon(), 'BEGIN :cursor := WEB.pkg_web_boletas.inic_cns_deuda(:objeto,:tributo,:cuit); END;');
			oci_bind_by_name($stid, ':cursor', $p_cursor, -1, OCI_B_CURSOR);
			oci_bind_by_name($stid, ':objeto', $objeto,20);
			oci_bind_by_name($stid, ':tributo', $tributo,10);
			oci_bind_by_name($stid, ':cuit', $cuit,20);
			
			// Execute the Statement and fetch the data
			if (@(!oci_execute($stid))) {
				$errors = oci_error($stid);
				//die ( array('success' => false, 'data' => 'Error : ' . $errors['code'] . ' => ' . $errors['message'], 'params' => $values));
				$respuesta->resultado = 'NOOK';
				//$respuesta->error = 'Error al recuperar la deuda solicitada.';
				$respuesta->error = $errors;
				return  ($respuesta);
			}
			oci_execute($p_cursor, OCI_DEFAULT);
			oci_fetch_all($p_cursor, $data, null, null, OCI_FETCHSTATEMENT_BY_ROW);
			oci_free_statement($stid);

			if ($p_id_tipotransacc != '') {				
				//logueo transaccion
				$respuesta->id_transaccion = log_transaccion($p_id_tipotransacc);
			}

			// Return the data
			$result = $data[0]; // agarro primera fila nada mas   
			if ($result['IDSESSION'] == '0' || $result['IDSESSION'] == null){
				//hubo error
				$respuesta->resultado = 'NOOK';
				$respuesta->error = str_replace('ERROR CD','',$result['MENSAJE']);
			}else{
				if ($result['TIPOMSJ'] == 3 ){
					$respuesta->mensaje = $result['MENSAJE'];
				}	

					$respuesta->resultado = 'OK';
					$respuesta->info = $data;
				
			}

			return  ($respuesta);
		}
	}

	function get_id_boleta($id_sesion,$tributo,$fecha,$sel,$id_transaccion = null){
		$conn=new oci_Logon();

		if (!$conn->getCon()) {
			$e = oci_error();
			trigger_error(htmlentities($e['message']), E_USER_ERROR);
		}

		if ($conn->getCon()) {

			// Create the cursor and bind it
			$p_cursor = oci_new_cursor($conn->getCon());
			// Create the statement and bind the variables (parameter, value, size)
			$stid = oci_parse($conn->getCon(), "BEGIN :cursor := WEB.pkg_web_boletas.genera_boleta (:id_sesion,:sel, :fecha,:tributo); END;");
			oci_bind_by_name($stid, ':cursor', $p_cursor, -1, OCI_B_CURSOR);
			oci_bind_by_name($stid, ':id_sesion', $id_sesion,20);
			oci_bind_by_name($stid, ':sel', $sel,1000);
			oci_bind_by_name($stid, ':fecha', $fecha,20);
			oci_bind_by_name($stid, ':tributo', $tributo,20);
			
			// Execute the Statement and fetch the data
			if (@(!oci_execute($stid))) {
				$errors = oci_error($stid);
				$respuesta->resultado = 'NOOK';
				preg_match('~<(.*?)>~', $errors['message'], $output); 
				$descrip = ((count($output) == 0) ? 'Error al generar la boleta.' : $output[1]);
				$respuesta->error = $descrip;
				return  ($respuesta);
			}
			oci_execute($p_cursor, OCI_DEFAULT);
			oci_fetch_all($p_cursor, $data, null, null, OCI_FETCHSTATEMENT_BY_ROW);
			oci_free_statement($stid);

			// Return the data
			$result = $data[0]; // agarro primera fila nada mas  
			
			if ($id_transaccion != '') {	
				//die($id_transaccion);			
				//updeteo transacion
				update_transaccion($id_transaccion,$result['COMPROBANTE']);
			}

			if ($result['COMPROBANTE'] ==  null){
				//hubo error
				$respuesta->resultado = 'NOOK';
				$descrip = $result['MENSAJE'] == null ? 'Error al intentar emitir la boleta' : $result['MENSAJE'];
				$respuesta->error = $descrip;
			}else{
				$respuesta->resultado = 'OK';
				$respuesta->n_comprobante = $result['COMPROBANTE'];
			}

			return  ($respuesta);
		}
	}

	function actualiza_deuda($id_sesion,$f_actualizacion){
		$conn=new oci_Logon();

		if (!$conn->getCon()) {
			$e = oci_error();
			trigger_error(htmlentities($e['message']), E_USER_ERROR);
		}

		if ($conn->getCon()) {

			// Create the cursor and bind it
			$p_cursor = oci_new_cursor($conn->getCon());
			// Create the statement and bind the variables (parameter, value, size)
			$stid = oci_parse($conn->getCon(), "BEGIN :cursor :=WEB.pkg_web_boletas.actualizar_deuda_grilla(:id_sesion, :f_actualizacion); END;");
			oci_bind_by_name($stid, ':cursor', $p_cursor, -1, OCI_B_CURSOR);
			oci_bind_by_name($stid, ':id_sesion', $id_sesion,20);
			oci_bind_by_name($stid, ':f_actualizacion', $f_actualizacion,20);
			
			// Execute the Statement and fetch the data
			if (@(!oci_execute($stid))) {
				$errors = oci_error($stid);
				//print_r ( array('success' => false, 'data' => 'Error : ' . $errors['code'] . ' => ' . $errors['message'], 'params' => $values));
				$respuesta->resultado = 'NOOK';
				$respuesta->error = 'Error al actualizar la deuda.';
				return  ($respuesta);
			}
			oci_execute($p_cursor, OCI_DEFAULT);
			oci_fetch_all($p_cursor, $data, null, null, OCI_FETCHSTATEMENT_BY_ROW);
			// Return the data
			oci_free_statement($stid);
			 
			$result = $data[0]; // agarro primera fila nada mas         
			if ($result['IDSESSION'] == '0' || $result['IDSESSION'] == null){
				//hubo error
				$respuesta->resultado = 'NOOK';
				$respuesta->error = $result['MENSAJE'] == null ? 'Error al intentar actualizar la deuda' : $result['MENSAJE'];
			}else{
				$respuesta->resultado = 'OK';
				$respuesta->data = $data;
			}
		   
			return  ($respuesta);
		}
	}

	function log_transaccion($id_tipotransacc){
		$db_query = new DB_Query("BEGIN prc_log_transaccion(:p_id_tipotransacc,:p_id_transaccion);END;");
		$param = array(':p_id_tipotransacc' => $id_tipotransacc,
						':p_id_transaccion' => null);
		$result = $db_query->do_query($param);
		$db_query->db_commit();
		return $param[':p_id_transaccion'];
	}

	function update_transaccion($id_transaccion,$id_boleta){
		
		$db_query = new DB_Query("BEGIN prc_actualiza_boleta_transacc(:p_id_transaccion,:p_id_boleta); END;");

		$param = array(':p_id_transaccion' => $id_transaccion,
						':p_id_boleta' => $id_boleta);
		$result = $db_query->do_query($param);
		
		$db_query->db_commit();
		return true;
	}

	$objeto = $_POST['d_objeto_hecho'];;
	$tributo = $_POST['c_tributo'];
	if ($_SESSION['entorno'] == 'WEBUSU'){
		$cuit = $_POST['n_cuit'];
	}else{
		$cuit = $_SESSION['usuario'];
	}
	
	$id_sesion = $_POST['id_sesion'];;
	$f_actualizacion =$_POST['f_actualizacion'];
	$tributo = $_POST['c_tributo'];
	$sel = $_POST['sel'];
	$id_tipotransacc = $_POST['id_tipotransacc'];
	$id_transaccion = $_POST['id_transaccion'];

	switch ($_POST['oper']) {
		case 'get_deuda':
			$data = get_sesion_deuda($objeto,$tributo,$cuit,$id_tipotransacc);
			echo json_encode($data);
			break;
		case 'get_id_boleta':
			$data = get_id_boleta($id_sesion,$tributo,$f_actualizacion,$sel,$id_transaccion);
			echo json_encode($data);
			break;
		case 'actualiza_deuda':
			$data = actualiza_deuda($id_sesion,$f_actualizacion);
			echo json_encode($data);
			break;
		default:
			break;
	}
?>