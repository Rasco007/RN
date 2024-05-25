function modo_consulta(p_modo = true) {
    if ( p_modo == true){
        $('#div_acciones_intermedio, #btn_act_reg_verif, #div_msj_info_adicional').hide();
        $('#frm_regimen :input, #check_trasladar').attr('disabled',true);
        $('#frm_importes_ajustados :input').attr('readonly',true);
        $("#modal_deduc_grilla1").jqGrid('hideCol',['checkbox']);

        modo_obl = 'CON';
        $('#btn_add_act, #btn_del_act, #btn_guardar_actividad,#btn_del_deduc_banc_t,#btn_del_deduc_banc').hide();
        $('#btn_edi_deduc_banc, #btn_add_deduc_banc, #btn_del_deduc_iibb_t, #btn_del_deduc_iibb, #btn_edi_deduc_iibb').hide();
        $('#btn_add_deduc_iibb, #btn_del_deduc_percep_t, #btn_del_deduc_percep, #btn_edi_deduc_percep, #btn_add_deduc_percep').hide();
        $('#btn_del_deduc_adu_t, #btn_del_deduc_adu, #btn_edi_deduc_adu, #btn_add_deduc_adu').hide();
    }
    else{
        $('#div_acciones_intermedio, #btn_act_reg_verif, #div_msj_info_adicional').show();
        $('#frm_regimen :input, #check_trasladar').attr('disabled',false);
        $('#frm_importes_ajustados :input').attr('readonly',false);
        $("#modal_deduc_grilla1").jqGrid('showCol',['checkbox']);
        modo_obl='CAR';

        $('#btn_add_act, #btn_del_act, #btn_guardar_actividad,#btn_del_deduc_banc_t,#btn_del_deduc_banc').show();
        $('#btn_edi_deduc_banc, #btn_add_deduc_banc, #btn_del_deduc_iibb_t, #btn_del_deduc_iibb, #btn_edi_deduc_iibb').show();
        $('#btn_add_deduc_iibb, #btn_del_deduc_percep_t, #btn_del_deduc_percep, #btn_edi_deduc_percep, #btn_add_deduc_percep').show();
        $('#btn_del_deduc_adu_t, #btn_del_deduc_adu, #btn_edi_deduc_adu, #btn_add_deduc_adu').show();
    }
}

function _show_modal_deducciones(origen) {
    $('#total_deducciones').val(0);
    switch(origen) {
        case ('banco'):
            $('#deducciones_titulo').text('Retenciones Bancarias');
            $('#ret_banc_div').show();
            $('#ret_iibb_div').hide();
            $('#percep_div').hide();
            $('#percep_aduana_div').hide();
            $('#origen_modal').val('REC');
            setea_parametros('#ret_banc_grilla2',{':p_n_instancia':v_n_instancia,':p_n_orden':v_n_orden,':p_id_obligacion':v_id_obligacion});
            break;
        case ('iibb'):
            $('#deducciones_titulo').text('Retenciones IIBB');
            $('#ret_banc_div').hide();
            $('#ret_iibb_div').show();
            $('#percep_div').hide();
            $('#percep_aduana_div').hide();
            $('#origen_modal').val('RET');
            setea_parametros('#ret_iibb_grilla2',{':p_n_instancia':v_n_instancia,':p_n_orden':v_n_orden,':p_id_obligacion':v_id_obligacion});
            break;
        case ('percep'):
            $('#deducciones_titulo').text('Percepciones');
            $('#ret_banc_div').hide();
            $('#ret_iibb_div').hide();
            $('#percep_div').show();
            $('#percep_aduana_div').hide();
            $('#origen_modal').val('PER');
            setea_parametros('#percep_grilla2',{':p_n_instancia':v_n_instancia,':p_n_orden':v_n_orden,':p_id_obligacion':v_id_obligacion});
            break;
        case ('aduana'):
            $('#deducciones_titulo').text('Percepciones de Aduana');
            $('#ret_banc_div').hide();
            $('#ret_iibb_div').hide();
            $('#percep_div').hide();
            $('#percep_aduana_div').show();
            $('#origen_modal').val('ADU');
            setea_parametros('#percep_aduana_grilla2',{':p_n_instancia':v_n_instancia,':p_n_orden':v_n_orden,':p_id_obligacion':v_id_obligacion});
            break;
    }
    $('#deduccion_origen').val(null);
    $('#deduccion_origen').selectpicker('refresh');
    $('#deduc_p_desde, #deduc_p_hasta').val(v_pos_fiscal);
/*
    $('#deduc_f_desde').datepicker('setDate',$.datepicker.parseDate('yymmdd', $('#pos_fiscal_obl').val()+'01'));
    let fecha = new Date($('#deduc_f_desde').datepicker('getDate'));
    let mes = fecha.getMonth();

    let año = fecha.getFullYear();
    let ultimoDia = new Date(año, mes + 1, 0);
    $('#deduc_f_hasta').datepicker('setDate',ultimoDia);
*/

    _mostrar_ocultar_columnas(null,null);
    $('#modal_deduc_grilla1').jqGrid('clearGridData');
    $('#modal_deducciones').modal('show');
}

