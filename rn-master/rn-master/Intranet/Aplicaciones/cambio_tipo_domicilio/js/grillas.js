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
            setea_parametros('#conceptos_grid',{':p_id_contrib':id_contrib,
                ':p_c_timp':c_tipo_imponible,
                ':p_c_trib':c_tributo,
                ':p_objeto':objeto_hecho});
            $('#btn_domicilios').show();
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    );

    $("#conceptos_grid").jqGrid({
        colNames:datos_conceptos_grid.colNames(),
        colModel:datos_conceptos_grid.colModel(),
        autowidth:false,
        height:160,
        pager: $('#conceptos_grid_pager'),
        caption:"Conceptos:" ,
        postData:datos_conceptos_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        loadComplete:function(data){
            gridParentWidth = $('#gbox_conceptos_grid').parent().width();
            $('#conceptos_grid').setGridWidth(gridParentWidth);
        },
        ondblClickRow: function(rowid){
            mostrar_domicilio($("#conceptos_grid").getCell(rowid,'id_contribuyente'),$("#conceptos_grid").getCell(rowid,'c_tipo_domicilio'));
        }
    }).navGrid('#conceptos_grid_pager',
        {add:false, edit:true, del:false}, //options
        {
            top:500,
            left: 0,
            width: 600,
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $(formid).validationEngine({promptPosition:'inline'});
            }),
            onInitializeForm: defaultInitForm(function(formid){
                $("#tr_id_contribuyente,#tr_c_tributo,#tr_c_tipo_imponible,#tr_d_objeto_hecho",formid).hide();

                $("#c_tipo_domicilio",formid).lupa_generica({
                    titulos:['Código','Descripción','Domicilio'],
                    grid:[  {index:'c_codigo',width:100},
                        {index:'d_descrip',width:250},
                        {index:'domi',width:450}],
                    caption:'Tipos de Domicilio',
                    campos:{c_codigo:'c_tipo_domicilio',d_descrip:'d_tipo_domicilio'},
                    keyNav:true,
                    filtros:['#id_contribuyente, formid'],
                    searchInput: '#c_tipo_domicilio, formid',
                    searchCode: true,
                    limpiarCod: true
                });

                $("#c_distribucion",formid).lupa_generica({
                    titulos:['Código','Descripción'],
                    grid:[  {index:'c_codigo',width:100},
                        {index:'d_descrip',width:250}],
                    caption:'Códigos de Distribucion',
                    campos:{c_codigo:'c_distribucion',d_descrip:'d_distribucion'},
                    keyNav:true,
                    filtros:['#c_tributo, formid','#id_contribuyente, formid','#c_tipo_domicilio, formid','#cod_dist_cambio, formid'],
                    searchInput: '#c_distribucion, formid',
                    searchCode: true,
                    limpiarCod: true
                });

                $("#c_rechazo",formid).lupa_generica({
                    titulos:['Código','Descripción'],
                    grid:[  {index:'c_codigo',width:100},
                        {index:'d_descrip',width:250}],
                    caption:'Códigos de Rechazo',
                    campos:{c_codigo:'c_rechazo',d_descrip:'d_rechazo'},
                    keyNav:true,
                    filtros:['#c_tributo, formid','#id_contribuyente, formid','#c_tipo_domicilio, formid'],
                    searchInput: '#c_rechazo, formid',
                    searchCode: true,
                    limpiarCod: true
                });
            }),
            closeAfterEdit: true
        }, //edit options
        {}, // add options
        {}, // del options
    );
}