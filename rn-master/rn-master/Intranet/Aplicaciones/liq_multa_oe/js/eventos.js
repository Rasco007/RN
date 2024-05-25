$(document).ready(function () {
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        var $target = $(e.target);
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {
        var $active = $('.wizard .nav-tabs li.active');
        var tab_activo = $("#TabView li.active a").attr("href");
        $('#main').procOverlay({visible:true});

        valida_tab_next(tab_activo)
            .then(function(){
				if(tab_activo == '#contribuyente' &&  $('#id_contrib').val() != ''){
					// si existe el contribuyente inicial directo a la liquidacion de la multa
					$($active).next().next().next().find('a[data-toggle="tab"]').click();
				} else if (tab_activo == '#domicilio' &&  $('#sel_personeria').val() != 'J'){
					// si el contribuyente inicial no es J debo pasar directo a la liquidacion de la multa
					$($active).next().next().find('a[data-toggle="tab"]').click();
				} else {
					$($active).next().find('a[data-toggle="tab"]').click();
				}
                $('#main').procOverlay({visible:false});

            })
            .catch(function(v_error){
                $('#main').procOverlay({visible:false});

                if (v_error != null){
                    mostrar_cuadro('E', 'Error', v_error);
                }
            });
    });

    $(".prev-step").click(function (e) {
        var $active = $('.wizard .nav-tabs li.active');
        var tab_activo = $("#TabView li.active a").attr("href");
        $('#main').procOverlay({visible:true});

        valida_tab_before(tab_activo)
            .then(function(){
				if(tab_activo == '#liquidacion_multa'){
					if ($('#id_contrib').val() != ''){
						// si existe el contribuyente inicial directo a los datos del contrib
						$($active).prev().prev().prev().find('a[data-toggle="tab"]').click();
						$('.prev-step').hide();
					} else if ($('#sel_personeria').val() != 'J'){
						// si el contribuyente inicial no existe y no es J debo pasar directo al domicilio
						$($active).prev().prev().find('a[data-toggle="tab"]').click();
					} else {
						$($active).prev().find('a[data-toggle="tab"]').click();
					}
				} else {
					$($active).prev().find('a[data-toggle="tab"]').click();
				}
                $('#main').procOverlay({visible:false});
            })
            .catch(function(){
                $('#main').procOverlay({visible:false});
            });

    });
	
	$(".confirmar-multa").click(function (e) {
		var $active = $('.wizard .nav-tabs li.active');
        var tab_activo = $("#TabView li.active a").attr("href");

        if(tab_activo == '#liquidacion_multa'){
			var c_departamento = '';
			if ($('#sel_departamento').val() != 'N/A'){
				c_departamento = $('#sel_departamento').val();
			}
			
			var c_localidad = '';
			if ($('#sel_localidad').val() != 'N/A'){
				c_localidad = $('#sel_localidad').val();
			}
			
			var c_dep_int = '';
			if ($('#sel_dep_int').val() != 'N/A'){
				c_dep_int = $('#sel_dep_int').val();
			}
			
			var c_loc_int = '';
			if ($('#sel_loc_int').val() != 'N/A'){
				c_loc_int = $('#sel_loc_int').val();
			}
			
			var id_infraccion = '';
			if ($('#sel_tipo_mul').val() != 'N/A'){
				id_infraccion = $('#sel_tipo_mul').val();
			}
			
			var id_multa = '';
			if ($('#sel_multa').val() != 'N/A'){
				id_multa = $('#sel_multa').val();
			}

			if(parse($('#i_multa').val()) == 0){
				mostrar_validacion('La multa debe ser mayor a 0');
				return;
			}
			
			$('#main').procOverlay({visible:true});
			$.ajax({
				url: FUNCIONES_BASEPATH+'maestro_abm.php',
				type:"POST",
				data:{
					"id_menu": v_n_id_menu,
					"n_orden": 0,
					"p_id_contribuyente": $('#id_contrib').val(),
					"p_n_cuit": $('#n_cuit').val().replace('-', '').replace('-', ''),
					"p_d_denominacion": $('#d_denominacion').val(),
					"p_c_tipo_persona": $('#sel_personeria').val(),
					"p_c_forma_juridica": $('#sel_forma_jur').val(),
					"p_c_tipo_documento": $('#sel_documento').val(),
					"p_n_documento": $('#n_documento').val(),
					"p_n_telefono": $('#n_telefono').val(),
					"p_d_mail": $('#d_mail').val(),
					"p_c_provincia": $('#sel_provincia').val(),
					"p_c_departamento": c_departamento,
					"p_c_localidad": c_localidad,
					"p_c_postal": $('#c_postal').val(),
					"p_d_calle": $('#d_calle').val(),
					"p_n_calle": $('#n_calle').val(),
					"p_n_piso": $('#n_piso').val(),
					"p_d_dpto": $('#d_dpto').val(),
					"p_d_puerta": $('#d_puerta').val(),
					"p_d_oficina": $('#d_oficina').val(),
					"p_id_contrib_int": $('#id_contrib_int').val(),
					"p_n_cuit_int": $('#n_cuit_int').val().replace('-', '').replace('-', ''),
					"p_d_deno_int": $('#d_deno_int').val(),
					"p_c_tipo_doc_int": $('#sel_doc_int').val(),
					"p_n_doc_int": $('#n_doc_int').val(),
					"p_c_caracter": $('#sel_caracter').val(),
					"p_c_responsable": $('#sel_tipo_res').val(),
					"p_c_cargo": $('#sel_cargo').val(),
					"p_c_prov_int": $('#sel_prov_int').val(),
					"p_c_dep_int": c_dep_int,
					"p_c_loc_int": c_loc_int,
					"p_c_postal_int": $('#c_postal_int').val(),
					"p_d_calle_int": $('#d_calle_int').val(),
					"p_n_calle_int": $('#n_calle_int').val(),
					"p_n_piso_int": $('#n_piso_int').val(),
					"p_d_dpto_int": $('#d_dpto_int').val(),
					"p_d_puerta_int": $('#d_puerta_int').val(),
					"p_d_oficina_int": $('#d_oficina_int').val(),
					"p_c_ente": $('#sel_ente').val(),
					"p_c_organismo": $('#sel_delegacion').val(),
					"p_id_infraccion": id_infraccion,
					"p_f_generacion": $('#f_generacion').val(),
					"p_id_multa": id_multa,
					"p_i_multa": $('#i_multa').val(),
					"p_f_vencimiento": $('#f_vencimiento').val(),
					"p_i_descuento": $('#i_descuento').val(),
					"p_i_total": $('#i_total').val(),
					"p_d_observacion": $('#d_observ').val()
				},
				async:false,
				dataType: 'json',
				success: function(ret) {
					$('#main').procOverlay({visible:false});
					
					if(ret.resultado == 'OK'){
						if ($('#d_aplicacion').val() == 'Automático' && parse($('#i_multa').val()) > 0){
							mostrar_cuadro(
								'S','Operación exitosa',
								'Se realizó la liquidación de la multa de manera exitosa. ¿Desea imprimir su boleta?.',
								function(){
									if ($('#d_aplicacion').val() == 'Automático' && parse($('#i_multa').val()) > 0){
										fun_emitir_boleta(ret.p_id_obligacion);
									}
								},
								function () {
									fun_reiniciar_pantalla();
									return;
								},
								350
							);
						}else {
							mostrar_mensaje_modal(
								'S','Operación exitosa',
								'Se realizó la liquidación de la multa de manera exitosa.',
								function(){
									fun_reiniciar_pantalla();
									return;
								}
							);
						}
					} else {
						mostrar_cuadro('E','Error',ret.resultado);
					}
				}
			});
		} else {
			mostrar_cuadro('V','Validación','Acción no permitida para esta solapa.');
		}
    });
	
	$(".mascara_cuit").mask("99-99999999-9");
	$('#c_postal, #c_postal_int').mask("9999");
	
	$(".input_fecha").datepicker({
		changeMonth:true,
		changeYear:true,
		dateFormat:'dd/mm/yy',
		currentText: 'Hoy',
		monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
		monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
		dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
		dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
		dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá']
    });
	
	$('#f_generacion').datepicker( "option", "maxDate", '0' );

	$(".input_fecha").datepicker("option","beforeShowDay",function(date){
		return noWeekendsOrHolidays(date,disabledDays);
	});

	$('#f_emision').datepicker("option",'minDate',fecha_actual);
});

