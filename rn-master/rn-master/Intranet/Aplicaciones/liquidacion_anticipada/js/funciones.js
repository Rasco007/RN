function obtener_constantes() {
    $.ajax({
        url: "liquidacion_anticipada/php/funciones.php",
        type: "POST",
        dataType: "JSON",
        data: { p_oper: 'getConst' },
        success: function (res) {
            if (res) {
                g_indactdia = res.INDACTDIA || "";
                g_indact2320 = res.INDACT2320 || "";
                g_conrecmora = res.CONRECMORA || "";
                g_concuosellos = res.CONCUOSELLOS || "";
                g_concuoplan = res.CONCUOPLAN || "";
                g_concuoplan_inm = res.CONCUOPLAN_INM || "";
                g_concuoplan_aut = res.CONCUOPLAN_AUT || "";
                g_concuoplan_ar = res.CONCUOPLAN_AR || "";
                g_concuoplan_ap = res.CONCUOPLAN_AP || "";
                g_concanplan = res.CONCANPLAN || "";
                g_concanplan_ar = res.CONCANPLAN_AR || "";
                g_concanplan_ap = res.CONCANPLAN_AP || "";
                g_concanplan_inm = res.CONCANPLAN_INM || "";
                g_concanplan_sell = res.CONCANPLAN_SELL || "";
                g_tipoimppfp = res.TIPOIMPPFP || "";
                param_pagcon = res.PAGCON || "";

            }
        }
    });
}

function calcular_totales() {
    $.ajax({
        url: "liquidacion_anticipada/php/funciones.php",
        type: "POST",
        dataType: "JSON",
        data: { p_oper: 'getTotales', p_id_sesion: sesion },
        success: function (res) {
            if (res) {
                $('#tsaldo').val(res.TSALDO || "0,00");
                $('#interes_fecha_liq').val(res.INTERES_FECHA_LIQ || "0,00");
                $('#liquidado').val(res.LIQUIDADO || "0,00");

                $('.mascara_importe').focusout();
            }
        }
    });
}

