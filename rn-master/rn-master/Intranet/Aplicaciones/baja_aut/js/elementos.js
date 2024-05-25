function init_elementos() {

	if(v_modo == 'D'){
		$('#btn_ejecutar').html(
			"<span class=\"glyphicon glyphicon-floppy-save\" aria-hidden=\"true\"></span>  Confirmar Baja\n"
		);
	}
	else {
		$('#btn_imprimir').hide();
	}

	let caption_btn_baja = 'Baja Provisoria';
	if (v_modo == 'D'){
		caption_btn_baja = 'Baja Definitiva'
	}

	$("#main_grid").jqGrid({
		colNames:datos_main_grid.colNames(),
		colModel:datos_main_grid.colModel(),
		pager: $('#main_grid_pager'),
		caption:"Automotores" ,
		postData:datos_main_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
		autowidth: false,
		height:160,
		loadComplete:function(data){
			if($('#main_grid').getGridParam('postData').m_autoquery == 'S'){
				if($(this).jqGrid('getGridParam','records') == 0){
					mostrar_cuadro('I', 'Atención', 'No se han encontrado registros para la consulta realizada.');
				}else{
					jQuery("#main_grid").setSelection($('#main_grid tbody tr')[1]['id'], true);
				}
			}
		},
		onSelectRow: function(id) {
			/*$('#div_responsables').show();*/
			setea_parametros('#responsables_grid',{
				':d_dominio': $('#main_grid').getCell(id,'d_objeto_hecho'),
				':c_tributo': $('#main_grid').getCell(id,'c_tributo') });
		}
	}).navGrid('#main_grid_pager',{add:false, edit:false, del:false});

	if (!v_modo){
		$("#main_grid").jqGrid('hideCol',['f_cese_provisorio','c_motivo_cese_prov','d_motivo_cese_prov','c_delegacion','d_delegacion']);
	}

	$("#responsables_grid").jqGrid({
		colNames: datos_responsables_grid.colNames(),
		colModel: datos_responsables_grid.colModel(),
		pager: $('#responsables_grid_pager'),
		caption: "Responsables",
		postData: datos_responsables_grid.postData(),
		autowidth: false,
		width: 1250,
		height: 90,
		shrinkToFit: true
	}).navGrid('#responsables_grid_pager',{add:false, edit:false, del:false});

	// ------------------ LUPAS ---------------------

	$("#lupa_c_tipo_documento").lupa_generica({
		id_lista:10781,
		titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_dato',width:100},
			{index:'d_dato',width:350}],
		caption:'Tipos de Documento',
		sortname:'c_dato',
		sortorder:'asc',
		campos:{c_dato:'c_tipo_documento',d_dato:'d_tipo_documento'},
		searchCode:true,
		searchInput: '#c_tipo_documento',
		keyNav:true,
		exactField: 'c_dato'
	});

	$("#lupa_dominio").lupa_generica({
		id_lista: 10892,
		titulos: ['Dominio', 'Dominio Anterior'],
		grid: [{index: 'd_patente', width: 200},
			{index: 'd_patente_vieja', width: 200}],
		caption: 'Dominios',
		campos: {d_patente: 'd_dominio'},
		filtros: ['#d_dominio', '#id_contribuyente'],
		filtroNull: [true, true],
		filtrosTitulos: ['Dominio']
	});

	$("#lupa_dominio_ant").lupa_generica({
		id_lista: 10893,
		titulos: ['Dominio', 'Dominio Anterior'],
		grid: [{index: 'd_patente', width: 200},
			{index: 'd_patente_vieja', width: 200}],
		caption: 'Dominios Anteriores',
		campos: {d_patente_vieja: 'd_dom_ant'},
		filtros: ['#d_dom_ant', '#id_contribuyente'],
		filtrosNulos: [true, true],
		filtrosTitulos: ['Dominio Anterior']
	});

	$("#lupa_prov_oficina").lupa_generica({
		id_lista: 10894,
		titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_dato',width:100},
			{index:'d_dato',width:350}],
		caption:'Delegaciones',
		sortname:'c_dato',
		sortorder:'asc',
		campos:{c_dato:'c_delegacion',d_dato:'d_delegacion'},
		searchCode:true,
		searchInput: '#c_delegacion',
		limpiarCod: true,
		keyNav:true,
		exactField: 'c_dato',
		onClose: function(){
			if ($('#c_delegacion').val()){
				let delegacion_rad = $('#main_grid').getCell($("#main_grid").getGridParam('selrow'), 'c_delegacion_rad');
				if ($('#c_delegacion').val() != delegacion_rad){
					mostrar_cuadro('I','Atención','La oficina elegida es distinta a la oficina de radicación del dominio '+delegacion_rad);
				}
			}
		}
	});

	$("#lupa_motivo_baja").lupa_generica({
		id_lista: 10895,
		titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_dato',width:100},
			{index:'d_dato',width:350}],
		caption:'Motivos de baja',
		sortname:'c_dato',
		sortorder:'asc',
		campos:{c_dato:'c_motivo',d_dato:'d_motivo'},
		searchCode:true,
		searchInput: '#c_motivo',
		limpiarCod: true,
		keyNav:true,
		exactField: 'c_dato'
	});
}