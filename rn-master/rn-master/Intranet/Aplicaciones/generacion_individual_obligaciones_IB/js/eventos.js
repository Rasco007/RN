function init_eventos(){

    $("#n_cuit").mask("99-99999999-9");
    $('#lupa_nombre').hide();

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

    $('#f_periodo_desde').focusout(function(){
        var f_periodo_desde = $('#f_periodo_desde').val();
        if(f_periodo_desde !== ''){
            valida_periodo('f_periodo_desde', f_periodo_desde);
        }
    });

    $('#f_periodo_hasta').focusout(function(){
        var f_periodo_hasta = $('#f_periodo_hasta').val();
        if(f_periodo_hasta !== ''){
            valida_periodo('f_periodo_hasta',f_periodo_hasta);
        }
    });

    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() !== ''){
            if($('#c_tributo').val() && $('#c_concepto').val()){
                autocompleta_contrib_por_cuit_tributo_concepto();
                return;
            }
            if( limpia_cuit($('#n_cuit').val()).length === 11 ){
                autocompleta_contrib_por_cuit();
            }else{
                limpiar_datos_contribuyente();
            }
        }
    });

    $('#documento').focusout(function(){
        if($('#c_tributo').val() && $('#c_concepto').val() && $('#c_documento').val()){
            autocompleta_contrib_por_doc_tributo_concepto();
            return;
        }
        if ($('#documento').val() !== '' && $('#c_documento').val() !== ''){
            autocompleta_contrib_por_doc();
        }
    });

    $('#c_documento').focusout(function(){
        if($('#c_tributo').val() && $('#c_concepto').val() && $('#documento').val()){
            autocompleta_contrib_por_doc_tributo_concepto();
            return;
        }
        if ($('#documento').val() !== '' && $('#c_documento').val() !== ''){
            autocompleta_contrib_por_doc();
        }
    });

    $('#obj_hecho').focusout(function(){
        if($('#c_tributo').val() && $('#c_concepto').val() && $('#c_tipo_imponible').val()){
            autocompleta_contrib_por_obj_tributo_concepto();
        }
    });

    $('#btn_generar').click(function(){

        var valido = $('#frm_generacion_individual').validationEngine('validate');
        if(valido) {
            var params = {
                p_c_tributo : $('#c_tributo').val(),
                p_c_concepto : $('#c_concepto').val(),
                p_pos_desde : $('#f_periodo_desde').val(),
                p_pos_hasta : $('#f_periodo_hasta').val(),
                p_id_contribuyente :$('#id_contribuyente').val(),
                p_obj_hecho: $('#obj_hecho').val(),
                p_estado: null
            };
            generar(params);
        }
    });

    $('#btn_cancelar').click(function(){
        limpiar_generador_individual();
        limpiar_datos_contribuyente();
    });
}

