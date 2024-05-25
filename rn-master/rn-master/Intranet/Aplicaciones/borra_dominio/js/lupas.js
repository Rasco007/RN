function init_lupas(){
    $("#lupa_dominio").lupa_generica({
        id_lista: v_lista_patentes,
        titulos:['Dominio','Dominio Anterior'],
        grid:[{index:'d_patente',width:200},
            {index:'d_patente_vieja',width:200}],
        caption:'Lista de Dominios',
        sortname:'d_patente',
        sortorder:'asc',
        campos:{d_patente:'d_dominio'},
        filtros:['#d_dominio',null],
        filtrosNulos:[false,true],
        filtrosTitulos:['Dominio (3 caracteres)','Dominio Anterior'],
        searchCode:true,
        searchInput: '#d_dominio',
        keyNav:true,
        exactField: 'd_patente',
        notFoundDialog: false
    });

    $("#lupa_dominio_anterior").lupa_generica({
        id_lista: v_lista_patentes,
        titulos:['Dominio','Dominio Anterior'],
        grid:[{index:'d_patente',width:200},
            {index:'d_patente_vieja',width:200}],
        caption:'Lista de Dominios',
        sortname:'d_patente_vieja',
        sortorder:'asc',
        campos:{d_patente_vieja:'d_dominio_anterior'},
        filtros:[null,'#d_dominio_anterior'],
        filtrosNulos:[true,false],
        filtrosTitulos:['Dominio','Dominio Anterior (3 caracteres)'],
        searchCode:true,
        searchInput: '#d_dominio_anterior',
        keyNav:true,
        exactField: 'd_patente_vieja',
        notFoundDialog: false
    });

    $('#mascara_lupa_dominio').click(function () {
        mostrar_validacion('Para obtener esta lista de valores debe ingresar el Dominio o parte del mismo. (3 caracteres)');
    });

    $('#mascara_lupa_dominio_anterior').click(function () {
        mostrar_validacion('Para obtener esta lista de valores debe ingresar el Dominio Anterior o parte del mismo. (3 caracteres)');
    });
}