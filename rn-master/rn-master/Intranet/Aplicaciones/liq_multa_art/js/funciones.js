function getDatosMulta() {
    let v_c_multa_valor = $('#c_valor').val();
    let v_oper = 'getValoresMulta';

    console.log('getValoresMulta');
    console.log(v_c_multa_valor);
    console.log($("#id_inspeccion").val());
    //Si hay una fisca, buscamos el valor en base al 109.
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: 'liq_multa_art/funciones.php',
        type:"post",
        data:{
            "p_c_multa_valor":v_c_multa_valor,
            "p_id_obligacion": $('#id_obligacion').val(),
            "p_oper": v_oper,
            "p_id_inspeccion": $("#id_inspeccion").val(),
            "p_n_id_menu":10729
        },
        success: function(response){
            $('#main').procOverlay({visible:false});
            resultado = JSON.parse(response);

            v_i_monto_fijo = resultado['I_MONTO_FIJO'];
            v_i_monto_fijo_desde = resultado['I_MONTO_FIJO_DESDE'];
            v_i_monto_fijo_hasta = resultado['I_MONTO_FIJO_HASTA'];
            v_m_automatica = resultado['M_AUTOMATICA'];
            v_p_descuento_vto = resultado['P_DESCUENTO_VTO'];
            v_p_descuento_notif = resultado['P_DESCUENTO_NOTIF'];

            $('#c_aplicacion').val(v_m_automatica);
            if (v_m_automatica === 'S'){
                $('#d_aplicacion').val('Aplicación Automática en Cuenta Corriente.');
                $('.aplicacion_automatica').show()
            }else if (v_m_automatica === 'N'){
                $('#d_aplicacion').val('Aplicación Manual en Cuenta Corriente. Deberá notificar la Multa.');
                $('.aplicacion_automatica').hide()
            }else{
                $('#d_aplicacion').val('');
            }

            calcularVencimiento();
            calcularImporte();
            calcularDescuento();
            calcularTotal();
        }
    });
}


function getDatosContribFisca(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "liq_multa_art/funciones.php",
        type:"POST",
        data:{  "p_id_inspeccion": $("#id_inspeccion").val(),
                "p_oper":'getInfoContribInsp',
                "p_n_id_menu":10729,
        },
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            $("#d_denominacion").val(res['DENOMINACION']);
            $("#id_contribuyente").val(res['ID_CONTRIBUYENTE']);
            $("#n_cuit").val(res['CUIT']);
        }
    });
}

function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit').val());
    if (cuit_sin_guiones != ''){
    $('#main').procOverlay({visible:true});
        $.ajax({
            url: "liq_multa_art/funciones.php",
            type:"POST",
            data:{  "n_cuit": cuit_sin_guiones,
                    "p_oper": 'getInfoCuit',
                    "p_n_id_menu":10729,
            },
            success: function(response)
            {
                $('#main').procOverlay({visible:false});
                res = JSON.parse(response);
                try {
                    $("#d_denominacion").val(res['DENOMINACION']);
                    $("#id_contribuyente").val(res['ID_CONTRIBUYENTE']);
                }catch (e) {
                    $("#d_denominacion").val('');
                    $("#id_contribuyente").val('');
                }

                //recuperarMultasValores();
                $('#id_obligacion,#id_obligacion_desc, #i_multa, #f_vto_desc, #i_descuento_vto,#i_descuento_notif, #f_vto, #i_total, #f_vto_desc, #d_aplicacion').val('');
                $('#c_valor').selectpicker('val', '');

            }
        });
    }else{
        $("#d_denominacion").val('');
        $("#id_contribuyente").val('');
    }
}

