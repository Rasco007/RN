function inicializarEventos(){
    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");
    
    $('.numerico').keypress(function(tecla){
        if(tecla.charCode<48 || tecla.charCode>57){
            if(tecla.charCode !== 44 && tecla.charCode !== 46){
                return false;
            }
        }
    });

    $(".mascara_importe").focusout(function () {
        $(this).val(formatea_number(mascara_numero(parse($(this).val()).toFixed(2), ',', -1, 2), ''));
        if($(this).val() == '0,00'){
            $(this).val(null);
        }
    }).css('text-align', 'right');

    if(p_c_tipo_form){
        $('#c_tipo_form').val(p_c_tipo_form);
        $('#c_tipo_form').blur();
    }
    if(p_c_tributo){
        $('#c_tributo').val(p_c_tributo);
        $('#c_tributo').blur();
    }
    if(p_c_concepto){
        $('#c_concepto').val(p_c_concepto);
    }

    $('#etiqueta_tab_retenciones').hide();
    $('#etiqueta_tab_percepciones').hide();
    $('#etiqueta_tab_sellos').hide();

    $('#f_presentacion').val(v_f_hoy);
    $('#mascara_lupa_tipo_form').hide();
    $('#mascara_lupa_cuit').hide();
    $('#mascara_lupa_tributo').hide();
    $('#mascara_lupa_concepto').hide();
    $('#mascara_lupa_pos_fiscal').hide();

    $('#lupa_objeto_hecho').hide();
    $('#lupa_denominacion_per').hide();
    $('#lupa_denominacion_ret').hide();

    $("#n_cuit").mask("99-99999999-9");
    $("#n_cuit_per").mask("99-99999999-9");
    $("#n_cuit_ret").mask("99-99999999-9");
    $("#n_cuit_sellos").mask("99-99999999-9");

    $('#d_objeto_hecho').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 2) {
            $('#lupa_objeto_hecho').show().css('display', 'table-cell');
            $('#mascara_lupa_objeto_hecho').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_objeto_hecho').hide();
            $('#mascara_lupa_objeto_hecho').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 2) {
            $('#lupa_objeto_hecho').hide();
            $('#mascara_lupa_objeto_hecho').show().css('display', 'table-cell');
        }
    });

    $('#d_denominacion_per').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            $('#lupa_denominacion_per').show().css('display', 'table-cell');
            $('#mascara_lupa_denominacion_per').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_denominacion_per').hide();
            $('#mascara_lupa_denominacion_per').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 4) {
            $('#lupa_denominacion_per').hide();
            $('#mascara_lupa_denominacion_per').show().css('display', 'table-cell');
        }
    });

    $('#d_denominacion_ret').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            $('#lupa_denominacion_ret').show().css('display', 'table-cell');
            $('#mascara_lupa_denominacion_ret').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_denominacion_ret').hide();
            $('#mascara_lupa_denominacion_ret').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 4) {
            $('#lupa_denominacion_ret').hide();
            $('#mascara_lupa_denominacion_ret').show().css('display', 'table-cell');
        }
    });

    //FILTROS

    $('#btn_limpiar').click(function(){
        if($('#c_tipo_form').val() || $('#c_tributo').val() || $('#c_concepto').val() || $('#d_objeto_hecho').val()
            || $('#n_cuit').val() || $('#d_denominacion').val() || $('#n_pos_fiscal').val() || $('#n_cuota').val() || $('#id_obligacion').val() || $('#d_presentacion').val()){
            if(v_hay_cambios = 'S'){
                mostrar_cuadro_cambios();
            } else{
                limpiar_form();
            }
        }
    });

    $('#btn_cancelar_cambios').click(function(){
        $('#guardar_cambios_modal').hide();
    });

    $('#btn_guardar_cambios').click(function(){
        $('#guardar_cambios_modal').hide();
        if($('#n_pos_fiscal').val()){
            $('#btn_grabar').trigger('click');
        } else{
            if(!$('#c_tipo_form').val()){
                mostrar_cuadro('E', 'Error', 'El campo Formulario no puede quedar vacío');
            }
            if(!$('#f_presentacion').val()){
                mostrar_cuadro('E', 'Error', 'El campo Fecha de Presentación no puede quedar vacío');
            }
            if(!$('#c_tributo').val()){
                mostrar_cuadro('E', 'Error', 'El campo Tributo no puede quedar vacío');
            }
            if(!$('#c_concepto').val()){
                mostrar_cuadro('E', 'Error', 'El campo Concepto no puede quedar vacío');
            }
            if(!$('#d_objeto_hecho').val()){
                mostrar_cuadro('E', 'Error', 'El campo Nro. Inscripción no puede quedar vacío');
            }
        }
    });

    $('#btn_no_guardar_cambios').click(function(){
        $('#guardar_cambios_modal').hide();
        if($('#n_pos_fiscal').val()){
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_c_tipo_form": $('#c_tipo_form').val(),
                 "p_id_ddjj": $('#id_ddjj').val(),
                 "p_id_obligacion": $('#id_obligacion').val(),
                 "id_menu":v_id_menu,
                 "n_orden":10
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                      $('#errores_grid').clearGridData();
                      $('#errores_modal').hide();
                      borrar_tabla_temporal();
                      v_hay_cambios = 'N';
                      limpiar_form();
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        } else{
            v_hay_cambios = 'N';
            limpiar_form();
        }
    });

    $('#btn_grabar').click(function(){
        
        let v_total_retenido = null;
        let v_ti_retencion_ret = null;
        let v_f_retencion = null;
        let v_total_percibido = null;
        let v_f_cobranza = null;
        let v_total_sellos = null;
        let v_ti_retencion_sellos = null;
        let v_ti_retencion_per = null

        let v_n_comprobante = $('#d_comprobante').val();

        if($('#c_tipo_form').val() == v_form_ret || $('#c_tipo_form').val() == v_form_ret1){
            v_total_retenido = $('#total_retenido').val();
            v_ti_retencion_ret = $('#ti_retencion_ret').val();
            v_f_retencion = $('#retenciones_grid').getCell(1, 'f_retencion')
        }
        else if($('#c_tipo_form').val() == v_form_per){
            v_total_percibido = $('#total_percibido').val();
            v_f_cobranza = $('#percepciones_grid').getCell(1, 'f_cobranza');
            v_ti_retencion_per = $('#ti_retencion_per').val();
        } else{
            v_total_sellos = $('#total_sellos').val();
            v_ti_retencion_sellos = $('#ti_retencion_sellos').val();
        }

        if(!$('#d_comprobante').val()){
            v_n_comprobante = 0;
        }

        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_id_obligacion": $('#id_obligacion').val(),
             "p_f_presentacion": $('#f_presentacion').val(),
             "p_c_tipo_form": $('#c_tipo_form').val(),
             "p_c_tributo": $('#c_tributo').val(),
             "p_c_concepto": $('#c_concepto').val(),
             "p_d_objeto_hecho": $('#d_objeto_hecho').val(),
             "p_n_cuit": limpia_cuit($('#n_cuit').val()),
             "p_n_posicion_fiscal": $('#n_pos_fiscal').val(),
             "p_id_contribuyente": $('#id_contribuyente').val(),
             "p_n_cuota": $('#n_cuota').val(),
             "p_aux_hijos_ret": $('#aux_hijos_ret').val(),
             "p_aux_hijos_per": $('#aux_hijos_per').val(),
             "p_tot_retenido": v_total_retenido,
             "p_ti_retencion": v_ti_retencion_ret,
             "p_f_retencion": v_f_retencion,
             "p_id_ddjj": $('#id_ddjj').val(),
             "p_tot_percibido": v_total_percibido,
             "p_f_cobranza": v_f_cobranza,
             "p_tot_retenido_per": v_total_sellos,
             "p_n_secuencia_pres": $('#n_secuencia_pres').val(),
             "p_ti_retencion_per": v_ti_retencion_per,
             "p_ti_retencion_ddjj": v_ti_retencion_sellos,
             "p_n_secuencia_obl": $('#n_secuencia_obl').val(),
             "p_n_comprobante": v_n_comprobante,
             "id_menu":v_id_menu,
             "n_orden":8
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    v_m_favor_rentas = data.p_m_favor_rentas;
                    v_i_saldo_declarado = data.p_i_saldo_declarado;
                    v_hay_cambios = 'S';
                  if(data.p_m_erronea == 'N'){
                    borrar_tabla_temporal();
                    limpiar_form();
                    mostrar_cuadro('I', 'Información', data.p_mensaje_salida);
                  } else{
                    ver_errores();
                  }
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    });

    $('#btn_grabar_errores').click(function(){
        borrar_tabla_temporal();
        $('#errores_grid').clearGridData();
        $('#errores_modal').hide();
        v_hay_cambios = 'N';
        limpiar_form();
        mostrar_cuadro('S', 'Exito', 'DDJJ Grabada');
    });

    $('#btn_volver_errores').click(function(){
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_c_tipo_form": $('#c_tipo_form').val(),
             "p_id_ddjj": $('#id_ddjj').val(),
             "p_id_obligacion": $('#id_obligacion').val(),
             "id_menu":v_id_menu,
             "n_orden":10
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                  $('#errores_grid').clearGridData();
                  $('#errores_modal').hide();
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    });

    $('#c_tipo_form').change(function(){
        if($('#c_tipo_form').val()){
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_c_tipo_form": $('#c_tipo_form').val(),
                 "p_d_tipo_form": $('#d_tipo_form').val(),
                 "id_menu": v_id_menu,
                 "n_orden": 0
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                      $('#c_tributo').val(data.p_c_tributo);
                      $('#d_tributo').val(data.p_d_tributo);
                      $('#c_tributo').blur();

                      if(data.p_d_leyenda){
                        $('#d_leyenda').text(data.p_d_leyenda);
                      }
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 
        }
    });

    $('#d_comprobante').focusout(function(){
        if(!$('#d_comprobante').val()){
            $('#d_comprobante').val(0);
        }
    });

    $('#n_cuit').focusout(function(){
        if($('#n_cuit').val()){
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_n_cuit": limpia_cuit($('#n_cuit').val()),
                 "p_c_tributo": $('#c_tributo').val(),
                 "p_c_concepto": $('#c_concepto').val(),
                 "p_d_objeto_hecho": $('#d_objeto_hecho').val(),
                 "id_menu":v_id_menu,
                 "n_orden":1
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        if(!$('#d_objeto_hecho').val()){
                            $('#d_objeto_hecho').val(data.p_d_objeto_hecho);
                            $('#id_contribuyente').val(data.p_id_contribuyente);
                        }
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 
        }
    });

    $('#n_pos_fiscal').focusout(function(){
        if($('#n_pos_fiscal').val()){
            validar_pos_fiscal();
        }
    });

    $('#d_objeto_hecho').focusout(function(){
        if(!$('#d_comprobante').val()){
            $('#d_comprobante').val(0);
        }
        if($('#d_objeto_hecho').val() && $('#c_tributo').val() && $('#c_concepto').val()){
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_d_objeto_hecho": $('#d_objeto_hecho').val(),
                 "p_c_tributo": $('#c_tributo').val(),
                 "p_c_concepto": $('#c_concepto').val(),
                 "id_menu":v_id_menu,
                 "n_orden":3
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        $('#id_contribuyente').val(data.p_id_contribuyente);
                        $('#n_cuit').val(data.p_n_cuit);
                        $('#d_denominacion').val(data.p_d_denominacion);
                        $("#n_cuit").mask("99-99999999-9");
                        $('#n_cuit').trigger('focusout');
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 
        }
    });

    $('#btn_tab_personales').click(function(){
        setea_parametros('#personales_grid', {':p_id_contribuyente':$('#id_contribuyente').val()});
    });

    $('#btn_tab_percepciones').click(function(){
        setea_parametros('#percepciones_grid', {':p_id_ddjj':$('#id_ddjj').val()});
        $(window).resize();
    });

    $('#btn_tab_retenciones').click(function(){
        setea_parametros('#retenciones_grid', {':p_id_ddjj':$('#id_ddjj').val()});
        $(window).resize();
    });

    $('#btn_tab_sellos').click(function(){
        setea_parametros('#sellos_grid', {':p_id_ddjj':$('#id_ddjj').val()});
        $(window).resize();
    });

    //PERCEPCIONES
    $('#btn_limpiar_per, #btn_cancelar_abm_percepciones').click(function(){
        $('#n_cuit_per').val(null);
        $('#d_denominacion_per').val(null);
        $('#d_objeto_hecho_per').val(null);
        $('#f_cobranza_per').val(null);
        $('#i_percibido_per').val(null);
        $('#i_base_imponible_per').val(null);
        $('#f_comprobante_per').val(null);
        $('#n_comprobante_per').val(null);
        $('#id_contribuyente_per').val(null);
        $('#ti_retencion_per').val(null);
        $('#total_percibido').val(null);

        $('#lupa_denominacion_per').hide();
        $('#mascara_lupa_denominacion_per').show().css('display', 'table-cell');
    });

    $('#btn_guardar_abm_percepciones').click(function(){
        if(!$('#i_base_imponible_per').val()){
            mostrar_cuadro('E', 'Error', 'Debe cargar la Base Imponible');
            return;
        }
        if(!$('#i_percibido_per').val()){
            mostrar_cuadro('E', 'Error', 'Debe cargar el Importe Percibido');
            return;
        }
        if(!$('#f_comprobante_per').val()){
            mostrar_cuadro('E', 'Error', 'Debe cargar la Fecha de Percepción');
            return;
        }
        if(!$('#n_comprobante_per').val()){
            mostrar_cuadro('E', 'Error', 'Debe cargar el número de comprobante');
            return;
        }
        if(formatear_fecha($('#f_comprobante_per').val()) != $('#n_pos_fiscal').val()){
            mostrar_cuadro('E', 'Error', 'La fecha del comprobante no corresponde a la posición fiscal');
            return;
        }

        abm_percepciones();
    });

    $('#n_cuit_per').focusout(function(){
        if($('#n_cuit_per').val() && !$('#d_objeto_hecho_per').val()){
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_campo": 'CUIT',
                 "p_n_cuit_ingresado": limpia_cuit($('#n_cuit_per').val()),
                 "p_n_cuit_agente": limpia_cuit($('#n_cuit').val()),
                 "p_id_contribuyente": null,
                 "p_d_denominacion": null,
                 "p_n_hecho": null,
                 "id_menu":v_id_menu,
                 "n_orden":7
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        $('#id_contribuyente_per').val(data.p_id_contribuyente);
                        $('#d_denominacion_per').val(data.p_d_denominacion);
                        $('#d_objeto_hecho_per').val(data.p_n_hecho);
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 
        }
    });

    $('#d_objeto_hecho_per').focusout(function(){
        if($('#d_objeto_hecho_per').val() && !$('#n_cuit_per').val()){
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_campo": 'OBJETO',
                 "p_n_cuit_ingresado": null,
                 "p_n_cuit_agente": null,
                 "p_id_contribuyente": $('#id_contribuyente_per').val(),
                 "p_d_denominacion": $('#d_denominacion_per').val(),
                 "p_n_hecho": $('#d_objeto_hecho_per').val(),
                 "id_menu":v_id_menu,
                 "n_orden":7
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        $('#n_cuit_per').val(data.p_n_cuit_ingresado);
                        $("#n_cuit_per").mask("99-99999999-9");
                        $('#d_denominacion_per').val(data.p_d_denominacion);
                        $('#id_contribuyente').val(data.p_id_contribuyente);
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    //RETENCIONES
    $('#btn_limpiar_ret, #btn_cancelar_abm_retenciones').click(function(){
        $('#n_cuit_ret').val(null);
        $('#d_denominacion_ret').val(null);
        $('#d_objeto_hecho_ret').val(null);
        $('#f_retencion_ret').val(null);
        $('#i_retenido_ret').val(null);
        $('#p_coeficiente_ret').val(null);
        $('#n_recibo_ret').val(null);
        $('#id_contribuyente_ret').val(null);
        $('#ti_retencion_ret').val(null);
        $('#total_retenido').val(null);
    });

    $('#btn_guardar_abm_retenciones').click(function(){
        if(!$('#i_retenido_ret').val()){
            mostrar_cuadro('E', 'Error', 'Debe ingresar el Importe Retenido');
            return;
        };
        if(!$('#f_retencion_ret').val()){
            mostrar_cuadro('E', 'Error', 'Debe ingresar la Fecha de Retención');
            return;
        };
        if(formatear_fecha($('#f_retencion_ret').val()) != $('#n_pos_fiscal').val()){
            mostrar_cuadro('E', 'Error', 'La fecha del comprobante no corresponde a la posición fiscal');
            return;
        }

        abm_retenciones();
    });

    $('#n_cuit_ret').focusout(function(){
        if($('#n_cuit_ret').val() && !$('#d_objeto_hecho_ret').val()){
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_campo": 'CUIT',
                 "p_n_cuit_ingresado": limpia_cuit($('#n_cuit_ret').val()),
                 "p_n_cuit_agente": limpia_cuit($('#n_cuit').val()),
                 "p_id_contribuyente": null,
                 "p_d_denominacion": null,
                 "p_n_hecho": null,
                 "id_menu":v_id_menu,
                 "n_orden":7
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        $('#id_contribuyente_ret').val(data.p_id_contribuyente);
                        $('#d_denominacion_ret').val(data.p_d_denominacion);
                        $('#d_objeto_hecho_ret').val(data.p_n_hecho);
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 
        }
    });

    $('#d_objeto_hecho_ret').focusout(function(){
        if($('#d_objeto_hecho_ret').val() && !$('#n_cuit_ret').val()){
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_campo": 'OBJETO',
                 "p_n_cuit_ingresado": null,
                 "p_n_cuit_agente": null,
                 "p_id_contribuyente": $('#id_contribuyente_ret').val(),
                 "p_d_denominacion": $('#d_denominacion_ret').val(),
                 "p_n_hecho": $('#d_objeto_hecho_ret').val(),
                 "id_menu":v_id_menu,
                 "n_orden":7
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        $('#n_cuit_ret').val(data.p_n_cuit_ingresado);
                        $("#n_cuit_ret").mask("99-99999999-9");
                        $('#d_denominacion_ret').val(data.p_d_denominacion);
                        $('#id_contribuyente').val(data.p_id_contribuyente);
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    //SELLOS
    $('#btn_limpiar_sellos, #btn_cancelar_abm_sellos').click(function(){
        $('#n_cuit_sellos').val(null);
        $('#d_denominacion_sellos').val(null);
        $('#i_retencion_sellos').val(null);
        $('#f_retencion_sellos').val(null);
        $('#f_instrumento_sellos').val(null);
        $('#i_base_imponible_sellos').val(null);
        $('#i_alicuota_sellos').val(null);
        $('#i_impuesto_sellos').val(null);
        //$('#ti_retencion_sellos').val(null);
        //$('#total_retenido').val(null);
    });

    $('#btn_guardar_abm_sellos').click(function(){
        if(!$('#f_retencion_sellos').val()){
            mostrar_cuadro('E', 'Error', 'Debe ingresar la Fecha de Retención');
            return;
        };

        abm_sellos();
    });
}