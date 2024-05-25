function get_datos() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "pase_mensual_scf/functions.php",
        type:"POST",
        dataType:"json",
        data:{  p_oper:'get_datos',
            p_id_menu: v_id_menu,
            p_d_patente:$('#d_dominio').val(),
            p_token:$("#c_captcha").val()
        },
        success: function(res)
        {
            $('#main').procOverlay({visible:false});
            if (res.resultado == 'OK'){
                if (res.c_clase_aut){
                    $('#c_clase_aut').val(res.c_clase_aut);
                    $('#si_tipo_aut').val(res.tipos_aut);
                    $('#campo_importe').val(res.importe);
                    $('#campo_importe').text('Importe: $'+res.importe_form);
                    $('#btn_continuar').hide();
                    $('#div_si_tipo_aut ,#campo_importe, #btn_comprar, #btn_cancelar').show();
                }else {
                    $('#div_radio_buttons').empty();
                    $( '#div_radio_buttons' ).append(
                        '<label class="control-label">Tipo de Automotor (*)</label>'
                    );
                    let posicion = 0;
                    $.each(res.tipos_aut, function(){
                        $( '#div_radio_buttons' ).append(
                        '<div class="form-check">'+
                        '<input class="form-check-input" type="radio" name="tipo_aut'+res.tipos_aut[posicion]+
                        '" id="tipo_aut'+res.tipos_aut[posicion]['C_DATO']+'" value="'+res.tipos_aut[posicion]['C_DATO']+
                        '" imp="'+res.tipos_aut[posicion]['IMPORTE']+'" impform="'+res.tipos_aut[posicion]['IMPORTE_FORM']+'">'+
                        '<label class="form-check-label" for="tipo_aut'+res.tipos_aut[posicion]['C_DATO']+'">&nbsp;'+
                        res.tipos_aut[posicion]['D_DATO']+'</label></div>'
                        );
                        posicion += 1;
                    });
                    $('#frm_tipos_aut, #btn_cancelar').show();
                    $('#btn_continuar').hide();
                }
            }else{
                mostrar_error(res.error);
            }
        }
    });
}

function validar_vigencia() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "pase_mensual_scf/functions.php",
        type:"POST",
        dataType:"json",
        data:{  p_oper:'validad_vigencia',
            p_id_menu: v_id_menu,
            p_d_patente:$('#d_dominio').val(),
            p_c_clase_aut:$('#c_clase_aut').val()
        },
        success: function(res)
        {
            $('#main').procOverlay({visible:false});
            if (res.resultado == 'OK'){
                if (res.falta_pago == 'SI'){
                    mostrar_cuadro('C','Comprar Pase','Ud. ya emitió una boleta para comprar el pase.<br> ¿Desea generar una nueva?',
                        function () {
                            comprar_pase();
                        },function () {
                            return;
                        });
                }else {
                    comprar_pase();
                }
            }else{
                mostrar_validacion(res.error);
            }
        }
    });
}

function comprar_pase() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "pase_mensual_scf/functions.php",
        type:"POST",
        dataType:"json",
        data:{  p_oper:'comprar_pase',
            p_id_menu: v_id_menu,
            p_d_patente:$('#d_dominio').val(),
            p_c_clase_aut:$('#c_clase_aut').val(),
            p_i_importe:$('#campo_importe').val()
        },
        success: function(res)
        {            
            $('#main').procOverlay({visible:false});
            if (res.resultado == 'OK'){
                llamar_report('BOLETA_AGR','p_id_boleta|'+res.p_id_boleta,'PDF');                
                mostrar_confirmacion('La compra del Pase Mensual se realizó con éxito.<br>Se ha generado la Boleta N°: '+res.p_id_boleta+'.');
                $('#btn_cancelar').click();
            }else{
                mostrar_error(res.error);
            }
        }
    });
}