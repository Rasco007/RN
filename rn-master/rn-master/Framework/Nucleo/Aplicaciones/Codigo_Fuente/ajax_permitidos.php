<?php
	require_once(INTRANET."header.php");

	checklogin();
	$m_autoquery = $_POST['p_m_autoquery'];
?>

<table id='main_grid' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>
<div id='main_grid_pager' class='scroll' style='text-align:center;'></div>
<br/>
<div id='div_busqueda_sub'></div>
<table id='detail_grid' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>
<div id='detail_grid_pager' class='scroll' style='text-align: center;'></div>

<script type="text/javascript">

    // Definicion de objeto de grillas
	var datos_main_grid = new GridParam({
		id_menu:<?=$_POST['p_n_id_menu']?>,
		n_grid:0,
		m_autoquery:'<?=$m_autoquery?>'});

	var datos_detail_grid = new GridParam({
		id_menu:<?=$_POST['p_n_id_menu']?>,
		n_grid:1,		
		n_orden:0,								
		m_autoquery:'N'});

	$(document).ready(function() {
		/********** Definicion de Grilla 1 **********/
		$("#main_grid").jqGrid({
			colNames:datos_main_grid.colNames(),
			colModel:datos_main_grid.colModel(),
			pager: $('#main_grid_pager'),
			caption:"Men&uacute;s:",
			postData:datos_main_grid.postData(),
			editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
			onSelectRow: function(id) {
				var n_id_menu_main = $('#main_grid').getCell(id,'ID_MENU');
				setea_parametros('#detail_grid',{'n_id_menu':n_id_menu_main});
			}
		}).navGrid('#main_grid_pager',
			{add:false, edit:false, del:false}, //options
			{}, // edit options
			{}, // add options
			{}, // del options
			{} // search options
		);

		/********** Definicion de Grilla 2 **********/
		$("#detail_grid").jqGrid({
			colNames:datos_detail_grid.colNames(),
			colModel:datos_detail_grid.colModel(),
			pager: $('#detail_grid_pager'),
			caption:"Ajax permitidos:",
			postData:datos_detail_grid.postData(),
		}).navGrid('#detail_grid_pager',
			{add:true, edit:true, del:true}, //options
			{
				beforeInitData: function (formid){
					if(!$("#main_grid").getGridParam('selrow')){
						mostrar_error('Debe seleccionar un menú previamente');
						return false;
					}
				},
				onInitializeForm: defaultInitForm(function(formid) {
				
				}),
				closeAfterAdd:true

			}, // edit options 
			{
			   beforeInitData: function (formid){
					if(!$("#main_grid").getGridParam('selrow')){
						mostrar_error('Debe seleccionar una filtro previamente');
						return false;
					}
				},
				beforeShowForm: defaultBeforeShowForm(function(formid) {
					var id = $('#main_grid').getGridParam('selrow');
					var n_id_menu = $('#main_grid').getCell(id,'ID_MENU');
					$('#id_menu_permitido',formid).val(n_id_menu);
				}),
				 onclickSubmit: function () { // Para evitar fallos en filas sin refresh	
					var id = $("#main_grid").getGridParam('selrow');
					var n_id_filtro = $('#main_grid').getCell(id,'n_id_filtro');
					ret = $(this).getGridParam('postData');
					ret.n_id_filtro = n_id_filtro;
					return ret;
				},
				closeAfterAdd:true
		
			}, // add options 
			{}, // del options 
			{} // search options 
		);
	});

</script>

<?php
	require_once(INTRANET."footer.php");
?>
