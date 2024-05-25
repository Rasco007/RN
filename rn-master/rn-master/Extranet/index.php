<?php
//error_reporting(E_ALL);

$v=explode('/', $_GET['original_url']);
$entorno = strtoupper($v[0]);
$_SESSION['entorno'] = $entorno;

if ($entorno == 'INTRANET'){
	$p_c_tipo_perfil = 'INT';
}else{
	$p_c_tipo_perfil = 'EXT';
}

ob_start();

include(RECURSOS_FRAMEWORK_DIR."Aes/aes.class.php");
include(FRAMEWORK_DIR.'links.php');
include(EXTRANET.'links.php');
include(FUNCIONES_FRAMEWORK_PROY. "token_afip.php");

$jquery_panel = '';

// Fue invocado desde el Salir o viene de un error, por ejemplo, de tiemout?
if (isset($_POST['p_m_logout']) || isset($_GET['error']) || isset($_POST['p_m_cambio_clave'])) {

	$db_query = new DB_Query();

	if( (isset($_POST['p_m_logout']) || isset($_POST['p_m_cambio_clave']))
		and
		(isset($_SESSION['usuario']) and isset($_SESSION['clave_usuario'])) ){
		setLogout($db_query);		
	}//guarda fecha de cierre de sesión
	// Se liberan las variables de sistema
	unset($_POST['p_m_logout']);
	unset($_SESSION['usuario']);
	unset($_SESSION['clave_usuario']);
	unset($_SESSION['id_rel_persona']);
	unset($_SESSION['verif_notificar']);
    unset($_SESSION['logeado']);
	unset($_SESSION['token']);
	unset($_SESSION['sessionid']);

}else{
	if (isset($_SESSION['usuario'])&&!isset($_POST['aux_send_form'])) {
		header("Location: Aplicaciones/principal.php");
		exit;
	}
}

unset($_SESSION['usuario']);
unset($_SESSION['logeado']);
unset($_SESSION['entorno_logeado']);
unset($_SESSION['token']);
unset($_SESSION['sessionid']);

$displayModal = "false";
$hiddenAFIP = "hidden";	

//*******************************		INGRESO POR USUARIO			*********************************************/

