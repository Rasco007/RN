function inicializar_grillas() {
    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Parámetros de Juicios Masivos" ,
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        shrinkToFit: false,
        rowList: [50, 100, 500, 1000],
        loadComplete: function () {
            gridParentWidth = $('#gbox_main_grid').parent().parent().width();
            $('#main_grid').setGridWidth(gridParentWidth);
        }
    }).navGrid('#main_grid_pager',
        {add:true, edit:true, del:true}, //options
        {
            closeAfterEdit:true
        }, //edit
        {
            closeAfterAdd:true
        }, //add
        {} //del
    );
}