function crea_grillas_principales(tmp){
	var n_grid_domicilios;
	var n_grid_telefonos;
	var n_grid_datos_comp;
	var n_grid_responsables;
	var n_grid_tributos;
	var n_orden_tributos;
	var n_grid_conceptos;

	// Definición de datos de grillas
	switch(tmp){
		case '_tmp':
			n_grid_domicilios = 11;
			n_grid_telefonos = 12;
			n_grid_datos_comp = 13;
			if($('#m_persona').val()=='J'){
				n_grid_responsables = 14;
			}
			if(p_datos_generales == 'N'){
				n_grid_tributos = 15;
				n_orden_tributos = 7;
				n_grid_conceptos = 16;
			}
			break;
		default:
		    n_grid_domicilios = 0;
			n_grid_telefonos = 1;
			n_grid_datos_comp = 2;
			if($('#m_persona').val()=='J'){
				n_grid_responsables = 3;
			}
			if(p_datos_generales == 'N'){
				n_grid_tributos = 4;
				n_orden_tributos = 6;
				n_grid_conceptos = 5;
			}
			break;
	}

	var datos_domicilio = new GridParam({
        id_menu: n_id_menu,
        n_grid: n_grid_domicilios,
        m_autoquery: 'S',
        param: {':id_contribuyente': $('#id_contribuyente'+tmp).val()}
    });

    var datos_contacto_grid = new GridParam({
        id_menu: n_id_menu,
        n_grid: n_grid_telefonos,
        m_autoquery: 'S',
        param: {':id_contribuyente': $('#id_contribuyente'+tmp).val()}
    });

    var datos_datos_comp_grid = new GridParam({
        id_menu: n_id_menu,
        n_grid: n_grid_datos_comp,
        m_autoquery: 'S',
        param: {':id_contribuyente': $('#id_contribuyente'+tmp).val()}
    });

    if($('#m_persona').val()=='J'){
	    var datos_responsables_grid = new GridParam({
	        id_menu: n_id_menu,
	        n_grid: n_grid_responsables,
	        m_autoquery: 'S',
	        param: {':id_contribuyente': $('#id_contribuyente'+tmp).val()}
	    });
	}

	if(p_datos_generales == 'N'){
	    var datos_tributos_grid = new GridParam({
	        id_menu: n_id_menu,
	        n_grid: n_grid_tributos,
	        n_orden: n_orden_tributos,
	        m_autoquery: 'S',
	        param: {':id_contribuyente': $('#id_contribuyente'+tmp).val()}
	    });

	    var datos_conceptos_grid = new GridParam({
	        id_menu: n_id_menu,
	        n_grid: n_grid_conceptos,
	        m_autoquery: 'N',
	        param: {':id_contribuyente': $('#id_contribuyente'+tmp).val(), ':d_objeto_hecho': null}
	    });
	}

	/************* grilla domicilio **********/
	var v_update_dom = true;
	var v_delete_dom;
	var v_delete_tel;
	if(tmp!=""){
		v_delete_dom=true;
		v_delete_tel=true;
	}else{
		v_delete_dom=false;
		v_delete_tel=false;
	}

	$("#grid_datos_domicilio"+tmp).jqGrid({
		colNames:datos_domicilio.colNames(),
		colModel:datos_domicilio.colModel(),
		height: 180,
		autowidth:false,
		pager: $('#grid_datos_domicilio_pager'+tmp),
		caption:"Domicilios:",
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
		postData: datos_domicilio.postData(),
		onSelectRow: function(rowid){
			if(p_datos_generales == 'S'){
				if ($(this).getCell(rowid,'c_dom_afip') == 'A'){
				  	v_update_dom = false;
				  	v_delete_dom = false;
				}else{
				  	v_update_dom = true;
				  	v_delete_dom = true;
				}
			}
		}
	}).navGrid('#grid_datos_domicilio_pager'+tmp,
		{add:true, edit:v_update_dom, del:v_delete_dom}, //options 
		{
			width:690,	
			onInitializeForm: defaultInitForm(function(formid) {
				// Definición de lupas
		        lupas_domicilio(formid, tmp);
		        fechas_domicilio(formid);
			}),
			beforeShowForm: defaultBeforeShowForm(function(formid) {
				$("#tr_n_oficina",formid).hide();
				$("#tr_aux_d_afip .CaptionTD").html('');
				habilita_n_oficina(formid);
				$("#tr_d_tipo_domicilio,#tr_d_provincia,#tr_d_localidad,#tr_d_departamento,#tr_c_postal").hide();
				$("#id_contribuyente"+tmp,formid).val($('#id_contribuyente'+tmp).val());
				$("#f_vig_desde",formid).datepicker("option", "minDate", $("#f_vig_desde","#frm_datos_contrib").val());
				// $('#f_vig_desde',formid).attr('disabled', true);
			})	
		}, // edit options 
		{
			width:690,
			onInitializeForm: defaultInitForm(function(formid) {
				// Definición de lupas
		        lupas_domicilio(formid, tmp);
		        fechas_domicilio(formid);
		    }),
			beforeShowForm: defaultBeforeShowForm(function(formid) {
				$("#tr_n_oficina",formid).hide();
				$("#tr_d_distribucion, #tr_d_rechazo, #tr_aux_d_afip, #tr_d_normalizado",formid).hide();
				$("#tr_aux_d_afip .CaptionTD").html('');
				$("#tr_d_tipo_domicilio,#tr_d_provincia,#tr_d_localidad,#tr_d_departamento,#tr_c_postal").show();
				$("#id_contribuyente"+tmp,formid).val($('#id_contribuyente'+tmp).val());
				$("#n_tabla_provincia",formid).val(16); // valor de n_tabla de provincias
				$("#n_tabla_tipo_dom",formid).val(32); // valor de n_tabla de tipo domicilio
				// $("#f_vig_desde",formid).datepicker("option", "minDate", $("#f_vig_desde","#frm_datos_contrib").val());
				$("#f_vig_desde",formid).val($("#f_vig_desde","#frm_datos_contrib").val());
				// $('#f_vig_desde',formid).attr('disabled', false);
			}),
		    onclickSubmit: function(params, postdata) { // Para evitar fallos en filas sin refresh
		    	// params.form = 'add';
		    	var ret = $(this).getGridParam('postData');
				postdata.n_tabla_provincia = 16;
				postdata.n_tabla_tipo_dom = 32;
				if(m_tmp == 'S'){
					postdata.id_contribuyente_tmp = $('#id_contribuyente_tmp','#frm_busqueda').val();
				}else{
					postdata.id_contribuyente = $('#id_contribuyente','#frm_busqueda').val();
				}
				postdata = $.extend(postdata,eval('('+ret.param+')'));
				return postdata; 
			},
		    closeAfterAdd:true
		}, // add options 
		{} // del options
	);	
	/************* fin grilla domicilio **********/

	/************* grilla telefonos **********/	
	$("#grid_datos_telefono"+tmp).jqGrid({
		colNames:datos_contacto_grid.colNames(),
		colModel:datos_contacto_grid.colModel(),
		height: 180,
		autowidth:false,
		pager: $('#grid_datos_telefono_pager'+tmp),
		caption:"Contactos:",
		postData: datos_contacto_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
		onSelectRow: function(rowid){
			if ($("#grid_datos_telefono").getCell(rowid,'c_tipo_telefono') == 4){
				$("#btn_delete_mail1, #btn_delete_mail2").hide();
			}else{
				if ($("#grid_datos_telefono").getCell(rowid,'d_email1') != ""){
					$("#btn_delete_mail1").show();
				}else{
					$("#btn_delete_mail1").hide();
				}
				if ($("#grid_datos_telefono").getCell(rowid,'d_email2') != ""){
					$("#btn_delete_mail2").show();
				}else{
					$("#btn_delete_mail2").hide();
				}
			}
		}
	}).navGrid('#grid_datos_telefono_pager'+tmp,
		{add:true, edit:true, del:v_delete_tel}, //options 
		{
			width:680,	
			onInitializeForm: defaultInitForm(function(formid) {
				// Definición de lupas
		        lupa_telefono(formid);
		        fechas_contacto(formid);
			}),
			beforeShowForm: defaultBeforeShowForm(function(formid) {
				$('#tr_d_tipo_telefono').hide();
				$("#id_contribuyente"+tmp,formid).val($('#id_contribuyente'+tmp).val());
				// $("#f_vig_desde",formid).datepicker("option", "minDate", $("#f_vig_desde","#frm_datos_contrib").val());
				// $('#f_vig_desde',formid).attr('disabled', true);
			})
		}, // edit options 
		{
			width:680,
			onInitializeForm: defaultInitForm(function(formid) {
				// Definición de lupas
		    	lupa_telefono(formid);
		    	fechas_contacto(formid);
		    }),
			beforeShowForm: defaultBeforeShowForm(function(formid) {
				$('#tr_d_tipo_telefono').show();
				$("#id_contribuyente"+tmp,formid).val($('#id_contribuyente'+tmp).val());
				$("#n_tabla_tipo_tel",formid).val(18);
				// $("#f_vig_desde",formid).datepicker("option", "minDate", $("#f_vig_desde","#frm_datos_contrib").val());
				$("#f_vig_desde",formid).val($("#f_vig_desde","#frm_datos_contrib").val());
				// $('#f_vig_desde',formid).attr('disabled', false);
			}),
			onclickSubmit: function(params, postdata) { // Para evitar fallos en filas sin refresh
				var ret = $(this).getGridParam('postData');
				postdata.n_tabla_tipo_tel = 18;
				if(m_tmp == 'S'){
					postdata.id_contribuyente_tmp = $('#id_contribuyente_tmp','#frm_busqueda').val();
				}else{
					postdata.id_contribuyente = $('#id_contribuyente','#frm_busqueda').val();
				}
				postdata = $.extend(postdata,eval('('+ret.param+')'));
				return postdata; 
			},
		    closeAfterAdd:true
		}, // add options 
		{} // del options 
	);
	
	if(tmp == ''){
		$("#grid_datos_telefono").navButtonAdd('#grid_datos_telefono_pager', {
			id: 'btn_delete_mail1',
			caption: "Eliminar Email 1",
			position: "last",
			buttonicon: "glyphicon-trash",
			title: "Eliminar Email 1",
			cursor: "pointer",
			onClickButton: function() {
				if (!$("#grid_datos_telefono").getGridParam('selrow')) {
					mostrar_validacion('Debe seleccionar un registro de la grilla de teléfonos primero.');
					return false;
				} else {
					fun_delete_email(1);
				}
			}
		});

		$("#grid_datos_telefono").navButtonAdd('#grid_datos_telefono_pager', {
			id: 'btn_delete_mail2',
			caption: "Eliminar Email 2",
			position: "last",
			buttonicon: "glyphicon-trash",
			title: "Eliminar Email 2",
			cursor: "pointer",
			onClickButton: function() {
				if (!$("#grid_datos_telefono").getGridParam('selrow')) {
					mostrar_validacion('Debe seleccionar un registro de la grilla de teléfonos primero.');
					return false;
				} else {
					fun_delete_email(2);
				}
			}
		});
	}
	/************* fin grilla telefonos **********/	

	/************* grilla datos complementarios **********/	
	$("#grid_datos_complementarios"+tmp).jqGrid({
		colNames:datos_datos_comp_grid.colNames(),
		colModel:datos_datos_comp_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_complementarios_pager'+tmp),
		caption:"Datos Complementarios:",
		postData: datos_datos_comp_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
	}).navGrid('#grid_datos_complementarios_pager'+tmp,
		{add:true, edit:true, del:true}, //options
		{
			onInitializeForm: defaultInitForm(function(formid) {
				$("#tr_d_dato").hide();
				lupa_datos_complementarios(formid);
				campo_d_valor(formid);
	    	})
		}, // edit options
		{
			onInitializeForm: defaultInitForm(function(formid) {
				$("#tr_d_dato").show();
				$("#n_tabla_c_dato",formid).val(46);
				$("#id_contribuyente"+tmp,formid).val($('#id_contribuyente'+tmp).val());
				lupa_datos_complementarios(formid);
				campo_d_valor(formid);
	    	}),
			onclickSubmit: function(params, postdata) { // Para evitar fallos en filas sin refresh
				var ret = $(this).getGridParam('postData');
				postdata.n_tabla_c_dato = 46;
				if(m_tmp == 'S'){
					postdata.id_contribuyente_tmp = $('#id_contribuyente_tmp','#frm_busqueda').val();
				}else{
					postdata.id_contribuyente = $('#id_contribuyente','#frm_busqueda').val(); 
				}
				postdata = $.extend(postdata,eval('('+ret.param+')'));
				return postdata; 
			},
		    closeAfterAdd:true
		}, // add options
		{} // del options
	);
	/************* fin grilla datos complementarios **********/	

	/************* grilla responsables **********/
	if($('#m_persona').val()=='J'){
		$("#grid_datos_responsables"+tmp).jqGrid({
			colNames:datos_responsables_grid.colNames(),
			colModel:datos_responsables_grid.colModel(),
			autowidth:false,
			height:90,
			pager: $('#grid_datos_responsables_pager'+tmp),
			caption:"Nómina de Reponsables o Componentes de la Entidad/UTE:" ,		
			postData:datos_responsables_grid.postData(),
			editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"			
		}).navGrid('#grid_datos_responsables_pager'+tmp,
			{add:true, edit:true, del:true}, //options 
			{
				width:700,	
				onInitializeForm: defaultInitForm(function(formid) {	
					// Definición de lupas
					lupas_per_juridica(formid,tmp);
					$('#n_cuit',formid).mask("99-99999999-9");
				}),
				beforeShowForm: defaultBeforeShowForm(function(formid) {
					$("#id_contribuyente"+tmp,formid).val($('#id_contribuyente'+tmp).val());
					$('#n_documento',formid).prop('disabled', true);
					$('#tr_d_tipo_documento',formid).hide();
					$('#tr_n_documento',formid).hide();
					if($("#c_tipo_responsable",formid).val() == '3'){
						$('#tr_n_cuit',formid).hide();
						$('#tr_d_tipo_responsable',formid).hide();
					}
				}),
				afterShowForm:function(formid){
					$('#n_cuit',formid).change(function(){
						completa_integrantes(limpia_cuit($('#n_cuit',formid).val()),formid);
					});
				},
				onclickSubmit: function(params, postdata) { // Para evitar fallos en filas sin refresh	
					var ret = $(this).getGridParam('postData');
					postdata.n_cuit=limpia_cuit(postdata.n_cuit);
					postdata = $.extend(postdata,eval('('+ret.param+')'));
					return postdata;
				}
			}, // edit options 
			{
				width:700,
				onInitializeForm: defaultInitForm(function(formid) {
					// Definición de lupas
					lupas_per_juridica(formid,tmp);
					$('#n_cuit',formid).mask("99-99999999-9");
			    }),
				beforeShowForm: defaultBeforeShowForm(function(formid) {
					$("#id_contribuyente"+tmp,formid).val($('#id_contribuyente'+tmp).val());
					$('#n_documento',formid).prop('disabled', false);
					$('#tr_d_tipo_documento',formid).show();
					$('#tr_n_documento',formid).show();
					$('#tr_n_cuit',formid).show();
					$('#tr_d_tipo_responsable',formid).show();
				}),
				afterShowForm:function(formid){
					$('#n_cuit',formid).change(function(){
						completa_integrantes(limpia_cuit($('#n_cuit',formid).val()),formid);
					});
				},
				onclickSubmit: function(params, postdata) { // Para evitar fallos en filas sin refresh
					var ret = $(this).getGridParam('postData');
					postdata.n_tabla_tipo_doc = 1;
					postdata.n_tabla_tipo_res = 52;
					postdata.n_tabla_car_firma = 48;
					postdata.n_tabla_cargo = 51;
					postdata.n_cuit=limpia_cuit(postdata.n_cuit);
					if(m_tmp == 'S'){
						postdata.id_contribuyente_tmp = $('#id_contribuyente_tmp','#frm_busqueda').val();
					}else{
						postdata.id_contribuyente = $('#id_contribuyente','#frm_busqueda').val();
					}
					postdata = $.extend(postdata,eval('('+ret.param+')'));
					return postdata;
				},
			    closeAfterAdd:true	
			}, // add options 
			{}, // del options 
		);
	}
	/************* fin grilla responsables **********/

	/************* grilla tributos **********/
	if(p_datos_generales == 'N'){
		$("#grid_datos_tributos"+tmp).jqGrid({
			colNames:datos_tributos_grid.colNames(),
			colModel:datos_tributos_grid.colModel(),
			autowidth: false,
			height: 180,
			pager: $('#grid_datos_tributos_pager'+tmp),
			caption:"Tributos:",
			postData: datos_tributos_grid.postData(),
			editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
			onSelectRow:function(rowid){
				setea_parametros('#grid_datos_conceptos'+tmp, {
					':id_contribuyente': $('#id_contribuyente'+tmp).val(),
					':d_objeto_hecho': $("#grid_datos_tributos"+tmp).getCell(rowid, 'd_objeto_hecho')
				});

				$("#btn_gen_boleta").hide();
				$("#btn_actividades").attr('disabled',true);
				$("#btn_regimen").attr('disabled',true);
				$("#btn_responsables").attr('disabled',true);
				$("#btn_excepciones").attr('disabled',false);
				$("#btn_info_agentes").attr('disabled',true);

				v_c_tributo_select = $("#grid_datos_tributos"+tmp).getCell(rowid, 'c_tributo');
				if (v_c_tributo_select == '10'){
					$("#btn_gen_boleta").show();
					$("#btn_actividades").attr('disabled',false);
					$("#btn_regimen").attr('disabled',false);
					$("#btn_responsables").attr('disabled',true);
				}
				if (v_c_tributo_select == '20'){
					$("#btn_actividades").attr('disabled',false);
					$("#btn_regimen").attr('disabled',false);
					$("#btn_responsables").attr('disabled',true);
				}
				if (v_c_tributo_select == '32'){
					$("#btn_actividades").attr('disabled',true);
					$("#btn_regimen").attr('disabled',false);
					$("#btn_responsables").attr('disabled',true);
				}
				if (v_c_tributo_select == '40' || v_c_tributo_select == '30' || v_c_tributo_select == '9'){
					$("#btn_actividades").attr('disabled',true);
					$("#btn_regimen").attr('disabled',false);
					$("#btn_responsables").attr('disabled',true);
				}
				if (v_c_tributo_select == '150' || v_c_tributo_select == '32'){
					$("#btn_regimen").attr('disabled',false);
				}
				if (v_c_tributo_select == '60' || v_c_tributo_select == '90'){
					$("#btn_actividades").attr('disabled',true);
					$("#btn_responsables").attr('disabled',false);
				}
				if (v_c_tributo_select == '30' || v_c_tributo_select == '40'){
					//ver si 40 tambien debe habilitar el boton
					$("#btn_info_agentes").attr('disabled',false);
					if(v_c_tributo_select == '40'){
						$(".anexo7").show();
						$(".anexos").hide();
						$("#n_anexo_principal").val('07');
						$("#n_anexo_principal").attr('disabled',true);
						// ver si #n_anexo_1 y #n_anexo_2 pueden tener otros valores o solo '07'
					}else{
						$("#n_anexo_principal").val('');
						$("#n_anexo_principal").attr('disabled',false);
						$(".anexo7").hide();
						$(".anexos").show();
					}
					$('.selectpicker').selectpicker('refresh');
				}
			}
		}).navGrid('#grid_datos_tributos_pager'+tmp,
			{add:true, edit:false, del:false}, //options
			{
				beforeShowForm: defaultBeforeShowForm(function(formid) {
					$("#d_objeto_hecho").attr('disabled',true);
					$("#tr_d_tributo, #tr_d_tipo_imponible, #tr_d_objeto_hecho, #tr_d_motivo_alta",formid).hide();
					$("#tr_jur_sede",formid).hide();
					$("#tr_datos_agente #datos_agente",formid).hide();
					$("#tr_datos_regimen #datos_regimen",formid).hide();
					$("#tr_datos_comercio_ppal #datos_comercio_ppal",formid).hide();
					$("#tr_datos_actividad_ppal #datos_actividad_ppal",formid).hide();
					$("#tr_datos_unidades #datos_unidades",formid).hide();
					mostrar_campos_agente(false,formid);
					mostrar_campos_regimen(false,formid);
					mostrar_campos_com_act(false,formid);
					mostrar_campos_unidades(false,formid);
					$("#f_vig_desde, #f_vig_desde_regimen, #f_iniciacion_ppal, #f_inicio_act_ppal, #f_vig_desde_uni",formid).datepicker(
						"option", "minDate", $("#f_vig_desde","#frm_datos_contrib").val());
					if($("#f_cese_provisorio",formid).val() != ''){
						$("#tr_f_cese_provisorio",formid).show();
					}else{
						$("#tr_f_cese_provisorio",formid).hide();
					}
					$("#tr_d_distribucion, #tr_d_rechazo, #tr_aux_d_afip, #d_normalizado",formid).show();
					$("#f_vig_desde",formid).datepicker("option","onClose", function (selectedDate,obj) {
						var f_desde = $('#f_vig_desde').val().split('/');
						$('#f_vig_desde_regimen',formid).val('01/'+f_desde[1]+'/'+f_desde[2]);
					});
				}),
				//  onInitializeForm: defaultInitForm(function(formid) {
				// 	lupas_tributos(formid);
				// }),
				onclickSubmit: function(params, postdata) { // Para evitar fallos en filas sin refresh
					var ret = $(this).getGridParam('postData');
					if(m_tmp == 'S'){
						postdata.id_contribuyente_tmp = $('#id_contribuyente_tmp','#frm_busqueda').val();
					}else{
						postdata.id_contribuyente = $('#id_contribuyente','#frm_busqueda').val();
					}
					postdata.m_persona = $('#m_persona',"#frm_datos_contrib").val();
					postdata.objeto_viejo = p_objeto_viejo;
					postdata.permite_vs_ag = p_permite_vs_ag;
					postdata = $.extend(postdata,eval('('+ret.param+')'));
					return postdata;
				},
			}, // edit options
			{
				beforeShowForm: defaultBeforeShowForm(function(formid) {
					$("#d_objeto_hecho").attr('disabled',true);
					$("#id_contribuyente"+tmp,formid).val($('#id_contribuyente'+tmp).val());
					$("#tr_jur_sede",formid).hide();
					$("#tr_datos_agente #datos_agente",formid).hide();
					$("#tr_datos_regimen #datos_regimen",formid).hide();
					$("#tr_datos_comercio_ppal #datos_comercio_ppal",formid).hide();
					$("#tr_datos_actividad_ppal #datos_actividad_ppal",formid).hide();
					$("#tr_datos_unidades #datos_unidades",formid).hide();
					mostrar_campos_agente(false,formid);
					mostrar_campos_regimen(false,formid);
					mostrar_campos_com_act(false,formid);
					mostrar_campos_unidades(false,formid);
					$("#f_vig_desde, #f_vig_desde_regimen, #f_iniciacion_ppal, #f_inicio_act_ppal, #f_vig_desde_uni",formid).datepicker(
						"option", "minDate", $("#f_vig_desde","#frm_datos_contrib").val());
					$("#tr_f_cese_provisorio",formid).hide();
					$("#tr_d_distribucion, #tr_d_rechazo, #tr_aux_d_afip, #d_normalizado",formid).hide();
					$("#f_vig_desde",formid).datepicker("option","onClose", function (selectedDate,obj) {
						var f_desde = $('#f_vig_desde').val().split('/');
						$('#f_vig_desde_regimen',formid).val('01/'+f_desde[1]+'/'+f_desde[2]);
					});
				}),
				onInitializeForm: defaultInitForm(function(formid) {
					lupas_tributos(formid);
		    	}),
				onclickSubmit: function(params, postdata) { // Para evitar fallos en filas sin refresh
					var ret = $(this).getGridParam('postData');
					if(m_tmp == 'S'){
						postdata.id_contribuyente_tmp = $('#id_contribuyente_tmp','#frm_busqueda').val();
						postdata.n_orden = 7; //n_orden_tributos
					}else{
						postdata.id_contribuyente = $('#id_contribuyente','#frm_busqueda').val();
						postdata.n_orden = 6; //n_orden_tributos
					}
					postdata.m_persona = $('#m_persona',"#frm_datos_contrib").val();
					postdata.objeto_viejo = p_objeto_viejo;
					postdata.permite_vs_ag = p_permite_vs_ag;
					postdata = $.extend(postdata,eval('('+ret.param+')'));
					return postdata;
				},
	            afterSubmit: function(response,postdata){
	                var res = $.parseJSON(response.responseText);
	                if(res.resultado != "OK"){
	                    return[false,res.resultado];
	                }else{
	                    if(res.p_genera_boleta == 'SI' && tmp === ''){
	                        // genero la boleta
	                        $.ajax({
					            type:'POST',
					            url: FUNCIONES_BASEPATH+'maestro_abm.php',
					            data:{
					            	"p_id_contribuyente":obtener_id_contribuyente(),
					            	"p_c_tributo": $("#tr_c_tributo #c_tributo").val(),
					            	"p_d_objeto_hecho": $("#tr_d_objeto_hecho #d_objeto_hecho").val(),
					            	"p_f_vig_desde": $("#tr_f_vig_desde #f_vig_desde").val(),
					            	"p_c_regimen": $("#tr_c_regimen #c_regimen").val(),
					            	"p_c_tipo_actividad": $("#tr_c_tipo_actividad #c_tipo_actividad").val(),
					            	"p_c_categoria": $("#tr_c_categoria #c_categoria").val(),
					            	"id_menu":10865,
					            	"n_orden":10
					            },
					            dataType:'json',
					            success: function( data ) {
					                if(data.resultado == 'OK'){
										llamar_report('RECAL012_IIBB',
									        'p_id_sesion|'+data.p_id_sesion,
									        'PDF');
					                }
					                else{
					                    mostrar_error(data.resultado);
					                }
					            }
					        });
	                    }
	                    return[true,''];
	                }
	            },
	            closeAfterAdd:true
			}, // add options
			{} // del options
		);
		/************* fin grilla tributos **********/

		/************* grilla conceptos **********/
		$("#grid_datos_conceptos"+tmp).jqGrid({
			colNames:datos_conceptos_grid.colNames(),
			colModel:datos_conceptos_grid.colModel(),
			autowidth: false,
			height: 180,
			pager: $('#grid_datos_conceptos_pager'+tmp),
			caption:"Conceptos:",
			postData: datos_conceptos_grid.postData(),
			editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
		}).navGrid('#grid_datos_conceptos_pager'+tmp,
			{add:false, edit:true, del:false}, //options
			{
				onInitializeForm: defaultInitForm(function(formid) {
					$("#tr_c_concepto, #tr_c_tipo_domicilio").hide();
					$("#tr_d_concepto, #tr_f_vig_desde, #tr_c_distribucion, #tr_c_rechazo").hide();
					var id_contrib = $('#id_contribuyente'+tmp).val();
					$('#d_tipo_domicilio',formid).lupa_generica({
						titulos:['C&oacute;digo','Descripci&oacute;n'],
						grid:[{index:'c_tipo_domicilio',width:150},
							{index:'d_tipo_domicilio',width:350}],
						caption:'Tipo de Domicilio',
						sortname:"c_tipo_domicilio",
						sortorder:'asc',
						exactField:"c_tipo_domicilio",
						filtros:[id_contrib],
						campos:{c_tipo_domicilio:'c_tipo_domicilio',d_tipo_domicilio:'d_tipo_domicilio'},
						keyNav:true
					});
		    	})
			}, // edit options
			{}, // add options
			{} // del options
		);
		/************* fin grilla conceptos **********/
	}
}