if(isset($_POST['aux_send_form'])){

	// Tenemos usuario y contraseña
	if($_POST['log_user']!='' && $_POST['log_pass']!='') {

		$aes = new AES();
		$text = $_POST['log_pass'];
		$password = 'ClaveAes2015';
		$blocksize = 256;  // can be 128, 192 or 256
		$_POST['log_pass'] = AES::decrypt( $text, $password, $blocksize );
		
		$logon  = new oci_Logon();
		$login = $logon->oci_Logon();

		
		// Si es igual a falso, no era un usuario y contraseña de base válido.
		if ( $login == false) {
			$jquery_panel = "bootbox.alert('E','','El nombre de usuario o la contraseña introducidos no son correctos');";
		}else{

			$db_query = new DB_Query();
			$query = "  SELECT id_rel_persona,
							   c_clave,
							   case when nvl(f_caducidad_clave, trunc(sysdate)) >= trunc(sysdate) then 'NO' else 'SI' end as clave_caducada,
							   (select COUNT(*) AS EXISTE_USU_BD from all_users where upper(username) = upper(:c_usuario)) as EXISTE_USU_BD,
							   (select count(*) from usuarios_perfiles up,menu_perfiles mp where up.id_perfil = mp.id_perfil and up.c_usuario = upper(:c_usuario) and mp.id_menu = 1) as PERFIL_PRINCIPAL
						FROM usuarios u
						WHERE upper(c_usuario) = upper(:c_usuario)
							AND c_clave =
										CASE WHEN NVL(TRUNC(F_ACTUALIZAC),TRUNC(F_ALTA)) >= TO_DATE (FUN_CONSTANTE('FECHA_SALIDA')) THEN pac_encripta.encripta_new(:c_password)
										ELSE pac_encripta.encripta_new(:c_password)
										END
						AND f_baja is null
						AND EXISTS (SELECT 1
									FROM usuarios_perfiles up
									INNER JOIN perfiles p ON p.id_perfil = up.id_perfil
									WHERE p.c_tipo_perfil = :p_c_tipo_perfil
									  AND up.c_usuario = u.c_usuario)
						";


			$param_user = array(
				':c_usuario' => $_POST['log_user'],
				':c_password' => $_POST['log_pass'],
				':p_c_tipo_perfil' => $p_c_tipo_perfil
			);
			$db_query->setQuery($query);
			$error = false;
			try{
				$rows = $db_query->do_query($param_user);
			}catch(Exception $e) {
				$jquery_panel = "bootbox.alert('".$e->getMessage()."'+'Error al intentar conectarse a la Base de Datos.<br /> Por favor, vuelva a intentarlo m&aacute;s tarde. Gracias!');";
				$error = true;
			}


			// Si no hubo error
			if(!$error) {
				if(count($rows) > 0) {
					$row = $rows[0];
					/*if($row['EXISTE_USU_BD'] <= 0 && $_SESSION['entorno'] == 'INTRANET'){
						//El usuario de Base existe solo en intranet.
						$jquery_panel = "mostrar_cuadro('E','','No existe un usuario de Base de Datos para este usuario','','',330,160);"; // No existe un usuario de Base de Datos
					}else{						
						*/if($row['CLAVE_CADUCADA'] == 'NO') {
							//Asignamos las variables de sesión obtenidos de la consulta.
							$_SESSION['id_rel_persona'] = $row['ID_REL_PERSONA'];
							$_SESSION['c_clave_encriptada'] = $row['C_CLAVE'];

							$info = fun_info_usuario();//obtiene datos de usuario
							$info['d_geolocalizacion'] = $_POST['d_geolocalizacion'];

							/************DECRIPT IP************/
							$d_ip_local = $_POST['d_ip_local'];
							$password = 'ClaveIP2017';
							$blocksize = 256;  // can be 128, 192 or 256
							$info['d_ip_local'] = AES::decrypt( $d_ip_local, $password, $blocksize );
							/************FIN DECRIPT IP********/

							// Seteamos usuario, contraseña, timeout y entorno.
							$_SESSION['usuario'] = strtoupper($_POST['log_user']);
							$_SESSION['clave_usuario'] = $_POST['log_pass'];
							$_SESSION['entorno'] = $entorno;	

							insert_info_usuario($info, $db_query);//guarda datos usuario: navegador, ip, etc
							$minutes_to_add = 10;
							$fecha = new DateTime();
							$timestamp = $fecha->getTimestamp();
							$fecha_caduca = $fecha->add(new DateInterval('PT' . $minutes_to_add . 'M'));
							$timestamp_caduca = $fecha_caduca->getTimestamp();
						
							$_SESSION['sessionid'] = bin2hex(openssl_random_pseudo_bytes(64)).$timestamp;
							
							$param_prc = array(
								'p_c_usuario' => $_POST['log_user'],
								'p_c_usuario_oper' => $_POST['log_user'],
								'p_timestamp' => $timestamp,
								'p_timestamp_caduca' => $timestamp_caduca,
								'p_ticket_afip' => 1,
								'p_session_id' => $_SESSION['sessionid'],
								'p_cuits_rel' => $_POST['log_user'],
								':p_error'=> null,
								':p_error_ora' => null
							);		   
						  	
							$sql = "begin 			  
										PAC_AUTH_AFIP.PRC_INSERTA_LOGIN(:p_c_usuario,
										:p_c_usuario_oper,
										:p_timestamp ,
										:p_timestamp_caduca,
										:p_ticket_afip ,
										:p_session_id ,
										:p_cuits_rel,
										:p_error ,
										:p_error_ora );
									end;";
						
							$db_procedure = new DB_Procedure($sql);
						
							$null=null;
						
							$result = $db_procedure->execute_query($param_prc,$null,FALSE);
						
						
							if($result->resultado == 'OK') {
								$res = 'OK';
								$db_procedure->db_commit();
							}else {
								$res = $result->resultado;
								$db_procedure->db_rollback();
								die('No se pudo simular acceso AFIP. '.$result->resultado);
							}
						
							if($row['PERFIL_PRINCIPAL'] > 0) {
								$_SESSION['entorno_logeado'] = 'EXTRANET';
								$_SESSION['logeado'] = true;
								$_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(64));
								
								header("Location: Aplicaciones/principal.php");
							}else{
								header("Location: index.php?error=invalid");
							};
						}else {
							$_SESSION['c_usuario'] = strtoupper($_POST['log_user']);
							$_SESSION['logeado'] = true;
							$_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(64));
							$_SESSION['scf'] = true;
							$_SESSION['entorno'] = 'EXTRANET';
							//header("Location: Aplicaciones/cambiar_clave.php");
							
							$displayModal = "true";
							
							//header("Location: ../Framework/Aplicaciones/cambiar_clave.php");
						}
					/*}*/

				}else{
					$jquery_panel = "bootbox.alert('El nombre de usuario o la contraseña introducidos no son correctos');"; // Nombre de Usuario o Contrasea Invalidos -----
					unset($_REQUEST['captcha']);
					unset($_REQUEST['log_user']);
					unset($_REQUEST['log_pass']);
					unset($_SESSION['sessionid']);
				}
			}
		}
	}else{
		$jquery_panel = "bootbox.alert('Debe ingresar un Nombre de Usuario y Contraseña Validos.');"; // Usuario o Contrasea Incorrectas 
		oci_close($coon);
	}
}elseif(isset($_GET['error'])){
	if($_GET['error'] == 'Timeout'){
		$jquery_panel = "bootbox.alert('Su sesión ha expirado, vuelva a conectarse para continuar.');"; // Sesin Expirada -----
		oci_close($coon);
	}
	if($_GET['error'] == 'invalid'){
		$jquery_panel = "bootbox.alert('El usuario conectado no tiene los perfiles necesarios para acceder al menu seleccionado.');"; // Sesin Expirada -----
		oci_close($coon);
	}
	if($_GET['error'] == 'cambio_clave'){
		$jquery_panel = "bootbox.alert('Su contrase&ntilde;a ha sido modificada. Deber&aacute; volver a iniciar sesi&oacute;n');";
		oci_close($coon);
	}
	if($_GET['error'] == 'NoLog'){
		$jquery_panel = "bootbox.alert('Usted no se encuentra logeado, por favor ingrese al sistema.');";
		oci_close($coon);
	}
	if($_GET['error'] == 'Forbidden'){
		$jquery_panel = "bootbox.alert('Acci&oacuten prohibida, por favor ingrese nuevamente al sistema.');";
		oci_close($coon);
	}
	if($_GET['error'] == 'Token'){
		$jquery_panel = "bootbox.alert('Se ha producido un error al autenticar su conexión. Por favor, ingrese nuevamente al sistema.');";
		oci_close($coon);
	}
}elseif(isset($_POST['token']) && isset($_POST['sign'])){
    if(isset($_POST['aux_send_form2'])){
		#Selecciono CUIT de Lista -> Hay que loguearlo
		
		$res=CredentialsVerification();
		if ( $res !== "OK" ){
			$jquery_panel = "bootbox.alert('Se ha producido un error al autenticar su conexión con AFIP. Por favor, ingrese nuevamente al sistema con clave AFIP.');";
			oci_close($coon);
		}else{
			$res = loadUserAfip();
			if($res->resultado == 'OK'){
				header("Location: Aplicaciones/principal.php");
			}else{
				unset($_POST['p_m_logout']);
				unset($_SESSION['usuario']);
				unset($_SESSION['clave_usuario']);
				unset($_SESSION['id_rel_persona']);
				unset($_SESSION['verif_notificar']);
				unset($_SESSION['logeado']);
				unset($_SESSION['token']);
				unset($_SESSION['sessionid']);
				$jquery_panel = "bootbox.alert('".$res->error."');";
				oci_close($coon);
			}
		}
	}else{
		#Viene llamada de AFIP -> Cargo los CUITs para Operar
		$hiddenBtns = "hidden";	
		$hiddenAFIP = "";
		$res=CredentialsVerification();
		if ( $res !== "OK" ){
			
			$jquery_panel = "bootbox.alert('Se ha producido un error al autenticar su conexión con AFIP. Por favor, ingrese nuevamente al sistema con clave AFIP.');";
			oci_close($coon);
		}else{
			$res = getUserRelations();
			foreach ($res as $REL)
			{
				$options .= '<option value="'.$REL['key'].'">'.$REL['key'].'</option>';
			}
			/*foreach(explode(",",CUITS_DESA) as $CUIT){
				$options .= '<option value="'.$CUIT.'">'.$CUIT.'</option>';
			}*/
			
			

		}
	}
}
ob_end_flush();

