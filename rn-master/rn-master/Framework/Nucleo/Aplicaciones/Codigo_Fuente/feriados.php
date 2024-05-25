<?php
	$m_autoquery = $_POST['p_m_autoquery'];
	require_once(INTRANET."header.php");
?>
<table id='main_grid' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>
<div id='main_grid_pager' class='scroll' style='text-align:center;'></div>
<script type="text/javascript">

// definici�n de objeto de grillas
var datos_main_grid = new GridParam({id_menu:<?=$_POST['p_n_id_menu']?>,
										n_grid:0,
										m_autoquery:'<?=$m_autoquery?>'});
										

  	
$(document).ready(function() {
	/**************************************************Definición de Grilla Feriados******************************************************/
	$("#main_grid").jqGrid({
		colNames:datos_main_grid.colNames(),
		colModel:datos_main_grid.colModel(),
		pager: $('#main_grid_pager'),
		caption:"Feriados:" ,		
		postData:datos_main_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"			
	}).navGrid('#main_grid_pager',
		{add:true, edit:true, del:true}, //options 
		{	
		
					onInitializeForm: defaultInitForm(function(formid) {
					
					$( "#f_feriado" ).datepicker( "destroy" );
				// Definición de lupa de Departamento
				//c_provincia,c_departamento,d_descrip
		        	$('#d_departamento',formid).lupa_generica({
							titulos:['Cód. Provincia','Cód. Departamento','Departamento'],
							grid:[{index:'c_provincia',width:100,hidden:true},
									{index:'c_departamento',width:150},
									{index:'d_departamento',width:150}],
							caption:'Lista de Departamentos',
							sortname:'c_departamento',
							sortorder:'asc',
							filtros:['#c_provincia'],
							campos:{c_provincia:'c_provincia',c_departamento:'c_departamento',d_departamento:'d_departamento'},
							keyNav:true,
							onClose:function(){
								$('#c_localidad').val(null);
								$('#d_localidad').val(null);
							}
				
					});
					
					$('#c_departamento',formid).change(function(){
						lupa_cod('c_departamento','d_departamento','<?=fun_id_lista('LISTADO DE DEPARTAMENTOS')?>','','','');
					});		
					
					
				// Definición de lupa de Localidades
				//c_provincia,c_departamento,c_localidad,d_descrip,c_postal 
		        	$('#d_localidad',formid).lupa_generica({
							titulos:['Cód. Provincia','Cód. Departamento','Cód. Localidad','Localidad','Cód. Postal'],
							grid:[{index:'c_provincia',width:100,hidden:true},
									{index:'c_departamento',width:150,hidden:true},
									{index:'c_localidad',width:150},
									{index:'d_localidad',width:150},
									{index:'c_postal',width:150,hidden:true}],
							caption:'Lista de Localidades',
							sortname:'c_localidad',
							sortorder:'asc',
					
							filtros:['#c_provincia', '#c_departamento'], 
							campos:{c_provincia:'c_provincia',c_departamento:'c_departamento',c_localidad:'c_localidad',d_localidad:'d_localidad',c_postal:'c_postal'},
							keyNav:true,
					});
					 
					$('#c_localidad',formid).change(function(){
						lupa_cod('c_localidad','d_localidad','<?=fun_id_lista('LISTADO DE LOCALIDADES')?>','14','c_departamento','');
					});				
			}),
					beforeShowForm: defaultBeforeShowForm(function(formid) {
					
					$('#n_tabla_provincia',formid).val(16);
					$('#c_provincia',formid).val(14);
					$('#f_feriado',formid).attr('disabled',true);
					$('#m_optativo',formid).attr('disabled',false);
					$('#d_descrip',formid).attr('disabled',false);
				    $('#d_departamento',formid).attr('disabled',false);
					$('#d_localidad',formid).attr('disabled',false);
					}),
				onclickSubmit: function () { // Para evitar fallos en filas sin refresh
					var id = $("#main_grid").getGridParam('selrow');
					var rid = $('#main_grid').getCell(id,'rid');
					ret = $(this).getGridParam('postData');
					ret.rowid = rid;
					return ret;
				},
		},//edit,
	
		{	//ADD	
		width: 650,
			onInitializeForm: defaultInitForm(function(formid) {
						
				$( "#f_feriado" ).datepicker( "destroy" );
				//$( "#f_feriado" ).datepicker();
				// Definición de lupa de Departamento
				//c_provincia,c_departamento,d_descrip
		        	$('#d_departamento',formid).lupa_generica({
							titulos:['Cód. Provincia','Cód. Departamento','Departamento'],
							grid:[{index:'c_provincia',width:100,hidden:true},
									{index:'c_departamento',width:150},
									{index:'d_departamento',width:150}],
							caption:'Lista de Departamentos',
							sortname:'c_departamento',
							sortorder:'asc',
							filtros:['#c_provincia'],
							campos:{c_provincia:'c_provincia',c_departamento:'c_departamento',d_departamento:'d_departamento'},
							keyNav:true,
							onClose:function(){
								$('#c_localidad').val(null);
								$('#d_localidad').val(null);
							}
				
					});
					
					$('#c_departamento',formid).change(function(){
						lupa_cod('c_departamento','d_departamento','<?=fun_id_lista('LISTADO DE DEPARTAMENTOS')?>','','','');
					});		
					
					
				// Definición de lupa de Localidades
				//c_provincia,c_departamento,c_localidad,d_descrip,c_postal 
		        	$('#d_localidad',formid).lupa_generica({
							titulos:['Cód. Provincia','Cód. Departamento','Cód. Localidad','Localidad','Cód. Postal'],
							grid:[{index:'c_provincia',width:100,hidden:true},
									{index:'c_departamento',width:150,hidden:true},
									{index:'c_localidad',width:150},
									{index:'d_localidad',width:150},
									{index:'c_postal',width:150,hidden:true}],
							caption:'Lista de Localidades',
							sortname:'c_localidad',
							sortorder:'asc',
					
							filtros:['#c_provincia', '#c_departamento'], 
							campos:{c_provincia:'c_provincia',c_departamento:'c_departamento',c_localidad:'c_localidad',d_localidad:'d_localidad',c_postal:'c_postal'},
							keyNav:true,
					});
					 
					$('#c_localidad',formid).change(function(){
						lupa_cod('c_localidad','d_localidad','<?=fun_id_lista('LISTADO DE LOCALIDADES')?>','14','c_departamento','');
					});				
			}),
					beforeShowForm: defaultBeforeShowForm(function(formid) {
					
					$('#n_tabla_provincia',formid).val(16);
					$('#c_provincia',formid).val(14);
					$('#f_feriado',formid).attr('disabled',false);
					$('#m_optativo',formid).attr('disabled',false);
					$('#d_descrip',formid).attr('disabled',false);
				    $('#d_departamento',formid).attr('disabled',false);
					$('#d_localidad',formid).attr('disabled',false);
					
				    }),
					closeAfterAdd:true 						
		},//alta
		
		{		},//del
		
		{}//search
		);
		alto_grilla_dinamico();
});

</script>
<?php
	require_once(INTRANET."footer.php");
?>