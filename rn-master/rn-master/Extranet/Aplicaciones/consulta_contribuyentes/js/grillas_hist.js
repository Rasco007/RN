function crea_grilla_cont_hist(){
	$("#grid_datos_cont_hist").jqGrid({
		colNames:datos_cont_hist_grid.colNames(),
		colModel:datos_cont_hist_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_cont_hist_pager'),
		caption:"Movimientos Realizados:",
		postData: datos_cont_hist_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
		sortname:"f_altaaud",
		sortorder:"desc"
	}).navGrid('#grid_datos_cont_hist_pager',{add:false, edit:false, del:false});
}

function crea_grilla_dom_hist(){
	$("#grid_datos_dom_hist").jqGrid({
		colNames:datos_dom_hist_grid.colNames(),
		colModel:datos_dom_hist_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_dom_hist_pager'),
		caption:"Movimientos Realizados:",
		postData: datos_dom_hist_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
		sortname:"f_altaaud",
		sortorder:"desc"
	}).navGrid('#grid_datos_dom_hist_pager',{add:false, edit:false, del:false});
}

function crea_grilla_tel_hist(){
	$("#grid_datos_tel_hist").jqGrid({
		colNames:datos_tel_hist_grid.colNames(),
		colModel:datos_tel_hist_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_tel_hist_pager'),
		caption:"Movimientos Realizados:",
		postData: datos_tel_hist_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
		sortname:"f_altaaud",
		sortorder:"desc"
	}).navGrid('#grid_datos_tel_hist_pager',{add:false, edit:false, del:false});
}

function crea_grilla_pf_hist(){
	$("#grid_datos_pf_hist").jqGrid({
		colNames:datos_pf_hist_grid.colNames(),
		colModel:datos_pf_hist_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_pf_hist_pager'),
		caption:"Movimientos Realizados:",
		postData: datos_pf_hist_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
		sortname:"f_altaaud",
		sortorder:"desc"
	}).navGrid('#grid_datos_pf_hist_pager',{add:false, edit:false, del:false});
}

function crea_grilla_pj_hist(){
	$("#grid_datos_pj_hist").jqGrid({
		colNames:datos_pj_hist_grid.colNames(),
		colModel:datos_pj_hist_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_pj_hist_pager'),
		caption:"Movimientos Realizados:",
		postData: datos_pj_hist_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
		sortname:"f_altaaud",
		sortorder:"desc"
	}).navGrid('#grid_datos_pj_hist_pager',{add:false, edit:false, del:false});
}

function crea_grilla_trib_hist(){
	$("#grid_datos_trib_hist").jqGrid({
		colNames:datos_trib_hist_grid.colNames(),
		colModel:datos_trib_hist_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_trib_hist_pager'),
		caption:"Movimientos Realizados:",
		postData: datos_trib_hist_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
		sortname:"f_altaaud",
		sortorder:"desc"
	}).navGrid('#grid_datos_trib_hist_pager',{add:false, edit:false, del:false});
}

function crea_grilla_act_hist(){
	$("#grid_datos_act_hist").jqGrid({
		colNames:datos_act_hist_grid.colNames(),
		colModel:datos_act_hist_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_act_hist_pager'),
		caption:"Movimientos Realizados:",
		postData: datos_act_hist_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
		sortname:"f_altaaud",
		sortorder:"desc"
	}).navGrid('#grid_datos_act_hist_pager',{add:false, edit:false, del:false});
}

function crea_grilla_reg_hist(){
	$("#grid_datos_reg_hist").jqGrid({
		colNames:datos_reg_hist_grid.colNames(),
		colModel:datos_reg_hist_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_reg_hist_pager'),
		caption:"Movimientos Realizados:",
		postData: datos_reg_hist_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
		//sortname:"f_altaaud",
		sortname:"f_vig_desde",
		sortorder:"desc"
	}).navGrid('#grid_datos_reg_hist_pager',{add:false, edit:false, del:false});
}

function crea_grilla_est_hist(){
	$("#grid_datos_est_hist").jqGrid({
		colNames:datos_est_hist_grid.colNames(),
		colModel:datos_est_hist_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_est_hist_pager'),
		caption:"Movimientos Realizados:",
		postData: datos_est_hist_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
		sortname:"f_altaaud",
		sortorder:"desc"
	}).navGrid('#grid_datos_est_hist_pager',{add:false, edit:false, del:false});
}

function crea_grilla_unidades_hist(){
	$("#grid_datos_unidades_hist").jqGrid({
		colNames:datos_unidades_hist_grid.colNames(),
		colModel:datos_unidades_hist_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_unidades_hist_pager'),
		caption:"Movimientos Realizados:",
		postData: datos_unidades_hist_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
		sortname:"f_altaaud",
		sortorder:"desc"
	}).navGrid('#grid_datos_unidades_hist_pager',{add:false, edit:false, del:false});
}