$parametros = null;
$db_query = new DB_Query("SELECT c_tecla, c_tecla_izquierda, c_tecla_derecha  FROM param_teclado");

$teclado = json_encode($db_query->do_query($parametros));

?>
<style>

.btn_area{
  padding:10px;
  text-align:center
}

@media screen and (max-width:620px){
  .btn{
    display:block;
    margin:5px;
    width:100%
  }
}

</style>

<!DOCTYPE html>
<!--[if IE 8]> <html lang="es" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="es" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!--><html lang="es"><!--<![endif]-->
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta content="width=device-width, initial-scale=1" name="viewport" />
    <meta content="text/html; charset=UTF-8; X-Content-Type-Options=sniff" http-equiv="Content-Type" />
	<title>Sistema ART - Extranet</title>
	<link rel="shortcut icon" href="../Framework/Proyecto/Imagenes/favicon.ico" />
	<script type="text/javascript" src="<?=RECURSOS_FRAMEWORK?>Aes/aes.class.js"></script>
    <link href="<?=CSS_EXTRANET?>index.css" rel="stylesheet" type="text/css" />
    <script type="text/javascript" src="<?=RECURSOS_FRAMEWORK?>ValidationEngine/2.6.2/jquery.validationEngine.js"></script>
    <script type="text/javascript" src="<?=RECURSOS_FRAMEWORK?>ValidationEngine/2.6.2/jquery.validationEngine-es.js"></script>
    <script type="text/javascript" src="<?=RECURSOS_FRAMEWORK?>JqKeypad/jquery.plugin.min.js"></script>
    <script type="text/javascript" src="<?=RECURSOS_FRAMEWORK?>JqKeypad/jquery.keypad.min.js"></script>
    <script type="text/javascript" src="<?=RECURSOS_FRAMEWORK?>JqKeypad/jquery.keypad-es.js"></script>
    <script src="<?=RECURSOS_FRAMEWORK?>global/plugins/bootbox/bootbox.min.js" type="text/javascript"></script>
	<script src="<?=RECURSOS_FRAMEWORK_PROY?>fontawesome-free-5.15.3-web\js\all.js" type="text/javascript"></script>																												
    <style>
        body {
            background-color: #FFFFFF;
        }
    </style>
