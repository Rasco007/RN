function init_eventos(){
    $('.numerico').keypress(function (tecla) {
        return (tecla.charCode >= 48 && tecla.charCode <= 57);
    });

    $('#d_dominio').keypress(function (tecla) {
       if ($('#d_dominio').val().length >= 2){
           $('#lupa_dominio').show();
           $('#mascara_lupa_dominio').hide();
       } else {
           $('#lupa_dominio').hide();
           $('#mascara_lupa_dominio').show();
       }
    });

    $('#d_dominio_anterior').keypress(function (tecla) {
        if ($('#d_dominio_anterior').val().length >= 2){
            $('#lupa_dominio_anterior').show();
            $('#mascara_lupa_dominio_anterior').hide();
        } else {
            $('#lupa_dominio_anterior').hide();
            $('#mascara_lupa_dominio_anterior').show();
        }
    });

    $('#btn_buscar').click(function () {
        if(!validar_form()) {
            mostrar_validacion("Debe ingresar un dominio o dominio anterior con su dígito verificador para buscar");
            return;
        }
        $('#main').procOverlay({visible:true});
        $.ajax({
            type: 'POST',
            url: "borra_dominio/php/consultas_ajax.php",
            data: {
                p_oper: 'checkDigito',
                p_d_dominio: $('#d_dominio').val(),
                p_d_dominio_ant: $('#d_dominio_anterior').val()
            },
            dataType: 'json',
            success: function (res) {
                $('#main').procOverlay({visible:false});
                if (res.ERROR == 'OK'){
                    if ($('#d_dominio').val() && $('#c_verificador_dom').val() && $('#c_verificador_dom').val() != res.C_VERIFICADOR_DOM){
                        mostrar_error("El Digito Verificador del Dominio no es correcto");
                    }else if ($('#d_dominio_anterior').val() && $('#c_verificador_dom_ant').val() != res.C_VERIFICADOR_DOM_ANT){
                        mostrar_error("El Digito Verificador del Dominio Anterior no es correcto");
                    }else{
                        obtiene_detalle();
                    }
                }else{
                    mostrar_validacion(res.ERROR);
                }
            }
        });
    });

    $('#btn_limpiar').click(function (){
        limpiar_formulario();
    });

    $('#btn_borrar_dominio').click(function (){
        mostrar_cuadro('Q', 'Pedir Confirmación', 'Ud. borrará este dominio ¿Desea continuar?',
            function () {
                borrar_dominio();
                limpiar_formulario();
            },
            function () {
            });
    });
}
