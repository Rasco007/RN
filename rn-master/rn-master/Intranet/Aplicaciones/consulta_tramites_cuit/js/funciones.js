function mostrar_solapas(){
	crea_grillas_principales();
}

function setear_parametros_grillas(){
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

	filtros_no_nativos_ar['datos_tramite_grid'] = filtros_arr_main;

	filtros_no_nativos_ar['grid_datos_modificados'] = filtros_arr_main;
	filtros_no_nativos_ar['grid_datos_act'] = filtros_arr_main;
	filtros_no_nativos_ar['grid_datos_jurisdicc'] = filtros_arr_main;

	setea_parametros('#grid_datos_modificados',{':id_transaccion': $("#id_transaccion").val()},'S');
	setea_parametros('#grid_datos_act',{':id_transaccion': $("#id_transaccion").val()},'S');
	setea_parametros('#grid_datos_jurisdicc',{':id_transaccion': $("#id_transaccion").val()},'S');
	$(window).resize();
}

function activeTab(){
	n_tab = document.getElementsByClassName('active')[0]['lastChild']['id'];
	$('#tabs a[id="'+n_tab+'"]').tab('show');
	$(window).resize();
	var elemento = document.getElementById('grilla_jurisdicc');
	function manejadorClick() {
		$("#grid_datos_jurisdicc").trigger("reloadGrid");
		elemento.removeEventListener('click', manejadorClick);
	}
	elemento.addEventListener('click', manejadorClick);
}

function abrir_tabs(){
	$('#main').procOverlay({visible:true});
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

	filtros_no_nativos_ar['datos_tramite_grid'] = filtros_arr_main;

	document.getElementById('grid_datos_tramite').style.display="block";
	setea_parametros('#datos_tramite_grid',{':p_c_cuit':limpia_cuit($("#cuit_transaccion").val())},'S');
	$("input").attr('disabled',true);
}


function autocompleta_por_cuit(){
	$.ajax({
		type:'POST',
		url: "consulta_tramites_cuit/php/autocomplete.php",
		data: {
			oper:'cuit',
			p_id_transaccion: $('#id_transaccion').val(),
			p_id_tipotransacc: $('#id_tipotransacc').val(),
			p_n_tramite: $('#n_tramite').val(),
			p_id_sistema: $('#id_sistema').val(),
			p_c_cuit: limpia_cuit($('#cuit_transaccion').val()),
			p_id_estadotransacc: $('#id_estadotransacc').val(),
			p_id_jurisdiccion_sede: $('#id_jurisdiccion_sede').val(),
			p_fecha_transaccion: $('#fecha_transaccion').val(),
			p_hora_transaccion: $('#hora_transaccion').val(),
			p_c_resultado_alta: $('#c_resultado_alta').val(),
			p_f_siat: $('#f_siat').val(),
			p_d_error_proceso: $('#d_error_proceso').val()
		},
		dataType: 'json',
		success: function( data ) {
			if(data[0].resultado === 'OK' && data[0].ID_TRANSACCION){
				ajax_autocomplete = null;
				$("#id_contribuyente").val(data[0].ID_CONTRIBUYENTE);
				$("#id_transaccion").val(data[0].ID_TRANSACCION);
				$("#id_tipotransacc").val(data[0].ID_TIPOTRANSACC);
				$("#d_tipotransacc").val(data[0].D_TIPOTRANSACC);
				$("#n_tramite").val(data[0].N_TRAMITE);
				$("#id_sistema").val(data[0].ID_SISTEMA);
				$("#d_sistema").val(data[0].D_SISTEMA);
				$("#cuit_transaccion").val(data[0].CUIT_TRANSACCION).mask("99-99999999-9");
				$("#id_estadotransacc").val(data[0].ID_ESTADOTRANSACC);
				$("#id_jurisdiccion_sede").val(data[0].ID_JURISDICCION_SEDE);
				$("#fecha_transaccion").val(data[0].FECHA_TRANSACCION);
				$("#hora_transaccion").val(data[0].HORA_TRANSACCION);
				$("#c_resultado_alta").val(data[0].C_RESULTADO_ALTA);
				$("#d_resultado_alta").val(data[0].D_RESULTADO_ALTA);
				$("#f_siat").val(data[0].F_SIAT);
				$("#d_error_proceso").val(data[0].D_ERROR_PROCESO);

				abrir_tabs();
			}else{
				if(data[0].resultado !== 'OK'){
					mostrar_cuadro('E', 'Error', 'Error al buscar los datos por CUIT.');
				}
			}
		}
	});
}

