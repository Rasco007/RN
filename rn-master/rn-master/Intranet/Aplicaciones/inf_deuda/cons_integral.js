// JavaScript Document

//Definicion de Botones
//botones de frm_busqueda
function crea_botones_frm(){

	$("#lupa_tributo").button({
    	icons: {primary: 'ui-icon-search'},
        text: true
    });	

    $("#lupa_tipo_imponible").button({
    	icons: {primary: 'ui-icon-search'},
        text: true
    });

//function click del boton limpiar
$('#btn_limpiar').click(function(){
	fun_limpia_formulario("#frm_busqueda");
	
	if( $("#dialog_check_tributos").hasClass('ui-widget-content')) $('#dialog_check_tributos').dialog('close');
	
	$('#n_cuit').attr('readonly',false);
	$("#razon_social").attr('readonly',false);
	$('#c_tributo_filtro').attr('readonly',false);
	$('#objeto_hecho').attr('readonly',false);
	$('#lupa_c_tipo_documento,#lupa_c_tributo_filtro').show();
	$('#div_ig_objeto').addClass('input-group');

	$('#lupa_objeto').hide();
	$('#mascara_lupa_objeto').show().css('display', 'table-cell');

	$('#btn_buscar').attr('disabled',false);
	
	$('#lupa_c_tipo_documento').attr('disabled',false);
	$('#c_tipo_documento').attr('readonly',false);
	
	$('#n_documento').attr('readonly',false);
	
	$('#general').remove();	
	$("#frm_busqueda").validationEngine('hideAll');
});
//-----fin evento click de btn limpiar

}
//-----fin de botones de frm_busqueda

function campos_eventos_frm(){
	
$('#n_cuit').focusout(function(){
    setTimeout(fun_ajax_cuit, 100);
});

$('#n_documento').change(function(){
	if( (($('#n_documento').val().length >= 7) && ($('#n_documento').val().length <= 8))
		&& 
		($('#c_tipo_documento').val() == '6' && !$('#id_contribuyente').val()) ){
		setTimeout(fun_ajax_documento, 100);
	}else if( ($('#c_tipo_documento').val() != '6') && ($('#c_tipo_documento').val() != '') && !$('#id_contribuyente').val()){
		setTimeout(fun_ajax_documento, 100);
	}
});



//------ fin comportamiento de campos CUIT , DENOMINACION , C_TRIBUTO, TIPO IMPONIBLE
	
	
	
}



function crea_botones_tabs(){
	$('.panel_btn').click(function(){
			var grid = getGridTabSelected();
			if(!$("#"+grid).getGridParam('selrow')){
					mostrar_error('Debe seleccionar un objeto hecho');	
					return false;
			}
			
			
			var id = $("#"+grid).getGridParam('selrow');
			var d_objeto_hecho = $("#"+grid).getCell(id,'d_objeto_hecho');
			var id_contribuyente = $("#id_contribuyente").val();
			var c_tributo = $("#"+grid).getCell(id,'c_tributo');
			var c_tipo_imponible = $("#"+grid).getCell(id,'c_tipo_imponible');
			var d_objeto_hecho = $("#"+grid).getCell(id,'d_objeto_hecho');

			
			var funcion = $(this).attr('data-fun');
			
			switch (funcion){
				case "abrir_det_cta_cte":
					abrir_cuenta_corriente(d_objeto_hecho,id_contribuyente,c_tipo_imponible,c_tributo);
				break;
				case "informe_deuda":
					rep_inf_deuda(c_tipo_imponible,c_tributo,d_objeto_hecho);
					break;
			}
	});
}

//////////******************FIN BOTONES DIALOGOS CAMPOS ETC**************************************//////////////////////////


//////////******************COMIENZO FUNCIONES JAVASCRIPT****************************************/////////////////////////
//funciones javascript
function fun_limpia_formulario(form){
	$(form + " input , " + form + " textarea ").val("");
}

