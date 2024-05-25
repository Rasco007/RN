$(document).ready(function () {
	$("#n_cuit").mask("99-99999999-9");
	$("#n_documento").mask("99999999999");
	
	$('#btn_consultar').click(function(){
		$('#main').procOverlay({visible:true});
		var existe;
		var existe_contrib = obtener_id_contribuyente();
		
		if(existe_contrib != 'error'){
			if(existe_contrib != -1){
				existe = true;
			} else {
				existe = false;
			}

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
								crea_botones_historicos();
								// solucion para ver bien las grillas
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

	// Buscar automáticamente
    if(p_consulta == 'S'){
		$("#btn_consultar").click();
		$("#btn_consultar").hide();
	}
});