$(document).on('change', '#sel_provincia', function() {
	if ($('#sel_provincia').val() == 'N/A'){
		$('#div_sel_departamento').html('<select id="sel_departamento" name="sel_departamento" class="input-sm form-control"><option value="N/A">Seleccione la Provincia</option></select>');
		$('#div_sel_localidad').html('<select id="sel_localidad" name="sel_localidad" class="input-sm form-control"><option value="N/A">Seleccione el Departamento</option></select>');
		$('#c_postal').val(null);
	} else {
        $('#main').procOverlay({visible:true});
		$.ajax({
			url:'liq_multa_oe/ajax/ajax_operaciones.php',
			type:"POST",
			data:{
				"oper": "departamentos",
				"c_provincia": $('#sel_provincia').val()
			},
			async:false,
			success: function(data) {
				$('#main').procOverlay({visible:false});
				$('#div_sel_departamento').html('<select id="sel_departamento" name="sel_departamento" class="input-sm form-control"><option value="N/A">Seleccione una opción</option>'+data+'</select>');
				$('#div_sel_localidad').html('<select id="sel_localidad" name="sel_localidad" class="input-sm form-control"><option value="N/A">Seleccione el Departamento</option></select>');
				$('#c_postal').val(null);
			}
		});
	}
});

$(document).on('change', '#sel_prov_int', function() {
	if ($('#sel_prov_int').val() == 'N/A'){
		$('#div_sel_dep_int').html('<select id="sel_dep_int" name="sel_dep_int" class="input-sm form-control"><option value="N/A">Seleccione la Provincia</option></select>');
		$('#div_sel_loc_int').html('<select id="sel_loc_int" name="sel_loc_int" class="input-sm form-control"><option value="N/A">Seleccione el Departamento</option></select>');
		$('#c_postal_int').val(null);
	} else {
        $('#main').procOverlay({visible:true});
		$.ajax({
			url:'liq_multa_oe/ajax/ajax_operaciones.php',
			type:"POST",
			data:{
				"oper": "departamentos",
				"c_provincia": $('#sel_prov_int').val()
			},
			async:false,
			success: function(data) {
				$('#main').procOverlay({visible:false});
				$('#div_sel_dep_int').html('<select id="sel_dep_int" name="sel_dep_int" class="input-sm form-control"><option value="N/A">Seleccione una opción</option>'+data+'</select>');
				$('#div_sel_loc_int').html('<select id="sel_loc_int" name="sel_loc_int" class="input-sm form-control"><option value="N/A">Seleccione el Departamento</option></select>');
				$('#c_postal_int').val(null);
			}
		});
	}
});

