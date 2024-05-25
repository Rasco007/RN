<?php
	require_once(INTRANET."header.php");

	checklogin();
	$m_autoquery = $_POST['p_m_autoquery'];
?>

<table id='main_grid' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>
<div id='main_grid_pager' class='scroll' style='text-align:center;'></div>
<br />
<div id='div_busqueda_sub'></div>
<table id='detail_grid' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>
<div id='detail_grid_pager' class='scroll' style='text-align: center;'></div>

<script type="text/javascript">

	// Definición de objeto de grillas
	var datos_main_grid = new GridParam({
		id_menu:<?=$_POST['p_n_id_menu']?>,
		n_grid:0,
		m_autoquery:'<?=$m_autoquery?>'});		

	var datos_detail_grid = new GridParam({
		id_menu:<?=$_POST['p_n_id_menu']?>,
		n_grid:1,
		m_autoquery:'N'});

	$(document).ready(function() {

		/********** Definicion de Grilla 1 **********/
		$("#main_grid").jqGrid({
			colNames:datos_main_grid.colNames(),
			colModel:datos_main_grid.colModel(),
			pager: $('#main_grid_pager'),
			caption:"Filtros:" ,		
			postData:datos_main_grid.postData(),
			editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
			onSelectRow: function(id) { 	
					var n_id_filtro = $('#main_grid').getCell(id,'n_id_filtro');
					setea_parametros('#detail_grid',{'n_id_filtro':n_id_filtro});		
			}
		}).navGrid('#main_grid_pager',
			{add:true, edit:true, del:true}, //options 
			{
				width:880,
				onInitializeForm: defaultInitForm(function(formid) {
					
					// Definición de lupas
						$('#d_titulo',formid).lupa_generica({
								titulos:['Id','Titulo','Tipo de Menu','URL','Menu Padre'],
								grid:[{index:'id_menu',width:100,hidden:false},
										{index:'d_titulo',width:150},
										{index:'c_tipo_menu'},
										{index:'d_url'},
										{index:'d_menu_padre',width:150}],
								caption:'Lista de Menus',
								sortname:'d_titulo',
								sortorder:'asc',
								filtros:['null'],
								campos:{d_titulo:'d_titulo',id_menu:'n_id_menu'},
								keyNav:true,
								foco:"#d_label"					
						});
						
						$('#d_dato',formid).lupa_generica({
								titulos:['C&oacute;digo','Descripci&oacute;n'],
								grid:[{index:'c_codigo',width:100,},
										{index:'d_descrip',width:150}],
								caption:'Lista de tipos de datos',
								sortname:'d_descrip',
								sortorder:'asc',
								filtros:['null'],
								campos:{d_descrip:'d_dato',c_codigo:'d_tipo_dato'},
								keyNav:true,
								foco:"#d_where"					
						});
						
						$('#d_descripcion',formid).lupa_generica({
								titulos:['Nro. Lista','Descripci&oacute;n'],
								grid:[{index:'n_id_lista',width:100,},
										{index:'d_descripcion',width:250}],
								caption:'Listas',
								sortname:'n_id_lista',
								sortorder:'asc',
								filtros:['null'],
								campos:{n_id_lista:'n_id_lista',d_descripcion:'d_descripcion'},
								keyNav:true,
								foco:"#n_grilla"					
						});
						
						$('#d_descripcion').attr('readonly',false);
						
						$('#d_descripcion').change(function(){
							$('#n_id_lista').val('');
						});

				})	
			}, // edit options 
			{
				width:880,
				onInitializeForm: defaultInitForm(function(formid) {
					
					// Definición de lupas
					$('#d_titulo',formid).lupa_generica({
								titulos:['Id','Titulo','Tipo de Menu','URL','Menu Padre'],
								grid:[{index:'id_menu',width:100,hidden:true},
										{index:'d_titulo',width:150},
										{index:'c_tipo_menu'},
										{index:'d_url',width:200},
										{index:'d_menu_padre',width:150}],
								//caption:'Lista de Menus',
								sortname:'d_titulo',
								sortorder:'asc',
								filtros:['null'],
								campos:{d_titulo:'d_titulo',id_menu:'n_id_menu'},
								keyNav:true,
								foco:"#d_label"				
					});
					
					$('#d_dato',formid).lupa_generica({
								titulos:['C&oacute;digo','Descripci&oacute;n'],
								grid:[{index:'c_codigo',width:100,},
										{index:'d_descrip',width:150}],
								caption:'Lista de tipos de datos',
								sortname:'d_descrip',
								sortorder:'asc',
								filtros:['null'],
								campos:{d_descrip:'d_dato',c_codigo:'d_tipo_dato'},
								keyNav:true,
								foco:"#d_where"					
					});
					
					$('#d_descripcion',formid).lupa_generica({
								titulos:['Nro. Lista','Descripci&oacute;n'],
								grid:[{index:'n_id_lista',width:100,},
										{index:'d_descripcion',width:250}],
								caption:'Listas',
								sortname:'n_id_lista',
								sortorder:'asc',
								filtros:['null'],
								campos:{n_id_lista:'n_id_lista',d_descripcion:'d_descripcion'},
								keyNav:true,
								foco:"#n_grilla"					
					});
					$('#d_descripcion').attr('readonly',false);
					
					$('#d_descripcion').change(function(){
							$('#n_id_lista').val('');
						});
				}),
				closeAfterAdd:true 	
			}, // add options 
			{}, // del options 
			{} // search options 
		);

		/********** Definicion de Grilla 2 **********/
		$("#detail_grid").jqGrid({
			colNames:datos_detail_grid.colNames(),
			colModel:datos_detail_grid.colModel(),
			pager: $('#detail_grid_pager'),
			caption:"Operadores:" ,		
			postData:datos_detail_grid.postData(),
			editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php", 
		}).navGrid('#detail_grid_pager',
			{add:true, edit:true, del:true}, //options 
			{
			   beforeInitData: function (formid){				
					if(!$("#main_grid").getGridParam('selrow')){
						mostrar_error('Debe seleccionar una filtro previamente');	
						return false;
					}				
				},
			   onInitializeForm: defaultInitForm(function(formid) {
					 
					 //Definición de lupas
					 $('#d_dato',formid).lupa_generica({
										titulos:['C&oacute;digo','Descripci&oacute;n'],
										grid:[{index:'c_dato',width:100,hidden:true},
												{index:'d_dato',width:250}],
										caption:'Operadores',
										sortname:'d_dato',
										sortorder:'asc',
										filtros:['null'],
										campos:{c_dato:'c_operador',d_dato:'d_dato'},
										keyNav:true					
					});
				
				})
			   
			}, // edit options 
			{
			   beforeInitData: function (formid){
					if(!$("#main_grid").getGridParam('selrow')){
						mostrar_error('Debe seleccionar una filtro previamente');
						return false;
					}
				},
				onInitializeForm: defaultInitForm(function(formid) {
					//Definición de lupas
					$('#d_dato',formid).lupa_generica({
						titulos:['C&oacute;digo','Descripci&oacute;n'],
						grid:[{index:'c_dato',width:100,hidden:true},
							  {index:'d_dato',width:250}],
						caption:'Operadores',
						sortname:'d_dato',
						sortorder:'asc',
						filtros:['null'],
						campos:{c_dato:'c_operador',d_dato:'d_dato'},
						keyNav:true					
					});
				}),
				 onclickSubmit: function () { // Para evitar fallos en filas sin refresh	
					var id = $("#main_grid").getGridParam('selrow');
					var n_id_filtro = $('#main_grid').getCell(id,'n_id_filtro');
					ret = $(this).getGridParam('postData'); 
					ret.n_id_filtro = n_id_filtro;				
					ret.n_tabla_operador = 902;
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
