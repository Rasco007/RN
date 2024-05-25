function set_id_ing_indiv_pagos_def(){
    $.ajax({                     
        url: "ingreso_individual_pagos_definitivos/php/funciones.php",                     
        type:"POST",                     
        dataType: "JSON",                     
        data:{ p_oper : 'getNewId'},                     
        success: function (res) {                         
            if ( res != null){
                id_ing_indiv_pagos_def = res.ID_ING_INDIV_PAGOS_DEF;
                setea_parametros('#main_grid',{':p_id_ing_pago':id_ing_indiv_pagos_def});
            }
        }                 
    });
}

function habilitar_campos(){
    $.ajax({                     
        url: "ingreso_individual_pagos_definitivos/php/funciones.php",                     
        type:"POST",                     
        dataType: "JSON",                     
        data:{ p_oper : 'getMPCheque', p_medio_pago: $('#c_medio_pago').val()},                     
        success: function (res) {                         
            if ( res != null && res.HABILITAR == 'S'){
                $('#c_banco_emisor').prop('readonly', false);
                $('#n_cheque').prop('readonly', false);
                $('#lupa_c_banco_emisor').show();
            }else{
                $('#c_banco_emisor').prop('readonly', true);
                $('#n_cheque').prop('readonly', true);
                $('#c_banco_emisor').val(null);
                $('#d_banco_emisor').val(null);
                $('#n_cheque').val(null);
                $('#lupa_c_banco_emisor').hide();
            }
        }                 
    });
}

