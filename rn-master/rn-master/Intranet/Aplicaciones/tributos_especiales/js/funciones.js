function inicializa_lupas_main_grid(formid){

    $("#p_c_concepto_lupa",formid).lupa_generica({
        id_lista:v_lista_conceptos,
        titulos:['Cod. Concepto','Concepto'],
        grid:[  {index:'c_concepto',width:100},
            {index:'d_concepto',width:200}],
        caption:'Lista de Conceptos',
        sortname:'d_concepto',
        sortorder:'asc',
        filtros:['#c_tributo'],
        filtrosTitulos:['Tributo'],
        searchInput: '#p_c_concepto',
        searchCode: true,
        campos:{c_concepto:'p_c_concepto',d_concepto: 'p_d_concepto'},
        keyNav:true,
        exactField: 'p_c_concepto'
    });

    $("#p_c_concepto_mov_lupa",formid).lupa_generica({
        id_lista:v_lista_conceptos,
        titulos:['Cod. Concepto','Concepto'],
        grid:[  {index:'c_concepto',width:100},
            {index:'d_concepto',width:200}],
        caption:'Lista de Conceptos',
        sortname:'d_concepto',
        sortorder:'asc',
        filtros:['#c_tributo'],
        filtrosTitulos:['Tributo'],
        searchInput: '#p_c_concepto_mov',
        searchCode: true,
        campos:{c_concepto:'p_c_concepto_mov',d_concepto: 'p_d_concepto_mov'},
        keyNav:true,
        exactField: 'p_c_concepto_mov'
    });
}