function get_datos_resu() {
    $.ajax({
        url: "liquidacion_anticipada/php/funciones.php",
        type: "POST",
        dataType: "JSON",
        data: { p_oper: 'getDatosResu', p_id_contribuyente: $('#id_contribuyente').val(), p_n_plan_pago: $('#n_plan').val() },
        success: function (res) {
            if (res) {
                $("#c_tipo_plan_pago").val(res.C_TIPO_PLAN_PAGO);
                $("#n_plan").val(res.N_PLAN_PAGO);
                $("#id_contribuyente").val(res.ID_CONTRIBUYENTE);
                $("#d_objeto_hecho").val(res.C_TIPO_IMPONIBLE); //confuso pero en el form esta asi
                //$("#d_objeto_hecho").val(res.D_OBJETO_HECHO);
                $("#n_tabla_tipo_imp").val(res.N_TABLA_TIPO_IMP);
                $("#d_objeto2").val(res.D_OBJETO_HECHO);
                $("#c_tributo").val(res.C_TRIBUTO);
                $("#c_concepto").val(res.C_CONCEPTO);
                $("#n_cuotas").val(res.N_CUOTAS);
                $("#i_capital").val(res.I_CAPITAL);
                $("#i_actualizado").val(res.I_ACTUALIZADO);
                $("#i_anticipo").val(res.I_ANTICIPO);
                $("#i_intereses").val(res.I_INTERESES);
                $("#i_total").val(res.I_TOTAL);
                $("#f_emision").val(res.F_EMISION);

                $("#c_caducidad").val(res.C_CADUCIDAD);
                $("#n_tabla_tipo_cad").val(res.N_TABLA_TIPO_CAD);
                $("#f_caducidad").val(res.F_CADUCIDAD);
                $("#f_alta").val(res.F_ALTA);
                $("#c_usuarioalt").val(res.C_USUARIOALT);

                $("#f_efectivo").val(res.F_EFECTIVACION);
                $("#f_liquidacion").val(res.F_LIQUIDACION);
                $("#f_efectivacion_rehab").val(res.F_EFECTIVACION_REHAB);
                $("#f_efectivacion_refor").val(res.F_EFECTIVACION_REFOR);
                $("#c_delegacion").val(res.C_DELEGACION);
                $("#n_tabla_deleg").val(res.N_TABLA_DELEG);
                $("#d_observaciones").val(res.D_OBSERVACIONES);
                // $("#c_tipo_liq").val(res.C_TIPO_LIQ);
                // $("#n_tabla_tipo_liq").val(res.N_TABLA_TIPO_LIQ);
                $("#c_usuario_efec").val(res.C_USUARIO_EFEC);
                $("#c_tipo_calculo").val(res.C_TIPO_CALCULO);
                $("#n_tabla_calculo").val(res.N_TABLA_CALCULO);
                //$("#i_valor_cuotas").val(res.I_VALOR_CUOTAS);
                // $("#c_origen_deuda").val(res.C_ORIGEN_DEUDA);
                // $("#n_tabla_origen_deuda").val(res.N_TABLA_ORIGEN_DEUDA);
                // $("#c_seg_riesgo").val(res.C_SEG_RIESGO);

                $("#desc_impon").val(res.DESC_IMPON);
                $("#d_delegacion").val(res.D_DELEGACION);
                $("#d_tributo").val(res.DESC_TRIBUTO);
                $("#d_concepto").val(res.DESC_CONCEPTO);
                $("#d_denominacion").val(res.DESC_DENOM || $("#d_denominacion").val());
                $("#n_cuit").val(res.N_CUIT || $("#n_cuit").val());
                $("#n_cuit").mask("99-99999999-9");
                $("#n_documento").val(res.N_DOCUMENTO || $("#n_documento").val());
                $("#c_tipo_documento").val(res.C_TIPO_DOCUMENTO || $("#c_tipo_documento").val());
                $("#c_tipo_documento").blur();
                $("#cuota").val(res.CUOTA);
                $("#d_tipo_plan_pago").val(res.DESC_TIPO_PLAN);
                $("#i_tasas").val(res.I_TASAS);
                $("#situacion").text(res.SITUACION);
                $("#p_descuento_interes").val(res.P_DESCUENTO_INTERES);
                $("#i_capital_ori").val(res.I_CAPITAL_ORI);
                $("#i_intereses_ori").val(res.I_INTERESES_ORI);
                $("#i_interes_mora").val(res.I_INTERES_MORA);
                $("#d_periodicidad").val(res.D_PERIODICIDAD);
                $("#d_metodo").val(res.D_METODO);
                $("#n_cuit_alter").val(res.N_CUIT_ALTER);
                $("#d_deno_alter").val(res.D_DENO_ALTER);

                $('#btn_tab_detalle').removeClass('tab-deshabilitado');
                $('#btn_tab_detalle').attr('data-toggle', 'tab');
                $('#btn_tab_cuotas').removeClass('tab-deshabilitado');
                $('#btn_tab_cuotas').attr('data-toggle', 'tab');

                if (res.I_INTERESES < 0) {
                    $('#i_descuento').val(Math.abs(res.I_INTERESES));
                    $('#i_intereses').val("");
                }

                if (res.I_INTERESES_ORI > 0) {
                    calcular_descuento_interes();
                } else {
                    $('.mascara_importe').focusout();
                }

                if ($('#n_plan').val() && $('#c_tipo_plan_pago').val()) {
                    ver_rechazos();
                }

            }
        }
    });
}

function calcular_descuento_interes() {
    $.ajax({
        url: "liquidacion_anticipada/php/funciones.php",
        type: "POST",
        dataType: "JSON",
        data: { p_i_intereses_ori: $('#i_intereses_ori').val(), p_i_interes_mora: $('#i_interes_mora').val(), p_oper: 'getDescuento' },
        success: function (res) {
            if (res) {
                $('#p_descuento_interes').val(res.P_DESCUENTO_INTERES);
                $('.mascara_importe').focusout();
            }
        }
    });
}