function calcular_totales(){
    $.ajax({                     
        url: "ingreso_individual_pagos_definitivos/php/funciones.php",                     
        type:"POST",                     
        dataType: "JSON",                     
        data:{ p_id_ing_indiv_pagos_def: id_ing_indiv_pagos_def,
                p_oper : 'getTotales'
        },                     
        success: function (res) {                         
            $('#tot_capital').val(res.TOT_CAPITAL || "");
            $('#tot_interes').val(res.TOT_INTERES || "");                                           
            $('#tot_totales').val(res.TOT_TOTALES || "");

            $('#tot_capital').val(Number($('#tot_capital').val()).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
            $('#tot_interes').val(Number($('#tot_interes').val()).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));                                           
            $('#tot_totales').val(Number($('#tot_totales').val()).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        }                 
    });
}

function to_date(fecha){
    var dateParts = fecha.split("/");
    var day = parseInt(dateParts[0], 10);
    var month = parseInt(dateParts[1], 10) - 1; 
    var year = parseInt(dateParts[2], 10);
    var resultDate = new Date(year, month, day);
    return resultDate;
}

function f_mas_90_dias(fecha){

    var dateParts = fecha.split("/");
    var day_fecha = parseInt(dateParts[0], 10);
    var month_fecha = parseInt(dateParts[1], 10) - 1; 
    var year_fecha = parseInt(dateParts[2], 10);
    var inputDate = new Date(year_fecha, month_fecha, day_fecha);
    var resultDate = new Date(inputDate.getTime() + (90 * 24 * 60 * 60 * 1000));

    var day = resultDate.getDate().toString().padStart(2, "0");
    var month = (resultDate.getMonth() + 1).toString().padStart(2, "0");
    var year = resultDate.getFullYear().toString();
    var formattedDate = day + "/" + month + "/" + year;
    return formattedDate;
}

function buscar_obligacion(){
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_tributo": $('#c_tributo').val(),
            "p_d_objeto_hecho": $('#d_objeto_hecho').val(),
            "p_c_tipo_imponible": $('#c_tipo_imponible').val(),
            "p_c_concepto": $('#c_concepto').val(),
            "p_pos_fiscal": $('#pos_fiscal').val(),
            "p_n_cuota": $('#n_cuota').val(),
            "p_c_concepto_mov": $('#c_concepto_mov').val(),
            "p_f_interes": $('#f_interes').val(),
            "p_i_capital": $('#i_capital').val().replace(/\./g, '').replace(',', '.'),
            "p_i_interes": $('#i_interes').val().replace(/\./g, '').replace(',', '.'),
            "p_i_total": $('#i_total').val().replace(/\./g, '').replace(',', '.'),
            "p_f_interes_real": $('#f_interes_real').val(),
            "p_id_obligacion": $('#id_obligacion').val(),
            "p_id_contribuyente": $('#id_contribuyente').val(),
            "p_i_saldo_actual": $('#i_saldo_actual').val().replace(/\./g, '').replace(',', '.'),
            "p_f_vto": $('#f_vto').val(),
            "id_menu": v_id_menu,
            "n_orden": 0
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                $('#id_obligacion').val(data.p_id_obligacion);
                $('#id_contribuyente').val(data.p_id_contribuyente);
                $('#f_vto').val(data.p_f_vto);
                if(data.p_i_interes){
                    $('#i_interes').val(data.p_i_interes);
                }
                if(data.p_i_total){
                    $('#i_total').val(data.p_i_total);
                }
                if(data.p_i_saldo_actual){
                    $('#i_saldo_actual').val(data.p_i_saldo_actual);
                }
                if(data.p_i_total && data.p_i_interes){
                    $('#i_capital').val(data.p_i_total - data.p_i_interes);
                }else if($('#i_total').val() == ""){
                    $('#i_capital').val("");
                }
                formateo_importes();
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function buscar_saldos(){
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_concepto_mov": $('#c_concepto_mov').val(),
            "p_f_interes": $('#f_interes').val(),
            "p_i_capital": $('#i_capital').val().replace(/\./g, '').replace(',', '.'),
            "p_i_interes": $('#i_interes').val().replace(/\./g, '').replace(',', '.'),
            "p_i_total": $('#i_total').val().replace(/\./g, '').replace(',', '.'),
            "p_f_interes_real": $('#f_interes_real').val(),
            "p_id_obligacion": $('#id_obligacion').val(),
            "p_i_saldo_actual": $('#i_saldo_actual').val().replace(/\./g, '').replace(',', '.'),
            "id_menu": v_id_menu,
            "n_orden": 1
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                if(data.p_i_interes){
                    $('#i_interes').val(data.p_i_interes);
                }
                if(data.p_i_total){
                    $('#i_total').val(data.p_i_total);
                }
                if(data.p_i_saldo_actual){
                    $('#i_saldo_actual').val(data.p_i_saldo_actual);
                }
                if(data.p_i_total && data.p_i_interes){
                    $('#i_capital').val(data.p_i_total - data.p_i_interes);
                }else if($('#i_total').val() == ""){
                    $('#i_capital').val("");
                }
                formateo_importes();
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function calcular_capital_interes(p_monto){
    if (!isNaN($('#i_total').val().replace(/\./g, '').replace(',', '.'))){
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                "p_c_concepto_mov": $('#c_concepto_mov').val(),
                "p_i_interes": $('#i_interes').val().replace(/\./g, '').replace(',', '.'),
                "p_i_total": $('#i_total').val().replace(/\./g, '').replace(',', '.'),
                "p_f_interes_real": $('#f_interes_real').val(),
                "p_id_obligacion": $('#id_obligacion').val(),
                "p_monto": p_monto.replace(/\./g, '').replace(',', '.'),
                "id_menu": v_id_menu,
                "n_orden": 2
            },
            dataType: 'json',
            success: function (data) {
                if (data.resultado == 'OK') {
                    $('#i_interes').val(data.p_i_interes);
                    $('#i_total').val(data.p_i_total);
                    $('#i_capital').val(data.p_i_total - data.p_i_interes);
                    formateo_importes();
                } else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    }else{
        $("#i_total").val("");
        mostrar_cuadro('E', 'Error', 'Total no es un número valido');
    }
}

function cargar_datos(){

    if($('#c_concepto').val() != "" && $('#pos_fiscal').val() != "" && $('#n_cuota').val() != ""){
        if($('#id_obligacion').val() != ""){
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_c_concepto": $('#c_concepto').val(),
                    "p_pos_fiscal": $('#pos_fiscal').val(),
                    "p_n_cuota": $('#n_cuota').val(),
                    "p_f_vto": $('#f_vto').val(),
                    "p_id_obligacion": $('#id_obligacion').val(),
                    "p_id_ing_indiv_pagos_def": id_ing_indiv_pagos_def,
                    "id_menu": v_id_menu,
                    "n_orden": 4
                },
                dataType: 'json',
                success: function (data) {
                    if (data.resultado == 'OK') {
                        $('#main_grid').trigger('reloadGrid');
                        $('#abm_modal').modal("hide");
                        clear_modal_inputs();
                    } else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
        else{
            mostrar_cuadro('E', 'Error', 'No se pudo determinar la obligacion con los datos del Contribuyente');
        }
    }
    else{
        mostrar_cuadro('E', 'Error', 'Debe completar los campos Concepto, Posición Fiscal y Número de Cuota');
    }
}

function abm_cuotas(params){
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: params,
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                $('#main_grid').trigger('reloadGrid');
                $('#abm_modal').modal("hide");
                clear_modal_inputs();
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function set_modal_inputs(id){
    $('#id_ing_pago').val($('#main_grid').getCell(id,'id_ing_indiv_pagos_def'));
    $('#c_concepto').val($('#main_grid').getCell(id,'c_concepto'));
    $('#d_concepto').val($('#main_grid').getCell(id,'d_concepto'));
    $('#pos_fiscal').val($('#main_grid').getCell(id,'posicion_fiscal'));
    $('#n_cuota').val($('#main_grid').getCell(id,'n_cuota'));
    $('#f_vto').val($('#main_grid').getCell(id,'f_vencimiento_pago'));
    $('#c_concepto_mov').val($('#main_grid').getCell(id,'c_concepto_mov'));
    $('#d_concepto_mov').val($('#main_grid').getCell(id,'d_concepto_mov'));
    $('#i_capital').val($('#main_grid').getCell(id,'i_capital'));
    $('#i_interes').val($('#main_grid').getCell(id,'i_interes'));
    $('#i_total').val($('#main_grid').getCell(id,'i_total'));
    $('#id_obligacion').val($('#main_grid').getCell(id,'id_obligacion'));
    $('#n_fila').val($('#main_grid').getCell(id,'n_fila'));
}

function clear_modal_inputs(){
    $('#id_ing_pago').val("");
    $('#c_concepto').val("");
    $('#d_concepto').val("");
    $('#pos_fiscal').val("");
    $('#n_cuota').val("");
    $('#f_vto').val("");
    $('#c_concepto_mov').val("");
    $('#d_concepto_mov').val("");
    $('#i_capital').val("");
    $('#i_interes').val("");
    $('#i_total').val("");
    $('#id_obligacion').val("");
    $('#id_contribuyente').val("");
    $('#i_saldo_actual').val("");
}

function disable_inputs(){
    $("#d_objeto_hecho").attr('readonly',true);
    $("#c_tributo").attr('readonly',true);
    $("#f_pago").attr('disabled',true);
    $("#f_pago").attr('readonly',true);
    $("#f_acred").attr('disabled',true);
    $("#f_acred").attr('readonly',true);
    $("#f_interes").attr('disabled',true);
    $("#f_interes").attr('readonly',true);
    $("#chk_aut").attr('disabled',true);
    $("#c_tipo_form").attr('readonly',true);
    $("#n_comprobante").attr('readonly',true);
    $("#c_banco_rec").attr('readonly',true);
    $("#c_sucursal_rec").attr('readonly',true);
    $("#c_cajero_rec").attr('readonly',true);
    $("#c_medio_pago").attr('readonly',true);
    $("#c_banco_emisor").attr('readonly',true);
    $("#n_cheque").attr('readonly',true);

    $('#lupa_d_objeto_hecho').hide();
    $('#lupa_c_tributo').hide();
    $('#btn_lupa_inmueble').hide();
    $('#lupa_c_tipo_form').hide();
    $('#lupa_c_banco_rec').hide();
    $('#lupa_c_sucursal_rec').hide();
    $('#lupa_c_medio_pago').hide();
    $('#lupa_c_banco_emisor').hide();

    $('#btn_cargar').hide();
}

function enable_inputs(){
    $("#d_objeto_hecho").attr('readonly',false);
    $("#c_tributo").attr('readonly',false);
    $("#f_pago").attr('disabled',false);
    $("#f_pago").attr('readonly',false);
    $("#f_acred").attr('disabled',false);
    $("#f_acred").attr('readonly',false);
    $("#f_interes").attr('disabled',false);
    $("#f_interes").attr('readonly',false);
    $("#chk_aut").attr('disabled',false);
    $("#c_tipo_form").attr('readonly',false);
    $("#n_comprobante").attr('readonly',false);
    $("#c_banco_rec").attr('readonly',false);
    $("#c_sucursal_rec").attr('readonly',false);
    $("#c_cajero_rec").attr('readonly',false);
    $("#c_medio_pago").attr('readonly',false);
    $("#c_banco_emisor").attr('readonly',false);
    $("#n_cheque").attr('readonly',false);
    habilitar_campos();

    $('#lupa_d_objeto_hecho').show();
    $('#mascara_lupa_d_objeto_hecho').hide();
    $('#lupa_c_tributo').show();
    $('#btn_lupa_inmueble').show();
    $('#lupa_c_tipo_form').show();
    $('#lupa_c_banco_rec').show();
    $('#lupa_c_sucursal_rec').show();
    $('#lupa_c_medio_pago').show();
    $('#lupa_c_banco_emisor').show();

    $('#btn_cargar').show();
}

function clear_inputs(){
    $("#d_objeto_hecho").val("");
    $("#c_tributo").val("");
    $("#d_tributo").val("");
    $("#c_tipo_imponible").val("");
    $("#f_pago").val("");
    $("#f_acred").val("");
    $("#f_interes").val("");
    $("#f_interes_real").val("");
    $("#chk_aut" ).prop( "checked", false );
    $("#c_tipo_form").val("");
    $("#d_tipo_form").val("");
    $("#n_comprobante").val("");
    $("#c_banco_rec").val("");
    $("#d_banco_rec").val("");
    $("#c_sucursal_rec").val("");
    $("#d_sucursal_rec").val("");
    $("#c_cajero_rec").val("");
    $("#c_medio_pago").val("");
    $("#d_medio_pago").val("");
    $("#c_banco_emisor").val("");
    $("#d_banco_emisor").val("");
    $("#n_cheque").val("");

    enable_inputs();

    $('#lupa_d_objeto_hecho').hide();
    $('#mascara_lupa_d_objeto_hecho').show();
}

function procesar_pago(){
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_tributo": $('#c_tributo').val(),
            "p_d_objeto_hecho": $('#d_objeto_hecho').val(),
            "p_f_pago": $('#f_pago').val(),
            "p_f_acred": $('#f_acred').val(),
            "p_f_interes": $('#f_interes').val(),
            "p_c_tipo_form": $('#c_tipo_form').val(),
            "p_n_comprobante": $('#n_comprobante').val(),
            "p_c_banco_rec": $('#c_banco_rec').val(),
            "p_c_sucursal_rec": $('#c_sucursal_rec').val(),
            "p_c_cajero_rec": $('#c_cajero_rec').val(),
            "p_c_medio_pago": $('#c_medio_pago').val(),
            "p_c_banco_emisor": $('#c_banco_emisor').val(),
            "p_n_cheque": $('#n_cheque').val(),
            "p_c_tipo_imponible": $('#c_tipo_imponible').val(),
            "p_f_interes_real": $('#f_interes_real').val(),
            "p_id_ing_indiv_pagos_def":id_ing_indiv_pagos_def,
            "p_tipo_pago": v_tipo_pago,
            "id_menu": v_id_menu,
            "n_orden": 5
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                mostrar_cuadro('S', 'Exito', 'Se ha imputado el pago');
                habilitar();
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function habilitar(){
    id_ing_indiv_pagos_def = null;
    $('#div_grid').hide();
    enable_inputs();
    $('#f_acred').val("");
    $('#f_interes').val("");
    $('#f_interes_real').val("");
}

function formateo_importes(){
    if (!isNaN(Number($('#i_interes').val()))){
        $('#i_interes').val(Number($('#i_interes').val()).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }
    if (!isNaN(Number($('#i_total').val()))){
        $('#i_total').val(Number($('#i_total').val()).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }
    if (!isNaN(Number($('#i_saldo_actual').val()))){
        $('#i_saldo_actual').val(Number($('#i_saldo_actual').val()).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }
    if (!isNaN(Number($('#i_capital').val()))){
        $('#i_capital').val(Number($('#i_capital').val()).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
    }
}