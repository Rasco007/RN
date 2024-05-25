function inicializarLupas(formid){
    // LUPAS FILTRO
    $("#lupa_provincia",formid).lupa_generica({
        id_lista:v_lista_provincias,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_provincia',width:100},
            {index:'d_provincia',width:450}],
        caption:'Provincias',
        sortname:'d_provincia',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#p_c_provincia',
        exactField: 'c_provincia',
        campos:{c_provincia:'c_provincia', d_provincia:'d_provincia'},
        keyNav:true,
        limpiarCod: true,
    });

    $("#lupa_depto",formid).lupa_generica({
        id_lista:v_lista_deptos,
        titulos:['Departamento','Descrip. Departamento', 'Localidad', 'Descrip. Localidad', 'Código Postal'],
        grid:[  {index:'c_depto',width:100},
                {index:'d_depto',width:350},
                {index:'c_localidad',width:100},
                {index:'d_localidad',width:450},
                {index:'c_postal',width:100}],
        caption:'Departamentos',
        sortname:'c_localidad',
        sortorder:'asc',
        filtros: ['#c_provincia'],
        //filtrosNulos: [false],
        filtrosTitulos:['Provincia'],
        searchCode:true,
        searchInput: '#p_c_departamento',
        exactField: 'c_depto',
        campos:{c_depto:'c_depto', d_depto:'d_depto', c_localidad:'c_localidad', d_localidad:'d_localidad', c_postal:'c_postal'},
        keyNav:true,
        limpiarCod: true,
    });

    $("#lupa_localidad",formid).lupa_generica({
        id_lista:v_lista_localidades,
        titulos:['Localidad', 'Descrip. Localidad', 'Código Postal'],
        grid:[  {index:'c_localidad',width:100},
                {index:'d_localidad',width:450},
                {index:'c_postal',width:100}],
        caption:'Localidades',
        filtros: ['#c_provincia', '#c_depto'],
        //filtrosNulos: [false, false],
        filtrosTitulos:['Provincia', 'Departamento'],
        searchCode:true,
        searchInput: '#p_c_localidad',
        exactField: 'c_localidad',
        campos:{c_localidad:'c_localidad', d_localidad:'d_localidad', c_postal:'c_postal'},
        keyNav:true,
        limpiarCod: true,
    });



    
}