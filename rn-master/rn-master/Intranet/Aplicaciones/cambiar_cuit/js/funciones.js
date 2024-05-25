function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "cambiar_cuit/php/autocomplete.php",
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
                $('#new_cuit, #btn_datos_contrib').attr("disabled",false);
                $('#btn_procesar').show();
            }else{
                mostrar_cuadro('I', 'Atención', 'No se ha encontrado un contribuyente asociado al CUIT ingresado.');
                $('#btn_limpiar').click();
            }
        }
    });
}

function fun_ajax_documento(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: 'cambiar_cuit/php/autocomplete.php',
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
                $('#new_cuit, #btn_datos_contrib').attr("disabled",false);
                $('#btn_procesar').show();
            }else{
                mostrar_cuadro('I', 'Atención', 'No se ha encontrado un contribuyente asociado al número de documento ingresado.');
                $('#btn_limpiar').click();
            }
        }
    });
}

function fun_cambiar_cuit() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_cuit_viejo":limpia_cuit($('#n_cuit').val()),
            "p_cuit_nuevo":limpia_cuit($('#new_cuit').val()),
            "id_menu":10872,
            "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
                mostrar_confirmacion('El cambio de cuit se realizó con éxito.');
                $('#btn_limpiar').click();
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}