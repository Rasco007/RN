function inicializar_eventos(){
    $('#n_posicion_fiscal_desde').mask('9999/99');
    $('#n_posicion_fiscal_hasta').mask('9999/99');
    $('#n_cuota_desde').mask('99');
    $('#n_cuota_hasta').mask('99');

    $("#lupa_c_tributo").lupa_generica({
        id_lista: id_lista_tributos,
        titulos: ['Codigo de Tributo', 'Descripción'],
        grid: [
            {index: 'c_dato', width: 150},
            {index: 'd_dato', width: 450}
        ],
        caption: 'Lista de Tributos',
        campos: {d_dato: 'd_tributo', c_dato: 'c_tributo'},
        keyNav: true,
        onClose(){
            $('#d_objeto_hecho').val(null);
            if($('#c_tributo').val() != ''){
                $('#d_objeto_hecho').attr('readonly', false);
            } else {
                $('#d_objeto_hecho').attr('readonly', true);
            }
        }
    });

    $("#btn_lupa_objeto_hecho").lupa_generica({
        id_lista: id_lista_objetos,
        titulos: ['Objetos'],
        grid: [
            {index: 'c_dato', width: 400}
        ],
        caption: 'Lista de Objetos',
        filtros: ['#c_tributo', '#d_objeto_hecho'],
        filtrosTitulos:['Tributo', 'Objeto Hecho'],
        filtrosNulos:[false,true],
        campos: {c_dato: 'd_objeto_hecho'},
        keyNav: true
    });

    $('#btn_limpiar').click(function(){
        $('#frm_consulta :input').val(null);
        $('#d_objeto_hecho').attr('readonly', true);

        if($('#check_cta_cte').is(':checked')){
            $('#check_cta_cte').prop("checked", false);
        }

        if($('#check_temporal').is(':checked')){
            $('#check_temporal').prop("checked", false);
        }
    });

    $('#btn_bonificar').click(function () {
        mostrar_cuadro('C',
            'Advertencia',
            '¿Desea continuar?',
            function () {
            fun_aplicar_bonificacion();
        });
    });
}