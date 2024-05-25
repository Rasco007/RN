function n_cuit_focusout(){
	if ($('#n_cuit_new',"#frm_cont_nuevo").val() && $('#n_cuit_new',"#frm_cont_nuevo").val().length == 13){
		$('#main').procOverlay({visible:true});
		$.ajax({
			url: "transf_boletos/autocomplete.php",
			type:"POST",
			dataType: 'JSON',
			data:{
				p_oper:'cuit',
				filtro: limpia_cuit($('#n_cuit_new',"#frm_cont_nuevo").val()),
				p_c_tributo: p_tributo,
				p_d_objeto_hecho: $('#d_objeto_hecho').val(),
				p_id_contribuyente_new: $('#id_contribuyente_new').val(),
				p_id_contribuyente: $('#id_contribuyente_old').val(),
				p_f_vig_hasta: $('#f_vig_hasta_old').val(),
				p_uso: p_uso
			},
			success: function(response){
				$('#main').procOverlay({visible:false});
				if(response){
					if (response['ERROR'] == 'OK'){
						$("#d_denominacion_new").val(response['D_DENOMINACION']);
						$("#id_contribuyente_new").val(response['ID_CONTRIBUYENTE']);
						$("#c_tipo_documento_new").val(response['C_TIPO_DOCUMENTO']);
						$("#d_tipo_documento_new").val(response['D_TIPO_DOCUMENTO']);
						$("#n_documento_new").val(response['N_DOCUMENTO']);
						$("#c_tipo_domicilio_new","#d_tipo_domicilio_new").val(null);
						$("#d_denominacion_new, #c_tipo_documento_new").prop('readonly',true);
						$("#lupa_tipo_documento").hide();
		            	buscar_datos();
		            	busca_delegacion();
					}else{
						mostrar_error(response['ERROR']);
					}
				}
			}
		});
	}else{
		$("#frm_cont_nuevo input").val(null);
	}
}

function busca_delegacion(){
	$('#main').procOverlay({visible:true});
	$.ajax({
		url: "transf_boletos/autocomplete.php",
		type:"POST",
		dataType: 'JSON',
		data:{ p_oper:'delegacion',
			p_c_tributo: p_tributo,
			p_d_objeto_hecho: $('#d_objeto_hecho').val(),
			p_id_contribuyente: $('#id_contribuyente_new',"#frm_cont_nuevo").val()},
		success: function(response){
			$('#main').procOverlay({visible:false});
			if(response){
				if (response['C_DATO'] != ''){
					$("#c_delegacion").val(response['C_DATO']);
					$("#d_delegacion").val(response['D_DATO']);
				}
				$("#btn_confirmar").attr('disabled',false);
			}
		}
	});
}

function n_documento_focusout(){
    if ($('#n_documento_new').val().length == 8 || $('#n_documento_new').val().length == 7){
        $('#main').procOverlay({visible:true});
        $.ajax({
            url: "transf_boletos/autocomplete.php",
            type:"POST",
            dataType: 'JSON',
            data:{ p_oper:'documento',
                c_tipo_documento: $("#c_tipo_documento_new").val(),
                n_documento: $("#n_documento_new").val(),
            	p_c_tributo: p_tributo,
				p_d_objeto_hecho: $('#d_objeto_hecho').val(),
				p_id_contribuyente_new: $('#id_contribuyente_new').val(),
				p_id_contribuyente: $('#id_contribuyente_old').val(),
				p_f_vig_hasta: $('#f_vig_hasta_old').val(),
				p_uso: p_uso
			},
            success: function(response){
                $('#main').procOverlay({visible:false});
                if(response){
                	if (response['ERROR'] == 'OK'){
	                    $("#n_cuit_new").val(response['N_CUIT']);
	                    $("#d_denominacion_new").val(response['D_DENOMINACION']);
						$("#id_contribuyente_new").val(response['ID_CONTRIBUYENTE']);
						$("#c_tipo_documento_new").val(response['C_TIPO_DOCUMENTO']);
						$("#d_tipo_documento_new").val(response['D_TIPO_DOCUMENTO']);
						$("#n_documento_new").val(response['N_DOCUMENTO']);
						$("#c_tipo_domicilio_new","#d_tipo_domicilio_new").val(null);
						$("#n_cuit_new, #d_denominacion_new, #c_tipo_documento_new").prop('readonly',true);
						$("#lupa_tipo_documento").hide();
		            	buscar_datos();
		            	busca_delegacion();
					}else{
						mostrar_error(response['ERROR']);
					}
                }
            }
        });
    }
}