function _mostrar_ocultar_columnas(val,origenModal){
    if (val == 2){
        $('#modal_deduc_grilla1').jqGrid('hideCol',["n_anio","n_mes",
            "n_cbu","c_tipo_cuenta","c_tipo_moneda","c_sucursal"]);
        $('#modal_deduc_grilla1').jqGrid('showCol',["n_pos_fiscal","n_importe",
            "f_fecha","d_constancia","n_comprobante","c_tipo_comprobante",
            "c_letra","n_cuit_ag","d_denominacion_ag",
            "i_base_imponible","p_coeficiente"]);
    }else if (val == 1) {
        switch (origenModal) {
            case ("RET"):
                $('#modal_deduc_grilla1').jqGrid('showCol',["n_cuit_ag","d_denominacion_ag",
                    "f_fecha","n_comprobante","c_tipo_comprobante",
                    "c_letra","c_sucursal","d_constancia","n_importe"]);
                $('#modal_deduc_grilla1').jqGrid('hideCol',["n_cuota","n_pos_fiscal","n_hecho",
                    "i_base_imponible","p_coeficiente", "n_cbu","c_tipo_cuenta","c_tipo_moneda"]);
                break;
            case ("REC"):
                $('#modal_deduc_grilla1').jqGrid('showCol',["n_cuit_ag","d_denominacion_ag",
                    "n_pos_fiscal", "n_importe", "n_cbu",
                    "c_tipo_cuenta","c_tipo_moneda"]);
                $('#modal_deduc_grilla1').jqGrid('hideCol',["n_cuota","f_fecha",
                    "d_constancia","n_hecho","i_base_imponible","p_coeficiente","c_tipo_comprobante",
                    "c_letra","c_sucursal","n_comprobante"]);
                break;
            case ("PER"):
                $('#modal_deduc_grilla1').jqGrid('showCol',["n_cuit_ag","d_denominacion_ag",
                    "f_fecha", "n_importe","n_comprobante","c_tipo_comprobante",
                    "c_letra","c_sucursal"]);
                $('#modal_deduc_grilla1').jqGrid('hideCol',["n_cuota","n_pos_fiscal",
                    "d_constancia","n_hecho","i_base_imponible","p_coeficiente",
                    "n_cbu","c_tipo_cuenta","c_tipo_moneda"]);
                break;
            case ("ADU"):
                $('#modal_deduc_grilla1').jqGrid('showCol',["n_cuit_ag","d_denominacion_ag",
                    "f_fecha", "n_importe","n_comprobante"]);
                $('#modal_deduc_grilla1').jqGrid('hideCol',["n_cuota","n_pos_fiscal",
                    "d_constancia","n_hecho","i_base_imponible","p_coeficiente","c_tipo_comprobante",
                    "c_letra","c_sucursal", "n_cbu","c_tipo_cuenta","c_tipo_moneda"]);
                break;
        }
    }else{
        $('#modal_deduc_grilla1').jqGrid('showCol',["n_cuit_ag","d_denominacion_ag",
            "n_pos_fiscal", "n_importe", "n_cbu",
            "c_tipo_cuenta","c_tipo_moneda","f_fecha",
            "d_constancia","i_base_imponible","p_coeficiente","c_tipo_comprobante",
            "c_letra","c_sucursal","n_comprobante"]);
    }
}

