<?php
	require_once(INTRANET."header.php");

	checklogin();
	$m_autoquery = $_POST['p_m_autoquery'];
?>

<table id='main_grid' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>
<div id='main_grid_pager' class='scroll' style='text-align:center;'></div>

<script type="text/javascript">

	// Definicion de objeto de grillas
	var datos_main_grid = new GridParam({
		id_menu:<?=$_POST['p_n_id_menu']?>,
		n_grid:0,
		m_autoquery:'<?=$m_autoquery?>'});

	$(document).ready(function() {

		/********** Definicion de Grilla 1 **********/
		$("#main_grid").jqGrid({
			colNames:datos_main_grid.colNames(),
			colModel:datos_main_grid.colModel(),
			pager: $('#main_grid_pager'),
			caption:"Listas:" ,
			postData:datos_main_grid.postData(),
			editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
		}).navGrid('#main_grid_pager',
			{add:true, edit:true, del:true},
			{width:880,
			height:340},//edit,
			{width:880,
			closeAfterAdd:true},//alta,
			{},//del
			{}//search
		);
		alto_grilla_dinamico();
	});
</script>

<?php
	require_once(INTRANET."footer.php");
?>