$(document).on('change', '#sel_departamento', function() {
	if ($('#sel_departamento').val() == 'N/A'){
		$('#div_sel_localidad').html('<select id="sel_localidad" name="sel_localidad" class="input-sm form-control"><option value="N/A">Seleccione el Departamento</option></select>');
		$('#c_postal').val(null);
	} else {
        $('#main').procOverlay({visible:true});
		$.ajax({
			url:'liq_multa_oe/ajax/ajax_operaciones.php',
			type:"POST",
			data:{
				"oper": "localidades",
				"c_provincia": $('#sel_provincia').val(),
				"c_departamento": $('#sel_departamento').val()
			},
			async:false,
			success: function(data) {
				$('#main').procOverlay({visible:false});
				$('#div_sel_localidad').html('<select id="sel_localidad" name="sel_localidad" class="input-sm form-control"><option value="N/A">Seleccione una opción</option>'+data+'</select>');
				$('#c_postal').val(null);
			}
		});
	}
});

$(document).on('change', '#sel_dep_int', function() {
	if ($('#sel_dep_int').val() == 'N/A'){
		$('#div_sel_loc_int').html('<select id="sel_loc_int" name="sel_loc_int" class="input-sm form-control"><option value="N/A">Seleccione el Departamento</option></select>');
		$('#c_postal_int').val(null);
	} else {
        $('#main').procOverlay({visible:true});
		$.ajax({
			url:'liq_multa_oe/ajax/ajax_operaciones.php',
			type:"POST",
			data:{
				"oper": "localidades",
				"c_provincia": $('#sel_prov_int').val(),
				"c_departamento": $('#sel_dep_int').val()
			},
			async:false,
			success: function(data) {
				$('#main').procOverlay({visible:true});
				$('#div_sel_loc_int').html('<select id="sel_loc_int" name="sel_loc_int" class="input-sm form-control"><option value="N/A">Seleccione una opción</option>'+data+'</select>');
				$('#c_postal_int').val(null);
			}
		});
	}
});

