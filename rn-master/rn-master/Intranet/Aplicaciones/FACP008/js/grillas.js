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
                //definir_caducidad($('#resumen_grid').getGridParam('selrow'));
            } else{
                if(v_no_carga_inicial_pp){
                    $.ajax({
                        type:'POST',
                        url: FUNCIONES_BASEPATH+'maestro_abm.php',
                        data:{      
                         "p_n_plan_pago": $('#n_plan_pago').val(),
                         "id_menu":v_id_menu,
                         "n_orden":6
                        },
                        dataType:'json',
                        success: function( data ) {
                            if(data.resultado == 'OK'){
                                let mensaje = 'El Plan de Pago ingresado esta Caducado.';
                                if(data.p_d_caducidad){
                                    mensaje += '<br> Motivo de Caducidad: ' + data.p_d_caducidad;
                                }
                                mostrar_cuadro('E', 'Error', mensaje);
                            }
                            else{
                                mostrar_cuadro('E', 'Error', "El plan no esta en condiciones de caducidad");
                            }
                        }
                    }); 
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
            $('#d_denominacion').val($('#resumen_grid').getCell(id, 'd_denominacion'));
            $('#n_cuit').val($('#resumen_grid').getCell(id, 'n_cuit'));
            $('#c_tipo_doc').val($('#resumen_grid').getCell(id, 'c_tipo_documento'));
            $('#n_documento').val($('#resumen_grid').getCell(id, 'n_documento'));
            $('#c_tipo_imp').blur();
            $('#c_tipo_doc').blur();
            $("#n_cuit").mask("99-99999999-9");
            definir_caducidad(id);
            
        }
    }).navGrid('#resumen_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    ).navButtonAdd('#resumen_grid_pager',
    {
        id:'btn_editar_resumen',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-edit",
        title:"Editar",
        cursor:"pointer",
        onClickButton:function(){
            let row_id = $('#resumen_grid').getGridParam('selrow')
            if(row_id){
                if($('#resumen_grid').getCell(row_id, 'c_caducidad')){
                    $('#c_caducidad').val($('#resumen_grid').getCell(row_id, 'c_caducidad'));
                    $('#d_caducidad').val($('#resumen_grid').getCell(row_id, 'd_caducidad'));
                    $('#c_caducidad').prop('disabled', true);
                    $('#mascara_lupa_caducidad').show();
                    $('#lupa_caducidad').hide();
                    if(!$('#resumen_grid').getCell(row_id, 'f_caducidad')){
                        $('#f_caducidad').val(f_hoy);
                        $('#f_caducidad').attr('readonly',true);
                        $('#f_caducidad').attr('disabled',true);
                    }
                    else{
                        $('#f_caducidad').val("");
                        $('#f_caducidad').attr('readonly',false);
                    }
                }
                $('#modificacion_modal').modal('show');
                $(window).resize();
            } else{
                mostrar_cuadro('I', 'Atención', 'Debe seleccionar una fila para realizar la modificación');
                return;
            }
        }
    });

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
            post_to_url('detalle_cuenta_corr.php', {
                // 'id_contribuyente': $('#id_contribuyente').val(),
                // 'd_objeto_hecho': $('#d_objeto_hecho_2').val(),
                // 'c_tributo': $('#c_tributo').val(),
                // 'c_tipo_imponible': $('#c_tipo_imp').val(),
                'n_cuit': $('#n_cuit').val(),
                'id_obligacion': $('#detalle_grid').getCell(rowid, 'id_obligacion'),
                'n_pos_fiscal': $('#detalle_grid').getCell(rowid, 'anio'),
                'n_cuota': $('#detalle_grid').getCell(rowid, 'cuota'), 
                'p_n_id_menu': 10854
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
                if(!v_total_cuotas){
                    v_total_cuotas = $('#cuotas_grid').getCell(1, 'i_total_saldo');
                }
                if(v_total_cuotas){
                    $('#i_total_saldo').val(v_total_cuotas);
                } else{
                    $('#i_total_saldo').val('0,00');
                }

                let i_total_saldo = parseFloat($('#cuotas_grid').getCell(1, 'i_total_con_signo'));
                
                if(i_total_saldo > 0){
                    $('#membrete_pie').text('A FAVOR DEL CONTRIBUYENTE');
                    $('#membrete_pie').css('color', 'red');
                }
                else if(i_total_saldo < 0){
                    $('#membrete_pie').text('A FAVOR DE DGR');
                    $('#membrete_pie').css('color', 'green');
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
            // post_to_url('consulta_cuenta_corr.php', {
            //     'id_contribuyente': $('#id_contribuyente').val(),
            //     'd_objeto_hecho': $('#d_objeto_hecho_2').val(),
            //     'c_tributo': $('#c_tributo').val(),
            //     'c_tipo_imponible': $('#c_tipo_imp').val(), 
            //     'p_n_id_menu': 10852
            // }, 
            // '_blank'
            // );

            post_to_url('detalle_cuenta_corr.php', {
                'n_cuit': $('#n_cuit').val(),
                'id_obligacion': $('#cuotas_grid').getCell(rowid, 'id_obligacion'),
                'n_pos_fiscal': $('#cuotas_grid').getCell(rowid, 'anio'),
                'n_cuota': $('#cuotas_grid').getCell(rowid, 'cuota'), 
                'p_n_id_menu': 10854
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
                $('#honorarios_modal').modal('show');
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