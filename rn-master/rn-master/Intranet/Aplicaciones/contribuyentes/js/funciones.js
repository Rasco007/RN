function existe_contribuyente(p_cuit,p_t_doc,p_n_doc){
	var result;
	
	$.ajax({
		type:'POST',
		url: "contribuyentes/ajax_contribuyente.php", 	
		data: {tipo:"existe_contribuyente", cuit:p_cuit, t_doc:p_t_doc, n_doc:p_n_doc},
		dataType: 'json',
		async:false,
		success: function(ret) {
			if( ret.error != 'OK' ){
				mostrar_error(ret.error);
				result = 'error';
			}else{
				if (ret.id_contribuyente != -1){
					$('#n_cuit').val(ret.n_cuit); 	
					$('#d_denominacion').val(ret.d_denominacion);
					$('#c_tipo_documento').val(ret.c_tipo_documento);
					$('#d_c_tipo_documento').val(ret.d_c_tipo_documento);
					$('#n_documento').val(ret.n_documento);
					$('#id_contribuyente').val(ret.id_contribuyente);
					
					result=ret.id_contribuyente;
				}else{
					$('#id_contribuyente').val(-1); 
					result=-1;
				}
			}
			$('#frm_busqueda input').attr('readonly',true);
		}
	});
	
	return result;
}

function existe_contribuyente_tmp(p_cuit,p_t_doc,p_n_doc){
	var result;
	
	$.ajax({
		type:'POST',
		url: "contribuyentes/ajax_contribuyente.php", 	
		data: {tipo:"existe_contribuyente_tmp", cuit:p_cuit, t_doc:p_t_doc, n_doc:p_n_doc},
		dataType: 'json',
		async:false,
		success: function(ret) {
			if( ret.error != 'OK' ){
				mostrar_error(ret.error);
				result = 'error';
			}else{
				if (ret.id_contribuyente != -1){
					$('#n_cuit').val(ret.n_cuit); 	
					$('#d_denominacion').val(ret.d_denominacion); 	
					$('#c_tipo_documento').val(ret.c_tipo_documento); 	
					$('#d_c_tipo_documento').val(ret.d_c_tipo_documento); 	
					$('#n_documento').val(ret.n_documento); 	
					$('#id_contribuyente_tmp','#frm_busqueda').val(ret.id_contribuyente); 

					result=ret.id_contribuyente;
				}else{
					$('#id_contribuyente_tmp','#frm_busqueda').val(-1); 
					result=-1;
				}
				$('#frm_busqueda input').attr('readonly',true);
			}
		}
	});
	
	return result;
}

function fun_btn_guardar_denominacion(){
	$.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
        	"oper": 'edit',
        	"id_contribuyente": obtener_id_contribuyente(),
        	"n_cuit": limpia_cuit($("#n_cuit","#frm_busqueda").val()),
        	"c_tipo_documento": $("#c_tipo_documento","#frm_busqueda").val(),
        	"n_documento": limpia_dni($("#n_documento","#frm_busqueda").val()),
        	"d_denominacion": $("#d_denominacion_new","#frm_denominacion").val(),
            "c_categoria": $("#cod_categoria","#frm_datos_contrib").val(),
            "n_tabla_categoria": 45,
            "m_persona": $("#m_persona","#frm_datos_contrib").val(),
            "m_expediente": 'N',
            "f_vig_desde": $("#f_vig_desde","#frm_datos_contrib").val(),
            "c_sistema": $("#c_sistema","#frm_datos_contrib").val(),
            "n_tabla_sistema": 95,
        	"id_menu":10865,
        	"n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
            	$("#modal_modif_deno").modal('hide');
            	$("#d_denominacion","#frm_busqueda").val($("#d_denominacion_new","#frm_denominacion").val());
            	mostrar_confirmacion('Se modificó la denominación correctamente.');
            }else{
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}

function obtener_id_contribuyente(){
	var v_id_contribuyente;
	if(m_tmp == 'N'){
		v_id_contribuyente = $("#id_contribuyente",'#frm_busqueda').val();
	}else{
		v_id_contribuyente = $("#id_contribuyente_tmp",'#frm_busqueda').val();
	}
	return v_id_contribuyente;
}

function fun_acepta_nuevo_contrib() {
	$.ajax({
		type:'POST',
		url: "contribuyentes/alta_contribuyente.php", 	
		data: {id_contribuyente:-1, nuevo_contrib:"S",
			p_tipo_persona:p_tipo_persona, p_sexo:p_sexo},
		dataType: 'json',
		success: function(ret) {
			m_tmp = 'S';
			$('#general').remove();
			$('#main').append(ret);
			v_es_nuevo = true;
			mostrar_solapas('_tmp');
			$('#bt_next').show();
		}
	});
}

function n_cuit_focusout(){
	if ($('#general').length) {
		id_contribuyente = null;
	}
	if ($('#n_cuit',"#frm_busqueda").val() && $('#n_cuit',"#frm_busqueda").val().length == 13){
		$('#main').procOverlay({visible:true});
		$.ajax({
			url: "contribuyentes/autocomplete.php",
			type:"POST",
			data:{ p_oper:'cuit', filtro: limpia_cuit($('#n_cuit',"#frm_busqueda").val()), abm: m_abm},
			success: function(response){
				$('#main').procOverlay({visible:false});
				res = JSON.parse(response);
				if (res){
					$("#d_denominacion","#frm_busqueda").val(res['DENOMINACION']);
					$("#id_contribuyente","#frm_busqueda").val(res['ID_CONTRIBUYENTE']);
					$("#id_contribuyente_tmp","#frm_busqueda",'#frm_busqueda').val(res['ID_CONTRIBUYENTE_TMP']);
					$("#c_tipo_documento","#frm_busqueda").val(res['C_TIPO_DOCUMENTO']);
					$("#d_c_tipo_documento","#frm_busqueda").val(res['D_C_TIPO_DOCUMENTO']);
					$("#n_documento","#frm_busqueda").val(res['N_DOCUMENTO']);
					if(p_consulta == 'S'){
						$("#btn_continuar_abm").click();
					}
				}else{
					if(p_sintributo == 'N'){
						$("#d_denominacion, #id_contribuyente, #id_contribuyente_tmp",'#frm_busqueda').val(null);
						$("#c_tipo_documento, #d_c_tipo_documento, #n_documento","#frm_busqueda").val(null);
					}
				}
			}
		});
	}else{
		if(p_sintributo == 'N'){
			$("#n_cuit,#d_denominacion, #id_contribuyente, #id_contribuyente_tmp",'#frm_busqueda').val(null);
			$("#c_tipo_documento, #d_c_tipo_documento, #n_documento","#frm_busqueda").val(null);
		}
	}
}

function mostrar_solapas(tmp){
	// normal: ''; temporal: '_tmp';
	crea_campos();
	
	lupa_categoria(v_lista_categorias);
	lupa_sistema(v_lista_sistema);
	lupa_nacionalidad(v_lista_nacionalidad);	
	lupa_est_civil(v_lista_estado_civil);
	lupa_empresa(v_lista_empresa);
	lupa_forma_juridica(v_lista_forma_jurica);
	
	setearTipoPersona();
	
	$('#m_persona').change(function(){
		if($('#m_persona').val()=='J'){
			$('#c_tipo_documento').prop('disabled',true);
			$('#d_c_tipo_documento').prop('disabled',true);
			$('#n_documento').prop('disabled',true);
			$('#lupa_c_tipo_documento').prop('disabled',true);
		}else{
			$('#c_tipo_documento').prop('disabled',false);
			$('#d_c_tipo_documento').prop('disabled',false);
			$('#n_documento').prop('disabled',false);
			$('#lupa_c_tipo_documento').prop('disabled',false);
		}
	});
	
	crea_grillas_principales(tmp);
	$(".selectpicker").selectpicker('refresh');

	if(p_modif_deno == 'S'){
		$("#btn_modif_deno").attr('disabled',false);
	}
	if(p_datos_generales == 'S'){
		$("#div_excepcion_mail").show();
		$('#c_excepcion').change(function(){
			if($(this).val()=='S'){
				$('#f_excepcion_mail').prop('disabled',false);
			}else{
				$('#f_excepcion_mail').prop('disabled',true);
			}
		});
	}
}

function setear_parametros_grillas(tmp){
 	setea_parametros('#grid_datos_domicilio'+tmp,{':id_contribuyente': $("#id_contribuyente"+tmp).val()},'S');
 	setea_parametros('#grid_datos_telefono'+tmp,{':id_contribuyente': $("#id_contribuyente"+tmp).val()},'S');
 	setea_parametros('#grid_datos_complementarios'+tmp,{':id_contribuyente': $("#id_contribuyente"+tmp).val()},'S');
 	if($('#m_persona').val()=='J'){
	 	setea_parametros('#grid_datos_responsables'+tmp,{':id_contribuyente': $("#id_contribuyente"+tmp).val()},'S');
	}
	if(p_datos_generales == 'N'){
 		setea_parametros('#grid_datos_tributos'+tmp,{':id_contribuyente': $("#id_contribuyente"+tmp).val()},'S');
	}
}