function _agregar_quitar_deduccion(element,oper) {
    var params = {
        id_menu: v_id_menu,
        n_orden: 6,
        p_oper: oper
    };

    switch (oper){
        case 'C':
            params.p_n_instancia = $(element).attr('n_instancia');
            params.p_n_orden = $(element).attr('n_orden');
            params.p_id_obligacion = $(element).attr('id_obligacion');
            params.p_n_deduccion = $(element).attr('n_deduccion');
            break;
        case 'CT':
            params.p_n_instancia = v_n_instancia;
            params.p_n_orden = v_n_orden;
            params.p_id_obligacion = v_id_obligacion;
            break;
        case 'A':
            params.p_n_instancia = v_n_instancia;
            params.p_n_orden = v_n_orden;
            params.p_id_obligacion = v_id_obligacion;
            params.p_c_tipo_deduccion = $('#origen_modal').val();
            params.p_n_anio = $('#alta_deduc_anio').val();
            params.p_n_mes = $('#alta_deduc_mes').val();
            params.p_id_contrib_ag = $('#alta_deduc_id_contrib').val();
            params.p_n_cuit_ag = limpia_cuit($('#alta_deduc_cuit').val());
            params.p_d_denominacion_ag = $('#alta_deduc_denominacion').val();
            params.p_n_posicion_fiscal = $('#alta_deduc_pfisc').val();
            params.p_n_cbu = $('#alta_deduc_cbu').val();
            params.p_c_tipo_cuenta = $('#alta_deduc_tcuenta').val();
            params.p_c_tipo_moneda = $('#alta_deduc_tmoneda').val();
            params.p_n_importe = $('#alta_deduc_impor').val();
            params.p_f_fecha = $('#alta_deduc_fecha').val();
            params.p_n_comprobante = $('#alta_deduc_ncomp').val();
            params.p_c_tipo_comprobante = $('#alta_deduc_tcomp').val();
            params.p_c_letra = $('#alta_deduc_letra').val();
            params.p_c_sucursal = $('#alta_deduc_sucursal').val();
            params.p_d_constancia = $('#alta_deduc_dcomp').val();
            break;
        case 'B':
            params.p_n_instancia = v_n_instancia;
            params.p_n_orden = v_n_orden;
            params.p_id_obligacion = v_id_obligacion;
            params.p_n_deduccion = element;
            params.p_c_tipo_deduccion = $('#origen_modal').val();
            break;
        case 'BT':
            params.p_n_instancia = v_n_instancia;
            params.p_n_orden = v_n_orden;
            params.p_id_obligacion = v_id_obligacion;
            params.p_c_tipo_deduccion = $('#origen_modal').val();
            break;
        case 'M':
            params.p_n_instancia = v_n_instancia;
            params.p_n_orden = v_n_orden;
            params.p_id_obligacion = v_id_obligacion;
            params.p_n_deduccion = $('#alta_deduc_ndeduc').val();
            params.p_c_tipo_deduccion = $('#origen_modal').val();
            params.p_n_anio = $('#alta_deduc_anio').val();
            params.p_n_mes = $('#alta_deduc_mes').val();
            params.p_n_posicion_fiscal = $('#alta_deduc_pfisc').val();
            params.p_n_cbu = $('#alta_deduc_cbu').val();
            params.p_c_tipo_cuenta = $('#alta_deduc_tcuenta').val();
            params.p_c_tipo_moneda = $('#alta_deduc_tmoneda').val();
            params.p_n_importe = $('#alta_deduc_impor').val();
            params.p_f_fecha = $('#alta_deduc_fecha').val();
            params.p_n_comprobante = $('#alta_deduc_ncomp').val();
            params.p_c_tipo_comprobante = $('#alta_deduc_tcomp').val();
            params.p_c_letra = $('#alta_deduc_letra').val();
            params.p_c_sucursal = $('#alta_deduc_sucursal').val();
            params.p_d_constancia = $('#alta_deduc_dcomp').val();
            break;
    }

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                if (oper == 'C' || oper == 'CT'){
                    $('#modal_deduc_grilla1').trigger('reloadGrid');
                }
                if ($('#origen_modal').val() == 'RET'){
                    setea_parametros('#ret_iibb_grilla2',{':p_n_instancia':v_n_instancia,':p_n_orden':v_n_orden,':p_id_obligacion':v_id_obligacion});
                } else if ($('#origen_modal').val() == 'REC'){
                    setea_parametros('#ret_banc_grilla2',{':p_n_instancia':v_n_instancia,':p_n_orden':v_n_orden,':p_id_obligacion':v_id_obligacion});
                } else if ($('#origen_modal').val() == 'PER'){
                    setea_parametros('#percep_grilla2',{':p_n_instancia':v_n_instancia,':p_n_orden':v_n_orden,':p_id_obligacion':v_id_obligacion});
                } else if ($('#origen_modal').val() == 'ADU'){
                    setea_parametros('#percep_aduana_grilla2',{':p_n_instancia':v_n_instancia,':p_n_orden':v_n_orden,':p_id_obligacion':v_id_obligacion});
                }
                $('#modal_alta_deduc').modal('hide');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function _get_datos(n_instancia,n_orden,id_obligacion) {
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "carga_inspec_iibb_oblig/php/funciones.php",
        type:"POST",
        data:{  p_oper:'getDatos',p_n_instancia: n_instancia, p_n_orden: n_orden, p_id_obligacion: id_obligacion},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res.resultado == 'OK') {
                /*POSICION FISCAL*/

                /*$('#pos_fiscal_actual').val(res.n_posicion_fiscal * 100 + res.n_cuota_anticipo);*/
                if (res.obl_ant) {
                    $('#obl_anterior').val(res.obl_ant);
                    $('#ant_pos').removeClass('disabled');
                } else {
                    $('#obl_anterior').val(null);
                    $('#ant_pos').addClass('disabled');
                }

                if (res.obl_sig) {
                    $('#obl_siguiente').val(res.obl_sig);
                    $('#sig_pos').removeClass('disabled');
                } else {
                    $('#obl_siguiente').val(null);
                    $('#sig_pos').addClass('disabled');
                }

                //$('#pos_fiscal_obl').val(parse(res.n_posicion_fiscal.substring(0, 4)) * 100 + parse(res.n_cuota_anticipo));
                v_anio = parse(res.n_posicion_fiscal.substring(0, 4));
                v_mes = parse(res.n_cuota_anticipo);
                v_pos_fiscal = v_anio * 100 +v_mes;

                $('#pos_fiscal_obl').text(res.pos_fiscal);

                /*REGIMEN DECLARADO*/
                $('#regimen_decl').val(res.c_regimen_decla);
                $('#tipo_act_decl').val(res.c_tipo_actividad_decla);
                $('#categoria_decl').val(res.c_categoria_decla);
                $('#impuesto_decl').val(res.i_impuesto_decla_mono);

                /*REGIMEN VERIFICADO*/
                $('#regimen_verif, #original_regimen_verif').val(res.c_regimen_verif);
                $('#tipo_act_verif, #original_tipo_act_verif').val(res.c_tipo_actividad_verif);
                get_options_tipo_act(res.c_tipo_actividad_verif, res.c_categoria_verif);

                $('#categoria_verif, #original_categoria_verif').val(res.c_categoria_verif);
                $('#impuesto_verif').val(res.i_impuesto_verif_mono);

                /*SEMAFORO*/
                if (res.m_pago_prov == 'S') {
                    $('#semaforo_pago_prov').removeClass('bt_g');
                    $('#semaforo_pago_prov').addClass('bt_y');
                }

                if (res.m_jcq == 'S' && res.m_pfp_vigente == 'S') {
                    $('#semaforo_jcq').removeClass('bt_g');
                    $('#semaforo_jcq').addClass('bt_y');
                }

                /*DECLARADOS*/
                $('#i_retenciones_banc_decl').val(res.i_ret_banc_decl);
                $('#i_retenciones_decl').val(res.i_ret_decl);
                $('#i_percepciones_decl').val(res.i_per_decl);
                $('#i_percepciones_ad_decl').val(res.i_per_adu_decl);
                $('#i_saldo_favor_decl').val(res.i_saldo_favor_decl);
                $('#i_pagos_decl').val(res.i_pagos_decl);
                $('#i_otros_cred_decl').val(res.i_otros_cred_decl);
                $('#i_otros_deb_decl').val(res.i_otros_deb_decl);
                $('#i_bonif_decl').val(res.i_bonif_decl);

                /*VERIFICADOS*/
                $('#i_retenciones_banc_verif').val(res.i_ret_banc_verif);
                $('#i_retenciones_verif').val(res.i_ret_verif);
                $('#i_percepciones_verif').val(res.i_per_verif);
                $('#i_percepciones_ad_verif').val(res.i_per_adu_verif);
                $('#i_saldo_favor_verif, #i_saldo_favor_verif_orig').val(res.i_saldo_favor_verif);
                $('#i_cred_ant_verif').val(res.i_cred_ant_verif);
                $('#i_otros_cred_verif, #i_otros_cred_verif_orig').val(res.i_otros_cred_verif);
                $('#i_otros_deb_verif, #i_otros_deb_verif_orig').val(res.i_otros_deb_verif);
                $('#i_bonif_verif, #i_bonif_verif_orig').val(res.i_bonif_verif);
                $('#i_ajus_min_verif, #i_ajus_min_verif_orig').val(res.i_ajuste_min_verif);
                $('#i_cred_post_verif').val(res.i_cred_post_verif);
                $('#i_intereses_verif').val(res.i_intereses_verif);

                verif_anul_saf_first_obl(res);

                /*MARCA TRASLADAR SALDO*/
                if (res.m_traslado_saf == 'S'){
                    $('#check_trasladar').prop('checked',true);
                } else {
                    $('#check_trasladar').prop('checked',false);
                }

                if (modo == 'CON' || modo_obl =='CON'){
                    modo_consulta();
                } else {
                    modo_consulta(false);
                    //Si es directo, se bloquea el campo de otros créditos.
                    if (res.c_tributo =='10'){
                        $('#i_otros_cred_verif').attr('disabled',true);
                    }
                }

                //Lógica de Régimen Simplificado
                if (
                        res.c_regimen_decla == 'S'
                     && res.c_tributo == '10'
                     //&& (parse(res.n_posicion_fiscal) + parse(res.n_cuota_anticipo) < 201910)
                     && modo != 'CON'
                     && modo_obl !='CON'
                ) {
                    $('#regimen_verif, #tipo_act_verif , #categoria_verif').attr('disabled', false);
                    $('#btn_act_reg_verif').show();
                }
                else if (
                       res.c_regimen_decla == 'G'
                    && res.c_tributo == '10'
                    && modo != 'CON'
                    && modo_obl !='CON'
                ){
                    $('#tipo_act_verif , #categoria_verif').attr('disabled', false);
                    $('#regimen_verif').attr('disabled',true);
                    $('#btn_act_reg_verif').show();
                }
                else{
                    $('#regimen_verif ,#tipo_act_verif , #categoria_verif').attr('disabled',true);
                    $('#btn_act_reg_verif').hide();
                }


                /*SALDO CONTR. / SALDO ART*/
                if (parse(res.i_saldo_f_fisca) < 0){
                    $('#i_saldo_contrib').val(res.i_saldo_f_fisca.replace('-',''));
                    $('#i_saldo_art').val('0,00');
                }else if (parse(res.i_saldo_f_fisca) > 0){
                    $('#i_saldo_art').val(res.i_saldo_f_fisca.replace('-',''));
                    $('#i_saldo_contrib').val('0,00')
                }else {
                    $('#i_saldo_contrib, #i_saldo_art').val(res.i_saldo_f_fisca.replace('-',''));
                }

                /*Valores ABM Actividad*/
                $('#id_contribuyente').val(res.id_contribuyente);
                $('#c_tributo').val(res.c_tributo);
                $('#posicion_fiscal').val((parse(res.n_posicion_fiscal) + parse(res.n_cuota_anticipo)));
                console.log('get_datos');
                console.log(res.d_objeto_hecho);
                console.log(res.c_tributo);
                console.log(res.id_obligacion);


                $('#modal_hecho').val(res.d_objeto_hecho);

                v_id_obligacion = res.id_obligacion;
                setea_parametros('#actividades_grid',{':p_n_instancia':v_n_instancia,':p_n_orden':v_n_orden,':p_id_obligacion':v_id_obligacion});

                check_ded_saf_rs();
            }else{
                mostrar_error('No se han encontrado datos asociados');
            }

            $('#regimen_verif, #tipo_act_verif, #categoria_verif').selectpicker('refresh');
        }
    });

    $.ajax({
        url: "carga_inspec_iibb_oblig/php/funciones.php",
        type:"POST",
        async:true,
        data:{  p_oper:'getDeduccionesRSAnual',
            p_id_obligacion: v_id_obligacion},
        success: function(response)
        {
            res = JSON.parse(response);
            if (res.resultado === 'NDJ'){
                $('#msj_dj_anual_rs').hide();
            }else{
                $('#msj_dj_anual_rs').show();

                $('#i_ret_ded_anual_rs').html('');
                $('#i_ret_ded_anual_rs').append(redondear(res.i_retencion,2));

                $('#i_per_ded_anual_rs').html('');
                $('#i_per_ded_anual_rs').append(redondear(res.i_percepcion,2))
            }
        }
    });
}

