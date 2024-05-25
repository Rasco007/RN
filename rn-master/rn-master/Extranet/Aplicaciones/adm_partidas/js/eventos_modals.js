function eventos_modals(){
	// permite mover el modal
	$(".modal-draggable .modal-dialog").draggable({
	    handle: ".modal-header",
	    backdrop: 'static'
	});

	$('.datepicker').datepicker({
	    dateFormat:'dd/mm/yy',
	    // changeMonth:true, // comentados por un error de visualización - bug FRMWK
	    // changeYear:true,
	    dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
	    monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
	    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
	}).mask("99/99/9999").change(function () {
	    if ($(this).val().length != 10){
	        mostrar_error("El Formato de la Fecha ingresada no es válido.");
	        $(this).val(null);
	    }
	});

	inicializa_lupa_actividad("#frm_inscripcion_tributo","_i");
	inicializa_lupa_unidades("#frm_inscripcion_tributo","_i");
	inicializa_lupa_actividad("#frm_modificacion_datos","_m");
	inicializa_lupa_unidades("#frm_modificacion_datos","_m");
	inicializa_lupa_motivo("#frm_cese_tributo");

	autocompletecuitdenominacion("#frm_inscripcion_tributo");
	autocompletecuitdenominacion("#frm_modificacion_datos");

	$("#btn_inscribir_tributo").click(function() {
		var rowid = valida_seleccion_grilla("#main_grid");
		var valido = $("#frm_inscripcion_tributo").validationEngine('validate');
		if (valido){
			if(($("#n_cuit","#frm_inscripcion_tributo").val() != '' && $("#d_denominacion","#frm_inscripcion_tributo").val() != '')
				|| ($("#n_cuit","#frm_inscripcion_tributo").val() == '' && $("#d_denominacion","#frm_inscripcion_tributo").val() == '')
			){
				if($("#n_regante").val() == '' || $("#c_actividad") == ''){
					mostrar_cuadro('Q', 'Confirmación',
	                    "No se han cargado los campos de Regante / Parcela o Actividad. ¿Está seguro que desea continuar?.",
	                    function(){
	                    	inscribir_partida(rowid);
	                    },
	                    function(){}, 500);
				}else{
					inscribir_partida(rowid)
				}
			}else{
				mostrar_validacion('Los campos CUIT y Denominación deben estar ambos cargados o ambos vacíos.');
			}
		}
	});

	$("#btn_cese_tributo").click(function(){
		var rowid = valida_seleccion_grilla("#main_grid");
		var valido = $("#frm_cese_tributo").validationEngine('validate');
		if (valido){
			$.ajax({
				type: 'POST',
				url: FUNCIONES_BASEPATH + 'maestro_abm.php',
				data: {
					"p_oper": 'del',
					"p_id_contribuyente": $("#main_grid").getCell(rowid,'id_contribuyente'),
					"p_id_inmueble": $("#main_grid").getCell(rowid,'id_inmueble'),
					"p_n_partida": $("#main_grid").getCell(rowid,'n_partida'),
					"p_f_baja": $("#f_baja","#frm_cese_tributo").val(),
					"p_d_observaciones": $("#d_observacion","#frm_cese_tributo").val(),
					"p_c_unid_med": $("#main_grid").getCell(rowid,'c_unid_med'),
					"id_menu": 10775,
					"n_orden": 0
				},
				dataType: 'json',
				success: function(data) {
					if (data.resultado == 'OK') {
						mostrar_confirmacion('La partida fue dada de baja del tributo correctamente.');
						$("#cese_tributo").modal('hide');
						$("#main_grid").trigger('reloadGrid');
					} else {
						mostrar_error(data.resultado);
						return;
					}
				}
			});
		}
	});

	$("#btn_modificar_datos").click(function(){
		var rowid = valida_seleccion_grilla("#main_grid");
		var valido = $("#frm_modificacion_datos").validationEngine('validate');
		if (valido){
			if(($("#n_cuit","#frm_modificacion_datos").val() != '' && $("#d_denominacion","#frm_modificacion_datos").val() != '')
				|| ($("#n_cuit","#frm_modificacion_datos").val() == '' && $("#d_denominacion","#frm_modificacion_datos").val() == '')
			){
				$.ajax({
					type: 'POST',
					url: FUNCIONES_BASEPATH + 'maestro_abm.php',
					data: {
						"p_oper": 'edit',
						"p_id_inmueble": $("#main_grid").getCell(rowid,'id_inmueble'),
						"p_n_partida": $("#main_grid").getCell(rowid,'n_partida'),
						"p_n_hectareas": formatea_number($("#n_hectareas","#frm_modificacion_datos").val(),''),
						"p_c_actividad": $("#c_actividad_m","#frm_modificacion_datos").val(),
						"p_n_cuit_resp": limpia_cuit($("#n_cuit","#frm_modificacion_datos").val()),
						"p_d_denominacion_resp": $("#d_denominacion","#frm_modificacion_datos").val(),
						"p_id_contribuyente": $("#id_contribuyente","#frm_modificacion_datos").val(),
						"p_n_regante": $("#n_regante","#frm_modificacion_datos").val(),
						"p_c_unid_med": $("#c_unid_med_m","#frm_modificacion_datos").val(),
						"id_menu": 10775,
						"n_orden": 0
					},
					dataType: 'json',
					success: function(data) {
						if (data.resultado == 'OK') {
							mostrar_confirmacion('Se modificaron los datos correctamente.');
							$("#modificacion_datos").modal('hide');
							$("#main_grid").trigger('reloadGrid');
						} else {
							mostrar_error(data.resultado);
							return;
						}
					}
				});
			}else{
				mostrar_validacion('Los campos CUIT y Denominación deben estar ambos cargados o ambos vacíos.');
			}
		}
	});

	$("#btn_liq_extincion").click(function(){
		$("#i_baja","#frm_liq_extincion").val(formatea_number($("#i_baja","#frm_liq_extincion").val(),''));
		var i_extincion = $("#i_baja","#frm_liq_extincion").val();
		var rowid = valida_seleccion_grilla("#main_grid");
		var valido = $("#frm_modificacion_datos").validationEngine('validate');
		if (valido){
			$.ajax({
				type: 'POST',
				url: FUNCIONES_BASEPATH + 'maestro_abm.php',
				data: {
					"p_id_contribuyente": $("#main_grid").getCell(rowid,'id_contribuyente'),
					"p_n_partida": $("#main_grid").getCell(rowid,'n_partida'),
					"p_f_baja": $("#f_vto","#frm_liq_extincion").val(),
					"p_i_baja": i_extincion,
					"id_menu": 10775,
					"n_orden": 2
				},
				dataType: 'json',
				success: function(data) {
					if (data.resultado == 'OK') {
						mostrar_confirmacion('La extinción se liquidó correctamente.');
						$("#liq_extincion").modal('hide');
						$("#main_grid").trigger('reloadGrid');
					} else {
						mostrar_error(data.resultado);
						return;
					}
				}
			});
		}
	});

	$("#btn_modificar_h_hect").click(function(){
        $.ajax({
			type: 'POST',
			url: FUNCIONES_BASEPATH + 'maestro_abm.php',
			data: {
				"oper": 'edit',
				"n_partida": $("#n_partida","#frm_modificacion_h_hect").val(),
				"c_tipo": 'H',
				"n_hectareas": formatea_number($("#n_hectareas","#frm_modificacion_h_hect").val(),''),
				"f_vig_desde": $("#f_vig_desde","#frm_modificacion_h_hect").val(),
				"f_vig_hasta": $("#f_vig_hasta","#frm_modificacion_h_hect").val(),
				"id_menu": 10775,
				"n_orden": 4
			},
			dataType: 'json',
			success: function(data) {
				if (data.resultado == 'OK') {
					$("#modificacion_h_hect").modal('hide');
					$("#grid_hist_hectareas, #main_grid").trigger('reloadGrid');
				} else {
					mostrar_error(data.resultado);
					return;
				}
			}
		});
    });

    $("#btn_modificar_h_act").click(function(){
    	$.ajax({
			type: 'POST',
			url: FUNCIONES_BASEPATH + 'maestro_abm.php',
			data: {
				"oper": 'edit',
				"n_partida": $("#n_partida","#frm_modificacion_h_act").val(),
				"c_tipo": 'A',
				"c_actividad": $("#c_actividad_h","#frm_modificacion_h_act").val(),
				"f_vig_desde": $("#f_vig_desde","#frm_modificacion_h_act").val(),
				"f_vig_hasta": $("#f_vig_hasta","#frm_modificacion_h_act").val(),
				"id_menu": 10775,
				"n_orden": 4
			},
			dataType: 'json',
			success: function(data) {
				if (data.resultado == 'OK') {
					$("#modificacion_h_act").modal('hide');
					$("#grid_hist_actividades, #main_grid").trigger('reloadGrid');
				} else {
					mostrar_error(data.resultado);
					return;
				}
			}
		});
    });

    $("#btn_modificar_h_resp").click(function(){
        $.ajax({
			type: 'POST',
			url: FUNCIONES_BASEPATH + 'maestro_abm.php',
			data: {
				"oper": 'edit',
				"n_partida": $("#n_partida","#frm_modificacion_h_resp").val(),
				"n_cuit": limpia_cuit($("#n_cuit","#frm_modificacion_h_resp").val()),
				"d_denominacion": $("#d_denominacion","#frm_modificacion_h_resp").val(),
				"id_contribuyente": $("#id_contribuyente","#frm_modificacion_h_resp").val(),
				"f_vig_desde": $("#f_vig_desde","#frm_modificacion_h_resp").val(),
				"f_vig_hasta": $("#f_vig_hasta","#frm_modificacion_h_resp").val(),
				"id_menu": 10775,
				"n_orden": 4
			},
			dataType: 'json',
			success: function(data) {
				if (data.resultado == 'OK') {
					$("#modificacion_h_resp").modal('hide');
					$("#grid_hist_responsables, #main_grid").trigger('reloadGrid');
				} else {
					mostrar_error(data.resultado);
					return;
				}
			}
		});
    });
}

