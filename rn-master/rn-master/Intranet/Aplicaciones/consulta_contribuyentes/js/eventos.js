$(document).ready(function () {
	$("#n_cuit").mask("99-99999999-9");
	$("#n_documento").mask("99999999999");
	
	$('#btn_limpiar').click(function(){
		$("#n_cuit").attr('disabled',false);
		$("#lupa_c_tipo_documento").show();
		limpiar_busqueda();
		$("input").attr('disabled',false);
		$(".selectpicker").attr('disabled',false);
		$(".selectpicker").selectpicker('refresh');
		$(".btn_lupa").show();
	});
	
	$('#btn_consultar').click(function(){
		$('#main').procOverlay({visible:true});
		var existe;
		var existe_contrib = existe_contribuyente(limpia_cuit($('#n_cuit').val()),$('#c_tipo_documento').val(),limpia_dni($('#n_documento').val()));
		
		if(existe_contrib != 'error'){
			if(existe_contrib != -1){
				existe = true;
			} else {
				existe = false;
			}

			if(existe){
				$('#n_cuit').removeClass("validate[required]");
			}		

			valida_campos_documento();					
			var valido = $('#frm_busqueda').validationEngine('validate');  // will return true or false		
			if(valido){
				$('#frm_busqueda').validationEngine('hideAll');	
				$("#n_cuit").attr('disabled',true);
				$("#d_denominacion").attr('readonly',true);
				if(existe){
					if(existe_contrib != -1){
						$("#btn_consultar").prop('disabled', true);
						$.ajax({
							type:'POST',
							url: "consulta_contribuyentes/alta_contribuyente.php", 	
							data: {id_contribuyente: existe_contrib},
							dataType: 'json',
							success: function(ret) {
								$('#general').remove();
								$('#main').append(ret);
								mostrar_solapas();
								setear_parametros_grillas();
								$('#main').procOverlay({visible:false});
								$("input").attr('disabled',true);
								$(".selectpicker").attr('disabled',true);
								$(".selectpicker").selectpicker('refresh');
								$(".btn_lupa").hide();
								// solucion para ver bien las grillas
								crea_botones_historicos();
								$("#tabs > ul > li").hover(function(){
									$(window).resize();
								});
								$("#tabs > ul > li").click(function(){
									$(window).resize();
								});
								$("#0,#1,#2,#3,#4,#5,#6,#7,#8,#9").click(function(){
									activeTab();
								});
							}
						});
					}
				}else{
					mostrar_error('No existe un contribuyente para la busqueda realizada.');
				}
			}
		}
	});

	$("#d_denominacion","#frm_busqueda").autocomplete({
		source: function( request, response ) {
			if (ajax_autocomplete) ajax_autocomplete.abort();
			ajax_autocomplete =
				$.ajax({
					type:'POST',
					url: "consulta_contribuyentes/autocomplete.php",
					data: {p_oper:'denominacion', filtro: request.term},
					dataType: 'json',
					success: function( data ) {
						ajax_autocomplete = null;
						if(data) {
							response(
								$.map(data.data_contrib, function( item ) {
									return {
										label: item.label,
										value: item.razon_social,
										cuit: item.cuit,
										id_contribuyente: item.id_contribuyente,
										c_tipo_documento: item.c_tipo_documento,
										d_c_tipo_documento: item.d_c_tipo_documento,
										n_documento: item.n_documento
									}
								})
							);
						}
					}
				});
		},
		minLength:1,
		select:function(event,ui){
			$("#d_denominacion").val(ui.item.value);
			$("#n_cuit").val(ui.item.cuit);
			$("#id_contribuyente").val(ui.item.id_contribuyente);
			$("#c_tipo_documento").val(ui.item.c_tipo_documento);
			$("#d_c_tipo_documento").val(ui.item.d_c_tipo_documento);
			$("#n_documento").val(ui.item.n_documento);
			return false;
		}
	});

	$("#lupa_c_tipo_documento").lupa_generica({
		id_lista:v_lista_tipo_documentos,
		titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_dato',width:100},
			{index:'d_dato',width:350}],
		caption:'Tipos de Documento',
		sortname:'c_dato',
		sortorder:'asc',
		campos:{c_dato:'c_tipo_documento',d_dato:'d_c_tipo_documento'},
		searchCode:true,
		searchInput: '#c_tipo_documento',
		keyNav:true,
		exactField: 'c_dato'
	});
	
	$('#n_cuit',"#frm_busqueda").change(function(){
		n_cuit_focusout();
	});

	// Buscar automáticamente
    if($("#n_cuit").val()){
    	$("#n_cuit, #c_tipo_documento, #n_documento","#frm_busqueda").attr('readonly',true);
    	$("#lupa_c_tipo_documento").hide();
    	n_cuit_focusout();
    }
});
