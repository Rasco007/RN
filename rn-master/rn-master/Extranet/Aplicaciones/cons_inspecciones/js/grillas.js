function inicializarGrillas(){

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Fiscalizaciones Notificadas",
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height: 350,
        shrinkToFit: true,
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#detalle_grid").jqGrid({
        colNames: datos_detail_grid.colNames(),
        colModel: datos_detail_grid.colModel(),
        pager: $('#detalle_grid_pager'),
        postData: datos_detail_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height: 350,
        shrinkToFit: true,
        sortname:'n_cuota_anticipo',
        sortorder:'asc',
        caption: "Detalle de Inspeccion",
        loadComplete: function () {
            gridParentWidth = $('#gbox_detalle_grid').parent().parent().width();
            $('#detalle_grid').setGridWidth(gridParentWidth);

            let v_checks = 0;
            $('.checkbox_instancias').each(function(){
                if(!$(this).is(':checked')){
                    v_checks += 1;
                }
            });

            if (v_checks > 0){
                $('#check_select_all').prop('checked', false);
            }else {
                $('#check_select_all').prop('checked', true);
            }
        }
    }).navGrid('#detalle_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

}