function editableRow(rowSelected,grid){
    if(rowSelected !== lastSel && lastSel !== undefined){
        let prevRow = lastSel;
        let isEditing;

        /*Solo en el caso de que no haya apretado enter y quiera editar la grilla siguiente se deberia guardar ya que tiene acceso a los datos en los inputs */
        if (grid == 'actividades_grid'){
            isEditing = $('#actividades_grid tr').find('input#'+ prevRow +'_i_bi_verificada').val();
        }else{
            isEditing = $('#inf_adicional_grid tr').find('input#'+ prevRow +'_d_valor').val();
        }

        if(isEditing && grid == 'actividades_grid')
        {
            guardarActividades(prevRow)
                .then((res)=>{
                    $('#actividades_grid').saveRow(prevRow);
                    /*SALDO CONTR. / SALDO ART*/
                    let saldo = res.p_saldo_fisca;
                    let total_bonif = res.p_i_total_bonif_verif;

                    if (parse(saldo) < 0){
                        $('#i_saldo_contrib').val(formatear_numero(Math.abs(saldo),2));
                        $('#i_saldo_art').val('0,00');
                    }else if (parse(saldo) > 0){
                        $('#i_saldo_art').val(formatear_numero(Math.abs(saldo),2));
                        $('#i_saldo_contrib').val('0,00')
                    }else {
                        $('#i_saldo_contrib, #i_saldo_art').val(formatear_numero(Math.abs(saldo),2));
                    }
                    $('#i_bonif_verif').val(formatear_numero(total_bonif,2));
                })
                .catch((err)=>{
                    mostrar_cuadro('I', 'No se ha podido guardar los cambios', `Ocurrió un error guardando la actividad, vuelva a intentarlo. detalle del error: ${err}`);
                });

        }else if(isEditing && grid == 'inf_adicional_grid'){
            guardarInfAdicional(prevRow)
                .then((res) => {
                    $('#inf_adicional_grid').saveRow(prevRow);
                })
                .catch((err) => {
                    mostrar_cuadro('E', 'Error', err);
                });
        }
    }

    //siempre se elige la seleccionada
    $('#'+grid).jqGrid('editRow', rowSelected, {
        keys: true,
        oneditfunc: function(row) {
            lastSel = row;
            _attachEventos(row,grid);
            return;
        },
    });
}

