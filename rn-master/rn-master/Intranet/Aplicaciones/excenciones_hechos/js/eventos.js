function inicializarEventos() {
    $('#n_cuit').mask('99-99999999-9');
    $("#n_documento").mask("999999999");
    $('.numero').keypress(function (tecla) {
        return (tecla.charCode >= 48 && tecla.charCode <= 57);
    });
    //Completamos Datos del Contribuyente
    $('#n_cuit').change(function () {
        if ($('#n_cuit').val() && $('#n_cuit').val().length == 13) {
            completarDenominacion();
        } else {
            $("#d_denominacion").val(null);
            //$("#n_cuit").val(null);
            $("#id_contribuyente").val(null);
        }
    });

    $('#n_documento').change(function () {
        if (!$('#id_contribuyente').val() && $('#c_tipo_documento').val() && $('#n_documento').val()) {
            fun_ajax_documento();
        }
    });

    $("#d_denominacion").autocomplete({
        source: function (request, response) {

            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type: 'POST',
                    url: "excenciones_hechos/php/autocomplete.php",
                    data: { p_oper: 'getAutocomplete', p_filtro: request.term },
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
            $('#c_tipo_documento').val(ui.item.c_tipo_documento);
            $('#d_tipo_documento').val(ui.item.d_tipo_documento);
            $('#n_documento').val(ui.item.n_documento);
            return false;
        }
    });

    $(".datepicker").datepicker({
        changeMonth:true,
        changeYear:true,
        dateFormat:'dd/mm/yy',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá']
    }).mask('99/99/9999').change(function () {
        if ($(this).val().length > 0 && $(this).val().length != 10){
            mostrar_error("El Formato de la Fecha ingresada no es válido.");
            $(this).val(null);
        }
    });

    $('#btn_buscar').click(function () {
        if (modo == 'C') {

            /*
            if (!$('#frm_consulta').validationEngine('validate')) {
                return;
            }

            if (!$('#id_contribuyente').val() || !$('#n_cuit').val()) {
                mostrar_cuadro('V', 'Atención', 'El campo CUIT es obligatorio.', null, null, 400);
                return;
            }
            */

            setea_parametros('#main_grid', {
                ':p_id_contrib': $('#id_contribuyente').val(),
                ':p_c_trib': $('#c_tributo').val(),
                ':p_objeto': $('#d_objeto_hecho').val()
            });

        }else{
            if (!$('#c_tipo_imponible').val() || !$('#c_tributo').val()) {
                mostrar_cuadro('V', 'Atención', 'Los campos Tipo Imponible y Tributo no pueden quedar vacíos.', null, null, 400);
                return;
            }

            if ($('#c_tributo').val() == 90) {
                if (!$('#d_objeto_hecho').val()) {
                    mostrar_cuadro('V', 'Atención', 'El campo Objeto/Hecho no puede quedar vacío.', null, null, 400);
                    return;
                } else if (!$('#n_digito').val()) {
                    mostrar_cuadro('V', 'Atención', 'El campo Dígito Verificador no puede quedar vacío.', null, null, 400);
                    return;
                }

                $('#main').procOverlay({ visible: true });

                $.ajax({
                    url: "excenciones_hechos/php/funciones.php",
                    type: "POST",
                    data: { p_oper: 'checkDigito', p_objeto_hecho: $('#d_objeto_hecho').val() },
                    success: function (response) {
                        $('#main').procOverlay({ visible: false });
                        res = JSON.parse(response);
                        if (res) {
                            if (res['DIGITO'] != $('#n_digito').val()) {
                                mostrar_cuadro('V', 'Atención', 'El Dígito Verificador no es correcto.', null, null, 400);
                                return;
                            } else {
                                setea_parametros('#main_grid', {
                                    ':p_id_contrib': $('#id_contribuyente').val(),
                                    ':p_c_trib': $('#c_tributo').val(),
                                    ':p_objeto': $('#d_objeto_hecho').val()
                                });
                            }
                        } else {
                            mostrar_cuadro('V', 'Atención', 'Ocurrió un error al comprobar el Digito Verificador.', null, null, 400);
                        }
                    }
                });
            } else {
                setea_parametros('#main_grid', {
                    ':p_id_contrib': $('#id_contribuyente').val(),
                    ':p_c_trib': $('#c_tributo').val(),
                    ':p_objeto': $('#d_objeto_hecho').val()
                });
            }
        }
    });

    $('#btn_limpiar').click(function () {
        $('#frm_consulta :input').val(null).validationEngine('hideAll');
        $('#d_objeto_hecho, #n_digito').attr('disabled', true).removeClass('validate[required]');
        $('#datos_panel, #frm_datos_inmo, #frm_datos_auto').hide();
        $('#main_grid, #exenciones_grid').jqGrid('clearGridData');
        id_contrib = null;
        objeto_hecho = null;
        c_tipo_imponible = null;
        c_tributo = null;
        f_vig_desde_obj = null;
        f_vig_hasta_obj = null;
        f_cese_prov_obj = null;
    });

    $('#btn_cert_aut').click(function () {
        var id = $("#exenciones_grid").getGridParam('selrow');
        if (id) {
            var c_exen = parse($('#exenciones_grid').getCell(id, 'c_exencion')); 
            if (c_exen != 18 && c_exen != 25){
                llamar_report('EXENL_002', 'p_id_exencion|' + $('#exenciones_grid').getCell(id, 'id_exencion_obj'), 'PDF');
            }else{
                mostrar_validacion('No corresponde emitir certificado.');    
            }
        }else {
            mostrar_validacion('Debe seleccionar una Exención de la grilla.');
        }
    });

    $('#btn_imp_resu').click(function () {
        var id = $("#exenciones_grid").getGridParam('selrow');
        if (id) {
            if ($('#exenciones_grid').getCell(id, 'c_rdf_resolucion')){
                /* llamar_report('', 'p_id_exencion_obj|' + $('#exenciones_grid').getCell(id, 'id_exencion_obj')+
                '&p_d_expediente|' + $('#exenciones_grid').getCell(id, 'd_expediente'), 'PDF'); */
                mostrar_mensaje('Imprimir Resolución','Las resoluciones deben emitirse por el GDE.');
            }else{
                mostrar_validacion('No corresponde emitir Resolución.');    
            }
        }else {
            mostrar_validacion('Debe seleccionar una Exención de la grilla.');
        }
    });

    
}