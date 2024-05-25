function init_grillas() {

    var membrete = datos_cuotas_grid.colModel()[9];
        // Add or update the cellattr function for the specific column
        membrete.formatter = function(cellvalue, options, rowObject){
                    
                    if(rowObject[8] < 0){
                        
                        return '<span style="color:green; font-weight: bold" id="membrete_' + rowObject[11] + '" > DGR </span>';
                    }else if(rowObject[8] > 0){
                        
                        return '<span style="color:red; font-weight: bold" id="membrete_' + rowObject[11] + '" > CONTRIBUY. </span>';
                    }else if(rowObject[8] == 0){
                        return '<span id="membrete_' + rowObject[11] + '" ></span>';
                    }
                };
    var modified_datos_cuotas_grid = datos_cuotas_grid.colModel();
    modified_datos_cuotas_grid[9] = membrete;

    $("#cuotas_grid").jqGrid({
        colNames: datos_cuotas_grid.colNames(),
        colModel: modified_datos_cuotas_grid,
        pager: $('#cuotas_grid_pager'),
        postData: datos_cuotas_grid.postData(),
        caption: "Cuotas",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:200,
        sortname: 'n_cuota',
        sortorder: 'asc',
        loadComplete:function(){
            

            if( contr_var_total < 0 ){
                $('#contr_membrete').text( 'A FAVOR DE DGR');
                $('#contr_membrete').css('color', 'green');
            }else if(contr_var_total > 0){
                $('#contr_membrete').text('A FAVOR DEL CONTRIBUYENTE.');
                $('#contr_membrete').css('color', 'red');
            }else if(contr_var_total == 0){
                $('#contr_membrete').text('');
            }
            $('#total').val(Math.abs(contr_var_total));
            $('.mascara_importe').focusout();
        },
        rowattr:function(rowData, currentObj, rowId){
            if(rowId == 1){
                contr_var_total = 0;
                $('#contr_membrete').text('');
            }
            contr_var_total = Number(contr_var_total || 0) + Number(rowData.saldo_con_signo);
        },
        ondblClickRow : function(rowid){

            g_id_obligacion = $('#cuotas_grid').getCell(rowid,'id_obligacion');

            if (g_id_obligacion && g_id_obligacion != 0){

                //CALL_FORM ('CCTEC005',HIDE,DO_REPLACE);
                post_to_url('detalle_cuenta_corr.php',{'id_obligacion':g_id_obligacion, 'n_cuota':$('#detalle_grid').getCell(rowid,'n_cuota'),'p_n_id_menu':10854,'n_cuit':$('#n_cuit').val()},'_blank','POST');

            }
            g_id_obligacion = null;
        },
    }).navGrid('#cuotas_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    )

    $("#detalle_grid").jqGrid({
        colNames: datos_detalle_grid.colNames(),
        colModel: datos_detalle_grid.colModel(),
        pager: $('#detalle_grid_pager'),
        postData: datos_detalle_grid.postData(),
        caption: "Detalle",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:200,
         sortname: 'd_objeto_hecho, f_vto, c_concepto_mov',
         sortorder: 'asc',
         ondblClickRow : function(rowid){

            g_id_obligacion = $('#detalle_grid').getCell(rowid,'id_obligacion');

            if (g_id_obligacion && g_id_obligacion != 0){

                //CALL_FORM ('CCTEC005',HIDE,DO_REPLACE);
                post_to_url('detalle_cuenta_corr.php',{'id_obligacion':g_id_obligacion, 'n_cuota':$('#detalle_grid').getCell(rowid,'cuota'), 'n_pos_fiscal':    $('#detalle_grid').getCell(rowid,'anio').replace('/',""), 'p_n_id_menu':10854,'n_cuit':$('#n_cuit').val()},'_blank','POST');

            }
            g_id_obligacion = null;
        },
    }).navGrid('#detalle_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    )

    $("#cuotas_adeudadas_grid").jqGrid({
        colNames: datos_cuotas_adeudadas_grid.colNames(),
        colModel: datos_cuotas_adeudadas_grid.colModel(),
        pager: $('#cuotas_adeudadas_grid_pager'),
        postData: datos_cuotas_adeudadas_grid.postData(),
        caption: "Cuotas Adeudadas",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:200,
        sortname: 'n_cuota',
        sortorder: 'asc',
        loadComplete:function(data){
            if (data && data.records > 0) {
                calcular_totales();
            }
        },
    }).navGrid('#cuotas_adeudadas_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    )
    
}

