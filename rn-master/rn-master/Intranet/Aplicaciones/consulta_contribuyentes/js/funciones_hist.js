function crea_botones_historicos(){
	$("#btn_reporte").click(function(){
	    btn_reporte();
	});
	$("#btn_cont_hist").click(function(){
	    btn_cont_hist();
	});
	$("#btn_pers_fisica_hist").click(function(){
	    btn_pers_fisica_hist();
	});
	$("#btn_pers_juridica_hist").click(function(){
	    btn_pers_juridica_hist();
	});
}

function btn_reporte(){
	$('#main').procOverlay({visible:true});
	llamar_report('CONTL_037',
		'p_id_contribuyente|'+$("#id_contribuyente").val());
	$('#main').procOverlay({visible:false});
}

function btn_cont_hist(){
	$('#main').procOverlay({visible:true});

	datos_cont_hist_grid = new GridParam({
        id_menu: n_id_menu,
        n_grid: 11,
        m_autoquery: 'S',
        param: {':id_contribuyente': $("#id_contribuyente").val()}
    });

	crea_grilla_cont_hist();
	setea_parametros('#grid_datos_cont_hist',{':id_contribuyente': $("#id_contribuyente").val()},'S');

	abrir_modal("#modal_cont_hist");
	$('#main').procOverlay({visible:false});
}

function btn_dom_hist(){
	$('#main').procOverlay({visible:true});

	var id = $("#grid_datos_domicilio").getGridParam('selrow');
    if (id) {
		datos_dom_hist_grid = new GridParam({
	        id_menu: n_id_menu,
	        n_grid: 12,
	        m_autoquery: 'S',
	        param: {':id_contribuyente': $("#id_contribuyente").val(),
	    		':c_tipo_domicilio': $("#grid_datos_domicilio").getCell(id,'c_tipo_domicilio')}
	    });

		crea_grilla_dom_hist();
		setea_parametros('#grid_datos_dom_hist', {
			':id_contribuyente': $("#id_contribuyente").val(),
			':c_tipo_domicilio': $("#grid_datos_domicilio").getCell(id, 'c_tipo_domicilio')
		}, 'S');

		abrir_modal("#modal_dom_hist");
    }else {
        mostrar_validacion('Debe seleccionar un registro de la grilla.');
    }
	$('#main').procOverlay({visible:false});
}

function btn_tel_hist(){
	$('#main').procOverlay({visible:true});

	var id = $("#grid_datos_telefono").getGridParam('selrow');
    if (id) {
		datos_tel_hist_grid = new GridParam({
	        id_menu: n_id_menu,
	        n_grid: 13,
	        m_autoquery: 'S',
	        param: {':id_contribuyente': $("#id_contribuyente").val(),
	    		':c_tipo_telefono': $("#grid_datos_telefono").getCell(id,'c_tipo_telefono')}
	    });

		crea_grilla_tel_hist();
		setea_parametros('#grid_datos_tel_hist', {
			':id_contribuyente': $("#id_contribuyente").val(),
			':c_tipo_telefono': $("#grid_datos_telefono").getCell(id, 'c_tipo_telefono')
		}, 'S');

		abrir_modal("#modal_tel_hist");
    }else {
        mostrar_validacion('Debe seleccionar un registro de la grilla.');
    }
	$('#main').procOverlay({visible:false});
}

function btn_pers_fisica_hist(){
	$('#main').procOverlay({visible:true});

	datos_pf_hist_grid = new GridParam({
        id_menu: n_id_menu,
        n_grid: 14,
        m_autoquery: 'S',
        param: {':id_contribuyente': $("#id_contribuyente").val()}
    });

	crea_grilla_pf_hist();
	setea_parametros('#grid_datos_pf_hist',{':id_contribuyente': $("#id_contribuyente").val()},'S');

	abrir_modal("#modal_pf_hist");
	$('#main').procOverlay({visible:false});
}

function btn_pers_juridica_hist(){
	$('#main').procOverlay({visible:true});

	datos_pj_hist_grid = new GridParam({
        id_menu: n_id_menu,
        n_grid: 15,
        m_autoquery: 'S',
        param: {':id_contribuyente': $("#id_contribuyente").val()}
    });

	crea_grilla_pj_hist();
	setea_parametros('#grid_datos_pj_hist',{':id_contribuyente': $("#id_contribuyente").val()},'S');

	abrir_modal("#modal_pj_hist");
	$('#main').procOverlay({visible:false});
}

function btn_trib_hist(){
	$('#main').procOverlay({visible:true});

	var id = $("#grid_datos_tributos").getGridParam('selrow');
    if (id) {
		datos_trib_hist_grid = new GridParam({
	        id_menu: n_id_menu,
	        n_grid: 16,
	        m_autoquery: 'S',
	        param: {':id_contribuyente': $("#id_contribuyente").val(),
	    		':c_tributo': $("#grid_datos_tributos").getCell(id,'c_tributo'),
	    		':d_objeto_hecho': $("#grid_datos_tributos").getCell(id,'d_objeto_hecho')}
	    });

		crea_grilla_trib_hist();
		setea_parametros('#grid_datos_trib_hist', {
			':id_contribuyente': $("#id_contribuyente").val(),
			':c_tributo': $("#grid_datos_tributos").getCell(id, 'c_tributo'),
			':d_objeto_hecho': $("#grid_datos_tributos").getCell(id, 'd_objeto_hecho')
		}, 'S');

		abrir_modal("#modal_trib_hist");
    }else {
        mostrar_validacion('Debe seleccionar un registro de la grilla.');
    }
	$('#main').procOverlay({visible:false});
}

