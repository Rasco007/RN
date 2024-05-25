function init_lupas(){
    
    $("#p_c_tributo_lupa").lupa_generica({
        id_lista: lista_tributos,
        titulos: ['C&oacute;digo', 'Descripci&oacute;n'],
        grid: [{index: 'c_codigo', width: 100},
            {index: 'd_descrip', width: 350}],
        caption: 'Tributos',
        sortname: 'c_codigo',
        sortorder: 'asc',
        campos: {c_codigo: 'p_c_tributo', d_descrip: 'Tributo'},
        searchCode: true,
        searchInput: '#c_tributo',
        keyNav: true,
        exactField: 'c_codigo'
    });
    
    $("#p_c_grupo_lupa").lupa_generica({
        id_lista: lista_grupos,
        titulos: [ 'Descripci&oacute;n','C&oacute;digo'],
        grid: [{index: 'D_dato', width: 100},
            {index: 'C_dato', width: 350}],
        caption: 'Grupos',
        sortname: 'd_DATO',
        sortorder: 'asc',
        campos: {D_dato: 'd_grupo', C_dato: 'p_c_grupo'},
        searchCode: true,
        searchInput: '#p_c_grupo',
        keyNav: true,
        exactField: 'c_dato'
    });

}