</head>
<header>
    <!-- BEGIN HEADER -->
    <nav class="navbar navbar-default navbar-static-top fluid_header centered">
        <div>
            <div class="col-md-6 col-sm-6 col-xs-12 nopadding">
                <a href="https://www.rionegro.gov.ar/index.php?catID=400" class="navbar-brand nomargin">                   		
                    <img src="<?= IMAGENES_FRAMEWORK_PROY ?>logoSCF.png" >
                </a>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-12 nopadding" hidden>
                <div class="navbar-header page-scroll">
                    <div class="collapse navbar-collapse cbp-spmenu cbp-spmenu-vertical cbp-spmenu-right" id="main-nav" style="padding-top:18px;">
                        <ul class="nav navbar-nav pull-right">
                            <!-- Mobile Menu Title -->						 
							<br>							
        					<li class="pull-right">
                           		<div class="btn btn-gris">
                            		<a style="color:#006854" href="https://auth.afip.gob.ar/contribuyente_/login.xhtml" target="_blank" role="button">Acceso con clave fiscal</a>
                           		</div>	
                            </li>                         
                            <li class="btn pull-right" style="background-color:transparent;">
                            	<div class="col-xs-3" style="padding-left:10px;padding-right:10px">
                            		<a href="https://www.facebook.com/AgenciaDeRecaudacionRN/" target="_blank" role="button"><i class="fa fa-facebook" style="color:#006854;" aria-hidden="true"></i></a>
                            	</div>
                            	<div class="col-xs-3" style="padding-left:10px;padding-right:10px">
									<a href="https://www.instagram.com/recaudacionrn/" target="_blank" role="button"><i class="fa fa-instagram" style="color:#006854;" aria-hidden="true"></i></a>
								</div>
								<div class="col-xs-3" style="padding-left:10px;padding-right:10px">
                            		<a href="https://www.youtube.com/user/AgenciaRecaudacionRN" target="_blank" role="button"><i class="fa fa-youtube" style="color:#006854;" aria-hidden="true"></i></a>
                            	</div>
								<div class="col-xs-3" style="padding-left:10px;padding-right:10px">
                            		<a href="https://twitter.com/RecaudacionRN" target="_blank" role="button"><i class="fa fa-twitter" style="color:#006854;" aria-hidden="true"></i></a>
                            	</div>
							</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</header>
<h1>Ingreso a <?=ucfirst(strtolower($entorno))?></h1>
<div class="container">
	<div class="clearfix"></div>
	<div id='popup_jasper'></div>
	<div class="row" id="main">