function btn_act_hist(){
	$('#main').procOverlay({visible:true});

	var id = $("#grid_datos_tributos").getGridParam('selrow');
    if (id) {
		reg_hist_grid = new GridParam({
	        id_menu: n_id_menu,
	        n_grid: 18,
	        m_autoquery: 'S',
	        param: {':id_contribuyente': $("#id_contribuyente").val(),
	    		':c_tributo': $("#grid_datos_tributos").getCell(id,'c_tributo'),
	    		':c_tipo_imponible': $("#grid_datos_tributos").getCell(id,'c_tipo_imponible'),
	    		':d_objeto_hecho': $("#grid_datos_tributos").getCell(id,'d_objeto_hecho')}
	    });

		crea_grilla_act_hist();
		setea_parametros('#grid_datos_act_hist', {
			':id_contribuyente': $("#id_contribuyente").val(),
			':c_tributo': $("#grid_datos_tributos").getCell(id, 'c_tributo'),
			':c_tipo_imponible': $("#grid_datos_tributos").getCell(id, 'c_tipo_imponible'),
			':d_objeto_hecho': $("#grid_datos_tributos").getCell(id, 'd_objeto_hecho')
		}, 'S');

		abrir_modal("#modal_act_hist");
    }else {
        mostrar_validacion('Debe seleccionar un registro de la grilla.');
    }
	$('#main').procOverlay({visible:false});
}

function btn_reg_historico(){
	$('#main').procOverlay({visible:true});

	var id = $("#grid_datos_tributos").getGridParam('selrow');
	if (id) {
		datos_reg_historico_grid = new GridParam({
			id_menu: n_id_menu,
			n_grid: 27,
			m_autoquery: 'S',
			param: {':id_contribuyente': $("#id_contribuyente").val(),
				':c_tributo': $("#grid_datos_tributos").getCell(id,'c_tributo'),
				':c_tipo_imponible': $("#grid_datos_tributos").getCell(id,'c_tipo_imponible'),
				':d_objeto_hecho': $("#grid_datos_tributos").getCell(id,'d_objeto_hecho')}
		});

		crea_grilla_reg_historico();

		setea_parametros('#grid_datos_reg_historico', {
			':id_contribuyente': $("#id_contribuyente").val(),
			':c_tributo': $("#grid_datos_tributos").getCell(id, 'c_tributo'),
			':c_tipo_imponible': $("#grid_datos_tributos").getCell(id, 'c_tipo_imponible'),
			':d_objeto_hecho': $("#grid_datos_tributos").getCell(id, 'd_objeto_hecho')
		}, 'S');

		abrir_modal("#modal_reg_historico");
	}else {
		mostrar_validacion('Debe seleccionar un registro de la grilla.');
	}
	$('#main').procOverlay({visible:false});
}

function btn_est_hist(){
	$('#main').procOverlay({visible:true});

	var id = $("#grid_datos_tributos").getGridParam('selrow');
    if (id) {
		datos_est_hist_grid = new GridParam({
	        id_menu: n_id_menu,
	        n_grid: 20,
	        m_autoquery: 'S',
	        param: {':id_contribuyente': $("#id_contribuyente").val(),
	    		':c_tributo': $("#grid_datos_tributos").getCell(id,'c_tributo'),
	    		':c_tipo_imponible': $("#grid_datos_tributos").getCell(id,'c_tipo_imponible'),
	    		':d_objeto_hecho': $("#grid_datos_tributos").getCell(id,'d_objeto_hecho')}
	    });

		crea_grilla_est_hist();
		setea_parametros('#grid_datos_est_hist', {
			':id_contribuyente': $("#id_contribuyente").val(),
			':c_tributo': $("#grid_datos_tributos").getCell(id, 'c_tributo'),
			':c_tipo_imponible': $("#grid_datos_tributos").getCell(id, 'c_tipo_imponible'),
			':d_objeto_hecho': $("#grid_datos_tributos").getCell(id, 'd_objeto_hecho')
		}, 'S');

		abrir_modal("#modal_est_hist");
    }else {
        mostrar_validacion('Debe seleccionar un registro de la grilla.');
    }
	$('#main').procOverlay({visible:false});
}

function btn_unidades_hist(){
	$('#main').procOverlay({visible:true});

	var id = $("#grid_datos_tributos").getGridParam('selrow');
    if (id) {
		datos_unidades_hist_grid = new GridParam({
	        id_menu: n_id_menu,
	        n_grid: 25,
	        m_autoquery: 'S',
	        param: {':id_contribuyente': $("#id_contribuyente").val(),
	    		':c_tributo': $("#grid_datos_tributos").getCell(id,'c_tributo'),
	    		':c_tipo_imponible': $("#grid_datos_tributos").getCell(id,'c_tipo_imponible'),
	    		':d_objeto_hecho': $("#grid_datos_tributos").getCell(id,'d_objeto_hecho')}
	    });

		crea_grilla_unidades_hist();
		setea_parametros('#grid_datos_unidades_hist', {
			':id_contribuyente': $("#id_contribuyente").val(),
			':c_tributo': $("#grid_datos_tributos").getCell(id, 'c_tributo'),
			':c_tipo_imponible': $("#grid_datos_tributos").getCell(id, 'c_tipo_imponible'),
			':d_objeto_hecho': $("#grid_datos_tributos").getCell(id, 'd_objeto_hecho')
		}, 'S');

		abrir_modal("#modal_unidades_hist");
    }else {
        mostrar_validacion('Debe seleccionar un registro de la grilla.');
    }
	$('#main').procOverlay({visible:false});
}