function inicializarGrillas(){
    $("#contrib_tributo_grid").jqGrid({
        colNames: contrib_tributo_grid.colNames(),
        colModel: contrib_tributo_grid.colModel(),
        pager: $('#contrib_tributo_grid_pager'),
        caption: "Inscripciónes por Contribuyente",
        postData: contrib_tributo_grid.postData(),
        autowidth: false,
        shrinkToFit: true,
        height: 200,
        width: 1480,
        loadComplete: function(){
            if($('#contrib_tributo_grid').getGridParam('records') > 0){
                $('#div_contrib_tributo').prop('hidden', false);
                $('#contrib_tributo_grid').jqGrid('setSelection', 1);
                let row_id = $('#contrib_tributo_grid').getGridParam('selrow');
                $('#d_objeto_hecho').val($('#contrib_tributo_grid').getCell(row_id, 'd_objeto_hecho'));
                $('#f_vig_desde').val($('#contrib_tributo_grid').getCell(row_id, 'f_vig_desde'));
                $('#f_cese_provisorio').val($('#contrib_tributo_grid').getCell(row_id, 'f_cese_provisorio'));
                $('#c_tipo_imp').val($('#contrib_tributo_grid').getCell(row_id, 'c_tipo_imponible'));
                $('#c_tributo').val($('#contrib_tributo_grid').getCell(row_id, 'c_tributo'));
                $('#c_tributo').blur();
                $('#btn_eliminar_cese').prop('disabled', false);
                $('#btn_cese_prov').prop('disabled', false);
            } else{
                if(v_no_carga_inicial_ct){
                    mostrar_cuadro('I', 'Atención', 'La consulta ingresada no devolvió datos');
                } else{
                    v_no_carga_inicial_ct = true;
                }
            }
        },
        onSelectRow: function(id){
            $('#d_objeto_hecho').val($('#contrib_tributo_grid').getCell(id, 'd_objeto_hecho'));
            $('#f_vig_desde').val($('#contrib_tributo_grid').getCell(id, 'f_vig_desde'));
            $('#f_cese_provisorio').val($('#contrib_tributo_grid').getCell(id, 'f_cese_provisorio'));
            $('#c_tributo').val($('#contrib_tributo_grid').getCell(id, 'c_tributo'));
            $('#c_tributo').blur();
            $('#c_tipo_imp').val($('#contrib_tributo_grid').getCell(id, 'c_tipo_imponible'));
        }
    }).navGrid('#contrib_tributo_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
}