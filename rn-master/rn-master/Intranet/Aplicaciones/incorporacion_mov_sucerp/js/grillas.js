function inicializar_grillas() {
    $("#errores_grid").jqGrid({
        colNames: datos_errores_grid.colNames(),
        colModel: datos_errores_grid.colModel(),
        pager: $('#errores_grid_pager'),
        caption: "Errores" ,
        postData: datos_errores_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        shrinkToFit: true,
        autowidth: false,
        rowList: [50, 100, 500, 1000],
        loadComplete: function () {
            gridParentWidth = $('#gbox_errores_grid').parent().parent().width();
            $('#errores_grid_pager').setGridWidth(gridParentWidth);
        }
    }).navGrid('#errores_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    )
}