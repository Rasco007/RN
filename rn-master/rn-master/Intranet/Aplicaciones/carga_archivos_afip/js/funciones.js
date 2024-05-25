function inicializarLupas() {

}

function actualizar_input() {
    $('#ruta_archivo_recibido').val($('#path_arch_recibido').val());
    $('#ruta_archivo_salida').val($('#path_arch_salida').val());
}

function procesar_archivo(interfaz, id_elemento, n_elemento) {
    var d_path = $("#" + id_elemento).val();

    proceso = interfaz;
    if (d_path) {
        $('#main').procOverlay({ visible: true });

        $.ajaxFileUpload({
            url: FUNCIONES_BASEPATH_PROY + 'levantar_archivo_siat.php?nombre_proceso=' + proceso + '&archivo=' + n_elemento,
            secureuri: false,
            fileElementId: id_elemento,
            dataType: 'json',
            success: function (data, status) {
                // Intenta evaluar el JSon de la respuesta. Si no lo logra, muestra el resultado como error.
                var data = eval('(' + data + ')');
                if (data.resultado != 'OK') {
                    mostrar_error(data.resultado);
                    return;
                }
                post_procesar_archivo(interfaz, data.disco);
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
        case 'LEVANTAR_CARGA_AFIP':
            $.ajax({
                type: "POST",
                url: "interfaces/procesar_archivo_interfaz.php",
                data: {
                    "p_tipo_archivo": p_tipo_archivo,
                    "p_n_id_disco": p_n_id_disco,
                    "p_path": $('#path_arch_recibido').val()

                },
                dataType: "json",
                success: function (resp) {
                    $('#main').procOverlay({ visible: false });
                    if (resp.resultado === 'OK') {
                        $('#cant_011').val(resp.p_cant_011);
                        $('#cant_030').val(resp.p_cant_030);
                        $('#cant_030_ali').val(resp.p_cant_030_ali);
                        $('#cant_030_web').val(resp.p_cant_030_web);
                        $('#cant_010').val(resp.p_cant_010);
                        $('#cant_301').val(resp.p_cant_301);
                        $('#cant_2082').val(resp.p_cant_2082);
                        $('#cant_8100').val(resp.p_cant_8100);
                        $('#cant_2083').val(resp.p_cant_2083);

                        $('#compras_informante').val(resp.p_cant_CO_INFTE);
                        $('#ventas_informante').val(resp.p_cant_VE_INFTE);
                        $('#compras_informado').val(resp.p_cant_CO_INFDO);
                        $('#ventas_informado').val(resp.p_cant_VE_INFDO);
                        $('#fe_recibidas_informado').val(resp.p_cant_FE_REC);
                        $('#fe_emitidas_informante').val(resp.p_cant_FE_EMI);

                        $('#cant_contribuyentes').val(resp.p_cant_contrib);
                        $('#cant_descartados').val(resp.p_cant_descartados);
                        $('#cant_err').val(resp.p_cant_err);
                        $('#cant_reg_tot').val(resp.p_cant_reg);

                        /*if (resp.p_mostrar_error == 'S') {
                            $('#desc_error').text(resp.p_mensaje_salida);
                            $('#btn_error').trigger('click');
                        }*/

                        $('#desc_error').text(resp.p_mensaje_salida);
                        $('#btn_error').trigger('click');

                        $("#archivos_grid").trigger("reloadGrid");
                        mostrar_cuadro('I', 'Información', resp.p_mensaje_final);
                    } else {
                        mostrar_cuadro('E', 'Error', resp.resultado);
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
}

function eliminar_archivo() {
    let row_id = $('#archivos_grid').getGridParam('selrow');

    if (row_id) {
        mostrar_cuadro('Q', 'Confirmación',
            "Esta seguro de borrar el archivo?",
            function () {
                $.ajax({
                    type: 'POST',
                    url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                    data: {
                        "p_id_archivo": $('#archivos_grid').getCell(row_id, 'id_archivo'),
                        "id_menu": v_id_menu,
                        "n_orden": 1
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.resultado == 'OK') {
                            mostrar_cuadro('I', 'Información', data.p_mensaje_salida);
                            $("#archivos_grid").trigger("reloadGrid");
                        }
                        else {
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                });
            },
            function () { }, 500);
    }
}