function recuperarMultasValores() {
    if ($('#c_multa').val() != '') {

        let v_c_multa = $('#c_multa').val();
        let v_id_obligacion = $('#id_obligacion').val();
        $('#main').procOverlay({visible:true});
        $.ajax({
            url: 'liq_multa_art/funciones.php',
            type: "POST",
            data: {
                "p_c_multa": v_c_multa,
                "p_id_obligacion": v_id_obligacion,
                "p_id_contribuyente": $('#id_contribuyente').val(),
                "p_f_generacion": $('#f_generacion').val(),
                "p_oper": 'getMultasValores',
                "p_n_id_menu":10729,
            },
            success: function (response) {
                $('#main').procOverlay({visible:false});
                resultado = JSON.parse(response);
                $('#c_valor').empty();
                let option = '';
                let cant = 0;
                let i;
                for (i = 0; i < resultado.length; i++) {
                    option += '<option value="' + resultado[i]['ID_MULTA'] + '">' + resultado[i]['D_MULTA'] + '</option>';
                    cant++;
                }
                $('#c_valor').append(option);
                $('.selectpicker').selectpicker('refresh');
                if (cant == 1) {
                    $("#c_valor").selectpicker('val', resultado[0]['ID_MULTA']);
                    $("#c_valor").attr('disabled', true).selectpicker('refresh');
                    $('#i_multa, #f_vto_desc, #i_descuento_vto, #i_descuento_notif,#f_vto, #i_total, #f_vto_desc, #d_aplicacion').val('');
                    getDatosMulta();
                } else {
                    $("#c_valor").attr('disabled', false).selectpicker('refresh');
                    $('#i_multa, #f_vto_desc, #i_descuento_vto,#i_descuento_notif, #f_vto, #i_total, #f_vto_desc, #d_aplicacion').val('');
                }
            }
        });
    }
}

function calcularImporte(){
    if (v_i_monto_fijo !=null){
        $('#i_multa').val(redondear(v_i_monto_fijo,2));
        $('#i_multa').attr('disabled',true);
    }else{
        $('#i_multa').val('');
        $('#i_multa').attr('disabled',false);
    }
}

function calcularDescuento() {
    let v_i_multa = parse($('#i_multa').val());
    let v_i_descuento;
    let v_i_descuento_notif;

    if (v_p_descuento_notif == 0){
        $('#i_descuento_notif').val('0,00');
        $('#i_descuento_notif').attr('disabled',true);
    }else{
        if (v_i_multa != null && v_p_descuento_notif != null){
            v_i_descuento_notif = v_i_multa * v_p_descuento_notif / 100;
            $('#i_descuento_notif').val(redondear(v_i_descuento_notif,2));
        }      
    }

    if (v_p_descuento_vto == 0){
        $('#i_descuento_vto').val('0,00');
        $('#i_descuento_vto').attr('disabled',true);
    }else{
        if (v_i_multa != null && v_p_descuento_vto != null){
            v_i_descuento = v_i_multa * v_p_descuento_vto / 100;
            $('#i_descuento_vto').val(redondear(v_i_descuento,2));
        }
        //$('#i_descuento_vto').attr('disabled',false);
    }
}

function calcularTotal() {
    let v_i_multa = parse($('#i_multa').val());
    let v_i_descuento = parse($('#i_descuento_vto').val());
    let v_i_descuento_notif = parse($('#i_descuento_notif').val());
    let total;

    if ((v_i_descuento != null || v_i_descuento_notif != null) && v_i_multa != null){
        total = v_i_multa - v_i_descuento - v_i_descuento_notif;
        $('#i_total').val(redondear(total));
    }
}

function calcularVencimiento() {
    if ($('#f_generacion').val() != '' && $('#c_valor').val() != '') {
        let v_id_multa = $('#c_valor').val();
        $('#main').procOverlay({visible:true});
        $.ajax({
            url: 'liq_multa_art/funciones.php',
            type:"POST",
            data:{
                "p_id_multa":v_id_multa,
                "p_f_generacion": $('#f_generacion').val(),
                "p_oper": 'getVtoMulta',
                "p_n_id_menu":10729,
            },
            success: function(response){
                $('#main').procOverlay({visible:false});
                resultado = JSON.parse(response);
                $('#f_vto').val(resultado[0]['F_VTO']);
                $('#f_vto_desc').val(resultado[0]['F_VTO_DESC']);
            }
        });
    }
}

