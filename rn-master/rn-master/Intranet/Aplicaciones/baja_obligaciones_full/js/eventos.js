function init_eventos(){
    $("#n_cuit").mask("99-99999999-9");
    $("#f_periodo_desde").mask("9999/99");
    $("#f_periodo_hasta").mask("9999/99");
    $('#lupa_obj_hecho').hide();
    $('#lupa_nombre').hide();


    $('#f_periodo_desde').focusout(function(){
        if($('#f_periodo_desde').val() !== ''){
            valida_periodo('f_periodo_desde', limpia_f_periodo($('#f_periodo_desde').val()));
        }
    });

    $('#f_periodo_hasta').focusout(function(){
        if($('#f_periodo_hasta').val() !== ''){
            valida_periodo('f_periodo_hasta',limpia_f_periodo($('#f_periodo_hasta').val()));
        }
    });

    $('#obj_hecho').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 2) {
            $('#lupa_obj_hecho').show().css('display', 'table-cell');
            $('#mascara_lupa_obj_hecho').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_obj_hecho').hide();
            $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 2) {
            $('#lupa_obj_hecho').hide();
            $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
        }
    });

    $('#nombre').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 5) {
            $('#lupa_nombre').show().css('display', 'table-cell');
            $('#mascara_lupa_nombre').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_nombre').hide();
            $('#mascara_lupa_nombre').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 2) {
            $('#lupa_nombre').hide();
            $('#mascara_lupa_nombre').show().css('display', 'table-cell');
        }
    });

    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() != ''){
            if( limpia_cuit($('#n_cuit').val()).length == 11 ){
                $.ajax({
                    type:'POST',
                    url: "generacion_individual_obligaciones_IB/php/autocomplete.php",
                    data: {oper:'cuit', term: limpia_cuit($('#n_cuit').val())},
                    dataType: 'json',
                    success: function( data ) {
                        if(data.resultado === 'OK'){
                            ajax_autocomplete = null;
                            if(data) {
                                $("#nombre").val(data.DENOMINACION);
                                $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                                $("#c_documento").val(data.C_TIPO_DOCUMENTO);
                                $("#documento").val(data.N_DOCUMENTO);
                                $("#d_documento").val(data.D_DOCUMENTO);
                            }
                        }else{
                            mostrar_cuadro('E', 'Error', 'Error al buscar el CUIT');
                            return;
                        }
                    }
                });
            }else{
                limpiar_datos_contribuyente();
            }
        }
    });

    $('#c_tributo, #n_cuit').focusout(function(){
        if ($('#c_tributo').val() !== '' && $('#n_cuit').val() !== ''){
            autocompleta_tipo_imp_y_obj();
        }
    });

    $('#documento, #c_documento').focusout(function(){
        if ($('#documento').val() != '' && $('#c_documento').val() != ''){
            autocompleta_contrib_por_doc();
        }
    });

    $('#btn_eliminar').click(function(){

        var valido = $('#frm_baja_obligaciones_full').validationEngine('validate');
        if(valido) {

            const desde = new Date($('#f_periodo_desde').val() + '/01');
            const hasta = new Date($('#f_periodo_hasta').val() + '/01');

            if(desde > hasta){
                mostrar_error('La  Posición Fiscal Desde no puede ser mayor a la  Posición Fiscal Hasta', 'E', true);
                $('#f_periodo_desde').val('');
                return;
            }else{
                var params = {
                    p_id_contribuyente :$('#id_contribuyente').val(),
                    p_c_tipo_imponible : $('#c_tipo_imponible').val(),
                    p_obj_hecho: $('#obj_hecho').val(),
                    p_c_tributo : $('#c_tributo').val(),
                    p_c_concepto : $('#c_concepto').val(),
                    p_periodo : limpia_f_periodo($('#f_periodo_desde').val()),
                    p_periodo_hasta : limpia_f_periodo($('#f_periodo_hasta').val()),
                    p_full : v_valida_agrup
                };
                eliminar(params);
            }
        }
    });

    $('#btn_cancelar').click(function(){
        limpiar_eliminador();
        limpiar_datos_contribuyente();
    });



}



