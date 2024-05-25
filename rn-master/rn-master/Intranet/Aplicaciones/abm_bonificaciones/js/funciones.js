function limpia_pos_fisc(posfic){
    if(posfic != ''){
        var res = posfic.split("/");
        var retorno;
        if(res.length >1){
            retorno = res[0] + res[1];
        }else{
            retorno = res[0];
        }
        return retorno;
    }else{
        return posfic;
    }
}

function valida_pos_fisc(input) {
    var string = input.val();

    if (string != '') {
        var res;
        var retorno;
        res = string.split("/");
        if (res.length > 1) {
            retorno = res[0] + res[1];
        } else {
            retorno = res[0];
        }
        if (retorno.length != 6) {
            mostrar_cuadro('I', 'Advertencia', 'El formato de la posicion fiscal es incorrecto. Debe tener el siguiente formato: aaaa/mm. ', '', '', 400, 200);
            input.val(null);
            input.focus();
            return;
        } else {
            if (retorno.substring(4) > 12) {
                mostrar_cuadro('I', 'Advertencia', 'El formato de la posicion fiscal es incorrecto. El mes no puede ser mayor a 12 ', '', '', 400, 200);
                input.val(null);
                input.focus();
            } else {
                input.val(retorno.substring(0, 4) + '/' + retorno.substring(4));
            }
            return;
        }
    }

}

function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "abm_bonificaciones/php/autocomplete.php",
        type:"POST",
        data:{  p_oper:'getContribuyente',p_filtro: cuit_sin_guiones},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res){
                $("#d_denominacion").val(res['DENOMINACION']);
                $("#id_contribuyente").val(res['ID_CONTRIBUYENTE']);
                $('#c_tipo_documento').val(res['C_TIPO_DOCUMENTO']);
                $('#d_tipo_documento').val(res['D_TIPO_DOCUMENTO']);
                $('#n_documento').val(res['N_DOCUMENTO']);
            }else{
                $('#n_cuit').val(null);
                $("#d_denominacion").val(null);
                $("#id_contribuyente").val(null);
            }
        }
    });
}

function fun_ajax_objeto_hecho(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: 'abm_bonificaciones/php/autocomplete.php',
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
                $('#c_tipo_documento').val(resp['C_TIPO_DOCUMENTO']);
                $('#d_tipo_documento').val(resp['D_TIPO_DOCUMENTO']);
                $('#n_documento').val(resp['N_DOCUMENTO']);
            }else{
                mostrar_cuadro('I', 'Atención', 'No se han encontrado registros para la consulta realizada.');
                $("#n_cuit").val(null);
                $("#id_contribuyente").val(null);
                $("#d_denominacion").val(null);
                $("#d_objeto_hecho").val(null);
            }
        }
    });

}

function fun_ajax_documento(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: 'abm_bonificaciones/php/autocomplete.php',
        type:"POST",
        data:{
            "p_oper": 5,
            "c_tipo_documento":$("#c_tipo_documento").val(),
            "n_documento":$("#n_documento").val()
        },
        async:true,
        success: function(data){
            resp = JSON.parse(data);
            console.log(resp);
            if(resp){
                $('#n_cuit').val(resp['N_CUIT']);
                $("#id_contribuyente").val(resp['ID_CONTRIBUYENTE']);
                $("#d_denominacion").val(resp['D_DENOMINACION']);
            }else{
                mostrar_cuadro('I', 'Atención', 'No se han encontrado registros para la consulta realizada.');
                $("#id_contribuyente").val(null);
                $("#n_cuit").val(null);
                $("#d_denominacion").val(null);
                $('#c_tipo_documento').val(null);
                $("#n_documento").val(null);
            }
        }
    });
}

function getDatosAdicionales() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: 'abm_bonificaciones/php/funciones.php',
        type:"POST",
        data:{
            "p_oper": 'getDatosAdicionales',
            "p_c_tributo":c_tributo,
            "p_objeto_hecho":objeto_hecho
        },
        async:true,
        success: function(data){
            resp = JSON.parse(data);
            if(resp){
                if (c_tributo == 60){
                    $('#frm_datos_auto').hide();
                    $('#inmo_domicilio').val(resp['D_DOMICILIO']);
                    $('#inmo_c_zona').val(resp['C_ZONA']);
                    $('#inmo_d_zona').val(resp['D_ZONA']);
                    $('#inmo_uso').val(resp['D_USO']);
                    $('#datos_panel,#frm_datos_inmo').show();
                }else if (c_tributo == 90){
                    $('#frm_datos_inmo').hide();
                    $('#auto_dominio').val(resp['D_PATENTE_VIEJA']);
                    $('#auto_marca').val(resp['MARCA']);
                    $('#auto_modelo').val(resp['MODELO']);
                    $('#auto_desc').val(resp['DESCRIPCION']);
                    $('#auto_anio').val(resp['ANIO']);
                    $('#datos_panel,#frm_datos_auto').show();
                }
            }
        }
    });
}

function abm_bonificacion(params){
    params.id_menu = v_id_menu;
    params.n_orden = 0;
    params.p_id_contribuyente = id_contrib;
    params.p_c_tipo_imponible = c_tipo_imponible;
    params.p_c_tributo = c_tributo;
    params.p_d_objeto_hecho = objeto_hecho;

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#main_grid, #bonificaciones_grid').trigger('reloadGrid');
                $('#bonif_modal').modal('hide');
                mostrar_confirmacion('Operación realizada con éxito.');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}