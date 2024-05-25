function existe_contribuyente(p_cuit,p_t_doc,p_n_doc){
	var result;
	
	$.ajax({
		type:'POST',
		url: "consulta_contribuyentes/ajax_contribuyente.php", 	
		data: {tipo:"existe_contribuyente", cuit:p_cuit, t_doc:p_t_doc, n_doc:p_n_doc},
		dataType: 'json',
		async:false,
		success: function(ret) {
			if( ret.error != 'OK' ){
				mostrar_error(ret.error);
				result = 'error';
			}else{
				if (ret.id_contribuyente != -1){
					$('#n_cuit').val(ret.n_cuit); 	
					$('#d_denominacion').val(ret.d_denominacion);
					$('#c_tipo_documento').val(ret.c_tipo_documento);
					$('#d_c_tipo_documento').val(ret.d_c_tipo_documento);
					$('#n_documento').val(ret.n_documento);
					$('#id_contribuyente').val(ret.id_contribuyente);
					
					result=ret.id_contribuyente;
				}else{
					$('#id_contribuyente').val(-1); 
					result=-1;
				}
			}
			$('#frm_busqueda input').attr('readonly',true);
		}
	});
	
	return result;
}

function obtener_id_contribuyente(){
	var v_id_contribuyente = $("#id_contribuyente",'#frm_busqueda').val();
	return v_id_contribuyente;
}

function n_cuit_focusout(){
	if ($('#general').length) {
		id_contribuyente = null;
	}
	if ($('#n_cuit',"#frm_busqueda").val() && $('#n_cuit',"#frm_busqueda").val().length == 13){
		$('#main').procOverlay({visible:true});
		$.ajax({
			url: "consulta_contribuyentes/autocomplete.php",
			type:"POST",
			data:{ p_oper:'cuit', filtro: limpia_cuit($('#n_cuit',"#frm_busqueda").val())},
			success: function(response){
				$('#main').procOverlay({visible:false});
				res = JSON.parse(response);
				if (res){
					$("#d_denominacion","#frm_busqueda").val(res['DENOMINACION']);
					$("#id_contribuyente","#frm_busqueda").val(res['ID_CONTRIBUYENTE']);
					$("#c_tipo_documento","#frm_busqueda").val(res['C_TIPO_DOCUMENTO']);
					$("#d_c_tipo_documento","#frm_busqueda").val(res['D_C_TIPO_DOCUMENTO']);
					$("#n_documento","#frm_busqueda").val(res['N_DOCUMENTO']);
					if(p_consulta == 'S'){
						$("#btn_consultar").click();
					}
				}
			}
		});
	}
}

function mostrar_solapas(){
	setearTipoPersona();
	
	crea_grillas_principales();
	$(".selectpicker").selectpicker('refresh');
}

