function init_elementos() {
    $("#lupa_tipo_documento").lupa_generica({
        id_lista: id_lista_documento,
        titulos:['Código', 'Descripción'],
        grid:[  {index:'c_dato',width:115}, {index:'d_dato',width:115}],
        sortname:'c_dato',
        sortorder:'asc',
        caption:'Tipos de Documentos',
        campos:{c_dato:'c_tipo_documento', d_dato: 'd_tipo_documento'},
        filtros:['#c_tipo_documento'],
        filtrosNulos:[true],
        filtrosTitulos:['Código tipo Documento'],
        keyNav:true,
        searchInput: '#c_tipo_documento',
        searchCode: true,
        exactField: 'c_dato'
    });

    $("#lupa_patente").lupa_generica({
        id_lista: id_lista_dominio,
        titulos:['Dominio', 'Dominio Anterior'],
        grid:[  {index:'d_patente',width:160, 'text-align':'center'}, {index:'d_patente_vieja',width:160}],
        sortname:'d_patente',
        sortorder:'asc',
        caption:'Listado de Dominios',
        campos:{d_patente:'d_patente'/*, d_patente_vieja: 'd_patente_vieja'*/},
        filtros:['#d_patente', '#id_contribuyente'],
        filtrosNulos:[true, true],
        keyNav:true,
        filtrosTitulos:['Dominio'],
        exactField: 'd_patente',
        searchInput: '#d_patente'
    });

    $("#lupa_patente_vieja").lupa_generica({
        id_lista: id_lista_dominio_anterior,
        titulos:['Dominio', 'Dominio Anterior'],
        grid:[  {index:'d_patente',width:160}, {index:'d_patente_vieja',width:160}],
        sortname:'d_patente_vieja',
        sortorder:'asc',
        caption:'Listado de Dominios Anteriores',
        campos:{/*d_patente:'d_patente',*/ d_patente_vieja: 'd_patente_vieja'},
        filtros:['#d_patente_vieja', '#id_contribuyente'],
        filtrosNulos:[false, true],
        keyNav:true,
        filtrosTitulos:['Dominio Anterior'],
        searchInput: '#d_patente_vieja',
        exactField: 'd_patente_vieja',
    });

}