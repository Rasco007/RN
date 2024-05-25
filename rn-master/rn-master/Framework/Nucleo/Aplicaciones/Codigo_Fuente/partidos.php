<?php
require_once(INTRANET."header.php");

checklogin();
$m_autoquery = $_POST['p_m_autoquery'];
$lista_provincias = fun_id_lista('LISTADO DE PROVINCIAS');
?>

<style type="text/css">

</style>

	<div id='div_busqueda'></div>
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
		m_autoquery:'N'});
		
	$(document).ready(function() {
		
		// definicion del buscador
		$("#div_busqueda").crearBusquedaMasiva({
			p_n_id_menu:<?=$_POST['p_n_id_menu'];?>,
			afecta_grid:['main_grid'],
			adv:'S',
			p_n_grid:1,
			titulo:'Busqueda de Departamentos'
		});

		// definicion del buscador
		$("#div_busqueda_sub").crearBusquedaMasiva({
			p_n_id_menu:<?=$_POST['p_n_id_menu'];?>,
			afecta_grid:['detail_grid'],
			adv:'S',
			p_n_grid:2,
			titulo:'Busqueda de Localidades'
		});

		/********** Definicion de Grilla 1 **********/
		var c_provincia;
		var c_departamento;
		var n_tabla_provincia =16;
		var localidad_GIS;

		$("#main_grid").jqGrid({
			colNames:datos_main_grid.colNames(),
			colModel:datos_main_grid.colModel(),
			pager: $('#main_grid_pager'),
			caption:"Departamento" ,
			postData:datos_main_grid.postData(),
			editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
			onSelectRow: function(id) {
				c_provincia = $('#main_grid').getCell(id,'c_provincia');
				c_departamento = $('#main_grid').getCell(id,'c_departamento');
				setea_parametros('#detail_grid',{':c_provincia':c_provincia,':c_departamento':c_departamento});
			}
		}).navGrid('#main_grid_pager',
			{add:true, edit:true, del:true},
			{
				width: 750,
				onInitializeForm: defaultInitForm(function(formid){
					// Definicion de lupas
					$('#d_dato').lupa_generica({
						titulos:['Codigo de Provincia','Provincia'],
						grid:[{index:'c_codigo',width:150},
							{index:'d_descrip'}],
						caption:'Lista de Provincias',
						sortname:'d_descrip',
						sortorder:'asc',
						filtros:['null'],
						campos:{c_codigo:'c_provincia', d_descrip:'d_dato'},
						id_lista:<?=$lista_provincias?>,
						keyNav:true,
						foco:"#c_provincia"
					});
				}),
				beforeShowForm: defaultBeforeShowForm(function(formid){
					$('#c_provincia').attr('readonly',true);
					$('#d_dato').attr('readonly',true);
					$('#d_dato').attr('disabled',true);
					$('#d_dato_lupa').hide();
					$('#c_departamento').attr('readonly',true);
				})
			},//edit
			{
				width: 750,
				closeAfterAdd:true,
				onInitializeForm: defaultInitForm(function(formid){
					// Definicion de lupas
					$('#d_dato').lupa_generica({
						titulos:['Codigo de Provincia','Provincia'],
						grid:[{index:'c_codigo',width:150},
							{index:'d_descrip'}],
						caption:'Lista de Provincias',
						sortname:'d_descrip',
						sortorder:'asc',
						filtros:['null'],
						campos:{c_codigo:'c_provincia', d_descrip:'d_dato'},
						id_lista:<?=$lista_provincias?>,
						keyNav:true,
						foco:"#c_provincia"
					});
				}),
				afterShowForm : function(formid) {
					$('#n_tabla_provincia').val(n_tabla_provincia);
					return[true,false];
				},
				beforeShowForm: defaultBeforeShowForm(function(formid){
					$('#c_provincia').attr('readonly',false);
					$('#d_dato').attr('readonly',false);
					$('#d_dato').attr('disabled',false);
					$('#c_departamento').attr('readonly',false);
					$('#d_dato_lupa').show();

					$('#c_provincia').change(function(){
						lupa_cod('c_provincia','d_dato','6','', '', '');
					});
				})
			},//alta,
			{},//del
			{}//search
		);

		/********** Definicion de Grilla 2 **********/
		$("#detail_grid").jqGrid({
			colNames:datos_detail_grid.colNames(),
			colModel:datos_detail_grid.colModel(),
			pager: $('#detail_grid_pager'),
			caption:"Localidades:" ,
			postData:datos_detail_grid.postData(),
			editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
			onSelectRow: function(id) {
				localidad_GIS = $('#detail_grid').getCell(id,'id_localidad_gis');
			}
		}).navGrid('#detail_grid_pager',
			{add:true, edit:true, del:true},
			{
				width: 750,
				recreateForm: true,
				beforeInitData: function(formid) {
					if($('#main_grid').getGridParam('selrow')){
						return true;
					}else{
						mostrar_cuadro('I', 'ADVERTENCIA', 'Seleccione una linea de Partido por favor', function(){}, function(){}, 400, 200);
						return false;
					}
				},
				beforeShowForm: defaultBeforeShowForm(function(formid){
					if(localidad_GIS != ''){
						$('#d_descrip').attr('readonly',true);
					}else{
						$('#d_descrip').attr('readonly',false);
					}
					//$('#tr_id_localidad_gis').hide();
					$('#c_localidad').attr('readonly',true);
					$('#n_tabla_provincia').val(n_tabla_provincia);
					$('#c_provincia').val(c_provincia);
					$('#c_departamento').val(c_departamento);
				}),

				onInitializeForm: defaultInitForm(function(formid) {
					// id_lista:<?=fun_id_lista('LISTA DE MUNICIPIOS');?>,
					$('#d_municipio',formid).lupa_generica({
						titulos:['Cód. Municipio','Municipio'],
						grid:[{index:'c_codigo',width:100,hidden:false},
							{index:'d_descrip',width:150}],
						caption:'Lista de Municipios',
						sortname:'d_descrip',
						sortorder:'asc',
						campos:{c_codigo:'c_municipio',d_descrip:'d_municipio'},
						keyNav:true
					});

					$("#c_municipio").change(function(){
						lupa_cod('c_municipio','d_municipio','<?=fun_id_lista('LISTA DE MUNICIPIOS');?>','', '', '');
					});
				}),
				onclickSubmit: function(param){
					var id = $("#main_grid").getGridParam('selrow');
					var c_provincia = $('#main_grid').getCell(id,'c_provincia');
					var c_departamento = $('#main_grid').getCell(id,'c_departamento');
					ret = $(this).getGridParam('postData');
					ret.c_provincia = c_provincia;
					ret.c_departamento = c_departamento;
					ret.n_tabla_provincia = 16;
					ret.n_tabla_municipio = 600;
					return ret;
				}
			},//edit
			{
				width: 750,
				recreateForm: true,
				beforeInitData: function(formid) {
					if($('#main_grid').getGridParam('selrow')){
						return true;
					}else{
						mostrar_cuadro('I', 'ADVERTENCIA', 'Seleccione una linea de Partido por favor', function(){}, function(){}, 400, 200);
						return false;
					}
				},
				beforeShowForm: defaultBeforeShowForm(function(formid){
					$('#d_descrip').attr('readonly',false);
					//$('#tr_id_localidad_gis').hide();
					$('#c_localidad').attr('readonly',false);
					$('#n_tabla_provincia').val(n_tabla_provincia);
					$('#c_provincia').val(c_provincia);
					$('#c_departamento').val(c_departamento);
				}),
				closeAfterAdd: true,
				onclickSubmit: function(param){
					var id = $("#main_grid").getGridParam('selrow');
					var c_provincia = $('#main_grid').getCell(id,'c_provincia');
					var c_departamento = $('#main_grid').getCell(id,'c_departamento');
					ret = $(this).getGridParam('postData');
					ret.c_provincia = c_provincia;
					ret.c_departamento = c_departamento;
					ret.n_tabla_provincia = 16;
					ret.n_tabla_municipio = 600;
					return ret;
				},
				onInitializeForm: defaultInitForm(function(formid) {
					//id_lista:<?=fun_id_lista('LISTA DE MUNICIPIOS');?>,
					$('#d_municipio',formid).lupa_generica({
						titulos:['Cód. Municipio','Municipio'],
						grid:[{index:'c_codigo',width:100,hidden:false},
							{index:'d_descrip',width:150}],
						caption:'Lista de Municipios',
						sortname:'d_descrip',
						sortorder:'asc',
						campos:{c_codigo:'c_municipio',d_descrip:'d_municipio'},
						keyNav:true
					});
					$("#c_municipio").change(function(){
						lupa_cod('c_municipio','d_municipio','<?=fun_id_lista('LISTA DE MUNICIPIOS');?>','', '', '');
					});
				})
			}, // add options
			{
				beforeInitData: function(formid) {
					if(localidad_GIS != ''){
						mostrar_cuadro('I', 'ADVERTENCIA', 'No se pueden eliminar localidades con el atributo Id de Localidad GIS cargado.', function(){}, function(){}, 400, 200);
						return false;
					}
					return true;
				}
			}, // del options
			{} // search options
		);
	});
</script>

<?php
	require_once(INTRANET."footer.php");
?>
