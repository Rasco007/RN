function verif_dom_focusout(p_dominio, p_val_verif) {
	$('#main').procOverlay({visible:true});
	$.ajax({
		url: "reversa_baja/consultas_ajax.php",
		type:"POST",
		dataType: 'JSON',
		data:{ p_oper:'verif_dom', d_objeto_hecho: p_dominio},
		success: function(response){
			//$('#main').procOverlay({visible:false});
			if(p_val_verif == response['VALOR_VERIFICACION']){
				autocomplete_datos();
			}
			else {
				$('#main').procOverlay({visible:false});
				mostrar_error('El Dígito Verificador es incorrecto.');
				$('#c_verif_dom,#c_verif_dom_ant', "#div_main").val(null);
			}
		}
	});
}

function autocomplete_datos() {
	var params = {p_oper:'consulta_ppal'};
	if ($('#d_dominio').val() && $('#c_verif_dom').val()){
		params.d_objeto_hecho = $('#d_dominio').val();
		params.dominio_ant = 0;
	}else if ($('#d_dom_ant').val() && $('#c_verif_dom_ant').val()){
		params.d_objeto_hecho = $('#d_dom_ant').val();
		params.dominio_ant = 1;
	};
	$.ajax({
		url: "reversa_baja/consultas_ajax.php",
		type:"POST",
		dataType: 'JSON',
		data:params,
		success: function(response){
			$('#main').procOverlay({visible:false});
			if (response){
				$("#d_dominio","#div_main").val(response['D_OBJETO_HECHO']);
				$("#c_verif_dom").val(response['DIGITO']);
				$("#d_dom_ant","#div_main").val(response['D_PATENTE_VIEJA']);
				$("#c_verif_dom_ant").val(response['DIGITO_ANT']);
				/*$("#d_fecha_cese_prov","#div_main").val(response['F_CESE_PROVISORIO']);
				$("#d_fecha_hasta","#div_main").val(response['F_VIG_HASTA']);
				$("#c_motivo_baja","#div_main").val(response['C_MOTIVO_BAJA']);
				$("#c_motivo_cese_prov","#div_main").val(response['C_MOTIVO_CESE_PROV']);
				$("#d_motivo_baja","#div_main").val(response['D_MOTIVO_BAJA']);
				$("#d_motivo_cese_prov","#div_main").val(response['D_MOTIVO_CESE_PROV']);*/

				$("#n_cuit","#div_main").val(response['CUIT']);
				$("#id_contribuyente","#div_main").val(response['ID_CONTRIBUYENTE']);
				$("#d_denominacion","#div_main").val(response['DENOMINACION']);
				$("#c_tipo_documento","#div_main").val(response['C_TIPO_DOCUMENTO']);
				$("#d_tipo_documento","#div_main").val(response['D_TIPO_DOCUMENTO']);
				$("#n_documento","#div_main").val(response['N_DOCUMENTO']);

				if(response['C_MOTIVO_BAJA']){
					//$("#div_main .de_cese").css('display','none');
					//$("#div_main .de_baja").css('display','unset');
					$("#d_fecha_mov","#div_main").val(response['F_VIG_HASTA']);
					$("#c_motivo","#div_main").val(response['C_MOTIVO_BAJA']);
					$("#d_motivo","#div_main").val(response['D_MOTIVO_BAJA']);
					$('#tipo', "#div_main").val('B');
				}
				else {
					//$("#div_main .de_baja").css('display','none');
					//$("#div_main .de_cese").css('display','unset');
					$("#d_fecha_mov","#div_main").val(response['F_CESE_PROVISORIO']);
					$("#c_motivo","#div_main").val(response['C_MOTIVO_CESE_PROV']);
					$("#d_motivo","#div_main").val(response['D_MOTIVO_CESE_PROV']);
					$('#tipo', "#div_main").val('C');
				}
				$("#div_main input").attr('disabled', true);
				$('.btn_lupa').hide();
			}
			else {
				$('#c_verif_dom,#c_verif_dom_ant', "#div_main").val(null);
				mostrar_error('No se han encontrado resultados.<br>Compruebe los datos ingresados.')
			}
		}
	});
}

function n_cuit_focusout(){
	$('#main').procOverlay({visible:true});
	$.ajax({
		url: "reversa_baja/consultas_ajax.php",
		type:"POST",
		dataType: 'JSON',
		data:{ p_oper:'cuit', filtro: limpia_cuit($('#n_cuit',"#div_main").val())},
		success: function(response){
			$('#main').procOverlay({visible:false});
			if (response){
				$("#d_denominacion","#div_main").val(response['DENOMINACION']);
				$("#id_contribuyente","#div_main").val(response['ID_CONTRIBUYENTE']);
				$("#c_tipo_documento","#div_main").val(response['C_TIPO_DOCUMENTO']);
				$("#d_tipo_documento","#div_main").val(response['D_TIPO_DOCUMENTO']);
				$("#n_documento","#div_main").val(response['N_DOCUMENTO']);
			}else{
				mostrar_cuadro('I', 'Atención', 'No se ha encontrado contribuyente asociado al CUIT ingresado.');
				$('#n_cuit').val(null);
				$("#d_denominacion").val(null);
				$("#id_contribuyente").val(null);
			}
		}
	});
}

