function inicializarGrillas(){
    $("#resumen_grid").jqGrid({
        colNames: resumen_grid.colNames(),
        colModel: resumen_grid.colModel(),
        pager: $('#resumen_grid_pager'),
        caption: "",
        postData: resumen_grid.postData(),
        autowidth: false,
        width: 1480,
        height: 280,
        sortname: 'c_tipo_plan_pago, n_plan_pago',
        sortorder: 'asc',
        loadComplete: function(){
            if($('#resumen_grid').getGridParam('records') > 0){
                $('#resumen_grid').jqGrid('setSelection', 1);
                $('#etiqueta_tab_detalle').removeClass('tab-deshabilitado');
                $('#etiqueta_tab_cuotas').removeClass('tab-deshabilitado');
            } else{
                if(v_no_carga_inicial_pp){
                    mostrar_cuadro('I', 'Atención', 'La consulta ingresada no devolvió datos');
                } else{
                    v_no_carga_inicial_pp = true;
                }
            }
        },
        onSelectRow: function(id){
            $('#n_plan_pago').val($('#resumen_grid').getCell(id, 'n_plan_pago'));
            $('#c_tipo_plan_pago').val($('#resumen_grid').getCell(id, 'c_tipo_plan_pago'));
            $('#d_objeto_hecho_2').val($('#resumen_grid').getCell(id, 'd_objeto_hecho'));
            $('#c_tipo_imp').val($('#resumen_grid').getCell(id, 'c_tipo_imponible'));
            $('#c_tributo').val($('#resumen_grid').getCell(id, 'c_tributo'));
            $('#c_tipo_imp').blur();
            
        }
    }).navGrid('#resumen_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#detalle_grid").jqGrid({
        colNames: detalle_grid.colNames(),
        colModel: detalle_grid.colModel(),
        pager: $('#detalle_grid_pager'),
        caption: "",
        postData: detalle_grid.postData(),
        autowidth: false,
        width: 1480,
        height: 280,
        sortname: 'id_obligacion',
        sortorder: 'asc',
        shrinkToFit: true,
        loadComplete: function(){
            if($('#detalle_grid').getGridParam('records') > 0){
                $('#detalle_grid').jqGrid('setSelection', 1);
            } else{
                if(v_no_carga_inicial_ppd){
                    mostrar_cuadro('I', 'Atención', 'La consulta ingresada no devolvió datos');
                } else{
                    v_no_carga_inicial_ppd = true;
                }
            }
        },
        ondblClickRow: function (rowid) {
            post_to_url('consulta_cuenta_corr.php', {
                'id_contribuyente': $('#id_contribuyente').val(),
                'd_objeto_hecho': $('#d_objeto_hecho_2').val(),
                'c_tributo': $('#c_tributo').val(),
                'c_tipo_imponible': $('#c_tipo_imp').val(),
                'n_pos_fiscal_hasta': $('#detalle_grid').getCell(rowid, 'anio'),
                'cuota_hasta': $('#detalle_grid').getCell(rowid, 'cuota'), 
                'p_n_id_menu': 10852
            }, 
            '_blank'
            );
        }
    }).navGrid('#detalle_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#cuotas_grid").jqGrid({
        colNames: cuotas_grid.colNames(),
        colModel: cuotas_grid.colModel(),
        pager: $('#cuotas_grid_pager'),
        caption: "",
        postData: cuotas_grid.postData(),
        autowidth: false,
        width: 1480,
        height: 280,
        sortname: 'n_cuota',
        sortorder: 'asc',
        shrinkToFit: true,
        loadComplete: function(){
            if($('#cuotas_grid').getGridParam('records') > 0){
                $('#cuotas_grid').jqGrid('setSelection', 1);
                $('#i_total_saldo').val($('#cuotas_grid').getCell(1, 'i_total_saldo'));
                let i_total_saldo = $('#cuotas_grid').getCell(1, 'i_total_saldo').replace(/,/g, ".");
                
                if(i_total_saldo > 0){
                    $('#membrete_pie').text('A FAVOR DEL CONTRIBUYENTE');
                }
                else if(i_total_saldo < 0){
                    $('#membrete_pie').text('A FAVOR DE DGR');
                }else{
                    $('#membrete_pie').text(null);
                }
            } else{
                if(v_no_carga_inicial_ppc){
                    mostrar_cuadro('I', 'Atención', 'La consulta ingresada no devolvió datos');
                } else{
                    v_no_carga_inicial_ppc = true;
                }
            }
        },
        ondblClickRow: function (rowid) {
            post_to_url('consulta_cuenta_corr.php', {
                'id_contribuyente': $('#id_contribuyente').val(),
                'd_objeto_hecho': $('#d_objeto_hecho_2').val(),
                'c_tributo': $('#c_tributo').val(),
                'c_tipo_imponible': $('#c_tipo_imp').val(), 
                'p_n_id_menu': 10852
            }, 
            '_blank'
            );
        }
    }).navGrid('#cuotas_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#honorarios_grid").jqGrid({
        colNames: honorarios_grid.colNames(),
        colModel: honorarios_grid.colModel(),
        pager: $('#honorarios_grid_pager'),
        caption: "Datos Generales",
        postData: honorarios_grid.postData(),
        autowidth: false,
        width: 1400,
        height: 60,
        sortname: 'c_tipo_plan_pago, n_plan_pago, f_vig_desde, n_cuit_acreedor',
        sortorder: 'asc',
        loadComplete: function(){
            if($('#honorarios_grid').getGridParam('records') > 0){
                $('#honorarios_grid').jqGrid('setSelection', 1);
                $('#honorarios_modal').show();
                $(window).resize();
            } else{
                if(v_no_carga_inicial_pph){
                    mostrar_cuadro('I', 'Atención', 'La consulta ingresada no devolvió datos');
                } else{
                    v_no_carga_inicial_pph = true;
                }
            }
        },
        onSelectRow: function(id){
            $('#d_denominacion_rc').val($('#honorarios_grid').getCell(id, 'd_denominacion_rc'));
            $('#d_caracter_rc').val($('#honorarios_grid').getCell(id, 'd_caracter_rc'));
            $('#d_acredita_rc').val($('#honorarios_grid').getCell(id, 'd_acredita_rc'));
        }
    }).navGrid('#honorarios_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );


    $("#relacionados_grid").jqGrid({
        colNames: relacionados_grid.colNames(),
        colModel: relacionados_grid.colModel(),
        pager: $('#relacionados_grid_pager'),
        caption: "Planes de Pago Relacionados",
        postData: relacionados_grid.postData(),
        autowidth: false,
        width: 1400,
        height: 100,
        shrinkToFit: true,
        sortname: 'c_tipo_plan_pago, n_plan_pago, c_tipo_plan_pago_rel, n_plan_pago_rel',
        sortorder: 'asc',
        loadComplete: function(){
            if($('#relacionados_grid').getGridParam('records') > 0){
                $(window).resize();
            }
        },
        ondblClickRow: function (rowid) {
            //LLAMA AL FACP002 (en proceso de migracion)
            /*post_to_url('cons_inmuebles.php', {
                'p_d_partida': $('#main_grid').getCell(rowid, 'd_nomenclatura_inf'),
                'p_n_id_menu': 10930
            }, 
            '_blank'
            );*/
        }
    }).navGrid('#relacionados_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
};