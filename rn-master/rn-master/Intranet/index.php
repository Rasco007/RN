<?php

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
include(INTRANET.'links.php');

$jquery_panel = '';
// Fue invocado desde el Salir o viene de un error, por ejemplo, de tiemout?
if (isset($_POST['p_m_logout']) || isset($_GET['error']) || isset($_POST['p_m_cambio_clave'])) {

	$db_query = new DB_Query();

	if( (isset($_POST['p_m_logout']) || isset($_POST['p_m_cambio_clave']))
		and
		(isset($_SESSION['usuario']) and isset($_SESSION['clave_usuario']))){
		setLogout($db_query);
	}//guarda fecha de cierre de sesión
	
}else{
	if (isset($_SESSION['usuario'])&&!isset($_POST['aux_send_form'])) {
		header("Location: Aplicaciones/principal.php");
		exit;
	}
}

// Se liberan las variables de sistema
unset($_POST['p_m_logout']);
unset($_SESSION['usuario']);
unset($_SESSION['clave_usuario']);
unset($_SESSION['id_rel_persona']);
unset($_SESSION['verif_notificar']);
unset($_SESSION['logeado']);
unset($_SESSION['entorno_logeado']);
unset($_SESSION['token']);

$displayModal = "false";

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
							   case when nvl(f_caducidad_clave, sysdate) >= sysdate then 'NO' else 'SI' end as clave_caducada,
							   (select COUNT(*) AS EXISTE_USU_BD from all_users where upper(username) = upper(:c_usuario)) as EXISTE_USU_BD,
							   (select count(*) from usuarios_perfiles up,menu_perfiles mp where up.id_perfil = mp.id_perfil and up.c_usuario = upper(:c_usuario) and mp.id_menu = 0) as PERFIL_PRINCIPAL
						FROM usuarios u
						WHERE upper(c_usuario) = upper(:c_usuario)
							AND c_clave = pac_encripta.encripta_new(:c_password)
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

							if($row['PERFIL_PRINCIPAL'] > 0) {
								$_SESSION['entorno_logeado'] = 'INTRANET';
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
							$_SESSION['entorno'] = 'INTRANET';
							
							$displayModal = "true";

							//header("Location: ../Framework/Aplicaciones/cambiar_clave.php");
						}
					/*}*/
				}else{
					$jquery_panel = "bootbox.alert('El nombre de usuario o la contraseña introducidos no son correctos');"; // Nombre de Usuario o Contrasea Invalidos -----
					unset($_REQUEST['captcha']);
					unset($_REQUEST['log_user']);
					unset($_REQUEST['log_pass']);
				}
			}
		}
	}else{
		$jquery_panel = "bootbox.alert('Debe ingresar un Nombre de Usuario y Contraseña Validos.');"; // Usuario o Contrasea Incorrectas -----
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
}

ob_end_flush();

$parametros = null;
$db_query = new DB_Query("SELECT c_tecla, c_tecla_izquierda, c_tecla_derecha  FROM param_teclado");

$teclado = json_encode($db_query->do_query($parametros));

?>


<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="CONTENT-TYPE"  content="text/html;charset=utf-8"/>
	<title>Sistema TDI</title>
	<link rel="shortcut icon" href="../Framework/Proyecto/Imagenes/favicon.ico" />
	<script type="text/javascript" src="<?=RECURSOS_FRAMEWORK?>Aes/aes.class.js"></script>
    <link href="<?=CSS_INTRANET?>index.css" rel="stylesheet" type="text/css" />
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
<body>
<section class="login-block">
<div id = 'wrapper_1' class="container-fluid">
	<form action="index.php" method="post" name="search3" id="search3" style="display:none">
		<input name="log_user" type="hidden" id="log_user" />
		<input name="log_pass" type="hidden" id="log_pass" />
		<input name="aux_send_form" type="hidden" id="aux_send_form" value="aux_send_form"/>
		<input type="hidden" id="d_geolocalizacion" name="d_geolocalizacion" />
		<input type="hidden" id="d_ip_local" name="d_ip_local" />
		<input name="log_submit" type="submit" value="Ingresar" />
	</form>
	<div id = 'login_view' class="row">
	<div class="col-sm-12">
        <div id = "login_wrapper" class="auth-box card">
		<div class="card-block">		
			<div>
				<div class = "tdi_logo"></div>
				<h4 id = "title_intra"> Ingreso a <?=ucfirst(strtolower($entorno))?></h4>
			</div>
	        
				<form id="form_filtro"class="md-float-material form-material" onsubmit="return false">
				<div class="form-group form-primary">
					<p>
						<input id="log_user_aux" class = 'form-control bottom_border_only input_txt_class' placeholder="Usuario" name="log_user_aux" class="text validate[required]" maxlength="40" type="text" align="left">
					</p>
					</div>
					<div class="form-group form-primary">
					<p>
						<input id="log_pass_aux" class = "form-control bottom_border_only input_txt_class" placeholder="Contraseña" class="text validate[required]" maxlength="40" type="password" align="left" autocomplete="new-password"> <!-- onpaste="return false" oncopy="return false" -->
						<!--<a id="keypad" href="#">
							<img src="<?=IMAGENES_FRAMEWORK_PROY?>/iconos/keypad.png" width="20" height="20" title="Teclado Virtual">
						</a>-->
					</p>
					</div>
					<div id = 'btn_wrapper'>
						<button id="btn_ingresar" type="button" onclick="clearMem();" class="btn btn-primary btn-lg">
							<span class="ui-button-icon-space"></span>INGRESAR
						</button>
					</div>
				</form>
			</div>
			</div>
	</div>
