function inicializar_grillas() {
    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Vehículos",
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH + "maestro_abm_grid.php",
        shrinkToFit: true,
        rowList: [50, 100, 500, 1000],
        onSelectRow: function (id) {
        },
        gridComplete: function () {
        },
        loadComplete: function () {
            gridParentWidth = $('#main_grid_grid').parent().parent().width();
            $('#main_grid').setGridWidth(gridParentWidth);
        }
    }).navGrid('#main_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    );
}