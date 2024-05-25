<?php
	require_once(INTRANET."header.php");

	checklogin();
	$m_autoquery = $_POST['p_m_autoquery'];
	$lista_menues = fun_id_lista('LISTADO DE CODIGO DE MENUES');
?>

<style>
	#main_grid_pager .ui-pg-button .ui-pg-div span.ui-pg-button-text {
		width: 45px;
	}
	
	#form_copiar_prc p label{
		float: left; 
		width: 75px; 
		text-align: right; 
		margin-right: 5px;
	}
	
	#form_copiar_prc p button{
        text-align: center;
        width: 30px;
        height: 20px;
        float: left;
    }
	
	#d_proc_statement{
		height:335px;
		width:100%;
	}
</style>

<table id='main_grid' class='scroll' cellpadding='0' cellspacing='0'>
	<tr>
		<td>&nbsp;</td>
	</tr>
</table>
<div id='main_grid_pager' class='scroll' style='text-align:center;'></div>
<div id='div_busqueda_sub'></div>
<br />
<table id='detail_grid' class='scroll' cellpadding='0' cellspacing='0'>
	<tr>
		<td>&nbsp;</td>
	</tr>
</table>
<div id='detail_grid_pager' class='scroll' style='text-align: center;'></div>
<div style='height:20px; width:100%'>
	<div id='mensaje' style='text-align: left; display:none; height:15px; padding-top:5px'>Mueva los registros y luego aplique los cambios para que surjan efecto.</div>
</div>
<div id='dialog_reordenar_columna' hidden>
	<form style='width:auto;overflow:auto;position:relative;height:auto;' onsubmit='return false;' class='FormGrid' id='frm_reordenar_columna' name='frm_reordenar_columna'>
		<table style='width:100%' cellspacing='1.5px'>
			<tr>
				<td style='width:50%;'>
					<div>
						Número de Órden actual:
					</div>
				</td>
				<td>
					<div id='div_n_orden_anterior_reordenar'>
						<input name='n_orden_anterior_reordenar' id='n_orden_anterior_reordenar' type='text' class='validate[required,custom[onlyIntNumber],]' style='width:80%;text-align:right;' />
					</div>
				</td>
			</tr>
			<tr>
				<td style='width:50%;'>
					<div>
						Nuevo Número de Órden:
					</div>
				</td>
				<td>
					<div id='div_n_orden_reordenar'>
						<input name='n_orden_reordenar' id='n_orden_reordenar' type='text' class='validate[required,custom[onlyIntNumber],]' style='width:80%;text-align:right;' />
					</div>
				</td>
			</tr>
		</table>
	</form>
	<div id="dialog_proc_statement" hidden title="Copiar consulta:" style="display:none;">
		<form id="frm_query_grid">
			<table>
				<tr>
					<td>
						<textarea id="d_proc_statement" rows="30" cols="73" readonly></textarea>
					</td>
				</tr>
			</table>
		</form>
	</div>
</div>

<div id="dialog_copiar_prc" title="Copiar Procedimiento o Función" hidden>
	<form id="form_copiar_prc">
		<fieldset style="margin: 5px 0px; border: 1px solid #dddddd;">
			<legend style="margin-bottom: 2px;"> Copiar Desde </legend>
			<p style="overflow: hidden;">
				<label>Menu:</label>
				<input id="id_menu_d" class="text validate[required]" style="float: left; width: 50px; margin-right: 5px; text-align: right;"/>
				<input id="d_menu_d" class="text" readonly="readonly" style="float: left; width: 60%; margin-right: 3px;"/>
				<button id="btn_lov_menu_d" type="button"></button>
			</p>
			<p  style="overflow: hidden;">
				<label>Nro. Orden:</label>
				<input id="id_menu_procedure_d" type="hidden"/>
				<input id="n_orden_d" class="text validate[required]" style="float: left; width: 50px; margin-right: 5px; text-align: right;"/>
				<input id="d_procedimiento_d" class="text" readonly="readonly" style="float: left; width: 60%; margin-right: 3px;"/>
				<button id="btn_lov_procedure_d" type="button"></button>
			</p>	
		</fieldset>
		<fieldset style="margin: 5px 0px; border: 1px solid #dddddd;">
			<legend style="margin-bottom: 2px;"> Copiar Hacia </legend>
			<p style="overflow: hidden;">
				<label>Menu:</label>
				<input id="id_menu_h" class="text validate[required]" style="float: left; width: 50px; margin-right: 5px; text-align: right;"/>
				<input id="d_menu_h" class="text" readonly="readonly" style="float: left; width: 60%; margin-right: 3px;"/>
				<button id="btn_lov_menu_h" type="button"></button>
			</p>
			<p  style="overflow: hidden;">
				<label>Nro. Orden:</label>
				<input id="n_orden_h" class="text validate[required]" style="float: left; width: 50px; margin-right: 5px; text-align: right;"/>
				<input id="d_procedimiento_h" class="text" readonly="readonly" style="float: left; width: 60%; margin-right: 3px;"/>
			</p>	
		</fieldset>
		<div style="margin-top: 10px; padding-top: 5px; border-top: 1px solid #dddddd; text-align: right;">
			<button id="btn_guardar_prc" type="button"></button>
			<button id="btn_cancelar_prc" type="button"></button>
		</div>
	</form>
