function init_eventos(){
    establecer_diseño();
    $(".mascara_importe").each(function () {
        var events = $._data(this, 'events');
        if (events && events['keydown']) return;
        $(this).keydown(function (event) {
            if ($(this).prop('readonly')) return;
            return controla_number(event, this, 2);
        });
    }).css('text-align', 'right');
    /*$('#d_objeto_hecho').keyup(function () {
        if ($(this).val().length >= 3){
            $('#div_input_objeto').addClass('input-group').removeClass('lupa_oculta');
            $('#div_input_objeto .btn_lupa').show();
        } else{
            $('#div_input_objeto').addClass('lupa_oculta').removeClass('input-group');
            $('#div_input_objeto .btn_lupa').hide();
        }
    });*/

    /*$('#d_nomenclatura').keyup(function () {
        if ($(this).val().length >= 4){
            $('#div_input_nomenclatura').addClass('input-group').removeClass('lupa_oculta');
            $('#div_input_nomenclatura .btn_lupa').show();
        } else{
            $('#div_input_nomenclatura').addClass('lupa_oculta').removeClass('input-group');
            $('#div_input_nomenclatura .btn_lupa').hide();
        }
    });*/

    /*$('#d_patente_vieja').keyup(function () {
        if ($(this).val().length >= 3){
            $('#div_input_patente_vieja').addClass('input-group').removeClass('lupa_oculta');
            $('#div_input_patente_vieja .btn_lupa').show();
        } else{
            $('#div_input_patente_vieja').addClass('lupa_oculta').removeClass('input-group');
            $('#div_input_patente_vieja .btn_lupa').hide();
        }
    });*/

    $('#btn_buscar').click(function () {
        if (validacion_prequery() === true){
            $('#main').procOverlay({ visible: true });

            if (p_tributo == v_c_automotor){
                if ($('#d_objeto_hecho').val() != ""){
                    check_digito_verificador($('#d_objeto_hecho').val(), $('#d_verif_dom').val());
                }
                else if ($('#d_patente_vieja').val() != ""){
                    check_digito_verificador($('#d_patente_vieja').val(), $('#d_verif_dom_ant').val());
                }
            }
            else if (p_tributo == v_c_inmobiliario){
                $('#div_input_objeto, #div_input_nomenclatura, #div_input_patente_vieja').addClass('lupa_oculta').removeClass('input-group');
                $('#div_input_objeto .btn_lupa, #div_input_nomenclatura .btn_lupa,#div_input_patente_vieja .btn_lupa').hide();
                $('#d_objeto_hecho').attr('readonly', true);
                $('#d_verif_dom, #d_patente_vieja, #d_verif_dom_ant').attr('readonly', true);
                $('#d_nomenclatura').attr('readonly', true);

                setea_parametros('#ingreso_coprop_grid',
                    {':p_modo':p_modo,
                                 ':p_tributo': p_tributo,
                                 ':p_objeto': $('#d_objeto_hecho').val()});
            }
        }
    });

    $('#btn_limpiar').click(function () {
        $('#div_input_objeto, #div_input_nomenclatura, #div_input_patente_vieja').addClass('input-group');
        $('#div_input_objeto .btn_lupa, #div_input_nomenclatura .btn_lupa, #div_input_patente_vieja .btn_lupa').show();
        $('#d_verif_dom, #d_patente_vieja, #d_verif_dom_ant').val('').attr('readonly', false);
        $('#d_objeto_hecho,#d_nomenclatura').val('').attr('readonly', false);
        $('#ingreso_coprop_grid').jqGrid('clearGridData');
    });

    $('#btn_con_cuit').click(function () {
        post_to_url2('contribuyentes.php', {
            'p_n_id_menu': 10865,
            'p_m_autoquery': 'N'
        }, '_blank');
    });

    $('#btn_sin_cuit').click(function () {
        post_to_url2('contribuyentes_st.php', {
            'p_n_id_menu': 10875,
            'p_m_autoquery': 'N'
        }, '_blank');
    });

    // MODO CONSULTA AUTOMÁTICA
    /*if (p_modo == 'C'){
        $('#btns_cuit').hide();
        $("#ingreso_coprop_grid_pager #add_ingreso_coprop_grid," +
            "#ingreso_coprop_grid_pager #edit_ingreso_coprop_grid,"+
            "#ingreso_coprop_grid_pager #del_ingreso_coprop_grid").css('display', 'none');
        if (p_objeto != ""){
            $('#btn_buscar').click();
        }
    }
    else if (p_modo == 'U' && p_tributo != "" && p_objeto != ""){
        $('#btn_buscar').click();
    }*/

    $('#btn_grabar_tmp').click(function(){
        $('#main').procOverlay({visible:true});
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{
                "p_n_sesion":p_n_sesion,
                "p_c_tributo":p_tributo,
                "p_d_objeto_hecho":$('#d_objeto_hecho','#frm_busqueda').val(),
                "id_menu":10953,
                "n_orden":2
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    $('#ingreso_coprop_grid').trigger('reloadGrid');
                    $('#modal_coprop').modal('hide');
                    mostrar_confirmacion('Operación realizada con éxito.');
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    });

    $('#btn_editar').click(function () {
        $('#main').procOverlay({visible:true});
        var valido = $('#form_modificacion_datos').validationEngine('validate');
        $('#form_modificacion_datos').validationEngine('hideAll');
        if (valido){
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{
                    "p_n_cuit": limpia_cuit($("#n_cuit",'#form_modificacion_datos').val()),
                    "p_d_objeto_hecho": $('#d_objeto_hecho','#frm_busqueda').val(),
                    "p_c_tributo": p_tributo,
                    "p_c_tipo_documento": $("#c_tipo_documento",'#form_modificacion_datos').val(),
                    "p_n_documento": $("#n_documento",'#form_modificacion_datos').val(),
                    "p_d_denominacion": $("#d_denominacion",'#form_modificacion_datos').val(),
                    "p_id_contribuyente": $("#id_contribuyente",'#form_modificacion_datos').val(),
                    "p_p_participacion": $("#p_participacion",'#form_modificacion_datos').val(),
                    "p_c_tipo_respon": $("#c_tipo_respon",'#form_modificacion_datos').val(),
                    "p_f_vig_desde": $("#f_vig_desde",'#form_modificacion_datos').val(),
                    "p_f_vig_hasta": $("#f_vig_hasta",'#form_modificacion_datos').val(),
                    "p_rowid": $("#rid",'#form_modificacion_datos').val(),
                    "p_n_sesion": p_n_sesion,
                    "id_menu":v_id_menu,
                    "n_orden":0
                },
                dataType:'json',
                success: function( data ) {
                    $('#main').procOverlay({visible:false});
                    if(data.resultado == 'OK'){
                        $("#tmp_coprop_grid").trigger('reloadGrid');
                    }
                    else{
                        mostrar_error(data.resultado);
                        return;
                    }
                    $("#modificacion_datos").modal('hide');
                }
            });
        } else {
            mostrar_error('Complete los campos obligatorios.')
        }

    })

}