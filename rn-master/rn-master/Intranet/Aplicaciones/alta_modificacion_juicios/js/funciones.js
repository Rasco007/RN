function autocompleta_contrib_por_cuit() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: "alta_modificacion_juicios/php/autocomplete.php",
        data: {oper:'cuit', term: limpia_cuit($('#n_cuit').val())},
        dataType: 'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado === 'OK'){
                ajax_autocomplete = null;
                if(data) {
                    $("#d_denominacion").val(data.DENOMINACION);
                    $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                    $("#c_documento").val(data.C_TIPO_DOCUMENTO);
                    $("#documento").val(data.N_DOCUMENTO);
                    $("#d_documento").val(data.D_DOCUMENTO);
                }
            }else{
                mostrar_cuadro('E', 'Error', 'Error al buscar el CUIT');
            }
        }
    });
}

function selectCheck(id){
    let check = $('#check_select_'+id).is(':checked')?'S':'N';
    if(check == 'S'){
        seleccionados.push(id);
    }
    else{
        seleccionados = seleccionados.filter((item) => item != id)
    }
}

function marcar_seleccionado(id){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_session":v_sesion,
         "p_marca":$('#check_select_secondary_'+id).is(':checked')?'S':'N',
         "p_id_obligacion":$('#secondary_grid').getCell(id, 'id_obligacion'),
         "p_c_concepto_mov":$('#secondary_grid').getCell(id, 'c_concepto_mov'),
         "id_menu":v_id_menu,
         "n_orden":4
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                setea_parametros('#secondary_grid',{
                    ':p_sesion': v_sesion,
                });
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function modificar_juicio(p_no_selecciono_deu){
    if(v_modo != 'A'){
        v_modo = 'M'
    }
    
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_modo":v_modo,
         "p_id_boleta_deuda":$('#boleta_deuda').val(),
         "p_no_selecciono_deu":p_no_selecciono_deu,
         "p_c_expediente": $('#c_expediente').val(),
         "p_sesion":v_sesion,
         "id_menu":v_id_menu,
         "n_orden":5
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                mostrar_mensaje_modal('S','Información',data.p_resultado);
                if(v_modo == 'A'){
                    mostrar_cuadro('Q', 'Atención', '¿Desea Imprimir la Boleta de Deuda Asociada al Expediente?',
                function () {
                    let parametros = 'P_ID_BOLETA_DEUDA|' + data.p_id_boleta_deuda + 
                                                             '&P_VERIFICACION_TARDIA|' + 'N'; 
                            
                                          llamar_report('COFL052', parametros, 'PDF');
                    // llamar_report('cofl052',
                    //         'P_ID_BOLETA_DEUDA|'+data.p_id_boleta_deuda+
                    //         '&P_VERIFICACION_TARDIA|N',
                    //         'PDF');
                },
                function () {
                    return;
                });
                }
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                     "p_sesion":data.p_sesion,
                     "id_menu":v_id_menu,
                     "n_orden":6
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                            $("#btn_limpiar_grilla").click();
                            $("#check_all").prop('disabled',true);
                            $("#sola_sin_prescribir").prop('disabled',true);
                            $("#btn_modificar").prop('disabled',true);
                            $("#i_adeudado").val("");
                            $("#i_interes").val("");
                            $("#i_actualizado").val("");
                            $("#suma_seleccionado").val("");
                            return;
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
}

function cambiarTab(tab){
    $(window).resize();
    if(tab == 1){
        v_sesion = null;
        procesados = 0;
    }
    if(tab == 2){
        
        if($("#secondary_grid").jqGrid('getGridParam','records') == 0){
            $("#check_all").prop('disabled',true);
            $("#sola_sin_prescribir").prop('disabled',true);
            $("#btn_modificar").prop('disabled',true);
        }

        if($("#secondary_grid").jqGrid('getGridParam','records') > 0){
            $("#check_all").prop('disabled',false);
            $("#sola_sin_prescribir").prop('disabled',false);
            $("#btn_modificar").prop('disabled',false);
        }

        if(seleccionados.length == 0){
            mostrar_cuadro('E', 'Error', 'Debe buscar un número de boleta y seleccionar una deuda');
            return;
        }

        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "id_menu":v_id_menu,
             "n_orden":3
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    seleccionados.forEach((id) => $.ajax({
                        type:'POST',
                        url: FUNCIONES_BASEPATH+'maestro_abm.php',
                        data:{      
                         "p_marca":'S',
                         "p_id_contribuyente":$('#id_contribuyente').val(),
                         "p_c_tributo":$('#main_grid').getCell(id,'c_tributo')?$('#main_grid').getCell(id,'c_tributo'):null,
                         "p_d_objeto_hecho":$('#main_grid').getCell(id, 'd_objeto_hecho')?$('#main_grid').getCell(id, 'd_objeto_hecho'):null,
                         "p_c_instancia":$('#c_instancia').val(),
                         "p_c_sector_origen":$('#c_sector_origen').val(),
                         "p_c_motivo_origen":$('#c_motivo_origen').val(),
                         "p_f_origen":$('#f_origen').val(),
                         "p_f_vto":$('#f_vto').val(),
                         "p_f_resolucion":$('#f_resolucion').val(),
                         "p_d_resolucion":$('#d_resolucion').val(),
                         "p_d_observ":$('#observaciones').val(),
                         "p_c_expediente":$('#c_expediente').val(),
                         "p_id_boleta_deuda":$('#boleta_deuda').val(),
                         "p_n_instancia_rel":$('#main_grid').getCell(id, 'n_instancia')?$('#main_grid').getCell(id, 'n_instancia'): null,
                         "p_n_orden_rel":$('#main_grid').getCell(id, 'n_orden')?$('#main_grid').getCell(id, 'n_orden'): null,
                         "p_id_grupo":$('#id_grupo').val(),
                         "p_n_seleccion":$('#n_seleccion').val(),
                         "p_sesion":data.p_session,
                         "id_menu":v_id_menu,
                         "n_orden":2
                        },
                        dataType:'json',
                        success: function( data ) {
                            if(data.resultado == 'OK'){
                                v_sesion = data.p_sesion
                                procesados = procesados + 1;
                                if(procesados == seleccionados.length){
                                    $.ajax({
                                        type:'POST',
                                        url: FUNCIONES_BASEPATH+'maestro_abm.php',
                                        data:{      
                                         "p_id_boleta_deuda":$('#boleta_deuda').val(),
                                         "id_menu":v_id_menu,
                                         "p_sesion":v_sesion,
                                         "n_orden":1
                                        },
                                        dataType:'json',
                                        success: function( data ) {
                                            if(data.resultado == 'OK'){
                                                setea_parametros('#secondary_grid',{
                                                    ':p_sesion': v_sesion,
                                                });
                                            }
                                            else{
                                                mostrar_cuadro('E', 'Error', data.resultado);
                                                return;
                                            }
                                        }
                                    }); 
                                }
                            }
                            else{
                                mostrar_cuadro('E', 'Error', data.resultado);
                                return;
                            }
                        }
                    }));
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    }
}