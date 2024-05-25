function inicializarLupas() {

    $("#lupa_localidades").lupa_generica({
        id_lista: v_lista_localidades,
        titulos: ['Localidad', 'Cód. Localidad', 'Cód. Postal'],
        grid: [
            { index: 'd_descrip', width: 465 },
            { index: 'c_localidad', width: 465, hidden: true },
            { index: 'c_postal', width: 100 }
        ],
        caption: 'Localidades SIAT',
        sortname: 'd_descrip',
        sortorder: 'asc',
        filtros: ['#provincia_c1'],
        filtrosNulos: [false],
        filtrosTitulos: ['Provincia'],
        keyNav: true,
        draggable: true,
    });

    $("#lupa_localidades_c6").lupa_generica({
        id_lista: v_lista_localidades,
        titulos: ['Localidad', 'Cód. Localidad', 'Cód. Postal'],
        grid: [
            { index: 'd_descrip', width: 465 },
            { index: 'c_localidad', width: 465, hidden: true },
            { index: 'c_postal', width: 100 }
        ],
        caption: 'Localidades SIAT',
        sortname: 'd_descrip',
        sortorder: 'asc',
        filtros: ['#provincia_c6'],
        filtrosNulos: [false],
        filtrosTitulos: ['Provincia'],
        keyNav: true,
        draggable: true,
    });

    $("#lupa_localidades_tit").lupa_generica({
        id_lista: v_lista_localidades,
        titulos: ['Localidad', 'Cód. Localidad', 'Cód. Postal'],
        grid: [
            { index: 'd_descrip', width: 465 },
            { index: 'c_localidad', width: 465, hidden: true },
            { index: 'c_postal', width: 100 }
        ],
        caption: 'Localidades SIAT',
        sortname: 'd_descrip',
        sortorder: 'asc',
        filtros: ['#c_provincia_tit'],
        filtrosNulos: [false],
        filtrosTitulos: ['Provincia'],
        keyNav: true,
        draggable: true,
    });

    $("#lupa_tipo_registro").lupa_generica({
        id_lista: v_lista_tipo_registro,
        titulos: ['Código', 'Descripción'],
        grid: [
            { index: 'c_tipo_registro', width: 100 },
            { index: 'd_tipo_registro', width: 450 }
        ],
        caption: 'Listado de Tipos de Registros',
        sortname: 'c_tipo_registro',
        sortorder: 'asc',
        searchInput: '#c_tipo_registro',
        searchCode: true,
        exactField: 'c_tipo_registro',
        campos: {
            c_tipo_registro: 'c_tipo_registro',
            d_tipo_registro: 'd_tipo_registro'
        },
        keyNav: true,
        draggable: true,
    });

    $("#lupa_envio").lupa_generica({
        id_lista: v_lista_envios,
        titulos: ['Nro. Envío', 'Archivo', 'Fecha', 'C1e', 'C2e', 'C3e', 'C4pe', 'C4de', 'C5e', 'C6e', 'C7e', 'C8e', 'C1', 'C2', 'C3', 'C4p', 'C4d', 'C5', 'C6', 'C7', 'C8'],
        grid: [
            { index: 'nro_envio', width: 150 },
            { index: 'archivo', width: 200 },
            { index: 'fecha', width: 100 },
            { index: 'c1_err', width: 50 },
            { index: 'c2_err', width: 50 },
            { index: 'c3_err', width: 50 },
            { index: 'c4p_err', width: 50 },
            { index: 'c4d_err', width: 50 },
            { index: 'c5_err', width: 50 },
            { index: 'c6_err', width: 50 },
            { index: 'c7_err', width: 50 },
            { index: 'c8_err', width: 50 },
            { index: 'c1_ok', width: 50 },
            { index: 'c2_ok', width: 50 },
            { index: 'c3_ok', width: 50 },
            { index: 'c4p_ok', width: 50 },
            { index: 'c4d_ok', width: 50 },
            { index: 'c5_ok', width: 50 },
            { index: 'c6_ok', width: 50 },
            { index: 'c7_ok', width: 50 },
            { index: 'c8_ok', width: 50 },
        ],
        caption: 'Listado de Envíos',
        sortname: 'nro_envio',
        sortorder: 'desc',
        filtros: [p_modo],
        filtrosNulos: [true],
        width: 1000,
        searchInput: '#n_envio',
        searchCode: true,
        exactField: 'nro_envio',
        campos: {
            nro_envio: 'n_envio',
        },
        keyNav: true,
        draggable: true,
        onClose: function () {
            if ($('#n_envio').val()) {
                v_c_filtro = $('#n_envio').val()
                $('#btn_buscar').trigger('click');
            }
        }
    });

    $("#lupa_d_denominacion").lupa_generica({
        id_lista: v_lista_denominaciones,
        titulos: ['ID Contribuyente', 'CUIT', 'Apellidos y Nombre / Razón Social', 'Tipo', 'Tipo Documento', 'Nro. Documento'],
        grid: [
            { index: 'id_contribuyente', width: 450, hidden: true },
            { index: 'n_cuit', width: 100 },
            { index: 'd_denominacion', width: 450 },
            { index: 'c_tipo_documento', width: 100 },
            { index: 'd_tipo_documento', width: 150, hidden: true },
            { index: 'n_documento', width: 150 }
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
            n_documento: 'n_documento'
        },
        keyNav: true,
        draggable: true,
    });
}

function definir_menu(p_modo) {
    if (p_modo == 'C') {
        $('#titulo').text('Consulta de movimientos RNPA');
    } else {
        $('#titulo').text('Corrección errores movimientos RNPA');
    }
}

function definir_nro_envio(p_nro_envio) {
    let filtros_check = '-PROCESADO-** ERROR **-NO PROCESAR-';
    if (p_modo == 'C') {
        filtros_check = '-PROCESADO-NO PROCESAR-';
        $('#check_ok').prop('checked', true);
        $('#check_np').prop('checked', true);
        $('#check_ok').prop('disabled', true);
        $('#check_error').prop('disabled', true);
        $('#check_np').prop('disabled', true);
        $('#check_pendientes').prop('disabled', true);

    }
    if (p_nro_envio) {
        v_c_filtro = p_nro_envio;

        filtros_arr_rnpa_lst = [];
        filtros_no_nativos_ar = [];

        if (v_c_filtro) {
            filtros_arr_rnpa_lst.push('Nro. Envío: ' + v_c_filtro);
        }

        filtros_no_nativos_ar['main_grid'] = filtros_arr_rnpa_lst;

        setea_parametros('#main_grid', {
            ':p_nro_envio': v_c_filtro,
            ':p_tipo_registro': null,
            ':p_dominio_nuevo': null,
            ':p_n_tramite': null,
            ':p_n_cuit': null,
            ':p_d_denominacion': null,
            ':p_f_operacion': null,
            ':p_c_reg_secc': null,
            ':p_d_reg_secc': null,
            ':p_filtros': filtros_check
        });
        $('#n_envio').val(v_c_filtro);
    } else {
        //OBTENER_NRO_ENVIO
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                "p_modo": p_modo,
                "id_menu": v_id_menu,
                "n_orden": 0
            },
            dataType: 'json',
            success: function (data) {
                if (data.resultado == 'OK') {
                    v_c_filtro = data.retorno;

                    filtros_arr_rnpa_lst = [];
                    filtros_no_nativos_ar = [];

                    if (v_c_filtro) {
                        filtros_arr_rnpa_lst.push('Nro. Envío: ' + v_c_filtro);
                    }

                    filtros_no_nativos_ar['main_grid'] = filtros_arr_rnpa_lst;

                    setea_parametros('#main_grid', {
                        ':p_nro_envio': v_c_filtro,
                        ':p_tipo_registro': null,
                        ':p_dominio_nuevo': null,
                        ':p_n_tramite': null,
                        ':p_n_cuit': null,
                        ':p_d_denominacion': null,
                        ':p_f_operacion': null,
                        ':p_c_reg_secc': null,
                        ':p_d_reg_secc': null,
                        ':p_filtros': filtros_check
                    });
                    $('#n_envio').val(v_c_filtro);
                }
                else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    }
}

function definir_filtros() {
    let filtro = '-';
    if (!$('#check_ok').is(':checked') && !$('#check_error').is(':checked') && !$('#check_np').is(':checked') && !$('#check_pendientes').is(':checked')) {
        filtro += 'PROCESADO-** ERROR **-NO PROCESAR--';
        return filtro;
    } else {
        if ($('#check_ok').is(':checked')) {
            filtro += 'PROCESADO-';
        }
        if ($('#check_error').is(':checked')) {
            filtro += '** ERROR **-';
        }
        if ($('#check_np').is(':checked')) {
            filtro += 'NO PROCESAR-';
        }
        if ($('#check_pendientes').is(':checked')) {
            filtro += '-';
        }
    }
    return filtro;
}

function busqueda_check() {
    $('#btn_buscar').trigger('click');
};

function bloquear_filtros() {
    $('#c_tipo_registro').prop('disabled', true);
    $('#n_envio').prop('disabled', true);
    $('#n_tramite').prop('disabled', true);
    $('#f_operacion').prop('disabled', true);
    $('#n_cuit').prop('disabled', true);
    $('#d_denominacion').prop('disabled', true);
    $('#c_reg_secc').prop('disabled', true);
    $('#d_reg_secc').prop('disabled', true);
    $('#dominio_nuevo').prop('disabled', true);
    /*$('#check_ok').prop('disabled', true);
    $('#check_error').prop('disabled', true);
    $('#check_np').prop('disabled', true);
    $('#check_pendientes').prop('disabled', true);*/
    $('#btn_ver_todos').prop('disabled', true);
    $('#btn_buscar').prop('disabled', true);

    $('#lupa_tipo_registro').hide();
    $('#mascara_lupa_tipo_registro').show().css('display', 'table-cell');
    $('#lupa_d_denominacion').hide();
    $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
    $('#lupa_envio').hide();
    $('#mascara_lupa_envio').show().css('display', 'table-cell');
}

function desbloquear_filtros() {
    $('#c_tipo_registro').prop('disabled', false);
    $('#n_envio').prop('disabled', false);
    $('#n_tramite').prop('disabled', false);
    $('#f_operacion').prop('disabled', false);
    $('#n_cuit').prop('disabled', false);
    $('#d_denominacion').prop('disabled', false);
    $('#c_reg_secc').prop('disabled', false);
    $('#d_reg_secc').prop('disabled', false);
    $('#dominio_nuevo').prop('disabled', false);
    /*$('#check_ok').prop('disabled', false);
    $('#check_error').prop('disabled', false);
    $('#check_np').prop('disabled', false);
    $('#check_pendientes').prop('disabled', false);*/
    $('#btn_ver_todos').prop('disabled', false);
    $('#btn_buscar').prop('disabled', false);

    $('#lupa_tipo_registro').show().css('display', 'table-cell');
    $('#mascara_lupa_tipo_registro').hide();
    $('#lupa_d_denominacion').hide();
    $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
    $('#mascara_lupa_envio').hide();
    $('#lupa_envio').show().css('display', 'table-cell');
}

