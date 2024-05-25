function inicializarGrillas(){


    $('#main_grid').jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: '',
        postData: datos_main_grid.postData(),
        editurl: 'clientArray',
        footerrow:true,
        userDataOnFooter : false,
        onSelectRow: function(id) {
            id_main_grid = id;
            var grupo = $('#main_grid').getCell(id,'c_grupo');
            setea_parametros('#detalle_grid',{':cod_grupo':grupo});

        }
    }).navGrid('#actividades_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $('#detalle_grid').jqGrid({
        colNames: datos_detalle_grid.colNames(),
        colModel: datos_detalle_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: '',
        postData: datos_detalle_grid.postData(),
        editurl: 'clientArray',
        footerrow:true,
        userDataOnFooter : false
    }).navGrid('#actividades_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );



}