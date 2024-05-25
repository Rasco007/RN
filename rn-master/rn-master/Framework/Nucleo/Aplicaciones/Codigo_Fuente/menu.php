<?php
require_once(INTRANET."header.php");

checklogin();
$m_autoquery = $_POST['p_m_autoquery'];
?>

	<div id='div_busqueda'></div>
	<table id='main_grid' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>
	<div id='main_grid_pager' class='scroll' style='text-align:center;'></div>
	<br/>
	<div id='div_busqueda_sub'></div>
	<table id='detail_grid' class='scroll' cellpadding='0' cellspacing='0'><tr><td>&nbsp;</td></tr></table>
	<div id='detail_grid_pager' class='scroll' style='text-align: center;'></div>

<script type="text/javascript">

	// definición de objeto de grillas
	var datos_main_grid = new GridParam({
		id_menu:<?=$_POST['p_n_id_menu']?>,
		n_grid:0,
		n_orden:0,
		m_autoquery:'<?=$m_autoquery?>',
		grid_childs_id:{
			'detail_grid':'#detail_grid'
		}
	});
											
	var datos_detail_grid = new GridParam({
		id_menu:<?=$_POST['p_n_id_menu']?>,
		n_grid:1,
		n_orden:1,
		m_autoquery:'N'});

	var n_tabla_tipo_menu =900;

	$(document).ready(function() {

		// definición del buscador
		$("#div_busqueda").crearBusquedaMasiva({
			p_n_id_menu:<?=$_POST['p_n_id_menu'];?>,
			afecta_grid:['main_grid'],
			adv:'S',
			p_n_grid:0,
			titulo:'Busqueda de Menu'
		});

		/********** Definicion de Grilla 1 **********/
		$("#main_grid").jqGrid({
			colNames:datos_main_grid.colNames(),
			colModel:datos_main_grid.colModel(),
			pager: $('#main_grid_pager'),
			caption:"Menues:",
			sortname:'d_titulo',
			sortorder:'asc',
			postData:datos_main_grid.postData(),
			onSelectRow: function(id) {
				var n_id_menu = $('#main_grid').getCell(id,'n_id_menu');
				setea_parametros('#detail_grid',{':n_id_menu_perfil':n_id_menu});
			}				
		}).navGrid('#main_grid_pager',
			{add:true, edit:true, del:true}, //options 
			{	
				width:700,	
				beforeShowForm: defaultBeforeShowForm(function(formid){
				$('#n_tabla_tipo_menu').val(n_tabla_tipo_menu);
				return[true,false];
				}),
				onInitializeForm: defaultInitForm(function(formid) {
					
					// Definición de lupa tipo menu
					$('#d_tipo_menu',formid).lupa_generica({
							titulos:['T&iacute;tulo','Descripci&oacute;n'],
							grid:[{index:'c_dato',width:100},
									{index:'d_dato',width:150}],
							caption:'Lista Tipos de Menu',
							sortname:'c_codigo',
							sortorder:'asc',
							filtros:['null'],
							campos:{c_dato:'c_tipo_menu',d_dato:'d_tipo_menu'},
							keyNav:true,
							foco:"#n_grid"					
					});
						
					// Definición de lupa menu padre
					$('#d_menu_padre',formid).lupa_generica({
							titulos:['T&iacute;tulo','Descripci&oacute;n'],
							grid:[{index:'c_codigo',width:100,hidden:true},
									{index:'d_descrip',width:500}],
							caption:'Lista de Men&uacute; Padre',
							sortname:'d_descrip',
							sortorder:'asc',
							filtros:['null'],
							campos:{c_codigo:'id_menu_padre',d_descrip:'d_menu_padre'},
							keyNav:true,
							onClose:function(formid){
								if($('#id_menu_padre',formid).val()!=''){
									$.ajax({
										url: '../Funciones/sugeridor_orden.php',
										type:"POST",
										data:{
											"id_menu_padre":$('#id_menu_padre',formid).val(),										
											"tipo":"MENU"
										},
										success: function(data){
											var res = eval('('+data+')');
											if(res.resultado == 'OK'){
												$('#orden',formid).val(res.orden);
											}
											else{
												//mostrar_error(res.resultado);
											}
										}
									});			
								}
								else{
									$('#orden',formid).val(null);
								}											
							},
							foco:"#orden"				
					});
					
					$('#d_menu_padre').attr('readonly',false);
					
					$('#d_menu_padre').change(function(){
							$('#id_menu_padre').val('');
					});

					// Definición de lupa menu redireccion
					$('#d_menu_redireccion',formid).lupa_generica({
						titulos:['T&iacute;tulo','Descripci&oacute;n'],
						grid:[{index:'c_codigo',width:100},
							{index:'d_descrip',width:150}],
						caption:'Lista de Menus a Redireccionar',
						sortname:'d_descrip',
						sortorder:'asc',
						filtros:['null'],
						campos:{c_codigo:'id_menu_redireccion',d_descrip:'d_menu_redireccion'},
						keyNav:true,
						foco:"#orden"			
					});

					$('#d_grupo_menu',formid).lupa_generica({
						titulos:['Codigo','Descripci&oacute;n'],
						grid:[{index:'c_codigo',width:100},
							{index:'d_descrip',width:150}],
						caption:'Lista de grupo de men&uacute;',
						sortname:'d_descrip',
						sortorder:'asc',
						filtros:['null'],
						campos:{c_codigo:'c_grupo_menu',d_descrip:'d_grupo_menu'},
						keyNav:true,
						searchCode: true,
						searchInput: '#c_grupo_menu'
					});
				}),
				beforeSubmit: function(postdata, formid) {
					var type = $('#editmodmain_grid #d_tipo_menu').val();
					$('#editmodmain_grid #d_url').removeClass('validate[,]');
					$('#editmodmain_grid #d_url').removeClass('validate[required,,]');
					$('#editmodmain_grid #d_menu_padre').removeClass('validate[,]');
					$('#editmodmain_grid #d_menu_padre').removeClass('validate[required,,]');
					if(type=='ITEM'){
						//$('#editmodmain_grid #d_menu_padre').addClass('validate[required,,]');
						$('#editmodmain_grid #d_url').addClass('validate[required,,]');
					}
					var valido = $(formid).validationEngine('validate');
					return[valido,'Controle los datos ingresados.'];
				}
			}, // edit options
			{
				width:700,
				beforeShowForm: defaultBeforeShowForm(function(formid){
					$('#n_tabla_tipo_menu').val(n_tabla_tipo_menu);
					return[true,false];
				}),	
				onInitializeForm: defaultInitForm(function(formid) {	
					// Definición de lupa tipo menu
					$('#d_tipo_menu',formid).lupa_generica({
						titulos:['T&iacute;tulo','Descripci&oacute;n'],
						grid:[{index:'c_dato',width:100},
								{index:'d_dato',width:150}],
						caption:'Lista Tipos de Men&uacute;',
						sortname:'c_codigo',
						sortorder:'asc',
						filtros:['null'],
						campos:{c_dato:'c_tipo_menu',d_dato:'d_tipo_menu'},
						keyNav:true,
						foco:"#n_grid"					
					});
					
					// Definición de lupa menu padre
					$('#d_menu_padre',formid).lupa_generica({
						titulos:['T&iacute;tulo','Descripci&oacute;n'],
						grid:[{index:'c_codigo',width:100,hidden:true},
								{index:'d_descrip',width:500}],
						caption:'Lista de Men&uacute; Padre',
						sortname:'d_descrip',
						sortorder:'asc',
						filtros:['null'],
						campos:{c_codigo:'id_menu_padre',d_descrip:'d_menu_padre'},
						keyNav:true,
						onClose:function(formid){
							if($('#id_menu_padre',formid).val()!=''){
								$.ajax({
									url: '../Funciones/sugeridor_orden.php',
									type:"POST",
									data:{
										"id_menu_padre":$('#id_menu_padre',formid).val(),										
										"tipo":"MENU"
									},
									success: function(data){
										var res = eval('('+data+')');
										if(res.resultado == 'OK'){
											$('#orden',formid).val(res.orden);
										}
										else{
											//mostrar_error(res.resultado);
										}
									}
								});			
							}
							else{
								$('#orden',formid).val(null);
							}											
						},
						foco:"#orden"					
					});
						
					$('#d_menu_padre').attr('readonly',false);
					
					$('#d_menu_padre').change(function(){
						$('#id_menu_padre').val('');
					});

					// Definición de lupa menu redireccion
					$('#d_menu_redireccion',formid).lupa_generica({
						titulos:['T&iacute;tulo','Descripci&oacute;n'],
						grid:[{index:'c_codigo',width:100},
							{index:'d_descrip',width:150}],
						caption:'Lista de Menus a Redireccionar',
						sortname:'d_descrip',
						sortorder:'asc',
						filtros:['null'],
						campos:{c_codigo:'id_menu_redireccion',d_descrip:'d_menu_redireccion'},
						keyNav:true,
						foco:"#n_grid"
					});

					$('#d_grupo_menu',formid).lupa_generica({
						titulos:['Codigo','Descripci&oacute;n'],
						grid:[{index:'c_codigo',width:100},
							{index:'d_descrip',width:150}],
						caption:'Lista de grupo de men&uacute;',
						sortname:'d_descrip',
						sortorder:'asc',
						filtros:['null'],
						campos:{c_codigo:'c_grupo_menu',d_descrip:'d_grupo_menu'},
						keyNav:true,
						searchCode: true,
						searchInput: '#c_grupo_menu'
					});
		
				}),
				beforeSubmit: function(postdata, formid) {
					var type = $('#editcntmain_grid #d_tipo_menu').val();
					$('#editcntmain_grid #d_url').removeClass('validate[,]');
					$('#editcntmain_grid #d_url').removeClass('validate[required,,]');
					$('#editcntmain_grid #d_menu_padre').removeClass('validate[,]');
					$('#editcntmain_grid #d_menu_padre').removeClass('validate[required,,]');
					if(type=='ITEM'){
						//$('#editcntmain_grid #d_menu_padre').addClass('validate[required,,]');
						$('#editcntmain_grid #d_url').addClass('validate[required,,]');
					}
					var valido = $(formid).validationEngine('validate');
					return[valido,'Controle los datos ingresados.'];
				},
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
			caption:"Perfiles:" ,
			postData:datos_detail_grid.postData()      
		}).navGrid('#detail_grid_pager',
			{add:true, edit:false, del:true}, //options 
			{	
				width:700,
				beforeShowForm: defaultBeforeShowForm(function(formid){
					var id= $('#main_grid').getGridParam('selrow');
					var menu_perfil = $('#main_grid').getCell(id,'n_id_menu');
					$('#n_id_menu_perfil').val(menu_perfil);
					$('#id_perfil').attr('readonly',true);	
					$('#d_perfil',formid).unbind();
				})
			}, // edit options 
			{	
				width:700,
				beforeShowForm: defaultBeforeShowForm(function(formid){
							var id= $('#main_grid').getGridParam('selrow');
							var menu_perfil = $('#main_grid').getCell(id,'n_id_menu');
							$('#n_id_menu_perfil').val(menu_perfil);
							
							$('#d_perfil',formid).lupa_generica({
								titulos:['ID','Descripci&oacute;n','Tipo Perfil'],
								grid:[{index:'id_perfil',width:100,hidden:true},
										{index:'d_perfil',width:250},
										{index:'d_dato'}],
								caption:'Perfiles',
								sortname:'d_perfil',
								sortorder:'asc',
								filtros:['null'],
								campos:{id_perfil:'id_perfil',d_perfil:'d_perfil',d_dato:'c_tipo_perfil'},
								keyNav:true
							});
					}
				),
				beforeInitData: function(formid) {
					var id= $('#main_grid').getGridParam('selrow');
					if (id){
						return true;					
					}
					else{
						mostrar_cuadro('I', 'ADVERTENCIA', 'Debe seleccionar un menú para dar de alta un perfil', function(){}, function(){}, 400, 200);
						return false;
					}
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
