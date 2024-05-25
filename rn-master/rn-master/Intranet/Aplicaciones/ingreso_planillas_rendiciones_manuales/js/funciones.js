function init_lupas() {
    $("#lupa_banco").lupa_generica({
        id_lista: v_lista_bancos,
        titulos: ['Código', 'Descripción'],
        grid: [{ index: 'c_banco', width: 100 },
        { index: 'd_descrip', width: 450 }],
        caption: 'Bancos',
        sortname: 'c_banco',
        sortorder: 'asc',
        searchCode: true,
        searchInput: '#c_banco',
        exactField: 'c_banco',
        filtros: ['#c_banco'],
        filtrosNulos: [true],
        campos: { c_banco: 'c_banco', d_descrip: 'd_banco' },
        keyNav: true,
        limpiarCod: true,
        onClose: function () {
            habilitarBoton();
        }
    });

    $("#lupa_banco_modal").lupa_generica({
        id_lista: v_lista_bancos,
        titulos: ['Código', 'Descripción'],
        grid: [{ index: 'c_banco', width: 100 },
        { index: 'd_descrip', width: 450 }],
        caption: 'Bancos',
        sortname: 'c_banco',
        sortorder: 'asc',
        searchCode: true,
        searchInput: '#c_banco_modal',
        exactField: 'c_banco',
        filtros: ['#c_banco_modal'],
        filtrosNulos: [true],
        campos: { c_banco: 'c_banco_modal', d_descrip: 'd_banco_modal' },
        keyNav: true,
        limpiarCod: true,
        /*onClose: function () {
            habilitarBoton();
        }*/
    });

    $("#lupa_sucursal").lupa_generica({
        id_lista: v_lista_sucursales,
        titulos: ['Banco', 'Cod. Sucursal', 'Descripción'],
        grid: [{ index: 'c_banco', width: 100 },
        { index: 'c_sucursal', width: 130 },
        { index: 'd_descrip', width: 320 }],
        caption: 'Sucursales',
        sortname: 'c_sucursal',
        sortorder: 'asc',
        searchCode: true,
        searchInput: '#c_sucursal',
        exactField: 'c_sucursal',
        filtros: ['#c_banco', '#c_sucursal'],
        filtrosNulos: [true, true],
        campos: { c_banco: 'c_banco', c_sucursal: 'c_sucursal', d_descrip: 'd_sucursal' },
        keyNav: true,
        limpiarCod: true,
    });

    $("#lupa_sucursal_modal").lupa_generica({
        id_lista: v_lista_sucursales,
        titulos: ['Banco', 'Cod. Sucursal', 'Descripción'],
        grid: [{ index: 'c_banco', width: 100 },
        { index: 'c_sucursal', width: 130 },
        { index: 'd_descrip', width: 320 }],
        caption: 'Sucursales',
        sortname: 'c_sucursal',
        sortorder: 'asc',
        searchCode: true,
        searchInput: '#c_sucursal_modal',
        exactField: 'c_sucursal',
        filtros: ['#c_banco_modal', '#c_sucursal_modal'],
        filtrosNulos: [true, true],
        campos: { c_banco: 'c_banco_modal', c_sucursal: 'c_sucursal_modal', d_descrip: 'd_sucursal_modal' },
        keyNav: true,
        limpiarCod: true,
    });

    $("#lupa_tributo_modal").lupa_generica({
        id_lista: v_lista_tributos,
        titulos: ['Código', 'Descripción'],
        grid: [{ index: 'c_tributo', width: 100 },
        { index: 'd_descrip', width: 450 }],
        caption: 'Lista de Tributos',
        sortname: 'c_tributo',
        sortorder: 'asc',
        searchCode: true,
        searchInput: '#c_tributo_modal',
        exactField: 'c_tributo',
        campos: { c_tributo: 'c_tributo_modal', d_descrip: 'd_tributo_modal' },
        keyNav: true,
        limpiarCod: true,
    });

    $("#lupa_cod_form_modal").lupa_generica({
        id_lista: v_lista_codigo_form,
        titulos: ['Código', 'Tributo', 'Descripción'],
        grid: [{ index: 'c_codigo_bco', width: 100 },
        { index: 'c_tributo', width: 100 },
        { index: 'd_descripcion', width: 450 }],
        caption: 'Lista de Códigos',
        sortname: 'c_codigo_bco',
        sortorder: 'asc',
        searchCode: true,
        searchInput: '#c_cod_form_modal',
        exactField: 'c_codigo_bco',
        filtros: ['#c_tributo_modal'],
        filtrosNulos: [true],
        campos: { c_codigo_bco: 'c_cod_form_modal', d_descripcion: 'd_cod_form_modal' },
        keyNav: true,
        limpiarCod: true,
    });
}

