
function cancelar_archivo(){
    mostrar_cuadro('E','Error','Se ha cancelado el proceso.');
    $('#main').procOverlay({visible:false});
    $("#faltantes_grid").trigger('reloadGrid');
}


function procesar_archivo(){
    $('#main').procOverlay({visible:true});
    $.ajax({        //Solicitamos el procesamiento del archivo que acabamos de subir.
        url: FUNCIONES_BASEPATH+"maestro_abm.php",
        type:'POST',
        data: {
            "p_n_id_lote":v_n_id_lote,
            "id_menu":v_n_id_menu,
            "n_orden":1,
            "p_time_limit": 10800
        },
        dataType: 'json',
        async:false,
        success: function(data){
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
                // $('#div_file_upload').hide();
                mostrar_cuadro('I','Procesamiento Exitoso','El procesamiento de la Interfaz Mulator ha finalizado correctamente.',
                    function(){
                        $("#resultados_grid").trigger('reloadGrid');
                        setea_parametros('#errores_grid',
                            {':n_id_lote':null,
                                ':n_corrida':null
                            });
                        $( "#tabs" ).tabs({
                            active: 0
                        });
                        archivos_dropzone.removeAllFiles(true);
                    },
                    function(){
                        $("#resultados_grid").trigger('reloadGrid');
                        setea_parametros('#errores_grid',
                            {':n_id_lote':null,
                                ':n_corrida':null
                            });
                        $( "#tabs" ).tabs({
                            active: 0
                        });
                        archivos_dropzone.removeAllFiles(true);
                    }
                );
            }
            else{
                mostrar_cuadro('E','Error',data.resultado.replace(' <br \/># ',''),
                    function(){
                        $("#resultados_grid").trigger('reloadGrid');
                        setea_parametros('#errores_grid',
                            {':n_id_lote':null,
                                ':n_corrida':null
                            });
                        $( "#tabs" ).tabs({
                            active: 0
                        });
                        archivos_dropzone.removeAllFiles(true);
                    },
                    function(){
                        $("#resultados_grid").trigger('reloadGrid');
                        setea_parametros('#errores_grid',
                            {':n_id_lote':null,
                                ':n_corrida':null
                            });
                        $( "#tabs" ).tabs({
                            active: 0
                        });
                        archivos_dropzone.removeAllFiles(true);
                    }
                );
            }
        },
        //si ha ocurrido un error
        error: function(){
            $('#main').procOverlay({visible:false});
            mostrar_cuadro('E','Error','Ha ocurrido un Error al conectarse al servidor.');
        }
    });
}
