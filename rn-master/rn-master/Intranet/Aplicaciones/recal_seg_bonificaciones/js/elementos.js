function init_elementos() {

    $("#lupa_tributo").lupa_generica({
        id_lista: v_lista_tributo,
        titulos:['C&oacute;d. Tributo','Tributo'],
        grid:[  {index:'c_tributo',width:100},
            {index:'d_descrip',width:350}],
        caption:'Lista de Tributos',
        sortname:'d_descrip',
        sortorder:'desc',
        campos:{c_tributo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
        exactField: 'c_tributo',
        limpiarCod: true,
        onClose: function () {
            if (!$('#c_tributo').val()){
                $('#d_objeto_hecho').attr("readonly","readonly");
            } else {
                $('#d_objeto_hecho').removeAttr("readonly");
            }
            $('#d_objeto_hecho').val(null);
        }
    });

    $("#lupa_objeto_hecho").lupa_generica({
        id_lista:v_lista_objeto,
        titulos:['Objeto', ' '],
        grid:[{index:'d_nomenclatura',width:250},
            {index:'d_nomenclatura_real',width:250}],
        caption:'Lista de Objetos - Hechos',
        sortname:'d_nomenclatura',
        sortorder:'asc',
        filtros:['#c_tributo','#d_objeto_hecho'],
        filtrosNulos:[false,true],
        filtrosTitulos:['Tributo','Objeto/Hecho (3 caracteres)'],
        campos:{d_nomenclatura:'d_objeto_hecho'},
        keyNav:true,
        exactField: 'd_nomenclatura'
    });


}
