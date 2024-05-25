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
		&&
		(isset($_SESSION['usuario']) and isset($_SESSION['clave_usuario']))){
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
	
	//redirigo a pagina de login AFIP
	header("Location: ".URL_AUTH_AFIP);

}

unset($_POST['p_m_logout']);
unset($_SESSION['usuario']);
unset($_SESSION['clave_usuario']);
unset($_SESSION['id_rel_persona']);
unset($_SESSION['verif_notificar']);
unset($_SESSION['logeado']);
unset($_SESSION['token']);
unset($_SESSION['sessionid']);

$displayModal = "false";

//*******************************		INGRESO POR USUARIO			*********************************************/
if(isset($_POST['token']) && isset($_POST['sign'])){

	if(isset($_POST['aux_send_form'])){
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
}elseif(ENTORNO == 'DESA' && isset($_GET['log_user'])){
	
	$db_query = new DB_Query();
	$query = "  SELECT id_rel_persona,
						c_clave
				FROM usuarios u
				WHERE upper(c_usuario) = upper(:c_usuario)
				AND f_baja is null
				";


	$param_user = array(
		':c_usuario' => $_GET['log_user']
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
			$_SESSION['usuario'] = strtoupper($_GET['log_user']);
			$_SESSION['clave_usuario'] = $row['C_CLAVE'];
			$_SESSION['entorno'] = $entorno;	
			
			insert_info_usuario($info, $db_query);//guarda datos usuario: navegador, ip, etc	
			
			$_SESSION['entorno_logeado'] = 'EXTRANET';
			$_SESSION['logeado'] = true;
			$_SESSION['token'] = bin2hex(openssl_random_pseudo_bytes(64));

			$minutes_to_add = 10;
			$fecha = new DateTime();
			$timestamp = $fecha->getTimestamp();
			$fecha_caduca = $fecha->add(new DateInterval('PT' . $minutes_to_add . 'M'));
			$timestamp_caduca = $fecha_caduca->getTimestamp();
		
			$_SESSION['sessionid'] = bin2hex(openssl_random_pseudo_bytes(64)).$timestamp;
			
			$param_prc = array(
				'p_c_usuario' => $_GET['log_user'],
				'p_c_usuario_oper' => $_GET['log_user'],
				'p_timestamp' => $timestamp,
				'p_timestamp_caduca' => $timestamp_caduca,
				'p_ticket_afip' => -1,
				'p_session_id' => $_SESSION['sessionid'],
				'p_cuits_rel' => $_GET['log_user'],
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
				
				$db_procedure->db_rollback();
				die($res);
			}
		
			
			header("Location: Aplicaciones/principal.php");
			
		}
	}


}else{
	//$jquery_panel = "bootbox.alert('Se ha producido un error al autenticar su conexión con AFIP. Por favor, ingrese nuevamente al sistema con clave AFIP.');";
	//redirigo a pagina de login AFIP
	header("Location: ".URL_AUTH_AFIP);
}

ob_end_flush();
?>

<style>
    nav {
        background-color: "#F0F0F0";
    }
</style>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
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
    <style>
        body {
            background-color: #FFFFFF;
        }
    </style>
</head>
<body>
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
				
<div class="container">
	<div class="card">
		<div class="card-header">
			<h4 class="card-title">Seleccione CUIT </h4>
		</div>
		<div class="card-body">
			<form action="index.php" method="post" name="search3" id="search3" style="display:none;">
				<input name="token" type="hidden" id="token" value="<?= $_POST['token']?>"/>
				<input name="sign" type="hidden" id="sign"  value="<?=$_POST['sign']?>"/>
				<input name="aux_send_form" type="hidden" id="aux_send_form" value="aux_send_form"/>
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
						<button id="btn_ingresar" type="button" onclick="clearMem();" class="btn btn-primary btn-md">
							<span class="ui-button-icon-space"></span>INGRESAR
						</button>
					</div>
			</form>
				
		</div>
	</div>
</div>
<footer>
</footer>
<!-- END SCF JS FILES -->
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

<script language="javascript" type="text/javascript">
	
	$(document).ready(function(){
		<?=$jquery_panel?>
		getLocation();
    }); //fin del document 


	
	function clearMem(){
		$('#n_cuit_opera').val($('#cuit_opera').val());
		$('#search3').submit(); 		
	}
	
</script>

