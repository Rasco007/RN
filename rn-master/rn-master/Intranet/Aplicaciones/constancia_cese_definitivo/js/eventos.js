function inicializarEventos() {

    $('#lupa_d_denominacion').hide();

    $("#n_cuit").on('input', function() {
        if($("#n_cuit").val().length > 10){
            var n_cuit = $(this).val().trim();
            $(this).val(n_cuit);
            $(this).mask("99-99999999-9");
        }
    });

    $('#d_objeto_hecho').on('keydown focusout', function (event) {
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

    $('#desc_denom').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 4) {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        }
    });

    $('#btn_imprimir').click(function(){
        if (!$('#c_tributo').val()){
            mostrar_cuadro('E', 'Error', 'El campo Tributo no puede quedar vacío.',
                null,null,400);
            return;
        }else{
            imprimir_reporte();
        }

    });

    $('#btn_limpiar').click(function(){
        $('#id_contribuyente').val(null);
        $('#n_cuit').val(null);
        $('#desc_denom').val(null);
        $('#c_tipo_documento').val(null);
        $('#d_tipo_documento').val(null);
        $('#n_documento').val(null);
        $('#c_tributo').val(null);
        $('#d_tributo').val(null);
        $('#d_objeto_hecho').val(null);
        $('#lupa_d_denominacion').hide();
        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
    });

    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() !== ''){
            if( limpia_cuit($('#n_cuit').val()).length === 11 ){
                autocompleta_contrib_por_cuit();
            }else{
                $('#id_contribuyente').val(null);
                $('#n_cuit').val(null);
                $('#desc_denom').val(null);
                $('#c_tipo_documento').val(null);
                $('#d_tipo_documento').val(null);
                $('#n_documento').val(null);
            }
        }
    });

    $('#n_documento, #c_tipo_documento').focusout(function(){
        if ($('#n_documento').val() && $('#c_tipo_documento').val()){
            autocompleta_por_doc();
        }
    });
}

