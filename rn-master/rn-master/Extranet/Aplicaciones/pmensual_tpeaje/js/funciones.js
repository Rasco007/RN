function get_datos() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "pmensual_tpeaje/funciones.php",
        type:"POST",
        dataType:"json",
        data:{  p_oper:'getDatos',
            p_c_clase_aut:$('#c_clase_aut').val()
        },
        success: function(res)
        {
            $('#main').procOverlay({visible:false});
            if (res.resultado == 'OK'){
                if (res.importe){
                    $('#campo_importe').val(res.importe);
                    $('#si_tipo_aut').val(res.tipos_aut);
                    $('#campo_importe').text('Importe: $'+res.importe_form);
                    $('#div_si_tipo_aut ,#campo_importe, #btn_modal_comprar').show();
                    $('#modal_comprar_pase').modal('show');
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
                    $('#frm_tipos_aut').show();
                    $('#modal_comprar_pase').modal('show');
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
        url: "pmensual_tpeaje/funciones.php",
        type:"POST",
        dataType:"json",
        data:{  p_oper:'validarVigencia',
            p_d_patente:$('#d_dominio').val(),
            p_c_clase_aut:$('#c_clase_aut').val()
        },
        success: function(res)
        {
            $('#main').procOverlay({visible:false});
            if (res.resultado == 'OK'){
                if (res.falta_pago == 'SI'){
                    mostrar_cuadro('C','Comprar Pase','Ud. ya emitió una boleta para comprar el pase mensual de éste dominio.<br>¿Desea generar una nueva boleta?',
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
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_d_patente":$('#d_dominio').val(),
            "p_c_clase_aut":$('#c_clase_aut').val(),
            "p_i_importe":$('#campo_importe').val(),
            "id_menu":v_id_menu,
            "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
                llamar_report('BOLETA_AGR','p_id_boleta|'+data.p_id_boleta,'PDF');
                mostrar_confirmacion('La compra del Pase Mensual se realizó con éxito.<br>Se ha generado la Boleta N°:'+data.p_id_boleta+'.');
                $('#btn_modal_cancelar').click();
                $('#main_grid').trigger('reloadGrid');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}