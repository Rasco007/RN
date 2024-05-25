function init_grillas(){

    datos_main_grid = new GridParam({
        id_menu: v_id_menu,
        n_grid: 0,
        n_orden: 0,
        m_autoquery: 'N',
    });

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#grid_calcula_bonos_pager'),
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        shrinkToFit: true,
        sortname: 'n_orden',
        sortorder: 'asc',
        height: 180,
        onSelectRow: function (id) {
            var error = $('#main_grid').getCell(id,'error');
            var datos = $('#main_grid').getCell(id,'datos');
            $("#error").val(error); 
            $("#datos").val(datos);
        },
    })
        .navGrid('#main_grid_pager',
        {add:true, edit:true, del:true},
        {}, //edit
        {}, //add
        {} //del
    );
}