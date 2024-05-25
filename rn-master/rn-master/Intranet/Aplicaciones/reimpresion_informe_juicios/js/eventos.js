function inicializarEventos(){
    
    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    $("#n_cuit").mask("99-99999999-9");

    $('#lupa_d_denominacion').hide();

    $('.numerico').keypress(function(tecla){
        if(tecla.charCode<48 || tecla.charCode>57){
            if(tecla.charCode !== 44 && tecla.charCode !== 46){
                return false;
            }
        }
    });

    $('#btn_limpiar').click(function(){
        $('#n_cuit').val(null);
        $('#d_denominacion').val(null);
        $('#boleta_deuda').val(null);
        $('#expediente').val(null);
        $('#n_cuit_filtro').val(null);
        $('#lupa_d_denominacion').hide();
        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
    })


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


    $('#check_crear_pdf').change(function(){
        if(p_chk_crear_pdf == 'N'){
            p_chk_crear_pdf = 'S';
        } else{
            p_chk_crear_pdf = 'N';
        }    
    });

    $('#btn_liq_original').click(function(){
        if($('#boleta_deuda').val()){
            let v_patrocinante;
            let v_representante;
            //valida_juicio_cerrado
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_id_boleta_deuda": $('#boleta_deuda').val(),
                 "p_masivo": v_masivo,
                 "id_menu":v_id_menu,
                 "n_orden":0
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        //es_instancia_pagada
                        $.ajax({
                            type:'POST',
                            url: FUNCIONES_BASEPATH+'maestro_abm.php',
                            data:{      
                             "p_id_boleta_deuda": $('#boleta_deuda').val(),
                             "id_menu":v_id_menu,
                             "n_orden":1
                            },
                            dataType:'json',
                            success: function( data ) {
                                if(data.resultado == 'OK'){
                                  if(data.retorno == 'S'){
                                    mostrar_cuadro('I', 'Información', 'Esta boleta de juicio se encuentra PAGADA. Se emitirá la liquidación original enviada a Juicio');
                                  }

                                  //imprimir_reporte_liq_normal
                                  $.ajax({
                                    type:'POST',
                                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                                    data:{      
                                     "p_chk_crear_pdf": p_chk_crear_pdf,
                                     "p_id_boleta_deuda": $('#boleta_deuda').val(),
                                     "id_menu":v_id_menu,
                                     "n_orden":2
                                    },
                                    dataType:'json',
                                    success: function( data ) {
                                        if(data.resultado == 'OK'){
                                          
                                          if(p_chk_crear_pdf == 'S'){
                                            v_patrocinante = data.p_patrocinante;
                                            v_representante = data.p_representante;
                                          }

                                          let parametros = 'P_ID_BOLETA_DEUDA|' + $('#boleta_deuda').val() + 
                                                             '&P_VERIFICACION_TARDIA|' + 'N'; 
                            
                                          llamar_report('COFL052', parametros, 'PDF');
                                        }
                                        else{
                                            mostrar_cuadro('E', 'Error', data.resultado);
                                            return;
                                        }
                                    }
                                }); 
                                }
                                else{
                                    mostrar_cuadro('E', 'Error', data.resultado);
                                    return;
                                }
                            }
                        }); 
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 
        } else{
            mostrar_error('El campo Boleta de Deuda no puede quedar vacío','E',true);
        }
    });

    $('#btn_demanda_bco').click(function(){
        let v_patrocinante;
        let v_representante;
        let v_boton;
        let v_tributo;

        if($('#boleta_deuda').val()){
            let n_cuit = limpiar_formato_cuit($('#n_cuit').val());

            //prc_btn_demanda_bco
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                "p_id_boleta_deuda": $('#boleta_deuda').val(),
                "p_n_cuit": n_cuit,
                "p_chk_crear_pdf": p_chk_crear_pdf,
                "p_masivo": v_masivo,
                "id_menu":v_id_menu,
                "n_orden":3
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                    v_patrocinante = data.p_patrocinante;
                    v_representante = data.p_representante;
                    v_boton = data.p_boton;
                    v_tributo = data.p_tributo;

                    imprimir_demanda(v_patrocinante, v_representante, v_boton, v_tributo);

                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 
        } else{
            mostrar_error('El campo Boleta de Deuda no puede quedar vacío','E',true);
        }

        
    });

    $('#btn_demanda_bs').click(function(){
        let v_patrocinante;
        let v_representante;
        let v_boton;
        let v_tributo;

        if($('#boleta_deuda').val()){
            let n_cuit = limpiar_formato_cuit($('#n_cuit').val());

            //prc_btn_demanda_bs
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                "p_id_boleta_deuda": $('#boleta_deuda').val(),
                "p_n_cuit": n_cuit,
                "p_chk_crear_pdf": p_chk_crear_pdf,
                "p_masivo": v_masivo,
                "id_menu":v_id_menu,
                "n_orden":4
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        v_patrocinante = data.p_patrocinante;
                        v_representante = data.p_representante;
                        v_boton = data.p_boton;
                        v_tributo = data.p_tributo;

                        imprimir_demanda(v_patrocinante, v_representante, v_boton, v_tributo);
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        } else{
            mostrar_error('El campo Boleta de Deuda no puede quedar vacío','E',true);
        }
    });

    $('#btn_demanda_inh').click(function(){
        let v_patrocinante;
        let v_representante;
        let v_boton;
        let v_tributo;

        if($('#boleta_deuda').val()){
            let n_cuit = limpiar_formato_cuit($('#n_cuit').val());

            //prc_btn_demanda_inh
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                "p_id_boleta_deuda": $('#boleta_deuda').val(),
                "p_n_cuit": n_cuit,
                "p_chk_crear_pdf": p_chk_crear_pdf,
                "p_masivo": v_masivo,
                "id_menu":v_id_menu,
                "n_orden":5
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        
                        v_patrocinante = data.p_patrocinante;
                        v_representante = data.p_representante;
                        v_boton = data.p_boton;
                        v_tributo = data.p_tributo;

                        imprimir_demanda(v_patrocinante, v_representante, v_boton, v_tributo);
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        } else{
            mostrar_error('El campo Boleta de Deuda no puede quedar vacío','E',true);
        } 
    });

    $('#btn_datos_ad').click(function(){
        let n_cuit = limpiar_formato_cuit($('#n_cuit').val());

        let parametros = 'P_ID_BOLETA_DEUDA|' + $('#boleta_deuda').val() + 
                         '&P_CUIT_ENVIADO_JUICIO|' + n_cuit +
                         '&P_F_ENVIO_JUICIO|' + fecha_envio; 
                            
        llamar_report('COFL053', parametros, 'PDF');
    });

    $('#btn_datos_ref').click(function(){
        let parametros = 'p_id_contribuyente|' + id_contribuyente;
        llamar_report('CONTL_037', parametros, 'PDF');
    });


    $('#n_cuit').change(function(){
        if($('#n_cuit').val()){
            validar_cuit();
        }
    });

    $('#expediente').change(function(){
        if($('#expediente').val()){
            validar_expediente();
        }
    });

    $('#boleta_deuda').change(function(){
        if($('#boleta_deuda').val()){
            validar_id_boleta_deuda();
        }
    });

    $('#btn_liq_act').click(function(){
        //valida_juicio_cerrado
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_id_boleta_deuda": $('#boleta_deuda').val(),
             "p_masivo": 'N',
             "id_menu":v_id_menu,
             "n_orden":0
            },
            dataType:'json',
            success: function( data ){
                if(data){
                    if(data.resultado === 'OK'){
                        //valida_print_liq_act
                        $.ajax({
                            type:'POST',
                            url: FUNCIONES_BASEPATH+'maestro_abm.php',
                            data:{
                                "p_f_confirmacion": f_confirmacion,
                                "p_f_actualizacion": $('#f_actualizacion').val(),
                                "p_fecha_envio": fecha_envio,
                                "p_id_boleta_deuda": $('#boleta_deuda').val(),
                                "id_menu":v_id_menu,
                                "n_orden":9
                            },
                            dataType:'json',
                            success: function( data ) {
                                if(data.resultado === 'OK'){
                                    imprimir_liq_act();
                                }
                                else{
                                    mostrar_cuadro('E', 'Error', data.resultado);
                                }
                            }
                        });
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                    }
                }else{
                    mostrar_cuadro('E', 'Error', 'El juicio debe estar CONFIRMADO para poder emitir una liquidación actualizada');
                }
            }
        }); 
    });

    $('#btn_inf_obl_juicio').click(function(){
        let valido = valida_inf_juicio();
        if(valido){
            imprimir_inf_juicio();
        }
    });


    $('#f_actualizacion').focusout(function(){
        if($('#f_actualizacion').val()){
            fecha_en_rango();
        }
    })
}