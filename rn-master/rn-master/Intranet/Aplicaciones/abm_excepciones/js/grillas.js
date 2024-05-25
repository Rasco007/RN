function inicializarGrillas(){
    $("#lupa_c_tipo_documento").lupa_generica({
        id_lista:v_lista_tdoc,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_codigo',width:100},
        {index:'d_descrip',width:250}],
        caption:'Tipo de Documento',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:[],
        searchInput: '#c_tipo_documento',
        searchCode: true,
        limpiarCod: true,
        campos:{c_codigo:'c_tipo_documento',d_descrip:'d_tipo_documento'},
        keyNav:true,
        onClose: function(){
            $('#n_documento').val(null);
        }
    });

    $("#lupa_c_tipo_imponible").lupa_generica({
        id_lista:v_lista_timp,
        titulos:['Cód. Tipo Imponible','Tipo Imponible'],
        grid:[{index:'c_codigo',width:150},
            {index:'d_descrip',width:400}],
        caption:'Lista de Tipos Imponibles',
        /* sortname:'d_descrip',
        sortorder:'asc', */
        filtros:['H','#id_contribuyente'],
        filtroNull:true,
        campos:{c_codigo:'c_tipo_imponible',d_descrip:'d_tipo_imponible'},
        keyNav:true,
        searchInput: '#c_tipo_imponible',
        searchCode: true,
        onClose: function(){
            $('#c_tributo').val(null).blur();
            if ($('#c_tipo_imponible').val()){
                $('#c_tributo').addClass('validate[required]');
            }else {
                $('#c_tributo').removeClass('validate[required]');
            }
        }
    });

    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_trib,
        titulos:['Cód. Tributo','Tributo'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:250}],
        caption:'Lista de Tributos',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:['#c_tipo_imponible'],
        filtrosNulos:[false],
        filtrosTitulos:['Tipo Imponible'],
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
        limpiarCod: true,
        onClose: function(){
            $('#d_objeto_hecho').val(null);
            if ($('#c_tributo').val()){
                $('#d_objeto_hecho').attr('disabled',false);
                $('#d_objeto_hecho').addClass('validate[required]');
            } else {
                $('#d_objeto_hecho').attr('disabled',true).removeClass('validate[required]');
/*                 $('#lupa_d_objeto_hecho').hide(); */
            }
        }
    });

    $("#lupa_d_objeto_hecho").lupa_generica({
        id_lista:v_lista_obj,
        titulos:['Descripción Objeto-Hecho'],
        grid:[{index:'d_objeto_hecho',width:250}],
        caption:'Lista de Objetos - Hechos',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        filtros:['#c_tipo_imponible','#c_tributo','#d_objeto_hecho','#id_contribuyente'],
        filtrosNulos:[true,false,true,false],
        filtrosTitulos:['Tipo Imponible','Tributo'],
        campos:{d_objeto_hecho:'d_objeto_hecho'},
        keyNav:true/* ,
        onClose: function(){
            if (!$('#id_contribuyente').val() && $('#d_objeto_hecho').val()){
                fun_ajax_objeto_hecho();
            }
        } */
    });

    $("#main_grid").jqGrid({
        colNames:datos_main_grid.colNames(),
        colModel:datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption:"Tipo Imponible y Objetos:" ,
        postData:datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        height:120,
        sortorder:'desc',
        loadComplete:function(data){
            if($('#main_grid').getGridParam('postData').m_autoquery == 'S'){
                if($(this).jqGrid('getGridParam','records') == 0){
                    mostrar_cuadro('I', 'Atención', 'No se han encontrado registros para la consulta realizada.');
                }
            }
            id_contrib = null;
            objeto_hecho = null;
            c_tipo_imponible = null;
            c_tributo = null;
            f_vig_desde_obj = null;
            $('#actividades_grid,#regimenes_grid,#excepciones_grid').jqGrid('clearGridData');
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
            id_contrib = $('#main_grid').getCell(id, 'id_contribuyente');
            objeto_hecho = $('#main_grid').getCell(id, 'd_objeto_hecho');
            c_tipo_imponible = $('#main_grid').getCell(id, 'c_tipo_imponible');
            c_tributo = $('#main_grid').getCell(id, 'c_tributo');
            f_vig_desde_obj = $('#main_grid').getCell(id, 'f_vig_desde');

            $("#c_tipo_imponible").val(c_tipo_imponible);
            $("#d_tipo_imponible").val($('#main_grid').getCell(id, 'd_tipo_imp'));
            $("#c_tributo").val(c_tributo);
            $("#d_tributo").val($('#main_grid').getCell(id, 'd_tributo'));
            $("#d_objeto_hecho").val(objeto_hecho);

            setea_parametros('#actividades_grid',{':p_id_contrib':id_contrib,
                ':p_c_timp':c_tipo_imponible,
                ':p_c_trib':c_tributo,
                ':p_objeto':objeto_hecho});
                setea_parametros('#regimenes_grid',{':p_id_contrib':id_contrib,
                ':p_c_timp':c_tipo_imponible,
                ':p_objeto':objeto_hecho});
                setea_parametros('#excepciones_grid',{':p_id_contrib':id_contrib,
                ':p_c_timp':c_tipo_imponible,
                ':p_c_trib':c_tributo,
                ':p_objeto':objeto_hecho});
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    );

    $("#actividades_grid").jqGrid({
        colNames:datos_actividades_grid.colNames(),
        colModel:datos_actividades_grid.colModel(),
        pager: $('#actividades_grid_pager'),
        caption:"Actividades:" ,
        postData:datos_actividades_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        //sortname:'f_inicio_act',
        autowidth: false,
        height:120,
        //sortorder:'desc',
        loadComplete:function(data){
            gridParentWidth = $('#gbox_actividades_grid').parent().width();
            $('#actividades_grid').setGridWidth(gridParentWidth);
        }
    })
    .jqGrid('sortGrid', 'f_inicio_act', true, 'desc')
    .jqGrid('sortGrid', 'f_fin_act', true, 'desc')
    .navGrid('#actividades_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    );

    $("#regimenes_grid").jqGrid({
        colNames:datos_regimenes_grid.colNames(),
        colModel:datos_regimenes_grid.colModel(),
        pager: $('#regimenes_grid_pager'),
        caption:"Regímenes:" ,
        postData:datos_regimenes_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'f_vig_hasta',
        autowidth: false,
        height:120,
        sortorder:'desc',
        loadComplete:function(data){
            gridParentWidth = $('#gbox_regimenes_grid').parent().width();
            $('#regimenes_grid').setGridWidth(gridParentWidth);
        }
    }).navGrid('#regimenes_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    );

    $("#excepciones_grid").jqGrid({
        colNames:datos_excepciones_grid.colNames(),
        colModel:datos_excepciones_grid.colModel(),
        autowidth:false,
        height:120,
        pager: $('#excepciones_grid_pager'),
        caption:"Excepciones:" ,
        postData:datos_excepciones_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        sortname:'f_vig_desde',
        sortorder:'',
        loadComplete:function(data){
            gridParentWidth = $('#gbox_excepciones_grid').parent().width();
            $('#excepciones_grid').setGridWidth(gridParentWidth);
        },
        onSelectRow: function(id) {
            if (parse($(this).getCell(id,'p_exencion_impuesto')) == 0 && $.inArray(parse($(this).getCell(id,'c_motivo')),[53,86,87,88,93]) !== -1){
                $('#btn_exc_act').show();
            }else {
                $('#btn_exc_act').hide();
            }
        }
    }).navGrid('#excepciones_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit options
        {}, // add options
        {}, // del options
    ).navButtonAdd('#excepciones_grid_pager',
    {
        id:'btn_exc_act',
        caption:"Actividad",
        position:"last",
        buttonicon: "",
        title:"% por Actividad",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#excepciones_grid").getGridParam('selrow');
            if (id) {
                    setea_parametros('#excep_act_grid',{':p_id_excepcion':$('#excepciones_grid').getCell(id, 'id_excepcion')});
                    $('#excep_act_id_excep').val($('#excepciones_grid').getCell(id, 'id_excepcion'));
                    $('#excep_act_c_mot').val($('#excepciones_grid').getCell(id, 'c_motivo'));
                    $('#excep_act_f_desde').val($('#excepciones_grid').getCell(id, 'f_vig_desde'));
                    $('#excep_act_f_hasta').val($('#excepciones_grid').getCell(id, 'f_vig_hasta'));
                    if (parse($('#excepciones_grid').getCell(id, 'c_motivo')) == 87) {
                        $('#btn_add_excep_act').hide()
                    }else{
                        $('#btn_add_excep_act').show()
                    }
                    $('#exc_act_modal').modal('show');
            }else {
                mostrar_validacion('Debe seleccionar una Excepción de la grilla.');
                return false;
            }
        }
    });

    $("#excep_act_grid").jqGrid({
        colNames:datos_excep_act_grid.colNames(),
        colModel:datos_excep_act_grid.colModel(),
        pager: $('#excep_act_grid_pager'),
        caption:"Regímenes:" ,
        postData:datos_excep_act_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        height:200,
        loadComplete:function(data){
            gridParentWidth = $('#gbox_excep_act_grid').parent().width();
            $('#excep_act_grid').setGridWidth(gridParentWidth);
        }
    }).navGrid('#excep_act_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    );
    $("#gview_excep_act_grid > .ui-jqgrid-titlebar").hide();

    if (modo == 'X'){
        $('#excepciones_grid').navButtonAdd('#excepciones_grid_pager',
            {
                id:'btn_del_excep',
                caption:"",
                position:"first",
                buttonicon: "glyphicon glyphicon-trash",
                title:"Eliminar",
                cursor:"pointer",
                onClickButton:function() {
                    var id = $("#excepciones_grid").getGridParam('selrow');
                    if (id) {
                        mostrar_cuadro('C','Eliminar Excepción','Esto eliminará la Excepción seleccionada y las Actividades relacionadas que posea.<br>¿Desea continuar?',
                            function () {
                                var params = {
                                    p_id_excepcion:$('#excepciones_grid').getCell(id, 'id_excepcion'),
                                    p_c_tipo_excep:$('#excepciones_grid').getCell(id, 'c_tipo_excep'),
                                    p_c_motivo:$('#excepciones_grid').getCell(id, 'c_motivo'),
                                    p_p_exencion_impuesto:$('#excepciones_grid').getCell(id, 'p_exencion_impuesto'),
                                    p_f_vig_desde:$('#excepciones_grid').getCell(id, 'f_vig_desde'),
                                    p_f_vig_hasta:$('#excepciones_grid').getCell(id, 'f_vig_hasta'),
                                    p_oper:'D'
                                };
                                abm_excepcion(params);
                            });
                    }else {
                        mostrar_validacion('Debe seleccionar una Excepción de la grilla.');
                        return false;
                    }
                }
            }).navButtonAdd('#excepciones_grid_pager',
            {
                id:'btn_mod_excep',
                caption:"",
                position:"first",
                buttonicon: "glyphicon glyphicon-edit",
                title:"Modificar",
                cursor:"pointer",
                onClickButton:function() {
                    var id = $("#excepciones_grid").getGridParam('selrow');
                    if (id) {
                        if (parse($('#excepciones_grid').getCell(id, 'cant_actividades')) == 0){
                            $('#excep_title').text("Modificar Excepción");
                            $('#excep_oper').val('M');
                            $('#excep_id_excep').val($('#excepciones_grid').getCell(id, 'id_excepcion'));
                            $('#excep_c_tipo').val($('#excepciones_grid').getCell(id, 'c_tipo_excep'));
                            $('#excep_d_tipo').val($('#excepciones_grid').getCell(id, 'd_excepcion'));
                            $('#excep_f_desde').val($('#excepciones_grid').getCell(id, 'f_vig_desde'));
                            $('#excep_f_hasta').val($('#excepciones_grid').getCell(id, 'f_vig_hasta'));
                            $('#excep_c_mot').val($('#excepciones_grid').getCell(id, 'c_motivo'));
                            $('#excep_d_mot').val($('#excepciones_grid').getCell(id, 'd_motivo'));
                            $('#excep_resolucion').val($('#excepciones_grid').getCell(id, 'd_resolucion'));
                            $('#excep_porc').val($('#excepciones_grid').getCell(id, 'p_exencion_impuesto'));
                            $('#excep_modal').modal("show");
                        } else {
                            mostrar_validacion('Tiene Actividades cargadas, debe eliminarlas para modificar la Excepción.');
                        }
                    }else {
                        mostrar_validacion('Debe seleccionar una Excepción de la grilla.');
                        return false;
                    }
                }
            }).navButtonAdd('#excepciones_grid_pager',
            {
                id:'btn_add_excep',
                caption:"",
                position:"first",
                buttonicon: "glyphicon glyphicon-plus",
                title:"Agregar",
                cursor:"pointer",
                onClickButton:function() {
                    var id = $("#main_grid").getGridParam('selrow');
                    if (id) {
                        $('#excep_title').text("Agregar Excepción");
                        $('#excep_oper').val('A');
                        $('#excep_modal').modal("show");
                    }else {
                        mostrar_validacion('Debe seleccionar un Objeto de la primer grilla.');
                        return false;
                    }
                }
            });

            //GRILLA DE ACTIVIDADES POR EXCEPCION
            $('#excep_act_grid').navButtonAdd('#excep_act_grid_pager',
            {
                id:'btn_del_excep_act',
                caption:"",
                position:"first",
                buttonicon: "glyphicon glyphicon-trash",
                title:"Eliminar",
                cursor:"pointer",
                onClickButton:function() {
                    var id = $("#excep_act_grid").getGridParam('selrow');
                    if (id) {
                        mostrar_cuadro('C','Eliminar Actividad','Esto eliminará la Actividad seleccionada.<br>¿Desea continuar?',
                            function () {
                                var params = {
                                    p_id_excepcion:$('#excep_act_grid').getCell(id, 'id_excepcion'),
                                    p_id_nomenclador:$('#excep_act_grid').getCell(id, 'id_nomenclador'),
                                    p_c_actividad:$('#excep_act_grid').getCell(id, 'c_actividad'),
                                    p_exencion_impuesto_act:$('#excep_act_grid').getCell(id, 'p_exencion_impuesto'),
                                    p_exencion_minimo_act:$('#excep_act_grid').getCell(id, 'p_exencion_minimo'),
                                    p_p_alicuota:$('#excep_act_grid').getCell(id, 'p_alicuota'),
                                    p_l_minimo:$('#excep_act_grid').getCell(id, 'l_minimo'),
                                    p_oper:'D'
                                };
                                abm_actividad(params);
                            });
                    }else {
                        mostrar_validacion('Debe seleccionar una Actividad de la grilla.');
                        return false;
                    }
                }
            }).navButtonAdd('#excep_act_grid_pager',
            {
                id:'btn_mod_excep_act',
                caption:"",
                position:"first",
                buttonicon: "glyphicon glyphicon-edit",
                title:"Modificar",
                cursor:"pointer",
                onClickButton:function() {
                    var id = $("#excep_act_grid").getGridParam('selrow');
                    if (id) {
                        $('#act_title').text("Modificar Actividad");
                        $('#act_oper').val('M');
                        $('#act_c_act').val($('#excep_act_grid').getCell(id, 'c_actividad'));
                        $('#act_d_act').val($('#excep_act_grid').getCell(id, 'd_actividad'));
                        $('#act_nomen').val($('#excep_act_grid').getCell(id, 'id_nomenclador'));
                        $('#act_ali').selectpicker('val',$('#excep_act_grid').getCell(id, 'p_alicuota'));
                        $('#act_imin').selectpicker('val',$('#excep_act_grid').getCell(id, 'l_minimo'));
                        $('#act_imp').val($('#excep_act_grid').getCell(id, 'p_exencion_impuesto'));
                        $('#act_min').val($('#excep_act_grid').getCell(id, 'p_exencion_minimo'));
                        $('#act_modal').modal("show");
                    }else {
                        mostrar_validacion('Debe seleccionar una Actividad de la grilla.');
                        return false;
                    }
                }
            }).navButtonAdd('#excep_act_grid_pager',
            {
                id:'btn_add_excep_act',
                caption:"",
                position:"first",
                buttonicon: "glyphicon glyphicon-plus",
                title:"Agregar",
                cursor:"pointer",
                onClickButton:function() {
                    var id = $("#excepciones_grid").getGridParam('selrow');
                    if (id || $('#excep_act_id_excep').val()) {
                        $('#act_title').text("Agregar Actividad");
                        $('#act_oper').val('A');
                        $('#act_modal').modal("show");
                    }else {
                        mostrar_validacion('Debe seleccionar una Excepción de la grilla de Excepciones.');
                        return false;
                    }
                }
            });
    }
}