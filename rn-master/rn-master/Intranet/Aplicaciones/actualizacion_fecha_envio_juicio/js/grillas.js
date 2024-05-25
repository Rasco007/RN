function init_grillas(){
    main_grid_datos = new GridParam({
        id_menu: v_id_menu,
        n_grid: 0,
        m_autoquery:'N',
        param:{}
    });

    $("#main_grid").jqGrid({
        colNames: main_grid_datos.colNames(),
        colModel: main_grid_datos.colModel(),
        pager: $('#main_grid_pager'),
        postData: main_grid_datos.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        shrinkToFit: true,
        height: 180,
        sortname:'n_posicion_fiscal,n_cuota_anticipo',
        sortorder:'asc',
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
            var filtros_no_nativos_ar = [];
            var filtros_arr_main = [];
            filtros_no_nativos_ar.length = 0;
            filtros_arr_main.length = 0;
            if ($('#boleta_deuda').val() != '') filtros_arr_main.push('Boleta de Deuda: ' + $('#boleta_deuda').val());
            filtros_no_nativos_ar['main_grid_datos'] = filtros_arr_main;

        }}).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options 
        {}, // edit options
        {}, // add options
        {}, // del options 
        {} // search options 
    );

}