function inicializarGrillas(){

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Inspecciones",
        postData: datos_main_grid.postData(),
        autowidth: false,
        width: 940
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    ).navButtonAdd('#main_grid_pager',{
        id:'btn_movimientos',
        buttonicon: "",
        caption:"Movimientos",
        title:"Movimientos",
        cursor:"pointer"
    }).navButtonAdd('#main_grid_pager',{
        id:'btn_resumen',
        buttonicon: "",
        caption:"Resumen",
        title:"Resumen",
        cursor:"pointer"
    }).navButtonAdd('#main_grid_pager',{
        id:'btn_ajustes',
        buttonicon: "",
        caption:"Ajustes",
        title:"Ajustes",
        cursor:"pointer"
    }).navButtonAdd('#main_grid_pager',{
        id:'btn_instancias',
        buttonicon: "",
        caption:"Instancias",
        title:"Instancias",
        cursor:"pointer"
    }).navButtonAdd('#main_grid_pager',{
        id:'btn_imp_inspeccion',
        buttonicon: "",
        caption:"Imp Insp",
        title:"Imp Insp",
        cursor:"pointer"
    }).navButtonAdd('#main_grid_pager',{
        id:'btn_imp_liquidacion',
        buttonicon: "",
        caption:"Imp Liq",
        title:"Imp Liq",
        cursor:"pointer"
    });
}