$(document).ready(function () {

	$("#n_cuit").mask("99-99999999-9");

	if(p_tributo == 90){
		$("#label_objeto").html('Patente (*)');
		$("#div_nomenclatura").hide();
		$("#d_nomenclatura").removeClass('validate[required]');
	}else{
		$("#label_objeto").html('Partida (*)');
		$("#div_nomenclatura").show();
		$("#d_nomenclatura").addClass('validate[required]');
	}

	$('#btn_limpiar').click(function(){
		$('#frm_busqueda input').val(null);
		$('#frm_busqueda input').attr('disabled',false);
		$('.limpiar').attr('readonly',false);
		$('#btn_consultar').attr('disabled',true);
		if(p_tributo == 60){
			$('#lupa_d_nomenclatura').show();
		}
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

	$('#d_objeto',"#frm_busqueda").change(function(){
		$('#main').procOverlay({visible:true});
		$.ajax({
			url: "libre_deuda/autocomplete.php",
			type:"POST",
			data:{
				p_oper:'objeto',
				filtro: $('#d_objeto').val(),
				p_tributo: p_tributo
			},
			success: function(response){
				$('#main').procOverlay({visible:false});
				res = JSON.parse(response);
				if (res){
					$("#n_cuit","#frm_busqueda").val(res['N_CUIT']);
					$("#d_denominacion","#frm_busqueda").val(res['D_DENOMINACION']);
					$("#id_contribuyente","#frm_busqueda").val(res['ID_CONTRIBUYENTE']);
					if(p_tributo == 60){
						$("#d_nomenclatura","#frm_busqueda").val(res['D_NOMENCLATURA_REAL']);
					}
					if($("#id_contribuyente","#frm_busqueda").val()){
						$('#btn_consultar').attr('disabled',false);
					}
				}else{
					$("#d_objeto","#frm_busqueda").val(null);
					$("#n_cuit","#frm_busqueda").val(null);
					$("#d_denominacion","#frm_busqueda").val(null);
					$("#id_contribuyente","#frm_busqueda").val(null);
					if(p_tributo == 60){
						$("#d_nomenclatura","#frm_busqueda").val(null);
					}
					$('#btn_consultar').attr('disabled',true);
				}
			}
		});
	});

	$("#lupa_d_nomenclatura").lupa_generica({
		id_lista:v_lista_nomen_part,
		titulos:['Nomenclatura','Partida'],
		grid:[{index:'d_nomenclatura_real',width:150},
			{index:'d_nomenclatura',width:350}],
		caption:'Nomenclaturas',
		sortname:'d_nomenclatura_real',
		sortorder:'asc',
		campos:{d_nomenclatura_real:'d_nomenclatura',d_nomenclatura:'d_objeto'},
		keyNav:true,
		exactField: 'c_dato',
		onClose:function(){
			$.ajax({
				url: "libre_deuda/autocomplete.php",
				type:"POST",
				data:{
					p_oper:'objeto',
					filtro: $('#d_objeto').val(),
					p_tributo: p_tributo
				},
				success: function(response){
					$('#main').procOverlay({visible:false});
					res = JSON.parse(response);
					if (res){
						$("#n_cuit","#frm_busqueda").val(res['N_CUIT']);
						$("#d_denominacion","#frm_busqueda").val(res['D_DENOMINACION']);
						$("#id_contribuyente","#frm_busqueda").val(res['ID_CONTRIBUYENTE']);
						if($("#id_contribuyente","#frm_busqueda").val()){
							$('#btn_consultar').attr('disabled',false);
						}
					}else{
						$("#n_cuit","#frm_busqueda").val(null);
						$("#d_denominacion","#frm_busqueda").val(null);
						$("#id_contribuyente","#frm_busqueda").val(null);
						$('#btn_consultar').attr('disabled',true);
					}
				}
			});
		}
	});
});