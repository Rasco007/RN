function inicializar_eventos(){
    $("#lupa_boleta").lupa_generica({
        id_lista: id_lista,
        titulos: ['Nro. Boleta', 'Cod. Expediente', 'n_cuit', 'd_denominacion', 'Cod. Tributo', 'd_tributo', 'Objeto/Hecho'],
        grid: [
            {index: 'id_boleta_deuda', width: 150},
            {index: 'c_expediente', width: 150},
            {index: 'n_cuit', hidden: true},
            {index: 'd_denominacion', hidden: true},
            {index: 'c_tributo', width: 100},
            {index: 'd_tributo', hidden: true},
            {index: 'd_objeto_hecho', width: 150}
        ],
        filtroNull: true,
        filtros: ['#n_boleta', '#n_expte', '#c_tributo', '#n_objeto'],
        caption: 'Lista de Boletas',
        campos: {id_boleta_deuda: 'n_boleta', c_expediente: 'n_expte', c_tributo: 'c_tributo', d_tributo: 'd_tributo', d_objeto_hecho: 'n_objeto'},
        keyNav: true,
        onClose(){
            if($('#c_tributo').val() != '') {
                $('#c_tributo').attr('readonly', true);
            } else {
                $('#c_tributo').attr('readonly', false);
            }
        }
    });

    $("#lupa_expte").lupa_generica({
        id_lista: id_lista,
        titulos: ['Nro. Boleta', 'Cod. Expediente', 'n_cuit', 'd_denominacion', 'Cod. Tributo', 'd_tributo', 'Objeto/Hecho'],
        grid: [
            {index: 'id_boleta_deuda', width: 150},
            {index: 'c_expediente', width: 150},
            {index: 'n_cuit', hidden: true},
            {index: 'd_denominacion', hidden: true},
            {index: 'c_tributo', width: 100},
            {index: 'd_tributo', hidden: true},
            {index: 'd_objeto_hecho', width: 150}
        ],
        filtroNull: true,
        filtros: ['#n_boleta', '#n_expte', '#c_tributo', '#n_objeto'],
        caption: 'Lista de Expedientes',
        campos: {id_boleta_deuda: 'n_boleta', c_expediente: 'n_expte', c_tributo: 'c_tributo', d_tributo: 'd_tributo', d_objeto_hecho: 'n_objeto'},
        keyNav: true,
        onClose(){
            if($('#c_tributo').val() != '') {
                $('#c_tributo').attr('readonly', true);
            } else {
                $('#c_tributo').attr('readonly', false);
            }
        }
    });

    $("#lupa_tributo").lupa_generica({
        id_lista: id_lista,
        titulos: ['Nro. Boleta', 'Cod. Expediente', 'n_cuit', 'd_denominacion', 'Cod. Tributo', 'd_tributo', 'Objeto/Hecho'],
        grid: [
            {index: 'id_boleta_deuda', width: 150},
            {index: 'c_expediente', width: 150},
            {index: 'n_cuit', hidden: true},
            {index: 'd_denominacion', hidden: true},
            {index: 'c_tributo', width: 100},
            {index: 'd_tributo', hidden: true},
            {index: 'd_objeto_hecho', width: 150}
        ],
        filtroNull: true,
        filtros: ['#n_boleta', '#n_expte', '#c_tributo', '#n_objeto'],
        caption: 'Lista de Tributos',
        searchCode: true,
        searchInput: '#c_tributo',
        exactField: 'c_tributo',
        campos: {id_boleta_deuda: 'n_boleta', c_expediente: 'n_expte', c_tributo: 'c_tributo', d_tributo: 'd_tributo', d_objeto_hecho: 'n_objeto'},
        keyNav: true,
        onClose(){
            if($('#c_tributo').val() != '') {
                $('#c_tributo').attr('readonly', true);
            } else {
                $('#c_tributo').attr('readonly', false);
            }
        }
    });

    $("#lupa_objeto").lupa_generica({
        id_lista: id_lista,
        titulos: ['Nro. Boleta', 'Cod. Expediente', 'n_cuit', 'd_denominacion', 'Cod. Tributo', 'd_tributo', 'Objeto/Hecho'],
        grid: [
            {index: 'id_boleta_deuda', width: 150},
            {index: 'c_expediente', width: 150},
            {index: 'n_cuit', hidden: true},
            {index: 'd_denominacion', hidden: true},
            {index: 'c_tributo', width: 100},
            {index: 'd_tributo', hidden: true},
            {index: 'd_objeto_hecho', width: 150}
        ],
        filtroNull: true,
        filtros: ['#n_boleta', '#n_expte', '#c_tributo', '#n_objeto'],
        caption: 'Lista de Objetos',
        campos: {id_boleta_deuda: 'n_boleta', c_expediente: 'n_expte', c_tributo: 'c_tributo', d_tributo: 'd_tributo', d_objeto_hecho: 'n_objeto'},
        keyNav: true,
        onClose(){
            if($('#c_tributo').val() != '') {
                $('#c_tributo').attr('readonly', true);
            } else {
                $('#c_tributo').attr('readonly', false);
            }
        }
    });

    $('#btn_buscar').click(function () {
        setea_parametros('#main_grid',{':p_id_boleta_deuda': $('#n_boleta').val(), ':p_c_expediente': $('#n_expte').val(),
                                                         ':p_c_tributo': $('#c_tributo').val(), ':p_d_objeto': $('#n_objeto').val()});
        filtros_no_nativos_ar['main_grid'] = [];
        if($('#n_boleta').val() != ''){
            filtros_no_nativos_ar['main_grid'].push('Nro. Boleta: ' + $('#n_boleta').val());
        }
        if($('#n_expte').val() != ''){
            filtros_no_nativos_ar['main_grid'].push('Nro. Expediente: ' + $('#n_expte').val());
        }
        if($('#d_tributo').val() != ''){
            filtros_no_nativos_ar['main_grid'].push('Tributo: ' + $('#d_tributo').val());
        }
        if($('#n_objeto').val() != ''){
            filtros_no_nativos_ar['main_grid'].push('Objeto: ' + $('#n_objeto').val());
        }
    });

    $('#btn_limpiar').click(function () {
        $("#main_grid").jqGrid("clearGridData");
        $("#detail_grid").jqGrid("clearGridData");
        $('#c_tributo').attr('readonly', false);
        $('#frm_consulta :input').val(null);
        filtros_no_nativos_ar['main_grid'] = [];
    });
}