function limpiar_pantalla_c2() {
    $('#dominio_nuevo_c2').val(null);
    $('#dominio_viejo_c2').val(null);
    $('#marca_c2').val(null);
    $('#modelo_c2').val(null);
    $('#n_anio_modelo_c2').val(null);
    $('#d_tipo_c2').val(null);
    $('#cilindrada_c2').val(null);
    $('#n_peso_c2').val(null);
    $('#valuacion_c2').val(null);
    $('#carga_c2').val(null);
    $('#c_tipo_uso_c2').val(null);
    $('#d_tipo_uso_c2').val(null);
    $('#f_radicacion_c2').val(null);
    $('#categoria_c2').val(null);
    $('#origen_c2').val(null);
    $('#fmcamod_c2').val(null);
    $('#c_reg_secc_c2').val(null);
    $('#d_reg_secc_c2').val(null);
    $('#f_operacion_c2').val(null);
    $('#cant_titulares_c2').val(null);
    $('#d_parametros_adic_c2').val(null);
    $('#d_reservado_c2').val(null);
    $('#d_observaciones_c2').val(null);
    $('#n_tramite_c2').val(null);
    $('#tipo_form_c2').val(null);
    $('#n_form_c2').val(null);
    $('#c_tipo_tramite_c2').val(null);
    $('#d_tipo_tramite_c2').val(null);
    $('#c_accion_c2').val(null);
    $('#d_accion_c2').val(null);
    $('#n_envio_c2').val(null);
    $('#n_secuencia_c2').val(null);
    $('#tipo_registro_c2').val(null);
    $('#tipo_sub_registro_c2').val(null);
    $('#cod_organismo_c2').val(null);
    $('#c_estado_c2').val(null);
    $('#d_error_c2').val(null);

    $('#dominio_nuevo_c2').prop('readonly', false);
    $('#dominio_viejo_c2').prop('readonly', false);
    $('#marca_c2').prop('disabled', false);
    $('#modelo_c2').prop('disabled', false);
    $('#n_anio_modelo_c2').prop('disabled', false);
    $('#d_tipo_c2').prop('disabled', false);
    $('#cilindrada_c2').prop('disabled', false);
    $('#n_peso_c2').prop('disabled', false);
    $('#valuacion_c2').prop('disabled', false);
    $('#carga_c2').prop('disabled', false);
    $('#c_tipo_uso_c2').prop('disabled', false);
    $('#d_tipo_uso_c2').prop('disabled', false);
    $('#f_radicacion_c2').prop('disabled', false);
    $('#categoria_c2').prop('disabled', false);
    $('#origen_c2').prop('disabled', false);
    $('#fmcamod_c2').prop('readonly', false);
    $('#c_reg_secc_c2').prop('disabled', false);
    $('#d_reg_secc_c2').prop('disabled', false);
    $('#f_operacion_c2').prop('disabled', false);
    $('#cant_titulares_c2').prop('disabled', false);
    $('#d_parametros_adic_c2').prop('disabled', false);
    $('#d_reservado_c2').prop('disabled', false);
    $('#d_observaciones_c2').prop('disabled', false);
    $('#n_tramite_c2').prop('disabled', false);
    $('#tipo_form_c2').prop('disabled', false);
    $('#n_form_c2').prop('disabled', false);
    $('#c_tipo_tramite_c2').prop('disabled', false);
    $('#d_tipo_tramite_c2').prop('disabled', false);
    $('#c_accion_c2').prop('disabled', false);
    $('#d_accion_c2').prop('disabled', false);
    $('#n_envio_c2').prop('disabled', false);
    $('#n_secuencia_c2').prop('disabled', false);
    $('#tipo_registro_c2').prop('disabled', false);
    $('#tipo_sub_registro_c2').prop('disabled', false);
    $('#cod_organismo_c2').prop('disabled', false);
    $('#c_estado_c2').prop('disabled', false);
    $('#d_error_c2').prop('readonly', false);

    $('#btn_no_procesar_c2').prop('disabled', true);
    $('#btn_procesar_sin_validar_c2').prop('disabled', true);
    $('#btn_procesar_c2').prop('disabled', true);
    $('#btn_guardar_c2').prop('disabled', true);

    limpiar_pantalla_titulares();
}

function limpiar_pantalla_c4() {
    $('#dominio_nuevo_c4').val(null);
    $('#n_pos_fiscal_c4').val(null);
    $('#n_cuota_anticipo_c4').val(null);
    $('#c_reg_secc_c4').val(null);
    $('#d_reg_secc_c4').val(null);
    $('#trans_n_envio_c4').val(null);
    $('#trans_f_pago_c4').val(null);
    $('#trans_f_acred_c4').val(null);
    $('#f_proceso_c4').val(null);
    $('#n_tramite_c4').val(null);
    $('#n_remito_c4').val(null);
    $('#i_impuesto_c4').val(null);
    $('#f_deposito_c4').val(null);
    $('#i_comun_c4').val(null);
    $('#f_cobro_c4').val(null);
    $('#i_bonificado_c4').val(null);
    $('#f_vencimiento_c4').val(null);
    $('#i_intereses_c4').val(null);
    $('#i_total_c4').val(null);
    $('#n_cheque_c4').val(null);
    $('#c_forma_pago_c4').val(null);
    $('#c_moneda_c4').val(null);
    $('#c_banco_c4').val(null);
    $('#d_banco_c4').val(null);
    $('#n_envio_c4').val(null);
    $('#n_secuencia_c4').val(null);
    $('#c_tipo_mov_c4').val(null);
    $('#c_tipo_registro_c4').val(null);
    $('#cod_organismo_c4').val(null);
    $('#error_ac_prov_c4').val(null);
    $('#error_ac_def_c4').val(null);
    $('#c_estado_prov_c4').val(null);
    $('#c_estado_def_c4').val(null);
    $('#reservado_c4').val(null);
    $('#observaciones_c4').val(null);
}

function limpiar_pantalla_c6() {
    $('#dominio_nuevo_c6').val(null);
    $('#dominio_viejo_c6').val(null);
    $('#marca_c6').val(null);
    $('#modelo_c6').val(null);
    $('#n_anio_modelo_c6').val(null);
    $('#d_tipo_c6').val(null);
    $('#cilindrada_c6').val(null);
    $('#n_peso_c6').val(null);
    $('#valuacion_c6').val(null);
    $('#carga_c6').val(null);
    $('#c_tipo_uso_c6').val(null);
    $('#d_tipo_uso_c6').val(null);
    $('#f_radicacion_c6').val(null);
    $('#categoria_c6').val(null);
    $('#origen_c6').val(null);
    $('#fmcamod_c6').val(null);
    $('#c_reg_secc_c6').val(null);
    $('#d_reg_secc_c6').val(null);
    $('#f_operacion_c6').val(null);
    $('#cant_titulares_c6').val(null);
    $('#d_parametros_adic_c6').val(null);
    $('#d_reservado_c6').val(null);
    $('#d_observaciones_c6').val(null);
    $('#n_tramite_c6').val(null);
    $('#tipo_form_c6').val(null);
    $('#n_form_c6').val(null);
    $('#c_tipo_tramite_c6').val(null);
    $('#d_tipo_tramite_c6').val(null);
    $('#c_accion_c6').val(null);
    $('#d_accion_c6').val(null);
    $('#n_envio_c6').val(null);
    $('#n_secuencia_c6').val(null);
    $('#tipo_registro_c6').val(null);
    $('#tipo_sub_registro_c6').val(null);
    $('#cod_organismo_c6').val(null);
    $('#c_estado_c6').val(null);
    $('#d_error_c6').val(null);
    $('#n_cuit_c6').val(null);
    $('#d_denominacion_c6').val(null);
    $('#d_denominacion_siat_c6').val(null);
    $('#d_denominacion_afip_c6').val(null);
    $('#c_tipo_doc_c6').val(null);
    $('#n_documento_c6').val(null);
    $('#calle_c6').val(null);
    $('#cod_postal_c6').val(null);
    $('#numero_c6').val(null);
    $('#piso_c6').val(null);
    $('#barrio_c6').val(null);
    $('#localidad_c6').val(null);
    $('#localidad_siat_c6').val(null);
    $('#provincia_c6').val(null);

    $('#dominio_nuevo_c6').prop('readonly', false);
    $('#dominio_viejo_c6').prop('readonly', false);
    $('#marca_c6').prop('disabled', false);
    $('#modelo_c6').prop('disabled', false);
    $('#n_anio_modelo_c6').prop('disabled', false);
    $('#d_tipo_c6').prop('disabled', false);
    $('#cilindrada_c6').prop('disabled', false);
    $('#n_peso_c6').prop('disabled', false);
    $('#valuacion_c6').prop('disabled', false);
    $('#carga_c6').prop('disabled', false);
    $('#c_tipo_uso_c6').prop('disabled', false);
    $('#d_tipo_uso_c6').prop('disabled', false);
    $('#f_radicacion_c6').prop('disabled', false);
    $('#categoria_c6').prop('disabled', false);
    $('#origen_c6').prop('disabled', false);
    $('#fmcamod_c6').prop('readonly', false);
    $('#c_reg_secc_c6').prop('disabled', false);
    $('#d_reg_secc_c6').prop('disabled', false);
    $('#f_operacion_c6').prop('disabled', false);
    $('#cant_titulares_c6').prop('disabled', false);
    $('#d_parametros_adic_c6').prop('disabled', false);
    $('#d_reservado_c6').prop('disabled', false);
    $('#d_observaciones_c6').prop('disabled', false);
    $('#n_tramite_c6').prop('disabled', false);
    $('#tipo_form_c6').prop('disabled', false);
    $('#n_form_c6').prop('disabled', false);
    $('#c_tipo_tramite_c6').prop('disabled', false);
    $('#d_tipo_tramite_c6').prop('disabled', false);
    $('#c_accion_c6').prop('disabled', false);
    $('#d_accion_c6').prop('disabled', false);
    $('#n_envio_c6').prop('disabled', false);
    $('#n_secuencia_c6').prop('disabled', false);
    $('#tipo_registro_c6').prop('disabled', false);
    $('#tipo_sub_registro_c6').prop('disabled', false);
    $('#cod_organismo_c6').prop('disabled', false);
    $('#c_estado_c6').prop('disabled', false);
    $('#d_error_c6').prop('readonly', false);
    $('#n_cuit_c6').prop('readonly', false);
    $('#d_denominacion_c6').prop('disabled', false);
    $('#c_tipo_doc_c6').prop('disabled', false);
    $('#n_documento_c6').prop('disabled', false);
    $('#calle_c6').prop('disabled', false);
    $('#cod_postal_c6').prop('disabled', false);
    $('#numero_c6').prop('disabled', false);
    $('#piso_c6').prop('disabled', false);
    $('#barrio_c6').prop('disabled', false);
    $('#localidad_c6').prop('disabled', false);
    $('#localidad_siat_c6').prop('disabled', false);
    $('#provincia_c6').prop('disabled', false);

    $('#btn_no_procesar_c6').prop('disabled', true);
    $('#btn_procesar_sin_validar_c6').prop('disabled', true);
    $('#btn_procesar_c6').prop('disabled', true);
    $('#btn_guardar_c6').prop('disabled', true);
    $('#btn_cambiar_dom_proc_c6').prop('disabled', true);

    limpiar_pantalla_titulares();
}

function limpiar_pantalla_c7() {
    $('#dominio_nuevo_c7').val(null);
    $('#f_alta_c7').val(null);
    $('#f_baja_c7').val(null);
    $('#c_reg_secc_c7').val(null);
    $('#d_reg_secc_c7').val(null);
    $('#c_origen_info_c7').val(null);
    $('#c_radicacion_c7').val(null);
    $('#c_estado_rad_c7').val(null);
    $('#n_envio_c7').val(null);
    $('#n_secuencia_c7').val(null);
    $('#tipo_registro_c7').val(null);
    $('#tipo_sub_registro_c7').val(null);
    $('#cod_organismo_c7').val(null);
    $('#c_estado_c7').val(null);
    $('#d_error_c7').val(null);
    $('#reservado_c7').val(null);
    $('#observaciones_c7').val(null);

    $('#dominio_nuevo_c7').prop('readonly', false);
    $('#f_alta_c7').prop('disabled', false);
    $('#f_baja_c7').prop('disabled', false);
    $('#c_reg_secc_c7').prop('disabled', false);
    $('#d_reg_secc_c7').prop('disabled', false);
    $('#c_origen_info_c7').prop('disabled', false);
    $('#c_radicacion_c7').prop('disabled', false);
    $('#c_estado_rad_c7').prop('disabled', false);
    $('#n_envio_c7').prop('disabled', false);
    $('#n_secuencia_c7').prop('disabled', false);
    $('#tipo_registro_c7').prop('disabled', false);
    $('#tipo_sub_registro_c7').prop('disabled', false);
    $('#cod_organismo_c7').prop('disabled', false);
    $('#c_estado_c7').prop('disabled', false);
    $('#d_error_c7').prop('readonly', false);
    $('#reservado_c7').prop('disabled', false);
    $('#observaciones_c7').prop('disabled', false);

    $('#btn_no_procesar_c7').prop('disabled', true);
    $('#btn_procesar_c7').prop('disabled', true);
    $('#btn_guardar_c7').prop('disabled', true);
}