function setearTipoPersona(){
	v_tipo_persona = $("#m_persona").val();

	if(v_tipo_persona == 'F'){
		$('#li_p_juridica').hide();
	}else{
		$('#li_p_fisica').hide();
	}

	// var cuit_p_fisicas = ['20','23','24','27'];
	// var cuit_p_juridicas = ['30','33','34'];

	// if(cuit_p_fisicas.includes( $('#n_cuit').val().substr(0,2) )){
	// 	v_tipo_persona = 'F';
	// 	$('#li_p_juridica').hide();
	// }
	
	// if(cuit_p_juridicas.includes( $('#n_cuit').val().substr(0,2) )){
	// 	v_tipo_persona = 'J';
	// 	$('#li_p_fisica').hide();
	// }
}

function crea_campos(){
	if($('#id_contribuyente').val() == -1 && $('#id_contribuyente_tmp','#frm_busqueda').val()==-1){
		$("#f_vig_desde").datepicker("setDate", new Date());
	}
	
	$('#f_nacimiento').datepicker({
		dateFormat:'dd/mm/yy', 
		changeMonth:true, 
		changeYear:true, 
		yearRange: "-100:+100" ,
		dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'], 
		monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']}
	);
}

function lupa_categoria(lista){
	$("#lupa_c_categoria").lupa_generica({
		id_lista:v_lista_categorias,
		titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_dato',width:150},
	 		{index:'d_dato',width:350}],
		caption:'Categorías',
		sortname:'d_dato',
		sortorder:'asc',
		keyNav:true,
		campos:{c_dato:'cod_categoria',d_dato:'d_c_categoria'},
		searchCode:true,
		searchInput: '#cod_categoria',
		exactField: 'c_dato'
	});	
}

function lupa_sistema(lista){	
	$("#lupa_c_sistema").lupa_generica({
		id_lista:v_lista_sistema,
		titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_dato',width:150},
			{index:'d_dato',width:350}],
		caption:'Sistemas',
		sortname:'d_dato',
		sortorder:'asc',
		keyNav:true,
		campos:{c_dato:'c_sistema',d_dato:'d_c_sistema'},
		searchCode:true,
		searchInput: '#c_sistema',
		exactField: 'c_dato'
	});	
}

function lupa_nacionalidad(lista){
	$("#lupa_tipo_nacionalidad").lupa_generica({
		id_lista:v_lista_nacionalidad,
		titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_dato',width:150},
			{index:'d_dato',width:350}],
		caption:'Nacionalidades',
		sortname:'d_dato',
		sortorder:'asc',
		keyNav:true,
		campos:{c_dato:'c_nacionalidad',d_dato:'d_tipo_nacionalidad'},
		searchCode:true,
		searchInput: '#c_nacionalidad',
		exactField: 'c_dato'
	});	
}

function lupa_est_civil(lista){
	$("#lupa_tipo_estado_civil").lupa_generica({
		id_lista:v_lista_estado_civil,
		titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_dato',width:150},
			  {index:'d_dato',width:350}],
		caption:'Estados Civiles',
		sortname:'d_dato',
		sortorder:'asc',
		keyNav:true,
		campos:{c_dato:'c_estado_civil',d_dato:'d_tipo_estado_civil'},
		searchCode:true,
		searchInput: '#c_estado_civil',
		exactField: 'c_dato'
	});	
}

function lupa_empresa(lista){
	$("#lupa_tipo_empresa").lupa_generica({
		id_lista:v_lista_empresa,
		titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_dato',width:150},
			  {index:'d_dato',width:350}],
		caption:'Tipos de Empresa',
		sortname:'d_dato',
		sortorder:'asc',
		keyNav:true,
		campos:{c_dato:'c_tipo_empresa',d_dato:'d_tipo_empresa'},
		searchCode:true,
		searchInput: '#c_tipo_empresa',
		exactField: 'c_dato'
	});	
}

function lupa_forma_juridica(lista){
	$("#lupa_tipo_forma_juridica").lupa_generica({
		id_lista:v_lista_forma_jurica,
		titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_dato',width:150},
			{index:'d_dato',width:350}],
		caption:'Formas Jurídicas',
		sortname:'d_dato',
		sortorder:'asc',
		keyNav:true,
		campos:{c_dato:'c_forma_juridica',d_dato:'d_tipo_forma_juridica'},
		searchCode:true,
		searchInput: '#c_forma_juridica',
		foco:'#sucursales',
		exactField: 'c_dato'
	});
}

function lupas_domicilio(formid, tipo_form){
	$('#d_tipo_domicilio',formid).lupa_generica({
		titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_dato',width:150},
			{index:'d_dato',width:350}],
		caption:'Tipo de Domicilio',
		sortname:"c_dato",
		sortorder:'asc',
		campos:{c_dato:'c_tipo_domicilio',d_dato:'d_tipo_domicilio'},
		keyNav:true,
		foco:'#d_provincia',
		onClose: function(){
			var id_contribuyente = $('#id_contribuyente',formid).val();
			var f_vig_desde = $('#f_vig_desde',formid).val();
			var c_tipo_dom = $('#c_tipo_domicilio',formid).val();
			var d_tipo_dom = $('#d_tipo_domicilio',formid).val();
			var id_g = $('#id_g',formid).val();
			$("#FrmGrid_grid_datos_domicilio"+tipo_form+" tr td input").val(null);
			$('#id_contribuyente',formid).val(id_contribuyente);
			$('#f_vig_desde',formid).val(f_vig_desde);
			$('#c_tipo_domicilio',formid).val(c_tipo_dom);
			$('#d_tipo_domicilio',formid).val(d_tipo_dom);
			$('#id_g',formid).val(id_g);
			habilita_n_oficina(formid);
		}
	});

	$('#d_provincia',formid).lupa_generica({
		titulos:['Código','Descripción'],
		grid:[{index:'c_codigo',width:150},
			{index:'d_descrip',width:350}],
		caption:'Provincia',
		sortname:'c_codigo',
		sortorder:'asc',
		filtros:['null'],
		campos:{c_codigo:'c_provincia',d_descrip:'d_provincia'},
		keyNav:true,
		foco:'#d_departamento', 
		onClose:function(){
			$('#c_departamento,#d_departamento,#c_localidad,#d_localidad,#c_postal,#n_oficina').val(null);
		}
	});
		
	$('#d_localidad',formid).lupa_generica({
		titulos:['Cód. Localidad','Descripción Localidad','Código Postal',
			'Cód. Departamento','Descripción Departamento','Oficina'],
		grid:[{index:'c_localidad',width:120},
			{index:'d_descrip',width:350},
			{index:'c_postal',width:100},
			{index:'c_departamento',width:120},
			{index:'d_departamento',width:350},
			{index:'n_oficina',width:100}],
		caption:'Localidad',
		sortname:'c_localidad',
		sortorder:'asc',
		filtros:['#c_provincia',"#c_tipo_domicilio"],
		filtrosTitulos:['Provincia',"Tipo Domicilio"],
		exactField:'c_localidad',
		campos:{c_localidad:'c_localidad',d_descrip:'d_localidad',c_postal:'c_postal',
			c_departamento:'c_departamento',d_departamento:'d_departamento',n_oficina:'n_oficina'},
		keyNav:true,
		onClose:function(){
			habilita_n_oficina(formid);
		}
	});
	
	$('#d_bepo',formid).lupa_generica({
		titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_codigo',width:150},
			{index:'d_descrip',width:350}],
		caption:'Barrio',
		sortname:'c_codigo',
		sortorder:'asc',
		campos:{c_codigo:'c_bepo',d_descrip:'d_bepo'},
		keyNav:true
	});
	
	$('#n_oficina',formid).lupa_generica({
		titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_dato',width:150},
			{index:'d_dato',width:350}],
		caption:'Oficinas',
		sortname:'c_dato',
		sortorder:'asc',
		exactField:'c_dato',
		campos:{c_dato:'n_oficina'},
		keyNav:true
	});
}

function habilita_n_oficina(formid){
	if($("#c_tipo_domicilio",formid).val()=='1'){
		$("#tr_n_oficina",formid).show();
		$("#n_oficina",formid).addClass('validate[required]');
		if($("#c_provincia",formid).val()=='R'){
			$("#n_oficina_lupa",formid).hide();
		}else{
			$("#n_oficina_lupa",formid).show();
		}
	}else{
		$("#tr_n_oficina",formid).hide();
		$("#n_oficina",formid).val(null);
		$("#n_oficina",formid).removeClass('validate[required]');
	}
}