function autocompleta_por_tramite_sistema(){
	$.ajax({
		type:'POST',
		url: "consulta_tramites_cuit/php/autocomplete.php",
		data: {
			oper:'tramite_sistema',
			p_id_transaccion: $('#id_transaccion').val(),
			p_id_tipotransacc: $('#id_tipotransacc').val(),
			p_n_tramite: $('#n_tramite').val(),
			p_id_sistema: $('#id_sistema').val(),
			p_c_cuit: limpia_cuit($('#cuit_transaccion').val()),
			p_id_estadotransacc: $('#id_estadotransacc').val(),
			p_id_jurisdiccion_sede: $('#id_jurisdiccion_sede').val(),
			p_fecha_transaccion: $('#fecha_transaccion').val(),
			p_hora_transaccion: $('#hora_transaccion').val(),
			p_c_resultado_alta: $('#c_resultado_alta').val(),
			p_f_siat: $('#f_siat').val(),
			p_d_error_proceso: $('#d_error_proceso').val()
		},
		dataType: 'json',
		success: function( data ) {
			if(data[0].resultado === 'OK' && data[0].ID_TRANSACCION){
				ajax_autocomplete = null;
				$("#id_contribuyente").val(data[0].ID_CONTRIBUYENTE);
				$("#id_transaccion").val(data[0].ID_TRANSACCION);
				$("#id_tipotransacc").val(data[0].ID_TIPOTRANSACC);
				$("#d_tipotransacc").val(data[0].D_TIPOTRANSACC);
				$("#n_tramite").val(data[0].N_TRAMITE);
				$("#id_sistema").val(data[0].ID_SISTEMA);
				$("#d_sistema").val(data[0].D_SISTEMA);
				$("#cuit_transaccion").val(data[0].CUIT_TRANSACCION).mask("99-99999999-9");
				$("#id_estadotransacc").val(data[0].ID_ESTADOTRANSACC);
				$("#id_jurisdiccion_sede").val(data[0].ID_JURISDICCION_SEDE);
				$("#fecha_transaccion").val(data[0].FECHA_TRANSACCION);
				$("#hora_transaccion").val(data[0].HORA_TRANSACCION);
				$("#c_resultado_alta").val(data[0].C_RESULTADO_ALTA);
				$("#d_resultado_alta").val(data[0].D_RESULTADO_ALTA);
				$("#f_siat").val(data[0].F_SIAT);
				$("#d_error_proceso").val(data[0].D_ERROR_PROCESO);

				abrir_tabs();
			}else{
				if(data[0].resultado !== 'OK'){
					mostrar_cuadro('E', 'Error', 'Error al buscar los datos por Nro. de Trámite y Sistema.');
				}
			}
		}
	});
}

