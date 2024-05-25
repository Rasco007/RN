<?php
    $p_n_id_menu = $_POST['p_n_id_menu'];
	$m_autoquery = $_POST['p_m_autoquery'];
	require_once(INTRANET."header.php");

	$lista_tipo_documentos = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');
	$lista_tipo_domicilios = fun_id_lista('LISTADO DE TIPOS DE DOMICILIO');
	$lista_categorias = fun_id_lista('LISTADO DE CATEGORIAS');
	$lista_sistema = fun_id_lista('LISTADO DE SISTEMAS');
	$lista_nacionalidad = fun_id_lista('LISTADO DE NACIONALIDADES');
	$lista_estado_civil = fun_id_lista('LISTADO DE ESTADOS CIVILES');
	$lista_empresa = fun_id_lista('LISTADO DE TIPOS DE EMPRESA');
	$lista_forma_jurica = fun_id_lista('LISTADO DE FORMAS JURIDICAS');
	$lista_datos_comp = fun_id_lista('LISTADO DE DATOS COMPLEMENTARIOS');

	$p_modo=$_POST['p_modo'];
	$p_id_contribuyente=$_POST['p_id_contribuyente'];
	// VERIFICAR USO
	$p_objeto_viejo=$_POST['p_objeto_viejo'];
	$p_permite_vs_ag=$_POST['p_permite_vs_ag'];
	// viene de abm contribuyente sin tributo
	$p_sintributo=$_POST['p_sintributo'];
	// viene de Modificación de Datos Generales
	$p_datos_generales = $_POST['p_datos_generales'];
	if(!isset($p_datos_generales)){
		$p_datos_generales = 'N';
	}
	$p_modif_deno = $_POST['p_modif_deno'];
	// viene de Modificación de Domicilio y Teléfonos
	$p_domicilio_telefono = $_POST['p_domicilio_telefono'];
	if(!isset($p_domicilio_telefono)){
		$p_domicilio_telefono = 'N';
	}
	$p_consulta = $_POST['p_consulta'];

	$tipo_documento = $_POST['tipo_documento'];
	$d_tipo_documento = $_POST['d_tipo_documento'];
	$documento = $_POST['documento'];
	$cuit = $_POST['cuit'];
	$tipo_persona = $_POST['tipo_persona'];
	$sexo = $_POST['sexo'];

	$fecha_hoy = date('d/m/Y');

	include('contribuyentes/html/principal.html');
	include('contribuyentes/html/modal_modif_deno.html');
?>

<link rel="stylesheet" type="text/css" href="contribuyentes/css/estilos.css">
<script type="text/javascript" src="contribuyentes/js/funciones.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="contribuyentes/js/eventos.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="contribuyentes/js/grillas.js?no_cache=<?=date('dmy')?>"></script>

<script type="text/javascript">
	var v_lista_tipo_documentos = '<?=$lista_tipo_documentos?>';
	var v_lista_tipo_domicilios = '<?=$lista_tipo_domicilios?>';
	var v_lista_categorias = '<?=$lista_categorias?>';
	var v_lista_sistema = '<?=$lista_sistema?>';
	var v_lista_empresa = '<?=$lista_empresa?>';
	var v_lista_forma_jurica = '<?=$lista_forma_jurica?>';
	var v_lista_nacionalidad = '<?=$lista_nacionalidad?>';
	var v_lista_estado_civil = '<?=$lista_estado_civil?>';
	var v_lista_datos_comp = '<?=$lista_datos_comp?>';

	var v_p_modo = '<?=$p_modo?>';
    var n_id_menu = '<?=$p_n_id_menu?>';
    // para evitar duplicar parametrizacion de grillas/prcs
    if(n_id_menu != 10865){
    	var n_id_menu_sec = '<?=$p_n_id_menu?>';
    	n_id_menu = 10865;
    }
    var p_objeto_viejo = '<?=$p_objeto_viejo?>';
    var p_sintributo = '<?=$p_sintributo?>';
    var p_permite_vs_ag = '<?=$p_permite_vs_ag?>';
    var p_datos_generales = '<?=$p_datos_generales?>';
    var p_modif_deno = '<?=$p_modif_deno?>';
    var p_domicilio_telefono = '<?=$p_domicilio_telefono?>';
    var p_consulta = '<?=$p_consulta?>';
    var p_tipo_persona = '<?=$tipo_persona?>';
	var p_sexo = '<?=$sexo?>';
	var v_tipo_persona;
	var v_es_nuevo = false;
	var m_tmp = 'N';
	var m_abm;
	if(p_datos_generales == 'N' && p_domicilio_telefono == 'N'){
		m_abm = 'S';
	}else{
		m_abm = 'N';
	}

	var anio = <?=date('Y')?>;
	var fecha_hoy = '<?=$fecha_hoy?>';
	var n_tab = 0;
	var ajax_autocomplete = null;

	var v_cuit;
	var v_documento;
	var v_tipo_documento;

	var datos_actividades_cm_grid;
	var datos_jurisdicciones_grid;
	var datos_comercios_grid;
	var datos_actividades_idb_grid;
	var datos_uni_grid;
	var datos_responsables_trib_grid;

</script>

<?php
    require_once(INTRANET."footer.php");
?>