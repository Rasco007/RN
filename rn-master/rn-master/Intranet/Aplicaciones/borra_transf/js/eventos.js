function init_eventos() {
    if(p_c_tributo == 90){
        $('#contenedor_lupa_nomenclatura').hide();
        $('#contenedor_lupa_dominio_anterior,#contenedor_lupa_dominio').show();
        //$('#contenedor_lupa_dominio').show();
        $('#contenedor_lupa_partida').hide();
        //Agregar digitos verificadores
        if(p_modo == 'D') $('#contenedor_f_recupero').show();
    }
    if(p_modo == 'R'){
        $('#c_motivo').hide();
        $('#d_motivo').hide();
        $('#label_c_motivo').hide();
    }

    $('#btn_buscar').click(function () {
        if (p_c_tributo == 60){
            if ($('#d_partida',"#frm_consulta").val() || $('#d_nomenclatura',"#frm_consulta").val()){
                getDatosFiltros();
            }else mostrar_error('Debe completar alguno de estos campos: Partida / Nomenclatura.');
        }else if (p_c_tributo == 90){
            if ($('#d_partida',"#frm_consulta").val() || $('#d_nomenclatura',"#frm_consulta").val()){
                if ($('#d_partida').val() && $('#d_verif_dom').val()){
                    check_digito_verificador($('#d_partida').val(), $('#d_verif_dom').val());
                }
                else if ($('#d_nomenclatura').val() && $('#d_verif_dom_ant').val()){
                    check_digito_verificador($('#d_nomenclatura').val(), $('#d_verif_dom_ant').val());
                }else mostrar_error('El campo Digito Verificador no puede quedar vacio.');
            }else mostrar_error('Debe completar alguno de estos campos: Dominio / Dominio Anterior.');
        }
    });

    $('#btn_borrar_movimiento').click(function () {
        mostrar_cuadro('Q', 'Pedir Confirmación', 'Ud. borrará este movimiento ¿Desea continuar?',
            function () {
                if (p_modo == 'R') {
                    //borrar_responsabilidad();
                    mostrar_validacion('En desarrollo. PRC borrar responsabilidad.');
                    //PAC_INMOBILIARIO.PRC_BORRAR_RESPONSABILIDAD ya esta creado, probarlo bien antes de habilitarlo.
                } else {
                    borrar_transferencia();
                }
                limpiar_formulario();
            },
            function () {
            });
    });

    $('#btn_limpiar').click(function () {
        limpiar_formulario();
    });
}