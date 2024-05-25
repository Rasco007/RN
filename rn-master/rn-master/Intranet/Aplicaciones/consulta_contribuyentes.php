<?php

    $p_n_id_menu = $_POST['p_n_id_menu'];
	$m_autoquery = $_POST['p_m_autoquery'];
	require_once(INTRANET."header.php");

	$lista_tipo_documentos = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');

	$p_id_contribuyente=$_POST['p_id_contribuyente'];
	$p_consulta=$_POST['p_consulta'];

	$tipo_documento = $_POST['tipo_documento'];
	$d_tipo_documento = $_POST['d_tipo_documento'];
	$documento = $_POST['documento'];
	$cuit = $_POST['cuit'];
	$tipo_persona = $_POST['tipo_persona'];
	$sexo = $_POST['sexo'];

	include('consulta_contribuyentes/html/principal.html');
?>

<link rel="stylesheet" type="text/css" href="consulta_contribuyentes/css/estilos.css">
<script type="text/javascript" src="consulta_contribuyentes/js/funciones.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="consulta_contribuyentes/js/funciones_hist.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="consulta_contribuyentes/js/eventos.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="consulta_contribuyentes/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="consulta_contribuyentes/js/grillas_hist.js?no_cache=<?=date('dmy')?>"></script>

<script type="text/javascript">
	var v_lista_tipo_documentos = '<?=$lista_tipo_documentos?>';
	
    var n_id_menu = '<?=$p_n_id_menu?>';
    var p_consulta = '<?=$p_consulta?>';
	var v_tipo_persona;

	var anio = <?=date('Y')?>;
	var n_tab = 0;
	var ajax_autocomplete = null;

	var datos_actividades_cm_grid;
	var datos_jurisdicciones_grid;
	var datos_comercios_grid;
	var datos_actividades_idb_grid;
	var datos_uni_grid;
	var datos_responsables_trib_grid;
	var datos_obj_contrib_grid;

	var datos_cont_hist_grid;
	var datos_dom_hist_grid;
	var datos_tel_hist_grid;
	var datos_pf_hist_grid;
	var datos_pj_hist_grid;
	var datos_trib_hist_grid;
	var datos_act_hist_grid;
    var datos_reg_grid;
	var datos_reg_hist_grid;
    var datos_reg_historico_grid;
	var datos_est_hist_grid;
	var datos_unidades_hist_grid;

</script>

<?php
    require_once(INTRANET."footer.php");
?>