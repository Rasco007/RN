function inicializarGrillas(){
    $("#detalle_grid").jqGrid({
        colNames: detalle_grid.colNames(),
        colModel: detalle_grid.colModel(),
        pager: $('#detalle_grid_pager'),
        postData: detalle_grid.postData(),
        autowidth: false,
        width: 1000,
        height: 300,
        sortname: 'n_orden',
        sortorder: 'asc',
    }).navGrid('#detalle_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
}