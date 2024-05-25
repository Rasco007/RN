function init_eventos(){

    $("#f_periodo_desde").mask("9999/99");

    $('#f_periodo_desde').focusout(function(){
        if($('#f_periodo_desde').val() !== ''){
            valida_periodo(limpia_f_periodo($('#f_periodo_desde').val()));
        }
    });

    $('#lupa_nombre').hide();

    $('#nombre').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
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
        if ($('#n_cuit').val() !== ''){
            if( limpia_cuit($('#n_cuit').val()).length === 11 ){
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
                limpiar_datos_objeto();
            }
        }
    });


    $('#obj_hecho').keydown(function(){
        if ($('#obj_hecho').val() !== '' && $('#c_tributo').val() !== ''){
                $.ajax({
                    type:'POST',
                    url: "recalculo_obligaciones/php/autocomplete.php",
                    data: {oper:'obj_hecho', term: $('#c_tributo').val(), term1:$('#obj_hecho').val()},
                    dataType: 'json',
                    success: function( data ) {
                            ajax_autocomplete = null;
                            if(data) {
                                $("#nombre").val(data.DENOMINACION);
                                $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                                $("#n_cuit").val(data.CUIT);
                                $("#c_documento").val(data.C_TIPO_DOCUMENTO);
                                $("#c_tipo_imponible").val(data.C_TIPO_IMPONIBLE);
                                $("#d_tipo_imponible").val(data.D_TIPO_IMPONIBLE);
                                $("#documento").val(data.N_DOCUMENTO);
                                $("#d_documento").val(data.D_DOCUMENTO);
                            }
                        
                    }
                });
        }
    });
    $('#obj_hecho').focusout(function(){
        if ($('#obj_hecho').val() !== '' && $('#c_tributo').val() !== ''){
                $.ajax({
                    type:'POST',
                    url: "recalculo_obligaciones/php/autocomplete.php",
                    data: {oper:'obj_hecho', term: $('#c_tributo').val(), term1:$('#obj_hecho').val()},
                    dataType: 'json',
                    success: function( data ) {
                            ajax_autocomplete = null;
                            if(data) {
                                $("#nombre").val(data.DENOMINACION);
                                $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                                $("#n_cuit").val(data.CUIT);
                                $("#c_documento").val(data.C_TIPO_DOCUMENTO);
                                $("#c_tipo_imponible").val(data.C_TIPO_IMPONIBLE);
                                $("#d_tipo_imponible").val(data.D_TIPO_IMPONIBLE);
                                $("#documento").val(data.N_DOCUMENTO);
                                $("#d_documento").val(data.D_DOCUMENTO);
                            }
                        
                    }
                });
        }
    });

    $('#c_tributo, #n_cuit').focusout(function(){
        if ($('#c_tributo').val() !== '' && $('#n_cuit').val() !== ''){
            autocompleta_tipo_imp_y_obj();
        }
    });

    $('#documento, #c_documento').focusout(function(){
        if ($('#documento').val() !== '' && $('#c_documento').val() !== ''){
            autocompleta_contrib_por_doc();
        }
    });

    $('#c_tributo').focusout(function(){
        if ($('#c_tributo').val() === '90'){
            document.getElementById('checkbox_tipo_ajuste').disabled  = true;
            $("#f_periodo_desde").attr('disabled',true);
            $('#f_periodo_desde').removeClass("validate[required]");
        }else{
            document.getElementById('checkbox_tipo_ajuste').disabled  = false;
            $("#f_periodo_desde").attr('disabled',false);
            $('#f_periodo_desde').addClass("validate[required]");
        }
    });

    $('#btn_cancelar').click(function(){
        $('#div_input_tributo :input').val(null);
        $('#f_periodo_desde').val(null);
        limpiar_datos_objeto();
    });

    $('#btn_cta_cte').click(function(){
        if($('#obj_hecho').val() !== '' && $('#c_tributo').val() !== '' && $('#obj_hecho').val() !== ''){
            post_to_url('consulta_cuenta_corr.php',
            {
                    'p_n_id_menu': 10852,
                    'p_m_autoquery': 'S',
                    'd_objeto_hecho':$('#obj_hecho').val(),
                    'c_tributo': $('#c_tributo').val(),
                    'c_tipo_imponible': $('#c_tipo_imponible').val(),
            },
            '_blank', 'POST');
        }else{
            mostrar_cuadro('I', 'Información', 'Debe ingresarse Tributo, Tipo Imponible y Objeto/Hecho para consultar Cuenta Corriente.', '', '', 300, 200);
        }
    });

    $('#btn_exenciones').click(function(){
        var params = {
            p_c_tributo : $('#c_tributo').val(),
            p_obj_hecho: $('#obj_hecho').val()
        };
        llama_exena(params);
    });

    $('#btn_bonificaciones').click(function(){
        var params = {
            p_c_tributo : $('#c_tributo').val(),
            p_obj_hecho: $('#obj_hecho').val()
        };
        llama_bonif(params);
    });

    $('#btn_recalcular').click(function(){
        var valido = $('#frm_recalculo_obligaciones').validationEngine('validate');
        if(valido) {
            var params = {
                p_genera_ajuste : $('#checkbox_tipo_ajuste').val(),
                p_c_motivo_ajuste : $('#c_tipo_ajuste').val(),
                p_c_tributo : $('#c_tributo').val(),
                p_obj_hecho: $('#obj_hecho').val(),
                p_periodo : limpia_f_periodo($('#f_periodo_desde').val()),
                p_id_contribuyente :$('#id_contribuyente').val(),
            };
            generar_recalculo(params);
        }

    });
}

function mostrar_ocultar_tipo_ajuste() {
    const div = document.getElementById('div_input_tipo_ajuste');

    const checkbox = document.getElementById('checkbox_tipo_ajuste');
    if (checkbox.checked) {
        checkbox.value = "S";
        div.style.display = 'block';
    } else {
        checkbox.value = "N";
        div.style.display = 'none';
    }
}

function valida_periodo(f_periodo) {

    if (!/^\d+$/.test(f_periodo)) {
        $('#f_periodo_desde').val('');
        mostrar_cuadro('I', 'Advertencia', 'El campo debe tener formato 9999/99.', '', '', 300, 200);
        return;
    }

    if (f_periodo.length === 4){
        if(f_periodo < 1993){
            mostrar_cuadro('E', 'Error', 'El año debe ser de 1993 en adelante.', '', '', 300, 200);
            $('#f_periodo_desde').val('');
            return;
        }else{
            $('#f_periodo_desde').val(f_periodo * 100 +1)
            $("#f_periodo_desde").mask("9999/99");
        }
    }else{
        if(f_periodo.substr(0,4) < 1993){
            mostrar_cuadro('E', 'Error', 'El año debe ser de 1993 en adelante.', '', '', 300, 200);
            $('#f_periodo_desde').val('');
            return;
        }
        if(f_periodo.substr(4,2) < 1 || f_periodo.substr(4,2) > 12){
            mostrar_cuadro('E', 'Error', 'El mes debe estar entre 1 y 12.', '', '', 300, 200);
        }
    }
}