function _attachEventos(rowSelected,grid){
    if (grid == 'actividades_grid') {
        let imputs = Array.from($(`#actividades_grid tr#${rowSelected}`).find(':input'));

        imputs.forEach((input, idx, arr) => {
            if (!$(input).hasClass("ya_tiene_mascara_enter")) {
                $(input).addClass("ya_tiene_mascara_enter");

                $(input).keydown(function (e) {
                    if (e.which === 13) {

                        guardarActividades(rowSelected)
                            .then((res) => {
                                $('#actividades_grid').trigger("reloadGrid");
                                /*SALDO CONTR. / SALDO ART*/
                                let saldo = res.p_saldo_fisca;
                                let total_bonif = res.p_i_total_bonif_verif;

                                if (parse(saldo) < 0) {
                                    $('#i_saldo_contrib').val(formatear_numero(Math.abs(saldo),2));
                                    $('#i_saldo_art').val('0,00');
                                } else if (parse(saldo) > 0) {
                                    $('#i_saldo_art').val(formatear_numero(Math.abs(saldo),2));
                                    $('#i_saldo_contrib').val('0,00')
                                } else {
                                    $('#i_saldo_contrib, #i_saldo_art').val(formatear_numero(Math.abs(saldo),2));
                                }
                                $('#i_bonif_verif').val(formatear_numero(total_bonif, 2));
                            })
                            .catch((err) => {
                                mostrar_cuadro('E', 'Error', err);
                                $('#actividades_grid').jqGrid("restoreRow", rowSelected);
                            });
                    }
                });

                $(input).keyup(function () {
                    //si es el último campo no recalculo nada
                    var input_editable = $(this).attr('id').includes("i_impuesto_verificado");

                    if (!input_editable) {
                        _calcular_importe_actividades(rowSelected);
                    }

                });

                $(input).blur(function () {
                    if ($(this).val() === '0')
                        $(this).val('0,00');
                });

            }

        });
    }else if (grid == 'inf_adicional_grid'){
        let imputs = Array.from($(`#inf_adicional_grid tr#${rowSelected}`).find(':input'));

        imputs.forEach((input, idx, arr) => {
            if (!$(input).hasClass("ya_tiene_mascara_enter")) {
                $(input).addClass("ya_tiene_mascara_enter");

                $(input).keydown(function (e) {
                    if (e.which === 13) {

                        guardarInfAdicional(rowSelected)
                            .then((res) => {
                                $('#inf_adicional_grid').trigger("reloadGrid");
                            })
                            .catch((err) => {
                                mostrar_cuadro('E', 'Error', err);
                                $('#inf_adicional_grid').trigger("reloadGrid");
                            });
                    }
                });

                $(input).blur(function () {
                    if ($(this).val() === '0')
                        $(this).val('0,00');
                });
            }
        });
    }
}

function _calcular_importe_actividades(rowSelected){
    if (!$('#actividades_grid tr').find('input#'+rowSelected +'_i_bi_verificada').val() ||
        !$('#actividades_grid tr').find('input#'+rowSelected+'_aj_bi_verificada').val() ||
        !$('#actividades_grid tr').find('input#'+rowSelected+'_p_bonif_verificada').val() ||
        !$('#actividades_grid tr').find('input#'+rowSelected+'_i_bonificado').val() ||
        !$('#actividades_grid tr').find('input#'+rowSelected+'_p_alicuota_verificada').val()){
        return;
    }

    let p_i_bi_verificada       =   $('#actividades_grid tr').find('input#'+rowSelected +'_i_bi_verificada').val();
    let p_aj_bi_verificada      =   $('#actividades_grid tr').find('input#'+rowSelected+'_aj_bi_verificada').val();

    p_i_bi_verificada         = parse(p_i_bi_verificada);
    p_aj_bi_verificada        = parse(p_aj_bi_verificada);

    //calculo BI Aj. Verificada
    let v_bi_aj_verificada = p_i_bi_verificada + p_aj_bi_verificada;

    // se carga el base imponible verificada
    $('#actividades_grid ').setCell(rowSelected,'bi_aj_verificada',redondear(v_bi_aj_verificada,2));

    let p_bi_aj_verificada      =   $('#actividades_grid').getCell(rowSelected,'bi_aj_verificada');
    let p_p_bonif_verificada         =   $('#actividades_grid tr').find('input#'+rowSelected+'_p_bonif_verificada').val();
    let p_p_alicuota_verificada       =   $('#actividades_grid tr').find('input#'+rowSelected+'_p_alicuota_verificada').val();

    p_bi_aj_verificada        = parse(p_bi_aj_verificada);
    p_p_alicuota_verificada   = parse(p_p_alicuota_verificada);
    p_p_bonif_verificada      = parse(p_p_bonif_verificada);

    //calculo Monto Bonif. Verificada
    let v_i_bonificado = (p_bi_aj_verificada * p_p_alicuota_verificada / 100) * p_p_bonif_verificada / 100;

    if(v_i_bonificado < 0){
        v_i_bonificado = 0;
    }

    if (p_p_bonif_verificada > 0 || document.activeElement.id === rowSelected+'_p_bonif_verificada' ){
        $('#actividades_grid tr').find('input#'+rowSelected+'_i_bonificado').val(redondear(v_i_bonificado,2));
    }

    // calculo Impuesto Verificado
    let v_i_impuesto_verificado = v_bi_aj_verificada * p_p_alicuota_verificada / 100 ;
    // se carga el impuesto verificado
    $('#actividades_grid ').setCell(rowSelected,'i_impuesto_verificado',redondear(v_i_impuesto_verificado,2));
}

