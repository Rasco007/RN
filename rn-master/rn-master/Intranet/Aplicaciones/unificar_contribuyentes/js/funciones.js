function completarDenominacion(origen){
    let cuit_sin_guiones =limpia_cuit($('#'+origen+'n_cuit').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "unificar_contribuyentes/php/autocomplete.php",
        type:"POST",
        data:{  p_oper:'getContribuyente',p_filtro: cuit_sin_guiones},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res){
                $("#"+origen+"d_denominacion").val(res['DENOMINACION']);
                $("#"+origen+"id_contribuyente").val(res['ID_CONTRIBUYENTE']);
                $("#"+origen+"c_tipo_documento").val(res['C_TIPO_DOCUMENTO']);
                $("#"+origen+"d_tipo_documento").val(res['D_TIPO_DOCUMENTO']);
                $("#"+origen+"n_documento").val(res['N_DOCUMENTO']);
                if (origen != 'unif_'){
                    $('#frm_datos_unif :input, #btn_datos_contrib').attr('disabled',false);
                    $('#lupa_unif_c_tipo_documento').show();
                }else {
                    $('#btn_unif_datos_contrib').attr('disabled',false);
                    $('#btn_procesar').show();
                }
            }else{
                mostrar_cuadro('I', 'Atención', 'No se ha encontrado un contribuyente asociado al CUIT ingresado.');
                if (origen != 'unif_'){
                    $('#btn_limpiar').click();
                }else {
                    $('#frm_datos_unif :input').val(null);
                    $('#btn_unif_datos_contrib').attr('disabled',true);
                    $('#btn_procesar').hide();
                }
            }
        }
    });
}

function fun_ajax_documento(origen){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: 'unificar_contribuyentes/php/autocomplete.php',
        type:"POST",
        data:{
            "p_oper": 5,
            "c_tipo_documento":$("#"+origen+"c_tipo_documento").val(),
            "n_documento":$("#"+origen+"n_documento").val()
        },
        async:true,
        success: function(data){
            resp = JSON.parse(data);
            if(resp){
                $("#"+origen+"n_cuit").val(resp['N_CUIT']);
                $("#"+origen+"id_contribuyente").val(resp['ID_CONTRIBUYENTE']);
                $("#"+origen+"d_denominacion").val(resp['D_DENOMINACION']);
                if (origen != 'unif_'){
                    $('#frm_datos_unif :input, #btn_datos_contrib').attr('disabled',false);
                    $('#lupa_unif_c_tipo_documento').show();
                }else {
                    $('#btn_unif_datos_contrib').attr('disabled',false);
                    $('#btn_procesar').show();
                }
            }else{
                mostrar_cuadro('I', 'Atención', 'No se ha encontrado un contribuyente asociado al número de documento ingresado.');
                if (origen != 'unif_'){
                    $('#btn_limpiar').click();
                }else {
                    $('#frm_datos_unif :input').val(null);
                    $('#btn_unif_datos_contrib').attr('disabled',true);
                    $('#btn_procesar').hide();
                }
            }
        }
    });
}

function fun_valida_unificacion() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_cuit_viejo":limpia_cuit($('#n_cuit').val()),
            "p_cuit_nuevo":limpia_cuit($('#unif_n_cuit').val()),
            "id_menu":10873,
            "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
                if (data.p_mensaje1){
                    mostrar_cuadro('V','Unificar Contribuyentes',data.p_mensaje1,function () {
                        if (data.p_mensaje2){
                            mostrar_cuadro('V','Unificar Contribuyentes',data.p_mensaje2,function () {
                                fun_unificar();
                            },null,400);
                        }else {
                            fun_unificar();
                        };
                    },null,400);
                }else if(data.p_mensaje2){
                    mostrar_cuadro('V','Unificar Contribuyentes',data.p_mensaje2,function () {
                        fun_unificar();
                    },null,400);
                }else {
                    fun_unificar();
                }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function fun_unificar() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_cuit_viejo":limpia_cuit($('#n_cuit').val()),
            "p_cuit_nuevo":limpia_cuit($('#unif_n_cuit').val()),
            "id_menu":10873,
            "n_orden":1
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
                mostrar_confirmacion('El proceso de unificación finalizó correctamente.');
                $('#btn_limpiar').click();
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function fun_datos_contrib(cuit){
    post_to_url('consulta_contribuyentes.php', {
        'p_consulta': 'S',
        'cuit': cuit,
        'ruta':"[]",
        'p_n_id_menu': 10885}, '_blank');
}