function lupa_telefono(formid){
	$('#d_tipo_telefono',formid).lupa_generica({
		titulos:['C&oacute;digo','Dato'],
		grid:[{index:'c_dato',width:100},
			{index:'d_dato',width:350}],
		caption:'Tipo de Teléfono',
		sortname:'c_dato',
		sortorder:'asc',
		campos:{c_dato:'c_tipo_telefono',d_dato:'d_tipo_telefono'},
		keyNav:true
	});	
}

function lupa_datos_complementarios(formid){
	$("#d_dato, #d_dato_lupa", formid).lupa_generica({
        id_lista:v_lista_datos_comp,
        titulos:['Código','Descripción','Query'],
        grid:[  {index:'c_dato',width:100},
            {index:'d_dato',width:450},
            {index:'d_query',width:250,hidden:true}],
        caption:'Datos',
        sortname:'c_dato',
        sortorder:'asc',
        exactField: 'c_dato',
        campos:{c_dato:'c_dato',d_dato:'d_dato', d_query:'d_query'},
        keyNav:true,
        foco:"#d_label",
        onClose:function(){
        	campo_d_valor(formid);
        }
	});
}

function campo_d_valor(formid){
	$.ajax({
		url: 'contribuyentes/ajax_contribuyente.php',
		type:"POST",
		data:{tipo: "tipo_d_valor", d_dato1: $("#d_query",formid).val()},
		success: function(data){
			ret = eval('('+data+')');
			if(ret){
            	document.getElementById("tr_d_valor").innerHTML =
            		'<td class="CaptionTD">'+
            			'<label for="d_valor">Valor (*)</label>'+
        			'</td>'+
        			'<td class="DataTD">&nbsp;'+
        				ret.campo+
					'</td>'+
				'</tr>';
				
				$(".selectpicker").selectpicker('refresh');
			}
		}
	});
}

function lupas_per_juridica(formid,tmp){
	$('#d_tipo_documento',formid).lupa_generica({
		titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_dato',width:100},
			{index:'d_dato',width:350}],
		caption:'Tipos de Documento',
		sortname:'c_dato',
		sortorder:'asc',
		campos:{c_dato:'FrmGrid_grid_datos_responsables'+tmp+' #c_tipo_documento',
			d_dato:'FrmGrid_grid_datos_responsables'+tmp+' #d_tipo_documento'},
		keyNav:true,
		exactField: 'c_dato'
	});

    $('#d_tipo_responsable',formid).lupa_generica({
		titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_codigo',width:100},
			{index:'d_descrip',width:350}],
		caption:'Tipo de Responsable',
		sortname:'d_descrip',
		sortorder:'asc',
		campos:{c_codigo:'c_tipo_responsable',d_descrip:'d_tipo_responsable'},
		keyNav:true,
		onClose:function(){
			if ($("#c_tipo_responsable",formid).val() == '3' && $("#n_cuit",formid).val() != ""){ 
				$("#c_tipo_documento",formid).val('0');
				$("#d_tipo_documento",formid).val('CUIT');
				$("#n_documento",formid).val(limpia_cuit($("#n_cuit",formid).val()));
			}
		}
    });

    $('#d_cargo',formid).lupa_generica({
		titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_codigo',width:100},
			{index:'d_descrip',width:350}],
		caption:'Cargo',
		sortname:'d_descrip',
		sortorder:'asc',
		campos:{c_codigo:'c_cargo',d_descrip:'d_cargo'},
		keyNav:true
    });
    
    $('#d_caracter_firma',formid).lupa_generica({
		titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_codigo',width:100},
			{index:'d_descrip',width:350}],
		caption:'Tipo de Caracter de Firma',
		sortname:'d_descrip',
		sortorder:'asc',
		campos:{c_codigo:'c_caracter_firma',d_descrip:'d_caracter_firma'},
		keyNav:true
    });
}

function lupas_tributos(formid){
	$('#d_tributo',formid).lupa_generica({
		titulos:['Tributo','Descripción','Tipo Imponible','Descripción'],
		grid:[{index:'c_tributo',width:100},
			{index:'d_descrip',width:350},
			{index:'c_tipo_imponible',width:100},
			{index:'d_tipo_imponible',width:350}],
		caption:'Tributos',
		sortname:'c_tributo',
		sortorder:'asc',
		exactField:'c_tributo',
		filtros:[p_objeto_viejo],
		campos:{c_tributo:'c_tributo',d_descrip:'d_tributo',
			c_tipo_imponible:'c_tipo_imponible',d_tipo_imponible:'d_tipo_imponible'},
		keyNav:true,
		onClose:function(){
			$("#d_objeto_hecho").val('');
			if ($("#c_tributo",formid).val() == 10 || $("#c_tributo",formid).val() == 30 || $("#c_tributo",formid).val() == 40){
				mostrar_campos_regimen(true,formid);
				if($("#c_tributo",formid).val() == 10){
					$("#c_regimen",formid).val('G');
					$("#c_tipo_actividad",formid).val('G');
					$("#c_categoria",formid).val('G');
					$("#c_categoria",formid).attr('disabled',true);
					$("#c_categoria_lupa",formid).hide();
					mostrar_campos_com_act(true,formid);
					$("#d_actividad_ppal",formid).lupa_generica({
						titulos:['Actividad','Descripción','Nomenclador','Grupo'],
						grid:[{index:'c_actividad',width:100},
							{index:'d_actividad',width:350},
							{index:'id_nomenclador',width:100},
							{index:'c_grupo',width:100,hidden:true}],
						caption:'Actividades',
						sortname:'c_actividad',
						sortorder:'asc',
						exactField:'c_actividad',
						campos:{c_actividad:'c_actividad_ppal',d_actividad:'d_actividad_ppal',
							id_nomenclador:'id_nomenclador_ppal',c_grupo:'c_grupo'},
						keyNav:true
				    });
				    mostrar_campos_unidades(true,formid);
					$("#d_tipo_unidad",formid).lupa_generica({
						titulos:['Código','Descripción'],
						grid:[{index:'c_dato',width:100},
							{index:'d_dato',width:350}],
						caption:'Tipo de Unidad',
						sortname:'c_dato',
						sortorder:'asc',
						exactField:'c_dato',
						campos:{c_dato:'c_tipo_unidad',d_dato:'d_tipo_unidad'},
						keyNav:true
				    });
				}
				if($("#c_tributo",formid).val() == 30){
					$("#c_regimen",formid).val('AR');
					$("#c_tipo_actividad",formid).val('AR');
					$("#c_categoria",formid).val('AR');
					$("#c_categoria",formid).attr('disabled',true);
					$("#c_categoria_lupa",formid).hide();
				}
				if($("#c_tributo",formid).val() == 40){
					$("#c_regimen",formid).val('AP');
					$("#c_tipo_actividad",formid).val('AP');
					$("#c_categoria",formid).val('AP');
					$("#c_categoria",formid).attr('disabled',true);
					$("#c_categoria_lupa",formid).hide();
				}

				$.ajax({
					type:'POST',
					url: "contribuyentes/ajax_contribuyente.php", 	
					data: {tipo:"datos_regimen",
						oper:'descripcion',
						c_regimen:$("#c_regimen",formid).val(),
						c_tipo_actividad:$("#c_tipo_actividad",formid).val()},
					dataType: 'json',
					success: function(ret) {
						$('#d_regimen',formid).val(ret.d_regimen);
						$('#d_tipo_actividad',formid).val(ret.d_tipo_actividad);
						lupas_regimen(formid);
						if($("#c_tributo",formid).val() == 10){
							$.ajax({
								type:'POST',
								url: "contribuyentes/ajax_contribuyente.php", 	
								data: {tipo:"tiene_dom_comercial",
									id_contribuyente: obtener_id_contribuyente()
								},
								dataType: 'json',
								success: function(ret) {
									if( ret.resultado == 0){
										mostrar_validacion('Primero debe ingresar un domicilio comercial para este contribuyente.');
									}
								}
							});
						}
					}
				});
			}else{
				if ($("#c_tributo",formid).val() == 32){
					mostrar_campos_regimen(true,formid);
					lupas_regimen(formid);
					$("#c_categoria",formid).attr('disabled',false);
					$("#c_categoria_lupa",formid).show();
				}else{
					mostrar_campos_regimen(false,formid);
				}
			}

			if ($("#c_tributo",formid).val() == 150){
				mostrar_campos_regimen(true,formid);
				lupas_regimen(formid);
			}

			if($("#c_tributo",formid).val() == 30 || $("#c_tributo",formid).val() == 40){
				mostrar_campos_agente(true);
				lupas_agente(formid);
				if($("#c_tributo",formid).val() == 40){
					$("#c_organismo",formid).val('0');
					$("#d_organismo",formid).val("EL CORRESPONDIENTE A LA CUIT");
					$("#d_organismo",formid).attr('disabled',false);
					$("#d_organismo_lupa",formid).hide();
					$("#denominacion",formid).attr('readonly',true);
				}else{
					var v_id_contribuyente = obtener_id_contribuyente();
					$.ajax({
						type:'POST',
						url: "contribuyentes/ajax_contribuyente.php", 	
						data: {tipo:"permite_vs",
							m_persona: $('#m_persona').val(),
							m_tmp: m_tmp,
							id_contribuyente: v_id_contribuyente,
							c_tributo: $("#c_tributo",formid).val()},
						dataType: 'json',
						success: function(ret) {
							if(ret.permite_vs == 'SI'){
								$("#d_organismo_lupa",formid).show();
								$("#denominacion",formid).attr('readonly',false);
							}else{
								$("#c_organismo",formid).val('0');
								$("#d_organismo",formid).val("EL CORRESPONDIENTE A LA CUIT");
								$("#d_organismo",formid).attr('disabled',false);
								$("#d_organismo_lupa",formid).hide();
								$("#denominacion",formid).attr('readonly',true);
							}
						}
					});
				}
			}else{
				mostrar_campos_agente(false);
			}

			if($("#c_tributo",formid).val() == 20){
				$("#tr_c_jur_sede").show();
				$('#c_jur_sede',formid).lupa_generica({
					titulos:['Jurisdicción','Descripción'],
					grid:[{index:'c_dato',width:100},
						{index:'d_dato',width:350}],
					caption:'Jurisdicciones',
					sortname:'c_dato',
					sortorder:'asc',
					exactField:'c_dato',
					campos:{c_dato:'c_jur_sede',d_dato:'d_motivo_alta'},
					keyNav:true
			    });
			}else{
				$("#tr_c_jur_sede").hide();
			}

			if($("#c_tributo",formid).val() == 60 || $("#c_tributo",formid).val() == 50 || $("#c_tributo",formid).val() == 90){
				$("#c_motivo_alta").val('');
				$("#d_motivo_alta").val('');
			    $("#d_objeto_hecho_lupa").show();
			}else{
				$("#c_motivo_alta").val('2');
				$("#d_motivo_alta").val('INSCRIPCION');
				if (p_objeto_viejo != 'S'){
			    	$("#d_objeto_hecho_lupa").hide();
			    }else{
			    	$("#d_objeto_hecho_lupa").show();
			        
			        // En el caso de SIRCREB, AG. RECAUDACION IIBB y AG. RET. SELLOS se sugiere la cuit como nro. de inscripcion.
			        if($("#c_tributo",formid).val() == 31 || $("#c_tributo",formid).val() == 42){
			            $("#d_objeto_hecho",formid).val(limpia_cuit($("#n_cuit","#frm_busqueda").val()));
			        }
			    }
			}

			setear_mascara_objeto(formid);
		}
    });

	$('#d_objeto_hecho',formid).lupa_generica({
		titulos:['Objeto'],
		grid:[{index:'d_objeto_hecho',width:100}],
		caption:'Objetos',
		sortname:'d_objeto_hecho',
		sortorder:'asc',
		exactField:'d_objeto_hecho',
		filtros:["#c_tributo",v_cuit,v_documento,v_tipo_documento],
		filtrosTitulos:["Tributo","CUIT","Documento","Tipo Documento"],
		filtrosNulos:[false,false,true,true],
		campos:{d_objeto_hecho:'d_objeto_hecho'},
		keyNav:true,
		onClose: function(){
			if($("#c_tributo",formid).val() == 20){
			   $('#c_jur_sede',formid).val($('#d_objeto_hecho',formid).val().substr(1,3));
			}
		}
    });

    $('#d_motivo_alta',formid).lupa_generica({
		titulos:['Tributo','Descripción'],
		grid:[{index:'c_dato',width:100},
			{index:'d_dato',width:350}],
		caption:'Motivos Alta',
		sortname:'c_dato',
		sortorder:'asc',
		exactField:'c_dato',
		filtros:["#c_tributo"],
		filtrosTitulos:["Tributo"],
		campos:{c_dato:'c_motivo_alta',d_dato:'d_motivo_alta'},
		keyNav:true
    });
}

