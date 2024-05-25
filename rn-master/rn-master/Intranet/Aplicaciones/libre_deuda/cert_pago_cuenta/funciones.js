function n_cuit_focusout(){
	if ($('#general').length) {
		id_contribuyente = null;
	}
	if ($('#n_cuit',"#frm_busqueda").val() && $('#n_cuit',"#frm_busqueda").val().length == 13){
		$('#main').procOverlay({visible:true});
		autocomplete_cuit('');
	}else{
		$('#frm_busqueda input').val(null);
		$("#d_denominacion").attr('readonly',false);
	}
}

function autocomplete_cuit(ret){
	$.ajax({
		url: "libre_deuda/autocomplete.php",
		type:"POST",
		data:{ p_oper:'pago_cuenta', p_modo:'cuit', filtro: limpia_cuit($('#n_cuit',"#frm_busqueda").val())},
		success: function(response){
			$('#main').procOverlay({visible:false});
			res = JSON.parse(response);
			if (res){
				if(res['CANT'] == 1){
					$("#d_denominacion","#frm_busqueda").val(res['NOMBRE']);
					$("#id_contribuyente","#frm_busqueda").val(res['ID_CONTRIBUYENTE']);
					$("#d_domicilio","#frm_busqueda").val(res['DOMICILIO']);
					$("#d_localidad","#frm_busqueda").val(res['LOCALIDAD']);
					$("#c_tributo","#frm_busqueda").val(res['C_TRIBUTO']);
					$("#d_tributo","#frm_busqueda").val(res['D_TRIBUTO']);
					$("#n_inscripcion","#frm_busqueda").val(res['N_INSCRIPCION']);
					$("#d_denominacion").attr('readonly',true);
					if($("#id_contribuyente","#frm_busqueda").val()){
						$('#btn_consultar').attr('disabled',false);
					}
					if(ret == 'false'){
						return false;
					}
				}else{
					mostrar_error('Usted posee más de una inscripción vigente en el impuesto a los Ingresos Brutos.'+'<br>'+
						'Para regularizar su situación, diríjase a la oficina más cercana.');
					if(ret == 'false'){
						return false;
					}
				}
			}else{
				mostrar_error('Usted no posee inscripción vigente en el impuesto a los Ingresos Brutos.');
				if(ret == 'false'){
					return false;
				}
			}
		}
	});
}

function boton_consultar(){
	$.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
        	"p_id_contribuyente": $("#id_contribuyente").val(),
            "p_c_tributo": $("#c_tributo").val(),
            "p_n_inscripcion": $("#n_inscripcion").val(),
        	"p_sin_controles": p_sin_restricciones,
        	"id_menu":10904,
        	"n_orden":0
        },
        dataType:'json',
        success: function( data ) {
        	$('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
        		$("#d_mensajes").val(data.p_txt_msg);
        		v_id_certificado = data.p_id_certificado;
        		crea_grillas(v_id_certificado);
				setea_parametros('#grid_obligaciones',{':id_certificado': data.p_id_certificado});
				setea_parametros('#grid_gest_judicial',{':id_certificado': data.p_id_certificado});
				c_habilitar = data.p_c_habilitar;
				if(data.p_habilitar_emitir == 'SI'){
					$("#btn_emitir_certif").attr('disabled',false);
					if(data.p_observaciones_oblig == 'SI'){
						$("#d_observaciones").addClass('validate[required]');
					}else{
						$("#d_observaciones").removeClass('validate[required]');
					}
				}else{
					$("#btn_emitir_certif").attr('disabled',true);
					$("#d_observaciones").removeClass('validate[required]');
				}
				if(data.p_habilitar_inconsist == 'NO'){
					$("#btn_emitir_incons").attr('disabled',true);
				}else{
					$("#btn_emitir_incons").attr('disabled',false);
				}
				$("#1").click();
				$("#general").show();
            }else{
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}

function imprimir_certificado(){
	$('#main').procOverlay({visible:true});
	$.ajax({
		type: 'POST',
		url: FUNCIONES_BASEPATH + 'maestro_abm.php',
		data: {
			"p_id_certificado": v_id_certificado,
			"p_obs": $("#d_observaciones").val(),
			"id_menu": 10904,
			"n_orden": 1
		},
		dataType: 'json',
		success: function(data) {
			$('#main').procOverlay({visible:false});
			if (data.resultado == 'OK') {
				llamar_report('RECAL_054',
                    'p_id_certificado|'+v_id_certificado,
                	'PDF');
			} else {
				mostrar_error(data.resultado);
				return;
			}
		}
	});
}

function imprimir_inconsistencias(){
	$('#main').procOverlay({visible:true});
	llamar_report('CONTL_050',
        'p_id_certificado|'+v_id_certificado,
    	'PDF');
	$('#main').procOverlay({visible:false});
}