function init_eventos() {

	$("#n_cuit").mask("99-99999999-9");

	$('#n_cuit', "#div_main").change(function () {
		n_cuit_focusout();
	});

	$('#n_documento', "#div_main").change(function () {
		n_documento_focusout();
	});

	$('.numerico').keypress(function (tecla) {
		return ( (tecla.charCode >= 48 && tecla.charCode <= 57));
	});

	$('.tecladoDominio').keypress(function (tecla) {
		return ( (tecla.charCode >= 48 && tecla.charCode <= 57)
			|| (tecla.charCode >=65 && tecla.charCode <=90)
			|| (tecla.charCode >=97 && tecla.charCode <=122) );
	});

	$('.datepicker').datepicker({
		dateFormat:'dd/mm/yy',
		changeMonth:true,
		changeYear:true,
		maxDate:fecha_hoy,
		dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
		monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
		monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
	}).mask("99/99/9999").change(function () {
		if ($(this).val() && $(this).val().length != 10){
			mostrar_validacion("El Formato de la Fecha ingresada no es válido.");
			$(this).val(null);
		}else if ($.datepicker.parseDate('dd/mm/yy', $(this).val()) > $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
			$(this).datepicker("setDate" , fecha_hoy);
		}
	});

	$('#d_dominio').on('keyup', function () {
		if (!$("#id_contribuyente").val()){
			if ($('#d_dominio').val().length >= 3){
				$('#lupa_dominio').show().css('display', 'table-cell');
				$('#mascara_lupa_dominio').hide();
			} else {
				$('#lupa_dominio').hide();
				$('#mascara_lupa_dominio').show().css('display', 'table-cell');
			}
		}
	});

	$('#d_dom_ant').on('keyup', function () {
		if (!$("#id_contribuyente").val()) {
			if ($('#d_dom_ant').val().length >= 2) {
				$('#lupa_dominio_ant').show().css('display', 'table-cell');
				$('#mascara_lupa_dom_ant').hide();
			} else {
				$('#lupa_dominio_ant').hide();
				$('#mascara_lupa_dom_ant').show().css('display', 'table-cell');
			}
		}
	});

	$('#btn_continuar').click(function () {
		if($('#d_dominio').val() && $('#c_verif_dom').val()){
			check_digito_verificador( $('#d_dominio').val(), $('#c_verif_dom').val() );
			setea_parametros('#responsables_grid',{
								':d_dominio': $('#d_dominio',"#div_main").val(),
								':c_tributo': 90 });
		}
		else if ( $('#d_dom_ant').val() && $('#c_verif_dom_ant').val() ){
			check_digito_verificador( $('#d_dom_ant').val(), $('#c_verif_dom_ant').val() );
			setea_parametros('#responsables_grid',{
				':d_dominio': $('#d_dominio',"#div_main").val(),
				':c_tributo': 90 });
		}
		else {
			mostrar_error('Debe completar un dominio y su dígito verificador.')
		}
	});

	$('#btn_limpiar').click(function () {
		limpiar_app();
	});

	$('#btn_imprimir').click(function () {
		imprimir_reporte();
	});

	$('#btn_aceptar_baja').click(function () {
		if($('#form_baja').validationEngine('validate')){
			let pregunta = "¿Está seguro que desea realizar la baja provisoria?";
			if (v_modo === 'D'){
				pregunta = "¿Está seguro que desea realizar la baja definitiva?";
			}
			mostrar_cuadro('C','Confirmación de Baja',pregunta,
				function () {
					llamar_procedimiento();
				});
		}
	});

	$("#d_denominacion").autocomplete({
		source: function (request, response) {
			if (ajax_autocomplete) ajax_autocomplete.abort();
			ajax_autocomplete =
				$.ajax({
					type: 'POST',
					url: "baja_aut/consultas_ajax.php",
					data: {p_oper: 'denominacion', filtro: request.term},
					dataType: 'json',
					success: function (data) {
						ajax_autocomplete = null;
						if (data) {
							response(
								$.map(data.data_contrib, function (item) {
									return {
										label: item.label,
										value: item.razon_social,
										cuit: item.cuit,
										id_contribuyente: item.id_contribuyente,
										c_tipo_documento: item.c_tipo_documento,
										d_tipo_documento: item.d_tipo_documento,
										n_documento: item.n_documento
									}
								})
							);
						}
					}
				});
		},
		minLength: 1,
		select: function (event, ui) {
			$("#d_denominacion").val(ui.item.value);
			$("#n_cuit").val(ui.item.cuit);
			$("#id_contribuyente").val(ui.item.id_contribuyente);
			$("#c_tipo_documento").val(ui.item.c_tipo_documento);
			$("#d_tipo_documento").val(ui.item.d_tipo_documento);
			$("#n_documento").val(ui.item.n_documento);
			if ($("#d_denominacion").val()){
				if($("#id_contribuyente").val()){
					habilitar_dominios(true);
				}else{
					habilitar_dominios(false);
				}
			}else{
				$("#n_cuit").val(null);
				$("#id_contribuyente").val(null);
				$("#c_tipo_documento").val(null);
				$("#d_tipo_documento").val(null);
				$("#n_documento").val(null);
				habilitar_dominios(false);
			}
			return false;
		}
	});

	$('#btn_buscar').click(function() {
		if (!$('#d_dominio').val() && !$('#d_dom_ant').val() && !$('#id_contribuyente').val()){
			mostrar_cuadro('V', 'Atención', 'Debe ingresar los datos del Contribuyente o Dominio/Dominio Anterior para realizar la búsqueda.',null,null,400);
			return;
		}else if($('#d_dominio').val() && !$('#c_verif_dom').val()){
			mostrar_cuadro('V', 'Atención', 'Debe ingresar el Dígito Verificador del Dominio.',null,null,400);
			return;
		}else if ($('#d_dom_ant').val() && !$('#c_verif_dom_ant').val()){
			mostrar_cuadro('V', 'Atención', 'Debe ingresar el Dígito Verificador del Dominio Anterior.',null,null,400);
			return;
		}else{
			if ($('#d_dominio').val() != ""){
				check_digito_verificador($('#d_dominio').val(), $('#c_verif_dom').val(),'patente_vieja');
			}
			else if ($('#d_dom_ant').val() != ""){
				check_digito_verificador($('#d_dom_ant').val(), $('#c_verif_dom_ant').val(),'patente');
			} else{
				setea_parametros('#main_grid',
					{':id_contribuyente': $('#id_contribuyente').val(),
						':d_objeto': $('#d_dominio').val(),
						':p_modo': v_modo});
			}
		}
	});

	$('#btn_aplicar_baja').click(function () {
		var id = $("#main_grid").getGridParam('selrow');
		if (id) {
			$('#f_baja').datepicker("option", 'minDate', $.datepicker.parseDate('dd/mm/yy', $('#main_grid').getCell(id,'f_vig_desde')));
			if (v_modo === 'D'){
				$('#f_baja').val($('#main_grid').getCell(id,'f_cese_provisorio'));
				$('#c_motivo').val($('#main_grid').getCell(id,'c_motivo_cese_prov'));
				$('#d_motivo').val($('#main_grid').getCell(id,'d_motivo_cese_prov'));
				$('#c_delegacion').val($('#main_grid').getCell(id,'c_delegacion'));
				$('#d_delegacion').val($('#main_grid').getCell(id,'d_delegacion'));
			}
			$('#modal_baja').modal({backdrop: 'static', keyboard: false});
		}else {
			mostrar_validacion('Debe seleccionar un Automotor de la grilla.');
			return false;
		}
	})
}