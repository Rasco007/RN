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
    $('#mascara_lupa_tributo').hide();
    $('#mascara_lupa_tipo_doc').hide();

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
        } else if (event.type === 'keydown') {
            $('#lupa_d_objeto_hecho').hide();
            $('#mascara_lupa_d_objeto_hecho').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 2 && !$('#n_cuit').val()) {
            $('#lupa_d_objeto_hecho').hide();
            $('#mascara_lupa_d_objeto_hecho').show().css('display', 'table-cell');
        } else if(event.type === 'focusout' && $('#n_cuit').val()){
            $('#lupa_d_objeto_hecho').show().css('display', 'table-cell');
            $('#mascara_lupa_d_objeto_hecho').hide();
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
        $('#f_cese_provisorio').val(null);
        $('#n_documento').val(null);
        $('#d_objeto_hecho').val(null);
        $('#id_contribuyente').val(null);
        $('#leyenda').text('');

        $('#lupa_d_denominacion').hide();
        $('#lupa_d_objeto_hecho').hide();
        $('#lupa_tributo').show();
        $('#lupa_tipo_doc').show();
        $('#mascara_lupa_d_objeto_hecho').show();
        $('#mascara_lupa_d_denominacion').show();
        $('#mascara_lupa_tributo').hide();
        $('#mascara_lupa_tipo_doc').hide();

        $('#n_cuit').prop('disabled', false);
        $('#d_denominacion').prop('disabled', false);
        $('#c_tipo_doc').prop('disabled', false);
        $('#c_tributo').prop('disabled', false);
        $('#f_vig_desde').prop('disabled', false);
        $('#n_documento').prop('disabled', false);
        $('#d_objeto_hecho').prop('disabled', false);
        $('#f_cese_provisorio').prop('disabled', true);
        $('#btn_reversa').prop('disabled', true);

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

        $('#btn_eliminar_cese').prop('disabled', true);
        $('#btn_cese_prov').prop('disabled', true);
    });

    $('#btn_limpiar_baja').click(function(){
        $('#c_motivo_cese').val(null);
        $('#d_motivo_cese').val(null);
    });

    $('#n_cuit').change(function(){
        if($('#n_cuit').val()){
            $('#lupa_d_objeto_hecho').show()
            $('#mascara_lupa_d_objeto_hecho').hide();

            if(!$('#d_denominacion').val()){
                //AUTOCOMPLETE_DENOM_CON_CUIT
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                     "p_n_cuit": limpia_cuit($('#n_cuit').val()),
                     "id_menu":100114,
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
        } else{
            $('#lupa_d_objeto_hecho').hide();
            $('#mascara_lupa_d_objeto_hecho').show();
        }
    });

    $('#btn_buscar').click(function(){
        
        //valida_nulos_query
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
            "p_n_cuit": limpia_cuit($('#n_cuit').val()),
            "p_c_tipo_documento": $('#c_tipo_doc').val(),
            "p_n_documento": $('#n_documento').val().replace(/\./g, ''),
            "p_c_tributo": $('#c_tributo').val(),
            "p_obj_hecho": $('#d_objeto_hecho').val(),
            "id_menu":v_id_menu,
            "n_orden":1
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    //BUSQUEDA_CONTRIBUYENTE_REV
                    $.ajax({
                        type:'POST',
                        url: FUNCIONES_BASEPATH+'maestro_abm.php',
                        data:{      
                        "p_c_tributo": $('#c_tributo').val(),
                        "p_obj_hecho": $('#d_objeto_hecho').val(),
                        "p_n_cuit": limpia_cuit($('#n_cuit').val()),
                        "p_n_documento": $('#n_documento').val().replace(/\./g, ''),
                        "p_c_tipo_documento": $('#c_tipo_doc').val(),
                        "id_menu":v_id_menu,
                        "n_orden":0
                        },
                        dataType:'json',
                        success: function( data ) {
                            if(data.resultado == 'OK'){
                                $('#id_contribuyente').val(data.p_id_contribuyente);
                                setea_parametros('#contrib_tributo_grid', {':p_id_contribuyente':$('#id_contribuyente').val(),
                                                                    ':p_c_tributo': $('#c_tributo').val(),
                                                                    ':p_d_objeto_hecho': $('#d_objeto_hecho').val()});
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
                    return false;
                }
            }
        });
         
    });


    $('#btn_eliminar_cese').click(function(){
        //PRC_BTN_ALTA_CESE_PROV
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_id_contribuyente": $('#id_contribuyente').val(),
             "p_obj_hecho": $('#d_objeto_hecho').val(),
             "p_c_tributo": $('#c_tributo').val(),
             "p_c_tipo_imponible": $('#c_tipo_imp').val(),
             "p_n_cuit": limpia_cuit($('#n_cuit').val()),
             "p_f_cese_provisorio": $('#f_cese_provisorio').val(),
             "id_menu":v_id_menu,
             "n_orden":2
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                  $("#contrib_tributo_grid").trigger("reloadGrid");
                  mostrar_cuadro('S', 'Exito', 'Proceso finalizado');
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    });

    $('#btn_cese_prov').click(function(){
        //PRC_BTN_BAJA_CESE_PROV
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_f_cese_provisorio": $('#f_cese_provisorio').val(),
             "p_id_contribuyente": $('#id_contribuyente').val(),
             "p_obj_hecho": $('#d_objeto_hecho').val(),
             "p_c_tributo": $('#c_tributo').val(),
             "id_menu":v_id_menu,
             "n_orden":3
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    mostrar_cuadro('Q', 'Confirmación',
                            "Va a dar el CESE PROVISORIO al contribuyente en el Tributo " + $('#d_tributo').val() + " ¿Desea continuar con la operación?",
                            function(){
                                $('#baja_modal').show();
                                $(window).resize();
                            },
                            function(){
                                return;
                            }, 500);
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    });
    
    $('#btn_cancelar_baja').click(function(){
        $('#baja_modal').hide();
        $('#c_motivo_cese').val(null);
        $('#d_motivo_cese').val(null);
    });

    $('#btn_grabar').click(function(){
        //grabar_baja_cese
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_c_motivo_cese_prov": $('#c_motivo_cese').val(),
             "p_f_cese_provisorio": $('#f_cese_provisorio').val(),
             "p_c_tributo": $('#c_tributo').val(),
             "p_id_contribuyente": $('#id_contribuyente').val(),
             "p_obj_hecho": $('#d_objeto_hecho').val(),
             "p_c_tipo_imponible": $('#c_tipo_imp').val(),
             "p_n_tabla_mot_baja": $('#n_tabla_mot_baja').val(),
             "id_menu":v_id_menu,
             "n_orden":4
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                  $('#leyenda').text(data.p_leyenda);
                  mostrar_cuadro('S', 'Exito', 'Proceso finalizado');
                  $('#baja_modal').hide();
                  $('#c_motivo_cese').val(null);
                  $('#d_motivo_cese').val(null);
                  $('#n_tabla_mot_baja').val(null);
                  $('#btn_limpiar').trigger('click');
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    });
}