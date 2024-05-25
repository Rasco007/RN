<?php

/*
error_reporting(E_ALL);
ini_set('display_errors', '1');*/
session_start();
$_SESSION['scf'] = true;

require_once SCF_FRAMEWORK . 'handShake.php';

// SIMPLE-CAPTCHA
include(RECURSOS_FRAMEWORK_DIR_PROY."simple-php-captcha/simple-php-captcha.php");
$_SESSION['captcha'] = simple_php_captcha( array(
    'characters' => 'abcdefghjkmnprstuvwxyz123456789'
));

?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta content="text/html; charset=UTF-8; X-Content-Type-Options=sniff" http-equiv="Content-Type" />
    <title><?=$titulo?></title>
    <link rel="icon" type="image/x-icon" href="<?= IMAGENES_FRAMEWORK_PROY ?>favicon.ico">
    <script type="text/javascript">
        var FUNCIONES_FRAMEWORK = '<?=FUNCIONES_FRAMEWORK?>';
        var IMAGENES_FRAMEWORK = '<?=IMAGENES_FRAMEWORK_PROY?>';
        var FUNCIONES_BASEPATH = '<?=FUNCIONES_BASEPATH?>';
        var FUNCIONES_X_AMB_BASEPATH = '<?=SCF_GENERICOS?>';
        var JS_FRAMEWORK = '<?=JS_FRAMEWORK?>';
        var FUNCIONES_BASEPATH_PROY = '<?=FUNCIONES_BASEPATH_PROY?>';
        var JS_FRAMEWORK_PROY = '<?=JS_FRAMEWORK_PROY?>';
        var RECURSOS_FRAMEWORK_PROY = '<?=RECURSOS_FRAMEWORK_PROY?>';
    </script>
    <?php
        include(FRAMEWORK_DIR . 'links.php');
        include(SCF . 'links.php');
    ?>

    <script language="javascript">
        $(document).ready(function () {
            <?php if($token_error->code != 'OK'){ ?>
            mostrar_cuadro('E', '', 'No se ha podido establecer conexi&oacuten con el WebService de Autenticaci&oacuten. Token no obtenido. Error: ' + '<?= $token_error->msg?>', '', '', 420);
            <?php } ?>

        });
    </script>
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
<h1><?=$titulo?></h1>
<!-- END HEADER -->
<!-- BEGIN HEADER & CONTENT DIVIDER -->
<!--<div class="clearfix"></div>-->
<!-- END HEADER & CONTENT DIVIDER -->
<!-- BEGIN CONTAINER -->
        <!-- BEGIN CONTENT BODY -->
        <div class="container">
            <div class="clearfix"></div>
            <div id='popup_jasper'></div>
            <div class="row" id="main">

