function procesar_archivo(interfaz, id_elemento, n_elemento){

    var d_path = $("#"+id_elemento).val() ;

    proceso = interfaz;
    if(d_path){
        $('#main').procOverlay({visible:true});
        $.ajaxFileUpload({
            url:FUNCIONES_BASEPATH_PROY+'levantar_archivo_siat.php?nombre_proceso='+proceso+'&archivo='+n_elemento,
            secureuri:false,
            fileElementId:id_elemento,
            dataType:'JSON',
            success: function (data, status) {
                // Intenta evaluar el JSon de la respuesta. Si no lo logra, muestra el resultado como error.
                var ret = eval('('+data+')');

                if(ret.resultado != 'OK'){                    
                    mostrar_error(ret.resultado);
                    return;
                }

                post_procesar_archivo(interfaz, ret.disco);
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
    $('#main').procOverlay({visible:true});
    switch(p_tipo_archivo)
    {
        case 'PROCESAR_PAGOS':
            $.ajax({
                type: "POST",
                url: "interfaces/procesar_archivo_interfaz.php",
                data: {
                    "p_tipo_archivo":p_tipo_archivo,
                    "p_n_id_disco":p_n_id_disco,
                    "p_f_remesa": $('#f_remesa').val(),
                    "p_estado":$('estado').val(),
                    "p_cant_reg":$('cant_reg').val(),
                    "p_pagos_acreditados":$('pagos_acreditados').val(),
                    "p_pagos_pendientes":$('pagos_pendientes').val(),
                    "p_pagos_no_procesados":$('pagos_no_procesados').val(),
                    "p_n_remito":$('n_remito').val()
                },
                dataType: "json",
                success: function (resp) {
                    $('#main').procOverlay({visible:false});
                    if(resp.resultado === 'OK'){

                        $('#f_remesa').val(resp.p_f_remesa) ,
                        $('#estado').val(resp.p_estado);
                        $('#cant_reg').val(resp.p_cant_reg);
                        $('#pagos_acreditados').val(resp.p_pagos_acreditados);
                        $('#pagos_pendientes').val(resp.p_pagos_pendientes);
                        $('#pagos_no_procesados').val(resp.p_pagos_no_procesados);
                        $('#n_remito').val(resp.p_n_remito);
                        mostrar_cuadro('I','Información','Tome nota del numero de remesa generado');

                    }else{
                    $('#f_remesa').val(resp.p_f_remesa) ,
                    $('#estado').val(resp.p_estado);
                    $('#cant_reg').val(resp.p_cant_reg);
                    $('#pagos_acreditados').val(resp.p_pagos_acreditados);
                    $('#pagos_pendientes').val(resp.p_pagos_pendientes);
                    $('#pagos_no_procesados').val(resp.p_pagos_no_procesados);
                    $('#n_remito').val(resp.p_n_remito);
                    mostrar_cuadro('E','Error', resp.resultado );
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


function valida_extension(param) {
    var extension = param.split('.').pop();

    if (extension === 'txt' || extension === 'TXT') {
      return true;
    } else {
        mostrar_cuadro('E', 'Error', 'Verifique la extensión del archivo seleccionado.');

        return false;
    }
  }


function reiniciar_valores(){
    $('#div_input_archivo_recibido :input').val(null);
    $('#ruta_archivo_recibido').val(null);
    $('#path_arch_recibido').val(null);
    $('#f_remesa').val(null);
    $('#n_remito').val(null);
    $('#cant_reg').val(null);
    $('#estado').val(null);
    $('#pagos_acreditados').val(null);
    $('#pagos_pendientes').val(null);
    $('#pagos_no_procesados').val(null);

}

function actualizar_input(){
    $('#ruta_archivo_recibido').val( $('#path_arch_recibido').val() );
}