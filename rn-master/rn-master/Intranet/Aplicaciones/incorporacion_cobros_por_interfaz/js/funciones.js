function inicializarLupas() {
    $("#lupa_c_medio_pago").lupa_generica({
        id_lista: v_lista_medios_debito,
        titulos: ['Código', 'Descripción'],
        grid: [{ index: 'c_codigo', width: 100 },
        { index: 'd_descrip', width: 450 }],
        caption: 'Medios Débito',
        sortname: 'c_codigo',
        sortorder: 'asc',
        searchInput: '#c_medio_pago',
        searchCode: true,
        campos: { c_codigo: 'c_medio_pago', d_descrip: 'd_medio_pago' },
        keyNav: true
    });
}

function procesar(params) {
    params.id_menu = v_id_menu;
    params.n_orden = 0;

    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: params,
        dataType: 'json',
        success: function (data) {
            if (data.resultado === 'OK') {
                $('#comentarios').val(data.v_estado);
                return;
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function procesar_archivo(interfaz, id_elemento, n_elemento) {
    var d_path = $("#" + id_elemento).val();
    proceso = interfaz;
    if (d_path) {
        $('#main').procOverlay({ visible: true });
        $('#comentarios').val('');
        $('#comentarios').val('Leyendo archivo...');
        $.ajaxFileUpload({
            url: FUNCIONES_BASEPATH_PROY + 'levantar_archivo_siat.php?nombre_proceso=' + proceso + '&archivo=' + n_elemento,
            secureuri: false,
            fileElementId: id_elemento,
            dataType: 'json',
            success: function (data, status) {
                // Intenta evaluar el JSon de la respuesta. Si no lo logra, muestra el resultado como error.
                var data = eval('(' + data + ')');
                if (data.resultado === 'OK') {
                    if (data.preguntar === 'S') {
                        mostrar_cuadro('C', 'Atención', data.mensaje, function () {
                            $('#comentarios').val($('#comentarios').val() + '\n' + 'Archivo cargado correctamente');
                            post_procesar_archivo(interfaz, data.disco);
                        }, null, 400);
                    } else {
                        $('#comentarios').val($('#comentarios').val() + '\n' + 'Archivo cargado correctamente');
                        post_procesar_archivo(interfaz, data.disco);
                    }

                } else {
                    mostrar_error(data.resultado);
                    $('#comentarios').val($('#comentarios').val() + '\n' + data.resultado);
                    return;
                }
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

    $('#comentarios').val(null);
    $('#main').procOverlay({ visible: true });

    switch (p_tipo_archivo) {
        case 'LEVANTAR_SOLICITUD DEBITO':
            $.ajax({
                type: "POST",
                url: "interfaces/procesar_archivo_interfaz.php",
                data: {
                    "p_tipo_archivo": p_tipo_archivo,
                    "p_n_id_disco": p_n_id_disco,
                    "p_c_medio_pago": $('#c_medio_pago').val(),
                    "p_d_medio_pago": $('#d_medio_pago').val(),
                    "p_f_recepcion": $('#f_recepcion').val(),
                    "p_path": $('#ruta_archivo_recibido').val(),
                    "p_path_recha": $('#ruta_archivo_salida').val()
                },
                dataType: "json",
                success: function (resp) {
                    $('#main').procOverlay({ visible: false });
                    if (resp.resultado === 'OK') {
                        if (resp.p_id_disco_recha != null || resp.p_hay_errores != null) {
                            if (resp.p_hay_errores == "SI") {
                                setea_parametros('#rechazos_grid', { 'p_nombre_disco': resp.p_nombre_disco });
                                mostrar_mensaje_modal('E', 'Error', 'Hay errores en la interface, no se puede procesar el disco, Verifique.', function () { fun_ver_grilla_errores(); });
                            } else {
                                setea_parametros('#rechazos_grid', { 'p_nombre_disco': resp.p_nombre_disco });
                                mostrar_mensaje_modal('I', 'Hay advertencias', 'Lea el detalle.', function () { fun_ver_grilla_errores(); });
                                eliminar_lineas_archivo(p_n_id_disco, resp.p_id_disco_recha);
                            }
                            fun_imprimir_archivo_errores(resp.p_hay_errores, resp.p_id_disco_recha, $('#ruta_archivo_salida').val());
                            $('#comentarios').val($('#comentarios').val() + resp.p_estado);
                        } else {
                            mostrar_mensaje_modal('I', 'Interfaz Procesada.', ' Interfaz procesada correctamente.');
                            $('#comentarios').val($('#comentarios').val() + '\n' + 'Proceso finalizado correctamente.');
                        }
                    } else {
                        mostrar_cuadro('E', 'Error', 'Error al procesar la Interfaz.');
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
    $('#comentarios').scrollTop($('#comentarios')[0].scrollHeight);//mueve scroll hasta el final
}

function fun_imprimir_archivo_errores(p_hay_errores, p_n_id_disco, p_nombre_disco) {
    let archivo_salida = $('#ruta_archivo_salida').val().replace(/_RECH\./, '.');
    if (p_hay_errores == "SI" || p_n_id_disco != null) {
        let partes = archivo_salida.split('.');
        archivo_salida = partes[0] + "_RECH." + partes[1];
    }

    post_to_url("interfaces/descargar_archivo_errores.php",
        {
            "p_n_id_menu": v_id_menu,
            "p_n_id_disco": p_n_id_disco,
            "p_path": p_nombre_disco,
            "p_hay_errores": p_hay_errores,
            "p_path_recha": archivo_salida
        },
        '_blank', 'POST');
}

function fun_ver_grilla_errores() {
    let aux = $('#ruta_archivo_salida').val();
    $('#rechazos_title').text("Errores y Advertencias");
    $('#rechazos_modal').modal('show');
    $('#rechazos_modal').draggable();
}

function eliminar_lineas_archivo(p_id_archivo, p_id_archivo_recha) {
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_id_disco": p_id_archivo,
            "p_id_disco_recha": p_id_archivo_recha,
            "id_menu": v_id_menu,
            "n_orden": 1
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}
