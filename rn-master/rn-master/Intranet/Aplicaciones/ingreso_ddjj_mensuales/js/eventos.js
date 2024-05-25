function init_eventos() {

    limpiar_tmp();

    $('#btn_modificar').hide();
    $('#lupa_d_denominacion').hide();
    $('#mascara_lupa_d_objeto_hecho').hide();
    $('#mascara_lupa_c_formulario').hide();
    $('#mascara_lupa_c_origen').hide();
    $('#mascara_lupa_c_concepto').hide();
    $('#mascara_lupa_c_tributo').hide();

    $('#div_main_grid').hide();
    $('#btn_pasaje_tmps').hide();
    $("#n_cuit").mask("99-99999999-9");

    $(".datepicker").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    }).mask('99/99/9999');



    $('#btn_buscar').click(function () {

        $('#btn_limpiar').hide();
        $('#btn_modificar').show();

        v_c_tributo = $("#c_tributo").val();
        v_n_cuit = limpia_cuit($('#n_cuit').val());
        v_c_concepto = $("#c_concepto").val();
        v_d_objeto_hecho = $("#d_objeto_hecho").val();
        v_f_presentacion = $("#f_presentacion").val();
        v_n_remesa = $("#n_remesa").val();
        v_n_cabezal = $("#n_lote").val();
        v_id_contribuyente = $("#id_contribuyente").val();
        v_n_posicion_fiscal = $("#n_posicion_fiscal").val();
        v_n_cuota = $("#n_cuota").val();
        v_c_tipo_form = $("#c_formulario").val();

        if (v_c_tributo === '' || v_c_tipo_form === '' || v_f_presentacion === '' ||
            v_d_objeto_hecho === '' || v_c_concepto === '' || v_n_posicion_fiscal === '' || v_n_cuota === '' || v_n_cuit === '') {
            mostrar_cuadro('E', 'Error', 'Los campos Formulario, Fecha de Presentación, Tributo, Concepto, Número de CUIT, Número de Inscripción, Posición Fiscal y Cuota son obligatorios');
        } else {

            filtros_arr_main.length = 0;
            filtros_no_nativos_ar.length = 0;

            //Grilla
            if ($('#d_formulario').val() != '') filtros_arr_main.push('Formulario: ' + $('#d_formulario').val());
            if ($('#d_origen').val() != '') filtros_arr_main.push('Origen: ' + $('#d_origen').val());
            if ($('#f_presentacion').val() != '') filtros_arr_main.push('F. Presentación: ' + $('#f_presentacion').val());
            if ($('#n_comprobante').val() != '') filtros_arr_main.push('Comprobante: ' + $('#n_comprobante').val());
            if ($('#n_remesa').val() != '') filtros_arr_main.push('Remesa: ' + $('#n_remesa').val());
            if ($('#n_lote').val() != '') filtros_arr_main.push('Lote: ' + $('#n_lote').val());
            if ($('#n_orden').val() != '') filtros_arr_main.push('Orden: ' + $('#n_orden').val());
            if ($('#d_tributo').val() != '') filtros_arr_main.push('Tributo: ' + $('#d_tributo').val());
            if ($('#d_concepto').val() != '') filtros_arr_main.push('Concepto: ' + $('#d_concepto').val());
            if ($('#n_cuit').val() != '') filtros_arr_main.push('Número de CUIT: ' + $('#n_cuit').val());
            if ($('#d_denominacion').val() != '') filtros_arr_main.push('Apellido y Nombre o Razón Social: ' + $('#d_denominacion').val());
            if ($('#d_objeto_hecho').val() != '') filtros_arr_main.push('Número de Inscripción: ' + $('#d_objeto_hecho').val());
            if ($('#n_posicion_fiscal').val() != '') filtros_arr_main.push('Posicion Fiscal: ' + $('#n_posicion_fiscal').val());
            if ($('#n_cuota').val() != '') filtros_arr_main.push('Cuota: ' + $('#n_cuota').val());
            if ($('#n_obligacion').val() != '') filtros_arr_main.push('Número de Obligación: ' + $('#n_obligacion').val());
            if ($('#n_presentacion').val() != '') filtros_arr_main.push('Presentación: ' + $('#n_presentacion').val());

            filtros_no_nativos_ar['main_grid'] = filtros_arr_main;

            bloquearCampos();

            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_id_obligacion": null,
                    "p_n_cuit": v_n_cuit,
                    "p_f_presentacion": v_f_presentacion,
                    "p_n_remito": v_n_remesa,
                    "p_n_cabezal": v_n_cabezal,
                    'p_id_ddjj': null,
                    'p_id_contribuyente': v_id_contribuyente,
                    'p_c_tipo_imponible': null,
                    'p_c_tributo': v_c_tributo,
                    'p_c_concepto': v_c_concepto,
                    'p_d_objeto_hecho': v_d_objeto_hecho,
                    'p_n_posicion_fiscal': v_n_posicion_fiscal,
                    'p_n_cuota': v_n_cuota,
                    'p_c_tipo_form': v_c_tipo_form,
                    'p_n_secuencia_obl': null,
                    'p_n_secuencia_pres': null,
                    'p_cant_reg_formulario': null,
                    'p_d_detalle': null,
                    'p_c_renglon': null,
                    'p_i_bonificacion': null,
                    'p_i_retenciones': null,
                    'p_i_percepciones': null,
                    'p_i_saldos_a_favor': null,
                    'p_m_ult_presentada': null,
                    'p_importe': null,
                    'p_retenciones': null,
                    'p_percepciones': null,
                    'p_saldo_favor': null,
                    'p_otros_debitos': null,
                    'p_otros_creditos_otros': null,
                    'p_l_imp_creditos_este_anticipo': null,
                    'p_c_concepto_mov': null,
                    'p_transaccion_afip': null,
                    'p_i_otrosdebitos': null,
                    "n_orden": 0,
                    "id_menu": v_id_menu
                },
                dataType: 'json',
                success: function (data) {
                    if (data.resultado === 'OK') {
                        if (data.p_id_plan_pago) {
                            mostrar_cuadro('C',
                                'Alerta',
                                'Existe un plan de pago vigente para esta obligación. ¿Desea Continuar?',
                                function () {
                                    mostrar_cuadro('I', 'Info', 'PROCESO EXITOSO');

                                    v_id_ddjj = data.p_id_ddjj;
                                    v_id_obligacion = data.p_id_obligacion;
                                    v_c_tipo_imponible = data.p_c_tipo_imponible;
                                    v_n_secuencia_obl = data.p_n_secuencia_obl;
                                    v_n_secuencia_pres = data.p_n_secuencia_pres;

                                    $('#n_obligacion').val(v_id_obligacion);
                                    if (v_n_secuencia_pres === '0' || v_n_secuencia_pres === 0) {
                                        $('#n_presentacion').val('Original');
                                    } else {
                                        $('#n_presentacion').val(v_n_secuencia_pres + 'º Rectificativa');
                                    }

                                    $('#div_main_grid').show();
                                    $('#btn_pasaje_tmps').show();
                                    $('#btn_buscar').attr('disabled', true);

                                    setea_parametros('#main_grid', {
                                        ':p_c_tipo_form': v_c_tipo_form,
                                        ':p_id_ddjj': data.p_id_ddjj,
                                        ':p_id_contribuyente': v_id_contribuyente,
                                        ':p_c_tributo': $('#c_tributo').val(),
                                        ':p_c_concepto': $('#c_concepto').val(),
                                        ':p_d_objeto_hecho': $('#d_objeto_hecho').val(),
                                        ':p_n_posicion_fiscal': $('#n_posicion_fiscal').val(),
                                        ':p_n_cuota': $('#n_cuota').val(),
                                    });
                                });
                        } else {
                            mostrar_cuadro('I', 'Info', 'PROCESO EXITOSO');

                            v_id_ddjj = data.p_id_ddjj;
                            v_id_obligacion = data.p_id_obligacion;
                            v_c_tipo_imponible = data.p_c_tipo_imponible;
                            v_n_secuencia_obl = data.p_n_secuencia_obl;
                            v_n_secuencia_pres = data.p_n_secuencia_pres;

                            $('#n_obligacion').val(v_id_obligacion);
                            if (v_n_secuencia_pres === '0' || v_n_secuencia_pres === 0) {
                                $('#n_presentacion').val('Original');
                            } else {
                                $('#n_presentacion').val(v_n_secuencia_pres + 'º Rectificativa');
                            }

                            $('#div_main_grid').show();
                            $('#btn_pasaje_tmps').show();
                            $('#btn_buscar').attr('disabled', true);

                            setea_parametros('#main_grid', {
                                ':p_c_tipo_form': v_c_tipo_form,
                                ':p_id_ddjj': data.p_id_ddjj,
                                ':p_id_contribuyente': v_id_contribuyente,
                                ':p_c_tributo': $('#c_tributo').val(),
                                ':p_c_concepto': $('#c_concepto').val(),
                                ':p_d_objeto_hecho': $('#d_objeto_hecho').val(),
                                ':p_n_posicion_fiscal': $('#n_posicion_fiscal').val(),
                                ':p_n_cuota': $('#n_cuota').val(),
                            });
                        }
                    }
                    else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    $('#btn_limpiar').click(function () {
        $('#n_cuit').val(null);
        $('#id_contribuyente').val(null);
        $('#d_denominacion').val(null);
        $('#c_origen').val(null);
        $('#d_origen').val(null);
        $('#c_tributo').val(null);
        $('#d_tributo').val(null);
        $('#d_objeto_hecho').val(null);
        $('#c_concepto').val(null);
        $('#d_concepto').val(null);
        $('#f_presentacion').val(null);
        $('#n_comprobante').val(null);
        $('#n_lote').val(null);
        $('#n_orden').val(null);
        $('#c_formulario').val(null);
        $('#d_formulario').val(null);
        $('#n_posicion_fiscal').val(null);
        $('#n_cuota').val(null);
        $('#n_obligacion').val(null);
        $('#n_presentacion').val(null);

        $('#main_grid').clearGridData();
        $('#detalles_grid').clearGridData();

        $('#lupa_d_denominacion').hide();
        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        $('#d_denominacion').attr('readonly', false);
        $('#d_denominacion').attr('disabled', false);
        $('#mascara_lupa_d_objeto_hecho').hide();
        $('#lupa_d_objeto_hecho').show().css('display', 'table-cell');

        $('#c_formulario').attr('disabled', false);
        $('#c_origen').attr('disabled', false);
        $('#f_presentacion').attr('disabled', false);
        $('#n_comprobante').attr('disabled', false);
        $('#n_remesa').attr('disabled', false);
        $('#n_lote').attr('disabled', false);
        $('#n_orden').attr('disabled', false);
        $('#c_tributo').attr('disabled', false);
        $('#c_concepto').attr('disabled', false);
        $('#n_cuit').attr('disabled', false);
        $('#d_denominacion').attr('disabled', false);
        $('#n_posicion_fiscal').attr('disabled', false);
        $('#n_cuota').attr('disabled', false);
        $('#d_objeto_hecho').attr('disabled', false);
        $('#d_formulario').attr('disabled', false);
        $('#d_tributo').attr('disabled', false);
        $('#d_concepto').attr('disabled', false);
        $('#d_origen').attr('disabled', false);
        $('#c_formulario').attr('disabled', false);
        $('#btn_buscar').attr('disabled', false);

        $('#mascara_lupa_c_formulario').hide();
        $('#mascara_lupa_c_origen').hide();
        $('#mascara_lupa_c_tributo').hide();
        $('#mascara_lupa_c_concepto').hide();

        $('#lupa_c_formulario').show().css('display', 'table-cell');
        $('#lupa_c_origen').show().css('display', 'table-cell');
        $('#lupa_c_concepto').show().css('display', 'table-cell');
        $('#lupa_c_tributo').show().css('display', 'table-cell');

        $('#div_main_grid').hide();
        $('#btn_pasaje_tmps').hide();

        limpiar_tmp();
    });

    $('#btn_modificar').click(function () {

        $('#btn_limpiar').show();
        $('#btn_modificar').hide();

        $('#main_grid').clearGridData();
        $('#detalles_grid').clearGridData();

        $('#lupa_d_denominacion').hide();
        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        $('#d_denominacion').attr('readonly', false);
        $('#d_denominacion').attr('disabled', false);
        $('#mascara_lupa_d_objeto_hecho').hide();
        $('#lupa_d_objeto_hecho').show().css('display', 'table-cell');

        $('#c_formulario').attr('disabled', false);
        $('#c_origen').attr('disabled', false);
        $('#f_presentacion').attr('disabled', false);
        $('#n_comprobante').attr('disabled', false);
        $('#n_remesa').attr('disabled', false);
        $('#n_lote').attr('disabled', false);
        $('#n_orden').attr('disabled', false);
        $('#c_tributo').attr('disabled', false);
        $('#c_concepto').attr('disabled', false);
        $('#n_cuit').attr('disabled', false);
        $('#d_denominacion').attr('disabled', false);
        $('#n_posicion_fiscal').attr('disabled', false);
        $('#n_cuota').attr('disabled', false);
        $('#d_objeto_hecho').attr('disabled', false);
        $('#d_formulario').attr('disabled', false);
        $('#d_tributo').attr('disabled', false);
        $('#d_concepto').attr('disabled', false);
        $('#d_origen').attr('disabled', false);
        $('#c_formulario').attr('disabled', false);
        $('#btn_buscar').attr('disabled', false);

        $('#mascara_lupa_c_formulario').hide();
        $('#mascara_lupa_c_origen').hide();
        $('#mascara_lupa_c_tributo').hide();
        $('#mascara_lupa_c_concepto').hide();

        $('#lupa_c_formulario').show().css('display', 'table-cell');
        $('#lupa_c_origen').show().css('display', 'table-cell');
        $('#lupa_c_concepto').show().css('display', 'table-cell');
        $('#lupa_c_tributo').show().css('display', 'table-cell');

        $('#div_main_grid').hide();
        $('#btn_pasaje_tmps').hide();

        limpiar_tmp();

    });


    $('#btn_pasaje_tmps').click(function () {

        if (prefixes_complete.length === 0) {
            mostrar_cuadro('I', 'Advertencia', 'Para algunas actividades no se cargo toda la información.');
            return;
        }

        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                'p_id_ddjj': v_id_ddjj,
                "p_id_obligacion": v_id_obligacion,
                "p_f_presentacion": v_f_presentacion,
                'p_id_contribuyente': v_id_contribuyente,
                'p_c_tipo_imponible': v_c_tipo_imponible,
                'p_c_tributo': v_c_tributo,
                'p_c_concepto': v_c_concepto,
                'p_d_objeto_hecho': v_d_objeto_hecho,
                'p_n_posicion_fiscal': v_n_posicion_fiscal,
                'p_n_cuota': v_n_cuota,
                'p_c_tipo_form': v_c_tipo_form,
                'p_n_secuencia_obl': v_n_secuencia_obl,
                'p_n_secuencia_pres': v_n_secuencia_pres,
                'p_cant_reg_formulario': null,
                'p_d_detalle': null,
                'p_c_renglon': null,
                'p_i_bonificacion': null,
                'p_i_retenciones': null,
                'p_i_percepciones': null,
                'p_i_saldos_a_favor': null,
                'p_m_ult_presentada': null,
                'p_importe': null,
                'p_retenciones': null,
                'p_percepciones': null,
                'p_saldo_favor': null,
                'p_otros_debitos': null,
                'p_otros_creditos_otros': null,
                'p_l_imp_creditos_este_anticipo': null,
                'p_c_concepto_mov': null,
                'p_transaccion_afip': null,
                'p_i_otrosdebitos': null,
                "n_orden": 2,
                "id_menu": v_id_menu
            },
            dataType: 'json',
            success: function (data) {
                if (data.resultado == 'DDJJ GRABADA') {
                    mostrar_confirmacion('DDJJ GRABADA');
                    $('#main_grid').clearGridData();
                    $('#div_main_grid').hide();
                    $('#btn_limpiar').click();
                } else {
                    mostrar_cuadro('E', 'Error', data.resultado + '. DDJJ NO GRABADA');
                }

            }
        });
    });



}

