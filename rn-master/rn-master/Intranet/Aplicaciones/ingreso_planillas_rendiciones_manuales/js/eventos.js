function init_eventos() {
    $('.numerico').keypress(function (tecla) {
        if (tecla.charCode < 48 || tecla.charCode > 57) {
            if (tecla.charCode !== 44 && tecla.charCode !== 46) {
                return false;
            }
        }
    });

    $(".mascara_importe").focusout(function () {
        $(this).val(formatea_number(mascara_numero(parse($(this).val()).toFixed(2), ',', -1, 2), ''));
        if ($(this).val() == '0,00') {
            $(this).val(null);
        }
    }).css('text-align', 'right');

    $("#tot_cantidad").val("");

    $("#tot_impue").val("");

    $("#tot_tasa").val("");

    $("#tot_total").val("");

    $('#det_grid').jqGrid('clearGridData');

    $("#mascara_lupa_banco").hide();
    $("#mascara_lupa_sucursal").hide();
    $('#mascara_lupa_banco_modal').hide();
    $('#mascara_lupa_sucursal_modal').hide();

    $('.datepicker').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    }).mask("99/99/9999");

    $('#f_pago').change(function () {
        validarFecha();
    })

    $('#btn_buscar').click(function () {
        let fechavalida = validarFecha();



        if (fechavalida && validarBanco() && validarSucursal()) {
            p_f_acred = $('#f_acred').val();
            p_f_pago = $('#f_pago').val();
            p_c_banco = $('#c_banco').val();
            p_c_sucursal = $('#c_sucursal').val();

            $('#btn_buscar').attr('disabled', true);
            $('#c_banco').attr('disabled', true);
            $('#d_banco').attr('disabled', true);
            $('#c_sucursal').attr('disabled', true);
            $('#d_sucursal').attr('disabled', true);
            $('#f_acred').attr('disabled', true);
            $('#f_pago').attr('disabled', true);
            $('#mascara_lupa_banco').show().css('display', 'table-cell');
            $('#mascara_lupa_sucursal').show().css('display', 'table-cell');
            $("#lupa_banco").hide();
            $("#lupa_sucursal").hide();

            filtros_no_nativos = [];
            filtros_arr_main = [];
            if ($('#c_banco').val() != '') {
                filtros_arr_main.push('Banco: ' + $('#c_banco').val() + ' - ' + $('#d_banco').val());
            }
            if ($('#c_sucursal').val() != '') {
                filtros_arr_main.push('Sucursal: ' + $('#c_sucursal').val() + ' - ' + $('#d_sucursal').val());
            }
            if ($('#f_acred').val() != '') {
                filtros_arr_main.push('F. Acreditación: ' + $('#f_acred').val());
            }
            if ($('#f_pago').val() != '') {
                filtros_arr_main.push('F. De Pago: ' + $('#f_pago').val());
            }
            filtros_no_nativos_ar['main_grid'] = filtros_arr_main;
            filtros_no_nativos_ar['det_grid'] = filtros_arr_main;

            habilitar_consulta();
            setea_parametros('#main_grid', {
                'p_c_banco': p_c_banco,
                'p_c_sucursal': p_c_sucursal,
                'p_f_acred': p_f_acred,
                'p_f_pago': p_f_pago
            });

            $('#main_grid').trigger('reloadGrid');

        }
        else {
            mostrar_error("Los campos no pueden estar vacios", 'E', true);
        }

        $('#det_grid').jqGrid('clearGridData');




    });

    $("#c_banco").focusout(function () {
        validaNuloBanco();
        habilitarBoton();
    })

    $("#c_sucursal").focusout(function () {
        validaNuloSucursal();
    })

    $("#controlado").click(function () {

        validaFechaNula();

        if (validaRemito) {
            controlar(p_c_banco, p_c_sucursal, p_f_acred, p_f_pago, p_n_remito);
        }

    })

    $("#btn_limpiar").click(function () {
        if ($('#main_grid_tmp').getGridParam('records') > 0 || $('#det_grid_tmp').getGridParam('records') > 0) {
            mostrar_cuadro('Q', 'Confirmación',
                "Desea guardar los cambios?",
                function () {
                    $('#btn_confirmar_alta').trigger('click');
                    limpiar();
                },
                function () {
                    cancelar_alta();
                }, 500);
        } else {
            limpiar();
        }
    })

    $('#btn_habilitar_alta').click(function () {
        habilitar_alta();
    })

    $('#btn_guardar_rend_cab').click(function () {
        if (!$('#c_banco_modal').val()) {
            mostrar_cuadro('E', 'Error', 'El campo banco no puede quedar nulo');
            return;
        }
        if (!$('#c_sucursal_modal').val()) {
            mostrar_cuadro('E', 'Error', 'El campo sucursal no puede quedar nulo');
            return;
        }
        if (!$('#f_acred_modal').val()) {
            mostrar_cuadro('E', 'Error', 'El campo Fecha de Acreditación no puede quedar nulo');
            return;
        }
        if (!$('#f_pago_modal').val()) {
            mostrar_cuadro('E', 'Error', 'El campo Fecha de Pago no puede quedar nulo');
            return;
        }

        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                "p_c_banco": $('#c_banco_modal').val(),
                "p_c_sucursal": $('#c_sucursal_modal').val(),
                "p_f_acred": $('#f_acred_modal').val(),
                "p_f_pago": $('#f_pago_modal').val(),
                "id_menu": p_id_menu,
                "n_orden": 9
            },
            dataType: 'json',
            success: function (data) {
                if (data.resultado == 'OK') {
                    if (data.p_preguntar == 'SI') {
                        mostrar_cuadro('Q', 'Confirmación',
                            "Ya existe una planilla ingresada para el mismo Banco, Sucursal y Fecha  - Desea continuar ?",
                            function () {
                                continuar_abm_rend_cab();
                            },
                            function () { }, 500);
                    } else {
                        continuar_abm_rend_cab();
                    }
                }
                else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    });

    $('#i_tasa_modal, #i_importe_modal').on('focusout change', function () {
        if ($('#i_tasa_modal').val() && $('#i_importe_modal').val()) {
            let total = parseFloat($('#i_importe_modal').val()) + parseFloat($('#i_tasa_modal').val());
            $('#i_total_modal').val(total);
            $('#i_total_modal').trigger('focusout');
        }
    });

    $('#btn_guardar_rend_det').click(function () {

        if (!$('#c_tributo_modal').val() || !$('#c_cod_form_modal').val()) {
            mostrar_cuadro('E', 'Error', 'Los registros del detalle no pueden quedar nulos');
            return;
        } else {
            abm_rend_det();
        }
    });

    $('#btn_confirmar_alta').click(function () {
        if ($('#main_grid_tmp').getGridParam('records') <= 0 && $('#det_grid_tmp').getGridParam('records') <= 0) {
            mostrar_cuadro('I', 'Información', 'No hay cambios para guardar');
            return;
        }

        confirmar_alta();
    });

    $('#btn_limpiar_rend_cab').click(function () {
        $('#c_banco_modal').val(null);
        $('#d_banco_modal').val(null);
        $('#c_sucursal_modal').val(null);
        $('#d_sucursal_modal').val(null);
        $('#f_acred_modal').val(null);
        $('#f_pago_modal').val(null);
    });

    $('#btn_limpiar_rend_det').click(function () {
        $('#c_tributo_modal').val(null);
        $('#d_tributo_modal').val(null);
        $('#c_cod_form_modal').val(null);
        $('#d_cod_form_modal').val(null);
        $('#n_cantidad_modal').val(null);
        $('#i_importe_modal').val(null);
        $('#i_tasa_modal').val(null);
        $('#i_total_modal').val(null);

    });

    $('#btn_cancelar_rend_det, #btn_cerrar_abm_rend_det').click(function () {
        $('#btn_limpiar_rend_det').trigger('click');
    });

    $('#btn_cancelar_rend_cab, #btn_cerrar_abm_rend_cab').click(function () {
        $('#btn_limpiar_rend_cab').trigger('click');
    });
}
