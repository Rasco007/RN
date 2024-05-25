function init_grillas(){
    //Grilla agrup det
    $("#agrup_det_grid").jqGrid({
        colNames: agrup_det_grid.colNames(),
        colModel: agrup_det_grid.colModel(),
        pager: $('#agrup_det_grid_pager'),
        caption: "Acreditación de Pagos",
        postData: agrup_det_grid.postData(),
        autowidth: false,
        width: 940,
        onSelectRow: function(id){
            let n_pagos_procesados = $('#agrup_det_grid').getCell(id, 'n_pagos_procesados');
            if(!n_pagos_procesados){
                $('#btn_procesar').prop('disabled', false);
            }else{
                $('#btn_procesar').prop('disabled', true);
            }
        },
        loadComplete: function(){
            if(marcar_todas_seleccionado){
                $("#agrup_det_grid input[type='checkbox']").prop("checked", true);
            }
        }
    }).navGrid('#agrup_det_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    //grilla casos especiales
    $("#casos_especiales_grid").jqGrid({
        colNames: casos_especiales_grid.colNames(),
        colModel: casos_especiales_grid.colModel(),
        pager: $('#casos_especiales_grid_pager'),
        caption: "Acreditaci&oacute;n Especial",
        postData: casos_especiales_grid.postData(),
        autowidth: false,
        width: 940,
        sortname: 'f_pago',
        sortorder: 'desc',
        
    }).navGrid('#casos_especiales_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
};