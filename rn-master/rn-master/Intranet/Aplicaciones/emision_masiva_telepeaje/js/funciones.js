function emisionMasiva() {
    $('#main').procOverlay({visible:true});
	$.ajax({
		url: FUNCIONES_BASEPATH+'maestro_abm.php',
		type:"POST",
		data:{
			"id_menu": v_id_menu,
			"n_orden": 0,
			"p_n_cuota": $('#filtro_cuota').val(),
			"p_posicion_fiscal": $('#filtro_periodo').val()
		},
		async:false,
		dataType: 'json',
		success: function(ret) {
			$('#main').procOverlay({visible:false});
			
			if(ret.resultado == 'OK'){
				if (ret.p_m_errores == 'N'){
					// exito sin errores
					mostrar_confirmacion('Se realizó la emisión masiva de telepeaje de manera exitosa.');
				} else {
					// exito con errores
					mostrar_mensaje('Atención','Se produjeron errores durante la emisión masiva de telepeaje. A continuación se detallarán los mismos.',fun_mostrar_errores());
				}
			} else {
				mostrar_error(ret.resultado);
			}
		}
	});
}

function fun_mostrar_errores(){
    setea_parametros("#grid_errores",{':n_posicion_fiscal':$('#filtro_periodo').val(),':n_cuota':$('#filtro_cuota').val()});
    $("#modal_errores").modal('show');
    $(window).resize();
}