function inicializarGrillas(){

    $('#actividades_grid').jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#actividades_grid_pager'),
        caption: 'xxx',
        postData: datos_main_grid.postData(),
        editurl: 'clientArray',
        footerrow:true,
        userDataOnFooter : false, 
        loadComplete: function()
        {
            let gridParentWidth = $('#gbox_actividades_grid').parent().width();
            $('#actividades_grid').setGridWidth(gridParentWidth);
            $('#actividades_grid').setGridHeight('170');

            $("#actividades_grid").jqGrid("footerData", "set",  
                {c_tipo_unidad:"<span class='footerRowGrid' >Totales</span>",
                i_bi_verificada: "<span  class='footerRowGrid verificado'>"+sumCol('actividades_grid','i_bi_verificada')+"</span>",
                i_bi_declarada: "<span  class=' declarado'>"+sumCol('actividades_grid','i_bi_declarada')+"</span>",
                aj_bi_verificada:"<span  class='footerRowGrid verificado'>"+sumCol('actividades_grid','aj_bi_verificada')+"</span>",
                aj_bi_declarada: "<span  class=' declarado'>"+sumCol('actividades_grid','aj_bi_declarada')+"</span>",
                bi_aj_declarada: "<span  class=' declarado'>"+sumCol('actividades_grid','bi_aj_declarada')+"</span>",
                bi_aj_verificada: "<span  class='footerRowGrid verificado'>"+sumCol('actividades_grid','bi_aj_verificada')+"</span>",
                aj_bi_declarada:"<span class=' declarado'>"+sumCol('actividades_grid','aj_bi_declarada')+"</span>",
                i_bonificado:"<span class='footerRowGrid verificado'>"+sumCol('actividades_grid','i_bonificado')+"</span>",
                i_bonif_declarada:"<span class='declarado'>"+sumCol('actividades_grid','i_bonif_declarada')+"</span>",
                i_impuesto_declarado:"<span class='declarado'>"+sumCol('actividades_grid','i_impuesto_declarado')+"</span>",
                i_impuesto_verificado:"<span class='footerRowGrid verificado'>"+sumCol('actividades_grid','i_impuesto_verificado')+"</span>"}, 
                false);


        },
        ondblClickRow: function (id) {
            if (modo=='CAR' && modo_obl =='CAR'){
                let id_actividad = $('#actividades_grid').getCell(id, 'id_tmp_ff13');
                editableRow(id,'actividades_grid');
            }
        }
    }).navGrid('#actividades_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

  

    $("#gview_actividades_grid > .ui-jqgrid-titlebar").hide();

    $("#modal_deduc_grilla1").jqGrid({
        colNames: datos_modal_deduc_grid1.colNames(),
        colModel: datos_modal_deduc_grid1.colModel(),
        pager: $('#modal_deduc_grilla1_pager'),
        caption: "Deducciones Recuperadas",
        autowidth: false,
        /*multiselect:true,
        multiboxonly:true,*/
        rowNum:99999,
        rowList:99999,
        postData: datos_modal_deduc_grid1.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        loadComplete: function (data) {
            if( $('#modal_deduc_grilla1').getGridParam('reccount') == 0){
                $('#check_select_all').prop('checked', false);
            }

            $('#total_deducciones').val(sumCol('modal_deduc_grilla1','n_importe'));

        }
    }).navGrid('#modal_deduc_grilla1_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );
/*
    if (modo == 'CON'){
        $("#modal_deduc_grilla1").jqGrid('hideCol',['checkbox']);
    }
*/
    $("#ret_banc_grilla2").jqGrid({
        colNames: datos_modal_deduc_grid2.colNames(),
        colModel: datos_modal_deduc_grid2.colModel(),
        pager: $('#ret_banc_grilla2_pager'),
        caption: "Retenciones Bancarias Verificadas",
        autowidth: false,
        rowNum:99999,
        rowList:99999,
        postData: datos_modal_deduc_grid2.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        loadComplete: function (data) {
            let monto = _get_total_deducciones('REC');
            $('#total_ret_banc').val(redondear(monto,2));
        }
    }).navGrid('#ret_banc_grilla2_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#ret_iibb_grilla2").jqGrid({
        colNames: datos_modal_deduc_grid3.colNames(),
        colModel: datos_modal_deduc_grid3.colModel(),
        pager: $('#ret_iibb_grilla2_pager'),
        caption: "Retenciones IIBB Verificadas",
        autowidth: false,
        rowNum:99999,
        rowList:99999,
        postData: datos_modal_deduc_grid3.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        loadComplete: function (data) {
            let monto = _get_total_deducciones('RET');
            $('#total_ret_iibb').val(redondear(monto,2));
        }
    }).navGrid('#ret_iibb_grilla2_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#percep_grilla2").jqGrid({
        colNames: datos_modal_deduc_grid4.colNames(),
        colModel: datos_modal_deduc_grid4.colModel(),
        pager: $('#percep_grilla2_pager'),
        caption: "Percepciones Verificadas",
        autowidth: false,
        rowNum:99999,
        rowList:99999,
        postData: datos_modal_deduc_grid4.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        loadComplete: function (data) {
            $('#total_per_iibb').val(redondear(_get_total_deducciones('PER'),2));
        }
    }).navGrid('#percep_grilla2_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#percep_aduana_grilla2").jqGrid({
        colNames: datos_modal_deduc_grid5.colNames(),
        colModel: datos_modal_deduc_grid5.colModel(),
        pager: $('#percep_aduana_grilla2_pager'),
        caption: "Percepciones de Aduana Verificadas",
        autowidth: false,
        rowNum:99999,
        rowList:99999,
        postData: datos_modal_deduc_grid5.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        loadComplete: function (data) {
            $('#total_per_adu').val(redondear(_get_total_deducciones('ADU'),2));
        }
    }).navGrid('#percep_aduana_grilla2_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#inf_adicional_grid").jqGrid({
        colNames: datos_info_adicional.colNames(),
        colModel: datos_info_adicional.colModel(),
        pager: $('#inf_adicional_grid_pager'),
        /*caption: " ",*/
        autowidth: false,
        postData: datos_info_adicional.postData(),
        editurl: 'clientArray',
        ondblClickRow: function (id) {
        if (modo=='CAR' && modo_obl =='CAR'){
            editableRow(id,'inf_adicional_grid');
        }
    }
    }).navGrid('#inf_adicional_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    if (modo == 'CAR'){
        $('#actividades_grid').navButtonAdd('#actividades_grid_pager',
            {
                id:'btn_guardar_actividad',
                buttonicon:"glyphicon glyphicon-floppy-saved",
                caption:"Actividad",
                position: "first",
                title:"También puede guardar los cambios presionando Enter durante la edición.",
                cursor: "pointer",
                onClickButton: function(){

                    let editingRows = $('#actividades_grid').jqGrid("getGridParam", "savedRow");

                    if (editingRows.length !== 1){
                        mostrar_cuadro('I', 'Error', 'Debe existir un registro en edición para guardar.');
                        return;
                    }

                    let id_selected_row = editingRows[0].id;

                    guardarActividades(id_selected_row)
                        .then((res)=>{
                            $('#actividades_grid').trigger("reloadGrid");
                            /*SALDO CONTR. / SALDO ART*/
                            let saldo = res.p_saldo_fisca;
                            let total_bonif = res.p_i_total_bonif_verif;

                            if (parse(saldo) < 0){
                                $('#i_saldo_contrib').val(formatear_numero(Math.abs(saldo),2));
                                $('#i_saldo_art').val('0,00');
                            }else if (parse(saldo) > 0){
                                $('#i_saldo_art').val(formatear_numero(Math.abs(saldo),2));
                                $('#i_saldo_contrib').val('0,00')
                            }else {
                                $('#i_saldo_contrib, #i_saldo_art').val(formatear_numero(Math.abs(saldo),2));
                            }

                            $('#i_bonif_verif').val(formatear_numero(total_bonif,2));
                        })
                        .catch((err)=>{
                            mostrar_cuadro('E', 'Error', err);
                            $('#actividades_grid').jqGrid("restoreRow", id_selected_row );
                        });

                }
            }).navButtonAdd('#actividades_grid_pager',{
            id: 'btn_del_verif',
            caption: "BI 0",
            position: "first",
            buttonicon: "glyphicon glyphicon-remove-sign",
            title: "Eliminar Actividades con BI Verificada igual a 0",
            cursor: "pointer",
            onClickButton: function () {
                mostrar_cuadro('C', 'Eliminar Actividades',
                    '¿Esta seguro/a que desea eliminar todas las Actividades con BI Verificada igual a 0?',
                    function () {
                        $('#main').procOverlay({visible:true});
                        $.ajax({
                            type:'POST',
                            url: FUNCIONES_BASEPATH+'maestro_abm.php',
                            data:{
                                "p_n_instancia":v_n_instancia,
                                "p_n_orden":v_n_orden,
                                "p_id_obligacion":v_id_obligacion,
                                "p_oper":'ind',
                                "id_menu":10773,
                                "n_orden":8
                            },
                            dataType:'json',
                            success: function( data ) {
                                $('#main').procOverlay({visible:false});
                                if(data.resultado == 'OK'){
                                    mostrar_mensaje_modal('S','Eliminar Actividades','Las Actividades con BI Verificada igual a 0 han sido eliminadas con éxito.');
                                    $('#actividades_grid').trigger('reloadGrid');
                                }else{
                                    mostrar_cuadro('E', 'Error', data.resultado);
                                    return;
                                }
                            }
                        });
                    }, function () {
                        return;
                    }
                );
            }
        }).navButtonAdd('#actividades_grid_pager',{
            id: 'btn_del_act',
            caption: "",
            position: "first",
            buttonicon: "glyphicon glyphicon-trash",
            title: "Eliminar Actividad",
            cursor: "pointer",
            onClickButton: function () {
                var id = $("#actividades_grid").getGridParam('selrow');
                if (id) {
                    mostrar_cuadro('C', 'Eliminar Actividad',
                        '¿Esta seguro/a que desea eliminar la Actividad seleccionada?',
                        function () {
                            let id_tmp_ff13 = $('#actividades_grid').getCell(id, 'id_tmp_ff13');
                            let c_actividad = $('#actividades_grid').getCell(id, 'c_actividad');
                            abmActividad('del',c_actividad,id_tmp_ff13);
                        }, function () {
                            return;
                        }
                    );
                }else {
                    mostrar_error('Debe seleccionar una Actividad de la grilla.');
                    return false;
                }
            }
        }).navButtonAdd('#actividades_grid_pager',{
            id:'btn_add_act',
            caption:"",
            position:"first",
            buttonicon: "glyphicon glyphicon-plus",
            title:"Agregar Actividad",
            cursor:"pointer",
            onClickButton:function() {
                $('#modal_abm_actividad').modal("show");
            }
        }).bind("jqGridInlineAfterRestoreRow",
            function(){
                lastSel = undefined;
                return;
            });

        /*BOTONES DE 2DA GRILLA DEDUCCIONES*/
        $('#ret_banc_grilla2').navButtonAdd('#ret_banc_grilla2_pager',{
            id: 'btn_del_deduc_banc_t',
            caption: "<b>Eliminar Todo</b>",
            position: "last",
            buttonicon: "",
            title: "Eliminar todas las Retenciones Bancarias Verificadas",
            cursor: "pointer",
            onClickButton: function () {
                mostrar_cuadro('C', 'Eliminar Deducciónes',
                    '¿Esta seguro/a que desea eliminar todas la Deducciónes de la grilla?',
                    function () {
                        _agregar_quitar_deduccion(null,'BT');
                    }, function () {
                        return;
                    }
                );
            }
        }).navButtonAdd('#ret_banc_grilla2_pager',{
            id: 'btn_del_deduc_banc',
            caption: "",
            position: "first",
            buttonicon: "glyphicon glyphicon-trash",
            title: "Eliminar Retención Bancaria Verificada",
            cursor: "pointer",
            onClickButton: function () {
                var id = $("#ret_banc_grilla2").getGridParam('selrow');
                if (id) {
                    mostrar_cuadro('C', 'Eliminar Deducción',
                        '¿Esta seguro/a que desea eliminar la Deducción seleccionada?',
                        function () {
                            let v_n_deduc = $('#ret_banc_grilla2').getCell(id, 'n_deduccion');
                            _agregar_quitar_deduccion(v_n_deduc,'B');
                        }, function () {
                            return;
                        }
                    );
                }else {
                    mostrar_error('Debe seleccionar una Deducción de la grilla.');
                    return false;
                }
            }
        }).navButtonAdd('#ret_banc_grilla2_pager',{
            id:'btn_edi_deduc_banc',
            caption:"",
            position:"first",
            buttonicon: "glyphicon glyphicon-edit",
            title:"Editar Retención Bancaria Verificada",
            cursor:"pointer",
            onClickButton:function() {
                var id = $("#ret_banc_grilla2").getGridParam('selrow');
                if (id) {
                    $('#modal_alta_deduc_form div').each(function () {
                        if ($(this).hasClass('alta_banco') || $(this).hasClass('alta_general')){
                            $(this).show();
                        }else {
                            $(this).hide();
                        }
                    });
                    $('#alta_deduc_titulo').text('Editar Retención Bancaria Verificada');
                    $('#alta_deduc_oper').val('M');
                    $('#alta_deduc_ndeduc').val($('#ret_banc_grilla2').getCell(id, 'n_deduccion'));
                    $('#alta_deduc_id_contrib').val($('#ret_banc_grilla2').getCell(id, 'id_contrib_ag'));
                    $('#alta_deduc_cuit').val($('#ret_banc_grilla2').getCell(id, 'n_cuit_ag')).attr('disabled',true);
                    $('#alta_deduc_denominacion').val($('#ret_banc_grilla2').getCell(id, 'd_denominacion_ag')).attr('disabled',true);
                    $('#alta_deduc_cbu').val($('#ret_banc_grilla2').getCell(id, 'n_cbu'));
                    $('#alta_deduc_tcuenta').val($('#ret_banc_grilla2').getCell(id, 'c_tipo_cuenta'));
                    $('#alta_deduc_tmoneda').val($('#ret_banc_grilla2').getCell(id, 'c_tipo_moneda'));
                    $('#alta_deduc_anio').val($('#ret_banc_grilla2').getCell(id, 'n_anio'));
                    $('#alta_deduc_mes').val($('#ret_banc_grilla2').getCell(id, 'n_mes'));
                    $('#alta_deduc_pfisc').val($('#ret_banc_grilla2').getCell(id, 'n_pos_fiscal').replace('/',''));
                    $('#alta_deduc_impor').val($('#ret_banc_grilla2').getCell(id, 'n_importe'));
                    $('#modal_alta_deduc').modal("show");
                }else {
                    mostrar_error('Debe seleccionar una Deducción de la grilla.');
                    return false;
                }
            }
        }).navButtonAdd('#ret_banc_grilla2_pager',{
            id:'btn_add_deduc_banc',
            caption:"",
            position:"first",
            buttonicon: "glyphicon glyphicon-plus",
            title:"Agregar Retención Bancaria Verificada",
            cursor:"pointer",
            onClickButton:function() {
                $('#modal_alta_deduc_form div').each(function () {
                    if ($(this).hasClass('alta_banco') || $(this).hasClass('alta_general')){
                        $(this).show();
                    }else {
                        $(this).hide();
                    }
                });
                $('#alta_deduc_titulo').text('Agregar Retención Bancaria Verificada');
                $('#alta_deduc_oper').val('A');
                $('#modal_alta_deduc').modal("show");
            }
        }).bind("jqGridInlineAfterRestoreRow",
            function(){
                lastSel = undefined;
                return;
            });

        $('#ret_iibb_grilla2').navButtonAdd('#ret_iibb_grilla2_pager',{
            id: 'btn_del_deduc_iibb_t',
            caption: "<b>Eliminar Todo</b>",
            position: "last",
            buttonicon: "",
            title: "Eliminar todas las Retenciones IIBB Verificadas",
            cursor: "pointer",
            onClickButton: function () {
                mostrar_cuadro('C', 'Eliminar Deducciónes',
                    '¿Esta seguro/a que desea eliminar todas la Deducciónes de la grilla?',
                    function () {
                        _agregar_quitar_deduccion(null,'BT');
                    }, function () {
                        return;
                    }
                );
            }
        }).navButtonAdd('#ret_iibb_grilla2_pager',{
            id: 'btn_del_deduc_iibb',
            caption: "",
            position: "first",
            buttonicon: "glyphicon glyphicon-trash",
            title: "Eliminar Retención IIBB Verificada",
            cursor: "pointer",
            onClickButton: function () {
                var id = $("#ret_iibb_grilla2").getGridParam('selrow');
                if (id) {
                    mostrar_cuadro('C', 'Eliminar Deducción',
                        '¿Esta seguro/a que desea eliminar la Deducción seleccionada?',
                        function () {
                            let v_n_deduc = $('#ret_iibb_grilla2').getCell(id, 'n_deduccion');
                            _agregar_quitar_deduccion(v_n_deduc,'B');
                        }, function () {
                            return;
                        }
                    );
                }else {
                    mostrar_error('Debe seleccionar una Deducción de la grilla.');
                    return false;
                }
            }
        }).navButtonAdd('#ret_iibb_grilla2_pager',{
            id:'btn_edi_deduc_iibb',
            caption:"",
            position:"first",
            buttonicon: "glyphicon glyphicon-edit",
            title:"Editar Retención IIBB Verificada",
            cursor:"pointer",
            onClickButton:function() {
                var id = $("#ret_iibb_grilla2").getGridParam('selrow');
                if (id) {
                    $('#modal_alta_deduc_form div').each(function () {
                        if ($(this).hasClass('alta_iibb') || $(this).hasClass('alta_general')){
                            $(this).show();
                        }else {
                            $(this).hide();
                        }
                    });
                    $('#alta_deduc_titulo').text('Editar Retención IIBB Verificada');
                    $('#alta_deduc_oper').val('M');
                    $('#alta_deduc_ndeduc').val($('#ret_iibb_grilla2').getCell(id, 'n_deduccion'));
                    $('#alta_deduc_id_contrib').val($('#ret_iibb_grilla2').getCell(id, 'id_contrib_ag'));
                    $('#alta_deduc_cuit').val($('#ret_iibb_grilla2').getCell(id, 'n_cuit_ag')).attr('disabled',true);
                    $('#alta_deduc_denominacion').val($('#ret_iibb_grilla2').getCell(id, 'd_denominacion_ag')).attr('disabled',true);
                    $('#alta_deduc_anio').val($('#ret_iibb_grilla2').getCell(id, 'n_anio'));
                    $('#alta_deduc_mes').val($('#ret_iibb_grilla2').getCell(id, 'n_mes'));
                    $('#alta_deduc_fecha').val($('#ret_iibb_grilla2').getCell(id, 'f_fecha'));
                    $('#alta_deduc_impor').val($('#ret_iibb_grilla2').getCell(id, 'n_importe'));
                    $('#alta_deduc_ncomp').val($('#ret_iibb_grilla2').getCell(id, 'n_comprobante'));
                    $('#alta_deduc_dcomp').val($('#ret_iibb_grilla2').getCell(id, 'd_constancia'));
                    $('#alta_deduc_tcomp').val($('#ret_iibb_grilla2').getCell(id, 'c_tipo_comprobante'));
                    $('#alta_deduc_letra').val($('#ret_iibb_grilla2').getCell(id, 'c_letra'));
                    $('#alta_deduc_sucursal').val($('#ret_iibb_grilla2').getCell(id, 'c_sucursal'));
                    $('#modal_alta_deduc').modal("show");
                }else {
                    mostrar_error('Debe seleccionar una Deducción de la grilla.');
                    return false;
                }
            }
        }).navButtonAdd('#ret_iibb_grilla2_pager',{
            id:'btn_add_deduc_iibb',
            caption:"",
            position:"first",
            buttonicon: "glyphicon glyphicon-plus",
            title:"Agregar Retención IIBB Verificada",
            cursor:"pointer",
            onClickButton:function() {
                $('#modal_alta_deduc_form div').each(function () {
                    if ($(this).hasClass('alta_iibb') || $(this).hasClass('alta_general')){
                        $(this).show();
                    }else {
                        $(this).hide();
                    }
                });
                $('#alta_deduc_titulo').text('Agregar Retención IIBB Verificada');
                $('#alta_deduc_oper').val('A');
                $('#modal_alta_deduc').modal("show");
            }
        }).bind("jqGridInlineAfterRestoreRow",
            function(){
                lastSel = undefined;
                return;
            });

        $('#percep_grilla2').navButtonAdd('#percep_grilla2_pager',{
            id: 'btn_del_deduc_percep_t',
            caption: "<b>Eliminar Todo</b>",
            position: "last",
            buttonicon: "",
            title: "Eliminar todas las Percepciones Verificadas",
            cursor: "pointer",
            onClickButton: function () {
                mostrar_cuadro('C', 'Eliminar Deducciónes',
                    '¿Esta seguro/a que desea eliminar todas la Deducciónes de la grilla?',
                    function () {
                        _agregar_quitar_deduccion(null,'BT');
                    }, function () {
                        return;
                    }
                );
            }
        }).navButtonAdd('#percep_grilla2_pager',{
            id: 'btn_del_deduc_percep',
            caption: "",
            position: "first",
            buttonicon: "glyphicon glyphicon-trash",
            title: "Eliminar Percepción Verificada",
            cursor: "pointer",
            onClickButton: function () {
                var id = $("#percep_grilla2").getGridParam('selrow');
                if (id) {
                    mostrar_cuadro('C', 'Eliminar Deducción',
                        '¿Esta seguro/a que desea eliminar la Deducción seleccionada?',
                        function () {
                            let v_n_deduc = $('#percep_grilla2').getCell(id, 'n_deduccion');
                            _agregar_quitar_deduccion(v_n_deduc,'B');
                        }, function () {
                            return;
                        }
                    );
                }else {
                    mostrar_error('Debe seleccionar una Deducción de la grilla.');
                    return false;
                }
            }
        }).navButtonAdd('#percep_grilla2_pager',{
            id:'btn_edi_deduc_percep',
            caption:"",
            position:"first",
            buttonicon: "glyphicon glyphicon-edit",
            title:"Editar Percepción Verificada",
            cursor:"pointer",
            onClickButton:function() {
                var id = $("#percep_grilla2").getGridParam('selrow');
                if (id) {
                    $('#modal_alta_deduc_form div').each(function () {
                        if ($(this).hasClass('alta_per') || $(this).hasClass('alta_general')){
                            $(this).show();
                        }else {
                            $(this).hide();
                        }
                    });
                    $('#alta_deduc_titulo').text('Editar Percepción Verificada');
                    $('#alta_deduc_oper').val('M');
                    $('#alta_deduc_ndeduc').val($('#percep_grilla2').getCell(id, 'n_deduccion'));
                    $('#alta_deduc_id_contrib').val($('#percep_grilla2').getCell(id, 'id_contrib_ag'));
                    $('#alta_deduc_cuit').val($('#percep_grilla2').getCell(id, 'n_cuit_ag')).attr('disabled',true);
                    $('#alta_deduc_denominacion').val($('#percep_grilla2').getCell(id, 'd_denominacion_ag')).attr('disabled',true);
                    $('#alta_deduc_anio').val($('#percep_grilla2').getCell(id, 'n_anio'));
                    $('#alta_deduc_mes').val($('#percep_grilla2').getCell(id, 'n_mes'));
                    $('#alta_deduc_fecha').val($('#percep_grilla2').getCell(id, 'f_fecha'));
                    $('#alta_deduc_impor').val($('#percep_grilla2').getCell(id, 'n_importe'));
                    $('#alta_deduc_ncomp').val($('#percep_grilla2').getCell(id, 'n_comprobante'));
                    $('#alta_deduc_tcomp').val($('#percep_grilla2').getCell(id, 'c_tipo_comprobante'));
                    $('#alta_deduc_letra').val($('#percep_grilla2').getCell(id, 'c_letra'));
                    $('#alta_deduc_sucursal').val($('#percep_grilla2').getCell(id, 'c_sucursal'));
                    $('#modal_alta_deduc').modal("show");
                }else {
                    mostrar_error('Debe seleccionar una Deducción de la grilla.');
                    return false;
                }
            }
        }).navButtonAdd('#percep_grilla2_pager',{
            id:'btn_add_deduc_percep',
            caption:"",
            position:"first",
            buttonicon: "glyphicon glyphicon-plus",
            title:"Agregar Percepción Verificada",
            cursor:"pointer",
            onClickButton:function() {
                $('#modal_alta_deduc_form div').each(function () {
                    if ($(this).hasClass('alta_per') || $(this).hasClass('alta_general')){
                        $(this).show();
                    }else {
                        $(this).hide();
                    }
                });
                $('#alta_deduc_titulo').text('Agregar Percepción Verificada');
                $('#alta_deduc_oper').val('A');
                $('#modal_alta_deduc').modal("show");
            }
        }).bind("jqGridInlineAfterRestoreRow",
            function(){
                lastSel = undefined;
                return;
            });

        $('#percep_aduana_grilla2').navButtonAdd('#percep_aduana_grilla2_pager',{
            id: 'btn_del_deduc_adu_t',
            caption: "<b>Eliminar Todo</b>",
            position: "last",
            buttonicon: "",
            title: "Eliminar todas las Percepciones de Aduana Verificadas",
            cursor: "pointer",
            onClickButton: function () {
                mostrar_cuadro('C', 'Eliminar Deducciónes',
                    '¿Esta seguro/a que desea eliminar todas la Deducciónes de la grilla?',
                    function () {
                        _agregar_quitar_deduccion(null,'BT');
                    }, function () {
                        return;
                    }
                );
            }
        }).navButtonAdd('#percep_aduana_grilla2_pager',{
            id: 'btn_del_deduc_adu',
            caption: "",
            position: "first",
            buttonicon: "glyphicon glyphicon-trash",
            title: "Eliminar Percepción de Aduana Verificada",
            cursor: "pointer",
            onClickButton: function () {
                var id = $("#percep_aduana_grilla2").getGridParam('selrow');
                if (id) {
                    mostrar_cuadro('C', 'Eliminar Deducción',
                        '¿Esta seguro/a que desea eliminar la Deducción seleccionada?',
                        function () {
                            let v_n_deduc = $('#percep_aduana_grilla2').getCell(id, 'n_deduccion');
                            _agregar_quitar_deduccion(v_n_deduc,'B');
                        }, function () {
                            return;
                        }
                    );
                }else {
                    mostrar_error('Debe seleccionar una Deducción de la grilla.');
                    return false;
                }
            }
        }).navButtonAdd('#percep_aduana_grilla2_pager',{
            id:'btn_edi_deduc_adu',
            caption:"",
            position:"first",
            buttonicon: "glyphicon glyphicon-edit",
            title:"Editar Percepción de Aduana Verificada",
            cursor:"pointer",
            onClickButton:function() {
                var id = $("#percep_aduana_grilla2").getGridParam('selrow');
                if (id) {
                    $('#modal_alta_deduc_form div').each(function () {
                        if ($(this).hasClass('alta_adu') || $(this).hasClass('alta_general')){
                            $(this).show();
                        }else {
                            $(this).hide();
                        }
                    });
                    $('#alta_deduc_titulo').text('Editar Percepción de Aduana Verificada');
                    $('#alta_deduc_oper').val('M');
                    $('#alta_deduc_ndeduc').val($('#percep_aduana_grilla2').getCell(id, 'n_deduccion'));
                    $('#alta_deduc_id_contrib').val($('#percep_aduana_grilla2').getCell(id, 'id_contrib_ag'));
                    $('#alta_deduc_cuit').val($('#percep_aduana_grilla2').getCell(id, 'n_cuit_ag')).attr('disabled',true);
                    $('#alta_deduc_denominacion').val($('#percep_aduana_grilla2').getCell(id, 'd_denominacion_ag')).attr('disabled',true);
                    $('#alta_deduc_anio').val($('#percep_aduana_grilla2').getCell(id, 'n_anio'));
                    $('#alta_deduc_mes').val($('#percep_aduana_grilla2').getCell(id, 'n_mes'));
                    $('#alta_deduc_fecha').val($('#percep_aduana_grilla2').getCell(id, 'f_fecha'));
                    $('#alta_deduc_impor').val($('#percep_aduana_grilla2').getCell(id, 'n_importe'));
                    $('#alta_deduc_ncomp').val($('#percep_aduana_grilla2').getCell(id, 'n_comprobante'));
                    $('#modal_alta_deduc').modal("show");
                }else {
                    mostrar_error('Debe seleccionar una Deducción de la grilla.');
                    return false;
                }
            }
        }).navButtonAdd('#percep_aduana_grilla2_pager',{
            id:'btn_add_deduc_adu',
            caption:"",
            position:"first",
            buttonicon: "glyphicon glyphicon-plus",
            title:"Agregar Percepción de Aduana Verificada",
            cursor:"pointer",
            onClickButton:function() {
                $('#modal_alta_deduc_form div').each(function () {
                    if ($(this).hasClass('alta_adu') || $(this).hasClass('alta_general')){
                        $(this).show();
                    }else {
                        $(this).hide();
                    }
                });
                $('#alta_deduc_titulo').text('Agregar Percepción de Aduana Verificada');
                $('#alta_deduc_oper').val('A');
                $('#modal_alta_deduc').modal("show");
            }
        }).bind("jqGridInlineAfterRestoreRow",
            function(){
                lastSel = undefined;
                return;
            });
    }
}