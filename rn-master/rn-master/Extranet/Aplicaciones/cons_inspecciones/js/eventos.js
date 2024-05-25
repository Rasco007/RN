function inicializarEventos() {
    $('#btn_imprimir').click(function () {
        let id = $('#main_grid').getGridParam('selrow');
        if (id) {
            var v_n_instancia = $("#main_grid").getCell(id, 'n_instancia');
            var v_n_orden = $("#main_grid").getCell(id, 'n_orden');
            $.ajax({
                type: "POST",
                url: "cons_inspecciones/php/funciones.php",
                data: {
                    'p_oper': 'get_norden',
                    'p_n_instancia': v_n_instancia,
                    'p_n_orden': v_n_orden
                },
                dataType: "json",
                success: function (response) {
                    if (response.resultado == 'OK') {
                        llamar_report('PLANILLA_F109',
                            'p_n_instancia|' + v_n_instancia + '&p_n_orden|' + response.n_orden,
                            'PDF');
                    } else {
                        mostrar_error(response.resultado);
                    }
                }
            });
        } else {
            mostrar_validacion('Debe seleccionar un registro de la grilla.');
            return;
        }
    });


    $('#detalle_grid_checkbox').unbind();
    $('#check_select_all').click(function () {
        if ($('#detalle_grid').getGridParam('reccount') > 0) {
            $('.checkbox_instancias').prop('checked', true);
            _agregar_quitar_instancia(null);
        }
    });

    $('#btn_confirmar_allanamiento').click(function () {
        mostrar_cuadro('C', 'ATENCIÓN', 'Sr. Contribuyente, tenga en cuenta que el saldo final de las obligaciones aceptadas podría variar al finalizar el expediente.<br>¿Desea Continuar?',
            function () {
                $.ajax({
                    type: 'POST',
                    url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                    data: {
                        "p_n_instancia": $('#modal_n_instancia').val(),
                        "p_n_orden": $('#modal_n_orden').val(),
                        "p_id_obligacion": null,
                        "p_origen": 'CONTRIB',
                        "id_menu": v_id_menu,
                        "n_orden": 1
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.resultado == 'OK') {
                            mostrar_confirmacion('Se ha allanado correctamente');
                            $('#detalle_modal').modal('hide');
                            $('#main_grid').trigger('reloadGrid');
                        } else {
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                });
            }, function () {
                return;
            })
    });

    $('#btn_confirmar_descargo').click(function () {
        mostrar_cuadro('C', 'ATENCIÓN', 'Sr. Contribuyente, recuerde que al presentar un Descargo/Recurso perderá la posibilidad de allanarse de manera total a la pretensión fiscal, perdiendo los beneficios de remisión de la multa por omisión de pago.<br>¿Desea Continuar?',
            function () {
                $.ajax({
                    type: 'POST',
                    url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                    data: {
                        "p_n_instancia": $('#modal_descargo_n_instancia').val(),
                        "p_n_orden": $('#modal_descargo_n_orden').val(),
                        "id_menu": v_id_menu,
                        "n_orden": 2
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.resultado == 'OK') {
                            mostrar_confirmacion('Ha presentado el descargo correctamente');
                            $('#adjuntos_modal').modal('hide');
                            $('#main_grid').trigger('reloadGrid');
                        } else {
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                });
            }, function () {
                return;
            })
    });

}