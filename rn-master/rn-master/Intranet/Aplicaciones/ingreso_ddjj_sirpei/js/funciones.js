function buscar_agente(p_limpiar){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{   
         "p_limpiar": p_limpiar,   
         "id_menu":v_id_menu,
         "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
              $('#n_agente').val(data.p_n_agente);
              $('#d_agente').val(data.p_d_agente);
              $('#id_sesion').val(data.p_id_sesion);
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function actualizar_input(){
    $('#ruta_archivo_recibido').val( $('#path_arch_recibido').val() );
    $('#ruta_archivo_salida').val( $('#path_arch_salida').val() );
}

function procesar_archivo(interfaz, id_elemento, n_elemento){
    var d_path = $("#"+id_elemento).val();
    
    proceso = interfaz;
    if(d_path){
        //$('#main').procOverlay({visible:true});
        barra_progreso(true);
        
        $.ajaxFileUpload({
            url:FUNCIONES_BASEPATH_PROY+'levantar_archivo_siat.php?nombre_proceso='+proceso+'&archivo='+n_elemento,
            secureuri:false,
            fileElementId:id_elemento,
            dataType:'json',
            success: function (data, status) {
                // Intenta evaluar el JSon de la respuesta. Si no lo logra, muestra el resultado como error.
                //barra_progreso(false);
                var data = eval('('+data+')');
                if(data.resultado != 'OK'){
                    mostrar_error(data.resultado);
                    barra_progreso(false);
                    return;
                }
                barra_progreso(false);
                post_procesar_archivo(interfaz, data.disco);
            },
            error: function (data, status, e) {
                mostrar_cuadro('E','Error','<p style="margin:0;" align="left">Error al subir el archivo<br /><b>Status:</b> '+ status
                    +'<br /><b>Error:</b> '+e+'</p>','','');
                barra_progreso(false);
            }
        });
    }else{
        $('#main').procOverlay({visible:false});
        mostrar_cuadro('E','Error','Se debe ingresar un archivo para procesar.');
        barra_progreso(false);
    }
}

function post_procesar_archivo(p_tipo_archivo, p_n_id_disco){

    $('#main').procOverlay({visible:false});

    switch(p_tipo_archivo)
    {
        case 'LEVANTAR_ARCHIVO_SIRPEI':
            barra_progreso(true);
            $.ajax({
                type: "POST",
                url: "interfaces/procesar_archivo_interfaz.php",
                data: {
                    "p_tipo_archivo":p_tipo_archivo,
                    "p_n_id_disco":p_n_id_disco,
                    "p_cod_agente":v_cod_agente,
                    "p_id_sesion": $('#id_sesion').val(),
                    "p_path":$('#path_arch_recibido').val()
                    
                },
                dataType: "json",
                success: function (resp) {
                    //$('#main').procOverlay({visible:false});
                    if(resp.resultado === 'OK'){
                        barra_progreso(false);
                        $('#cant_reg').val(resp.p_cant_reg);
                        $('#estado').val(resp.p_estado);
                        $('#n_agente').val(resp.p_n_agente);
                        $('#n_agente_c').val(resp.p_n_agente_c);
                        $('#d_agente').val(resp.p_d_agente);
                        $('#f_presentacion').val(resp.p_f_presentacion);
                        $('#n_id_disco').val(resp.p_n_id_disco);
                        $('#pos_fiscal').val(resp.p_posicion_fiscal);

                        setea_parametros('#fechas_grid',{':p_id_sesion':$('#id_sesion').val()});
                        $('#f_presentacion').prop('disabled', false);
                        $('#examinar_recibido').prop('disabled', true);

                        if(resp.p_estado_salida == 'PROCESAR'){
                            $('#btn_explorar').prop('disabled', true);
                            $('#btn_procesar').prop('disabled', false);
                        } else{
                            $('#btn_explorar').prop('disabled', true);
                            $('#btn_corregir').prop('disabled', false);
                        } 
                        
                    }else{
                        mostrar_cuadro('E','Error', resp.resultado);
                        barra_progreso(false);
                    }
                },
                error: function (data, status, e) {
                    mostrar_cuadro('E','Error','Error al procesar el archivo'+ status +'<br /><b>Error:</b> '+e+'</p>','','');
                    barra_progreso(false);
                }
            });
            break;

        default:
            $('#main').procOverlay({visible:false});
            barra_progreso(false);
            mostrar_cuadro('E','Error', 'La Interfaz no está preparada para recibir el proceso.');
            break;
    }
}

function selectCheck(id_fila){
    let fila_chequeada = $('#'+id_fila).is(':checked');
    let num_fila = id_fila.split('_')[2];
    let marca = 0;

    if(fila_chequeada){
        marca = 1;
    }

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_c_marca": marca,
         "p_id_sesion": $('#id_sesion').val(),
         "p_n_orden": num_fila,
         "id_menu":v_id_menu,
         "n_orden":3
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#fechas_ibd_grid').trigger('reloadGrid');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 


}