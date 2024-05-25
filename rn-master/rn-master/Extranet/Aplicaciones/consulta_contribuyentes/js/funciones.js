function obtener_id_contribuyente(){
	var v_id_contribuyente = $("#id_contribuyente",'#frm_busqueda').val();
	return v_id_contribuyente;
}

function mostrar_solapas(){
	setearTipoPersona();
	
	crea_grillas_principales();
	$(".selectpicker").selectpicker('refresh');
}

function setear_parametros_grillas(){
 	setea_parametros('#grid_datos_domicilio',{':id_contribuyente': obtener_id_contribuyente()},'S');
 	setea_parametros('#grid_datos_telefono',{':id_contribuyente': obtener_id_contribuyente()},'S');
 	setea_parametros('#grid_datos_complementarios',{':id_contribuyente': obtener_id_contribuyente()},'S');
 	if($('#m_persona').val()=='J'){
	 	setea_parametros('#grid_datos_responsables',{':id_contribuyente': obtener_id_contribuyente()},'S');
	}
	setea_parametros('#grid_datos_tributos',{':id_contribuyente': obtener_id_contribuyente()},'S');
}

function setearTipoPersona(){
	v_tipo_persona = $("#m_persona").val();

	if(v_tipo_persona == 'F'){
		$('#li_p_juridica').hide();
	}else{
		$('#li_p_fisica').hide();
	}

	// var cuit_p_fisicas = ['20','23','24','27'];
	// var cuit_p_juridicas = ['30','33','34'];

	// if(cuit_p_fisicas.includes( $('#n_cuit').val().substr(0,2) )){
	// 	v_tipo_persona = 'F';
	// 	$('#li_p_juridica').hide();
	// }
	
	// if(cuit_p_juridicas.includes( $('#n_cuit').val().substr(0,2) )){
	// 	v_tipo_persona = 'J';
	// 	$('#li_p_fisica').hide();
	// }
}

///////////////////////// BOTONES TAB TRIBUTOS ////////////////////////
function btn_generar_boleta() {
	$('#main').procOverlay({visible: true});
	var id = $('#grid_datos_tributos').getGridParam('selrow');
	$.ajax({
		type: 'POST',
		url: FUNCIONES_BASEPATH + 'maestro_abm.php',
		data: {
			"p_id_contribuyente": obtener_id_contribuyente(),
			"p_c_tributo": $("#grid_datos_tributos").getCell(id,'c_tributo'),
			"p_d_objeto_hecho": $("#grid_datos_tributos").getCell(id,'d_objeto_hecho'),
			"p_f_vig_desde": $("#grid_datos_tributos").getCell(id,'f_vig_desde'),
			"p_c_regimen": $("#grid_datos_tributos").getCell(id,'c_regimen'),
			"p_c_tipo_actividad": $("#grid_datos_tributos").getCell(id,'c_tipo_actividad'),
			"p_c_categoria": $("#grid_datos_tributos").getCell(id,'c_categoria'),
			"id_menu": 10932,
			"n_orden": 1
		},
		dataType: 'json',
		success: function(data) {
			if (data.resultado == 'OK') {
				llamar_report('RECAL012_IIBB',
					'p_id_sesion|' + data.p_id_sesion,
					'PDF');
			} else {
				mostrar_error(data.resultado);
			}
		}
	});
	$('#main').procOverlay({visible: false});
}

