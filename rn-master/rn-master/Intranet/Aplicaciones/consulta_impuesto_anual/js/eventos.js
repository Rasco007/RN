function init_eventos(){
    if(v_modo == 'C'){
        $("#div_search").show();
        $("#gridWrapper").show();
    }
    else {
        $("#div_search").show();
        $("#gridWrapperMain").show();
    }

    $('#gbox_main_grid').css('width', '100%');
    $('#gview_main_grid').css('width', '100%');

    $('#gbox_grid_impuesto_anual').css('width', '100%');
    $('#gview_grid_impuesto_anual').css('width', '100%');

    $("#lupa_grupo_filtro").lupa_generica({
        id_lista:v_lista_grupos,
        titulos:['Codigo Grupo','Descripción Grupo'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:465}],
        caption:'LISTADO DE GRUPOS',
        sortname:'d_dato',
        sortorder:'asc',
        widthGrid:150,
        campos:{c_dato:'c_grupo_filtro',d_dato: 'd_grupo_filtro'},
        keyNav:true,
        searchInput: '#c_grupo_filtro',
        searchCode: true,
        exactField: 'c_dato'
    });

    $("#lupa_moneda").lupa_generica({
        id_lista:v_lista_moneda,
        titulos:['Codigo Moneda','Descripción Moneda'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:465}],
        caption:'LISTADO DE MONEDAS',
        sortname:'c_codigo',
        sortorder:'asc',
        widthGrid:150,
        campos:{c_codigo:'c_moneda',d_descrip: 'd_moneda'},
        keyNav:true,
        searchInput: '#c_moneda',
        searchCode: true,
        exactField: 'c_codigo'
    });

    $("#btn_limpiar").click(function(){
        $(".limpiar").val(''); 
        $('#grid_impuesto_anual').jqGrid('clearGridData');
        $('#main_grid').jqGrid('clearGridData');
    });

    $("#btn_consultar").click(function(){
        /*if($('#anio').val() == '' && $('#c_grupo_filtro').val() == '' && $('#c_moneda').val() == '' && $('#n_modelo_año_desde').val() == '' && $('#n_modelo_año_hasta').val() == '' && $('#n_mes_fiscal').val() == '' && $('#n_peso_cilindrada_desde').val() == '' && $('#n_peso_cilindrada_hasta').val() == '' && $('#n_impuesto_anual').val() == ''){
            mostrar_cuadro('I', 'Información', "Debe completar al menos un campo");
            return;
        }*/
        if(v_modo == 'C'){
            setea_parametros('#grid_impuesto_anual',{':modo':v_modo,
            ':p_anio_fiscal':$('#anio').val(),
            ':p_c_grupo':$('#c_grupo_filtro').val(),
            ':p_c_moneda':$('#c_moneda').val(),
            ':p_n_modelo_año_desde':$('#n_modelo_año_desde').val(),
            ':p_n_modelo_año_hasta':$('#n_modelo_año_hasta').val(),
            ':p_n_mes_fiscal':$('#n_mes_fiscal').val(),
            ':p_n_peso_cilindrada_desde':$('#n_peso_cilindrada_desde').val(),
            ':p_n_peso_cilindrada_hasta':$('#n_peso_cilindrada_hasta').val(),
            ':p_n_impuesto_anual':$('#n_impuesto_anual').val()});
        }
        else{
            setea_parametros('#main_grid',{':modo':v_modo,
            ':p_anio_fiscal':$('#anio').val(),
            ':p_c_grupo':$('#c_grupo_filtro').val(),
            ':p_c_moneda':$('#c_moneda').val(),
            ':p_n_modelo_año_desde':$('#n_modelo_año_desde').val(),
            ':p_n_modelo_año_hasta':$('#n_modelo_año_hasta').val(),
            ':p_n_mes_fiscal':$('#n_mes_fiscal').val(),
            ':p_n_peso_cilindrada_desde':$('#n_peso_cilindrada_desde').val(),
            ':p_n_peso_cilindrada_hasta':$('#n_peso_cilindrada_hasta').val(),
            ':p_n_impuesto_anual':$('#n_impuesto_anual').val()});
        }
    });
}