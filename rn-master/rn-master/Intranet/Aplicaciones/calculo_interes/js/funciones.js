// $("#btn_calcular").click();
// $("#main_grid").getGridParam('selrow');
// $("#main_grid").getCell(id_grid,'d_objeto_hecho');

$(document).ready(function() {
	$('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    // $("#n_importe").focusout(function(){
    // 	$("#n_importe").val(redondear($(this).val()));
    // })
    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        postData: datos_main_grid.postData(),
        pager: $('#main_grid_pager'),
        caption: "Cuenta Corriente",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        sortname: 'f_movimiento',
        sortorder: 'desc'
    }).navGrid('#main_grid_pager', {add:false,edit:false,del:false});

    $("#btn_buscar").click(function(){
		if($("#frm_consulta").validationEngine('validate')){
			$("#f_actualizacion").attr('readonly',true);
			$("#btn_buscar").attr('disabled',true);

			setea_parametros('#main_grid',{
                ':id_contribuyente': $("#id_contribuyente").val(),
                ':f_actualizacion': $("#f_actualizacion").val()
            });
		}
    });

    $("#btn_buscar").click(function(){
    	$("#f_actualizacion").attr('readonly',true);
    	$("#btn_buscar").attr('disabled',true);
    	$.ajax({
			type: 'POST',
			url: 'calculo_interes/calcular_interes.php',
			data: {
				"id_obligacion": $("#id_obligacion").val(),
				"f_actualizacion": $("#f_actualizacion").val()
			},
			dataType: 'json',
			success: function(data) {
				if (data.resultado == 'OK') {
					$("#i_f_pago").val(data.i_f_pago);
					$("#i_total").val(data.i_total);

					$("#i_f_actualizacion").val(data.i_f_actualizacion);
					$("#i_total_actualizado").val(data.i_total_actualizado);
				} else {
					mostrar_error(data.error);
					return;
				}
			}
		});
    });

    $("#btn_cambiar_fecha").click(function(){
    	$("f_actualizacion").val('');
    	$("#f_actualizacion").attr('readonly',false);
    	$("#btn_buscar").attr('disabled',false);
    });

    $("#btn_buscar").click();
})