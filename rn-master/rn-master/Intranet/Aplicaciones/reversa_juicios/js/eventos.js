function init_eventos(){
    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    $("#n_cuit").mask("99-99999999-9");

    $("#btn_limpiar").click(function(){
        $('#n_cuit').val('');
        $('#d_denominacion').val('');
        $('#boleta_deuda').val('');
        $('#c_expediente').val('');
        $('#instancia').val('');
        $('#n_orden').val('');
        $('#c_instancia').val('');
        $('#d_instancia').val('');
        $('#c_sector_origen').val('');
        $('#d_sector_origen').val('');
        $('#f_origen').val('');
        $('#c_motivo_origen').val('');
        $('#d_motivo_origen').val('');

        $('#f_vto').val('');
        $('#d_resolucion').val('');
        $('#f_resolucion').val('');
        $('#observaciones').val('');
        $('#f_confirmacion').val('');

        $('#c_documento').val('');
        $('#d_documento').val('');
        $('#documento').val('');

        $('#i_adeudado').val('');
        $('#i_interes').val('');
        $('#i_actualizado').val('');

        $('#n_cuit').attr('disabled',false);
        $('#d_denominacion').attr('disabled',false);
        $('#c_documento').attr('disabled',false);
        $('#documento').attr('disabled',false);
        $('#instancia').attr('disabled',false);
        $('#n_orden').attr('disabled',false);
        $('#c_instancia').attr('disabled',false);
        $('#c_sector_origen').attr('disabled',false);
        $('#f_origen').attr('disabled',false);
        $('#c_motivo_origen').attr('disabled',false);           
        $('#f_vto').attr('disabled',false);
        $('#d_resolucion').attr('disabled',false);
        $('#f_resolucion').attr('disabled',false);
        $('#observaciones').attr('disabled',false);
        $('#f_confirmacion').attr('disabled',false);
        $('#c_expediente').attr('disabled',false);
        $('#boleta_deuda').attr('disabled',false);
        $('#btn_revertir_juicio').attr('disabled',true);
        $('#main_grid').jqGrid('clearGridData');
        $('#grid_instancias').jqGrid('clearGridData');
        setea_parametros('#grid_instancias',{},'N'); 
        setea_parametros('#main_grid',{},'N'); 
    });

    $('#btn_revertir_juicio').click(function(){
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_f_confirmacion":$('#f_confirmacion').val(),
             "p_id_boleta_deuda":$('#boleta_deuda').val(),
             "p_desea_hacer_reversa":'N',
             "id_menu":v_id_menu,
             "n_orden":1
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    $('#main').procOverlay({visible:false});
                    mostrar_cuadro('C',
                    'Atención',
                    'Existen pagos o ajustes en la obligación de juicio del objeto. ¿Continúa con la reversa?',
                    function () {
                        $.ajax({
                            type:'POST',
                            url: FUNCIONES_BASEPATH+'maestro_abm.php',
                            data:{      
                             "p_f_confirmacion":$('#f_confirmacion').val(),
                             "p_id_boleta_deuda":$('#boleta_deuda').val(),
                             "p_desea_hacer_reversa":'S',
                             "id_menu":v_id_menu,
                             "n_orden":1
                            },
                            dataType:'json',
                            success: function( data ) {
                                if(data.resultado == "El Juicio ha sido revertido satisfactoriamente."){
                                    $('#main').procOverlay({visible:false})
                                    mostrar_cuadro('S', 'Reversa Exitosa', data.resultado);
                                    $('#btn_limpiar').click();
                                    return;
                                }
                                else{
                                    $('#main').procOverlay({visible:false})
                                    mostrar_cuadro('E', 'Error', data.resultado);
                                    return;
                                }
                            }
                        }); 
                    });
                }
                else{
                    $('#main').procOverlay({visible:false})
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    });

    $("#btn_consultar").click(function(){
        if( $('#boleta_deuda').val() == '' && $('#c_expediente').val() == ''){
            mostrar_cuadro('E', 'Error', 'Debe ingresar Boleta de Deuda o Expediente');
            return;
        }

        $('#c_expediente').attr('disabled',true);
        $('#boleta_deuda').attr('disabled',true);

        setea_parametros('#grid_instancias',{
                        ':p_c_expediente':$('#c_expediente').val(),
                        ':p_id_boleta_deuda': $('#boleta_deuda').val(),
        });
        $("#grid_instancias").trigger('reloadGrid');

        filtros_no_nativos = [];
        filtros_arr_main = [];

        if($('#boleta_deuda').val() != ''){
            filtros_arr_main.push('Boleta de Deuda: '+ $('#boleta_deuda').val());
        }
        if($('#c_expediente').val() != ''){
            filtros_arr_main.push('Expediente Adm.: '+ $('#c_expediente').val());
        }

        filtros_no_nativos_ar['main_grid'] = filtros_arr_main;
        filtros_no_nativos_ar['grid_instancias'] = filtros_arr_main;
    });

}