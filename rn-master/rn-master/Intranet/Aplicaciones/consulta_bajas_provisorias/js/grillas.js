function init_grillas(){
    $("#main_grid").jqGrid({
        colNames:main_grid.colNames(),
        colModel:main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption:"Consulta de Bajas provisorias",
        postData:main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: true,
        shrinkToFit: true,
        height:180,
        rowNum: 50
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
}