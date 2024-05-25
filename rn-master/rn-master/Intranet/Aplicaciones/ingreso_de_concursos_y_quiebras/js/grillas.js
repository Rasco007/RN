function inicializarGrillas(){

    $("#main_grid").jqGrid({
        colNames:datos_main_grid.colNames(),
        colModel:datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption:"OBJETOS:" ,
        postData:datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        shrinkToFit: true,
        autowidth: false,
        height:180,
        
        onSelectRow: function(id) {
            //id_ddjj = $('#main_grid').getCell(id, 'id_ddjj');
           // $('#1').attr('data-toggle', 'tab');
            //setea_parametros('#detalles_grid',{':p_id_contribuyente':$('#id_contribuyente').val()});
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    )


    $("#detalles_grid").jqGrid({
        colNames:datos_detalles_grid.colNames(),
        colModel:datos_detalles_grid.colModel(),
        pager: $('#detalles_grid_pager'),
        caption:"DEUDA DETALLE:" ,
        postData:datos_detalles_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        shrinkToFit: true,
        autowidth: true,
        height:140,
        width:10100,
        loadComplete:function(data){
            $('#suma_adeudado').val($('#detalles_grid').getCell(1, 'suma_adeudado'));
            $('#suma_interes').val($('#detalles_grid').getCell(1, 'suma_interes'));
            $('#suma_actualizado').val($('#detalles_grid').getCell(1, 'suma_actualizado'));

        },



    }).navGrid('#detalles_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    )
   
}