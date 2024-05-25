function initGrillas(){
    $("#main_grid").jqGrid({
        colNames: main_grid.colNames(),
        colModel: main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Datos adicionales de Gestión Judicial",
        postData: main_grid.postData(),
        autowidth: false,
        width: 940,
        shrinkToFit: true
    }).navGrid('#main_grid_pager',
        {add:true, edit:true, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#observaciones_grid").jqGrid({
        colNames: observaciones_grid.colNames(),
        colModel: observaciones_grid.colModel(),
        pager: $('#observaciones_grid_pager'),
        caption: "Datos adicionales de Gestión Judicial",
        postData: observaciones_grid.postData(),
        autowidth: false,
        width: 940,
        shrinkToFit: true
    }).navGrid('#observaciones_grid_pager',
        {add:false, edit:true, del:false}, //options
        {
            top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
                inicializarLupas(formid);
            }),
            closeAfterEdit: true
        }, // edit options
        {top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
                inicializarLupas(formid);
            }),
            closeAfterAdd: true}, // add options
        {}, // del options
        {} // search options
    );
}

/*

{
            top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
                inicializa_lupas_main_grid(formid);
            }),
            closeAfterEdit: true
        }, //edit
        {
            top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
                inicializa_lupas_main_grid(formid);
            }),
            closeAfterAdd: true
        }, //add*/ 