function n_documento_focusout(){
	$('#main').procOverlay({visible:true});
	$.ajax({
		url: "reversa_baja/consultas_ajax.php",
		type:"POST",
		dataType: 'JSON',
		data:{ p_oper:'dni',
			c_tipo_documento: $('#c_tipo_documento',"#div_main").val(),
			n_documento: $('#n_documento',"#div_main").val()},
		success: function(response){
			$('#main').procOverlay({visible:false});
			if (response){
				$("#d_denominacion","#div_main").val(response['DENOMINACION']);
				$("#n_cuit","#div_main").val(response['CUIT']);
				$("#id_contribuyente","#div_main").val(response['ID_CONTRIBUYENTE']);
				$("#c_tipo_documento","#div_main").val(response['C_TIPO_DOCUMENTO']);
				$("#d_tipo_documento","#div_main").val(response['D_TIPO_DOCUMENTO']);
				$("#n_documento","#div_main").val(response['N_DOCUMENTO']);
			}else{
				mostrar_cuadro('I', 'Atención', 'No se ha encontrado contribuyente asociado al tipo y número de documento ingresados.');
				$("#id_contribuyente").val(null);
				$("#n_cuit").val(null);
				$("#d_denominacion").val(null);
				$('#c_tipo_documento').val(null);
				$('#d_tipo_documento').val(null);
				$("#n_documento").val(null);
			}
		}
	});
}

$("#d_denominacion").autocomplete({
	source: function (request, response) {
		if (ajax_autocomplete) ajax_autocomplete.abort();
		ajax_autocomplete =
			$.ajax({
				type: 'POST',
				url: "reversa_baja/consultas_ajax.php",
				data: {p_oper: 'denominacion', filtro: request.term},
				dataType: 'json',
				success: function (data) {
					ajax_autocomplete = null;
					if (data) {
						response(
							$.map(data.data_contrib, function (item) {
								return {
									label: item.label,
									value: item.razon_social,
									cuit: item.cuit,
									id_contribuyente: item.id_contribuyente,
									c_tipo_documento: item.c_tipo_documento,
									d_tipo_documento: item.d_tipo_documento,
									n_documento: item.n_documento
								}
							})
						);
					}
				}
			});
	},
	minLength: 1,
	select: function (event, ui) {
		$("#d_denominacion").val(ui.item.value);
		$("#n_cuit").val(ui.item.cuit);
		$("#id_contribuyente").val(ui.item.id_contribuyente);
		$("#c_tipo_documento").val(ui.item.c_tipo_documento);
		$("#d_tipo_documento").val(ui.item.d_tipo_documento);
		$("#n_documento").val(ui.item.n_documento);
		return false;
	}
});

function llamar_revertir_baja(){
	if($('#tipo', "#div_main").val()=='B'){
		$.ajax({
			type:'POST',
			url: FUNCIONES_BASEPATH+'maestro_abm.php',
			data:{
				"p_d_objeto_hecho":$("#d_dominio","#div_main").val(),
				"p_f_movimiento":$("#d_fecha_mov","#div_main").val(),
				"p_c_motivo_baja":$("#c_motivo","#div_main").val(),
				"p_c_motivo_cese_prov":null,
				"p_id_contribuyente":$("#id_contribuyente","#div_main").val(),
				"p_c_tributo":90,
				"p_f_vig_hasta":$("#d_fecha_mov","#div_main").val(),
				"p_f_cese_provisorio": null,
				"p_usuario": v_usuario,
				"id_menu":10976,
				"n_orden":0
			},
			dataType:'json',
			success: function( data ) {
				if(data.resultado == 'OK'){
					mostrar_cuadro('V','Reversa de Baja','Verifique excenciones.');
					mostrar_confirmacion('La reversa de baja se realizó correctamente.');
					limpiar_app();
				}
				else{
					mostrar_cuadro('E', 'Error', data.resultado);
					return;
				}
			}
		});
	}
	else{
		$.ajax({
			type:'POST',
			url: FUNCIONES_BASEPATH+'maestro_abm.php',
			data:{
				"p_d_objeto_hecho":$("#d_dominio","#div_main").val(),
				"p_f_movimiento":$("#d_fecha_mov","#div_main").val(),
				"p_c_motivo_baja":null,
				"p_c_motivo_cese_prov":$("#c_motivo","#div_main").val(),
				"p_id_contribuyente":$("#id_contribuyente","#div_main").val(),
				"p_c_tributo":90,
				"p_f_vig_hasta":null,
				"p_f_cese_provisorio": $("#d_fecha_mov","#div_main").val(),
				"p_usuario": v_usuario,
				"id_menu":10976,
				"n_orden":0
			},
			dataType:'json',
			success: function( data ) {
				if(data.resultado == 'OK'){
					mostrar_confirmacion('La reversa de baja se realizó correctamente.');
				}
				else{
					mostrar_cuadro('E', 'Error', data.resultado);
					return;
				}
			}
		});
	}
}

function limpiar_app() {
	$('.btn_lupa').show();
	$("#div_main input").attr('disabled', false).val(null);
}