function procesar_archivo(interfaz, id_elemento, n_elemento) {
    var d_path = $("#" + id_elemento).val();
    proceso = interfaz;
    if (d_path) {
        $('#main').procOverlay({ visible: true });
        $.ajaxFileUpload({
            url: FUNCIONES_BASEPATH_PROY + 'levantar_archivo_siat.php?nombre_proceso=' + proceso + '&archivo=' + n_elemento,
            secureuri: false,
            fileElementId: id_elemento,
            dataType: 'JSON',
            success: function (data, status) {
                // Intenta evaluar el JSon de la respuesta. Si no lo logra, muestra el resultado como error.
                var ret = eval('(' + data + ')');
                if (ret.resultado != 'OK') {
                    mostrar_error(ret.resultado);
                    return;
                }

                post_procesar_archivo(interfaz, ret.disco);
            },
            error: function (data, status, e) {
                mostrar_cuadro('E', 'Error', '<p style="margin:0;" align="left">Error al subir el archivo<br /><b>Status:</b> ' + status
                    + '<br /><b>Error:</b> ' + e + '</p>', '', '');
            }
        });
    } else {
        $('#main').procOverlay({ visible: false });
        mostrar_cuadro('E', 'Error', 'Se debe ingresar un archivo para procesar.');
    }
}


function post_procesar_archivo(p_tipo_archivo, p_n_id_disco) {

    $('#main').procOverlay({ visible: true });
    switch (p_tipo_archivo) {
        case 'PROCESAR_ARCHIVOS':
            $.ajax({
                type: "POST",
                url: "interfaces/procesar_archivo_interfaz.php",
                data: {
                    "p_tipo_archivo": p_tipo_archivo,
                    "p_n_id_disco": p_n_id_disco,
                    "p_path": $('#path_arch_recibido').val(),
                    "p_n_remesa": $('#n_remesa').val(),
                    "p_d_pagos_ok": $('#pagos_ok').val(),
                },
                dataType: "json",
                success: function (resp) {
                    $('#main').procOverlay({ visible: false });
                    if (resp.resultado === 'OK') {
                        $('#pagos_ok').val(resp.p_d_pagos_ok);
                        $('#n_remesa').val(resp.p_n_remesa);
                        mostrar_mensaje_modal('I', 'Archivo procesado.', resp.p_mensaje_salida);
                        setea_parametros('#main_grid');

                    } else {
                        $('#pagos_ok').val(resp.p_d_pagos_ok);
                        $('#n_remesa').val(resp.p_n_remesa);
                        let resultado = resp.resultado;
                        mostrar_cuadro('E', 'Error', resultado);
                    }
                },
                error: function (data, status, e) {
                    mostrar_cuadro('E', 'Error', 'Error al procesar el archivo' + status + '<br /><b>Error:</b> ' + e + '</p>', '', '');
                }
            });
            break;
        default:
            $('#main').procOverlay({ visible: false });
            mostrar_cuadro('E', 'Error', 'La Interfaz no está preparada para recibir el proceso.');
            break;
    }

};