function autocompleta_por_id_transaccion(){
	$.ajax({
		type:'POST',
		url: "consulta_tramites_cuit/php/autocomplete.php",
		data: {
			oper:'id_transaccion',
			p_id_transaccion: $('#id_transaccion').val(),
			p_id_tipotransacc: $('#id_tipotransacc').val(),
			p_n_tramite: $('#n_tramite').val(),
			p_id_sistema: $('#id_sistema').val(),
			p_c_cuit: limpia_cuit($('#cuit_transaccion').val()),
			p_id_estadotransacc: $('#id_estadotransacc').val(),
			p_id_jurisdiccion_sede: $('#id_jurisdiccion_sede').val(),
			p_fecha_transaccion: $('#fecha_transaccion').val(),
			p_hora_transaccion: $('#hora_transaccion').val(),
			p_c_resultado_alta: $('#c_resultado_alta').val(),
			p_f_siat: $('#f_siat').val(),
			p_d_error_proceso: $('#d_error_proceso').val()
		},
		dataType: 'json',
		success: function( data ) {
			if(data[0].resultado === 'OK' && data[0].ID_TRANSACCION){
				ajax_autocomplete = null;
				$("#id_contribuyente").val(data[0].ID_CONTRIBUYENTE);
				$("#id_transaccion").val(data[0].ID_TRANSACCION);
				$("#id_tipotransacc").val(data[0].ID_TIPOTRANSACC);
				$("#d_tipotransacc").val(data[0].D_TIPOTRANSACC);
				$("#n_tramite").val(data[0].N_TRAMITE);
				$("#id_sistema").val(data[0].ID_SISTEMA);
				$("#d_sistema").val(data[0].D_SISTEMA);
				$("#cuit_transaccion").val(data[0].CUIT_TRANSACCION).mask("99-99999999-9");
				$("#id_estadotransacc").val(data[0].ID_ESTADOTRANSACC);
				$("#id_jurisdiccion_sede").val(data[0].ID_JURISDICCION_SEDE);
				$("#fecha_transaccion").val(data[0].FECHA_TRANSACCION);
				$("#hora_transaccion").val(data[0].HORA_TRANSACCION);
				$("#c_resultado_alta").val(data[0].C_RESULTADO_ALTA);
				$("#d_resultado_alta").val(data[0].D_RESULTADO_ALTA);
				$("#f_siat").val(data[0].F_SIAT);
				$("#d_error_proceso").val(data[0].D_ERROR_PROCESO);

				abrir_tabs();
			}else{
				if(data[0].resultado !== 'OK'){
					mostrar_cuadro('E', 'Error', 'Error al buscar los datos por Transacción.');
				}
			}
		}
	});
}

function soloNumeros(event) {
	const codigoTecla = event.keyCode || event.which;
	const tecla = String.fromCharCode(codigoTecla);

	const soloNumeros = /^[0-9]+$/;

	if (!soloNumeros.test(tecla)) {
		event.preventDefault();
	}
}


function completar_tab_contrib(row_id){
	$.ajax({
		type:'POST',
		url: "consulta_tramites_cuit/php/tab_contrib.php",
		data: {
			id_transaccion: row_id
		},
		dataType: 'json',
		success: function(data) {
			if(data.resultado === 'OK'){
				$('#n_cuit').val(data.CUIT);
				$('#nro_inscripcion_ib').val(data.NRO_INSCRIPCION_IB);
				$('#razon_social').val(data.RAZON_SOCIAL);
				$('#nombre_fantasia').val(data.NOMBRE_FANTASIA);
				$('#nombre').val(data.NOMBRE);
				$('#apellido').val(data.APELLIDO);
				$('#marca_sicom').val(data.MARCA_SICOM);
				$('#f_dec_gran_contribuyente').val(data.FECHA_DECLARACION_GRAN_CONTRIB);
				$('#f_baja').val(data.FECHA_BAJA);
				$('#motivo_baja').val(data.MOTIVO_BAJA);
				$('#email').val(data.EMAIL);

				$("#btn_legajo_contrib").click(function(){
					post_to_url('legajo_contribuyente.php',{
						'p_n_id_menu': n_id_menu,
						'p_m_autoquery': 'S',
						'p_id_contribuyente:':$("#id_contribuyente").val(),
						'cuit': limpia_cuit($("#cuit_transaccion").val())
					},'_blank','POST');
				});

				completar_tab_cese(row_id);
			}else{
				mostrar_cuadro('E', 'Error', 'Error completando la información de los tabs.');
			}
		}
	});
}

