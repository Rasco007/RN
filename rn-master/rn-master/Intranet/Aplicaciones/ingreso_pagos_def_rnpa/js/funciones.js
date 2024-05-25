function procesar(){
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_f_cobro_desde": $('#f_desde').val(),
            "p_f_cobro_hasta": $('#f_hasta').val(),
            "p_f_acreditacion": $('#f_acred').val(),
            "p_f_pago": $('#f_pago').val(),
            "id_menu": v_id_menu,
            "n_orden": 0
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                mostrar_cuadro('C','Atención', 'Desea confirmar el rango de cobro ingresados?', function () {
                    $.ajax({
                        type: 'POST',
                        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                        data: {
                            "p_f_cobro_desde": $('#f_desde').val(),
                            "p_f_cobro_hasta": $('#f_hasta').val(),
                            "p_f_acreditacion": $('#f_acred').val(),
                            "p_f_pago": $('#f_pago').val(),
                            "id_menu": v_id_menu,
                            "n_orden": 1
                        },
                        dataType: 'json',
                        success: function (data) {
                            if (data.resultado == 'OK') {
                                if (data.p_txt_resultado == 'OK'){
                                    mostrar_confirmacion(data.p_txt_resultado);
                                }else{
                                    mostrar_cuadro('E', 'Error', data.p_txt_resultado);
                                }
                                $('#res_proceso').text(data.p_txt_resultado);
                            } else {
                                mostrar_cuadro('E', 'Error', data.resultado);
                                return;
                            }
                        }
                    });
                },null,null);
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                $('#res_proceso').text(" ");
                return;
            }
        }
    });
}
