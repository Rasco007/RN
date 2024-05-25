function inicializarEventos() {
    $('#n_cuit').mask('99-99999999-9');

    $('#btn_buscar').click(function () {
        if ($('#frm_consulta').validationEngine('validate')){

            var validaFecha = $.inArray($('#f_actualizacion').val(), disabledDays);        
            if (validaFecha != -1){
                mostrar_validacion("La Fecha de Actualización no puede ser feriado o fin de semana.");
                return;
            }

            setea_parametros('#main_grid',{':p_f_actualizacion':$('#f_actualizacion').val(),
                ':p_deuda':$('#c_deuda').val(),
                ':p_d_dominio':$('#d_dominio').val(),
                ':p_id_contribuyente':$('#id_contribuyente').val(),
                ':p_c_concepto':$("#c_concepto").val()});
        }
    });

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999").change(function () {
        if ($(this).val().length != 10){
            mostrar_error("El Formato de la Fecha ingresada no es válido.");
            $(this).val(null);
        }
    });

    $('#f_actualizacion').datepicker("option",'minDate',fecha_hoy).change(function () {
        if ($.datepicker.parseDate('dd/mm/yy', $(this).val()) < $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
            mostrar_error("La Fecha ingresada no puede ser Menor a la fecha actual.");
            $(this).val(fecha_hoy);
        }
    });

    $('#f_actualizacion').datepicker('setDate',fecha_hoy);
    
    $("#f_actualizacion").datepicker("option","beforeShowDay",function(date){
        return noWeekendsOrHolidays(date,disabledDays);
    });

    $('#btn_limpiar').click(function(){
        $('#frm_consulta :input').val(null);
        $('#c_deuda').selectpicker('refresh');
        $('#f_actualizacion').datepicker('setDate', fecha_hoy);
        $('#main_grid').jqGrid('clearGridData');
    });

    //Completamos Datos del Contribuyente
    $("#d_denominacion").autocomplete({
        source: function( request, response ) {

            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "cons_multas_oe/autocomplete.php",
                    data: {p_oper:'getAutocomplete',p_filtro: request.term},
                    dataType: 'json',
                    success: function( data ) {
                        ajax_autocomplete = null;
                        if(data) {
                            response(
                                $.map(data.data_contrib, function( item ) {
                                    return {
                                        label: item.label,
                                        value: item.razon_social,
                                        cuit: item.cuit,
                                        id_contribuyente: item.id_contribuyente
                                    }
                                })
                            );
                        }
                    }
                });
        },
        minLength:1,
        select:function(event,ui){
            $("#d_denominacion").val(ui.item.value);
            $("#n_cuit").val(ui.item.cuit);
            $("#id_contribuyente").val(ui.item.id_contribuyente);
            $("#d_dominio").val(null);
            return false;
        }
    });

    $('#n_cuit').change(function (){
        if ($('#n_cuit').val() && $('#n_cuit').val().length == 13){
            completarDenominacion();
        }else{
            $("#d_denominacion").val(null);
            $("#n_cuit").val(null);
            $("#id_contribuyente").val(null);
        }
    });
}