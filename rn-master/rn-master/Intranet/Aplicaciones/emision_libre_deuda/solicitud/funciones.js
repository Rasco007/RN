function n_cuit_focusout(){
	if ($('#n_cuit',"#frm_busqueda").val() && $('#n_cuit',"#frm_busqueda").val().length == 13){
		$('#main').procOverlay({visible:true});
		$.ajax({
			url: "emision_libre_deuda/autocomplete.php",
			type:"POST",
			data:{ p_oper: 'cuit', filtro: limpia_cuit($('#n_cuit',"#frm_busqueda").val())},
			success: function(response){
				$('#main').procOverlay({visible:false});
				var res = JSON.parse(response);
				if (res){
					$("#d_denominacion","#frm_busqueda").val(res['D_DENOMINACION']);
					$("#id_contribuyente","#frm_busqueda").val(res['ID_CONTRIBUYENTE']);
					$("#c_tipo_documento","#frm_busqueda").val(res['C_TIPO_DOCUMENTO']);
					$("#d_tipo_documento","#frm_busqueda").val(res['D_TIPO_DOCUMENTO']);
					$("#n_documento","#frm_busqueda").val(res['N_DOCUMENTO']);
                    $("#f_ultimo_certif","#frm_busqueda").val(res['FECHA_ULTIMO']);
					$("#d_denominacion").attr('readonly',true);
				}
			}
		});
	}else{
		$('#frm_busqueda input').val(null);
		$("#d_denominacion").attr('readonly',false);
	}
}

function imprimir_solicitud(){
	$('#main').procOverlay({visible:true});
	$.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
        	"p_id_evento": p_id_evento,
        	"p_c_tributo": $("#c_tributo").val(),
        	"p_objeto_hecho": $("#d_objeto").val(),
        	"p_c_tipo_imponible": $("#c_tipo_imponible").val(),
        	"p_f_desde": $("#f_emision").val(),
        	"p_id_contribuyente": $("#id_contribuyente").val(),
        	"p_observaciones": $("#d_observaciones").val(),
        	"p_prof_solicitante": $("#d_solicitante").val(),
        	"p_n_plano_mensura": $("#n_plano_mensura").val(),
        	"p_motivo": $("#c_motivo").val(),
        	"p_c_delegacion": $("#c_delegacion").val(),
        	"id_menu":10905,
        	"n_orden":0
        },
        dataType:'json',
        success: function( data ) {
			$('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
            	switch(data.p_d_reporte){
            		case 'cctel016_auto':
                        llamar_report('CCTEL_016_AUTO',
                            'p_n_sesion|'+data.p_id_sesion_libre+
                            '&p_d_menu|solicitud',
                            'PDF');
            			break;
            		case 'cctel014':
                        llamar_report('CCTEL_014',
                            'p_n_sesion_libre|'+data.p_id_sesion_libre+
                            '&p_detalle|N',
                            'PDF');
            			break;
            		case 'cctel016':
                        llamar_report('CCTEL_016',
                            'p_n_sesion|'+data.p_id_sesion_libre+
                            '&p_d_menu|solicitud',
                            'PDF');
            			break;
            	}
                if(data.p_imprimir_ley2141 == 'SI'){
                    llamar_report('CCTEL_022_CMH',
                        'p_n_sesion_libre|'+data.p_id_sesion_libre,
                        'PDF');
                }
            }else{
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}