function setear_parametros_grillas(){
 	setea_parametros('#grid_datos_domicilio',{':id_contribuyente': $("#id_contribuyente").val()},'S');
 	setea_parametros('#grid_datos_telefono',{':id_contribuyente': $("#id_contribuyente").val()},'S');
 	setea_parametros('#grid_datos_complementarios',{':id_contribuyente': $("#id_contribuyente").val()},'S');
 	if($('#m_persona').val()=='J'){
	 	setea_parametros('#grid_datos_responsables',{':id_contribuyente': $("#id_contribuyente").val()},'S');
	}
	setea_parametros('#grid_datos_tributos',{':id_contribuyente': $("#id_contribuyente").val()},'S');
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
			"id_menu": 10865,
			"n_orden": 10
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
		        param: {':id_contribuyente': $("#id_contribuyente").val(),
						':c_tributo': tributo,
						':c_tipo_imponible': tipo_imp,
						':d_objeto_hecho': objeto}
		    });

		    datos_jurisdicciones_grid = new GridParam({
		        id_menu: n_id_menu,
		        n_grid: n_grid_jurisdicciones,
		        m_autoquery: 'S',
		        param: {':id_contribuyente': $("#id_contribuyente").val(),
						':c_tributo': tributo,
						':c_tipo_imponible': tipo_imp,
						':d_objeto_hecho': objeto}
		    });

			crea_grillas_act_jur();
			setea_parametros('#grid_datos_actividades_cm', {
				':id_contribuyente': $("#id_contribuyente").val(),
				':c_tributo': tributo,
				':c_tipo_imponible': tipo_imp,
				':d_objeto_hecho': objeto
			}, 'S');
			setea_parametros('#grid_datos_jurisdicciones', {
				':id_contribuyente': $("#id_contribuyente").val(),
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
		        param: {':id_contribuyente': $("#id_contribuyente").val(),
						':c_tributo': tributo,
						':c_tipo_imponible': tipo_imp,
						':d_objeto_hecho': objeto}
		    });

		    datos_actividades_idb_grid = new GridParam({
		        id_menu: n_id_menu,
		        n_grid: n_grid_actividades_ibd,
		        m_autoquery: 'S',
		        param: {':id_contribuyente': $("#id_contribuyente").val(),
						':c_tributo': tributo,
						':c_tipo_imponible': tipo_imp,
						':d_objeto_hecho': objeto}
		    });

		    datos_uni_grid = new GridParam({
	            id_menu: n_id_menu,
	            n_grid: n_grid_unidades,
	            m_autoquery:'S',
	            param:{':p_id_contrib': $("#id_contribuyente").val(),
	                ':p_c_timp': tipo_imp,
	                ':p_c_trib': tributo,
	                ':p_objeto': objeto}
	        });

			crea_grillas_com_act();
			setea_parametros('#grid_datos_comercios', {
				':id_contribuyente': $("#id_contribuyente").val(),
				':c_tributo': tributo,
				':c_tipo_imponible': tipo_imp,
				':d_objeto_hecho': objeto
			}, 'S');
			setea_parametros('#grid_datos_actividades_ibd', {
				':id_contribuyente': $("#id_contribuyente").val(),
				':c_tributo': tributo,
				':c_tipo_imponible': tipo_imp,
				':d_objeto_hecho': objeto
			}, 'S');
			setea_parametros('#grid_datos_unidades', {
				':p_id_contrib': $("#id_contribuyente").val(),
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

				datos_reg_grid = new GridParam({
			        id_menu: n_id_menu,
			        n_grid: 19,
			        m_autoquery: 'S',
			        param: {':id_contribuyente': $("#id_contribuyente").val(),
			    		':c_tipo_imponible': $("#grid_datos_tributos").getCell(id,'c_tipo_imponible'),
			    		':d_objeto_hecho': $("#grid_datos_tributos").getCell(id,'d_objeto_hecho')}
			    });

				datos_reg_hist_grid = new GridParam({
					id_menu: n_id_menu,
					n_grid: 26,
					m_autoquery: 'S',
					param: {':id_contribuyente': $("#id_contribuyente").val(),
						//':c_tipo_imponible': $("#grid_datos_tributos").getCell(id,'c_tipo_imponible'),
						':d_objeto_hecho': $("#grid_datos_tributos").getCell(id,'d_objeto_hecho')}
				});

				crea_grilla_reg_hist();

				setea_parametros('#grid_datos_reg', {
					':id_contribuyente': $("#id_contribuyente").val(),
					':c_tipo_imponible': $("#grid_datos_tributos").getCell(id, 'c_tipo_imponible'),
					':d_objeto_hecho': $("#grid_datos_tributos").getCell(id, 'd_objeto_hecho')
				}, 'S');

				setea_parametros('#grid_datos_reg_hist', {
					':id_contribuyente': $("#id_contribuyente").val(),
					//':c_tipo_imponible': $("#grid_datos_tributos").getCell(id, 'c_tipo_imponible'),
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
	        param: {':id_contribuyente': $("#id_contribuyente").val(),
	    			':c_tributo': tributo,
					':d_objeto_hecho': objeto}
	    });

		crea_grilla_responsables_trib();
		setea_parametros("#grid_datos_responsables_trib", {
			':id_contribuyente': $("#id_contribuyente").val(),
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
        param: {':id_contribuyente': $("#id_contribuyente").val()}
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

function valida_campos_documento(){
	if ((($('#c_tipo_documento').val() != '') && $('#d_c_tipo_documento').val() != '') && $('#n_documento').val() == ''){
		$('#n_documento').addClass("validate[required]");
	}else{
		$('#n_documento').removeClass("validate[required]");
	}
	if ((($('#c_tipo_documento').val() == '') && $('#d_c_tipo_documento').val() == '') && $('#n_documento').val() != ''){
		$('#c_tipo_documento').addClass("validate[required]");
		$('#d_c_tipo_documento').addClass("validate[required]");
	}else{
		if (($('#c_tipo_documento').val() == '') && $('#d_c_tipo_documento').val() != ''){
			$('#c_tipo_documento').addClass("validate[required]");
		}else{
			$('#c_tipo_documento').removeClass("validate[required]");
		}
		if (($('#c_tipo_documento').val() != '') && $('#d_c_tipo_documento').val() == ''){
			$('#d_c_tipo_documento').addClass("validate[required]");
		}else{
			$('#d_c_tipo_documento').removeClass("validate[required]");
		}
	}
	if((($('#c_tipo_documento').val() != '') && $('#d_c_tipo_documento').val() != '') && $('#n_documento').val() != ''){
		$('#n_cuit').removeClass("validate[required,custom[validaCuit]]");
	}else{
		$('#n_cuit').addClass("validate[required,custom[validaCuit]]");
	}
}
/////////////////////////// FUNCIONES DE BOTON BUSCAR /////////////////////////////////

function limpiar_busqueda() {
	$('#frm_busqueda input').val(null);

	$('#n_cuit, #d_denominacion, #c_tipo_documento, #n_documento').attr('readonly', false);
	$('#n_cuit').prop('disabled', false);
	$("#btn_consultar").prop('disabled', false);
	$("#lupa_c_tipo_documento").prop('disabled', false);
	$('#general').hide();
}
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