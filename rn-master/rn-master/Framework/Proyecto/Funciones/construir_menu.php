<?php

// ARMO EL MENU
$query="SELECT s.* FROM 
						(SELECT distinct me.id_menu id_menu,
								fun_menu_ruta(me.id_menu, up.id_perfil) as orden_php,
								me.d_titulo,
								me.d_parametros,
								me.c_tipo_menu,
								pac_seguridad.fun_url_menu(me.id_menu) d_url,
								me.m_framework, 
								me.d_icono,
								me.c_grupo_menu,
								pa.d_variable url_siat
							FROM menu me, usuarios_perfiles up, menu_perfiles mp, perfiles p,parametros pa
							WHERE me.id_menu = mp.id_menu
							AND mp.id_perfil = up.id_perfil
							AND up.c_usuario = upper(:p_usuario)
							AND me.m_visible = 'S'
							AND p.id_perfil = mp.id_perfil
							AND(
								(p.c_tipo_perfil = 'INT' and :p_entorno = 'INTRANET')
								OR
								(p.c_tipo_perfil = 'EXT' and :p_entorno = 'EXTRANET')
							) 
							AND pa.c_constante = 'URL_SIAT') s
							WHERE orden_php <> 'NOT_VALID_MENU'";

$query.= " ORDER BY orden_php, id_menu";

$nivel=0;

$db_query = new DB_Query($query);

$param = array(':p_usuario' => $_SESSION['usuario'], ':p_entorno' =>$_SESSION['entorno'] );

$row = $db_query->do_query($param);

//if($_SESSION['entorno']=='EXTRANET'){


$menu="<div class=\"page-sidebar-wrapper\">
            <div class=\"page-sidebar navbar-collapse collapse\">
                <ul class=\"page-sidebar-menu  page-header-fixed page-sidebar-menu-closed\" data-keep-expanded=\"false\" data-auto-scroll=\"true\" data-slide-speed=\"200\" style=\"padding-top: 20px; ".$menu_visible."\">";

$menu .= "<li class=\"sidebar-toggler-wrapper hide\">
                                <div class=\"sidebar-toggler\">
                                    <span></span>
                                </div>
                            </li>";

$search_menu .= "<li class=\"sidebar-search-wrapper\">
                <form class=\"sidebar-search  \" action=\"page_general_search_3.html\" method=\"POST\">
                    <a href=\"javascript:;\" class=\"remove\">
                        <i class=\"icon-close\"></i>
                    </a>
                    <div class=\"input-group\">
                        <input type=\"text\" class=\"form-control\" placeholder=\"Search...\">
                        <span class=\"input-group-btn\">
                            <a href=\"javascript:;\" class=\"btn submit\">
                                <i class=\"icon-magnifier\"></i>
                            </a>
                        </span>
                    </div>
                </form>
            </li>";