function guardarActividades(rowSelected){
    return new Promise(function(resolve, reject){
        var params = {
            id_menu: v_id_menu,
            n_orden: 0,
            p_n_instancia: v_n_instancia,
            p_n_orden: v_n_orden,
            p_id_obligacion: v_id_obligacion
        };

        params.p_id_tmp_f13_detalle        =   $('#actividades_grid').getCell(rowSelected,'id_tmp_ff13');
        params.p_c_actividad         =   $('#actividades_grid').getCell(rowSelected,'c_actividad');
        params.p_i_base_imponible_verif       =   $('#actividades_grid tr').find('input#'+rowSelected +'_i_bi_verificada').val();
        params.p_i_ajuste_base_verif      =   $('#actividades_grid tr').find('input#'+rowSelected+'_aj_bi_verificada').val();
        params.p_alicuota_verif       =   $('#actividades_grid tr').find('input#'+rowSelected+'_p_alicuota_verificada').val();
        params.p_bonificacion_verif         =   $('#actividades_grid tr').find('input#'+rowSelected+'_p_bonif_verificada').val();
        params.i_bonificacion_verif         =   $('#actividades_grid tr').find('input#'+rowSelected+'_i_bonificado').val();

        /* Se controla que no se ingresen valores nullos or undifined */
        if(  !params.p_i_base_imponible_verif){
            mostrar_cuadro('I', 'Valores Inválidos', 'Por favor ingrese un valor en Base Imponible Verificada.');

            $('#actividades_grid').jqGrid("restoreRow", rowSelected );

            return false;
        }
        if(   !params.p_i_ajuste_base_verif){
            mostrar_cuadro('I', 'Valores Inválidos', 'Por favor ingrese un valor en Ajuste Base Verificada.');
            $('#actividades_grid').jqGrid("restoreRow", rowSelected );
            return false;
        }

        if(   !params.p_alicuota_verif){
            mostrar_cuadro('I', 'Valores Inválidos', 'Por favor ingrese un valor en Alícuota Verificada.');
            $('#actividades_grid').jqGrid("restoreRow", rowSelected );
            return false;
        }

        if(   !params.p_bonificacion_verif){
            mostrar_cuadro('I', 'Valores Inválidos', 'Por favor ingrese un valor en Bonificación Verificada.');
            $('#actividades_grid').jqGrid("restoreRow", rowSelected );
            return false;
        }

        if(   !params.i_bonificacion_verif){
            mostrar_cuadro('I', 'Valores Inválidos', 'Por favor ingrese un valor en Total de Bonificación Verificada.');
            $('#actividades_grid').jqGrid("restoreRow", rowSelected );
            return false;
        }

        /* Se controla que no se ingresen valores negativos */
        if(   // parseInt(params.p_i_base_imponible_verif)   < 0
            //|| parseInt(params.p_i_ajuste_base_verif)      < 0
               parseInt(params.p_alicuota_verif)         < 0
            || parseInt(params.p_bonificacion_verif)      < 0
            //|| parseInt(params.i_bonificacion_verif)      < 0
        )
        {
            mostrar_cuadro('E', 'Valores Inválidos', 'Ha ingresado valores negativos, vuelva a editar la actividad.');
            $('#actividades_grid').jqGrid("restoreRow", rowSelected );
            return false;
        }

        /*Se controla que no se ingresen números demasiado altos*/
        if(parse(params.p_i_base_imponible_verif) > 999999999999999){
            mostrar_cuadro('E', 'Valores Inválidos', 'Ha ingresado un valor inválido en Base Imponible Verificada.');
            $('#actividades_grid').jqGrid("restoreRow", rowSelected );
            return false;
        }

        if(parse(params.p_i_ajuste_base_verif) > 999999999999999){
            mostrar_cuadro('E', 'Valores Inválidos', 'Ha ingresado un valor inválido en Ajuste Base Verificada.');
            $('#actividades_grid').jqGrid("restoreRow", rowSelected );
            return false;
        }

        /*Se controla que no se ingrese valor mayor a 100 campos de porcentajes*/
        if( parse(params.p_alicuota_verif) > 100)
        {
            mostrar_cuadro('E', 'Valores Inválidos', 'Ha ingresado un valor mayor a 100 en Alícuota Verificada.');
            $('#actividades_grid').jqGrid("restoreRow", rowSelected );
            return false;
        }

        if( parse(params.p_bonificacion_verif) > 100)
        {
            mostrar_cuadro('E', 'Valores Inválidos', 'Ha ingresado un valor mayor a 100 en Bonificación Verificada.');
            $('#actividades_grid').jqGrid("restoreRow", rowSelected );
            return false;
        }

        if(parse(params.i_bonificacion_verif) > 999999999999999){
            mostrar_cuadro('E', 'Valores Inválidos', 'Ha ingresado un valor inválido en Importe de Bonificación.');
            $('#actividades_grid').jqGrid("restoreRow", rowSelected );
            return false;
        }

        $('#main').procOverlay({ visible:true});

        $.ajax({
            url: FUNCIONES_BASEPATH + "maestro_abm.php",
            type:"POST",
            data: params,
            dataType: 'json',
            success: function(response)
            {
                $('#main').procOverlay({ visible:false});
                if( response.resultado == "OK"){
                    resolve(response);
                }else{
                    reject(response.resultado);
                }
            }
        });
    });

}

