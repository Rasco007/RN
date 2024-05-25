function inicializarEventos() {
	$('#lupa_d_objeto_hecho').hide();
	$('#lupa_d_objeto_hecho1').hide();
	$('#div_t_imp').hide();
	$('#div_col_imponible').hide();

	$('.numerico').keypress(function (tecla) {
		return (tecla.charCode >= 48 && tecla.charCode <= 57);
	});
	
	$("#lupa_c_tributo").lupa_generica({
		id_lista:vg_lista_subtributos,
		titulos:['Cód. Tributo','Tributo','Cód. Tipo Imponible','Tipo Imponible'],
		grid:[  {index:'c_codigo',width:100},
			{index:'d_descrip',width:250},
			{index:'c_tipo_imponible',width:150},
			{index:'d_tipo_imponible',width:250}],
		caption:'Lista de Tributos',
		campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo', c_tipo_imponible: 'c_tipo_imponible', d_tipo_imponible: 'd_tipo_imponible'},
		keyNav:true,
		searchInput: '#c_tributo',
		searchCode: true,
		onClose: function(){
			//$('#d_objeto_hecho').val(null);
		}
	});
	
	$("#lupa_d_objeto_hecho").lupa_generica({
		id_lista:vg_lista_objetos,
		titulos:['Objeto-Hecho'],
		grid:[{index:'d_objeto_hecho',width:100}],
		caption:'Lista de Objetos - Hechos',
		sortname:'d_objeto_hecho',
		sortorder:'desc',
		filtros:['#c_tributo','#d_objeto_hecho'],
		filtrosTitulos:['Tributo','Objeto'],
		filtrosNulos:[false,true],
		campos:{d_objeto_hecho:'d_objeto_hecho'},
		keyNav:true,
		draggable:true
	});

	$('#d_objeto_hecho').keydown(function () {
		if ($('#d_objeto_hecho').val().length >= 2){
			$('#lupa_d_objeto_hecho').show().css('display', 'table-cell');
			$('#mascara_lupa_d_objeto_hecho').hide();
		} else {
			$('#lupa_d_objeto_hecho').hide();
			$('#mascara_lupa_d_objeto_hecho').show().css('display', 'table-cell');
		}
	});
	
	$("#lupa_c_tributo1").lupa_generica({
		id_lista:vg_lista_subtributos,
		titulos:['Cód. Tributo','Tributo','Cód. Tipo Imponible','Tipo Imponible'],
		grid:[  {index:'c_codigo',width:100},
			{index:'d_descrip',width:250},
			{index:'c_tipo_imponible',width:150},
			{index:'d_tipo_imponible',width:250}],
		caption:'Lista de Tributos',
		campos:{c_codigo:'c_tributo1',d_descrip: 'd_tributo1', c_tipo_imponible: 'c_tipo_imponible1', d_tipo_imponible: 'd_tipo_imponible1'},
		keyNav:true,
		searchInput: '#c_tributo1',
		searchCode: true,
		onClose: function(){
			//$('#d_objeto_hecho1').val(null);
		}
	});
	
	$("#lupa_d_objeto_hecho1").lupa_generica({
		id_lista:vg_lista_objetos,
		titulos:['Objeto-Hecho'],
		grid:[{index:'d_objeto_hecho',width:100}],
		caption:'Lista de Objetos - Hechos',
		sortname:'d_objeto_hecho',
		sortorder:'asc',
		filtros:['#c_tributo1','#d_objeto_hecho1'],
		filtrosTitulos:['Tributo','Objeto'],
		filtrosNulos:[false,true],
		campos:{d_objeto_hecho:'d_objeto_hecho1'},
		keyNav:true
	});

	$('#d_objeto_hecho1').keydown(function () {
		if ($('#d_objeto_hecho1').val().length >= 2){
			$('#lupa_d_objeto_hecho1').show().css('display', 'table-cell');
			$('#mascara_lupa_d_objeto_hecho1').hide();
		} else {
			$('#lupa_d_objeto_hecho1').hide();
			$('#mascara_lupa_d_objeto_hecho1').show().css('display', 'table-cell');
		}
	});
	
	$('#btn_limpiar').click(function(){


		$('#lupa_d_objeto_hecho').hide();
		$('#mascara_lupa_d_objeto_hecho').show().css('display', 'table-cell');
		$('#lupa_d_objeto_hecho1').hide();
		$('#mascara_lupa_d_objeto_hecho1').show().css('display', 'table-cell');
		$('#frm_consulta input').val(null);
		$('#frm_deudas input').val(null);
		
		$('#frm_consulta input').prop('disabled',false);
		$('#c_tipo_imponible, #c_tributo, #d_objeto_hecho').attr('readonly', false);
		$('#c_tipo_imponible, #c_tributo, #d_objeto_hecho').prop('disabled', false);
		$("#btn_buscar").prop('disabled', false);
		$(".btn_lupa").prop('disabled', false);
		$(".btn_lupa").show();
		
		$("#creditos_grid").jqGrid("clearGridData");
		
		$('#c_tipo_imponible1, #c_tributo1, #d_objeto_hecho1').attr('readonly', false);
		$('#c_tipo_imponible1, #c_tributo1, #d_objeto_hecho1').prop('disabled', false);
		$("#btn_buscar_deuda").prop('disabled', false);
		$(".btn_lupa1").prop('disabled', false);
		$(".btn_lupa1").show();
		$('#frm_deudas input').prop('disabled',false);
		
		$("#deudas_grid").jqGrid("clearGridData");
	
		$('#d_observacion').val('');
		
		vg_lote_cred = null;
		vg_cred_interes_desde = 'DESDE_MOV';
		vg_lote_deb = null;
		v_proceso = 'N';
		
		$("#frm_consulta").validationEngine('hideAll');
		$("#frm_deudas").validationEngine('hideAll');
		
		$('#content_wraper').hide();
	});
	
	$('#btn_buscar').click(function(){

		if($("#frm_consulta").validationEngine('validate')){
			$("#frm_consulta").validationEngine('hideAll');
			
			$('#main').procOverlay({visible:true});
			$.ajax({
				type: 'POST',
				url: "compensaciones/php/validaciones.php",
				data: {
					p_oper:'contribuyentes',
					c_tipo_imponible: $('#c_tipo_imponible').val(),
					c_tributo: $('#c_tributo').val(),
					d_objeto_hecho: $('#d_objeto_hecho').val()
				},
				dataType: 'JSON',
				success: function(ret) {
					$('#main').procOverlay({visible:false});
					if(ret){
						if (parse(ret.TOTAL) == 0) {
							mostrar_validacion('El objeto ingresado no existe.');
						}else{
							$.ajax({
								type: 'POST',
								url: "compensaciones/php/validaciones.php",
								data: {
									p_oper:'conceptos',
									c_tributo: $('#c_tributo').val(),
									d_objeto_hecho: $('#d_objeto_hecho').val()
								},
								dataType: 'json',
								success: function(ret) {
									if (ret.resultado == 'OK') {
										$('#main').procOverlay({visible:true});
										$.ajax({
											type: 'POST',
											url: FUNCIONES_BASEPATH + 'maestro_abm.php',
											data: {
												"p_c_tipo_imponible": $('#c_tipo_imponible').val(),
												"p_c_tributo": $('#c_tributo').val(),
												"p_d_objeto_hecho": $('#d_objeto_hecho').val(),
												"id_menu": v_id_menu,
												"n_orden": 0
											},
											dataType: 'json',
											success: function(data) {
												$('#main').procOverlay({visible:false});
												
												if (data.resultado == 'OK') {
													$('#frm_consulta input').prop('disabled',true);
													$('#c_tipo_imponible, #c_tributo, #d_objeto_hecho').attr('readonly', true);
													$('#c_tipo_imponible, #c_tributo, #d_objeto_hecho').prop('disabled', true);
													$(".btn_lupa").prop('disabled', true);
													$(".btn_lupa").hide();
													$('#lupa_d_objeto_hecho').hide();
													$("#btn_buscar").prop('disabled', true);
													$('#content_wraper').show();
													$(window).resize();
													v_proceso = 'N';
													vg_lote_cred = data.p_n_lote;
													
													setea_parametros('#creditos_grid', {':p_n_lote': data.p_n_lote}, 'S');
												} else {
													mostrar_error(data.resultado);
												}
											}
										});
									} else {
										mostrar_error(ret.resultado);
									}
								}
							});
						}
					}
				}
			});
		}
	});




	$('#btn_ctacte').click(function(){


		post_to_url("consulta_cuenta_corr.php", {
				'p_n_id_menu': 10852,
				'c_tipo_imponible':$('#c_tipo_imponible').val(),
				c_tributo: $('#c_tributo').val(),
				d_objeto_hecho: $('#d_objeto_hecho').val()
			},
			"_blank","POST");

	});

	$('#btn_ctacte_deuda').click(function(){

		post_to_url("consulta_cuenta_corr.php", {
				'p_n_id_menu': 10852,
				'c_tipo_imponible':$('#c_tipo_imponible1').val(),
				c_tributo: $('#c_tributo1').val(),
				d_objeto_hecho: $('#d_objeto_hecho1').val()
			},
			"_blank","POST");
	});



	$('#btn_limpiar_deuda').click(function(){


		// $('#lupa_d_objeto_hecho1').hide();
		// $('#mascara_lupa_d_objeto_hecho1').show().css('display', 'table-cell');
		 //$('#frm_deudas input').val(null);
		
		$('#c_tipo_imponible1, #c_tributo1, #d_objeto_hecho1').attr('readonly', false);
		$('#c_tipo_imponible1, #c_tributo1, #d_objeto_hecho1').prop('disabled', false);
		$("#btn_buscar_deuda").prop('disabled', false);
		 $(".btn_lupa1").prop('disabled', false);
		 $(".btn_lupa1").show();
		//$('#frm_deudas input').prop('disabled',false);
		
		$("#deudas_grid").jqGrid("clearGridData");
		
		//$("#frm_deudas").validationEngine('hideAll');
		
		vg_cred_interes_desde = 'DESDE_MOV';
		vg_lote_deb = null;
	});
	
	$('#btn_buscar_deuda').click(function(){

		if($("#frm_deudas").validationEngine('validate')){
			console.log('despues validationEngine');
			$("#frm_deudas").validationEngine('hideAll');
			// validamos crédito seleccionado
			console.log('btn_buscar_deuda 1');
			$.ajax({
				type: 'POST',
				url: "compensaciones/php/validaciones.php",
				data: {
					p_oper:'contribuyentes',
					c_tipo_imponible: $('#c_tipo_imponible1').val(),
					c_tributo: $('#c_tributo1').val(),
					d_objeto_hecho: $('#d_objeto_hecho1').val()
				},
				dataType: 'JSON',
				success: function(ret) {
					$('#main').procOverlay({visible:false});
					if(ret){
						if (parse(ret.TOTAL) == 0) {
							mostrar_validacion('El objeto ingresado no existe.');
						}else{
							$.ajax({
								type: 'POST',
								url: "compensaciones/php/validaciones.php",
								data: {
									p_oper:'credSelect',
									c_tributo: $('#c_tributo').val(),
									lote: vg_lote_cred
								},
								dataType: 'json',
								success: function(ret) {
									if (ret.resultado == 'OK') {
										$('#main').procOverlay({visible:true});
										
										vg_cred_interes_desde = ret.c_interes;
										console.log('btn_buscar_deuda 2');
										// validamos los conceptos
										$.ajax({
											type: 'POST',
											url: "compensaciones/php/validaciones.php",
											data: {
												p_oper:'conceptos',
												c_tributo: $('#c_tributo1').val(),
												d_objeto_hecho: $('#d_objeto_hecho1').val()
											},
											dataType: 'json',
											success: function(respuesta) {
												if (respuesta.resultado == 'OK') {
													// poblamos los débitos
													console.log('btn_buscar_deuda 4');
													$.ajax({
														type: 'POST',
														url: FUNCIONES_BASEPATH + 'maestro_abm.php',
														data: {
															"p_c_tipo_imponible": $('#c_tipo_imponible1').val(),
															"p_c_tributo": $('#c_tributo1').val(),
															"p_d_objeto_hecho": $('#d_objeto_hecho1').val(),
															"p_f_credito": ret.f_movimiento,
															"p_i_credito": ret.n_importe,
															"p_m_genera_int": ret.m_genera_interes,
															"p_c_concepto_mov_cred": ret.c_concepto,
															"p_f_vto_cred": ret.f_vto_pago,
															"id_menu": v_id_menu,
															"n_orden": 1
														},
														dataType: 'json',
														success: function(data) {

															$('#main').procOverlay({visible:false});


															if (data.resultado == 'OK') {
																$('#frm_deudas input').prop('disabled',true);
																$('#c_tipo_imponible1, #c_tributo1, #d_objeto_hecho1').attr('readonly', true);
																$('#c_tipo_imponible1, #c_tributo1, #d_objeto_hecho1').prop('disabled', true);
																$(".btn_lupa1").prop('disabled', true);
																$(".btn_lupa1").hide();
																$("#btn_buscar_deuda").prop('disabled', true);
																vg_lote_deb = data.p_n_lote;

																setea_parametros('#deudas_grid', {':p_n_lote': vg_lote_deb}, 'S');
															} else {
																$("#deudas_grid").jqGrid("clearGridData");
																console.log('data.resultado  despues de limpuiar');
																console.log(data.resultado );
																mostrar_error(data.resultado);
															}
														}
													});
												} else {
													mostrar_error(respuesta.resultado);
												}
											}
										});
									} else {
										mostrar_error(ret.resultado);
									}
								}
							});
						}
					}
				}
			});
		}
	});
	
	$('#btn_imputar').click(function(){
		// validamos débito seleccionado


		$.ajax({
			type: 'POST',
			url: "compensaciones/php/validaciones.php",
			data: {
				p_oper:'debSelect',
				lote: vg_lote_deb
			},
			dataType: 'json',
			success: function(ret) {
				if (ret.resultado == 'OK') {
					comprobar_contribuyentes();
				} else {


					if (ret.resultado == 'PREGUNTAR'){
						// preguntar si desea continuar a pesar de no aplicar la reducción
						mostrar_cuadro('C','Atención', ret.mensaje, function () {comprobar_contribuyentes(); },null,400);

					} else {

						mostrar_error(ret.resultado);
					}
				}
			}
		});
	});


	//window.addEventListener('click', function(e){
	//	if (
	//		!(document.getElementById('deudas_grid').contains(e.target))
	//		&&
//			$('#deudas_grid input').length > 0 ){
//			toastr["warning"]("Existen modificaciones en la grilla de actividades sin guardar.", "Edición de Actividades");
//		}
//	});
}