function generarMulta() {
    //tomamos las fechas de vto e importe de vto que pueden ser nulos.
    let p_f_vencimiento_desc;

    if ($('#f_vto_desc').val().length > 0){
        p_f_vencimiento_desc = $('#f_vto_desc').val();
    }
    
    //valido expediente
    var reg = /^[\d]{6}[RA]{1}[\d]{4}$/;

    if (!reg.test($('#d_expediente').val()) && $('#d_expediente').val() != '') {
        //error handling
        mostrar_validacion('El formato ingresado para el expediente es incorrecto.');
        return;
    }

    var validaFecha = $.inArray($('#f_generacion').val(), disabledDays);        
    if (validaFecha != -1){
        mostrar_validacion("La Fecha de Generación no puede ser feriado o fin de semana.");
        return;
    }

    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_id_contribuyente": $('#id_contribuyente').val(),
            "p_id_multa":$('#c_valor').val(),
            "p_f_generacion":$('#f_generacion').val(),
            "p_f_vencimiento":$('#f_vto').val(),
            "p_f_vencimiento_desc":p_f_vencimiento_desc,
            "p_i_multa":$('#i_multa').val(),
            "p_i_descuento_vto":$('#i_descuento_vto').val(),
            "p_i_descuento_notif":$('#i_descuento_notif').val(),
            "p_d_expediente":$('#d_expediente').val(),
            "p_id_obligacion":$('#id_obligacion').val(),
            "p_d_observaciones":$('#d_observaciones').val(),
            "p_c_organismo":'ART',
            "p_id_inspeccion":$('#id_inspeccion').val(),
            "id_menu":10729,
            "p_n_id_menu":10729,
            "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado=== 'OK'){
                if ($('#c_aplicacion').val() == 'S'){
                    mostrar_cuadro(
                        'C','Generación de Multa',
                        'La Multa se ha generado correctamente. ¿Desea imprimir su boleta?.',
                        function(){
                            $('#id_obligacion_emitir').val(data.out_id_obligacion);
                            if ($.datepicker.parseDate('dd/mm/yy', $('#f_vto').val()) < $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
                                $('#f_emision').val(fecha_hoy);
                            }else{
                                $('#f_emision').val($('#f_vto').val());
                            }
                            $('#modal_emitir_boleta').modal('show');
                        },
                        function () {
                            limpiar_formulario();
                            return;
                        },
                        350
                    );
                }else {
                    mostrar_confirmacion('La Multa se ha generado correctamente');
                    limpiar_formulario();
                }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function limpiar_formulario(){
    $('#frm_multa input').val('');
    $('.selectpicker').selectpicker('val', '');
}

function limpiar_campos_multa(){
    $('#c_valor, #i_multa, #f_vto_desc, #i_descuento_vto, #i_descuento_notif, #f_vto, #i_total, #f_vto_desc, #d_aplicacion, #id_obligacion, #id_obligacion_desc').val('');
}
/*
function deshabilitar_formulario(p_habilitar){

    $('#frm_multa input').attr('disabled',p_habilitar);
    $('.selectpicker').attr('disabled',p_habilitar);

}
*/

function validarImporte(){
    let v_i_multa = parse(quita_mascara_numerica($('#i_multa').val()));

    if (!(v_i_monto_fijo_desde  === null) && !(v_i_multa  === null)){
        if(v_i_multa < v_i_monto_fijo_desde){
            mostrar_error('El monto de la multa no puede ser inferior a $'+redondear(v_i_monto_fijo_desde,2),600);
            $('#i_multa').val(null);
            return false;
        }
    }

    if (!(v_i_monto_fijo_hasta  === null) && !(v_i_multa  === null)) {
        if(v_i_multa > v_i_monto_fijo_hasta){
            mostrar_error('El monto de la multa no puede superior a $'+redondear(v_i_monto_fijo_hasta,2),600);
            $('#i_multa').val(null);
            return false;
        }
    }
    return true;
}



