function inicializarEventos(){
    $('.nav-item').click(function(){
        $(window).resize();
    })
}

function inicializarLupasConsDin() {
    $("#d_procedimiento_ora_lupa").lupa_generica({
        id_lista:v_lista_procedimientos,
        titulos:['Procedimiento','Tipo'],
        grid:[  {index:'d_procedure',width:450},
            {index:'d_object_type',hidden:true}],
        caption:'Procedimientos',
        sortname:'d_procedure',
        sortorder:'asc',
        campos:{d_procedure:'d_procedimiento_ora'},
        keyNav:true
    });
}

function inicializarLupasParams() {
    $("#d_lista_lupa").lupa_generica({
        id_lista:v_lista_listas,
        titulos:['ID','Lista'],
        grid:[  {index:'n_id_lista',width:100},
            {index:'d_descripcion',width:450}],
        caption:'Listas',
        sortname:'d_descripcion',
        sortorder:'asc',
        campos:{n_id_lista:'n_id_lista', d_descripcion:'d_lista'},
        keyNav:true
    });

    $("#d_tipo_dato_lupa").lupa_generica({
        id_lista:v_lista_datos_param,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'Tipos de Dato',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tipo_dato', d_descrip:'d_tipo_dato'},
        keyNav:true
    });
}

function inicializarLupasResul() {
    $("#d_tipo_dato_lupa").lupa_generica({
        id_lista:v_lista_datos_resu,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'Tipos de Dato',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tipo_dato', d_descrip:'d_tipo_dato'},
        keyNav:true
    });
}