function seteaPostGrilla(timp,id_menu, id_session){
	var _parametros = {':p_c_timp':timp,':p_id_contribuyente':$("#id_contribuyente").val(),
				':c_tributo':$("#c_tributo").val(),':d_objeto_hecho':$("#objeto_hecho").val(),':c_tipo_imponible':$("#tipo_imponible").val(), 'id_session': id_session};
	
	return {
			id_menu:id_menu,
			n_grid:0,
			m_autoquery:'S',
			n_orden:0,
            rowNum:50,
			param:JSON.stringify(_parametros)};
};

function abrir_cuenta_corriente(objeto_hecho,id_contribuyente,c_tipo_imponible,c_tributo){
	post_to_url('consulta_cuenta_corr.php',{'p_n_id_menu':10852,'d_objeto_hecho':objeto_hecho,'id_contribuyente':id_contribuyente,'c_tipo_imponible':c_tipo_imponible,'c_tributo':c_tributo, 'p_m_autoquery':'S'},'_blank');
}

function rep_inf_deuda(tipo_imponible,tributo,d_objeto_hecho){
	$('#c_tipo_imponible').val(tipo_imponible).blur();
	$('#c_tributo').val(tributo).blur();
	$('#objeto_rep').val(d_objeto_hecho);
	$('#c_tipo_imponible ,#d_tipo_imponible, #lupa_c_tipo_imponible, #c_tributo, #d_tributo, #lupa_c_tributo').attr('disabled',true);
	$("#estado_deuda").modal('show');
}

function fun_convierte_pos_fiscal_a_num(string){
	if(string != ''){
		var res = string.split("/");
		var retorno;
		if(res.length >1){
			retorno = res[0] + res[1];
		}else{
			retorno = res[0];
		}
		return retorno;
	}else{
		return string;
	}
}

function fun_ajax_objeto_hecho(){	
		$.ajax({
				url: 'inf_deuda/autocomplete.php',
				type:"POST",
				data:{"oper":3,
					"c_tributo":$("#c_tributo").val(),
					"c_tipo_imponible":$("#tipo_imponible").val(),
					"contrib":$("#id_contribuyente").val(),
					"term":$("#objeto_hecho").val()}, 
			 	async:false,
				success: function(data){
						var resp = eval('('+data+')');					
						if(resp){			
							$('#n_cuit').val(resp['data_obj'][0].cuit);						
							$("#id_contribuyente").val(resp['data_obj'][0].id_contribuyente);
							$("#razon_social").val(resp	['data_obj'][0].razon_social);
						}
				}
			});			
	
}

function fun_ajax_objeto_hecho2(){
    $.ajax({
        url: 'inf_deuda/autocomplete.php',
        type:"POST",
        data:{"oper":4,
            "c_tributo":$("#c_tributo_filtro").val(),
            "c_tipo_imponible":$("#tipo_imponible").val(),
            "contrib":$("#id_contribuyente").val(),
            "term":($("#objeto_hecho").val()).trim()},
        async:false,
        success: function(data){
            var resp = eval('('+data+')');
            if(resp){
				$("#cantidad_objetos").val(resp['data_obj'][0].cantidad);
            	if (resp['data_obj'][0].cantidad == 1){
					$('#n_cuit').val(resp['data_obj'][0].cuit);
				   //Para formatear el cuit con la mascara
					$('#n_cuit').focus();
					$('#btn_buscar').focus();//quitamos el foco para evitar problemas al momento de limpiar los campos
					$("#id_contribuyente").val(resp['data_obj'][0].id_contribuyente);
					$("#razon_social").val(resp	['data_obj'][0].razon_social);
				} else {
            		$("#lupa_objeto").click();
				}
            }else{
				$("#cantidad_objetos").val(null);
			}
        }
    });

}