function buscar_datos(){
    $('#main').procOverlay({visible:true});
	$.ajax({
        url: "transf_boletos/autocomplete.php",
        type:"POST",
        dataType: 'JSON',
        data:{ p_oper:'dominio',
        	p_id_contribuyente: $("#id_contribuyente_old").val(),
			p_d_objeto_hecho: $("#d_objeto_hecho").val(),
			p_d_dominio_anterior : $('#d_dominio_anterior').val(),
			p_f_vig_hasta: $("#f_vig_hasta_old").val(),
			p_c_tributo: p_tributo},
        success: function(res){
            $('#main').procOverlay({visible:false});
            if(res){
                $("#d_verif_dom").val(res['D_VERIF_DOM']);
                $("#d_verif_dom_ant").val(res['D_VERIF_DOM_ANT']);
				$("#c_delegacion").val(res['C_DELEGACION']);
				$("#d_delegacion").val(res['D_DATO']);
            }
        }
    });
}

function contrib_con_cuit() {
	$("#c_tipo_domicilio_new").removeClass('validate[required]');
	if ($('#frm_cont_nuevo').validationEngine('validate')) {
		post_to_url('contribuyentes.php', {
			'p_objeto_viejo': 'N',
			'p_permite_vs_ag': 'N',
			'p_sintributo': 'S',
			'tipo_documento': $("#c_tipo_documento_new").val(),
			'd_tipo_documento': $("#d_tipo_documento_new").val(),
			'documento': $("#n_documento_new").val(),
			'cuit': $("#n_cuit_new").val(),
			'ruta': "[]",
			'p_n_id_menu': 10865
		}, '_blank');
		$("#c_tipo_domicilio_new").addClass('validate[required]');
	}
}

function contrib_sin_cuit() {
	post_to_url('contribuyentes_st.php', {
		'p_n_id_menu': 10875,
		'ruta': '[]'
	}, '_blank');
}

function responsables(){
	post_to_url('ingreso_copropietarios.php', {
		'p_n_id_menu': 10953,
		'p_modo': 'U',
		'p_tributo': p_tributo,
		'p_objeto': $("#d_objeto_hecho").val(),
		'p_m_autoquery': 'S',
		'ruta': '[]'
	}, '_blank');
}

function legajo_contribuyente() {
	post_to_url('legajo_contribuyente.php', {
		'p_n_id_menu': 10886,
		'p_id_contribuyente': $("#id_contribuyente_new").val(),
		'cuit': $("#n_cuit_new").val(),
		'ruta': '[]'
	}, '_blank');
}

function confirmar(){
	if($('#frm_busqueda').validationEngine('validate') && $('#frm_cont_nuevo').validationEngine('validate') && $('#frm_datos_transf').validationEngine('validate')){
		if(!($("#m_todas_sin_mail").is(':checked')) && p_tributo == 60){
			mostrar_cuadro('Q','Pedir Confirmación','¿La transferencia que esta guardando la cargó de una 4ta Minuta?',
				function() {
					$("#m_cuarta_min").prop('checked', true);
					realizar_operacion();
				},
				function() {
					realizar_operacion();
				});
		}else{
			realizar_operacion();		
		}
	}
}

