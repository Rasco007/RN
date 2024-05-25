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

    $("#n_cuit").mask("99-99999999-9");

    $('#lupa_d_denominacion').hide();
    $('#lupa_d_objeto_hecho').hide();
    $('#mascara_lupa_tipo_doc').hide();
    $('#mascara_lupa_tributo').hide();

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

    $('#d_objeto_hecho').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 2) {
            $('#lupa_d_objeto_hecho').show().css('display', 'table-cell');
            $('#mascara_lupa_d_objeto_hecho').hide();
        } else if (event.type === 'keydown' && !habilita_objeto()) {
            $('#lupa_d_objeto_hecho').hide();
            $('#mascara_lupa_d_objeto_hecho').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 2 && !habilita_objeto()) {
            $('#lupa_d_objeto_hecho').hide();
            $('#mascara_lupa_d_objeto_hecho').show().css('display', 'table-cell');
        }
    });

    $('#btn_limpiar').click(function(){
        $('#n_cuit').val(null);
        $('#d_denominacion').val(null);
        $('#c_tipo_doc').val(null);
        $('#d_tipo_doc').val(null);
        $('#c_tributo').val(null);
        $('#d_tributo').val(null);
        $('#f_vig_desde').val(null);
        $('#f_nueva').val(null);
        $('#n_documento').val(null);
        $('#d_objeto_hecho').val(null);
        $('#id_contribuyente').val(null);
        $('#leyenda').text('');

        $('#lupa_d_denominacion').hide();
        $('#lupa_d_objeto_hecho').hide();
        $('#lupa_tipo_doc').show();
        $('#lupa_tributo').show();
        $('#mascara_lupa_d_objeto_hecho').show();
        $('#mascara_lupa_d_denominacion').show();
        $('#mascara_lupa_tipo_doc').hide();
        $('#mascara_lupa_tributo').hide();

        $('#n_cuit').prop('disabled', false);
        $('#d_denominacion').prop('disabled', false);
        $('#c_tipo_doc').prop('disabled', false);
        $('#c_tributo').prop('disabled', false);
        $('#f_vig_desde').prop('disabled', false);
        $('#n_documento').prop('disabled', false);
        $('#d_objeto_hecho').prop('disabled', false);
        $('#f_nueva').prop('disabled', true);
        $('#btn_reversa').prop('disabled', true);
        $('#btn_buscar').prop('disabled', false);

        $('#actividades_cm_grid').jqGrid('clearGridData');
        $('#jurisdicciones_grid').jqGrid('clearGridData');
        $('#actividades_ibd_grid').jqGrid('clearGridData');
        $('#establecimientos_grid').jqGrid('clearGridData');
        $('#contrib_tributo_grid').jqGrid('clearGridData');
        $('#div_actividades_cm').prop('hidden', true);
        $('#div_jurisdicciones').prop('hidden', true);
        $('#div_actividades_ibd').prop('hidden', true);
        $('#div_establecimientos').prop('hidden', true);
        $('#div_contrib_tributo').prop('hidden', true);
    });

    $('#n_cuit').change(function(){
        if($('#n_cuit').val()){
            if(!$('#d_denominacion').val()){
                //AUTOCOMPLETE_DENOM_CON_CUIT
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                     "p_n_cuit": limpia_cuit($('#n_cuit').val()),
                     "id_menu":v_id_menu,
                     "n_orden":3
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
        }
    });

    $('#btn_buscar').click(function(){
        //BUSQUEDA_CONTRIBUYENTE_REV
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_n_cuit": limpia_cuit($('#n_cuit').val()),
             "p_c_tributo": $('#c_tributo').val(),
             "p_obj_hecho": $('#d_objeto_hecho').val(),
             "id_menu":v_id_menu,
             "n_orden":0
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){

                    //filtros_no_nativos = [];
                    filtros_arr_main = [];
                    if($('#n_cuit').val() != ''){filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());}
                    if($('#d_denominacion').val() != ''){filtros_arr_main.push('Denominación: '+ $('#d_denominacion').val());}
                    if($('#c_tipo_doc').val() != ''){filtros_arr_main.push('Tipo Documento: '+ $('#c_tipo_doc').val() +' - '+ $('#d_tipo_doc').val());}
                    if($('#n_documento').val() != ''){filtros_arr_main.push('Nro. Documento: '+ $('#n_documento').val());}
                    if($('#c_tributo').val() != ''){filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());}
                    if($('#d_objeto_hecho').val() != ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());}
                    if($('#f_vig_desde').val() != ''){filtros_arr_main.push('F. Vig. Desde: '+ $('#f_vig_desde').val());}
                    
                    filtros_no_nativos_ar['actividades_cm_grid'] = filtros_arr_main;
                    filtros_no_nativos_ar['jurisdicciones_grid'] = filtros_arr_main;
                    filtros_no_nativos_ar['establecimientos_grid'] = filtros_arr_main;
                    filtros_no_nativos_ar['actividades_ibd_grid'] = filtros_arr_main;
                    filtros_no_nativos_ar['contrib_tributo_grid'] = filtros_arr_main;  
                    
                   $('#id_contribuyente').val(data.p_id_contribuyente);
                   setea_parametros('#contrib_tributo_grid', {':p_id_contribuyente':$('#id_contribuyente').val(),
                                                    ':p_c_tributo': $('#c_tributo').val(),
                                                    ':p_d_objeto_hecho': $('#d_objeto_hecho').val()});
                    bloquear_filtros();
                    $('#btn_reversa').prop('disabled', false);
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    });

    $('#btn_reversa').click(function(){
        if(!$('#f_nueva').val()){
            mostrar_cuadro('I', 'Atención', 'El contribuyente no tiene baja definitiva');
        }
        //PRC_BTN_BAJA_REV_CESE_DEF
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_id_contribuyente": $('#id_contribuyente').val(),
             "p_c_tributo": $('#c_tributo').val(),
             "p_n_cuit": limpia_cuit($('#n_cuit').val()),
             "p_obj_hecho": $('#d_objeto_hecho').val(),
             "id_menu":v_id_menu,
             "n_orden":1
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    if($('#f_nueva').val()){
                        let v_mensaje = "Va a recuperar una baja al contribuyente en el Tributo " + $('#d_tributo').val() + " ¿Desea continuar con la operación?";
                        mostrar_cuadro('Q', 'Confirmación',v_mensaje,
	                    function(){
                            //baja_ibd
                            $.ajax({
                                type:'POST',
                                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                                data:{      
                                 "p_f_vig_hasta": $('#f_nueva').val(),
                                 "p_c_tributo": $('#c_tributo').val(),
                                 "p_id_contribuyente": $('#id_contribuyente').val(),
                                 "p_c_tipo_imponible": $('#c_tipo_imp').val(),
                                 "p_obj_hecho": $('#d_objeto_hecho').val(),
                                 "id_menu":v_id_menu,
                                 "n_orden":2
                                },
                                dataType:'json',
                                success: function( data ) {
                                    if(data.resultado == 'OK'){
                                      if(data.p_resultado){
                                        mostrar_cuadro('S', 'Exito', data.p_resultado);
                                        $('#btn_limpiar').trigger('click');
                                        return;
                                      }
                                    }
                                    else{
                                        mostrar_cuadro('E', 'Error', data.resultado);
                                        $('#btn_limpiar').trigger('click');
                                        return;
                                    }
                                }
                            }); 
	                    },
	                    function(){
                            return;
                        }, 500);
                    } else{
                        mostrar_cuadro('I', 'Atención', 'El contribuyente no tiene baja definitiva');
                        return;
                    }
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    });

    
}