function comprar_pago_ant() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "pago_anticipado_tpeaje/functions.php",
        type:"POST",
        dataType:"json",
        data:{  p_oper:'comprar_pago_ant',
            p_id_menu: v_id_menu,
            p_d_patente:$('#d_dominio').val(),
            p_i_importe:limpia_numero($('#d_importe').val()),
            p_token:$("#c_captcha").val()
        },
        success: function(res)
        {
            $('#main').procOverlay({visible:false});
            if (res.resultado == 'OK'){
                llamar_report('BOLETA_AGR','p_id_boleta|'+res.p_id_boleta,'PDF');
                mostrar_confirmacion('Se ha generado la Boleta N°:'+res.p_id_boleta+'.');
                $('#frm_consulta :input').val(null);
            }else{
                mostrar_error(res.error);
            }
        }
    });
}

function limpia_numero(num){
    num = num.replace(/\./g,'');
    num = num.replace(',','.');
    return num;
}