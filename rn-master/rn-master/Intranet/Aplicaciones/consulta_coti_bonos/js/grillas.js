function init_grillas() {

    $("#bonos_grid").jqGrid({
        colNames: datos_bonos_grid.colNames(),
        colModel: datos_bonos_grid.colModel(),
        pager: $('#bonos_grid_pager'),
        postData: datos_bonos_grid.postData(),
        caption: "Consulta de Cotizaciones de Bonos",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:500,
        sortname: 'c_bono',
        sortorder: 'asc',
    }).navGrid('#bonos_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    )  
}

