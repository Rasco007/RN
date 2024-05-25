function init_grillas() {

    $("#movimientos_auto_grid").jqGrid({
        caption: "Movimientos",
        colNames: datos_movimientos_auto_grid.colNames(),
        colModel: datos_movimientos_auto_grid.colModel(),
        postData: datos_movimientos_auto_grid.postData(),
        pager: $('#movimientos_auto_grid_pager'),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        sortname: 'f_movimiento desc,f_alta',
        sortorder: 'desc',
        loadComplete: function (data) {
            $('#main').procOverlay({ visible: false });
        }
    }).navGrid('#movimientos_auto_grid_pager',{add:false, edit:false, del:false});
}