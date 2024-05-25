function inicializar_grillas() {
    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Instancias" ,
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        shrinkToFit: true,
        rowList: [50, 100, 500, 1000],
        onSelectRow: function (id) {
            let v_n_instancia = $("#main_grid").getCell(id,'n_instancia');
            let v_n_orden = $("#main_grid").getCell(id,'n_orden');

            setea_parametros('#detail_grid',{':p_n_instancia':v_n_instancia, ':p_n_orden': v_n_orden});
        },
        loadComplete: function () {
            gridParentWidth = $('#gbox_main_grid').parent().parent().width();
            $('#main_grid').setGridWidth(gridParentWidth);
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#detail_grid").jqGrid({
        colNames: datos_detail_grid.colNames(),
        colModel: datos_detail_grid.colModel(),
        pager: $('#detail_grid_pager'),
        caption: "Detalle" ,
        postData: datos_detail_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        shrinkToFit: true,
        autowidth: false,
        rowList: [50, 100, 500, 1000],
        onSelectRow: function (id) {
        },
    }).navGrid('#detail_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );
}