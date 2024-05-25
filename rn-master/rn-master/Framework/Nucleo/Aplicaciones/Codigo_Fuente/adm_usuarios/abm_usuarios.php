<?php
/*
error_reporting(E_ALL);
ini_set('display_errors', '1');*/
switch($_POST['oper']){
    case 'add':
        $parametros[':oper'] = $_POST['oper'];
        $parametros[':id_rel_persona'] = fun_dato_base($_POST['id_rel_persona'],'N');
        $parametros[':c_usuario'] = fun_dato_base($_POST['c_usuario'],'T');
        $parametros[':d_denominacion'] = fun_dato_base($_POST['d_denominacion'],'T');
        $parametros[':f_baja'] = $_POST['f_baja'];
        $parametros[':f_caducidad_clave'] = $_POST['f_caducidad_clave'];
        $parametros[':d_mail'] = fun_dato_base($_POST['d_mail'],'T');
        $parametros[':d_sello'] = fun_dato_base($_POST['d_sello'],'T');
        $parametros[':m_log'] = fun_dato_base($_POST['m_log'],'T');
        $parametros[':c_tipo_usuario'] = fun_dato_base($_POST['d_tipo'],'T');
        $parametros[':p_error'] = null;
        $parametros[':p_error_ora'] = null;

        // Generamos la contraseña
        $sql_c = "select pac_encripta.generar_contrasena(8) as password from dual";

        $db_query = new DB_Query($sql_c);
        $par = array( ':c_usuario' => $_POST['c_usuario'] );
        $password = $db_query->do_query($par);

        if($password){
            $parametros[':c_clave'] = $password[0]['PASSWORD'];

            $db_query = new DB_Procedure(
                "begin PAC_SEGURIDAD.PRC_ABM_USUARIO(
						:oper, 
						:id_rel_persona, 
						:c_usuario,
						:d_denominacion,
						:f_baja,
						:f_caducidad_clave,
						:d_mail,
						:d_sello,
						:c_clave,
						:m_log,
						:c_tipo_usuario,
						:p_error,
						:p_error_ora
					);
					END;"
            );
            $resultado = $db_query->execute_query($parametros);
			if ($parametros[':p_error']){
				$resultado->resultado = $parametros[':p_error'];
			} else {
				$resultado->pass = $password[0]['PASSWORD'];
				$resultado->parametros = $parametros;
			}
        }else{
            $resultado->resultado = "Error al generar el password. Por favor intentelo mas tarde";
        }
        break;
    case 'reset':

        include(FRAMEWORK_DIR.'Recursos/Mailer/cl_enviar_correo.php');
        $cl_enviar_correo = new cl_enviar_correo();

        // Buscamos la denominacion y el id contribuyente
        $sql_c = "select
							d_denominacion, 
							id_rel_persona,
							D_MAIL as EMAIL_USUARIO,
							c_tipo_usuario
					from 
						usuarios 
					where 
						c_usuario = :c_usuario ";

        $db_query = new DB_Query($sql_c);

        $par = array(
            ':c_usuario' => $_POST['c_usuario']
        );
        $result = $db_query->do_query($par);
		
		if ($result[0]['C_TIPO_USUARIO'] != "EXTERNO"){
			$query = "SELECT COUNT(p.id_perfil) cant
				FROM usuarios u, usuarios_perfiles up, perfiles p
				WHERE u.c_usuario= up.c_usuario AND
					up.id_perfil= p.id_perfil AND
					u.c_usuario = get_user() AND
					p.d_perfil in ('AUT_MODIF_USU_COMPLETO')";

			$db_query = new DB_Query($query);
			$params = array();
			$row_query = $db_query->do_query($params);
			if($row_query[0]['CANT'] == 0){
				$resultado->resultado = "No cuenta con permisos.";
				$permisos = false;
			} else {
				$permisos = true;
			}
		} else {
			$permisos = true;
		}
		
		if($permisos){
			$parametros[':oper'] = $_POST['oper'];
			$parametros[':id_rel_persona'] = fun_dato_base($result[0]['ID_REL_PERSONA'], 'N');
			$parametros[':c_usuario'] = fun_dato_base($_POST['c_usuario'],'T');
			$parametros[':d_denominacion'] = fun_dato_base($result[0]['D_DENOMINACION'], 'T');
			$parametros[':f_baja'] = null;
			$parametros[':f_caducidad_clave'] = null;
			$parametros[':d_mail'] = null;
			$parametros[':d_sello'] = null;
			$parametros[':m_log'] = null;
			$parametros[':c_tipo_usuario'] = null;
			$parametros[':p_error'] = null;
			$parametros[':p_error_ora'] = null;

			// Generamos la contraseña
			$sql_c = "select pac_encripta.generar_contrasena(8) as password from dual";

			$db_query = new DB_Query($sql_c);
			$par = array( null );
			$password = $db_query->do_query($par);

			if($password){
				$parametros[':c_clave'] = $password[0]['PASSWORD'];

				$db_query = new DB_Procedure("begin PAC_SEGURIDAD.PRC_ABM_USUARIO(:oper, 
																		:id_rel_persona, 
																		:c_usuario,
																		:d_denominacion,
																		:f_baja,
																		:f_caducidad_clave,
																		:d_mail,
																		:d_sello,
																		:c_clave,
																		:m_log,
																		:c_tipo_usuario,
																		:p_error,
																		:p_error_ora); END;"
				);
				$resultado = $db_query->execute_query($parametros);
				if ($parametros[':p_error']){
					$resultado->resultado = $parametros[':p_error'];
				} else {
					$resultado->pass = $password[0]['PASSWORD'];
					$resultado->parametros = $parametros;

					/*********CONSULTA DATOS PARA ENVIAR EMAIL AL CONTRIBUYENTE****************/

					//deinifion de destinatarios
					$destinatarios_ar[] = array(
						'NOMBRE' => $result[0]['D_DENOMINACION'],
						'ID_REL_PERSONA' => $result[0]['ID_REL_PERSONA'],
						'EMAIL'=>$result[0]['EMAIL_USUARIO']
					);

					$data['remitente_nombre'] = 'FRMWK';
					$data['asunto'] = 'Modificación de Clave Fiscal';
					$data['c_remitente'] = 'RES_CLAVE';

					$replace_ar['#TITULO#'] = 'Modificación de Clave Fiscal';
					$replace_ar['#MENSAJE#'] =
						'
								<p>Estimado <b>'.$result[0]['D_DENOMINACION'].'</b> su clave ha sido modificada.</p>
									<p>Sus nuevos datos de acceso al sistma son:
									<ul style="margin-left:0; padding-left:0;">
										<ol><b>Usuario</b>: '.$_POST['c_usuario'].'</ol>
										<ol><b>Clave: </b>'.$password[0]['PASSWORD'].'</ol>
									</ul>
								</p>
							';


					$ruta_template = FRAMEWORK_DIR.'Recursos/Mailer/templates/template_generico.html';

					$data['html_correo'] = $cl_enviar_correo->loadTemplate(	$ruta_template, $replace_ar);

					$envio_correo = $cl_enviar_correo->enviarCorreo( $data, $destinatarios_ar, array(), array() );

					if($envio_correo != 'true'){

					}
					$resultado->correo = $envio_correo;
					/*********FIN CONSULTA DATOS PARA ENVIAR EMAIL AL CONTRIBUYENTE****************/

				}

			}else{
				$resultado->resultado = "Error al generar el password. Por favor intentelo mas tarde";
			}
		}
        break;
    case 'edit':
    case 'del':
        $parametros[':oper'] = $_POST['oper'];
        $parametros[':id_rel_persona'] = fun_dato_base($_POST['id_rel_persona'],'N');
        $parametros[':c_usuario'] = fun_dato_base($_POST['c_usuario'],'T');
        $parametros[':d_denominacion'] = fun_dato_base($_POST['d_denominacion'],'T');
        $parametros[':f_baja'] = $_POST['f_baja'];
        $parametros[':f_caducidad_clave'] = $_POST['f_caducidad_clave'];
        $parametros[':d_mail'] = fun_dato_base($_POST['d_mail'],'T');
        $parametros[':d_sello'] = fun_dato_base($_POST['d_sello'],'T');
        $parametros[':m_log'] = fun_dato_base($_POST['m_log'],'T');
        $parametros[':c_tipo_usuario'] = fun_dato_base($_POST['d_tipo'],'T');
        $parametros[':p_error'] = null;
        $parametros[':p_error_ora'] = null;
        $parametros[':c_clave'] = '';
        $db_query = new DB_Procedure("begin PAC_SEGURIDAD.PRC_ABM_USUARIO(:oper, 
																:id_rel_persona, 
																:c_usuario,
																:d_denominacion,
																:f_baja,
																:f_caducidad_clave,
																:d_mail,
																:d_sello,
																:c_clave,
																:m_log,
																:c_tipo_usuario,
																:p_error,
																:p_error_ora); END;");

        $resultado = $db_query->execute_query($parametros);
		if ($parametros[':p_error']){
			$resultado->resultado = $parametros[':p_error'];
		} else {
			$resultado->pass = '';
		}
        break;
}

echo(json_encode($resultado));
?>