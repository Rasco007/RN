function inicializarGrillas(){
    $("#reversa_rendiciones_grid").jqGrid({
        colNames: reversa_rendiciones_grid.colNames(),
        colModel: reversa_rendiciones_grid.colModel(),
        pager: $('#reversa_rendiciones_grid_pager'),
        caption: "Rendiciones",
        postData: reversa_rendiciones_grid.postData(),
        autowidth: false,
        width: 940,
        shrinkToFit: true,
        sortname: 'f_acred, f_pago, c_sucursal',
        onSelectRow: function(){
            let rowid = $('#reversa_rendiciones_grid').getGridParam('selrow');
            let f_pago_sel = $('#reversa_rendiciones_grid').getCell(rowid, 'f_pago');
            let c_sucursal_sel = $('#reversa_rendiciones_grid').getCell(rowid, 'c_sucursal');
            let d_sucursal_sel = $('#reversa_rendiciones_grid').getCell(rowid, 'd_sucursal');
            
            $('#f_pago').val(f_pago_sel);
            $('#c_sucursal').val(c_sucursal_sel);
            $('#d_sucursal').val(d_sucursal_sel);
            
            
        },
        loadComplete: function(){
            let total_cant = $('#reversa_rendiciones_grid').getCell(1, 'total_cantidad');
            let total_imp = $('#reversa_rendiciones_grid').getCell(1, 'total_impuestos');
            let total_tasa = $('#reversa_rendiciones_grid').getCell(1, 'total_tasa');
            let total_total = $('#reversa_rendiciones_grid').getCell(1, 'total_total');
            
            if($("#reversa_rendiciones_grid").jqGrid("getGridParam", "reccount") != 0 && !grilla_cargada){
                $('#total_cant').val(total_cant);
                $('#total_imp').val(total_imp);
                $('#total_tasa').val(total_tasa);
                $('#total_total').val(total_total);
                grilla_cargada = true;
                bloquear_filtros();
                $('#bloque_consulta').prop('hidden', false);
                $(window).resize();
            } 
            else if($("#reversa_rendiciones_grid").getGridParam('records') == 0 && $('#c_banco').val()){
                mostrar_cuadro('I', 'Información', 'La consulta ingresada no devolvió datos');
                return;
            }
        },
        ondblClickRow: function(rowid){
            let rendicion_selecc = $('#reversa_rendiciones_grid').getCell(rowid, 'id_rendicion');

            filtros_no_nativos_ar = [];
            filtros_arr_main = [];

            if(rendicion_selecc){
                filtros_arr_main.push('Rendición: '+ rendicion_selecc);
            }

            filtros_no_nativos_ar['detalle_reversa_rendicion_grid'] = filtros_arr_main;

            setea_parametros('#detalle_reversa_rendicion_grid', {'p_id_rendicion': rendicion_selecc});
            $('#detalle_reversa_rend_modal').modal('show');
            $(window).resize();

            $('#id_rendicion').val('');
            $('#n_remito_detalle').val('');
        }
    }).navGrid('#reversa_rendiciones_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#detalle_reversa_rendicion_grid").jqGrid({
        colNames: detalle_reversa_rendicion_grid.colNames(),
        colModel: detalle_reversa_rendicion_grid.colModel(),
        pager: $('#detalle_reversa_rendicion_grid_pager'),
        caption: "Detalle Rendici&oacute;n",
        postData: detalle_reversa_rendicion_grid.postData(),
        autowidth: false,
        width: 940,
        shrinkToFit: true,
        sortname: 'c_tributo, c_codigo_form',
        loadComplete: function(){
            let rowid = $('#reversa_rendiciones_grid').getGridParam('selrow');
            let rendicion_selecc = $('#reversa_rendiciones_grid').getCell(rowid, 'id_rendicion');
            let remito_selecc = $('#reversa_rendiciones_grid').getCell(rowid, 'n_remito');

            $('#id_rendicion').val(rendicion_selecc);
            $('#n_remito_detalle').val(remito_selecc);

            let total_cant_det = $('#detalle_reversa_rendicion_grid').getCell(1, 'total_cantidad');
            let total_imp_det = $('#detalle_reversa_rendicion_grid').getCell(1, 'total_impuestos');
            let total_tasa_det = $('#detalle_reversa_rendicion_grid').getCell(1, 'total_tasa');
            let total_total_det = $('#detalle_reversa_rendicion_grid').getCell(1, 'total_total');
            
            if($("#detalle_reversa_rendicion_grid").jqGrid("getGridParam", "reccount") != 0){
                $('#total_cant_det').val(total_cant_det);
                $('#total_imp_det').val(total_imp_det);
                $('#total_tasa_det').val(total_tasa_det);
                $('#total_total_det').val(total_total_det);
            }
        }
    }).navGrid('#detalle_reversa_rendicion_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
};