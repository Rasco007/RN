<?php
	require_once(INTRANET."header.php");
	$m_autoquery = $_POST['p_m_autoquery'];
?>
<style>
#jqgh_main_grid_chk_tabla_generar{
	text-align: center;
}

.chcks_sel_tablas{
	height: 11px;
}
</style>
<table id='main_grid' class='scroll' cellpadding='0' cellspacing='0'>
	<tr>
		<td>&nbsp;</td>
	</tr>
</table>
<div id='main_grid_pager' class='scroll' style='text-align:center;'></div>
<div class='row' style='margin-top:20px;'>
	<div  class='col-md-offset-4 col-md-2 text-right'>
		<label for="m_recrear">Recrear</label>
		<select id="m_recrear" class="form-control-sm">
		  <option value='N' selected>No</option>
		  <option value='S'>Si</option>
		</select>
	</div>
	<div  class='col-md-2'>
		<button id="btn_generar_hist" class="btn-sm btn-primary" type="button">
			Generar Hist&oacute;rico
		</button>
	</div>
</div>
<script type="text/javascript">

	// definición de objeto de grillas
	var datos_main_grid = new GridParam({
		id_menu:<?=$_POST['p_n_id_menu']?>,
		n_grid:0,
		m_autoquery:'<?=$m_autoquery?>'
	});

	$(document).ready(function() {
		/**************************************************definición de grilla 1**********************************************/
		$("#main_grid").jqGrid({
			colNames:datos_main_grid.colNames(),
			colModel:datos_main_grid.colModel(),
			pager: $('#main_grid_pager'),
			caption:"Tablas" ,
			postData:datos_main_grid.postData(),
			editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
		}).navGrid(
			'#main_grid_pager',
			{add:true, edit:true, del:true}, //options
			{
			}, // edit options
			{
				recreateForm: true,
				beforeShowForm: defaultBeforeShowForm(function(formid) {
					$('#c_table_name').val();
				}),
				width:680,
				onInitializeForm: defaultInitForm(function(formid) {

					// Definición de lupas
					$('#c_table_name',formid).lupa_generica({
						titulos:['Nombre de Tabla'],
						grid:[{index:'c_codigo',width:450}],
						caption:'Lista de Tablas',
						filtros:['null'],
						campos:{c_codigo:'c_table_name'},
						keyNav:true,
					});

				}),
				closeAfterAdd:true
			}, // add options
			{}, // del options
			{} // search options
		);
		
		$('thead th #jqgh_main_grid_chk_tabla_generar').removeClass('ui-jqgrid-sortable');
		$("#btn_generar_hist").click(generarHistorico);
		alto_grilla_dinamico();
	});

	function generarHistorico(){
		var elem = 'input:checkbox:checked.tablas_a_generar';
		var cant_tablas = $(elem).length;
		var p_m_recrear = $('#m_recrear').val();
		
		if(cant_tablas > 0){
			$('#main').procOverlay({visible:true});
			$.when.apply($, $(elem).map(function() {
			   return $.ajax({
					type:'POST',
					url: FUNCIONES_BASEPATH+'maestro_abm.php',
					data:{
						"p_tabla":this.value,
						"p_recrear":p_m_recrear,
						"id_menu":10756,
						"n_orden":0
					},
					dataType:'json'
				});
			})).always(function() {
				$('#main_grid').trigger('reloadGrid');
				$('#chck_todas_tablas:checkbox').prop('checked', false);
				$('#main').procOverlay({visible:false});
				mostrar_cuadro('I','Aviso','Se ha ejecutado el proceso de generaci&oacute;n de hist&oacute;ricos. Verifique el campo error de las tablas seleccionadas.');
			});
			
		}else{
			mostrar_error('Debe seleccionar un registro.');
		}
					
	}
	
	function seleccionGenerarTodas(chck_val){
		$('.tablas_a_generar:checkbox').prop('checked', chck_val);
	}
</script>

<?php
	require_once(INTRANET."footer.php");
?>
