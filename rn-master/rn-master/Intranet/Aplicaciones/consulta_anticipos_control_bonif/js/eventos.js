function inicializarEventos(){

    //FUN_GET_ID_SESION, SE ENCUENTRA PARAMETRIZADO EN OTRO MENU
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_tributo":10,
            "id_menu":v_id_menu,
            "n_orden":6
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                v_id_sesion = data.retorno;
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });

    $('#periodo').keypress(function(e){
        if(e.which != 8 && isNaN(String.fromCharCode(e.which))){
            e.preventDefault();
        }
    });

    $('#c_concepto').val(100);
    $('#d_concepto').val('ANTICIPO MENSUAL');

    $('#id_contribuyente').change(function(){
        $('#id_contribuyente').val();
    })

    const nombre = document.querySelector("#periodo");
    nombre.addEventListener("keydown", (evento) => {
        if (evento.key == "Enter") {
            evento.preventDefault();
            return false;
        }
    });

    $("#n_cuit").mask("99-99999999-9");

    $('.numerico').keypress(function(tecla){
        if(tecla.charCode<48 || tecla.charCode>57){
            if(tecla.charCode !== 44 && tecla.charCode !== 46){
                return false;
            }
        }
    });

    $('#lupa_d_denominacion').hide();
    $('#mascara_lupa_c_tributo').hide();
    $('#mascara_lupa_c_tipo_imp').hide();
    $('#mascara_lupa_c_tipo_doc').hide();

    $('#d_denominacion').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 4) {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        }
    });

    $('#btn_limpiar_datos').click(function(){
        $('#d_denominacion').val(null);
        $('#c_tipo_doc').val(null);
        $('#d_tipo_doc').val(null);
        $('#n_documento').val(null);
        $('#c_tipo_imp').val(null);
        $('#d_tipo_imp').val(null);
        $('#d_objeto_hecho').val(null);
        $('#n_cuit').val(null);
        $('#c_tributo').val(null);
        $('#d_tributo').val(null);
        $('#periodo').val(null);
        $("#id_contribuyente").val(null)
        desbloquear_filtros();
    });
 

    $('#c_tipo_imp, #d_objeto_hecho').focusout(function(){
        if($('#c_tipo_imp').val() && $('#d_objeto_hecho').val() && !$('#c_tipo_doc').val() && !$('#n_documento').val()){
            let c_tributo;
            if($('#c_tipo_imp').val() == 1){
                c_tributo = 10;
            }
            else if($('#c_tipo_imp').val() == 2){
                c_tributo = 20;
            }
            //BUSQUEDA1_BONIF
           $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_c_tipo_imponible": $('#c_tipo_imp').val(),
                 "p_objhecho": $('#d_objeto_hecho').val(),
                 "p_id_contribuyente": $("#id_contribuyente").val(),
                 "p_c_tributo": c_tributo,
                 "id_menu":v_id_menu,
                 "n_orden":0
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        $('#n_cuit').val(data.p_n_cuit);
                        $('#c_tipo_doc').val(data.p_tipo_documento);
                        $('#n_documento').val(data.p_n_documento);
                        $('#d_denominacion').val(data.p_nombres);
                        $('#id_contribuyente').val(data.p_id_contribuyente);
                        $('#c_tipo_doc').blur();
                        $('#n_cuit').blur();
                        $("#n_cuit").mask("99-99999999-9");
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 

           if(!$('#c_tipo_imp').val() && $('#d_tipo_imp').val()){
                $('#d_tipo_imp').val(null);
            }    
        }
    });

    $('#n_cuit').change(function(){
        if($('#n_cuit').val()){
            //PRC_VALIDAR_CUIT_BONIF
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                "p_n_cuit": limpia_cuit($('#n_cuit').val()),
                "p_id_contribuyente": $("#id_contribuyente").val(),
                "p_c_tributo": $('#c_tributo').val(),
                "p_c_concepto": $('#c_concepto').val(),
                "p_nombres": $('#d_denominacion').val(),
                "p_objhecho": $('#d_objeto_hecho').val(),
                "p_c_tipo_imponible": $('#c_tipo_imp').val(),
                "p_tipo_documento": $('#c_tipo_doc').val(),
                "p_n_documento": $('#n_documento').val(),
                "id_menu":v_id_menu,
                "n_orden":3
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        $("#id_contribuyente").val(data.p_id_contribuyente);
                        $('#c_tributo').val(data.p_c_tributo);
                        $('#c_tipo_imp').val(data.p_c_tipo_imponible);
                        $('#c_tipo_doc').val(data.p_tipo_documento);
                        $('#n_documento').val(data.p_n_documento);
                        $('#d_denominacion').val(data.p_nombres);
                        $('#d_objeto_hecho').val(data.p_objhecho);
                        $('#c_tipo_doc').blur();
                        $('#c_tipo_imp').blur();
                        $('#c_tributo').blur();
                        $('#periodo').focus();
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 
        }
    });

    $('#c_tipo_doc, #n_documento').focusout(function(){
        if($('#c_tipo_doc').val() && $('#n_documento').val() && !$('#c_tipo_imp').val() && !$('#d_objeto_hecho').val()){
            //BUSQUEDA2_BONIF
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_tipo_documento": $('#c_tipo_doc').val(),
                 "p_n_documento": $('#n_documento').val(),
                 "p_id_contribuyente": $("#id_contribuyente").val(),
                 "p_c_concepto": $('#c_concepto').val(),
                 "id_menu":v_id_menu,
                 "n_orden":1
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        $("#id_contribuyente").val(data.p_id_contribuyente);
                        $('#c_tributo').val(data.p_c_tributo);
                        $('#c_tipo_imp').val(data.p_c_tipo_imponible);
                        $('#d_denominacion').val(data.p_nombres);
                        $('#d_objeto_hecho').val(data.p_objhecho);
                        $('#n_cuit').val(data.p_n_cuit);
                        $("#n_cuit").mask("99-99999999-9");
                        $('#c_tipo_imp').blur();
                        $('#c_tributo').blur();
                        $('#periodo').focus();
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 
        }

        if(!$('#c_tipo_doc').val() && $('#d_tipo_doc').val()){
            $('#d_tipo_doc').val(null);
        }
    });


    $('#btn_detalle').click(function(){
        if(!$("#id_contribuyente").val() || !$('#c_tributo').val() || !$('#d_objeto_hecho').val()){
            mostrar_cuadro('I', 'Información', 'Tributo,Tipo Imponible y Objeto/Hecho no pueden quedar vacíos');
            return;
        } else{
            bloquear_filtros();
            //PRC_BTN_DETALLE_BONIF
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_id_contribuyente": $("#id_contribuyente").val(),
                 "p_c_tributo": $('#c_tributo').val(),
                 "p_c_tipo_imponible": $('#c_tipo_imp').val(),
                 "p_objhecho": $('#d_objeto_hecho').val(),
                 "p_pos_fiscal": $('#periodo').val(),
                 "p_c_concepto": $('#c_concepto').val(),
                 "p_sesion": v_id_sesion,
                 "id_menu":v_id_menu,
                 "n_orden":4
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        v_f_vto_pago = data.p_f_vto_pago;
                        v_f_vto_pres = data.p_f_vto_pres;

                        filtros_no_nativos_ar = [];
                        filtros_arr_main = [];

                        if($('#n_cuit').val() != ''){
                            filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());
                        }
                        if($('#d_denominacion').val() != ''){
                            filtros_arr_main.push('Apellido y Nombre: '+ $('#d_denominacion').val());
                        }
                        if($('#c_tipo_doc').val() != ''){
                            filtros_arr_main.push('Tipo Documento: '+ $('#c_tipo_doc').val());
                        }
                        if($('#n_documento').val() != ''){
                            filtros_arr_main.push('Nro. Documento: '+ $('#n_documento').val());
                        }
                        if($('#d_objeto_hecho').val() != ''){
                            filtros_arr_main.push('Objeto / Hecho: '+ $('#d_objeto_hecho').val());
                        }
                        if($('#c_tipo_imp').val() != ''){
                            filtros_arr_main.push('Tipo Imponible: '+ $('#c_tipo_imp').val());
                        }
                        if($('#c_tributo').val() != ''){
                            filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());
                        }
                        if($('#periodo').val() != ''){
                            filtros_arr_main.push('Periodo: '+ $('#periodo').val());
                        }

                        filtros_no_nativos_ar['detalle_grid'] = filtros_arr_main;

                        setea_parametros('#detalle_grid', {':p_sesion':v_id_sesion});
                        $('#detalle_modal').modal('show');
                        $(window).resize();
                    }
                    else{
                        if(data.p_fallo_validacion == 1){
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                        if(data.p_falla_busqueda == 1){
                            $('#errores').val(data.resultado);
                            $('#errores_modal').modal('show');
                            $(window).resize();
                            return;
                        }
                    }
                }
            }); 
        }
    });

    $('#btn_volver_detalle').click(function(){
        //prc_borrar_tmp_listados
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_sesion": v_id_sesion,
             "id_menu":v_id_menu,
             "n_orden":5
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){

                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });

        $('#detalle_grid').jqGrid("clearGridData");
    });

    $('#btn_volver_errores').click(function(){
        $('#errores').val(null);
    });

    $('#btn_imprimir').click(function(){
        if($('#detalle_grid').getGridParam('records') > 0){
            imprimir_detalle();
        } else{
            mostrar_error('No hay detalle para imprimir', 'E', true);
            return;
        }
    });
};