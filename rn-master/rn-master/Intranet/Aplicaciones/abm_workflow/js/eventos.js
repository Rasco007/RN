function inicializarEventos() {
    $(".nav-item").click(function () {
        $(window).resize();
    });
}

function inicializarLupasWork() {
    $("#d_evento_lupa").lupa_generica({
        id_lista: v_lista_eventos,
        titulos: ["Código", "Descripción"],
        grid: [
            { index: "c_dato", width: 100 },
            { index: "d_dato", width: 350 },
        ],
        caption: "Eventos",
        sortname: "c_dato",
        sortorder: "asc",
        campos: { c_dato: "c_evento", d_dato: "d_evento" },
        keyNav: true,
    });
}

function inicializarLupasTrib(){
    $("#d_tributo_lupa").lupa_generica({
        id_lista: v_lista_tributos,
        titulos: ["Código", "Descripción"],
        grid: [
            { index: "c_codigo", width: 100 },
            { index: "d_descrip", width: 350 },
        ],
        caption: "Tributos",
        sortname: "c_codigo",
        sortorder: "asc",
        campos: { c_codigo: "c_tributo", d_descrip: "d_tributo" },
        keyNav: true,
        onClose:function(){
            $('#c_concepto').val('');
            $('#d_concepto').val('');
        }
    });

    $("#d_concepto_lupa").lupa_generica({
        id_lista: v_lista_conceptos,
        titulos: ["Código", "Descripción"],
        grid: [
            { index: "c_concepto", width: 100 },
            { index: "d_concepto", width: 350 },
        ],
        caption: "Conceptos",
        sortname: "c_concepto",
        sortorder: "asc",
        filtros: ["#c_tributo"],
        filtrosNulos: [false],
        mensajeRelacionado: ['Debe ingresar el tributo primero'],
        campos: { c_concepto: "c_concepto", d_concepto: "d_concepto" },
        keyNav: true,
    });
}

function inicializarLupasTareas() {
    $("#d_menu_lupa").lupa_generica({
        id_lista: v_lista_menues,
        titulos: ["ID", "Menu"],
        grid: [
            { index: "c_codigo", width: 100 },
            { index: "d_descrip", width: 450 },
        ],
        caption: "Menues",
        sortname: "c_codigo",
        sortorder: "asc",
        campos: { c_codigo: "n_id_menu", d_descrip: "d_menu" },
        keyNav: true,
    });

    $("#d_tipo_obj_invocar_lupa").lupa_generica({
        id_lista: v_lista_tipo_tareas,
        titulos: ["Código", "Tipo"],
        grid: [
            { index: "c_dato", width: 100 },
            { index: "d_dato", width: 450 },
        ],
        caption: "Tipos de Tareas",
        sortname: "c_dato",
        sortorder: "asc",
        campos: { c_dato: "c_tipo_obj_invocar", d_dato: "d_tipo_obj_invocar" },
        keyNav: true,
        onClose:function(){
            $('#d_objeto_invocar').val('');
        }
    });

    $("#d_tarea_ant_lupa").lupa_generica({
        id_lista: v_lista_tareas_ant,
        titulos: ["Orden", "Código", "Tarea"],
        grid: [
            { index: "n_orden", width: 50 },
            { index: "c_tarea", width: 100 },
            { index: "d_tarea", width: 400 },
        ],
        caption: "Tareas Anteriores",
        filtros: ["#c_workflow", "#n_orden"],
        filtrosNulos: [false, true],
        sortname: "n_orden",
        sortorder: "asc",
        campos: { c_tarea: "c_tarea_ant", d_tarea: "d_tarea_ant" },
        keyNav: true,
    });
}

function inicializarLupasParam() {
    $("#d_tipo_param_lupa").lupa_generica({
        id_lista: v_lista_parametros_tarea,
        titulos: ["Código", "Tipo"],
        grid: [
            { index: "c_dato", width: 100 },
            { index: "d_dato", width: 450 },
        ],
        caption: "Formas de Carga",
        sortname: "c_dato",
        sortorder: "asc",
        campos: { c_dato: "c_tipo_param", d_dato: "d_tipo_param" },
        keyNav: true,
        onClose:function(){
            
            if($('#c_tipo_param').val() == 'F'){
                $('#tr_d_valor_fijo').show();
                $('#tr_d_campo_php').hide();
            } else if($('#c_tipo_param').val() == 'A'){
                $('#tr_d_campo_php').show();
                $('#tr_d_valor_fijo').hide();
            }
        }
    });
}
