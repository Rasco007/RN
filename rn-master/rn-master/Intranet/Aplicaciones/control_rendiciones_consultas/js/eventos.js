function inicializarEventos(){
    $("#mascara_lupa_banco").hide();
    $("#mascara_lupa_sucursal").hide();

    $("#check_automat").prop("checked", true);
    $("#check_manual").prop("checked", true);
    $("#check_normal").prop("checked", true);
    $("#check_rts").prop("checked", true);

    $('#f_acred').datepicker("option",'minDate',fecha_hoy).change(function () {         
        if ($.datepicker.parseDate('dd/mm/yy', $('#f_acred').val()) > $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){             
            mostrar_error('La fecha ingresada no puede ser mayor a la actual', 'E', true);             
            $('#f_acred').val(fecha_hoy);             
            return;         
        }});

    $('#f_pago').datepicker("option",'minDate',fecha_hoy).change(function () {         
        if ($.datepicker.parseDate('dd/mm/yy', $('#f_pago').val()) > $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){             
            mostrar_error('La fecha ingresada no puede ser mayor a la actual', 'E', true);             
            $('#f_pago').val(fecha_hoy);             
            return;         
        }});
    
    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");
    
    $('#btn_buscar').click(function(){
        
        $('#total_cant').val('');
        $('#total_imp').val('');
        $('#total_tasa').val('');
        $('#total_total').val('');

        let valido = validar_nulos();
        es_primera_carga = false;
        grilla_cargada = false;

        if($('#frm_busqueda_rendiciones').validationEngine('attach', {promptPosition : "bottomLeft", scroll: false}).validationEngine('validate') ){
            let f_acred = $('#f_acred').val();
            let f_pago = $('#f_pago').val();
            let c_banco = $('#c_banco').val();
            let c_sucursal = $('#c_sucursal').val();
            let tipo_rendiciones = [];
            filtros_no_nativos = [];
            filtros_arr_main = [];
            if($('#c_banco').val() != ''){
                filtros_arr_main.push('Banco: '+ $('#c_banco').val()+ ' - ' +$('#d_banco').val());
            }
            if($('#c_sucursal').val() != ''){
                filtros_arr_main.push('Sucursal: '+ $('#c_sucursal').val()+ ' - '+$('#d_sucursal').val());
            }
            if($('#f_acred').val() != ''){
                filtros_arr_main.push('F. Acreditación: '+ $('#f_acred').val());
            }
            if($('#f_pago').val() != ''){
                filtros_arr_main.push('F. de Pago: '+ $('#f_pago').val());
            }
            filtros_no_nativos_ar['rendiciones_grid'] = filtros_arr_main;
            filtros_no_nativos_ar['detalle_rendicion_grid'] = filtros_arr_main;
            filtros_no_nativos_ar['listado_remesas_grid'] = filtros_arr_main;

            $('#btn_buscar').attr('disabled',true);
            $('#c_banco').attr('disabled',true);
            $('#d_banco').attr('disabled',true);
            $('#c_sucursal').attr('disabled',true);
            $('#d_sucursal').attr('disabled',true);
            $('#f_acred').attr('disabled',true);
            $('#f_pago').attr('disabled',true);
            $('#check_automat').attr('disabled',true);
            $('#check_manual').attr('disabled',true);
            $('#check_normal').attr('disabled',true);
            $('#check_rts').attr('disabled',true);
            $('#mascara_lupa_banco').show().css('display', 'table-cell');
            $('#mascara_lupa_sucursal').show().css('display', 'table-cell');
            $("#lupa_banco").hide();
            $("#lupa_sucursal").hide();

            definir_checks(tipo_rendiciones);

           
            setea_parametros('#rendiciones_grid', {'p_f_acred':f_acred,
                                                    'p_f_pago':f_pago,
                                                    'p_c_banco':c_banco,
                                                    'p_c_sucursal':c_sucursal,
                                                    'p_m_automatica': tipo_rendiciones[0],
                                                    'p_m_manual':tipo_rendiciones[1],
                                                    'p_m_normal':tipo_rendiciones[2],
                                                    'p_m_rts':tipo_rendiciones[3]});
            verificar_btn_controlar();
            
        } /*else{
            mostrar_cuadro('I', 'Informaci&oacute;n', valido[1]);
        }*/
    });

    $('#btn_limpiar').click(function(){
        $('#c_banco').val('');
        $('#d_banco').val('');
        $('#c_sucursal').val('');
        $('#d_sucursal').val('');
        $('#f_acred').val('');
        $('#f_pago').val('');
        $('#total_cant').val('');
        $('#total_imp').val('');
        $('#total_tasa').val('');
        $('#total_total').val('');

        $('#btn_buscar').attr('disabled',false);
        $('#c_banco').attr('disabled',false);
        $('#d_banco').attr('disabled',false);
        $('#c_sucursal').attr('disabled',false);
        $('#d_sucursal').attr('disabled',false);
        $('#f_acred').attr('disabled',false);
        $('#f_pago').attr('disabled',false);
        $('#check_automat').attr('disabled',false);
        $('#check_manual').attr('disabled',false);
        $('#check_normal').attr('disabled',false);
        $('#check_rts').attr('disabled',false);
        $('#mascara_lupa_banco').hide();
        $('#mascara_lupa_sucursal').hide();
        $("#lupa_banco").show().css('display', 'table-cell');
        $("#lupa_sucursal").show().css('display', 'table-cell');

        llenar_checks();
        $("#btn_controlado").prop("disabled", true);
        $("#rendiciones_grid").jqGrid('clearGridData');
        grilla_cargada = false;
    });


    // $('#btn_remesas_asociadas').click(function(){
    //     if(!$('#rendiciones_grid').getGridParam('selrow')){
    //         mostrar_error('Debe seleccionar una Rendici&oacute;n', 'E', true);
    //     }else{
    //         let rowid = $('#rendiciones_grid').getGridParam('selrow');
    //         let remito_asociado = $("#rendiciones_grid").getCell(rowid, "remito_asociado");
    //         let c_banco = $('#c_banco').val();
    //         let c_sucursal = $('#c_sucursal').val();
    //         let f_acred = $('#f_acred').val();
    //         let f_pago = $('#f_pago').val();

            
    //         if(remito_asociado == 'SIN REMESA ASOCIADA' || remito_asociado == 'AUTOMÁTICA' || !remito_asociado){
    //             mostrar_error('Sin Remesa Asociada', 'E', true);
    //         }else{
    //             if(c_banco == 905 || c_banco == 907 || c_banco == 910){
    //                 setea_parametros('#listado_remesas_grid', {'p_c_banco':c_banco,
    //                                                 'p_c_sucursal':c_sucursal,
    //                                                 'p_f_acred':f_pago});
    //             }
    //             setea_parametros('#listado_remesas_grid', {'p_c_banco':c_banco,
    //                                                 'p_c_sucursal':c_sucursal,
    //                                                 'p_f_acred':f_acred});
    //             $('#listado_remesas_modal').modal('show');
    //             $(window).resize();
    //         }
    //     }
    // });

    $('#btn_detalle').click(function(){
        let rowid = $('#rendiciones_grid').getGridParam('selrow');
        if(rowid){
            let rendicion_selecc = $('#rendiciones_grid').getCell(rowid, 'id_rendicion');
            setea_parametros('#detalle_rendicion_grid', {'p_id_rendicion': rendicion_selecc});
            $('#detalle_rend_modal').modal('show');
            $(window).resize();

            $('#id_rendicion').val('');
            $('#n_remito_detalle').val('');
        } else{
            mostrar_error('Debe seleccionar una rendici&oacute;n', 'E', true);
        }
    })

    $('#btn_volver_detalle').click(function(){
        $('#detalle_rend_modal').modal('hide');
    });

    $('#btn_volver_listado_remesas').click(function(){
        $('#listado_remesas_modal').modal('hide');
    });

    $('#btn_imprimir').click(function(){
        if($('#rendiciones_grid').getGridParam('selrow')){
            let c_banco = $('#c_banco').val();
            let c_sucursal = $('#c_sucursal').val();
            let f_acred = $('#f_acred').val();
            let f_pago = $('#f_pago').val();
            
            let tipo_rendiciones = [];
            definir_checks(tipo_rendiciones);

            let parametros = 'P_C_banco|' + c_banco + 
                            '&P_C_sucursal|' + c_sucursal + 
                            '&P_f_acred|' + f_acred + 
                            '&P_f_pago|' + f_pago + 
                            '&P_m_automatica|' + tipo_rendiciones[0] + 
                            '&P_m_manual|' + tipo_rendiciones[1] + 
                            '&P_m_normal|' + tipo_rendiciones[2] + 
                            '&P_m_rts|' + tipo_rendiciones[3];
            
            //llama al recal085.RDF
            llamar_report('RECAL085', parametros, 'PDF');
        } else{
            mostrar_error('Debe seleccionar una Rendici&oacute;n', 'E', true);
        }
    });

    $('#btn_imprimir_pantalla').click(function(){
        if($('#rendiciones_grid').getGridParam('selrow')){
            let c_banco = $('#c_banco').val();
            let c_sucursal = $('#c_sucursal').val();
            let f_acred = $('#f_acred').val();
            let f_pago = $('#f_pago').val();
            
            let tipo_rendiciones = [];
            definir_checks(tipo_rendiciones);


            let parametros = 'P_C_banco|' + c_banco + 
                            '&P_C_sucursal|' + c_sucursal + 
                            '&P_f_acred|' + f_acred + 
                            '&P_f_pago|' + f_pago + 
                            '&P_m_automatica|' + tipo_rendiciones[0] + 
                            '&P_m_manual|' + tipo_rendiciones[1] + 
                            '&P_m_normal|' + tipo_rendiciones[2] + 
                            '&P_m_rts|' + tipo_rendiciones[3];
            
            //llama al recal085_detalle.RDF
            llamar_report('RECAL085_DETALLE', parametros, 'PDF');
        } else{
            mostrar_error('Debe seleccionar una Rendici&oacute;n', 'E', true);
        }
    });

    $('#btn_controlado').click(function(){
        if($('#rendiciones_grid').getGridParam('selrow')){
            mostrar_cuadro('Q', 'Confirmación',
	                    "El control de Remitos incluye tanto Rendiciones Normales como RTS, ha controlado ambas?",
	                    function(){
	                    	controlar();
	                    },
	                    function(){}, 500);
        } else{
            mostrar_error('Debe seleccionar una Rendici&oacute;n', 'E', true);
        }
    });
};