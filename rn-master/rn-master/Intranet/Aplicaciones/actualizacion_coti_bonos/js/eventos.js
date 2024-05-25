function init_eventos(){
    $('#btn_guardar_bono').click(function () {
        if ($('#frm_bono').validationEngine('validate')) {
            var params = {
                p_c_tipo_bono:$('#bono_c_tipo').val(),
                p_f_vig_desde:$('#bono_f_desde').val(),
                p_f_vig_hasta:$('#bono_f_hasta').val(),
                p_i_cotizacion:$('#bono_i_cotizacion').val(),
                p_oper:$('#bono_oper').val(),
                p_c_bono_original: $('#c_bono_original').val(),
                p_f_vig_desde_original: $('#f_vig_desde_original').val()
            };
            abm_bonos(params);
        }
    });

}