function limpiar_pantalla_c8() {
    $('#dominio_nuevo_c8').val(null);
    $('#dominio_viejo_c8').val(null);
    $('#marca_c8').val(null);
    $('#modelo_c8').val(null);
    $('#d_tipo_c8').val(null);
    $('#n_anio_modelo_c8').val(null);
    $('#categoria_c8').val(null);
    $('#origen_c8').val(null);
    $('#fmcamod_c8').val(null);
    $('#n_tramite_c8').val(null);
    $('#tipo_form_c8').val(null);
    $('#n_form_c8').val(null);
    $('#c_tipo_tramite_c8').val(null);
    $('#d_tipo_tramite_c8').val(null);
    $('#c_accion_c8').val(null);
    $('#d_accion_c8').val(null);
    $('#reservado_c8').val(null);
    $('#observaciones_c8').val(null);
    $('#c_reg_secc_c8').val(null);
    $('#d_reg_secc_c8').val(null);
    $('#n_envio_c8').val(null);
    $('#n_secuencia_c8').val(null);
    $('#tipo_registro_c8').val(null);
    $('#tipo_sub_registro_c8').val(null);
    $('#cod_organismo_c8').val(null);
    $('#c_estado_c8').val(null);
    $('#d_error_c8').val(null);
    $('#i_monto_adi_c8').val(null);
    $('#i_monto_pun_c8').val(null);
    $('#i_monto_imp_c8').val(null);
    $('#i_monto_total_c8').val(null);
    $('#f_cobro_c8').val(null);
    $('#f_deposito_c8').val(null);
    $('#f_tramite_c8').val(null);
    $('#f_baja_c8').val(null)
    $('#c_banco_c8').val(null);
    $('#d_banco_c8').val(null);
    $('#c_moneda_c8').val(null);
    $('#cant_detalle_c8').val(null);

    $('#dominio_nuevo_c8').prop('readonly', false);
    $('#dominio_viejo_c8').prop('readonly', false);
    $('#marca_c8').prop('disabled', false);
    $('#modelo_c8').prop('disabled', false);
    $('#d_tipo_c8').prop('disabled', false);
    $('#n_anio_modelo_c8').prop('disabled', false);
    $('#categoria_c8').prop('disabled', false);
    $('#origen_c8').prop('disabled', false);
    $('#fmcamod_c8').prop('readonly', false);
    $('#n_tramite_c8').prop('disabled', false);
    $('#tipo_form_c8').prop('disabled', false);
    $('#n_form_c8').prop('disabled', false);
    $('#c_tipo_tramite_c8').prop('disabled', false);
    $('#d_tipo_tramite_c8').prop('disabled', false);
    $('#c_accion_c8').prop('disabled', false);
    $('#d_accion_c8').prop('disabled', false);
    $('#reservado_c8').prop('disabled', false);
    $('#observaciones_c8').prop('disabled', false);
    $('#c_reg_secc_c8').prop('disabled', false);
    $('#d_reg_secc_c8').prop('disabled', false);
    $('#d_error_c8').prop('readonly', false);
    $('#i_monto_adi_c8').prop('disabled', false);
    $('#i_monto_pun_c8').prop('disabled', false);
    $('#i_monto_imp_c8').prop('disabled', false);
    $('#i_monto_total_c8').prop('disabled', false);
    $('#f_cobro_c8').prop('disabled', false);
    $('#f_deposito_c8').prop('disabled', false);
    $('#f_tramite_c8').prop('disabled', false);
    $('#f_baja_c8').prop('disabled', false)
    $('#c_banco_c8').prop('disabled', false);
    $('#d_banco_c8').prop('disabled', false);
    $('#c_moneda_c8').prop('disabled', false);
    $('#cant_detalle_c8').prop('disabled', false);

    $('#btn_no_procesar_c8').prop('disabled', true);
    $('#btn_procesar_c8').prop('disabled', true);
    $('#btn_guardar_c8').prop('disabled', true);
}

function limpiar_pantalla_c1() {
    $('#dominio_nuevo_c1').val(null);
    $('#dominio_viejo_c1').val(null);
    $('#marca_c1').val(null);
    $('#modelo_c1').val(null);
    $('#n_anio_modelo_c1').val(null);
    $('#d_tipo_c1').val(null);
    $('#cilindrada_c1').val(null);
    $('#n_peso_c1').val(null);
    $('#valuacion_c1').val(null);
    $('#carga_c1').val(null);
    $('#c_tipo_uso_c1').val(null);
    $('#d_tipo_uso_c1').val(null);
    $('#f_radicacion_c1').val(null);
    $('#categoria_c1').val(null);
    $('#origen_c1').val(null);
    $('#fmcamod_c1').val(null);
    $('#c_reg_secc_c1').val(null);
    $('#d_reg_secc_c1').val(null);
    $('#f_inscripcion_c1').val(null);
    $('#cant_titulares_c1').val(null);
    $('#d_parametros_adic_c1').val(null);
    $('#d_reservado_c1').val(null);
    $('#d_observaciones_c1').val(null);
    $('#n_tramite_c1').val(null);
    $('#tipo_form_c1').val(null);
    $('#n_form_c1').val(null);
    $('#c_tipo_tramite_c1').val(null);
    $('#d_tipo_tramite_c1').val(null);
    $('#c_accion_c1').val(null);
    $('#d_accion_c1').val(null);
    $('#d_error_c1').val(null);

    $('#n_cuit_c1').val(null);
    $('#d_denominacion_c1').val(null);
    $('#d_denominacion_siat_c1').val(null);
    $('#d_denominacion_afip_c1').val(null);
    $('#c_tipo_doc_c1').val(null);
    $('#n_documento_c1').val(null);
    $('#calle_c1').val(null);
    $('#cod_postal_c1').val(null);
    $('#numero_c1').val(null);
    $('#piso_c1').val(null);
    $('#barrio_c1').val(null);
    $('#localidad_c1').val(null);
    $('#localidad_siat_c1').val(null);
    $('#provincia_c1').val(null);

    $('#c_grupo_siat_c1').val(null);
    $('#c_marca_siat_c1').val(null);
    $('#id_modelo_siat_c1').val(null);
    $('#id_descripcion_sait_c1').val(null);
    $('#c_tipo_siat_c1').val(null);
    $('#c_reg_secc_ori_c1').val(null);
    $('#d_reg_secc_ori_c1').val(null);
    $('#d_muni_origen_c1').val(null);
    $('#f_operacion_c1').val(null);

    $('#dominio_nuevo_c1').prop('readonly', false);
    $('#dominio_viejo_c1').prop('readonly', false);
    $('#marca_c1').prop('disabled', false);
    $('#modelo_c1').prop('disabled', false);
    $('#n_anio_modelo_c1').prop('disabled', false);
    $('#d_tipo_c1').prop('disabled', false);
    $('#cilindrada_c1').prop('disabled', false);
    $('#n_peso_c1').prop('disabled', false);
    $('#valuacion_c1').prop('disabled', false);
    $('#carga_c1').prop('disabled', false);
    $('#c_tipo_uso_c1').prop('disabled', false);
    $('#d_tipo_uso_c1').prop('disabled', false);
    $('#f_radicacion_c1').prop('disabled', false);
    $('#categoria_c1').prop('disabled', false);
    $('#origen_c1').prop('disabled', false);
    $('#fmcamod_c1').prop('readonly', false);
    $('#c_reg_secc_c1').prop('disabled', false);
    $('#d_reg_secc_c1').prop('disabled', false);
    $('#f_inscripcion_c1').prop('disabled', false);
    $('#cant_titulares_c1').prop('disabled', false);
    $('#d_parametros_adic_c1').prop('disabled', false);
    $('#d_reservado_c1').prop('disabled', false);
    $('#d_observaciones_c1').prop('disabled', false);
    $('#n_tramite_c1').prop('disabled', false);
    $('#tipo_form_c1').prop('disabled', false);
    $('#n_form_c1').prop('disabled', false);
    $('#c_tipo_tramite_c1').prop('disabled', false);
    $('#d_tipo_tramite_c1').prop('disabled', false);
    $('#c_accion_c1').prop('disabled', false);
    $('#d_accion_c1').prop('disabled', false);
    $('#d_error_c1').prop('readonly', false);

    $('#n_cuit_c1').prop('readonly', false);
    $('#d_denominacion_c1').prop('disabled', false);
    $('#c_tipo_doc_c1').prop('disabled', false);
    $('#n_documento_c1').prop('disabled', false);
    $('#calle_c1').prop('disabled', false);
    $('#cod_postal_c1').prop('disabled', false);
    $('#numero_c1').prop('disabled', false);
    $('#piso_c1').prop('disabled', false);
    $('#barrio_c1').prop('disabled', false);
    $('#localidad_c1').prop('disabled', false);
    $('#localidad_siat_c1').prop('disabled', false);
    $('#provincia_c1').prop('disabled', false);

    $('#c_grupo_siat_c1').prop('disabled', false);
    $('#c_marca_siat_c1').prop('disabled', false);
    $('#id_modelo_siat_c1').prop('disabled', false);
    $('#id_descripcion_sait_c1').prop('disabled', false);
    $('#c_tipo_siat_c1').prop('disabled', false);
    $('#c_reg_secc_ori_c1').prop('disabled', false);
    $('#d_reg_secc_ori_c1').prop('disabled', false);
    $('#d_muni_origen_c1').prop('disabled', false);
    $('#f_operacion_c1').prop('disabled', false);

    $('#btn_no_procesar_c1').prop('disabled', true);
    $('#btn_procesar_c1').prop('disabled', true);
    $('#btn_guardar_c1').prop('disabled', true);
    $('#btn_tabla_cod_rnpa_c1').prop('disabled', true);
    $('#btn_confirm_baja_y_proc_c1').prop('disabled', true);
    $('#btn_cambiar_dom_y_proc_c1').prop('disabled', true);
    $('#btn_leer_cod_rnpa').prop('disabled', true);

    limpiar_pantalla_titulares();
}

function formatear_importes_c4() {
    $('#i_impuesto_c4').val($('#i_impuesto_c4').val().replace(/\./g, ','));
    $('#i_comun_c4').val($('#i_impuesto_c4').val().replace(/\./g, ','));
    $('#i_bonificado_c4').val($('#i_impuesto_c4').val().replace(/\./g, ','));
    $('#i_intereses_c4').val($('#i_intereses_c4').val().replace(/\./g, ','));
    $('#i_total_c4').val($('#i_impuesto_c4').val().replace(/\./g, ','));
}

function modo_consulta_c2() {
    $('#dominio_nuevo_c2').prop('readonly', true);
    $('#dominio_viejo_c2').prop('readonly', true);
    $('#marca_c2').prop('disabled', true);
    $('#modelo_c2').prop('disabled', true);
    $('#n_anio_modelo_c2').prop('disabled', true);
    $('#d_tipo_c2').prop('disabled', true);
    $('#cilindrada_c2').prop('disabled', true);
    $('#n_peso_c2').prop('disabled', true);
    $('#valuacion_c2').prop('disabled', true);
    $('#carga_c2').prop('disabled', true);
    $('#c_tipo_uso_c2').prop('disabled', true);
    $('#d_tipo_uso_c2').prop('disabled', true);
    $('#f_radicacion_c2').prop('disabled', true);
    $('#categoria_c2').prop('disabled', true);
    $('#origen_c2').prop('disabled', true);
    $('#fmcamod_c2').prop('readonly', true);
    $('#c_reg_secc_c2').prop('disabled', true);
    $('#d_reg_secc_c2').prop('disabled', true);
    $('#f_operacion_c2').prop('disabled', true);
    $('#cant_titulares_c2').prop('disabled', true);
    $('#d_parametros_adic_c2').prop('disabled', true);
    $('#d_reservado_c2').prop('disabled', true);
    $('#d_observaciones_c2').prop('disabled', true);
    $('#n_tramite_c2').prop('disabled', true);
    $('#tipo_form_c2').prop('disabled', true);
    $('#n_form_c2').prop('disabled', true);
    $('#c_tipo_tramite_c2').prop('disabled', true);
    $('#d_tipo_tramite_c2').prop('disabled', true);
    $('#c_accion_c2').prop('disabled', true);
    $('#d_accion_c2').prop('disabled', true);
    $('#n_envio_c2').prop('disabled', true);
    $('#n_secuencia_c2').prop('disabled', true);
    $('#tipo_registro_c2').prop('disabled', true);
    $('#tipo_sub_registro_c2').prop('disabled', true);
    $('#cod_organismo_c2').prop('disabled', true);
    $('#c_estado_c2').prop('disabled', true);
    $('#d_error_c2').prop('readonly', true);

    modo_consulta_titulares();
}

