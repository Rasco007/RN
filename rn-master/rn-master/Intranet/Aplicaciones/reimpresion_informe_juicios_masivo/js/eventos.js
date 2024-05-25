function inicializarEventos(){
    if(p_id_workflow_log != '' && p_c_tarea != ''){
        actualizar_tarea_workflow(p_id_workflow_log, p_c_tarea, 'R', 0, 'N');
        $('#n_seleccion').val(p_n_seleccion);
        $('#id_grupo').val(p_id_grupo);
    }

    $('.numerico').keypress(function(tecla){
        if(tecla.charCode<48 || tecla.charCode>57){
            if(tecla.charCode !== 44 && tecla.charCode !== 46){
                return false;
            }
        }
    });
    
    $("#n_cuit_rep").mask("99-99999999-9");

    $('#btn_generar').click(function(){

        //Borrar tabla tmp
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             
             "id_menu":v_id_menu,
             "n_orden":2
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                  
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 

        if($('#id_grupo').val() && $('#n_seleccion').val()){
            let n_cuit = null;
            if($('#n_cuit_rep').val()){
                n_cuit = limpiar_formato_cuit($('#n_cuit_rep').val());
            }

            //prc_preguntar_generar_masivo
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                "p_masivo": v_masivo,
                "p_chk_crear_pdf": v_chk_crear_pdf,
                "p_grupo": $('#id_grupo').val(),
                "p_seleccion": $('#n_seleccion').val(),
                "p_cuit_repres": n_cuit,
                "p_monto_fiscalia": $('#monto_fisc').val(),
                "id_menu":v_id_menu,
                "n_orden":0
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                    if(data.p_cant > 0){
                        mostrar_cuadro('Q', 'Confirmación',
                            "Esta por generar " + data.p_cant + " boletas de juicios en PDF, está seguro?",
                            function(){
                                generar_pdf();
                            },
                            function(){
                                mostrar_cuadro('I', 'Informaci&oacute;n', 'Generaci&oacute;n Cancelada');
                            }, 500);
                    }
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        } else{
            mostrar_cuadro('I', 'Informaci&oacute;n', 'Los campos Grupo y Selecci&oacute;n no pueden quedar vac&iacute;os');
        }
         
    });

    $('#btn_volver').click(function(){
        resultado_cargado = false;
        $("#resultado_generacion_grid").jqGrid('clearGridData');
        //Borrar tabla tmp
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             
             "id_menu":v_id_menu,
             "n_orden":2
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                  
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    });

    $('#btn_limpiar').click(function(){
        $('#id_grupo').val(null);
        $('#n_seleccion').val(null);
        $('#n_cuit_rep').val(null);
        $('#monto_fisc').val(null);
        $('#n_generadas').val(null);

        //Borrar tabla tmp
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             
             "id_menu":v_id_menu,
             "n_orden":2
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                  
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    });
}