$(document).on('change', '#sel_localidad', function() {
	if ($('#sel_localidad').val() == 'N/A'){
		$('#c_postal').val(null);
	} else {
		let c_postal= $('#sel_localidad').find(':selected').attr('data-cpostal');
		$('#c_postal').val(c_postal);
	}
});

$(document).on('change', '#sel_loc_int', function() {
	if ($('#sel_loc_int').val() == 'N/A'){
		$('#c_postal_int').val(null);
	} else {
		let c_postal= $('#sel_loc_int').find(':selected').attr('data-cpostal');
		$('#c_postal_int').val(c_postal);
	}
});

$(document).on('change', '#sel_ente', function() {
	if ($('#sel_ente').val() == 'N/A'){
		$('#div_sel_delegacion').html('<select id="sel_delegacion" name="sel_delegacion" class="input-sm form-control"><option value="N/A">Seleccione el Ente</option></select>');
		$('#div_sel_tipo_mul').html('<select id="sel_tipo_mul" name="sel_tipo_mul" class="input-sm form-control"><option value="N/A">Seleccione el Organismo</option></select>');
		$('#div_sel_multa').html('<select id="sel_multa" name="sel_multa" class="input-sm form-control"><option value="N/A">Seleccione la fecha de generación</option></select>');
	} else {
        $('#main').procOverlay({visible:true});
		$.ajax({
			url:'liq_multa_oe/ajax/ajax_operaciones.php',
			type:"POST",
			data:{
				"oper": "delegacion",
				"c_ente": $('#sel_ente').val()
			},
			async:false,
			success: function(data) {
				$('#main').procOverlay({visible:true});
				$('#div_sel_delegacion').html('<select id="sel_delegacion" name="sel_delegacion" class="input-sm form-control"><option value="N/A">Seleccione una opción</option>'+data+'</select>');
				$('#div_sel_tipo_mul').html('<select id="sel_tipo_mul" name="sel_tipo_mul" class="input-sm form-control"><option value="N/A">Seleccione el Organismo</option></select>');
				$('#div_sel_multa').html('<select id="sel_multa" name="sel_multa" class="input-sm form-control"><option value="N/A">Seleccione la fecha de generación</option></select>');
			}
		});
	}
	
	$('#f_generacion').val('');
	$('#d_aplicacion').val('');
	$('#f_vencimiento').val('');
	$('#i_multa').val('');
	$('#i_descuento').val('');
	$('#i_total').val('');
	$('.automatico').hide();
	
	i_monto_fijo_desde = '-1';
	i_monto_fijo_hasta = '-1';
	p_descuento_vto = '-1';
	i_multa = '0,00';
});

