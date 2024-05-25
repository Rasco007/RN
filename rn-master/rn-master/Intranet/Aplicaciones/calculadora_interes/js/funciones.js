$(document).ready(function() {
	$('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

	$("#f_origen").datepicker("option","onClose", function (selectedDate,obj) {
		$("#f_actualizacion").datepicker("option", "minDate", selectedDate);
	});

	$("#f_actualizacion").datepicker("option","onClose", function (selectedDate,obj) {
		$("#f_origen").datepicker("option", "maxDate", selectedDate);
	});

    $("#n_importe").focusout(function(){
    	$("#n_importe").val(redondear($(this).val()));
    });

    $("#btn_calcular").click(function(){
		if($("#frm_consulta").validationEngine('validate')){
			$("#frm_consulta .limpar").attr('readonly',true);
	    	$.ajax({
				type: 'POST',
				url: FUNCIONES_BASEPATH + 'maestro_abm.php',
				data: {
					"i_actualizar": $("#n_importe").val(),
					"f_desde": $("#f_origen").val(),
					"f_actualizacion": $("#f_actualizacion").val(),
					"indice": $("#c_indice").val(),
					"id_menu": v_id_menu,
					"n_orden": 0
				},
				dataType: 'json',
				success: function(data) {
					if (data.resultado == 'OK') {
						$("#n_interes").val(redondear(data.retorno));
						$("#n_total").val(redondear(parseFloat(data.retorno)+parse($("#n_importe").val())));
					} else {
						mostrar_error(data.resultado);
						return;
					}
				}
			});
		}
    });

    $("#btn_limpiar").click(function(){
    	$("input").val('');
    	$("#frm_consulta .limpar").attr('readonly',false);
    })

	$("#btn_lupa_indice").lupa_generica({
        id_lista:lista_indices,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_dato',width:100},
            {index:'d_dato',width:450}],
        caption:'Índices',
        sortname:'c_dato',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_indice',
        exactField: 'c_dato',
        campos:{c_dato:'c_indice',d_dato:'d_indice'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label"
    });
})