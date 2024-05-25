function inicializar_eventos(){
    $("#btn_lupa_marca").lupa_generica({
        id_lista: id_lista_marcas,
        titulos: ['Codigo', 'Descripción'],
        grid: [
            {index: 'c_codigo', width: 80},
            {index: 'd_descrip', width: 450}
        ],
        caption: 'Lista de Marcas',
        campos: {d_descrip: 'd_marca', c_codigo: 'c_marca'},
        keyNav: true,
        onClose(){
            $('#c_modelo').val(null);
            $('#d_modelo').val(null);
            $('#c_descrip').val(null);
            $('#d_descrip').val(null);
        }
    });

    $("#btn_lupa_modelo").lupa_generica({
        id_lista: id_lista_modelos,
        titulos: ['Codigo', 'Descripción'],
        grid: [
            {index: 'c_codigo', width: 80},
            {index: 'd_descrip', width: 450}
        ],
        caption: 'Lista de Modelos',
        filtros: ['#c_marca'],
        filtrosTitulos:['Marca'],
        campos: {d_descrip: 'd_modelo', c_codigo: 'c_modelo'},
        keyNav: true,
        onClose(){
            $('#c_descrip').val(null);
            $('#d_descrip').val(null);
        }
    });

    $("#btn_lupa_descrip").lupa_generica({
        id_lista: id_lista_descripcion,
        titulos: ['Codigo', 'Descripción'],
        grid: [
            {index: 'c_codigo', width: 80},
            {index: 'd_descrip', width: 450}
        ],
        caption: 'Lista de Descripción',
        filtros: ['#c_marca', '#c_modelo'],
        filtrosTitulos:['Marca', 'Modelo'],
        campos: {d_descrip: 'd_descrip', c_codigo: 'c_descrip'},
        keyNav: true
    });

    $("#btn_lupa_grupo").lupa_generica({
        id_lista: id_lista_grupo,
        titulos: ['Codigo', 'Descripción'],
        grid: [
            {index: 'c_codigo', width: 80},
            {index: 'd_descrip', width: 450}
        ],
        caption: 'Lista de Grupos',
        campos: {d_descrip: 'd_grupo', c_codigo: 'c_grupo'},
        keyNav: true
    });

    $('#btn_buscar').click(function () {
        if($('#frm_consulta').validationEngine('validate')) {
            setea_parametros('#main_grid', {':p_c_marca': $('#c_marca').val(), ':p_id_modelo': $('#c_modelo').val(),
                                                              ':p_id_descripcion': $('#c_descrip').val(), ':p_c_grupo': $('#c_grupo').val()});
        }
    });

    $('#btn_limpiar').click(function () {
        $('#main_grid').jqGrid('clearGridData');
        $('#frm_consulta :input').val(null);
        $("#frm_consulta").validationEngine('hideAll');
    });
}