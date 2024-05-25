function check_digito_verificador(param, digito, completar) {
    $.ajax({
        url: "baja_aut/consultas_ajax.php",
        type: "POST",
        dataType: "JSON",
        data: {p_oper: 'checkDigito', dominio: param, digito: digito, completar: completar},
        success: function (res) {
            $('#main').procOverlay({visible: false});
            if (res) {
                if (res.resultado == "OK") {
                    if (completar == 'patente') {
                        $('#d_dominio').val(res.dominio);
                        $('#c_verif_dom').val(res.digito);
                    } else if (completar == 'patente_vieja') {
                        $('#d_dom_ant').val(res.dominio);
                        $('#c_verif_dom_ant').val(res.digito);
                    }
                    check_baja_definitiva()
                } else {
                    mostrar_cuadro('V', 'Atención', res.error, null, null, 400);
                    return;
                }
            } else {
                mostrar_error('Ocurrió un error al comprobar el Digito Verificador.');
                return;
            }
        }
    });
}

function check_baja_definitiva() {
    $('#main').procOverlay({visible: true});
    $.ajax({
        url: "baja_aut/consultas_ajax.php",
        type: "POST",
        dataType: "JSON",
        data: {
            p_oper: 'checkBaja',
            d_objeto_hecho: $('#d_dominio').val()
        },
        success: function (res) {
            $('#main').procOverlay({visible: false});
            if (res) {

                if (res['F_VIG_HASTA'] != null) { // ya tiene baja definitiva => no lo puede dar de baja
                    mostrar_error('El dominio seleccionado ya tiene una baja definitiva.');
                } else if (res['F_CESE_PROVISORIO'] != null && v_modo !== 'D') { // no tiene baja definitiva pero si prov
                    //baja => no puede dar de baja prov
                    mostrar_error('El dominio seleccionado ya tiene una baja provisoria.');
                } else {
                    setea_parametros('#main_grid',
                        {
                            ':id_contribuyente': $('#id_contribuyente').val(),
                            ':d_objeto': $('#d_dominio').val(),
                            ':p_modo': v_modo
                        });
                }
            } else { // las dos fechas son null => esta activo
                if (v_modo === 'D') {
                    mostrar_error('El dominio seleccionado no tiene una baja provisoria.');
                } else {
                    setea_parametros('#main_grid',
                        {
                            ':id_contribuyente': $('#id_contribuyente').val(),
                            ':d_objeto': $('#d_dominio').val(),
                            ':p_modo': v_modo
                        });
                }
            }
        },
        error: function () {
            mostrar_error('Ocurrió un error al comprobar si tiene baja definitiva.');
        }
    });
}

function llamar_procedimiento() {
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_modo": v_modo,
            "p_c_tributo": $('#main_grid').getCell($("#main_grid").getGridParam('selrow'), 'c_tributo'),
            "p_id_contribuyente": $('#main_grid').getCell($("#main_grid").getGridParam('selrow'), 'id_contribuyente'),
            "p_d_objeto_hecho": $('#main_grid').getCell($("#main_grid").getGridParam('selrow'), 'd_objeto_hecho'),
            "p_f_baja": $('#f_baja').val(),
            "p_c_motivo": $('#c_motivo').val(),
            "p_c_delegacion": $('#c_delegacion').val(),
            "p_deuda": null,
            "id_menu": 10987,
            "n_orden": 1
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                if (data.p_deuda == 'S') {
                    if (v_modo === 'D') {
                        mostrar_cuadro('I', 'Atención', 'No se puede confirmar la baja, debido a que tiene deuda.');
                        return;
                    } else {
                        mostrar_cuadro('C', 'Atención', 'El contribuyente posee deuda por este dominio.<br>¿Desea Continuar?',
                            function () {
                                $.ajax({
                                    type: 'POST',
                                    url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                                    data: {
                                        "p_modo": v_modo,
                                        "p_c_tributo": $('#main_grid').getCell($("#main_grid").getGridParam('selrow'), 'c_tributo'),
                                        "p_id_contribuyente": $('#main_grid').getCell($("#main_grid").getGridParam('selrow'), 'id_contribuyente'),
                                        "p_d_objeto_hecho": $('#main_grid').getCell($("#main_grid").getGridParam('selrow'), 'd_objeto_hecho'),
                                        "p_f_baja": $('#f_baja').val(),
                                        "p_c_motivo": $('#c_motivo').val(),
                                        "p_c_delegacion": $('#c_delegacion').val(),
                                        "p_deuda": data.p_deuda,
                                        "id_menu": 10987,
                                        "n_orden": 1
                                    },
                                    dataType: 'json',
                                    success: function (data) {
                                        if (data.resultado == 'OK') {
                                            $('#n_cert_baja').val(data.p_n_cert_baja);
                                            $('#f_baja,#c_motivo,#c_delegacion').attr('disabled', true);
                                            $('#lupa_motivo_baja,#lupa_prov_oficina').hide();
                                            $('#btn_aceptar_baja').hide();
                                            realizado = 'S';
                                            mostrar_confirmacion('Se ha registrado la baja provisoria.');
                                        } else {
                                            mostrar_cuadro('E', 'Error', data.resultado);
                                            return;
                                        }
                                    }
                                });
                            });
                    }

                } else {
                    $('#n_cert_baja').val(data.p_n_cert_baja);
                    $('#f_baja,#c_motivo,#c_delegacion').attr('disabled', true);
                    $('#lupa_motivo_baja,#lupa_prov_oficina').hide();
                    $('#btn_imprimir').show();
                    $('#btn_aceptar_baja').hide();
                    realizado = 'S';
                    if (v_modo === 'D'){
						mostrar_confirmacion('Se ha registrado la baja definitiva.');
					}else {
						mostrar_confirmacion('Se ha registrado la baja provisoria.');
					}
                }
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function n_cuit_focusout() {
    if ($('#n_cuit').val() && $('#n_cuit').val().length == 13) {
        $('#main').procOverlay({visible: true});
        $.ajax({
            url: "baja_aut/consultas_ajax.php",
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
                }
                habilitar_dominios(true);
            }
        });
    } else {
        $("#d_denominacion").val(null);
        $("#id_contribuyente").val(null);
        $("#c_tipo_documento").val(null);
        $("#d_tipo_documento").val(null);
        $("#n_documento").val(null);
        habilitar_dominios(false);
    }
}

