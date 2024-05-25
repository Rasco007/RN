function inicializarGrillas(loadCompleteCallback){
    $("#workflow_grid").jqGrid({
        colNames:workflow_grid.colNames(),
        colModel:workflow_grid.colModel(),
        autowidth:false,
        height:200,
        pager: $('#workflow_grid_pager'),
        caption:"Tareas" ,
        postData:workflow_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname: 'n_orden',
        sortorder:'asc',
        onSelectRow: function(id) {

        },
        loadComplete:function(){
            if(loadCompleteCallback){
                loadCompleteCallback();
            }
        },
    }).navGrid('#workflow_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
    );

    $(window).focus(function() {
        $("#workflow_grid").trigger("reloadGrid");
    });
}