function traer_datos() {
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_n_plan_pago": $('#n_plan').val(),
            "id_menu": v_id_menu,
            "n_orden": 0
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                $('#c_tipo_plan_pago').val(data.p_c_tipo_plan_pago);
                $('#d_tipo_plan_pago').val(data.p_desc_tipo_plan);
                $('#n_cuit').val(data.p_n_cuit);
                $('#d_denominacion').val(data.p_desc_denom);
                $('#c_tipo_documento').val(data.p_c_tipo_documento);
                $("#c_tipo_documento").blur();
                $('#n_documento').val(data.p_n_documento);
                $('#c_tipo_imponible').val(data.p_imponible);
                $('#d_objeto2').val(data.p_d_objeto2);
                $('#c_delegacion').val(data.p_c_delegacion);
                $('#d_delegacion').val(data.p_d_delegacion);
                $('#d_observaciones').val(data.p_d_observaciones);
                $("#n_cuit").mask("99-99999999-9");
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function buscar() {
    $.ajax({ //BUSQUEDA_CONTRIBUYENTE
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_tipo_imponible": $('#c_tipo_imponible').val(),
            "p_d_objeto_hecho": $('#d_objeto_hecho').val(),
            "p_n_cuit": limpia_cuit($('#n_cuit').val()),
            "p_n_documento": $('#n_documento').val(),
            "p_c_tipo_documento": $('#c_tipo_documento').val(),
            "p_n_plan_pago": $('#n_plan').val(),
            "id_menu": v_id_menu,
            "n_orden": 2
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                $('#id_contribuyente').val(data.p_id_contribuyente);
                $('#n_plan').val(data.p_n_plan_pago);
                if (!data.p_n_plan_pago) {
                    mostrar_error('Debe ingresar el Número de Plan de Pago');
                    return
                } else {
                    sesion = null;
                    $('#btn_buscar').attr('disabled', true);
                    $("#c_tipo_plan_pago").attr('disabled', true);
                    $("#n_plan").attr('disabled', true);
                    $("#d_objeto2").attr('disabled', true);
                    $("#c_tipo_imponible").attr('disabled', true);
                    $("#c_delegacion").attr('disabled', true);
                    $("#d_observaciones").attr('disabled', true);
                    $("#d_denominacion").attr('disabled', true);
                    $("#n_cuit").attr('disabled', true);
                    $("#c_tipo_documento").attr('disabled', true);

                    $("#c_tipo_plan_pago").prop('readonly', true);
                    $("#n_plan").prop('readonly', true);
                    $("#d_objeto2").prop('readonly', true);
                    $("#c_tipo_imponible").prop('readonly', true);
                    $("#c_delegacion").prop('readonly', true);
                    $("#d_observaciones").prop('readonly', true);
                    $("#d_denominacion").prop('readonly', true);
                    $("#n_cuit").prop('readonly', true);
                    $("#c_tipo_documento").prop('readonly', true);

                    $("#lupa_n_plan").hide();
                    $("#lupa_c_tipo_plan_pago").hide();
                    $("#lupa_d_denominacion").hide();
                    $("#lupa_c_tipo_documento").hide();
                    $("#lupa_c_tipo_imponible").hide();
                    $("#lupa_d_objeto2").hide();
                    $("#lupa_c_delegacion").hide();
                    get_datos_resu();
                }
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function ver_rechazos() {
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_n_plan_pago": $('#n_plan').val(),
            "p_c_tributo": $('#c_tributo').val(),
            "p_id_contribuyente": $('#id_contribuyente').val(),
            "id_menu": v_id_menu,
            "n_orden": 3
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                if (data.p_rechazado) {
                    $('#btn_liq_ant').attr('disabled', true);
                    mostrar_error('Los siguientes Objeto/Hecho poseen códigos de rechazo: ' || data.p_rechazado.substring(2));
                    return;
                } else {
                    $('#btn_liq_ant').attr('disabled', false);
                }
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}
function liquidacion_anticipada() {
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            'p_c_tipo_plan_pago': $('#c_tipo_plan_pago').val(),
            'p_n_plan_pago': $('#n_plan').val(),
            "id_menu": v_id_menu,
            "n_orden": 4
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                $('#max_cantidad_cuotas').val(data.p_max_cantidad_cuotas);
                $('#btn_grabar_liq').attr('disabled', false);
                $('#id_boleta_agr').val("");
                //$("#f_liquidacion_modal").val("");

                $('#cuotas_adeudadas_grid').clearGridData();
                setea_parametros('#cuotas_adeudadas_grid', { ':p_id_sesion': null });
                sesion = null;
                $('#tsaldo').val("");
                $('#interes_fecha_liq').val("");
                $('#liquidado').val("");
                $('#cant_cuotas').val("");
                $('#modal_liq').modal('show');
                $(window).resize();
                if (!$('#f_liquidacion_modal').val()) {
                    $('#f_liquidacion_modal').val(fecha_hoy);
                }
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function armar_liquidacion() {
    if ($('#f_liquidacion_modal').val()) {
        validar_f_liquidacion();
    }

    if ($('#cant_cuotas').val() && es_fecha_valida) {
        if (Number($('#cant_cuotas').val()) > Number($('#max_cantidad_cuotas').val())) {
            //mostrar_error('La cantidad de cuotas debe ser igual o menor a la cantidad máxima de cuotas');
            mostrar_error('Debe estar comprendido en un rango de ... a ' + $('#max_cantidad_cuotas').val());
            $('#cant_cuotas').val("");
            return;
        }
    } else {
        /*if ($('#max_cantidad_cuotas').val() == 0) {
            mostrar_error('La cantidad de cuotas debe ser igual o menor a la cantidad máxima de cuotas');
            $('#cant_cuotas').val("");
            return;
        }*/
    }

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

                $.ajax({
                    type: 'POST',
                    url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                    data: {
                        'p_c_tipo_plan_pago': $('#c_tipo_plan_pago').val(),
                        'p_n_plan_pago': $('#n_plan').val(),
                        'p_n_cuit': limpia_cuit($('#n_cuit').val()),
                        'p_cant_cuotas': $('#cant_cuotas').val(),
                        'p_fecha_liquidacion': $('#f_liquidacion_modal').val(),
                        "id_menu": v_id_menu,
                        "n_orden": 5
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.resultado == 'OK') {
                            $('#id_liquidacion').val(data.p_id_liquidacion);
                            $('#id_boleta_agr').val(data.p_id_boleta_agr);

                            filtros_arr_main = [];
                            if (data.p_id_sesion != '') {
                                filtros_arr_main.push('ID Sesión: ' + data.p_id_sesion);
                            }
                            filtros_no_nativos_ar['cuotas_adeudadas_grid'] = filtros_arr_main;

                            setea_parametros('#cuotas_adeudadas_grid', { ':p_id_sesion': data.p_id_sesion });
                            sesion = data.p_id_sesion;
                        }
                        else {
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                });
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                $('#f_liquidacion_modal').val("");
                return
            }
        }
    });
}

function validar_f_liquidacion() {
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
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                $('#f_liquidacion_modal').val("");
                es_fecha_valida = false;
            }
        }
    });
}

