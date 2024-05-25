function init_elementos() {

    $("#lupa_c_tipo_documento").lupa_generica({
        id_lista:10781,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:350}],
        caption:'Tipos de Documento',
        sortname:'c_dato',
        sortorder:'asc',
        campos:{c_dato:'c_tipo_documento',d_dato:'d_tipo_documento'},
        searchCode:true,
        searchInput: '#c_tipo_documento',
        keyNav:true,
        exactField: 'c_dato'
    });
    $("#lupa_tipo_imp").lupa_generica({
        id_lista: 10758,
        titulos:['Cód. ','Descripción'],
        grid:[  {index:'c_codigo',width:100},
                {index:'d_descrip',width:350}],
        caption:'Lista de Tipos Imponibles',
        sortname:'d_descrip',
        sortorder:'desc',
        filtros:['#id_contribuyente'],
        filtrosNulos:[true],
        filtrosTitulos:['Cuit y Denominación'],
        campos:{c_codigo:'c_tipo_imponible',d_descrip: 'd_tipo_imponible'},
        keyNav:true,
        searchInput: '#c_tipo_imponible',
        searchCode: true
    });
    $("#lupa_tributo").lupa_generica({
        id_lista: 10759,
        titulos:['Cód. Tributo','Tributo'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:350}],
        caption:'Lista de Tributos',
        sortname:'d_descrip',
        sortorder:'desc',
        filtros:['#c_tipo_imponible', '#id_contribuyente'],
        filtrosNulos:[true,true],
        filtrosTitulos:['Cuit, Denominación y Tipo Imponible'],
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true
    });
    $("#lupa_objeto_hecho span").click(function(){

        if(validarCuitTributo()) {

            $("#lupa_objeto_hecho").lupa_generica({
                id_lista: 10917,
                titulos: ['Objeto Hecho', '', '', ''],
                grid: [{index: 'd_objeto_hecho', width: 250}, {index: 'n_cuit', width: 250, hidden: true},
                    {index: 'd_denominacion', width: 250, hidden: true}, {
                        index: 'id_contribuyente',
                        width: 250,
                        hidden: true
                    }],
                caption: 'Lista de Objetos - Hechos',
                sortname: 'd_objeto_hecho',
                sortorder: 'asc',
                filtrosTitulos: ['Tipo Imponible', 'Tributo', 'CUIT', 'Objeto/Hecho'],
                filtros: ['#c_tipo_imponible', '#c_tributo', '#id_contribuyente', '#d_objeto_hecho'],
                filtrosNulos: [true, false, true, true],
                campos: {
                    d_objeto_hecho: 'd_objeto_hecho', n_cuit: 'n_cuit',
                    d_denominacion: 'd_denominacion', id_contribuyente: 'id_contribuyente'
                },
                keyNav: true,
                onClose: function () {
                    if ($('#d_objeto_hecho').val()) {
                        n_cuit_focusout();
                    }
                }
            });

        }

    });

}