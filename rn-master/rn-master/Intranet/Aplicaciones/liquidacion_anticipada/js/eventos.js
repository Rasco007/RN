async function init_eventos() {

    $('#lupa_d_objeto2').hide();
    $("#n_cuit").mask("99-99999999-9");
    $('#lupa_d_denominacion').hide();
    $('#btn_liq_ant').attr('disabled', true);
    $("#btn_tab_resumen").click();

    await obtener_constantes();

    $(".datepicker.nomindate").datepicker({
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],


    }).mask('99/99/9999').change(function () {
        if ($(this).val().length > 0 && $(this).val().length != 10) {
            mostrar_error("El Formato de la Fecha ingresada no es válido.");
            $(this).val("");
        }
    });

    $(".datepicker.mindate").datepicker({
        minDate: 0,
        changeMonth: true,
        changeYear: true,
        dateFormat: 'dd/mm/yy',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],


    }).mask('99/99/9999').change(function () {
        if ($(this).val().length > 0 && $(this).val().length != 10) {
            mostrar_error("El Formato de la Fecha ingresada no es válido.");
            $(this).val("");
        }
    });

    $('.numerico').on('input', function () {
        let inputValue = $(this).val();

        inputValue = inputValue.replace(/\D/g, '');

        $(this).val(inputValue);
    });

    $('.importe').keypress(function (tecla) {
        if (tecla.charCode < 48 || tecla.charCode > 57) {
            if (tecla.charCode !== 44 && tecla.charCode !== 46) {
                return false;
            }
        }
    });

    //le damos el formato de importe con 2 decimales 0,00
    $(".mascara_importe").focusout(function () {
        if (!isNaN($(this).val()) && $(this).val()) {
            $(this).val(Number($(this).val()).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        }
    }).css('text-align', 'right');


    $('#btn_limpiar').click(function () {
        limpiar();
    });

    $('#btn_buscar').click(function () {

        buscar();
    });


    $("#lupa_d_objeto2").lupa_generica({
        id_lista: vg_lista_objetos,
        titulos: ['Objeto-Hecho'],
        grid: [{ index: 'd_objeto_hecho', width: 250 }],
        caption: 'Lista de Objetos - Hechos',
        sortname: 'd_objeto_hecho',
        sortorder: 'desc',
        filtros: ['#c_tipo_imponible', '#id_contribuyente', '#d_objeto2'],
        filtrosTitulos: ['Tipo Imponible', 'ID Contribuyente', 'Objeto'],
        filtrosNulos: [false, true, true],
        campos: { d_objeto_hecho: 'd_objeto2' },
        keyNav: true,
        draggable: true,
        onClose: function () {

        }
    });

    $('#d_objeto2').keydown(function () {
        if ($('#d_objeto2').val().length >= 2 || $('#id_contribuyente').val()) {
            $('#lupa_d_objeto2').show().css('display', 'table-cell');
            $('#mascara_lupa_d_objeto2').hide();
        } else {
            $('#lupa_d_objeto2').hide();
            $('#mascara_lupa_d_objeto2').show().css('display', 'table-cell');
        }
    });

    $("#lupa_d_denominacion").lupa_generica({
        id_lista: v_lista_denom,
        titulos: ['Denominación', 'CUIT', 'Cód. Tipo Documento', 'Tipo de Documento', 'Nro. Documento', 'Id Contribuyente'],
        grid: [{ index: 'd_denominacion', width: 200 }, { index: 'n_cuit', width: 100 }, { index: 'c_tipo_documento', width: 100 }, { index: 'd_tipo_documento', width: 100 }, { index: 'n_documento', width: 160 }, { index: 'id_contribuyente', width: 100, hidden: true }],
        caption: 'Lista de Denominaciones',
        sortname: 'd_denominacion',
        sortorder: 'asc',
        filtros: ['#d_denominacion'],
        filtrosTitulos: ['Denominación'],
        filtrosNulos: [true],
        campos: { id_contribuyente: 'id_contribuyente', n_cuit: 'n_cuit', d_denominacion: 'd_denominacion', c_tipo_documento: 'c_tipo_documento', d_tipo_documento: 'd_tipo_documento', n_documento: 'n_documento' },
        keyNav: true,
        draggable: true,
        onClose: function () {
            $("#n_cuit").mask("99-99999999-9");

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

    $("#lupa_c_tipo_documento").lupa_generica({
        id_lista: v_lista_tbl_gen,
        titulos: ['Cód Documento', 'Documento', 'N Tabla'],
        grid: [{ index: 'c_codigo', width: 200 },
        { index: 'd_descrip', width: 350 }, { index: 'n_tabla', width: 250, hidden: true }],
        caption: 'Lista de Documentos',
        sortname: 'c_codigo',
        sortorder: 'asc',
        filtros: ['TIPDOC'],
        campos: { c_codigo: 'c_tipo_documento', d_descrip: 'd_tipo_documento', n_tabla: 'n_tabla_doc' },
        keyNav: true,
        searchInput: '#c_tipo_documento',
        searchCode: true,
        limpiarCod: true,
        onClose: function () {
            if (!$('#c_tipo_documento').val()) {
                $('#d_tipo_documento').val("");
            }
        }
    });

    $("#lupa_c_tipo_imponible").lupa_generica({
        id_lista: v_lista_timp,
        titulos: ['Cód Tipo Imponible', ' Tipo Imponible'],
        grid: [{ index: 'c_codigo', width: 200 },
        { index: 'd_descrip', width: 350 }],
        caption: 'Lista de Tipos Imponible',
        sortname: 'c_codigo',
        sortorder: 'asc',
        campos: { c_codigo: 'c_tipo_imponible' },
        keyNav: true,
        searchInput: '#c_tipo_imponible',
        searchCode: true,
        limpiarCod: true
    });

    $("#lupa_c_concepto").lupa_generica({
        id_lista: v_lista_conceptos,
        titulos: ['Cód. Concepto', 'Descripción del Concepto'],
        grid: [{ index: 'c_codigo', width: 120 },
        { index: 'd_descrip', width: 299 }],
        caption: 'Lista de Conceptos',
        filtros: ['#c_tributo'],
        filtrosTitulos: ['Tributo'],
        filtrosNulos: [false],
        campos: { c_codigo: 'c_concepto', d_descrip: 'd_concepto' },
        keyNav: true,
        searchInput: '#c_concepto',
        searchCode: true,
        limpiarCod: true,
        onClose: function () {
            if (!$('#c_concepto').val()) {
                $('#d_concepto').val("");
            }
        }
    });

    $("#lupa_c_tipo_plan_pago").lupa_generica({
        id_lista: v_lista_tipo_planes,
        titulos: ['Cód. Tipo Plan Pago', 'Descripción del Plan de Pago'],
        grid: [{ index: 'c_codigo', width: 65 }, { index: 'd_descrip', width: 400 }],
        caption: 'Lista de Tipos de Plan de Pago',
        campos: { c_codigo: 'c_tipo_plan_pago', d_descrip: 'd_tipo_plan_pago' },
        keyNav: true,
        searchInput: '#c_tipo_plan_pago',
        sortname: 'c_codigo',
        sortorder: 'asc',
        searchCode: true,
        limpiarCod: true,
        onClose: function () {
        }
    });

    $("#lupa_n_plan").lupa_generica({
        id_lista: v_lista_planes_pago,
        titulos: ['Cód. Tipo Plan Pago', 'Nro. Plan Pago', 'Descripción del Plan de Pago', 'CUIT', 'Denominación', 'Cód. Tipo Imponible', 'Objeto/Hecho'],
        grid: [{ index: 'c_tipo_plan_pago', width: 65, hidden: true }, { index: 'c_codigo', width: 100 }, { index: 'd_descrip', width: 200 }, { index: 'n_cuit', width: 100 },
        { index: 'd_denominacion', width: 200 }, { index: 'c_tipo_imponible', width: 65 }, { index: 'd_objeto_hecho', width: 150 }],
        caption: 'Lista de Planes de Pago',
        filtros: ['#id_contribuyente'],
        filtrosTitulos: ['ID Contribuyente'],
        filtrosNulos: [true],
        campos: { c_codigo: 'n_plan' },
        keyNav: true,
        searchInput: '#n_plan',
        sortname: 'c_codigo',
        sortorder: 'desc',
        searchCode: true,
        limpiarCod: true,
        onClose: function () {
            if ($('#n_plan').val()) {
                traer_datos();
            }
        }
    });

    $("#lupa_c_delegacion").lupa_generica({
        id_lista: v_lista_tbl_gen,
        titulos: ['Cód delegación', 'Descripción', 'N Tabla'],
        grid: [{ index: 'c_codigo', width: 200 },
        { index: 'd_descrip', width: 350 }, { index: 'n_tabla', width: 250, hidden: true }],
        caption: 'Lista de Delegaciones',
        sortname: 'd_descrip',
        sortorder: 'asc',
        filtros: ['DELEG'],
        campos: { c_codigo: 'c_delegacion', d_descrip: 'd_delegacion', n_tabla: 'n_tabla_deleg' },
        keyNav: true,
        searchInput: '#c_delegacion',
        searchCode: true,
        limpiarCod: true,
        onClose: function () {
            if (!$('#c_delegacion').val()) {
                $('#d_delegacion').val("");
            }
        }
    });

    $("#lupa_c_tipo_calculo").lupa_generica({
        id_lista: v_lista_tipo_calculo,
        titulos: ['Cód. Cálculo', 'Método de Cálculo'],
        grid: [{ index: 'c_codigo', hidden: true, width: 120 },
        { index: 'd_descrip', width: 299 }],
        caption: 'Lista de Métodos de Cálculo',
        filtros: ['#c_tipo_calculo'],
        filtrosTitulos: ['Método Cálculo'],
        filtrosNulos: [true],
        campos: { c_codigo: 'c_tipo_calculo', d_descrip: 'd_tipo_calculo' },
        keyNav: true,
        searchInput: '#c_tipo_calculo',
        searchCode: true,
        limpiarCod: true,
        onClose: function () {
            if (!$('#c_tipo_calculo').val()) {
                $('#d_tipo_calculo').val("");
            }
        }

    });

    $('#n_cuit').focusout(function () {
        if ($('#n_cuit').val() != '') {
            try {
                if (limpia_cuit($('#n_cuit').val()).length == 11) {
                    $.ajax({
                        url: 'ajax_genericos/autocomplete.php',
                        type: "POST",
                        data: {
                            "term": limpia_cuit($("#n_cuit").val()),
                            "oper": 3
                        },
                        async: true,
                        success: function (data) {
                            ret = eval('(' + data + ')');
                            if (data) {
                                $("#d_denominacion").val(ret.data_raz[0].razon_social);
                                $("#id_contribuyente").val(ret.data_raz[0].id_contribuyente);

                                $.ajax({
                                    type: 'POST',
                                    url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                                    data: {
                                        'p_id_contribuyente': ret.data_raz[0].id_contribuyente,
                                        "id_menu": v_id_menu,
                                        "n_orden": 1
                                    },
                                    dataType: 'json',
                                    success: function (data2) {
                                        if (data2.resultado == 'OK') {
                                            $("#d_denominacion").val(data2.p_desc_denom);
                                            $("#n_cuit").val(data2.p_n_cuit);
                                            $("#n_cuit").mask("99-99999999-9");
                                            $("#c_tipo_documento").val(data2.p_c_tipo_documento);
                                            $("#c_tipo_documento").blur();
                                            $("#n_documento").val(data2.p_n_documento);
                                            $("#id_contribuyente").val(data2.p_id_contribuyente);
                                        }
                                        else {
                                            mostrar_cuadro('E', 'Error', data2.resultado);
                                            return;
                                        }
                                    }
                                });
                            } else {
                                $("#d_denominacion").val(null);
                                $("#id_contribuyente").val(null);
                            }
                        }
                    });

                } else {
                    $('#btn_limpiar').click();
                }
            } catch (err) {
            }
        } else {
            $("#id_contribuyente").val("");
        }
    });

    $('#etiqueta_tab_detalle').click(function () {
        filtros_arr_main = [];
        if ($('#n_plan').val() != '') {
            filtros_arr_main.push('Nro. Plan de Pago: ' + $('#n_plan').val());
        }
        filtros_no_nativos_ar['detalle_grid'] = filtros_arr_main;

        setea_parametros('#detalle_grid', { ':p_n_plan_pago': $('#n_plan').val() });
        $(window).resize();
    })
    $('#etiqueta_tab_cuotas').click(function () {
        filtros_arr_main = [];
        if ($('#n_plan').val() != '') {
            filtros_arr_main.push('Nro. Plan de Pago: ' + $('#n_plan').val());
        }
        if ($('#f_efectivo').val() != '') {
            filtros_arr_main.push('F. Efectivación: ' + $('#f_efectivo').val());
        }
        filtros_no_nativos_ar['cuotas_grid'] = filtros_arr_main;

        setea_parametros('#cuotas_grid', { ':p_n_plan_pago': $('#n_plan').val(), ':p_f_efectivo': $('#f_efectivo').val() });
        $(window).resize();
    })

    $('#btn_liq_ant').click(function () {
        liquidacion_anticipada();
    })

    $('#btn_armar_liq').click(function () {
        armar_liquidacion();
    })

    $('#btn_imprimir').click(function () {
        if (sesion) {
            let params = 'p_id_sesion|' + sesion;
            llamar_report('RECAL036', params, 'PDF');
        }
    })

    $('#cant_cuotas').focusout(function () {
        if ($(this).val()) {
            if ($('#f_liquidacion_modal').val()) {
                $.ajax({
                    type: 'POST',
                    url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                    data: {
                        'p_fecha_liquidacion': $('#f_liquidacion_modal').val(),
                        'p_c_tipo_plan_pago': $('#c_tipo_plan_pago').val(),
                        'p_n_plan_pago': $('#n_plan').val(),
                        "id_menu": v_id_menu,
                        "n_orden": 6
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.resultado == 'OK') {
                            $('#f_liquidacion_modal').val(data.p_fecha_liquidacion);
                            es_fecha_valida = true;

                            if (Number($('#cant_cuotas').val()) < 1) {
                                mostrar_error('Debe ingresar un valor mayor o igual a 1');
                                $('#cant_cuotas').val("");
                            }

                            if ($('#cant_cuotas').val()) {
                                if (Number($('#cant_cuotas').val()) > Number($('#max_cantidad_cuotas').val())) {
                                    //mostrar_error('La cantidad de cuotas debe ser igual o menor a la cantidad máxima de cuotas');
                                    mostrar_error('Debe estar comprendido en un rango de ... a ' + $('#max_cantidad_cuotas').val());
                                    $('#cant_cuotas').val("");
                                    return;
                                }
                            }
                        }
                        else {
                            mostrar_cuadro('E', 'Error', data.resultado);
                            $('#f_liquidacion_modal').val("");
                            es_fecha_valida = false;
                        }
                    }
                });

            }
        }
    });

    $('#f_liquidacion_modal').on('focusout, change', function () {
        if ($(this).val()) {
            validar_f_liquidacion();
        }
    });

    $('#btn_grabar_liq').click(function () {
        procesar();
    });

    $('#btn_volver_liq').click(function () {
        es_fecha_valida = false;
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

