function fun_recalcular(rowid) {
    var v_m_proyecto;
    if($("#main_grid").getCell(rowid,'m_proyecto') == 'NO'){
        v_m_proyecto = 'N';
    } else {
        v_m_proyecto = 'S';
    }
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_marca": $("#main_grid").getCell(rowid,'c_marca_aut'),
            "p_c_modelo": $("#main_grid").getCell(rowid,'id_modelo'),
            "p_c_descrip": $("#main_grid").getCell(rowid,'id_descripcion'),
            "p_c_grupo": $("#main_grid").getCell(rowid,'c_grupo'),
            "p_n_modelo_anio": $("#main_grid").getCell(rowid,'n_modelo_año'),
            "p_n_anio_fiscal": $("#main_grid").getCell(rowid,'n_año_fiscal'),
            "p_n_mes_fiscal": $("#main_grid").getCell(rowid,'n_mes_fiscal'),
            "p_m_proyecto": v_m_proyecto,
            "id_menu": v_id_menu,
            "n_orden": 2
        },
        dataType: 'json',
        success: function (data) {
            $('#main').procOverlay({visible: false});
            if (data.resultado == 'OK') {
                mostrar_cuadro('I', 'Información', 'Se han recalculado las obligaciones de los dominios afectados');
                $('#main_grid').trigger('reloadGrid');
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}