/* inicio gustavo´s way */
$raiz = 0;
foreach($row as $r){

    if ($nivel < substr_count($r['ORDEN_PHP'], '_')){
        $menu.="<ul class=\"sub-menu\">";
    }
    elseif($nivel > substr_count($r['ORDEN_PHP'], '_')){
        for ($j=$nivel;$j>substr_count($r['ORDEN_PHP'], '_');$j--) {
            $menu.="</ul></li>";
            $raiz = $raiz - 1;
        }
    }

    if ($r['C_TIPO_MENU']=="ITEM") {

        $param_menu = array();
        if($r['D_PARAMETROS']){
            foreach(explode('&',$r['D_PARAMETROS']) as $value) {
                $param = explode('=',$value);
                $param_menu[$param[0]] = $param[1];
            }
        }
        $param_menu['ruta'] = $json_ruta;

        if($r['M_FRAMEWORK'] == 'N'){
            $v_entorno = BASEPATH_ENTORNO;
        }else{
            $v_entorno = FRAMEWORK_BASEPATH;
        }
        
        if ($r['C_GRUPO_MENU'] == 'SIA'){
            $url = $r['URL_SIAT'].$r['D_URL'].$_SESSION['token'];
        } else {
            $url = $v_entorno.'Aplicaciones/'.$r['D_URL'];
        }

       

        $menu.='<li id="id_li_'.$r['ID_MENU'].'" class="nav-item">
                    <a href="javascript:newMenu('.$r['ID_MENU'].')" data-id-menu="'.$r['ID_MENU'].'" ';

        $menu.= 'class="nav-link" data-url="'.$url.'" data-param="'.str_replace('"','&quot;',json_encode($param_menu)).'"';

    }
    else{
        $menu.='<li id="id_li_'.$r['ID_MENU'].'" class="nav-item" rel="'.$raiz.'">
                    <a href="javascript:void(0)" data-id-menu="'.$r['ID_MENU'].'" class="nav-link nav-toggle" ';
    }

    if (strpos($r['D_TITULO'],"<div") === false) {
        $arrow = '';

        $icon = ($r['D_ICONO'] != '')? '<span class="glyphicon frmwk-icon '.$r['D_ICONO'].'"></span>' : '';
		if($r['C_TIPO_MENU']=="MENU"){
		    if($raiz == 0){
                $icon = ($r['D_ICONO'] != '')? '<span class="glyphicon frmwk-icon '.$r['D_ICONO'].'"></span>' : '<span class="glyphicon glyphicon-folder-open"></span>';
            }
            $arrow = '<span class="arrow"></span>';
        }

        $menu.='>'.$icon.'<span class="title">'.$r['D_TITULO'].'</span>'.$arrow.'</a>';
    } else {
        $menu.='>'.str_replace("<div","</a><div",$r['D_TITULO']);
    }
    if ($r['C_TIPO_MENU']=="ITEM") {
        $menu.="</li>";
        $raiz = $raiz - 1;
    }
    $nivel = substr_count($r['ORDEN_PHP'], '_');
    $raiz++;
}

for ($j=$nivel;$j>1;$j--) {
    $menu.="</ul></li>";
}

$menu .= "</ul></div></div>";

/* fin gustavo´s way */
/*}
else{
    $menu="<ul style='".$menu_visible."' id='nav' class='ruta'>";

    for($i=0;$i < count($row); $i++) {
        $n_id_menu = $row[$i]['ID_MENU'];
        $orden_php = $row[$i]['ORDEN_PHP'];
        $d_titulo_menu = $row[$i]['D_TITULO'];
        $d_parametros = $row[$i]['D_PARAMETROS'];
        $c_tipo = $row[$i]['C_TIPO_MENU'];
        $d_url_menu = $row[$i]['D_URL'];
        $v_framework = $row[$i]['M_FRAMEWORK'];


        if ($nivel < substr_count($orden_php, '_')) {
            $menu.="<ul id='nav_sub' class='sub'>";
        }elseif ($nivel > substr_count($orden_php, '_')) {
            for ($j=$nivel;$j>substr_count($orden_php, '_');$j--) {
                $menu.="</ul></li>";
            }
        }
        if($c_tipo=="MENU"){
            $class_menu = ' menu-menu ';
            $flecha = '<div class="flecha"></div>';
        }else{
            $class_menu = ' item ';
            $flecha = '';
        }
        $menu.='<li id="id_li_'.$n_id_menu.'" class="'.$class_menu.'"><a href="javascript:void(0)" data-id-menu="'.$n_id_menu.'" ';
        if ($c_tipo=="ITEM") {

            // Separo los par�metros y armo un objeto
            $param_menu = array();
            if($d_parametros){
                foreach(explode('&',$d_parametros) as $value) {
                    $param = explode('=',$value);
                    $param_menu[$param[0]] = $param[1];
                }
            }
            $param_menu['ruta'] = $json_ruta;

            if($v_framework == 'N'){
                $v_entorno = BASEPATH_ENTORNO;
            }else{
                $v_entorno = FRAMEWORK_BASEPATH;
            }

            $menu.= 'class="menu-item" data-url="'.$v_entorno.'Aplicaciones/'.$d_url_menu.'" data-param="'.str_replace('"','&quot;',json_encode($param_menu)).'"';

        }
        if (strpos($d_titulo,"<div") === false) {
            $menu.='>'.$d_titulo_menu.$flecha.'</a>';
        } else {
            $menu.='>'.str_replace("<div","</a><div",$d_titulo_menu);
        }
        if ($c_tipo=="ITEM") {
            $menu.="</li>";
        }
        $nivel = substr_count($orden_php, '_');
    }

    for ($j=$nivel;$j>1;$j--) {
        $menu.="</ul></li>";
    }
    $menu.="</ul>";
}*/