function completar_tab_cese(row_id){
	$.ajax({
		type:'POST',
		url: "consulta_tramites_cuit/php/tab_cese.php",
		data: {
			id_transaccion: row_id
		},
		dataType: 'json',
		success: function(data) {
			if(data.resultado === 'OK'){
				$('#f_cese').val(data.FECHA_CESE);
				$('#f_reingreso_cese').val(data.FECHA_REINGRESO_CESE);
				$('#c_tipo_cese').val(data.TIPO_CESE);
				$('#d_tipo_cese').val(data.DESCRIPCION);

				completar_tab_dom_fis(row_id);
			}else{
				mostrar_cuadro('E', 'Error', 'Error completando la información de los tabs.');
			}
		}
	});
}

function completar_tab_dom_fis(row_id){
	$.ajax({
		type:'POST',
		url: "consulta_tramites_cuit/php/tab_dom_fis.php",
		data: {
			id_transaccion: row_id
		},
		dataType: 'json',
		success: function(data) {
			if(data.resultado === 'OK'){
				$('#partido_fiscal').val(data.PARTIDO);
				$('#localidad_fiscal').val(data.LOCALIDAD);
				$('#calle_fiscal').val(data.CALLE);
				$('#nro_puerta_fiscal').val(data.NRO_PUERTA);
				$('#ruta_fiscal').val(data.RUTA);
				$('#km_ruta_fiscal').val(data.KM_RUTA);
				$('#torre_fiscal').val(data.TORRE);
				$('#piso_fiscal').val(data.PISO);
				$('#entre_calles_fiscal').val(data.ENTRE_CALLES);
				$('#oficina_fiscal').val(data.OFICINA);
				$('#manzana_fiscal').val(data.MANZANA);
				$('#telefono_fiscal').val(data.TELEFONO);
				$('#fax_fiscal').val(data.FAX);
				$('#c_postal_fiscal').val(data.CODIGO_POSTAL);
				$('#email_dom_fiscal').val(data.EMAIL);
				$('#jurisdiccion_fiscal').val(data.ID_JURISDICCION);
				$('#observaciones_fiscal').val(data.OBSERVACIONES);

				completar_tab_dom_ppal(row_id);
			}else{
				mostrar_cuadro('E', 'Error', 'Error completando la información de los tabs.');
			}
		}
	});
}

function completar_tab_dom_ppal(row_id){
	$.ajax({
		type:'POST',
		url: "consulta_tramites_cuit/php/tab_dom_ppal.php",
		data: {
			id_transaccion: row_id
		},
		dataType: 'json',
		success: function(data) {
			if(data.resultado === 'OK'){
				$('#partido_ppal').val(data.PARTIDO);
				$('#localidad_ppal').val(data.LOCALIDAD);
				$('#calle_ppal').val(data.CALLE);
				$('#nro_puerta_ppal').val(data.NRO_PUERTA);
				$('#ruta_ppal').val(data.RUTA);
				$('#km_ruta_ppal').val(data.KM_RUTA);
				$('#torre_ppal').val(data.TORRE);
				$('#piso_ppal').val(data.PISO);
				$('#entre_calles_ppal').val(data.ENTRE_CALLES);
				$('#oficina_ppal').val(data.OFICINA);
				$('#manzana_ppal').val(data.MANZANA);
				$('#telefono_ppal').val(data.TELEFONO);
				$('#fax_ppal').val(data.FAX);
				$('#c_postal_ppal').val(data.CODIGO_POSTAL);
				$('#email_dom_ppal').val(data.EMAIL);
				$('#jurisdiccion_ppal').val(data.ID_JURISDICCION);
				$('#observaciones_ppal').val(data.OBSERVACIONES);

				completar_tab_nat_jur(row_id);
			}else{
				mostrar_cuadro('E', 'Error', 'Error completando la información de los tabs.');
			}
		}
	});
}

