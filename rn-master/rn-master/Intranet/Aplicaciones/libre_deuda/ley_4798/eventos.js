$(document).ready(function () {

	$("#n_cuit").mask("99-99999999-9");

	$('#btn_limpiar').click(function(){
		$('#frm_busqueda input').val(null);
		$('#frm_busqueda input').attr('disabled',false);
		$('.limpiar').attr('readonly',false);
		$('#btn_consultar').attr('disabled',true);
		$('#lupa_c_motivo').show();
		$('#general').hide();
	})
	
	$('#btn_consultar').click(function(){
		var valido = $('#frm_busqueda').validationEngine('validate');
		if(valido){
			$('#main').procOverlay({visible:true});
			$('#frm_busqueda').validationEngine('hideAll');	
			$('#frm_busqueda input, #btn_consultar').attr('disabled',true);
			$('#lupa_c_motivo').hide();
			boton_consultar();
		}
	});

	$("#d_denominacion","#frm_busqueda").autocomplete({
		source: function( request, response ) {
			if (ajax_autocomplete) ajax_autocomplete.abort();
			ajax_autocomplete =
				$.ajax({
					type:'POST',
					url: "libre_deuda/autocomplete.php",
					data: {p_oper:'denominacion', filtro: request.term},
					dataType: 'json',
					success: function( data ) {
						ajax_autocomplete = null;
						if(data) {
							response(
								$.map(data.data_contrib, function( item ) {
									return {
										label: item.label,
										cuit: item.cuit,
										value: item.razon_social,
										id_contribuyente: item.id_contribuyente,
										d_domicilio: item.d_domicilio,
										d_localidad: item.d_localidad
									}
								})
							);
						}
					}
				});
		},
		minLength:1,
		select:function(event,ui){
			$("#n_cuit").val(ui.item.cuit);
			$("#d_denominacion").val(ui.item.value);
			$("#id_contribuyente").val(ui.item.id_contribuyente);
			$("#d_domicilio").val(ui.item.d_domicilio);
			$("#d_localidad").val(ui.item.d_localidad);
			if($("#id_contribuyente","#frm_busqueda").val()){
				$('#btn_consultar').attr('disabled',false);
			}
			return false;
		}
	});

	$("#lupa_c_motivo").lupa_generica({
		id_lista:v_lista_motivos,
		titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_dato',width:100},
			{index:'d_dato',width:350}],
		caption:'Motivos',
		sortname:'c_dato',
		sortorder:'asc',
		campos:{c_dato:'c_motivo',d_dato:'d_motivo'},
		searchCode:true,
		searchInput: '#c_motivo',
		keyNav:true,
		exactField: 'c_dato'
	});
	
	$('#n_cuit',"#frm_busqueda").change(function(){
		n_cuit_focusout();
	});

	// TABS
	$("#1,#2,#3").click(function(){
		$(window).resize();
	});

	$("#btn_emitir_certif").click(function() {
		if (c_habilitar == 'N') { // TIENE DEUDA...
			if (p_sin_restricciones == 'S') { //  TIENE ROLES...
				if ($("#d_observaciones").val().length < 5){// INGRESO EL MOTIVO...
					mostrar_validacion('Complete el campo Observaciones como indica el cuadro de mensajes.');
					$("#d_mensajes").val('**** ATENCION ****\n\nDebe ingresar una observación detallando el motivo por el cual ignora la deuda que presenta el sistema!');
				} else { // ok
					if ($("#id_contribuyente").val()) {
						imprimir_certificado();
					}// id null...
				} // length...
			} // sin controles...
		} else { // NO TIENE DEUDA...
			if ($("#id_contribuyente").val()) {
				imprimir_certificado();
			}
		}
	});

	$("#btn_emitir_incons").click(function(){
		if ($("#id_contribuyente").val()) {
			imprimir_inconsistencias();
		}
	});
});