function guardarInfAdicional(rowSelected){
    return new Promise(function(resolve, reject){
        var params = {
            id_menu: v_id_menu,
            n_orden: 9,
            p_n_instancia: v_n_instancia,
            p_n_orden: v_n_orden,
            p_id_obligacion: v_id_obligacion,
            p_c_renglon: $('#inf_adicional_grid').getCell(rowSelected,'c_renglon')
        };

        params.p_d_valor        =   $('#inf_adicional_grid tr').find('input#'+rowSelected +'_d_valor').val();

        /* Se controla que no se ingresen valores nullos or undifined */
        if(  !params.p_d_valor){
            mostrar_cuadro('I', 'Valor Inválido', 'El campo Valor es obligatorio.');

            $('#inf_adicional_grid').jqGrid("restoreRow", rowSelected );

            return false;
        }

        /* Se controla que no se ingresen valores negativos */
        if(parseInt(params.p_d_valor) < 0)
        {
            mostrar_cuadro('E', 'Valores Inválidos', 'No es posible ingresar valores negativos.');
            $('#inf_adicional_grid').jqGrid("restoreRow", rowSelected );
            return false;
        }

        $('#main').procOverlay({ visible:true});

        $.ajax({
            url: FUNCIONES_BASEPATH + "maestro_abm.php",
            type:"POST",
            data: params,
            dataType: 'json',
            success: function(response)
            {
                $('#main').procOverlay({ visible:false});
                if( response.resultado == "OK"){
                    resolve(response);
                }else{
                    $('#inf_adicional_grid').jqGrid("restoreRow", rowSelected);
                    reject(response.resultado);
                }
            }
        });
    });
}

function abmActividad(oper,c_actividad,id_tmp_ff13, c_trat_fiscal, c_art_fiscal,c_tipo_unidad, n_unidad_fija){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_n_instancia":v_n_instancia,
            "p_n_orden":v_n_orden,
            "p_id_obligacion":v_id_obligacion,
            "p_c_actividad":c_actividad,
            "p_c_trat_fiscal":c_trat_fiscal,
            "p_c_articulo":c_art_fiscal,
            "p_oper":oper,
            "p_id_tmp_ff13":id_tmp_ff13,
            "id_menu":10773,
            "n_orden":1,
            "p_c_tipo_unidad":c_tipo_unidad,
            "p_n_unidades":n_unidad_fija
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                if (oper == 'add'){
                    mostrar_mensaje_modal('S','Agregar Actividad','La actividad ha sido agregada con éxito.');
                    $('#modal_abm_actividad').modal('hide');
                }else {
                    mostrar_mensaje_modal('S','Eliminar Actividad','La actividad ha sido eliminada con éxito.');
                }
                $('#actividades_grid').trigger('reloadGrid');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function _get_total_deducciones(p_c_tipo_deduccion) {

    $.ajax({
        url: "carga_inspec_iibb_oblig/php/funciones.php",
        type:"POST",
        async:false,
        data:{  p_oper:'getTotalDed',
                p_n_instancia: v_n_instancia,
                p_n_orden: v_n_orden,
                p_id_obligacion: v_id_obligacion,
                p_c_tipo_deduccion: p_c_tipo_deduccion},
        success: function(response)
        {
            res = JSON.parse(response);
            if (res.resultado == 'OK'){
                total = res.i_total_deduccion;
            }else{
                mostrar_error('No se han encontrado datos asociados.');
                total = 0;
            }

        }
    });
    return total;
}

function _get_datosVerif(n_instancia,n_orden,id_obligacion) {
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "carga_inspec_iibb_oblig/php/funciones.php",
        type:"POST",
        data:{  p_oper:'getDatosVerif',p_n_instancia: n_instancia, p_n_orden: n_orden, p_id_obligacion: id_obligacion},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res.resultado == 'OK'){
                /*REGIMEN VERIFICADO*/
                $('#regimen_verif, #original_regimen_verif').val(res.c_regimen_verif);
                $('#tipo_act_verif, #original_tipo_act_verif').val(res.c_tipo_actividad_verif);
                $('#categoria_verif, #original_categoria_verif').val(res.c_categoria_verif);
                $('#regimen_verif, #tipo_act_verif, #categoria_verif').selectpicker('refresh');
                $('#impuesto_verif').val(res.i_impuesto_verif_mono);

                /*VERIFICADOS*/
                $('#i_retenciones_banc_verif').val(res.i_ret_banc_verif);
                $('#i_retenciones_verif').val(res.i_ret_verif);
                $('#i_percepciones_verif').val(res.i_per_verif);
                $('#i_percepciones_ad_verif').val(res.i_per_adu_verif);
                $('#i_saldo_favor_verif, #i_saldo_favor_verif_orig').val(res.i_saldo_favor_verif);
                $('#i_cred_ant_verif').val(res.i_cred_ant_verif);
                $('#i_otros_cred_verif, #i_otros_cred_verif_orig').val(res.i_otros_cred_verif);
                $('#i_otros_deb_verif, #i_otros_deb_verif_orig').val(res.i_otros_deb_verif);
                $('#i_bonif_verif, #i_bonif_verif_orig').val(res.i_bonif_verif);
                $('#i_ajus_min_verif, #i_ajus_min_verif_orig').val(res.i_ajuste_min_verif);
                $('#i_cred_post_verif').val(res.i_cred_post_verif);
                $('#i_intereses_verif').val(res.i_intereses_verif);

                /*SALDO CONTR. / SALDO ART*/
                if (parse(res.i_saldo_f_fisca) < 0){
                    $('#i_saldo_contrib').val(res.i_saldo_f_fisca.replace('-',''));
                    $('#i_saldo_art').val('0,00');
                }else if (parse(res.i_saldo_f_fisca) > 0){
                    $('#i_saldo_art').val(res.i_saldo_f_fisca.replace('-',''));
                    $('#i_saldo_contrib').val('0,00')
                }else {
                    $('#i_saldo_contrib, #i_saldo_art').val(res.i_saldo_f_fisca.replace('-',''));
                }

                verif_anul_saf_first_obl(res);

            }else{
                mostrar_error('No se han encontrado datos asociados.');
            }

            //Verificamos si es RG
            check_ded_saf_rs();
        }
    });
}