<form action="index.php" method="post" name="search3" id="search3" style="display:none">
	<input name="log_user" type="hidden" id="log_user" />
	<input name="log_pass" type="hidden" id="log_pass" />
	<input name="aux_send_form" type="hidden" id="aux_send_form" value="aux_send_form"/>
	<input type="hidden" id="d_geolocalizacion" name="d_geolocalizacion" />
	<input type="hidden" id="d_ip_local" name="d_ip_local" />
	<input name="log_submit" type="submit" value="Ingresar" />
</form>

<div class="container" <?=$hiddenAFIP?> >
	<div class="card">
		<div class="card-header">
			<h4 class="card-title">Seleccione CUIT </h4>
		</div>
		<div class="card-body">
			<form action="index.php" method="post" name="search4" id="search4" style="display:none;">
				<input name="token" type="hidden" id="token" value="<?= $_POST['token']?>"/>
				<input name="sign" type="hidden" id="sign"  value="<?=$_POST['sign']?>"/>
				<input name="aux_send_form2" type="hidden" id="aux_send_form2" value="aux_send_form2"/>
				<input type="hidden" id="d_geolocalizacion" name="d_geolocalizacion" />
				<input type="hidden" id="n_cuit_opera" name="n_cuit_opera" />
				<input name="log_submit" type="submit" value="Ingresar" />
			</form>
			<form>
                    <div class="form-group row col-md-4 col-md-offset-4 text-center">                    
                        
						<div>
						<select class="input-lg" name="cuit_opera" id="cuit_opera">
							<?=$options?>
						</select>
						</div>
					</div>
					<div class='form-group row col-md-offset-4 col-md-4 text-center'>
						<button id="btn_ingresar" type="button" onclick="ingresaAFIP();" class="btn btn-primary btn-md">
							<span class="ui-button-icon-space"></span>INGRESAR
						</button>
					</div>
			</form>
				
		</div>
	</div>
</div>
<div class="btn_area" <?=$hiddenBtns?> >
	<a href="#" id="btn_sit" class="btn_accion btn btn-primary" >INGRESE CON USUARIO <img id="logo_sit" src="../Framework/Proyecto/Imagenes/logo.png" width="100" /></a>
	<a href="#" id="btn_afip" class="btn_accion btn btn-primary" >INGRESE POR <img id="logo_afip" src="../Framework/Proyecto/Imagenes/afip.png" width="125" /></a>
	</div>

<div style="clear:both"></div>
    <!-- dialog bootstrap -->
        <?php include(APLICACIONES_FRAMEWORK."cambio_clave/html/cambio_clave.html"); ?>
    <!-- fin dialog bootstrap -->
</body>
</html>

<script  language="javascript" type="text/javascript">
	var FUNCIONES_FRAMEWORK = '<?=FUNCIONES_FRAMEWORK?>';
	var IMAGENES_FRAMEWORK = '<?=IMAGENES_FRAMEWORK_PROY?>';
	var FUNCIONES_BASEPATH = '<?=FUNCIONES_BASEPATH?>';
</script>
<script type="text/javascript" src="<?=JS_FRAMEWORK?>funciones.js"></script>
<script type="text/javascript" src="<?=JS_FRAMEWORK?>ubicacion.js"></script>
<script type="text/javascript" src="<?=RECURSOS_FRAMEWORK?>JsCookie/2.1.3/js.cookie.js?no_cache=<?=date('dmy')?>"></script>
<!--<script type="text/javascript" src="<?=JS_FRAMEWORK?>ip.js?no_cache=<?=date('dmy')?>"></script>-->

