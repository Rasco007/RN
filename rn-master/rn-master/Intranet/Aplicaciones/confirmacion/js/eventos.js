function inicializa_eventos(){

    $('#d_objeto_hecho_filtro').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 2) {
            $('#lupa_obj_hecho_filtro').show().css('display', 'table-cell');
            $('#mascara_lupa_obj_hecho_filtro').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_obj_hecho_filtro').hide();
            $('#mascara_lupa_obj_hecho_filtro').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 2) {
            $('#lupa_obj_hecho_filtro').hide();
            $('#mascara_lupa_obj_hecho_filtro').show().css('display', 'table-cell');
        }});

    $('#d_denominacion_filtro').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
            $('#id_contribuyente').val(null);
            $('#n_cuit_filtro').val(null);
        } else if (event.type === 'focusout' && $(this).val().length <= 4) {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
            $('#id_contribuyente').val(null);
            $('#n_cuit_filtro').val(null);
        }});

    $("#0,#1,#2").click(function(){
        $(window).resize();
    });

    $('.numerico').on('input', function() {
        let inputValue = $(this).val();
    
        inputValue = inputValue.replace(/\D/g, '');
    
        $(this).val(inputValue);
      });

    $(".mascara_importe").focusout(function () { //le damos el formato de importe con 2 decimales 0,00
        $(this).val($(this).val().replace(/\./g, ','));
        $(this).val(formatea_number(mascara_numero(parse($(this).val()).toFixed(2), ',', -1, 2), ''));
        if($(this).val() == '0,00'){
            $(this).val(null);
        }
    }).css('text-align', 'right');

    $("#n_cuit_filtro").mask("99-99999999-9");
    $('#lupa_d_denominacion').hide();
    $('#lupa_obj_hecho_filtro').hide();

    $('#mascara_lupa_n_plan_pago').hide();
    $('#mascara_lupa_tipo_documento').hide();
    $('#mascara_lupa_tipo_plan_pago').hide();
    $('#mascara_lupa_c_tipo_imponible').hide();

    $('#add_main_grid').hide();
    $('#edit_main_grid').hide();
    $('#del_main_grid').hide();
    
    $('#btn_confirmar').attr('disabled', true);
    $('#btn_constancia').attr('disabled', true);
    $('#btn_honorarios').attr('disabled', true);
    $('#btn_emitir_chequera').attr('disabled', true);
    $('#btn_contrato').attr('disabled', true);

    $('#f_actualizacion').attr('disabled', true);

    $('#add_grid_inspecciones').hide();
    $('#edit_grid_inspecciones').hide();
    $('#del_grid_inspecciones').hide();

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");
   
    $('#btn_constancia').click(function(){
       
        if($('#n_plan_pago_filtro').val() == ''){
            mostrar_cuadro('E', 'Error', 'Debe ingresar el Número de Plan de Pago');

        }else if ($('#c_tipo_plan_pago_filtro').val() == '') {
            mostrar_cuadro('E', 'Error', 'Debe ingresar el Tipo de Plan de Pago');

        }else{
            llamar_report('FACPL002','P_PLAN|'+$('#n_plan_pago_filtro').val()+
            '&P_TIPO_PLAN|'+$('#c_tipo_plan_pago_filtro').val(),'PDF');
        } 
    });
    
     $('#btn_emitir_chequera').click(function(){  
        $('#n_cuota_desde').val("");
        $('#n_cuota_hasta').val("");     
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
                "p_n_plan_pago": $('#n_plan_pago_filtro').val(),
                "p_c_tipo_plan_pago": $('#c_tipo_plan_pago_filtro').val(),
                "p_n_cuota_desde": null,
                "p_n_cuota_hasta": null,

                "id_menu":v_id_menu,
                "n_orden":2
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    $('#n_cuota_desde').val(data.p_n_cuota_desde || "");
                    $('#n_cuota_hasta').val(data.p_n_cuota_hasta || "");
                    $('#cheque_modal').modal('show');
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    });

    $('#btn_emitir_cheque').click(function(){
        
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_n_plan_pago": $('#n_plan_pago_filtro').val(),
             "p_c_tipo_plan_pago": $('#c_tipo_plan_pago_filtro').val(),
             "p_n_cuota_desde": $('#n_cuota_desde').val(),
             "p_n_cuota_hasta": $('#n_cuota_hasta').val(),
             "p_sesion": null,

             "id_menu":v_id_menu,
             "n_orden":3
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK' && data.p_sesion){

                    llamar_report('RECAL075_PDF','p_id_sesion|'+data.p_sesion,'PDF');

                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    });

    $('#btn_contrato').click(function(){
        
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_c_tipo_plan_pago": $('#c_tipo_plan_pago_filtro').val(),
             "p_arch": null,
             "id_menu":v_id_menu,
             "n_orden":4
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    llamar_report(data.p_arch,'p_plan|' + $('#n_plan_pago_filtro').val()+ '&p_tipo_plan|' + $('#c_tipo_plan_pago_filtro').val(),'PDF');
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    });

    $('#btn_limpiar').click(function(){
        $('#d_denominacion_filtro').val(null);
        $('#c_tipo_documento').val(null);
        $('#d_tipo_documento').val(null);
        $('#n_cuit_filtro').val(null);
        $('#n_documento').val(null);

        $('#c_tipo_plan_pago_filtro').val(null);
        $('#d_tipo_plan_pago_filtro').val(null);
        $('#c_tipo_imponible').val(null);
        $('#d_tipo_imponible').val(null);
        $('#d_objeto_hecho_filtro').val(null);
        $('#n_plan_pago_filtro').val(null);
        $('#id_contribuyente').val(null);

        $('#c_tributo').val(null);
        $('#d_tributo').val(null);
        $('#c_concepto').val(null);
        $('#d_concepto').val(null);
        $('#d_objeto_hecho').val(null);
        $('#c_tipo_imponible_desc').val(null);
        $('#d_tipo_imponible_desc').val(null);

        $('#deuda_original').val(null);
        $('#importe_capital').val(null);
        $('#intereses_resarcitorios').val(null);
        $('#n_descuento').val(null);
        $('#intereses_descuento').val(null);
        $('#importe_actualizado').val(null);
        $('#cant_cuotas').val(null);
        $('#calculo_cuota_metodo').val(null);
        $('#f_actualizacion').val(null);
        $('#importe_anticipo').val(null);
        $('#periodicidad_cuotas').val(null);
        $('#importe_total').val(null);
        $('#f_confirmacion').val(null);
        $('#f_confirmacion').attr('disabled', false);

        //limpiar las grillas
        setea_parametros('#detalles_grid',{},'N');
        setea_parametros('#cuotas_grid',{},'N');
        
        //deshabilita los tab
        $('#1').attr('data-toggle', 'none');
        $('#2').attr('data-toggle', 'none');
        $('#0').click();

        $('#btn_buscar').attr('disabled', false);

        $('#main_grid').clearGridData();
        $('#modal_detalle_grid').clearGridData();

        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
    
        $('#n_cuit_filtro').attr('disabled', false);
        $('#d_denominacion_filtro').attr('disabled', false);
        $('#c_tipo_documento').attr('disabled', false);
        $('#n_documento').attr('disabled', false);

        $('#n_plan_pago_filtro').attr('disabled', false);
        $('#c_tipo_plan_pago_filtro').attr('disabled', false);
        $('#c_tipo_imponible').attr('disabled', false);
        $('#d_objeto_hecho_filtro').attr('disabled', false);
    
        $('#add_main_grid').hide();
        $('#edit_main_grid').hide();
        $('#del_main_grid').hide();
        $('#btn_editar_detalle_movimiento').hide();
    
        $('#d_tipo_documento').attr('disabled', false);
        $('#btn_confirmar').attr('disabled', true);
        $('#btn_constancia').attr('disabled', true);
        $('#btn_honorarios').attr('disabled', true);
        
        $('#lupa_n_plan_pago').show();
        $('#lupa_tipo_documento').show();
        $('#lupa_tipo_plan_pago').show();
        $('#lupa_c_tipo_imponible').show();
        $('#lupa_obj_hecho_filtro').hide();
        $('#lupa_d_denominacion').hide();

        $('#mascara_lupa_n_plan_pago').hide();
        $('#mascara_lupa_tipo_documento').hide();
        $('#mascara_lupa_tipo_plan_pago').hide();
        $('#mascara_lupa_c_tipo_imponible').hide();
        $('#mascara_lupa_obj_hecho_filtro').show();
    });

    $('#btn_honorarios').click(function(){
        
        if($('#c_tributo').val() == 110){
            if($('#n_plan_pago_filtro').val() == ''){
                mostrar_cuadro('E', 'Error', 'Debe ingresar el Número de Plan de Pago');

            }else if ($('#c_tipo_plan_pago_filtro').val() == '') {
                mostrar_cuadro('E', 'Error', 'Debe ingresar el Tipo de Plan de Pago');
            }else{

                setea_parametros('#honorarios_grid',{
                    ':p_n_plan_pago':$('#n_plan_pago_filtro').val()
                
                });

                setea_parametros('#relacionados_grid',{
                    ':p_n_plan_pago':$('#n_plan_pago_filtro').val()
                
                });

            }
        
            // $('#c_tipo_documento').attr('disabled', false);
            // $('#d_tipo_documento').attr('disabled', false);
        }

    });
    

    
    $('#f_confirmacion').datepicker("option",'maxDate',fecha_hoy).change(function () {
        if ($.datepicker.parseDate('dd/mm/yy', $('#f_confirmacion').val()) > $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
            mostrar_error('La fecha ingresada no puede ser mayor a la actual', 'E', true);
            $('#f_confirmacion').val(fecha_hoy);
            return;
    }});

    $('#f_confirmacion').datepicker("option",'minDate',fecha_hoy).change(function () {
        if ($.datepicker.parseDate('dd/mm/yy', $('#f_confirmacion').val()) < $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
            mostrar_error('La fecha ingresada no puede ser menor a la actual', 'E', true);
            $('#f_confirmacion').val(fecha_hoy);
            return;
    }});
    
    $('#btn_confirmar').click(function(){

        if($('#n_plan_pago_filtro').val() == ''){
            mostrar_cuadro('E', 'Error', 'Debe ingresar el Número de Plan de Pago');

        }else if ($('#c_tipo_plan_pago_filtro').val() == '') {
            mostrar_cuadro('E', 'Error', 'Debe ingresar el Tipo de Plan de Pago');

        }else if($('#f_confirmacion').val() == ''){
            mostrar_cuadro('E', 'Error', 'Debe ingresar la fecha de Confirmación');
        }
        
        else{



            mostrar_cuadro('Q', 'Confirmación',
            "¿Desea confirmar este plan?",
            function(){
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                     "p_f_efectivo": $('#f_confirmacion').val(),
                     "p_c_tipo_plan_pago": $('#c_tipo_plan_pago_filtro').val(),
                     "p_n_plan_pago": $('#n_plan_pago_filtro').val(),
                     "id_menu":v_id_menu,
                     "n_orden":0
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'El Plan de Pago ha sido exitosamente confirmado'){
                            if ($('#f_confirmacion').val()){ 
                                $('#btn_emitir_chequera').attr('disabled', false);
                                $('#btn_contrato').attr('disabled', false);
                                $('#f_confirmacion').attr('disabled', true);
                                $('#2').click() 
                            }
                            mostrar_cuadro('S', 'Confirmado', data.resultado);
                            return;
                        }else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                });
            });
        }        
    });

    
    $('#btn_buscar').click(function(){

        filtros_no_nativos_ar = [];
        filtros_arr_main = [];

        if($('#d_denominacion_filtro').val() != ''){
            filtros_arr_main.push('Denominación: '+ $('#d_denominacion_filtro').val());
        }
        if($('#n_cuit_filtro').val() != ''){
            filtros_arr_main.push('CUIT: '+ $('#n_cuit_filtro').val());
        }
        if($('#n_plan_pago_filtro').val() != ''){
            filtros_arr_main.push('Nro Plan de Pago: '+ $('#n_plan_pago_filtro').val());
        }
        if($('#c_tipo_plan_pago_filtro').val() != ''){
            filtros_arr_main.push('Tipo Plan de Pago: '+ $('#c_tipo_plan_pago_filtro').val()+' - '+ $('#d_tipo_plan_pago_filtro').val());
        }
        if($('#c_tipo_documento').val() != ''){
            filtros_arr_main.push('Tipo Documento: '+ $('#c_tipo_documento').val()+ ' - ' + $('#d_tipo_documento').val());
        }
        if($('#c_tipo_imponible').val() != ''){
            filtros_arr_main.push('Tipo Imponible: '+ $('#c_tipo_imponible').val()+' - ' + $('#d_tipo_imponible').val());
        }
        if($('#d_objeto_hecho_filtro').val() != ''){
            filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho_filtro').val());
        }

        filtros_no_nativos_ar['grid_inspecciones'] = filtros_arr_main;
        filtros_no_nativos_ar['main_grid'] = filtros_arr_main;
        filtros_no_nativos_ar['detalles_grid'] = filtros_arr_main;
        filtros_no_nativos_ar['datos_cuotas_grid'] = filtros_arr_main;
        filtros_no_nativos_ar['cuotas_grid'] = filtros_arr_main;
        filtros_no_nativos_ar['honorarios_grid'] = filtros_arr_main;
        filtros_no_nativos_ar['relacionados_grid'] = filtros_arr_main;

        buscar_plan();
        //deshabilitar_campos();

    });

    $('#n_cuit_filtro').focusout(function(){
        if ($('#n_cuit_filtro').val() != ''){
            try{
                if( limpia_cuit($('#n_cuit_filtro').val()).length == 11 ){
                    $.ajax({
                        type:'POST',
                        url: "confirmacion/php/autocomplete.php",
                        data: {oper:'2',term: limpia_cuit($('#n_cuit_filtro').val())},
                        dataType: 'json',
                        success: function( data ) {
                            ajax_autocomplete = null;
                            if(data) {
                               
                                $("#d_denominacion_filtro").val(data.DENOMINACION);                            
                                $("#c_tipo_documento").val(data.C_TIPO_DOCUMENTO);                            
                                $("#d_tipo_documento").val(data.D_TIPO_DOCUMENTO);                   
                                $("#n_documento").val(data.N_DOCUMENTO);
                              }
                        }
                    });
                }else{
                    $('#btn_limpiar').click();
                }
            }catch(err){
            }
        }
    });

}

function completarDenominacion(){
    let cuit_sin_guiones =limpiar_formato_cuit($('#n_cuit_filtro').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "ajax_genericos/autocomplete.php",
        type:"POST",
        dataType: "JSON",
        data:{oper: 3,term: cuit_sin_guiones},
        success: function(res) {
            $('#main').procOverlay({visible:false});
            if(res != null){
                var info = res.data_raz[0];
                $("#d_denominacion_filtro").val(info.razon_social);
                $("#id_contribuyente").val(info.id_contribuyente);
                $('#lupa_d_denominacion').show().css('display', 'table-cell');
                $('#mascara_lupa_d_denominacion').hide();
                $('#d_denominacion_mayuscula').val($('#d_denominacion_filtro').val().toUpperCase());
            }else{
                mostrar_cuadro('E', 'Error', 'No se ha encontrado un contribuyente para el cuit ingresado.');
                $("#d_denominacion_filtro").val(null);
                $("#id_contribuyente").val(null);
                $("#n_cuit_filtro").val(null);
            }
        }
    });
}

function limpiar_formato_cuit(n_cuit){
    if(n_cuit[2] != '-'){
        return n_cuit;
    } else{
        return n_cuit.replace(/-/g, '');
    }
}