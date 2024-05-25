function desenmascararPeriodo(periodo) {
    return periodo.substr(0,4).concat(periodo.substr(5,2));
}

function eliminarOperativo(p_n_operativo){
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_id_operativo_fiscalizacion": p_n_operativo,
            "p_oper": 'del',
            "id_menu": v_id_menu,
            "n_orden": 0
        },
        dataType: 'json',
        success: function (data) {
            $('#main').procOverlay({visible: false});
            if (data.resultado == 'OK') {
                mostrar_cuadro('I', 'Eliminación de Operativo', 'El operativo se ha eliminado correctamente.');
                $("#main_grid").trigger('reloadGrid');
                $('#seccion_2').hide();
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function verAcciones(n_operativo, n_orden) {
    var rowid_cell = $("#main_grid").getGridParam('selrow');
    post_to_url("carga_acciones.php", {
            'p_n_id_menu': 100049,
            'p_n_operativo': n_operativo,
            'p_n_orden': n_orden,
            'p_c_sector': $("#main_grid").getCell(rowid_cell,'codigo_departamento')},
        "_blank","POST");
}

function cambiarEstado(n_operativo, n_orden, c_estado, c_expte_gde, c_procedimiento_detalle) {
    console.log(c_procedimiento_detalle);
    var rowid_cell = $("#main_grid").getGridParam('selrow');
    $('#id_operativo_estado').val(n_operativo);
    $('#n_orden_estado').val(n_orden);
    $('#c_estado_form').val(c_estado);
    $('#expte_estado').val(c_expte_gde);
    $('#c_procedimiento_estado').val(c_procedimiento_detalle);
    $('#c_departamento_estado').val($("#main_grid").getCell(rowid_cell,'codigo_departamento'));

    if (($('#c_estado_form').val() == '7' || c_estado == '1') && $('#c_departamento_estado').val() == ';OFI;'){
        $('#div_procedimiento_estado').attr('hidden', false);
    } else {
        $('#div_procedimiento_estado').attr('hidden', true);
        $('#div_expte_estado').attr('hidden', true);
        $('#expte_estado').val(null);
        $('#c_procedimiento_estado').val(null);
    }

    if ($('#c_procedimiento_estado').val() == '060' || $('#c_procedimiento_estado').val() == '092'){
        $('#div_expte_estado').attr('hidden', false);
    } else {
        $('#div_expte_estado').attr('hidden', true);
        $('#expte_estado').val(null);
    }

    $("#modal_estado").modal('show');
}

function notificarPuntual(n_operativo, n_orden){
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_id_operativo": n_operativo,
            "p_n_orden": n_orden,
            "id_menu": v_id_menu,
            "n_orden": 5
        },
        dataType: 'json',
        success: function (data) {
            $('#main').procOverlay({visible: false});
            if (data.resultado == 'OK') {
                mostrar_cuadro('I', 'Notificación de Detalle', 'Notificación finalizada.');
                $("#detail_grid").trigger('reloadGrid');
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}