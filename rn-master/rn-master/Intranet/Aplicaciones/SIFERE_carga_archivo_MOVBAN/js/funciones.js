
function procesar(params){
    params.id_menu = v_id_menu;
    params.n_orden = 0;

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            if(data.resultado === 'OK'){
                $('#comentarios').val(data.v_estado);
                return;
            }else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function procesar_archivo(interfaz, id_elemento, n_elemento){

    var d_path = $("#"+id_elemento).val() ;
    proceso = interfaz;
    if(d_path){
        $('#main').procOverlay({visible:true});
        
        $.ajaxFileUpload({
            url:FUNCIONES_BASEPATH_PROY+'levantar_archivo_siat.php?nombre_proceso='+proceso+'&archivo='+n_elemento,
            secureuri:false,
            fileElementId:id_elemento,
            dataType:'json',
            success: function (data, status) {
                var data = eval('('+data+')');
                if(data.resultado != 'OK'){
                    mostrar_error(data.resultado);
                    return;
                }else{
                    post_procesar_archivo(interfaz, data.disco);

                }
            },
            error: function (data, status, e) {
                mostrar_cuadro('E','Error','<p style="margin:0;" align="left">Error al subir el archivo<br /><b>Status:</b> '+ status
                    +'<br /><b>Error:</b> '+e+'</p>','','');
            }
        });
    }else{
        $('#main').procOverlay({visible:false});
        mostrar_cuadro('E','Error','Se debe ingresar un archivo para procesar.');
    }
}

function post_procesar_archivo(p_tipo_archivo, p_n_id_disco){

    //$('#comentarios').val(null);
    $('#main').procOverlay({visible:true});

    switch(p_tipo_archivo)
    {
        case 'LEVANTAR_ARCHIVO_MOVBAN':
            $.ajax({
                type: "POST",
                url: "interfaces/procesar_archivo_interfaz.php",
                data: {
                    "p_tipo_archivo":p_tipo_archivo,
                    "p_n_id_disco":p_n_id_disco,
                    "p_cant_reg": $('#cant_reg').val(),
                    //"p_secuencia": $('#secuencia').val(),
                    //"p_d_denominacion": $('#d_denominacion').val(),
                    "p_estado": $('#p_estado').val(),
                    "p_linea": $('#linea').val(),
                    //"p_path": $('#ruta_archivo_recibido').val()
                    //"p_nombre_disco": obtener_nombre_archivo($('#ruta_archivo_recibido').val())

                },
                dataType: "json",
                success: function (resp) {
                    $('#main').procOverlay({visible:false});
                    if(resp.resultado === 'OK'){
                            if(resp.p_hay_errores === 'SI'){
                                setea_parametros('#rechazos_grid',{'p_nombre_disco':resp.p_nombre_disco});
                                mostrar_mensaje_modal('E','Hay errores en la interface, no se puede procesar el disco Verifique.', function(){fun_ver_grilla_errores();});

                             }
                            mostrar_mensaje_modal('I','Interfaz Procesada.',' Interfaz procesada correctamente.');
                            $('#cant_reg').val(resp.p_cant_reg);
                            $('#linea').val(resp.p_linea);
                            $('#p_estado').val(resp.p_estado);
                    

                    }else{
                        mostrar_cuadro('E','Error', 'Error al procesar la Interfaz.' + resp.resultado);
                    }
                },
                error: function (data, status, e) {
                    mostrar_cuadro('E','Error','Error al procesar el archivo'+ status +'<br /><b>Error:</b> '+e+'</p>','','');
                }
            });
            break;


        default:
            $('#main').procOverlay({visible:false});
            mostrar_cuadro('E','Error', 'La Interfaz no está preparada para recibir el proceso.');
            break;
    }
}

function fun_imprimir_archivo_errores(p_hay_errores, p_n_id_disco, p_nombre_disco){
    post_to_url("interfaces/descargar_archivo_errores.php",
        {
            "p_n_id_menu":v_id_menu,
            "p_n_id_disco":p_n_id_disco, //ES EL NUEVO ID del NUEVO ARCHIVO
            "p_path": p_nombre_disco,
            "p_hay_errores": 'SI', //le pongo el SI harcodeado porque sino no funciona en "descargar_archivo_errores"
            "p_path_recha":  p_nombre_disco
        },
        '_blank', 'POST');
}

function obtener_nombre_archivo(path) {
    var ultima_barra = path.lastIndexOf('\\');
    var ultima_parte = path.substr(ultima_barra + 1);
    return ultima_parte;
}

function fun_ver_grilla_errores(){
    let aux = obtener_nombre_archivo($('#ruta_archivo_recibido').val());
    $('#rechazos_title').text("Detalle de Registros Erróneos - " + aux);
    $('#rechazos_modal').modal('show');

}