function bloquearCampos() {
    $('#c_origen').attr('disabled', true);
    $('#f_presentacion').attr('disabled', true);
    $('#n_comprobante').attr('disabled', true);
    $('#n_remesa').attr('disabled', true);
    $('#n_lote').attr('disabled', true);
    $('#n_orden').attr('disabled', true);
    $('#c_tributo').attr('disabled', true);
    $('#c_concepto').attr('disabled', true);
    $('#n_cuit').attr('disabled', true);
    $('#d_denominacion').attr('disabled', true);
    $('#n_posicion_fiscal').attr('disabled', true);
    $('#n_cuota').attr('disabled', true);
    $('#d_objeto_hecho').attr('disabled', true);
    $('#d_formulario').attr('disabled', true);
    $('#d_tributo').attr('disabled', true);
    $('#d_concepto').attr('disabled', true);
    $('#d_origen').attr('disabled', true);
    $('#c_formulario').attr('disabled', true);
    $('#btn_buscar').attr('disabled', true);

    $('#mascara_lupa_c_formulario').show().css('display', 'table-cell');
    $('#mascara_lupa_c_origen').show().css('display', 'table-cell');
    $('#mascara_lupa_c_concepto').show().css('display', 'table-cell');
    $('#mascara_lupa_c_tributo').show().css('display', 'table-cell');
    $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
    $('#mascara_lupa_d_objeto_hecho').show().css('display', 'table-cell');
    $('#lupa_d_objeto_hecho').hide();
    $('#lupa_c_formulario').hide();
    $('#lupa_c_origen').hide();
    $('#lupa_c_tributo').hide();
    $('#lupa_c_concepto').hide();
    $('#lupa_d_denominacion').hide();
}

