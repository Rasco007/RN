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
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:['#id_contribuyente'],
        filtroNull:true,
        campos:{c_codigo:'c_tipo_imponible',d_descrip:'d_tipo_imponible'},
        keyNav:true,
        searchInput: '#c_tipo_imponible',
        searchCode: true,
        onClose: function(){
            $('#c_tributo').val(null);
            $('#d_tributo').val(null);
            $('#d_objeto_hecho').val(null);
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
        onClose: function(){
            $('#d_objeto_hecho').val(null);
            if ($('#c_tributo').val()){
                $('#d_objeto_hecho').attr('readonly',false);
            }else {
                $('#d_objeto_hecho').attr('readonly',true);
            }
        }
    });

    $("#lupa_d_objeto_hecho").lupa_generica({
        id_lista:v_lista_obj,
        titulos:['Descripción Objeto-Hecho','cuit','denominacion','id_contribuyente'],
        grid:[{index:'d_objeto_hecho',width:250},
            {index:'n_cuit',hidden:true},
            {index:'denominacion',hidden:true},
            {index:'contrib',hidden:true}],
        caption:'Lista de Objetos - Hechos',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        filtros:['#c_tipo_imponible','#c_tributo','#id_contribuyente'],
        filtrosNulos:[false,false,true],
        filtrosTitulos:['Tipo Imponible','Tributo'],
        campos:{d_objeto_hecho:'d_objeto_hecho',n_cuit:'n_cuit',denominacion:'d_denominacion',contrib:'id_contribuyente'},
        keyNav:true,
        onClose: function(){
            if ($('#d_objeto_hecho').val()){
                fun_ajax_objeto_hecho();
            }
        }
    });

    $("#main_grid").jqGrid({
        colNames:datos_main_grid.colNames(),
        colModel:datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption:"Tipo Imponible y Objetos:" ,
        postData:datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'d_tipo_imp,d_tributo,d_objeto_hecho',
        autowidth: false,
        height:160,
        //width: 1280,
        sortorder:'asc',
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
            $('#seccion_ibd, #seccion_cm').hide();
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
            id_contrib = $('#main_grid').getCell(id, 'id_contribuyente');
            objeto_hecho = $('#main_grid').getCell(id, 'd_objeto_hecho');
            c_tipo_imponible = $('#main_grid').getCell(id, 'c_tipo_imponible');
            c_tributo = $('#main_grid').getCell(id, 'c_tributo');
            f_vig_desde_obj = $('#main_grid').getCell(id, 'f_vig_desde');

            if (c_tributo == 10){
                $('#seccion_ibd').show();
                $('#seccion_cm').hide();
                setea_parametros('#actividades_ibd_grid',{':p_id_contrib':id_contrib,
                    ':p_c_timp':c_tipo_imponible,
                    ':p_c_trib':c_tributo,
                    ':p_objeto':objeto_hecho});
                setea_parametros('#comercios_grid',{':p_id_contrib':id_contrib,
                    ':p_c_timp':c_tipo_imponible,
                    ':p_c_trib':c_tributo,
                    ':p_objeto':objeto_hecho});
                setea_parametros('#unidades_grid',{':p_id_contrib':id_contrib,
                    ':p_c_timp':c_tipo_imponible,
                    ':p_c_trib':c_tributo,
                    ':p_objeto':objeto_hecho});
                $('#btn_volver').click();
            }else if (c_tributo == 20){
                $('#seccion_cm').show();
                $('#seccion_ibd').hide();
                setea_parametros('#actividades_cm_grid',{':p_id_contrib':id_contrib,
                    ':p_c_timp':c_tipo_imponible,
                    ':p_c_trib':c_tributo,
                    ':p_objeto':objeto_hecho});
                setea_parametros('#jurisdicciones_grid',{':p_id_contrib':id_contrib,
                    ':p_c_timp':c_tipo_imponible,
                    ':p_c_trib':c_tributo,
                    ':p_objeto':objeto_hecho});
            }
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    ).navButtonAdd('#main_grid_pager',{
        id:'btn_imp_const',
        caption:"Imprimir Constancia",
        position:"last",
        buttonicon: "",
        title:"Imprimir Constancia",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#main_grid").getGridParam('selrow');
            if (id) {
                llamar_report('CONTL_005','p_id_contribuyente|'+id_contrib,'PDF');
            }else {
                mostrar_validacion('Debe seleccionar un Objeto de la grilla.');
                return false;
            }
        }
    });

    //IBD
    $("#actividades_ibd_grid").jqGrid({
        colNames:datos_actibd_grid.colNames(),
        colModel:datos_actibd_grid.colModel(),
        pager: $('#actividades_ibd_grid_pager'),
        caption:"Actividades:" ,
        postData:datos_actibd_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'f_fin_act',
        autowidth: false,
        height:160,
        sortorder:'desc, id_nomenclador asc, c_actividad asc',
        loadComplete:function(data){
            gridParentWidth = $('#gbox_actividades_ibd_grid').parent().width();
            $('#actividades_ibd_grid').setGridWidth(gridParentWidth);
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
            if ($('#actividades_ibd_grid').getCell(id, 'id_nomenclador') == 'NAES'){
                if (!$('#actividades_ibd_grid').getCell(id, 'f_fin_act') &&
                    $('#actividades_ibd_grid').getCell(id, 'm_act_ppal') == 'No'){
                    $('#btn_ppal_actibd').show();
                }else {
                    $('#btn_ppal_actibd').hide();
                }
            }else {
                if ($('#actividades_ibd_grid').getCell(id, 'm_act_ppal') == 'No'){
                    $('#btn_ppal_actibd').show();
                }else {
                    $('#btn_ppal_actibd').hide();
                }
            }
        }
    }).navGrid('#actividades_ibd_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    ).navButtonAdd('#actividades_ibd_grid_pager',{
        id:'btn_ppal_actibd',
        caption:"Principal",
        position:"last",
        buttonicon: "",
        title:"Modificar principal",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#actividades_ibd_grid").getGridParam('selrow');
            if (id) {
                mostrar_cuadro('C','Modificar Principal','Esto modificará la Actividad Principal<br>¿Desea Continuar?',
                    function () {
                        var params = {
                            p_c_actividad:$('#actividades_ibd_grid').getCell(id, 'c_actividad'),
                            p_id_nomenclador:$('#actividades_ibd_grid').getCell(id, 'id_nomenclador'),
                            p_c_articulo:$('#actividades_ibd_grid').getCell(id, 'c_articulo'),
                            p_f_inicio_act:$('#actividades_ibd_grid').getCell(id, 'f_inicio_act')
                        };
                        fun_cambiar_act_ppal(params);
                    });
            }else {
                mostrar_validacion('Debe seleccionar una Actividad de la grilla.');
                return false;
            }
        }
    }).navButtonAdd('#actividades_ibd_grid_pager',{
        id:'btn_del_actibd',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-trash",
        title:"Eliminar",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#actividades_ibd_grid").getGridParam('selrow');
            if (id) {
                mostrar_cuadro('C','Eliminar Actividad','Esto eliminará la Actividad y todas las unidades relacionadas a la misma<br>¿Desea continuar?',
                    function () {
                        var params = {
                            p_oper : 'D',
                            p_c_actividad:$('#actividades_ibd_grid').getCell(id, 'c_actividad'),
                            p_id_nomenclador:$('#actividades_ibd_grid').getCell(id, 'id_nomenclador'),
                            p_f_inicio_act:$('#actividades_ibd_grid').getCell(id, 'f_inicio_act'),
                            p_f_cese_act:$('#actividades_ibd_grid').getCell(id, 'f_fin_act'),
                        };
                        fun_abm_actibd(params);
                    });
            }else {
                mostrar_validacion('Debe seleccionar una Actividad de la grilla.');
                return false;
            }
        }
    }).navButtonAdd('#actividades_ibd_grid_pager',{
        id:'btn_edi_actibd',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-edit",
        title:"Editar",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#actividades_ibd_grid").getGridParam('selrow');
            if (id) {
                $('#actibd_title').text("Editar Actividad");
                $('#actibd_oper').val('M');
                $('#actibd_c_actividad').val($('#actividades_ibd_grid').getCell(id, 'c_actividad'));
                $('#actibd_d_actividad').val($('#actividades_ibd_grid').getCell(id, 'd_actividad'));
                $('#actibd_nomenclador').selectpicker('val',$('#actividades_ibd_grid').getCell(id, 'id_nomenclador'));
                $('#actibd_f_inicio').val($('#actividades_ibd_grid').getCell(id, 'f_inicio_act'));
                $('#actibd_f_cese').val($('#actividades_ibd_grid').getCell(id, 'f_fin_act'));
                $('html').scrollTop(200);
                $('#actibd_modal').modal("show");
            }else {
                mostrar_validacion('Debe seleccionar una Actividad de la grilla.');
                return false;
            }
        }
    }).navButtonAdd('#actividades_ibd_grid_pager',{
        id:'btn_add_actibd',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-plus",
        title:"Agregar",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#main_grid").getGridParam('selrow');
            if (id) {
                if ($.datepicker.parseDate('dd/mm/yy', f_vig_desde_obj) > $.datepicker.parseDate('dd/mm/yy', vig_naes)){
                    $('#actibd_nomenclador').attr('disabled',true);
                }else {
                    $('#actibd_nomenclador').attr('disabled',false);
                }
                $('#actibd_title').text("Agregar Actividad");
                $('#actibd_oper').val('A');
                $('html').scrollTop(200);
                $('#actibd_modal').modal("show");
            }else {
                mostrar_validacion('Debe seleccionar un Objeto de la primer grilla.');
                return false;
            }
        }
    });

    $("#comercios_grid").jqGrid({
        colNames:datos_com_grid.colNames(),
        colModel:datos_com_grid.colModel(),
        pager: $('#comercios_grid_pager'),
        caption:"Comercios:" ,
        postData:datos_com_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'n_comercio',
        autowidth: false,
        height:160,
        sortorder:'asc',
        loadComplete:function(data){
            gridParentWidth = $('#gbox_comercios_grid').parent().width();
            $('#comercios_grid').setGridWidth(gridParentWidth);
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
            if (!$('#comercios_grid').getCell(id, 'f_vig_hasta') && $('#comercios_grid').getCell(id, 'm_comercio_ppal') == 'No'){
                $('#btn_ppal_com').show();
            }else {
                $('#btn_ppal_com').hide();
            }
        }
    }).navGrid('#comercios_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    ).navButtonAdd('#comercios_grid_pager',{
        id:'btn_ppal_com',
        caption:"Principal",
        position:"last",
        buttonicon: "",
        title:"Modificar principal",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#comercios_grid").getGridParam('selrow');
            if (id) {
                mostrar_cuadro('C','Modificar Principal','Esto modificará el Comercio Principal<br>¿Desea Continuar?',
                    function () {
                        var params = {
                            p_n_comercio: $('#comercios_grid').getCell(id, 'n_comercio')
                        };
                        fun_cambiar_com_ppal(params);
                    });
            }else {
                mostrar_validacion('Debe seleccionar un Comercio de la grilla.');
                return false;
            }
        }
    }).navButtonAdd('#comercios_grid_pager',{
        id:'btn_edi_com',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-edit",
        title:"Editar",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#comercios_grid").getGridParam('selrow');
            if (id) {
                $('#com_title').text("Editar Comercio");
                $('#com_oper').val('M');
                $('#com_n_comercio').val($('#comercios_grid').getCell(id, 'n_comercio')).attr('disabled',true);
                $('#com_f_inicio').val($('#comercios_grid').getCell(id, 'f_iniciacion'));
                $('#com_f_cese').val($('#comercios_grid').getCell(id, 'f_vig_hasta'));
                $('#com_ppal').val($('#comercios_grid').getCell(id, 'm_comercio_ppal'));
                $('#com_d_fantasia').val($('#comercios_grid').getCell(id, 'd_fantasia'));
                $('#com_n_telefono').val($('#comercios_grid').getCell(id, 'n_telefono'));
                $('#com_d_calle').val($('#comercios_grid').getCell(id, 'd_calle'));
                $('#com_n_numero').val($('#comercios_grid').getCell(id, 'n_numero'));
                $('#com_monoblock').val($('#comercios_grid').getCell(id, 'd_monoblock'));
                $('#com_puerta').val($('#comercios_grid').getCell(id, 'd_puerta'));
                $('#com_piso').val($('#comercios_grid').getCell(id, 'd_piso'));
                $('#com_depto').val($('#comercios_grid').getCell(id, 'd_depto'));
                $('#com_oficina').val($('#comercios_grid').getCell(id, 'd_oficina'));
                $('#com_c_provincia').val($('#comercios_grid').getCell(id, 'c_provincia'));
                $('#com_d_provincia').val($('#comercios_grid').getCell(id, 'd_provincia'));
                $('#com_c_localidad').val($('#comercios_grid').getCell(id, 'c_localidad'));
                $('#com_d_localidad').val($('#comercios_grid').getCell(id, 'd_localidad'));
                $('html').scrollTop(200);
                $('#com_modal').modal("show");
            }else {
                mostrar_validacion('Debe seleccionar un Comercio de la grilla.');
                return false;
            }
        }
    }).navButtonAdd('#comercios_grid_pager',{
        id:'btn_add_com',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-plus",
        title:"Agregar",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#main_grid").getGridParam('selrow');
            if (id) {
                $('#com_title').text("Agregar Comercio");
                $('#com_oper').val('A');
                $('html').scrollTop(200);
                $('#com_modal').modal("show");
            }else {
                mostrar_validacion('Debe seleccionar un Objeto de la primer grilla.');
                return false;
            }
        }
    });

    $("#unidades_grid").jqGrid({
        colNames:datos_uni_grid.colNames(),
        colModel:datos_uni_grid.colModel(),
        pager: $('#unidades_grid_pager'),
        caption:"Unidades:" ,
        postData:datos_uni_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'c_actividad,f_vig_desde',
        autowidth: false,
        height:160,
        sortorder:'desc',
        loadComplete:function(data){
            gridParentWidth = $('#gbox_unidades_grid').parent().width();
            $('#unidades_grid').setGridWidth(gridParentWidth);
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
        }
    }).navGrid('#unidades_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    ).navButtonAdd('#unidades_grid_pager',{
        id:'btn_del_uni',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-trash",
        title:"Eliminar",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#unidades_grid").getGridParam('selrow');
            if (id) {
                mostrar_cuadro('C','Eliminar Unidad','¿Desea eliminar la Unidad?',
                    function () {
                        var params = {
                            p_oper:'D',
                            p_c_actividad:$('#unidades_grid').getCell(id, 'c_actividad'),
                            p_id_nomenclador:$('#unidades_grid').getCell(id, 'id_nomenclador'),
                            p_fvig_desde:$('#unidades_grid').getCell(id, 'f_vig_desde'),
                            p_fvig_hasta:$('#unidades_grid').getCell(id, 'f_vig_hasta'),
                            p_c_unidad:$('#unidades_grid').getCell(id, 'c_tipo_unidad'),
                            p_n_unidades:$('#unidades_grid').getCell(id, 'n_unidades'),
                            p_rid:$('#unidades_grid').getCell(id, 'rid')
                        };
                        fun_abm_unidad(params);
                    });
            }else {
                mostrar_validacion('Debe seleccionar una Unidad de la grilla.');
                return false;
            }
        }
    }).navButtonAdd('#unidades_grid_pager',{
        id:'btn_edi_uni',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-edit",
        title:"Editar",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#unidades_grid").getGridParam('selrow');
            if (id) {
                $('#uni_title').text("Editar Unidad");
                $('#uni_oper').val('M');
                $('#uni_c_actividad').val($('#unidades_grid').getCell(id, 'c_actividad'));
                $('#uni_d_actividad').val($('#unidades_grid').getCell(id, 'd_actividad'));
                $('#uni_grupo').val($('#unidades_grid').getCell(id, 'grupo_act'));
                $('#uni_nomenclador').val($('#unidades_grid').getCell(id, 'id_nomenclador'));
                $('#uni_c_unidad').val($('#unidades_grid').getCell(id, 'c_tipo_unidad'));
                $('#uni_d_unidad').val($('#unidades_grid').getCell(id, 'd_tipo_unidad'));
                $('#uni_cantidad_unidad').val($('#unidades_grid').getCell(id, 'n_unidades'));
                $('#uni_f_desde').val($('#unidades_grid').getCell(id, 'f_vig_desde'));
                $('#uni_f_hasta').val($('#unidades_grid').getCell(id, 'f_vig_hasta'));
                $('html').scrollTop(200);
                $('#uni_modal').modal("show");
            }else {
                mostrar_validacion('Debe seleccionar una Unidad de la grilla.');
                return false;
            }
        }
    }).navButtonAdd('#unidades_grid_pager',{
        id:'btn_add_uni',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-plus",
        title:"Agregar",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#main_grid").getGridParam('selrow');
            if (id) {
                $('#uni_title').text("Agregar Unidad");
                $('#uni_oper').val('A');
                $('html').scrollTop(200);
                $('#uni_modal').modal("show");
            }else {
                mostrar_validacion('Debe seleccionar un Objeto de la primer grilla.');
                return false;
            }
        }
    });

    //CM
    $("#actividades_cm_grid").jqGrid({
        colNames:datos_actcm_grid.colNames(),
        colModel:datos_actcm_grid.colModel(),
        pager: $('#actividades_cm_grid_pager'),
        caption:"Actividades:" ,
        postData:datos_actcm_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'f_fin_act',
        autowidth: false,
        height:160,
        sortorder:'desc, id_nomenclador asc, c_actividad asc',
        loadComplete:function(data){
            gridParentWidth = $('#gbox_actividades_cm_grid').parent().width();
            $('#actividades_cm_grid').setGridWidth(gridParentWidth);
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
            if ($('#actividades_cm_grid').getCell(id, 'id_nomenclador') == 'NAES'){
                if (!$('#actividades_cm_grid').getCell(id, 'f_fin_act') &&
                    $('#actividades_cm_grid').getCell(id, 'm_act_ppal') == 'No'){
                    $('#btn_ppal_actcm').show();
                }else {
                    $('#btn_ppal_actcm').hide();
                }
            }else {
                if ($('#actividades_cm_grid').getCell(id, 'm_act_ppal') == 'No'){
                    $('#btn_ppal_actcm').show();
                }else {
                    $('#btn_ppal_actcm').hide();
                }
            }
        }
    }).navGrid('#actividades_cm_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    ).navButtonAdd('#actividades_cm_grid_pager',{
        id:'btn_ppal_actcm',
        caption:"Principal",
        position:"last",
        buttonicon: "",
        title:"Modificar principal",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#actividades_cm_grid").getGridParam('selrow');
            if (id) {
                mostrar_cuadro('C','Modificar Principal','Esto modificará la Actividad Principal<br>¿Desea Continuar?',
                    function () {
                        var params = {
                            p_c_actividad:$('#actividades_cm_grid').getCell(id, 'c_actividad')+$('#actividades_cm_grid').getCell(id, 'c_digito'),
                            p_id_nomenclador:$('#actividades_cm_grid').getCell(id, 'id_nomenclador'),
                            p_c_articulo:$('#actividades_cm_grid').getCell(id, 'c_articulo'),
                            p_f_inicio_act:$('#actividades_cm_grid').getCell(id, 'f_inicio_act')
                        };
                        fun_cambiar_act_ppal(params);
                    });
            }else {
                mostrar_validacion('Debe seleccionar una Actividad de la grilla.');
                return false;
            }
        }
    }).navButtonAdd('#actividades_cm_grid_pager',{
        id:'btn_del_actcm',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-trash",
        title:"Eliminar",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#actividades_cm_grid").getGridParam('selrow');
            if (id) {
                mostrar_cuadro('C','Eliminar Actividad','Esto eliminará la Actividad.<br>¿Desea continuar?',
                    function () {
                        var params = {
                            p_oper : 'D',
                            p_c_actividad:$('#actividades_cm_grid').getCell(id, 'c_actividad'),
                            p_id_nomenclador:$('#actividades_cm_grid').getCell(id, 'id_nomenclador'),
                            p_c_articulo:$('#actividades_cm_grid').getCell(id, 'c_articulo'),
                            p_f_inicio_act:$('#actividades_cm_grid').getCell(id, 'f_inicio_act'),
                            p_f_cese_act:$('#actividades_cm_grid').getCell(id, 'f_fin_act'),
                            p_c_digito:$('#actividades_cm_grid').getCell(id, 'c_digito')
                        };
                        fun_abm_actcm(params);
                    });
            }else {
                mostrar_validacion('Debe seleccionar una Actividad de la grilla.');
                return false;
            }
        }
    }).navButtonAdd('#actividades_cm_grid_pager',{
        id:'btn_edi_actcm',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-edit",
        title:"Editar",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#actividades_cm_grid").getGridParam('selrow');
            if (id) {
                $('#actcm_title').text("Editar Actividad");
                $('#actcm_oper').val('M');
                $('#actcm_c_actividad').val($('#actividades_cm_grid').getCell(id, 'c_actividad'));
                $('#actcm_d_actividad').val($('#actividades_cm_grid').getCell(id, 'd_actividad'));
                $('#actcm_digito').val($('#actividades_cm_grid').getCell(id, 'c_digito'));
                $('#actcm_c_articulo').val($('#actividades_cm_grid').getCell(id, 'c_articulo')).change();
                $('#actcm_nomenclador').selectpicker('val',$('#actividades_cm_grid').getCell(id, 'id_nomenclador'));
                if ($('#actividades_cm_grid').getCell(id, 'm_act_ppal') == 'Si'){
                    $('#actcm_ppal').selectpicker('val','S');
                }else{
                    $('#actcm_ppal').selectpicker('val','N');
                }
                $('#actcm_f_inicio').val($('#actividades_cm_grid').getCell(id, 'f_inicio_act'));
                $('#actcm_f_cese').val($('#actividades_cm_grid').getCell(id, 'f_fin_act'));
                $('#actcm_modal').modal("show");
            }else {
                mostrar_validacion('Debe seleccionar una Actividad de la grilla.');
                return false;
            }
        }
    }).navButtonAdd('#actividades_cm_grid_pager',{
        id:'btn_add_actcm',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-plus",
        title:"Agregar",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#main_grid").getGridParam('selrow');
            if (id) {
                if ($.datepicker.parseDate('dd/mm/yy', f_vig_desde_obj) > $.datepicker.parseDate('dd/mm/yy', vig_naes)){
                    $('#actcm_nomenclador').attr('disabled',true);
                }else {
                    $('#actcm_nomenclador').attr('disabled',false);
                }
                $('#actcm_title').text("Agregar Actividad");
                $('#actcm_oper').val('A');
                $('#actcm_modal').modal("show");
            }else {
                mostrar_validacion('Debe seleccionar un Objeto de la primer grilla.');
                return false;
            }
        }
    });

    $("#jurisdicciones_grid").jqGrid({
        colNames:datos_jur_grid.colNames(),
        colModel:datos_jur_grid.colModel(),
        pager: $('#jurisdicciones_grid_pager'),
        caption:"Jurisdicciones:" ,
        postData:datos_jur_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'c_jurisdiccion',
        autowidth: false,
        height:160,
        sortorder:'asc',
        loadComplete:function(data){
            gridParentWidth = $('#gbox_jurisdicciones_grid').parent().width();
            $('#jurisdicciones_grid').setGridWidth(gridParentWidth);
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
            if (!$('#jurisdicciones_grid').getCell(id, 'f_vig_hasta') && $('#jurisdicciones_grid').getCell(id, 'm_juris_ppal') == 'No'){
                $('#btn_ppal_jur').show();
            }else {
                $('#btn_ppal_jur').hide();
            }
        }
    }).navGrid('#jurisdicciones_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    ).navButtonAdd('#jurisdicciones_grid_pager',{
        id:'btn_ppal_jur',
        caption:"Principal",
        position:"last",
        buttonicon: "",
        title:"Modificar principal",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#jurisdicciones_grid").getGridParam('selrow');
            if (id) {
                mostrar_cuadro('C','Modificar Principal','Esto modificará la Jurisdicción Principal<br>¿Desea Continuar?',
                    function () {
                        var params = {
                            p_c_jurisdiccion:$('#jurisdicciones_grid').getCell(id, 'c_jurisdiccion')
                        };
                        fun_cambiar_jur_ppal(params);
                    });
            }else {
                mostrar_validacion('Debe seleccionar una Jurisdicción de la grilla.');
                return false;
            }
        }
    }).navButtonAdd('#jurisdicciones_grid_pager',{
        id:'btn_edi_jur',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-edit",
        title:"Editar",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#jurisdicciones_grid").getGridParam('selrow');
            if (id) {
                $('#jur_title').text("Editar Jurisdicción");
                $('#jur_oper').val('M');
                $('#jur_c_jur').val($('#jurisdicciones_grid').getCell(id, 'c_jurisdiccion'));
                $('#jur_d_jur').val($('#jurisdicciones_grid').getCell(id, 'd_jurisdiccion'));
                $('#jur_domicilio').val($('#jurisdicciones_grid').getCell(id, 'd_domicilio'));
                $('#jur_f_inicio').val($('#jurisdicciones_grid').getCell(id, 'f_vig_desde'));
                $('#jur_f_cese').val($('#jurisdicciones_grid').getCell(id, 'f_vig_hasta'));
                $('#jur_modal').modal("show");
            }else {
                mostrar_validacion('Debe seleccionar un Comercio de la grilla.');
                return false;
            }
        }
    }).navButtonAdd('#jurisdicciones_grid_pager',{
        id:'btn_add_jur',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-plus",
        title:"Agregar",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#main_grid").getGridParam('selrow');
            if (id) {
                $('#jur_title').text("Agregar Jurisdicción");
                $('#jur_oper').val('A');
                $('#jur_modal').modal("show");
            }else {
                mostrar_validacion('Debe seleccionar un Objeto de la primer grilla.');
                return false;
            }
        }
    });
}