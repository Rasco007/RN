function obtener_constantes(){
    $.ajax({                     
        url: "modif_ing_pagos_pendientes/php/funciones.php",                     
        type:"POST",                     
        dataType: "JSON",                     
        data:{p_oper : 'getConst'},                     
        success: function (res) {  
            if (res){
                g_movim = res.MOV_EXT_PAGO || "";
                g_COD_PLAN= res.COD_PLAN || "";
                g_CONCUOPLAN_INM= res.CONCUOPLAN_INM || "";
                g_CONCUOPLAN= res.CONCUOPLAN || "";
                g_concuo = res.CONCUO || "";
                g_pagcon = res.PAGCON || "";
                g_TRINMOBILIARIO= res.TRINMOBILIARIO || "";
                g_ESTCAB = res.ESTCAB_OK || "";
                g_MONEDA_DEFAULT= res.MONEDA_DEFAULT || "";
                g_archivo_inm = res.TARCH_INM || "";
                g_IB = res.COD_IBD || "";
                g_IBM = res.COD_IBCM || "";
                g_CON_DEUDA = res.CON_DEUDA || "";
                g_CONCANPLAN_INM = res.CONCANPLAN_INM || "";
                g_CON_CONCURSO = res.CON_CONCURSO || "";
                g_CON_QUIEBRA = res.CON_QUIEBRA || "";
            }
        }                 
    });
}

function validar_caracteristica(){
    $.ajax({                     
        url: "modif_ing_pagos_pendientes/php/funciones.php",                     
        type:"POST",                     
        dataType: "JSON",                     
        data:{p_oper : 'valiCaract', p_c_tipo_imponible: $('#c_tipo_imponible').val()},                     
        success: function (res) {  
            if (res){

            }else{
                $('#c_caracteristica').val("");
                $('#d_caracteristica').val("");
            }
        }                 
    });
}

function estado_banco(){
    $.ajax({                     
        url: "modif_ing_pagos_pendientes/php/funciones.php",                     
        type:"POST",                     
        dataType: "JSON",                     
        data:{p_oper : 'getEstadoBanco', p_c_medio_pago: $('#c_medio_pago').val()},                     
        success: function (res) {  
            if (res){
                if(res.ESTADO == '1'){
                    $('#c_banco_emisor').prop('disabled', false);
                    $('#n_cheque').prop('disabled', false);
                    $('#c_banco_emisor').prop('readonly', false);
                    $('#n_cheque').prop('readonly', false);
                    $('#lupa_banco_emisor').show();
                }
            }else{
                $('#c_banco_emisor').prop('disabled', true);
                $('#n_cheque').prop('disabled', true);
                $('#c_banco_emisor').prop('readonly', true);
                $('#n_cheque').prop('readonly', true);
                $('#c_banco_emisor').val("");
                $('#d_banco_emisor').val("");
                $('#n_cheque').val("");
                $('#lupa_banco_emisor').hide();
            }
        }                 
    });
}

function datos_modal(){
    $.ajax({                     
        url: "modif_ing_pagos_pendientes/php/funciones.php",                     
        type:"POST",                     
        dataType: "JSON",                     
        data:{p_oper : 'getCArchivo', p_n_remito: $('#n_remesa').val()},                     
        success: function (res) {  
            if (res){
                let c_archivo = res.C_ARCHIVO || "";
                if (c_archivo == g_archivo_inm){
                    datos_inmobiliario();
                }else{
                    datos_ib()
                }; 
            }
        }                 
    });
}

