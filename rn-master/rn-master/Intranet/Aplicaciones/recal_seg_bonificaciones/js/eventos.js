function init_eventos() {

    $('#n_posicion_d, #n_posicion_h').mask('9999/99').focusout(function () {
        if ($(this).val()){
            var mes_pos = ($(this).val()).substring(5, 7);
            if (mes_pos < 0 || mes_pos > 12){
                mostrar_error('La posición fiscal ingresada no es válida');
            }
        }
    });

    $("#n_cuota_d, #n_cuota_h").mask("9999").focusout(function () {
        var cuota = $(this).val();
        if (cuota) {
            if (cuota < 0 || cuota > 12) {
                mostrar_error('El valor de la cuota ingresada no es válido');
            }
        }
    });

    $("#c_tributo").mask("9999");

    /*$('#d_objeto_hecho').keyup(function () {
        if ($('#d_objeto_hecho').val().length >= 3){
            $('#div_input_objeto').addClass('input-group');
            $('#d_objeto_hecho').removeClass('lupa_oculta');
            $('#div_input_objeto .btn_lupa').show();
        } else{
            $('#d_objeto_hecho').addClass('lupa_oculta');
            $('#div_input_objeto').removeClass('input-group');
            $('#div_input_objeto .btn_lupa').hide();
        }
    });*/

    /*$('#c_tributo').keyup(function () {
        if (!$('#c_tributo').val()){
            $('#d_objeto_hecho').attr("readonly","readonly");
        } else {
            $('#d_objeto_hecho').removeAttr("readonly");
        }
        $('#d_objeto_hecho').val(null);
    });*/

    $('#btn_procesar').click(function () {
        if (!$('#c_tributo').val()){
            mostrar_error('Debe ingresar el valor de tributo');
            return;
        }
        if(campos_validos() == true){
            bloquear_form();
            cargar_grid();
        }
    });

    $('#btn_borrar_seguimiento').click(function () {
        setea_parametros("#recal_seg_bonif_grid",{':p_n_sesion': null});
        $(window).resize();
        activar_form();
    })

}