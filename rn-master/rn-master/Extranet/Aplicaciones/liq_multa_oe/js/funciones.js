function valida_tab_next(tab_activo) {
	return new Promise(function(resolve, reject){
		switch(tab_activo){
			case ('#contribuyente'):
				var validar = $('#form_contrib').validationEngine('validate');
				if (validar){
					if ($('#sel_personeria').val() != 'N/A'){
						fun_tablist();
						
						if($('#id_contrib').val() != ''){
							// si existe el contribuyente inicial directo a la liquidacion de la multa
							$('.confirmar-multa').show();
							$('.prev-step').show();
							$('.next-step').hide();
						} else {
							$('.prev-step').show();
						}
						
						return resolve();
					} else {
						mostrar_cuadro('I','Validación','Debe seleccionar un valor para el campo "Personería".');
						reject();
					}
				}else{
					return reject();
				}
				break;
			case ('#domicilio'):
				var validar = $('#form_dom').validationEngine('validate');
				if (validar){
					if ($('#sel_provincia').val() != 'N/A' && $('#sel_departamento').val() != 'N/A' && $('#sel_localidad').val() != 'N/A'){
						fun_tablist();
						
						if ( $('#sel_personeria').val() != 'J'){
							// si el contribuyente inicial no es J debo pasar directo a la liquidacion de la multa
							$('.confirmar-multa').show();
							$('.prev-step').show();
							$('.next-step').hide();
						}else {
							$('.prev-step').show();
						}
						
						return resolve();
					} else {
						mostrar_cuadro('I','Validación','Debe seleccionar un valor para los campos "Provincia", "Departamento" y "Localidad".');
						reject();
					}
				}else{
					return reject();
				}
				break;
			case ('#integrantes'):
				var validar = $('#form_int').validationEngine('validate');
				if (validar){
                    if ($('#sel_doc_int').val() != 'N/A'){
						if ($('#sel_caracter').val() != 'N/A'){
							if ($('#sel_tipo_res').val() != 'N/A'){
								if ($('#sel_cargo').val() != 'N/A'){
									if ($('#sel_prov_int').val() != 'N/A' && $('#sel_dep_int').val() != 'N/A' && $('#sel_loc_int').val() != 'N/A'){
										fun_tablist();
										$('.confirmar-multa').show();
										$('.next-step').hide();
										$('.prev-step').show();
										
										return resolve();
									} else {
										mostrar_cuadro('I','Validación','Debe seleccionar un valor para los campos "Provincia", "Departamento" y "Localidad".');
										reject();
									}
								} else {
									mostrar_cuadro('I','Validación','Debe seleccionar un valor para el campo "Cargo".');
									reject();
								}
							} else {
								mostrar_cuadro('I','Validación','Debe seleccionar un valor para el campo "Tipo responsable".');
								reject();
							}
						} else {
							mostrar_cuadro('I','Validación','Debe seleccionar un valor para el campo "Carácter firma".');
							reject();
						}
					} else {
						mostrar_cuadro('I','Validación','Debe seleccionar un valor para el campo "Tipo documento".');
						reject();
					}
				}else{
					return reject();
				}
				break;
		}
	});
}

function valida_tab_before(tab_activo) {
    return new Promise(function(resolve, reject){
		switch(tab_activo) {
			/*case ('#contribuyente'):
				$('.prev-step').show();

				return resolve();*/
			case ('#domicilio'):
				$('.prev-step').hide();
				return resolve();
				break;
			case ('#liquidacion_multa'):
				$('.confirmar-multa').hide();
				$('.next-step').show();
				return  resolve();
				break;
			default:
				return resolve();
				break;
		}
    });
}

function fun_tablist(){
    $(".wizard .nav-tabs > li").css("width","25%");
    $( ".connecting-line" ).show(500);
}

function fun_emitir_boleta(p_id_obligacion){
	// deplegar popup para que elijan la fecha de actualización/vencimiento de la boleta
	$('#id_obligacion_emitir').val(p_id_obligacion);

	if ($.datepicker.parseDate('dd/mm/yy', $('#f_vencimiento').val()) < $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
		$('#f_emision').val(fecha_hoy);
	}else{
		$('#f_emision').val($('#f_vencimiento').val());
	}
	$('#modal_emitir_boleta').modal('show');
	$('#modal_emitir_boleta').on('hidden.bs.modal', function (e) {
		fun_reiniciar_pantalla();
	});
}

function fun_reiniciar_pantalla() {
	// reinicializamos la pantalla
	var $active = $('.wizard .nav-tabs li.active');

	$($active).prev().prev().prev().find('a[data-toggle="tab"]').click();
	$('.prev-step').hide();
	$('.next-step').show();
	$('.confirmar-multa').hide();

	$('#n_cuit').focus();
	$('#n_cuit').val('');
	$('#n_cuit').focusout();
	g_id_transaccion = null;
}