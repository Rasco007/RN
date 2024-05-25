$(document).ready(function () {

	$("#n_cuit").mask("99-99999999-9");

	$('#btn_limpiar').click(function(){
		$('#frm_busqueda input').val(null);
		$('#frm_busqueda input').attr('disabled',false);
		$('.limpiar').attr('readonly',false);
		$('#btn_consultar').attr('disabled',true);
		$('#lupa_d_nomenclatura').show();
		$('#general').hide();
	})
	
	$('#btn_consultar').click(function(){
		var valido = $('#frm_busqueda').validationEngine('validate');  // will return true or false
		if(valido){
			$('#main').procOverlay({visible:true});
			$('#frm_busqueda').validationEngine('hideAll');	
			$('#frm_busqueda input, #btn_consultar').attr('disabled',true);
			$('#lupa_d_nomenclatura').hide();
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
										id_contribuyente: item.id_contribuyente
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
			if($("#id_contribuyente","#frm_busqueda").val()){
				$('#btn_consultar').attr('disabled',false);
			}
			return false;
		}
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

	$("#lupa_d_nomenclatura").lupa_generica({
		id_lista:v_lista_nomen_part,
		titulos:['Nomenclatura','Partida'],
		grid:[{index:'d_nomenclatura_real',width:150},
			{index:'d_nomenclatura',width:350}],
		caption:'Nomenclaturas',
		sortname:'d_nomenclatura_real',
		sortorder:'asc',
		campos:{d_nomenclatura_real:'d_nomenclatura',d_nomenclatura:'d_partida'},
		keyNav:true,
		exactField: 'c_dato'
	});

	$('#d_partida',"#frm_busqueda").change(function(){
		$('#main').procOverlay({visible:true});
		$.ajax({
			url: "libre_deuda/autocomplete.php",
			type:"POST",
			data:{ p_oper:'nomenclatura', filtro: $('#d_partida').val()},
			success: function(response){
				$('#main').procOverlay({visible:false});
				res = JSON.parse(response);
				if (res){
					$("#d_nomenclatura","#frm_busqueda").val(res['D_NOMENCLATURA_REAL']);
				}else{
					$("#d_partida","#frm_busqueda").val(null);
					$("#d_nomenclatura","#frm_busqueda").val(null);
				}
			}
		});
	});
});