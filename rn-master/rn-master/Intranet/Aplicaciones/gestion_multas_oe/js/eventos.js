var ajax_autocomplete = null;
$(document).ready(function() {

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

    $("#f_actualizacion").datepicker("setDate" , fecha_hoy);
    $("#f_actualizacion").datepicker( "option", "minDate", 0);
    $("#f_notificacion_diag").datepicker( "option", "maxDate", 0);    

    $('#f_emision').datepicker("option",'minDate',fecha_hoy).datepicker("option",'maxDate',fecha_max_emision).change(function () {
        if ($.datepicker.parseDate('dd/mm/yy', $(this).val()) < $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
            mostrar_error("La Fecha ingresada no puede ser Menor a la fecha actual.");
            $(this).val(fecha_hoy);
        }
    });

    $(".input_fecha").datepicker("option","beforeShowDay",function(date){
        return noWeekendsOrHolidays(date,disabledDays);
    });

    $('#n_cuit').mask('99-99999999-9');

    $(".mascara_importe").each(function () {
        var events = $._data(this, 'events');
        if (events && events['keydown']) return;
        $(this).keydown(function (event) {
            if ($(this).prop('readonly')) return;
            return controla_number(event, this, 2);
        });

    }).css('text-align', 'right');

     //Completamos Datos del Contribuyente
    $("#d_denominacion").autocomplete({
        source: function( request, response ) {
            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                type:'POST',
                url: "ajax_genericos/autocomplete.php",
                data: {term: request.term, oper:1},
                dataType: 'json',
                success: function( data ) {
                    ajax_autocomplete = null;
                    if(data) {
                        response(
                            $.map(data.data_raz, function( item ) {
                                return {
                                    label: item.razon_social + ' - ' + item.cuit,
                                    value: item.razon_social,
                                    cuit: item.cuit,
                                    id_contribuyente:item.id_contribuyente
                                }
                            })
                        );
                    }
                }
            });
        },
        minLength:3,
        select:function(event,ui){
            $("#d_denominacion").val(ui.item.value);
            $("#n_cuit").val(ui.item.cuit);
            $("#id_contribuyente").val(ui.item.id_contribuyente);
            return false;
        }
    });

    $('#n_cuit').change(function (){
        if ($('#n_cuit').val() && $('#n_cuit').val().length == 13){
            completarDenominacion(this.value);
        }else{
            $("#d_denominacion").val(null);
            $("#n_cuit").val(null);
            $("#id_contribuyente").val(null);
        }
    });

    $('#id_inspeccion').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
        //Si se limpia no se hace nada
        if ($('#id_inspeccion').val() != ''){
            getDatosContribFisca();
            $('#div_oblig').hide();
        }else{
            $('#div_oblig').show();
        }
    });

    $('#btn_buscar').on( "click", function(){
            var valida;
            let v_id_inspeccion_sel  = null;
            if (m_fisca == 'S'){
                v_id_inspeccion_sel = $('#id_inspeccion').val();
                valida = true;
            }else{
                valida = $('#frm_consulta').validationEngine('validate');
            }
        
            if (valida){

                var validaFecha = $.inArray($('#f_actualizacion').val(), disabledDays);        
                if (validaFecha != -1){
                    mostrar_validacion("La Fecha de Actualización no puede ser feriado o fin de semana.");
                    return;
                }               
                
                setea_parametros('#main_grid',{p_m_autoquery:'S',
                                            id_contribuyente:$('#id_contribuyente').val(),
                                            id_infraccion:$('#c_tipo_multa').val(),
                                            f_generacion_desde:$('#f_generacion_desde').val(),
                                            f_generacion_hasta:$('#f_generacion_hasta').val(),
                                            f_notificacion_desde:$('#f_notificacion_desde').val(),
                                            f_notificacion_hasta:$('#f_notificacion_hasta').val(),
                                            f_actualizacion:$('#f_actualizacion').val(),
                                            p_id_inspeccion: v_id_inspeccion_sel
                                    });
                $('#frm_consulta input').attr('readonly', 'readonly');
                $('#frm_consulta .datepicker').attr('disabled', 'disabled');
                $('#frm_consulta select').attr('disabled','disabled');
            }
    });

    $('#btn_limpiar').click(function(){       
        $('#frm_consulta input').not('.datepicker').attr('readonly', false);
        $('#frm_consulta input').not('.datepicker').val(null);
        $('#frm_consulta .datepicker:not(#f_actualizacion)').val(null).attr('readonly', false);;
        $('#frm_consulta select').val(null);
       
        $('#frm_consulta .datepicker').attr('disabled', false);
        $('#frm_consulta select').attr('disabled',false);
        $('#frm_consulta .selectpicker').selectpicker('refresh');
        $('#main_grid').jqGrid('clearGridData');
    });

    //BOTONERA DE APLICACION
    $('.btn_accion').click(function (e) { 
        e.preventDefault();
        var selrow = $('#main_grid').jqGrid ('getGridParam', 'selrow');
        if (!selrow){
            mostrar_validacion('Debe seleccionar un registro');
            return;
        }else{  
            if($('#main_grid').jqGrid ('getCell', selrow, 'c_instancia') == '037'){
                mostrar_validacion('La multa ha sido anulada.');
                return;
            }          
            var fun_valida = $(this).attr('fun-valida');
            switch (fun_valida){
                case 'oblig':
                    if(!$('#main_grid').jqGrid ('getCell',selrow,  'id_obligacion_multa')){
                        mostrar_validacion('La multa debe estar notificada.');
                        return;
                    }
                    break;
                case 'noOblig':
                    if($('#main_grid').jqGrid ('getCell', selrow, 'id_obligacion_multa')){
                        mostrar_validacion('La multa ya ha sido notificada.');
                        return;
                    }
                    break;
                default:
                    break;
            }
            limpiaCamposModal('#frm_'+$(this).attr('id') + '_modal');
            var monto = $('#main_grid').jqGrid ('getCell', selrow, 'i_multa_sin_descuento');
            var id_multa = $('#main_grid').jqGrid ('getCell', selrow, 'id_multa');
            var n_instancia = $('#main_grid').jqGrid ('getCell', selrow, 'n_instancia');
            var n_orden = $('#main_grid').jqGrid ('getCell', selrow, 'n_orden');
            var id_obligacion_multa = $("#main_grid").getCell(selrow,'id_obligacion_multa');
            var f_generacion = $("#main_grid").getCell(selrow,'f_origen');


            $('#i_monto','#frm_'+$(this).attr('id') + '_modal').val(monto);
            $('#id_multa','#frm_'+$(this).attr('id') + '_modal').val(id_multa);
            $('#n_instancia','#frm_'+$(this).attr('id') + '_modal').val(n_instancia);
            $('#n_orden','#frm_'+$(this).attr('id') + '_modal').val(n_orden);
            $('#i_reduccion','#frm_'+$(this).attr('id') + '_modal').val(monto);
            $('#id_obligacion_emitir','#frm_'+$(this).attr('id') + '_modal').val(id_obligacion_multa);
            $('#f_notificacion_diag', '#frm_'+$(this).attr('id') + '_modal').datepicker('option','minDate',f_generacion);



            if (m_fisca == 'S') {
                var id_infraccion = $("#main_grid").getCell(selrow,'id_infraccion');
                var id_contribuyente = $("#main_grid").getCell(selrow,'id_contribuyente');

                $('#id_infraccion_notif', '#frm_' + $(this).attr('id') + '_modal').val(id_infraccion);
                $('#id_contribuyente_notif', '#frm_' + $(this).attr('id') + '_modal').val(id_contribuyente);
                $('#f_generacion_notif', '#frm_' + $(this).attr('id') + '_modal').val(f_generacion);
            }

            $('#'+$(this).attr('id') + '_modal').modal('show');
        }
    });

    $('#f_notificacion_diag').change(function () {        
        calcularVencimiento($('#f_notificacion_diag').val());        
    });

    $('#c_valor').change(function () {
        if ($(this).val()){
            calculoDescuento($(this).val());
        }
    });

    $('#btn_confirmar_anular').click(function(){
        if ($('#frm_anular_multa_modal').validationEngine('validate')){
            mostrar_cuadro('Q','¿Esta seguro que desea anular la multa seleccionada?','Presione OK para confirmar.',
                function(){
                    anularMulta($('#n_instancia','#frm_anular_multa_modal').val(),
                                $('#n_orden','#frm_anular_multa_modal').val(),
                                $('#d_observaciones','#frm_anular_multa_modal').val()).done(function(result){
                        if (result.resultado != 'OK'){
                            mostrar_error(result.resultado);
                        }else{
                            mostrar_confirmacion('La multa ha sido eliminada exitosamente.');
                            $('#anular_multa_modal').modal("hide");
                            $('#main_grid').trigger('reloadGrid');
                        }
                    }).fail(function () {
                        mostrar_error('Ha ocurrido un error al intentar anular la multa.');                    
                    });
                },
                function(){},
                null,400
            );
        }
    });

    $('#btn_notificar_multa').click(function(){
        if ($('#frm_notificar_multa_modal').validationEngine('validate')){
            mostrar_cuadro('Q','¿Esta seguro que desea notificar la multa seleccionada?','Presione OK para confirmar.',
                function(){

                    notificarMulta($('#n_instancia','#frm_notificar_multa_modal').val(),
                                $('#n_orden','#frm_notificar_multa_modal').val(),
                                $('#f_notificacion_diag','#frm_notificar_multa_modal').val(),
                                $('#c_valor','#frm_notificar_multa_modal').val()).done(function(result){
                        if (result.resultado != 'OK'){
                            mostrar_error(result.resultado);
                        }else{
                            mostrar_confirmacion('La multa ha sido notificada exitosamente.');
                            $('#notificar_multa_modal').modal("hide");
                            $('#main_grid').trigger('reloadGrid');
                        }
                    }).fail(function () {
                        mostrar_error('Ha ocurrido un error al intentar notificar la multa.');                    
                    });
                },
                function(){},
                null,400
            );
        }
    });
    
    $('#btn_reducir_multa').click(function(){
        if ($('#frm_reducir_multa_modal').validationEngine('validate')){
            mostrar_cuadro('Q','¿Esta seguro que desea reducir la multa seleccionada?','Presione OK para confirmar.',
                function(){
                    reducirMulta($('#n_instancia','#frm_reducir_multa_modal').val(),
                                $('#n_orden','#frm_reducir_multa_modal').val(),
                                $('#i_reduccion','#frm_reducir_multa_modal').val(),
                                $('#d_observaciones','#frm_reducir_multa_modal').val()).done(function(result){
                        if (result.resultado != 'OK'){
                            mostrar_error(result.resultado);
                        }else{
                            mostrar_confirmacion('Se ha modificado el importe de la multa exitosamente.');
                            $('#reducir_multa_modal').modal("hide");
                            $('#main_grid').trigger('reloadGrid');
                        }
                    }).fail(function () {
                        mostrar_error('Ha ocurrido un error al intentar notificar la multa.');                    
                    });
                },
                function(){},
                null,400
            );
        }
    });

    /*$('#emitir_boleta').click(function(){
        var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
        $('#id_obligacion_emitir').val($("#main_grid").getCell(rowid,'id_obligacion_multa'));
        $('#modal_emitir_boleta').modal('show');
    });*/
})
