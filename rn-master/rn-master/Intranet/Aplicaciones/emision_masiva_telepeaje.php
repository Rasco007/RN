<?php
	require_once(INTRANET . "header.php");

	$m_autoquery = $_POST['p_m_autoquery'];
	$p_id_menu = $_POST['p_n_id_menu'];

	$query = "select t.c_tributo,t.c_tipo_imponible,t.d_descrip,tc.d_concepto from tributos t,tributos_conceptos tc
	where t.c_tributo = 170
	and t.c_tributo = tc.c_tributo
	and tc.m_inscr_contrib = 'S'";

	$db_query ->setQuery($query);
	$param = array();
	$tributo = $db_query->do_query($param);

	#HTML PRINCIPAL
	include('emision_masiva_telepeaje/html/principal.html');
?>

<script type='text/javascript' src='emision_masiva_telepeaje/js/eventos.js'></script>
<script type='text/javascript' src='emision_masiva_telepeaje/js/funciones.js'></script>

<script>
	//VARIABLES GLOBALES
	var v_id_menu = '<?=$p_id_menu?>';
	var v_m_autoquery = '<?=$m_autoquery?>';
	
	var datos_grid_errores = new GridParam({
		id_menu: v_id_menu,
		n_grid:0,
		m_autoquery:v_m_autoquery,
		param:{':n_posicion_fiscal':null,':n_cuota':null}
	});

	$(document).ready(function() {
		$("#grid_errores").jqGrid({
			colNames: datos_grid_errores.colNames(),
			colModel: datos_grid_errores.colModel(),
			pager: $('#grid_errores_pager'),
			postData: datos_grid_errores.postData(),
			editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
			sortname:'d_objeto_hecho',
			sortorder:'asc',
			autowidth:false
		}).navGrid('#grid_errores_pager', {refresh:true});
	
		inicializarEventos();
	});
</script>

<?php
	require_once(INTRANET."footer.php");
?>