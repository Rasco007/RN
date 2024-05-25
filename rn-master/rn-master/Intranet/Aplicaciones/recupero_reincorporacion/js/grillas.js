function init_grillas() {

    $("#tributos_grid").jqGrid({
        colNames: datos_tributos_grid.colNames(),
        colModel: datos_tributos_grid.colModel(),
        pager: $('#tributos_grid_pager'),
        postData: datos_tributos_grid.postData(),
        caption: "Tributos",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:130,
        onSelectRow: function(id) {
            if ($('#tributos_grid').getCell(id,'D_OBJETO_HECHO')){
                $('#btn_reincorporacion').attr('disabled',false);
            }else {
                $('#btn_reincorporacion').attr('disabled',true);
            }
            guardar_datos_grilla(id);
            setea_parametros('#conceptos_grid',
                {':p_c_tributo': p_tributo, ':p_id_contribuyente': $('#id_contribuyente').val(),
                             ':p_c_tipo_imponible': $('#c_tipo_imponible').val(),
                             ':p_d_objeto_hecho': $('#d_objeto_hecho','#frm_reincorporacion').val()});
        },
        loadComplete: function (data) {
            $('#main').procOverlay({ visible: false });
            if($(this).getGridParam('postData').m_autoquery == 'S'){
                if($(this).jqGrid('getGridParam','records') === 0){
                    mostrar_error("No hay registros para los datos ingresados.");
                }else{
                    jQuery("#tributos_grid").setSelection($('#tributos_grid tbody tr')[1]['id'], true);
                }
            }
        }
    }).navGrid('#tributos_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    );

    $("#conceptos_grid").jqGrid({
        colNames: datos_conceptos_grid.colNames(),
        colModel: datos_conceptos_grid.colModel(),
        pager: $('#conceptos_grid_pager'),
        postData: datos_conceptos_grid.postData(),
        caption: "Conceptos",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:130
    }).navGrid('#conceptos_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    );
}