function modo_consulta_c6() {
    $('#dominio_nuevo_c6').prop('readonly', true);
    $('#dominio_viejo_c6').prop('readonly', true);
    $('#marca_c6').prop('disabled', true);
    $('#modelo_c6').prop('disabled', true);
    $('#n_anio_modelo_c6').prop('disabled', true);
    $('#d_tipo_c6').prop('disabled', true);
    $('#cilindrada_c6').prop('disabled', true);
    $('#n_peso_c6').prop('disabled', true);
    $('#valuacion_c6').prop('disabled', true);
    $('#carga_c6').prop('disabled', true);
    $('#c_tipo_uso_c6').prop('disabled', true);
    $('#d_tipo_uso_c6').prop('disabled', true);
    $('#f_radicacion_c6').prop('disabled', true);
    $('#categoria_c6').prop('disabled', true);
    $('#origen_c6').prop('disabled', true);
    $('#fmcamod_c6').prop('readonly', true);
    $('#c_reg_secc_c6').prop('disabled', true);
    $('#d_reg_secc_c6').prop('disabled', true);
    $('#f_operacion_c6').prop('disabled', true);
    $('#cant_titulares_c6').prop('disabled', true);
    $('#d_parametros_adic_c6').prop('disabled', true);
    $('#d_reservado_c6').prop('disabled', true);
    $('#d_observaciones_c6').prop('disabled', true);
    $('#n_tramite_c6').prop('disabled', true);
    $('#tipo_form_c6').prop('disabled', true);
    $('#n_form_c6').prop('disabled', true);
    $('#c_tipo_tramite_c6').prop('disabled', true);
    $('#d_tipo_tramite_c6').prop('disabled', true);
    $('#c_accion_c6').prop('disabled', true);
    $('#d_accion_c6').prop('disabled', true);
    $('#n_envio_c6').prop('disabled', true);
    $('#n_secuencia_c6').prop('disabled', true);
    $('#tipo_registro_c6').prop('disabled', true);
    $('#tipo_sub_registro_c6').prop('disabled', true);
    $('#cod_organismo_c6').prop('disabled', true);
    $('#c_estado_c6').prop('disabled', true);
    $('#d_error_c6').prop('readonly', true);
    $('#n_cuit_c6').prop('readonly', true);
    $('#d_denominacion_c6').prop('disabled', true);
    $('#d_denominacion_siat_c6').prop('disabled', true);
    $('#d_denominacion_afip_c6').prop('disabled', true);
    $('#c_tipo_doc_c6').prop('disabled', true);
    $('#n_documento_c6').prop('disabled', true);
    $('#calle_c6').prop('disabled', true);
    $('#cod_postal_c6').prop('disabled', true);
    $('#numero_c6').prop('disabled', true);
    $('#piso_c6').prop('disabled', true);
    $('#barrio_c6').prop('disabled', true);
    $('#localidad_c6').prop('disabled', true);
    $('#localidad_siat_c6').prop('disabled', true);
    $('#provincia_c6').prop('disabled', true);

    modo_consulta_titulares();
}

function modo_consulta_c7() {
    $('#dominio_nuevo_c7').prop('readonly', true);
    $('#f_alta_c7').prop('disabled', true);
    $('#f_baja_c7').prop('disabled', true);
    $('#c_reg_secc_c7').prop('disabled', true);
    $('#d_reg_secc_c7').prop('disabled', true);
    $('#c_origen_info_c7').prop('disabled', true);
    $('#c_radicacion_c7').prop('disabled', true);
    $('#c_estado_rad_c7').prop('disabled', true);
    $('#n_envio_c7').prop('disabled', true);
    $('#n_secuencia_c7').prop('disabled', true);
    $('#tipo_registro_c7').prop('disabled', true);
    $('#tipo_sub_registro_c7').prop('disabled', true);
    $('#cod_organismo_c7').prop('disabled', true);
    $('#c_estado_c7').prop('disabled', true);
    $('#d_error_c7').prop('readonly', true);
    $('#reservado_c7').prop('disabled', true);
    $('#observaciones_c7').prop('disabled', true);
}

function modo_consulta_c8() {
    $('#dominio_nuevo_c8').prop('readonly', true);
    $('#dominio_viejo_c8').prop('readonly', true);
    $('#marca_c8').prop('disabled', true);
    $('#modelo_c8').prop('disabled', true);
    $('#d_tipo_c8').prop('disabled', true);
    $('#n_anio_modelo_c8').prop('disabled', true);
    $('#categoria_c8').prop('disabled', true);
    $('#origen_c8').prop('disabled', true);
    $('#fmcamod_c8').prop('readonly', true);
    $('#n_tramite_c8').prop('disabled', true);
    $('#tipo_form_c8').prop('disabled', true);
    $('#n_form_c8').prop('disabled', true);
    $('#c_tipo_tramite_c8').prop('disabled', true);
    $('#d_tipo_tramite_c8').prop('disabled', true);
    $('#c_accion_c8').prop('disabled', true);
    $('#d_accion_c8').prop('disabled', true);
    $('#reservado_c8').prop('disabled', true);
    $('#observaciones_c8').prop('disabled', true);
    $('#c_reg_secc_c8').prop('disabled', true);
    $('#d_reg_secc_c8').prop('disabled', true);
    $('#n_envio_c8').prop('disabled', true);
    $('#n_secuencia_c8').prop('disabled', true);
    $('#tipo_registro_c8').prop('disabled', true);
    $('#tipo_sub_registro_c8').prop('disabled', true);
    $('#cod_organismo_c8').prop('disabled', true);
    $('#c_estado_c8').prop('disabled', true);
    $('#d_error_c8').prop('readonly', true);
    $('#i_monto_adi_c8').prop('disabled', true);
    $('#i_monto_pun_c8').prop('disabled', true);
    $('#i_monto_imp_c8').prop('disabled', true);
    $('#i_monto_total_c8').prop('disabled', true);
    $('#f_cobro_c8').prop('disabled', true);
    $('#f_deposito_c8').prop('disabled', true);
    $('#f_tramite_c8').prop('disabled', true);
    $('#f_baja_c8').prop('disabled', true)
    $('#c_banco_c8').prop('disabled', true);
    $('#d_banco_c8').prop('disabled', true);
    $('#c_moneda_c8').prop('disabled', true);
    $('#cant_detalle_c8').prop('disabled', true);
}

function modo_consulta_c1() {
    $('#dominio_nuevo_c1').prop('readonly', true);
    $('#dominio_viejo_c1').prop('readonly', true);
    $('#marca_c1').prop('disabled', true);
    $('#modelo_c1').prop('disabled', true);
    $('#n_anio_modelo_c1').prop('disabled', true);
    $('#d_tipo_c1').prop('disabled', true);
    $('#cilindrada_c1').prop('disabled', true);
    $('#n_peso_c1').prop('disabled', true);
    $('#valuacion_c1').prop('disabled', true);
    $('#carga_c1').prop('disabled', true);
    $('#c_tipo_uso_c1').prop('disabled', true);
    $('#d_tipo_uso_c1').prop('disabled', true);
    $('#f_radicacion_c1').prop('disabled', true);
    $('#categoria_c1').prop('disabled', true);
    $('#origen_c1').prop('disabled', true);
    $('#fmcamod_c1').prop('readonly', true);
    $('#c_reg_secc_c1').prop('disabled', true);
    $('#d_reg_secc_c1').prop('disabled', true);
    $('#f_inscripcion_c1').prop('disabled', true);
    $('#cant_titulares_c1').prop('disabled', true);
    $('#d_parametros_adic_c1').prop('disabled', true);
    $('#d_reservado_c1').prop('disabled', true);
    $('#d_observaciones_c1').prop('disabled', true);
    $('#n_tramite_c1').prop('disabled', true);
    $('#tipo_form_c1').prop('disabled', true);
    $('#n_form_c1').prop('disabled', true);
    $('#c_tipo_tramite_c1').prop('disabled', true);
    $('#d_tipo_tramite_c1').prop('disabled', true);
    $('#c_accion_c1').prop('disabled', true);
    $('#d_accion_c1').prop('disabled', true);
    $('#n_envio_c1').prop('disabled', true);
    $('#n_secuencia_c1').prop('disabled', true);
    $('#tipo_registro_c1').prop('disabled', true);
    $('#tipo_sub_registro_c1').prop('disabled', true);
    $('#cod_organismo_c1').prop('disabled', true);
    $('#c_estado_c1').prop('disabled', true);
    $('#d_error_c1').prop('readonly', true);

    $('#n_cuit_c1').prop('readonly', true);
    $('#d_denominacion_c1').prop('disabled', true);
    $('#d_denominacion_siat_c1').prop('disabled', true);
    $('#d_denominacion_afip_c1').prop('disabled', true);
    $('#c_tipo_doc_c1').prop('disabled', true);
    $('#n_documento_c1').prop('disabled', true);
    $('#calle_c1').prop('disabled', true);
    $('#cod_postal_c1').prop('disabled', true);
    $('#numero_c1').prop('disabled', true);
    $('#piso_c1').prop('disabled', true);
    $('#barrio_c1').prop('disabled', true);
    $('#localidad_c1').prop('disabled', true);
    $('#localidad_siat_c1').prop('disabled', true);
    $('#provincia_c1').prop('disabled', true);

    $('#c_grupo_siat_c1').prop('disabled', true);
    $('#c_marca_siat_c1').prop('disabled', true);
    $('#id_modelo_siat_c1').prop('disabled', true);
    $('#id_descripcion_sait_c1').prop('disabled', true);
    $('#c_tipo_siat_c1').prop('disabled', true);
    $('#c_reg_secc_ori_c1').prop('disabled', true);
    $('#d_reg_secc_ori_c1').prop('disabled', true);
    $('#d_muni_origen_c1').prop('disabled', true);
    $('#f_operacion_c1').prop('disabled', true);

    modo_consulta_titulares();

}

function modo_consulta_titulares() {
    $('#d_denominacion_tit').prop('disabled', true);
    $('#n_cuit_tit').prop('disabled', true);
    $('#porcentaje_tit').prop('disabled', true);
    $('#c_tipo_doc_tit').prop('disabled', true);
    $('#n_documento_tit').prop('disabled', true);
    $('#n_numero_tit').prop('disabled', true);
    $('#piso_tit').prop('disabled', true);
    $('#depto_tit').prop('disabled', true);
    $('#calle_tit').prop('disabled', true);
    $('#barrio_tit').prop('disabled', true);
    $('#d_localidad_tit').prop('disabled', true);
    $('#cod_postal_tit').prop('disabled', true);
    $('#d_localidad_siat_tit').prop('disabled', true);
    $('#c_provincia_tit').prop('disabled', true);
    $('#reservado_tit').prop('disabled', true);
};

function limpiar_pantalla_titulares() {
    $('#d_denominacion_tit').prop('disabled', false);
    $('#n_cuit_tit').prop('disabled', false);
    $('#porcentaje_tit').prop('disabled', false);
    $('#c_tipo_doc_tit').prop('disabled', false);
    $('#n_documento_tit').prop('disabled', false);
    $('#n_numero_tit').prop('disabled', false);
    $('#piso_tit').prop('disabled', false);
    $('#depto_tit').prop('disabled', false);
    $('#calle_tit').prop('disabled', false);
    $('#barrio_tit').prop('disabled', false);
    $('#d_localidad_tit').prop('disabled', false);
    $('#cod_postal_tit').prop('disabled', false);
    $('#d_localidad_siat_tit').prop('disabled', false);
    $('#c_provincia_tit').prop('disabled', false);
    $('#reservado_tit').prop('disabled', false);
}

