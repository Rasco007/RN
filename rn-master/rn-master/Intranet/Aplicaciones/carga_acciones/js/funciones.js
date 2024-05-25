function fecha_en_rango(fecha){
    let comp_fecha = fecha.split('/');
    let meses_treinta_dias = [4,6,9,11];
    let dias_extra_febrero = [30,31];

    let dia = parseInt(comp_fecha[0]);
    let mes = parseInt(comp_fecha[1]);

    if(dia <= 0 || dia > 31){
        mostrar_error('El día debe estar entre 1 y el último día del mes', 'E', true);
        $('#fecha_apertura').val(null);
        return false;
    }
    else if(dia == 31 && meses_treinta_dias.includes(mes)){
        mostrar_error('El día debe estar entre 1 y el último día del mes', 'E', true);
        $('#fecha_apertura').val(null);
        return false;
    }
    else if(dias_extra_febrero.includes(dia) && mes == 2){
        mostrar_error('El día debe estar entre 1 y el último día del mes', 'E', true);
        $('#fecha_apertura').val(null);
        return false;
    }

    if(mes <= 0 || mes > 12){
        mostrar_error('El mes debe estar comprendido entre 1 y 12', 'E', true);
        $('#fecha_apertura').val(null);
        return false;
    }

    return true;
}

function eliminarAccion(p_id_operativo, p_n_orden, p_n_accion){
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_id_operativo_fiscalizacion": p_id_operativo,
            "p_n_orden": p_n_orden,
            "p_n_accion": p_n_accion,
            "p_oper": 'del',
            "id_menu": v_id_menu,
            "n_orden": 0
        },
        dataType: 'json',
        success: function (data) {
            $('#main').procOverlay({visible: false});
            if (data.resultado == 'OK') {
                mostrar_cuadro('I', 'Eliminar Acción', 'La acción se elimino correctamente.');
                $("#main_grid").trigger("reloadGrid");
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}