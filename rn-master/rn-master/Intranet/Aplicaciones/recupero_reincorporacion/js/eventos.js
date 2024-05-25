function init_eventos() {

    if(p_tributo == c_tributo_automotor || p_tributo == c_tributo_inmobiliario){
        $("#btn_actividades").attr("disabled", "true");
    }

    $('#n_cuit').mask('99-99999999-9');
    $("#n_documento").mask("999999999");

    $('#n_cuit').change(function(){
        if ($('#n_cuit').val() && $('#n_cuit').val().length == 13) {
            $('#main').procOverlay({visible: true});
            $.ajax({
                url: "recupero_reincorporacion/php/consultas_ajax.php",
                type: "POST",
                dataType: 'JSON',
                data: {p_oper: 'cuit', filtro: limpia_cuit($('#n_cuit').val())},
                success: function (response) {
                    $('#main').procOverlay({visible: false});
                    if (response) {
                        $("#d_denominacion").val(response['DENOMINACION']);
                        $("#id_contribuyente").val(response['ID_CONTRIBUYENTE']);
                        $("#c_tipo_documento").val(response['C_TIPO_DOCUMENTO']);
                        $("#d_tipo_documento").val(response['D_TIPO_DOCUMENTO']);
                        $("#n_documento").val(response['N_DOCUMENTO']);
                    }else {
                        mostrar_validacion('El contribuyente ingresado no existe');
                        $("#d_denominacion").val(null);
                        $("#id_contribuyente").val(null);
                        $("#c_tipo_documento").val(null);
                        $("#d_tipo_documento").val(null);
                        $("#n_documento").val(null);
                    }
                }
            });
        } else {
            $("#d_denominacion").val(null);
            $("#id_contribuyente").val(null);
            $("#c_tipo_documento").val(null);
            $("#d_tipo_documento").val(null);
            $("#n_documento").val(null);
        }
    });

    $('#n_documento').change(function () {
        if ($("#c_tipo_documento").val() && $('#n_documento').val() && !$('#id_contribuyente').val()) {
            $('#main').procOverlay({visible: true});
            $.ajax({
                url: "recupero_reincorporacion/php/consultas_ajax.php",
                type: "POST",
                dataType: 'json',
                data: {p_oper: 'dni', filtro: $('#n_documento').val().split('.').join("")},
                success: function (response) {
                    $('#main').procOverlay({visible: false});
                    if (response) {
                        $('#n_cuit').val(response['CUIT']);
                        $("#d_denominacion").val(response['DENOMINACION']);
                        $("#id_contribuyente").val(response['ID_CONTRIBUYENTE']);
                        $("#c_tipo_documento").val(response['C_TIPO_DOCUMENTO']);
                        $("#d_tipo_documento").val(response['D_TIPO_DOCUMENTO']);
                        $("#n_documento").val(response['N_DOCUMENTO']);
                    }else{
                        mostrar_validacion('El contribuyente ingresado no existe');
                        $("#n_cuit").val(null);
                        $("#d_denominacion").val(null);
                        $("#id_contribuyente").val(null);
                        $("#c_tipo_documento").val(null);
                        $("#d_tipo_documento").val(null);
                        $("#n_documento").val(null);
                    }
                }
            });
        } else {
            $("#n_cuit").val(null);
            $("#d_denominacion").val(null);
            $("#id_contribuyente").val(null);
            $("#c_tipo_documento").val(null);
            $("#d_tipo_documento").val(null);
            $("#n_documento").val(null);
        }
    });

    $('#d_verif_dom, #d_verif_dom_ant').keydown(function(event){
        entero_con_n_digitos(event, this, 1)
    });

    $('.alfanumerico').keypress(function (tecla) {
        return (tecla.charCode >= 48 && tecla.charCode <= 57) || (tecla.charCode >= 65 && tecla.charCode <= 90) || (tecla.charCode >= 97 && tecla.charCode <= 122);
    });

    $("#d_denominacion").autocomplete({
        source: function( request, response ) {

            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "recupero_reincorporacion/php/autocomplete.php",
                    data: {p_oper:'getAutocomplete',p_filtro: request.term},
                    dataType: 'json',
                    success: function( data ) {
                        ajax_autocomplete = null;
                        if(data) {
                            response(
                                $.map(data.data_contrib, function( item ) {
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
        minLength:1,
        select:function(event,ui){
            $("#d_denominacion").val(ui.item.value);
            $("#n_cuit").val(ui.item.cuit);
            $("#id_contribuyente").val(ui.item.id_contribuyente);
            $('#c_tipo_documento').val(ui.item.c_tipo_documento);
            $('#d_tipo_documento').val(ui.item.d_tipo_documento);
            $('#n_documento').val(ui.item.n_documento);
            return false;
        },
    });

    $('#d_denominacion').change(function(){
        if (!$("#d_denominacion").val()){
            $("#n_cuit").val(null);
            $("#id_contribuyente").val(null);
            $("#c_tipo_documento").val(null);
            $("#d_tipo_documento").val(null);
            $("#n_documento").val(null);
        }
    });

    $('#btn_limpiar').click(function () {
        $('input').val('');
        $('#tributos_grid, #conceptos_grid').jqGrid('clearGridData');
        $('#modal_reincorporacion').modal('hide');
        $('#modal_contribuyente').modal('hide');
        $('#modal_codigo_automotor').modal('hide');
        $('#btn_reincorporacion').attr('disabled',true);
    });

    $('#btn_buscar').click(function () {

        if($("#n_cuit").val() == ''){
            if($("#c_tipo_documento").val() == '' || $("#n_documento").val() == ''){
                if(p_tributo == c_tributo_automotor){
                    if($("#d_patente").val() == '' && $("#d_patente_vieja").val() == ''){
                        mostrar_error('Debe ingresar al menos uno de los siguientes criterios de búsqueda: Nro de CUIT, Tipo y Nro. de Documento, ó Dominio/Dominio Anterior');
                        return;
                    }
                } else mostrar_error('Debe ingresar los siguientes criterios de búsqueda: Nro de CUIT, Tipo y Nro. de Documento');
            }
        }

        if(p_tributo == c_tributo_automotor){
            if ($('#d_patente').val() == "" && $('#d_patente_vieja').val() == ""){
                mostrar_error('El campo Dominio/Dominio Anterior no puede quedar vacío.'); return;
            }
            if ($('#d_patente').val() != ""){
                if ($('#d_verif_dom').val() == ''){
                    mostrar_error('Ingrese el dígito verificador.'); return;
                } else check_digito_verificador($('#d_patente').val(), $('#d_verif_dom').val());
            }
            else if ($('#d_patente_vieja').val() != ""){
                if ($('#d_verif_dom_ant').val() == ''){
                    mostrar_error('Ingrese el dígito verificador.'); return;
                } else {
                    check_digito_verificador($('#d_patente_vieja').val(), $('#d_verif_dom_ant').val());
                }
            }
        }
        else {
            cargar_datos_contribuyente();
            valor_tipo_imponible();
            setea_parametros('#tributos_grid',
                {':p_c_tributo': p_tributo, ':p_d_patente': null,
                    ':id_contribuyente': $('#id_contribuyente').val(), ':c_tipo_imponible': $('#c_tipo_imponible').val(),
                    ':d_objeto_hecho': null});
        }


    });

    $('#btn_datos_grales').click(function () {
        if ($('#tributos_grid').jqGrid('getGridParam','records') === 0){
            mostrar_validacion('Debe realzar una búsqueda primero.');
        }else {
            post_to_url2('contribuyentes.php', {
                'p_n_id_menu': 10880, 'p_consulta': 'S',
                'cuit': $('#n_cuit').val()
            }, '_blank');
        }
    });

    $('#btn_dom_tel').click(function () {
        if ($('#tributos_grid').jqGrid('getGridParam','records') === 0){
            mostrar_validacion('Debe realzar una búsqueda primero.');
        }else{
            post_to_url2('contribuyentes.php', {
                'p_n_id_menu': 10881, 'p_consulta': 'S',
                'cuit': $('#n_cuit').val()
            }, '_blank');
        }

    });

    $('#btn_actividades').click(function () {
        post_to_url2('abm_act_tit_com.php', {
            'p_n_id_menu': 10866,
            'p_m_autoquery': 'N',
        }, '_blank');
    });

    $('#btn_reincorporacion').click(function(){
        if (!$("#tributos_grid").getGridParam('selrow')){
            mostrar_error('Seleccione un registro de la grilla de Tributos para realizar la Reincorporación.')
        } else {
            lupas_modal_reincorporo();
            $("#modal_reincorporacion").modal('show');
        }
    });

    //////////////////////////////////////////// EVENTOS MODALS /////////////////////////////////////////////////

    // Eventos: modal_reincorporacion

    $('#btn_grabar').click(function () {
        mostrar_cuadro('V', 'Atención', 'Usted reincorporará este objeto<br>¿Desea continuar?',
            function () {
                validaciones_grales();
            }, function () {return;});
    });

    $('#lupa_fmcamod').click(function () {
        lupas_modal_codigo_automotor();
        $("#modal_codigo_automotor").modal('show');
    });

    $('#btn_otro_contrib').click(function () {
        lupas_modal_contribuyente();
        $("#modal_contribuyente").modal('show');
    });

    $('#btn_cod_aut').click(function () {
        if ($('#frm_codigo').validationEngine('validate')){
            cargar_datos_mtm();
        }
    });

    // Eventos: modal_contribuyente
    $('#n_cuit_otro_cont').mask('99-99999999-9');

    $('#d_denominacion_otro_cont').autocomplete({
        source: function( request, response ) {

            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "recupero_reincorporacion/php/autocomplete.php",
                    data: {p_oper:'getCont2',p_filtro: request.term,p_id_contrib: $('#frm_busqueda #id_contribuyente').val()},
                    dataType: 'json',
                    success: function( data ) {
                        ajax_autocomplete = null;
                        if(data) {
                            response(
                                $.map(data.data_contrib, function( item ) {
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
        minLength:1,
        select:function(event,ui){
            $("#d_denominacion_otro_cont").val(ui.item.value);
            $("#n_cuit_otro_cont").val(ui.item.cuit);
            $("#id_otro_contribuyente").val(ui.item.id_contribuyente);
            $('#c_tipo_documento_otro_cont').val(ui.item.c_tipo_documento);
            $('#d_tipo_documento_otro_cont').val(ui.item.d_tipo_documento);
            $('#n_documento_otro_cont').val(ui.item.n_documento);
            return false;
        },
    });

    $('#n_cuit_otro_cont').change(function(){
        if ($('#n_cuit_otro_cont').val() && $('#n_cuit_otro_cont').val().length == 13) {
            $('#main').procOverlay({visible: true});
            $.ajax({
                url: "recupero_reincorporacion/php/consultas_ajax.php",
                type: "POST",
                dataType: 'JSON',
                data: {p_oper: 'cuit', filtro: limpia_cuit($('#n_cuit_otro_cont').val())},
                success: function (response) {
                    $('#main').procOverlay({visible: false});
                    if (response) {
                        $("#d_denominacion_otro_cont").val(response['DENOMINACION']);
                        $("#id_otro_contribuyente").val(response['ID_CONTRIBUYENTE']);
                        $("#c_tipo_documento_otro_cont").val(response['C_TIPO_DOCUMENTO']);
                        $("#d_tipo_documento_otro_cont").val(response['D_TIPO_DOCUMENTO']);
                        $("#n_documento_otro_cont").val(response['N_DOCUMENTO']);
                    }else{
                        mostrar_validacion('El contribuyente ingresado no existe.');
                        $("#d_denominacion_otro_cont").val(null);
                        $("#id_otro_contribuyente").val(null);
                        $("#c_tipo_documento_otro_cont").val(null);
                        $("#d_tipo_documento_otro_cont").val(null);
                        $("#n_documento_otro_cont").val(null);
                    }
                }
            });
        } else {
            $("#d_denominacion_otro_cont").val(null);
            $("#id_otro_contribuyente").val(null);
            $("#c_tipo_documento_otro_cont").val(null);
            $("#d_tipo_documento_otro_cont").val(null);
            $("#n_documento_otro_cont").val(null);
        }
    });

    $('#n_documento_otro_cont').change(function () {
        if ($("#c_tipo_documento_otro_cont").val() && $('#n_documento_otro_cont').val() && !$('#id_otro_contribuyente').val()) {
            $('#main').procOverlay({visible: true});
            $.ajax({
                url: "recupero_reincorporacion/php/consultas_ajax.php",
                type: "POST",
                dataType: 'json',
                data: {p_oper: 'dni', filtro: $('#n_documento_otro_cont').val().split('.').join("")},
                success: function (response) {
                    $('#main').procOverlay({visible: false});
                    if (response) {
                        $('#n_cuit_otro_cont').val(response['CUIT']);
                        $("#d_denominacion_otro_cont").val(response['DENOMINACION']);
                        $("#id_otro_contribuyente").val(response['ID_CONTRIBUYENTE']);
                        $("#c_tipo_documento_otro_cont").val(response['C_TIPO_DOCUMENTO']);
                        $("#d_tipo_documento_otro_cont").val(response['D_TIPO_DOCUMENTO']);
                        $("#n_documento_otro_cont").val(response['N_DOCUMENTO']);
                    }else{
                        mostrar_validacion('El contribuyente ingresado no existe.');
                        $("#n_cuit_otro_cont").val(null);
                        $("#d_denominacion_otro_cont").val(null);
                        $("#id_otro_contribuyente").val(null);
                        $("#c_tipo_documento_otro_cont").val(null);
                        $("#d_tipo_documento_otro_cont").val(null);
                        $("#n_documento_otro_cont").val(null);
                    }
                }
            });
        } else {
            $("#n_cuit_otro_cont").val(null);
            $("#d_denominacion_otro_cont").val(null);
            $("#id_otro_contribuyente").val(null);
            $("#c_tipo_documento_otro_cont").val(null);
            $("#d_tipo_documento_otro_cont").val(null);
            $("#n_documento_otro_cont").val(null);
        }
    });

    $('#btn_con_cuit').click(function () {
        post_to_url2('contribuyentes.php', {
            'p_n_id_menu': 10865,
            'p_m_autoquery': 'N',
            'p_sintributo': 'S'
        }, '_blank');
    });

    $('#btn_sin_cuit').click(function () {
        post_to_url2('contribuyentes_st.php', {
            'p_n_id_menu': 10875,
            'p_m_autoquery': 'N'
        }, '_blank');
    });

    $('#btn_legajo_contribuyente').click(function () {
        if ($('#frm_contrib #id_otro_contribuyente').val()){
            post_to_url2('legajo_contribuyente.php', {
                'p_n_id_menu': 10886,
                'p_m_autoquery': 'N',
                'p_id_contribuyente': $('#frm_contrib #id_otro_contribuyente').val()
            }, '_blank');
        }else{
            mostrar_validacion('Debe ingresar un contribuyente primero.');
        }
    });
}