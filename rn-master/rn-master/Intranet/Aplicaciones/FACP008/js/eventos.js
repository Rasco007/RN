function inicializarEventos(){

    $('#btn_aviso_caducidad').hide();
    $('#btn_const_caducidad').hide();
    $('#operacion').val(v_operacion);

    $('.numerico').keypress(function(tecla){
        if(tecla.charCode<48 || tecla.charCode>57){
            if(tecla.charCode !== 44 && tecla.charCode !== 46){
                return false;
            }
        }
    });

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    $("#n_cuit").mask("99-99999999-9");

    $('#lupa_d_denominacion').hide();
    $('#lupa_d_objeto_hecho_2').hide();

    $('#mascara_lupa_tipo_imp').hide();
    $('#mascara_lupa_tipo_doc').hide();
    $('#mascara_lupa_n_plan_pago').hide();

    $('#n_cuit').change(function(){
        if($('#n_cuit').val()){
            $("#n_cuit").mask("99-99999999-9");
            $('#lupa_d_objeto_hecho_2').show()
            $('#mascara_lupa_d_objeto_hecho_2').hide();

            if(!$('#d_denominacion').val()){
                //AUTOCOMPLETE_DENOM_CON_CUIT
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                     "p_n_cuit": limpia_cuit($('#n_cuit').val()),
                     "id_menu":v_id_menu,
                     "n_orden":5
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                          $('#id_contribuyente').val(data.p_id_contribuyente);
                          $('#d_denominacion').val(data.p_d_denominacion);
                          $('#n_documento').val(data.p_n_documento);
                          $('#c_tipo_doc').val(data.p_c_tipo_documento);
                          $('#c_tipo_doc').blur();
                        }
                        else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                }); 
            }
        } else{
            $('#lupa_d_objeto_hecho_2').hide();
            $('#mascara_lupa_d_objeto_hecho_2').show();
        }
    });

    $('#f_caducidad').dblclick(function(){
        $('#f_caducidad').val(f_hoy);
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
        $('#lupa_d_denominacion').hide();
        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');

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

        v_total_cuotas = null;

        desbloquear_filtros();

        if($('#etiqueta_tab_detalle').hasClass('active')){
            $('#etiqueta_tab_detalle').removeClass('active');
            $('#btn_tab_resumen').trigger('click');
        }
        else if($('#etiqueta_tab_cuotas').hasClass('active')){
            $('#etiqueta_tab_cuotas').removeClass('active');
            $('#btn_tab_resumen').trigger('click');
        }

        $('#resumen_grid').clearGridData();
        $('#detalle_grid').clearGridData();
        $('#cuotas_grid').clearGridData();
        v_grid_detalle_cargada = false;
        v_grid_cuotas_cargada = false;
        v_c_caducidad_aux = null;
        v_d_caducidad = null;
        $(window).resize();

        $('#btn_tab_detalle').removeAttr('data-toggle');
        $('#btn_tab_cuotas').removeAttr('data-toggle');

        $('#etiqueta_tab_detalle').addClass('tab-deshabilitado');
        $('#etiqueta_tab_cuotas').addClass('tab-deshabilitado');

        $('#btn_aviso_caducidad').hide();
        $('#btn_const_caducidad').hide();
    });

    $('#btn_limpiar_modif').click(function(){
        $('#f_caducidad').val(null);
    });

    $('#btn_buscar').click(function(){
        //BUSQUEDA_CONTRIBUYENTE
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_c_tipo_imponible": $('#c_tipo_imp').val(),
             "p_d_objeto_hecho": $('#d_objeto_hecho_2').val(),
             "p_n_cuit": limpia_cuit($('#n_cuit').val()),
             "p_n_documento": $('#n_documento').val().replace(/\./g, ""),
             "p_c_tipo_documento": $('#c_tipo_doc').val(),
             "id_menu":v_id_menu,
             "n_orden":0
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    $('#id_contribuyente').val(data.p_id_contribuyente);

                    //valida_nulos_pp
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
                                $('#btn_tab_detalle').attr('data-toggle', 'tab');
                                $('#btn_tab_cuotas').attr('data-toggle', 'tab');

                                filtros_arr_remesas = [];
                                filtros_no_nativos_ar = [];
                                
                                if($('#n_plan_pago').val()){
                                    filtros_arr_remesas.push('Nro. Plan de Pago: '+ $('#n_plan_pago').val());
                                }
                                if($('#c_tipo_plan_pago').val()){
                                    filtros_arr_remesas.push('Tipo Plan de Pago: '+ $('#c_tipo_plan_pago').val());
                                }
                                if($('#n_cuit').val()){
                                    filtros_arr_remesas.push('CUIT: '+ $('#n_cuit').val());
                                }
                                if($('#d_denominacion').val()){
                                    filtros_arr_remesas.push('Denominacion: '+ $('#d_denominacion').val());
                                }
                                if($('#c_tipo_doc').val()){
                                    filtros_arr_remesas.push('Tipo Documento: '+ $('#c_tipo_doc').val());
                                }
                                if($('#n_documento').val()){
                                    filtros_arr_remesas.push('Nro. Documento: '+ $('#n_documento').val());
                                }
                                if($('#c_tipo_imp').val()){
                                    filtros_arr_remesas.push('Tipo Imponible: '+ $('#c_tipo_imp').val());
                                }
                                if($('#d_objeto_hecho_2').val()){
                                    filtros_arr_remesas.push('Objeto / Hecho: '+ $('#d_objeto_hecho_2').val());
                                }
                                filtros_no_nativos_ar['resumen_grid'] = filtros_arr_remesas;


                                setea_parametros('#resumen_grid', { ':p_id_contribuyente':$('#id_contribuyente').val(),
                                                                    ':p_d_objeto_hecho':$('#d_objeto_hecho_2').val(),
                                                                    ':p_n_documento':$('#n_documento').val().replace(/\./g, ""),
                                                                    ':p_c_tipo_documento':$('#c_tipo_doc').val(),
                                                                    ':p_c_tipo_imponible':$('#c_tipo_imp').val(),
                                                                    ':p_n_plan_pago':$('#n_plan_pago').val(),
                                                                    ':p_c_tipo_plan_pago': $('#c_tipo_plan_pago').val()})

                                bloquear_filtros();
                            }
                            else{
                                mostrar_cuadro('E', 'Error', data.resultado.replace(/ERR-00001:/g,""));
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
            filtros_arr_remesas = [];
            filtros_no_nativos_ar = [];
                                
            if($('#n_plan_pago').val()){
                filtros_arr_remesas.push('Nro. Plan de Pago: '+ $('#n_plan_pago').val());
            }
            if($('#c_tipo_plan_pago').val()){
                filtros_arr_remesas.push('Tipo Plan de Pago: '+ $('#c_tipo_plan_pago').val());
            }
                                
            filtros_no_nativos_ar['detalle_grid'] = filtros_arr_remesas;
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
            filtros_arr_remesas = [];
            filtros_no_nativos_ar = [];
                                
            if($('#n_plan_pago').val()){
                filtros_arr_remesas.push('Nro. Plan de Pago: '+ $('#n_plan_pago').val());
            }
            if($('#c_tipo_plan_pago').val()){
                filtros_arr_remesas.push('Tipo Plan de Pago: '+ $('#c_tipo_plan_pago').val());
            }
                                
            filtros_no_nativos_ar['cuotas_grid'] = filtros_arr_remesas;
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
            filtros_arr_remesas = [];
            filtros_no_nativos_ar = [];
                                
            if($('#n_plan_pago').val()){
                filtros_arr_remesas.push('Nro. Plan de Pago: '+ $('#n_plan_pago').val());
            }
                                
            filtros_no_nativos_ar['honorarios_grid'] = filtros_arr_remesas;
            setea_parametros('#honorarios_grid', {':p_n_plan_pago':$('#n_plan_pago').val()});
                    
            filtros_no_nativos_ar['relacionados_grid'] = filtros_arr_remesas;
            setea_parametros('#relacionados_grid', {':p_n_plan_pago':$('#n_plan_pago').val()});
        } else{
            mostrar_cuadro('I', 'Atención', 'Debe seleccionar una fila con Tributo 110 - Honorarios');
            return;
        }
    })


    $("#honorarios_modal").on('hidden.bs.modal', function () {
        $('#honorarios_grid').clearGridData();
        $('#relacionados_grid').clearGridData();
        $('#d_denominacion_rc').val(null);
        $('#d_caracter_rc').val(null);
        $('#d_acredita_rc').val(null);
    });

    $('#btn_aviso_caducidad').click(function(){
        imprimir_reporte_aviso_caduc();
    });

    $('#btn_const_caducidad').click(function(){
        imprimir_reporte_constancia_caduc();
    });

    $('#btn_guardar_modif').click(function(){
        
        //MODIFICACION_CADUC_ANUL
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_f_caducidad": $('#f_caducidad').val(),
             "p_c_caducidad": $('#c_caducidad').val(),
             "p_id_contribuyente": $('#id_contribuyente').val(),
             "p_n_plan_pago": $('#n_plan_pago').val(),
             "p_c_tipo_plan_pago": $('#c_tipo_plan_pago').val(),
             "id_menu":v_id_menu,
             "n_orden":3
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado === 'OK'){
                    actualizacion_anulacion_caducidad();
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                }
            }
        }); 
    });

    $("#modificacion_modal").on('hidden.bs.modal', function () {
        $('#f_caducidad').val(null);
        $('#c_caducidad').val(null);
        $('#d_caducidad').val(null);
        $('#c_caducidad').prop('disabled', false);
    });
}