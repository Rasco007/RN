<?php
$archivo = $_POST['p_tipo_archivo'];
$n_id_disco = (int)$_POST['p_n_id_disco'];
$p_f_lote = $_POST['p_f_lote'];
$p_n_lote = $_POST['p_n_lote'];
$p_n_periodo = $_POST['p_n_periodo'];
$fecha_hoy= date("d/m/y");
$validar_lote = $_POST['validar_lote'];
$c_peaje = $_POST['p_c_peaje'];
$n_carril = $_POST['p_n_carril'];
$c_medio_pago = $_POST['p_c_medio_pago'];
$d_medio_pago = $_POST['p_d_medio_pago'];
$f_recepcion = $_POST['p_f_recepcion'];
$path = $_POST['p_path'];
$path_recha = $_POST['p_path_recha'];
$f_remesa = $_POST['p_f_remesa'];
$c_tributo = (int)$_POST['p_c_tributo'];
$id_sesion = $_POST['p_id_sesion'];
$n_año = (int)$_POST['p_n_año'];
$n_cuota = (int)$_POST['p_n_cuota'];
$t_interfaz = $_POST['p_t_interfaz'];
$c_concepto = (int)$_POST['p_c_concepto'];
$cant_reg = (int)$_POST['p_cant_reg'];
$secuencia = $_POST['p_secuencia'];
$d_denominacion = $_POST['p_d_denominacion'];
$p_estado = $_POST['p_estado'];
$linea = $_POST['p_linea'];
$p_f_acreditacion = $_POST['p_f_acreditacion'];
$p_f_pago_trans = $_POST['p_f_pago_trans'];
$p_modo = $_POST['p_modo'];
$p_preguntar = $_POST['p_preguntar'];
$p_cod_agente = $_POST['p_cod_agente'];

$nombre_disco = $_POST['p_nombre_disco'];

