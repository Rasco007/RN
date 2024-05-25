function init_lupas() {

    $("#lupa_partida").lupa_generica({
        id_lista:V_lista_partidas_nomenclaturas,
        titulos:['Partida','Nomenclatura','Zona','Plano','Superficie','F Vig. Desde','F Vig. Hasta'],
        grid:[{index:'partida',width:70},
            {index:'nomenclatura',width:100},
            {index:'zona',width:40},
            {index:'plano',width:130},
            {index:'superficie',width:70},
            {index:'F Vig. Desde',width:90},
            {index:'F Vig. Hasta',width:90}],
        caption:'Lista de Partidas',
        sortname:'partida',
        sortorder:'asc',
        campos:{partida:'d_partida',nomenclatura:'d_nomenclatura'},
        filtros: ['#d_partida','#d_nomenclatura'],
        filtrosNulos:[true,true],
        keyNav:true,
        searchInput:'#d_partida',
        searchCode:true,
        exactField:'partida',
        notFoundDialog: false
    });

    $("#lupa_nomenclatura").lupa_generica({
        id_lista:V_lista_partidas_nomenclaturas,
        titulos:['Partida','Nomenclatura','Zona','Plano','Superficie','F Vig. Desde','F Vig. Hasta'],
        grid:[{index:'partida',width:100},
            {index:'nomenclatura',width:100},
            {index:'zona',width:40},
            {index:'plano',width:130},
            {index:'superficie',width:70},
            {index:'F Vig. Desde',width:90},
            {index:'F Vig. Hasta',width:90}],
        caption:'Lista de Nomenclaturas',
        sortname:'nomenclatura',
        sortorder:'asc',
        campos:{nomenclatura:'d_nomenclatura',partida:'d_partida'},
        filtros: ['#d_partida','#d_nomenclatura'],
        filtrosNulos:[true,true],
        keyNav:true,
        searchInput:'#d_nomenclatura',
        searchCode:true,
        exactField:'nomenclatura',
        notFoundDialog: false
    });
}