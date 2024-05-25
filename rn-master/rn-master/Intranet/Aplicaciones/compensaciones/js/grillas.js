function inicializarGrillas() {

	$("#creditos_grid").jqGrid({
		colNames:datos_creditos_grid.colNames(),
		colModel:datos_creditos_grid.colModel(),
		postData:datos_creditos_grid.postData(),
		pager: $('#creditos_grid_pager'),
		caption:'',
		postData: datos_creditos_grid.postData(),
		editurl: 'clientArray',
		autowidth:false,
		width: 970,
		height:115,
		sortname: 'n_secuencia',
		sortorder: 'asc',
		gridview: false,
		onCellSelect: function(row,col,dato){
			if (v_proceso == 'S'){
				mostrar_error('La compensación fue aplicada, debe actualizar los créditos');
			}else if (col == 11){
			 if (parse(dato) > 0) { editableRow(row  ,'creditos_grid');	}}
		},
		ondblClickRow:function(rowid){
			if (v_proceso == 'S'){
				mostrar_error('La compensación fue aplicada, debe actualizar los créditos');
			}else {
				if(vg_lote_deb){
					$('#btn_limpiar_deuda').click();
				}
				$.ajax({
					type: 'POST',
					url: "compensaciones/php/validaciones.php",
					data: {
						p_oper:'dblClick',
						lote: $('#creditos_grid').getCell(rowid,'n_lote'),
						secuencia: $('#creditos_grid').getCell(rowid,'n_secuencia')
					},
					dataType: 'json',
					success: function(ret) {
						if (ret.resultado == 'OK') {
							console.log('antes btn');
							$('#creditos_grid').trigger("reloadGrid");

							$('#btn_buscar_deuda').click();
						} else {
							mostrar_error(ret.resultado);
						}
					}
				});
			}
		},
		afterInsertRow: function(rowid, rowData, rowelem) {
			console.log('afterInsertRow');
			if(parse(rowData.n_importe) > 0){
				$(this).jqGrid('setCell',rowid,"n_importe","",{color:'red','font-weight':'bold'});
			}else {
				$(this).jqGrid('setCell',rowid,"n_importe","",{color:'green','font-weight':'bold'});
			}
		}
	}).navGrid('#creditos_grid_pager',
		{add:false, edit:false, del:false}, //options
		{},//edit
		{},//alta
		{},//alta
		{}//baja
	);


	//$('#creditos_grid').focusout(function(){
	//	console.log('ejecutando focusout');
	//	if (editando == 'S'){
	//		$('#creditos_grid').trigger("reloadGrid");
	//	}
	//});




	$("#deudas_grid").jqGrid({
		colNames:datos_deudas_grid.colNames(),
		colModel:datos_deudas_grid.colModel(),
		pager: $('#deudas_grid_pager'),
		postData:datos_deudas_grid.postData(),
		autowidth:false,
		width: 970,
		height:105,
		multiSort:true,
		sortname: 'n_secuencia',
		sortorder: 'asc',
		gridview: false,
		editurl: 'clientArray',
		ondblClickRow:function(rowid){
			$.ajax({
				type: 'POST',
				url: "compensaciones/php/validaciones.php",
				data: {
					p_oper:'dblClickDeb',
					lote: $('#deudas_grid').getCell(rowid,'n_lote'),
					secuencia: $('#deudas_grid').getCell(rowid,'n_secuencia')
				},
				dataType: 'json',
				success: function(ret) {
					if (ret.resultado == 'OK') {
						$('#deudas_grid').trigger("reloadGrid");
					} else {
						mostrar_error(ret.resultado);
					}
				}
			});
		},
		onCellSelect: function(row,col,dato){
			if (col == 12){
				if (parse(dato) > 0) {
					editableRow(row  ,'deudas_grid');
				}}
		},
		afterInsertRow: function(rowid, rowData, rowelem) {
			console.log('afterInsertRow');
			if(parse(rowData.n_importe) > 0){
				$(this).jqGrid('setCell',rowid,"n_importe","",{color:'red','font-weight':'bold'});
			}else {
				$(this).jqGrid('setCell',rowid,"n_importe","",{color:'green','font-weight':'bold'});
			}
		}
	}).navGrid('#deudas_grid_pager',
		{add:false, edit:false, del:false}, //options
		{
			closeAfterAdd:true
		},//edit
		{},//alta
		{},//baja
		{}
	);


}