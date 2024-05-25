function inicializarLupas(){


$("#lupa_c_tributo").lupa_generica({
    id_lista:300001,
    titulos:['Cód. Tributo','Tributo'],
    grid:[  {index:'cod_tributo',width:100}, {index:'d_descrip',width:250}],
    caption:'Lista de Tributos',
    sortname:'d_descrip',
    sortorder:'desc',
    campos:{cod_tributo:'c_tributo',d_descrip: 'd_tributo'},
    keyNav:true,
    searchInput: '#c_tributo',
    searchCode: true,
    exactField: 'cod_tributo'
});





$("#lupa_c_concepto").lupa_generica({
    id_lista:300002,
    titulos:['Cód. Concepto','Concepto'],
    grid:[  {index:'c_concepto',width:100}, {index:'d_concepto',width:250}],
    caption:'Lista de Conceptos',
    sortname:'d_concepto',
    sortorder:'desc',
    filtros:['#c_tributo'],
    filtrosNulos:[false],
    campos:{c_concepto:'c_concepto',d_concepto: 'd_concepto'},
    keyNav:true,
    searchInput: '#c_concepto',
    searchCode: true,
    exactField: 'c_concepto'
});



$("#lupa_d_objeto_hecho").lupa_generica({
    id_lista:300003,
    titulos:['Objeto-Hecho', 'Vig Desde', 'Vig Hasta' , 'Cese Provisorio' ],
    grid:[{index:'d_objeto_hecho33',width:100} , {index:'f_vig_desde33',width:100},  {index:'f_vig_hasta33',width:100} , {index:'f_cese_prov33',width:100}],
    caption:'Lista de Objetos - Hechos',
    sortname:'d_objeto_hecho',
    sortorder:'desc',
    filtros:['#c_tributo','#d_objeto_hecho', '#id_contribuyente'],
    filtrosTitulos:['Tributo','Objeto','Contribuyente'],
    filtrosNulos:[false,true, true],
    campos:{d_objeto_hecho33:'d_objeto_hecho', f_vig_desde33:'f_vig_desde' , f_vig_hasta33:'f_vig_hasta' , f_cese_prov33:'f_cese_provisorio' },
    keyNav:true,
    draggable:true
});

$('#lupa_d_objeto_hecho').hide();

}