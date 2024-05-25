function desenmascararPeriodo(periodo) {
    return periodo.substr(0,4).concat(periodo.substr(5,2));
}

function fun_aplicar_bonificacion(){
    var p_m_aplica;
    var p_m_recalcula;
    if($('#check_cta_cte').is(':checked')){
        p_m_aplica = 'S';
    } else {
        p_m_aplica = 'N';
    }
    if($('#check_temporal').is(':checked')){
        p_m_recalcula = 'S';
    } else {
        p_m_recalcula = 'N';
    }
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_m_aplica": p_m_aplica,
            "p_m_recalcula": p_m_recalcula,
            "p_c_tributo": $("#c_tributo").val(),
            "p_n_pos_desde": desenmascararPeriodo($('#n_posicion_fiscal_desde').val()),
            "p_n_pos_hasta": desenmascararPeriodo($("#n_posicion_fiscal_hasta").val()),
            "p_n_cuota_desde": $("#n_cuota_desde").val(),
            "p_n_cuota_hasta": $("#n_cuota_hasta").val(),
            "p_d_objeto_hecho": $("#d_objeto_hecho").val(),
            "id_menu": v_id_menu,
            "n_orden": 0
        },
        dataType: 'json',
        success: function (data) {
            $('#main').procOverlay({visible: false});
            if (data.resultado == 'OK') {
                mostrar_cuadro('I', 'Información', 'El proceso finalizo correctamente.');
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}