function inscribir_partida(rowid){
	$.ajax({
		type: 'POST',
		url: FUNCIONES_BASEPATH + 'maestro_abm.php',
		data: {
			"p_oper": 'add',
			"p_id_inmueble": $("#main_grid").getCell(rowid,'id_inmueble'),
			"p_n_partida": $("#main_grid").getCell(rowid,'n_partida'),
			"p_f_inscripcion": $("#f_inscripcion","#frm_inscripcion_tributo").val(),
			"p_n_hectareas": formatea_number($("#n_hectareas","#frm_inscripcion_tributo").val(),''),
			"p_c_actividad": $("#c_actividad_i","#frm_inscripcion_tributo").val(),
			"p_n_cuit_resp": limpia_cuit($("#n_cuit","#frm_inscripcion_tributo").val()),
			"p_d_denominacion_resp": $("#d_denominacion","#frm_inscripcion_tributo").val(),
			"p_id_contribuyente": $("#id_contribuyente","#frm_inscripcion_tributo").val(),
			"p_n_regante": $("#n_regante","#frm_inscripcion_tributo").val(),
			"p_c_unid_med": $("#c_unid_med_i","#frm_inscripcion_tributo").val(),
			"id_menu": 10775,
			"n_orden": 0
		},
		dataType: 'json',
		success: function(data) {
			if (data.resultado == 'OK') {
				mostrar_confirmacion('La partida se inscribió correctamente al tributo.');
				$("#inscripcion_tributo").modal('hide');
				$("#main_grid").trigger('reloadGrid');
			} else {
				mostrar_error(data.resultado);
				return;
			}
		}
	});
}

