function init_eventos() {

    $("#tabs").tabs().hide();
    $("#div_datos_generales").hide();
    $("#tabs > ul > li").hover(function () {
        $(window).resize();
    });
    $("#tabs > ul > li").click(function () {
        $(window).resize();
    });

    $("#n_cuit").mask("99-99999999-9");
    $("#n_documento").mask("99999999999");
    $("#d_denominacion").autocomplete({
        source: function (request, response) {
            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type: 'POST',
                    url: "cons_inmuebles/php/autocomplete.php",
                    data: {p_oper: 'denominacion', filtro: request.term},
                    dataType: 'json',
                    success: function (data) {
                        ajax_autocomplete = null;
                        if (data) {
                            response(
                                $.map(data.data_contrib, function (item) {
                                    return {
                                        label: item.label,
                                        value: item.razon_social,
                                        cuit: item.cuit,
                                        id_contribuyente: item.id_contribuyente,
                                        c_tipo_documento: item.c_tipo_documento,
                                        d_tipo_documento: item.d_tipo_documento,
                                        n_documento: item.n_documento
                                    }
                                })
                            );
                        }
                    }
                });
        },
        minLength: 1,
        select: function (event, ui) {
            $("#d_denominacion").val(ui.item.value);
            $("#n_cuit").val(ui.item.cuit);
            $("#id_contribuyente").val(ui.item.id_contribuyente);
            $("#c_tipo_documento").val(ui.item.c_tipo_documento);
            $("#d_tipo_documento").val(ui.item.d_tipo_documento);
            $("#n_documento").val(ui.item.n_documento);
            return false;
        }
    });

    $('#d_partida', "#frm_busqueda").change(function () {
        n_partida_focusout();
    });

    $('#n_cuit', "#frm_busqueda").change(function () {
        if ($('#n_cuit',"#frm_busqueda").val() && $('#n_cuit',"#frm_busqueda").val().length == 13) {
            $("#n_cuit, #c_tipo_documento, #n_documento, #d_denominacion", "#frm_busqueda").attr('readonly', true);
            $("#lupa_c_tipo_documento").hide();
            n_cuit_focusout();
        }
    });
    $('#n_documento', "#frm_busqueda").change(function () {
        if ($('#c_tipo_documento',"#frm_busqueda").val() && $('#d_tipo_documento',"#frm_busqueda").val() && ($('#n_documento',"#frm_busqueda").val().length == 8 || $('#n_documento',"#frm_busqueda").val().length == 7) ) {
            $("#n_cuit, #c_tipo_documento, #n_documento, #d_denominacion", "#frm_busqueda").attr('readonly', true);
            $("#lupa_c_tipo_documento").hide();
            n_documento_focusout();
        }
    });

    // ------------------------- BOTONES -----------------------------------
    // BOTONES FORMULARIO
    $("#btn_mostrar").click(function () {
        if ($('#id_contribuyente',"#frm_busqueda").val() || $('#d_partida',"#frm_busqueda").val() || $('#c_tipo_documento',"#frm_busqueda").val()){
            //$('#div_datos_generales').show();
            $("#frm_busqueda input").attr('disabled', true).prop('placeholder','');
            $('#frm_busqueda .btn_lupa').hide();
            cons_datos_generales();
        }
        else mostrar_error('Debe completar alguno de estos campos: * CUIT * Tipo y Nro. de Documento * Nomenclatura * Partida.');
    });
    $('#btn_limpiar').click(function () {
        limpiar_form();
    });