function validarFecha() {
    let valorBool = true;
    if ($.datepicker.parseDate('dd/mm/yy', $('#f_pago').val()) > $.datepicker.parseDate('dd/mm/yy', $('#f_acred').val()) && $("#f_acred").val() != '') {
        valorBool = false;
        mostrar_error('La fecha de pago no puede ser mayor a la fecha de acreditacion', 'E', true);
    }
    else {
        valorBool = true;
    }
    return valorBool;
}


function habilitarBoton() {
    if ($("#c_banco").val() == 905 || $("#c_banco").val() == 907 || $("#c_banco").val() == 910) {
        $("#controlado").prop("disabled", false);
    } else {
        $("#controlado").prop("disabled", true);
    }
}

function controlar(p_c_banco, p_c_sucursal, p_f_acred, p_f_pago, p_n_remito) {
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_banco": p_c_banco,
            "p_c_sucursal": p_c_sucursal,
            "p_f_acred": p_f_acred,
            "p_f_pago": p_f_pago,
            "p_n_remito": p_n_remito,
            "id_menu": p_id_menu,
            "n_orden": 1
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                mostrar_cuadro("S", "Exito", "El proceso finalizó correctamente");
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}


function validaNuloBanco() {
    if ($("#c_banco").val() != null) {
        p_c_banco = $("#c_banco").val();
    }
}

function validaNuloSucursal() {
    if ($("#c_sucursal").val() == '' || $("#c_sucursal").val() == null) {
        $("#d_banco").val(null);
    } else {
        p_c_sucursal = $("#c_sucursal").val();
    }
}


function validaFechaNula() {
    var resultado;

    var mensaje;
    if ($("#f_acred").val() == '') {
        resultado = false;
    }
    else {
        resultado = true
    }

    return resultado;
}


function validarBanco() {
    var resultado;
    if ($("#c_banco").val() == '') {
        resultado = false;
    }
    else {
        resultado = true;
    }

    return resultado;
}


function validarSucursal() {
    var resultado;
    if ($("#c_sucursal").val() == '') {
        resultado = false;
    }
    else {
        resultado = true;
    }

    return resultado;
}

function validaRemito() {
    var resultado;
    if (p_n_remito = null) {

        mostrar_cuadro("Seleccionar un archivo", "E", true);

        resultado = false;
    }
    else {
        resultado = true;
    }

    return resultado;
}