function lupas_regimen(formid){
	$('#d_regimen',formid).lupa_generica({
		titulos:['Régimen','Descripción'],
		grid:[{index:'c_dato',width:100},
			{index:'d_dato',width:350}],
		caption:'Regimenes',
		sortname:'c_dato',
		sortorder:'asc',
		exactField:'c_dato',
		filtros:["#c_tributo"],
		filtrosTitulos:["Tributo"],
		campos:{c_dato:'c_regimen',d_dato:'d_regimen'},
		keyNav:true,
		onClose:function(){
			if ($("#c_regimen",formid).val() == 'SRR') {
				$("#c_tipo_actividad",formid).val('SRR');
				$("#d_tipo_actividad",formid).val('SIRCAR AG. RET');
				$("#c_categoria",formid).val('SRR');
			}
			if ($("#c_regimen",formid).val() == 'SRP') {
				$("#c_tipo_actividad",formid).val('SRP');
				$("#d_tipo_actividad",formid).val('SIRCAR AG. PER');
				$("#c_categoria",formid).val('SRP');
			}
			if ($("#c_regimen",formid).val() == 'AR') {
				$("#c_tipo_actividad",formid).val('AR');
				$("#d_tipo_actividad",formid).val('AG. RETENCION');
				$("#c_categoria",formid).val('AR');
			}
			if ($("#c_regimen",formid).val() == 'AP') {
				$("#c_tipo_actividad",formid).val('AP');
				$("#d_tipo_actividad",formid).val('AG. PERCEPCION');
				$("#c_categoria",formid).val('AP');
			}
		}
    });

    $('#d_tipo_actividad',formid).lupa_generica({
		titulos:['Actividad','Descripción'],
		grid:[{index:'c_dato',width:100},
			{index:'d_dato',width:350}],
		caption:'Actividades',
		sortname:'c_dato',
		sortorder:'asc',
		exactField:'c_dato',
		filtros:["#c_tributo","#c_regimen"],
		filtrosTitulos:["Tributo","Régimen"],
		campos:{c_dato:'c_tipo_actividad',d_dato:'d_tipo_actividad'},
		keyNav:true
    });

    $('#c_categoria',formid).lupa_generica({
		titulos:['Categoría'],
		grid:[{index:'c_categoria',width:100}],
		caption:'Categorías',
		sortname:'c_categoria',
		sortorder:'asc',
		exactField:'c_categoria',
		filtros:["#c_regimen","#c_tipo_actividad"],
		filtrosTitulos:["Régimen","Tipo de Actividad"],
		campos:{c_categoria:'c_categoria'},
		keyNav:true
    });
}

function lupas_agente(formid){
	$('#d_organismo',formid).lupa_generica({
		titulos:['Organismo','Descripción'],
		grid:[{index:'c_dato',width:100},
			{index:'d_dato',width:350}],
		caption:'Organismos',
		sortname:'c_dato',
		sortorder:'asc',
		exactField:'c_dato',
		campos:{c_dato:'c_organismo',d_dato:'d_organismo'},
		keyNav:true,
		onClose:function(){
			if($("#c_organismo",formid).val() == '0'){
				$("#denominacion",formid).attr('readonly',true);
			}else{
				$("#denominacion",formid).attr('readonly',false);
			}
		}
    });
}

