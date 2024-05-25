function init_grillas() {
    $("#main_grid").jqGrid({
        colNames: main_grid.colNames(),
        colModel: main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "",
        postData: main_grid.postData(),
        autowidth: false,
        width: 940,
        //editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        shrinkToFit: true,
        onSelectRow: function (id) {
            p_id_rendicion = $(this).getCell(id, 'id_rendicion');

            p_c_banco = $(this).getCell(id, 'c_banco');

            p_f_acred = $(this).getCell(id, 'f_acred');

            p_f_pago = $(this).getCell(id, 'f_pago');

            p_c_sucursal = $(this).getCell(id, 'c_sucursal');

            p_n_remito = $(this).getCell(id, 'n_remito');

            $('#f_pago').val($(this).getCell(id, 'f_pago'));
            $('#f_acred').val($(this).getCell(id, 'f_acred'));

            setea_parametros('#det_grid', {
                ':p_c_banco': p_c_banco,
                ":p_id_rendicion": p_id_rendicion
            });


        },
        loadComplete: function () {
            if (validaFechaNula() && validarBanco() && validarSucursal() && validarFecha()) {
                if ($("#main_grid").jqGrid("getGridParam", "records") == 0) {
                    //mostrar_error("No se obtuvo ningun resultado", "E", true);
                }
            }
            var id = $("#main_grid").jqGrid('getDataIDs')[0];
            $("#main_grid").jqGrid('setSelection', id);

            //$("#det_grid").jqGrid("clearGridData");


        }
    }).navGrid('#main_grid_pager',
        { add: false, edit: false, del: true }, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#det_grid").jqGrid({
        colNames: det_grid.colNames(),
        colModel: det_grid.colModel(),
        pager: $('#det_grid_pager'),
        caption: "",
        postData: det_grid.postData(),
        autowidth: false,
        width: 940,
        shrinkToFit: true,
        loadComplete: function () {

            if ($(this).jqGrid("getGridParam", "records") == 0) {
                $("#tot_cantidad").val("");

                $("#tot_impue").val("");

                $("#tot_tasa").val("");

                $("#tot_total").val("");

            }

            else {
                $("#tot_cantidad").val($(this).getCell(1, 'tot_cantidad'));

                $("#tot_impue").val($(this).getCell(1, 'tot_impuesto'));

                $("#tot_tasa").val($(this).getCell(1, 'tot_tasa'));

                $("#tot_total").val($(this).getCell(1, 'tot_total'));
            }

        }
    }).navGrid('#det_grid_pager',
        { add: false, edit: false, del: true }, //options
        {}, // edit options
        {}, // add options
        {
            top: 500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function (formid) {
                borrar_total_planilla(p_c_banco, p_c_sucursal, p_f_acred, p_n_remito, p_f_pago);
            }),
            closeAfterAdd: true
        }, // del options
        {} // search options
    );

    $("#main_grid_tmp").jqGrid({
        colNames: main_grid_tmp.colNames(),
        colModel: main_grid_tmp.colModel(),
        pager: $('#main_grid_tmp_pager'),
        caption: "",
        postData: main_grid_tmp.postData(),
        autowidth: false,
        width: 940,
        //editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        shrinkToFit: true,
        onSelectRow: function (id) {

            setea_parametros('#det_grid_tmp', {
                ':p_id_rendicion': $(this).getCell(id, 'id_rendicion'),
                ":p_id_sesion": v_id_sesion,
                ":p_c_banco": $(this).getCell(id, 'c_banco')
            });
        },
        loadComplete: function () {

        }
    }).navGrid('#main_grid_tmp_pager',
        { add: false, edit: false, del: false }, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    ).navButtonAdd('#main_grid_tmp_pager',
        {
            id: 'btn_borrar_rend_cab',
            caption: "",
            position: "first",
            buttonicon: "glyphicon glyphicon-trash",
            title: "Borrar",
            cursor: "pointer",
            onClickButton: function () {
                v_oper = 'delete';


                if ($('#main_grid_tmp').getGridParam('records') <= 0) {
                    mostrar_cuadro('E', 'Error', 'No hay registros para eliminar');
                    return;
                }
                else if (!$('#main_grid_tmp').getGridParam('selrow')) {
                    mostrar_cuadro('E', 'Error', 'Debe seleccionar una fila para eliminar');
                    return;
                }
                else if ($('#det_grid_tmp').getGridParam('records') > 0) {
                    mostrar_cuadro('E', 'Error', 'Debe borrar el detalle de la rendición antes de borrar la cabecera');
                    return;
                }

                continuar_abm_rend_cab();
            }
        }).navButtonAdd('#main_grid_tmp_pager',
            {
                id: 'btn_modif_rend_cab',
                caption: "",
                position: "first",
                buttonicon: "glyphicon glyphicon-edit",
                title: "Modificación",
                cursor: "pointer",
                onClickButton: function () {
                    v_oper = 'edit';
                    let row_id = $('#main_grid_tmp').getGridParam('selrow');

                    if (!row_id) {
                        mostrar_cuadro('E', 'Error', 'Debe seleccionar una fila para modificar');
                        return;
                    }

                    $('#c_banco_modal').val($('#main_grid_tmp').getCell(row_id, 'c_banco'));
                    $('#c_sucursal_modal').val($('#main_grid_tmp').getCell(row_id, 'c_sucursal'));
                    $('#f_acred_modal').val($('#main_grid_tmp').getCell(row_id, 'f_acred'));
                    $('#f_pago_modal').val($('#main_grid_tmp').getCell(row_id, 'f_pago'));
                    $('#abm_rend_cab_title').text('Modificación Rendiciones');
                    $('#abm_rend_cab_modal').modal('show');
                }
            }).navButtonAdd('#main_grid_tmp_pager',
                {
                    id: 'btn_alta_rend_cab',
                    caption: "",
                    position: "first",
                    buttonicon: "glyphicon glyphicon-plus",
                    title: "Alta",
                    cursor: "pointer",
                    onClickButton: function () {
                        v_oper = 'add';
                        $('#abm_rend_cab_title').text('Alta Rendiciones');
                        $('#abm_rend_cab_modal').modal('show');
                    }
                });

    $("#det_grid_tmp").jqGrid({
        colNames: det_grid_tmp.colNames(),
        colModel: det_grid_tmp.colModel(),
        pager: $('#det_grid_tmp_pager'),
        caption: "",
        postData: det_grid_tmp.postData(),
        autowidth: false,
        width: 940,
        shrinkToFit: true,
        loadComplete: function () {
            if ($(this).jqGrid("getGridParam", "records") == 0) {
                $("#tot_cantidad").val("");

                $("#tot_impue").val("");

                $("#tot_tasa").val("");

                $("#tot_total").val("");

            }

            else {
                $("#tot_cantidad").val($(this).getCell(1, 'tot_cantidad'));

                $("#tot_impue").val($(this).getCell(1, 'tot_impuesto'));

                $("#tot_tasa").val($(this).getCell(1, 'tot_tasa'));

                $("#tot_total").val($(this).getCell(1, 'tot_total'));
            }
        },
        onSelectRow: function (id) {

        },
    }).navGrid('#det_grid_tmp_pager',
        { add: false, edit: false, del: false }, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    ).navButtonAdd('#det_grid_tmp_pager',
        {
            id: 'btn_borrar_rend_det',
            caption: "",
            position: "first",
            buttonicon: "glyphicon glyphicon-trash",
            title: "Borrar",
            cursor: "pointer",
            onClickButton: function () {
                v_oper = 'delete';

                if ($('#det_grid_tmp').getGridParam('records') <= 0 || $('#main_grid_tmp').getGridParam('records') <= 0) {
                    mostrar_cuadro('E', 'Error', 'No hay registros para eliminar');
                    return;
                }
                else if (!$('#det_grid_tmp').getGridParam('selrow')) {
                    mostrar_cuadro('E', 'Error', 'Debe seleccionar una fila para eliminar');
                    return;
                }

                abm_rend_det();
            }
        }).navButtonAdd('#det_grid_tmp_pager',
            {
                id: 'btn_modif_rend_det',
                caption: "",
                position: "first",
                buttonicon: "glyphicon glyphicon-edit",
                title: "Modificación",
                cursor: "pointer",
                onClickButton: function () {
                    v_oper = 'edit';
                    let row_id = $('#det_grid_tmp').getGridParam('selrow');

                    if (!row_id) {
                        mostrar_cuadro('E', 'Error', 'Debe seleccionar una fila para modificar');
                        return;
                    }

                    $('#c_tributo_modal').val($('#det_grid_tmp').getCell(row_id, 'c_tributo'));
                    $('#c_tributo_modal').blur();
                    $('#c_cod_form_modal').val($('#det_grid_tmp').getCell(row_id, 'c_codigo_form'));
                    $('#c_cod_form_modal').blur();
                    $('#n_cantidad_modal').val($('#det_grid_tmp').getCell(row_id, 'n_cantidad'));
                    $('#i_importe_modal').val($('#det_grid_tmp').getCell(row_id, 'i_impuesto'));
                    $('#i_tasa_modal').val($('#det_grid_tmp').getCell(row_id, 'i_tasa'));
                    $('#i_total_modal').val($('#det_grid_tmp').getCell(row_id, 'i_total'));

                    $('#abm_rend_det_title').text('Modificación Detalle Rendiciones');
                    $('#abm_rend_det_modal').modal('show');
                }
            }).navButtonAdd('#det_grid_tmp_pager',
                {
                    id: 'btn_alta_rend_det',
                    caption: "",
                    position: "first",
                    buttonicon: "glyphicon glyphicon-plus",
                    title: "Alta",
                    cursor: "pointer",
                    onClickButton: function () {
                        v_oper = 'add';

                        if (!$('#main_grid_tmp').getGridParam('selrow')) {
                            mostrar_cuadro('E', 'Error', 'Debe seleccionar una rendición antes de agregar un detalle');
                            return;
                        }

                        $('#abm_rend_det_title').text('Alta Detalle Rendiciones');
                        $('#abm_rend_det_modal').modal('show');
                    }
                });
}