</div>

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

		var n_tabla_dato=901;

		/********** Definicion de Grilla 1 **********/
		$("#main_grid").jqGrid({
			colNames:datos_main_grid.colNames(),
			colModel:datos_main_grid.colModel(),
			pager: $('#main_grid_pager'),
			caption:"Procedimientos y Funciones:" ,
			postData:datos_main_grid.postData(),
			editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
			onSelectRow: function(id) {
				id_menu_procedure = $('#main_grid').getCell(id,'id_menu_procedure');
				setea_parametros('#detail_grid',{'id_menu_procedure':id_menu_procedure});
			}
		}).navGrid('#main_grid_pager',
			{add:true, edit:true, del:true},
			{
				width:650,
				beforeShowForm: defaultBeforeShowForm(function(formid) {
					$('#n_tabla_dato',formid).val(n_tabla_dato);
					
					$('#d_object_type',formid).change();
				}),
				onInitializeForm: defaultInitForm(function(formid) {
					$('#d_menu',formid).lupa_generica({
						titulos:['Id','Descripcion'],
						grid:[	{index:'c_codigo',width:150},
							{index:'d_descrip',width:150}],
						caption:'Lista de Menues',
						sortname:'c_codigo',
						sortorder:'asc',
						filtros:['null'],
						campos:{c_codigo:'n_id_menu',d_descrip:'d_menu'},
						id_lista:<?=$lista_menues?>,
						keyNav:true,
						onClose:function(formid){
							if($('#n_id_menu',formid).val()!=''){
								$.ajax({
									url: '../Funciones/sugeridor_orden.php',
									type:"POST",
									data:{
										"id_menu":$('#n_id_menu',formid).val(),										
										"tipo":"PROCEDURE"
									},
									success: function(data){
										var res = eval('('+data+')');
										if(res.resultado == 'OK'){
											$('#n_orden',formid).val(res.orden);
										}
										else{
											//mostrar_error(res.resultado);
										}
									}
								});			
							}
							else{
								$('#n_orden',formid).val(null);
							}											
						},
						foco:"#d_menu",
						searchCode: true,
						searchInput: '#n_id_menu'
					});

					$('#d_procedure',formid).lupa_generica({
						titulos:['Procedimiento','Tipo de Objeto'],
						grid:[	{index:'d_procedure',width:350},{index:'d_object_type',width:350,hidden:true}],
						caption:'Lista de Procedimientos',
						sortname:'d_procedure',
						sortorder:'asc',
						filtros:['null'],
						campos:{d_procedure:'d_procedure',d_object_type:'d_object_type'},
						keyNav:true,
						onClose: function(formid){
							var tipo = $('#d_object_type',formid).val();
							
							if(tipo == 'PACKAGE' || tipo == ''){
								$('#d_object_type',formid).val(null);
								$('#d_object_type_lupa',formid).show();
								$('#d_object_type',formid).attr('disabled',false);
							}
							else{
								$('#d_object_type_lupa',formid).hide();
								$('#d_object_type',formid).attr('disabled',true);
							}
							
							$('#d_object_type',formid).change();
						},
						foco:"#d_procedure"
					});

					$('#d_object_type',formid).lupa_generica({
						titulos:['Tipo de Objeto','Tipo de Objeto'],
						grid:[	{index:'c_codigo',width:350},
								{index:'d_descrip',width:350, hidden:true}],
						caption:'Lista de Tipo de Objeto',
						sortname:'d_descrip',
						sortorder:'asc',
						filtros:['null'],
						campos:{d_descrip:'d_object_type'},
						keyNav:true,
						foco:"#d_object_type"
					});

					$('#d_validacion',formid).lupa_generica({
						titulos:['Procedimiento'],
						grid:[	{index:'d_procedure',width:350}],
						caption:'Lista de Procedimientos',
						sortname:'d_procedure',
						sortorder:'asc',
						filtros:['null'],
						campos:{d_procedure:'d_validacion'},
						keyNav:true,
						foco:"#d_validacion"
					});
					
					$('#d_object_type',formid).change(function(){
						var tipo = $(this).val();
						
						if(tipo == 'FUNCTION'){
							$('#tr_m_ora',formid).hide();
							$('#m_ora',formid).val('N');
							$('#tr_d_validacion',formid).hide();
							$('#d_validacion',formid).val(null);
						}
						else{
							$('#tr_m_ora',formid).show();
							$('#m_ora',formid).val('S');
							$('#tr_d_validacion',formid).show();
						}
					});
				}),
				closeAfterAdd:true,
			},//edit
			{
				width:650,
				beforeShowForm: defaultBeforeShowForm(function(formid) {
					$('#n_tabla_dato',formid).val(n_tabla_dato);
				}),
				onInitializeForm: defaultInitForm(function(formid) {
					$('#d_menu',formid).lupa_generica({
						titulos:['Id','Descripcion'],
						grid:[	{index:'c_codigo',width:150},
							{index:'d_descrip',width:150}],
						caption:'Lista de Menues',
						sortname:'c_codigo',
						sortorder:'asc',
						filtros:['null'],
						campos:{c_codigo:'n_id_menu',d_descrip:'d_menu'},
						id_lista:<?=$lista_menues?>,
						keyNav:true,
						onClose:function(formid){
							if($('#n_id_menu',formid).val()!=''){
								$.ajax({
									url: '../Funciones/sugeridor_orden.php',
									type:"POST",
									data:{
										"id_menu":$('#n_id_menu',formid).val(),										
										"tipo":"PROCEDURE"
									},
									success: function(data){
										var res = eval('('+data+')');
										if(res.resultado == 'OK'){
											$('#n_orden',formid).val(res.orden);
										}
										else{
											//mostrar_error(res.resultado);
										}
									}
								});			
							}
							else{
								$('#n_orden',formid).val(null);
							}											
						},
						foco:"#d_menu",
						searchCode: true,
						searchInput: '#n_id_menu'
					});

					$('#d_procedure',formid).lupa_generica({
						titulos:['Procedimiento','Tipo de Objeto'],
						grid:[	{index:'d_procedure',width:350},{index:'d_object_type',width:350,hidden:true}],
						caption:'Lista de Procedimientos y Funciones',
						sortname:'d_procedure',
						sortorder:'asc',
						filtros:['null'],
						campos:{d_procedure:'d_procedure',d_object_type:'d_object_type'},
						keyNav:true,
						onClose: function(formid){
							var tipo = $('#d_object_type',formid).val();
							
							if(tipo == 'PACKAGE' || tipo == ''){
								$('#d_object_type',formid).val(null);
								$('#d_object_type_lupa',formid).show();
								$('#d_object_type',formid).attr('disabled',false);
							}
							else{
								$('#d_object_type_lupa',formid).hide();
								$('#d_object_type',formid).attr('disabled',true);
							}
							
							$('#d_object_type',formid).change();
						},
						foco:"#d_procedure"
					});

					$('#d_object_type',formid).lupa_generica({
						titulos:['Tipo de Objeto','Tipo de Objeto'],
						grid:[	{index:'c_codigo',width:350},
								{index:'d_descrip',width:350, hidden:true}],
						caption:'Lista de Tipo de Objeto',
						sortname:'d_descrip',
						sortorder:'asc',
						filtros:['null'],
						campos:{d_descrip:'d_object_type'},
						keyNav:true,
						foco:"#d_object_type"
					});

					$('#d_validacion',formid).lupa_generica({
						titulos:['Procedimiento'],
						grid:[	{index:'d_procedure',width:350}],
						caption:'Lista de Procedimientos',
						sortname:'d_procedure',
						sortorder:'asc',
						filtros:['null'],
						campos:{d_procedure:'d_validacion'},
						keyNav:true,
						foco:"#d_validacion"
					});
					
					$('#d_object_type',formid).change(function(){
						var tipo = $(this).val();
						
						if(tipo == 'FUNCTION'){
							$('#tr_m_ora',formid).hide();
							$('#m_ora',formid).val('N');
							$('#tr_d_validacion',formid).hide();
							$('#d_validacion',formid).val(null);
						}
						else{
							$('#tr_m_ora',formid).show();
							$('#m_ora',formid).val('S');
							$('#tr_d_validacion',formid).show();
						}
					});

					$('#n_id_menu',formid).change(function(){
						lupa_cod('n_id_menu','d_menu','47','', '', '');
					});

					$('#n_id_menu',formid).change(function(){
						lupa_cod('n_id_menu','d_menu','47','', '', '');
					});
				}),
				closeAfterAdd:true
			},//add
			{},//del
			{}//search
		).navButtonAdd('#main_grid_pager',{
			caption:"Copiar OBJ &nbsp;&nbsp;",
			buttonicon:"ui-icon-copy",
			onClickButton:function() {
				$("#dialog_copiar_prc").dialog("open");
			},
			position:"right",
			title:"Copiar Grilla",
			cursor:"pointer"
		}).navButtonAdd('#main_grid_pager',{caption:"Gen. llamada",buttonicon:"ui-icon-clipboard",
				onClickButton:function() {
					var auxid = $('#main_grid').getGridParam('selrow');
					var v_id_menu_procedure = $('#main_grid').getCell(auxid,'id_menu_procedure');
					if(auxid >= 0 && auxid != null){
						createProcedureStatement(v_id_menu_procedure, 'ORACLE');
					}
					else{
						mostrar_error('Debe seleccionar un registro.');
					}
				},position:"right", title:"Gen. llamada", cursor:"pointer"})
			.navButtonAdd('#main_grid_pager',{caption:"Gen. AJAX",buttonicon:"ui-icon-clipboard",
				onClickButton:function() {
					var auxid = $('#main_grid').getGridParam('selrow');
					var v_id_menu_procedure = $('#main_grid').getCell(auxid,'id_menu_procedure');
					if(auxid >= 0 && auxid != null){
						createProcedureStatement(v_id_menu_procedure,'AJAX');
					}
					else{
						mostrar_error('Debe seleccionar un registro.');
					}
				},position:"right", title:"Gen. AJAX", cursor:"pointer"});

		$("#dialog_reordenar_columna").dialog({
			autoOpen:false,
			modal:true,
			width: 350,
			height:200,
			title: 'Reordenar columna: ',
			modal: true,
			buttons: [
				{
					text: "Reordenar",
					click: function() {
						var id_menu_procedure = $('#main_grid').getCell(id_main_grid,'id_menu_procedure');
						var n_orden_actual = $('#n_orden_reordenar').val();
						var n_orden_anterior = $('#n_orden_anterior_reordenar').val();
						if($('#frm_reordenar_columna').validationEngine('validate')){
							$.post(FUNCIONES_BASEPATH+'maestro_abm.php',{ 'id_cabecera':id_menu_procedure,
								'n_orden_actual':n_orden_actual,
								'n_orden_anterior':n_orden_anterior,
								'marca':'PROC',
								'id_menu':<?=$_POST['p_n_id_menu']?>,
								'n_orden':0
							},function(data){
								var ret = eval('('+data+')');

								if(ret.parametros[':p_error'] != null)
									mostrar_cuadro('I', 'Advertencia', ret.parametros[':p_error'], function(){}, function(){}, 400, 200);

							});
							$("#detail_grid").setGridParam({postData: param, url:'../Funciones/busqueda_sql.php'}).trigger("reloadGrid");
						}
					}
				},
				{
					text: "Cancelar",
					click: function() {
						$('#n_orden_reordenar').val(null);
						$('#n_orden_anterior_reordenar').val(null);
						$( this ).dialog( "close" );
					}
				}
			],
			close: function( event, ui ) {
				$('#n_orden_reordenar').val(null);
				$('#n_orden_anterior_reordenar').val(null);
				$( this ).dialog( "close" );
			}
		});

		/********** Definicion de Grilla 2 **********/
		$("#detail_grid").jqGrid({
			colNames:datos_detail_grid.colNames(),
			colModel:datos_detail_grid.colModel(),
			pager: $('#detail_grid_pager'),
			caption:"Par&aacute;metros:" ,
			postData:datos_detail_grid.postData(),
			editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
			rownumbers: true,
			sortname:'n_orden',
			sortorder:'asc',
			height:400
		}).navGrid('#detail_grid_pager',
			{add:true, edit:true, del:true},
			{
				width:650,
				beforeInitData: function(formid) {
					if($('#main_grid').getGridParam('selrow')){
						//$('#id_menu_procedure',formid).val(id_menu_procedure);
						return true;
					}else{
						mostrar_cuadro('I', 'ADVERTENCIA', 'Seleccione una linea de Procedimientos o Funciones por favor', function(){}, function(){}, 400, 200);
						return false;
					}
				},
				beforeShowForm: defaultBeforeShowForm(function(formid) {
					$('#n_tabla_dato',formid).val(n_tabla_dato);
					$('#n_orden',formid).attr('readonly',true);
					$('#n_tabla_tipo_par').val('903');
					
					var sel = $('#main_grid').getGridParam('selrow');
					var tipo = $('#main_grid').getCell(sel,'d_object_type');
					
					if(tipo == 'FUNCTION'){
						$('#c_tipo',formid).val('IN');
						$('#tr_d_tipo_parametro',formid).hide();
					}
					else{
						$('#tr_d_tipo_parametro',formid).show();
					}
					
				}),
				onInitializeForm: defaultInitForm(function(formid) {
					$('#d_tipo_dato',formid).lupa_generica({
						titulos:['Id','Descripcion'],
						grid:[	{index:'c_codigo',width:150},
							{index:'d_descrip',width:150}],
						caption:'Lista de Tipo de Datos',
						sortname:'d_descrip',
						sortorder:'asc',
						filtros:['null'],
						campos:{c_codigo:'c_tipo_dato',d_descrip:'d_tipo_dato'},
						keyNav:true,
						foco:"#d_tipo_dato",
						searchCode: true,
						searchInput: '#c_tipo_dato'
					});

					$('#d_tipo_parametro',formid).lupa_generica({
						titulos:['Id','Descripcion'],
						grid:[	{index:'c_codigo',width:150},
							{index:'d_descrip',width:150}],
						caption:'Lista de Tipo Parametro',
						sortname:'c_codigo',
						sortorder:'asc',
						filtros:['null'],
						campos:{c_codigo:'c_tipo',d_descrip:'d_tipo_parametro'},
						keyNav:true
					});

					$('#c_tipo_dato',formid).change(function(){
						lupa_cod('c_tipo_dato','d_tipo_dato','48','', '', '');
					});
				}),
				onclickSubmit: function () { // Para evitar fallos en filas sin refresh
					ret = $(this).getGridParam('postData');
					ret.n_tabla_operador = 903;
					return ret;
				},
				closeAfterAdd:true
			},//edit
			{
				width:650,
				beforeInitData: function(formid) {
					if($('#main_grid').getGridParam('selrow')){
						$('#id_menu_procedure',formid).val(id_menu_procedure);
						return true;
					}else{
						mostrar_cuadro('I', 'ADVERTENCIA', 'Seleccione una linea de Procedimientos o Funciones por favor', function(){}, function(){}, 400, 200);
						return false;
					};
					$('#c_cotizador',formid).attr('readonly',true);
				},
				beforeShowForm: defaultBeforeShowForm(function(formid) {
					$('#n_tabla_dato',formid).val(n_tabla_dato);
					$('#n_orden',formid).attr('readonly',false);
					$('#n_tabla_tipo_par').val('903');
					
					var sel = $('#main_grid').getGridParam('selrow');
					var tipo = $('#main_grid').getCell(sel,'d_object_type');
					
					if(tipo == 'FUNCTION'){
						$('#c_tipo',formid).val('IN');
						$('#tr_d_tipo_parametro',formid).hide();
					}
					else{
						$('#c_tipo',formid).val(null);
						$('#tr_d_tipo_parametro',formid).show();
					}

					var sel = $('#main_grid').getGridParam('selrow');
					var v_id_menu_procedure = $('#main_grid').getCell(sel,'id_menu_procedure');

					if(v_id_menu_procedure!=''){
						$.ajax({
							url: '../Funciones/sugeridor_orden.php',
							type:"POST",
							data:{
								"id_menu_procedure":v_id_menu_procedure,										
								"tipo":"PROCEDURE"
							},
							success: function(data){
								var res = eval('('+data+')');
								if(res.resultado == 'OK'){
									$('#n_orden',formid).val(res.orden);
								}
								else{
									//mostrar_error(res.resultado);
								}
							}
						});			
					}	

				}),
				onInitializeForm: defaultInitForm(function(formid) {
					$('#d_tipo_dato',formid).lupa_generica({
						titulos:['Id','Descripcion'],
						grid:[	{index:'c_codigo',width:150},
							{index:'d_descrip',width:150}],
						caption:'Lista de Tipo de Datos',
						sortname:'d_descrip',
						sortorder:'asc',
						filtros:['null'],
						campos:{c_codigo:'c_tipo_dato',d_descrip:'d_tipo_dato'},
						keyNav:true,
						foco:"#d_tipo_dato",
						searchCode: true,
						searchInput: '#c_tipo_dato'
					});

					$('#d_tipo_parametro',formid).lupa_generica({
						titulos:['Id','Descripcion'],
						grid:[	{index:'c_codigo',width:150},
							{index:'d_descrip',width:150}],
						caption:'Lista de Tipo Parametro',
						sortname:'c_codigo',
						sortorder:'asc',
						filtros:['null'],
						campos:{c_codigo:'c_tipo',d_descrip:'d_tipo_parametro'},
						keyNav:true
					});

					$('#c_tipo_dato',formid).change(function(){
						lupa_cod('c_tipo_dato','d_tipo_dato','48','', '', '');
					});
				}),
				onclickSubmit: function () { // Para evitar fallos en filas sin refresh
					var id = $("#main_grid").getGridParam('selrow');
					var id_menu_procedure = $('#main_grid').getCell(id,'id_menu_procedure');
					ret = $(this).getGridParam('postData');
					ret.n_tabla_tipo_par = 903;
					ret.id_menu_procedure = id_menu_procedure;
					return ret;
				},
				closeAfterAdd:true,
			}, // add options
			{}, // del options
			{} // search options
		).navButtonAdd('#detail_grid_pager',{caption:"Tomar Par&aacute;metros&nbsp;&nbsp;&nbsp;",buttonicon:"ui-icon-arrowstop-1-s",
				onClickButton:function() {
					tomarCamposPrc();
				},position:"right", title:"Tomar Parametros del Procedimiento o Funcion", cursor:"pointer", id:'bt_tomar_campos_prc'})
			.navButtonAdd('#detail_grid_pager',{caption:"Eliminar todos",buttonicon:"ui-icon-trash",
				onClickButton:function() {
					mostrar_cuadro('C','Eliminar parametros','Est&aacute; apunto de eliminar todos los par&aacute;metros de esta llamada. Desea continuar?',function(){eliminarCampos()},function(){});					
				},position:"right", title:"Eliminar todos", cursor:"pointer", id:'bt_eliminar_todos'})
			.navButtonAdd('#detail_grid_pager',{caption:"Activar Orden&nbsp;&nbsp;&nbsp;",buttonicon:"ui-icon-arrow-2-n-s",
				onClickButton:function() {
					activarDragDropColumnas();
				},position:"right", title:"Activar Orden Draggable", cursor:"pointer", id:'bt_activar_orden'})
			.navButtonAdd('#detail_grid_pager',{caption:"Aplicar/Corregir&nbsp;&nbsp;&nbsp;",buttonicon:"ui-icon-disk",
				onClickButton:function() {
					guardarOrdenCampos();
				},position:"right", title:"Aplicar cambios y/o corregir orden.", cursor:"pointer", id:'bt_aplicar_cambios_orden'});
		$('#bt_aplicar_cambios_orden').hide();//por defecto está oculto

		html_form_copiar_prc();
	});

	function guardarOrdenCampos(){
		var id = $("#main_grid").getGridParam('selrow');
		if (id) {

			var p_rownumbers = '';
			var p_roworders = '';

			$('#detail_grid tbody.ui-sortable tr').each(function(){//recorre todos los registros
				if(!$(this).hasClass('jqgfirstrow')){
					var id_det = $(this).attr('id');
					p_roworders +=  $("#detail_grid").getCell(id_det,'n_orden')+';';//segunda columna
					p_rownumbers +=  $("#detail_grid").getCell(id_det,'rn')+';';//primer columna
				}
			});

			$.ajax({
				url: FUNCIONES_BASEPATH+'maestro_abm.php',
				type:"POST",
				data:{
					"id_menu":<?=$_POST['p_n_id_menu']?>,
					"n_orden":0,
					"p_id_menu_procedure":$("#main_grid").getCell(id,'id_menu_procedure'),//p_id_grid_query grid superior
					"p_rownumbers":p_rownumbers,
					"p_roworders":p_roworders,
				},

				success: function(data){
					var res = eval('('+data+')');
					onGuardarOrdenCampos( res );
				}
			});
		}else{
			mostrar_cuadro('E', 'ERROR', 'Debe seleccionar un registro en la grilla superior.');
		}
	}

	function onGuardarOrdenCampos( res ){
		if(res['resultado'] != 'OK'){
			mostrar_cuadro('E','Error', res['resultado'] );
		}else{
			$('#detail_grid').trigger('reloadGrid');
			desactivarDragDropColumnas();
		}
	}

	function desactivarDragDropColumnas(){
		$("#detail_grid").jqGrid('sortableRows', {disabled: true});
		$('#mensaje').hide(300);
		$('#bt_activar_orden').show();
		$('#bt_aplicar_cambios_orden').hide();
	}

	function activarDragDropColumnas(){
		$("#detail_grid").jqGrid('sortableRows', {disabled: false});

		$("#detail_grid").bind('sortstop', function(event, ui) {//evento p/ saber cdo mueve alguna columna
			//$('#bt_aplicar_cambios_orden').show();
		});

		$('#mensaje').show(300);
		$('#bt_activar_orden').hide();
		$('#bt_aplicar_cambios_orden').show();
	}

	function tomarCamposPrc(){
		var id = $("#main_grid").getGridParam('selrow');
		if (id) {
			mostrar_cuadro('C','Confirmar','Se insertar&aacute;n registros en procedures_parametros para el procedimiento o funci&oacute;n seleccionado/a.<br> No se sobreescribir&aacute; los par&aacute;metros existentes.',
				function(){
					$.ajax({
						url: FUNCIONES_BASEPATH+'maestro_abm.php',
						type:"POST",
						data:{
							"id_menu":<?=$_POST['p_n_id_menu']?>,
							"n_orden":1,
							"oper":'add',
							"p_id_menu_procedure":$("#main_grid").getCell(id,'id_menu_procedure')
						},

						success: function(data){
							var res = eval('('+data+')');
							onTomarCamposPrc( res );
						}
					});
				}
				,function(){}
			);


		}else{
			mostrar_cuadro('E','Error','Debe seleccionar un registro de la grilla superior.');
		}
	}

	function eliminarCampos(){
		var id = $("#main_grid").getGridParam('selrow');
		$('#main').procOverlay({visible:true});
		$.ajax({
			type:'POST',
			url: FUNCIONES_BASEPATH+"maestro_abm.php",
			data: {
				"p_id_menu_procedure":$("#main_grid").getCell(id,'id_menu_procedure'),
				"id_menu":"<?=$_POST['p_n_id_menu']?>",
				"n_orden":4
			},
			success: function( data ) {
				$('#main').procOverlay({visible:false});
				var res = eval('('+data+')');
				if(res.resultado == 'OK'){
					$('#detail_grid').trigger('reloadGrid');
				}
				else
					mostrar_error(res.resultado);
			}
		});		
	}

	function onTomarCamposPrc( res ){
		if(res['resultado'] != 'OK'){
			mostrar_cuadro('E','Error', res['resultado'] );
		}else{
			$('#detail_grid').trigger('reloadGrid');
		}
	}

	function createProcedureStatement(id_menu_procedure, tipo){
		$('#main').procOverlay({visible:true});
		$.ajax({
			type:'POST',
			url: FUNCIONES_BASEPATH+"maestro_abm.php",
			data: {
				"p_id_menu_procedure":id_menu_procedure,
				"id_menu":"<?=$_POST['p_n_id_menu']?>",
				"n_orden":2,
				"p_tipo_llamada":tipo
			},
			success: function( data ) {
				$('#main').procOverlay({visible:false});
				var res = eval('('+data+')');
				if(res.resultado == 'OK'){
					openFrmProcStatement();
					$('#dialog_proc_statement').dialog('open');

					$('#frm_query_grid #d_proc_statement').val(res.p_d_proc_statement);
				}
				else
					mostrar_error(res.resultado);
			}
		});
	}

	function openFrmProcStatement(){
		$('#dialog_proc_statement').dialog(
			{
				'width':500,
				'modal':true,
				buttons: [
					{text: "Volver", click: function() {
						$(this).dialog("close");
					}}
				]}
		);
	}

	function html_form_copiar_prc(){

		$("#dialog_copiar_prc").dialog({
			autoOpen: false,
			modal: true,
			width: 550,
			beforeClose: function( event, ui ) {
				$(":input","#form_copiar_prc").val(null);
			}
		});

		$("#id_menu_d").mask('99999999');
		$("#n_orden_d").mask('99999999');
		$("#id_menu_h").mask('99999999');
		$("#n_orden_h").mask('99999999');

		$("#form_copiar_prc p button").button({
			icons: {primary: 'ui-icon-search'},
			text: true
		});

		$('#form_copiar_prc #btn_guardar_prc').button({
			text:true,
			label:'Copiar Objeto',
			icons: {
				primary: "ui-icon-copy"
			}
		});

		$('#form_copiar_prc #btn_cancelar_prc').button({
			text:true,
			label:'Cancelar',
			icons: {
				primary: "ui-icon-close"
			}
		});

		$('#form_copiar_prc #btn_cancelar_prc').click(function(){
			$("#dialog_copiar_prc").dialog("close");
		});

		$("#btn_lov_menu_d, #d_menu_d").lupa_generica({
			id_lista:<?=fun_id_lista('LISTADO DE MENU ITEM');?>,
			titulos:['C&oacute;digo','Descripci&oacute;n'],
			grid:[{index:'c_codigo',width:100},
				{index:'d_descrip',width:250}],
			caption:'Lista de Menues',
			sortname:'d_descrip',
			sortorder:'asc',
			campos:{c_codigo:'id_menu_d',d_descrip:'d_menu_d'},
			keyNav:true,
			searchCode: true,
			searchInput: '#id_menu_d',
			limpiarCod:true,
			onClose:function(){
				$("#id_menu_procedure_d").val(null);
				$("#d_procedimiento_d").val(null);
				$("#id_menu_procedure_h").val(null);
				$("#d_procedimiento_h").val(null);
			}
		});

		$("#btn_lov_menu_h, #d_menu_h").lupa_generica({
			id_lista:<?=fun_id_lista('LISTADO DE MENU ITEM');?>,
			titulos:['C&oacute;digo','Descripci&oacute;n'],
			grid:[{index:'c_codigo',width:100},
				{index:'d_descrip',width:250}],
			caption:'Lista de Menues',
			sortname:'d_descrip',
			sortorder:'asc',
			campos:{c_codigo:'id_menu_h',d_descrip:'d_menu_h'},
			keyNav:true,
			searchCode: true,
			searchInput: '#id_menu_h',
			limpiarCod:true
		});

		$("#btn_lov_procedure_d, #d_procedimiento_d").lupa_generica({
			id_lista:<?=fun_id_lista('LISTA DE MENU-PROCEDIMIENTOS');?>,
			titulos:['C&oacute;digo','Nro. Orden','Descripci&oacute;n'],
			grid:[{index:'id_menu_procedure',width:100,hidden:true},
				{index:'c_codigo',width:100},
				{index:'d_descrip',width:350}],
			caption:'Lista de Menu-Procedimientos',
			sortname:'d_descrip',
			sortorder:'asc',
			filtros:['#id_menu_d'],
			filtroNull:true,
			campos:{id_menu_procedure:'id_menu_procedure_d', c_codigo:'n_orden_d', d_descrip:'d_procedimiento_d'},
			keyNav:true,
			searchCode: true,
			searchInput: '#n_orden_d',
			limpiarCod:true,
			onClose:function(){
				$("#n_orden_h").val($("#n_orden_d").val());
				$("#d_procedimiento_h").val($("#d_procedimiento_d").val());
			}
		});

		$('#form_copiar_prc #btn_guardar_prc').click(function(){
			if($('#form_copiar_prc').validationEngine('validate')){
				var v_id_menu_d = $("#id_menu_d").val();
				var v_id_menu_procedure_d = $("#id_menu_procedure_d").val();
				var v_id_menu_h = $("#id_menu_h").val();
				var v_n_orden_h = $("#n_orden_h").val();
				$('#main').procOverlay({visible:true});
				$.ajax({
					type:'POST',
					url: FUNCIONES_BASEPATH+'maestro_abm.php',
					data: {
						"id_menu":<?=$_POST['p_n_id_menu'];?>,
						'n_orden':3,
						'p_id_menu_desde':v_id_menu_d,
						'p_id_menu_procedure_desde':v_id_menu_procedure_d,
						'p_id_menu_hasta':v_id_menu_h,
						'p_n_orden_hasta':v_n_orden_h
					},
					dataType:'json',
					success: function( data ) {
						$('#main').procOverlay({visible:false});
						if(data.resultado == 'OK'){
							$("#dialog_copiar_prc").dialog("close");
							$('#main_grid').trigger('reloadGrid');
						}else{
							mostrar_cuadro('E', 'Error', data.resultado.replace('#',''));
						}
					}
				});
			}
		});
	}
</script>

<?php
	require_once(INTRANET."footer.php");
?>
