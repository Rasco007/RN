function inicializarEventos(){
    $('.numerico').keypress(function(tecla){
        if(tecla.charCode<48 || tecla.charCode>57){
            if(tecla.charCode !== 44 && tecla.charCode !== 46){
                return false;
            }
        }
    });

    $("#n_cuit").mask("99-99999999-9");

    $('#lupa_d_denominacion').hide();
    $('#lupa_d_objeto_hecho_2').hide();

    $('#n_cuit').change(function(){
        if($('#n_cuit').val()){
            $("#n_cuit").mask("99-99999999-9");
            $('#lupa_d_objeto_hecho_2').show()
            $('#mascara_lupa_d_objeto_hecho_2').hide();

            if(!$('#d_denominacion').val()){
                //AUTOCOMPLETE_DENOM_CON_CUIT
                // $.ajax({
                //     type:'POST',
                //     url: FUNCIONES_BASEPATH+'maestro_abm.php',
                //     data:{      
                //      "p_n_cuit": limpia_cuit($('#n_cuit').val()),
                //      "id_menu":v_id_menu,
                //      "n_orden":3
                //     },
                //     dataType:'json',
                //     success: function( data ) {
                //         if(data.resultado == 'OK'){
                //           $('#id_contribuyente').val(data.p_id_contribuyente);
                //           $('#d_denominacion').val(data.p_d_denominacion);
                //           $('#n_documento').val(data.p_n_documento);
                //           $('#c_tipo_doc').val(data.p_c_tipo_documento);
                //           $('#c_tipo_doc').blur();
                //         }
                //         else{
                //             mostrar_cuadro('E', 'Error', data.resultado);
                //             return;
                //         }
                //     }
                // }); 
                if ($('#n_cuit').val() != ''){
                    try{
                        if( limpia_cuit($('#n_cuit').val()).length == 11 ){
                            $.ajax({
                                type:'POST',
                                url: "ajax_genericos/autocomplete.php",
                                data: {oper:'3',term: limpia_cuit($('#n_cuit').val())},
                                dataType: 'json',
                                success: function( data ) {
                                    ajax_autocomplete = null;
                                    if(data) {
                                        $("#d_denominacion").val(data.data_raz[0].razon_social);
                                        $("#id_contribuyente").val(data.data_raz[0].id_contribuyente);
                                    }
                                }
                            });
                
                        }else{
                            $('#btn_limpiar').click();
                        }
                    }catch(err){
                    }
                }
            }
        } else{
            $('#lupa_d_objeto_hecho_2').hide();
            $('#mascara_lupa_d_objeto_hecho_2').show();
        }
    });

    $('#d_denominacion').on('keydown focusout', function (event) {
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

    $('#d_objeto_hecho_2').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 2) {
            $('#lupa_d_objeto_hecho_2').show().css('display', 'table-cell');
            $('#mascara_lupa_d_objeto_hecho_2').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_objeto_hecho_2').hide();
            $('#mascara_lupa_d_objeto_hecho_2').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 2 && !$('#n_cuit').val()) {
            $('#lupa_d_objeto_hecho_2').hide();
            $('#mascara_lupa_d_objeto_hecho_2').show().css('display', 'table-cell');
        } else if(event.type === 'focusout' && $('#n_cuit').val()){
            $('#lupa_d_objeto_hecho_2').show().css('display', 'table-cell');
            $('#mascara_lupa_d_objeto_hecho_2').hide();
        } else if(event.type === 'focusout' && !$('#d_objeto_hecho_2').val()){
            $('#lupa_d_objeto_hecho_2').hide();
            $('#mascara_lupa_d_objeto_hecho_2').show().css('display', 'table-cell');
        }
    });

    $('#btn_limpiar').click(function(){
        $('#lupa_d_objeto_hecho_2').hide();
        $('#mascara_lupa_d_objeto_hecho_2').show();

        $('#n_plan_pago').val(null);
        $('#c_tipo_plan_pago').val(null);
        $('#n_cuit').val(null);
        $('#d_denominacion').val(null);
        $('#c_tipo_doc').val(null);
        $('#d_tipo_doc').val(null);
        $('#n_documento').val(null);
        $('#c_tipo_imp').val(null);
        $('#d_tipo_imp').val(null);
        $('#d_objeto_hecho_2').val(null);
        $('#id_contribuyente').val(null);

        $('#n_plan_pago').prop('disabled', false);
        $('#c_tipo_plan_pago').prop('disabled', false);
        $('#n_cuit').prop('disabled', false);
        $('#d_denominacion').prop('disabled', false);
        $('#c_tipo_doc').prop('disabled', false);
        $('#d_tipo_doc').prop('disabled', false);
        $('#n_documento').prop('disabled', false);
        $('#c_tipo_imp').prop('disabled', false);
        $('#d_tipo_imp').prop('disabled', false);
        $('#d_objeto_hecho_2').prop('disabled', false);

        if($('#etiqueta_tab_detalle').hasClass('active')){
            $('#etiqueta_tab_detalle').removeClass('active');
            $('#btn_tab_resumen').trigger('click');
        }
        else if($('#etiqueta_tab_cuotas').hasClass('active')){
            $('#etiqueta_tab_cuotas').removeClass('active');
            $('#btn_tab_resumen').trigger('click');
        }

        v_no_carga_inicial_pp = false;
        v_grid_detalle_cargada = false;
        v_grid_cuotas_cargada = false;
        filtros_no_nativos_ar['resumen_grid'] = [];
        //$('#resumen_grid').clearGridData();
        setea_parametros('#resumen_grid', { ':p_d_objeto_hecho': '1',
                                                                    ':p_id_contribuyente':null,
                                                                    ':p_n_documento':null,
                                                                    ':p_c_tipo_documento':null,
                                                                    ':p_c_tipo_imponible':null,
                                                                    ':p_n_plan_pago':null,
                                                                    ':p_c_tipo_plan_pago':null});
        $('#detalle_grid').clearGridData();
        $('#cuotas_grid').clearGridData();
        $(window).resize();

        $('#btn_tab_detalle').removeAttr('data-toggle');
        $('#btn_tab_cuotas').removeAttr('data-toggle');

        $('#etiqueta_tab_detalle').addClass('tab-deshabilitado');
        $('#etiqueta_tab_cuotas').addClass('tab-deshabilitado');


    });

    $('#btn_buscar').click(function(){
        //BUSQUEDA_CONTRIBUYENTE
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_c_tipo_imponible": $('#c_tipo_imp').val(),
             "p_d_objeto_hecho": $('#d_objeto_hecho').val(),
             "p_n_cuit": limpia_cuit($('#n_cuit').val()),
             "p_n_documento": $('#n_documento').val().replace(/\./g, ''),
             "p_c_tipo_documento": $('#c_tipo_doc').val(),
             "id_menu": v_id_menu,
             "n_orden":0
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    $('#id_contribuyente').val(data.p_id_contribuyente);

                    //VALIDA_NULOS
                    $.ajax({
                        type:'POST',
                        url: FUNCIONES_BASEPATH+'maestro_abm.php',
                        data:{      
                         "p_id_contribuyente": $('#id_contribuyente').val(),
                         "p_d_objeto2": $('#d_objeto_hecho_2').val(),
                         "p_imponible": $('#c_tipo_imp').val(),
                         "p_n_plan_pago": $('#n_plan_pago').val(),
                         "id_menu":v_id_menu,
                         "n_orden":1
                        },
                        dataType:'json',
                        success: function( data ) {
                            if(data.resultado == 'OK'){
                                filtros_no_nativos_ar['resumen_grid'] = [];

                                if($('#n_documento').val() != ''){
                                    filtros_no_nativos_ar['resumen_grid'].push('Nro.Documento: ' + $('#n_documento').val());
                                }
                                if($('#c_tipo_doc').val() != ''){
                                    filtros_no_nativos_ar['resumen_grid'].push('Tipo Documento: ' + $('#c_tipo_doc').val());
                                }
                                if($('#d_denominacion').val() != ''){
                                    filtros_no_nativos_ar['resumen_grid'].push('Denominación: ' + $('#d_denominacion').val());
                                }
                                if($('#n_cuit').val() != ''){
                                    filtros_no_nativos_ar['resumen_grid'].push('CUIT: ' + $('#n_cuit').val());
                                }
                                if($('#n_plan_pago').val() != ''){
                                    filtros_no_nativos_ar['resumen_grid'].push('Nro.de Plan de Pago: ' + $('#n_plan_pago').val());
                                }
                                if($('#d_objeto_hecho_2').val() != ''){
                                    filtros_no_nativos_ar['resumen_grid'].push('Objeto/Hecho: ' + $('#d_objeto_hecho_2').val());
                                }

                                $('#btn_tab_detalle').attr('data-toggle', 'tab');
                                $('#btn_tab_cuotas').attr('data-toggle', 'tab');
                                setea_parametros('#resumen_grid', { ':p_d_objeto_hecho': $('#d_objeto_hecho_2').val(),
                                                                    ':p_id_contribuyente':$('#id_contribuyente').val(),
                                                                    ':p_n_documento':$('#n_documento').val().replace(/\./g, ''),
                                                                    ':p_c_tipo_documento':$('#c_tipo_doc').val(),
                                                                    ':p_c_tipo_imponible':$('#c_tipo_imp').val(),
                                                                    ':p_n_plan_pago':$('#n_plan_pago').val(),
                                                                    ':p_c_tipo_plan_pago':$('#c_tipo_plan_pago').val()});

                            
                                bloquear_filtros();
                            }
                            else{
                                mostrar_cuadro('E', 'Error', data.resultado);
                                return;
                            }
                        }
                    }); 
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    })

    $('#btn_tab_detalle').click(function(){
        if($('#n_plan_pago').val() && $('#c_tipo_plan_pago').val() && !v_grid_detalle_cargada){
            setea_parametros('#detalle_grid', {':p_n_plan_pago':$('#n_plan_pago').val(),
                                            ':p_c_tipo_plan_pago': $('#c_tipo_plan_pago').val()});
            $(window).resize();
            v_grid_detalle_cargada = true;
        } else{
            $(window).resize();
        }
    });

    $('#btn_tab_resumen').click(function(){
        $('#detalle_grid').clearGridData();
        $('#cuotas_grid').clearGridData();
        v_grid_detalle_cargada = false;
        v_grid_cuotas_cargada = false;
        $(window).resize();
    })

    $('#btn_tab_cuotas').click(function(){
        if($('#n_plan_pago').val() && $('#c_tipo_plan_pago').val() && !v_grid_cuotas_cargada){
            setea_parametros('#cuotas_grid', {':p_n_plan_pago':$('#n_plan_pago').val(),
                                            ':p_c_tipo_plan_pago': $('#c_tipo_plan_pago').val()});
            $(window).resize();
            v_grid_cuotas_cargada = true;
        } else {
            $(window).resize();
        }
    })

    $('#btn_honorarios').click(function(){
        let row_id = $('#resumen_grid').getGridParam('selrow');
        let c_tributo = $('#resumen_grid').getCell(row_id, 'c_tributo');

        if(c_tributo == 110){
            setea_parametros('#honorarios_grid', {':p_n_plan_pago':$('#n_plan_pago').val()});
            setea_parametros('#relacionados_grid', {':p_n_plan_pago':$('#n_plan_pago').val()});
        } else{
            mostrar_cuadro('I', 'Atención', 'Debe seleccionar una fila con Tributo 110 - Honorarios');
            return;
        }
    })

    $('#btn_volver_honorarios').click(function(){
        $('#honorarios_modal').hide();
        $('#honorarios_grid').clearGridData();
        $('#relacionados_grid').clearGridData();
        $('#d_denominacion_rc').val(null);
        $('#d_caracter_rc').val(null);
        $('#d_acredita_rc').val(null);
    });

    $('#btn_reactivar').click(function(){
        //chequea_reactivacion
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_c_tipo_plan_pago": $('#c_tipo_plan_pago').val(),
             "p_n_plan_pago": $('#n_plan_pago').val(),
             "id_menu":v_id_menu,
             "n_orden":2
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    mostrar_cuadro('Q', 'Confirmación',
                    "¿Desea REACTIVAR este plan?",
                    function(){
                        reactivar_plan();
                    },
                    function(){}, 500);
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    });
}