function init_grillas(){
    $("#main_grid").jqGrid({
        colNames: main_grid.colNames(),
        colModel: main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Ingreso de archivos banelco",
        postData: main_grid.postData(),
        autowidth: false,
        width: 940,
        height: 300,
        sortname: 'id_archivo_banelco',
        sortorder: 'desc'
    }).navGrid('#main_grid_pager', {refresh:true});
}