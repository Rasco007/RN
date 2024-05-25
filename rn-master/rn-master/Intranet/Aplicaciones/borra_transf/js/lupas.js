function init_lupas(){
    if (p_c_tributo == 60){
        $("#lupa_partida").lupa_generica({
            id_lista: v_lista_partidas,
            titulos:['Partida','Nomenclatura'],
            grid:[{index:'objeto',width:200},
                {index:'objeto_anterior',width:200}],
            caption:'Partidas',
            sortname:'objeto',
            sortorder:'asc',
            campos:{objeto:'d_partida'},
            filtros:['#d_partida'],
            filtrosNulos:[true],
            searchCode:true,
            searchInput: '#d_partida',
            keyNav:true,
            exactField: 'objeto'
        });

        $("#lupa_nomenclatura").lupa_generica({
            id_lista: v_lista_nomenclaturas,
            titulos:['Partida','Nomenclatura'],
            grid:[{index:'partida',width:200},
                {index:'nomenclatura',width:200}],
            caption:'Nomenclaturas',
            sortname:'nomenclatura',
            sortorder:'asc',
            campos:{nomenclatura:'d_nomenclatura'},
            filtros:['#d_nomenclatura'],
            filtrosNulos:[true],
            searchCode:true,
            searchInput: '#d_nomenclatura',
            keyNav:true,
            exactField: 'nomenclatura',
            notFoundDialog: false
        });
    }else if (p_c_tributo == 90){
        $("#lupa_partida").lupa_generica({
            id_lista: 10858,
            titulos: ['Dominio', 'Dominio Anterior'],
            grid: [{index: 'd_patente', width: 150},
                {index: 'd_patente_vieja', width: 150}],
            caption: 'Dominios',
            //sortname:'d_nomenclatura',
            sortorder: 'asc',
            campos: {d_patente: 'd_partida'},
            filtros: ['#d_partida', p_c_tributo],
            filtrosNulos: [true, false],
            searchCode: true,
            keyNav: true
        });

        $("#lupa_nomenclatura").lupa_generica({
            id_lista: 10885,
            titulos: ['Dominio Anterior', 'Dominio'],
            grid: [{index: 'd_patente_vieja', width: 150},
                {index: 'd_patente', width: 150}],
            caption: 'Dominios',
            //sortname:'d_nomenclatura',
            sortorder: 'asc',
            campos: {d_patente_vieja: 'd_nomenclatura'},
            filtros: ['#d_nomenclatura'],
            filtrosNulos: [true],
            searchCode: true,
            keyNav: true
        });
    }
}