function procesar() {
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            'p_i_liquidado': $('#cuotas_adeudadas_grid').getCell(1, 'i_liquidado') ? $('#cuotas_adeudadas_grid').getCell(1, 'i_liquidado').replace(/\./g, '').replace(',', '.') : "",
            'p_id_liquidacion': $('#id_liquidacion').val(),
            "id_menu": v_id_menu,
            "n_orden": 7
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK' || data.resultado.startsWith('Se ha generado')) {
                $('#btn_grabar_liq').attr('disabled', true);
                mostrar_cuadro('S', 'Exito', data.resultado);
            }
            else {
                mostrar_cuadro('E', 'Error', data.resultado);
                $('#f_liquidacion_modal').val("");
                return;
            }
        }
    });
}

function limpiar() {
    sesion = null;
    $("#f_liquidacion_modal").val("");
    $("#id_liquidacion").val("");
    $("#id_boleta_agr").val("");
    $("#c_tipo_plan_pago").val("");
    $("#n_plan").val("");
    $("#id_contribuyente").val("");
    $("#d_objeto_hecho").val("");
    $("#d_objeto2").val("");
    $("#n_tabla_tipo_imp").val("");
    $("#c_tipo_imponible").val("");
    $("#c_tributo").val("");
    $("#c_concepto").val("");
    $("#n_cuotas").val("");
    $("#i_capital").val("");
    $("#i_actualizado").val("");
    $("#i_anticipo").val("");
    $("#i_intereses").val("");
    $("#i_total").val("");
    $("#f_emision").val("");

    $("#c_caducidad").val("");
    $("#n_tabla_tipo_cad").val("");
    $("#f_caducidad").val("");
    $("#f_alta").val("");
    $("#c_usuarioalt").val("");

    $("#f_efectivo").val("");
    $("#f_liquidacion").val("");
    $("#f_efectivacion_rehab").val("");
    $("#f_efectivacion_refor").val("");
    $("#c_delegacion").val("");
    $("#n_tabla_deleg").val("");
    $("#d_observaciones").val("");
    // $("#c_tipo_liq").val("");
    // $("#n_tabla_tipo_liq").val("");
    $("#c_usuario_efec").val("");
    $("#c_tipo_calculo").val("");
    $("#n_tabla_calculo").val("");
    //$("#i_valor_cuotas").val("");
    // $("#c_origen_deuda").val("");
    // $("#n_tabla_origen_deuda").val("");
    // $("#c_seg_riesgo").val("");

    $("#desc_impon").val("");
    $("#d_delegacion").val("");
    $("#d_tributo").val("");
    $("#d_concepto").val("");
    $("#d_denominacion").val("");
    $("#n_cuit").val("");
    $("#n_documento").val("");
    $("#c_tipo_documento").val("");
    $("#cuota").val("");
    $("#d_tipo_plan_pago").val("");
    $("#i_tasas").val("");
    $("#situacion").text("");
    $("#p_descuento_interes").val("");
    $("#i_capital_ori").val("");
    $("#i_intereses_ori").val("");
    $("#i_interes_mora").val("");
    $("#d_periodicidad").val("");
    $("#d_metodo").val("");
    $("#n_cuit_alter").val("");
    $("#d_deno_alter").val("");

    $('#btn_tab_detalle').addClass('tab-deshabilitado');
    $('#btn_tab_detalle').removeAttr('data-toggle');
    $('#btn_tab_cuotas').addClass('tab-deshabilitado');
    $('#btn_tab_cuotas').removeAttr('data-toggle');
    $("#btn_tab_resumen").click();
    $('#cuotas_grid').clearGridData();
    $('#detalle_grid').clearGridData();
    $('#btn_buscar').attr('disabled', false);
    $('#btn_liq_ant').attr('disabled', true);

    $("#c_tipo_plan_pago").attr('disabled', false);
    $("#n_plan").attr('disabled', false);
    $("#d_objeto2").attr('disabled', false);
    $("#c_tipo_imponible").attr('disabled', false);
    $("#c_delegacion").attr('disabled', false);
    $("#d_observaciones").attr('disabled', false);
    $("#d_denominacion").attr('disabled', false);
    $("#n_cuit").attr('disabled', false);
    $("#c_tipo_documento").attr('disabled', false);

    $("#c_tipo_plan_pago").prop('readonly', false);
    $("#n_plan").prop('readonly', false);
    $("#d_objeto2").prop('readonly', false);
    $("#c_tipo_imponible").prop('readonly', false);
    $("#c_delegacion").prop('readonly', false);
    $("#d_observaciones").prop('readonly', false);
    $("#d_denominacion").prop('readonly', false);
    $("#n_cuit").prop('readonly', false);
    $("#c_tipo_documento").prop('readonly', false);

    $("#lupa_n_plan").show();
    $("#lupa_c_tipo_plan_pago").show();
    $("#mascara_lupa_d_denominacion").show();
    $("#lupa_d_denominacion").hide();
    $("#lupa_c_tipo_documento").show();
    $("#lupa_c_tipo_imponible").show();
    $("#mascara_lupa_d_objeto2").show();
    $("#lupa_d_objeto2").hide();
    $("#lupa_c_delegacion").show();

}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


