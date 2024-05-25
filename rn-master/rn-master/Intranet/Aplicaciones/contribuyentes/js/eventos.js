$(document).ready(function () {
    if(p_datos_generales == 'N' && p_domicilio_telefono == 'N'){
    	activeTab(0);
    	n_tab = 0;
    }

    if(p_modif_deno == 'S'){
    	$("#btn_modif_deno").show();
    }else{
    	$("#btn_modif_deno").hide();
    }

	$('#bt_next').click(function(){
		switch(n_tab){
			case (0):
				continuar_contribuyente();
				break;
			case (1):
				if(p_domicilio_telefono == 'S'){
					$("#bt_next").hide();
				}else{
					$("#bt_next").show();
				}
				next_domicilio();
				break;
			case (2):
				activeTab(3); // Complementarios
				n_tab = 3;
				break;
			case (3):
				$.ajax({
					type:'POST',
					url: "contribuyentes/ajax_contribuyente.php",
					data: {
						tipo: "existe_persona_tmp",
						m_persona: v_tipo_persona,
						id_contribuyente_tmp: $("#id_contribuyente_tmp","#frm_busqueda").val()},
					dataType: 'json',
					async: true,
					success: function(res) {
						if(p_sintributo == 'S'){
							$("#bt_next").hide();
						}else{
							$("#bt_next").show();
						}
						if(p_datos_generales == 'S'){
							document.getElementById("bt_next").innerHTML = "Grabar";
						}else{
							document.getElementById("bt_next").innerHTML = "Grabar y Continuar <span class='glyphicon glyphicon-arrow-right' aria-hidden='true'></span>";
						}
						if(res.v_existe_persona > 0){
							v_es_nuevo = false;
						}else{
							v_es_nuevo = true;
						}
						if (v_tipo_persona == 'F'){
							activeTab(4); // Personas Físicas
							n_tab = 4;
							if(p_sintributo == 'S'){
								$("#c_sexo").val(p_sexo);
								$(".selectpicker").selectpicker('refresh');
								$("#c_sexo").attr('disabled',true);
							}
						}else{
							activeTab(5); // Personas Jurídicas
							n_tab = 5;
						}
					}
				});
				break;
			case (4):
				if(p_datos_generales == 'N'){
					grabar_pers_fisica('continuar');
				}else{
					grabar_pers_fisica('datos_generales');
				}
				break;
			case (5):
				if(p_datos_generales == 'N'){
					continuar_pers_juridica();
				}else{
					grabar_pers_juridica('datos_generales');
				}
				break;
		}
		$(window).resize();
	});

	$('#bt_prev').click(function(){
		switch(n_tab){
			case (6):
				if (v_tipo_persona == 'F'){
					activeTab(4); // Personas Físicas
					n_tab = 4;
				}else{
					activeTab(5); // Personas Jurídicas
					n_tab = 5;
				}
				
				$('#bt_next').show();
				break;
			case (5):
				if(p_datos_generales == 'S'){
					document.getElementById("bt_next").innerHTML = "Grabar y Continuar <span class='glyphicon glyphicon-arrow-right' aria-hidden='true'></span>";
				}
				grabar_pers_juridica('volver');
				break;
			case (4):
				if(p_datos_generales == 'S'){
					document.getElementById("bt_next").innerHTML = "Grabar y Continuar <span class='glyphicon glyphicon-arrow-right' aria-hidden='true'></span>";
				}
				grabar_pers_fisica('volver');
				break;
			case (3):
				if(p_datos_generales == 'N'){
					activeTab(2); // Telefonos
					n_tab = 2;
				}else{
					activeTab(0); // Contribuyentes
					n_tab = 0;
				}
				break;
			case (2):
				if(p_domicilio_telefono == 'S'){
					$("#bt_next").show();
				}
				activeTab(1); // Domicilios
				n_tab = 1;
				if(p_domicilio_telefono == 'S'){
					$("#bt_prev").hide();
				}
				break;
			case (1):
				activeTab(0); // Principal
				n_tab = 0;
				$('#bt_prev').hide();
				break;
		}
		$(window).resize();
	});

	$("#n_cuit").mask("99-99999999-9");
	$("#n_documento").mask("99999999999");

	$('.datepicker').datepicker({
		dateFormat:'dd/mm/yy', 
		changeMonth:true, 
		changeYear:true, 
		dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'], 
		monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']}
	);
	
	$('#btn_limpiar').click(function(){
		$("#n_cuit").attr('disabled',false);
		$("#lupa_c_tipo_documento").show();
		$("#btn_modif_deno").attr('disabled',true);
		m_tmp = 'N';
		limpiar_busqueda();
		$('#bt_next').hide();
		$('#bt_prev').hide();
		n_tab = 0;
		activeTab(0);
		v_es_nuevo = false;
		datos_actividades_cm_grid = null;
		datos_jurisdicciones_grid = null;
		datos_comercios_grid = null;
		datos_actividades_idb_grid = null;
		datos_responsables_trib_grid = null;
	})
	
	$('#btn_continuar_abm').click(function(){
		$('#main').procOverlay({visible:true});
		var existe;
		var existe_contrib_tmp = '';
		var existe_contrib = existe_contribuyente(limpia_cuit($('#n_cuit').val()),$('#c_tipo_documento').val(),limpia_dni($('#n_documento').val()));
		if (existe_contrib == -1 && p_datos_generales == 'N' && p_domicilio_telefono == 'N'){
			existe_contrib_tmp = existe_contribuyente_tmp(limpia_cuit($('#n_cuit').val()),$('#c_tipo_documento').val(),limpia_dni($('#n_documento').val()));
		}
		
		if((existe_contrib != 'error') && (existe_contrib_tmp != 'error')){
			if((existe_contrib != -1) || (existe_contrib_tmp != -1)){
				existe = true;
			} else {
				existe = false;
			}

			if(existe){
				$('#n_cuit').removeClass("validate[required]");
			}		

			valida_campos_documento();					
			var valido = $('#frm_busqueda').validationEngine('validate'); // will return true or false		
			if(valido){
				$('#frm_busqueda').validationEngine('hideAll');	
				$("#n_cuit").attr('disabled',true);
				$("#d_denominacion").attr('readonly',true);
				if(existe){
					$("#btn_continuar_abm").prop('disabled', true);
					if(existe_contrib != -1){
						$.ajax({
							type:'POST',
							url: "contribuyentes/alta_contribuyente.php", 	
							data: {id_contribuyente: existe_contrib, tmp:"N",
								p_sintributo: p_sintributo, p_tipo_persona:p_tipo_persona, p_sexo:p_sexo},
							dataType: 'json',
							success: function(ret) {
								$('#general').remove();
								$('#main').append(ret);
								$('#bt_next').show();
								// if(p_datos_generales == 'N' && p_domicilio_telefono == 'N'){
								// 	//si ya existe va directo al tab tributos
								// 	next_persona();
								// 	$('#bt_prev').show();
								// }
								// Solo muestro tabs que corresponden en cada caso
							    if(p_datos_generales == 'S'){
							    	$('#li_domicilios, #li_telefonos, #li_tributos').hide();
							    }
							    if(p_domicilio_telefono == 'S'){
							    	activeTab(1);
							    	n_tab = 1;
									$("#li_contribuyente,#li_complementarios,#li_p_fisica,#li_p_juridica,#li_tributos").hide();
							    }
								mostrar_solapas('');
								setear_parametros_grillas('');
								$('#main').procOverlay({visible:false});
							}
						});
					} else {
						$.ajax({
							type:'POST',
							url: "contribuyentes/alta_contribuyente.php", 	
							data: {id_contribuyente: existe_contrib_tmp, tmp:"S",
								p_sintributo: p_sintributo, p_tipo_persona:p_tipo_persona, p_sexo:p_sexo},
							dataType: 'json',
							success: function(ret) {
								m_tmp = 'S';
								$("#id_contribuyente_tmp",'#frm_busqueda').val(existe_contrib_tmp);
								$('#general').remove();
								$('#main').append(ret);
								$('#bt_next').show();
								mostrar_solapas('_tmp');
								setear_parametros_grillas('_tmp');
								$('#main').procOverlay({visible:false});
							}
						});
					}
				}else{
					$('#main').procOverlay({visible:false});
					if(p_datos_generales == 'N'){
						mostrar_cuadro(
							'Q','Información','No existe un contribuyente para la busqueda realizada.<br>¿Desea crear un nuevo contribuyente?',
							function(){fun_acepta_nuevo_contrib()}, function(){}
						);
					}else{
						mostrar_error('No existe un contribuyente para la busqueda realizada.');
					}
				}
			}
		}
	});

	if(p_sintributo == 'N'){
		$("#d_denominacion","#frm_busqueda").autocomplete({
			source: function( request, response ) {
				if (ajax_autocomplete) ajax_autocomplete.abort();
				ajax_autocomplete =
					$.ajax({
						type:'POST',
						url: "contribuyentes/autocomplete.php",
						data: {p_oper:'denominacion', filtro: request.term, abm: m_abm},
						dataType: 'json',
						success: function( data ) {
							ajax_autocomplete = null;
							if(data) {
								response(
									$.map(data.data_contrib, function( item ) {
										return {
											label: item.label,
											value: item.razon_social,
											cuit: item.cuit,
											id_contribuyente: item.id_contribuyente,
											id_contribuyente_tmp: item.id_contribuyente_tmp,
											c_tipo_documento: item.c_tipo_documento,
											d_c_tipo_documento: item.d_c_tipo_documento,
											n_documento: item.n_documento
										}
									})
								);
							}
						}
					});
			},
			minLength:1,
			select:function(event,ui){
				$("#d_denominacion").val(ui.item.value);
				$("#n_cuit").val(ui.item.cuit);
				$("#id_contribuyente").val(ui.item.id_contribuyente);
				$("#id_contribuyente_tmp",'#frm_busqueda').val(ui.item.id_contribuyente_tmp);
				$("#c_tipo_documento").val(ui.item.c_tipo_documento);
				$("#d_c_tipo_documento").val(ui.item.d_c_tipo_documento);
				$("#n_documento").val(ui.item.n_documento);
				return false;
			}
		});
	}

	$("#lupa_c_tipo_documento").lupa_generica({
		id_lista:v_lista_tipo_documentos,
		titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_dato',width:100},
			{index:'d_dato',width:350}],
		caption:'Tipos de Documento',
		sortname:'c_dato',
		sortorder:'asc',
		campos:{c_dato:'c_tipo_documento',d_dato:'d_c_tipo_documento'},
		searchCode:true,
		searchInput: '#c_tipo_documento',
		keyNav:true,
		exactField: 'c_dato'
	});
	
	$('#n_cuit',"#frm_busqueda").change(function(){
		n_cuit_focusout();
	});

	$("#btn_modif_deno").click(function(){
		if(obtener_id_contribuyente()){
			$("#d_denominacion_new").val($("#d_denominacion","#frm_busqueda").val());
			$("#modal_modif_deno").modal('show');
		}else{
			mostrar_validacion('Debe ingresar un contribuyente.');
		}
	});

	$("#btn_guardar_denominacion").click(function(){
		fun_btn_guardar_denominacion();
	});

	// para que no pueda modificar el cuit
    if(p_sintributo == 'S' || p_consulta == 'S'){
    	if($("#n_cuit").val()){
	    	$("#n_cuit, #c_tipo_documento, #n_documento","#frm_busqueda").attr('readonly',true);
	    	$("#lupa_c_tipo_documento").hide();
	    	n_cuit_focusout();
    	}
    }
});