function fun_delete_email(n_email){
	var id = $("#grid_datos_telefono").getGridParam('selrow');
	$.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
    	data:{      
        	"p_id_contribuyente":obtener_id_contribuyente(),
        	"p_c_tipo_telefono": $("#grid_datos_telefono").getCell(id,'c_tipo_telefono'),
        	"p_n_email": n_email,
        	"id_menu":10865,
        	"n_orden":11
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
            	$("#grid_datos_telefono").trigger('reloadGrid');
            	mostrar_confirmacion('Se ha eliminado el email'+n_email+' correctamente.');
            }else{
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}

function setear_mascara_objeto(formid){
	if($("#c_tributo",formid).val() == 30 || $("#c_tributo",formid).val() == 32 || $("#c_tributo",formid).val() == 40){
		$("#d_objeto_hecho",formid).mask("99999999-9");
	}
	if($("#c_tributo",formid).val() == 10){
		$("#d_objeto_hecho",formid).mask("9999999-9");
	}
	if($("#c_tributo",formid).val() == 31 || $("#c_tributo",formid).val() == 42){
		$("#d_objeto_hecho",formid).mask("99-99999999-9");
	}
	if($("#c_tributo",formid).val()!=30 && $("#c_tributo",formid).val()!=32 && $("#c_tributo",formid).val()!=40 &&
	$("#c_tributo",formid).val()!=10 && $("#c_tributo",formid).val()!=31 && $("#c_tributo",formid).val()!=42){
		$("#d_objeto_hecho",formid).unmask();
	}
}

function mostrar_campos_agente(opcion,formid){
	$("#d_organismo, #denominacion, #act_desarrolla, #act_retiene,"+
		"#anexo_ppal, #anexo_1, #anexo_2, #contacto_operativo, #contacto_administrativo",formid).val('');
	if(opcion){
		$("#tr_datos_agente, #tr_d_organismo, #tr_denominacion, #tr_act_desarrolla, #tr_act_retiene,"+
			"#tr_anexo_ppal, #tr_anexo_1, #tr_anexo_2, #tr_contacto_operativo, #tr_contacto_administrativo",formid).show();
		$("#d_organismo, #anexo_ppal, #contacto_operativo, #contacto_administrativo",formid).addClass('validate[required]');
		if($("#c_tributo",formid).val() == 40){
			$("#anexo_ppal",formid).val('07');
			$("#anexo_ppal, #anexo_1, #anexo_2",formid).attr('disabled',true);
		}else{
			$("#anexo_ppal",formid).val('');
			$("#anexo_ppal, #anexo_1, #anexo_2",formid).attr('disabled',false);
		}
	}else{
		$("#tr_datos_agente, #tr_d_organismo, #tr_denominacion, #tr_act_desarrolla, #tr_act_retiene,"+
			"#tr_anexo_ppal, #tr_anexo_1, #tr_anexo_2, #tr_contacto_operativo, #tr_contacto_administrativo",formid).hide();
		$("#d_organismo, #anexo_ppal, #contacto_operativo, #contacto_administrativo",formid).removeClass('validate[required]');
	}
	$('.selectpicker').selectpicker('refresh');
}

function mostrar_campos_regimen(opcion,formid){
	if(opcion){
		$("#tr_datos_regimen, #tr_d_regimen, #tr_c_categoria, #tr_f_vig_desde_regimen, #tr_d_tipo_actividad",formid).show();
		$("#d_regimen, #c_categoria, #f_vig_desde_regimen, #d_tipo_actividad",formid).addClass('validate[required]');
	}else{
		$("#tr_datos_regimen, #tr_d_regimen, #tr_c_categoria, #tr_f_vig_desde_regimen, #tr_d_tipo_actividad",formid).hide();
		$("#d_regimen, #c_categoria, #f_vig_desde_regimen, #d_tipo_actividad",formid).removeClass('validate[required]');
	}
	$("#d_regimen, #c_categoria, #f_vig_desde_regimen, #d_tipo_actividad",formid).val('');
	$("#f_vig_desde_regimen",formid).attr('disabled',true);
}

function mostrar_campos_com_act(opcion,formid){
	if(opcion){
		$("#tr_datos_comercio_ppal, #tr_n_comercio_ppal, #tr_f_iniciacion_ppal, #tr_d_fantasia_ppal, #tr_n_telefono_ppal,"+
			"#tr_datos_actividad_ppal, #tr_d_actividad_ppal, #tr_f_inicio_act_ppal, #tr_id_nomenclador_ppal",formid).show();
		$("#n_comercio_ppal, #f_iniciacion_ppal, #d_fantasia_ppal, #n_telefono_ppal,"+
			"#c_actividad_ppal, #d_actividad_ppal, #f_inicio_act_ppal, #id_nomenclador_ppal",formid).addClass('validate[required]');
	}else{
		$("#tr_datos_comercio_ppal, #tr_n_comercio_ppal, #tr_f_iniciacion_ppal, #tr_d_fantasia_ppal, #tr_n_telefono_ppal,"+
			"#tr_datos_actividad_ppal, #tr_d_actividad_ppal, #tr_f_inicio_act_ppal, #tr_id_nomenclador_ppal",formid).hide();
		$("#n_comercio_ppal, #f_iniciacion_ppal, #d_fantasia_ppal, #n_telefono_ppal,"+
			"#c_actividad_ppal, #d_actividad_ppal, #f_inicio_act_ppal, #id_nomenclador_ppal",formid).removeClass('validate[required]');
	}
	$("#n_comercio_ppal, #f_iniciacion_ppal, #d_fantasia_ppal, #n_telefono_ppal,"+
		"#c_actividad_ppal, #d_actividad_ppal, #f_inicio_act_ppal, #id_nomenclador_ppal",formid).val('');
}

function mostrar_campos_unidades(opcion,formid){
	if(opcion){
		$("#tr_datos_unidades, #tr_d_tipo_unidad, #tr_n_unidades, #tr_f_vig_desde_uni",formid).show();
		$("#d_tipo_unidad, #n_unidades, #f_vig_desde_uni",formid).addClass('validate[required]');
	}else{
		$("#tr_datos_unidades, #tr_d_tipo_unidad, #tr_n_unidades, #tr_f_vig_desde_uni",formid).hide();
		$("#d_tipo_unidad, #n_unidades, #f_vig_desde_uni",formid).removeClass('validate[required]');
	}
	$("#tr_d_tipo_unidad, #tr_n_unidades, #tr_f_vig_desde_uni",formid).val('');
}

///////////////////////// BOTONES TAB TRIBUTOS ////////////////////////
function btn_generar_boleta() {
	$('#main').procOverlay({visible: true});
	var id = $('#grid_datos_tributos').getGridParam('selrow');
	$.ajax({
		type: 'POST',
		url: FUNCIONES_BASEPATH + 'maestro_abm.php',
		data: {
			"p_id_contribuyente": obtener_id_contribuyente(),
			"p_c_tributo": $("#grid_datos_tributos").getCell(id,'c_tributo'),
			"p_d_objeto_hecho": $("#grid_datos_tributos").getCell(id,'d_objeto_hecho'),
			"p_f_vig_desde": $("#grid_datos_tributos").getCell(id,'f_vig_desde'),
			"p_c_regimen": $("#grid_datos_tributos").getCell(id,'c_regimen'),
			"p_c_tipo_actividad": $("#grid_datos_tributos").getCell(id,'c_tipo_actividad'),
			"p_c_categoria": $("#grid_datos_tributos").getCell(id,'c_categoria'),
			"id_menu": 10865,
			"n_orden": 10
		},
		dataType: 'json',
		success: function(data) {
			if (data.resultado == 'OK') {
				llamar_report('RECAL012_IIBB',
					'p_id_sesion|' + data.p_id_sesion,
					'PDF');
			} else {
				mostrar_error(data.resultado);
			}
		}
	});
	$('#main').procOverlay({visible: false});
}

function btn_constancia(){
	$('#main').procOverlay({visible:true});
	llamar_report('CONTL_006',
        'p_id_contribuyente|'+obtener_id_contribuyente(),
        'PDF');
	$('#main').procOverlay({visible:false});
}

function btn_actividades(){
	var tmp = '';
	if(m_tmp == 'S'){
		tmp = '_tmp';
	}
	$('#main').procOverlay({visible:true});
	var id = $('#grid_datos_tributos'+tmp).getGridParam('selrow');
	if (id) {
		var tributo = $("#grid_datos_tributos"+tmp).getCell(id,'c_tributo');
		var tipo_imp = $("#grid_datos_tributos"+tmp).getCell(id,'c_tipo_imponible');
		var objeto = $("#grid_datos_tributos"+tmp).getCell(id,'d_objeto_hecho');

		var n_grid_actividades_cm;
		var n_grid_jurisdicciones;
		var n_grid_comercios;
		var n_grid_actividades_ibd;
		var n_grid_unidades;

		switch(tmp){
			case '_tmp':
				n_grid_actividades_cm = 17;
				n_grid_jurisdicciones = 18;
				n_grid_comercios = 19;
				n_grid_actividades_ibd = 20;
				n_grid_unidades = 23;
				break;
			default:
				n_grid_actividades_cm = 6;
				n_grid_jurisdicciones = 7;
				n_grid_comercios = 8;
				n_grid_actividades_ibd = 9;
				n_grid_unidades = 22;
				break;
		}

		if(tributo == '20'){
			datos_actividades_cm_grid = new GridParam({
		        id_menu: n_id_menu,
		        n_grid: n_grid_actividades_cm,
		        m_autoquery: 'S',
		        param: {':id_contribuyente': $("#id_contribuyente"+tmp).val(),
						':c_tributo': tributo,
						':c_tipo_imponible': tipo_imp,
						':d_objeto_hecho': objeto}
		    });

		    datos_jurisdicciones_grid = new GridParam({
		        id_menu: n_id_menu,
		        n_grid: n_grid_jurisdicciones,
		        m_autoquery: 'S',
		        param: {':id_contribuyente': $("#id_contribuyente"+tmp).val(),
						':c_tributo': tributo,
						':c_tipo_imponible': tipo_imp,
						':d_objeto_hecho': objeto}
		    });

			crea_grillas_act_jur(tmp);
			setea_parametros('#grid_datos_actividades_cm' + tmp, {
				':id_contribuyente': $("#id_contribuyente" + tmp).val(),
				':c_tributo': tributo,
				':c_tipo_imponible': tipo_imp,
				':d_objeto_hecho': objeto
			}, 'S');
			setea_parametros('#grid_datos_actividades_cm' + tmp, {
				':id_contribuyente': $("#id_contribuyente" + tmp).val(),
				':c_tributo': tributo,
				':c_tipo_imponible': tipo_imp,
				':d_objeto_hecho': objeto
			}, 'S');
			abrir_modal("#modal_actividades_cm");

		}else{
			datos_comercios_grid = new GridParam({
		        id_menu: n_id_menu,
		        n_grid: n_grid_comercios,
		        m_autoquery: 'S',
		        param: {':id_contribuyente': $("#id_contribuyente"+tmp).val(),
						':c_tributo': tributo,
						':c_tipo_imponible': tipo_imp,
						':d_objeto_hecho': objeto}
		    });

		    datos_actividades_idb_grid = new GridParam({
		        id_menu: n_id_menu,
		        n_grid: n_grid_actividades_ibd,
		        m_autoquery: 'S',
		        param: {':id_contribuyente': $("#id_contribuyente"+tmp).val(),
						':c_tributo': tributo,
						':c_tipo_imponible': tipo_imp,
						':d_objeto_hecho': objeto}
		    });

		    datos_uni_grid = new GridParam({
	            id_menu: n_id_menu,
	            n_grid: n_grid_unidades,
	            m_autoquery:'S',
	            param:{':p_id_contrib': $("#id_contribuyente"+tmp).val(),
	                ':p_c_timp': tipo_imp,
	                ':p_c_trib': tributo,
	                ':p_objeto': objeto}
	        });

			crea_grillas_com_act(tmp);
			setea_parametros('#grid_datos_comercios' + tmp, {
				':id_contribuyente': $("#id_contribuyente" + tmp).val(),
				':c_tributo': tributo,
				':c_tipo_imponible': tipo_imp,
				':d_objeto_hecho': objeto
			}, 'S');
			setea_parametros('#grid_datos_actividades_ibd' + tmp, {
				':id_contribuyente': $("#id_contribuyente" + tmp).val(),
				':c_tributo': tributo,
				':c_tipo_imponible': tipo_imp,
				':d_objeto_hecho': objeto
			}, 'S');
			setea_parametros('#grid_datos_unidades' + tmp, {
				':p_id_contrib': $("#id_contribuyente" + tmp).val(),
				':p_c_timp': tributo,
				':p_c_trib': tipo_imp,
				':p_objeto': objeto
			}, 'S');
			abrir_modal("#modal_actividades_ibd");
		}
	}else{
		mostrar_validacion('Debe seleccionar un registro de la grilla de tributos.');
	}
	$('#main').procOverlay({visible:false});
}

function btn_regimen(){
	var tmp = '';
	if(m_tmp == 'S'){
		tmp = '_tmp';
	}
	$('#main').procOverlay({visible:true});
	var id = $('#grid_datos_tributos'+tmp).getGridParam('selrow');
	if (id) {
		var tipo_imp = $("#grid_datos_tributos"+tmp).getCell(id,'c_tipo_imponible');
		var objeto = $("#grid_datos_tributos"+tmp).getCell(id,'d_objeto_hecho');
		var v_id_contribuyente = obtener_id_contribuyente();

		$.ajax({
			type:'POST',
			url: "contribuyentes/ajax_contribuyente.php", 	
			data: {tipo:"datos_regimen",
				m_tmp: m_tmp,
				p_id_contribuyente:v_id_contribuyente,
				p_tipo_imponible:tipo_imp,
				p_objeto:objeto,
				oper:'datos'},
			dataType: 'json',
			success: function(ret) {
				$('#c_regimen',"#frm_datos_regimen").val(ret.c_regimen);
				$('#d_regimen',"#frm_datos_regimen").val(ret.d_regimen);
				$('#c_tipo_actividad',"#frm_datos_regimen").val(ret.c_tipo_actividad);
				$('#d_tipo_actividad',"#frm_datos_regimen").val(ret.d_tipo_actividad);
				$('#c_categoria',"#frm_datos_regimen").val(ret.c_categoria);
				$('#f_vig_desde_regimen',"#frm_datos_regimen").val(ret.f_vig_desde);
				
				$(".read_only").attr('readonly',true);
				$(".read_only").attr('disabled',true);
				$(".read_only_lupa").hide();
				abrir_modal("#modal_regimen");
				$('#main').procOverlay({visible:false});
			}
		});
	}else{
		mostrar_validacion('Debe seleccionar un registro de la grilla de tributos.');
		$('#main').procOverlay({visible:false});
	}
}

function btn_responsables(){
	var tmp = '';
	if(m_tmp == 'S'){
		tmp = '_tmp';
	}
	$('#main').procOverlay({visible:true});
	var id = $('#grid_datos_tributos'+tmp).getGridParam('selrow');
	if (id) {
		var tributo = $("#grid_datos_tributos"+tmp).getCell(id,'c_tributo');
		var objeto = $("#grid_datos_tributos"+tmp).getCell(id,'d_objeto_hecho');

		var n_grid_responsables_trib;
		switch(tmp){
			case '_tmp':
				n_grid_responsables_trib = 21;
				break;
			default:
				n_grid_responsables_trib = 10;
				break;
		}

		datos_responsables_trib_grid = new GridParam({
	        id_menu: n_id_menu,
	        n_grid: n_grid_responsables_trib,
	        m_autoquery: 'S',
	        param: {':id_contribuyente': $("#id_contribuyente"+tmp).val(),
	    			':c_tributo': tributo,
					':d_objeto_hecho': objeto}
	    });

		crea_grilla_responsables_trib(tmp);
		setea_parametros("#grid_datos_responsables_trib" + tmp, {
			':id_contribuyente': $("#id_contribuyente" + tmp).val(),
			':c_tributo': tributo,
			':d_objeto_hecho': objeto
		}, 'S');
		abrir_modal("#modal_responsables");
	}else{
		mostrar_validacion('Debe seleccionar un registro de la grilla de tributos.');
	}
	$('#main').procOverlay({visible:false});
}

function btn_excepciones(){
	var tmp = '';
	if(m_tmp == 'S'){
		tmp = '_tmp';
	}
	$('#main').procOverlay({visible:true});
	var id = $('#grid_datos_tributos'+tmp).getGridParam('selrow');
	if (id) {
		post_to_url('abm_excepciones.php', {
		    'p_n_id_menu': 10917,
		    'p_modo': 'C',
		    'p_m_autoquery': 'S',
		    'p_id_contrib': obtener_id_contribuyente(),
		    'p_c_timp': $("#grid_datos_tributos"+tmp).getCell(id,'c_tipo_imponible'),
		    'p_c_trib': $("#grid_datos_tributos"+tmp).getCell(id,'c_tributo'),
		    'p_objeto': $("#grid_datos_tributos"+tmp).getCell(id,'d_objeto_hecho'),
		    'ruta': '[]'
		}, '_blank');
	}else{
		mostrar_validacion('Debe seleccionar un registro de la grilla de tributos.');
	}
	$('#main').procOverlay({visible:false});
}

function btn_info_agentes(){
	var tmp = '';
	if(m_tmp == 'S'){
		tmp = '_tmp';
	}
	$('#main').procOverlay({visible:true});
	var id = $('#grid_datos_tributos'+tmp).getGridParam('selrow');
	if (id) {
		var tipo_imp = $("#grid_datos_tributos"+tmp).getCell(id,'c_tipo_imponible');
		var tributo = $("#grid_datos_tributos"+tmp).getCell(id,'c_tributo');
		var objeto = $("#grid_datos_tributos"+tmp).getCell(id,'d_objeto_hecho');
		var v_id_contribuyente = obtener_id_contribuyente();

		$.ajax({
			type:'POST',
			url: "contribuyentes/ajax_contribuyente.php", 	
			data: {tipo:"datos_agente",
				m_tmp: m_tmp,
				p_id_contribuyente:v_id_contribuyente,
				p_tipo_imponible:tipo_imp,
				p_tributo:tributo,
				p_objeto:objeto},
			dataType: 'json',
			success: function(ret) {
				$('#c_organismo',"#frm_datos_agente").val(ret.codorganismo);
				$('#d_organismo',"#frm_datos_agente").val(ret.d_organismo);
				$('#denominacion',"#frm_datos_agente").val(ret.denominacion);
				$('#d_act_desarrolla',"#frm_datos_agente").val(ret.act_desarrolla);
				$('#d_act_retiene',"#frm_datos_agente").val(ret.act_retiene);
				$('#n_anexo_principal',"#frm_datos_agente").val(ret.anexo_ppal);
				$('#n_anexo_1',"#frm_datos_agente").val(ret.anexo_1);
				$('#n_anexo_2',"#frm_datos_agente").val(ret.anexo_2);
				$('.selectpicker').selectpicker('refresh');
				$('#d_contacto_operativo',"#frm_datos_agente").val(ret.contacto_operativo);
				$('#d_contacto_administrativo',"#frm_datos_agente").val(ret.contacto_administrativo);
				
				$(".read_only").attr('readonly',true);
				$(".read_only").attr('disabled',true);
				$(".read_only_lupa").hide();
				abrir_modal("#modal_agente");
				$('#main').procOverlay({visible:false});
			}
		});
	}else{
		mostrar_validacion('Debe seleccionar un registro de la grilla de tributos.');
		$('#main').procOverlay({visible:false});
	}
}
///////////////////////// BOTONES TAB TRIBUTOS ////////////////////////

function next_contribuyente(){
	if(p_datos_generales == 'N'){
		activeTab(1); // Domicilios
		n_tab = 1;
	}else{
		activeTab(3); // Datos Comp.
		n_tab = 3;
	}
	$('#bt_prev').show();
	v_cuit = limpia_cuit($("#n_cuit","#frm_busqueda").val());
	v_documento = $("#n_documento","#frm_busqueda").val();
	v_tipo_documento = $("#c_tipo_documento","#frm_busqueda").val();
}

function continuar_contribuyente(){
	valida_campos_documento();	
	var valido = $('#frm_busqueda').validationEngine('validate');
	if(valido){
		var valido = $('#frm_datos_contrib').validationEngine('validate');
		if(valido){
			var aux = new Array();
			var datos_busqueda = $('#frm_busqueda').serializeArray();
			var datos_contribuyente = $('#frm_datos_contrib').serializeArray();
			var datos_post = datos_busqueda.concat(datos_contribuyente);
			
			datos_post.push(
				{name:"n_tabla_categoria",value:45},
				{name:"n_tabla_sistema",value:95},
				{name:"n_tabla_tipo_doc",value:1},
				{name:"m_expediente",value:"N"},
				{name:"f_vig_hasta",value:null},
				{name:"id_menu",value:n_id_menu},
				//agregados a mano porque si esta disbled no se agrega con serialize
				{name:"n_cuit",value:$("#n_cuit").val()},
				{name:"c_categoria",value:$("#cod_categoria").val()},
				{name:"m_persona",value:$("#m_persona").val()}
			);
			
			// limpiamos los caracteres no deseados y corregimos el id_contribuyente a enviar
			datos_post.forEach(function(campo,index){
				switch(campo.name){
					case 'n_documento':
						var new_value = limpia_dni(campo.value);
						datos_post[index].value = new_value;
						break;
					case 'n_cuit':
						var new_cuit = limpia_cuit(campo.value);
						datos_post[index].value = new_cuit;
						break;
					case 'id_contribuyente':
						if ($('#id_contribuyente').val() != -1){
				
							//GRABO EN CONTRIBUYENTES LO MODIFICADO
							aux.push({name:"oper",value:'edit'},{name:"n_orden",value:0});
						} else {
							if (($('#id_contribuyente_tmp','#frm_busqueda').val() != -1) && (v_es_nuevo == false)){
								
								// EDITO CONTRIBUYENTE_TMP
								datos_post[index].value = $('#id_contribuyente_tmp','#frm_busqueda').val();
								aux.push({name:"oper",value:'edit'},{name:"n_orden",value:1});
							}else{
								if(v_es_nuevo){
									
									// INSERTO EN CONTRIBUYENTE_TMP
									datos_post[index].value = null;
									aux.push({name:"oper",value:'add'},{name:"n_orden",value:1});
								} else {
									mostrar_error('Operación no válida: Contribuyente temporal inexistente.');
									return;
								}
							}
						}
						break;
					default: null;
				}
			});
			
			datos_post = datos_post.concat(aux);
			
			$('#main').procOverlay({visible:true});
			$.ajax({
				type:'POST',
				url: FUNCIONES_BASEPATH + "maestro_abm.php",
				data: datos_post,
				dataType: 'json',
				async: false,
				success: function(ret) {
					$('#main').procOverlay({visible:false});
					
					if( ret.resultado != 'OK' ){
						mostrar_error(ret.resultado);
					}else{
						if(v_es_nuevo){
							$('#id_contribuyente_tmp','#frm_busqueda').val(ret.id_contribuyente_tmp);
							v_es_nuevo = false;
						}
						next_contribuyente();
					}
				}
			});
		}
	}
}

function limpia_dni(dni){
	var result;
	if (dni != null){
		result=dni.replace(/\./gi, '');
		return result;
	}else{
		return null;
	}
}

function next_domicilio(){
	var v_id_contribuyente = obtener_id_contribuyente();
	$.ajax({
		type:'POST',
		url: "contribuyentes/ajax_contribuyente.php", 	
		data: {tipo:"tiene_dom_fiscal",
			m_tmp: m_tmp,
			id_contribuyente: v_id_contribuyente
		},
		dataType: 'json',
		success: function(ret) {
			if( ret.resultado > 0){
				activeTab(2); // Telefonos
				n_tab = 2;
				if(p_domicilio_telefono == 'S'){
					$("#bt_prev").show();
				}
			}else{
				mostrar_validacion('Debe ingresar un domicilio fiscal.');
			}
		}
	});
}

function back_persona(){
	activeTab(3); // Complementarios
	n_tab = 3;
}

function next_persona(){
	activeTab(6); // Tributos
	n_tab = 6;
	$('#bt_next').hide();
}

function grabar_pers_fisica(accion){
	valida_campos_documento();	
	var valido = $('#frm_busqueda').validationEngine('validate');	
	if(valido){	
		var valido = $('#frm_per_fisica').validationEngine('validate');
		if(valido){
			var aux = new Array();
			var datos_busqueda = $('#frm_busqueda').serializeArray();
			var datos_fisica = $('#frm_per_fisica').serializeArray();
			var datos_post = datos_busqueda.concat(datos_fisica);
			
			datos_post.push(
				{name:"n_tabla_nacionac",value:5},
				{name:"n_tabla_est_civil",value:31},
				{name:"id_menu",value:n_id_menu},
				//agregado a mano porque si esta disbled no se agrega con serialize
				{name:"c_sexo",value:$("#c_sexo").val()}
			);
			
			// limpiamos los caracteres no deseados y corregimos el id_contribuyente a enviar
			datos_post.forEach(function(campo,index){
				switch(campo.name){
					case 'id_contribuyente':
						if ($('#id_contribuyente').val() != -1){
				
							//GRABO EN PERSONAS_FISICAS LO MODIFICADO
							aux.push({name:"oper",value:'edit'},{name:"n_orden",value:2});
						} else {
							if (($('#id_contribuyente_tmp','#frm_busqueda').val() != -1) && (v_es_nuevo == false)){
								
								// EDITO PERSONAS_FISICAS_TMP
								datos_post[index].value = $('#id_contribuyente_tmp','#frm_busqueda').val();
								aux.push({name:"oper",value:'edit'},{name:"n_orden",value:3});
							}else{
								if(v_es_nuevo){
									
									// INSERTO PERSONAS_FISICAS_TMP
									datos_post[index].value = $('#id_contribuyente_tmp','#frm_busqueda').val();
									aux.push({name:"oper",value:'add'},{name:"n_orden",value:3});
								} else {
									mostrar_error('Operación no válida: Contribuyente temporal inexistente.');
									return;
								}
							}
						}
						break;
					default: null;
				}
			});
			
			datos_post = datos_post.concat(aux);
			
			$('#main').procOverlay({visible:true});
			$.ajax({
				type:'POST',
				url: FUNCIONES_BASEPATH + "maestro_abm.php", 	
				data: datos_post,
				dataType: 'json',
				async: false,
				success: function(ret) {
					$('#main').procOverlay({visible:false});
					
					if( ret.resultado != 'OK' ){
						mostrar_error(ret.resultado);
					}else{
						v_es_nuevo = false;
						switch(accion){
							case 'continuar':
								next_persona();
								break;
							case 'volver':
								back_persona();
								break;
							case 'finalizar_carga_st':
								prc_finalizar_tmp_st($("#id_contribuyente_tmp","#frm_busqueda").val());
								break;
							case 'datos_generales':
								mostrar_confirmacion('Los datos han sido modificados correctamente.');
								break;
						}
					}
				}
			});
		}
	}
}

function continuar_pers_juridica(){
	if($("#c_tipo_empresa","#frm_datos_per_juridica").val() != '1'){
		var v_id_contribuyente = obtener_id_contribuyente();
		$.ajax({
			type:'POST',
			url: "contribuyentes/ajax_contribuyente.php", 	
			data: {tipo:"tiene_responsable",
				m_tmp: m_tmp,
				id_contribuyente:v_id_contribuyente
			},
			dataType: 'json',
			success: function(ret) {
				if( ret.resultado > 0){
					grabar_pers_juridica('continuar');
				}else{
					mostrar_validacion('Faltan ingresar los integrantes de la sociedad.');
				}
			}
		});
	}else{
		grabar_pers_juridica('continuar');
	}
}

function grabar_pers_juridica(accion){
	valida_campos_documento();	
	var valido = $('#frm_busqueda').validationEngine('validate');  // will return true or false		
	if(valido){
		var valido = $('#frm_datos_per_juridica').validationEngine('validate');  // will return true or false		
		if(valido){
			var aux = new Array();
			var datos_busqueda = $('#frm_busqueda').serializeArray();
			var datos_juridica = $('#frm_datos_per_juridica').serializeArray();
			var datos_post = datos_busqueda.concat(datos_juridica);
			
			datos_post.push(
				{name:"n_tabla_tipo_emp",value:17},
				{name:"n_tabla_forma_jur",value:2},
				{name:"id_menu",value:n_id_menu}
			);

			// limpiamos los caracteres no deseados y corregimos el id_contribuyente a enviar
			datos_post.forEach(function(campo,index){
				switch(campo.name){
					case 'id_contribuyente':
						if ($('#id_contribuyente').val() != -1){
				
							//GRABO EN PERSONAS_JURIDICAS LO MODIFICADO
							aux.push({name:"oper",value:'edit'},{name:"n_orden",value:4});
						} else {
							if (($('#id_contribuyente_tmp','#frm_busqueda').val() != -1) && (v_es_nuevo == false)){
								
								// EDITO PERSONAS_JURIDICAS_TMP
								datos_post[index].value = $('#id_contribuyente_tmp','#frm_busqueda').val();
								aux.push({name:"oper",value:'edit'},{name:"n_orden",value:5});
							}else{
								if(v_es_nuevo){
									
									// INSERTO PERSONAS_JURIDICAS_TMP
									datos_post[index].value = $('#id_contribuyente_tmp','#frm_busqueda').val();
									aux.push({name:"oper",value:'add'},{name:"n_orden",value:5});
								} else {
									mostrar_error('Operación no válida: Contribuyente temporal inexistente.');
									return;
								}
							}
						}
						break;
					default: null;
				}
			});
			
			datos_post = datos_post.concat(aux);
			
			$('#main').procOverlay({visible:true});
			$.ajax({
				type:'POST',
				url: FUNCIONES_BASEPATH + "maestro_abm.php", 	
				data: datos_post,
				dataType: 'json',
				async: false,
				success: function(ret) {
					$('#main').procOverlay({visible:false});
					
					if( ret.resultado != 'OK' ){
						mostrar_error(ret.resultado);
					}else{
						v_es_nuevo = false;
						switch(accion){
							case 'continuar':
								next_persona();
								break;
							case 'volver':
								back_persona();
								break;
							case 'finalizar_carga_st':
								prc_finalizar_tmp_st($("#id_contribuyente_tmp","#frm_busqueda").val());
								break;
							case 'datos_generales':
								mostrar_confirmacion('Los datos han sido modificados correctamente.');
								break;
						}
					}
				}
			});
		}
	}
}

function completa_integrantes(n_cuit,formid) {
	if (n_cuit) {
		$.post("contribuyentes/ajax_contribuyente.php", {
			"tipo": "datos_contribuyente",
			"n_cuit": n_cuit
		}, function(data) {
			ret = eval('(' + data + ')');			
			$('#d_denominacion',formid).val(ret.d_denominacion);
			$('#c_tipo_documento',formid).val(ret.c_tipo_documento);
			$('#d_tipo_documento',formid).val(ret.d_tipo_documento);
			$('#n_documento',formid).val(ret.n_documento);
			$('#c_sexo',formid).val(ret.c_sexo);
		});
	}else {
		$('#d_denominacion',formid).val(null);
		$('#c_tipo_documento',formid).val(null);
		$('#d_tipo_documento',formid).val(null);
		$('#n_documento',formid).val(null);
		$('#c_sexo',formid).val(null);
	}
}

/////////////////////////// FUNCIONES DE BOTON BUSCAR /////////////////////////////////
function valida_campos_documento(){
	if ((($('#c_tipo_documento').val() != '') && $('#d_c_tipo_documento').val() != '') && $('#n_documento').val() == ''){
		$('#n_documento').addClass("validate[required]");
	}else{
		$('#n_documento').removeClass("validate[required]");
	}
	if ((($('#c_tipo_documento').val() == '') && $('#d_c_tipo_documento').val() == '') && $('#n_documento').val() != ''){
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
	if((($('#c_tipo_documento').val() != '') && $('#d_c_tipo_documento').val() != '') && $('#n_documento').val() != ''){
		$('#n_cuit').removeClass("validate[required,custom[validaCuit]]");
	}else{
		$('#n_cuit').addClass("validate[required,custom[validaCuit]]");
	}
}

function limpiar_busqueda() {
	$('#frm_busqueda input').val(null);

	$('#n_cuit, #d_denominacion, #c_tipo_documento, #n_documento').attr('readonly', false);
	$('#n_cuit').prop('disabled', false);
	$("#btn_continuar_abm").prop('disabled', false);
	$("#lupa_c_tipo_documento").prop('disabled', false);
	$('#general').hide();
}
/////////////////////////////////////////////////////////////////////////////////////////

//////////////////////////////// FUNCIONES DE CREATE DE TAB////////////////////////////////
function activeTab(tabs){
	$('#tabs a[id="'+tabs+'"]').tab('show');
	$(window).resize();
    $(".selectpicker").selectpicker('refresh');
    if(tabs == 6 && $('#id_contribuyente_tmp','#frm_busqueda').val() != -1 && m_tmp == 'S'){
    	$('#btn_guardar_datos').show();
    }else{
    	if(p_sintributo == 'S' && (tabs == 4 || tabs == 5)){
    		$('#btn_guardar_datos').show();
    	}else{
    		$('#btn_guardar_datos').hide();
    	}
    }
}

function abrir_modal(modal){
	$(modal).modal('show');
	$(window).resize();
}
/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////// FUNCIONES  DE FECHAS/////////////////////////////////
function fechas_domicilio(formid){
	$("#f_vig_desde",formid).datepicker("option", "maxDate", fecha_hoy);
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
	});
	$("#f_vig_hasta",formid).datepicker("option","onClose",function (selectedDate,obj) {
		$("#f_vig_desde",formid).datepicker("option", "maxDate", selectedDate);
	});
}
///////////////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////// FUNCIONES  DE BOTON FINALIZAR CARGA /////////////////////////////////
function finalizar_carga(){
	if(p_sintributo == 'S'){
		if(p_tipo_persona == 'F'){
			grabar_pers_fisica('finalizar_carga_st');
		}else{
			grabar_pers_juridica('finalizar_carga_st');
		}
	}else{
		prc_finalizar_tmp($("#id_contribuyente_tmp","#frm_busqueda").val());
	}
}

