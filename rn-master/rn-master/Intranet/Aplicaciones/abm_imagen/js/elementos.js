function inicializarElementos(p_n_id_menu){
	$('#btn_cargar_img').click(function(){
		var c_codigo =$("#cargar_img").data('codigo');
		var c_img = $('#archivo').val();
		
		if(c_img != '' && c_img != null){
			fun_guarda_archivo('add','archivo',c_codigo);
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
