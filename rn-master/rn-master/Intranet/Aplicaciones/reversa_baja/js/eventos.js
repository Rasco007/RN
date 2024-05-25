function init_eventos() {

	$("#n_cuit").mask("99-99999999-9");
	/*$("#n_documento").mask("99999999999");*/

	$('#n_documento').change(function () {
		if (!$('#id_contribuyente').val() && $('#c_tipo_documento').val() && $('#n_documento').val()){
			n_documento_focusout();
		}
	});

	$('#n_cuit', "#div_main").change(function () {
		if ($('#n_cuit').val() && $('#n_cuit').val().length == 13){
			n_cuit_focusout();
		}else{
			$("#d_denominacion").val(null);
			$("#n_cuit").val(null);
			$("#id_contribuyente").val(null);
		}
	});

	$('.numerico').keypress(function (tecla) {
		return (tecla.charCode >= 48 && tecla.charCode <= 57);
	});

	/*$('#d_dominio').keypress(function () {
		if ($('#d_dominio').val().length >= 2){
			$('#lupa_dominio').show().css('display', 'table-cell');
			$('#mascara_lupa_dominio').hide();
		} else {
			$('#lupa_dominio').hide();
			$('#mascara_lupa_dominio').show().css('display', 'table-cell');
		}
	});

	$('#mascara_lupa_dominio,#mascara_lupa_dom_ant').click(function () {
		mostrar_validacion('Debe ingresar al menos tres caracteres del dominio.');
	});

	$('#d_dom_ant').keypress(function () {
		if ($('#d_dom_ant').val().length >= 2){
			$('#lupa_dominio_ant').show().css('display', 'table-cell');
			$('#mascara_lupa_dom_ant').hide();
		} else {
			$('#lupa_dominio_ant').hide();
			$('#mascara_lupa_dom_ant').show().css('display', 'table-cell');
		}
	});*/

	/*$('#lupa_dominio', "#div_main").hide();
	$('#d_dominio', "#div_main").keypress(function () {
		if ($('#d_dominio', "#div_main").val().length >= 2) {
			$('#lupa_dominio', "#div_main").show();
		}
		else {
			$('#lupa_dominio', "#div_main").hide();
		}
	});

	$('#lupa_dominio_ant', "#div_main").hide();
	$('#d_dom_ant', "#div_main").keypress(function () {
		if ($('#d_dom_ant', "#div_main").val().length >= 2) {
			$('#lupa_dominio_ant', "#div_main").show();
		}
		else{
			$('#lupa_dominio_ant', "#div_main").hide();
		}
	});*/

	$('#c_verif_dom', "#div_main").change(function () {
		if($('#d_dominio', "#div_main").val()){
			verif_dom_focusout($('#d_dominio', "#div_main").val(), $('#c_verif_dom', "#div_main").val());
		}
		else {
			$('#c_verif_dom', "#div_main").val(null);
			mostrar_error('Debe ingresar el Dominio antes que su dígito de verificación.');
		}
	});

	$('#c_verif_dom_ant', "#div_main").change(function () {
		if($('#d_dom_ant', "#div_main").val()){
			verif_dom_focusout($('#d_dom_ant', "#div_main").val(), $('#c_verif_dom_ant', "#div_main").val());
		}
		else {
			$('#c_verif_dom_ant', "#div_main").val(null);
			mostrar_error('Debe ingresar el Dominio Anterior antes que su dígito de verificación.');
		}
	});

	$('#btn_continuar').click(function () {
		if($('#c_verif_dom', "#div_main").val()){
			mostrar_cuadro('C','Confirmación de Baja','Está seguro que desea revertir la baja?',
				function () {
					// llama al prc
					llamar_revertir_baja();
					//mostrar_confirmacion('se dara de baja');
				});
		} else {
			mostrar_validacion('Debe completar:<br>-Dominio o Dominio Anterior<br>-Dígito Verificador.');
		}
	});

	$('#btn_limpiar').click(function () {
		limpiar_app();
	});

	// ------------------ LUPAS ---------------------

	$("#lupa_c_tipo_documento").lupa_generica({
		id_lista:10781,
		titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_dato',width:100},
			{index:'d_dato',width:350}],
		caption:'Tipos de Documento',
		sortname:'c_dato',
		sortorder:'asc',
		campos:{c_dato:'c_tipo_documento',d_dato:'d_tipo_documento'},
		searchCode:true,
		searchInput: '#c_tipo_documento',
		keyNav:true,
		exactField: 'c_dato'
	});

	$("#lupa_dominio").lupa_generica({
		id_lista: 10881,
		titulos: ['Dominio', 'Dominio Anterior'],
		grid: [{index: 'd_objeto_hecho', width: 200},
			{index: 'd_patente_vieja', width: 200}],
		caption: 'Dominios',
		campos: {d_objeto_hecho: 'd_dominio', d_patente_vieja: 'd_dom_ant'},
		filtros: ['#d_dominio','#id_contribuyente'],
		filtrosNulos:[true,true],
		filtrosTitulos: ['Dominio','CUIT']
	});

	$("#lupa_dominio_ant").lupa_generica({
		id_lista: 10882,
		titulos: ['Dominio', 'Dominio Anterior'],
		grid: [{index: 'd_objeto_hecho', width: 200},
			{index: 'd_patente_vieja', width: 200}],
		caption: 'Dominios Anteriores',
		campos: {d_objeto_hecho: 'd_dominio', d_patente_vieja: 'd_dom_ant'},
		filtros: ['#d_dom_ant','#id_contribuyente'],
		filtrosNulos:[true,true],
		filtrosTitulos: ['Dominio Anterior','CUIT']
	});
}