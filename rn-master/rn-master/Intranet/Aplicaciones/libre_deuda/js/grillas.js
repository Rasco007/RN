function crea_grillas(id_certificado){

	var datos_grid_obligaciones = new GridParam({
        id_menu: id_menu_grillas,
        n_grid: 0,
        m_autoquery: 'S',
        param: {':id_certificado': id_certificado}
    });

    var datos_grid_gest_judicial = new GridParam({
        id_menu: id_menu_grillas,
        n_grid: 1,
        m_autoquery: 'S',
        param: {':id_certificado': id_certificado}
    });

	$("#grid_obligaciones").jqGrid({
		colNames:datos_grid_obligaciones.colNames(),
		colModel:datos_grid_obligaciones.colModel(),
		autowidth: false,
		pager: $('#grid_obligaciones_pager'),
		postData: datos_grid_obligaciones.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
	}).navGrid('#grid_obligaciones_pager',{add:false, edit:false, del:false});

	$("#grid_gest_judicial").jqGrid({
		colNames:datos_grid_gest_judicial.colNames(),
		colModel:datos_grid_gest_judicial.colModel(),
		autowidth: false,
		pager: $('#grid_gest_judicial_pager'),
		postData: datos_grid_gest_judicial.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
	}).navGrid('#grid_gest_judicial_pager',{add:false, edit:false, del:false});
}