function realizar_operacion(){
	$('#main').procOverlay({visible:true});
	$.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
        	"p_uso": p_uso,
        	"p_c_tributo": p_tributo,
        	"p_c_tipo_imponible": p_tipo_imponible,
        	"p_sin_restricciones": p_sin_restricciones,
        	"p_id_contribuyente": $("#id_contribuyente_old").val(),
        	"p_id_contribuyente_new": $("#id_contribuyente_new").val(),
        	"p_d_objeto_hecho": $("#d_objeto_hecho").val(),
        	"p_f_vig_hasta": $("#f_vig_hasta_old").val(),
        	"p_c_motivo_mov": $("#c_motivo").val(),
        	"p_d_motivo_mov": $("#d_motivo").val(),
        	"p_c_tipo_domicilio": $("#c_tipo_domicilio_new").val(),
        	"p_n_cuit_new":  limpia_cuit($("#n_cuit_new").val()),
        	"p_c_tipo_documento_new": $("#c_tipo_documento_new").val(),
        	"p_n_documento_new": limpia_dni($("#n_documento_new").val()),
        	"p_d_denominacion_new": $("#d_denominacion_new").val(),
        	"p_c_delegacion": $("#c_delegacion").val(),
        	"p_cuarta_min": $("#m_cuarta_min").val()?"S":"N",
        	"p_fecha_mov": $("#f_movimiento").val(),
        	"p_c_rnpa": $("#c_rnpa").val(),
        	"p_dominio_anterior": $("#d_dominio_anterior").val(),
        	"p_d_verif_dom": $("#d_verif_dom").val(),
        	"p_d_verif_dom_ant": $("#d_verif_dom_ant").val(),
        	"id_menu":10952,
        	"n_orden":0
        },
        dataType:'json',
        success: function( data ) {
        	$('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
            	if (p_uso == 'R') {
					mostrar_confirmacion('Se ha registrado el cambio de responsabilidad.');
				}else{
					mostrar_confirmacion('Se ha registrado el cambio: '+$("#d_motivo").val()+'.');
				}
				$("#btn_responsables").prop('disabled',false);
				$("#btn_confirmar").prop('disabled',true);
				$(".btn_lupa").hide();
            }
            else{
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}

function limpia_dni(dni){
	var result;
	if (dni != null){
		result=dni.replace(/\./gi, '');
		return result;
	}else{
		return null;
	}
}

function realizar_busqueda(){
	$('#main').procOverlay({visible:true});
	$.ajax({
		type: 'POST',
		url: "transf_boletos/autocomplete.php",
		data: {p_oper: 'objeto',
			p_uso: p_uso,
			p_c_tributo: p_tributo,
			p_d_objeto_hecho: $("#d_objeto_hecho").val()},
		dataType: 'json',
		success: function (res) {
			$('#main').procOverlay({visible:false});
			if (res){
				$("#btn_buscar").attr('disabled',true);
				$("#d_denominacion_old").val(res.D_DENOMINACION);
				$("#n_cuit_old").val(res.N_CUIT);
				$("#id_contribuyente_old").val(res.ID_CONTRIBUYENTE);
				$("#c_tipo_documento_old").val(res.C_TIPO_DOCUMENTO);
				$("#d_tipo_documento_old").val(res.D_TIPO_DOCUMENTO);
				$("#n_documento_old").val(res.N_DOCUMENTO);
				$("#f_vig_desde_old").val(res.F_VIG_DESDE);
				$("#f_vig_hasta_old").val(res.F_VIG_HASTA);

				$("#frm_busqueda input").attr('disabled',true);
				$("#datos_transferencia").show();
				$(".btn_lupa").show();
				$("#lupa_objeto, #lupa_dom_ant").hide();
				$("#btn_sin_cuit, #btn_con_cuit").attr('disabled',false);
			}else{
				mostrar_validacion('No se han encontrado datos para la búsqueda realizada.')
			}
		}
	});
}

function check_digito_verificador(param, digito) {
	$.ajax({
		url: "transf_boletos/autocomplete.php",
		type:"POST",
		dataType: "JSON",
		data:{ p_oper:'checkDigito', param: param},
		success: function (res) {
			$('#main').procOverlay({visible:false});
			if(res){
				if(res['DIGITO'] != digito){
					mostrar_error('El Dígito Verificador no es correcto.');
					return;
				}
				else{
					fun_completa_dominio();
				}
			}
			else{
				mostrar_error('Ocurrió un error al comprobar el Digito Verificador.');
			}
		}
	});
}

function fun_completa_dominio(){
	var params = {p_oper:'getDominio'};
	if ($('#d_objeto_hecho').val()){
		params.dominio = $('#d_objeto_hecho').val();
		params.obtener = 'patente_vieja';
	}else if($('#d_dominio_anterior').val()){
		params.dominio = $('#d_dominio_anterior').val();
		params.obtener = 'patente';
	}

	$.ajax({
		url: "transf_boletos/autocomplete.php",
		type:"POST",
		dataType: "JSON",
		data:params,
		success: function (res) {
			$('#main').procOverlay({visible:false});
			if(res){
				if(params.obtener == 'patente_vieja'){
					$('#d_dominio_anterior').val(res['OBJETO']);
					$('#d_verif_dom_ant').val(res['DIGITO']);
				}else if(params.obtener == 'patente'){
					$('#d_objeto_hecho').val(res['OBJETO']);
					$('#d_verif_dom').val(res['DIGITO']);
				}
				realizar_busqueda();
			}
			else{
				mostrar_error('Ocurrió un error al obtener los datos del Dominio.');
			}
		}
	});
}