function revertir_cese(){
	var rowid = valida_seleccion_grilla("#main_grid");
	if (rowid){
		$.ajax({
			type: 'POST',
			url: FUNCIONES_BASEPATH + 'maestro_abm.php',
			data: {
				"p_id_contribuyente":$("#main_grid").getCell(rowid,'id_contribuyente'),
				"p_id_inmueble":$("#main_grid").getCell(rowid,'id_inmueble'),
				"p_n_partida":$("#main_grid").getCell(rowid,'n_partida'),
				"p_f_inscripcion":$("#main_grid").getCell(rowid,'f_inscripcion'),
				"id_menu":10775,
				"n_orden":3
			},
			dataType: 'json',
			success: function(data) {
				if (data.resultado == 'OK') {
					mostrar_confirmacion('La partida se ha reinscripto al tributo correctamente.');
					$("#main_grid").trigger('reloadGrid');
				} else {
					mostrar_error(data.resultado);
					return;
				}
			}
		});
	}
}

function inicializa_lupa_actividad(formid,d_modal){
	$("#btn_lupa_actividad",formid).lupa_generica({
		id_lista:v_lista_actividades,
		titulos:['Código','Descripción'],
		grid:[  {index:'c_codigo',width:100},
		    {index:'d_descrip',width:450}],
		caption:'Actividades',
		sortname:'c_codigo',
		sortorder:'asc',
		searchCode:true,
		searchInput: '#c_actividad'+d_modal,
		searchOnInitialize:true,
		exactField: 'c_codigo',
		campos:{c_codigo:'c_actividad'+d_modal,d_descrip:'d_actividad'+d_modal},
		keyNav:true,
		limpiarCod: true,
		foco:"#d_label"
	});
}
function inicializa_lupa_unidades(formid,d_modal){
	$("#btn_lupa_unidades",formid).lupa_generica({
		id_lista:v_lista_unidades,
		titulos:['Código','Descripción'],
		grid:[  {index:'c_codigo',width:100},
		    {index:'d_descrip',width:450}],
		caption:'Unidades de medida',
		sortname:'c_codigo',
		sortorder:'asc',
		searchCode:true,
		searchInput: '#c_unid_med'+d_modal,
		searchOnInitialize:true,
		exactField: 'c_codigo',
		campos:{c_codigo:'c_unid_med'+d_modal,d_descrip:'d_unid_med'+d_modal},
		keyNav:true,
		limpiarCod: true,
		foco:"#d_label"
	});
}

function inicializa_lupa_motivo(formid){
	$("#btn_lupa_motivo",formid).lupa_generica({
		id_lista:v_lista_motivos_baja,
		titulos:['Código','Descripción'],
		grid:[  {index:'c_codigo',width:100},
		    {index:'d_descrip',width:450}],
		caption:'Motivos',
		sortname:'c_codigo',
		sortorder:'asc',
		searchCode:true,
		searchInput: '#c_motivo',
		searchOnInitialize:true,
		exactField: 'c_codigo',
		campos:{c_codigo:'c_motivo', d_descrip:'d_motivo'},
		keyNav:true,
		limpiarCod: true,
		foco:"#d_label"
	});
}