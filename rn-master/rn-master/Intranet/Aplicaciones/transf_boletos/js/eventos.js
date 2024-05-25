$(document).ready(function () {
	$(".cuit").mask("99-99999999-9");
	$(".documento").mask("99999999999");
	$('.numero').keypress(function (tecla) {
		return (tecla.charCode >= 48 && tecla.charCode <= 57);
	});

	$('.datepicker').datepicker({
		dateFormat:'dd/mm/yy', 
		changeMonth:true, 
		changeYear:true, 
		dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'], 
		monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']}
	).mask("99/99/9999");
	
	$("#d_denominacion_new").autocomplete({
        source: function (request, response) {
            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type: 'POST',
                    url: "transf_boletos/autocomplete.php",
                    data: {p_oper: 'denominacion', filtro: request.term,
                		p_id_contribuyente: $("#id_contribuyente_old").val(),
                		p_c_tributo: p_tributo,
                		p_d_objeto_hecho: $("#d_objeto_hecho").val(),
                		p_uso: p_uso},
                    dataType: 'json',
                    success: function (data) {
                        ajax_autocomplete = null;
                        if (data) {
                            response(
                                $.map(data.data_contrib, function (item) {
                                    return {
                                        label: item.label,
                                        value: item.razon_social,
                                        cuit: item.cuit,
                                        id_contribuyente: item.id_contribuyente,
                                        c_tipo_documento: item.c_tipo_documento,
                                        d_tipo_documento: item.d_tipo_documento,
                                        n_documento: item.n_documento
                                    }
                                })
                            );
                        }
                    }
                });
        },
        minLength: 1,
        select: function (event, ui) {
            $("#d_denominacion_new").val(ui.item.value);
            $("#n_cuit_new").val(ui.item.cuit);
            $("#id_contribuyente_new").val(ui.item.id_contribuyente);
            $("#c_tipo_documento_new").val(ui.item.c_tipo_documento);
            $("#d_tipo_documento_new").val(ui.item.d_tipo_documento);
            $("#n_documento_new").val(ui.item.n_documento);
        	buscar_datos();
        	busca_delegacion();
            return false;
        }
    });

	$('#btn_buscar').click(function(){
		if (p_tributo == tributo_auto){
			if (!$('#d_objeto_hecho').val() && !$('#d_dominio_anterior').val()){
				mostrar_validacion('Ingrese un Dominio o Dominio Anterior para realizar la búsqueda.');
				return;
			}
			if ($('#d_objeto_hecho').val() && !$('#d_verif_dom').val()){
				mostrar_cuadro('V', 'Atención', 'Debe ingresar el Dígito Verificador del Dominio.',null,null,400);
				return;
			}
			if ($('#d_dominio_anterior').val() && !$('#d_verif_dom_ant').val()) {
				mostrar_cuadro('V', 'Atención', 'Debe ingresar el Dígito Verificador del Dominio Anterior.',null,null,400);
				return;
			}
			if ($('#d_objeto_hecho').val() != ""){
				check_digito_verificador($('#d_objeto_hecho').val(), $('#d_verif_dom').val());
			}
			else if ($('#d_dominio_anterior').val() != ""){
				check_digito_verificador($('#d_dominio_anterior').val(), $('#d_verif_dom_ant').val());
			}
		}else{
			if (!$('#frm_busqueda').validationEngine('validate')){
				return;
			}
			realizar_busqueda();
		}
	});
	
	$('#btn_limpiar').click(function(){
		$("#btn_buscar").attr('disabled',false);
		$("input").val(null);
		$("#frm_busqueda input").attr('disabled',false);
		$("#datos_transferencia").hide();
		$("#lupa_objeto,#lupa_dom_ant").show();
		$("#btn_sin_cuit, #btn_con_cuit, #btn_responsables").attr('disabled',true);
		$("#frm_busqueda, #frm_cont_nuevo, #frm_datos_transf").validationEngine('hideAll');
	})
	
	$('#n_cuit_new').change(function() {
        n_cuit_focusout();
    });

    $('#n_documento_new').change(function() {
        n_documento_focusout();
    });

    ////////////////////////////////////////////// botones //////////////////////////////////////////////
	$("#btn_con_cuit").click(function(){
		contrib_con_cuit();
	});

	$("#btn_sin_cuit").click(function(){
		contrib_sin_cuit();
	});

	$("#btn_responsables").click(function(){
		responsables();
	});

	$("#btn_legajo_contribuyente").click(function(){
		legajo_contribuyente();
	});

	$("#btn_confirmar").click(function(){
		confirmar();
	});
    ////////////////////////////////////////////// botones //////////////////////////////////////////////

	////////////////////////////////////////////// lupas //////////////////////////////////////////////
	if (p_tributo == tributo_auto){
		$("#lupa_objeto").lupa_generica({
			id_lista: v_lista_objetos,
			titulos:['Dominio','Dominio anterior'],
			grid:[{index:'objeto',width:200},
				{index:'objeto_anterior',width:200}],
			caption:'Dominios',
			sortname:'objeto',
			sortorder:'asc',
			campos:{objeto:'d_objeto_hecho'},
			filtros:['#d_objeto_hecho'],
			filtrosNulos:[false],
			filtrosTitulos:['Dominio']
		});

		$("#lupa_dom_ant").lupa_generica({
			id_lista: v_lista_dom_ant,
			titulos:['Dominio anterior','Dominio'],
			grid:[{index:'d_patente_vieja',width:200},
				{index:'d_patente',width:200}],
			caption:'Dominios',
			sortname:'d_patente_vieja',
			sortorder:'asc',
			campos:{d_patente_vieja:'d_dominio_anterior'},
			filtros:['#d_dominio_anterior'],
			filtrosNulos:[false],
			filtrosTitulos:['Dominio anterior']
		});
	}else{
		$("#lupa_objeto").lupa_generica({
			id_lista: v_lista_objetos,
			titulos:['Objeto','Objeto anterior'],
			grid:[{index:'objeto',width:200},
				{index:'objeto_anterior',width:200}],
			caption:'Objetos',
			sortname:'objeto',
			sortorder:'asc',
			campos:{objeto:'d_objeto_hecho',objeto_anterior:'d_nomenclatura_real'},
			filtros:['#d_objeto_hecho'],
			filtrosNulos:[true],
			searchCode:true,
            searchInput: '#d_objeto_hecho',
            keyNav:true,
            exactField: 'objeto',
			notFoundDialog: false
		});
	}

    $("#lupa_tipo_documento").lupa_generica({
		id_lista:v_lista_tipo_documentos,
		titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_dato',width:100},
			{index:'d_dato',width:350}],
		caption:'Tipos de Documento',
		sortname:'c_dato',
		sortorder:'asc',
		campos:{c_dato:'c_tipo_documento_new',d_dato:'d_tipo_documento_new'},
		searchCode:true,
		searchInput: '#c_tipo_documento_new',
		keyNav:true,
		exactField: 'c_dato'
	});

    $("#lupa_tipo_domicilio").lupa_generica({
		id_lista:v_lista_domicilios,
		titulos:['C&oacute;digo','Tipo Domicilio','Domicilio'],
		grid:[{index:'c_codigo',width:100}, {index:'d_descrip',width:150},
			{index:'domi',width:350}],
		caption:'Domicilios',
		sortname:'c_codigo',
		sortorder:'asc',
		campos:{c_codigo:'c_tipo_domicilio_new',d_descrip:'d_tipo_domicilio_new'},
		filtros:['#id_contribuyente_new'],
		filtrosTitulos:['Contribuyente Nuevo'],
		searchCode:true,
		searchInput: '#c_tipo_domicilio_new',
		keyNav:true,
		exactField: 'c_codigo'
	});

    $("#lupa_motivo").lupa_generica({
        id_lista: v_lista_motivos,
        titulos:['Código','Motivo','',''],
        grid:[{index:'c_dato',width:100},{index:'d_dato',width:350},
        	{index:'n_tabla',width:100,hidden:true},{index:'d_dato2',width:350,hidden:true}],
        caption:'Motivos de Transferencia',
        sortname:'d_dato',
        sortorder:'asc',
        campos:{c_dato:'c_motivo',d_dato:'d_motivo'},
        filtros:[p_tributo, '#id_contribuyente_old',
    		'#id_contribuyente_new', p_sin_restricciones],
		filtrosTitulos:['p_tributo','Contribuyente Anterior','Contribuyente Nuevo','p_sin_restricciones'],
        searchCode:true,
        searchInput: '#c_motivo',
        keyNav:true,
        exactField: 'c_dato',
        onClose:function(){
        	if (p_uso == 'T' && p_tributo == 90){
			  	if ($("#c_motivo").val() == '24' || $("#c_motivo").val() == '38'){
			 		$("#c_rnpa").prop('disabled',false);
					$("#lupa_rnpa").show();
			  	}else{
		 			$("#c_rnpa").prop('disabled',true);
					$("#lupa_rnpa").hide();
				}
	 			$("#c_rnpa, #d_rnpa").val(null);
			}
        }
    });

    $("#lupa_rnpa").lupa_generica({
        id_lista: v_lista_rnpa,
        titulos:['Código','RNPA',''],
        grid:[{index:'c_dato',width:100},{index:'d_dato',width:350},
        	{index:'n_tabla',width:100,hidden:true}],
        caption:'RNPA',
        sortname:'d_dato',
        sortorder:'asc',
        campos:{c_dato:'c_rnpa',d_dato:'d_rnpa'},
        searchCode:true,
        searchInput: '#c_rnpa',
        keyNav:true,
        exactField: 'c_dato'
    });

    $("#lupa_delegacion").lupa_generica({
        id_lista: v_lista_delegaciones,
        titulos:['Código','Descripci&oacute;n',''],
        grid:[{index:'c_dato',width:100},{index:'d_dato',width:350},
        	{index:'n_tabla',width:200,hidden:true}],
        caption:'Delegaciones',
        sortname:'c_dato',
        sortorder:'asc',
        campos:{c_dato:'c_delegacion',d_dato:'d_delegacion'},
        filtros:['#id_contribuyente_new','#d_objeto_hecho',p_tributo],
        filtrosTitulos:['Contribuyente Nuevo','Objeto','p_tributo'],
        searchCode:true,
        searchInput: '#c_delegacion',
        keyNav:true,
        exactField: 'c_dato'
    });
    ////////////////////////////////////////////// lupas //////////////////////////////////////////////
});