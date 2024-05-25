function init_elementos() {

    $("#lupa_c_tipo_documento").lupa_generica({
        id_lista:10781,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:350}],
        caption:'Tipos de Documento',
        sortname:'c_dato',
        sortorder:'asc',
        campos:{c_dato:'c_tipo_documento',d_dato:'d_tipo_documento'},
        searchCode:true,
        searchInput: '#c_tipo_documento',
        keyNav:true,
        exactField: 'c_dato'
    });
    $("#lupa_tipo_imp").lupa_generica({
        id_lista: 10758,
        titulos:['Cód. ','Descripción'],
        grid:[  {index:'c_codigo',width:100},
                {index:'d_descrip',width:350}],
        caption:'Lista de Tipos Imponibles',
        sortname:'d_descrip',
        sortorder:'desc',
        filtros:['#id_contribuyente'],
        filtrosNulos:[false],
        filtrosTitulos:['Cuit y Denominación'],
        campos:{c_codigo:'c_tipo_imponible',d_descrip: 'd_tipo_imponible'},
        keyNav:true,
        searchInput: '#c_tipo_imponible',
        searchCode: true
    });
    $("#lupa_tributo").lupa_generica({
        id_lista: 10759,
        titulos:['Cód. Tributo','Tributo'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:350}],
        caption:'Lista de Tributos',
        sortname:'d_descrip',
        sortorder:'desc',
        filtros:['#c_tipo_imponible', '#id_contribuyente'],
        filtrosNulos:[false,false],
        filtrosTitulos:['Cuit, Denominación y Tipo Imponible'],
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true
    });
    $("#lupa_objeto_hecho").lupa_generica({
        id_lista:10765,
        titulos:['Descripción Objeto Hecho'],
        grid:[{index:'d_objeto_hecho',width:250}],
        caption:'Lista de Objetos - Hechos',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        filtrosTitulos:['Cuit, Denominación, Tipo Imponible y Tributo'],
        filtros:['#c_tipo_imponible','#c_tributo', '#id_contribuyente'],
        filtrosNulos:[false,false,false],
        campos:{d_objeto_hecho:'d_objeto_hecho'},
        keyNav:true,
        searchInput: '#d_objeto_hecho',
        searchCode: true
    });
}