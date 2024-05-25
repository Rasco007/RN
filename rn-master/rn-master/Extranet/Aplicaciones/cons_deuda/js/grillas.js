function inicializarGrillas(){

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Deuda" ,
        postData: datos_main_grid.postData(),
        multiselect:true,
        multiboxonly:true,        
        sortname:"linea",
        rowNum:9999999,
        colMenu: false,
        height:300,
        autowidth:false,
        onSelectRow: function(rowid){ 
            sumar_saldos();
        },
        onSelectAll: function(){
            sumar_saldos();
        }
    });

}