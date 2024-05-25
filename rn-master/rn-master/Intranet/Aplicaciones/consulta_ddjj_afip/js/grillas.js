function inicializarGrillas(){
    $("#iva_grid").jqGrid({
        colNames: iva_grid.colNames(),
        colModel: iva_grid.colModel(),
        pager: $('#iva_grid_pager'),
        caption: "IVA - F731-F831",
        postData: iva_grid.postData(),
        autowidth: false,
        width: 1450,
        height: 250,
        sortname: 'f_presentacion',
        sortorder: 'desc',
        loadComplete: function(){
            if($('#iva_grid').getGridParam('records') == 0){
                $("#btn_exportar_excel").hide();
            }else{
                $("#btn_exportar_excel").show();
            }
            if($('#iva_grid').getGridParam('records') > 0){
                v_solapa_actual = 'iva';
                $('#btn_exportar_excel').prop('disabled', false);
                $('#iva_grid').jqGrid('setSelection', 1);
                $('#bloque_iva').prop('hidden', false);
                $('#bloque_iva_web').prop('hidden', true);
                $('#bloque_iva_web_ii').prop('hidden', true);
                $('#bloque_empleadores').prop('hidden', true);
                $('#bloque_ganancias_pf').prop('hidden', true);
                $('#bloque_ganancias_soc').prop('hidden', true);
                $('#bloque_iva_simp').prop('hidden', true);
                $('#bloque_libro_iva').prop('hidden', true);
                bloquear_filtros();
                habilitar_botones();
                $('#bloque_btns').prop('hidden', false);
            } else{
                if(v_no_carga_inicial_iva){
                    mostrar_cuadro('I', 'Atención', 'La consulta ingresada no devolvió datos para IVA');
                    $('#bloque_iva').prop('hidden', false);
                    $('#bloque_iva_web').prop('hidden', true);
                    $('#bloque_iva_web_ii').prop('hidden', true);
                    $('#bloque_empleadores').prop('hidden', true);
                    $('#bloque_ganancias_pf').prop('hidden', true);
                    $('#bloque_ganancias_soc').prop('hidden', true);
                    $('#bloque_iva_simp').prop('hidden', true);
                    $('#bloque_libro_iva').prop('hidden', true);
                    bloquear_filtros();
                    habilitar_botones();
                    $('#bloque_btns').prop('hidden', false);
                } else{
                    v_no_carga_inicial_iva = true;
                }
            }
        },
    }).navGrid('#iva_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#empleadores_grid").jqGrid({
        colNames: empleadores_grid.colNames(),
        colModel: empleadores_grid.colModel(),
        pager: $('#empleadores_grid_pager'),
        caption: "Empleadores - F931",
        postData: empleadores_grid.postData(),
        autowidth: false,
        width: 1450,
        height: 250,
        sortname: 'f_presentacion',
        sortorder: 'desc',
        loadComplete: function(){
            if($('#empleadores_grid').getGridParam('records') == 0){
                $("#btn_exportar_excel").hide();
            }else{
                $("#btn_exportar_excel").show();
            }
            $('#main').procOverlay({visible:false});
            if($('#empleadores_grid').getGridParam('records') > 0){
                $('#bloque_btns').prop('hidden', false);
                v_solapa_actual = 'empleadores';
                $('#btn_exportar_excel').prop('disabled', false);
                $('#empleadores_grid').jqGrid('setSelection', 1);
                $('#bloque_empleadores').prop('hidden', false);
                $('#bloque_iva').prop('hidden', true);
                $('#bloque_ganancias_pf').prop('hidden', true);
                $('#bloque_ganancias_soc').prop('hidden', true);
                $('#bloque_iva_web').prop('hidden', true);
                $('#bloque_iva_web_ii').prop('hidden', true);
                $('#bloque_iva_simp').prop('hidden', true);
                $('#bloque_libro_iva').prop('hidden', true);
            } else{
                if(v_no_carga_inicial_emp){
                    mostrar_cuadro('I', 'Atención', 'La consulta ingresada no devolvió datos para Empleadores');
                    $('#bloque_iva').prop('hidden', true);
                    $('#bloque_iva_web').prop('hidden', true);
                    $('#bloque_iva_web_ii').prop('hidden', true);
                    $("#bloque_empleadores").prop('hidden',false);
                    $('#bloque_ganancias_pf').prop('hidden', true);
                    $('#bloque_ganancias_soc').prop('hidden', true);
                    $('#bloque_iva_simp').prop('hidden', true);
                    $('#bloque_libro_iva').prop('hidden', true);
                } else{
                    v_no_carga_inicial_emp = true;
                }
            }
        },
    }).navGrid('#empleadores_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#ganancias_pf_grid").jqGrid({
        colNames: ganancias_pf_grid.colNames(),
        colModel: ganancias_pf_grid.colModel(),
        pager: $('#ganancias_pf_grid_pager'),
        caption: "Ganancias Pers. Físicas (F711)",
        postData: ganancias_pf_grid.postData(),
        autowidth: false,
        width: 1450,
        height: 250,
        sortname: 'f_presentacion',
        sortorder: 'desc',
        loadComplete: function(){
            if($('#ganancias_pf_grid').getGridParam('records') == 0){
                $("#btn_exportar_excel").hide();
            }else{
                $("#btn_exportar_excel").show();
            }
            $('#main').procOverlay({visible:false});
            if($('#ganancias_pf_grid').getGridParam('records') > 0){
                $('#bloque_btns').prop('hidden', false);
                $('#ganancias_pf_grid').jqGrid('setSelection', 1);
                v_solapa_actual = 'gan pf';
                $('#btn_exportar_excel').prop('disabled', false);
                $('#bloque_ganancias_pf').prop('hidden', false);
                $('#bloque_ganancias_soc').prop('hidden', true);
                $('#bloque_iva').prop('hidden', true);
                $('#bloque_empleadores').prop('hidden', true);
                $('#bloque_iva_web').prop('hidden', true);
                $('#bloque_iva_web_ii').prop('hidden', true);
                $('#bloque_iva_simp').prop('hidden', true);
                $('#bloque_libro_iva').prop('hidden', true);
            } else{
                if(v_no_carga_inicial_gan_pf){
                    mostrar_cuadro('I', 'Atención', 'La consulta ingresada no devolvió datos para Ganancias Pers. Físicas');
                    $('#bloque_iva').prop('hidden', true);
                    $('#bloque_iva_web').prop('hidden', true);
                    $('#bloque_iva_web_ii').prop('hidden', true);
                    $("#bloque_empleadores").prop('hidden',true);
                    $("#bloque_ganancias_pf").prop('hidden',false);
                    $('#bloque_ganancias_soc').prop('hidden', true);
                    $('#bloque_iva_simp').prop('hidden', true);
                    $('#bloque_libro_iva').prop('hidden', true);
                } else{
                    v_no_carga_inicial_gan_pf = true;
                }
            }
        },
    }).navGrid('#ganancias_pf_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#ganancias_soc_grid").jqGrid({
        colNames: ganancias_soc_grid.colNames(),
        colModel: ganancias_soc_grid.colModel(),
        pager: $('#ganancias_soc_grid_pager'),
        caption: "Ganancias Sociedades (F713)",
        postData: ganancias_soc_grid.postData(),
        autowidth: false,
        width: 1450,
        height: 250,
        sortname: 'periodo',
        sortorder: 'desc',
        loadComplete: function(){
            if($('#ganancias_soc_grid').getGridParam('records') == 0){
                $("#btn_exportar_excel").hide();
            }else{
                $("#btn_exportar_excel").show();
            }
            $('#main').procOverlay({visible:false});
            if($('#ganancias_soc_grid').getGridParam('records') > 0){
                $('#bloque_btns').prop('hidden', false);
                v_solapa_actual = 'gan soc';
                $('#btn_exportar_excel').prop('disabled', false);
                $('#ganancias_soc_grid').jqGrid('setSelection', 1);
                $('#bloque_ganancias_soc').prop('hidden', false);
                $('#bloque_ganancias_pf').prop('hidden', true);
                $('#bloque_iva').prop('hidden', true);
                $('#bloque_empleadores').prop('hidden', true);
                $('#bloque_iva_web').prop('hidden', true);
                $('#bloque_iva_web_ii').prop('hidden', true);
                $('#bloque_iva_simp').prop('hidden', true);
                $('#bloque_libro_iva').prop('hidden', true);
            } else{
                if(v_no_carga_inicial_gan_soc){
                    mostrar_cuadro('I', 'Atención', 'La consulta ingresada no devolvió datos para Ganancias Sociedades');
                    $('#bloque_iva').prop('hidden', true);
                    $('#bloque_iva_web').prop('hidden', true);
                    $('#bloque_iva_web_ii').prop('hidden', true);
                    $("#bloque_empleadores").prop('hidden',true);
                    $("#bloque_ganancias_pf").prop('hidden',true);
                    $("#bloque_ganancias_soc").prop('hidden',false);
                    $('#bloque_iva_simp').prop('hidden', true);
                    $('#bloque_libro_iva').prop('hidden', true);

                } else{
                    v_no_carga_inicial_gan_soc = true;
                }
            }
        },
    }).navGrid('#ganancias_soc_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#iva_web_grid").jqGrid({
        colNames: iva_web_grid.colNames(),
        colModel: iva_web_grid.colModel(),
        pager: $('#iva_web_grid_pager'),
        caption: "IVA WEB (F2002)",
        postData: iva_web_grid.postData(),
        autowidth: false,
        width: 1450,
        height: 250,
        sortname: 'periodo',
        sortorder: 'desc',
        loadComplete: function(){
            if($('#iva_web_grid').getGridParam('records') == 0){
                $("#btn_exportar_excel").hide();
            }else{
                $("#btn_exportar_excel").show();
            }
            $('#main').procOverlay({visible:false});
            if($('#iva_web_grid').getGridParam('records') > 0){
                $('#bloque_btns').prop('hidden', false);
                v_solapa_actual = 'iva web';
                $('#btn_exportar_excel').prop('disabled', false);
                $('#iva_web_grid').jqGrid('setSelection', 1);
                $('#bloque_iva_web').prop('hidden', false);
                $('#bloque_iva_web_ii').prop('hidden', true);
                $('#bloque_ganancias_pf').prop('hidden', true);
                $('#bloque_ganancias_soc').prop('hidden', true);
                $('#bloque_iva').prop('hidden', true);
                $('#bloque_empleadores').prop('hidden', true);
                $('#bloque_iva_simp').prop('hidden', true);
                $('#bloque_libro_iva').prop('hidden', true);
            } else{
                if(v_no_carga_inicial_web){
                    mostrar_cuadro('I', 'Atención', 'La consulta ingresada no devolvió datos para IVA WEB (F2002)');
                    $('#bloque_iva').prop('hidden', true);
                    $("#bloque_iva_web").prop('hidden',false);
                    $('#bloque_iva_web_ii').prop('hidden', true);
                    $("#bloque_empleadores").prop('hidden',true);
                    $("#bloque_ganancias_pf").prop('hidden',true);
                    $("#bloque_ganancias_soc").prop('hidden',true);
                    $('#bloque_iva_simp').prop('hidden', true);
                    $('#bloque_libro_iva').prop('hidden', true);
                } else{
                    v_no_carga_inicial_web = true;
                }
            }
        },
    }).navGrid('#iva_web_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#iva_web_ii_grid").jqGrid({
        colNames: iva_web_ii_grid.colNames(),
        colModel: iva_web_ii_grid.colModel(),
        pager: $('#iva_web_ii_grid_pager'),
        caption: "IVA WEB (F2002 v2)",
        postData: iva_web_ii_grid.postData(),
        autowidth: false,
        width: 1450,
        height: 250,
        sortname: 'n_periodo_ddjj',
        sortorder: 'desc',
        loadComplete: function(){
            if($('#iva_web_ii_grid').getGridParam('records') == 0){
                $("#btn_exportar_excel").hide();
            }else{
                $("#btn_exportar_excel").show();
            }
            $('#main').procOverlay({visible:false});
            if($('#iva_web_ii_grid').getGridParam('records') > 0){
                $('#bloque_btns').prop('hidden', false);
                v_solapa_actual = 'iva web ii';
                $('#btn_exportar_excel').prop('disabled', false);
                $('#iva_web_ii_grid').jqGrid('setSelection', 1);
                $('#bloque_iva_web_ii').prop('hidden', false);
                $('#bloque_iva_web').prop('hidden', true);
                $('#bloque_ganancias_pf').prop('hidden', true);
                $('#bloque_ganancias_soc').prop('hidden', true);
                $('#bloque_iva').prop('hidden', true);
                $('#bloque_empleadores').prop('hidden', true);
                $('#bloque_iva_simp').prop('hidden', true);
                $('#bloque_libro_iva').prop('hidden', true);
            } else{
                if(v_no_carga_inicial_web_ii){
                    mostrar_cuadro('I', 'Atención', 'La consulta ingresada no devolvió datos para IVA WEB (F2002 v2)');
                    $('#bloque_iva').prop('hidden', true);
                    $('#bloque_iva_web').prop('hidden', true);
                    $("#bloque_iva_web_ii").prop('hidden',false);
                    $("#bloque_empleadores").prop('hidden',true);
                    $("#bloque_ganancias_pf").prop('hidden',true);
                    $("#bloque_ganancias_soc").prop('hidden',true);
                    $('#bloque_iva_simp').prop('hidden', true);
                    $('#bloque_libro_iva').prop('hidden', true);
                } else{
                    v_no_carga_inicial_web_ii = true;
                }
            }
        },
    }).navGrid('#iva_web_ii_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#iva_simp_grid").jqGrid({
        colNames: iva_simp_grid.colNames(),
        colModel: iva_simp_grid.colModel(),
        pager: $('#iva_simp_grid_pager'),
        caption: "IVA Simplificado (F2082)",
        postData: iva_simp_grid.postData(),
        autowidth: false,
        width: 1450,
        height: 250,
        sortname: 'periodo',
        sortorder: 'desc',
        loadComplete: function(){
            if($('#iva_simp_grid').getGridParam('records') == 0){
                $("#btn_exportar_excel").hide();
            }else{
                $("#btn_exportar_excel").show();
            }
            $('#main').procOverlay({visible:false});
            if($('#iva_simp_grid').getGridParam('records') > 0){
                $('#bloque_btns').prop('hidden', false);
                v_solapa_actual = 'iva simp';
                $('#btn_exportar_excel').prop('disabled', true);
                $('#iva_simp_grid').jqGrid('setSelection', 1);
                $('#bloque_iva_simp').prop('hidden', false);
                $('#bloque_iva_web').prop('hidden', true);
                $('#bloque_iva_web_ii').prop('hidden', true);
                $('#bloque_ganancias_pf').prop('hidden', true);
                $('#bloque_ganancias_soc').prop('hidden', true);
                $('#bloque_iva').prop('hidden', true);
                $('#bloque_empleadores').prop('hidden', true);
                $('#bloque_libro_iva').prop('hidden', true);
            } else{
                if(v_no_carga_inicial_iva_simp){
                    mostrar_cuadro('I', 'Atención', 'La consulta ingresada no devolvió datos para IVA Simplificado');
                    $('#bloque_iva').prop('hidden', true);
                    $('#bloque_iva_web').prop('hidden', true);
                    $("#bloque_iva_web_ii").prop('hidden',true);
                    $("#bloque_empleadores").prop('hidden',true);
                    $("#bloque_ganancias_pf").prop('hidden',true);
                    $("#bloque_ganancias_soc").prop('hidden',true);
                    $("#bloque_iva_simp").prop('hidden',false);
                    $('#bloque_libro_iva').prop('hidden', true);
                } else{
                    v_no_carga_inicial_iva_simp = true;
                }
            }
        },
    }).navGrid('#iva_simp_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#libro_iva_grid").jqGrid({
        colNames: libro_iva_grid.colNames(),
        colModel: libro_iva_grid.colModel(),
        pager: $('#libro_iva_grid_pager'),
        caption: "Libro IVA WEB (F2083)",
        postData: libro_iva_grid.postData(),
        autowidth: false,
        width: 1450,
        height: 250,
        sortname: 'periodo',
        sortorder: 'desc',
        loadComplete: function(){
            if($('#libro_iva_grid').getGridParam('records') == 0){
                $("#btn_exportar_excel").hide();
            }else{
                $("#btn_exportar_excel").show();
            }
            $('#main').procOverlay({visible:false});
            if($('#libro_iva_grid').getGridParam('records') > 0){
                $('#bloque_btns').prop('hidden', false);
                v_solapa_actual = 'libro iva';
                $('#btn_exportar_excel').prop('disabled', true);
                $('#libro_iva_grid').jqGrid('setSelection', 1);
                $('#bloque_libro_iva').prop('hidden', false);
                $('#bloque_iva_web').prop('hidden', true);
                $('#bloque_iva_simp').prop('hidden', true);
                $('#bloque_iva_web_ii').prop('hidden', true);
                $('#bloque_ganancias_pf').prop('hidden', true);
                $('#bloque_ganancias_soc').prop('hidden', true);
                $('#bloque_iva').prop('hidden', true);
                $('#bloque_empleadores').prop('hidden', true);
            } else{
                if(v_no_carga_inicial_libro_iva){
                    mostrar_cuadro('I', 'Atención', 'La consulta ingresada no devolvió datos para Libro IVA WEB');
                    $('#bloque_iva').prop('hidden', true);
                    $('#bloque_iva_web').prop('hidden', true);
                    $("#bloque_iva_web_ii").prop('hidden',true);
                    $("#bloque_empleadores").prop('hidden',true);
                    $("#bloque_ganancias_pf").prop('hidden',true);
                    $("#bloque_ganancias_soc").prop('hidden',true);
                    $("#bloque_iva_simp").prop('hidden',true);
                    $("#bloque_libro_iva").prop('hidden',false);
                } else{
                    v_no_carga_inicial_libro_iva = true;
                }
            }
        },
    }).navGrid('#libro_iva_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
}