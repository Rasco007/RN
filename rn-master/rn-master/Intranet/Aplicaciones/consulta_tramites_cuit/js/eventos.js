$(document).ready(function () {
	crea_grilla_datos();

	document.getElementById('grid_datos_tramite').style.display="none";
	document.getElementById('tabs_grid').style.display="none";

	$("#cuit_transaccion").mask("99-99999999-9");

	$("#fecha_transaccion").datepicker(
		{   dateFormat:'dd/mm/yy',
			changeMonth:true,
			changeYear:true,
			dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
			monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
			monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
		})
		.blur(function(){
			formatearFecha($(this));
		}).mask('99/99/99ZZ', {translation: {'Z': {pattern: /[0-9]/, optional: true}}}
	);

	$("#f_siat").datepicker(
		{   dateFormat:'dd/mm/yy',
			changeMonth:true,
			changeYear:true,
			dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
			monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
			monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
		})
		.blur(function(){
			formatearFecha($(this));
		}).mask('99/99/99ZZ', {translation: {'Z': {pattern: /[0-9]/, optional: true}}}
	);

	$('#btn_consulta').click(function(){
		$('#main').procOverlay({visible:true});
		if (
			(!$('#id_transaccion').val() && (!$('#n_tramite').val() && !$('#id_sistema').val()) && !$('#cuit_transaccion').val()) ||
			(!$('#id_transaccion').val() && ($('#n_tramite').val() && !$('#id_sistema').val()) && !$('#cuit_transaccion').val()) ||
			(!$('#id_transaccion').val() && (!$('#n_tramite').val() && $('#id_sistema').val()) && !$('#cuit_transaccion').val())
		){
			mostrar_cuadro('E', 'Error', 'Debe ingresar al menos uno de los siguientes criterios de búsqueda: Transacción, Nro. de Trámite, Sistema o CUIT.',
				null,null,400);
			$('#main').procOverlay({visible:false});
		}else{
			if($('#cuit_transaccion').val()){
				autocompleta_por_cuit();
				return;
			}
			if($('#id_transaccion').val()){
				autocompleta_por_id_transaccion();
				return;
			}
			if($('#n_tramite').val() && $('#id_sistema').val()){
				autocompleta_por_tramite_sistema();
			}
		}
		document.getElementById("bt_display_filter_toolbar_datos_tramite_grid_pager").style.display = "none";
		if(document.getElementById("bt_display_filter_toolbar_grid_datos_modificados_pager")){
			document.getElementById("bt_display_filter_toolbar_grid_datos_modificados_pager").style.display = "none";
		}
	});

	$('#btn_limpiar').click(function(){
		$('#general').hide();
		$("input").attr('disabled',false);
		$('#id_transaccion').val(null);
		$('#id_tipotransacc').val(null);
		$('#d_tipotransacc').val(null);
		$('#n_tramite').val(null);
		$('#id_sistema').val(null);
		$('#d_sistema').val(null);
		$('#cuit_transaccion').val(null);
		$('#id_estadotransacc').val(null);
		$('#id_jurisdiccion_sede').val(null);
		$('#fecha_transaccion').val(null);
		$('#hora_transaccion').val(null);
		$('#c_resultado_alta').val(null);
		$('#d_resultado_alta').val(null);
		$('#f_siat').val(null);
		$('#d_error_proceso').val(null);
		$('#datos_grid').clearGridData();
		$('#actividades_grid').clearGridData();
		$('#jurisdicciones_grid').clearGridData();
		$('#datos_tramite_grid').clearGridData();
		document.getElementById('grid_datos_tramite').style.display="none";
		document.getElementById('tabs_grid').style.display="none";
	});

	$('#btn_tab_resumen, #btn_tab_act, #btn_tab_juris').click(function(){
		$(window).resize();
	})

});
