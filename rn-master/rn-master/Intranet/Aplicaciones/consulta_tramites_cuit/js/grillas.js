function inicializarGrillas(){
	$("#datos_tramite_grid").jqGrid({
		colNames:datos_tramite_grid.colNames(),
		colModel:datos_tramite_grid.colModel(),
		pager: $('#datos_tramite_grid_pager'),
		caption:"Trámites" ,
		postData:datos_tramite_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
		autowidth: false,
		height:135,
		loadComplete:function(){
		},
		gridComplete: function() {
		},
		onSelectRow: function(id) {
		}
	}).navGrid('#datos_tramite_grid_pager',
		{add:false, edit:false, del:false}, //options
		{},//edit,
		{},//alta
		{},//del
		{}//search
	);

	$("#datos_grid").jqGrid({
		colNames:datos_grid.colNames(),
		colModel:datos_grid.colModel(),
		pager: $('#datos_grid_pager'),
		postData:datos_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
		autowidth: false,
		height:150,
		rowNum: 50,
		gridview: false,
		onSelectRow: function(id) {

		}
	}).navGrid('#datos_grid_pager',
		{add:false, edit:false, del:false}, //options
		{ }, // edit options
		{ }, // add options
		{ }, // del options
		{ } // search options
	);

	$("#actividades_grid").jqGrid({
		colNames:actividades_grid.colNames(),
		colModel:actividades_grid.colModel(),
		pager: $('#actividades_grid_pager'),
		postData:actividades_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
		autowidth: false,
		height:150,
		rowNum: 50,
		gridview: false,
		onSelectRow: function(id) {

		}
	}).navGrid('#actividades_grid_pager',
		{add:false, edit:false, del:false}, //options
		{ }, // edit options
		{ }, // add options
		{ }, // del options
		{ } // search options
	);

	$("#jurisdicciones_grid").jqGrid({
		colNames:jurisdicciones_grid.colNames(),
		colModel:jurisdicciones_grid.colModel(),
		pager: $('#jurisdicciones_grid_pager'),
		postData:jurisdicciones_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
		autowidth: false,
		height:150,
		rowNum: 50,
		gridview: false,
		onSelectRow: function(id) {

		}
	}).navGrid('#jurisdicciones_grid_pager',
		{add:false, edit:false, del:false}, //options
		{ }, // edit options
		{ }, // add options
		{ }, // del options
		{ } // search options
	);

}

function crea_grilla_datos(){
	var datos_tramite_grid = new GridParam({
		id_menu: n_id_menu,
		n_grid:3,
		m_autoquery:'S',
		param: {':p_c_cuit': limpia_cuit($("#cuit_transaccion").val())}
	});

	$("#datos_tramite_grid").jqGrid({
		colNames:datos_tramite_grid.colNames(),
		colModel:datos_tramite_grid.colModel(),
		pager: $('#datos_tramite_grid_pager'),
		caption:"Trámites" ,
		postData:datos_tramite_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
		autowidth: false,
		height:135,
		loadComplete:function(){
		},
		gridComplete: function() {
			document.getElementById("bt_display_filter_toolbar_datos_tramite_grid_pager").style.display = "none";
			$(window).resize();

		},
		onSelectRow: function(id) {
			$('#id_transaccion').val($('#datos_tramite_grid').getCell(id, 'id_transaccion'));
			$('#id_tipotransacc').val($('#datos_tramite_grid').getCell(id, 'id_tipotransacc'));
			$('#d_tipotransacc').val($('#datos_tramite_grid').getCell(id, 'd_tipotransacc'));
			$('#n_tramite').val($('#datos_tramite_grid').getCell(id, 'n_tramite'));
			$('#id_sistema').val($('#datos_tramite_grid').getCell(id, 'id_sistema'));
			$('#d_sistema').val($('#datos_tramite_grid').getCell(id, 'd_sistema'));
			$('#cuit_transaccion').val($('#datos_tramite_grid').getCell(id, 'cuit_transaccion')).mask("99-99999999-9");
			$('#id_estadotransacc').val($('#datos_tramite_grid').getCell(id, 'id_estadotransacc'));
			$('#id_jurisdiccion_sede').val($('#datos_tramite_grid').getCell(id, 'id_jurisdiccion_sede'));
			$('#fecha_transaccion').val($('#datos_tramite_grid').getCell(id, 'fecha_transaccion'));
			$('#hora_transaccion').val($('#datos_tramite_grid').getCell(id, 'hora_transaccion'));
			$('#c_resultado_alta').val($('#datos_tramite_grid').getCell(id, 'c_resultado_alta'));
			$('#d_resultado_alta').val($('#datos_tramite_grid').getCell(id, 'd_resultado_alta'));
			$('#f_siat').val($('#datos_tramite_grid').getCell(id, 'f_siat'));
			$('#d_error_proceso').val($('#datos_tramite_grid').getCell(id, 'd_error_proceso'));

			filtros_no_nativos_ar = [];
			filtros_arr_main = [];

			if($('#id_transaccion').val() != ''){
				filtros_arr_main.push('Transacción: '+ $('#id_transaccion').val());
			}
			if($('#n_tramite').val() != ''){
				filtros_arr_main.push('Nro. de Trámite: '+ $('#n_tramite').val());
			}
			if($('#id_sistema').val() != ''){
				filtros_arr_main.push('Sistema: '+ $('#id_sistema').val());
			}
			if($('#d_sistema').val() != ''){
				filtros_arr_main.push('Desc. Sistema: '+ $('#d_sistema').val());
			}
			if($('#cuit_transaccion').val() != ''){
				filtros_arr_main.push('CUIT: '+ $('#cuit_transaccion').val());
			}

			filtros_no_nativos_ar['datos_grid'] = filtros_arr_main;
			filtros_no_nativos_ar['actividades_grid'] = filtros_arr_main;
			filtros_no_nativos_ar['jurisdicciones_grid'] = filtros_arr_main;

			setea_parametros('#datos_grid',{':id_transaccion':$('#datos_tramite_grid').getCell(id, 'id_transaccion')});
			setea_parametros('#actividades_grid',{':id_transaccion':$('#datos_tramite_grid').getCell(id, 'id_transaccion')});
			setea_parametros('#jurisdicciones_grid',{':id_transaccion':$('#datos_tramite_grid').getCell(id, 'id_transaccion')});
			document.getElementById('tabs_grid').style.display="block";
			$(window).resize();

			completar_tab_contrib($('#datos_tramite_grid').getCell(id, 'id_transaccion'));
		}
	}).navGrid('#datos_tramite_grid_pager',
		{add:false, edit:false, del:false}, //options
		{},//edit,
		{},//alta
		{},//del
		{}//search
	);
}