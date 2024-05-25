<?php
class cl_enviar_correo{
	function enviarCorreo( $data, $destinatarios_ar,$archivos_ar, $mail_cco_ar ){
			if ($data['html_correo'] != ''){
				//chdir(getenv("HOME"));

				/********CONSULTA DATOS DEL REMITENTE PARAMETRIZADO EN TABLAS GENERALES****/
				
					$sql = "select 
								D_DATO1 AS usuario,
								D_DATO2 AS servidor,
								D_DATO3 AS puerto,
								D_DATO4 AS clave,
								D_DATO5 AS smtpauth,
								D_DATO6 AS smtpsecure,
								D_DATO7 AS mail_from
							FROM 
								tablas_generales
							WHERE 
								n_tabla = 687
								AND c_dato = :c_remitente";
					//die($sql);
						$db_query = new DB_Query($sql);
						$parametros = array(':c_remitente'=>$data['c_remitente']);
						$row_query = $db_query->do_query($parametros);
				
				/********CONSULTA DATOS DEL REMITENTE PARAMETRIZADO EN TABLAS GENERALES****/
				
				$sql_secuencia = 'SELECT N_ID_MAIL.nextval as N_ID_MAIL FROM DUAL';
				$db_query_seq = new DB_Query($sql_secuencia);
				$parametros = array();
				$row_query_seq = $db_query_seq->do_query($parametros);
				
				
				require_once('cl_phpmailer.php');
				$mail = new PHPMailer(true); 
												
				$mail->IsSMTP(); 
				$body = $data['html_correo'];
				try {
					$mail->Host       = $row_query[0]['SERVIDOR']; 			
					$mail->SMTPAuth   = $row_query[0]['SMTPAUTH'];           
					$mail->SMTPSecure = $row_query[0]['SMTPSECURE']; 
					//$mail->SMTPDebug  = 2;
					$mail->Port       = $row_query[0]['PUERTO'];                     		
					$mail->Username   = $row_query[0]['USUARIO']; 
					$mail->Password   = $row_query[0]['CLAVE'];
					
					$n_id_mail = $row_query_seq[0]['N_ID_MAIL'];
					
                    // Si tiene un archivo adjunto
                    for($i= 0; $i<count($archivos_ar); $i++){
                        $mail->AddAttachment($archivos_ar[$i]);      // attachment
						
						$sql = 'INSERT INTO 
									mail_attach 
									(
										N_ID_MAIL, N_SECUENCIA,
										ATTACH_NAME, B_ATTACH,
										ATTACH_URL
									)
								VALUES
									(
										:n_id_mail, :n_secuencia,
										:attach_name, empty_blob(), 
										:attach_url
									) 
								RETURNING B_ATTACH INTO :blobdata';
						
						$db_query->setQuery($sql);
						
						$param = array(
								':n_id_mail' => $n_id_mail,
								':n_secuencia' => $i,
								':attach_name' => basename($archivos_ar[$i]),
								':attach_url' => $archivos_ar[$i]
							);
							
							
						$param_blob = array(':blobdata' => $blobdata);
						
						$db_query->do_query($param,OCI_ASSOC,$param_array = null,$param_blob);
						$param_blob[':blobdata']->savefile($archivos_ar[$i]);
						$db_query->db_commit();
						$param_blob[':blobdata']->close();
						
                    }
                    // destinatarios del contacto
					
					$params_mail_cab = array();
					
					$m_reenviar = (isset($data['m_reenviar'])) ? $data['m_reenviar']:"N";
					
					$ins_mail_cab = 'INSERT INTO MAIL_CAB
									  (
										N_ID_MAIL, C_REMITENTE,
										D_ASUNTO, HTML_MAIL, F_SOL_ENVIO, 
										C_USUARIO_SOL, C_USUARIO_ENVIO, C_ESTADO_ENVIO,
										F_ENVIO, D_ERROR, M_REENVIA
									  )
									VALUES
									  (
										:n_id_mail, :c_remitente,
										:d_asunto, :html_mail, sysdate, 
										user, user, :c_estado_envio,
										null, null, :m_reenviar
									  )';
									  
					$params_mail_cab = array(
						':n_id_mail'=>$n_id_mail,
						':c_remitente'=>$data['c_remitente'],
						':d_asunto'=>$data['asunto'],
						':html_mail'=>$body,
						':c_estado_envio'=>'P',
						':m_reenviar'=>$m_reenviar
					);
					
					$db_query = new DB_Query($ins_mail_cab);
					$row_query_mail_cab = $db_query->do_query($params_mail_cab);
					$db_query->db_commit();
					
					$params_mail_to = array();
					$ins_mail_to = 'INSERT ALL ';
					
					for( $i=0; $i<count($destinatarios_ar); $i++){
                        if($i>0){
                            $mail->AddBCC( $destinatarios_ar[$i]["EMAIL"], $destinatarios_ar[$i]["NOMBRE"] );
                        }else{
                            $mail->AddAddress( $destinatarios_ar[$i]["EMAIL"], $destinatarios_ar[$i]["NOMBRE"]);
                        }
						$ins_mail_to .= 'INTO MAIL_TO 
											(
												N_ID_MAIL,
												ID_CONTRIBUYENTE,
												D_DENOMINACION,
												D_MAIL
											)
										VALUES 
											(
												:n_id_mail, 
												:id_contribuyente_'.$i.',
												:d_denominacion_'.$i.',
												:d_email_'.$i.'
											) ';
											
						$params_mail_to[':id_contribuyente_'.$i] = $destinatarios_ar[$i]["ID_CONTRIBUYENTE"];
						$params_mail_to[':d_denominacion_'.$i] = utf8_encode($destinatarios_ar[$i]["NOMBRE"]);
						$params_mail_to[':d_email_'.$i] = $destinatarios_ar[$i]["EMAIL"];
					}
					
					$params_mail_to[':n_id_mail'] = $n_id_mail;
					
					$j = $i;//guardo en $j el ultimo valor de bucle de $destinatarios_ar
					
                    for( $i=0; $i<count($mail_cco_ar); $i++ ){
                        $mail->AddBCC($mail_cco_ar[$i]['EMAIL']);
						
						$pos = $i+$j;
						
						$ins_mail_to .= 'INTO MAIL_TO 
											(
												N_ID_MAIL,
												ID_CONTRIBUYENTE,
												D_DENOMINACION,
												D_MAIL,
												D_TYPE_TO
											)
										VALUES 
											(
												:n_id_mail, 
												:id_contribuyente_'.$pos.',
												:d_denominacion_'.$pos.',
												:d_email_'.$pos.',
												:d_type_to_'.$pos.'
											) ';
											
						$params_mail_to[':id_contribuyente_'.$pos] = $mail_cco_ar[$i]['ID_CONTRIBUYENTE'];
						$params_mail_to[':d_denominacion_'.$pos] = $mail_cco_ar[$i]['D_DENOMINACION'];
						$params_mail_to[':d_email_'.$pos] = $mail_cco_ar[$i]['EMAIL'];
						$params_mail_to[':d_type_to_'.$pos] = 'CCO';
                    }
					
					$ins_mail_to .= 'SELECT 1 FROM DUAL';
					
					$db_query = new DB_Query($ins_mail_to);
					$row_query_mail_to = $db_query->do_query($params_mail_to);
					$db_query->db_commit();
					
					if ($row_query[0]['MAIL_FROM']!= null){
						$mail->SetFrom($row_query[0]['MAIL_FROM'], $data['remitente_nombre']);
					}else{
						$mail->SetFrom($row_query[0]['USUARIO'], $data['remitente_nombre']);
					}
					$mail->Subject = utf8_decode($data['asunto']);
					$mail->MsgHTML(($body));
					if($mail->Send()){
						
						$upd_mail_cab = 'UPDATE MAIL_CAB
										SET
											C_ESTADO_ENVIO = :c_estado_envio,
											F_ENVIO = sysdate
										WHERE 
											N_ID_MAIL = :n_id_mail';
											
						$params_upd_mail_cab[':n_id_mail'] = $n_id_mail;
						$params_upd_mail_cab[':c_estado_envio'] = 'E';
						
						$db_query = new DB_Query($upd_mail_cab);
						$row_query_upd_mail_cab = $db_query->do_query($params_upd_mail_cab);
						$db_query->db_commit();
						
						$retorno = 'true';
						
					}else{
						$retorno = 'false';
					}
				} catch (phpmailerException $e) {
					$retorno = $e->errorMessage(); 
				} catch (Exception $e) {
					$retorno =  $e->getMessage();
				}
				
				// SI FALLA EL ENVÍO GUARDA EL ERROR
				if($retorno != 'true'){
					$upd_mail_cab = 'UPDATE MAIL_CAB
										SET
											D_ERROR = :d_error
										WHERE 
											N_ID_MAIL = :n_id_mail';
											
						$params_upd_mail_cab[':n_id_mail'] = $n_id_mail;
						$params_upd_mail_cab[':d_error'] = $retorno;
						
						$db_query = new DB_Query($upd_mail_cab);
						$row_query = $db_query->do_query($params_upd_mail_cab);
						$db_query->db_commit();
				}
				
				return $retorno;
			}
		}
	
	function loadTemplate( $template, $replace_ar ){
		$html = file_get_contents($template);
		
		foreach( $replace_ar as $clave => $valor ){
			$html = str_replace($clave, $valor, $html);
		}
	
		return $html;
	}
}
?>