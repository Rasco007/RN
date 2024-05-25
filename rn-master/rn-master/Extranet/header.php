<?php

if ($_SESSION['entorno'] == 'INTRANET')
    $id_menu_principal = buscar_parametro('ID_MENU_PRINCIPAL');
else
    $id_menu_principal = buscar_parametro('ID_MENU_PRINCIPAL_EXT');


if($_POST['p_n_id_menu']) {
    $id_menu = $_POST['p_n_id_menu'];
}
else{
    $id_menu = $id_menu_principal;
}

$id_menu_ajax = $id_menu;

$query = "SELECT D_TITULO, D_URL, D_ARCH_MANUAL,M_FRAMEWORK
          FROM MENU
          WHERE ID_MENU = :p_id_menu";
$db_query = new DB_Query($query);
$var = array(':p_id_menu' => $id_menu);
$row = $db_query->do_query($var);
$d_titulo = $row[0]['D_TITULO'];
$d_url = $row[0]['D_URL'];
$d_arch_manual = $row[0]['D_ARCH_MANUAL'];
$m_framework=$row[0]['M_FRAMEWORK'];

if ($m_framework == 'S'){
    $entorno = APP_FMK_BASEPATH;
}else{
    $entorno = APLICACIONES_BASEPATH;
}


$db_query->setQuery("select nvl(d_denominacion,c_usuario) as d_denominacion 
					from usuarios
					where upper(c_usuario) = upper(:usuario)");


$var = array(':usuario' => $_SESSION['usuario']);
$row = $db_query->do_query($var);
$usuario = $row[0]['D_DENOMINACION'];
// Armar la ruta para los menúes

$parametros = array();
// Genero los parámetros
foreach($_POST as $variable => $valor)
{
    if($variable != 'p_n_id_menu') { // Para que no duplique el id_menu
        $parametros[$variable] = $valor;
    }
}

// Armo el objeto
$info->id_menu = $id_menu;
$info->titulo = isset($d_titulo_menu) ? $d_titulo_menu : $d_titulo;
$info->d_url = $d_url;
$info->parametros = json_encode($parametros);

// Concateno al $_POST['ruta']
if($id_menu == $id_menu_principal){
    $ruta = array();
}else{
    $ruta = json_decode($_POST['ruta']);
    $ruta_temp = array();
    while($id_menu != null || $id_menu != ''){
        $datos_menu = get_datos_menu( $id_menu );
        $id_menu = $datos_menu->id_menu;
        if($datos_menu->titulo != '')array_push($ruta_temp,$datos_menu);
    }
}

$json_ruta = json_encode($ruta);
for($i=(count($ruta_temp)-1); $i>=0; $i--){
    array_push($ruta,$ruta_temp[$i]);
}
array_push($ruta,$info);


$bt_menu = '';
$menu_visible = '';
$camino_migas = '';

if ($menu =='') {
    $menu = '';

    // Verificamos si se tocó el construir menú
    $filePath = FUNCIONES_FRAMEWORK.'construir_menu.php';
    $optFilePath = FUNCIONES_FRAMEWORK_PROY.'construir_menu.php';

    if (file_exists($optFilePath)){
        $filePath = $optFilePath;
    }

    if ($id_menu == $id_menu_principal) {
        include($filePath);
    } else {
        //$menu_visible = 'display:none';
        include($filePath);
        $bt_menu = '<div title="Men&uacute; Principal" id="bt_mostrar_menu_principal"></div>';

        if (!isset($_POST['usuario'])) {
            if (($ruta != '' || $ruta != null)) {

                // Armo la ruta
                $camino_migas = "<ul class=\"page-breadcrumb\" id='camino_migas'>";
                $camino_migas .= "<li><span><a href=" . BASEPATH_ENTORNO . "Aplicaciones/principal.php class='enlace'>Men&uacute; Principal</a></span><i class=\"fa fa-circle\"></i></li>";

                for ($i = 0; $i < count($ruta); $i++) {
                    $ruta[$i]->d_url = $ruta[$i]->d_url;
                    $clase_item_camino = ($ruta[$i]->parametros == 'null') ? '' : ' enlace';
                    if($i == (count($ruta)-1)) { //ultimo item
                        $camino_migas .= "<li><span><a href='javascript:void(0)' class='menu-item " . $clase_item_camino . "' data-url='" . $entorno . $ruta[$i]->d_url . "' data-id-menu='" . $ruta[$i]->id_menu . "' data-param='" . $ruta[$i]->parametros . "'>" .
                            $ruta[$i]->titulo . "</a></span></li>";
                    }
                    else{
                        $camino_migas .= "<li><span><a href='javascript:void(0)' class='menu-item " . $clase_item_camino . "' data-url='" . $entorno . $ruta[$i]->d_url . "' data-id-menu='" . $ruta[$i]->id_menu . "' data-param='" . $ruta[$i]->parametros . "'>" .
                            $ruta[$i]->titulo . "</a></span><i class=\"fa fa-circle\"></i></li>";
                    }

                }
                $camino_migas .= "</ul>";
            }

            // Pone el menú del manual
            $link_manual = '';
            if (isset($info->id_menu) && $info->id_menu != '' && $info->id_menu != null) {
                if ($d_arch_manual != '' && $d_arch_manual != null) {
                    $link_manual = "<a class='page-breadcrumb' target='_blank' href='".MANUALES_BASEPATH."$d_arch_manual' style='text-decoration:none;padding-left:10px;'>
										<span class='btn-success btn-sm'>Manual de Usuario <i class='glyphicon glyphicon-save-file'></i></span>
									</a>";
                }
            }
            $camino_migas .= $link_manual;
        }
        else {
            $menu = "<ul class=\"page-breadcrumb\" id='nav'><li><a href='' onclick=\"window.close();\">Cerrar</a></li></ul>";
        }
        $menu .= '</ul>';

        $param = array('id_menu' => $_POST['p_n_id_menu']);
        $q = new DB_Query("select pac_seguridad.fun_id_menu_real(:id_menu) as id_menu from dual");

        $row = $q->do_query($param);
        $_POST['p_n_id_menu'] = $row[0]['ID_MENU'];

    }
}

if($menu == ''){
    $menu = "<ul class=\"page-breadcrumb\" id='nav'><li><span><a href='javascript:void(0)' class='menu-item' onclick=\"window.close();\">Cerrar</a></span></li></ul>";
}

$parametros = null;
$db_query = new DB_Query("SELECT c_tecla, c_tecla_izquierda, c_tecla_derecha  FROM param_teclado");

$teclado = json_encode($db_query->do_query($parametros));

?>
<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!--><html lang="en"><!--<![endif]-->
<head>
<meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta content="text/html; charset=UTF-8; X-Content-Type-Options=sniff" http-equiv="Content-Type" />
    <title><?=$d_titulo?></title>
    <script type="text/javascript">
		var FUNCIONES_FRAMEWORK = '<?=FUNCIONES_FRAMEWORK?>';
        var IMAGENES_FRAMEWORK = '<?=IMAGENES_FRAMEWORK_PROY?>';
        var FUNCIONES_BASEPATH = '<?=FUNCIONES_BASEPATH?>';
        var FUNCIONES_X_AMB_BASEPATH = '<?=FUNCIONES_BASEPATH?>';
        var BASEPATH_ENTORNO = '<?=BASEPATH_ENTORNO?>';
        var JS_FRAMEWORK = '<?=JS_FRAMEWORK?>';
        var FUNCIONES_BASEPATH_PROY = '<?=FUNCIONES_BASEPATH_PROY?>';
        var JS_FRAMEWORK_PROY = '<?=JS_FRAMEWORK_PROY?>';
        var RECURSOS_FRAMEWORK_PROY = '<?=RECURSOS_FRAMEWORK_PROY?>';
    </script>
	<link rel="icon" type="image/x-icon" href="<?=IMAGENES_FRAMEWORK_PROY?>favicon.ico?>">
    <?php
	include(FRAMEWORK_DIR.'links.php');
    include(ENTORNO_DIR.'links.php');
    ?>
        <script language="javascript">

        var teclado = <?=$teclado?>;//obtener_teclado();
        var autoquery = '<?=$_POST['p_m_autoquery']?>';
        var ruta_menu = '<?=str_replace('\\','\\\\',json_encode($ruta))?>';
        var id_menu = <?=$id_menu_ajax?>;

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

        function volver() {
            window.location='principal.php';
        }

        function salir(){
            post_to_url('<?=BASEPATH_ENTORNO?>index.php', {'p_m_logout':'S'},'_self','POST');
        }

        $(window).on('load',function(){
            if(!($('html').hasClass('ie6'))){
                $('#modalBackground').css('display','none')
            }
        });

        $(document).ready(function(){

            $.ajaxSetup({headers: {'X-Id-Menu': id_menu}});
            $.ajaxSetup({headers: {'IdSession': '<?=$_SESSION['token']?>'}});

            $(window).on('load', function() {
                if(!($('html').hasClass('ie6'))) {
                    $('#modalBackground').css('display', 'none')
                }
            });

            $('.ruta a.menu-item').click(function() {
                var url = $(this).attr('data-url');
                $('<form id="menu_post" action="'+url+'" method="post"></form>').appendTo('body');
                var param = eval('('+$(this).attr('data-param')+')');
                $.each(param, function(key, value) {
                    $('<input type="hidden" name="'+key+'" />').appendTo('#menu_post').val(value);
                });
                var id_menu = $(this).attr('data-id-menu');
                $('<input type="hidden" name="p_n_id_menu" />').appendTo('#menu_post').val(id_menu);
                //$('<input type="hidden" name="IdSession" />').appendTo('#menu_post').val('<?=$_SESSION['token']?>');

                $('#menu_post').submit();

            });

        }); //fin del document
    </script>

</head>
<body class="page-header-fixed page-content-white page-sidebar-closed page-sidebar-closed-hide-logo">
<div class="page-wrapper">
    <!-- BEGIN HEADER -->
    <div class="page-header navbar navbar-fixed-top">
        <!-- BEGIN HEADER INNER -->
        <div class="page-header-inner ">
            <!-- BEGIN LOGO -->
            <div class="page-logo">                
                <a href="<?=APLICACIONES_BASEPATH?>principal.php">
                    <img src="<?=IMAGENES_FRAMEWORK_PROY?>logo.png" alt="logo" class="logo-default" />
				</a>
                <div class="menu-toggler sidebar-toggler">
                    <span></span>
                </div>
            </div>
            <!-- END LOGO -->
            <!-- BEGIN RESPONSIVE MENU TOGGLER -->
            <a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
                <span></span>
            </a>
            <!-- END RESPONSIVE MENU TOGGLER -->
            <!-- BEGIN TOP NAVIGATION MENU -->
            <div class="top-menu">
                <ul class="nav navbar-nav pull-right">
                    <!-- BEGIN USER LOGIN DROPDOWN -->
                    <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                    <li class="dropdown dropdown-user">
                        <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                            <span class="username username-hide-on-mobile"> <?=$usuario?> </span>
                           <!-- <i class="fa fa-angle-down"></i>-->
                        </a>
                        <!--ul class="dropdown-menu dropdown-menu-default">
                            <li>
                                <button type="button" data-toggle="modal" data-target="#claveModal" class="btn btn-primary" id="btn_cambiar_clave">Cambiar Clave</button>
                            </li>
                            <!--li class="divider"> </li>
                            <li>
                                <button type="button" class="btn btn-primary" id="btn_salir">Salir</button>
                            </li>
                            <li>
                                <a href="">
                                    <i class="icon-envelope-open"></i> Mensajes
                                    <span class="badge badge-danger"> 3 </span>
                                </a>
                            </li-->
                        <!--/ul>-->
                    </li>
                    <!-- END USER LOGIN DROPDOWN -->
                    <!-- BEGIN QUICK SIDEBAR TOGGLER -->
                    <!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
                    <li class="dropdown dropdown-quick-sidebar-toggler" title='Salir del Sistema'>
                        <a href="javascript:void(0);" onclick="salir();" class="dropdown-toggle">
                            <i class="icon-logout"></i>
                        </a>
                    </li>
                    <!-- END QUICK SIDEBAR TOGGLER -->
                </ul>
            </div>
            <!-- END TOP NAVIGATION MENU -->
        </div>
        <!-- END HEADER INNER -->
    </div>
    <!-- dialog bootstrap -->
        <?php //include(APLICACIONES_FRAMEWORK."cambio_clave/html/cambio_clave.html"); ?>
    <!-- fin dialog bootstrap -->

    <!-- END HEADER -->
    <!-- BEGIN HEADER & CONTENT DIVIDER -->
    <div class="clearfix"> </div>
    <!-- END HEADER & CONTENT DIVIDER -->
    <!-- BEGIN CONTAINER -->
    <div class="page-container">
        <?=$menu;?>
        <div class="page-content-wrapper">
            <!-- BEGIN CONTENT BODY -->
            <div class="page-content">
                <!-- BEGIN PAGE HEADER-->

                <!-- BEGIN PAGE BAR -->
                <div class="page-bar">
                    <?=$camino_migas?>
                </div>
                <!-- END PAGE BAR -->
                <!-- BEGIN PAGE TITLE-->
                <!--<h1 class="page-title"><?=$d_titulo?></h1>-->
                <!-- END PAGE TITLE-->
                <!-- END PAGE HEADER-->
                <div class="clearfix"></div>
                <!-- END DASHBOARD STATS 1-->
                <div id='popup_jasper'></div>
                <div class="row" id="main">
