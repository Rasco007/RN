function inicializarLupas(){

    $("#lupa_d_denominacion").lupa_generica({
        id_lista:v_lista_denominaciones,
        titulos:['ID Contribuyente','CUIT', 'Denominación', 'Tipo Documento', 'Descripción', 'Numero de Documento', 'F. Alta'],
        grid:[
            {index:'id_contribuyente',width:100, hidden: true},
            {index:'n_cuit',width:155},
            {index:'d_denominacion',width:410},
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
            {index:'d_dato',width:465}],
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
        titulos:['Cód. Tributo','Tributo','Tipo Imponible'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:465},
            {index:'c_tipo_imponible ',width:200,hidden:true}],
        caption:'Lista de Tributos',
        sortname:'c_codigo',
        sortorder:'asc',
        filtros:['#id_contribuyente'],
        filtrosNulos:[true],
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo',c_tipo_imponible: 'c_tipo_imponible'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
    });

    $("#lupa_c_concepto").lupa_generica({
        id_lista:v_lista_conceptos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:465}],
        caption:'Concepto',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_concepto',d_descrip: 'd_concepto'},
        keyNav:true,
        filtros:['#id_contribuyente','#c_tributo','#d_objeto_hecho'],
        filtrosTitulos:['Contribuyente','Tributo','Objeto'],
        filtrosNulos:[false,false,false],
        searchInput: '#c_concepto',
        searchCode: true
    });

    $("#lupa_obj_hecho").lupa_generica({
        id_lista:v_lista_obj_hecho,
        titulos:['Objeto Hecho'],
        grid:[  {index:'d_objeto_hecho',width:565}],
        caption:'Lista de Objetos - Hechos',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        filtros:['#id_contribuyente','#d_objeto_hecho','#c_tributo'],
        filtrosNulos:[true,true,false],
        filtrosTitulos:['Contribuyente','Objeto','Tributo'],
        campos:{d_objeto_hecho:'d_objeto_hecho'},
        keyNav:true,
        draggable:true,
        onClose: function(){
            if(!$('#id_contribuyente').val()){
                autocompleta_por_tributo_y_objeto();
            }
        }
    });

    $("#main_grid_obligaciones").jqGrid({
        colNames:datos_main_grid_obligaciones.colNames(),
        colModel:datos_main_grid_obligaciones.colModel(),
        pager: $('#main_grid_obligaciones_pager'),
        caption:"Obligaciones" ,
        postData:datos_main_grid_obligaciones.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        height:250,
        sortname:'id_obligacion, n_secuencia_obl',
        sortorder:'asc',
        loadComplete:function(){
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
        }
    }).navGrid('#main_grid_obligaciones_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    )
}