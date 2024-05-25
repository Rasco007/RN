$(document).ready(function () {

	$("#n_cuit").mask("99-99999999-9");

	$("#div_f_rendicion_con").show();

	$('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");
    
	$('#btn_limpiar').click(function(){
		$('#frm_busqueda input, #frm_busqueda2 input, #frm_busqueda2 textarea').val(null);
		$("#f_emision").val(f_emision);
	})
	
	$("#btn_imprimir").click(function(){
		var valido = $('#frm_busqueda').validationEngine('validate');
		if(valido){
			valido = $('#frm_busqueda2').validationEngine('validate');
			if(valido){
				imprimir_certificado();
			}
		}
	});

	$('#n_cuit',"#frm_busqueda").change(function(){
		n_cuit_focusout();
	});

	$("#d_denominacion","#frm_busqueda").autocomplete({
		source: function( request, response ) {
			if (ajax_autocomplete) ajax_autocomplete.abort();
			ajax_autocomplete =
				$.ajax({
					type:'POST',
					url: "emision_libre_deuda/autocomplete.php",
					data: {p_oper:'denominacion', filtro: request.term},
					dataType: 'json',
					success: function( data ) {
						ajax_autocomplete = null;
						if(data) {
							response(
								$.map(data.data_contrib, function( item ) {
									return {
										label: item.label,
										cuit: item.cuit,
										value: item.razon_social,
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
		minLength:1,
		select:function(event,ui){
			$("#n_cuit").val(ui.item.cuit);
			$("#d_denominacion").val(ui.item.value);
			$("#id_contribuyente").val(ui.item.id_contribuyente);
			$("#c_tipo_documento").val(ui.item.c_tipo_documento);
			$("#d_tipo_documento").val(ui.item.d_tipo_documento);
			$("#n_documento").val(ui.item.n_documento);
			return false;
		}
	});

	$("#lupa_c_tributo").lupa_generica({
		id_lista:v_lista_tributos,
		titulos:['Código','Tributo','Código Tipo Imponible'],
		grid:[{index:'c_tributo',width:100},
			{index:'d_descrip',width:350},
			{index:'c_tipo_imponible',width:100, hidden:true}],
		caption:'Tributos',
		sortname:'c_tributo',
		sortorder:'asc',
		campos:{c_tributo:'c_tributo',d_descrip:'d_tributo',c_tipo_imponible:'c_tipo_imponible'},
		keyNav:true,
		exactField: 'c_tributo',
		searchCode: true,
		searchInput: "#c_tributo"
	});

	$("#lupa_d_objeto").lupa_generica({
		id_lista:v_lista_objetos,
		titulos:['Objeto'],
		grid:[{index:'d_objeto_hecho',width:200}],
		caption:'Objetos',
		sortname:'d_objeto_hecho',
		sortorder:'asc',
		filtros:['#id_contribuyente','#c_tributo','#d_objeto'],
		filtrosTitulos:['Contribuyente','Tributo','Objeto'],
		filtrosNulos:[true,false,true],
		campos:{d_objeto_hecho:'d_objeto'},
		keyNav:true,
		exactField: 'd_objeto_hecho',
		onClose:function(){
			if($("#c_tributo").val() == 60){
				$.ajax({
					url: "emision_libre_deuda/autocomplete.php",
					type:"POST",
					data:{ p_oper:'plano', filtro: $('#d_objeto',"#frm_busqueda").val()},
					success: function(response){
						$('#main').procOverlay({visible:false});
						var res = JSON.parse(response);
						if (res){
							$("#n_plano_mensura").val(res['N_PLANO_MENSURA']);
						}
						$.ajax({
				            type:'POST',
				            url: FUNCIONES_BASEPATH+'maestro_abm.php',
				            data:{      
				            	"p_objeto_hecho":$("#d_objeto").val(),
				            	"id_menu":10908,
				            	"n_orden":1
				            },
				            dataType:'json',
				            success: function( data ) {
				                if(data.resultado == 'OK'){
				                	$("#n_cuit").val(data.p_cuit);
								    $("#d_denominacion").val(data.p_denominacion);
								    $("#id_contribuyente").val(data.p_id_contribuyente);
								    $("#c_tipo_documento").val(data.p_c_tipo_doc);
								    $("#n_documento").val(data.p_n_documento);
								    $("#d_tipo_documento").val(data.p_d_tipo_doc);
				                }else{
				                    mostrar_error(data.resultado);
				                    return;
				                }
				            }
				        });
					}
				});
			}
		}
	});

	$("#lupa_c_motivo").lupa_generica({
		id_lista:v_lista_motivos,
		titulos:['Código','Motivo','n_tabla'],
		grid:[{index:'c_dato',width:100}, {index:'d_dato',width:350}, {index:'n_tabla',width:100, hidden:true}],
		sortname:'c_dato',
		sortorder:'asc',
		campos:{c_dato:'c_motivo',d_dato:'d_motivo'},
		keyNav:true,
		searchCode: true,
		searchInput: "#c_motivo",
		exactField: "c_dato"
	});

	$("#lupa_c_delegacion").lupa_generica({
		id_lista:v_lista_delegaciones,
		titulos:['Código','Delegación'],
		grid:[{index:'c_dato',width:150}, {index:'d_dato',width:350}],
		sortname:'c_dato',
		sortorder:'asc',
		campos:{c_dato:'c_delegacion',d_dato:'d_delegacion'},
		keyNav:true,
		searchCode: true,
		searchInput: "#c_delegacion",
		exactField: "c_dato"
	});
});