<script language="javascript" type="text/javascript">
	var _0x5fbf=["\x43\x6C\x61\x76\x65\x49\x50\x32\x30\x31\x37","\x65\x6E\x63\x72\x79\x70\x74"];function encriptIp(_0x4336x2){var _0x4336x3=_0x5fbf[0];var _0x4336x4=256;var _0x4336x5=AES[_0x5fbf[1]](_0x4336x2,_0x4336x3,_0x4336x4);return _0x4336x5}
	var _0x3975=["\x76\x61\x6C\x69\x64\x61\x74\x65","\x76\x61\x6C\x69\x64\x61\x74\x69\x6F\x6E\x45\x6E\x67\x69\x6E\x65","\x23\x6C\x6F\x67\x5F\x70\x61\x73\x73\x5F\x61\x75\x78","\x23\x6C\x6F\x67\x5F\x75\x73\x65\x72\x5F\x61\x75\x78","\x76\x61\x6C","\x43\x6C\x61\x76\x65\x41\x65\x73\x32\x30\x31\x35","\x65\x6E\x63\x72\x79\x70\x74","\x23\x6C\x6F\x67\x5F\x70\x61\x73\x73","\x23\x6C\x6F\x67\x5F\x75\x73\x65\x72","\x73\x75\x62\x6D\x69\x74","\x23\x73\x65\x61\x72\x63\x68\x33"];function passEncript(){var _0x25ddx2=$(_0x3975[2])[_0x3975[1]](_0x3975[0]);var _0x25ddx3=$(_0x3975[3])[_0x3975[1]](_0x3975[0]);if(!_0x25ddx2&& !_0x25ddx3){var _0x25ddx4=$(_0x3975[2])[_0x3975[4]]();var _0x25ddx5=_0x3975[5];var _0x25ddx6=256;var _0x25ddx7=AES[_0x3975[6]](_0x25ddx4,_0x25ddx5,_0x25ddx6);$(_0x3975[7])[_0x3975[4]](_0x25ddx7);$(_0x3975[2])[_0x3975[4]](null);$(_0x3975[8])[_0x3975[4]]($(_0x3975[3])[_0x3975[4]]());$(_0x3975[3])[_0x3975[4]](null);$(_0x3975[10])[_0x3975[9]]();};}

	
	function clearMem(){
		passEncript();
	}

	function ingresaAFIP(){
		$('#n_cuit_opera').val($('#cuit_opera').val());
		$('#search4').submit(); 				
	}

	$('#log_pass_aux, #log_user_aux').keyup(function( e ){
		if(e.keyCode==13)passEncript();
	});

	// ***** FUNCIONES DE CAMBIAR CLAVE ****** //

	        var teclado = <?=$teclado?>;//obtener_teclado();



        function change_level(level){    

            switch (level){
                case 'L':
                    $('#status_bar').removeClass('progress-bar-warning');
                    $('#status_bar').removeClass('progress-bar-success');
                    $('#status_bar').addClass('progress-bar-danger');
                    $('#status_bar').width("33%");
                    $('#status_bar').html("Baja");

                    break;
                case 'M':
                    $('#status_bar').removeClass('progress-bar-danger');
                    $('#status_bar').removeClass('progress-bar-success');
                    $('#status_bar').addClass('progress-bar-warning');
                    $('#status_bar').width("66%");
                    $('#status_bar').html("Media");
                    break;
                case 'H':
                    $('#status_bar').removeClass('progress-bar-danger');
                    $('#status_bar').removeClass('progress-bar-warning');
                    $('#status_bar').addClass('progress-bar-success');
                    $('#status_bar').width("100%");
                    $('#status_bar').html("Alta");
                    break;
            }
        }

        function sugerirClaveCambiarClave(){

        $.post('<?=FUNCIONES_BASEPATH?>cambio_clave/ajax_cambio_clave.php',
            {
                "accion":'sugerirClave'
            },
            function(data){
                var datos = JSON.parse(data);
                $('#tr_seguridad').show();
                $('#pass_nueva').val(datos['PASS_NUEVA']).prop({'type':'text'});
                $('#pass_nueva_rep').prop({'type':'text'});
                change_level(check_security_level($('#pass_nueva').val(),null,teclado));
                $('#pass_nueva_rep').attr('readonly',false).focus();
            }
        );

}



        $(window).on('load',function(){
            if(!($('html').hasClass('ie6'))){
                $('#modalBackground').css('display','none')
            }
        });



  // ****** FIN FUNCIONES CAMBIAR CLAVE ****** //


	$(document).ready(function(){
		$('#log_user_aux').focus();
		<?=$jquery_panel?>

		/*getIPs(function (ip) {
			if( $('#d_ip_local').val() == '' ) $('#d_ip_local').val(encriptIp(ip));
		});*/

		getLocation();

		// FUNCIONES CAMBIAR CLAVE EN DOCUMENT READY
			
			if("<?=$displayModal;?>" == "true"){
				$("#div_error").css("display", "inline");
				$("#msj_error").html("Su clave ha caducado, por favor cree una contraseña nueva.");
				$('#claveModal').modal({backdrop: 'static', keyboard: false});  
				$('#claveModal').modal('show');
			}

            $(window).on('load', function() {
                if(!($('html').hasClass('ie6'))) {
                    $('#modalBackground').css('display', 'none')
                }
            });



            $('#btn_cc_cancelar_cambio').click(function(){
                document.getElementById('div_error').style.display="none";
                document.getElementById("msj_error").innerHTML='';
                $('#div_cambia_clave input').val("");//limpiosiescribioalgo
                $('#claveModal').modal('hide');
            });

                $('#pass_nueva').keyup(function( e ){
                    if(e.keyCode == 13)passEncript();

                    var _0xa40f=["<?=ESC_BAR?>x43<?=ESC_BAR?>x6C<?=ESC_BAR?>x61<?=ESC_BAR?>x76<?=ESC_BAR?>x65<?=ESC_BAR?>x41<?=ESC_BAR?>x65<?=ESC_BAR?>x73<?=ESC_BAR?>x32<?=ESC_BAR?>x30<?=ESC_BAR?>x31<?=ESC_BAR?>x35<?=ESC_BAR?>x44<?=ESC_BAR?>x69<?=ESC_BAR?>x61<?=ESC_BAR?>x6C<?=ESC_BAR?>x6F<?=ESC_BAR?>x67<?=ESC_BAR?>x49<?=ESC_BAR?>x6E<?=ESC_BAR?>x74<?=ESC_BAR?>x72<?=ESC_BAR?>x61","<?=ESC_BAR?>x76<?=ESC_BAR?>x61<?=ESC_BAR?>x6C","<?=ESC_BAR?>x23<?=ESC_BAR?>x70<?=ESC_BAR?>x61<?=ESC_BAR?>x73<?=ESC_BAR?>x73<?=ESC_BAR?>x5F<?=ESC_BAR?>x61<?=ESC_BAR?>x63<?=ESC_BAR?>x74<?=ESC_BAR?>x75<?=ESC_BAR?>x61<?=ESC_BAR?>x6C","<?=ESC_BAR?>x65<?=ESC_BAR?>x6E<?=ESC_BAR?>x63<?=ESC_BAR?>x72<?=ESC_BAR?>x79<?=ESC_BAR?>x70<?=ESC_BAR?>x74","<?=ESC_BAR?>x23<?=ESC_BAR?>x70<?=ESC_BAR?>x61<?=ESC_BAR?>x73<?=ESC_BAR?>x73<?=ESC_BAR?>x5F<?=ESC_BAR?>x6E<?=ESC_BAR?>x75<?=ESC_BAR?>x65<?=ESC_BAR?>x76<?=ESC_BAR?>x61","<?=ESC_BAR?>x23<?=ESC_BAR?>x70<?=ESC_BAR?>x61<?=ESC_BAR?>x73<?=ESC_BAR?>x73<?=ESC_BAR?>x5F<?=ESC_BAR?>x6E<?=ESC_BAR?>x75<?=ESC_BAR?>x65<?=ESC_BAR?>x76<?=ESC_BAR?>x61<?=ESC_BAR?>x5F<?=ESC_BAR?>x72<?=ESC_BAR?>x65<?=ESC_BAR?>x70"];var password=_0xa40f[0];var blocksize=256;var pass_vieja=AES[_0xa40f[3]]($(_0xa40f[2])[_0xa40f[1]](),password,blocksize);var pass_nueva=AES[_0xa40f[3]]($(_0xa40f[4])[_0xa40f[1]](),password,blocksize);var pass_nueva_rep=AES[_0xa40f[3]]($(_0xa40f[5])[_0xa40f[1]](),password,blocksize);

                    if($('#pass_nueva').val().length > 0)
                        $('#tr_seguridad').show();
                    else
                        $('#tr_seguridad').hide();      

                    var level = check_security_level($('#pass_nueva').val(),pass_nueva,teclado);
                    change_level(level);

                });     

                $('#btn_cc_generar_clave').click(function(){
                    sugerirClaveCambiarClave();
                });


            $('#btn_cc_guardar').click(function(){
                var _0xdcdd=["\x43\x6C\x61\x76\x65\x41\x65\x73\x32\x30\x31\x35\x44\x69\x61\x6C\x6F\x67","\x76\x61\x6C","\x23\x70\x61\x73\x73\x5F\x61\x63\x74\x75\x61\x6C","\x65\x6E\x63\x72\x79\x70\x74","\x23\x70\x61\x73\x73\x5F\x6E\x75\x65\x76\x61","\x23\x70\x61\x73\x73\x5F\x6E\x75\x65\x76\x61\x5F\x72\x65\x70"];
                var password=_0xdcdd[0];
                var blocksize=256;
                var pass_vieja=AES[_0xdcdd[3]]($(_0xdcdd[2])[_0xdcdd[1]](),password,blocksize);
                var pass_nueva=AES[_0xdcdd[3]]($(_0xdcdd[4])[_0xdcdd[1]](),password,blocksize);
                var pass_nueva_rep=AES[_0xdcdd[3]]($(_0xdcdd[5])[_0xdcdd[1]](),password,blocksize);
				
				if(check_security_level($('#pass_nueva').val(),pass_nueva,teclado) == "L"){
					document.getElementById("msj_error").innerHTML= "El nivel de seguridad de la contraseña es bajo. Reinténtelo con una nueva.";
					document.getElementById('div_error').style.display="inline";
					return;
                }
				
                <?php
                /*
                Páginaparaobfuscar=>http://www.javascriptobfuscator.com/Javascript-Obfuscator.aspx
                Este código es el que está obfuscado arriba, se debe modificiar éste código, luego obfuscar y reemplazalo arriba.
                //guardacontraseñanueva
                var password='ClaveAes2015Dialog';
                var blocksize = 256;//canbe128,192or256
                var pass_vieja = AES.encrypt($('#pass_actual').val(),password,blocksize);
                var pass_nueva = AES.encrypt($('#pass_nueva').val(),password,blocksize);
                var pass_nueva_rep = AES.encrypt($('#pass_nueva_rep').val(),password,blocksize);*/
                ?>
                $.ajax({
                    type:'POST',
                    url: '<?=FUNCIONES_BASEPATH?>'+"cambio_clave/cambio_clave_abm.php",
                    data: {
                        "c_usuario":'<?=$_SESSION['c_usuario']?>',
                        "pass_vieja":pass_vieja,
                        "pass_nueva":pass_nueva,
                        "pass_nueva_rep":pass_nueva_rep
                    },
                    dataType: 'json',
                    success: function( info ) {
                        if(info.resultado!='OK'){
                            document.getElementById("msj_error").innerHTML=info.resultado;
                            document.getElementById('div_error').style.display="inline";
                        }else{
                            document.getElementById('div_error').style.display="none";
                            document.getElementById("msj_error").innerHTML='';
                            $('#claveModal').modal('hide');
							bootbox.alert('Se ha modificado la contraseña correctamente',
                                function(){
                                    post_to_url('<?=BASEPATH_ENTORNO?>index.php',{'p_m_cambio_clave':'S'},'_self','POST')
                                }
                            );
                        }
                    }

                });
            });


			$('#btn_sit').click(function(){
				$('#modal_login').modal('show');
			});

			$('#btn_afip').click(function(){
				window.location = "<?=URL_AUTH_AFIP?>";
			});

		

        }); //fin del document 

