var datos_main_grid = new GridParam({
    id_menu: v_id_menu,
    n_grid:0,
    n_orden:0,
    m_autoquery:v_m_autoquery,
    param:{':c_ente':c_ente}
});

$(document).ready(function() {

    
$("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Multas" ,
        postData: datos_main_grid.postData(),
		editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
);


});