function inicializarGrillas(){
    $("#main_grid").jqGrid({
        colNames: main_grid.colNames(),
        colModel: main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Planes de Fiscalización",
        postData: main_grid.postData(),
        autowidth: false,
        width: 940,
        shrinkToFit: true,
        onSelectRow: function(){
            let rowid = $('#main_grid').getGridParam('selrow');
            let id_plan_fis = $('#main_grid').getCell(rowid, 'id_plan_fis');
            setea_parametros('#detalles_grid', {'p_id_plan_fis': id_plan_fis });
            detalles_cargados = true;
        },
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#detalles_grid").jqGrid({
        colNames: detalles_grid.colNames(),
        colModel: detalles_grid.colModel(),
        pager: $('#detalles_grid_pager'),
        caption: "Detalle Plan",
        postData: detalles_grid.postData(),
        autowidth: false,
        width: 940,
        shrinkToFit: true,

        loadComplete: function(){
            if(!detalles_cargados){
                $('#tot_horas_est').val('');
            } else{
                if($('#detalles_grid').getGridParam('records') > 0){
                    let total_horas = $('#detalles_grid').getCell(1, 'total_horas');
                    $('#tot_horas_est').val(total_horas);
                } else{
                    $('#tot_horas_est').val('');
                    mostrar_cuadro('I', 'Atención', 'El plan seleccionado no tiene detalles');
                }
            }   
        },
       
    }).navGrid('#detalles_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
}