$(document).on('change', '#sel_delegacion', function() {
	if ($('#sel_delegacion').val() == 'N/A'){
		$('#div_sel_tipo_mul').html('<select id="sel_tipo_mul" name="sel_tipo_mul" class="input-sm form-control"><option value="N/A">Seleccione el Organismo</option></select>');
		$('#div_sel_multa').html('<select id="sel_multa" name="sel_multa" class="input-sm form-control"><option value="N/A">Seleccione la fecha de generación</option></select>');
	} else {
        $('#main').procOverlay({visible:true});
		$.ajax({
			url:'liq_multa_oe/ajax/ajax_operaciones.php',
			type:"POST",
			data:{
				"oper": "tipo_multas",
				"c_ente": $('#sel_ente').val(),
				"c_organismo": $('#sel_delegacion').val()
			},
			async:false,
			success: function(data) {
				$('#main').procOverlay({visible:true});
				$('#div_sel_tipo_mul').html('<select id="sel_tipo_mul" name="sel_tipo_mul" class="input-sm form-control"><option value="N/A">Seleccione una opción</option>'+data+'</select>');
				$('#div_sel_multa').html('<select id="sel_multa" name="sel_multa" class="input-sm form-control"><option value="N/A">Seleccione la fecha de generación</option></select>');
			}
		});
	}
	
	$('#f_generacion').val('');
	$('#d_aplicacion').val('');
	$('#f_vencimiento').val('');
	$('#i_multa').val('');
	$('#i_descuento').val('');
	$('#i_total').val('');
	$('.automatico').hide();
	
	i_monto_fijo_desde = '-1';
	i_monto_fijo_hasta = '-1';
	p_descuento_vto = '-1';
	i_multa = '0,00';
});

$(document).on('change', '#sel_tipo_mul', function() {
	$('#f_generacion').val('');
	$('#d_aplicacion').val('');
	$('#f_vencimiento').val('');
	$('#i_multa').val('');
	$('#i_descuento').val('');
	$('#i_total').val('');
	$('.automatico').hide();
	
	i_monto_fijo_desde = '-1';
	i_monto_fijo_hasta = '-1';
	p_descuento_vto = '-1';
	i_multa = '0,00';
});

$(document).on('change', '#f_generacion', function() {
	if ($('#sel_ente').val() == 'N/A' || $('#sel_delegacion').val() == 'N/A' || $('#sel_tipo_mul').val() == 'N/A'){
		mostrar_cuadro('I','Validación','Debe seleccionar un Ente, un Organismo y un Tipo de multa');
		$('#f_generacion').val('');
		$('#div_sel_multa').html('<select id="sel_multa" name="sel_multa" class="input-sm form-control"><option value="N/A">Seleccione la fecha de generación</option></select>');
	} else {
		$('#main').procOverlay({visible:true});
		$.ajax({
			url:'liq_multa_oe/ajax/ajax_operaciones.php',
			type:"POST",
			data:{
				"oper": "multas",
				"id_infraccion": $('#sel_tipo_mul').val(),
				"f_generacion": $('#f_generacion').val(),
				"m_persona": $('#sel_personeria').val(),
				"id_contribuyente":$('#id_contrib').val()
			},
			async:false,
			success: function(data) {
				$('#main').procOverlay({visible:true});
				$('#div_sel_multa').html('<select id="sel_multa" name="sel_multa" class="input-sm form-control"><option value="N/A">Seleccione una opción</option>'+data+'</select>');
			}
		});
	}
	
	$('#d_aplicacion').val('');
	$('#f_vencimiento').val('');
	$('#i_multa').val('');
	$('#i_descuento').val('');
	$('#i_total').val('');
	$('.automatico').hide();

	i_monto_fijo_desde = '-1';
	i_monto_fijo_hasta = '-1';
	p_descuento_vto = '-1';
	i_multa = '0,00';
});

