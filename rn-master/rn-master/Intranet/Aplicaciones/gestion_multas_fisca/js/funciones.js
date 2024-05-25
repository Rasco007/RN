function completarDenominacion(valor){
    var cuit = limpia_cuit(valor);
    $.ajax({
        type: "post",
        url: "ajax_genericos/autocomplete.php",
        data: {term: cuit, oper:3},
        dataType: "json",
        success: function (response) {
            if (response){
                $('#d_denominacion').val(response.data_raz[0].razon_social);
                $('#id_contribuyente').val(response.data_raz[0].id_contribuyente);
            }else{
                $("#d_denominacion").val(null);
                $("#id_contribuyente").val(null);
            }

        }
    });
}

function recuperarMultasValores() {
    $.ajax({
        url: 'gestion_multas_fisca/funciones.php',
        type:"POST",
        data:{
            "p_c_multa":$('#id_infraccion_notif').val(),
            "p_id_obligacion": null,
            "p_id_contribuyente": $('#id_contribuyente_notif').val(),
            "p_f_generacion": $('#f_generacion_notif').val(),
            "p_oper": 'getMultasValores'
        },
        success: function(response){
            resultado = JSON.parse(response);
            $('#c_valor').empty();
            var option = '<option value=""></option>';
            for (var i=0;i<resultado.length;i++){
                option += '<option value="'+ resultado[i]['ID_MULTA'] + '">' + resultado[i]['D_MULTA'] + '</option>';
            }
            $('#c_valor').append(option);
            $('.selectpicker').selectpicker('refresh');
            $('#c_valor').val($('#id_multa').val());
            $('.selectpicker').selectpicker('refresh');
        }
    });
}

function calcularVencimiento(fecha) {
    if (fecha != '') {
        let v_id_multa = $('#id_multa').val();
        if ($('#c_valor').val()){
            v_id_multa = $('#c_valor').val();
        }
        $('#main').procOverlay({visible:true});
        $.ajax({
            url: 'gestion_multas_oe/funciones.php',
            type:"POST",
            data:{
                "p_id_multa":v_id_multa,
                "p_f_generacion": fecha ,
                "p_oper": 'getVtoMulta'
            },
            success: function(response){
                $('#main').procOverlay({visible:false});
                resultado = JSON.parse(response);
                $('#f_vto_pago_diag').val(resultado[0]['F_VTO']);
                /*$('#f_vto_desc_diag').val(resultado[0]['F_VTO_DESC']);*/

                if(!compararFechas(resultado[0]['F_VTO_DESC'])){
                    $('#i_descuento').val(redondear(0));
                    var montoFinal = redondear(parse($('#i_monto').val()) - parse($('#i_descuento').val()));
                    $('#i_total').val(montoFinal);
                }else{
                    calculoDescuento(v_id_multa);
                }               

            }
        });
    }
}

function calculoDescuento(id_multa){
    let p_descuento;

    $('#main').procOverlay({visible:true});
    $.ajax({
        url: 'gestion_multas_fisca/funciones.php',
        type:"POST",
        dataType:'json',
        data:{
            "p_c_multa_valor":id_multa,
            "p_oper": 'getValoresMulta'
        },
        success: function(response){
            $('#main').procOverlay({visible:false});
            
            if (response.P_DESCUENTO_VTO == null){
                p_descuento = 0;
            }else{
                p_descuento = response.P_DESCUENTO_VTO;
            }
            var montoDescuento = parse($('#i_monto').val()) * p_descuento / 100;
            $('#i_descuento').val(redondear(montoDescuento));

            var montoFinal = redondear(parse($('#i_monto').val()) - parse($('#i_descuento').val()));
            $('#i_total').val(montoFinal);
        }
    });
}

function limpiaCamposModal(idForm){
    $(idForm)[0].reset();
}

function anularMulta(n_instancia,n_orden,d_observ){
    return $.ajax({
        type: "POST",
        url: FUNCIONES_BASEPATH+"maestro_abm.php",
        data: {p_n_instancia: n_instancia,
                p_n_orden: n_orden,
                p_d_observaciones: d_observ,
                "id_menu":10727,
                "n_orden":0},
        dataType: "json"
    });

}

function notificarMulta(n_instancia,n_orden,f_notificacion,id_multa){
    return $.ajax({
        type: "POST",
        url: FUNCIONES_BASEPATH+"maestro_abm.php",
        data: {p_id_instancia: n_instancia,
                p_n_orden: n_orden,
                p_f_notificacion: f_notificacion,
                p_f_vencimiento_desc:null,
                p_f_vencimiento:null,
                p_i_descuento_vto:null,
                out_id_obligacion: null,
                p_id_multa:id_multa,
                "id_menu":10727,
                "n_orden":1},
        dataType: "json"
    });

}

function reducirMulta(n_instancia,n_orden,importe,observaciones){
    return $.ajax({
        type: "POST",
        url: FUNCIONES_BASEPATH+"maestro_abm.php",
        data: {p_n_instancia: n_instancia,
                p_n_orden: n_orden,
                p_i_importe: importe,
                p_d_observaciones:observaciones,
                "id_menu":10727,
                "n_orden":2},
        dataType: "json"
    });

}

function compararFechas(fechaDesde, fechaHasta){
    if (fechaHasta == null) {
        fechaHasta = $.datepicker.formatDate('dd/mm/yy', new Date());
   }
         
    if($.datepicker.parseDate('dd/mm/yy',fechaDesde) >= $.datepicker.parseDate('dd/mm/yy',fechaHasta)){		
		return true;
	}else{
		return false;
	}

}