function inicializarEventos() {
    $('#n_cuit').mask('99-99999999-9');

    $('#btn_buscar').click(function () {
        
        
        if ($('#frm_consulta').validationEngine('validate')){

            var validaFecha = $.inArray($('#f_actualizacion').val(), disabledDays);        
            if (validaFecha != -1){
                mostrar_validacion("La Fecha de Actualización no puede ser feriado o fin de semana.");
                return;
            }

           // $('#i_saldo_total').val(0);
            setea_parametros('#main_grid',{':p_f_actualizacion':$('#f_actualizacion').val(),
                ':p_deuda':$('#c_deuda').val(),
                ':p_id_contribuyente':$('#id_contribuyente').val(),
                ':p_f_notificacion':$('#f_notificacion').val(),
                ':p_f_origen':$('#f_generacion').val(),
                ':p_id_infraccion':$('#tipo_multa').val(),
                ':p_estado':$('#c_estado').val(),
                ':p_pfp':$('#pfp_vig').val(),
                ':p_juicio':$('#juicio_vig').val(),
                ':p_id_inspeccion':$('#tipo_inspeccion').val()});
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

    
    $("#f_actualizacion").datepicker("option","beforeShowDay",function(date){
        return noWeekendsOrHolidays(date,disabledDays);
    });

    $('#f_actualizacion').datepicker("option",'minDate',fecha_hoy).change(function () {
        if ($.datepicker.parseDate('dd/mm/yy', $(this).val()) < $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
            mostrar_error("La Fecha ingresada no puede ser Menor a la fecha actual.");
            $(this).val(fecha_hoy);
        }
    });

    $('#f_actualizacion').datepicker('setDate',fecha_hoy);

    $('#btn_emitir_boleta').click(function () {
        var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
        if (!rowid){
            mostrar_validacion('Debe seleccionar un registro de la grilla');
        }else{
            $('#id_obligacion_emitir').val($("#main_grid").getCell(rowid,'id_obligacion_multa'));
            $('#modal_emitir_boleta').modal('show');
        }
    });
/*
    $('#btn_emitir_boleta').click(function () {
        var ids = new Array();
        ids = $("#main_grid").getGridParam('selarrrow');

        if(ids.length > 0){
            var n_rows_invalidas = 0;
            var rows_invalidas = new Array();
            var ids_instancias = "";

            ids.forEach(rowid => {
                var saldo = $("#main_grid").getCell(rowid,'i_saldo');
                if(parse(saldo) <= 0){
                    rows_invalidas.push(rowid);
                    n_rows_invalidas += 1;
                }else{
                    if (ids_instancias == ""){
                        ids_instancias = $("#main_grid").getCell(rowid,'id_obligacion_multa');
                    }else {
                        ids_instancias = ids_instancias +'|'+ $("#main_grid").getCell(rowid,'id_obligacion_multa');
                    }
                }
            });

            if(n_rows_invalidas > 0){
                mostrar_cuadro('V','Atención',"No es posible incluir multas saldadas en la Emisión de Boleta.<br>Fila/s: "+rows_invalidas.join(","),null,null,450);
            }else{
                $('#id_boletas_emitir').val(ids_instancias);
                $('#modal_emitir_boleta').modal('show');
            }
        }else{
            mostrar_cuadro('V','Atención','Debe seleccionar al menos un registro de la grilla.');
        }
    });*/

    $('#btn_limpiar').click(function(){
        $('#frm_consulta :input').val(null);
        $('#tipo_inspeccion, #tipo_multa, #c_estado, #pfp_vig, #juicio_vig, #c_deuda').selectpicker('refresh');
        $('#f_actualizacion').datepicker('setDate', fecha_hoy);
        $('#btn_emitir_boleta').hide();
      //  $('#i_saldo_total').val(0);
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

    if($("#id_contribuyente").val()){
        $("#btn_buscar").click();
    }
}