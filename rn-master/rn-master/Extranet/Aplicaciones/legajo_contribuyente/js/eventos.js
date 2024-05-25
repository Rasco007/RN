function init_eventos() {

    $("#n_cuit").mask("99-99999999-9");
    $("#n_documento").mask("99999999999");

    $('#btn_continuar').click(function () {
        if ($('#frm_busqueda').validationEngine('validate')) {
            $('#frm_busqueda').validationEngine('hideAll');
            $('#bloque_consultas').show();
            $('#btn_continuar').prop('disabled', true);
            $(".limpiar").attr('disabled', true);
            $('#frm_busqueda .btn_lupa').hide();
        }
    });

    $('#btn_limpiar').click(function () {
        $('#bloque_consultas').hide();
        $('#btn_continuar').prop('disabled', false);
        $(".limpiar").attr('disabled', false).val(null);
        $('#frm_busqueda .btn_lupa').show();
        //limpiar_busqueda();
    });

    // ACCORDION
    $("#accordion").accordion({
        icons: {
            header: "ui-icon-circle-triangle-e",
            activeHeader: "ui-icon-circle-triangle-s"
        },
        heightStyle: "content",
        collapsible: true,
        active: false
    });
    // FIN ACCORDION

    /////////////////////////////////// Eventos de botones/cartas ///////////////////////////////////
    $('#card_cons_contrib').click(function () {
        cons_contrib();
    });

    $('#card_inmuebles').click(function () {
        cons_inmuebles();
    });

    $('#card_automotor').click(function () {
        cons_automotor();
    });

    $('#card_ddjj').click(function () {
        // cons_ddjj();
    });

    $('#card_ddjj_pendientes').click(function () {
        // cons_ddjj_pendientes();
    });

    $('#card_ddjj_ret_perc').click(function () {
        // cons_ddjj_ret_perc();
    });

    $('#card_ddjj_pend_agentes').click(function () {
        // cons_ddjj_pend_agentes();
    });

    $('#card_dj_no_pres').click(function () {
        cons_dj_no_pres();
    });

    $('#card_ddjj_no_pagadas').click(function(){
        cons_ddjj_no_pagadas();
    });
    $('#btn_volver_ddjj_no_pagadas').click(function (){
        $("#d_descrip").val('');
        $("#d_concepto").val('');
        $('#chk_intimacion').prop('checked',false);
        $('#chk_boleta_deuda').prop('checked',false);
        $('#chk_gestion_judicial').prop('checked',false);
    });

    $('#card_cta_cte').click(function () {
        cons_cta_cte();
    });

    $('#card_pagos_pendientes').click(function () {
        // cons_pagos_pendientes();
    });

    $('#card_planes_de_pago').click(function () {
        // cons_planes_de_pago();
    });

    $('#card_inmuebles_no_pagados').click(function () {
        cons_inmuebles_no_pagados();
    });
    $('#btn_volver_inmuebles_no_pagados').click(function () {
        $('#form_inmuebles_no_pagados #d_tributo').val('');
        $('#form_inmuebles_no_pagados #d_concepto').val('');
        $('#form_inmuebles_no_pagados #chk_intimacion').prop('checked',false);
        $('#form_inmuebles_no_pagados #chk_boleta_deuda').prop('checked',false);
        $('#form_inmuebles_no_pagados #chk_gestion_judicial').prop('checked',false);
    });

    $('#card_pagos_acred').click(function () {
        // cons_pagos_acred();
    });

    $('#card_instancias').click(function () {
        cons_instancias();
    });
    
    $('#card_inspecciones').click(function () {
        // cons_inspecciones();
    });

    $('#card_excenciones_hechos').click(function () {
        cons_excenciones_hechos();
    });

    $('#card_excenciones_objetos').click(function () {
        cons_excenciones_objetos();
    });

    $('#card_instrumentos_sellos').click(function () {
        // cons_instrumentos_sellos();
    });
    /////////////////////////////////// Eventos de botones/cartas ///////////////////////////////////
}