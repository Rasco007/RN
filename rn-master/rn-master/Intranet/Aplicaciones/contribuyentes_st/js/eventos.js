$(document).ready(function () {

	$("#n_cuit").mask("99-99999999-9");
	$("#n_documento").mask("99999999999");

	$("#btn_limpiar").click(function(){
		$("#frm_busqueda input").val('');
		$(".selectpicker").val('');
		$(".selectpicker").selectpicker('refresh');
		$('#btn_generar_ficticio').attr('disabled',false);
		$('#btn_generar').attr('disabled',false);
	});

	$('#m_persona').change(function(){
		if($('#m_persona').val() == 'J'){
			$('#c_sexo, #d_c_tipo_documento, #n_documento').removeClass('validate[required]');
			$('#c_sexo, #c_tipo_documento, #d_c_tipo_documento, #n_documento, #n_cuit').val(null);
			$('#c_sexo, #c_tipo_documento, #d_c_tipo_documento, #n_documento').attr('disabled',true);
			$(".selectpicker").selectpicker('refresh');
		}else{
			$('#c_sexo, #d_c_tipo_documento, #n_documento').addClass('validate[required]');
			$('#c_sexo, #c_tipo_documento, #d_c_tipo_documento, #n_documento').attr('disabled',false);
			$('#n_cuit').val(null);
			$(".selectpicker").selectpicker('refresh');
		}
	});

	$('#btn_generar_ficticio').click(function(){
		var valido = $("#frm_busqueda").validationEngine('validate');
		if(valido){
			$('#main').procOverlay({visible:true});
			$.ajax({
				type:'POST',
				url: "contribuyentes_st/ajax_contribuyente_st.php", 	
				data: {tipo:"obtener_cuit_ficticio",
					n_documento:$("#n_documento").val()},
				dataType: 'json',
				async:false,
				success: function(ret) {
					if(ret.n_cuit){
						$('#btn_generar_ficticio').attr('disabled',true);
						$('#btn_generar').attr('disabled',true);
						$("#n_cuit").val(ret.n_cuit);
						$("#n_cuit").mask("99-99999999-9");
					}else{
						mostrar_error(ret.p_error);
					}
					$('#main').procOverlay({visible:false});
				}
			});
		}
	});

	$('#btn_generar').click(function(){
		var valido = $("#frm_busqueda").validationEngine('validate');
		if(valido){
			$('#main').procOverlay({visible:true});
			$.ajax({
				type:'POST',
				url: "contribuyentes_st/ajax_contribuyente_st.php", 	
				data: {tipo:"obtener_cuit",
					c_tipo_documento:$("#c_tipo_documento").val(),
					n_documento:$("#n_documento").val(),
					m_persona:$("#m_persona").val(),
					c_sexo:$("#c_sexo").val()},
				dataType: 'json',
				async:false,
				success: function(ret) {
					if(ret.n_cuit){
						$('#btn_generar_ficticio').attr('disabled',true);
						$('#btn_generar').attr('disabled',true);
						$("#n_cuit").val(ret.n_cuit);
						$("#n_cuit").mask("99-99999999-9");
					}else{
						mostrar_error(ret.p_error);
					}
					$('#main').procOverlay({visible:false});
				}
			});
		}
	});

	$('#btn_abm_contribuyente').click(function(){
		var valido = $("#frm_busqueda").validationEngine('validate');
		var cuit = limpia_cuit($("#n_cuit").val());
		if(valido && cuit != ''){
			post_to_url('contribuyentes.php', {
				'p_objeto_viejo': p_objeto_viejo,
				'p_permite_vs_ag': p_permite_vs_ag,
				'p_sintributo': p_sintributo,
				'tipo_documento': $("#c_tipo_documento").val(),
				'd_tipo_documento': $("#d_c_tipo_documento").val(),
				'documento': $("#n_documento").val(),
				'cuit': cuit,
				'tipo_persona': $("#m_persona").val(),
				'sexo': $("#c_sexo").val(),
				'ruta':"[]",
				'p_n_id_menu': 10865}, '_blank');
			$("#btn_limpiar").click();
		}else{
			mostrar_validacion('Debe generar un CUIT primero.');
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
});