/* // FUNCIONALIDAD BOTONES AUDITORIAS E IRC COMENTADAS PORQUE EN EL FORM ESTÁN PERO NO SE USAN NI SE MUESTRAN
    $('#btn_audit_inm').click(function () {
        mostrar_validacion('En construcción - INMC035')
    });
    $('#btn_audit_val').click(function () {
        mostrar_validacion('En construcción - INMC036')
    });
    $('#btn_datos_irc').click(function () {
        if ($('#d_partida',"#frm_busqueda").val()){
            cons_datos_irc();
        }
        else mostrar_error('Debe ingresar una partida.');
    });
*/
    $('#btn_mov').click(function () {
        if ($('#d_partida',"#frm_busqueda").val() || $('#datos_generales_grid').getCell($('#datos_generales_grid').getGridParam('selrow'),'d_nomenclatura')){
            cons_movimientos();
        }
        else mostrar_error('Debe seleccionar una fila de la tabla.');
    });

    // BOTONES TABLA PPAL (DATOS GENERALES)
    $('#btn_partidas_madre').click(function () {
        cons_partidas_madre();
    });
    /* ----- COMENTADO PORQUE EN EL FORM ESTA LA FUNCIONALIDAD PERO NO SE USAN. LOS REPORTES NO EXISTEN
    $('#btn_completo').click(function () {
        mostrar_validacion('En construcción - Reporte INML011')
    });
    $('#btn_puntual').click(function () {
        mostrar_validacion('En construcción - Reporte INMR009')
    });*/
    $('#btn_cargar_tabs').click(function () {
        if($('#datos_generales_grid').getGridParam('selrow') == null){
            mostrar_error('Debe seleccionar una fila de la tabla');
        }
        else{
            $('#tabs').css('display', 'block').tabs('refresh');
            cons_valuaciones();
            cons_impuesto();
            cons_prop_1();
            cons_resp_1();
        }
    });

    // BOTONES TABS
        // TAB VALUACIONES
    $('#btn_lista_valu').click(function () {
        imprimir_reporte('INMR_010');
    });
        // TAB IMPUESTO
    $('#btn_lista_val').click(function () {
        imprimir_reporte('INMR_010');
    });
    $('#btn_cta_corr').click(function () {
        //mostrar_validacion('En construcción - CCTEC008')
        let row_datos_gen = $('#datos_generales_grid').getGridParam('selrow');
        let d_nomenc = $('#datos_generales_grid').getCell(row_datos_gen, 'd_nomenclatura');
        let id_contribuyente = $('#datos_generales_grid').getCell($('#datos_generales_grid').getGridParam('selrow'),'id_contribuyente');
        post_to_url2('consulta_cuenta_corr.php', {
                'p_n_id_menu':10852,
                'p_m_autoquery':'S',
                'id_contribuyente': id_contribuyente,
                'c_tipo_imponible':5,
                'c_tributo':60,
                'd_objeto_hecho': d_nomenc},
            '_blank');
    });
    $('#btn_exen').click(function () {
        //mostrar_validacion('En construcción - exena002');
        post_to_url2('excenciones_hechos.php', {
            'p_n_id_menu': 10910,
            'p_modo': 'C',
            'p_m_autoquery': 'S',
            'p_id_contrib': $('#datos_generales_grid').getCell($('#datos_generales_grid').getGridParam('selrow'),'id_contribuyente'),
        }, '_blank');
    });
        // TAB PROPIETARIOS
    $('#btn_prop_vig').click(function () {
        let row_datos_gen = $('#datos_generales_grid').getGridParam('selrow');
        let d_nomenc = $('#datos_generales_grid').getCell(row_datos_gen, 'd_nomenclatura_real');
        post_to_url2('cons_prop_cat_rpi.php', {
                'p_n_id_menu':10959,
                'p_m_autoquery':'S',
                'p_d_nomenclatura': d_nomenc},
            '_blank');
        //mostrar_validacion('En construcción - INMC004');
    });

    $('#btn_leg_cont_prop').click(function(){
        if($('#propietarios_1_grid').getGridParam('selrow') == null){
            mostrar_error('Debe seleccionar una fila de la tabla');
        }
        else{
            let id2_p1 = $('#propietarios_1_grid').getGridParam('selrow');
            post_to_url2('legajo_contribuyente.php', {
                    'p_m_autoquery':'N',
                    'p_n_id_menu':10886,
                    'p_id_contribuyente': $('#propietarios_1_grid').getCell($('#propietarios_1_grid').getGridParam('selrow'),'id_contribuyente'),
                    'p_c_tipo_documento': $('#propietarios_1_grid').getCell(id2_p1, 'c_tipo_documento'),
                    'p_documento': $('#propietarios_1_grid').getCell(id2_p1, 'n_documento'),
                    'cuit': $('#propietarios_1_grid').getCell(id2_p1, 'n_cuit'),
                    'p_denominacion': $('#propietarios_1_grid').getCell(id2_p1, 'd_denominacion')},
                '_blank');
        }
    });
        // TAB OTROS RESPONSABLES
    $('#btn_leg_cont_resp').click(function(){
        if($('#responsables_1_grid').getGridParam('selrow') == null){
            mostrar_error('Debe seleccionar una fila de la tabla');
        }
        else{
            var id2_r1 = $('#responsables_1_grid').getGridParam('selrow');
            post_to_url2('legajo_contribuyente.php', {
                    'p_m_autoquery':'N',
                    'p_n_id_menu':10886,
                    'p_id_contribuyente': $('#responsables_1_grid').getCell($('#responsables_1_grid').getGridParam('selrow'),'id_contribuyente'),
                    'p_c_tipo_documento': $('#propietarios_1_grid').getCell(id2_r1, 'c_tipo_documento'),
                    'p_documento': $('#responsables_1_grid').getCell(id2_r1, 'n_documento'),
                    'cuit': $('#responsables_1_grid').getCell(id2_r1, 'n_cuit'),
                    'p_denominacion': $('#responsables_1_grid').getCell(id2_r1, 'd_denominacion')},
                '_blank');
        }
    });

    //------------------------ LUPAS ------------------------------

    $("#lupa_c_tipo_documento").lupa_generica({
        id_lista: 10781,
        titulos: ['C&oacute;digo', 'Descripci&oacute;n'],
        grid: [{index: 'c_dato', width: 100},
            {index: 'd_dato', width: 350}],
        caption: 'Tipos de Documento',
        sortname: 'c_dato',
        sortorder: 'asc',
        campos: {c_dato: 'c_tipo_documento', d_dato: 'd_tipo_documento'},
        searchCode: true,
        searchInput: '#c_tipo_documento',
        keyNav: true,
        exactField: 'c_dato'
    });

    $("#lupa_partida").lupa_generica({
        id_lista: 10847,
        titulos: ['Partida', 'Nomenclatura', 'Zona', 'Plano', 'Superficie', 'Vigencia Desde', 'Vigencia Hasta'],
        grid: [{index: 'd_nomenclatura', width: 100},
            {index: 'd_nomenclatura_real', width: 100},
            {index: 'c_zona', width: 100},
            {index: 'd_plano', width: 100},
            {index: 'n_superficie_terr', width: 100},
            {index: 'f_vig_desde', width: 100},
            {index: 'f_vig_hasta', width: 100}],
        caption: 'Partidas',
        campos: {d_nomenclatura: 'd_partida', d_nomenclatura_real: 'd_nomenclatura'},
        filtros: ['#d_partida'],
        filtrosNulos: [true],
        //searchCode: true,
        //searchInput: '#d_partida',
        keyNav: true,
        exactField: 'd_nomenclatura',
        onClose: function () {
            if ($("#d_partida").val()) {
                n_partida_focusout();
            }
        }
    });

    $("#lupa_nomenclatura").lupa_generica({
        id_lista: 10845,
        titulos: ['Nomenclatura', 'Nomenclatura Ant.', 'Partida', 'Zona', 'Plano', 'Superficie', 'Vigencia Desde', 'Vigencia Hasta'],
        grid: [{index: 'd_nomenclatura_real', width: 100},
            {index: 'd_nomenclatura_real_ant', width: 130},
            {index: 'd_nomenclatura', width: 100},
            {index: 'c_zona', width: 100},
            {index: 'd_plano', width: 100},
            {index: 'n_superficie_terr', width: 100},
            {index: 'f_vig_desde', width: 100},
            {index: 'f_vig_hasta', width: 100}],
        caption: 'Nomenclaturas',
        campos: {d_nomenclatura_real: 'd_nomenclatura', d_nomenclatura: 'd_partida'},
        filtrosTitulos:['Nomenclatura'],
        filtros: ['#d_nomenclatura'],
        filtrosNulos: [true],
        //filtroBuscar: $('#d_nomenclatura',"#frm_busqueda").val(),
        //searchCode: true,
        //searchInput: '#d_partida',
        keyNav: true,
        exactField: 'd_nomenclatura_real',
        onClose: function () {
            if ($("#d_nomenclatura").val()) {
                n_partida_focusout();
            }
        }
    });

    // ------------------------- IMPRESIONES REPORTES ---------------------------------

}