switch ($archivo) {
    case 'PEAJE':
        $param_prc = array(
            ':n_id_disco' => $n_id_disco,
            ':p_n_carril' => $n_carril,
            ':p_c_peaje' => $c_peaje,
            ':p_cant_aceptadas'=>null,
            ':p_monto_aceptadas'=>null,
            ':p_cant_erroneas' => null,
            ':p_mostrar_grilla_error'=>null,
            ':p_error'=>null,
            ':p_error_ora' => null
        );
        $sql = "begin
                    PAC_TELEPEAJE.PRC_INTEFAZ_TELEPEAJE(:n_id_disco,:p_c_peaje,:p_n_carril,:p_cant_aceptadas,
                    :p_monto_aceptadas,:p_cant_erroneas,:p_mostrar_grilla_error,:p_error,:p_error_ora);
                end;";
        $db_procedure = new DB_Procedure($sql);
        $null=null;
        $result = $db_procedure->execute_query($param_prc,$null,TRUE);
        
        if($result->resultado != 'OK') {
            $response->resultado = $param_prc[':p_error'].' - '.$param_prc[':p_error_ora'];
            $response->aceptadas =  $param_prc[':p_cant_aceptadas'];
            $response->monto_acep = $param_prc[':p_monto_aceptadas'];
            $response->erroneas =  $param_prc[':p_cant_erroneas'];
            $response->mostrar_grilla_error =  $param_prc[':p_mostrar_grilla_error'];
            
            if(!$response-> resultado){
                $response-> resultado = $result->resultado;
            }
            
            $db_query_d = new DB_Query("  DELETE
                                          FROM ARCHIVO_INTERFAZ
                                          WHERE n_id_disco = :id_disco_d"
                                        );
            $par = array(':id_disco_d' => $n_id_disco);
            $row_query_d = $db_query_d->do_query($par);
            $db_procedure->db_commit();
        }else{ // Ejecucion sin errores
            $response->resultado = 'OK';
            $response->aceptadas =  $param_prc[':p_cant_aceptadas'];
            $response->monto_acep = $param_prc[':p_monto_aceptadas'];
            $response->erroneas =  $param_prc[':p_cant_erroneas'];
            $response->mostrar_grilla_error =  $param_prc[':p_mostrar_grilla_error'];
        }
    
        echo json_encode($response);
        break;
        /******************************* FIN DE LA INTERFAZ DA ********************************/
		
    case 'LEVANTAR_SOLICITUD DEBITO':
		$param_prc = array(
			':p_n_id_disco' => $n_id_disco,
			':p_c_medio_pago' => $c_medio_pago,
			':p_d_medio_pago' => $d_medio_pago,
			':p_f_recepcion' => $f_recepcion,
			':p_path' => $path,
			':p_path_recha' => $path_recha,
			':p_hay_errores'=>null,
			':p_nombre_disco'=>null,
			':p_estado'=>null,
			':p_d_proceso' => null,
			':p_id_disco_recha' => null,
			':p_error'=>null,
			':p_error_ora' => null
		);
		$sql = "begin
					PAC_DEBITO_DIRECTO.PROCESAR(:p_n_id_disco, :p_c_medio_pago, :p_d_medio_pago, :p_f_recepcion, :p_path, :p_path_recha,
					:p_hay_errores, :p_nombre_disco, :p_estado, :p_d_proceso, :p_id_disco_recha, :p_error, :p_error_ora);
				end;";
		$db_procedure = new DB_Procedure($sql);
		$null=null;
		$result = $db_procedure->execute_query($param_prc,$null,TRUE);
		if($result->resultado != 'OK') {
			$response->resultado = $param_prc[':p_error'].' - '.$param_prc[':p_error_ora'];
			$response->p_hay_errores =  $param_prc[':p_hay_errores'];
			$response->p_nombre_disco =  $param_prc[':p_nombre_disco'];
			$response->p_estado =  $param_prc[':p_estado'];
			$response->p_d_proceso =  $param_prc[':p_d_proceso'];
			$response->p_id_disco_recha =  $param_prc[':p_id_disco_recha'];
			if(!$response-> resultado){
				$response-> resultado = $result->resultado;
			}
			$db_query_d = new DB_Query("DELETE FROM SIAT.ARCHIVO_INTERFAZ WHERE n_id_disco = :id_disco_d");
			$par = array(':id_disco_d' => $n_id_disco);
			$row_query_d = $db_query_d->do_query($par);
			$db_procedure->db_commit();
		}else{ // Ejecucion sin errores
			$response->resultado = 'OK';
			$response->p_hay_errores =  $param_prc[':p_hay_errores'];
			$response->p_nombre_disco =  $param_prc[':p_nombre_disco'];
			$response->p_estado =  $param_prc[':p_estado'];
			$response->p_d_proceso =  $param_prc[':p_d_proceso'];
			$response->p_id_disco_recha =  $param_prc[':p_id_disco_recha'];
		}
		echo json_encode($response);
		break;
		/******************************* FIN DE LA INTERFAZ SD ********************************/
    case 'MOVIMIENTOS_SUCERP':
        $param_prc = array(
            ':p_modo' => $p_modo,
            ':p_n_id_disco' => $n_id_disco,
            ':p_path' => $path,
            ':p_f_acreditacion' => $p_f_acreditacion,
            ':p_f_pago_trans' => $p_f_pago_trans,
            ':p_nro_envio' => null,
            ':p_reg_c1' => null,
            ':p_reg_c2' => null,
            ':p_reg_c3' => null,
            ':p_reg_c4' => null,
            ':p_reg_c5' => null,
            ':p_reg_c6' => null,
            ':p_reg_c7' => null,
            ':p_reg_c8' => null,
            ':p_reg_otros'=>null,
            ':p_cant_reg_leidos'=>null,
            ':p_cant_reg_inf'=>null,
            ':p_CHKSUM_MD5_CALC' => null,
            ':p_CHKSUM_MD5_INFO' => null,
            ':p_hay_errores' => null,
            ':p_txt_resultado' => null,
            ':p_error'=> null,
            ':p_error_ora' => null
        );
        $sql = "begin
					SIAT.PKG_RNPA.u_rnpa_levantar(:p_modo, :p_n_id_disco, :p_path, :p_f_acreditacion, :p_f_pago_trans, :p_nro_envio, :p_reg_c1,
					:p_reg_c2, :p_reg_c3, :p_reg_c4, :p_reg_c5, :p_reg_c6, :p_reg_c7, :p_reg_c8, :p_reg_otros, :p_cant_reg_leidos,
					:p_cant_reg_inf, :p_CHKSUM_MD5_CALC, :p_CHKSUM_MD5_INFO, :p_hay_errores, :p_txt_resultado, :p_error, :p_error_ora);
				end;";
        $db_procedure = new DB_Procedure($sql);
        $null=null;
        $result = $db_procedure->execute_query($param_prc,$null,TRUE);
        if($result->resultado != 'OK') {
            $response->resultado = $param_prc[':p_error'].' - '.$param_prc[':p_error_ora'];
            $response->p_hay_errores =  $param_prc[':p_hay_errores'];
            $response->p_nro_envio =  $param_prc[':p_nro_envio'];
            $response->p_reg_c1 =  $param_prc[':p_reg_c1'];
            $response->p_reg_c2 =  $param_prc[':p_reg_c2'];
            $response->p_reg_c3 =  $param_prc[':p_reg_c3'];
            $response->p_reg_c4 =  $param_prc[':p_reg_c4'];
            $response->p_reg_c5 =  $param_prc[':p_reg_c5'];
            $response->p_reg_c6 =  $param_prc[':p_reg_c6'];
            $response->p_reg_c7 =  $param_prc[':p_reg_c7'];
            $response->p_reg_c8 =  $param_prc[':p_reg_c8'];
            $response->p_reg_otros =  $param_prc[':p_reg_otros'];
            $response->p_cant_reg_leidos =  $param_prc[':p_cant_reg_leidos'];
            $response->p_cant_reg_inf =  $param_prc[':p_cant_reg_inf'];
            $response->p_CHKSUM_MD5_CALC =  $param_prc[':p_CHKSUM_MD5_CALC'];
            $response->p_CHKSUM_MD5_INFO =  $param_prc[':p_CHKSUM_MD5_INFO'];
            $response->p_txt_resultado =  $param_prc[':p_txt_resultado'];
            if(!$response-> resultado){
                $response-> resultado = $result->resultado;
            }
            $db_query_d = new DB_Query("DELETE FROM SIAT.ARCHIVO_INTERFAZ WHERE n_id_disco = :id_disco_d");
            $par = array(':id_disco_d' => $n_id_disco);
            $row_query_d = $db_query_d->do_query($par);
            $db_procedure->db_commit();
        }else{ // Ejecucion sin errores
            $response->resultado = 'OK';
            $response->p_hay_errores =  $param_prc[':p_hay_errores'];
            $response->p_nro_envio =  $param_prc[':p_nro_envio'];
            $response->p_reg_c1 =  $param_prc[':p_reg_c1'];
            $response->p_reg_c2 =  $param_prc[':p_reg_c2'];
            $response->p_reg_c3 =  $param_prc[':p_reg_c3'];
            $response->p_reg_c4 =  $param_prc[':p_reg_c4'];
            $response->p_reg_c5 =  $param_prc[':p_reg_c5'];
            $response->p_reg_c6 =  $param_prc[':p_reg_c6'];
            $response->p_reg_c7 =  $param_prc[':p_reg_c7'];
            $response->p_reg_c8 =  $param_prc[':p_reg_c8'];
            $response->p_reg_otros =  $param_prc[':p_reg_otros'];
            $response->p_cant_reg_leidos =  $param_prc[':p_cant_reg_leidos'];
            $response->p_cant_reg_inf =  $param_prc[':p_cant_reg_inf'];
            $response->p_CHKSUM_MD5_CALC =  $param_prc[':p_CHKSUM_MD5_CALC'];
            $response->p_CHKSUM_MD5_INFO =  $param_prc[':p_CHKSUM_MD5_INFO'];
            $response->p_txt_resultado =  $param_prc[':p_txt_resultado'];
        }
        echo json_encode($response);
        break;
    /******************************* FIN DE LA INTERFAZ SUCERP ********************************/
    case 'LEVANTAR_PAGOS_LINK':
        $param_prc = array(
            ':p_n_id_disco' => $n_id_disco,
            ':p_d_pagos_tot' => null,
            ':p_d_pagos_err' => null,
            ':p_d_pagos_ok' => null,
            ':p_d_estado' => null,
            ':p_f_remesa' => $f_remesa,
            ':p_n_remesa' => null,
            ':p_t_interfaz' => $t_interfaz,
            ':p_error'=>null,
            ':p_error_ora' => null
        );
        $sql = "begin
                    PAC_REND_BANCOS.PRC_PROCESAR(:p_n_id_disco, :p_d_pagos_tot, :p_d_pagos_err, :p_d_pagos_ok, :p_d_estado, :p_f_remesa,
                    :p_n_remesa, :p_t_interfaz, :p_error, :p_error_ora);
                end;";
        $db_procedure = new DB_Procedure($sql);
        $null=null;
        $result = $db_procedure->execute_query($param_prc,$null,TRUE);
        if($result->resultado != 'OK') {
            $response->resultado = $param_prc[':p_error'].' - '.$param_prc[':p_error_ora'];
            $response->p_d_estado =  $param_prc[':p_d_estado'];
            $response->p_d_pagos_tot = $param_prc[':p_d_pagos_tot'];
            $response->p_d_pagos_err = $param_prc[':p_d_pagos_err']; 
            $response->p_d_pagos_ok = $param_prc[':p_d_pagos_ok'];
            if(!$response->resultado){
                $response->resultado = $result->resultado;
            }
            try{
                $db_query_d = new DB_Query("DELETE FROM SIAT.ARCHIVO_INTERFAZ WHERE n_id_disco = :id_disco_d");
                $par = array(':id_disco_d' => $n_id_disco);
                $row_query_d = $db_query_d->do_query($par);
                $db_procedure->db_commit();
            }catch (Exception $e) {
                $response->resultado =  $e->getMessage();
            }
        }else{ // Ejecucion sin errores
            $response->resultado = 'OK';
            $response->p_d_estado =  $param_prc[':p_d_estado'];
            $response->p_n_remesa = $param_prc[':p_n_remesa'];
            $response->p_d_pagos_tot = $param_prc[':p_d_pagos_tot'];
            $response->p_d_pagos_err = $param_prc[':p_d_pagos_err']; 
            $response->p_d_pagos_ok = $param_prc[':p_d_pagos_ok'];
        }
        echo json_encode($response);
        break;
        /******************************* FIN DE LA INTERFAZ LEVANTAR PAG LINK ********************************/
    case 'LEVANTAR_PAGOS_BANELCO':
		$param_prc = array(
			':p_n_id_disco' => $n_id_disco,
			':p_d_pagos_tot' => null,
			':p_d_pagos_err' => null,
			':p_d_pagos_ok' => null,
			':p_d_estado' => null,
			':p_f_remesa' => $f_remesa,
			':p_n_remesa' => null,
			':p_t_interfaz' => $t_interfaz,
			':p_error'=>null,
			':p_error_ora' => null
		);
		$sql = "begin
					PAC_REND_BANCOS.PROCESAR_BANELCO(:p_n_id_disco, :p_d_pagos_tot, :p_d_pagos_err, :p_d_pagos_ok, :p_d_estado, :p_f_remesa,
					:p_n_remesa, :p_t_interfaz, :p_error, :p_error_ora);
				end;";
		$db_procedure = new DB_Procedure($sql);
		$null=null;
		$result = $db_procedure->execute_query($param_prc,$null,TRUE);
		if($result->resultado != 'OK') {
			$response->resultado = $param_prc[':p_error'].' - '.$param_prc[':p_error_ora'];
			$response->p_d_estado =  $param_prc[':p_d_estado'];
			$response->p_d_pagos_tot = $param_prc[':p_d_pagos_tot'];
			$response->p_d_pagos_err = $param_prc[':p_d_pagos_err']; 
			$response->p_d_pagos_ok = $param_prc[':p_d_pagos_ok'];
			if(!$response->resultado){
				$response->resultado = $result->resultado;
			}
			try{
				$db_query_d = new DB_Query("DELETE FROM SIAT.ARCHIVO_INTERFAZ WHERE n_id_disco = :id_disco_d");
				$par = array(':id_disco_d' => $n_id_disco);
				$row_query_d = $db_query_d->do_query($par);
				$db_procedure->db_commit();
			}catch (Exception $e) {
				$response->resultado =  $e->getMessage();
			}
			
		}else{ // Ejecucion sin errores
			$response->resultado = 'OK';
			$response->p_d_estado =  $param_prc[':p_d_estado'];
			$response->p_n_remesa = $param_prc[':p_n_remesa'];
			$response->p_d_pagos_tot = $param_prc[':p_d_pagos_tot'];
			$response->p_d_pagos_err = $param_prc[':p_d_pagos_err']; 
			$response->p_d_pagos_ok = $param_prc[':p_d_pagos_ok'];  
		}
		echo json_encode($response);
		break;
		/******************************* FIN DE LA INTERFAZ LEVANTAR PAG BANELCO ********************************/
    case 'PROCESAR_PAGOS':
        $param_prc = array(
            ':p_n_id_disco' => $n_id_disco,
            ':p_f_remesa'=> $f_remesa,
            ':p_estado'=>null,
            ':p_cant_reg'=>null,
            ':p_pagos_acreditados'=>null,
            ':p_pagos_pendientes'=>null,
            ':p_pagos_no_procesados'=>null,
            ':p_n_remito'=>null,
            ':p_error'=>null,
            ':p_error_ora' => null
		);
		$sql = "begin
				PAC_INGRESO_PAGOS.PROCESAR(:p_f_remesa,:p_estado,:p_cant_reg,:p_pagos_acreditados,:p_pagos_pendientes,
					:p_pagos_no_procesados,:p_n_id_disco,:p_n_remito,:p_error,:p_error_ora);
				end;";
    
		$db_procedure = new DB_Procedure($sql);
		$null=null;
		
		try{
			$result = $db_procedure->execute_query($param_prc,$null,TRUE);
		}catch (Exception $e) {
			$response->resultado =  $e->getMessage();
			die();
		}
		if($result->resultado != 'OK') {
			$response-> p_estado = $param_prc[':p_estado'];
			$response-> p_cant_reg = $param_prc[':p_cant_reg'];
			$response-> p_pagos_pendientes = $param_prc[':p_pagos_pendientes'];
			$response-> p_pagos_acreditados =$param_prc[':p_pagos_acreditados'];
			$response-> p_pagos_no_procesados =$param_prc[':p_pagos_no_procesados'];
			$response-> p_n_remito =$param_prc[':p_n_remito'];
			$response-> resultado =$param_prc[':p_error'].' - '.$param_prc[':p_error_ora'];
			if(!$response-> resultado){
				$response-> resultado = $result->resultado;
			}
		/*$db_query_d = new DB_Query("DELETE FROM SIAT.ARCHIVO_INTERFAZ WHERE n_id_disco = :id_disco_d");
			$par = array(':id_disco_d' => $n_id_disco);
			$row_query_d = $db_query_d->do_query($par);
			$db_procedure->db_commit();*/
		}else{ // Ejecucion sin errores
			$response->resultado = 'OK';
			$response-> p_cant_reg =$param_prc[':p_cant_reg'];
			$response-> p_pagos_pendientes = $param_prc[':p_pagos_pendientes'];
			$response-> p_estado =  $param_prc[':p_estado'];
			$response-> p_pagos_acreditados = $param_prc[':p_pagos_acreditados'];
			$response-> p_pagos_no_procesados = $param_prc[':p_pagos_no_procesados'];
			$response-> p_n_remito = $param_prc[':p_n_remito'];
		}
		echo json_encode($response);
		break;
		/******************************* FIN DE LA INTERFAZ PROCESAR PAGOS ********************************/
    
    case 'LEVANTAR_ARCHIVO_MOVBAN':
        $param_prc = array(
            ':p_n_id_disco' => $n_id_disco,
            ':p_cant_reg' => null,
            ':p_estado'=>null,
            ':p_linea'=>null,
            ':p_error'=>null,
            ':p_error_ora' => null
                            
                        
        );
        $sql = "begin
						PAC_INGRESO_PAGOS.levantar_archivo(:p_n_id_disco,:p_cant_reg,:p_estado,:p_linea,:p_error,:p_error_ora);
                end;";
        $db_procedure = new DB_Procedure($sql);
        $null=null;
        $result = $db_procedure->execute_query($param_prc,$null,TRUE);
        
        if($result->resultado != 'OK') {
            $response->resultado = $param_prc[':p_error'].' - '.$param_prc[':p_error_ora'];
        
            if(!$response-> resultado){
                $response-> resultado = $result->resultado;
            }
            $db_query_d = new DB_Query("DELETE FROM SIAT.ARCHIVO_INTERFAZ WHERE n_id_disco = :id_disco_d");
            $par = array(':id_disco_d' => $n_id_disco);
            $row_query_d = $db_query_d->do_query($par);
            $db_procedure->db_commit();
        }else{ // Ejecucion sin errores
            $response->resultado = 'OK';
            $response-> p_cant_reg =  $param_prc[':p_cant_reg'];
            $response-> p_hay_errores =  'NO';
            $response-> p_estado =  $param_prc[':p_estado'];
            $response-> p_linea =  $param_prc[':p_linea'];
            
        }
        echo json_encode($response);
		break;
        /******************************* FIN DE LA INTERFAZ LEVANTAR ARCH MOVBAN ********************************/
		
	case 'PROCESAR_ARCHIVOS':
		$param_prc = array(
			':p_n_id_disco' => $n_id_disco,
			':p_path'=>$path,
			':p_n_remesa'=>null,
			':p_d_pagos_ok'=>null,
			':p_mensaje_salida'=>null,
			':p_error'=>null,
			':p_error_ora' => null
		);
		$sql = "begin
				PAC_INGRESO_PAGOS.PROCESAR_ARCHIVO(
					:p_path,
					:p_n_id_disco,
					:p_n_remesa,
					:p_d_pagos_ok,
					:p_mensaje_salida,
					:p_error,
					:p_error_ora
					);
				end;";

		$db_procedure = new DB_Procedure($sql);

		$null=null;
		//$result = $db_procedure->execute_query($param_prc,$null,TRUE);
		
		try{
			$result = $db_procedure->execute_query($param_prc,$null,TRUE);
		}catch (Exception $e) {
			$response->resultado =  $e->getMessage();
			die();
		}


		if($result->resultado != 'OK') {
			
				
				$response-> p_n_remesa =$param_prc[':p_n_remesa'];
				$response-> p_d_pagos_ok =$param_prc[':p_d_pagos_ok'];
				$response-> p_n_remesa =$param_prc[':p_n_remesa'];
				$response-> resultado =$param_prc[':p_error']. 
				$param_prc[':p_error_ora'];

			if(!$response-> resultado){
				$response-> resultado = $result->resultado;
			}
			
			$db_query_d = new DB_Query("  DELETE
										  FROM SIAT.ARCHIVO_INTERFAZ
										  WHERE n_id_disco = :id_disco_d"
			);
			$par = array(':id_disco_d' => $n_id_disco);
			$row_query_d = $db_query_d->do_query($par);
			$db_procedure->db_commit();
		}else{ // Ejecucion sin errores
			$response->resultado = 'OK';
			$response-> p_n_remesa =$param_prc[':p_n_remesa'];
				$response-> p_d_pagos_ok =$param_prc[':p_d_pagos_ok'];
				$response-> p_n_remesa =$param_prc[':p_n_remesa'];
				$response-> p_mensaje_salida = $param_prc[':p_mensaje_salida'];
				
		}

		echo json_encode($response);
		break;
		/******************************* FIN DE LA INTERFAZ PROCESAR ARCHIVO ********************************/
		
    case 'LEVANTAR_CARGA_AFIP':
        $param_prc = array(
            ':p_d_path_txt'=>$path,
			':p_id_disco' => $n_id_disco,
			':p_cant_reg'=>null,
            ':p_cant_descartados'=>null,
            ':p_cant_err'=>null,
            ':p_cant_010'=>null,
            ':p_cant_011'=>null,
            ':p_cant_030'=>null,
            ':p_cant_030_web'=>null,
            ':p_cant_030_ali'=>null,
            ':p_cant_301'=>null,
            ':p_cant_contrib'=>null,
            ':p_cant_8100'=>null,
            ':p_cant_2082'=>null,
            ':p_cant_2083'=>null,
			':p_cant_CO_INFTE'=>null,
            ':p_cant_VE_INFTE'=>null,
            ':p_cant_CO_INFDO'=>null,
            ':p_cant_VE_INFDO'=>null,
            ':p_cant_FE_EMI'=>null,
            ':p_cant_FE_REC'=>null,
            ':p_mensaje_salida'=>null,
            ':p_mensaje_final'=>null,
            ':p_mostrar_error'=>null,
			':p_error'=>null,
			':p_error_ora' => null
		);
		$sql = "begin
					PAC_CONTRIBUYENTES_AFIP.CARGAR_ARCHIVO(
					:p_d_path_txt,
					:p_id_disco,
					:p_cant_reg,
                    :p_cant_descartados,
                    :p_cant_err,
                    :p_cant_010,
                    :p_cant_011,
                    :p_cant_030,
                    :p_cant_030_web,
                    :p_cant_030_ali,
                    :p_cant_301,
                    :p_cant_contrib,
                    :p_cant_8100,
                    :p_cant_2082,
                    :p_cant_2083,
					:p_cant_CO_INFTE,
					:p_cant_VE_INFTE,
					:p_cant_CO_INFDO,
					:p_cant_VE_INFDO,
					:p_cant_FE_EMI,
					:p_cant_FE_REC,
                    :p_mensaje_salida,
                    :p_mensaje_final,
                    :p_mostrar_error,
					:p_error,
					:p_error_ora
					);
				end;";

		$db_procedure = new DB_Procedure($sql);

		$null=null;
		//$result = $db_procedure->execute_query($param_prc,$null,TRUE);
		
		try{
			$result = $db_procedure->execute_query($param_prc,$null,TRUE);
		}catch (Exception $e) {
			$response->resultado =  $e->getMessage();
			die();
		}


		if($result->resultado != 'OK') {
				$response-> p_cant_reg =$param_prc[':p_cant_reg'];
				$response-> p_cant_descartados =$param_prc[':p_cant_descartados'];
				$response-> p_cant_err =$param_prc[':p_cant_err'];
				$response-> p_cant_010 =$param_prc[':p_cant_010'];
				$response-> p_cant_011 =$param_prc[':p_cant_011'];
				$response-> p_cant_030 =$param_prc[':p_cant_030'];
				$response-> p_cant_030_web =$param_prc[':p_cant_030_web'];
				$response-> p_cant_030_ali =$param_prc[':p_cant_030_ali'];
				$response-> p_cant_301 =$param_prc[':p_cant_301'];
				$response-> p_cant_contrib =$param_prc[':p_cant_contrib'];
				$response-> p_cant_8100 =$param_prc[':p_cant_8100'];
				$response-> p_cant_2082 =$param_prc[':p_cant_2082'];
				$response-> p_cant_2083 =$param_prc[':p_cant_2083'];
				$response-> p_cant_CO_INFTE =$param_prc[':p_cant_CO_INFTE'];
				$response-> p_cant_VE_INFTE =$param_prc[':p_cant_VE_INFTE'];
				$response-> p_cant_CO_INFDO =$param_prc[':p_cant_CO_INFDO'];
				$response-> p_cant_VE_INFDO =$param_prc[':p_cant_VE_INFDO'];
				$response-> p_cant_FE_EMI =$param_prc[':p_cant_FE_EMI'];
				$response-> p_cant_FE_REC =$param_prc[':p_cant_FE_REC'];
				$response-> p_mensaje_salida =$param_prc[':p_mensaje_salida'];
				$response-> p_mensaje_final =$param_prc[':p_mensaje_final'];
				$response-> p_mostrar_error =$param_prc[':p_mostrar_error'];
				$response-> resultado =$param_prc[':p_error'].$param_prc[':p_error_ora'];

			if(!$response-> resultado){
				$response-> resultado = $result->resultado;
			}
			
			$db_query_d = new DB_Query("  DELETE
										  FROM SIAT.ARCHIVO_INTERFAZ
										  WHERE n_id_disco = :id_disco_d"
			);
			$par = array(':id_disco_d' => $n_id_disco);
			$row_query_d = $db_query_d->do_query($par);
			$db_procedure->db_commit();
		}else{ // Ejecucion sin errores
			$response->resultado = 'OK';
			$response-> p_cant_reg =$param_prc[':p_cant_reg'];
			$response-> p_cant_descartados =$param_prc[':p_cant_descartados'];
			$response-> p_cant_err =$param_prc[':p_cant_err'];
			$response-> p_cant_010 =$param_prc[':p_cant_010'];
			$response-> p_cant_011 =$param_prc[':p_cant_011'];
			$response-> p_cant_030 =$param_prc[':p_cant_030'];
			$response-> p_cant_030_web =$param_prc[':p_cant_030_web'];
			$response-> p_cant_030_ali =$param_prc[':p_cant_030_ali'];
			$response-> p_cant_301 =$param_prc[':p_cant_301'];
			$response-> p_cant_contrib =$param_prc[':p_cant_contrib'];
			$response-> p_cant_8100 =$param_prc[':p_cant_8100'];
			$response-> p_cant_2082 =$param_prc[':p_cant_2082'];
			$response-> p_cant_2083 =$param_prc[':p_cant_2083'];
			$response-> p_cant_CO_INFTE =$param_prc[':p_cant_CO_INFTE'];
			$response-> p_cant_VE_INFTE =$param_prc[':p_cant_VE_INFTE'];
			$response-> p_cant_CO_INFDO =$param_prc[':p_cant_CO_INFDO'];
			$response-> p_cant_VE_INFDO =$param_prc[':p_cant_VE_INFDO'];
			$response-> p_cant_FE_EMI =$param_prc[':p_cant_FE_EMI'];
			$response-> p_cant_FE_REC =$param_prc[':p_cant_FE_REC'];
			$response-> p_mensaje_salida =$param_prc[':p_mensaje_salida'];
			$response-> p_mensaje_final =$param_prc[':p_mensaje_final'];
            $response-> p_mostrar_error =$param_prc[':p_mostrar_error'];
				
		}

		echo json_encode($response);
		break;
        /******************************* FIN DE LA INTERFAZ CARGA ARCHIVOS AFIP ********************************/

		case 'LEVANTAR_ARCHIVO_SIRPEI':
			$param_prc = array(
				':p_path'=>$path,
				':p_n_id_disco' => $n_id_disco,
				':p_cod_agente' => $p_cod_agente,
				':p_id_sesion' => $id_sesion,
				':p_estado'=>null,
				':p_cant_reg'=>null,
				':p_c_estado'=>null,
				':p_n_agente'=>null,
				':p_n_agente_c'=>null,
				':p_d_agente'=>null,
				':p_f_presentacion'=>null,
				':p_cant_fechas'=>null,
				':p_posicion_fiscal'=>null,
				':p_var'=>null,
				':p_estado_salida'=>null,
				':p_error'=>null,
				':p_error_ora' => null
			);

			$sql = "begin
				SIAT.PKG_DDJJ_AGENTES.EXPLORAR(
						:p_path,
						:p_n_id_disco,
						:p_cod_agente,
						:p_id_sesion,
						:p_estado,
						:p_cant_reg,
						:p_c_estado,
						:p_n_agente,
						:p_n_agente_c,
						:p_d_agente,
						:p_f_presentacion,
						:p_cant_fechas,
						:p_posicion_fiscal,
						:p_var,
						:p_estado_salida,
						:p_error,
						:p_error_ora
						);
					end;";
	
			$db_procedure = new DB_Procedure($sql);
	
			$null=null;
			//$result = $db_procedure->execute_query($param_prc,$null,TRUE);
			
			try{
				$result = $db_procedure->execute_query($param_prc,$null,TRUE);
			}catch (Exception $e) {
				$response->resultado =  $e->getMessage();
				die();
			}
	
	
			if($result->resultado != 'OK') {
					$response-> resultado =$param_prc[':p_error'].$param_prc[':p_error_ora'];
	
				if(!$response-> resultado){
					$response-> resultado = $result->resultado;
				}
				
				$db_query_d = new DB_Query("  DELETE
											  FROM SIAT.ARCHIVO_INTERFAZ
											  WHERE n_id_disco = :id_disco_d"
				);
				$par = array(':id_disco_d' => $n_id_disco);
				$row_query_d = $db_query_d->do_query($par);
				$db_procedure->db_commit();
			}else{ // Ejecucion sin errores
				$response->resultado = 'OK';
				$response-> p_estado =$param_prc[':p_estado'];
				$response-> p_n_id_disco =$param_prc[':p_n_id_disco'];
				$response-> p_cant_reg =$param_prc[':p_cant_reg'];
				$response-> p_c_estado =$param_prc[':p_c_estado'];
				$response-> p_n_agente =$param_prc[':p_n_agente'];
				$response-> p_n_agente_c =$param_prc[':p_n_agente_c'];
				$response-> p_d_agente =$param_prc[':p_d_agente'];
				$response-> p_f_presentacion =$param_prc[':p_f_presentacion'];
				$response-> p_cant_fechas =$param_prc[':p_cant_fechas'];
				$response-> p_posicion_fiscal =$param_prc[':p_posicion_fiscal'];
				$response-> p_var =$param_prc[':p_var'];
				$response-> p_estado_salida =$param_prc[':p_estado_salida'];
				
					
			}
	
			echo json_encode($response);
			break;
			/******************************* FIN DE LA INTERFAZ LEVANTAR ARCHIVO SIRPEI ********************************/


	default:
		$response->resultado = 'La Interfaz no está preparada para recibir el proceso.';
		echo json_encode($response);
		break;
}
?>