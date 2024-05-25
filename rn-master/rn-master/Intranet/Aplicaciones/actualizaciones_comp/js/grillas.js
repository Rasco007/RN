function inicializarGrillas(){
    $("#compensaciones_grid").jqGrid({
        colNames:compensaciones_grid.colNames(),
        colModel:compensaciones_grid.colModel(),
        autowidth:false,
        height:200,
        pager: $('#compensaciones_grid_pager'),
        caption:"Compensaciones" ,
        postData:compensaciones_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname: 'd_objeto_hecho, n_posicion_cuota, tipo_generacion',
        sortorder:'asc',
        loadComplete: function() {
            $('#total').val($('#compensaciones_grid').getCell($("#compensaciones_grid").getDataIDs()[0], 'total'));
        },
    }).navGrid('#compensaciones_grid',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
    );
}