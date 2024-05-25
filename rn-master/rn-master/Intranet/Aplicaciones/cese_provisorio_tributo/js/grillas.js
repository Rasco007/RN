function inicializarGrillas(){

    $("#lupa_d_denominacion").lupa_generica({
        id_lista:v_lista_denominaciones,
        titulos:['ID Contribuyente','CUIT', 'Denominación', 'Tipo Documento', 'Descripción', 'Numero de Documento', 'F. Alta'],
        grid:[
            {index:'id_contribuyente',width:100, hidden: true},
            {index:'n_cuit',width:155},
            {index:'d_denominacion',width:405},
            {index:'c_tipo_documento',width:140},
            {index:'d_tipo_documento',width:140, hidden: true},
            {index:'n_documento',width:160},
            {index:'f_alta',width:80, hidden: true}
        ],
        caption:'Lista de Denominaciones',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#desc_denom'],
        filtrosTitulos:['Denominación'],
        filtrosNulos:[false],
        campos:{
            id_contribuyente: 'id_contribuyente',
            n_cuit: 'n_cuit',
            d_denominacion:'desc_denom',
            c_tipo_documento:'c_tipo_documento',
            d_tipo_documento:'d_tipo_documento',
            n_documento: 'n_documento',
            f_alta:'f_alta'
        },
        width: 750,
        keyNav:true,
        draggable:true
    });

    $("#lupa_c_documento").lupa_generica({
        id_lista:v_lista_doc,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:450}],
        caption:'Tipos de Documento',
        sortname:'c_dato',
        sortorder:'asc',
        campos:{c_dato:'c_tipo_documento',d_dato:'d_tipo_documento'},
        searchCode:true,
        searchInput: '#c_tipo_documento',
        keyNav:true,
        exactField: 'c_dato'
    });

    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_trib,
        titulos:['Cód. Tributo','Tributo'],
        grid:[  {index:'c_codigo',width:130},
            {index:'d_descrip',width:419}],
        caption:'Lista de Tributos',
        sortname:'c_codigo',
        sortorder:'asc',
        filtros:['#id_contribuyente'],
        filtrosNulos:[true],
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
		onClose: function() {
			$('#c_tributo').trigger('focusout');
		}
    });

    $("#lupa_c_motivo").lupa_generica({
        id_lista:v_lista_motivos_cese,
        titulos:['Cód.','Descripción','Tabla Motivo'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450},
            {index:'n_tabla_motivo',width:100, hidden:true}],
        caption:'Motivos de Cese Provisorio',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_motivo_cese',d_descrip: 'd_motivo_cese',n_tabla_motivo: 'n_tabla_motivo'},
        keyNav:true,
        filtros:['#c_regimen'],
        filtrosTitulos:['Regimen'],
        filtrosNulos:[false],
        searchInput: '#c_motivo_cese',
        searchCode: true,
    });

    $("#lupa_obj_hecho").lupa_generica({
        id_lista:v_lista_obj_hecho,
        titulos:['Objeto Hecho', 'F. Vig Desde', 'F. Cese Provisorio'],
        grid:[  {index:'d_objeto_hecho',width:250}, {index:'f_vig_desde',width:150}, {index:'f_cese_provisorio',width:150}],
        caption:'Lista de Objetos - Hechos',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        filtros:['#c_tributo','#d_objeto_hecho','#id_contribuyente'],
        filtrosNulos:[false,true,true],
        filtrosTitulos:['Tributo','Objeto','Contribuyente'],
        campos:{d_objeto_hecho:'d_objeto_hecho'},
        keyNav:true,
        draggable:true
    });

    $("#main_grid_actividades_ibd").jqGrid({
        colNames:datos_main_grid_actividades_ibd.colNames(),
        colModel:datos_main_grid_actividades_ibd.colModel(),
        pager: $('#main_grid_actividades_ibd_pager'),
        caption:"Actividades" ,
        postData:datos_main_grid_actividades_ibd.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        height:150,
        loadComplete:function(){
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
        }
    }).navGrid('#main_grid_actividades_ibd_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    )

    $("#main_grid_actividades_cm").jqGrid({
        colNames:datos_main_grid_actividades_cm.colNames(),
        colModel:datos_main_grid_actividades_cm.colModel(),
        pager: $('#main_grid_actividades_cm_pager'),
        caption:"Actividades" ,
        postData:datos_main_grid_actividades_cm.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        height:150,
        loadComplete:function(){
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
        }
    }).navGrid('#main_grid_actividades_cm_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    )

    $("#main_grid_comercios").jqGrid({
        colNames:datos_main_grid_comercios.colNames(),
        colModel:datos_main_grid_comercios.colModel(),
        pager: $('#main_grid_comercios_pager'),
        caption:"Comercios" ,
        postData:datos_main_grid_comercios.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        height:150,
        loadComplete:function(){
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
        }
    }).navGrid('#main_grid_comercios_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    )

    $("#main_grid_jurisdicciones").jqGrid({
        colNames:datos_main_grid_jurisdicciones.colNames(),
        colModel:datos_main_grid_jurisdicciones.colModel(),
        pager: $('#main_grid_jurisdicciones_pager'),
        caption:"Jurisdicciones" ,
        postData:datos_main_grid_jurisdicciones.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        height:150,
        loadComplete:function(){
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
        }
    }).navGrid('#main_grid_jurisdicciones_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    )

    $("#main_grid_errores").jqGrid({
        colNames:datos_main_grid_errores.colNames(),
        colModel:datos_main_grid_errores.colModel(),
        pager: $('#main_grid_errores_pager'),
        caption:"Información del Contribuyente" ,
        postData:datos_main_grid_errores.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        sortname:'n_orden',
        sortorder:'asc',
        height:300,
        loadComplete:function(){
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
        }
    }).navGrid('#main_grid_errores_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    )

}