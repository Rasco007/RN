function inicializa_eventos() {

    $("#n_cuit_filtro").mask("99-99999999-9");
    $('#lupa_d_denominacion').hide();
    $('#lupa_obj_hecho_filtro').hide();
    $('#mascara_lupa_c_tributo_filtro').hide();
    $('#mascara_lupa_c_alicuota_filtro').hide();

    $('#div_d_msg').hide();
    $('#id_contribuyente').hide();
    $('#gridWrapper_detalle').hide();

    $('.datepicker').datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true,
        dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    }).mask("99/99/9999");

    $('#d_denominacion_filtro').on('keydown focusout', function (event) {
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

    $('#d_objeto_hecho_filtro').on('keydown focusout', function (event) {
        if (
            /^[0-9]$/.test(event.key) ||  // Teclas numéricas
            event.key === 'Backspace' ||    // Tecla de borrar
            (event.ctrlKey && event.key === 'v')  // Ctrl+V (pegar)
        ) {
            if (event.type === 'keydown' && $(this).val().length >= 2) {
                $('#lupa_obj_hecho_filtro').show().css('display', 'table-cell');
                $('#mascara_lupa_obj_hecho_filtro').hide();
            } else if (event.type === 'keydown') {
                $('#lupa_obj_hecho_filtro').hide();
                $('#mascara_lupa_obj_hecho_filtro').show().css('display', 'table-cell');
            } else if (event.type === 'focusout' && $(this).val().length <= 2) {
                $('#lupa_obj_hecho_filtro').hide();
                $('#mascara_lupa_obj_hecho_filtro').show().css('display', 'table-cell');
            }
        } else {
            event.preventDefault();
        }
    });

    $("#btn_listado_exclusion").click(function () {

        $('#modal_exclusion').show();
        $(window).resize();

    });

    $('#btn_limpiar').click(function () {
        limpiar_campos();
        $('#f_padron_desde').val(null);
    });

    $("#btn_buscar").click(function () {
        filtros_no_nativos_ar = [];
        filtros_arr_main = [];

        $('#n_cuit_filtro').attr('disabled', true);
        $('#d_denominacion_filtro').attr('disabled', true);
        $('#c_tributo_filtro').attr('disabled', true);
        $('#d_tributo_filtro').attr('disabled', true);
        $('#observaciones_filtro').attr('disabled', true);
        $('#c_alicuota_filtro').attr('disabled', true);
        $('#padron_hasta_filtro').attr('disabled', true);
        $('#padron_desde_filtro').attr('disabled', true);
        $('#d_objeto_hecho_filtro').attr('disabled', true);
        $('#f_padron_desde').attr('disabled', true);
        $('#f_padron_hasta').attr('disabled', true);
        $('#btn_buscar').attr('disabled', true);
        $('#lupa_c_tributo_filtro').hide();
        $('#mascara_lupa_c_tributo_filtro').show().css('display', 'table-cell');

        $('#lupa_c_alicuota_filtro').hide();
        $('#mascara_lupa_c_alicuota_filtro').show().css('display', 'table-cell');

        $('#lupa_d_denominacion').hide();
        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');

        $('#lupa_obj_hecho_filtro').hide();
        $('#mascara_lupa_obj_hecho_filtro').show().css('display', 'table-cell');

        if ($('#n_cuit_filtro').val() != '') {
            filtros_arr_main.push('CUIT: ' + $('#n_cuit_filtro').val());
        }
        if ($('#d_denominacion_filtro').val() != '') {
            filtros_arr_main.push('Denominación: ' + $('#d_denominacion_filtro').val());
        }
        if ($('#c_tributo_filtro').val() != '') {
            filtros_arr_main.push('Tributo: ' + $('#c_tributo_filtro').val() + ' - ' + $('#d_tributo_filtro').val());
        }
        if ($('#d_objeto_hecho_filtro').val() != '') {
            filtros_arr_main.push('Nro. Inscripción: ' + $('#d_objeto_hecho_filtro').val());
        }
        if ($('#f_padron_desde').val() != '') {
            filtros_arr_main.push('Padrón Desde: ' + $('#f_padron_desde').val());
        }
        if ($('#f_padron_hasta').val() != '') {
            filtros_arr_main.push('Padrón Hasta: ' + $('#f_padron_hasta').val());
        }
        if ($('#c_alicuota_filtro').val() != '') {
            filtros_arr_main.push('Alicuotas: ' + $('#c_alicuota_filtro').val() + ' ' + $('#d_alicuota_filtro').val());
        }

        filtros_no_nativos_ar['detalles_grid'] = filtros_arr_main;
        filtros_no_nativos_ar['main_grid'] = filtros_arr_main;

        if (!valida_fechas(null)) {
            mostrar_error('Padrón Hasta debe ser igual o posterior Padrón Desde: ' + $('#f_padron_desde').val());
            limpiar_campos();
            return;
        }

        setea_parametros('#detalles_grid', {
            ':p_n_cuit': limpiar_formato_cuit($('#n_cuit_filtro').val()),
            ':p_d_objeto_hecho': $('#d_objeto_hecho_filtro').val(),
            ':p_c_tributo': $('#c_tributo_filtro').val(),
            ':p_C_ALICUOTA_SIRCREB': $('#c_alicuota_filtro').val(),
            ':p_f_certificado': $('#f_padron_desde').val(),
            ':p_f_validez': $('#f_padron_hasta').val()
        });

        $('#gridWrapper_detalle').show();

    });


    $("#btn_guardar").click(function () {

        if ($('#id_contribuyente_filtro').val() == '') {
            mostrar_cuadro('E', 'Error', 'Debe ingresar un Contribuyente');
        } else if ($('#c_tributo_filtro').val() == '') {
            mostrar_cuadro('E', 'Error', 'Debe ingresar un Tributo');
        } else if ($('#d_objeto_hecho_filtro').val() == '') {
            mostrar_cuadro('E', 'Error', 'Debe ingresar el Objeto Hecho');
        } else if ($('#padron_desde_filtro').val() == '') {
            mostrar_cuadro('E', 'Error', 'Debe ingresar Padrón Desde');
        } else if ($('#observaciones_filtro').val() == '') {
            mostrar_cuadro('E', 'Error', 'Debe ingresar la Observacion');
        } else if ($('#c_alicuota_filtro').val() == '') {
            mostrar_cuadro('E', 'Error', 'Debe ingresar la Alícuota');
        } else if ($('#padron_hasta_filtro').val() == '') {
            mostrar_cuadro('E', 'Error', 'Debe ingresar Padrón Hasta');
        } else {
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_n_periodo_desde": null,
                    "p_f_certificado": $('#padron_desde_filtro').val(),
                    "p_c_tributo": $('#c_tributo_filtro').val(),
                    "p_f_validez": $('#padron_hasta_filtro').val(),
                    "p_id_contribuyente": $('#id_contribuyente_filtro').val(),
                    "p_d_objeto_hecho": $('#d_objeto_hecho_filtro').val(),
                    "p_c_alicuota_sircreb": $('#c_alicuota_filtro').val(),
                    "p_d_observacion": $('#observaciones_filtro').val(),
                    "id_menu": 100146,
                    "n_orden": 0
                },
                dataType: 'json',
                success: function (data) {
                    if (data.resultado === 'OK') {
                        mostrar_confirmacion('Operación realizada con éxito.');
                    }
                    else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                    }
                }
            });

        }
    });


    $('#btn_imprimir').click(function () {
        if ($('#id_contribuyente_filtro').val() === '') {
            mostrar_cuadro('E', 'Error', 'Debe ingresar un Contribuyente');
        } else {

            if ($('#c_tributo_filtro').val() == 10) {
                p_regimen = ' Régimen Directo';
            } else {
                p_regimen = ' Convenio Multilateral';
            }

            if ($('#c_alicuota_filtro').val() != "") {
                if ($('#c_alicuota_filtro').val() == '0') {
                    p_alicuota = "";
                    p_titulo = ' EXCLUSION AL REGIMEN  ';
                } else {

                    p_alicuota = ', con la ' + $('#d_alicuota_filtro').val();
                    p_titulo = ' REDUCCION DE ALICUOTA NORMAL DEL REGIMEN ';
                }

            } else {
                p_alicuota = "";
            }


            if (p_alicuota == "") {
                p_in_ex = ' excluído del ';
            } else {
                p_in_ex = ' incluído en el ';

            }

            llamar_report('TRIBL033', 'p_regimen|' + p_regimen +
                '&p_titulo|' + p_titulo + '&p_in_ex|' + p_in_ex +
                '&p_alicuota|' + p_alicuota +
                '&p_f_certificado|' + p_f_certificado +
                '&p_id_contribuyente|' + p_id_contribuyente, 'PDF');
        }


    });



    $('#btn_volver, #cerrar_modal').click(function () {
        $('#modal_exclusion').hide();
    });

    $('#bt_informe_main_grid_pager').click(function () {
        $('#modal_exclusion').hide();
    });

    $('.cancelar_pdf').click(function () {
        $('#modal-content').hide();
    });



    $('#n_cuit_filtro').focusout(function () {
        if ($('#n_cuit_filtro').val() != '') {
            try {
                if (limpia_cuit($('#n_cuit_filtro').val()).length == 11) {
                    $.ajax({
                        type: 'POST',
                        url: "exclusiones_padron_SIRCREB/php/autocomplete.php",
                        data: { oper: '2', term: limpia_cuit($('#n_cuit_filtro').val()) },
                        dataType: 'json',
                        success: function (data) {
                            ajax_autocomplete = null;
                            if (data) {
                                $("#d_denominacion_filtro").val(data.D_DENOMINACION);
                                $("#id_contribuyente_filtro").val(data.ID_CONTRIBUYENTE);
                                $("#c_tributo_filtro").val(data.C_TRIBUTO);
                                $("#d_objeto_hecho_filtro").val(data.D_OBJETO_HECHO);
                                $("#d_tributo_filtro").val(data.D_TRIBUTO);
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
}


function imprimir(p_tributo, p_c_alicuota, p_f_certificado, p_id_contribuyente, p_d_alicuota) {

    if (p_tributo == 10) {
        p_regimen = ' Régimen Directo';

    } else {
        p_regimen = ' Convenio Multilateral';

    }

    if (p_c_alicuota != "") {

        if (p_c_alicuota == '0') {

            p_alicuota = "";
            p_titulo = ' EXCLUSION AL REGIMEN  ';
        } else {

            p_alicuota = ', con la ' + p_d_alicuota;
            p_titulo = ' REDUCCION DE ALICUOTA NORMAL DEL REGIMEN ';
        }

    } else {
        p_alicuota = "";
    }


    if (p_alicuota == "") {
        p_in_ex = ' excluído del ';
    } else {
        p_in_ex = ' incluído en el ';

    }
    llamar_report('TRIBL033', 'p_regimen|' + p_regimen +
        '&p_titulo|' + p_titulo + '&p_in_ex|' + p_in_ex +
        '&p_alicuota|' + p_alicuota +
        '&p_f_certificado|' + p_f_certificado +
        '&p_id_contribuyente|' + p_id_contribuyente, 'PDF');
}
function inicializa_lupas() {

    $("#lupa_c_alicuota_filtro").lupa_generica({
        id_lista: v_lista_alicuotas,
        titulos: ['Código', 'Descripción'],
        grid: [{ index: 'c_codigo', width: 100 },
        { index: 'd_descrip', width: 450 }],
        caption: 'Listado de Alicuotas',
        sortname: 'c_codigo',
        sortorder: 'desc',
        searchInput: '#c_alicuota_filtro',
        searchCode: true,
        campos: { c_codigo: 'c_alicuota_filtro', d_descrip: 'd_alicuota_filtro' },
        keyNav: true
    });

    $("#lupa_c_tributo_filtro").lupa_generica({
        id_lista: v_lista_tributos,
        titulos: ['Codigo Tributo', 'Descripción Tributo'],
        grid: [{ index: 'c_codigo', width: 100 },
        { index: 'd_descrip', width: 465 }],
        caption: 'LISTADO DE TRIBUTOS',
        sortname: 'c_codigo',
        sortorder: 'asc',
        widthGrid: 150,
        campos: { c_codigo: 'c_tributo_filtro', d_descrip: 'd_tributo_filtro' },
        keyNav: true,
        searchInput: '#c_tributo_filtro',
        searchCode: true,
        exactField: 'c_codigo'
    });


    $("#lupa_obj_hecho_filtro").lupa_generica({
        id_lista: v_lista_objetos,
        titulos: ['Nro. Inscripción', 'Tributo', 'Contribuyente', 'CUIT', 'ID Contrib.', 'Descrip. Tributo'],
        grid: [
            { index: 'd_objeto_hecho', width: 110 },
            { index: 'c_tributo', width: 65 },
            { index: 'd_denominacion', width: 290 },
            { index: 'n_cuit', width: 100 },
            { index: 'id_contribuyente', width: 10, hidden: true },
            { index: 'd_tributo', width: 10, hidden: true }
        ],
        caption: 'Nros. de Inscripción',
        sortname: 'd_objeto_hecho',
        sortorder: 'asc',
        filtros: ["#c_tributo_filtro", '#d_objeto_hecho_filtro', '#d_denominacion_filtro'],
        filtrosTitulos: ['Tributo', 'Nro. Inscripción', 'Denominación'],
        filtrosNulos: [true, true, true],
        campos: {
            n_cuit: 'n_cuit_filtro',
            d_denominacion: 'd_denominacion_filtro',
            c_tributo: 'c_tributo_filtro',
            d_tributo: 'd_tributo_filtro',
            d_objeto_hecho: 'd_objeto_hecho_filtro'
        },
        keyNav: true
    });

    $("#lupa_d_denominacion").lupa_generica({
        id_lista: v_lista_denominaciones,
        titulos: ['Contribuyente', 'CUIT', 'ID Contribuyente', 'Tributo', 'Nro. Inscripción', 'Desc. Tributo'],
        grid: [
            { index: 'd_denominacion', width: 290 },
            { index: 'n_cuit', width: 100 },
            { index: 'id_contribuyente', width: 450, hidden: true },
            { index: 'c_tributo', width: 60 },
            { index: 'd_objeto_hecho', width: 115 },
            { index: 'd_tributo', width: 115, hidden: true }
        ],
        caption: 'Contribuyentes',
        sortname: 'd_denominacion',
        sortorder: 'asc',
        filtros: ['#d_denominacion_filtro'],
        filtrosTitulos: ['Denominación'],
        filtrosNulos: [false],
        campos: {
            d_denominacion: 'd_denominacion_filtro',
            n_cuit: 'n_cuit_filtro',
            id_contribuyente: 'id_contribuyente_filtro',
            c_tributo: 'c_tributo_filtro',
            d_objeto_hecho: 'd_objeto_hecho_filtro',
            d_tributo: 'd_tributo_filtro'
        },
        keyNav: true,
        draggable: true
    });

}

function limpiar_formato_cuit(n_cuit) {
    if (n_cuit[2] != '-') {
        return n_cuit;
    } else {
        return n_cuit.replace(/-/g, '');
    }
}


