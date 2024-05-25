function cargar_grid(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_tributo":$("#c_tributo").val(),
            "p_posicion_fiscal_d": quitar_mask($("#n_posicion_d").val()),
            "p_cuota_d":$("#n_cuota_d").val(),
            "p_posicion_fiscal_h":quitar_mask($("#n_posicion_h").val()),
            "p_cuota_h":$("#n_cuota_h").val(),
            "p_objeto_hecho":$("#d_objeto_hecho").val(),
            "p_session":v_id_sesion,
            "id_menu":v_id_menu,
            "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
                setea_parametros("#recal_seg_bonif_grid",{':p_n_sesion': v_id_sesion});
                $(window).resize();
            }
            else{
                mostrar_error('Hubo un error al intentar cargar la tabla');
                return;
            }
        }
    });
}

function bloquear_form(){
    $('#btn_procesar').prop('disabled', true).css('cursor', 'not-allowed');
    $('#frm_busqueda input').attr('disabled', true);
    $('#frm_busqueda #d_tributo').addClass('lupa_oculta');
    $('#div_input_tributo').css('width', '100%');
    $('#frm_busqueda #d_objeto_hecho').addClass('lupa_oculta');
    $('#frm_busqueda .btn_lupa').hide();
}

function activar_form(){
    $('#btn_procesar').prop('disabled', false).css('cursor', 'pointer');
    $('#frm_busqueda input').val(null).attr('disabled',false);
    $('#frm_busqueda #d_tributo').removeClass('lupa_oculta');
    $('#frm_busqueda #d_objeto_hecho').removeClass('lupa_oculta').attr("readonly","readonly");
    $('#frm_busqueda .btn_lupa').show();
}

function quitar_mask(pos_fiscal){
    return ((pos_fiscal).substring(0,4)).concat((pos_fiscal).substring(5,7));
}

function campos_validos(){
    var n_posicion_d = $('#n_posicion_d').val();
    var n_posicion_h = $('#n_posicion_h').val();
    var n_cuota_d = $("#n_cuota_d").val();
    var n_cuota_h = $("#n_cuota_h").val();

    if (mes_pos_valido((n_posicion_d).substring(5, 7), 'desde') == false
            || mes_pos_valido((n_posicion_h).substring(5, 7), 'hasta') == false) {
        return false;
    }

    if (cuota_valida(n_cuota_d, 'desde') == false || cuota_valida(n_cuota_h, 'hasta') == false) {
        return false;
    }

    if (n_posicion_h){
        var valores_desde = quitar_mask(n_posicion_d) + n_cuota_d;
        var valores_hasta = quitar_mask(n_posicion_h) + n_cuota_h;
        if( valores_desde > valores_hasta){
            mostrar_error('El período desde no debe ser mayor al hasta');
            return false;
        }
    }
    else {
        $("#n_posicion_h").val(n_posicion_d);
        $("#n_cuota_h").val(n_cuota_d);
    }

    return true;
}

function cuota_valida(cuota, desc){
    if (cuota) {
        if (cuota < 0 || cuota > 12) {
            mostrar_error('El valor de la cuota ingresada ('+desc+') no es válido');
            return false;
        }
    } else return true;
}

function mes_pos_valido(mes, desc){
    if (mes){
        if (mes < 0 || mes > 12){
            mostrar_error('La posición fiscal ingresada ('+desc+') no es válida');
            return false;
        }
    } else return true;
}

