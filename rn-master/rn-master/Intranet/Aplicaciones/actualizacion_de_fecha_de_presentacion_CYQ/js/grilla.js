function initGrillas(){
    $("#main_grid").jqGrid({
        colNames: main_grid.colNames(),
        colModel: main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Datos adicionales de Gestión Judicial",
        postData: main_grid.postData(),
        autowidth: false,
        width: 940,
        shrinkToFit: true,
        loadComplete: function(){
            let i_deuda = $('#main_grid').getCell(1,'suma_adeudado');
            if(i_deuda){
                $("#i_adeudado").val(i_deuda);
            }

            let i_interes = $('#main_grid').getCell(1,'suma_interes');
            if(i_interes){
                $("#i_interes").val(i_interes);
            }

            let i_actualizado = $('#main_grid').getCell(1,'suma_actualizado');
            if(i_actualizado){
                $("#i_actualizado").val(i_actualizado);
            }
        }
    }).navGrid('#main_grid_pager',
        {add:true, edit:true, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

}