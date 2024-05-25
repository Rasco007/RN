function inicializar_grillas() {
    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Objetos del Plan de Pago",
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH + "maestro_abm_grid.php",
        shrinkToFit: true,
        rowList: [50, 100, 500, 1000],
        onSelectRow: function (id) {},
        gridComplete: function () {},
        ondblClickRow: function (rowid) {
            post_to_url('consulta_de_planes.php', {
                'p_n_id_menu': 100157,
                'p_n_plan_pago': $('#main_grid').getCell(rowid, 'n_plan_pago')
            }, '_blank');
        },
        loadComplete: function () {
            gridParentWidth = $('#main_grid_grid').parent().parent().width();
            $('#main_grid').setGridWidth(gridParentWidth);
        }
    }).navGrid('#main_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#detalle_grid").jqGrid({
        colNames: datos_detalle_grid.colNames(),
        colModel: datos_detalle_grid.colModel(),
        pager: $('#detalle_grid_pager'),
        caption: "Detalles",
        postData: datos_detalle_grid.postData(),
        editurl: FUNCIONES_BASEPATH + "maestro_abm_grid.php",
        shrinkToFit: false,
        autowidth: false,
        sortname:'n_plan_pago, n_cuota',
        sortorder:'asc',
        rowList: [50, 100, 500, 1000],
        onSelectRow: function (id) {},
        gridComplete: function () {},
        loadComplete: function () {
            gridParentWidth = $('#detalle_grid_pager').parent().parent().width();
            $('#detalle_grid').setGridWidth(gridParentWidth);
        }
    }).navGrid('#detalle_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#cuotas_grid").jqGrid({
        colNames: datos_cuota_grid.colNames(),
        colModel: datos_cuota_grid.colModel(),
        pager: $('#cuotas_grid_pager'),
        caption: "Detalles",
        postData: datos_cuota_grid.postData(),
        editurl: FUNCIONES_BASEPATH + "maestro_abm_grid.php",
        shrinkToFit: false,
        autowidth: false,
        sortname:'n_plan_pago, n_cuota',
        sortorder:'asc',
        rowList: [50, 100, 500, 1000],
        onSelectRow: function (id) {},
        gridComplete: function () {},
        loadComplete: function () {
            gridParentWidth = $('#cuotas_grid_pager').parent().parent().width();
            $('#cuotas_grid').setGridWidth(gridParentWidth);
        }
    }).navGrid('#cuotas_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    );
}