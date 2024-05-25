<?php
	require_once(INTRANET."header.php");

	checklogin();
	$m_autoquery = $_POST['p_m_autoquery'];
	$lista = fun_id_lista('TABLA DE PERFIL');
	$lista_perfil = fun_id_lista('LISTA DE PERFIL');
?>
<table id='main_grid' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>
<div id='main_grid_pager' class='scroll' style='text-align:center;'></div>
<script type="text/javascript">

	var v_id_perfil = 0;

	// definición de objeto de grillas
	var datos_main_grid = new GridParam({
		id_menu:<?=$_POST['p_n_id_menu']?>,
		n_grid:0,
		m_autoquery:'<?=$m_autoquery?>'});
		
	$(document).ready(function() {

		var n_tabla_tipo_perfil=912;
		
		/********** Definicion de Grilla 1 **********/
			$("#main_grid").jqGrid({
				colNames:datos_main_grid.colNames(),
					colModel:datos_main_grid.colModel(),
					pager: $('#main_grid_pager'),
					caption:"ABM Perfiles" ,
					postData:datos_main_grid.postData(),
					editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
			}).navGrid('#main_grid_pager',
				{add:true, edit:true, del:true}, //options 
				{
					recreateForm: true,
					beforeShowForm: defaultBeforeShowForm(function(formid) {			
						$('#n_tabla_tipo_perfil').val(n_tabla_tipo_perfil);
					}),
					onInitializeForm: defaultInitForm(function(formid) {
						
						// Definición de lupas
						$('#d_tipo_perfil',formid).lupa_generica({
							titulos:['Id_perfil','perfil'],
							grid:[{index:'c_dato',width:100,hidden:true},
									{index:'d_dato',width:150}],
							caption:'Lista de perfil',
							filtros:['null'],
							campos:{c_dato:'c_tipo_perfil',d_dato:'d_tipo_perfil'},
							keyNav:true
						});

						$('#d_tipo_autorizacion',formid).lupa_generica({
							titulos:['Cod.','Tipo de Autorizaci&oacute;n'],
							grid:[{index:'c_codigo',width:100},
								{index:'d_descrip',width:150}],
							caption:'Lista de Tipos de Autorizacion',
							sortname:'d_descrip',
							sortorder:'asc',
							filtros:['null'],
							campos:{d_descrip:'d_tipo_autorizacion',c_codigo:'c_tipo_autorizacion'},
							keyNav:true,
							foco:"#d_tipo_autorizacion"
						});								
					}),				
					width:680
			}, // edit options 
			{recreateForm: true,
				
				beforeShowForm: defaultBeforeShowForm(function(formid) {			
					$('#n_tabla_tipo_perfil').val(n_tabla_tipo_perfil);
				}),
				width:680,
				onInitializeForm: defaultInitForm(function(formid) {
					
					// Definición de lupas
					$('#d_tipo_perfil',formid).lupa_generica({
						titulos:['Id_perfil','perfil'],
						grid:[{index:'c_dato',width:100,hidden:true},
							{index:'d_dato',width:150}],
						caption:'Lista de perfil',
						filtros:['null'],
						campos:{c_dato:'c_tipo_perfil',d_dato:'d_tipo_perfil'},
						keyNav:true,				
					});

					$('#d_tipo_autorizacion',formid).lupa_generica({
						titulos:['Cod.','Tipo de Autorizaci&oacute;n'],
						grid:[{index:'c_codigo',width:100},
							{index:'d_descrip',width:150}],
						caption:'Lista de Tipos de Autorizacion',
						sortname:'d_descrip',
						sortorder:'asc',
						filtros:['null'],
						campos:{d_descrip:'d_tipo_autorizacion',c_codigo:'c_tipo_autorizacion'},
						keyNav:true,
						foco:"#d_tipo_autorizacion"
					});								
			   }),
			   closeAfterAdd:true
					
			}, // add options 
			{}, // del options 
			{} // search options 
		);
		alto_grilla_dinamico();
	});

</script>

<?php
	require_once(INTRANET."footer.php");
?>
