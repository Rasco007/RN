
function fun_aceptar_error_carga(){
	setea_parametros('#grid_errores',{'id_contribuyente':$('#id_contribuyente_tmp').val()});
	$("#div_grid_errores").dialog("open");
}

function fun_cargar_observaciones(){	
		$("#div_observaciones").dialog('open');
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////


/////////////////////////// FUNCIONES DE BOTON BUSCAR /////////////////////////////////

function valida_campos_documento(){
		
	/*if ((($('#c_tipo_documento').val() != '') && $('#d_c_tipo_documento').val() != '') && $('#n_documento').val() == ''){
		$('#n_documento').addClass("validate[required]");	
	}else{
		$('#n_documento').removeClass("validate[required]");
	}
	
	if ((($('#c_tipo_documento').val() != '') && $('#d_c_tipo_documento').val() == '') && $('#n_documento').val() != ''){
		$('#d_c_tipo_documento').addClass("validate[required]");	
	}else{
		$('#d_c_tipo_documento').removeClass("validate[required]");
	}
			
	if ((($('#c_tipo_documento').val() == '') && $('#d_c_tipo_documento').val() != '') && $('#n_documento').val() != ''){
		$('#c_tipo_documento').addClass("validate[required]");	
	}else{
		$('#c_tipo_documento').removeClass("validate[required]");
	}
	
	if ((($('#c_tipo_documento').val() == '') && $('#d_c_tipo_documento').val() == '') && $('#n_documento').val() != ''){
		$('#c_tipo_documento').addClass("validate[required]");	
		$('#d_c_tipo_documento').addClass("validate[required]");	
	}else{
		$('#c_tipo_documento').removeClass("validate[required]");
		$('#d_c_tipo_documento').removeClass("validate[required]");
	}
	
	if (($('#c_tipo_documento').val() != '') && ($('#d_c_tipo_documento').val() == '') && ($('#n_documento').val() == '')){
		$('#n_documento').addClass("validate[required]");	
		//$('#d_c_tipo_documento').addClass("validate[required]");	
	}else{
		$('#n_documento').removeClass("validate[required]");
		//$('#d_c_tipo_documento').removeClass("validate[required]");
	}
	

	
*/

if ((($('#c_tipo_documento').val() != '') && $('#d_c_tipo_documento').val() != '') && $('#n_documento_mask').val() == ''){
		$('#n_documento_mask').addClass("validate[required]");		
	}else{
		$('#n_documento_mask').removeClass("validate[required]");
	}
	
	if ((($('#c_tipo_documento').val() == '') && $('#d_c_tipo_documento').val() == '') && $('#n_documento_mask').val() != ''){
		$('#c_tipo_documento').addClass("validate[required]");	
		$('#d_c_tipo_documento').addClass("validate[required]");		
	}else{
			if (($('#c_tipo_documento').val() == '') && $('#d_c_tipo_documento').val() != ''){
				$('#c_tipo_documento').addClass("validate[required]");
	
			}else{
				$('#c_tipo_documento').removeClass("validate[required]");
			}
			
			if (($('#c_tipo_documento').val() != '') && $('#d_c_tipo_documento').val() == ''){
				$('#d_c_tipo_documento').addClass("validate[required]");		
			}else{
				$('#d_c_tipo_documento').removeClass("validate[required]");
			}
	}
	
	if((($('#c_tipo_documento').val() != '') && $('#d_c_tipo_documento').val() != '') && $('#n_documento_mask').val() != ''){
		$('#n_cuit_mask').removeClass("validate[required,custom[validaCuit]]");
	}else{
		$('#n_cuit_mask').addClass("validate[required,custom[validaCuit]]");
	}


	
};


function limpiar_busqueda(){
				$('#n_cuit').val(null); 	
				$('#n_cuit_mask').val(null); 	
				$('#d_denominacion').val(null); 	
				$('#c_tipo_documento').val(null); 	
				$('#d_c_tipo_documento').val(null); 	
				$('#n_documento').val(null); 	
				$('#n_documento_mask').val(null); 	
				$('#id_contribuyente_ori').val(null); 
				$('#id_contribuyente_tmp').val(null); 
				
				$('#n_cuit_mask').attr('readonly',false);	
				$('#n_cuit_mask').prop('disabled',false);	
				$('#d_denominacion').attr('readonly',false);		
				$('#c_tipo_documento').attr('readonly',false);		
				$('#n_documento_mask').attr('readonly',false);
				$("#btn_buscar").prop('disabled', false);
				$("#lupa_c_tipo_documento").prop('disabled', false);
				$('#c_tipo_documento').prop('disabled',false);
				$('#d_c_tipo_documento').prop('disabled',false);
				$('#n_documento').prop('disabled',false);
				$('#n_documento_mask').prop('disabled',false);
				$('#general').hide();	
				$("#d_denominacion").autocomplete(
						{	source:'../modulos/cuenta_corriente/autocompleteG?oper=1',
							minLength:0,
							select: function(event, ui) {
						        $('#n_cuit').val(limpia_cuit(ui.item.cuit));
						        $('#n_cuit_mask').val(ui.item.cuit);
						        $(this).val(ui.item.razon_social);
						        $("#id_contribuyente_ori").val(ui.item.id_contribuyente);		       
						        return false; // Prevent the widget from inserting the value.
				   			} 		 	
						}
				);
}

////////////////////////////////////////////////////////////////////////////////////////////////



/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////// FUNCIONES  DE FECHAS/////////////////////////////////

function fechas_domicilio(formid){
	// Enlazamos los DatePickers
	$("#f_vig_desde",formid).datepicker("option","onClose", function (selectedDate,obj) {
			$("#f_vig_hasta",formid).datepicker("option", "minDate", selectedDate);
		}
	);
	$("#f_vig_hasta",formid).datepicker("option","onClose",function (selectedDate,obj) {
			$("#f_vig_desde",formid).datepicker("option", "maxDate", selectedDate);
		}
	);
}

function fechas_contacto(formid){
	// Enlazamos los DatePickers
	$("#f_vig_desde",formid).datepicker("option","onClose", function (selectedDate,obj) {
			$("#f_vig_hasta",formid).datepicker("option", "minDate", selectedDate);
		}
	);
	$("#f_vig_hasta",formid).datepicker("option","onClose",function (selectedDate,obj) {
			$("#f_vig_desde",formid).datepicker("option", "maxDate", selectedDate);
		}
	);
}


 ///////////////////////////permite escribir solo numeros///////////////////////////////////////////////
function solo_numero(obj){
	obj.keydown(function(event) {
	    if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 27 ||
	        (event.keyCode == 65 && event.ctrlKey === true) || (event.keyCode >= 35 && event.keyCode <= 39)
	        || (event.ctrlKey === true && (event.keyCode  == 67 || event.keyCode  == 86 || event.keyCode  == 88 || event.keyCode  == 90)) ) {
	            return;
	     }
	     else {
	        if ((event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105) ) {
	                event.preventDefault();
	        }
	     }
	 });
}
////////////////////////////////////// cuit ////////////////////////////////////
	

function limpia_cuit(cuit){
	var cuit_sin_guiones;
	var valida_cuit_completo = cuit.indexOf('_');
	if(valida_cuit_completo == -1 && cuit != ''){
		var aux = cuit.split('-');
		cuit_sin_guiones = aux[0]+aux[1]+aux[2];
	}
	return cuit_sin_guiones;
}

function limpia_dni(dni){
	var result;
	if (dni != null){
		result=dni.replace('.','').replace('.','').replace('.','');
		return result;
	}else{
		return null;
	}
}