function limpia_dni(dni) {
    var result;
    if (dni != null) {
        result = dni.replace(/\./gi, '');
        return result;
    } else {
        return null;
    }
}

function inicializarLupas() {

    $("#lupa_c_formulario").lupa_generica({
        id_lista: v_lista_formularios,
        titulos: ['Código', 'Descripción'],
        grid: [{ index: 'c_codigo', width: 100 },
        { index: 'd_descrip', width: 450 }
        ],
        caption: 'LISTADO DE FORMULARIOS DDJJ',
        sortname: 'c_codigo',
        sortorder: 'asc',
        campos: {
            c_codigo: 'c_formulario',
            d_descrip: 'd_formulario'
        },
        searchInput: '#c_formulario',
        searchCode: true,
        limpiarCod: true,
        keyNav: true

    });

    $("#lupa_c_origen").lupa_generica({
        id_lista: v_lista_origenes,
        titulos: ['Código', 'Descripción'],
        grid: [{ index: 'c_codigo', width: 105 },
        { index: 'd_descrip', width: 460 }
        ],
        caption: 'Orígenes',
        sortname: 'c_codigo',
        sortorder: 'asc',
        campos: {
            c_codigo: 'c_origen',
            d_descrip: 'd_origen'
        },
        searchInput: '#c_origen',
        searchCode: true,
        limpiarCod: true,
        keyNav: true

    });

    $("#lupa_c_tributo").lupa_generica({
        id_lista: v_lista_tributos,
        titulos: ['Tipo', 'Descrip'],
        grid: [{ index: 'c_codigo', width: 100 },
        { index: 'd_descrip', width: 465 }],
        caption: 'LISTADO DE TRIBUTOS DE INGRESOS DE BRUTOS',
        sortname: 'c_codigo',
        sortorder: 'asc',
        campos: { c_codigo: 'c_tributo', d_descrip: 'd_tributo' },
        keyNav: true,
        searchInput: '#c_tributo',
        searchCode: true,
        exactField: 'c_codigo'
    });

    $("#lupa_c_concepto").lupa_generica({
        id_lista: v_lista_conceptos,
        titulos: ['Código', 'Descrip'],
        grid: [{ index: 'c_concepto', width: 100 },
        { index: 'd_concepto', width: 450 }],
        caption: 'CONCEPTOS DDJJ',
        sortname: 'c_concepto',
        sortorder: 'asc',
        campos: { c_concepto: 'c_concepto', d_concepto: 'd_concepto' },
        keyNav: true,
        filtros: ['#c_tributo'],
        filtrosTitulos: ['c_tributo'],
        filtrosNulos: [true],
        searchInput: '#c_concepto',
        searchCode: true,
        exactField: 'c_concepto'
    });

    $('#n_cuit').focusout(function () {
        if ($('#n_cuit').val() != '') {
            try {
                if (limpia_cuit($('#n_cuit').val()).length == 11) {
                    $.ajax({
                        type: 'POST',
                        url: "modif_e_ingreso_de_DDJJ_procesadas_con_error/php/autocomplete.php",
                        data: { oper: '2', term: limpia_cuit($('#n_cuit').val()) },
                        dataType: 'json',
                        success: function (data) {
                            ajax_autocomplete = null;
                            if (data) {
                                $("#d_denominacion").val(data.DENOMINACION);
                                $("#c_tipo_documento").val(data.C_TIPO_DOCUMENTO);
                                $("#d_tipo_documento").val(data.D_TIPO_DOCUMENTO);
                                $("#nro_documento").val(data.N_DOCUMENTO);
                                $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);

                            } else {
                                mostrar_cuadro('E', 'Error', 'El Número de CUIT ingresado es incorrecto');
                            }
                        }
                    });
                } else {
                    mostrar_cuadro('E', 'Error', 'El Número de CUIT ingresado es incorrecto');
                }
            } catch (err) {
            }
        } else {
            $('#id_contribuyente').val(null);
        }

    });

    $('#d_denominacion').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 4) {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        }
    });

    $("#lupa_d_objeto_hecho").lupa_generica({
        id_lista: v_lista_objeto_hecho,
        titulos: ['Número de Inscripción', 'CUIT', 'Denominación'],
        grid: [{ index: 'c_codigo', width: 205 }, { index: 'cuit', width: 200, hidden: true }, { index: 'denominacion', width: 360 }],
        caption: 'Lista de Inscripciones',
        sortname: 'c_codigo',
        sortorder: 'asc',
        filtros: ['#c_tributo', '#id_contribuyente', '#d_objeto_hecho'],
        filtrosNulos: [false, true, true],
        filtrosTitulos: ['Tributo', 'ID Contribuyente', 'Número de Inscripción'],
        campos: { c_codigo: 'd_objeto_hecho', cuit: 'n_cuit', denominacion: 'd_denominacion' },
    });

    $("#lupa_d_denominacion").lupa_generica({
        id_lista: vg_lista_denominaciones,
        titulos: ['ID Contribuyente', 'CUIT', 'Apellidos y Nombre / Razón Social', 'Tipo', 'Tipo Documento', 'Nro. Documento', 'F. Alta'],
        grid: [
            { index: 'id_contribuyente', width: 450, hidden: true },
            { index: 'n_cuit', width: 100 },
            { index: 'd_denominacion', width: 450 },
            { index: 'c_tipo_documento', width: 100 },
            { index: 'd_tipo_documento', width: 150, hidden: true },
            { index: 'n_documento', width: 150 },
            { index: 'f_alta', width: 100 }
        ],
        caption: 'Listado de Contribuyentes',
        sortname: 'd_denominacion',
        sortorder: 'asc',
        filtros: ['#d_denominacion'],
        filtrosNulos: [true],
        campos: {
            id_contribuyente: 'id_contribuyente',
            n_cuit: 'n_cuit',
            d_denominacion: 'd_denominacion',
            c_tipo_documento: 'c_tipo_doc',
            d_tipo_documento: 'd_tipo_doc',
            n_documento: 'n_documento',
            f_alta: 'f_alta'
        },
        keyNav: true,
        draggable: true,
        onClose: function () {
        }
    });
}

function inicializa_lupas_main_grid(formid) {

    $("#tipo_plan", formid).lupa_generica({
        id_lista: v_lista_tipo_plan,
        titulos: ['Tipo Plan', 'Descripcion Plan'],
        grid: [{ index: 'c_codigo', width: 100 },
        { index: 'd_descrip', width: 450 }],
        caption: 'LISTADO DE PLANES DE FISCALIZACION',
        sortname: 'c_codigo',
        sortorder: 'asc',
        campos: { c_codigo: 'tipo_plan', d_descrip: 'D_TIPO_PLAN ' },
        keyNav: true,
        searchInput: '#tipo_plan',
        searchCode: true
    });

}

function limpiar_tmp() {
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "id_menu": v_id_menu,
            "n_orden": 3
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado === 'OK') {

            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
            }
        }
    });
}

