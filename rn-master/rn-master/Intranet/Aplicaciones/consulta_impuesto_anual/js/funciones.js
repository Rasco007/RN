function inicializa_lupas_main_grid(formid){

    /*$("#P_C_GRUPO_lupa").lupa_generica({
        id_lista:v_lista_grupos,
        titulos:['Codigo Grupo','Descripción Grupo'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:465}],
        caption:'LISTADO DE GRUPOS',
        sortname:'d_dato',
        sortorder:'asc',
        widthGrid:150,
        campos:{c_dato:'P_C_GRUPO',d_dato: 'd_grupo'},
        keyNav:true,
        searchInput: '#P_C_GRUPO',
        searchCode: true,
        exactField: 'c_dato'
    });*/

    $("#P_C_GRUPO_lupa").lupa_generica({
        id_lista:v_lista_grupos,
        titulos:['Codigo Grupo','Descripción Grupo'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:465}],
        caption:'LISTADO DE GRUPOS',
        sortname:'d_dato',
        sortorder:'asc',
        widthGrid:150,
        campos:{c_dato:'P_C_GRUPO',d_dato: 'd_grupo'},
        keyNav:true,
        searchInput: '#c_grupo_filtro',
        searchCode: true,
        exactField: 'c_dato'
    });

    $("#p_c_moneda_lupa").lupa_generica({
        id_lista:v_lista_moneda,
        titulos:['Codigo Moneda','Descripción Moneda'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:465}],
        caption:'LISTADO DE MONEDAS',
        sortname:'c_codigo',
        sortorder:'asc',
        widthGrid:150,
        campos:{c_codigo:'p_c_moneda',d_descrip: 'd_moneda'},
        keyNav:true,
        searchInput: '#p_c_moneda',
        searchCode: true,
        exactField: 'c_codigo'
    });
}