function prc_finalizar_tmp(id_contribuyente_tmp){
	$.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
        	id_contribuyente_tmp:id_contribuyente_tmp,
        	id_menu:10865,
        	n_orden:8
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
            	var n_cuit = $("#n_cuit","#frm_busqueda").val();
            	var d_denominacion = $("#d_denominacion","#frm_busqueda").val();
            	mostrar_confirmacion('El contribuyente '+n_cuit+' - '+d_denominacion+' ha sido dado de alta definitivamente.',450);
            	//limpiar y volver a cargar con el mismo contrib (definitivo)
            	$('#btn_limpiar').click();
            	$("#n_cuit","#frm_busqueda").val(n_cuit);
            	n_cuit_focusout();
            	$('#btn_continuar_abm').click();
            }else{
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}

function prc_finalizar_tmp_st(id_contribuyente_tmp){
	$.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
        	id_contribuyente_tmp:id_contribuyente_tmp,
        	id_menu:10865,
        	n_orden:9
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
            	var n_cuit = $("#n_cuit","#frm_busqueda").val();
            	var d_denominacion = $("#d_denominacion","#frm_busqueda").val();
            	mostrar_confirmacion('El contribuyente '+n_cuit+' - '+d_denominacion+' ha sido dado de alta definitivamente sin tributos asociados.',450);
            	//limpiar y volver a cargar con el mismo contrib (definitivo)
            	$('#btn_limpiar').click();
            	$("#n_cuit","#frm_busqueda").val(n_cuit);
            	n_cuit_focusout();
            	$('#btn_continuar_abm').click();
            }else{
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}