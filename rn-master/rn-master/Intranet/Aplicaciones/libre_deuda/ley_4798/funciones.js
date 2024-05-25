function n_cuit_focusout(){
	if ($('#general').length) {
		id_contribuyente = null;
	}
	if ($('#n_cuit',"#frm_busqueda").val() && $('#n_cuit',"#frm_busqueda").val().length == 13){
		$('#main').procOverlay({visible:true});
		$.ajax({
			url: "libre_deuda/autocomplete.php",
			type:"POST",
			data:{ p_oper:'cuit', filtro: limpia_cuit($('#n_cuit',"#frm_busqueda").val())},
			success: function(response){
				$('#main').procOverlay({visible:false});
				res = JSON.parse(response);
				if (res){
					$("#d_denominacion","#frm_busqueda").val(res['D_DENOMINACION']);
					$("#id_contribuyente","#frm_busqueda").val(res['ID_CONTRIBUYENTE']);
					$("#d_domicilio","#frm_busqueda").val(res['D_DOMICILIO']);
					$("#d_localidad","#frm_busqueda").val(res['D_LOCALIDAD']);
					$("#d_denominacion, #d_domicilio, #d_localidad").attr('readonly',true);
					if($("#id_contribuyente","#frm_busqueda").val()){
						$('#btn_consultar').attr('disabled',false);
					}
				}
			}
		});
	}else{
		$('#frm_busqueda input').val(null);
		$("#d_denominacion, #d_domicilio, #d_localidad").attr('readonly',false);
	}
}

function boton_consultar(){
	$.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
        	"p_sin_controles": p_sin_restricciones,
        	"p_c_motivo": $("#c_motivo").val(),
        	"p_id_contribuyente": $("#id_contribuyente").val(),
        	"id_menu":10883,
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
	var valido = $('#frm_tabs').validationEngine('validate');
	if(valido){
		$('#main').procOverlay({visible:true});
		$.ajax({
			type: 'POST',
			url: FUNCIONES_BASEPATH + 'maestro_abm.php',
			data: {
				"p_id_certificado": v_id_certificado,
				"p_obs": $("#d_observaciones").val(),
				"id_menu": 10883,
				"n_orden": 1
			},
			dataType: 'json',
			success: function(data) {
				if (data.resultado == 'OK') {
					llamar_report('CONTL_045',
	                    'p_id_certificado|'+v_id_certificado,
	                	'PDF');
					$('#main').procOverlay({visible:false});
				} else {
					mostrar_error(data.resultado);
					return;
				}
			}
		});
	}
}

function imprimir_inconsistencias(){
	$('#main').procOverlay({visible:true});
	llamar_report('CONTL_046',
        'p_id_certificado|'+v_id_certificado,
    	'PDF');
	$('#main').procOverlay({visible:false});
}