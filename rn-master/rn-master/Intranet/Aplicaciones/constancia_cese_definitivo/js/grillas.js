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
        titulos:['Cód. Tributo','Tributo', 'Inscripción', 'F. Vig. Desde', 'F. Vig. Hasta'],
        grid:[  {index:'c_codigo',width:120},
            {index:'d_descrip',width:300},
            {index:'d_objeto_hecho',width:150},
            {index:'f_vig_desde',width:150},
            {index:'f_vig_hasta',width:150}],
        caption:'Lista de Tributos',
        sortname:'c_codigo',
        sortorder:'asc',
        filtros:['#id_contribuyente'],
        filtrosTitulos:['CUIT'],
        filtrosNulos:[false],
        campos:{
            c_codigo:'c_tributo',
            d_descrip: 'd_tributo',
            d_objeto_hecho:'d_objeto_hecho'},
        width: 750,
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
    });


}