//C1
function no_procesar_c1() {
    let n_secuencia = $('#c1_grid').getCell(1, 'nro_secuencia');
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_estado": $('#c1_grid').getCell(1, 'c_estado'),
            "p_tipo_registro": 'C1',
            "p_nro_secuencia": $('#c1_grid').getCell(1, 'nro_secuencia'),
            "id_menu": v_id_menu,
            "n_orden": 3
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                if (data.p_hay_error == 'N') {
                    setea_parametros('#c1_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('I', 'Información', data.p_mensaje);
                    $('#btn_no_procesar_c1').prop('disabled', true);
                    $('#btn_procesar_c1').prop('disabled', true);
                    $('#btn_guardar_c1').prop('disabled', true);
                    $('#btn_tabla_cod_rnpa_c1').prop('disabled', true);
                    $('#btn_confirm_baja_y_proc_c1').prop('disabled', true);
                    $('#btn_cambiar_dom_y_proc_c1').prop('disabled', true);
                    $('#btn_leer_cod_rnpa').prop('disabled', true);
                    $('#btn_copy_c1').prop('disabled', true);
                } else if (data.p_hay_error == 'NS') {
                    setea_parametros('#c1_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('I', 'Información', data.p_mensaje);
                    $('#btn_no_procesar_c1').prop('disabled', true);
                    $('#btn_procesar_c1').prop('disabled', true);
                    $('#btn_guardar_c1').prop('disabled', true);
                    $('#btn_tabla_cod_rnpa_c1').prop('disabled', true);
                    $('#btn_confirm_baja_y_proc_c1').prop('disabled', true);
                    $('#btn_cambiar_dom_y_proc_c1').prop('disabled', true);
                    $('#btn_leer_cod_rnpa').prop('disabled', true);
                    $('#btn_copy_c1').prop('disabled', true);
                } else {
                    setea_parametros('#c1_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('I', 'Información', data.p_mensaje);
                    $('#btn_no_procesar_c1').prop('disabled', true);
                    $('#btn_procesar_c1').prop('disabled', true);
                    $('#btn_guardar_c1').prop('disabled', true);
                    $('#btn_tabla_cod_rnpa_c1').prop('disabled', true);
                    $('#btn_confirm_baja_y_proc_c1').prop('disabled', true);
                    $('#btn_cambiar_dom_y_proc_c1').prop('disabled', true);
                    $('#btn_leer_cod_rnpa').prop('disabled', true);
                    $('#btn_copy_c1').prop('disabled', true);
                }
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function conf_baja_y_proc_c1() {
    let n_secuencia = $('#c1_grid').getCell(1, 'nro_secuencia');

    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_estado": $('#c1_grid').getCell(1, 'c_estado'),
            "p_d_error": $('#c1_grid').getCell(1, 'd_error'),
            "p_nro_secuencia": $('#c1_grid').getCell(1, 'nro_secuencia'),
            "id_menu": v_id_menu,
            "n_orden": 4
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                if (data.p_hay_error == 'NS') {
                    setea_parametros('#c1_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('S', 'Exito', data.p_mensaje);
                    $('#btn_no_procesar_c1').prop('disabled', true);
                    $('#btn_procesar_c1').prop('disabled', true);
                    $('#btn_guardar_c1').prop('disabled', true);
                    $('#btn_tabla_cod_rnpa_c1').prop('disabled', true);
                    $('#btn_confirm_baja_y_proc_c1').prop('disabled', true);
                    $('#btn_cambiar_dom_y_proc_c1').prop('disabled', true);
                    $('#btn_leer_cod_rnpa').prop('disabled', true);
                    $('#btn_copy_c1').prop('disabled', true);
                }
                else if (data.p_hay_error == 'N') {
                    setea_parametros('#c1_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('I', 'Información', data.p_mensaje);
                    $('#btn_no_procesar_c1').prop('disabled', true);
                    $('#btn_procesar_c1').prop('disabled', true);
                    $('#btn_guardar_c1').prop('disabled', true);
                    $('#btn_tabla_cod_rnpa_c1').prop('disabled', true);
                    $('#btn_confirm_baja_y_proc_c1').prop('disabled', true);
                    $('#btn_cambiar_dom_y_proc_c1').prop('disabled', true);
                    $('#btn_leer_cod_rnpa').prop('disabled', true);
                    $('#btn_copy_c1').prop('disabled', true);
                }
                else {
                    setea_parametros('#c1_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('I', 'Información', data.p_mensaje);
                    $('#btn_no_procesar_c1').prop('disabled', true);
                    $('#btn_procesar_c1').prop('disabled', true);
                    $('#btn_guardar_c1').prop('disabled', true);
                    $('#btn_tabla_cod_rnpa_c1').prop('disabled', true);
                    $('#btn_confirm_baja_y_proc_c1').prop('disabled', true);
                    $('#btn_cambiar_dom_y_proc_c1').prop('disabled', true);
                    $('#btn_leer_cod_rnpa').prop('disabled', true);
                    $('#btn_copy_c1').prop('disabled', true);
                }
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function procesar_c1() {
    let n_secuencia = $('#c1_grid').getCell(1, 'nro_secuencia');

    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_estado": $('#c1_grid').getCell(1, 'c_estado'),
            "p_nro_secuencia": $('#c1_grid').getCell(1, 'nro_secuencia'),
            "id_menu": v_id_menu,
            "n_orden": 5
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                if (data.p_hay_error == 'NS') {
                    setea_parametros('#c1_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('S', 'Exito', data.p_mensaje);
                    $('#btn_no_procesar_c1').prop('disabled', true);
                    $('#btn_procesar_c1').prop('disabled', true);
                    $('#btn_guardar_c1').prop('disabled', true);
                    $('#btn_tabla_cod_rnpa_c1').prop('disabled', true);
                    $('#btn_confirm_baja_y_proc_c1').prop('disabled', true);
                    $('#btn_cambiar_dom_y_proc_c1').prop('disabled', true);
                    $('#btn_leer_cod_rnpa').prop('disabled', true);
                    $('#btn_copy_c1').prop('disabled', true);
                }
                else if (data.p_hay_error == 'N') {
                    setea_parametros('#c1_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('E', 'Error', data.p_mensaje);
                    $('#btn_no_procesar_c1').prop('disabled', true);
                    $('#btn_procesar_c1').prop('disabled', true);
                    $('#btn_guardar_c1').prop('disabled', true);
                    $('#btn_tabla_cod_rnpa_c1').prop('disabled', true);
                    $('#btn_confirm_baja_y_proc_c1').prop('disabled', true);
                    $('#btn_cambiar_dom_y_proc_c1').prop('disabled', true);
                    $('#btn_leer_cod_rnpa').prop('disabled', true);
                    $('#btn_copy_c1').prop('disabled', true);
                }
                else {
                    setea_parametros('#c1_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('I', 'Información', data.p_mensaje);
                    $('#btn_no_procesar_c1').prop('disabled', true);
                    $('#btn_procesar_c1').prop('disabled', true);
                    $('#btn_guardar_c1').prop('disabled', true);
                    $('#btn_tabla_cod_rnpa_c1').prop('disabled', true);
                    $('#btn_confirm_baja_y_proc_c1').prop('disabled', true);
                    $('#btn_cambiar_dom_y_proc_c1').prop('disabled', true);
                    $('#btn_leer_cod_rnpa').prop('disabled', true);
                    $('#btn_copy_c1').prop('disabled', true);
                }
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function cambiar_dom_y_proc_c1() {
    let n_secuencia = $('#c1_grid').getCell(1, 'nro_secuencia');

    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_estado": $('#c1_grid').getCell(1, 'c_estado'),
            "p_nro_secuencia": $('#c1_grid').getCell(1, 'nro_secuencia'),
            "id_menu": v_id_menu,
            "n_orden": 6
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                if (data.p_hay_error == 'NS') {
                    setea_parametros('#c1_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('S', 'Exito', data.p_mensaje);
                    $('#btn_no_procesar_c1').prop('disabled', true);
                    $('#btn_procesar_c1').prop('disabled', true);
                    $('#btn_guardar_c1').prop('disabled', true);
                    $('#btn_tabla_cod_rnpa_c1').prop('disabled', true);
                    $('#btn_confirm_baja_y_proc_c1').prop('disabled', true);
                    $('#btn_cambiar_dom_y_proc_c1').prop('disabled', true);
                    $('#btn_leer_cod_rnpa').prop('disabled', true);
                    $('#btn_copy_c1').prop('disabled', true);
                }
                else if (data.p_hay_error == 'N') {
                    setea_parametros('#c1_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('E', 'Error', data.p_mensaje);
                    $('#btn_no_procesar_c1').prop('disabled', true);
                    $('#btn_procesar_c1').prop('disabled', true);
                    $('#btn_guardar_c1').prop('disabled', true);
                    $('#btn_tabla_cod_rnpa_c1').prop('disabled', true);
                    $('#btn_confirm_baja_y_proc_c1').prop('disabled', true);
                    $('#btn_cambiar_dom_y_proc_c1').prop('disabled', true);
                    $('#btn_leer_cod_rnpa').prop('disabled', true);
                    $('#btn_copy_c1').prop('disabled', true);
                }
                else {
                    setea_parametros('#c1_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('I', 'Información', data.p_mensaje);
                    $('#btn_no_procesar_c1').prop('disabled', true);
                    $('#btn_procesar_c1').prop('disabled', true);
                    $('#btn_guardar_c1').prop('disabled', true);
                    $('#btn_tabla_cod_rnpa_c1').prop('disabled', true);
                    $('#btn_confirm_baja_y_proc_c1').prop('disabled', true);
                    $('#btn_cambiar_dom_y_proc_c1').prop('disabled', true);
                    $('#btn_leer_cod_rnpa').prop('disabled', true);
                    $('#btn_copy_c1').prop('disabled', true);
                }
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

//C2
function no_procesar_c2() {
    let n_secuencia = $('#c2_grid').getCell(1, 'nro_secuencia');
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_estado": $('#c2_grid').getCell(1, 'c_estado'),
            "p_tipo_registro": 'C2',
            "p_nro_secuencia": $('#c2_grid').getCell(1, 'nro_secuencia'),
            "id_menu": v_id_menu,
            "n_orden": 3
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                if (data.p_hay_error == 'N') {
                    setea_parametros('#c2_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('I', 'Información', data.p_mensaje);
                    $('#btn_no_procesar_c2').prop('disabled', true);
                    $('#btn_procesar_sin_validar_c2').prop('disabled', true);
                    $('#btn_procesar_c2').prop('disabled', true);
                    $('#btn_guardar_c2').prop('disabled', true);
                }
                else if (data.p_hay_error == 'NS') {
                    setea_parametros('#c2_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('I', 'Información', data.p_mensaje);
                    $('#btn_no_procesar_c2').prop('disabled', true);
                    $('#btn_procesar_sin_validar_c2').prop('disabled', true);
                    $('#btn_procesar_c2').prop('disabled', true);
                    $('#btn_guardar_c2').prop('disabled', true);
                }
                else {
                    setea_parametros('#c2_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('I', 'Información', data.p_mensaje);
                    $('#btn_no_procesar_c2').prop('disabled', true);
                    $('#btn_procesar_sin_validar_c2').prop('disabled', true);
                    $('#btn_procesar_c2').prop('disabled', true);
                    $('#btn_guardar_c2').prop('disabled', true);
                }
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function procesar_c2() {
    let n_secuencia = $('#c2_grid').getCell(1, 'nro_secuencia');

    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_estado": $('#c2_grid').getCell(1, 'c_estado'),
            "p_nro_secuencia": $('#c2_grid').getCell(1, 'nro_secuencia'),
            "id_menu": v_id_menu,
            "n_orden": 7
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                if (data.p_hay_error == 'NS') {
                    setea_parametros('#c2_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('S', 'Exito', data.p_mensaje);
                    $('#btn_no_procesar_c2').prop('disabled', true);
                    $('#btn_procesar_sin_validar_c2').prop('disabled', true);
                    $('#btn_procesar_c2').prop('disabled', true);
                    $('#btn_guardar_c2').prop('disabled', true);
                }
                else if (data.p_hay_error == 'N') {
                    setea_parametros('#c2_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('E', 'Error', data.p_mensaje);
                    $('#btn_no_procesar_c2').prop('disabled', true);
                    $('#btn_procesar_sin_validar_c2').prop('disabled', true);
                    $('#btn_procesar_c2').prop('disabled', true);
                    $('#btn_guardar_c2').prop('disabled', true);
                }
                else {
                    setea_parametros('#c2_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('E', 'Error', data.p_mensaje);
                    $('#btn_no_procesar_c2').prop('disabled', true);
                    $('#btn_procesar_sin_validar_c2').prop('disabled', true);
                    $('#btn_procesar_c2').prop('disabled', true);
                    $('#btn_guardar_c2').prop('disabled', true);
                }
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function procesar_sin_validar_c2() {
    let n_secuencia = $('#c2_grid').getCell(1, 'nro_secuencia');

    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_estado": $('#c2_grid').getCell(1, 'c_estado'),
            "p_nro_secuencia": $('#c2_grid').getCell(1, 'nro_secuencia'),
            "id_menu": v_id_menu,
            "n_orden": 8
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                if (data.p_hay_error == 'NS') {
                    setea_parametros('#c2_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('S', 'Exito', data.p_mensaje);
                    $('#btn_no_procesar_c2').prop('disabled', true);
                    $('#btn_procesar_sin_validar_c2').prop('disabled', true);
                    $('#btn_procesar_c2').prop('disabled', true);
                    $('#btn_guardar_c2').prop('disabled', true);
                }
                else if (data.p_hay_error == 'N') {
                    setea_parametros('#c2_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('E', 'Error', data.p_mensaje);
                    $('#btn_no_procesar_c2').prop('disabled', true);
                    $('#btn_procesar_sin_validar_c2').prop('disabled', true);
                    $('#btn_procesar_c2').prop('disabled', true);
                    $('#btn_guardar_c2').prop('disabled', true);
                }
                else {
                    setea_parametros('#c2_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('E', 'Error', data.p_mensaje);
                    $('#btn_no_procesar_c2').prop('disabled', true);
                    $('#btn_procesar_sin_validar_c2').prop('disabled', true);
                    $('#btn_procesar_c2').prop('disabled', true);
                    $('#btn_guardar_c2').prop('disabled', true);
                }
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function verificar_modificaciones(p_tipo_reg) {
    let modificado = false;

    $('.' + p_tipo_reg).each(function () {
        var id = $(this).attr('id');
        var valorActual = $(this).val();

        // Comparar con el valor inicial
        if (p_tipo_reg != 'titulares') {
            if (valorActual !== inputs_iniciales[id]) {
                modificado = true;
                return false; // Salir del bucle si se encuentra un cambio
            }
        } else {
            if (valorActual !== inputs_iniciales_tit[id]) {
                modificado = true;
                return false; // Salir del bucle si se encuentra un cambio
            }
        }
    });

    return modificado;
}

//C6
function no_procesar_c6() {
    let n_secuencia = $('#c6_grid').getCell(1, 'nro_secuencia');
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_estado": $('#c6_grid').getCell(1, 'c_estado'),
            "p_tipo_registro": 'C6',
            "p_nro_secuencia": $('#c6_grid').getCell(1, 'nro_secuencia'),
            "id_menu": v_id_menu,
            "n_orden": 3
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                if (data.p_hay_error == 'N') {
                    setea_parametros('#c6_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('I', 'Información', data.p_mensaje);
                    $('#btn_no_procesar_c6').prop('disabled', true);
                    $('#btn_procesar_sin_validar_c6').prop('disabled', true);
                    $('#btn_procesar_c6').prop('disabled', true);
                    $('#btn_guardar_c6').prop('disabled', true);
                    $('#btn_cambiar_dom_proc_c6').prop('disabled', true);
                    $('#btn_copy_c6').prop('disabled', true);
                }
                else if (data.p_hay_error == 'NS') {
                    setea_parametros('#c6_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('I', 'Información', data.p_mensaje);
                    $('#btn_no_procesar_c6').prop('disabled', true);
                    $('#btn_procesar_sin_validar_c6').prop('disabled', true);
                    $('#btn_procesar_c6').prop('disabled', true);
                    $('#btn_guardar_c6').prop('disabled', true);
                    $('#btn_cambiar_dom_proc_c6').prop('disabled', true);
                    $('#btn_copy_c6').prop('disabled', true);
                }
                else {
                    setea_parametros('#c6_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('I', 'Información', data.p_mensaje);
                    $('#btn_no_procesar_c6').prop('disabled', true);
                    $('#btn_procesar_sin_validar_c6').prop('disabled', true);
                    $('#btn_procesar_c6').prop('disabled', true);
                    $('#btn_guardar_c6').prop('disabled', true);
                    $('#btn_cambiar_dom_proc_c6').prop('disabled', true);
                    $('#btn_copy_c6').prop('disabled', true);
                }
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function procesar_c6() {
    let n_secuencia = $('#c6_grid').getCell(1, 'nro_secuencia');

    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_estado": $('#c6_grid').getCell(1, 'c_estado'),
            "p_nro_secuencia": $('#c6_grid').getCell(1, 'nro_secuencia'),
            "id_menu": v_id_menu,
            "n_orden": 9
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                if (data.p_hay_error == 'NS') {
                    setea_parametros('#c6_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('S', 'Exito', data.p_mensaje);
                }
                else if (data.p_hay_error == 'N') {
                    setea_parametros('#c6_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('I', 'Información', data.p_mensaje);
                }
                else {
                    mostrar_cuadro('I', 'Información', data.p_mensaje);
                }
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function procesar_sin_validar_c6() {
    let n_secuencia = $('#c6_grid').getCell(1, 'nro_secuencia');

    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_estado": $('#c6_grid').getCell(1, 'c_estado'),
            "p_nro_secuencia": $('#c6_grid').getCell(1, 'nro_secuencia'),
            "id_menu": v_id_menu,
            "n_orden": 10
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                if (data.p_hay_error == 'NS') {
                    setea_parametros('#c6_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('S', 'Exito', data.p_mensaje);
                }
                else if (data.p_hay_error == 'N') {
                    setea_parametros('#c6_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('E', 'Error', data.p_mensaje);
                }
                else {
                    mostrar_cuadro('E', 'Error', data.p_mensaje);
                }
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function cambiar_dom_y_proc_c6() {
    let n_secuencia = $('#c6_grid').getCell(1, 'nro_secuencia');

    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_estado": $('#c6_grid').getCell(1, 'c_estado'),
            "p_nro_secuencia": $('#c6_grid').getCell(1, 'nro_secuencia'),
            "id_menu": v_id_menu,
            "n_orden": 11
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                if (data.p_hay_error == 'NS') {
                    setea_parametros('#c6_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('S', 'Exito', data.p_mensaje);
                }
                else if (data.p_hay_error == 'N') {
                    setea_parametros('#c6_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('E', 'Error', data.p_mensaje);
                }
                else {
                    mostrar_cuadro('E', 'Error', data.p_mensaje);
                }
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}
//C7
function no_procesar_c7() {
    let n_secuencia = $('#c7_grid').getCell(1, 'nro_secuencia');
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_estado": $('#c7_grid').getCell(1, 'c_estado'),
            "p_tipo_registro": 'C7',
            "p_nro_secuencia": $('#c7_grid').getCell(1, 'nro_secuencia'),
            "id_menu": v_id_menu,
            "n_orden": 3
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                if (data.p_hay_error == 'N') {
                    setea_parametros('#c7_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('E', 'Error', data.p_mensaje);
                    $('#btn_no_procesar_c7').prop('disabled', true);
                    $('#btn_procesar_c7').prop('disabled', true);
                    $('#btn_guardar_c7').prop('disabled', true);
                }
                else if (data.p_hay_error == 'NS') {
                    setea_parametros('#c7_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('I', 'Información', data.p_mensaje);
                    $('#btn_no_procesar_c7').prop('disabled', true);
                    $('#btn_procesar_c7').prop('disabled', true);
                    $('#btn_guardar_c7').prop('disabled', true);
                }
                else {
                    setea_parametros('#c7_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('I', 'Información', data.p_mensaje);
                    $('#btn_no_procesar_c7').prop('disabled', true);
                    $('#btn_procesar_c7').prop('disabled', true);
                    $('#btn_guardar_c7').prop('disabled', true);
                }
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function procesar_c7() {
    let n_secuencia = $('#c7_grid').getCell(1, 'nro_secuencia');

    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_estado": $('#c7_grid').getCell(1, 'c_estado'),
            "p_nro_secuencia": $('#c7_grid').getCell(1, 'nro_secuencia'),
            "id_menu": v_id_menu,
            "n_orden": 12
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                if (data.p_hay_error == 'NS') {
                    setea_parametros('#c7_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('S', 'Exito', data.p_mensaje);
                }
                else if (data.p_hay_error == 'N') {
                    setea_parametros('#c7_grid', { ':p_n_secuencia': n_secuencia });
                    mostrar_cuadro('I', 'Información', data.p_mensaje);
                }
                else {
                    mostrar_cuadro('I', 'Información', data.p_mensaje);
                }
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}
//C8
function limpiar_titulares() {
    $('#d_denominacion_tit').val(null);
    $('#d_denominacion_siat_tit').val(null);
    $('#d_denominacion_afip_tit').val(null);
    $('#n_cuit_tit').val(null);
    $('#porcentaje_tit').val(null);
    $('#tipo_cuerpo_tit').val(null);
    $('#c_tipo_doc_tit').val(null);
    $('#n_documento_tit').val(null);
    $('#tipo_sub_registro_tit').val(null);
    $('#calle_tit').val(null);
    $('#barrio_tit').val(null);
    $('#n_numero_tit').val(null);
    $('#piso_tit').val(null);
    $('#depto_tit').val(null);
    $('#d_localidad_tit').val(null);
    $('#tipo_titular_tit').val(null);
    $('#cod_postal_tit').val(null);
    $('#d_localidad_siat_tit').val(null);
    $('#reservado_tit').val(null);
    $('#c_provincia_tit').val(null);
    $('#c_estado_tit').val(null);
}


function modificar_c1() {
    let nro_secuencia = $('#c1_grid').getCell(1, 'nro_secuencia');

    if (!$('#n_secuencia_c1').val()) {
        mostrar_cuadro('E', 'Error', 'El campo Nro. Secuencia no puede quedar vacío');
        $('#n_secuencia_c1').val(nro_secuencia);
        return;
    } else {
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                "p_tipo_registro": 'C1',
                "p_dominio_nuevo": $('#dominio_nuevo_c1').val(),
                "p_dominio_viejo": $('#dominio_viejo_c1').val(),
                "p_d_marca": $('#marca_c1').val(),
                "p_d_tipo": $('#d_tipo_c1').val(),
                "p_d_modelo": $('#modelo_c1').val(),
                "p_n_anio_modelo": $('#n_anio_modelo_c1').val(),
                "p_n_cilindrada": $('#cilindrada_c1').val(),
                "p_n_peso": $('#n_peso_c1').val(),
                "p_n_valuacion": $('#valuacion_c1').val(),
                "p_n_carga": $('#carga_c1').val(),
                "p_c_tipo_uso": $('#c_tipo_uso_c1').val(),
                "p_d_tipo_uso": $('#d_tipo_uso_c1').val(),
                "p_f_radicacion": $('#f_radicacion_c1').val(),
                "p_f_inscripcion": $('#f_inscripcion_c1').val(),
                "p_c_categoria": $('#categoria_c1').val(),
                "p_c_origen": $('#origen_c1').val(),
                "p_fmcamod": $('#fmcamod_c1').val(),
                "p_c_grupo_siat": $('#c_grupo_siat_c1').val(),
                "p_c_tipo_siat": $('#c_tipo_siat_c1').val(),
                "p_id_descripcion_siat": $('#id_descripcion_siat_c1').val(),
                "p_id_modelo_siat": $('#id_modelo_siat_c1').val(),
                "p_c_marca_siat": $('#c_marca_siat_c1').val(),
                "p_nro_tramite": $('#n_tramite_c1').val(),
                "p_tipo_formulario": $('#tipo_form_c1').val(),
                "p_nro_formulario": $('#n_form_c1').val(),
                "p_c_tipo_tramite": $('#c_tipo_tramite_c1').val(),
                "p_d_tipo_tramite": $('#d_tipo_tramite_c1').val(),
                "p_c_tipo_accion": $('#c_accion_c1').val(),
                "p_d_tipo_accion": $('#d_accion_c1').val(),
                "p_d_error": $('#d_error_c1').val(),
                "p_n_cuit": limpia_cuit($('#n_cuit_c1').val()),
                "p_d_denominacion": $('#d_denominacion_c1').val(),
                "p_c_tipo_doc": $('#c_tipo_doc_c1').val(),
                "p_n_documento": $('#n_documento_c1').val(),
                "p_d_calle": $('#calle_c1').val(),
                "p_n_numero": $('#numero_c1').val(),
                "p_d_piso": $('#piso_c1').val(),
                "p_d_depto": $('#depto_c1').val(),
                "p_d_barrio": $('#barrio_c1').val(),
                "p_d_localidad": $('#localidad_c1').val(),
                "p_c_postal": $('#cod_postal_c1').val(),
                "p_c_provincia": $('#provincia_c1').val(),
                "p_cant_titulares": $('#cant_titulares_c1').val(),
                "p_c_reg_secc": $('#c_reg_secc_c1').val(),
                "p_d_reg_secc": $('#d_reg_secc_c1').val(),
                "p_c_reg_secc_ori": $('#c_reg_secc_ori_c1').val(),
                "p_d_reg_secc_ori": $('#d_reg_secc_ori_c1').val(),
                "p_d_mun_origen": $('#d_muni_origen_c1').val(),
                "p_f_operacion": $('#f_operacion_c1').val(),
                "p_d_parametros_adic": $('#d_parametros_adic_c1').val(),
                "p_d_reservado": $('#d_reservado_c1').val(),
                "p_d_observaciones": $('#d_observaciones_c1').val(),
                "p_c_localidad_siat": $('#localidad_siat_c1').val(),
                "p_nro_secuencia": nro_secuencia,
                "p_nro_secuencia_modif": $('#n_secuencia_c1').val(),
                "p_nro_envio": $('#n_envio_c1').val(),
                "p_c_estado": $('#c_estado_c1').val(),
                "p_tipo_sub_registro": $('#tipo_sub_registro_c1').val(),
                "p_cod_organismo": $('#cod_organismo_c1').val(),
                "p_f_alta": null,
                "p_f_baja": null,
                "p_c_origen_info": null,
                "p_c_radicacion": null,
                "p_c_estado_rad": null,
                "p_tipo_registro_modif": $('#tipo_registro_c1').val(),
                "p_i_monto_total": null,
                "p_i_monto_pun": null,
                "p_i_monto_adi": null,
                "p_i_monto_imp": null,
                "p_f_cobro": null,
                "p_f_tramite": null,
                "p_f_deposito": null,
                "p_c_moneda": null,
                "p_c_banco": null,
                "p_d_banco": null,
                "p_cant_detalle": null,
                "id_menu": v_id_menu,
                "n_orden": 13
            },
            dataType: 'json',
            success: function (data) {
                if (data.resultado == 'OK') {
                    mostrar_cuadro('S', 'Exito', 'Modificación realizada exitosamente');
                    setea_parametros('#c1_grid', { ':p_n_secuencia': $('#c1_grid').getCell(1, 'nro_secuencia') });
                }
                else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    }
}

function modificar_c2() {
    let nro_secuencia = $('#c2_grid').getCell(1, 'nro_secuencia');

    if (!$('#n_secuencia_c2').val()) {
        mostrar_cuadro('E', 'Error', 'El campo Nro. Secuencia no puede quedar vacío');
        $('#n_secuencia_c2').val(nro_secuencia);
        return;
    } else {
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                "p_tipo_registro": 'C2',
                "p_dominio_nuevo": $('#dominio_nuevo_c2').val(),
                "p_dominio_viejo": $('#dominio_viejo_c2').val(),
                "p_d_marca": $('#marca_c2').val(),
                "p_d_tipo": $('#d_tipo_c2').val(),
                "p_d_modelo": $('#modelo_c2').val(),
                "p_n_anio_modelo": $('#n_anio_modelo_c2').val(),
                "p_n_cilindrada": $('#cilindrada_c2').val(),
                "p_n_peso": $('#n_peso_c2').val(),
                "p_n_valuacion": $('#valuacion_c2').val(),
                "p_n_carga": $('#carga_c2').val(),
                "p_c_tipo_uso": $('#c_tipo_uso_c2').val(),
                "p_d_tipo_uso": $('#d_tipo_uso_c2').val(),
                "p_f_radicacion": $('#f_radicacion_c2').val(),
                "p_f_inscripcion": $('#f_inscripcion_c2').val(),
                "p_c_categoria": $('#categoria_c2').val(),
                "p_c_origen": $('#origen_c2').val(),
                "p_fmcamod": $('#fmcamod_c2').val(),
                "p_c_grupo_siat": null,
                "p_c_tipo_siat": null,
                "p_id_descripcion_siat": null,
                "p_id_modelo_siat": null,
                "p_c_marca_siat": null,
                "p_nro_tramite": $('#n_tramite_c2').val(),
                "p_tipo_formulario": $('#tipo_form_c2').val(),
                "p_nro_formulario": $('#n_form_c2').val(),
                "p_c_tipo_tramite": $('#c_tipo_tramite_c2').val(),
                "p_d_tipo_tramite": $('#d_tipo_tramite_c2').val(),
                "p_c_tipo_accion": $('#c_accion_c2').val(),
                "p_d_tipo_accion": $('#d_accion_c2').val(),
                "p_d_error": $('#d_error_c2').val(),
                "p_n_cuit": null,
                "p_d_denominacion": null,
                "p_c_tipo_doc": null,
                "p_n_documento": null,
                "p_d_calle": null,
                "p_n_numero": null,
                "p_d_piso": null,
                "p_d_depto": null,
                "p_d_barrio": null,
                "p_d_localidad": null,
                "p_c_postal": null,
                "p_c_provincia": null,
                "p_cant_titulares": $('#cant_titulares_c2').val(),
                "p_c_reg_secc": $('#c_reg_secc_c2').val(),
                "p_d_reg_secc": $('#d_reg_secc_c2').val(),
                "p_c_reg_secc_ori": null,
                "p_d_reg_secc_ori": null,
                "p_d_mun_origen": null,
                "p_f_operacion": $('#f_operacion_c2').val(),
                "p_d_parametros_adic": $('#d_parametros_adic_c2').val(),
                "p_d_reservado": $('#d_reservado_c2').val(),
                "p_d_observaciones": $('#d_observaciones_c2').val(),
                "p_c_localidad_siat": null,
                "p_nro_secuencia": nro_secuencia,
                "p_nro_secuencia_modif": $('#n_secuencia_c2').val(),
                "p_nro_envio": $('#n_envio_c2').val(),
                "p_c_estado": $('#c_estado_c2').val(),
                "p_tipo_sub_registro": $('#tipo_sub_registro_c2').val(),
                "p_cod_organismo": $('#cod_organismo_c2').val(),
                "p_f_alta": null,
                "p_f_baja": null,
                "p_c_origen_info": null,
                "p_c_radicacion": null,
                "p_c_estado_rad": null,
                "p_tipo_registro_modif": $('#tipo_registro_c2').val(),
                "p_i_monto_total": null,
                "p_i_monto_pun": null,
                "p_i_monto_adi": null,
                "p_i_monto_imp": null,
                "p_f_cobro": null,
                "p_f_tramite": null,
                "p_f_deposito": null,
                "p_c_moneda": null,
                "p_c_banco": null,
                "p_d_banco": null,
                "p_cant_detalle": null,
                "id_menu": v_id_menu,
                "n_orden": 13
            },
            dataType: 'json',
            success: function (data) {
                if (data.resultado == 'OK') {
                    mostrar_cuadro('S', 'Exito', 'Modificación realizada exitosamente');
                    setea_parametros('#c2_grid', { ':p_n_secuencia': $('#c2_grid').getCell(1, 'nro_secuencia') });
                }
                else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    }
}

function modificar_c6() {
    let nro_secuencia = $('#c6_grid').getCell(1, 'nro_secuencia');

    if (!$('#n_secuencia_c6').val()) {
        mostrar_cuadro('E', 'Error', 'El campo Nro. Secuencia no puede quedar vacío');
        $('#n_secuencia_c6').val(nro_secuencia);
        return;
    } else {
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                "p_tipo_registro": 'C6',
                "p_dominio_nuevo": $('#dominio_nuevo_c6').val(),
                "p_dominio_viejo": $('#dominio_viejo_c6').val(),
                "p_d_marca": $('#marca_c6').val(),
                "p_d_tipo": $('#d_tipo_c6').val(),
                "p_d_modelo": $('#modelo_c6').val(),
                "p_n_anio_modelo": $('#n_anio_modelo_c6').val(),
                "p_n_cilindrada": $('#cilindrada_c6').val(),
                "p_n_peso": $('#n_peso_c6').val(),
                "p_n_valuacion": $('#valuacion_c6').val(),
                "p_n_carga": $('#carga_c6').val(),
                "p_c_tipo_uso": $('#c_tipo_uso_c6').val(),
                "p_d_tipo_uso": $('#d_tipo_uso_c6').val(),
                "p_f_radicacion": $('#f_radicacion_c6').val(),
                "p_f_inscripcion": null,
                "p_c_categoria": $('#categoria_c6').val(),
                "p_c_origen": $('#origen_c6').val(),
                "p_fmcamod": $('#fmcamod_c6').val(),
                "p_c_grupo_siat": null,
                "p_c_tipo_siat": null,
                "p_id_descripcion_siat": null,
                "p_id_modelo_siat": null,
                "p_c_marca_siat": null,
                "p_nro_tramite": $('#n_tramite_c6').val(),
                "p_tipo_formulario": $('#tipo_form_c6').val(),
                "p_nro_formulario": $('#n_form_c6').val(),
                "p_c_tipo_tramite": $('#c_tipo_tramite_c6').val(),
                "p_d_tipo_tramite": $('#d_tipo_tramite_c6').val(),
                "p_c_tipo_accion": $('#c_accion_c6').val(),
                "p_d_tipo_accion": $('#d_accion_c6').val(),
                "p_d_error": $('#d_error_c6').val(),
                "p_n_cuit": limpia_cuit($('#n_cuit_c6').val()),
                "p_d_denominacion": $('#d_denominacion_c6').val(),
                "p_c_tipo_doc": $('#c_tipo_doc_c6').val(),
                "p_n_documento": $('#n_documento_c6').val(),
                "p_d_calle": $('#calle_c6').val(),
                "p_n_numero": $('#numero_c6').val(),
                "p_d_piso": $('#piso_c6').val(),
                "p_d_depto": $('#depto_c6').val(),
                "p_d_barrio": $('#barrio_c6').val(),
                "p_d_localidad": $('#localidad_c6').val(),
                "p_c_postal": $('#cod_postal_c6').val(),
                "p_c_provincia": $('#provincia_c6').val(),
                "p_cant_titulares": $('#cant_titulares_c6').val(),
                "p_c_reg_secc": $('#c_reg_secc_c6').val(),
                "p_d_reg_secc": $('#d_reg_secc_c6').val(),
                "p_c_reg_secc_ori": null,
                "p_d_reg_secc_ori": null,
                "p_d_mun_origen": null,
                "p_f_operacion": $('#f_operacion_c6').val(),
                "p_d_parametros_adic": $('#d_parametros_adic_c6').val(),
                "p_d_reservado": $('#d_reservado_c6').val(),
                "p_d_observaciones": $('#d_observaciones_c6').val(),
                "p_c_localidad_siat": $('#localidad_siat_c6').val(),
                "p_nro_secuencia": nro_secuencia,
                "p_nro_secuencia_modif": $('#n_secuencia_c6').val(),
                "p_nro_envio": $('#n_envio_c6').val(),
                "p_c_estado": $('#c_estado_c6').val(),
                "p_tipo_sub_registro": $('#tipo_sub_registro_c6').val(),
                "p_cod_organismo": $('#cod_organismo_c6').val(),
                "p_f_alta": null,
                "p_f_baja": null,
                "p_c_origen_info": null,
                "p_c_radicacion": null,
                "p_c_estado_rad": null,
                "p_tipo_registro_modif": $('#tipo_registro_c6').val(),
                "p_i_monto_total": null,
                "p_i_monto_pun": null,
                "p_i_monto_adi": null,
                "p_i_monto_imp": null,
                "p_f_cobro": null,
                "p_f_tramite": null,
                "p_f_deposito": null,
                "p_c_moneda": null,
                "p_c_banco": null,
                "p_d_banco": null,
                "p_cant_detalle": null,
                "id_menu": v_id_menu,
                "n_orden": 13
            },
            dataType: 'json',
            success: function (data) {
                if (data.resultado == 'OK') {
                    mostrar_cuadro('S', 'Exito', 'Modificación realizada exitosamente');
                    setea_parametros('#c6_grid', { ':p_n_secuencia': $('#c6_grid').getCell(1, 'nro_secuencia') });
                }
                else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    }
}

function modificar_c7() {
    let nro_secuencia = $('#c7_grid').getCell(1, 'nro_secuencia');

    if (!$('#n_secuencia_c7').val()) {
        mostrar_cuadro('E', 'Error', 'El campo Nro. Secuencia no puede quedar vacío');
        $('#n_secuencia_c7').val(nro_secuencia);
        return;
    } else {
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                "p_tipo_registro": 'C7',
                "p_dominio_nuevo": $('#dominio_nuevo_c7').val(),
                "p_dominio_viejo": null,
                "p_d_marca": null,
                "p_d_tipo": null,
                "p_d_modelo": null,
                "p_n_anio_modelo": null,
                "p_n_cilindrada": null,
                "p_n_peso": null,
                "p_n_valuacion": null,
                "p_n_carga": null,
                "p_c_tipo_uso": null,
                "p_d_tipo_uso": null,
                "p_f_radicacion": null,
                "p_f_inscripcion": null,
                "p_c_categoria": null,
                "p_c_origen": null,
                "p_fmcamod": null,
                "p_c_grupo_siat": null,
                "p_c_tipo_siat": null,
                "p_id_descripcion_siat": null,
                "p_id_modelo_siat": null,
                "p_c_marca_siat": null,
                "p_nro_tramite": null,
                "p_tipo_formulario": null,
                "p_nro_formulario": null,
                "p_c_tipo_tramite": null,
                "p_d_tipo_tramite": null,
                "p_c_tipo_accion": null,
                "p_d_tipo_accion": null,
                "p_d_error": $('#d_error_c7').val(),
                "p_n_cuit": null,
                "p_d_denominacion": null,
                "p_c_tipo_doc": null,
                "p_n_documento": null,
                "p_d_calle": null,
                "p_n_numero": null,
                "p_d_piso": null,
                "p_d_depto": null,
                "p_d_barrio": null,
                "p_d_localidad": null,
                "p_c_postal": null,
                "p_c_provincia": null,
                "p_cant_titulares": null,
                "p_c_reg_secc": $('#c_reg_secc_c7').val(),
                "p_d_reg_secc": $('#d_reg_secc_c7').val(),
                "p_c_reg_secc_ori": null,
                "p_d_reg_secc_ori": null,
                "p_d_mun_origen": null,
                "p_f_operacion": null,
                "p_d_parametros_adic": null,
                "p_d_reservado": $('#d_reservado_c7').val(),
                "p_d_observaciones": $('#d_observaciones_c7').val(),
                "p_c_localidad_siat": null,
                "p_nro_secuencia": nro_secuencia,
                "p_nro_secuencia_modif": $('#n_secuencia_c7').val(),
                "p_nro_envio": $('#n_envio_c7').val(),
                "p_c_estado": $('#c_estado_c7').val(),
                "p_tipo_sub_registro": null,
                "p_cod_organismo": $('#cod_organismo_c7').val(),
                "p_f_alta": $('#f_alta_c7').val(),
                "p_f_baja": $('#f_baja_c7').val(),
                "p_c_origen_info": $('#c_origen_info_c7').val(),
                "p_c_radicacion": $('#c_radicacion_c7').val(),
                "p_c_estado_rad": $('#c_estado_rad_c7').val(),
                "p_tipo_registro_modif": $('#tipo_registro_c7').val(),
                "p_i_monto_total": null,
                "p_i_monto_pun": null,
                "p_i_monto_adi": null,
                "p_i_monto_imp": null,
                "p_f_cobro": null,
                "p_f_tramite": null,
                "p_f_deposito": null,
                "p_c_moneda": null,
                "p_c_banco": null,
                "p_d_banco": null,
                "p_cant_detalle": null,
                "id_menu": v_id_menu,
                "n_orden": 13
            },
            dataType: 'json',
            success: function (data) {
                if (data.resultado == 'OK') {
                    mostrar_cuadro('S', 'Exito', 'Modificación realizada exitosamente');
                    setea_parametros('#c7_grid', { ':p_n_secuencia': $('#c7_grid').getCell(1, 'nro_secuencia') });
                }
                else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    }
}

function modificar_c8() {
    let nro_secuencia = $('#c8_grid').getCell(1, 'nro_secuencia');

    if (!$('#n_secuencia_c8').val()) {
        mostrar_cuadro('E', 'Error', 'El campo Nro. Secuencia no puede quedar vacío');
        $('#n_secuencia_c8').val(nro_secuencia);
        return;
    } else {
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                "p_tipo_registro": 'C8',
                "p_dominio_nuevo": $('#dominio_nuevo_c8').val(),
                "p_dominio_viejo": $('#dominio_viejo_c8').val(),
                "p_d_marca": $('#marca_c8').val(),
                "p_d_tipo": $('#d_tipo_c8').val(),
                "p_d_modelo": $('#modelo_c8').val(),
                "p_n_anio_modelo": $('#n_anio_modelo_c8').val(),
                "p_n_cilindrada": null,
                "p_n_peso": null,
                "p_n_valuacion": null,
                "p_n_carga": null,
                "p_c_tipo_uso": null,
                "p_d_tipo_uso": null,
                "p_f_radicacion": null,
                "p_f_inscripcion": null,
                "p_c_categoria": $('#categoria_c8').val(),
                "p_c_origen": $('#origen_c8').val(),
                "p_fmcamod": $('#fmcamod_c8').val(),
                "p_c_grupo_siat": null,
                "p_c_tipo_siat": null,
                "p_id_descripcion_siat": null,
                "p_id_modelo_siat": null,
                "p_c_marca_siat": null,
                "p_nro_tramite": $('#n_tramite_c8').val(),
                "p_tipo_formulario": $('#tipo_form_c8').val(),
                "p_nro_formulario": $('#n_form_c8').val(),
                "p_c_tipo_tramite": $('#c_tipo_tramite_c8').val(),
                "p_d_tipo_tramite": $('#d_tipo_tramite_c8').val(),
                "p_c_tipo_accion": $('#c_accion_c8').val(),
                "p_d_tipo_accion": $('#d_accion_c8').val(),
                "p_d_error": $('#d_error_c8').val(),
                "p_n_cuit": null,
                "p_d_denominacion": null,
                "p_c_tipo_doc": null,
                "p_n_documento": null,
                "p_d_calle": null,
                "p_n_numero": null,
                "p_d_piso": null,
                "p_d_depto": null,
                "p_d_barrio": null,
                "p_d_localidad": null,
                "p_c_postal": null,
                "p_c_provincia": null,
                "p_cant_titulares": null,
                "p_c_reg_secc": $('#c_reg_secc_c8').val(),
                "p_d_reg_secc": $('#d_reg_secc_c8').val(),
                "p_c_reg_secc_ori": null,
                "p_d_reg_secc_ori": null,
                "p_d_mun_origen": null,
                "p_f_operacion": null,
                "p_d_parametros_adic": null,
                "p_d_reservado": $('#reservado_c8').val(),
                "p_d_observaciones": $('#observaciones_c8').val(),
                "p_c_localidad_siat": null,
                "p_nro_secuencia": nro_secuencia,
                "p_nro_secuencia_modif": $('#n_secuencia_c8').val(),
                "p_nro_envio": $('#n_envio_c8').val(),
                "p_c_estado": $('#c_estado_c8').val(),
                "p_tipo_sub_registro": $('#tipo_sub_registro_c8').val(),
                "p_cod_organismo": $('#cod_organismo_c8').val(),
                "p_f_alta": null,
                "p_f_baja": null,
                "p_c_origen_info": null,
                "p_c_radicacion": null,
                "p_c_estado_rad": null,
                "p_tipo_registro_modif": $('#tipo_registro_c8').val(),
                "p_i_monto_total": $('#i_monto_total_c8').val(),
                "p_i_monto_pun": $('#i_monto_pun_c8').val(),
                "p_i_monto_adi": $('#i_monto_adi_c8').val(),
                "p_i_monto_imp": $('#i_monto_imp_c8').val(),
                "p_f_cobro": $('#f_cobro_c8').val(),
                "p_f_tramite": $('#f_tramite_c8').val(),
                "p_f_deposito": $('#f_deposito_c8').val(),
                "p_c_moneda": $('#c_moneda_c8').val(),
                "p_c_banco": $('#c_banco_c8').val(),
                "p_d_banco": $('#d_banco_c8').val(),
                "p_cant_detalle": $('#cant_detalle_c8').val(),
                "id_menu": v_id_menu,
                "n_orden": 13
            },
            dataType: 'json',
            success: function (data) {
                if (data.resultado == 'OK') {
                    mostrar_cuadro('S', 'Exito', 'Modificación realizada exitosamente');
                    setea_parametros('#c8_grid', { ':p_n_secuencia': $('#c8_grid').getCell(1, 'nro_secuencia') });
                }
                else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    }
}

function modificar_titulares(p_tipo_registro){
    let nro_secuencia;

    if (p_tipo_registro == 'C1') {
        nro_secuencia = $('#c1_grid').getCell(1, 'nro_secuencia');
    }
    else if (p_tipo_registro == 'C2') {
        nro_secuencia = $('#c2_grid').getCell(1, 'nro_secuencia');
    } else {
        nro_secuencia = $('#c6_grid').getCell(1, 'nro_secuencia');
    }

    if (!nro_secuencia) {
        mostrar_cuadro('E', 'Error', 'El campo Nro. Secuencia no puede quedar vacío');
        return;
    } 

    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_tipo_registro": 'TITULARES',
            "p_dominio_nuevo": null,
            "p_dominio_viejo": null,
            "p_d_marca": null,
            "p_d_tipo": null,
            "p_d_modelo": null,
            "p_n_anio_modelo": null,
            "p_n_cilindrada": null,
            "p_n_peso": null,
            "p_n_valuacion": null,
            "p_n_carga": null,
            "p_c_tipo_uso": null,
            "p_d_tipo_uso": null,
            "p_f_radicacion": null,
            "p_f_inscripcion": null,
            "p_c_categoria": null,
            "p_c_origen": null,
            "p_fmcamod": null,
            "p_c_grupo_siat": null,
            "p_c_tipo_siat": null,
            "p_id_descripcion_siat": null,
            "p_id_modelo_siat": null,
            "p_c_marca_siat": null,
            "p_nro_tramite": null,
            "p_tipo_formulario":null,
            "p_nro_formulario": null,
            "p_c_tipo_tramite": null,
            "p_d_tipo_tramite": null,
            "p_c_tipo_accion": null,
            "p_d_tipo_accion": null,
            "p_d_error": null,
            "p_n_cuit": limpia_cuit($('#n_cuit_tit').val()),
            "p_d_denominacion": $('#d_denominacion_tit').val(),
            "p_c_tipo_doc": $('#c_tipo_doc_tit').val(),
            "p_n_documento": $('#n_documento_tit').val(),
            "p_d_calle": $('#calle_tit').val(),
            "p_n_numero": $('#n_numero_tit').val(),
            "p_d_piso": $('#piso_tit').val(),
            "p_d_depto": $('#depto_tit').val(),
            "p_d_barrio": $('#barrio_tit').val(),
            "p_d_localidad": $('#d_localidad_tit').val(),
            "p_c_postal": $('#cod_postal_tit').val(),
            "p_c_provincia": $('#c_provincia_tit').val(),
            "p_cant_titulares": null,
            "p_c_reg_secc": null,
            "p_d_reg_secc": null,
            "p_c_reg_secc_ori": null,
            "p_d_reg_secc_ori": null,
            "p_d_mun_origen": null,
            "p_f_operacion": null,
            "p_d_parametros_adic": null,
            "p_d_reservado": $('#reservado_tit').val(),
            "p_d_observaciones": null,
            "p_c_localidad_siat": $('#d_localidad_siat_tit').val(),
            "p_nro_secuencia": nro_secuencia,
            "p_nro_secuencia_modif": null,
            "p_nro_envio": null,
            "p_c_estado": null,
            "p_tipo_sub_registro": null,
            "p_cod_organismo": null,
            "p_f_alta": null,
            "p_f_baja": null,
            "p_c_origen_info": null,
            "p_c_radicacion": null,
            "p_c_estado_rad": null,
            "p_tipo_registro_modif": null,
            "p_i_monto_total": null,
            "p_i_monto_pun": null,
            "p_i_monto_adi": null,
            "p_i_monto_imp": null,
            "p_f_cobro": null,
            "p_f_tramite": null,
            "p_f_deposito": null,
            "p_c_moneda": null,
            "p_c_banco": null,
            "p_d_banco": null,
            "p_cant_detalle": null,
            "p_d_porcentaje": $('#porcentaje_tit').val(),
            "id_menu": v_id_menu,
            "n_orden": 13
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                mostrar_cuadro('S', 'Exito', 'Modificación realizada exitosamente');
                setea_parametros('#c1_grid', { ':p_n_secuencia': $('#c1_grid').getCell(1, 'nro_secuencia') });
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

