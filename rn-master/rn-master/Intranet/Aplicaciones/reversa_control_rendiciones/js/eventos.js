function inicializarEventos(){
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


    $('#mascara_lupa_banco').hide();
    $('#mascara_lupa_sucursal').hide();

    $('#btn_buscar').click(function(){
        let valido = validar_nulos();
        if(valido[0]){
            let f_acred = $('#f_acred').val();
            let f_pago = $('#f_pago').val();
            let c_banco = $('#c_banco').val();
            let c_sucursal = $('#c_sucursal').val();
            let tipo_rendiciones = [];
            definir_checks(tipo_rendiciones);

            filtros_no_nativos_ar = [];
            filtros_arr_main = [];

            if($('#c_banco').val() != ''){
                filtros_arr_main.push('Banco: '+ $('#c_banco').val());
            }
            if($('#c_sucursal').val() != ''){
                filtros_arr_main.push('Sucursal: '+ $('#c_sucursal').val());
            }
            if($('#f_acred').val() != ''){
                filtros_arr_main.push('F. Acreditación: '+ $('#f_acred').val());
            }
            if($('#f_pago').val() != ''){
                filtros_arr_main.push('F. Pago: '+ $('#f_pago').val());
            }
            if($('#check_automat').is(':checked')){
                filtros_arr_main.push('Automática: Si')
            }
            if($('#check_manual').is(':checked')){
                filtros_arr_main.push('Manual: Si')
            }
            if($('#check_pagos_manuales').is(':checked')){
                filtros_arr_main.push('Pagos Manuales: Si')
            }

            filtros_no_nativos_ar['reversa_rendiciones_grid'] = filtros_arr_main;
           
            setea_parametros('#reversa_rendiciones_grid', {'p_f_acred':f_acred,
                                                    'p_f_pago':f_pago,
                                                    'p_c_banco':c_banco,
                                                    'p_c_sucursal':c_sucursal,
                                                    'p_m_automatica': tipo_rendiciones[0],
                                                    'p_m_manual':tipo_rendiciones[1],
                                                    'p_m_fiambrera':tipo_rendiciones[2]});
            $(window).resize();
            
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
        $('#total_cant').val('');
        $('#total_imp').val('');
        $('#total_tasa').val('');
        $('#total_total').val('');

        llenar_checks();
        $('#reversa_rendiciones_grid').jqGrid("clearGridData");
        grilla_cargada = false;
        desbloquear_filtros();
        $('#bloque_consulta').prop('hidden', true);
    });

    $('#btn_reversa').click(function(){
        let cant_a_borrar = 0;
        let cant_filas = $('#reversa_rendiciones_grid').getGridParam("reccount");

        for(let i = 1; i <= cant_filas; i++){
            if($('#check_select_'+i).is(":checked")){
                cant_a_borrar++;
            }
        }

        if(cant_filas > 0 && cant_a_borrar > 0){
            mostrar_cuadro('Q', 'Confirmación',
	                    "Usted grabar&aacute; los cambios - Desea continuar?",
	                    function(){
                            reversa();
	                    },
	                    function(){}, 500);
        } else{
            mostrar_error('Debe seleccionar primero una Rendici&oacute;n', 'E', true);
        }
    });

    $('#btn_detalle').click(function(){
        if($('#reversa_rendiciones_grid').getGridParam('selrow')){
            let rowid = $('#reversa_rendiciones_grid').getGridParam('selrow');
            let rendicion_selecc = $('#reversa_rendiciones_grid').getCell(rowid, 'id_rendicion');

            filtros_no_nativos_ar = [];
            filtros_arr_main = [];

            if(rendicion_selecc){
                filtros_arr_main.push('Rendición: '+ rendicion_selecc);
            }

            filtros_no_nativos_ar['detalle_reversa_rendicion_grid'] = filtros_arr_main;

            setea_parametros('#detalle_reversa_rendicion_grid', {'p_id_rendicion': rendicion_selecc});
            $('#detalle_reversa_rend_modal').modal('show');
            $(window).resize();

            $('#id_rendicion').val('');
            $('#n_remito_detalle').val('');
        } else{
            mostrar_error('Debe seleccionar una Rendici&oacute;n', 'E', true);
        }
    });


    $('#btn_volver_detalle').click(function(){
        $('#detalle_reversa_rendicion_grid').jqGrid("clearGridData");
        $('#total_cant_det').val('');
        $('#total_imp_det').val('');
        $('#total_tasa_det').val('');
        $('#total_total_det').val('');
    });
}