function closeLogin(){
		$('#modal_login').modal('hide');
		$('#modal_olvi_clave').modal('hide');
}

</script>

<!-- MODAL CREDENCIALES USER / PASS -->
<div class="modal fade" tabindex="-1" role="dialog" id="modal_login">
        <div class="modal-dialog" role="document">
            <div class="modal-content col-md-offset-2" style="width:60%;padding-left: 0px;padding-right: 0px;" >
                <div class="modal-body">
                    <form class="form-horizontal" role="form" id="form_filtro" onsubmit="return false">
                        <div class="input-group" style="margin-bottom: 2%;">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>
                            <input id="log_user_aux" type="text" class="form-control text-left validate[required]" name="username" value="" placeholder="Usuario" maxlength=40 autocomplete="off">
                        </div>
                        <div class="input-group has-feedback" style="margin-bottom: 2%;">
                            <span class="input-group-addon"><i class="glyphicon glyphicon-lock"></i></span>
                            <input id="log_pass_aux" type="password" class="form-control text-left validate[required]" name="password" placeholder="Contraseña"  maxlength="40"  autocomplete="new-password">
                          
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id='btn_ingresar' onclick="clearMem();" >
                        <span class="glyphicon glyphicon-ok" aria-hidden="true"></span> Ingresar
                    </button>
                    <button type="button" class="btn btn-danger" id='btn_cerrar' onclick="closeLogin();">
                        <span class="glyphicon glyphicon-remove" aria-hidden="true"></span> Cerrar
                    </button>
                </div>
            </div>
        </div>
    </div>