function datos_recibo_modal(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{  
            'p_c_tributo_pagos': $('#c_tributo').val(),
            'p_c_concepto_pagos': $('#c_concepto').val(),
            'p_n_posicion_fiscal_pagos': $('#pos_fiscal').val().replace("/", ""),
            'p_n_cuota_anticipo_pagos': $('#n_cuota').val(),
            'p_trinmobiliario': g_TRINMOBILIARIO,
            'p_n_recibo_pagos': $('#n_recibo').val(),
         "id_menu":v_id_menu,
         "n_orden":8
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#d_denominacion_modal').val(data.p_d_denominacion);
                $('#n_cuit_modal').val(data.p_n_cuit);
                $('#c_documento_modal').val(data.p_c_tipo_documento);
                $('#n_documento_modal').val(data.p_n_documento);
                $('#id_contribuyente_modal').val(data.p_id_contribuyente);
                $('#c_tributo_modal').val(data.p_c_tributo);
                $('#c_concepto_modal').val(data.p_c_concepto);
                $('#pos_fiscal_modal').val(data.p_n_posicion_fiscal);
                $('#n_cuota_modal').val(data.p_n_cuota_anticipo);
                $('#d_concepto_modal').val(data.p_d_concepto);
                $('#d_tributo_modal').val(data.p_d_tributo);
                $('#leyenda_cont').text(data.p_leyenda_cont);
                $('#leyenda_obl').text(data.p_leyenda_obl);

                $("#datos_obl_modal").modal('show');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function datos_inmobiliario(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{  
            'p_d_objeto_hecho': $('#d_objeto_hecho').val(),
            'p_c_tributo_pagos': $('#c_tributo').val(),
            'p_c_concepto_pagos': $('#c_concepto').val(),
            'p_n_posicion_fiscal_pagos': $('#pos_fiscal').val().replace("/", ""),
            'p_n_cuota_anticipo_pagos': $('#n_cuota').val(),
            'p_trinmobiliario': g_TRINMOBILIARIO,
            'p_n_recibo': $('#n_recibo').val(),
         "id_menu":v_id_menu,
         "n_orden":6
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#d_denominacion_modal').val(data.p_d_denominacion);
                $('#n_cuit_modal').val(data.p_n_cuit);
                $('#c_documento_modal').val(data.p_c_tipo_documento);
                $('#n_documento_modal').val(data.p_n_documento);
                $('#id_contribuyente_modal').val(data.p_id_contribuyente);
                $('#c_tributo_modal').val(data.p_c_tributo);
                $('#c_concepto_modal').val(data.p_c_concepto);
                $('#pos_fiscal_modal').val(data.p_n_posicion_fiscal);
                $('#n_cuota_modal').val(data.p_n_cuota_anticipo);
                $('#d_concepto_modal').val(data.p_d_concepto);
                $('#d_tributo_modal').val(data.p_d_tributo);
                $('#leyenda_cont').text(data.p_leyenda_cont);
                $('#leyenda_obl').text(data.p_leyenda_obl);

                $("#datos_obl_modal").modal('show');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function datos_ib(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{  
            'p_d_objeto_hecho': $('#d_objeto_hecho').val(),
            'p_c_tributo_pagos': $('#c_tributo').val(),
            'p_c_concepto_pagos': $('#c_concepto').val(),
            'p_n_posicion_fiscal_pagos': $('#pos_fiscal').val().replace("/", ""),
            'p_n_cuota_anticipo_pagos': $('#n_cuota').val(),
         "id_menu":v_id_menu,
         "n_orden":7
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#d_denominacion_modal').val(data.p_d_denominacion);
                $('#n_cuit_modal').val(data.p_n_cuit);
                $('#c_documento_modal').val(data.p_c_tipo_documento);
                $('#n_documento_modal').val(data.p_n_documento);
                $('#id_contribuyente_modal').val(data.p_id_contribuyente);
                $('#c_tributo_modal').val(data.p_c_tributo);
                $('#c_concepto_modal').val(data.p_c_concepto);
                $('#pos_fiscal_modal').val(data.p_n_posicion_fiscal);
                $('#n_cuota_modal').val(data.p_n_cuota_anticipo);
                $('#d_concepto_modal').val(data.p_d_concepto);
                $('#d_tributo_modal').val(data.p_d_tributo);
                $('#leyenda_cont').text(data.p_leyenda_cont);
                $('#leyenda_obl').text(data.p_leyenda_obl);

                setea_parametros('#plan_pagos_grid',{':p_id_contribuyente': $('#id_contribuyente_modal').val()})
                $("#datos_obl_modal").modal('show');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function buscar(){
    $.ajax({
        type:'POST',
        url: "modif_ing_pagos_pendientes/php/funciones.php",
        data:{
            p_oper : 'getPagosErroneos',
            'p_n_cuit': limpia_cuit($('#n_cuit').val()),
            'p_c_tipo_documento': $('#c_documento').val(),
            'p_n_documento': $('#n_documento').val().replace(/\./g, ''),
            'p_d_denominacion': $('#d_denominacion').val(),
            'p_c_tipo_imponible': $('#c_tipo_imponible').val(),
            'p_d_objeto_hecho': $('#d_objeto_hecho').val(),
            'p_n_recibo': $('#n_recibo').val(),
            'p_c_tributo': $('#c_tributo').val(),
            'p_c_concepto': $('#c_concepto').val(),
            'p_c_concepto_mov': $('#c_concepto_mov').val(),
            'p_n_posicion_fiscal': $('#pos_fiscal').val().replace('/', ""),
            'p_n_cuota_anticipo': $('#n_cuota').val(),
            'p_i_pagado': $('#i_pagado').val().replace(/\./g, '').replace(',', '.'),
            'p_f_pago': $('#f_pago').val(),
            'p_n_comprobante': $('#n_comprobante').val(),
            'p_c_medio_pago': $('#c_medio_pago').val(),
            'p_n_cheque': $('#n_cheque').val(),
            'p_c_banco_emisor': $('#c_banco_emisor').val(),
            'p_c_banco_receptor': $('#c_banco_rec').val(),
            'p_c_sucursal_recep': $('#c_sucursal_rec').val(),
            'p_cajero_recep': $('#caj_rec').val(),
            'p_n_cabezal': $('#n_lote').val(),
            'p_n_remito': $('#n_remesa').val(),
            'p_n_orden' : $('#n_orden').val(),
            'p_c_tipo_form': $('#c_form').val(),
            'p_n_tramite': $('#c_tramite').val(),
        },
        dataType:'JSON',
        success: function( res ) {
            if(res){
                if(res.datos.length){
                    datos_orig_pagos_erroneos = res.datos;
                    datos_modif_pagos_erroneos = JSON.parse(JSON.stringify(res.datos)); //copiar objeto
                    setear_inputs_datos(res.datos[0]);
                    if(res.datos.length > 1){
                        $('#btn_next').prop('disabled', false);
                    }
                }
            }
        }
    });
}

async function setear_inputs_datos(data){
    limpiar();
    $('#c_form').val(data.C_TIPO_FORM || "");
    $('#d_form').val(data.D_TIPO_FORM || "");
    $('#id_pago_erroneo').val(data.ID_PAGO_ERRONEO || "");
    $('#n_cuit').val(data.N_CUIT || "");
    $('#n_cuit').mask("99-99999999-9");
    $('#c_documento').val(data.C_TIPO_DOCUMENTO || "");
    $('#d_documento').val(data.D_TIPO_DOCUMENTO || "");
    $('#n_documento').val(data.N_DOCUMENTO || "");
    $('#d_denominacion').val(data.D_DENOMINACION || "");
    $('#c_tipo_imponible').val(data.C_TIPO_IMPONIBLE || "");
    $('#d_tipo_imponible').val(data.D_TIPO_IMPONIBLE || "");
    $('#d_objeto_hecho').val(data.D_OBJETO_HECHO || "");
    $('#n_recibo').val(data.N_RECIBO || "");
    $('#c_tributo').val(data.C_TRIBUTO || "");
    $('#d_tributo').val(data.D_TRIBUTO || "");
    $('#c_concepto').val(data.C_CONCEPTO || "");
    $('#d_concepto').val(data.D_CONCEPTO || "");
    $('#c_concepto_mov').val(data.C_CONCEPTO_MOV || "");
    $('#d_concepto_mov').val(data.D_CONCEPTO_MOV || "");
    $('#pos_fiscal').val(data.N_POSICION_FISCAL || "");
    $('#pos_fiscal').mask("9999/99");
    $('#n_cuota').val(data.N_CUOTA_ANTICIPO || "");
    $('#i_pagado').val(Number(data.I_PAGADO).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "");
    $('#f_pago').val(data.F_PAGO || "");
    $('#n_comprobante').val(data.N_COMPROBANTE || "");
    $('#c_medio_pago').val(data.C_MEDIO_PAGO || "");
    $('#d_medio_pago').val(data.D_MEDIO_PAGO || "");
    $('#n_cheque').val(data.N_CHEQUE || "");
    $('#c_banco_emisor').val(data.C_BANCO_EMISOR || "");
    $('#c_banco_rec').val(data.C_BANCO_RECEPTOR || "");
    $('#c_sucursal_rec').val(data.C_SUCURSAL_RECEP || "");
    $('#d_banco_emisor').val(data.D_BANCO_EMISOR || "");
    $('#d_banco_rec').val(data.D_BANCO_RECEPTOR || "");
    $('#d_sucursal_rec').val(data.D_SUCURSAL_RECEP || "");
    $('#caj_rec').val(data.C_CAJERO_RECEP || "");
    $('#n_lote').val(data.N_CABEZAL || "");
    $('#n_remesa').val(data.N_REMITO || "");
    $('#n_orden').val(data.N_ORDEN || "");
    $('#c_tramite').val(data.N_TRAMITE || "");
    $('#d_tramite').val(data.D_TRAMITE || "");
    $('#c_usuarioalt').val(data.C_USUARIOALT || "");
    $('#f_acreditacion').val(data.F_ACREDITACION || "");
    $('#c_caracteristica').val(data.C_CARACTERISTICA || "");
    $('#c_moneda').val(data.C_MONEDA || "");
    $('#d_error').val(data.D_ERROR || "");
    $('#n_tabla_form').val(data.N_TABLA_FORM || "");
    $('#n_tabla_doc').val(data.N_TABLA_TIPO_DOC || "");
    $('#n_tabla_tipo_imp').val(data.N_TABLA_TIPO_IMPONIBLE || "");
    $('#n_tabla_mp').val(data.N_TABLA_MEDIO_PAGO || "");

    if(data.CARGADO == null){
        let index = datos_modif_pagos_erroneos.findIndex(pe => pe.ID_PAGO_ERRONEO === data.ID_PAGO_ERRONEO);
        datos_orig_pagos_erroneos[index] = await post_query(data);
        datos_modif_pagos_erroneos[index] = JSON.parse(JSON.stringify(datos_orig_pagos_erroneos[index]));
    }
    estado_banco();
}

function get_input_datos(){
    let data = {};
    data.C_TIPO_FORM = $('#c_form').val() || "";
    data.D_TIPO_FORM = $('#d_form').val() || "";
    data.ID_PAGO_ERRONEO = $('#id_pago_erroneo').val() || "";
    data.ID_CONTRIBUYENTE = $('#id_contribuyente').val() || "";
    data.ID_OBLIGACION = $('#id_obligacion').val() || "";
    data.N_CUIT = limpia_cuit($('#n_cuit').val()) || "";
    data.C_TIPO_DOCUMENTO = $('#c_documento').val() || "";
    data.D_TIPO_DOCUMENTO = $('#d_documento').val() || "";
    data.N_DOCUMENTO = $('#n_documento').val() || "";
    data.D_DENOMINACION = $('#d_denominacion').val() || "";
    data.C_TIPO_IMPONIBLE = $('#c_tipo_imponible').val() || "";
    data.D_TIPO_IMPONIBLE = $('#d_tipo_imponible').val() || "";
    data.D_OBJETO_HECHO = $('#d_objeto_hecho').val() || "";
    data.N_RECIBO = $('#n_recibo').val() || "";
    data.C_TRIBUTO = $('#c_tributo').val() || "";
    data.D_TRIBUTO = $('#d_tributo').val() || "";
    data.C_CONCEPTO = $('#c_concepto').val() || "";
    data.D_CONCEPTO = $('#d_concepto').val() || "";
    data.C_CONCEPTO_MOV = $('#c_concepto_mov').val() || "";
    data.D_CONCEPTO_MOV = $('#d_concepto_mov').val() || "";
    data.N_POSICION_FISCAL = $('#pos_fiscal').val().replace("/", "") || "";
    data.N_CUOTA_ANTICIPO = $('#n_cuota').val() || "";
    data.I_PAGADO = $('#i_pagado').val().replace(/\./g, '').replace(',', '.') || "";
    data.F_PAGO = $('#f_pago').val() || "";
    data.N_COMPROBANTE = $('#n_comprobante').val() || "";
    data.C_MEDIO_PAGO = $('#c_medio_pago').val() || "";
    data.D_MEDIO_PAGO = $('#d_medio_pago').val() || "";
    data.N_CHEQUE = $('#n_cheque').val() || "";
    data.C_BANCO_EMISOR = $('#c_banco_emisor').val() || "";
    data.C_BANCO_RECEPTOR = $('#c_banco_rec').val() || "";
    data.C_SUCURSAL_RECEP = $('#c_sucursal_rec').val() || "";
    data.D_BANCO_EMISOR = $('#d_banco_emisor').val() || "";
    data.D_BANCO_RECEPTOR = $('#d_banco_rec').val() || "";
    data.D_SUCURSAL_RECEP = $('#d_sucursal_rec').val() || "";
    data.C_CAJERO_RECEP = $('#caj_rec').val() || "";
    data.N_CABEZAL = $('#n_lote').val() || "";
    data.N_REMITO = $('#n_remesa').val() || "";
    data.N_ORDEN = $('#n_orden').val() || "";
    data.N_TRAMITE = $('#c_tramite').val() || "";
    data.D_TRAMITE = $('#d_tramite').val() || "";
    data.C_USUARIOALT = $('#c_usuarioalt').val() || "";
    data.F_ACREDITACION = $('#f_acreditacion').val() || "";
    data.C_CARACTERISTICA = $('#c_caracteristica').val() || "";
    data.C_MONEDA = $('#c_moneda').val() || "";
    data.D_ERROR = $('#d_error').val() || "";
    data.N_TABLA_FORM = $('#n_tabla_form').val() || "";
    data.N_TABLA_TIPO_DOC = $('#n_tabla_doc').val() || "";
    data.N_TABLA_TIPO_IMPONIBLE = $('#n_tabla_tipo_imp').val() || "";
    data.N_TABLA_MEDIO_PAGO = $('#n_tabla_mp').val() || "";

    data.CARGADO = true;
    return data;
}

function limpiar(){
    $('#c_usuarioalt').val("");
    $('#id_obligacion').val("");
    $('#t_archivo').val("");
    $('#n_tabla_form').val("");
    $('#n_tabla_doc').val("");
    $('#n_tabla_mp').val("");
    $('#m_objeto_hecho').val("");
    $('#id_contribuyente').val("");
    $('#id_pago_erroneo').val("");
    $('#n_cuit').val("");
    $('#c_documento').val("");
    $('#d_documento').val("");
    $('#n_documento').val("");
    $('#d_denominacion').val("");
    $('#c_tipo_imponible').val("");
    $('#d_tipo_imponible').val("");
    $('#d_objeto_hecho').val("");
    $('#n_recibo').val("");
    $('#c_tributo').val("");
    $('#d_tributo').val("");
    $('#c_concepto').val("");
    $('#d_concepto').val("");
    $('#c_concepto_mov').val("");
    $('#d_concepto_mov').val("");
    $('#pos_fiscal').val("");
    $('#n_cuota').val("");
    $('#i_pagado').val("");
    $('#f_pago').val("");
    $('#n_comprobante').val("");
    $('#c_medio_pago').val("");
    $('#d_medio_pago').val("");
    $('#n_cheque').val("");
    $('#c_banco_emisor').val("");
    $('#d_banco_emisor').val("");
    $('#c_banco_rec').val("");
    $('#d_banco_rec').val("");
    $('#c_sucursal_rec').val("");
    $('#d_sucursal_rec').val("");
    $('#caj_rec').val("");
    $('#n_lote').val("");
    $('#n_remesa').val("");
    $('#n_orden').val("");
    $('#c_form').val("");
    $('#d_form').val("");
    $('#c_tramite').val("");
    $('#d_tramite').val("");
    $('#c_moneda').val("");
    $('#d_moneda').val("");
    $('#c_caracteristica').val("");
    $('#d_caracteristica').val("");
    $('#d_error').val("");
}

async function grabar() {
    $('#div_search').procOverlay({visible:true});
    let index = datos_modif_pagos_erroneos.findIndex(pe => pe.ID_PAGO_ERRONEO === $('#id_pago_erroneo').val());
    datos_modif_pagos_erroneos[index] = get_input_datos();
    checkear_modificados();

    let error = false;
    let es_iibb;

    for (let i = 0; i < datos_modif_pagos_erroneos.length; i++) {
        es_iibb = datos_modif_pagos_erroneos[i].C_TRIBUTO;
        if (datos_modif_pagos_erroneos[i].MODIFICADO) {
            if (valida_nulos_pagos(datos_modif_pagos_erroneos[i])) {
                if (datos_modif_pagos_erroneos[i].C_FORM === 'CM03/99') {
                    try {
                        let remesaControladaResult = await valida_remesa_controlada(
                            datos_modif_pagos_erroneos[i].N_REMITO,
                            datos_modif_pagos_erroneos[i].C_USUARIOALT
                        );
                        
                        if (!remesaControladaResult) {
                            error = true;
                            break;
                        }
                    } catch (err) {
                        error = true;
                        break;
                    }
                }

                try {
                    let chequeosResult = await chequeos(i);
                    
                    if (!chequeosResult) {
                        error = true;
                        break;
                    }
                } catch (err) {
                    error = true;
                    break;
                }
            } else {
                error = true;
                break;
            }
        }
    }
    if (!error) {
        let counter = 0;

        for (let i = 0; i < datos_modif_pagos_erroneos.length; i++) {
            datos_modif_pagos_erroneos[i].EXITO = false;
            datos_orig_pagos_erroneos[i].EXITO = false;
            if (datos_modif_pagos_erroneos[i].MODIFICADO) {
                try {
                    let updateResult = await update_pago(datos_modif_pagos_erroneos[i]);

                    if (!updateResult) {
                        error = true;
                        break;
                    } else {
                        datos_modif_pagos_erroneos[i].EXITO = true;
                        datos_orig_pagos_erroneos[i].EXITO = true;
                        counter++;
                    }
                } catch (err) {
                    error = true;
                    break;
                }
            }
        }

        if ((!error && counter > 0) || es_iibb == 10) {
            datos_modif_pagos_erroneos = datos_modif_pagos_erroneos.filter(pago => pago.EXITO == false);
            datos_orig_pagos_erroneos = datos_orig_pagos_erroneos.filter(pago => pago.EXITO == false);
            if(datos_modif_pagos_erroneos.length == 0){
                $('#btn_limpiar').click();
            }else{
                setear_inputs_datos(datos_modif_pagos_erroneos[0]);
                if(datos_modif_pagos_erroneos.length > 1){
                    $('#btn_next').prop('disabled', false);
                }
                $('#btn_prev').prop('disabled', true);
            }
            mostrar_cuadro('S', 'Exito', 'Transacción grabada');
        }else if(!error && counter == 0){
            mostrar_cuadro('E', 'Error', 'Ningún cambio que guardar');
        }
    }
    $('#div_search').procOverlay({visible:false});
}

async function borrar() {
    let index = datos_modif_pagos_erroneos.findIndex(pe => pe.ID_PAGO_ERRONEO === $('#id_pago_erroneo').val());
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{  
        'p_id_pago_erroneo': $('#id_pago_erroneo').val(),
         "id_menu":v_id_menu,
         "n_orden":5
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                datos_modif_pagos_erroneos.splice(index, 1);
                datos_orig_pagos_erroneos.splice(index, 1);
                if(datos_modif_pagos_erroneos.length > 0){
                    let new_index = index;
                    if(index == datos_modif_pagos_erroneos.length){
                        new_index -= 1;
                    }
                    setear_inputs_datos(datos_modif_pagos_erroneos[new_index]);
                    if (new_index === (datos_modif_pagos_erroneos.length - 1)){
                        $('#btn_next').prop('disabled', true);
                    }else{
                        $('#btn_next').prop('disabled', false);
                    }
                    if (new_index === 0){
                        $('#btn_prev').prop('disabled', true);
                    }else{
                        $('#btn_prev').prop('disabled', false);
                    }

                    if($('#i_pagado').val() == '0,00'){
                        $('#btn_eliminar').prop('disabled', false);
                    }else{
                        $('#btn_eliminar').prop('disabled', true);
                    }
                }else{
                    $('#btn_limpiar').click();
                }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

async function post_query(data){
    return new Promise((resolve, reject) => {
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{  
                'p_archivo_inm': g_archivo_inm,    
                // 'p_id_contribuyente': $('#id_contribuyente').val(),
                // 'p_t_archivo': $('#t_archivo').val(),
                'p_n_cuit': limpia_cuit($('#n_cuit').val()),
                // 'p_d_denominacion': $('#d_denominacion').val(),
                // 'p_c_tipo_documento': $('#c_documento').val(),
                // 'p_d_tipo_documento': $('#d_documento').val(),
                // 'p_n_documento': $('#n_documento').val(),
                // 'p_n_tabla_tipo_doc': $('#n_tabla_doc').val(),
                'p_c_tributo': $('#c_tributo').val(),
                // 'p_d_tributo': $('#d_tributo').val(),
                //'p_d_objeto_hecho': $('#d_objeto_hecho').val(),
                'p_c_concepto': $('#c_concepto').val(),
                //'p_d_concepto': $('#d_concepto').val(),
                //'p_n_cuota': $('#n_cuota').val(),
                'p_c_tipo_form': $('#c_form').val(),
                //'p_d_formulario': $('#d_form').val(),
                'p_n_tabla_tipo_form': $('#n_tabla_form').val(),
                'p_n_remito': $('#n_remesa').val(),
                'p_n_lote': $('#n_lote').val(),
                'p_n_comprobante': $('#n_comprobante').val(),
                'p_c_tipo_imponible': $('#c_tipo_imponible').val(),
                // 'p_d_tipo_imponible': $('#d_tipo_imponible').val(),
                // 'p_m_objeto_hecho': $('#m_objeto_hecho').val(),
                'p_n_tramite': $('#c_tramite').val(),
                // 'p_d_tramite': $('#d_tramite').val(),
                'p_c_concepto_mov': $('#c_concepto_mov').val(),
                // 'p_d_concepto_mov': $('#d_concepto_mov').val(),
                'p_c_caracteristica': $('#c_caracteristica').val(),
                // 'p_d_caracteristica': $('#d_caracteristica').val(),
                'p_c_banco_receptor': $('#c_banco_rec').val(),
                // 'p_d_banco_receptor': $('#d_banco_rec').val(),
                'p_c_sucursal_recep': $('#c_sucursal_rec').val(),
                // 'p_d_sucursal_recep': $('#d_sucursal_rec').val(),
                //'p_caj_rec': $('#caj_rec').val(),
                'p_c_medio_pago': $('#c_medio_pago').val(),
                // 'p_d_medio_pago': $('#d_medio_pago').val(),
                'p_c_banco_emisor': $('#c_banco_emisor').val(),
                // 'p_d_banco_emisor': $('#d_banco_emisor').val(),
                // 'p_c_moneda':$('#c_moneda').val(),
                'p_moneda_default': g_MONEDA_DEFAULT,
                "id_menu":v_id_menu,
                "n_orden":1
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){  
                        v_modo = 'update';                 
                        $('#btn_buscar').prop('disabled', true);
                        $('#btn_grabar').prop('disabled', false);
                        if($('#i_pagado').val() == '0,00'){
                            $('#btn_eliminar').prop('disabled', false);
                        }else{
                            $('#btn_eliminar').prop('disabled', true);
                        }

                        $('#id_contribuyente').val(data.p_id_contribuyente);
                        $('#t_archivo').val(data.p_t_archivo);
                        $('#d_denominacion').val(data.p_d_denominacion);
                        $('#c_documento').val(data.p_c_tipo_documento);
                        $('#d_documento').val(data.p_d_tipo_documento);
                        $('#n_documento').val(data.p_n_documento);
                        $('#n_tabla_doc').val(data.p_n_tabla_tipo_doc);
                        $('#d_tributo').val(data.p_d_tributo);
                        $('#d_concepto').val(data.p_d_concepto);
                        $('#d_form').val(data.p_d_formulario);
                        $('#d_tipo_imponible').val(data.p_d_tipo_imponible);
                        $('#m_objeto_hecho').val(data.p_m_objeto_hecho);
                        $('#d_tramite').val(data.p_d_tramite);
                        $('#d_concepto_mov').val(data.p_d_concepto_mov);
                        $('#d_caracteristica').val(data.p_d_caracteristica);
                        $('#d_banco_rec').val(data.p_d_banco_receptor);
                        $('#d_sucursal_rec').val(data.p_d_sucursal_recep);
                        $('#d_medio_pago').val(data.p_d_medio_pago);
                        $('#d_banco_emisor').val(data.p_d_banco_emisor);
                        $('#c_moneda').val(data.p_c_moneda);  
                        $('#c_form').blur();
                        
                        data = {};
                        data = get_input_datos();
                        data.CARGADO = true;
                        resolve(data);
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    reject(errorThrown);
                }
            });
    });
}

function valida_nulos_pagos(pago){
    if( pago.C_CONCEPTO != g_concuo &&
    pago.C_CONCEPTO != g_pagcon &&
    pago.C_CONCEPTO != g_CONCUOPLAN_INM ){ 
      if( (pago.N_CUIT == "" &&
         (pago.N_DOCUMENTO == "" || pago.C_TIPO_DOCUMENTO == "")) ){
            mostrar_error('ERR-00021: Debe ingresar el Número de CUIT o el Tipo y Número de Documento');
            return false;
        }
    }
  if( pago.C_CONCEPTO_MOV == "" ){
	mostrar_error('ERR-00001: El campo de Concepto del Movimiento no puede quedar vacio');
    return false;
  }else if( /* $('#n_comprobante').val() == "" ){
	mostrar_error('ERR-00001: El campo de Nro de Comprobante no puede quedar vacio'')
    return false;
  }else if( */ pago.I_PAGADO == "" ){
	mostrar_error('ERR-00001: El campo de Importe Pagado no puede quedar vacio');
    return false;
  }else if( pago.C_MONEDA == "" ){
	mostrar_error('ERR-00001: El campo de Moneda no puede quedar vacio');
    return false;
  }else if( pago.F_PAGO == "" ){
	mostrar_error('ERR-00001: El campo de Fecha de Pago no puede quedar vacio');
    return false;
  }else if( pago.C_BANCO_RECEPTOR == "" ){
	mostrar_error('ERR-00001: El campo de Banco Receptor no puede quedar vacio');
    return false;
  }else if( pago.C_SUCURSAL_RECEP == "" ){
	mostrar_error('ERR-00001: El campo de Sucursal Receptor no puede quedar vacio');
    return false;
  }else if( /* pago.c_cajero_recep == "" ){
	mostrar_error('ERR-00001: El campo de Cajero Receptor no puede quedar vacio'')
    return false;
  }else if( */ pago.C_MEDIO_PAGO == "" ){
	mostrar_error('ERR-00001: El campo de Medio de Pago no puede quedar vacio');
    return false;
  }else if( pago.N_CABEZAL == "" ){
	mostrar_error('ERR-00001: El campo de Nro. de Cabezal no puede quedar vacio');
    return false;
  }else if( pago.N_REMITO == "" ){
	mostrar_error('ERR-00001: El campo de Nro. de Remito no puede quedar vacio');
    return false;
  }


  if( (pago.C_MEDIO_PAGO == '2'|| pago.C_MEDIO_PAGO == '3'|| pago.C_MEDIO_PAGO == '4'|| pago.C_MEDIO_PAGO == '5')){
      if( (pago.N_CHEQUE == "") ){
  	   mostrar_error('ERR-00001: El campo de Nro. de Cheque no puede quedar vacio')
       return false;
      }else if( (pago.C_BANCO_EMISOR == "") ){
         mostrar_error('ERR-00001: El campo de Banco Emisor no puede quedar vacio')
         return false;
      }
  }
  if( pago.I_PAGADO <= 0 ){ 
     mostrar_error('ERR-05028: Los pagos con importe menor o igual a cero no se acreditan ni se insertan en la cuenta corriente. Eliminelo o modifique el importe si e mismo es erróneo')
     return false;
  }
  return true;
}

async function valida_remesa_controlada (n_remesa, c_usuarioalt){
    return new Promise((resolve, reject) => {
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{  
            "p_remito": n_remesa,
            "p_c_usuarioalt": c_usuarioalt,
            "id_menu":v_id_menu,
            "n_orden":2
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){  
                    resolve( true);
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    resolve( false);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                reject(errorThrown);
            }
        }); 
    });
}

async function chequeos(i){
    
    return new Promise((resolve, reject) => {
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{  
                'p_c_concepto': datos_modif_pagos_erroneos[i].C_CONCEPTO,
                'p_concuo': g_concuo,   
                'p_pagcon': g_pagcon, 
                'p_concuoplan_inm': g_CONCUOPLAN_INM,
                'p_id_obligacion': datos_modif_pagos_erroneos[i].ID_OBLIGACION,
                'p_c_tributo': datos_modif_pagos_erroneos[i].C_TRIBUTO, 
                'p_d_objeto_hecho': datos_modif_pagos_erroneos[i].D_OBJETO_HECHO,
                'p_n_posicion_fiscal': datos_modif_pagos_erroneos[i].N_POSICION_FISCAL.replace("/", ""),
                'p_n_cuota_anticipo': datos_modif_pagos_erroneos[i].N_CUOTA_ANTICIPO,
                'p_c_tipo_documento': datos_modif_pagos_erroneos[i].C_TIPO_DOCUMENTO,
                'p_n_documento': datos_modif_pagos_erroneos[i].N_DOCUMENTO,
                'p_id_contribuyente': datos_modif_pagos_erroneos[i].ID_CONTRIBUYENTE,
                'p_n_cuit': limpia_cuit(datos_modif_pagos_erroneos[i].N_CUIT),
                'p_c_concepto_mov': datos_modif_pagos_erroneos[i].C_CONCEPTO_MOV,
                'p_c_banco_receptor': datos_modif_pagos_erroneos[i].C_BANCO_RECEPTOR,
                'p_c_sucursal_recep': datos_modif_pagos_erroneos[i].C_SUCURSAL_RECEP,
                'p_c_medio_pago': datos_modif_pagos_erroneos[i].C_MEDIO_PAGO,
                'p_c_banco_emisor': datos_modif_pagos_erroneos[i].C_BANCO_EMISOR,
                'p_c_tipo_imponible': datos_modif_pagos_erroneos[i].C_TIPO_IMPONIBLE,
                'p_c_caracteristica': datos_modif_pagos_erroneos[i].C_CARACTERISTICA,        
                "id_menu":v_id_menu,
                "n_orden":3
            },
            dataType:'json',
            beforeSend: function(xhr, settings){},
            global: false,
            complete:function(xhr, settings){},
            success: function( data ) {
                if(data.resultado == 'OK'){  
                    datos_modif_pagos_erroneos[i].ID_OBLIGACION = data.p_id_obligacion
                    datos_modif_pagos_erroneos[i].D_DENOMINACION = data.p_d_denominacion
                    datos_modif_pagos_erroneos[i].C_TIPO_DOCUMENTO = data.p_c_tipo_documento
                    datos_modif_pagos_erroneos[i].N_DOCUMENTO = data.p_n_documento
                    datos_modif_pagos_erroneos[i].N_TABLA_TIPO_DOC = data.p_n_tabla_tipo_doc
                    datos_modif_pagos_erroneos[i].N_TABLA_MEDIO_PAGO = data.p_n_tabla_medio_pago
                    datos_modif_pagos_erroneos[i].N_TABLA_TIPO_IMPONIBLE = data.p_n_tabla_tipo_imponible
                    datos_modif_pagos_erroneos[i].M_OBJETO_HECHO = data.p_m_objeto_hecho
                    datos_modif_pagos_erroneos[i].D_CARACTERISTICA = data.p_d_caracteristica

                    resolve( true);
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    resolve( false);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                reject(errorThrown);
            }
        }); 
    });
}
async function update_pago(pago){
    return new Promise((resolve, reject) => {
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{  
                'p_id_obligacion': pago.ID_OBLIGACION,
                'p_i_pagado': pago.I_PAGADO,
                'p_c_concepto_mov': pago.C_CONCEPTO_MOV,
                'p_c_concepto': pago.C_CONCEPTO,
                'p_c_medio_pago': pago.C_MEDIO_PAGO,
                'p_n_orden' : pago.N_ORDEN,
                'p_n_remito': pago.N_REMITO,
                'p_f_acreditacion': pago.F_ACREDITACION,
                'p_n_cabezal': pago.N_CABEZAL,
                'p_c_banco_receptor': pago.C_BANCO_RECEPTOR,
                'p_c_sucursal_recep': pago.C_SUCURSAL_RECEP,
                'p_f_pago': pago.F_PAGO,
                'p_c_tipo_form': pago.C_TIPO_FORM,
                'p_n_comprobante': pago.N_COMPROBANTE,
                'p_c_moneda':pago.C_MONEDA,
                'p_n_tabla_tipo_form': pago.N_TABLA_TIPO_FORM,
                'p_n_tabla_medio_pago': pago.N_TABLA_MEDIO_PAGO,
                'p_c_cajero_rec': pago.C_CAJERO_REC,
                'p_n_cheque': pago.N_CHEQUE,
                'p_c_banco_emisor': pago.C_BANCO_EMISOR,
                'p_id_pago_erroneo': pago.ID_PAGO_ERRONEO,
                "id_menu":v_id_menu,
                "n_orden":4
            },
            dataType:'json',
            beforeSend: function(xhr, settings){},
            global: false,
            complete:function(xhr, settings){},
            success: function( data ) {
                if(data.resultado == 'OK'){  
                    resolve(true);
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    resolve(false);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                reject(errorThrown);
            }
        }); 
    });
}
function checkear_modificados(){
    for( let i = 0; i < datos_orig_pagos_erroneos.length; i++){
        let igual = true;
        if (datos_modif_pagos_erroneos[i].C_TIPO_FORM != datos_orig_pagos_erroneos[i].C_TIPO_FORM){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].ID_PAGO_ERRONEO != datos_orig_pagos_erroneos[i].ID_PAGO_ERRONEO){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].N_CUIT != datos_orig_pagos_erroneos[i].N_CUIT){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].C_TIPO_DOCUMENTO != datos_orig_pagos_erroneos[i].C_TIPO_DOCUMENTO){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].N_DOCUMENTO != datos_orig_pagos_erroneos[i].N_DOCUMENTO){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].D_DENOMINACION != datos_orig_pagos_erroneos[i].D_DENOMINACION){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].C_TIPO_IMPONIBLE != datos_orig_pagos_erroneos[i].C_TIPO_IMPONIBLE){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].D_OBJETO_HECHO != datos_orig_pagos_erroneos[i].D_OBJETO_HECHO){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].N_RECIBO != datos_orig_pagos_erroneos[i].N_RECIBO){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].C_TRIBUTO != datos_orig_pagos_erroneos[i].C_TRIBUTO){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].C_CONCEPTO != datos_orig_pagos_erroneos[i].C_CONCEPTO){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].C_CONCEPTO_MOV != datos_orig_pagos_erroneos[i].C_CONCEPTO_MOV){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].N_POSICION_FISCAL != datos_orig_pagos_erroneos[i].N_POSICION_FISCAL){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].N_CUOTA_ANTICIPO != datos_orig_pagos_erroneos[i].N_CUOTA_ANTICIPO){
            igual = false;
        }
        if (Number(datos_modif_pagos_erroneos[i].I_PAGADO) != Number(datos_orig_pagos_erroneos[i].I_PAGADO)){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].F_PAGO != datos_orig_pagos_erroneos[i].F_PAGO){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].N_COMPROBANTE != datos_orig_pagos_erroneos[i].N_COMPROBANTE){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].C_MEDIO_PAGO != datos_orig_pagos_erroneos[i].C_MEDIO_PAGO){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].N_CHEQUE != datos_orig_pagos_erroneos[i].N_CHEQUE){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].C_BANCO_EMISOR != datos_orig_pagos_erroneos[i].C_BANCO_EMISOR){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].C_BANCO_RECEPTOR != datos_orig_pagos_erroneos[i].C_BANCO_RECEPTOR){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].C_SUCURSAL_RECEP != datos_orig_pagos_erroneos[i].C_SUCURSAL_RECEP){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].C_CAJERO_RECEP != datos_orig_pagos_erroneos[i].C_CAJERO_RECEP){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].N_CABEZAL != datos_orig_pagos_erroneos[i].N_CABEZAL){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].N_REMITO != datos_orig_pagos_erroneos[i].N_REMITO){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].N_ORDEN != datos_orig_pagos_erroneos[i].N_ORDEN){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].N_TRAMITE != datos_orig_pagos_erroneos[i].N_TRAMITE){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].C_USUARIOALT != datos_orig_pagos_erroneos[i].C_USUARIOALT){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].F_ACREDITACION != datos_orig_pagos_erroneos[i].F_ACREDITACION){
            igual = false;
        }
        if (datos_modif_pagos_erroneos[i].C_CARACTERISTICA != datos_orig_pagos_erroneos[i].C_CARACTERISTICA){
            igual = false;
        }
        
        datos_modif_pagos_erroneos[i].MODIFICADO = !igual;
    }
}
function llama_cctec008(){
    post_to_url('consulta_cuenta_corr.php',{'id_contribuyente':$('#id_contribuyente_modal').val(),
        'p_n_id_menu': 10852,
        'p_m_autoquery': 'S'
    },'_blank','POST');
}