/////////////////////////////////////////////////////////////////////////////////////////

function crea_grillas_act_jur(tmp){
	$("#grid_datos_actividades_cm"+tmp).jqGrid({
		colNames:datos_actividades_cm_grid.colNames(),
		colModel:datos_actividades_cm_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_actividades_cm_pager'+tmp),
		caption:"Actividades:",
		postData: datos_actividades_cm_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
	}).navGrid('#grid_datos_actividades_cm_pager'+tmp,{add:false, edit:false, del:false});

	$("#grid_datos_jurisdicciones"+tmp).jqGrid({
		colNames:datos_jurisdicciones_grid.colNames(),
		colModel:datos_jurisdicciones_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_jurisdicciones_pager'+tmp),
		caption:"Jurisdicciones:",
		postData: datos_jurisdicciones_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
	}).navGrid('#grid_datos_jurisdicciones_pager'+tmp,{add:false, edit:false, del:false});
}

function crea_grillas_com_act(tmp){
	$("#grid_datos_comercios"+tmp).jqGrid({
		colNames:datos_comercios_grid.colNames(),
		colModel:datos_comercios_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_comercios_pager'+tmp),
		caption:"Comercios:",
		postData: datos_comercios_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
	}).navGrid('#grid_datos_comercios_pager'+tmp,{add:false, edit:false, del:false});

	$("#grid_datos_actividades_ibd"+tmp).jqGrid({
		colNames:datos_actividades_idb_grid.colNames(),
		colModel:datos_actividades_idb_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_actividades_ibd_pager'+tmp),
		caption:"Actividades:",
		postData: datos_actividades_idb_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
	}).navGrid('#grid_datos_actividades_ibd_pager'+tmp,{add:false, edit:false, del:false});

	$("#grid_datos_unidades").jqGrid({
        colNames:datos_uni_grid.colNames(),
        colModel:datos_uni_grid.colModel(),
        pager: $('#grid_datos_unidades_pager'),
        caption:"Unidades:" ,
        postData:datos_uni_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        sortname:'c_actividad,f_vig_desde',
        autowidth: false,
        height:160,
        sortorder:'desc'
    }).navGrid('#grid_datos_unidades_pager',{add:false, edit:false, del:false});
}

function crea_grilla_responsables_trib(tmp){
	$("#grid_datos_responsables_trib"+tmp).jqGrid({
		colNames:datos_responsables_trib_grid.colNames(),
		colModel:datos_responsables_trib_grid.colModel(),
		autowidth: false,
		height: 180,
		pager: $('#grid_datos_responsables_trib_pager'+tmp),
		caption:"Otros Responsables del Objeto:",
		postData: datos_responsables_trib_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
	}).navGrid('#grid_datos_responsables_trib_pager'+tmp,{add:false, edit:false, del:false});
}