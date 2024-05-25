function inicializa_lupas(){
    $("#btn_lupa_consorcio").lupa_generica({
        id_lista:v_lista_consorcios,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_organismo',width:100},
            {index:'d_dato',width:450}],
        caption:'Consorcios',
        sortname:'c_organismo',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#frm_consulta #c_organismo',
        exactField: 'c_organismo',
        campos:{c_organismo:'c_organismo',d_dato:'d_organismo'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose: function(){
            $("#c_concepto,#d_concepto,#c_region,#d_region,#c_area,#d_area").val('');
        }
    });

    $("#btn_lupa_concepto").lupa_generica({
        id_lista:v_lista_conceptos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_concepto',width:100},
            {index:'d_dato',width:450}],
        caption:'Conceptos',
        sortname:'c_concepto',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#frm_consulta #c_concepto',
        exactField: 'c_concepto',
        filtros:['#c_organismo',"#c_region","#c_area"],
        filtrosTitulos:['Consorcio','Región','Área'],
        filtrosNulos:[false,false,false],
        // filtros:['#c_organismo'],
        // filtrosTitulos:['Consorcio'],
        // filtroNull:true,
        campos:{c_concepto:'c_concepto',d_dato:'d_concepto'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label"
    });

    $("#btn_lupa_region").lupa_generica({
        id_lista:v_lista_regiones,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_region',width:100},
            {index:'d_dato',width:450}],
        caption:'Regiones',
        sortname:'c_region',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#frm_consulta #c_region',
        exactField: 'c_region',
        filtros:['#c_organismo'],
        filtrosTitulos:['Consorcio'],
        filtroNull:true,
        campos:{c_region:'c_region',d_dato:'d_region'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose:function(){
            $("#c_area,#d_area").val("");
        }
    });

    $("#btn_lupa_area").lupa_generica({
        id_lista:v_lista_areas,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_area',width:100},
            {index:'d_dato',width:450}],
        caption:'Áreas',
        sortname:'c_area',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#frm_consulta #c_area',
        exactField: 'c_area',
        filtros:['#c_organismo','#c_region'],
        filtrosTitulos:['Consorcio','Región'],
        filtrosNulos:[true,false],
        campos:{c_area:'c_area',d_dato:'d_area'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label"
    });

    $("#btn_lupa_partida").lupa_generica({
        id_lista:v_lista_partidas,
        titulos:['Número'],
        grid: [{index:'n_partida',width:300}],
        caption:'Partidas',
        sortname: 'n_partida',
        sortorder:'asc',
        exactField: 'n_partida',
        filtros: ["#c_region","#c_area",'#c_organismo'],
        filtrosTitulos: ['Región','Área','Consorcio'],
        filtrosNulos: [true, true, true],
        campos: {n_partida:'n_partida'},
        keyNav:true,
        foco:"#d_label"
    });
}

function inicializa_lupas_main_grid(formid){
    $("#d_organismo",formid).lupa_generica({
        id_lista:v_lista_consorcios,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_organismo',width:100},
            {index:'d_dato',width:450}],
        caption:'Consorcios',
        sortname:'c_organismo',
        sortorder:'asc',
        exactField: 'c_organismo',
        campos:{c_organismo:'c_organismo',d_dato:'d_organismo'},
        keyNav:true,
        foco:"#d_label",
        onClose:function(){
            $("#c_concepto,#d_concepto,#c_region,#d_region,#c_area,#d_area",formid).val('');
        }
    });

    $("#d_concepto",formid).lupa_generica({
        id_lista:v_lista_conceptos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_concepto',width:100},
            {index:'d_dato',width:450}],
        caption:'Conceptos',
        sortname:'c_concepto',
        sortorder:'asc',
        exactField: 'c_concepto',
        filtros:['#c_organismo',"#c_region","#c_area"],
        filtrosTitulos:['Consorcio','Región','Área'],
        filtrosNulos:[false,false,false],
        // filtros:['#c_organismo'],
        // filtrosTitulos:['Consorcio'],
        campos:{c_concepto:'c_concepto',d_dato:'d_concepto'},
        keyNav:true,
        foco:"#d_label"
    });

    $("#d_region",formid).lupa_generica({
        id_lista:v_lista_regiones,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_region',width:100},
            {index:'d_dato',width:450}],
        caption:'Regiones',
        sortname:'c_region',
        sortorder:'asc',
        exactField: 'c_region',
        filtros:['#c_organismo'],
        filtrosTitulos:['Consorcio'],
        campos:{c_region:'c_region',d_dato:'d_region'},
        keyNav:true,
        foco:"#d_label",
        onClose:function(){
            $("#c_area,#d_area",formid).val("");
        }
    });

    $("#d_area",formid).lupa_generica({
        id_lista:v_lista_areas,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_area',width:100},
            {index:'d_dato',width:450}],
        caption:'Áreas',
        sortname:'c_area',
        sortorder:'asc',
        exactField: 'c_area',
        filtros:['#c_organismo','#c_region'],
        filtrosTitulos:['Consorcio','Región'],
        campos:{c_area:'c_area',d_dato:'d_area'},
        keyNav:true,
        foco:"#d_label"
    });

    $("#n_partida",formid).lupa_generica({
        id_lista:v_lista_partidas,
        titulos:['Número'],
        grid: [{index:'n_partida',width:300}],
        caption:'Partidas',
        sortname: 'n_partida',
        sortorder:'asc',
        exactField: 'n_partida',
        filtros: ["#c_region","#c_area",'#c_organismo'],
        filtrosTitulos: ['Región','Área','Consorcio'],
        filtrosNulos: [true, true, true],
        campos: {n_partida:'n_partida'},
        keyNav:true,
        foco:"#d_label"
    });
}

function fun_valida_posicion(){
    var v_pos_fiscal = $("#n_cuota").val().split('/');
    
    if(v_pos_fiscal[1] > 12){
        mostrar_validacion('Verifique la cuota ingresadas, no pueden ser mayor a 12.');
        return false;
    }

    return true;
}

function fun_valida_posiciones(){
    var v_pos_desde = $("#n_cuota_desde").val().split('/');
    var v_pos_hasta = $("#n_cuota_hasta").val().split('/');
    
    if(v_pos_desde[1] > 12 || v_pos_hasta[1] > 12){
        mostrar_validacion('Verifique las cuotas ingresadas, no pueden ser mayor a 12.');
        return false;
    }

    if(v_pos_desde[0] > v_pos_hasta[0]){
        mostrar_validacion('El año desde no puede ser mayor que el año hasta.');
        return false;
    }else{
        if(v_pos_desde[0] == v_pos_hasta[0] && v_pos_desde[1] > v_pos_hasta[1]){
            mostrar_validacion('La cuota desde no puede ser mayor que la cuota hasta.');
            return false;
        }
    }
    return true;
}

function deshabilita_campos(v_o_f){
    $(".limpiar","#frm_consulta").attr('readonly',v_o_f);
    $(".btn_lupa","#frm_consulta").attr('disabled',v_o_f);
}