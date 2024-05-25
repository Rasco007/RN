<?php
function funProy(){
	return "Mensaje funciones_proy.php";
}

function valida_captcha_google($token) {

    $ch = curl_init();

    curl_setopt($ch, CURLOPT_URL, 'https://www.google.com/recaptcha/api/siteverify');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 100);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query(array(
                        'secret' => KEY_PRIVATE_CAPTCHA,
                        'response' => $token)));
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $jsonData = curl_exec($ch);
//ERROR
    $err     = curl_errno($ch);
   
    $errmsg  = curl_error($ch) ;
    $header  = curl_getinfo($ch);
    
    $objData = json_decode($jsonData);

    if ($objData->success){
        $res = true;
    }else{
        $res = false;
    }

    return $res;
}

function getFeriados($anioDesde){
        
    $parametros = array(':anio' => $anioDesde);
        
    $query = new DB_Query(
        "select f.f_feriado as feriado from feriados f where extract(year from f.f_feriado) >= :anio"
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

    return (json_encode($array_feriados));
}

function getArrayResult($procedure, $parametros){
	$conn=new oci_Logon();

	if (!$conn->getCon()) {
		$e = oci_error();
		trigger_error(htmlentities($e['message']), E_USER_ERROR);
	}

	if ($conn->getCon()) {
		// Create the cursor and bind it
		$p_cursor = oci_new_cursor($conn->getCon());
	
		// Create the statement and bind the variables (parameter, value, size)
		$stid = oci_parse($conn->getCon(), "BEGIN :cursor := ".$procedure."; END;");
		oci_bind_by_name($stid, ':cursor', $p_cursor, -1, OCI_B_CURSOR);
		
		if($parametros) foreach($parametros as $name => &$value){
            if(strlen($value) == 0) $value = null;

            oci_bind_by_name($stid, $name, $value, 4000);
        }

		// Execute the Statement and fetch the data
		if (@(!oci_execute($stid))) {
			$errors = oci_error($stid);
			$respuesta->resultado = 'NOOK';
			$respuesta->error = 'Error al obtener array: '.$errors['message'];
		} else {
			oci_execute($p_cursor, OCI_DEFAULT);
			oci_fetch_all($p_cursor, $data, null, null, OCI_FETCHSTATEMENT_BY_ROW);
			oci_free_statement($stid);
			
			$respuesta->resultado = 'OK';
			$respuesta->datos = $data;
		}
	}

	return($respuesta);
}

function log_transaction($id_tipotransacc){
    $db_query = new DB_Query("BEGIN prc_log_transaccion(:p_id_tipotransacc,:p_id_transaccion);END;");
    $param = array(':p_id_tipotransacc' => $id_tipotransacc,
                    ':p_id_transaccion' => null);
                    
    try {
        $result = $db_query->do_query($param);
    } catch(Exception $error){
        $db_query->db_rollback();
        return false;
    }               
                    
    $db_query->db_commit();
    return $param[':p_id_transaccion'];
 
}

function getGridQuery($p_id_menu){


    $db_proc=  "begin 			  
                ppal.pac_php_grillas.prc_obtener_query(:p_id_grid_query,
                                                        :p_d_query_grid,
                                                        :p_d_query_grid_2,
                                                        :p_d_query_grid_3,
                                                        :p_d_length_query,                            
                                                        :p_error,
                                                        :p_error_ora);
                end;";

    $query = null;
    $query2 = null;
    $query3 = null;
    $length = null;
    $error = null;
    $error_ora = null;
    $param_prc = array(':p_id_grid_query' => $p_id_menu,
                    ':p_d_query_grid' => $query,
                    ':p_d_query_grid_2' => $query2,
                    ':p_d_query_grid_3' => $query3,
                    ':p_d_length_query' => $length,
                    ':p_error' => $error,
                    ':p_error_ora' => $error_ora,
        );

    $db_procedure = new DB_Procedure($db_proc);

    $null=null;

    $result = $db_procedure->execute_query($param_prc,$null,FALSE);


    try {

        if ($result->resultado == 'OK') {

            $response = $param_prc[':p_d_query_grid'] . $param_prc[':p_d_query_grid_2'] . $param_prc[':p_d_query_grid_3'];

            $db_query = new DB_Query($response);
            $par = array(':id_contribuyente' => 336659);
            $response = $db_query->do_query($par);

        } else {

            $response = $param_prc[':p_error_ora'] . "<b>" . $param_prc[':p_error_ora'];

        }

    } catch(Exception $error){
        echo "<br> ERROR!";
        echo "<br> $error";
        return false;
    }

    echo $response;

}

function executeFunction($function, $parametros){

    $conn= new oci_Logon();

    if (!$conn->getCon()) {
        $e = oci_error();
        trigger_error(htmlentities($e['message']), E_USER_ERROR);
    }

    if ($conn->getCon()) {

        $sql = "BEGIN :result := ".$function."; END;";

        $stid = oci_parse($conn->getCon(), $sql);
        oci_bind_by_name($stid, ":result", $result, 100);

        if($parametros) {

            foreach($parametros as $name => &$value){

                if(strlen($value) == 0) {
                    $value = null;
                }

                oci_bind_by_name($stid, $name, $value, 4000);

            }

        }


        $respuesta = null;
        // Execute the Statement and fetch the data
        if (@(!oci_execute($stid))) {

            $errors = oci_error($stid);
            $respuesta->resultado = 'NOOK';
            $respuesta->error = 'Error al obtener el dato correspondiente: '.$errors['message'];

        } else {

            oci_execute($stid);

            $respuesta->resultado = 'OK';
            $respuesta->datos = $result;

        }
    }

    return($respuesta);

}

?>