function btn_actividades(){
	$('#main').procOverlay({visible:true});
	var id = $('#grid_datos_tributos').getGridParam('selrow');
	if (id) {
		var tributo = $("#grid_datos_tributos").getCell(id,'c_tributo');
		var tipo_imp = $("#grid_datos_tributos").getCell(id,'c_tipo_imponible');
		var objeto = $("#grid_datos_tributos").getCell(id,'d_objeto_hecho');

		var n_grid_actividades_cm = 6;
		var n_grid_jurisdicciones = 7;
		var n_grid_comercios = 8;
		var n_grid_actividades_ibd = 9;
		var n_grid_unidades = 17;

		if(tributo == '20'){
			datos_actividades_cm_grid = new GridParam({
		        id_menu: n_id_menu,
		        n_grid: n_grid_actividades_cm,
		        m_autoquery: 'S',
		        param: {':id_contribuyente': obtener_id_contribuyente(),
						':c_tributo': tributo,
						':c_tipo_imponible': tipo_imp,
						':d_objeto_hecho': objeto}
		    });

		    datos_jurisdicciones_grid = new GridParam({
		        id_menu: n_id_menu,
		        n_grid: n_grid_jurisdicciones,
		        m_autoquery: 'S',
		        param: {':id_contribuyente': obtener_id_contribuyente(),
						':c_tributo': tributo,
						':c_tipo_imponible': tipo_imp,
						':d_objeto_hecho': objeto}
		    });

			crea_grillas_act_jur();
			setea_parametros('#grid_datos_actividades_cm', {
				':id_contribuyente': obtener_id_contribuyente(),
				':c_tributo': tributo,
				':c_tipo_imponible': tipo_imp,
				':d_objeto_hecho': objeto
			}, 'S');
			setea_parametros('#grid_datos_jurisdicciones', {
				':id_contribuyente': obtener_id_contribuyente(),
				':c_tributo': tributo,
				':c_tipo_imponible': tipo_imp,
				':d_objeto_hecho': objeto
			}, 'S');
			abrir_modal("#modal_actividades_cm");

		}else{
			datos_comercios_grid = new GridParam({
		        id_menu: n_id_menu,
		        n_grid: n_grid_comercios,
		        m_autoquery: 'S',
		        param: {':id_contribuyente': obtener_id_contribuyente(),
						':c_tributo': tributo,
						':c_tipo_imponible': tipo_imp,
						':d_objeto_hecho': objeto}
		    });

		    datos_actividades_idb_grid = new GridParam({
		        id_menu: n_id_menu,
		        n_grid: n_grid_actividades_ibd,
		        m_autoquery: 'S',
		        param: {':id_contribuyente': obtener_id_contribuyente(),
						':c_tributo': tributo,
						':c_tipo_imponible': tipo_imp,
						':d_objeto_hecho': objeto}
		    });

		    datos_uni_grid = new GridParam({
	            id_menu: n_id_menu,
	            n_grid: n_grid_unidades,
	            m_autoquery:'S',
	            param:{':p_id_contrib': obtener_id_contribuyente(),
	                ':p_c_timp': tipo_imp,
	                ':p_c_trib': tributo,
	                ':p_objeto': objeto}
	        });

			crea_grillas_com_act();
			setea_parametros('#grid_datos_comercios', {
				':id_contribuyente': obtener_id_contribuyente(),
				':c_tributo': tributo,
				':c_tipo_imponible': tipo_imp,
				':d_objeto_hecho': objeto
			}, 'S');
			setea_parametros('#grid_datos_actividades_ibd', {
				':id_contribuyente': obtener_id_contribuyente(),
				':c_tributo': tributo,
				':c_tipo_imponible': tipo_imp,
				':d_objeto_hecho': objeto
			}, 'S');
			setea_parametros('#grid_datos_unidades', {
				':p_id_contrib': obtener_id_contribuyente(),
				':p_c_timp': tipo_imp,
				':p_c_trib': tributo,
				':p_objeto': objeto
			}, 'S');
			abrir_modal("#modal_actividades_ibd");
		}
	}else{
		mostrar_validacion('Debe seleccionar un registro de la grilla de tributos.');
	}
	$('#main').procOverlay({visible:false});
}

function btn_regimen(){
	$('#main').procOverlay({visible:true});
	var id = $('#grid_datos_tributos').getGridParam('selrow');
	if (id) {
		var tipo_imp = $("#grid_datos_tributos").getCell(id,'c_tipo_imponible');
		var objeto = $("#grid_datos_tributos").getCell(id,'d_objeto_hecho');
		var v_id_contribuyente = obtener_id_contribuyente();

		$.ajax({
			type:'POST',
			url: "consulta_contribuyentes/ajax_contribuyente.php", 	
			data: {tipo:"datos_regimen",
				p_id_contribuyente:v_id_contribuyente,
				p_tipo_imponible:tipo_imp,
				p_objeto:objeto,
				oper:'datos'},
			dataType: 'json',
			success: function(ret) {
				$('#c_regimen',"#frm_datos_regimen").val(ret.c_regimen);
				$('#d_regimen',"#frm_datos_regimen").val(ret.d_regimen);
				$('#c_tipo_actividad',"#frm_datos_regimen").val(ret.c_tipo_actividad);
				$('#d_tipo_actividad',"#frm_datos_regimen").val(ret.d_tipo_actividad);
				$('#c_categoria',"#frm_datos_regimen").val(ret.c_categoria);
				$('#f_vig_desde_regimen',"#frm_datos_regimen").val(ret.f_vig_desde);
				$('#f_vig_hasta_regimen',"#frm_datos_regimen").val(ret.f_vig_hasta);
				
				$(".read_only").attr('readonly',true);
				$(".read_only").attr('disabled',true);
				$(".read_only_lupa").hide();

				datos_reg_hist_grid = new GridParam({
			        id_menu: n_id_menu,
			        n_grid: 19,
			        m_autoquery: 'S',
			        param: {':id_contribuyente': obtener_id_contribuyente(),
			    		':c_tipo_imponible': $("#grid_datos_tributos").getCell(id,'c_tipo_imponible'),
			    		':d_objeto_hecho': $("#grid_datos_tributos").getCell(id,'d_objeto_hecho')}
			    });

				crea_grilla_reg_hist();
				setea_parametros('#grid_datos_reg_hist', {
					':id_contribuyente': obtener_id_contribuyente(),
					':c_tipo_imponible': $("#grid_datos_tributos").getCell(id, 'c_tipo_imponible'),
					':d_objeto_hecho': $("#grid_datos_tributos").getCell(id, 'd_objeto_hecho')
				}, 'S');
				
				abrir_modal("#modal_regimen");
				$('#main').procOverlay({visible:false});
			}
		});
	}else{
		mostrar_validacion('Debe seleccionar un registro de la grilla de tributos.');
		$('#main').procOverlay({visible:false});
	}
}

