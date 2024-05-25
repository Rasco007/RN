function init_eventos() {
    $('#lupa_d_objeto_hecho').hide();
    $('#lupa_d_denominacion').hide();
    $('#lupa_n_documento').hide();
    $('#lupa_n_cuit').hide();
    $('#btn_next').prop('disabled', true);
    $('#btn_prev').prop('disabled', true);
    $('#btn_grabar').prop('disabled', true);
    $('#btn_eliminar').prop('disabled', true);

    $("#n_documento").mask("999999999");
    obtener_constantes();

    if (p_solo_consulta.toUpperCase() == 'S') {
        $('#btn_eliminar').hide();
        $('#btn_grabar').hide();
    }

    $('#d_objeto_hecho').dblclick(function () {
        if (v_modo == 'update' && $(this).val()) {
            datos_modal();
        }
    });

    $('#n_recibo').dblclick(function () {
        if (v_modo == 'update' && $(this).val()) {
            datos_recibo_modal();
        }
    });

    $('#n_cuit_modal').dblclick(function () {
        if ($('#id_contribuyente_modal').val()) {
            llama_cctec008();
        }
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
        if ($(this).val()) {
            $(this).val(formatea_number(mascara_numero(parse($(this).val()).toFixed(2), ',', -1, 2), ''));
        }
    }).css('text-align', 'right');

    $('#btn_limpiar').click(function () {

        limpiar();
        $('#btn_buscar').prop('disabled', false);
        $('#btn_grabar').prop('disabled', true);
        $('#btn_eliminar').prop('disabled', true);
        $('#btn_next').prop('disabled', true);
        $('#btn_prev').prop('disabled', true);
        datos_orig_pagos_erroneos = null;
        datos_modif_pagos_erroneos = null;

    });

    $("#btn_buscar").click(function () {
        if ($('#c_tributo').val() == "" && (p_solo_consulta.toUpperCase() == 'S' || p_solo_consulta == null) && $('#n_cuit').val() == "") {
            mostrar_error(' Debe ingresar tributo y objeto o nro de cuit para consultas');
            return;
        }
        if ($('#d_objeto_hecho').val() == "" && (p_solo_consulta.toUpperCase() == 'S' || p_solo_consulta == null) && $('#n_cuit').val() == "") {
            mostrar_error(' Debe ingresar tributo y objeto o nro de cuit para consultas');
            return;
        }
        buscar();
    });

    $("#btn_grabar").click(function () {
        if (p_solo_consulta.toUpperCase() == 'S' || p_solo_consulta == null) {
            mostrar_error(' No tiene permisos para grabar');
            return;
        }

        grabar();
    });

    $('#i_pagado').focusout(function () {
        if ($('#i_pagado').val() == '0,00' || $('#i_pagado').val() == '0') {
            $('#btn_eliminar').prop('disabled', false);
        } else {
            $('#btn_eliminar').prop('disabled', true);
        }
    })

    $("#btn_eliminar").click(function () {
        if (p_solo_consulta.toUpperCase() == 'S' || p_solo_consulta == null) {
            mostrar_error(' No tiene permisos para eliminar');
            return;
        }
        mostrar_cuadro('C', 'Eliminar', '¿Desea eliminar el pago con importe en cero?', function () {
            borrar();
        })
    });

    $("#btn_next").click(function () {
        let index = datos_modif_pagos_erroneos.findIndex(pe => pe.ID_PAGO_ERRONEO === $('#id_pago_erroneo').val());
        datos_modif_pagos_erroneos[index] = get_input_datos();
        if (index !== -1 && index < datos_modif_pagos_erroneos.length) {
            setear_inputs_datos(datos_modif_pagos_erroneos[index + 1]);
            if ((index + 1) === (datos_modif_pagos_erroneos.length - 1)) {
                $('#btn_next').prop('disabled', true);
            } else {
                $('#btn_next').prop('disabled', false);
            }
            $('#btn_prev').prop('disabled', false);
        }
    });

    $("#btn_prev").click(function () {
        let index = datos_modif_pagos_erroneos.findIndex(pe => pe.ID_PAGO_ERRONEO === $('#id_pago_erroneo').val());
        datos_modif_pagos_erroneos[index] = get_input_datos();
        if (index !== -1 && index > 0) {
            setear_inputs_datos(datos_modif_pagos_erroneos[index - 1]);
            if ((index - 1) === 0) {
                $('#btn_prev').prop('disabled', true);
            } else {
                $('#btn_prev').prop('disabled', false);
            }
            $('#btn_next').prop('disabled', false);
        }
    });

    $('.numerico').on('input', function () {
        let inputValue = $(this).val();

        inputValue = inputValue.replace(/\D/g, '');

        $(this).val(inputValue);
    });

    $("#n_cuit").mask("99-99999999-9");
    $("#n_cuit").blur(function () {
        $("#n_cuit").mask("99-99999999-9");
    })

    $('#pos_fiscal').mask("9999/99");
    $("#pos_fiscal").blur(function () {
        $(this).mask("9999/99");
    })

    $(".datepicker").datepicker({
        // changeMonth:true,
        // changeYear:true,
        dateFormat: 'dd/mm/yy',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
        dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá']
    }).mask('99/99/9999').change(function () {
        if ($(this).val().length > 0 && $(this).val().length != 10) {
            mostrar_error("El Formato de la Fecha ingresada no es válido.");
            $(this).val("");
        }
    });

    $(".mascara_importe").keydown(function (event) {
        return controla_number(event, this, 2);
    });

    $("#lupa_c_tipo_imponible").lupa_generica({
        id_lista: v_lista_timp,
        titulos: ['Cód. Tipo Imponible', 'Tipo Imponible'],
        grid: [{ index: 'c_codigo', width: 150 },
        { index: 'd_descrip', width: 400 }],
        caption: 'Lista de Tipos Imponibles',
        sortname: 'd_descrip',
        sortorder: 'asc',
        filtros: ['3'],
        campos: { c_codigo: 'c_tipo_imponible', d_descrip: 'd_tipo_imponible' },
        keyNav: true,
        searchInput: '#c_tipo_imponible',
        searchCode: true,
        onClose: function () {
            validar_caracteristica();
        }
    });

    $("#lupa_c_tributo").lupa_generica({
        id_lista: v_lista_trib,
        titulos: ['Cód. Tributo', 'Tributo', 'Cód. Tipo Imponible', 'Tipo Imponible', 'N Tabla', 'Dato 1'],
        grid: [{ index: 'c_codigo', width: 200 },
        { index: 'd_descrip', width: 350 }, { index: 'c_tipo_imponible', width: 250, hidden: true }, { index: 'd_dato', width: 250, hidden: true }, { index: 'n_tabla', width: 250, hidden: true }, { index: 'd_dato1', width: 250, hidden: true }],
        caption: 'Lista de Tributos',
        sortname: 'c_codigo',
        sortorder: 'asc',
        campos: { c_codigo: 'c_tributo', d_descrip: 'd_tributo', c_tipo_imponible: 'c_tipo_imponible', d_dato: 'd_tipo_imponible' },
        keyNav: true,
        searchInput: '#c_tributo',
        searchCode: true,
        limpiarCod: true,
        onClose: function () {
            if ($('#m_objeto_hecho').val() == 'O' && $('#m_objeto_hecho').val()) {
                $('#c_caracteristica').val("");
                $('#d_caracteristica').val("");
            }
        }
    });

    $("#lupa_c_form").lupa_generica({
        id_lista: v_lista_tbl_gen,
        titulos: ['Formulario', 'Descripción', 'N Tabla'],
        grid: [{ index: 'c_codigo', width: 200 },
        { index: 'd_descrip', width: 350 }, { index: 'n_tabla', width: 250, hidden: true }],
        caption: 'Lista de Formularios',
        sortname: 'c_codigo',
        sortorder: 'asc',
        filtros: ['TFORMUL'],
        campos: { c_codigo: 'c_form', d_descrip: 'd_form', n_tabla: 'n_tabla_form' },
        keyNav: true,
        searchInput: '#c_form',
        searchCode: true,
    });

    $("#lupa_c_concepto").lupa_generica({
        id_lista: v_lista_concepto,
        titulos: ['Cód. Conceptos', 'Conceptos'],
        grid: [{ index: 'c_codigo', width: 100 },
        { index: 'd_descrip', width: 250 }],
        caption: 'Lista de Conceptoss',
        sortname: 'd_descrip',
        sortorder: 'asc',
        filtros: ['#c_tributo', '#d_objeto_hecho'],
        filtrosNulos: [false],
        filtrosTitulos: ['Tributo, Objeto Hecho'],
        campos: { c_codigo: 'c_concepto', d_descrip: 'd_concepto' },
        keyNav: true,
        searchInput: '#c_concepto',
        searchCode: true,
        limpiarCod: true,
    });

    $("#lupa_c_concepto_mov").lupa_generica({
        id_lista: v_lista_concepto_mov,
        titulos: ['Cód. Conceptos de Movimientos', 'Conceptos de Movimientos'],
        grid: [{ index: 'c_codigo', width: 200 },
        { index: 'd_descrip', width: 350 }],
        caption: 'Lista de Conceptos de Movimientos',
        sortname: 'c_codigo',
        sortorder: 'asc',
        filtros: ['#c_tributo'],
        filtrosNulos: [false],
        filtrosTitulos: ['Tributo'],
        campos: { c_codigo: 'c_concepto_mov', d_descrip: 'd_concepto_mov' },
        keyNav: true,
        searchInput: '#c_concepto_mov',
        searchCode: true,
        limpiarCod: true,
    });

    $('#n_cuit').focusout(function () {
        if ($('#n_cuit').val() != '') {
            try {
                if (limpia_cuit($('#n_cuit').val()).length == 11) {
                    $.ajax({
                        type: 'POST',
                        url: "ajax_genericos/autocomplete.php",
                        data: { oper: '3', term: limpia_cuit($('#n_cuit').val()) },
                        dataType: 'json',
                        success: function (data) {
                            ajax_autocomplete = null;
                            if (data) {
                                $("#d_denominacion").val(data.data_raz[0].razon_social);
                                $("#id_contribuyente").val(data.data_raz[0].id_contribuyente);
                            }
                        }
                    });

                } else {
                    $('#btn_limpiar').click();
                }
            } catch (err) {
            }
        }
    });

    $("#lupa_d_objeto_hecho").lupa_generica({
        id_lista: vg_lista_objetos,
        titulos: ['Objeto-Hecho', 'Tributo', 'Id Contribuyente', 'CUIT', 'Denominación', 'Cód. Tipo Documento', 'Tipo de Documento', 'Número de Documento'],
        grid: [{ index: 'd_objeto_hecho', width: 100 }, { index: 'c_tributo', width: 100 }, { index: 'id_contribuyente', width: 100, hidden: true }, { index: 'n_cuit', width: 100 }, { index: 'd_denominacion', width: 200 }, { index: 'c_tipo_documento', width: 100 }, { index: 'd_tipo_documento', width: 140, hidden: true }, { index: 'n_documento', width: 160 }],
        caption: 'Lista de Objetos - Hechos',
        sortname: 'd_objeto_hecho',
        sortorder: 'desc',
        filtros: ['#c_tributo', '#id_contribuyente', '#d_objeto_hecho'],
        filtrosTitulos: ['Tributo', 'ID Contribuyente', 'Objeto'],
        filtrosNulos: [false, true, true],
        campos: { d_objeto_hecho: 'd_objeto_hecho', id_contribuyente: 'id_contribuyente', n_cuit: 'n_cuit', d_denominacion: 'd_denominacion', c_tributo: 'c_tributo', c_tipo_documento: 'c_documento', d_tipo_documento: 'd_documento', n_documento: 'n_documento' },
        keyNav: true,
        draggable: true
    });

    $('#d_objeto_hecho').keydown(function () {
        if ($('#d_objeto_hecho').val().length >= 2) {
            $('#lupa_d_objeto_hecho').show().css('display', 'table-cell');
            $('#mascara_lupa_d_objeto_hecho').hide();
        } else {
            $('#lupa_d_objeto_hecho').hide();
            $('#mascara_lupa_d_objeto_hecho').show().css('display', 'table-cell');
        }
    });

    $("#lupa_d_denominacion").lupa_generica({
        id_lista: vg_lista_denominaciones,
        titulos: ['Id Contribuyente', 'CUIT', 'Denominación', 'Cód. Tipo Documento', 'Tipo de Documento', 'Número de Documento', 'F. Alta'],
        grid: [{ index: 'id_contribuyente', width: 100, hidden: true }, { index: 'n_cuit', width: 100 }, { index: 'd_denominacion', width: 200 }, { index: 'c_tipo_documento', width: 100 }, { index: 'd_tipo_documento', width: 140, hidden: true }, { index: 'n_documento', width: 160 }, { index: 'f_alta', width: 80 }],
        caption: 'Lista de Denominación / Razón Social',
        sortname: 'd_denominacion',
        sortorder: 'asc',
        filtros: ['#d_denominacion'],
        filtrosTitulos: ['Denominación'],
        filtrosNulos: [false],
        campos: { n_cuit: 'n_cuit', d_denominacion: 'd_denominacion', c_tipo_documento: 'c_documento', d_tipo_documento: 'd_documento', n_documento: 'n_documento', f_alta: 'f_alta', id_contribuyente: 'id_contribuyente' },
        keyNav: true,
        draggable: true,
    });

    $("#lupa_n_cuit").lupa_generica({
        id_lista: vg_lista_denominaciones,
        titulos: ['Id Contribuyente', 'CUIT', 'Denominación', 'Cód. Tipo Documento', 'Tipo de Documento', 'Número de Documento', 'F. Alta'],
        grid: [{ index: 'id_contribuyente', width: 100, hidden: true }, { index: 'n_cuit', width: 100 }, { index: 'd_denominacion', width: 200 }, { index: 'c_tipo_documento', width: 100 }, { index: 'd_tipo_documento', width: 140, hidden: true }, { index: 'n_documento', width: 160 }, { index: 'f_alta', width: 80 }],
        caption: 'Lista de CUITs',
        sortname: 'n_cuit',
        sortorder: 'asc',
        filtros: ['#d_denominacion'],
        filtrosTitulos: ['Denominación'],
        filtrosNulos: [false],
        campos: { n_cuit: 'n_cuit', d_denominacion: 'd_denominacion', c_tipo_documento: 'c_documento', d_tipo_documento: 'd_documento', n_documento: 'n_documento', f_alta: 'f_alta', id_contribuyente: 'id_contribuyente' },
        keyNav: true,
        draggable: true,
    });

    $("#lupa_n_documento").lupa_generica({
        id_lista: vg_lista_denominaciones,
        titulos: ['Id Contribuyente', 'CUIT', 'Denominación', 'Cód. Tipo Documento', 'Tipo de Documento', 'Número de Documento', 'F. Alta'],
        grid: [{ index: 'id_contribuyente', width: 100, hidden: true }, { index: 'n_cuit', width: 100 }, { index: 'd_denominacion', width: 200 }, { index: 'c_tipo_documento', width: 100 }, { index: 'd_tipo_documento', width: 140, hidden: true }, { index: 'n_documento', width: 160 }, { index: 'f_alta', width: 80 }],
        caption: 'Lista de Números de Documentos',
        sortname: 'n_cuit',
        sortorder: 'asc',
        filtros: ['#d_denominacion'],
        filtrosTitulos: ['Denominación'],
        filtrosNulos: [false],
        campos: { n_cuit: 'n_cuit', d_denominacion: 'd_denominacion', c_tipo_documento: 'c_documento', d_tipo_documento: 'd_documento', n_documento: 'n_documento', f_alta: 'f_alta', id_contribuyente: 'id_contribuyente' },
        keyNav: true,
        draggable: true,
    });

    $("#lupa_c_documento").lupa_generica({
        id_lista: v_lista_tbl_gen,
        titulos: ['Cód Documento', 'Documento', 'N Tabla'],
        grid: [{ index: 'c_codigo', width: 200 },
        { index: 'd_descrip', width: 350 }, { index: 'n_tabla', width: 250, hidden: true }],
        caption: 'Lista de Documentos',
        sortname: 'c_codigo',
        sortorder: 'asc',
        filtros: ['TIPDOC'],
        campos: { c_codigo: 'c_documento', d_descrip: 'd_documento', n_tabla: 'n_tabla_doc' },
        keyNav: true,
        searchInput: '#c_documento',
        searchCode: true,
    });

    $('#d_denominacion').keydown(function () {
        if ($('#d_denominacion').val().length >= 4) {
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
            $('#lupa_n_cuit').show().css('display', 'table-cell');
            $('#mascara_lupa_n_cuit').hide();
            $('#lupa_n_documento').show().css('display', 'table-cell');
            $('#mascara_lupa_n_documento').hide();
        } else {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
            $('#lupa_n_cuit').hide();
            $('#mascara_lupa_n_cuit').show().css('display', 'table-cell');
            $('#lupa_n_documento').hide();
            $('#mascara_lupa_n_documento').show().css('display', 'table-cell');
        }
    });

    $("#lupa_banco_rec").lupa_generica({
        id_lista: vg_lista_bancos,
        titulos: ['Cód. Bancos', 'Bancos'],
        grid: [{ index: 'c_codigo', width: 200 },
        { index: 'd_descrip', width: 350 }],
        caption: 'Lista de Bancos',
        sortname: 'c_codigo',
        sortorder: 'asc',
        campos: { c_codigo: 'c_banco_rec', d_descrip: 'd_banco_rec' },
        keyNav: true,
        searchInput: '#c_banco_rec',
        searchCode: true,
        limpiarCod: true,
    });

    $("#lupa_sucursal_rec").lupa_generica({
        id_lista: vg_lista_sucursales,
        titulos: ['Cód. Sucursales', 'Sucursales'],
        grid: [{ index: 'c_codigo', width: 200 },
        { index: 'd_descrip', width: 350 }],
        caption: 'Lista de Sucursales',
        sortname: 'c_codigo',
        sortorder: 'asc',
        filtros: ['#c_banco_rec', '#t_archivo', 'g_archivo_inm'],
        filtrosTitulos: ['Banco'],
        filtrosNulos: [false, true, false],
        campos: { c_codigo: 'c_sucursal_rec', d_descrip: 'd_sucursal_rec' },
        keyNav: true,
        searchInput: '#c_sucursal_rec',
        searchCode: true,
        limpiarCod: true,
    });

    $("#lupa_medio_pago").lupa_generica({
        id_lista: v_lista_mp,
        titulos: ['Cód. Medio de Pago', 'Medio de Pago', 'N Tabla'],
        grid: [{ index: 'c_codigo', width: 200 },
        { index: 'd_descrip', width: 350 }, { index: 'n_tabla', width: 350, hidden: true }],
        caption: 'Lista de Medios de Pago',
        sortname: 'c_codigo',
        sortorder: 'asc',
        campos: { c_codigo: 'c_medio_pago', d_descrip: 'd_medio_pago', n_tabla: 'n_tabla_mp' },
        keyNav: true,
        searchInput: '#c_medio_pago',
        searchCode: true,
        limpiarCod: true,
        onClose: function () {
            if (v_modo == 'update') {
                if ($('#c_medio_pago').val() == "") {
                    $('#n_cheque').val("");
                    $('#c_banco_emisor').val("");
                    $('#d_banco_emisor').val("");
                }

                if (!($('#c_medio_pago').val() == '2' || $('#c_medio_pago').val() == '3' || $('#c_medio_pago').val() == '4' || $('#c_medio_pago').val() == '5')) {
                    $('#n_cheque').val("")
                    $('#c_banco_emisor').val("")
                    $('#d_banco_emisor').val("")
                }
                estado_banco();
            }
        }
    });

    $("#lupa_banco_emisor").lupa_generica({
        id_lista: vg_lista_bancos,
        titulos: ['Cód. Bancos', 'Bancos'],
        grid: [{ index: 'c_codigo', width: 200 },
        { index: 'd_descrip', width: 350 }],
        caption: 'Lista de Bancos',
        sortname: 'c_codigo',
        sortorder: 'asc',
        campos: { c_codigo: 'c_banco_emisor', d_descrip: 'd_banco_emisor' },
        keyNav: true,
        searchInput: '#c_banco_emisor',
        searchCode: true,
        limpiarCod: true,
    });

    $("#lupa_n_remesa").lupa_generica({
        id_lista: v_lista_remitos,
        titulos: ['Nro. Remesa', 'Fecha'],
        grid: [{ index: 'c_codigo', width: 200 },
        { index: 'd_descrip', width: 350 }],
        caption: 'Lista de Remesas',
        sortname: 'c_codigo',
        sortorder: 'desc',
        campos: { c_codigo: 'n_remesa' },
        keyNav: true,
        searchInput: '#n_remesa',
        searchCode: true,
        limpiarCod: true,
    });

}
