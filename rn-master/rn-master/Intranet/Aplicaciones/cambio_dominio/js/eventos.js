function init_eventos(){
    $('.numerico').keypress(function (tecla) {
        return (tecla.charCode >= 48 && tecla.charCode <= 57);
    });

    $('#btn_buscar').click(function () {

        if ($('#d_patente').val() == "" && $('#d_patente_vieja').val() == ""){
            mostrar_error('El campo Dominio/Dominio Anterior no puede quedar vacío.'); return;
        }
        bloquear_campos(true);
        if ($('#d_patente').val() != ""){
            if ($('#d_verif_dom').val() == ''){
                mostrar_error('Ingrese el dígito verificador.');
                bloquear_campos(false); return;
            } else check_digito_verificador($('#d_patente').val(), $('#d_verif_dom').val());
        }
        else if ($('#d_patente_vieja').val() != ""){
            if ($('#d_verif_dom_ant').val() == ''){
                mostrar_error('Ingrese el dígito verificador.');
                bloquear_campos(false); return;
            } else {
                check_digito_verificador($('#d_patente_vieja').val(), $('#d_verif_dom_ant').val());
            }
        }
    });

    $('#btn_cambiar').click(function () {
        var patente_nueva = $('#d_patente_nueva').val();
        var patente_vieja_nueva = $('#d_patente_vieja_nueva').val();
        if (patente_nueva == "" && patente_vieja_nueva == ""){
            mostrar_error('El campo Dominio/Dominio Anterior no puede quedar vacío.'); return;
        }
        if (patente_nueva != "" && patente_vieja_nueva != ""){
            mostrar_error('No puede modificar ambos dominios.'); return;
        }
        if(patente_nueva != ""){
            validar_patente_nueva(patente_nueva);
        }
        else validar_patente_vieja_nueva(patente_vieja_nueva);
    });

    $('#btn_limpiar').click(function () {
        $('input').val('');
        $('#d_patente_nueva, #d_patente_vieja_nueva').attr('readonly', true);
        $("#chk_convocatoria").prop("checked", false);
        bloquear_campos(false);
        $('#btn_buscar').attr('disabled', false);
        $('#btn_cambiar').attr('disabled', true);
        /*$('#d_patente, #d_patente_vieja').keyup();*/
    });

    /*$('#d_patente').keyup(function () {
        if ($(this).val().length >= 3){
            $('#div_input_patente').addClass('input-group').removeClass('lupa_oculta');
            $('#div_input_patente .btn_lupa').show();
        } else{
            $('#div_input_patente').addClass('lupa_oculta').removeClass('input-group');
            $('#div_input_patente .btn_lupa').hide();
        }
    });

    $('#d_patente_vieja').keyup(function () {
        if ($(this).val().length >= 3){
            $('#div_input_patente_vieja').addClass('input-group').removeClass('lupa_oculta');
            $('#div_input_patente_vieja .btn_lupa').show();
        } else{
            $('#div_input_patente_vieja').addClass('lupa_oculta').removeClass('input-group');
            $('#div_input_patente_vieja .btn_lupa').hide();
        }
    });*/
}

