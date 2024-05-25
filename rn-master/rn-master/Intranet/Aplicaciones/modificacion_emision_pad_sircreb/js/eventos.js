function init_eventos(){
    $("#btn_consultar").click(function(){

        if($("#n_padron").val() == '' && $("#padron_bloqueado").val()== '' && $("#c_tributo").val()== '' && $("#anio_padron").val()== '' && $("#mes_padron").val()== '' && $("#cant_generada").val()== ''){
            mostrar_cuadro('E', 'Error', 'Debe ingresar al menos un dato');
            return; 
        }
        
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_id_pad_sircreb":$("#n_padron").val(),
             "p_bloquear":$("#padron_bloqueado").val(),
             "p_c_tributo":$("#c_tributo").val(),
             "p_n_anio_pad_sircreb":$("#anio_padron").val(),
             "p_n_mes_pad_sircreb":$("#mes_padron").val(),
             "p_i_qt_generada":$("#cant_generada").val(),
             "id_menu":100147,
             "n_orden":0
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    $("#n_padron").val(data.p_id_pad_sircreb);
                    $("#padron_bloqueado").val(data.p_bloquear);
                    $("#c_tributo").val(data.p_c_tributo);
                    $("#anio_padron").val(data.p_n_anio_pad_sircreb);
                    $("#mes_padron").val(data.p_n_mes_pad_sircreb);
                    $("#bajas_manuales").val(data.p_i_qt_baja_manual);
                    $("#altas_manuales").val(data.p_i_qt_alta_manual);
                    $("#modificaciones_manuales").val(data.p_i_qt_modif_manual);
                    $("#cant_generada").val(data.p_i_qt_generada);
                    setea_parametros('#grid_sircreb',{
                        ':P_ID_PAD_SIRCREB': $("#n_padron").val(),
                        ':P_BLOQUEAR': $("#padron_bloqueado").val(),
                        ':P_C_TRIBUTO': $("#c_tributo").val(),
                        ':P_N_ANIO_PAD_SIRCREB': $("#anio_padron").val(),
                        ':P_N_MES_PAD_SIRCREB': $("#mes_padron").val(),
                        ':P_I_QT_GENERADA': $("#cant_generada").val()
                    });

                    $('#n_padron').prop('disabled', true);
                    $('#padron_bloqueado').prop('disabled', true);
                    $('#c_tributo').prop('disabled', true);
                    $('#anio_padron').prop('disabled', true);
                    $('#mes_padron').prop('disabled', true);
                    $('#cant_generada').prop('disabled', true);
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    });

    $("#btn_limpiar").click(function(){
        $(".limpiar").val('');
        $('#grid_sircreb').clearGridData();
        $('#n_padron').prop('disabled', false);
        $('#padron_bloqueado').prop('disabled', false);
        $('#c_tributo').prop('disabled', false);
        $('#anio_padron').prop('disabled', false);
        $('#mes_padron').prop('disabled', false);
        $('#cant_generada').prop('disabled', false);
    });
}
