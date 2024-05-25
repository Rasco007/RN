function inicializarEventos(){

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_sesion": v_id_sesion,
         "id_menu": v_id_menu,
         "n_orden":4
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
    //FUN_GET_ID_SESION
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_tributo": 10,
         "id_menu": v_id_menu,
         "n_orden":5
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
    
    $("#n_cuit").mask("99-99999999-9");

    $('.numerico').keypress(function(tecla){
        if(tecla.charCode<48 || tecla.charCode>57){
            if(tecla.charCode !== 44 && tecla.charCode !== 46){
                return false;
            }
        }
    });

    $('#lupa_d_denominacion').hide();
    $('#mascara_lupa_tipo_doc').hide();
    $('#mascara_lupa_tipo_imp').hide();

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
        id_contribuyente = null;
        $('#id_contribuyente').val(null);

        $('#lupa_d_denominacion').hide();
        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');

        $('#lupa_tipo_doc').show().css('display', 'table-cell');
        $('#mascara_lupa_tipo_doc').hide();

        $('#lupa_tipo_imp').show().css('display', 'table-cell');
        $('#mascara_lupa_tipo_imp').hide();
        desbloquear_filtros_contrib();
    });

    $('#btn_limpiar_gral').click(function(){
        $('#pos_fiscal').val(null);
        $('#cuota').val(null);
        $('#maxmin').val(null);
        desbloquear_filtros_maxmin();
    });

    $('#btn_calculo').click(function(){
        let n_cuit = limpiar_formato_cuit($('#n_cuit').val());

        //prc_calcular_max_min
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_c_tributo": $('#c_tributo').val(),
             "p_c_concepto": $('#c_concepto').val(),
             "p_pos_fiscal": $('#pos_fiscal').val(),
             "p_cuota": $('#cuota').val(),
             "p_nombres": $('#d_denominacion').val(),
             "p_n_cuit": n_cuit,
             "p_objhecho": $('#d_objeto_hecho').val(),
             "p_sesion": v_id_sesion,
             "id_menu":v_id_menu,
             "n_orden":3
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                  $('#maxmin').val(data.p_maxmin);
                  bloquear_filtros();
                  mostrar_cuadro('S', 'Éxito', 'Cálculo finalizado correctamente');
                }
                else{
                    let mensaje_error = data.resultado;
                    if(data.resultado == 'El campo Cuota no puede quedar vacío'){
                        mensaje_error = 'El campo Cuota Anticipo no puede quedar vacío';
                    }
                    mostrar_cuadro('E', 'Error', mensaje_error);
                    bloquear_filtros();
                    return;
                }
            }
        });
    });

    $('#btn_detalle').click(function(){
        $('#main').procOverlay({visible:true});

        filtros_no_nativos_ar = [];
        filtros_arr_main = [];

        if($('#pos_fiscal').val() != ''){
            filtros_arr_main.push('Posición Fiscal: '+ $('#pos_fiscal').val());
        }
        if($('#cuota').val() != ''){
            filtros_arr_main.push('Cuota Anticipo: '+ $('#cuota').val());
        }
        if($('#d_denominacion').val() != ''){
            filtros_arr_main.push('Apellido y Nombre / Razón Social: '+ $('#d_denominacion').val());
        }
        if($('#c_tipo_doc').val() != ''){
            filtros_arr_main.push('Tipo Documento: '+ $('#c_tipo_doc').val());
        }
        if($('#n_documento').val() != ''){
            filtros_arr_main.push('Nro. Documento: '+ $('#n_documento').val());
        }
        if($('#c_tipo_imp').val() != ''){
            filtros_arr_main.push('Tipo Imponible: '+ $('#c_tipo_imp').val());
        }
        if($('#d_objeto_hecho').val() != ''){
            filtros_arr_main.push('Objeto / Hecho: '+ $('#d_objeto_hecho').val());
        }
        if($('#n_cuit').val() != ''){
            filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());
        }

        filtros_no_nativos_ar['detalle_grid'] = filtros_arr_main;

        setea_parametros('#detalle_grid', {':p_sesion':v_id_sesion});
    });

    $('#btn_imprimir').click(function(){
        imprimir_reporte();
    });

    $('#btn_volver_detalle').click(function(){
        //prc_borrar_tmp_listados
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_sesion": v_id_sesion,
             "id_menu": v_id_menu,
             "n_orden":4
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
        $('.ui-search-toolbar').css('display', 'none');
        $('#gs_d_descrip').val(null);
    });

    //VALIDACION DE CAMPOS
    $('#c_tributo').change(function(){
        if($('#c_tributo').val()){
            if($('#c_tributo').val() != 10){
                mostrar_error('El tributo debe ser 10','E', true);
                $('#c_tributo').val(10);
                $('#c_tributo').blur();
            }
        }
    });


    $('#c_concepto').change(function(){
        let c_concepto = $('#c_concepto').val();
        let d_concepto = $('#d_concepto').val();

        if(!c_concepto && d_concepto){
            $('#d_concepto').val(null);
        }
        if($('#c_concepto').val()){
            if($('#c_concepto').val() != 100){
                mostrar_error('Solo corresponde para concepto 100','E',true);
                $('#c_concepto').val(100);
                $('#c_concepto').blur();
            }
        }
    });

    $('#pos_fiscal').change(function(){
        if($('#pos_fiscal').val()){
            if($('#pos_fiscal').val() < 1970){
                mostrar_error('El año debe ser de 1970 en adelante', 'E', true);
                $('#pos_fiscal').val(null);
            }
        }
    });

    $('#cuota').change(function(){
        if($('#cuota').val()){
            if($('#cuota').val() < 1 || $('#cuota').val() > 12){
                mostrar_error('El mes debe estar entre 1 y 12', 'E', true);
                $('#cuota').val(null);
            }
        }
    });

    $('#c_tipo_doc').change(function(){
        if($('#n_documento').val() && $('#c_tipo_doc').val()){
            let n_documento_sin_formato = ($('#n_documento').val()).replace(/\./g, '');
            
            //BUSQUEDA2
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                "p_tipo_documento": $('#c_tipo_doc').val(),
                "p_n_documento": n_documento_sin_formato,
                "p_id_contribuyente": id_contribuyente,
                "p_c_tributo": $('#c_tributo').val(),
                "p_c_concepto": $('#c_concepto').val(),
                "id_menu": v_id_menu,
                "n_orden":1
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        id_contribuyente = data.p_id_contribuyente;
                        $('#d_denominacion').val(data.p_nombres);
                        $('#n_cuit').val(data.p_n_cuit);
                        $("#n_cuit").mask("99-99999999-9");
                        $('#c_tipo_imp').val(data.p_c_tipo_imponible);
                        $('#c_tipo_imp').blur();
                        $('#d_objeto_hecho').val(data.p_objhecho);
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
        

        let c_tipo_doc = $('#c_tipo_doc').val();
        let d_tipo_doc = $('#d_tipo_doc').val();

        if(!c_tipo_doc && d_tipo_doc){
            $('#d_tipo_doc').val(null);
        }
    });

    $('#c_tipo_imp').change(function(){
        if($('#c_tipo_imp').val() && $('#d_objeto_hecho').val()){
            //BUSQUEDA1
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                "p_c_tipo_imponible": $('#c_tipo_imp').val(),
                "p_objhecho": $('#d_objeto_hecho').val(),
                "p_id_contribuyente": id_contribuyente,
                "p_c_tributo": $('#c_tributo').val(),
                "id_menu": v_id_menu,
                "n_orden":0
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        id_contribuyente = data.p_id_contribuyente;
                        $('#d_denominacion').val(data.p_nombres);
                        $('#n_cuit').val(data.p_n_cuit);
                        $("#n_cuit").mask("99-99999999-9");
                        $('#n_documento').val(data.p_n_documento);
                        $('#c_tipo_doc').val(data.p_tipo_documento);
                        $('#c_tipo_doc').blur();
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }

        let c_tipo_imp = $('#c_tipo_imp').val();
        let d_tipo_imp = $('#d_tipo_imp').val();

        if(!c_tipo_imp && d_tipo_imp){
            $('#d_tipo_imp').val(null);
        }
    });

    $('#d_objeto_hecho').change(function(){
        if($('#c_tipo_imp').val() && $('#d_objeto_hecho').val()){
            //BUSQUEDA1
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                "p_c_tipo_imponible": $('#c_tipo_imp').val(),
                "p_objhecho": $('#d_objeto_hecho').val(),
                "p_id_contribuyente": id_contribuyente,
                "p_c_tributo": $('#c_tributo').val(),
                "id_menu": v_id_menu,
                "n_orden":0
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        id_contribuyente = data.p_id_contribuyente;
                        $('#d_denominacion').val(data.p_nombres);
                        $('#n_cuit').val(data.p_n_cuit);
                        $("#n_cuit").mask("99-99999999-9");
                        $('#n_documento').val(data.p_n_documento);
                        $('#c_tipo_doc').val(data.p_tipo_documento);
                        $('#c_tipo_doc').blur();
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        } 

    });

    $('#n_documento').change(function(){
        if($('#n_documento').val() && $('#c_tipo_doc').val()){
            let n_documento_sin_formato = ($('#n_documento').val()).replace(/\./g, '');

            //BUSQUEDA2
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                "p_tipo_documento": $('#c_tipo_doc').val(),
                "p_n_documento": n_documento_sin_formato,
                "p_id_contribuyente": id_contribuyente,
                "p_c_tributo": $('#c_tributo').val(),
                "p_c_concepto": $('#c_concepto').val(),
                "id_menu": v_id_menu,
                "n_orden":1
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        id_contribuyente = data.p_id_contribuyente;
                        $('#d_denominacion').val(data.p_nombres);
                        $('#n_cuit').val(data.p_n_cuit);
                        $("#n_cuit").mask("99-99999999-9");
                        $('#c_tipo_imp').val(data.p_c_tipo_imponible);
                        $('#c_tipo_imp').blur();
                        $('#d_objeto_hecho').val(data.p_objhecho);
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 
        }
    });

    $('#n_cuit').change(function(){
        if($('#n_cuit').val()){
            if(!fun_valida_cuit($('#n_cuit').val())){
                mostrar_error('El campo CUIT debe tener el formato 99-99999999-9', 'E', true);
            } else{
                let n_cuit = limpiar_formato_cuit($('#n_cuit').val());
                //BUSQUEDA3
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                     "p_n_cuit": n_cuit,
                     "p_id_contribuyente": id_contribuyente,
                     "p_c_tributo": $('#c_tributo').val(),
                     "p_c_concepto": $('#c_concepto').val(),
                     "id_menu": v_id_menu,
                     "n_orden":2
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                          id_contribuyente = data.p_id_contribuyente;
                          $('#d_denominacion').val(data.p_nombres);
                          $('#n_cuit').val(data.p_n_cuit);
                          $("#n_cuit").mask("99-99999999-9");
                          $('#c_tipo_imp').val(data.p_c_tipo_imponible);
                          $('#c_tipo_imp').blur();
                          $('#d_objeto_hecho').val(data.p_objhecho);
                          $('#c_tipo_doc').val(data.p_tipo_documento);
                          $('#c_tipo_doc').blur();
                          $('#n_documento').val(data.p_n_documento);
                        }
                        else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                });
            }
        }
    })
}