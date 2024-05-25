function extraer_objeto(){
    var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_n_lote_extrac": p_n_lote_extrac,
            "p_m_sin_pago": p_m_sin_pago,
            "p_n_instancia": $("#main_grid").getCell(rowid,'n_instancia'),
            "p_n_orden": $("#main_grid").getCell(rowid,'n_orden'),
            "id_menu": v_id_menu,
            "n_orden": 5
        },
        dataType: 'json',
        success: function (data) {
            $('#main').procOverlay({visible: false});
            if (data.resultado == 'OK') {
                $("#modal_extraccion").modal('hide');
                $('#btn_limpiar').click();
                mostrar_cuadro('I', 'Extracción', 'La extracción finalizo con exito.');
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}