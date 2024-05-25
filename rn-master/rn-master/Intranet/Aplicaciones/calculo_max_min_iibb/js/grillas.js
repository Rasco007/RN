function inicializarGrillas(){
    $("#detalle_grid").jqGrid({
        colNames: detalle_grid.colNames(),
        colModel: detalle_grid.colModel(),
        pager: $('#detalle_grid_pager'),
        postData: detalle_grid.postData(),
        autowidth: false,
        width: 940,
        height: 300,
        shrinkToFit: true,
        sortname: 'n_orden',
        sortorder: 'asc',
        loadComplete: function(){
            if($('#detalle_grid').getGridParam('records') > 0){
                $('#main').procOverlay({visible:false});
                $('#detalle_modal').modal('show');
                $(window).resize();
                $('.clearsearchclass').trigger('click');
            } 
            else if(pasada_carga_inicial){
                mostrar_cuadro('I', 'Información', 'No se encontro el detalle para los filtros ingresados');
                $('#main').procOverlay({visible:false});
                return;
            } else{
                pasada_carga_inicial = true;
            }
        }
    }).navGrid('#detalle_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
}