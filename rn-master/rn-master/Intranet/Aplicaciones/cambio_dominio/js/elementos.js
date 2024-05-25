function init_elementos(){

    $("#lupa_patente").lupa_generica({
        id_lista: v_lista_patente,
        titulos:['Dominio','Dominio Anterior'],
        grid:[  {index:'d_patente',width:100},
            {index:'d_patente_vieja',width:170}],
        caption:'Lista de Dominios',
        campos:{d_patente: 'd_patente', d_patente_vieja: 'd_patente_vieja'},
        filtros:["#d_patente"],
        filtrosNulos: [true],
        filtrosTitulos:['Dominio'],
        keyNav:true,
        exactField: 'd_patente',
        searchInput: '#d_patente',
        sortname:'d_patente',
        sortorder:'asc',
    });

    $("#lupa_patente_vieja").lupa_generica({
        id_lista: v_lista_patente_vieja,
        titulos:['Dominio','Dominio Anterior'],
        grid:[  {index:'d_patente',width:100},
            {index:'d_patente_vieja',width:170}],
        caption:'Lista de Dominios',
        campos:{d_patente: 'd_patente', d_patente_vieja: 'd_patente_vieja'},
        filtros:["#d_patente_vieja"],
        filtrosNulos: [true],
        filtrosTitulos:["Dominio Anterior"],
        keyNav:true,
        exactField: 'd_patente_vieja',
        searchInput: '#d_patente_vieja',
        sortname:'d_patente',
        sortorder:'asc',
    });

}