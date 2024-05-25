<?php
	require_once(EXTRANET."header.php");
    $p_n_id_menu = $_POST['p_n_id_menu'];
	$m_autoquery = $_POST['p_m_autoquery'];

	$lista_tipo_documentos = fun_id_lista('LISTADO DE TIPOS DE DOCUMENTO');

	$p_consulta = 'S';
	$p_id_contribuyente= $_SESSION['id_rel_persona'];

	$query = "SELECT fun_formato_cuit(n_cuit) as n_cuit, d_denominacion, c.c_tipo_documento,
	            (select d_dato from tablas_generales where n_tabla=1 and c_dato = c.c_tipo_documento) d_tipo_documento, fun_formato_numerico(c.n_documento,0) n_documento
	    from contribuyentes c
	    where id_contribuyente = :id_contribuyente";

	$db_query ->setQuery($query);
	$param = array(':id_contribuyente' => $p_id_contribuyente);
	$row_query = $db_query->do_query($param);
	$d_denominacion = $row_query[0]['D_DENOMINACION'];
	$n_cuit = $row_query[0]['N_CUIT'];
	$c_tipo_documento = $row_query[0]['C_TIPO_DOCUMENTO'];
	$d_tipo_documento = $row_query[0]['D_TIPO_DOCUMENTO'];
	$n_documento = $row_query[0]['N_DOCUMENTO'];


	include('consulta_contribuyentes/html/principal.html');
?>

<link rel="stylesheet" type="text/css" href="consulta_contribuyentes/css/estilos.css">
<script type="text/javascript" src="consulta_contribuyentes/js/funciones.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="consulta_contribuyentes/js/funciones_hist.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="consulta_contribuyentes/js/eventos.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="consulta_contribuyentes/js/grillas.js?no_cache=<?=date('dmy')?>"></script>
<script type="text/javascript" src="consulta_contribuyentes/js/grillas_hist.js?no_cache=<?=date('dmy')?>"></script>

<script type="text/javascript">
	var id_contribuyente = '<?=$p_id_contribuyente?>';
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
	var datos_reg_hist_grid;
	var datos_est_hist_grid;
	var datos_unidades_hist_grid;

</script>

<?php
    require_once(EXTRANET."footer.php");
?>