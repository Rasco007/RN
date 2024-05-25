function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "alta_baja_prescrip/autocomplete.php",
        type:"POST",
        data:{  p_oper:'getContribuyente',p_filtro: cuit_sin_guiones},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res){
                $("#d_denominacion").val(res['DENOMINACION']);
                $("#id_contribuyente").val(res['ID_CONTRIBUYENTE']);
            }else{
                $("#d_denominacion").val(null);
                $("#id_contribuyente").val(null);
            }
        }
    });
}

function fun_ajax_objeto_hecho(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: 'alta_baja_prescrip/autocomplete.php',
        type:"POST",
        data:{"p_oper":4,
            "c_tributo":$("#c_tributo").val(),
            "c_tipo_imponible":$("#c_tipo_imponible").val(),
            "contrib":$("#id_contribuyente").val(),
            "objeto_hecho":($("#d_objeto_hecho").val()).trim()},
        async:false,
        success: function(data){
            $('#main').procOverlay({visible:false});
            resp = JSON.parse(data);
            if(resp){
                $('#n_cuit').val(resp['N_CUIT']);
                $("#id_contribuyente").val(resp['ID_CONTRIBUYENTE']);
                $("#d_denominacion").val(resp['D_DENOMINACION']);
            }
        }
    });

}

function fun_convierte_pos_fiscal_a_num(string){
    if(string != ''){
        var res = string.split("/");
        var retorno;
        if(res.length >1){
            retorno = res[0] + res[1];
        }else{
            retorno = res[0];
        }
        return retorno;
    }else{
        return string;
    }
}

function _prescribir(element) {
    var params = {
        id_menu: v_id_menu,
        n_orden: 3,
        p_id_sesion: v_id_sesion,
        p_id_obligacion: $(element).attr('id_obligacion'),
        p_marca: 0
    };


    if ($(element).is(':checked') == true){
        if ($(element).attr('permitir') == 'S'){
            params.p_marca = 1;
        } else {
            mostrar_validacion('La oligación esta en Juicio o Inspección y no puede ser prescripta.');
            return false;
        }
    }

    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
                $('#main_grid').trigger('reloadGrid');
            }
            else{
                $('#main_grid').trigger('reloadGrid');
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}