</div>
</section>
<div style="clear:both"></div>
<!--<div style="text-align: center;">
	<label>Se recomienda utilizar <a style='color:red;' href="http://www.mozilla.org/es-AR/firefox/fx/">Firefox 12.0<a/>, <a style='color:red;' href="https://www.google.com/intl/es/chrome/browser/">Chrome 20.0<a/><br/></a><a style='color:red;'>o versiones superiores.</a></label>
	<br />
	<span style='color:red; font-size:125%'>Recuerde deshabilitar el bloqueo de ventanas emergentes en el menu de opciones de su navegador.</span>
	<br />
</div>-->

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
<script type="text/javascript" src="<?=JS_FRAMEWORK?>ip.js?no_cache=<?=date('dmy')?>"></script>

<script language="javascript" type="text/javascript">
	var _0x5fbf=["\x43\x6C\x61\x76\x65\x49\x50\x32\x30\x31\x37","\x65\x6E\x63\x72\x79\x70\x74"];function encriptIp(_0x4336x2){var _0x4336x3=_0x5fbf[0];var _0x4336x4=256;var _0x4336x5=AES[_0x5fbf[1]](_0x4336x2,_0x4336x3,_0x4336x4);return _0x4336x5}
	var _0x3975=["\x76\x61\x6C\x69\x64\x61\x74\x65","\x76\x61\x6C\x69\x64\x61\x74\x69\x6F\x6E\x45\x6E\x67\x69\x6E\x65","\x23\x6C\x6F\x67\x5F\x70\x61\x73\x73\x5F\x61\x75\x78","\x23\x6C\x6F\x67\x5F\x75\x73\x65\x72\x5F\x61\x75\x78","\x76\x61\x6C","\x43\x6C\x61\x76\x65\x41\x65\x73\x32\x30\x31\x35","\x65\x6E\x63\x72\x79\x70\x74","\x23\x6C\x6F\x67\x5F\x70\x61\x73\x73","\x23\x6C\x6F\x67\x5F\x75\x73\x65\x72","\x73\x75\x62\x6D\x69\x74","\x23\x73\x65\x61\x72\x63\x68\x33"];function passEncript(){var _0x25ddx2=$(_0x3975[2])[_0x3975[1]](_0x3975[0]);var _0x25ddx3=$(_0x3975[3])[_0x3975[1]](_0x3975[0]);if(!_0x25ddx2&& !_0x25ddx3){var _0x25ddx4=$(_0x3975[2])[_0x3975[4]]();var _0x25ddx5=_0x3975[5];var _0x25ddx6=256;var _0x25ddx7=AES[_0x3975[6]](_0x25ddx4,_0x25ddx5,_0x25ddx6);$(_0x3975[7])[_0x3975[4]](_0x25ddx7);$(_0x3975[2])[_0x3975[4]](null);$(_0x3975[8])[_0x3975[4]]($(_0x3975[3])[_0x3975[4]]());$(_0x3975[3])[_0x3975[4]](null);$(_0x3975[10])[_0x3975[9]]();};}

	
	function clearMem(){
		passEncript();
	}

	$('#log_pass_aux, #log_user_aux').keyup(function( e ){
		if(e.keyCode==13)passEncript();
	});

	$.keypad.setDefaults($.keypad.regionalOptions['es']); 
	$('#log_pass_aux').keypad({
                keypadOnly: false,                     
                layout: $.keypad.qwertyLayout,
                useThemeRoller: true,
                showAnim: 'slideDown',
                showOn:null
     });
	$('#keypad').click(function(){	
		if ( $('.keypad-popup').is(':visible') ){
			$('#log_pass_aux').keypad('hide');
		}else{
			$('#log_pass_aux').keypad('show');
		}
        
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

		getIPs(function (ip) {
			if( $('#d_ip_local').val() == '' ) $('#d_ip_local').val(encriptIp(ip));
		});

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
        }); //fin del document 



</script>

