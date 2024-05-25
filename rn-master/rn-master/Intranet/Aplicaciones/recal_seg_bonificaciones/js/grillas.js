function init_grillas() {

    $("#recal_seg_bonif_grid").jqGrid({
        colNames: datos_recal_seg_bonif_grid.colNames(),
        colModel: datos_recal_seg_bonif_grid.colModel(),
        pager: $('#recal_seg_bonif_grid_pager'),
        postData: datos_recal_seg_bonif_grid.postData(),
        caption: "Seguimiento (Debug)",
        autowidth: false,
        width: 480
    }).navGrid('#recal_seg_bonif_grid_pager',{add:false, edit:false, del:false},);
}