function n_documento_focusout() {
    if ($("#c_tipo_documento").val() && $('#n_documento').val() && !$('#id_contribuyente').val()) {
        $('#main').procOverlay({visible: true});
        $.ajax({
            url: "baja_aut/consultas_ajax.php",
            type: "POST",
            dataType: 'JSON',
            data: {p_oper: 'dni', filtro: $('#n_documento').val().split('.').join("")},
            success: function (response) {
                $('#main').procOverlay({visible: false});
                if (response) {
                    $('#n_cuit').val(response['CUIT'])
                    $("#d_denominacion").val(response['DENOMINACION']);
                    $("#id_contribuyente").val(response['ID_CONTRIBUYENTE']);
                    $("#c_tipo_documento").val(response['C_TIPO_DOCUMENTO']);
                    $("#d_tipo_documento").val(response['D_TIPO_DOCUMENTO']);
                    $("#n_documento").val(response['N_DOCUMENTO']);
                }
                habilitar_dominios(true);
            }
        });
    } else {
        $("#n_cuit").val(null);
        $("#d_denominacion").val(null);
        $("#id_contribuyente").val(null);
        $("#c_tipo_documento").val(null);
        $("#d_tipo_documento").val(null);
        $("#n_documento").val(null);
        habilitar_dominios(false);
    }
}

function habilitar_dominios(habilitar) {
    if (habilitar) {
        $('#lupa_dominio,#lupa_dominio_ant').show().css('display', 'table-cell');
        $('#mascara_lupa_dominio,#mascara_lupa_dom_ant').hide();
    } else {
        $('#lupa_dominio,#lupa_dominio_ant').hide();
        $('#mascara_lupa_dominio,#mascara_lupa_dom_ant').show().css('display', 'table-cell');
    }
}

function imprimir_reporte() {
    $('#main').procOverlay({visible: true});
    let params = 'p_cert_baja|' + $("#n_cert_baja").val() + '&p_f_baja|' + $('#f_baja').val() + '&p_id_contribuyente|' + $('#main_grid').getCell($("#main_grid").getGridParam('selrow'), 'id_contribuyente') + '&p_d_objeto_hecho|' + $('#main_grid').getCell($("#main_grid").getGridParam('selrow'), 'd_objeto_hecho');
    llamar_report('AUTL001', params, 'PDF');
}

function limpiar_app() {
    $('#lupa_dominio').hide();
    $('#mascara_lupa_dominio').show().css('display', 'table-cell');
    $('#lupa_dominio_ant').hide();
    $('#mascara_lupa_dom_ant').show().css('display', 'table-cell');
    $('#frm_consulta :input').val(null);
    $('#main_grid, #responsables_grid').clearGridData();
    realizado = 'N';
}
