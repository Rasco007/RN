$(document).ready(function () {
    if (error) {
        mostrar_cuadro('E', 'Carga de Inspección', error, function () {
            window.close();
        });

        return false;
    }

    if (modo == 'CON') {
        modo_consulta();
    }

    setFocusEvents();

    var datos_main_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid: 0,
        m_autoquery: 'S',
        keyNavigation: false,
        param: {
            ':p_n_instancia': v_n_instancia,
            'p_n_orden': v_n_orden
        }
    });

    var v_id_obligacion;

    $("#obligaciones_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#obligaciones_grid_pager'),
        //caption: "Fiscalizaciones Asignadas" ,
        postData: datos_main_grid.postData(),
        sortname: 'pos_fiscal_inv',
        editurl: FUNCIONES_BASEPATH + "maestro_abm_grid.php",
        gridview: false,
        rowList: false,
        height: 360,
        rowNum: 12,
        ondblClickRow: function (id) {
            v_id_obligacion = $("#obligaciones_grid").getCell(id, 'id_obligacion');
            v_m_aplica_ctacte = $("#obligaciones_grid").getCell(id, 'm_aplica_ctacte');

            if (v_m_aplica_ctacte == 'N' || modo == 'CON') {
                modo_obl = 'CON';
            } else {
                modo_obl = 'CAR';
            }

            post_to_url('carga_inspec_iibb_oblig.php', {
                'p_n_id_menu': 10773,
                'p_m_autoquery': 'S',
                'p_n_instancia': v_n_instancia,
                'p_n_orden': v_n_orden,
                'p_id_obligacion': v_id_obligacion,
                'p_modo': modo_obl
            }, '_blank', 'POST');
        },
        afterInsertRow: function (rowid, rowData, rowelem) {
            if (rowData.m_aplica_ctacte == 'N') {
                $(this).jqGrid('setRowData', rowid, false, 'obl_allanada');
            }

            if (rowData.f_presentacion) {
                if ($.datepicker.parseDate('dd/mm/yy', rowData.f_presentacion) > $.datepicker.parseDate('dd/mm/yy', rowData.f_apertura)) {
                    $(this).jqGrid('setCell', rowid, 'f_presentacion', '', 'dj_posterior');
                }
            }

            if (rowData.anul_saf > 0
                && rowData.id_obligacion === rowData.first_obl
                && rowData.I_SALDO_FAVOR_DECL === rowData.I_SALDO_FAVOR) {
                $(this).jqGrid('setCell', rowid, 'I_SALDO_FAVOR_DECL', '', 'anul_saf_fist_pos');
                $(this).jqGrid('setCell', rowid, 'I_SALDO_FAVOR', '', 'anul_saf_fist_pos');
            }

            if (rowData.m_pago_prov > 0 || rowData.m_jcq > 0 || rowData.m_pfp_vigente > 0){
                $(this).jqGrid('setCell', rowid, 'I_OTROS_DEB_VERIF', '', 'm_pago_prov_jcq_pfp');
            }

            if (rowData.saldo_obl_ant) {

                if (parse(rowData.saldo_obl_ant) > 0) {
                    v_saf_ant = 0;
                } else {
                    v_saf_ant = -(rowData.saldo_obl_ant);
                }

                //console.log(v_saf_ant);
                //console.log(rowData.I_SALDO_FAVOR);
                if (v_saf_ant < parse(rowData.I_SALDO_FAVOR)) {
                    $(this).jqGrid('setCell', rowid, 'I_SALDO_FAVOR', '', 'anul_saf_fist_pos');
                }

            }
        },
        onSelectRow: function (id) {
            v_m_aplica_ctacte = $("#obligaciones_grid").getCell(id, 'm_aplica_ctacte');
            if (modo != 'CON' && v_m_aplica_ctacte != 'N') {
                $('#btn_reset_obl').show();
            } else {
                $('#btn_reset_obl').hide();
            }
            v_id_obligacion = $("#obligaciones_grid").getCell(id, 'id_obligacion');

            $('#n_inscripción').val($("#obligaciones_grid").getCell(id, 'd_objeto_hecho'));
            $('#n_posicion_fiscal').val($("#obligaciones_grid").getCell(id, 'pos_fiscal'));

            v_d_reg_cat_act = $("#obligaciones_grid").getCell(id, 'c_regimen_verif')+" ("+$("#obligaciones_grid").getCell(id, 'd_regimen_verif')+") - "
            v_d_reg_cat_act = v_d_reg_cat_act + $("#obligaciones_grid").getCell(id, 'c_tipo_actividad_verif')+" ("+$("#obligaciones_grid").getCell(id, 'd_tipo_actividad_verif')+") - "
            v_d_reg_cat_act = v_d_reg_cat_act + $("#obligaciones_grid").getCell(id, 'c_categoria_verif')+" ("+$("#obligaciones_grid").getCell(id, 'd_categoria_verif')+")"


            //reg, act, cat
            $('#d_reg_act_cat').val(v_d_reg_cat_act);

        },
        gridComplete: function () {
            $('#btn_reset_obl').hide();
            $('#n_inscripción,#d_reg_act_cat,#n_posicion_fiscal').val(null);

            /*$('.obl_allanada').attr({"data-toggle":"tooltip", "title":"Allanada"});

            //$('.dj_posterior').parent().attr({"data-toggle":"tooltip", "title":$(this).attr('title') + ' DJ'})

            $('.dj_posterior').each(function( index, element ) {
                let title = $(element).parent().attr('title');
                title = title + '- DJ Posterior'
                $(element).parent().attr({"data-toggle":"tooltip", "title":title})
            });

            $('.anul_saf_fist_pos').each(function( index, element ) {
                let title = $(element).parent().attr('title');
                title = title + '- Anul SAF'
                $(element).parent().attr({"data-toggle":"tooltip", "title":title})
            });

            $(function () {
                $('[data-toggle="tooltip"]').tooltip();
            })*/
            $("#obligaciones_grid").jqGrid("setColProp", "pos_fiscal",{frozen: true})
            $("#obligaciones_grid").jqGrid('setFrozenColumns');
        }
    }).navGrid('#obligaciones_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    ).navButtonAdd('#obligaciones_grid_pager', {
        id: 'btn_reset_obl',
        caption: "Restaurar Obl.",
        position: "first",
        buttonicon: "glyphicon glyphicon-retweet",
        title: "Restaurar carga de inspección para la obligación seleccionada",
        cursor: "pointer",
        onClickButton: function () {
            mostrar_cuadro('C', 'Restaurar Obligación',
                '¿Esta seguro/a que desea restaurar la obligación?. Todos las modificaciones se perderán.',
                function () {
                    $('#main').procOverlay({visible: true});
                    $.ajax({
                        type: 'POST',
                        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                        data: {
                            "p_n_instancia": v_n_instancia,
                            "p_n_orden": v_n_orden,
                            "p_id_obligacion": v_id_obligacion,
                            "id_menu": 10769,
                            "n_orden": 4
                        },
                        dataType: 'json',
                        success: function (data) {
                            $('#main').procOverlay({visible: false});
                            if (data.resultado == 'OK') {
                                mostrar_mensaje_modal('S', 'Restauración de Obligación', 'La obligación ha sido restaurada exitosamente.');
                                $('#obligaciones_grid').trigger('reloadGrid');
                            } else {
                                mostrar_cuadro('E', 'Error', data.resultado);
                                return;
                            }
                        }
                    });
                }, function () {
                    return;
                }
            );
        }
    }).navButtonAdd('#obligaciones_grid_pager', {
        id: 'btn_cta_cte',
        caption: "Ver Cta. Cte.",
        position: "first",
        buttonicon: "glyphicon glyphicon-search",
        title: "Ir a la cuenta corriente de la obligación",
        cursor: "pointer",
        onClickButton: function () {
            if ($("#obligaciones_grid").getGridParam('selrow')) {
                var p_n_cuit = $('#n_cuit').val();
                var p_id_obligacion = v_id_obligacion;

                post_to_url('detalle_cuenta_corr.php', {
                    'p_f_actualizacion': null,
                    'p_n_id_menu': 10854,
                    'n_cuit': p_n_cuit,
                    'id_obligacion': p_id_obligacion,
                    'n_pos_fiscal': null,
                    'n_cuota': null
                }, '_blank', 'POST');
            } else {
                mostrar_validacion('Debe seleccionar un registro');
            }

        }
    });

    $(".input_fecha").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá']
    }).change(function () {
        if ($(this).val().length > 0 && $(this).val().length != 10) {
            mostrar_error("El Formato de la Fecha ingresada no es válido.");
            $(this).val(null);
        }
    }).mask("99/99/9999");

    $('#btn_generar').click(function () {
        if ($('#frm_liq_iibb').validationEngine('validate')) {
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_n_instancia": v_n_instancia,
                    "p_n_orden": v_n_orden,
                    "p_f_actualizacion": $('#f_vto').val(),
                    "id_menu": v_id_menu,
                    "n_orden": 0
                },
                dataType: 'json',
                success: function (data) {
                    if (data.resultado == 'OK') {
                        $('#obligaciones_grid').trigger('reloadGrid');
                    } else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    $('#btn_rec_pagos').click(function () {
        mostrar_mensaje_modal('C', 'Recuperar Pagos', 'Se encuentra a punto de Recuperar todos los Pagos asociados a la Fiscalización.<br>¿Desea Continuar?',
            function () {
                $('#main').procOverlay({visible: true, zIndex: 59000});
                $.ajax({
                    type: 'POST',
                    url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                    data: {
                        "p_n_instancia": v_n_instancia,
                        "p_n_orden": v_n_orden,
                        "id_menu": v_id_menu,
                        "n_orden": 1
                    },
                    dataType: 'json',
                    success: function (data) {
                        $('#main').procOverlay({visible: false});
                        if (data.resultado == 'OK') {
                            $('#obligaciones_grid').trigger('reloadGrid');
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

    $('#btn_rec_deducciones').click(function () {
        $('#modal_deducciones').modal('show');
    });

    $('#btn_del_verif').click(function () {
        mostrar_cuadro('C', 'Eliminar Actividades',
            '¿Esta seguro/a que desea eliminar todas las Actividades con BI Verificada igual a 0?',
            function () {
                $('#main').procOverlay({visible: true});
                $.ajax({
                    type: 'POST',
                    url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                    data: {
                        "p_n_instancia": v_n_instancia,
                        "p_n_orden": v_n_orden,
                        "p_id_obligacion": null,
                        "p_oper": 'all',
                        "id_menu": v_id_menu,
                        "n_orden": 3
                    },
                    dataType: 'json',
                    success: function (data) {
                        $('#main').procOverlay({visible: false});
                        if (data.resultado == 'OK') {
                            mostrar_mensaje_modal('S', 'Eliminar Actividades', 'Las Actividades con BI Verificada igual a 0 han sido eliminadas con éxito.');
                            $('#obligaciones_grid').trigger('reloadGrid');
                        } else {
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                });
            }, function () {
                return;
            }
        );
    });

    function setFocusEvents() {
        active_element = document.activeElement;
        if (isIE) {
            document.onfocusout = function () {
                onWindowBlur();
            }
            document.onfocusin = function () {
                onWindowFocus();
            }
        } else {
            window.onblur = function () {
                onWindowBlur();
            }
            window.onfocus = function () {
                onWindowFocus();
            }
        }
    }

    function onWindowFocus() {
        $('#obligaciones_grid').trigger('reloadGrid');
        hasFocus = true;
    }

    function onWindowBlur() {
        if (active_element != document.activeElement) {
            active_element = document.activeElement;
            return;
        }
        hasFocus = false;
    }


    $('#btn_fin_carga').click(function () {
        mostrar_cuadro('Q', 'Atención', 'Se procederá a finalizar la carga del formulario F109.<br>¿Desea continuar?',
            function () {
                $.ajax({
                    type: 'POST',
                    url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                    data: {
                        "p_id_inspeccion": v_id_inspeccion,
                        "id_menu": v_id_menu,
                        "n_orden": 5
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.resultado == 'OK') {
                            mostrar_cuadro('S', 'Finalización exitosa!', 'Se ha finalizado la inspección Nro. ' + v_id_inspeccion,
                                function () {
                                    window.close();
                                });
                        } else {
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                });
            }, function () {
                return;
            });
    });

});