function borrar_total_planilla(p_c_banco, p_c_sucursal, p_f_acred, p_n_remito, p_f_pago) {
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_banco": p_c_banco,
            "p_c_sucursal": p_c_sucursal,
            "p_f_acred": p_f_acred,
            "p_n_remito": p_f_pago,
            "p_f_pago": p_n_remito,
            "id_menu": p_id_menu,
            "n_orden": 0
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

function habilitar_consulta() {
    $('#container_main_grid_consulta').prop('hidden', false);
    $('#container_btn_controlado').prop('hidden', false);
    $('#container_det_grid_consulta').prop('hidden', false);
    $('#container_totales').prop('hidden', false);
    $(window).resize();
}

function habilitar_alta() {
    $('#btn_buscar').prop('disabled', true);
    $('#btn_confirmar_alta').prop('disabled', false);

    $('#c_banco').prop('disabled', true);
    $('#c_sucursal').prop('disabled', true);
    $('#f_acred').prop('disabled', true);
    $('#f_pago').prop('disabled', true);

    $('#c_banco').val(null);
    $('#d_banco').val(null);
    $('#c_sucursal').val(null);
    $('#d_sucursal').val(null);
    $('#f_acred').val(null);
    $('#f_pago').val(null);

    $('#lupa_banco').hide();
    $('#mascara_lupa_banco').show();
    $('#lupa_sucursal').hide();
    $('#mascara_lupa_sucursal').show();

    $('#container_main_grid_alta').prop('hidden', false);
    $('#container_main_grid_consulta').prop('hidden', true);
    $('#container_btn_controlado').prop('hidden', false);
    $('#container_det_grid_alta').prop('hidden', false);
    $('#container_det_grid_consulta').prop('hidden', true);
    $('#container_totales').prop('hidden', false);
    $(window).resize();
}

function obtener_id_sesion() {
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_banco": null,
            "id_menu": p_id_menu,
            "n_orden": 10
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                v_id_sesion = data.retorno;
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function continuar_abm_rend_cab() {
    let v_id_rendicion = null;

    if (v_oper == 'edit' || v_oper == 'delete') {
        let row_id = $('#main_grid_tmp').getGridParam('selrow');

        v_id_rendicion = $('#main_grid_tmp').getCell(row_id, 'id_rendicion');
    }


    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_oper": v_oper,
            "p_c_banco": $('#c_banco_modal').val(),
            "p_c_sucursal": $('#c_sucursal_modal').val(),
            "p_f_acred": $('#f_acred_modal').val(),
            "p_f_pago": $('#f_pago_modal').val(),
            "p_id_rendicion": v_id_rendicion,
            "p_id_sesion": v_id_sesion,
            "id_menu": p_id_menu,
            "n_orden": 7
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                if (v_oper == 'add') {
                    mostrar_cuadro('S', 'Exito', 'Alta realizada exitosamente');
                }
                else if (v_oper == 'edit') {
                    mostrar_cuadro('S', 'Exito', 'Modificación realizada exitosamente');
                } else {
                    mostrar_cuadro('S', 'Exito', 'Eliminación realizada exitosamente');
                }
                $('#abm_rend_cab_modal').modal('hide');
                $('#c_banco_modal').val(null);
                $('#d_banco_modal').val(null);
                $('#c_sucursal_modal').val(null);
                $('#d_sucursal_modal').val(null);
                $('#f_acred_modal').val(null);
                $('#f_pago_modal').val(null);

                setea_parametros('#main_grid_tmp', { ':p_id_sesion': v_id_sesion });

            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function abm_rend_det() {
    let v_n_orden = null;
    let rend_cab_row_id = $('#main_grid_tmp').getGridParam('selrow');
    let v_id_rendicion = $('#main_grid_tmp').getCell(rend_cab_row_id, 'id_rendicion');

    if (v_oper == 'edit' || v_oper == 'delete') {
        let row_id = $('#det_grid_tmp').getGridParam('selrow');
        v_n_orden = $('#det_grid_tmp').getCell(row_id, 'n_orden');
        v_id_rendicion = $('#det_grid_tmp').getCell(row_id, 'id_rendicion');
    } else {
        if ($('#det_grid_tmp').getGridParam('records') > 0) {
            v_n_orden = 1;
        }
    }

    if (!$('#n_cantidad_modal').val()) { $('#n_cantidad_modal').val(0) }
    if (!$('#i_importe_modal').val()) { $('#i_importe_modal').val(0) }
    if (!$('#i_tasa_modal').val()) { $('#i_tasa_modal').val(0) }
    if (!$('#i_total_modal').val()) { $('#i_total_modal').val(0) }

    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_oper": v_oper,
            "p_id_rendicion": v_id_rendicion,
            "p_n_orden": v_n_orden,
            "p_c_tributo": $('#c_tributo_modal').val(),
            "p_c_codigo_form": $('#c_cod_form_modal').val(),
            "p_n_cantidad": $('#n_cantidad_modal').val(),
            "p_i_impuesto": $('#i_importe_modal').val(),
            "p_i_tasa": $('#i_tasa_modal').val(),
            "p_i_total": $('#i_total_modal').val(),
            "p_id_sesion": v_id_sesion,
            "id_menu": p_id_menu,
            "n_orden": 8
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                if (v_oper == 'add') {
                    mostrar_cuadro('S', 'Exito', 'Alta realizada exitosamente');
                }
                else if (v_oper == 'edit') {
                    mostrar_cuadro('S', 'Exito', 'Modificación realizada exitosamente');
                } else {
                    mostrar_cuadro('S', 'Exito', 'Eliminación realizada exitosamente');
                }
                $('#abm_rend_det_modal').modal('hide');
                $('#c_tributo_modal').val(null);
                $('#d_tributo_modal').val(null);
                $('#c_cod_form_modal').val(null);
                $('#d_cod_form_modal').val(null);
                $('#n_cantidad_modal').val(null);
                $('#i_importe_modal').val(null);
                $('#i_tasa_modal').val(null);
                $('#i_total_modal').val(null);

                setea_parametros('#det_grid_tmp', {
                    ':p_id_rendicion': $('#main_grid_tmp').getCell(rend_cab_row_id, 'id_rendicion'),
                    ":p_id_sesion": v_id_sesion,
                    ":p_c_banco": $('#main_grid_tmp').getCell(rend_cab_row_id, 'c_banco')
                });
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function confirmar_alta() {
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_id_sesion": v_id_sesion,
            "id_menu": p_id_menu,
            "n_orden": 11
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                mostrar_cuadro('S', 'Exito', 'Alta guardada exitosamente');
                $('#main_grid_tmp').clearGridData();
                $('#det_grid_tmp').clearGridData();
                limpiar();
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function cancelar_alta() {
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_id_sesion": v_id_sesion,
            "id_menu": p_id_menu,
            "n_orden": 12
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                limpiar();
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function limpiar() {
    $("#d_banco").val("");

    $("#c_banco").val("");

    $("#f_acred").val("");

    $("#d_sucursal").val("");

    $("#c_sucursal").val("");

    $("#f_pago").val("");

    $('#det_grid').jqGrid('clearGridData');

    $('#main_grid').jqGrid('clearGridData');

    $("#tot_cantidad").val("");

    $('#btn_buscar').attr('disabled', false);
    $('#c_banco').attr('disabled', false);
    $('#d_banco').attr('disabled', false);
    $('#c_sucursal').attr('disabled', false);
    $('#d_sucursal').attr('disabled', false);
    $('#f_acred').attr('disabled', false);
    $('#f_pago').attr('disabled', false);
    $('#mascara_lupa_banco').hide();
    $('#mascara_lupa_sucursal').hide();
    $("#lupa_banco").show().css('display', 'table-cell');
    $("#lupa_sucursal").show().css('display', 'table-cell');

    $("#tot_impue").val("");

    $("#tot_tasa").val("");

    $("#tot_total").val("");

    $('#btn_buscar').prop('disabled', false);
    $('#c_banco').prop('disabled', false);
    $('#c_sucursal').prop('disabled', false);
    $('#f_acred').prop('disabled', false);
    $('#f_pago').prop('disabled', false);
    $('#container_main_grid_consulta').prop('hidden', true);
    $('#container_main_grid_alta').prop('hidden', true);
    $('#container_btn_controlado').prop('hidden', true);
    $('#container_det_grid_consulta').prop('hidden', true);
    $('#container_det_grid_alta').prop('hidden', true);
    $('#container_totales').prop('hidden', true);

    $('#btn_confirmar_alta').prop('disabled', true);
}