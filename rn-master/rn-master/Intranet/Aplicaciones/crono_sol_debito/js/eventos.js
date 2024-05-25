function inicializarEventos() {
    $('#btn_buscar').click(function () {
        var valido = $("#frm_busqueda").validationEngine('validate');
        if(valido){
			$('#n_anio').attr('disabled',true);
            setea_parametros('#crono_grid',{
                'p_forma_pago': $('#c_forma_pago_filtro').val(),
                'p_n_anio': $('#n_anio').val()
            },'S');
            $('#grid_wrapper').show();
            if(p_id_workflow_log){
                actualizar_tarea_workflow(p_id_workflow_log, p_c_tarea, 'R', 0, 'N');
            }
        }
    });
   
    $('#btn_limpiar').click(function(){
        $('#c_forma_pago_filtro').val('');
        $('#d_forma_pago_filtro').val('');
        $('#n_anio').val('');
        $('#n_anio').attr('disabled',false);
        $('#grid_wrapper').hide();
        $('#c_forma_pago_filtro').val(p_forma_pago);
        $('#c_forma_pago_filtro').blur();
    });

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");
}