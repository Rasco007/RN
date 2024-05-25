function inicializarGrillas(){
    $("#rechazos_grid").jqGrid({
        colNames:datos_main_grid_rechazos.colNames(),
        colModel:datos_main_grid_rechazos.colModel(),
        pager: $("#rechazos_grid_pager"),
        sortname:"n_linea",
        postData:datos_main_grid_rechazos.postData()
    }).navGrid('#rechazos_grid_pager', {add : false,edit : false,del : false},
        {}, // edit options
        {}, //alta
        {}, //del
        {}//search
    );

    $('#rechazos_modal').on('shown.bs.modal', function (e) {
        let gridParentWidth = $('#gbox_rechazos_grid').parent().parent().width();
        $('#rechazos_grid').setGridWidth(gridParentWidth);
    });
};