function inicializarEventos() {
    $('.datepicker').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    }).mask("99/99/9999");

    $('.numerico').keypress(function (tecla) {
        if (tecla.charCode < 48 || tecla.charCode > 57) {
            if (tecla.charCode !== 44 && tecla.charCode !== 46) {
                return false;
            }
        }
    });

    $('#mascara_lupa_tipo_registro').hide();
    $('#mascara_lupa_envio').hide();

    $('#lupa_d_denominacion').hide();
    $("#n_cuit").mask("99-99999999-9");

    $('#d_denominacion').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 4) {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        }
    });

    $('#n_envio').change(function () {
        if ($('#n_envio').val()) {
            v_c_filtro = $('#n_envio').val();
        }
    });

    $('#btn_habilitar_filtros').click(function () {
        desbloquear_filtros();
    });

    $('#n_cuit').focusout(function () {
        if ($('#n_cuit').val() != '') {
            try {
                if (limpia_cuit($('#n_cuit').val()).length == 11) {
                    $.ajax({
                        url: 'ajax_genericos/autocomplete.php',
                        type: "POST",
                        data: {
                            "term": limpia_cuit($("#n_cuit").val()),
                            "oper": 3
                        },
                        async: true,
                        success: function (data) {
                            ret = eval('(' + data + ')');
                            if (data) {
                                $("#d_denominacion").val(ret.data_raz[0].razon_social);
                                $("#id_contribuyente").val(ret.data_raz[0].id_contribuyente);
                            } else {
                                $("#d_denominacion").val(null);
                                $("#id_contribuyente").val(null);
                            }
                        }
                    });

                } else {
                    $('#btn_limpiar').click();
                }
            } catch (err) {
            }
        } else {
            $("#id_contribuyente").val("");
        }
    });

    $('#btn_buscar').click(function () {
        let filtros = definir_filtros();

        if ($('#c_tipo_registro').val() == 'C4') {
            $('#jqgh_main_grid_n_cuit').text('Estado Pago');
            $('#jqgh_main_grid_d_denominacion').text('Datos Pago');
        }


        filtros_arr_rnpa_lst = [];
        filtros_no_nativos_ar = [];

        if ($('#c_tipo_registro').val()) {
            filtros_arr_rnpa_lst.push('Tipo Registro: ' + $('#c_tipo_registro').val());
        }
        if ($('#n_tramite').val()) {
            filtros_arr_rnpa_lst.push('Nro. Trámite: ' + $('#n_tramite').val());
        }
        if ($('#dominio_nuevo').val()) {
            filtros_arr_rnpa_lst.push('Dominio Nuevo: ' + $('#dominio_nuevo').val());
        }
        if ($('#n_cuit').val()) {
            filtros_arr_rnpa_lst.push('CUIT: ' + $('#n_cuit').val());
        }
        if ($('#d_denominacion').val()) {
            filtros_arr_rnpa_lst.push('Denominación: ' + $('#d_denominacion').val());
        }
        if ($('#f_operacion').val()) {
            filtros_arr_rnpa_lst.push('F. Operación: ' + $('#f_operacion').val());
        }
        if ($('#c_reg_secc').val()) {
            filtros_arr_rnpa_lst.push('Reg. Seccional: ' + $('#c_reg_secc').val());
        }
        if ($('#n_envio').val()) {
            filtros_arr_rnpa_lst.push('Nro. Envío: ' + $('#n_envio').val());
        }
        if ($('#c_tipo_registro').val()) {
            filtros_arr_rnpa_lst.push('Tipo Registro: ' + $('#c_tipo_registro').val());
        }
        if ($('#check_ok').is(':checked') || $('#check_error').is(':checked') ||
            $('#check_np').is(':checked') || $('#check_pendientes').is(':checked')) {
            let estados;
            if ($('#check_ok').is(':checked')) {
                estados += ' PROCESADOS,';
            }
            if ($('#check_error').is(':checked')) {
                estados += ' ** ERROR **, ';
            }
            if ($('#check_np').is(':checked')) {
                estados += ' NO PROCESADOS, ';
            }
            if ($('#check_pendientes').is(':checked')) {
                estados += ' PENDIENTES, ';
            }

            filtros_arr_rnpa_lst.push('Estados: ' + estados);
        }

        filtros_no_nativos_ar['main_grid'] = filtros_arr_rnpa_lst;

        setea_parametros('#main_grid', {
            ':p_nro_envio': v_c_filtro,
            ':p_tipo_registro': $('#c_tipo_registro').val(),
            ':p_dominio_nuevo': $('#dominio_nuevo').val(),
            ':p_n_tramite': $('#n_tramite').val(),
            ':p_n_cuit': limpia_cuit($('#n_cuit').val()),
            ':p_d_denominacion': $('#d_denominacion').val(),
            ':p_f_operacion': $('#f_operacion').val(),
            ':p_c_reg_secc': $('#c_reg_secc').val(),
            ':p_d_reg_secc': $('#d_reg_secc').val(),
            ':p_filtros': filtros
        });
        bloquear_filtros();
    });

    $('#btn_ver_todos').click(function () {
        let filtros = '-PROCESADO-** ERROR **-NO PROCESAR--';

        setea_parametros('#main_grid', {
            ':p_nro_envio': null,
            ':p_tipo_registro': $('#c_tipo_registro').val(),
            ':p_dominio_nuevo': $('#dominio_nuevo').val(),
            ':p_n_tramite': $('#n_tramite').val(),
            ':p_n_cuit': limpia_cuit($('#n_cuit').val()),
            ':p_d_denominacion': $('#d_denominacion').val(),
            ':p_f_operacion': $('#f_operacion').val(),
            ':p_c_reg_secc': $('#c_reg_secc').val(),
            ':p_d_reg_secc': $('#d_reg_secc').val(),
            ':p_filtros': filtros
        });
        bloquear_filtros();
        $('#n_envio').val(null);
    });

    $('#btn_limpiar').click(function () {
        $('#jqgh_main_grid_n_cuit').text('CUIT');
        $('#jqgh_main_grid_d_denominacion').text('Denominación');

        $('#c_tipo_registro').val(null);
        $('#d_tipo_registro').val(null);
        $('#dominio_nuevo').val(null);
        $('#d_denominacion').val(null);
        $('#n_tramite').val(null);
        $('#c_reg_secc').val(null);
        $('#d_reg_secc').val(null);
        $('#f_operacion').val(null);
        $('#n_cuit').val(null);
        $('#n_envio').val(null);
        v_c_filtro = null;
        hay_cambios_titulares = false;
        $('#d_error').val(null);

        if (p_modo == 'M') {
            $('#check_ok').prop('checked', false);
            $('#check_error').prop('checked', false);
            $('#check_np').prop('checked', false);
            $('#check_pendientes').prop('checked', false);
        }

        desbloquear_filtros();

        $('#main_grid').clearGridData();
    });

    $('#d_error').dblclick(function () {
        $('#desc_error').val($('#d_error').val());
        $('#error_modal').show();
    });

    //C1
    $('#btn_volver_c1, #btn_cerrar_c1').click(function () {
        let hay_modificaciones = verificar_modificaciones('c1');
        if (hay_modificaciones) {
            mostrar_cuadro('Q', 'Confirmación',
                "Tiene modificaciones sin guardar, desde guardar los cambios?",
                function () {
                    modificar_c1();
                    $('#c1_modal').hide();
                    $('#c1_grid').clearGridData();
                    limpiar_pantalla_c1();
                    inputs_iniciales = {};
                },
                function () {
                    $('#c1_modal').hide();
                    $('#c1_grid').clearGridData();
                    limpiar_pantalla_c1();
                    inputs_iniciales = {};
                }, 500);
        } else {
            $('#c1_modal').hide();
            $('#c1_grid').clearGridData();
            limpiar_pantalla_c1();
            inputs_iniciales = {};
        }
    });

    $('#btn_titulares_c1').click(function () {
        $('#c1_modal').hide();

        filtros_arr_rnpa_tit = [];
        filtros_no_nativos_ar = [];


        filtros_arr_rnpa_tit.push('Nro. Secuencia: ' + $('#c1_grid').getCell(1, 'nro_secuencia'));

        filtros_no_nativos_ar['titulares_grid'] = filtros_arr_rnpa_tit;

        setea_parametros('#titulares_grid', {
            ':p_n_envio': $('#n_envio').val(),
            ':p_n_secuencia': $('#c1_grid').getCell(1, 'nro_secuencia')
        });
        $('#titulares_modal').show();
        $(window).resize();
        $('#tipo_registro_titulares').val('C1');
    });

    $('#btn_tabla_cod_rnpa_c1').click(function () {
        post_to_url('asignacion_codigos_mtm_fmm.php', {
            'p_fmcamod': $('#fmcamod_c1').val(),
            'p_n_id_menu': 100169
        },
            '_blank'
        );
    });

    $('#btn_no_procesar_c1').click(function () {
        mostrar_cuadro('Q', 'Confirmación',
            "Despues de cambiar a este estado no podra modificar el registro, desea continuar?",
            function () {
                no_procesar_c1();
            },
            function () { }, 500);
    });

    $('#btn_confirm_baja_y_proc_c1').click(function () {
        conf_baja_y_proc_c1();
    });

    $('#btn_procesar_c1').click(function () {
        procesar_c1();
    });

    $('#btn_cambiar_dom_y_proc_c1').click(function () {
        cambiar_dom_y_proc_c1();
    });

    $('#btn_guardar_c1').click(function () {
        let hay_modificaciones = verificar_modificaciones('c1');

        if (hay_modificaciones) {
            modificar_c1();
        } else {
            mostrar_cuadro('I', 'Información', 'Debe modificar por lo menos 1 campo');
        }
    });

    $('#dominio_nuevo_c1').dblclick(function () {
        post_to_url('cons_dominio.php', {
            'p_modo': 'C',
            'p_objeto': $('#dominio_nuevo_c1').val(),
            'p_n_id_menu': 10992
        },
            '_blank'
        );
    });

    $('#dominio_viejo_c1').dblclick(function () {
        post_to_url('cons_dominio.php', {
            'p_modo': 'C',
            'p_patente_vieja': $('#dominio_viejo_c1').val(),
            'p_n_id_menu': 10992
        },
            '_blank'
        );
    });

    $('#fmcamod_c1').dblclick(function () {
        post_to_url('asignacion_codigos_mtm_fmm.php', {
            'p_c_fmcamod': $('#fmcamod_c1').val(),
            'p_n_id_menu': 100169
        },
            '_blank'
        );
    });

    $('#n_cuit_c1').dblclick(function () {
        if ($('#n_cuit_c1').val()) {
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_n_cuit": limpia_cuit($('#n_cuit_c1').val()),
                    "id_menu": v_id_menu,
                    "n_orden": 14
                },
                dataType: 'json',
                success: function (data) {
                    if (data.resultado == 'OK') {
                        if (data.p_id_contribuyente) {
                            post_to_url('consulta_contribuyentes.php', {
                                'p_id_contribuyente': data.p_id_contribuyente,
                                'p_n_id_menu': 10932
                            },
                                '_blank'
                            );
                        } else {
                            mostrar_cuadro('E', 'Error', 'No existe el cuit en SIAT');
                        }
                    }
                    else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    $('#btn_copy_c1').click(function () {
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                "p_c_estado": $('#c_estado_c1').val(),
                "p_d_denominacion_siat": $('#d_denominacion_siat_c1').val(),
                "p_d_denominacion_afip": $('#d_denominacion_afip_c1').val(),
                "p_nro_secuencia": $('#c1_grid').getCell(1, 'nro_secuencia'),
                "p_n_cuit": limpia_cuit($('#n_cuit_c1').val()),
                "id_menu": v_id_menu,
                "n_orden": 15
            },
            dataType: 'json',
            success: function (data) {
                if (data.resultado == 'OK') {
                    $('#d_denominacion_c1').val(data.p_d_denominacion);
                }
                else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    });

    $('#d_error_c1').dblclick(function () {
        $('#desc_error').val($('#d_error_c1').val());
        $('#error_modal').show();
    });


    //C2
    $('#btn_titulares_c2').click(function () {
        $('#c2_modal').hide();

        filtros_arr_rnpa_tit = [];
        filtros_no_nativos_ar = [];


        filtros_arr_rnpa_tit.push('Nro. Secuencia: ' + $('#c2_grid').getCell(1, 'nro_secuencia'));

        filtros_no_nativos_ar['titulares_grid'] = filtros_arr_rnpa_tit;

        setea_parametros('#titulares_grid', {
            ':p_n_envio': $('#n_envio').val(),
            ':p_n_secuencia': $('#c2_grid').getCell(1, 'nro_secuencia')
        });
        $('#titulares_modal').show();
        $(window).resize();
        $('#tipo_registro_titulares').val('C2');
    });

    $('#btn_volver_c2, #btn_cerrar_c2').click(function () {
        let hay_modificaciones = verificar_modificaciones('c2');
        if (hay_modificaciones) {
            mostrar_cuadro('Q', 'Confirmación',
                "Tiene modificaciones sin guardar, desde guardar los cambios?",
                function () {
                    modificar_c2();
                    $('#c2_modal').hide();
                    $('#c2_grid').clearGridData();
                    limpiar_pantalla_c2();
                    inputs_iniciales = {};
                },
                function () {
                    $('#c2_modal').hide();
                    $('#c2_grid').clearGridData();
                    limpiar_pantalla_c2();
                    inputs_iniciales = {};
                }, 500);
        } else {
            $('#c2_modal').hide();
            $('#c2_grid').clearGridData();
            limpiar_pantalla_c2();
            inputs_iniciales = {};
        }
    });

    $('#btn_no_procesar_c2').click(function () {
        mostrar_cuadro('Q', 'Confirmación',
            "Despues de cambiar a este estado no podra modificar el registro, desea continuar?",
            function () {
                no_procesar_c2();
            },
            function () { }, 500);
    });

    $('#btn_procesar_c2').click(function () {
        procesar_c2();
    });

    $('#btn_procesar_sin_validar_c2').click(function () {
        procesar_sin_validar_c2();
    });

    $('#btn_guardar_c2').click(function () {
        let hay_modificaciones = verificar_modificaciones('c2');

        if (hay_modificaciones) {
            modificar_c2();
        } else {
            mostrar_cuadro('I', 'Información', 'Debe modificar por lo menos 1 campo');
        }
    });

    $('#dominio_nuevo_c2').dblclick(function () {
        post_to_url('cons_dominio.php', {
            'p_modo': 'C',
            'p_objeto': $('#dominio_nuevo_c2').val(),
            'p_n_id_menu': 10992
        },
            '_blank'
        );
    });

    $('#dominio_viejo_c2').dblclick(function () {
        post_to_url('cons_dominio.php', {
            'p_modo': 'C',
            'p_patente_vieja': $('#dominio_viejo_c2').val(),
            'p_n_id_menu': 10992
        },
            '_blank'
        );
    });

    $('#fmcamod_c2').dblclick(function () {
        post_to_url('asignacion_codigos_mtm_fmm.php', {
            'p_c_fmcamod': $('#fmcamod_c1').val(),
            'p_n_id_menu': 100169
        },
            '_blank'
        );
    });

    $('#d_error_c2').dblclick(function () {
        $('#desc_error').val($('#d_error_c2').val());
        $('#error_modal').show();
    });

    $('#btn_volver_error, #btn_cerrar_errores').click(function () {
        $('#error_modal').hide();
        $('#desc_error').val(null);
    });

    //C4
    $('#btn_volver_c4, #btn_cerrar_c4').click(function () {
        $('#c4_modal').hide();
        $('#c4_grid').clearGridData();
        limpiar_pantalla_c4();
    });

    $('#dominio_nuevo_c4').dblclick(function () {
        post_to_url('cons_dominio.php', {
            'p_modo': 'C',
            'p_objeto': $('#dominio_nuevo_c4').val(),
            'p_n_id_menu': 10992
        },
            '_blank'
        );
    });

    $('#error_ac_prov_c4').dblclick(function () {
        $('#desc_error').val($('#error_ac_prov_c4').val());
        $('#error_modal').show();
    });

    $('#error_ac_def_c4').dblclick(function () {
        $('#desc_error').val($('#error_ac_def_c4').val());
        $('#error_modal').show();
    });


    //C6
    $('#btn_volver_c6, #btn_cerrar_c6').click(function () {
        let hay_modificaciones = verificar_modificaciones('c6');
        if (hay_modificaciones) {
            mostrar_cuadro('Q', 'Confirmación',
                "Tiene modificaciones sin guardar, desde guardar los cambios?",
                function () {
                    modificar_c6();
                    $('#c6_modal').hide();
                    $('#c6_grid').clearGridData();
                    limpiar_pantalla_c6();
                    inputs_iniciales = {};
                },
                function () {
                    $('#c6_modal').hide();
                    $('#c6_grid').clearGridData();
                    limpiar_pantalla_c6();
                    inputs_iniciales = {};
                }, 500);
        } else {
            $('#c6_modal').hide();
            $('#c6_grid').clearGridData();
            limpiar_pantalla_c6();
            inputs_iniciales = {};
        }
    });

    $('#btn_titulares_c6').click(function () {
        $('#c6_modal').hide();

        filtros_arr_rnpa_tit = [];
        filtros_no_nativos_ar = [];


        filtros_arr_rnpa_tit.push('Nro. Secuencia: ' + $('#c6_grid').getCell(1, 'nro_secuencia'));

        filtros_no_nativos_ar['titulares_grid'] = filtros_arr_rnpa_tit;

        setea_parametros('#titulares_grid', {
            ':p_n_envio': $('#n_envio').val(),
            ':p_n_secuencia': $('#c6_grid').getCell(1, 'nro_secuencia')
        });
        $('#titulares_modal').show();
        $(window).resize();
        $('#tipo_registro_titulares').val('C6');
    });

    $('#btn_no_procesar_c6').click(function () {
        mostrar_cuadro('Q', 'Confirmación',
            "Despues de cambiar a este estado no podra modificar el registro, desea continuar?",
            function () {
                no_procesar_c6();
            },
            function () { }, 500);
    });

    $('#btn_procesar_c6').click(function () {
        procesar_c6();
    });

    $('#btn_procesar_sin_validar_c6').click(function () {
        procesar_sin_validar_c6();
    });

    $('#btn_cambiar_dom_proc_c6').click(function () {
        cambiar_dom_y_proc_c6();
    });

    $('#btn_guardar_c6').click(function () {
        let hay_modificaciones = verificar_modificaciones('c6');

        if (hay_modificaciones) {
            modificar_c6();
        } else {
            mostrar_cuadro('I', 'Información', 'Debe modificar por lo menos 1 campo');
        }
    });

    $('#dominio_nuevo_c6').dblclick(function () {
        post_to_url('cons_dominio.php', {
            'p_modo': 'C',
            'p_objeto': $('#dominio_nuevo_c6').val(),
            'p_n_id_menu': 10992
        },
            '_blank'
        );
    });

    $('#dominio_viejo_c6').dblclick(function () {
        post_to_url('cons_dominio.php', {
            'p_modo': 'C',
            'p_patente_vieja': $('#dominio_viejo_c6').val(),
            'p_n_id_menu': 10992
        },
            '_blank'
        );
    });

    $('#fmcamod_c6').dblclick(function () {
        post_to_url('asignacion_codigos_mtm_fmm.php', {
            'p_c_fmcamod': $('#fmcamod_c1').val(),
            'p_n_id_menu': 100169
        },
            '_blank'
        );
    });

    $('#n_cuit_c6').dblclick(function () {
        if ($('#n_cuit_c6').val()) {
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_n_cuit": limpia_cuit($('#n_cuit_c6').val()),
                    "id_menu": v_id_menu,
                    "n_orden": 14
                },
                dataType: 'json',
                success: function (data) {
                    if (data.resultado == 'OK') {
                        if (data.p_id_contribuyente) {
                            post_to_url('consulta_contribuyentes.php', {
                                'p_id_contribuyente': data.p_id_contribuyente,
                                'p_n_id_menu': 10932
                            },
                                '_blank'
                            );
                        } else {
                            mostrar_cuadro('E', 'Error', 'No existe el cuit en SIAT');
                        }
                    }
                    else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    $('#btn_copy_c6').click(function () {
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                "p_c_estado": $('#c_estado_c6').val(),
                "p_d_denominacion_siat": $('#d_denominacion_siat_c6').val(),
                "p_d_denominacion_afip": $('#d_denominacion_afip_c6').val(),
                "p_nro_secuencia": $('#c6_grid').getCell(1, 'nro_secuencia'),
                "p_n_cuit": limpia_cuit($('#n_cuit_c6').val()),
                "id_menu": v_id_menu,
                "n_orden": 15
            },
            dataType: 'json',
            success: function (data) {
                if (data.resultado == 'OK') {
                    $('#d_denominacion_c6').val(data.p_d_denominacion);
                }
                else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    });

    $('#d_error_c6').dblclick(function () {
        $('#desc_error').val($('#d_error_c6').val());
        $('#error_modal').show();
    });

    //C7
    $('#btn_volver_c7, #btn_cerrar_c7').click(function () {
        let hay_modificaciones = verificar_modificaciones('c7');
        if (hay_modificaciones) {
            mostrar_cuadro('Q', 'Confirmación',
                "Tiene modificaciones sin guardar, desde guardar los cambios?",
                function () {
                    modificar_c7();
                    $('#c7_modal').hide();
                    $('#c7_grid').clearGridData();
                    limpiar_pantalla_c7();
                    inputs_iniciales = {};
                },
                function () {
                    $('#c7_modal').hide();
                    $('#c7_grid').clearGridData();
                    limpiar_pantalla_c7();
                    inputs_iniciales = {};
                }, 500);
        } else {
            $('#c7_modal').hide();
            $('#c7_grid').clearGridData();
            limpiar_pantalla_c7();
            inputs_iniciales = {};
        }
    });

    $('#btn_no_procesar_c7').click(function () {
        mostrar_cuadro('Q', 'Confirmación',
            "Despues de cambiar a este estado no podra modificar el registro, desea continuar?",
            function () {
                no_procesar_c7();
            },
            function () { }, 500);
    });

    $('#btn_procesar_c7').click(function () {
        procesar_c7();
    });

    $('#btn_guardar_c7').click(function () {
        let hay_modificaciones = verificar_modificaciones('c7');

        if (hay_modificaciones) {
            modificar_c7();
        } else {
            mostrar_cuadro('I', 'Información', 'Debe modificar por lo menos 1 campo');
        }
    });

    $('#dominio_nuevo_c7').dblclick(function () {
        post_to_url('cons_dominio.php', {
            'p_modo': 'C',
            'p_objeto': $('#dominio_nuevo_c7').val(),
            'p_n_id_menu': 10992
        },
            '_blank'
        );
    });

    $('#d_error_c7').dblclick(function () {
        $('#desc_error').val($('#d_error_c7').val());
        $('#error_modal').show();
    });

    //C8
    $('#btn_volver_c8, #btn_cerrar_c8').click(function () {
        let hay_modificaciones = verificar_modificaciones('c8');
        if (hay_modificaciones) {
            mostrar_cuadro('Q', 'Confirmación',
                "Tiene modificaciones sin guardar, desde guardar los cambios?",
                function () {
                    modificar_c8();
                    $('#c8_modal').hide();
                    $('#c8_grid').clearGridData();
                    limpiar_pantalla_c8();
                    inputs_iniciales = {};
                },
                function () {
                    $('#c8_modal').hide();
                    $('#c8_grid').clearGridData();
                    limpiar_pantalla_c8();
                    inputs_iniciales = {};
                }, 500);
        } else {
            $('#c8_modal').hide();
            $('#c8_grid').clearGridData();
            limpiar_pantalla_c8();
            inputs_iniciales = {};
        }
    });

    $('#btn_detalle_c8').click(function () {
        $('#c8_modal').hide();

        filtros_arr_c8_det = [];
        filtros_no_nativos_ar = [];


        filtros_arr_c8_det.push('Nro. Secuencia: ' + $('#c8_grid').getCell(1, 'nro_secuencia'));

        filtros_no_nativos_ar['c8_det_grid'] = filtros_arr_c8_det;

        setea_parametros('#c8_det_grid', {
            ':p_n_envio': $('#n_envio').val(),
            ':p_n_secuencia': $('#c8_grid').getCell(1, 'nro_secuencia')
        })
        $('#c8_det_modal').show();
        $(window).resize();

    });

    $('#btn_volver_c8_det, #btn_cerrar_c8_tit').click(function () {
        $('#c8_det_modal').hide();
        $('#c8_det_gird').clearGridData();
        $('#c8_modal').show();
        $(window).resize();
    });

    $('#btn_volver_titulares, #btn_cerrar_tit').click(function () {
        let hay_modificaciones = verificar_modificaciones('titulares');
        if (hay_modificaciones) {
            mostrar_cuadro('Q', 'Confirmación',
                "Tiene modificaciones sin guardar, desde guardar los cambios?",
                function () {
                    inputs_iniciales_tit = {};
                    let tipo_registro = $('#tipo_registro_titulares').val();

                    modificar_titulares(tipo_registro);

                    $('#titulares_modal').hide();
                    $('#titulares_grid').clearGridData();
                    limpiar_titulares();
                    if (tipo_registro == 'C1') {
                        $('#c1_modal').show();
                    }
                    else if (tipo_registro == 'C2') {
                        $('#c2_modal').show();
                    } else {
                        $('#c6_modal').show();
                    }
                    $(window).resize();
                },
                function () {
                    inputs_iniciales_tit = {};
                    let tipo_registro = $('#tipo_registro_titulares').val();
                    $('#titulares_modal').hide();
                    $('#titulares_grid').clearGridData();
                    limpiar_titulares();
                    if (tipo_registro == 'C1') {
                        $('#c1_modal').show();
                    }
                    else if (tipo_registro == 'C2') {
                        $('#c2_modal').show();
                    } else {
                        $('#c6_modal').show();
                    }
                    $(window).resize();
                }, 500);
        } else {
            inputs_iniciales_tit = {};
            let tipo_registro = $('#tipo_registro_titulares').val();
            $('#titulares_modal').hide();
            $('#titulares_grid').clearGridData();
            limpiar_titulares();
            if (tipo_registro == 'C1') {
                $('#c1_modal').show();
            }
            else if (tipo_registro == 'C2') {
                $('#c2_modal').show();
            } else {
                $('#c6_modal').show();
            }
            $(window).resize();
            $('#tipo_registro_titulares').val(null);
        }
    });

    $('#btn_leer_cod_rnpa').click(function () {
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                "p_nro_secuencia": $('#c1_grid').getCell(1, 'nro_secuencia'),
                "id_menu": v_id_menu,
                "n_orden": 1
            },
            dataType: 'json',
            success: function (data) {
                if (data.resultado == 'OK') {
                    $('#c1_grid').trigger('reloadGrid');
                }
                else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    })

    $('#btn_guardar_c8').click(function () {
        let hay_modificaciones = verificar_modificaciones('c8');

        if (hay_modificaciones) {
            modificar_c8();
        } else {
            mostrar_cuadro('I', 'Información', 'Debe modificar por lo menos 1 campo');
        }
    });

    $('#dominio_nuevo_c8').dblclick(function () {
        post_to_url('cons_dominio.php', {
            'p_modo': 'C',
            'p_objeto': $('#dominio_nuevo_c8').val(),
            'p_n_id_menu': 10992
        },
            '_blank'
        );
    });

    $('#dominio_viejo_c8').dblclick(function () {
        post_to_url('cons_dominio.php', {
            'p_modo': 'C',
            'p_patente_vieja': $('#dominio_viejo_c8').val(),
            'p_n_id_menu': 10992
        },
            '_blank'
        );
    });

    $('#fmcamod_c8').dblclick(function () {
        post_to_url('asignacion_codigos_mtm_fmm.php', {
            'p_c_fmcamod': $('#fmcamod_c1').val(),
            'p_n_id_menu': 100169
        },
            '_blank'
        );
    });

    $('#d_error_c8').dblclick(function () {
        $('#desc_error').val($('#d_error_c8').val());
        $('#error_modal').show();
    });

    //TITULARES

    $('#btn_copy_tit').click(function () {
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                "p_c_estado": $('#c_estado_tit').val(),
                "p_d_denominacion_siat": $('#d_denominacion_siat_tit').val(),
                "p_d_denominacion_afip": $('#d_denominacion_afip_tit').val(),
                "p_nro_secuencia": $('#titulares_grid').getCell(1, 'nro_secuencia'),
                "p_n_cuit": limpia_cuit($('#n_cuit_tit').val()),
                "id_menu": v_id_menu,
                "n_orden": 15
            },
            dataType: 'json',
            success: function (data) {
                if (data.resultado == 'OK') {
                    $('#d_denominacion_tit').val(data.p_d_denominacion);
                }
                else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    });

}