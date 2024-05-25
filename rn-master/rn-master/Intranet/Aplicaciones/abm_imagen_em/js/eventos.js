function init_eventos() {
    $('#btn_cargar_img').click(function(){
		var id_imagen =$("#cargar_img").data('id_imagen');
		var modo =$("#cargar_img").data('modo');
		var c_img = $('#archivo').val();
		
		if(c_img != '' && c_img != null){
			fun_guarda_archivo('add','archivo',id_imagen, modo);
		}else{
			alert('No especificó el archivo de imágen. Seleccione una para continuar.');
		}

		$("#archivo").val('');
		$("#cargar_img").modal('hide');

	});
	
	$('#btn_cancelar_carga').click(function(){
		$("#cargar_img").modal('hide');
	});
	
	$('#btn_salir_visualizacion').click(function(){
		$("#ver_img").modal('hide');
	});
}

