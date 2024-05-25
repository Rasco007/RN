function inicializarGrillas(){
    $("#fechas_grid").jqGrid({
        colNames: fechas_grid.colNames(),
        colModel: fechas_grid.colModel(),
        pager: $('#fechas_grid_pager'),
        caption: 'Fecha para la Posición Fiscal',
        postData: fechas_grid.postData(),
        autowidth: false,
        height: 100,
        sortname: 'n_orden',
        sortorder: 'asc',
        loadComplete: function(){
            if($('#fechas_grid').getGridParam('records') > 0){
                $('#fechas_grid').jqGrid('setSelection', 1);
            }
        },
        onSelectRow: function(id){
            
        },
    }).navGrid('#fechas_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
}