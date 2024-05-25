function inicializarLupas(){
    $("#lupa_c_forma_pago").lupa_generica({
        id_lista: v_id_lista,
        titulos: ['', 'Forma de Pago'],
        grid: [{index: 'c_codigo', width: 100, hidden:true},
            {index: 'd_descrip', width: 350}],
        caption: 'Formas de Pago',
        sortname: 'c_codigo',
        sortorder: 'asc',
        searchInput: '#c_forma_pago_filtro',
        searchCode: true,
        campos: {c_codigo: 'c_forma_pago_filtro', d_descrip: 'd_forma_pago_filtro'},
        keyNav: true,
        onClose: function(){
            if (p_forma_pago){
                $('#btn_buscar').click();
            }
        }
    });
    $('#c_forma_pago_filtro').val(p_forma_pago);
    $('#c_forma_pago_filtro').blur();
}

function inicializarLupasGrilla(){
    $("#d_forma_pago").lupa_generica({
        id_lista: v_id_lista,
        titulos: ['', 'Forma de Pago'],
        grid: [{index: 'c_codigo', width: 100, hidden:true},
            {index: 'd_descrip', width: 350}],
        caption: 'Formas de Pago',
        sortname: 'c_codigo',
        sortorder: 'asc',
        campos: {c_codigo: 'c_forma_pago', d_descrip: 'd_forma_pago'},
        keyNav: true
    });
}