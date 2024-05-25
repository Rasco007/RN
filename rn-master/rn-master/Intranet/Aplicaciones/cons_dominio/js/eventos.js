$(document).ready(function () {

	if(p_modo != 'C'){
		$("#m_convocatoria").attr('disabled',true);
	}

	$('.numero').keypress(function (tecla) {
		return (tecla.charCode >= 48 && tecla.charCode <= 57);
	});

	$(".numero_decimal").each(function () {
		var events = $._data(this, 'events');
		if (events && events['keydown']) return;
		$(this).keydown(function (event) {
			return controla_number(event, this, 2);
		});
	})

	$("#f_ult_transformacion").attr('disabled',true);

	$("#d_patente").change(function(){
		if($(this).val() != ""){
			existe_patente();
		}else if (!$(this).val() && !$("#d_patente_vieja").val()){
			v_existe = void 0;
		}
	});

	$("#d_patente_vieja").change(function(){
		if($(this).val() != ""){
			valida_patente();
		}else if (!$(this).val() && !$("#d_patente").val()){
			v_existe = void 0;
		}
	});

	$("#btn_buscar").click(function(){
		if($("#d_patente").val()!="" || $("#d_patente_vieja").val()!=""){
			if(v_existe){
				if (!$('#d_patente').val() && !$('#d_patente_vieja').val()){
					mostrar_validacion('Ingrese un Dominio o Dominio Anterior para realizar la búsqueda.');
					return;
				}
				if ($('#d_patente').val() && !$('#d_verif_dom').val()){
					mostrar_validacion('Debe ingresar el Dígito Verificador del Dominio.');
					return;
				}
				if ($('#d_patente_vieja').val() && !$('#d_verif_dom_ant').val()) {
					mostrar_validacion('Debe ingresar el Dígito Verificador del Dominio Anterior.');
					return;
				}
				if ($('#d_patente').val() != ""){
					check_digito_verificador($('#d_patente').val(), $('#d_verif_dom').val());
				}
				else if ($('#d_patente_vieja').val() != ""){
					check_digito_verificador($('#d_patente_vieja').val(), $('#d_verif_dom_ant').val());
				}
			}
		}else{
			mostrar_validacion('El campo Dominio/Dominio Anterior no puede ser vacío.');
		}
	});

	$("#btn_continuar").click(function(){
		if($("#d_patente").val()!="" || $("#d_patente_vieja").val()!=""){
			if(!v_existe){
				if ($("#d_patente").val()){
					if($("#d_patente").val().length==6 || $("#d_patente").val().length==7 || $("#d_patente").val().length==9){
						habilitar_campos();
						$("#div_info").show();
						$("#div_form_contrib").show();
						$("#div_grilla_contrib").hide();
						$("#btn_con_cuit, #btn_sin_cuit, #m_convocatoria").attr('disabled',false);
						$("#btn_responsables, #btn_exenciones, #d_patente").attr('disabled',true);
						$("#f_vig_desde","#frm_datos_contrib").val($("#f_radicacion").val());
						$("#c_motivo_alta","#frm_datos_contrib").val($("#c_motivo_alta","#frm_busqueda").val());
						$("#d_motivo_alta","#frm_datos_contrib").val($("#d_motivo_alta","#frm_busqueda").val());
					}else{
						mostrar_validacion('La longitud del dominio debe ser igual a 6, 7 o 9 caracteres.');
					}
				} else if ($("#d_patente_vieja").val()){
					habilitar_campos();
					$("#div_info").show();
					$("#div_form_contrib").show();
					$("#div_grilla_contrib").hide();
					$("#btn_con_cuit, #btn_sin_cuit, #m_convocatoria").attr('disabled',false);
					$("#btn_responsables, #btn_exenciones, #d_patente_vieja").attr('disabled',true);
					$("#f_vig_desde","#frm_datos_contrib").val($("#f_radicacion").val());
					$("#c_motivo_alta","#frm_datos_contrib").val($("#c_motivo_alta","#frm_busqueda").val());
					$("#d_motivo_alta","#frm_datos_contrib").val($("#d_motivo_alta","#frm_busqueda").val());
				}
			}
		}else{
			mostrar_validacion('El campo Dominio/Dominio Anterior no puede ser vacío.');
		}
	});

	$('#btn_limpiar').click(function(){
		v_existe = void 0;
		$('#m_convocatoria').attr('disabled',true).prop('checked',false);
		$("#div_info").hide();
		$("#frm_busqueda :input[type='text'], #frm_datos_contrib :input").val('');
		$("#frm_busqueda :input[type='text'], #frm_datos_contrib :input").trigger('reset');
		$("#d_patente, #d_verif_dom, #d_patente_vieja, #d_verif_dom_ant").attr('disabled',false);
		$('#c_motivo_alta, #f_radicacion',"#frm_busqueda").attr('disabled',false);
		$("#lupa_dominio, #lupa_dom_ant, #lupa_motivo_alta").show();
		$(".selectpicker").selectpicker('refresh');
		$("#m_no").click();
		$("#btn_buscar, #btn_continuar").attr('disabled',false);
		$("#btn_buscar").show();
		$("#btn_continuar").hide();
		setea_parametros('#contribuyentes_grid',{
			':p_d_patente': null,
			':p_modo': p_modo});
	});

	$(".radios").click(function() {
	    $(".radios[value!='" + $(this).val() + "']").prop('checked', false);
	    if($(this).val() == 'X'){
	    	$("#f_hasta_gh").attr('disabled',false);
	    	$("#f_hasta_gh").addClass('validate[required]');
	    }else{
	    	$("#f_hasta_gh").attr('disabled',true);
	    	$("#f_hasta_gh").removeClass('validate[required]');
	    	$("#f_hasta_gh").val(null);
	    }
	});

	$("#f_hasta_gh").change(function(){
		if($(this).val() == ''){
			$("#m_no").click();
		}
	});

	$("#c_fmcamod").change(function(){
		if($(this).val() != ""){
			$('#main').procOverlay({visible:true});
			$.ajax({
				url: "cons_dominio/ajax_consultas.php",
				type:"POST",
				dataType: "JSON",
				data:{
					p_oper:'fmcamod',
					filtro: $("#c_fmcamod").val()
				},
				success: function (res) {
					$('#main').procOverlay({visible:false});
					if(res){
						$("#d_fmcamod").val(res['D_FMCAMOD']);
					}else{
						$('#c_fmcamod, #d_fmcamod').val(null);
						mostrar_validacion('El código MTM no es valido.');
					}
				}
			});
		}else{
			$("#d_fmcamod").val(null);
		}
	});

	$("#lupa_fmcamod").click(function(){
		$("#modal_mtm").modal('show');
	});

	$("#btn_aceptar_mtm").click(function(){
		if($("#frm_datos_mtm").validationEngine('validate')){
			$("#c_fmcamod").val($("#aux_mtm").val());
			$("#d_fmcamod").val($("#aux_descripcion").val());
			$("#modal_mtm").modal('hide');
		}
	});

    inicializar_lupas();

	$(".datepicker").datepicker({
		changeMonth:true,
		changeYear:true,
		dateFormat:'dd/mm/yy',
		currentText: 'Hoy',
		monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
		dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
		dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
		dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá']
	}).mask('99/99/9999').change(function () {
		if ($(this).val().length > 0 && $(this).val().length != 10){
			mostrar_error("El Formato de la Fecha ingresada no es válido.");
			$(this).val(null);
		}
	});

	$("#n_modelo").change(function() {
		if($(this).val()){
			if ($(this).val() > parse(v_anio)){
				$(this).val(null);
				mostrar_validacion('El modelo año debe ser menor o igual al año vigente.');
			}else if ($(this).val() < 1920){
				$(this).val(null);
				mostrar_validacion('El modelo año debe ser mayor o igual al año 1920.');
			}
		}
	});

	$("#n_peso").change(function() {
		if(parse($(this).val()) >= parse($("#n_peso_max").val()) && $("#n_peso_max").val() != ""){
			$(this).val(null);
			mostrar_validacion('Para este grupo el peso tiene que ser menor a '||$("#n_peso_max").val());
		}else{
			if($("#c_grupo").val() == 'C1'){
				valida_n_cilindrada();
			}else{
				if($("#c_grupo").val() == 'D1'){
					if($(this).val() == ''){
						$(this).val(0);
					}else{
						if(parse($(this).val()) > 0){
							$(this).val(null);
							mostrar_validacion('La eslora ingresada no es valida.');
						}
					}
				}else{
					if($("#c_grupo").val() == 'D2' || $("#c_grupo").val() == 'D3'){
						if(parse($(this).val()) == 0 || $(this).val() == ''){
							$(this).val(null);
							mostrar_validacion('Debe ingresar eslora > 0.');
						}
					}
				}				
			}
		}
	});

	$("#n_hp").change(function(){
		if(parse($(this).val()) >= 1000){
			$(this).val(null);
			mostrar_validacion('Para este grupo los hp tiene que ser menor a 1000.');
		}else{
			if($(this).val() != "" && ($("#c_grupo").val() != 'D1' || $("#c_grupo").val() != 'D2')){
				$(this).val(null);
				mostrar_validacion('Para este grupo no debe tener hp.');
			}else{
				if($(this).val() == "" && ($("#c_grupo").val() == 'D1' || $("#c_grupo").val() == 'D2')){
					$(this).val(null);
					mostrar_validacion('Para este grupo debe tener hp.');
				}
			}
		}
	});

	$("#f_radicacion").change(function(){
		if($(this).val() == ""){
	    	$("#btn_contribuyente").attr('disabled',true);
		}else{
			if ($.datepicker.parseDate('dd/mm/yy', $(this).val()) < $.datepicker.parseDate('dd/mm/yy', '01/01/1920')){
				mostrar_error("La Fecha ingresada no puede ser menor a '01/01/1920'.");
				$(this).val(null).focus();
			}else if ($.datepicker.parseDate('dd/mm/yy', $(this).val()) > $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
				mostrar_error("La Fecha ingresada no puede ser mayor a la fecha actual.");
				$(this).val(null).focus();
			}else{
				$("#btn_contribuyente").attr('disabled',false);
			}
		}
	});

	$("#f_inscripcion").change(function(){
		if ($("#f_inscripcion").val() && $("#f_inscripcion").val().length == 10){
			if ($.datepicker.parseDate('dd/mm/yy', $(this).val()) < $.datepicker.parseDate('dd/mm/yy', '01/01/1920')){
				mostrar_error("La Fecha ingresada no puede ser menor a '01/01/1920'.");
				$(this).val(null).focus();
			}else if ($.datepicker.parseDate('dd/mm/yy', $(this).val()) > $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
				mostrar_error("La Fecha ingresada no puede ser mayor a la fecha actual.");
				$(this).val(null).focus();
			}else{
				$.ajax({
					type:'POST',
					url: FUNCIONES_BASEPATH+'maestro_abm.php',
					data:{
						"p_f_inscripcion": $("#f_inscripcion").val(),
						"p_n_modelo_año": $("#n_modelo").val(),
						"p_d_patente": $("#d_patente").val(),
						"id_menu":10989,
						"n_orden":4
					},
					dataType:'json',
					success: function( data ) {
						if(data.resultado != 'OK'){
							mostrar_error(data.resultado);
							return;
						}
					}
				});
			}
		}
	});

	$("#f_ult_transformacion").change(function(){
		if ($("#f_ult_transformacion").val() && $("#f_ult_transformacion").val().length == 10){
			if ($.datepicker.parseDate('dd/mm/yy', $(this).val()) < $.datepicker.parseDate('dd/mm/yy', $("#f_radicacion").val())){
				mostrar_error("La Fecha ingresada no puede ser menor a "+$("#f_radicacion").val());
				$(this).val(null).focus();
			}else if ($.datepicker.parseDate('dd/mm/yy', $(this).val()) > $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
				mostrar_error("La Fecha ingresada no puede ser mayor a la fecha actual.");
				$(this).val(null).focus();
			}
		}
	});

	$("#btn_mov_hist").click(function(){
		btn_movimientos_hist();
	});

	$("#btn_impuesto_anual").click(function(){
		if($("#f_radicacion").val() != ""){
			btn_impuesto_anual();
		}else{
			mostrar_validacion('Ingrese primero una fecha de radicación.');
		}
	});

	$("#tmp_impuesto_anual_grid").jqGrid({
		caption: "Impuesto Anual:",
    	colNames: tmp_impuesto_anual_grid.colNames(),
    	colModel: tmp_impuesto_anual_grid.colModel(),
    	postData: tmp_impuesto_anual_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
    	sortname: 'n_anio',
    	sortorder: 'desc',
		height: 200,
    	autowidth:false,
    	pager: $('#tmp_impuesto_anual_grid_pager')
    }).navGrid('#tmp_impuesto_anual_grid_pager', {add:false, edit:false, del:false});

	$("#btn_contribuyente").click(function(){
		$("#datos_contrib").modal('show');
		$(window).resize();
	});

	$("#btn_grabar_datos").click(function(){
		btn_grabar_datos();
	});

	$("#contribuyentes_grid").jqGrid({
		caption: "Datos del Contribuyente:",
		colNames: contribuyentes_grid.colNames(),
		colModel: contribuyentes_grid.colModel(),
		postData: contribuyentes_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
		sortname: 'f_vig_hasta',
		sortorder: 'desc',
		height: 200,
		autowidth:false,
		pager: $('#contribuyentes_pager')
	}).navGrid('#contribuyentes_pager', {add:false, edit:false, del:false});

	$("#n_cuit").mask("99-99999999-9");
	$("#n_documento").mask("99999999999");

	$('#n_cuit',"#frm_datos_contrib").change(function(){
		autocompleta_contrib('cuit');
	});

	$('#n_documento',"#frm_datos_contrib").change(function(){
		autocompleta_contrib('documento');
	});

	$("#btn_con_cuit").click(function(){
		btn_contrib_con_cuit();
	});

	$("#btn_sin_cuit").click(function(){
		btn_contrib_sin_cuit();
	});

	$("#btn_legajo_contrib").click(function(){
		btn_legajo_contribuyente();
	});

	$("#btn_responsables").click(function(){
		btn_responsables();
	});

	$("#btn_exenciones").click(function(){
		btn_exenciones();
	});

	$("#btn_cta_cte").click(function(){
		btn_cuenta_corriente();
	});
});