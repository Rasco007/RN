function inicializarGrillas(){
    $("#rendiciones_grid").jqGrid({
        colNames: rendiciones_grid.colNames(),
        colModel: rendiciones_grid.colModel(),
        pager: $('#rendiciones_grid_pager'),
        caption: "Rendiciones",
        postData: rendiciones_grid.postData(),
        autowidth: false,
        width: 940,
        sortname: 'f_acred, f_pago, c_sucursal_det',
        sortorder: 'asc',
        onSelectRow: function(){
            let rowid = $('#rendiciones_grid').getGridParam('selrow');
            let f_pago_sel = $('#rendiciones_grid').getCell(rowid, 'f_pago');
            let f_acred_sel = $('#rendiciones_grid').getCell(rowid, 'f_acred');
            let c_sucursal_sel = $('#rendiciones_grid').getCell(rowid, 'c_sucursal_det');
            let d_sucursal_sel = $('#rendiciones_grid').getCell(rowid, 'd_sucursal_det');

            $('#f_acred').val(f_acred_sel);
            $('#f_pago').val(f_pago_sel);
            $('#c_sucursal').val(c_sucursal_sel);
            $('#d_sucursal').val(d_sucursal_sel);
            
            
        },
        loadComplete: function(){
            
            let total_cant = $('#rendiciones_grid').getCell(1, 'total_cantidad');
            let total_imp = $('#rendiciones_grid').getCell(1, 'total_impuesto');
            let total_tasa = $('#rendiciones_grid').getCell(1, 'total_tasa');
            let total_total = $('#rendiciones_grid').getCell(1, 'total_total');

            if($("#rendiciones_grid").jqGrid("getGridParam", "reccount") == 0 && !es_primera_carga){
                mostrar_cuadro('I', 'Información', 'No se han encontrado datos para la consulta ingresada');
            }
           
            if($("#rendiciones_grid").jqGrid("getGridParam", "reccount") != 0 && !grilla_cargada){
                $('#total_cant').val(total_cant);
                $('#total_imp').val(total_imp);
                $('#total_tasa').val(total_tasa);
                $('#total_total').val(total_total);
                grilla_cargada = true;
            }
        },
        ondblClickRow: function(rowid){
            let rendicion_selecc = $('#rendiciones_grid').getCell(rowid, 'id_rendicion');
            setea_parametros('#detalle_rendicion_grid', {'p_id_rendicion': rendicion_selecc});
            $('#detalle_rend_modal').modal('show');
            $(window).resize();

            $('#id_rendicion').val('');
            $('#n_remito_detalle').val('');
        }
    }).navGrid('#rendiciones_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#detalle_rendicion_grid").jqGrid({
        colNames: detalle_rendicion_grid.colNames(),
        colModel: detalle_rendicion_grid.colModel(),
        pager: $('#detalle_rendicion_grid_pager'),
        caption: "Detalle Rendici&oacute;n",
        postData: detalle_rendicion_grid.postData(),
        autowidth: false,
        width: 940,
        sortname: 'c_tributo, c_codigo_form',
        sortorder: 'asc',
        loadComplete: function(){
            let rowid = $('#rendiciones_grid').getGridParam('selrow');
            let rendicion_selecc = $('#rendiciones_grid').getCell(rowid, 'id_rendicion');
            let remito_selecc = $('#rendiciones_grid').getCell(rowid, 'n_remito');

            $('#id_rendicion').val(rendicion_selecc);
            $('#n_remito_detalle').val(remito_selecc);
        }
    }).navGrid('#detalle_rendicion_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#listado_remesas_grid").jqGrid({
        colNames: listado_remesas_grid.colNames(),
        colModel: listado_remesas_grid.colModel(),
        pager: $('#listado_remesas_grid_pager'),
        caption: "Listado de Remesas Asociadas",
        postData: listado_remesas_grid.postData(),
        autowidth: false,
        width: 940,
        shrinkToFit: true,
        sortname: 'n_remito',
        sortorder: 'desc' 

    }).navGrid('#listado_remesas_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
}