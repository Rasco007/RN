function boton_consultar(){
	$.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
        	"p_tributo": p_tributo,
        	"p_cuit": limpia_cuit($("#n_cuit").val()),
            "p_nombre": $("#d_denominacion").val(),
            "p_d_objeto": $("#d_objeto").val(),
        	"p_sin_controles": p_sin_restricciones,
        	"p_id_contribuyente": $("#id_contribuyente").val(),
        	"id_menu":10900,
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
	$('#main').procOverlay({visible:true});
	var v_n_orden;
	var v_c_tipo_reporte;
	if (p_tributo == 90){
		v_n_orden = 1;
		v_c_tipo_reporte = 'CONTL_050_AUTO';
	}else{
		v_n_orden = 2;
		v_c_tipo_reporte = 'CONTL_050_INMO';
	}
	$.ajax({
		type: 'POST',
		url: FUNCIONES_BASEPATH + 'maestro_abm.php',
		data: {
			"p_id_certificado": v_id_certificado,
			"p_obs": $("#d_observaciones").val(),
			"id_menu": 10900,
			"n_orden": v_n_orden
		},
		dataType: 'json',
		success: function(data) {
			$('#main').procOverlay({visible:false});
			if (data.resultado == 'OK') {
				llamar_report(v_c_tipo_reporte,
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
	llamar_report('CONTL_049',
        'p_id_certificado|'+v_id_certificado,
    	'PDF');
	$('#main').procOverlay({visible:false});
}