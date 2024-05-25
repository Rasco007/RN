function inicializarEventos(){

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{

            "id_menu":p_id_menu,
            "n_orden":18
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

    $('#d_estado').val('INGRESADO');

    $('#f_acred').datepicker("option",'minDate',fecha_hoy).change(function () { 
        let fechaMenosUnAnio = calcular_fecha();
        
        if($('#f_acred').val() && $('#f_pago').val()){
            if($.datepicker.parseDate('dd/mm/yy', $('#f_acred').val()) < $.datepicker.parseDate('dd/mm/yy', $('#f_pago').val())){
                mostrar_error('La Fecha de Acreditación debe ser Mayor a la Fecha de Pago', 'E', true);
                $('#f_acred').val('');
                return;
            }
        }

        if($.datepicker.parseDate('dd/mm/yy', $('#f_acred').val()) < $.datepicker.parseDate('dd/mm/yy', fechaMenosUnAnio)){
            mostrar_cuadro('Q', 'Confirmación',
                            "La fecha Ingresada no corresponde al año vigente. ¿Desea Continuar?",
                            function(){
                            },
                            function(){
                                $('#f_acred').val('');
                            }, 500);
        }  
    });

    $('#f_pago').datepicker("option",'minDate',fecha_hoy).change(function () {
        let fechaMenosUnAnio = calcular_fecha();
        
        if($('#f_acred').val() && $('#f_pago').val()){
            if($.datepicker.parseDate('dd/mm/yy', $('#f_acred').val()) < $.datepicker.parseDate('dd/mm/yy', $('#f_pago').val())){
                mostrar_error('La Fecha de Acreditación debe ser Mayor a la Fecha de Pago', 'E', true);
                $('#f_pago').val('');
                return;
            }

            let fechaMenosDiezDias = calcular_fecha_menos_diez_dias($('#f_acred').val());
            if($.datepicker.parseDate('dd/mm/yy', $('#f_pago').val()) < $.datepicker.parseDate('dd/mm/yy', fechaMenosDiezDias)){
                mostrar_cuadro('Q', 'Confirmación',
                            "¿Esta seguro que la Fecha Ingresada es Correcta??",
                            function(){
                            },
                            function(){
                                $('#f_pago').val('');
                            }, 500);
            }
        }
        

        if ($.datepicker.parseDate('dd/mm/yy', $('#f_pago').val()) > $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){             
            mostrar_error('La fecha ingresada no puede ser mayor a la actual', 'E', true);             
            $('#f_pago').val(fecha_hoy);             
            return;         
        }
        
        if($.datepicker.parseDate('dd/mm/yy', $('#f_pago').val()) < $.datepicker.parseDate('dd/mm/yy', fechaMenosUnAnio)){
            mostrar_cuadro('Q', 'Confirmación',
                            "La fecha Ingresada no corresponde al año vigente,Desea Continuar?",
                            function(){
                            },
                            function(){
                                $('#f_pago').val('');
                            }, 500);
        }
    });
    
    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");



    $('#btn_buscar').click(function(){
        let f_acred = $('#f_acred').val();
        let f_pago = $('#f_pago').val();
        let c_banco = $('#c_banco').val();
        let c_sucursal = $('#c_sucursal').val();

        //valido contiene un booleano en su primera posición y, en caso de no ser valido, un mensaje de error en su segunda posicion
        let valido = valida_nulo_datos_banco(c_banco, c_sucursal, f_acred, f_pago);
        if(valido[0]){
            $('#main').procOverlay({visible:true});
            remesas_cargadas = true;

            filtros_arr_remesas = [];
            filtros_no_nativos_ar = [];
            
            if($('#c_banco').val()){
                filtros_arr_remesas.push('Banco: '+ $('#c_banco').val());
            }
            if($('#c_sucursal').val()){
                filtros_arr_remesas.push('Sucursal: '+ $('#c_sucursal').val());
            }
            if($('#f_acred').val()){
                filtros_arr_remesas.push('F. Acreditación: '+ $('#f_acred').val());
            }
            if($('#f_pago').val()){
                filtros_arr_remesas.push('F. Pago: '+ $('#f_pago').val());
            }
            filtros_no_nativos_ar['remesas_grid'] = filtros_arr_remesas;

            setea_parametros('#remesas_grid', {'p_c_banco':c_banco,
                                                'p_c_sucursal':c_sucursal,
                                                'p_f_acred':f_acred,
                                                'p_f_pago':f_pago});
        } else{
            mostrar_cuadro('I', 'Informaci&oacute;n', valido[1]);
        }

    });

    $('#btn_limpiar').click(function(){
        $('#c_banco').val('');
        $('#d_banco').val('');
        $('#c_sucursal').val('');
        $('#d_sucursal').val('');
        $('#f_acred').val('');
        $('#f_pago').val('');
        $('#n_remesa').val('');
        $('#n_cant_total').val('');
        $('#i_importe_total').val('');
        $('#d_estado').val('');
        $('#barra').val('');
        $('#d_responsable').val('');
        $('#n_comp').val('');
        $('#c_impuesto_form').val('');
        $('#tipo_comp').val('');
        $('#i_pagado').val('');
        $('#d_objeto_hecho').val('');
        $('#n_anio').val('');
        $('#n_cuota').val('');
        $('#i_tasa').val('');
        $('#f_vto').val('');
        $('#f_vto2').val('');
        $('#i_importe1').val('');
        $('#i_importe2').val('');
        $('#i_retenciones').val('');
        
        $('#c_banco').prop('disabled', false);
        $('#c_sucursal').prop('disabled', false);
        $('#f_acred').prop('disabled', false);
        $('#f_pago').prop('disabled', false);

       
       
        $('#c_tipo_registro').prop('disabled', true);

        $('#bloque_consulta').prop('hidden', true);

        desbloquear_filtros();

        remesas_cargadas = false;
        grilla_cargada = false;
        $('#consulta_grid').jqGrid("clearGridData");
        $('#btn_grabar').prop('disabled', false);
        activar_botones();
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             
             "id_menu":p_id_menu,
             "n_orden":18
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
    });

    $('#btn_aceptar_remesas').click(function(){
        if($('#remesas_grid').getGridParam('selrow')){
            if(grilla_cargada){
                $('#consulta_grid').jqGrid("clearGridData");
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                     
                     "id_menu":p_id_menu,
                     "n_orden":18
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
            
            let rowid = $('#remesas_grid').getGridParam('selrow');
            //verificar_estado_remesa
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_n_remesa":$('#remesas_grid').getCell(rowid, 'n_remesa'),
                 "p_c_banco":$('#c_banco').val(),
                 "p_c_sucursal":$('#c_sucursal').val(),
                 "p_f_acred": $('#f_acred').val(),
                 "p_f_pago": $('#f_pago').val(),
                 "id_menu":p_id_menu,
                 "n_orden":16
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                      if(data.retorno == 1){
                        preparar_nueva_carga();
                        mostrar_error('La remesa ya esta imputada total o parcialmente','E',true);
                      }
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
            //buscar_datos_consulta
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_remito": $('#remesas_grid').getCell(rowid, 'n_remesa'),
                 "p_c_banco": $('#c_banco').val(),
                 "p_c_sucursal": $('#c_sucursal').val(),
                 "p_f_acred": $('#f_acred').val(),
                 "p_f_pago": $('#f_pago').val(),
                 "id_menu":p_id_menu,
                 "n_orden":15
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                      if(data.p_c_estado == '3'){
                        $('#btn_grabar').prop('disabled', false);
                        desactivar_botones();
                      }else{
                        activar_botones();
                        $('#btn_grabar').prop('disabled', true);
                      }
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
            //calcular_totales
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_tot_pie_tasa":0,
                 "p_tot_pie_retenciones":0,
                 "p_n_cantidad_total":0,
                 "p_i_importe_total":0,
                 "id_menu":p_id_menu,
                 "n_orden":17
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

            $('#remesas_modal').modal('hide');

            $('#n_remesa').val($('#remesas_grid').getCell(rowid, 'n_remesa'));
            $('#n_cant_total').val($('#remesas_grid').getCell(rowid, 'n_cantidad_remesa'));
            $('#i_importe_total').val($('#remesas_grid').getCell(rowid, 'i_total'));
            $('#d_estado').val($('#remesas_grid').getCell(rowid, 'd_estado_remesa'));

            filtros_arr_main = [];
            filtros_no_nativos_ar = [];

              
            
            if($('#c_banco').val()){
                filtros_arr_main.push('Banco: '+ $('#c_banco').val());
            }
            if($('#c_sucursal').val()){
                filtros_arr_main.push('Sucursal: '+ $('#c_sucursal').val());
            }
            if($('#f_acred').val()){
                filtros_arr_main.push('F. Acreditación: '+ $('#f_acred').val());
            }
            if($('#f_pago').val()){
                filtros_arr_main.push('F. Pago: '+ $('#f_pago').val());
            }
            filtros_no_nativos_ar['consulta_grid'] = filtros_arr_main;

            setea_parametros('#consulta_grid');
            $('#bloque_consulta').prop('hidden', false);
            $(window).resize();
            grilla_cargada = true;
            $('#remesas_grid').jqGrid("clearGridData");

            $('#c_banco').prop('disabled', true);
            $('#c_sucursal').prop('disabled', true);
            $('#f_acred').prop('disabled', true);
            $('#f_pago').prop('disabled', true);

            $('#barra').prop('disabled', false);
            $('#n_comp').prop('disabled', false);
            $('#i_pagado').prop('disabled', false);
            $('#i_retenciones').prop('disabled', false);
            $('#c_tipo_registro').prop('disabled', false);

            $('#barra').focus();

        } else{
            
            mostrar_cuadro('I', 'Informaci&oacute;n', 'Debe seleccionar una Remesa Asociada');
        }
    });

    $('#barra').focusout(function(){
        //PRC_VALIDAR_BARRA
        let f_acred = $('#f_acred').val();
        let f_pago = $('#f_pago').val();
        let c_banco = $('#c_banco').val();
        let c_sucursal = $('#c_sucursal').val();
      
        //let valido = valida_nulo_datos_banco(c_banco, c_sucursal, f_acred, f_pago);
        //if(valido[0]){
            if($('#barra').val()){
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                    "p_barra": $('#barra').val(),
                    "p_c_banco": $('#c_banco').val(),
                    "p_c_sucursal": $('#c_sucursal').val(),
                    "p_f_acred": $('#f_acred').val(),
                    "p_f_pago": $('#f_pago').val(),
                    "p_c_impuesto_form": null,
                    "p_tipo_comp":null,
                    "p_n_comp":null,
                    "p_i_pagado":null,
                    "p_i_retenciones":null,
                    "p_f_vto":null,
                    "p_f_vto2":null,
                    "p_i_importe2":null,
                    "p_i_importe1":null,
                    "p_i_tasa":null,
                    "p_dias_vto2":null,
                    "p_imp_recargo":null,
                    "p_n_anio":null,
                    "p_n_cuota":null,
                    "p_c_tipo_registro":null,
                    "p_tot_pie_tasa":null,
                    "p_n_cantidad_total":null,
                    "p_tot_pie_retenciones":null,
                    "p_i_importe_total":null,
                    "p_n_remito": $('#n_remesa').val(),
                    "p_d_objeto_hecho":null,
                    "p_dig_ver":null,
                    "id_menu":p_id_menu,
                    "n_orden":23
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                        //cargar_bloque_pago(data,'BARRA');
                        $('#n_comp').val(data.p_n_comp);
                        $('#d_responsable').val(data.p_d_responsable);
                        $('#c_impuesto_form').val(data.p_c_impuesto_form);
                        $('#tipo_comp').val(data.p_tipo_comp);
                        $('#i_pagado').val(data.p_i_pagado);
                        $('#i_tasa').val(data.p_i_tasa);
                        $('#f_vto').val(data.p_f_vto);
                        $('#i_importe1').val(data.p_i_importe1);
                        $('#n_cant_total').val(data.p_n_cantidad_total);
                        $('#i_importe_total').val(data.p_i_importe_total);
                        $('#i_importe2').val(data.p_i_importe2);
                        $('#f_vto2').val(data.p_f_vto2);
                        $('#i_retenciones').val(data.p_i_retenciones);
                        $('#n_anio').val(data.p_n_anio);
                        $('#n_cuota').val(data.p_n_cuota);
                        $('#d_objeto_hecho').val(data.p_d_objeto_hecho);
                        if(data.p_alerta){
                            mostrar_cuadro('Q', 'Confirmación',data.p_alerta,
                                            function(){
                                            },
                                            function(){
                                                mostrar_cuadro('I', 'Informaci&oacute;n', 'La carga del comprobante ha sido cancelada');
                                            }, 500);
                        }
                        //limpiar_datos_pago();

                        filtros_arr_main = [];
                        filtros_no_nativos_ar = [];

                            
                            
                        if($('#c_banco').val()){
                            filtros_arr_main.push('Banco: '+ $('#c_banco').val());
                        }
                        if($('#c_sucursal').val()){
                            filtros_arr_main.push('Sucursal: '+ $('#c_sucursal').val());
                        }
                        if($('#f_acred').val()){
                            filtros_arr_main.push('F. Acreditación: '+ $('#f_acred').val());
                        }
                        if($('#f_pago').val()){
                            filtros_arr_main.push('F. Pago: '+ $('#f_pago').val());
                        }
                        filtros_no_nativos_ar['consulta_grid'] = filtros_arr_main;
                        setea_parametros('#consulta_grid');
                        }
                        else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                }); 
            }        
        /*}else{
                mostrar_error(valido[1], 'E', true);
            }*/

    });

    $('#btn_ok').click(function(){
        if($('#c_banco').val() == ''){
            mostrar_cuadro('E', 'Error', 'Debe ingresar un banco.');

        } else if($('#c_sucursal').val() == ''){
            mostrar_cuadro('E', 'Error', 'Debe ingresar una sucursal.');

        }else if($('#f_acred').val() == ''){
            mostrar_cuadro('E', 'Error', 'Debe ingresar una fecha de Acreditación.');

        }else if($('#f_pago').val() == ''){
            mostrar_cuadro('E', 'Error', 'Debe ingresar una fecha de Pago.');

        }else if($('#i_pagado').val() == ''){
            mostrar_cuadro('E', 'Error', 'Debe ingresar un importe de Pago.');

        }else
        if($('#barra').val() || $('#n_comp').val()){
            //prc_valida_ok
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                "p_barra": $('#barra').val(),
                "p_c_banco": $('#c_banco').val(),
                "p_c_sucursal": $('#c_sucursal').val(),
                "p_f_acred": $('#f_acred').val(),
                "p_f_pago": $('#f_pago').val(),
                "p_c_impuesto_form": $('#c_impuesto_form').val(),
                "p_tipo_comp":$('#tipo_comp').val(),
                "p_n_comp":$('#n_comp').val(),
                "p_i_pagado":$('#i_pagado').val(),
                "p_i_retenciones":$('#i_retenciones').val(),
                "p_f_vto":$('#f_vto').val(),
                "p_f_vto2":null,
                "p_i_importe2":null,
                "p_i_importe1":$('#i_importe1').val(),
                "p_i_tasa":$('#i_tasa').val(),
                "p_dias_vto2":null,
                "p_imp_recargo":null,
                "p_n_anio":$('#n_anio').val(),
                "p_n_cuota":$('#n_cuota').val(),
                "p_c_tipo_registro": $('#c_tipo_registro').val(),
                "id_menu":p_id_menu,
                "n_orden":26
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                    if(data.p_alerta_ret){
                        mostrar_cuadro('Q', 'Confirmación','El comprobante tiene retenciones declaradas o un importe diferente?',
                                            function(){
                                            },
                                            function(){
                                                
                                            }, 500);
                    }
                    if(data.p_alerta_ret2){
                        mostrar_cuadro('Q', 'Confirmación','El importe de retenciones mas el total pagado no coincide con el total de la boleta, los importes son correctos?',
                                            function(){
                                            },
                                            function(){
                                                
                                            }, 500);
                    }
                    mostrar_cuadro('Q', 'Confirmación','Los campos ingresados son correctos? Desea continuar?',
                                            function(){
                                                datos_correctos();
                                            },
                                            function(){
                                                
                                            }, 500);
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 
        } else{
            mostrar_error('Debe ingresar el c&oacute;digo de formulario o el c&oacute;digo de barras', 'E', true);
        }

        
    });

    $('#btn_controlado').click(function(){
            mostrar_cuadro('Q', 'Confirmación',
	                    "Ud. grabará los cambios  - Desea continuar?",
	                    function(){
                            //controlar_rem
	                    	$.ajax({
                                type:'POST',
                                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                                data:{      
                                 "p_c_banco": $('#c_banco').val(),
                                 "p_c_sucursal": $('#c_sucursal').val(),
                                 "p_f_acred": $('#f_acred').val(),
                                 "p_f_pago": $('#f_pago').val(),
                                 "p_c_estado": null,
                                 "p_d_estado": null,
                                 "id_menu":p_id_menu,
                                 "n_orden":19
                                },
                                dataType:'json',
                                success: function( data ) {
                                    if(data.resultado == 'OK'){
                                        desactivar_botones();
                                        mostrar_cuadro('I', 'Informaci&oacute;n', 'El proceso finaliz&oacute; correctamente');
                                        $('#d_estado').val(data.p_d_estado);
                                    }
                                    else{
                                        mostrar_cuadro('E', 'Error', data.resultado);
                                        return;
                                    }
                                }
                            }); 
	                    },
	                    function(){}, 500);
       
        
    });

    $('#btn_listado').click(function(){
        let f_acred = $('#f_acred').val();
        let f_pago = $('#f_pago').val();
        let c_banco = $('#c_banco').val();
        let c_sucursal = $('#c_sucursal').val();
      
        let valido = valida_nulo_datos_banco(c_banco, c_sucursal, f_acred, f_pago);
        if(valido[0]){
            let parametros = 'P_C_banco|' + c_banco + 
                           '&P_C_sucursal|' + c_sucursal + 
                           '&P_f_acred|' + f_acred + 
                           '&P_f_pago|' + f_pago;
                
            if(c_banco == 905 || c_banco == 907 || c_banco == 910){
               llamar_report('RECAL087_905', parametros, 'PDF');
            }else{
               llamar_report('RECAL087', parametros, 'PDF');
            }
        } else{
            mostrar_error(valido[1], 'E', true);
        }
    })

    $('#btn_grabar').click(function(){
        if($('#n_remesa').val()){
            if($('#consulta_grid').getCell(1, 'c_impuesto_form')){
                mostrar_cuadro('Q', 'Confirmación',
                            "Ud. grabará los cambios  - Desea continuar?",
                            function(){
                                //grabar;
                                $.ajax({
                                    type:'POST',
                                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                                    data:{      
                                     "p_n_remito": $('#n_remesa').val(),
                                     "p_f_acred": $('#f_acred').val(),
                                     "p_f_remesa": $('#consulta_grid').getCell(1, 'f_remesa'),
                                     "p_n_cantidad_total": $('#n_cant_total').val(),
                                     "p_i_importe_total": $('#i_importe_total').val(),
                                     "p_c_estado": null,
                                     "p_d_estado": $('#d_estado').val(),
                                     "id_menu":p_id_menu,
                                     "n_orden":20
                                    },
                                    dataType:'json',
                                    success: function( data ) {
                                        if(data.resultado == 'OK'){
                                          preparar_nueva_carga();
                                          mostrar_cuadro('I', 'Informaci&oacute;n', 'El proceso finaliz&oacute; correctamente');
                                        }
                                        else{
                                            mostrar_cuadro('E', 'Error', data.resultado);
                                            return;
                                        }
                                    }
                                });
                            },
                            function(){}, 500);
            } else{
                mostrar_cuadro('Q', 'Confirmación',
                            "Ud. borrará la remesa completa  - Desea continuar?",
                            function(){
                                //borrar_remesa_completa
                                $.ajax({
                                    type:'POST',
                                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                                    data:{      
                                     "p_n_remito": $('#n_remesa').val(),
                                     "id_menu":p_id_menu,
                                     "n_orden":21
                                    },
                                    dataType:'json',
                                    success: function( data ) {
                                        if(data.resultado == 'OK'){
                                            limpiar_todo();
                                            mostrar_cuadro('I', 'Informaci&oacute;n', 'El proceso finaliz&oacute; correctamente');
                                        }
                                        else{
                                            mostrar_cuadro('E', 'Error', data.resultado);
                                            return;
                                        }
                                    }
                                }); 
                            },
                            function(){}, 500);
            }
        } else{
            mostrar_cuadro('I', 'Atención', 'Debe realizar una consulta');
            return;
        }
    })

    $('#n_comp').focusout(function(){
        if($('#n_comp').val()){
            //buscar_datos_boleta
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_barra":null,
                 "p_n_comp": $('#n_comp').val(),
                 "p_c_tipo_registro":$('#c_tipo_registro').val(),
                 "p_d_responsable": null,
                 "p_c_impuesto_form": null,
                 "p_tipo_comp": null,
                 "p_f_vto": null,
                 "p_f_vto2": null,
                 "p_d_objeto_hecho": null,
                 "p_n_anio": null,
                 "p_n_cuota": null,
                 "p_i_importe1": null,
                 "p_i_importe2": null,
                 "p_i_tasa": null,
                 "p_f_pago": $('#f_pago').val(),
                 "p_i_pagado": null,
                 "id_menu":p_id_menu,
                 "n_orden":22
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        cargar_bloque_pago(data, 'N COMPROBANTE');
                        let barra = $('#barra').val();
                        let n_comp = $('#n_comp').val()
                        let c_tipo_reg = $('#c_tipo_registro').val()
                        let c_imp_form = $('#c_impuesto_form').val()

                        //verificar_duplicados
                        $.ajax({
                            type:'POST',
                            url: FUNCIONES_BASEPATH+'maestro_abm.php',
                            data:{      
                            "p_c_tipo_registro": c_tipo_reg,
                            "p_n_comp": n_comp,
                            "p_barra": barra,
                            "id_menu":p_id_menu,
                            "n_orden":24
                            },
                            dataType:'json',
                            success: function( data ) {
                                if(data.resultado == 'OK'){
                                    if(data.p_limpiar == '1'){
                                        limpiar_todo();
                                    }
                                    //Verificar_pagos_efectuados
                        $.ajax({
                            type:'POST',
                            url: FUNCIONES_BASEPATH+'maestro_abm.php',
                            data:{      
                            "p_n_comp":  n_comp,
                            "p_barra": barra,
                            "p_c_tipo_registro": c_tipo_reg,
                            "p_c_impuesto_form": c_imp_form,
                            "id_menu":p_id_menu,
                            "n_orden":25
                            },
                            dataType:'json',
                            success: function( data ) {
                                if(data.resultado == 'OK'){
                                    if(data.p_mensaje_alerta){
                                        mostrar_cuadro('Q', 'Confirmación',data.p_mensaje_alerta,
                                        function(){
                                        },
                                        function(){
                                            limpiar_datos_pago();
                                            mostrar_cuadro('I', 'Informaci&oacute;n', 'La carga del comprobante ha sido cancelada');
                                        }, 500);
                                    }
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
                                    limpiar_todo();

                                    return;
                                }
                            }
                        }); 

                        
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        $.ajax({
                            type:'POST',
                            url: FUNCIONES_BASEPATH+'maestro_abm.php',
                            data:{      
                            "p_c_tipo_registro": 'S',
                            "p_n_comp": $('#n_comp').val(),
                            "p_barra": null,
                            "id_menu":p_id_menu,
                            "n_orden":24
                            },
                            dataType:'json',
                            success: function( data ) {
                                if(data.resultado == 'OK'){
                                    if(data.p_limpiar == '1'){
                                        limpiar_todo();
                                    }
                                }
                                else{
                                    mostrar_cuadro('E', 'Error', data.resultado);
                                    return;
                                }
                            }
                        });
                        return;
                    }
                }
            }); 
        }
    });

    $('#i_retenciones').focusout(function(){
        //verificar_monotributo
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_n_comp":null,
             "p_c_tipo_registro":'S',
             "p_c_impuesto_form":null,
             "p_tipo_comp":null,
             "id_menu":p_id_menu,
             "n_orden":29
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                  if(data.resultado == 'OK'){
                    if(data.retorno != 1){
                        if($('#i_retenciones').val()){
                            mostrar_error('El comprobante seleccionado no puede tener retenciones','E',true);
                        }
                    }
                    else if($('#i_importe1').val() != ($('#i_retenciones').val() + $('#i_pagado').val())){
                        mostrar_cuadro('Q', 'Confirmación',
                        "El importe de retenciones mas el total pagado no coincide con el total de la boleta, los importes son correctos?",
                        function(){
                        },
                        function(){
                            $('#i_retenciones').val('');
                        }, 500);
                    }
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });   
    });

    $('.numerico').keypress(function(tecla){
        if(tecla.charCode<48 || tecla.charCode>57){
            if(tecla.charCode !== 44 && tecla.charCode !== 46){
                return false;
            }
        }
    });

    $(".mascara_importe").focusout(function () {
        $(this).val(formatea_number(mascara_numero(parse($(this).val()).toFixed(2), ',', -1, 2), ''));
        if($(this).val() == '0,00'){
            $(this).val(null);
        }
    }).css('text-align', 'right');
    
    
}