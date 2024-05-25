function init_grillas(){

    $("#main_grid").jqGrid({
        colNames: main_grid.colNames(),
        colModel: main_grid.colModel(),
        pager: $('#main_grid_pager'),
        postData: main_grid.postData(),
        caption: "Tabla de valuación - MTM" ,
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        //shrinkToFit: true,
        height: 250,
        sortorder:'asc',
        sortname:'c_fmcamod, n_año_fiscal, n_mes_fiscal, n_modelo_año',
        loadComplete:function(){
            if (v_modo == 'C'){
                $("#edit_main_grid").hide();
            }
        },
    }).navGrid('#main_grid_pager',
    {add:false, edit:true, del:false}, //options
    {
        onInitializeForm: defaultInitForm(function(formid) {
            lupas_grilla(formid);
        }),
    }, // edit options
    {}, // add options
    {}, // del options 
    {} // search options 
);

}