$(document).on('change', '#sel_multa', function() {
	if ($('#sel_multa').val() == 'N/A'){
		$('#d_aplicacion').val('');
		$('#f_vencimiento').val('');
		$('#i_multa').val('');
		$('#i_descuento').val('');
		$('#i_total').val('');
		
		i_monto_fijo_desde = '-1';
		i_monto_fijo_hasta = '-1';
		p_descuento_vto = '-1';
		i_multa = '0,00';
	} else {
        $('#main').procOverlay({visible:true});
		$.ajax({
			url:'liq_multa_oe/ajax/ajax_operaciones.php',
			type:"POST",
			data:{
				"oper": "liquidacion",
				"f_generacion": $('#f_generacion').val(),
				"id_multa": $('#sel_multa').val()
			},
			async:false,
			dataType: 'json',
			success: function(ret) {
				$('#main').procOverlay({visible:true});
				
				if (ret.m_automatica == 'S'){
					$('.automatico').show();
					$('#d_aplicacion').val('Automático');
					if(ret.f_vto){
						$("#f_vencimiento").val(ret.f_vto);
						$("#f_vencimiento").datepicker("option","minDate", ret.f_vto);
					}
				} else {
					$('.automatico').hide();
					$('#d_aplicacion').val('Manual');
					$('#f_vencimiento').val('');
					$('#i_descuento').val('');
					$('#i_total').val('');
				}
				
				$('#i_multa').val(ret.i_monto_fijo);
				
				if(ret.p_descuento_vto != '-1') {
					$('#i_descuento').val(ret.descuento);
					$('#i_total').val(ret.total);
				}
				
				// cargar en variables globales para validaciones
				i_monto_fijo_desde = ret.i_monto_fijo_desde;
				i_monto_fijo_hasta = ret.i_monto_fijo_hasta;
				p_descuento_vto = ret.p_descuento_vto;
				i_multa = ret.i_monto_fijo;
			}
		});
	}
});

$(document).on('focusout', '#i_multa', function() {
	if (!$('#i_multa').val()){
		$('#i_descuento').val('');
		$('#i_total').val('');
	} else {
        $('#main').procOverlay({visible:true});
		$.ajax({
			url:'liq_multa_oe/ajax/ajax_operaciones.php',
			type:"POST",
			data:{
				"oper": "validacion",
				"i_multa": $('#i_multa').val(),
				"i_multa_ori": i_multa,
				"i_monto_fijo_desde": i_monto_fijo_desde,
				"i_monto_fijo_hasta": i_monto_fijo_hasta,
				"p_descuento_vto": p_descuento_vto
			},
			async:false,
			dataType: 'json',
			success: function(ret) {
				$('#main').procOverlay({visible:true});
				
				if (ret.resultado == 'OK'){
					$('#i_descuento').val(ret.descuento);
					$('#i_total').val(ret.total);
				} else {
					mostrar_cuadro('I','Validación', ret.resultado);
					$('#i_descuento').val(ret.descuento);
					$('#i_total').val(ret.total);
					$('#i_multa').val(i_multa);
				}
			}
		});
	}
});

$(document).on("DOMNodeInserted",function(evt){
    $('[data-toggle="tooltip"]').tooltip();
	
	$(".mascara_entero").each(function () {
        var events = $._data(this, 'events');
        if (events && events['keydown']) return;
        $(this).keydown(function (event) {
            if ($(this).prop('readonly')) return;
            return controla_number(event, this, 0);
        });

    }).css('text-align', 'right');
	
	$(".mascara_importe").each(function () {
        var events = $._data(this, 'events');
        if (events && events['keydown']) return;
        $(this).keydown(function (event) {
            if ($(this).prop('readonly')) return;
            return controla_number(event, this, 2);
        });

    }).css('text-align', 'right');
});