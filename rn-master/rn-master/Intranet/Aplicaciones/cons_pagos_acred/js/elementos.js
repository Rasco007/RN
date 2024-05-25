$(document).ready(function () {

    $("#lupa_c_tipo_documento").lupa_generica({
        id_lista: 10781,
        titulos: ['C&oacute;digo', 'Descripci&oacute;n'],
        grid: [{index: 'c_dato', width: 100},
            {index: 'd_dato', width: 350}],
        caption: 'Tipos de Documento',
        sortname: 'c_dato',
        sortorder: 'asc',
        campos: {c_dato: 'c_tipo_documento', d_dato: 'd_c_tipo_documento'},
        searchCode: true,
        searchInput: '#c_tipo_documento',
        keyNav: true,
        exactField: 'c_dato'
    });
});