function completar_tab_nat_jur(row_id){
	$.ajax({
		type:'POST',
		url: "consulta_tramites_cuit/php/tab_nat_jur.php",
		data: {
			id_transaccion: row_id
		},
		dataType: 'json',
		success: function(data) {
			if(data.resultado === 'OK'){
				$('#id_natjur').val(data.ID_NATJUR);
				$('#d_natjur').val(data.DESCRIPCION_NATJUR);
				$('#nro_inscrip_igj').val(data.NRO_INSCRIP_IGJ);
				$('#f_inscrip_igj').val(data.FECHA_INSCRIP_IGJ);
				$('#durac_anios_igj').val(data.DURAC_ANIOS_IGJ);
				$('#f_cierre_ejercicio').val(data.FECHA_CIERRE_EJERCICIO);

				completar_tab_uni(row_id);
			}else{
				mostrar_cuadro('E', 'Error', 'Error completando la información de los tabs.');
			}
		}
	});
}

function completar_tab_uni(row_id){
	$.ajax({
		type:'POST',
		url: "consulta_tramites_cuit/php/tab_uni.php",
		data: {
			id_transaccion: row_id
		},
		dataType: 'json',
		success: function(data) {
			if(data.resultado === 'OK'){
				$('#apellido_nombre_uni').val(data.APELLIDO_NOMBRE_UNI);
				$('#apellido_uni').val(data.APELLIDO_UNI);
				$('#nombre_uni').val(data.NOMBRE_UNI);
				$('#f_nac_uni').val(data.FECHA_NAC_UNI);
				$('#id_tipo_doc_uni').val(data.ID_TIPO_DOC_UNI);
				$('#d_tipo_doc_uni').val(data.TIPO_DOC_DESC_UNI);
				$('#nro_doc_uni').val(data.NRO_DOCUMENTO_UNI);
				$('#nacionalidad').val(data.NACIONALIDAD_UNI);
				$('#nombre_padre_uni').val(data.NOMBRE_PADRE_UNI);
				$('#nombre_madre_uni').val(data.NOMBRE_MADRE_UNI);
				$('#sexo_uni').val(data.SEXO_UNI);
				$('#est_civil_uni').val(data.ESTADO_CIVIL_UNI);
				$('#partido_uni').val(data.PARTIDO_UNI);
				$('#localidad_uni').val(data.LOCALIDAD_UNI);
				$('#calle_uni').val(data.CALLE_UNI);
				$('#nro_puerta_uni').val(data.NRO_PUERTA_UNI);
				$('#ruta_uni').val(data.RUTA_UNI);
				$('#km_ruta_uni').val(data.KM_RUTA_UNI);
				$('#torre_uni').val(data.TORRE_UNI);
				$('#piso_uni').val(data.PISO_UNI);
				$('#entre_calles_uni').val(data.ENTRE_CALLES_UNI);
				$('#oficina_uni').val(data.OFICINA_UNI);
				$('#manzana_uni').val(data.MANZANA_UNI);
				$('#codigo_postal_uni').val(data.CODIGO_POSTAL_UNI);
				$('#telefono_uni').val(data.TELEFONO_UNI);
				$('#fax_uni').val(data.FAX_UNI);
				$('#id_jurisdiccion_uni').val(data.ID_JURISDICCION_UNI);
				$('#email_uni').val(data.EMAIL_UNI);
				$('#observaciones_uni').val(data.OBSERVACIONES_UNI);

				completar_tab_ute(row_id);
			}else{
				mostrar_cuadro('E', 'Error', 'Error completando la información de los tabs.');
			}
		}
	});
}