function btn_responsables(){
	$('#main').procOverlay({visible:true});
	var id = $('#grid_datos_tributos').getGridParam('selrow');
	if (id) {
		var tributo = $("#grid_datos_tributos").getCell(id,'c_tributo');
		var objeto = $("#grid_datos_tributos").getCell(id,'d_objeto_hecho');

		var n_grid_responsables_trib = 10;;

		datos_responsables_trib_grid = new GridParam({
	        id_menu: n_id_menu,
	        n_grid: n_grid_responsables_trib,
	        m_autoquery: 'S',
	        param: {':id_contribuyente': obtener_id_contribuyente(),
	    			':c_tributo': tributo,
					':d_objeto_hecho': objeto}
	    });

		crea_grilla_responsables_trib();
		setea_parametros("#grid_datos_responsables_trib", {
			':id_contribuyente': obtener_id_contribuyente(),
			':c_tributo': tributo,
			':d_objeto_hecho': objeto
		}, 'S');
		abrir_modal("#modal_responsables");
	}else{
		mostrar_validacion('Debe seleccionar un registro de la grilla de tributos.');
	}
	$('#main').procOverlay({visible:false});
}

function btn_info_agentes(){
	$('#main').procOverlay({visible:true});
	var id = $('#grid_datos_tributos').getGridParam('selrow');
	if (id) {
		var tipo_imp = $("#grid_datos_tributos").getCell(id,'c_tipo_imponible');
		var tributo = $("#grid_datos_tributos").getCell(id,'c_tributo');
		var objeto = $("#grid_datos_tributos").getCell(id,'d_objeto_hecho');
		var v_id_contribuyente = obtener_id_contribuyente();

		$.ajax({
			type:'POST',
			url: "consulta_contribuyentes/ajax_contribuyente.php", 	
			data: {tipo:"datos_agente",
				p_id_contribuyente:v_id_contribuyente,
				p_tipo_imponible:tipo_imp,
				p_tributo:tributo,
				p_objeto:objeto},
			dataType: 'json',
			success: function(ret) {
				$('#c_organismo',"#frm_datos_agente").val(ret.codorganismo);
				$('#d_organismo',"#frm_datos_agente").val(ret.d_organismo);
				$('#denominacion',"#frm_datos_agente").val(ret.denominacion);
				$('#d_act_desarrolla',"#frm_datos_agente").val(ret.act_desarrolla);
				$('#d_act_retiene',"#frm_datos_agente").val(ret.act_retiene);
				$('#n_anexo_principal',"#frm_datos_agente").val(ret.anexo_ppal);
				$('#n_anexo_1',"#frm_datos_agente").val(ret.anexo_1);
				$('#n_anexo_2',"#frm_datos_agente").val(ret.anexo_2);
				$('.selectpicker').selectpicker('refresh');
				$('#d_contacto_operativo',"#frm_datos_agente").val(ret.contacto_operativo);
				$('#d_contacto_administrativo',"#frm_datos_agente").val(ret.contacto_administrativo);
				
				$(".read_only").attr('readonly',true);
				$(".read_only").attr('disabled',true);
				$(".read_only_lupa").hide();
				abrir_modal("#modal_agente");
				$('#main').procOverlay({visible:false});
			}
		});
	}else{
		mostrar_validacion('Debe seleccionar un registro de la grilla de tributos.');
		$('#main').procOverlay({visible:false});
	}
}

function btn_planes(){
	$('#main').procOverlay({visible:true});
	mostrar_validacion('FACP002 En desarrollo.');
	// llama_form2('FACP002');
	$('#main').procOverlay({visible:false});
}

///////////////////////// BOTONES TAB TRIBUTOS ////////////////////////

function btn_obj_contrib(){
	$('#main').procOverlay({visible:true});
	datos_obj_contrib_grid = new GridParam({
        id_menu: n_id_menu,
        n_grid: 23,
        m_autoquery: 'S',
        param: {':id_contribuyente': obtener_id_contribuyente()}
    });
	crea_grilla_obj_contrib();
	abrir_modal("#modal_objetos_contrib");
	$('#main').procOverlay({visible:false});
}

/////////////////////////// FUNCIONES DE BOTON BUSCAR /////////////////////////////////
function limpia_dni(dni){
	var result;
	if (dni != null){
		result=dni.replace(/\./gi, '');
		return result;
	}else{
		return null;
	}
}

/////////////////////////// FUNCIONES DE BOTON BUSCAR /////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////

function activeTab(){
	n_tab = document.getElementsByClassName('active')[0]['lastChild']['id'];
	$('#tabs a[id="'+n_tab+'"]').tab('show');
	$(window).resize();
    $(".selectpicker").selectpicker('refresh');
}

function abrir_modal(modal){
	$(modal).modal('show');
	$(window).resize();
}