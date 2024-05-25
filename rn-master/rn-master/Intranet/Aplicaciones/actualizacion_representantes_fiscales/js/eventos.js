function inicializarEventos(){
    $('#btn_buscar').click(function(){
        grilla_cargada = true;
        let valido = validar_busqueda();
        if(valido){
            let n_cuit = limpiar_formato_cuit($('#n_cuit').val());

            filtros_no_nativos_ar = [];
            filtros_arr_main = [];

            if($('#n_cuit').val() != ''){
                filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());
            }
            if($('#d_denominacion').val() != ''){
                filtros_arr_main.push('Denominación: '+ $('#d_denominacion').val());
            }
            if($('#c_tipo_representante').val() != ''){
                filtros_arr_main.push('Tipo Representante: '+ $('#c_tipo_representante').val());
            }
            if($('#c_circun').val() != ''){
                filtros_arr_main.push('Circunscripción: '+ $('#c_circun').val());
            }
            if($('#d_juzgado').val() != ''){
                filtros_arr_main.push('Juzgado: '+ $('#d_juzgado').val());
            }
            if($('#c_provincia').val() != ''){
                filtros_arr_main.push('Provincia: '+ $('#c_provincia').val());
            }
            if($('#c_depto').val() != ''){
                filtros_arr_main.push('Departamento: '+ $('#c_depto').val());
            }
            if($('#c_localidad').val() != ''){
                filtros_arr_main.push('Localidad: '+ $('#c_localidad').val());
            }
            if($('#c_postal').val() != ''){
                filtros_arr_main.push('Código Postal: '+ $('#c_postal').val());
            }
            if($('#c_patrocinante').val() != ''){
                filtros_arr_main.push('Patrocinante: '+ $('#c_patrocinante').val());
            }
            if($('#c_baja').val() != ''){
                filtros_arr_main.push('Baja: '+ $('#c_baja').val());
            }

            filtros_no_nativos_ar['asesores_legales_grid'] = filtros_arr_main;

            setea_parametros('#asesores_legales_grid', {'p_n_cuit': n_cuit,
                                                        'p_d_denominacion': $('#d_denominacion').val(),
                                                        'p_c_tipo_representante': $('#c_tipo_representante').val(),
                                                        'p_c_circunscripcion': $('#c_circun').val(),
                                                        'p_d_juzgado': $('#d_juzgado').val(),
                                                        'p_c_provincia': $('#c_provincia').val(),
                                                        'p_c_departamento': $('#c_depto').val(),
                                                        'p_c_localidad': $('#c_localidad').val(),
                                                        'p_c_patrocinante': $('#c_patrocinante').val(),
                                                        'p_c_baja': $('#c_baja').val()
                                                    });
        }
    });

    $("#n_cuit").mask("99-99999999-9");
    $("#n_cuit_modal").mask("99-99999999-9");
    $('#lupa_d_denominacion').hide();
    $('#mascara_lupa_circunscripcion').hide();
    $('#mascara_lupa_provincia').hide();
    $('#mascara_lupa_localidad').hide();
    $('#mascara_lupa_depto').hide();

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


    $('#btn_guardar_modal').click(function(){
        let d_denominacion = $('#d_denominacion_modal').val();
        let c_tipo_representante = $('#c_tipo_representante_modal').val();
        let c_circunscripcion = $('#c_circun_modal').val();
        let d_juzgado = $('#d_juzgado_modal').val();
        let c_provincia = $('#c_provincia_modal').val();
        let c_departamento = $('#c_depto_modal').val();
        let c_localidad = $('#c_localidad_modal').val();
        let c_postal = $('#c_postal_modal').val();
        let c_patrocinante = $('#c_patrocinante_modal').val();
        let c_baja = $('#c_baja_modal').val();
        let d_domicilio = $('#d_domicilio_modal').val();
        let n_telefono = $('#n_telefono_modal').val();
        let d_mail = $('#d_mail_modal').val();
        let d_colegio = $('#d_colegio_modal').val();
        let d_tomo = $('#d_tomo_modal').val();
        let d_folio = $('#d_folio_modal').val();
        let n_cuit = limpiar_formato_cuit($('#n_cuit_modal').val())
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_n_cuit": n_cuit,
             "p_d_denominacion": $('#d_denominacion_modal').val(),
             "p_c_tipo_representante": $('#c_tipo_representante_modal').val(),
             "p_c_circunscripcion": $('#c_circun_modal').val(),
             "p_d_juzgado": $('#d_juzgado_modal').val(),
             "p_c_provincia": $('#c_provincia_modal').val(),
             "p_c_departamento": $('#c_depto_modal').val(),
             "p_c_localidad": $('#c_localidad_modal').val(),
             "p_c_postal": $('#c_postal_modal').val(),
             "p_c_patrocinante": $('#c_patrocinante_modal').val(),
             "p_c_baja": $('#c_baja_modal').val(),
             "p_d_domicilio": $('#d_domicilio_modal').val(),
             "p_n_telefono": $('#n_telefono_modal').val(),
             "p_d_mail": $('#d_mail_modal').val(),
             "p_d_colegio": $('#d_colegio_modal').val(),
             "p_d_tomo": $('#d_tomo_modal').val(),
             "p_d_folio": $('#d_folio_modal').val(),
             "p_oper": v_oper,
             "id_menu":v_id_menu,
             "n_orden":0
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                  let accion;
                  if(v_oper == 'add'){
                    accion = 'Alta';
                  }
                  else if(v_oper == 'edit'){
                    accion = 'Modificación';
                  }
                  let n_cuit = limpiar_formato_cuit($('#n_cuit_modal').val());

                  filtros_no_nativos_ar = [];
                    filtros_arr_main = [];

                    if($('#n_cuit_modal').val() != ''){
                        filtros_arr_main.push('CUIT: '+ $('#n_cuit_modal').val());
                    }
                    if($('#d_denominacion_modal').val() != ''){
                        filtros_arr_main.push('Denominación: '+ $('#d_denominacion_modal').val());
                    }
                    if($('#c_tipo_representante_modal').val() != ''){
                        filtros_arr_main.push('Tipo Representante: '+ $('#c_tipo_representante_modal').val());
                    }
                    if($('#c_circun_modal').val() != ''){
                        filtros_arr_main.push('Circunscripción: '+ $('#c_circun_modal').val());
                    }
                    if($('#d_juzgado_modal').val() != ''){
                        filtros_arr_main.push('Juzgado: '+ $('#d_juzgado_modal').val());
                    }
                    if($('#c_provincia_modal').val() != ''){
                        filtros_arr_main.push('Provincia: '+ $('#c_provincia_modal').val());
                    }
                    if($('#c_depto_modal').val() != ''){
                        filtros_arr_main.push('Departamento: '+ $('#c_depto_modal').val());
                    }
                    if($('#c_localidad_modal').val() != ''){
                        filtros_arr_main.push('Localidad: '+ $('#c_localidad_modal').val());
                    }
                    if($('#c_postal_modal').val() != ''){
                        filtros_arr_main.push('Código Postal: '+ $('#c_postal_modal').val());
                    }
                    if($('#c_patrocinante_modal').val() != ''){
                        filtros_arr_main.push('Patrocinante: '+ $('#c_patrocinante_modal').val());
                    }
                    if($('#c_baja_modal').val() != ''){
                        filtros_arr_main.push('Baja: '+ $('#c_baja_modal').val());
                    }

                    filtros_no_nativos_ar['asesores_legales_grid'] = filtros_arr_main;
                
                  grilla_cargada = true;
                  setea_parametros('#asesores_legales_grid', {'p_n_cuit': n_cuit,
                                                        'p_d_denominacion': d_denominacion,
                                                        'p_c_tipo_representante': c_tipo_representante,
                                                        'p_c_circunscripcion': c_circunscripcion,
                                                        'p_d_juzgado': d_juzgado,
                                                        'p_c_provincia': c_provincia,
                                                        'p_c_departamento': c_departamento,
                                                        'p_c_localidad': c_localidad,
                                                        'p_c_patrocinante': c_patrocinante,
                                                        'p_c_baja': c_baja 
                                                    });
                  $('#modal_abm_asesor').modal('hide');
                  mostrar_cuadro('S', 'Exito', accion+' Finalizada Correctamente');
                  limpiar_modal_abm();
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    })

    $('#btn_cancelar_modal').click(function(){
        limpiar_modal_abm();
    })

    $('#btn_limpiar').click(function(){
        $('#n_cuit').val(null);
        $('#d_denominacion').val(null);
        $('#c_circun').val(null);
        $('#d_circun').val(null);
        $('#c_provincia').val(null);
        $('#d_provincia').val(null);
        $('#c_depto').val(null);
        $('#d_depto').val(null);
        $('#c_localidad').val(null);
        $('#d_localidad').val(null);
        $('#c_tipo_representante').val(null);
        $('#d_juzgado').val(null);
        $('#c_patrocinante').val(null);
        $('#c_baja').val(null);
        $('#c_postal').val(null);
       
        $('#asesores_legales_grid').clearGridData();

        $('#lupa_d_denominacion').hide();
        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');

        desbloquear_filtros();
        grilla_cargada = false;
        filtros_no_nativos_ar['asesores_legales_grid'] = [];
    });
    
    $('#n_cuit').change(function(){
        if($('#n_cuit').val()){
            let n_cuit = limpiar_formato_cuit($('#n_cuit').val());
            //PRC_VALIDAR_CUIT_CONSULTA
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_n_cuit": n_cuit,
                 "id_menu":v_id_menu,
                 "n_orden":1
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        $('#d_denominacion').val(data.p_d_denominacion);
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    $('#n_cuit_modal').change(function(){
        if($('#n_cuit_modal').val() && v_oper == 'add'){
            let n_cuit = limpiar_formato_cuit($('#n_cuit_modal').val());
            //valida_existencia_cuit
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_n_cuit": n_cuit,
                 "p_no_valido": null,
                 "id_menu":v_id_menu,
                 "n_orden":2
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
        }
    });

    $('#d_denominacion').focusout(function(){
        if($('#d_denominacion').val()){
            //PRC_VALIDA_DENOM_CONSULTA
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_d_denominacion": $('#d_denominacion').val(),
                 "id_menu":v_id_menu,
                 "n_orden":3
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                       $('#n_cuit').val(data.p_n_cuit);
                       $("#n_cuit").mask("99-99999999-9");

                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 
        }
    });

    $('#c_provincia').focusout(function(){
        if(!$('#c_provincia').val()){
            $('#c_depto').val('');
            $('#d_depto').val('');
            $('#c_localidad').val('');
            $('#d_localidad').val('');
        }
        if($('#c_depto').val()){
            $('#c_depto').val('');
            $('#d_depto').val('');
        }
        if($('#c_localidad').val()){
            $('#c_localidad').val('');
            $('#d_localidad').val('');
        }
    });


    $('#c_depto').focusout(function(){
        if(!$('#c_depto').val()){
            $('#d_depto').val('');
            $('#c_localidad').val('');
            $('#d_localidad').val('');
        }

        if($('#c_localidad').val()){
            $('#c_localidad').val('');
            $('#d_localidad').val('');
        }
    });

    $('#c_provincia_modal').focusout(function(){
        if(!$('#c_provincia_modal').val()){
            $('#d_provincia_modal').val('');
            $('#c_depto_modal').val('');
            $('#d_depto_modal').val('');
            $('#c_localidad_modal').val('');
            $('#d_localidad_modal').val('');
        }

        if($('#c_depto_modal').val()){
            $('#c_depto_modal').val('');
            $('#d_depto_modal').val('');
        }
        if($('#c_localidad_modal').val()){
            $('#c_localidad_modal').val('');
            $('#d_localidad_modal').val('');
        }
    });

    $('#c_depto_modal').focusout(function(){
        if(!$('#c_depto_modal').val()){
            $('#d_depto_modal').val('');
            $('#c_localidad_modal').val('');
            $('#d_localidad_modal').val('');
        }

        if($('#c_localidad_modal').val()){
            $('#c_localidad_modal').val('');
            $('#d_localidad_modal').val('');
        }
    });

    $('#c_circun_modal').focusout(function(){
        if(!$('#c_circun_modal').val()){
            $('#d_circun_modal').val('');
        }
    })

    $('.numerico').keypress(function(tecla){
        if(tecla.charCode<48 || tecla.charCode>57){
            if(tecla.charCode !== 44 && tecla.charCode !== 46){
                return false;
            }
        }
    });
}