function completar_tab_ute(row_id){
	$.ajax({
		type:'POST',
		url: "consulta_tramites_cuit/php/tab_ute.php",
		data: {
			id_transaccion: row_id
		},
		dataType: 'json',
		success: function(data) {
			if(data.resultado === 'OK'){
				$('#cuit_ute').val(data.CUIT_UTE);
				$('#tipo_integrante_ute').val(data.TIPO_INTEGRANTE_UTE);
				$('#razon_social_ute').val(data.RAZON_SOCIAL_UTE);
				$('#nro_inscrip_ib_ute').val(data.NRO_INSCRIPCION_IB_UTE);
				$('#cuit_integrante_ute').val(data.CUIT_INTEGRANTE_UTE);
				$('#partido_ute').val(data.PARTIDO_UTE);
				$('#localidad_ute').val(data.LOCALIDAD_UTE);
				$('#calle_ute').val(data.CALLE_UTE);
				$('#nro_puerta_ute').val(data.NRO_PUERTA_UTE);
				$('#ruta_ute').val(data.RUTA_UTE);
				$('#km_ruta_ute').val(data.KM_RUTA_UTE);
				$('#torre_ute').val(data.TORRE_UTE);
				$('#piso_ute').val(data.PISO_UTE);
				$('#entre_calles_ute').val(data.ENTRE_CALLES_UTE);
				$('#oficina_ute').val(data.OFICINA_UTE);
				$('#manzana_ute').val(data.MANZANA_UTE);
				$('#c_postal_ute').val(data.CODIGO_POSTAL_UTE);
				$('#telefono_ute').val(data.TELEFONO_UTE);
				$('#fax_ute').val(data.FAX_UTE);
				$('#id_jurisdiccion_ute').val(data.ID_JURISDICCION_UTE);
				$('#email_ute').val(data.EMAIL_UTE);
				$('#observaciones_ute').val(data.OBSERVACIONES_UTE);

				completar_tab_resp_soc(row_id);
			}else{
				mostrar_cuadro('E', 'Error', 'Error completando la información de los tabs.');
			}
		}
	});
}

function completar_tab_resp_soc(row_id){
	$.ajax({
		type:'POST',
		url: "consulta_tramites_cuit/php/tab_resp_soc.php",
		data: {
			id_transaccion: row_id
		},
		dataType: 'json',
		success: function(data) {
			if(data.resultado === 'OK'){
				$('#apellido_nombre_rs').val(data.APELLIDO_NOMBRE_RS);
				$('#apellido_rs').val(data.APELLIDO_RS);
				$('#nombre_rs').val(data.NOMBRE_RS);
				$('#nro_orden_rs').val(data.NRO_ORDEN_RS);
				$('#id_tipodoc_rs').val(data.ID_TIPODOC_RS);
				$('#d_tipo_doc_rs').val(data.TIPODOC_DESC_RS);
				$('#nro_doc_rs').val(data.NRO_DOCUMENTO_RS);
				$('#cargo_rs').val(data.CARGO_RS);
				$('#caracter_firma_rs').val(data.CARACTER_FIRMA_RS);
				$('#cuit_rs').val(data.CUIT_RS);
				$('#partido_rs').val(data.PARTIDO_RS);
				$('#localidad_rs').val(data.LOCALIDAD_RS);
				$('#calle_rs').val(data.CALLE_RS);
				$('#nro_puerta_rs').val(data.NRO_PUERTA_RS);
				$('#ruta_rs').val(data.RUTA_RS);
				$('#km_ruta_rs').val(data.KM_RUTA_RS);
				$('#torre_rs').val(data.TORRE_RS);
				$('#piso_rs').val(data.PISO_RS);
				$('#entre_calles_rs').val(data.ENTRE_CALLES_RS);
				$('#oficina_rs').val(data.OFICINA_RS);
				$('#manzana_rs').val(data.MANZANA_RS);
				$('#codigo_postal_rs').val(data.CODIGO_POSTAL_RS);
				$('#telefono_rs').val(data.TELEFONO_RS);
				$('#fax_rs').val(data.FAX_RS);
				$('#id_jurisdiccion_rs').val(data.ID_JURISDICCION_RS);
				$('#email_rs').val(data.EMAIL_RS);
				$('#observaciones_rs').val(data.OBSERVACIONES_RS);
			}else{
				mostrar_cuadro('E', 'Error', 'Error completando la información de los tabs.');
			}
		}
	});
}