function fun_ajax_documento(){
	try{
		$.ajax({
				url: 'inf_deuda/devuelve_datos_ajx.php',
				type:"POST",
				data:{
					"oper":'devuelve_deno_documento',
					"c_tipo_documento":$("#c_tipo_documento").val(),
					"n_documento":$("#n_documento").val()
					},
				async:true,
				success: function(data){
						ret = eval('('+data+')');

						if( ret != undefined ){
							if( parseInt(ret.length) == 1){
								$("#n_cuit").val(ret[0]['N_CUIT']);
								$("#razon_social").val(ret[0]['D_DENOMINACION']);
								$("#id_contribuyente").val(ret[0]['ID_CONTRIBUYENTE']);
								$("#c_tipo_documento").val(ret[0]['C_TIPO_DOCUMENTO']);
								$("#n_documento").val(ret[0]['N_DOCUMENTO']);
								$('#d_c_tipo_documento').val(ret[0]['D_TIPO_DOCUMENTO']);
							}else if(ret.length > 1){
								/*cuando se trata de un contribuyente que tiene varios registros en contribuyentes
								con el mismo dni*/
								$('#dialog_select_contribuyente').dialog('open');

								contrib_ar = ret;

								var html_contrib = '<table id="table_lista_contrib">'+
													'<tr>'+
														'<th width="75px">CUIT</th>'+
														'<th width="260px">Denominaci&oacute;n</th>'+
													'</tr>';

								for(i=0; i<contrib_ar.length; i++){
									html_contrib += '<tr onclick="selectContribuyente('+i+')">'+
												'<td align="center">'+contrib_ar[i]['N_CUIT']+'</td>'+
												'<td align="left">'+contrib_ar[i]['D_DENOMINACION']+'</td>'+
											'</tr>';
								}

								html_contrib += '</ul>';
								$('#dialog_select_contribuyente').html(html_contrib);
							}else{
								$("#n_cuit").val(null);
								$("#razon_social").val(null);
								$("#id_contribuyente").val(null);
							}
						}else{
							$("#n_cuit").val(null);
							$("#razon_social").val(null);
							$("#id_contribuyente").val(null);
						}
				}
			});
	}catch(err){
	}
}
function fun_ajax_cuit(){
	try{
		if( limpia_cuit($('#n_cuit').val()).length == 11 ){
			$.ajax({
				url: 'inf_deuda/devuelve_deno.php',
				type:"POST",
				data:{"n_cuit":limpia_cuit($("#n_cuit").val())},
				async:true,
				success: function(data){
					ret = eval('('+data+')');
					if(ret != null){
						$("#razon_social").val(ret.D_DENOMINACION);
						$("#id_contribuyente").val(ret.ID_CONTRIBUYENTE);
						$("#c_tipo_documento").val(ret.C_TIPO_DOCUMENTO);
						$("#n_documento").val(ret.N_DOCUMENTO);
						$('#d_c_tipo_documento').val(ret.D_TIPO_DOCUMENTO);
					}else{
						$("#razon_social").val(null);
						$("#id_contribuyente").val(null);
						$("#c_tipo_documento").val(null);
						$("#d_c_tipo_documento").val(null);
						$("#n_documento").val(null);
					}
				}
			});

		}else{
			$('#btn_limpiar').click();
		}
	}catch(err){
	}
}

function getGridTabSelected() {
    return $(".nav-tabs .active > a").attr("data-grid");
}

function selectContribuyente( p_pos ){
	
	$("#n_cuit").val(ret[p_pos]['N_CUIT']); 
	$("#razon_social").val(ret[p_pos]['D_DENOMINACION']); 
	$("#id_contribuyente").val(ret[p_pos]['ID_CONTRIBUYENTE']);
	$("#c_tipo_documento").val(ret[p_pos]['C_TIPO_DOCUMENTO']);
	$("#n_documento").val(ret[p_pos]['N_DOCUMENTO']);
	$('#d_c_tipo_documento').val(ret[p_pos]['D_TIPO_DOCUMENTO']);
	
	$('#dialog_select_contribuyente').dialog('close');
	$('#btn_buscar').click();
}

function limpia_cuit(cuit){
	var cuit_sin_guiones = cuit.replace(/-/g, '');
	return cuit_sin_guiones;
}