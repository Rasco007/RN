function inicializarGrillas(){

    $("#main_grid_id_contribuyente").jqGrid({
        colNames:datos_main_grid_id_contribuyente.colNames(),
        colModel:datos_main_grid_id_contribuyente.colModel(),
        pager: $('#main_grid_id_contribuyente_pager'),
        caption:"Consulta de Pagos Acreditados" ,
        postData:datos_main_grid_id_contribuyente.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'f_pago',
        sortorder:'asc',
        autowidth: false,
        height:300,
        loadComplete:function(){
        },
        gridComplete: function() {
            try{
                var ids = $("#main_grid_id_contribuyente").jqGrid('getDataIDs');
                var rowData = $("#main_grid_id_contribuyente").jqGrid('getRowData', ids[0]);
                var cellValue = rowData.i_total_pagados;
                $('#tot_importe_pagado').val(cellValue);
            }catch (e) {}
        },
        onSelectRow: function(id) {
            $('#d_objeto_hecho').val($('#main_grid_id_contribuyente').getCell(id, 'obj_hecho'));
            $('#c_tributo').val($('#main_grid_id_contribuyente').getCell(id, 'c_tributo')).blur();
            $('#c_concepto').val($('#main_grid_id_contribuyente').getCell(id, 'c_concepto')).blur();
            $('#n_posicion_fiscal').val($('#main_grid_id_contribuyente').getCell(id, 'n_pos_fiscal'));
            $('#n_cuota_anticipo').val($('#main_grid_id_contribuyente').getCell(id, 'n_cuota'));

            $('#tot_obj_hecho').val($('#main_grid_id_contribuyente').getCell(id, 'obj_hecho'));
            $('#tot_cuit').val($('#main_grid_id_contribuyente').getCell(id, 'n_cuit')).mask('99-99999999-9');
            $('#tot_nombre').val($('#main_grid_id_contribuyente').getCell(id, 'd_denominacion'));
        }
    }).navGrid('#main_grid_id_contribuyente_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    )

    $("#main_grid_remito").jqGrid({
        colNames:datos_main_grid_remito.colNames(),
        colModel:datos_main_grid_remito.colModel(),
        pager: $('#main_grid_remito_pager'),
        caption:"Consulta de Pagos Acreditados" ,
        postData:datos_main_grid_remito.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'f_pago',
        sortorder:'desc',
        autowidth: false,
        height:300,
        loadComplete:function(){
        },
        gridComplete: function() {
            try{
                var ids = $("#main_grid_remito").jqGrid('getDataIDs');
                var rowData = $("#main_grid_remito").jqGrid('getRowData', ids[0]);
                var cellValue = rowData.i_total_pagados;
                $('#tot_importe_pagado').val(cellValue);
            }catch (e) {}
        },
        onSelectRow: function(id) {
            $('#tot_obj_hecho').val($('#main_grid_remito').getCell(id, 'obj_hecho'));
            $('#tot_cuit').val($('#main_grid_remito').getCell(id, 'n_cuit')).mask('99-99999999-9');
            $('#tot_nombre').val($('#main_grid_remito').getCell(id, 'd_denominacion'));
        }
    }).navGrid('#main_grid_remito_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    )

    $("#main_grid_sin_remito_ni_id_contrib").jqGrid({
        colNames:datos_main_grid_sin_remito_ni_id_contrib.colNames(),
        colModel:datos_main_grid_sin_remito_ni_id_contrib.colModel(),
        pager: $('#main_grid_sin_remito_ni_id_contrib_pager'),
        caption:"Consulta de Pagos Acreditados" ,
        postData:datos_main_grid_sin_remito_ni_id_contrib.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'f_pago',
        sortorder:'desc',
        autowidth: false,
        height:300,
        loadComplete:function(){
        },
        gridComplete: function() {
            try{
                var ids = $("#main_grid_sin_remito_ni_id_contrib_pager").jqGrid('getDataIDs');
                var rowData = $("#main_grid_sin_remito_ni_id_contrib_pager").jqGrid('getRowData', ids[0]);
                var cellValue = rowData.i_total_pagados;
                $('#tot_importe_pagado').val(cellValue);
            }catch (e) {}
        },
        onSelectRow: function(id) {
            $('#d_objeto_hecho').val($('#main_grid_sin_remito_ni_id_contrib').getCell(id, 'obj_hecho'));
            $('#c_tributo').val($('#main_grid_sin_remito_ni_id_contrib').getCell(id, 'c_tributo')).blur();
            $('#c_concepto').val($('#main_grid_sin_remito_ni_id_contrib').getCell(id, 'c_concepto')).blur();
            $('#n_posicion_fiscal').val($('#main_grid_sin_remito_ni_id_contrib').getCell(id, 'n_pos_fiscal'));
            $('#n_cuota_anticipo').val($('#main_grid_sin_remito_ni_id_contrib').getCell(id, 'n_cuota'));

            $('#tot_obj_hecho').val($('#main_grid_sin_remito_ni_id_contrib_pager').getCell(id, 'obj_hecho'));
            $('#tot_cuit').val($('#main_grid_sin_remito_ni_id_contrib_pager').getCell(id, 'n_cuit')).mask('99-99999999-9');
            $('#tot_nombre').val($('#main_grid_sin_remito_ni_id_contrib_pager').getCell(id, 'd_denominacion'));

        }
    }).navGrid('#main_grid_sin_remito_ni_id_contrib_pager_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    )

}