function verif_anul_saf_first_obl(res){
    /*alert(v_id_obligacion);*/
    //alert(JSON.stringify(res));

    if (v_id_obligacion == res.first_obl && res.anul_saf>0 && res.i_saldo_favor_verif === $('#i_saldo_favor_decl').val()){
        $('#i_saldo_favor_verif').attr({"data-toggle":"tooltip", "title":"SAF Anulado en Primera Posición"});
        $('#i_saldo_favor_verif').css('color','red');
        $("#i_saldo_favor_verif").tooltip();
    }else {
        $('#i_saldo_favor_verif').css('color','black');
        $("#i_saldo_favor_verif").tooltip( "destroy" );
    }
}

function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#alta_deduc_cuit').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "carga_inspec_iibb_oblig/php/autocomplete.php",
        type:"POST",
        data:{  p_oper:'getContribuyente',p_filtro: cuit_sin_guiones},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res){
                $("#alta_deduc_denominacion").val(res['DENOMINACION']);
                $("#alta_deduc_id_contrib").val(res['ID_CONTRIBUYENTE']);
            }else{
                $("#alta_deduc_denominacion").val(null);
                $("#alta_deduc_id_contrib").val(null);
            }
        }
    });

}

function sumCol(grid,col){
    return formatear_numero($("#"+grid).jqGrid('getCol', col, false).reduce( (a,b) => a + parse(b), 0),2);
 }

function bloquear_calendar_alta_deducciones () {
    if ( $('#alta_deduc_mes').val() != '' && $('#alta_deduc_anio').val() != '' ) {
        var firstDay = new Date($('#alta_deduc_anio').val(), $('#alta_deduc_mes').val()-1, 1);
        var lastDay = new Date($('#alta_deduc_anio').val(), $('#alta_deduc_mes').val(), 0);

        $('#alta_deduc_fecha').datepicker('option', 'minDate',firstDay);
        $('#alta_deduc_fecha').datepicker('option', 'maxDate',lastDay);
        $('#alta_deduc_fecha').attr('disabled',false);
    }else{
        var lastDay = new Date($('#pos_fiscal_obl').val().substr(0,4), $('#pos_fiscal_obl').val().substr(4,2), 0);

        $('#alta_deduc_fecha').datepicker('option', 'minDate',null);
        $('#alta_deduc_fecha').datepicker('option', 'maxDate',lastDay);
        $('#alta_deduc_fecha').attr('disabled',true);
    }
}

function check_pos_fiscal_ded (element){
    if( $('#alta_deduc_anio').val() != '' && $('#alta_deduc_mes').val() != ''){
        let pos_fiscal_ded = parse($('#alta_deduc_anio').val()) * 100 + parse($('#alta_deduc_mes').val());
        if (pos_fiscal_ded > v_pos_fiscal) {
            toastr["error"]("La combinación de año y mes no puede ser superior a la posición fiscal actual.", "Año y Mes de la deducción");
            $(element).val(null);
        }
    }

    if ($('#alta_deduc_pfisc').val() != '' && $('#alta_deduc_anio').val() != '' && $('#alta_deduc_mes').val() != ''){
        if (parse($('#alta_deduc_pfisc').val()) != (parse($('#alta_deduc_anio').val()) * 100 + parse($('#alta_deduc_mes').val()))) {
            toastr["warning"]("La posición fiscal no coincide con el año y mes ingresado.", "Pos Fiscal de la deducción");
        }
    }
}

function check_ded_saf_rs(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_n_instancia":v_n_instancia,
            "p_n_orden":v_n_orden,
            "p_id_obligacion":v_id_obligacion,
            "id_menu":v_id_menu,
            "n_orden":10
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
               null;
            }
            else{
                toastr["warning"](data.resultado);
            }
        }
    });

}

function get_options_tipo_act(p_c_act_verif, p_c_categoria){
    $.ajax({
        url: "carga_inspec_iibb_oblig/php/funciones.php",
        type:"POST",
        async:true,
        data:{  p_oper:'getTiposActividad',
                p_id_obligacion: v_id_obligacion,
                p_c_regimen_verif: $('#regimen_verif').val()
        },
        success: function(response)
        {
            var myselect = document.getElementById('tipo_act_verif');
            res = JSON.parse(response);

            $('#tipo_act_verif').empty();

            /* Insert the new ones from the array above */
            for (var key in res.tiposActividades)
            {
                var opt = document.createElement('option');
                opt.text = res.tiposActividades[key]['D_DATO'];
                opt.value = res.tiposActividades[key]['C_TIPO_ACTIVIDAD'];
                myselect.add(opt, null);
            }

            $('#tipo_act_verif').selectpicker('refresh');
            $('#tipo_act_verif').val(p_c_act_verif);
            $('#tipo_act_verif').selectpicker('refresh');

            get_categorias(p_c_categoria);
        }
    });


}

function get_categorias(p_categoria){
    $.ajax({
        url: "carga_inspec_iibb_oblig/php/funciones.php",
        type:"POST",
        async:true,
        data:{  p_oper:'getCategorias',
            p_id_obligacion: v_id_obligacion,
            p_c_regimen_verif: $('#regimen_verif').val(),
            p_c_tipo_actividad: $('#tipo_act_verif').val()
        },
        success: function(response)
        {
            var myselect = document.getElementById('categoria_verif');
            res = JSON.parse(response);

            $('#categoria_verif').empty();

            /* Insert the new ones from the array above */
            for (var key in res.categorias)
            {
                var opt = document.createElement('option');
                opt.text = res.categorias[key]['C_CATEGORIA'];
                opt.value = res.categorias[key]['C_CATEGORIA'];
                myselect.add(opt, null);
            }

            $('#categoria_verif').selectpicker('refresh');
            $('#categoria_verif').val(p_categoria);
            $('#categoria_verif').selectpicker('refresh');
        }
    });
}