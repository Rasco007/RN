function obtener_constantes(){
    $.ajax({                     
        url: "alta_planes_pago/php/funciones.php",                     
        type:"POST",                     
        dataType: "JSON",                     
        data:{p_oper : 'getConst'},                     
        success: function (res) {  
            if (res){
                g_aviso        = 0;
                g_moneda = res.MONEDA || "";
                g_sellos       = res.COD_TSELLOS       || "";
                g_tabla_recargo= res.MORA_SELLOS|| "";
                g_tm_can_pfp   = res.TMCANPFP   || "";
                g_tabla_sec    = res.SECUE    || "";
                g_codsecpp     = res.CODSECPP     || "";
                g_tabla_timpo  = res.TIMPO  || "";
                g_dias_1_vto   = res.PP_DIAS_1_VTO   || "";
                g_auto         = res.TRAUTOMOTOR         || "";
                g_inmo         = res.TRINMOBILIARIO         || "";

            }
        }                 
    });
}

function calcular_totales(){
    $.ajax({                     
        url: "alta_planes_pago/php/funciones.php",                     
        type:"POST",                     
        dataType: "JSON",                     
        data:{ p_id_sesion: sesion, p_oper : 'getTotales'},                     
        success: function (res) {
            if(res){                         
                $('#sum_t_capital').val(res.TOT_CAPITAL || 0);
                $('#sum_t_interes').val(res.TOT_INTERES || 0);
                $('#sum_t_cuota').val(res.TOT_CUOTA || 0);
                $('#sum_t_tasa').val(res.TOT_TASA || 0);
                $('#sum_t_final').val(res.TOT_FINAL || 0);

                $('.mascara_importe').focusout();
            }
            
        }                 
    });
}

function obtener_f_vto(){
    $.ajax({                     
        url: "alta_planes_pago/php/funciones.php",                     
        type:"POST",                     
        dataType: "JSON",                     
        data:{p_oper : 'getFechaVto'},                     
        success: function (res) {  
            if (res){
                $('#f_actualizacion').val(res.F_VTO);
            }
        }                 
    });
}

function ingresar_primero_contrib(){
    if(param_concurso_quiebra == 'J'){
	
        if ($('#id_contribuyente').val() == "" ){
            
            $('#c_tributo').val("");
            $('#d_tributo').val("");
            mostrar_error('Debe ingresar primero el contribuyente del Juicio!!');	  
            
        }
        
    }
}

function BUSQUEDA_POR_OBJETO(){

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{  
            'p_tributo': $('#c_tributo').val(),
            'p_d_objhecho':$('#d_objeto_hecho').val(),
            'p_param_llamado_desde':param_llamado_desde,
            'p_id_contribuyente':$('#id_contribuyente').val(),
            'p_param_concurso_quiebra':param_concurso_quiebra,
         "id_menu":v_id_menu,
         "n_orden":1
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                if(data.p_trae_datos == 1){
                    $('#id_contribuyente').val(data.p_id_contribuyente);
                    $('#d_denominacion').val(data.p_desc_denom);
                    $('#d_ctrl_denominacion').val(data.p_ctrl_desc_denom);
                    $('#n_cuit').val(data.p_n_cuit);
                    $('#c_tipo_documento').val(data.p_c_tipo_documento);
                    $('#c_tipo_documento').blur();
                    $('#n_documento').val(data.p_n_documento);
                }

                VALIDA_DEUDA_OBJETO();
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function VALIDA_DEUDA_OBJETO(){

    if($('#d_objeto_hecho').val() == "" && $('#tipo_deuda_T').is(':checked'))
        {
            mostrar_error(
                'Si selecciona TODA la deuda debe ingresar un Objeto/Hecho');
            return;
        }

    if(($('#c_tributo').val() == '10' || $('#c_tributo').val() =='20') && $('#tipo_deuda_T').is(':checked'))
    {
        $('#tipo_deuda_C').prop("checked", true);
    }

    if ($('#d_objeto_hecho').val() &&  $('#tipo_deuda_C').is(':checked') && $('#c_tributo').val() != '20') {
        $('#tipo_deuda_T').prop("checked", true);
    }
}

function BUSCAR_DATOS_TIPO_PLAN(){

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{  
         'p_c_tipo_plan_pago': $('#c_tipo_plan').val(),
         "id_menu":v_id_menu,
         "n_orden":2
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){

                $('#c_tipo_plan').val(data.p_c_tipo_plan_pago || $('#c_tipo_plan').val());
                tpp_c_indice_act = data.p_tpp_c_indice_act;
                $('#tpp_i_minimo_cuota').text(data.p_tpp_i_minimo_cuota);
                $('#tpp_i_minimo_finan').val(data.p_tpp_i_minimo_finan);
                $('#tpp_i_minimo_finan_sellos').val(data.p_tpp_i_minimo_finan_sellos);
                $('#tpp_i_maximo_finan').val(data.p_tpp_i_maximo_finan);
                $('#tpp_i_maximo_finan_sellos').val(data.p_tpp_i_maximo_finan_sellos);
                $('.mascara_importe').focusout();
                tpp_n_dia_vto = data.p_tpp_n_dia_vto;
                tpp_n_meses_vto = data.p_tpp_n_meses_vto;
                tpp_n_cuota_min = data.p_tpp_n_cuota_min;
                tpp_n_cuota_max = data.p_tpp_n_cuota_max;
                tpp_c_interes_finan = data.p_tpp_c_interes_finan;
                tpp_tributo = data.p_tpp_tributo;
                tpp_c_concepto = data.p_tpp_c_concepto;
                tpp_p_descuento_interes = data.p_p_tpp_descuento_interes;
                tpp_m_anticipo = data.p_tpp_m_anticipo;
                tpp_n_dias_vto_2 = data.p_tpp_n_dias_vto_2;
                tpp_i_tasa_sellado = data.p_tpp_i_tasa_sellado;
                tpp_n_dias_max_emision = data.p_tpp_n_dias_max_emision;
                tpp_m_tipo_minimo_cuota = data.p_tpp_m_tipo_minimo_cuota;
                $('#d_tipo_minimo_cuota').text(data.p_tpp_d_tipo_minimo_cuota);
                tpp_f_vig_hasta = data.p_tpp_f_vig_hasta;
                tpp_m_multiobjeto = data.p_tpp_m_multiobjeto;
                tpp_p_COND_INTERES_CAPITAL = data.p_p_tpp_COND_INTERES_CAPITAL;
                tpp_I_COND_DEUDA_SUPERIOR = data.p_tpp_I_COND_DEUDA_SUPERIOR;
                tpp_c_periodicidad = data.p_tpp_c_periodicidad;
                tpp_F_DEUDA_DESDE = data.p_tpp_F_DEUDA_DESDE;
                tpp_F_DEUDA_HASTA = data.p_tpp_F_DEUDA_HASTA;
                tpp_N_TABLA_PERIOD = data.p_tpp_N_TABLA_PERIOD;
                tpp_N_TABLA_TIPO_CALC = data.p_tpp_N_TABLA_TIPO_CALC;
                tpp_c_seg_riesgo = data.p_tpp_c_seg_riesgo;
                tpp_c_tipo_gestion = data.p_tpp_c_tipo_gestion;      
                
                $('#i_anticipo_TPP').val(data.p_i_anticipo_TPP);
                $('#p_anticipo_tpp').val(data.p_p_anticipo_tpp);
                $('#c_tipo_calculo').val(data.p_C_TIPO_CALCULO);
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function buscar(){
    $('#btn_obj_gest_j').attr('disabled', true);
    ctrl_tiene_deuda_comun = 0;
    ctrl_tiene_deuda_sellos = 0;
    ctrl_tiene_juicios_cq = 0;
    
    if(( ($('#c_tributo').val() == g_sellos && $('#c_concepto').val()) || $('#c_tributo').val() != g_sellos) && $('#c_tributo').val() && $('#c_tipo_plan').val() && $('#f_actualizacion').val() && 
    $('#c_delegacion').val() && !$('#n_cuit').val()){
        mostrar_cuadro('E', 'Error', 'Err: La partida ingresada es incorrecta > ' + $('#d_objeto_hecho').val());
        return;
    }

    if(( ($('#c_tributo').val() == g_sellos && $('#c_concepto').val()) || $('#c_tributo').val() != g_sellos) && $('#c_tributo').val() && $('#id_contribuyente').val() && $('#c_tipo_plan').val() && $('#f_actualizacion').val() && 
    $('#c_delegacion').val()){


        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{  
            'p_tributo': $('#c_tributo').val(),
            'p_d_objhecho': $('#d_objeto_hecho').val(),
            'p_id_contribuyente': $('#id_contribuyente').val(),
            'p_c_tipo_plan_pago': $('#c_tipo_plan').val(),
            'p_f_emision': $('#f_actualizacion').val(),
            'p_c_delegacion': $('#c_delegacion').val(),
            'p_g_sellos': g_sellos,
            'p_concepto': $('#c_concepto').val(),
            'p_tpp_m_multiobjeto': $('#tpp_m_multiobjeto').val() || "",
            'p_param_llamado_desde': param_llamado_desde,
            'p_param_concurso_quiebra': param_concurso_quiebra,
            'p_rb_deuda': $('input[name="tipo_deuda"]:checked').val(),
            'p_c_tipo_imponible': $('#c_tipo_imponible').val(),
            'p_param_id_oblig_min': param_id_oblig_min,
            'p_param_tipo': param_tipo,
            'p_param_n_plan_pago_ori': param_n_plan_pago_ori,
            'p_param_tipo_plan_ori': param_tipo_plan_ori,
            'p_param_max_cuotas': param_max_cuotas,
            'p_d_msg_deuda': $('#d_msg_deuda').val(),
            "id_menu":v_id_menu,
            "n_orden":3
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    if(data.p_rb_deuda == "C"){
                        $('#tipo_deuda_C').prop("checked", true);
                    }else if(data.p_rb_deuda == "T"){
                        $('#tipo_deuda_T').prop("checked", true);
                    }        
                    $('#n_cuit').prop('disabled', true);
                    $('#n_cuit').prop('readonly', true);
                    $('#d_denominacion').prop('disabled', true);
                    $('#d_denominacion').prop('readonly', true);
                    $('#c_tipo_documento').prop('disabled', true);
                    $('#c_tipo_documento').prop('readonly', true);
                    $('#n_documento').prop('disabled', true);
                    $('#n_documento').prop('readonly', true);
                    $('#c_tributo').prop('disabled', true);
                    $('#c_tributo').prop('readonly', true);
                    $('#c_tipo_imponible').prop('disabled', true);
                    $('#c_tipo_imponible').prop('readonly', true);
                    $('#c_concepto').prop('disabled', true);
                    $('#c_concepto').prop('readonly', true);
                    $('#d_objeto_hecho').prop('disabled', true);
                    $('#d_objeto_hecho').prop('readonly', true);
                    $('#c_tipo_plan').prop('disabled', true);
                    $('#c_tipo_plan').prop('readonly', true);
                    $('.rb_deuda').attr('readonly', true);
                    $('.rb_deuda').attr('disabled', true);
                    $('#f_actualizacion').attr('readonly', true);
                    $('#f_actualizacion').attr('disabled', true);
                    $('#c_delegacion').attr('readonly', true);
                    $('#c_delegacion').attr('disabled', true);
                    $('#d_observaciones').attr('readonly', true);
                    $('#d_observaciones').attr('disabled', true);
                    $('#lupa_d_denominacion').hide();
                    $('#lupa_c_tributo').hide();
                    $('#lupa_d_objeto_hecho').hide();
                    $('#lupa_c_tipo_plan').hide();
                    $('#lupa_c_delegacion').hide();
                    $('#lupa_c_concepto').hide();
                    $('#btn_buscar').attr('disabled', true);        
                    sesion = data.p_id_sesion;
                    $('#d_msg_deuda').val(data.p_d_msg_deuda);
                    g_obj_anterior = data.p_g_obj_anterior;
                    g_color_objeto = data.p_g_color_objeto;
                    g_boleta_actual_sel = data.p_g_boleta_actual_sel;
                    g_objeto_actual_sel = data.p_g_objeto_actual_sel;
                    g_boleta_nueva_sel = data.p_g_boleta_nueva_sel;
                    g_boleta_vieja_sel = data.p_g_boleta_vieja_sel;
                    g_cant_marcadas_deuda = data.p_g_cant_marcadas_deuda;
                    g_cant_marcadas_sellos = data.p_g_cant_marcadas_sellos;
                    g_modifico_seleccion = data.p_g_modifico_seleccion;
                    g_modifico_plan = data.p_g_modifico_plan;
                    $('#text_datos').val(data.P_TEXT_DATOs);
                    ctrl_tiene_deuda_comun = data.p_tiene_deuda_comun;
                    ctrl_tiene_deuda_sellos = data.p_tiene_deuda_sellos;
                    ctrl_tiene_juicios_cq = data.p_tiene_juicios_cq;
                    mostrar_datos();
                    var filtros_arr_deuda =[];
                    if($('#n_cuit').val() != ''){
                        filtros_arr_deuda.push('Nro. Cuit: '+ $('#n_cuit').val());
                    }
                    if($('#d_denominacion').val() != ''){
                        filtros_arr_deuda.push('Denominación: '+ $('#d_denominacion').val());
                    }
                    if($('#c_tipo_documento').val() != ''){
                        filtros_arr_deuda.push('Código Tipo Documento: '+ $('#c_tipo_documento').val());
                    }
                    if($('#n_documento').val() != ''){
                        filtros_arr_deuda.push('Nro. Documento: '+ $('#n_documento').val());
                    }
                    if($('#c_tributo').val() != ''){
                        filtros_arr_deuda.push('Código Tributo: '+ $('#c_tributo').val());
                    }
                    if($('#c_concepto').val() != ''){
                        filtros_arr_deuda.push('Código Concepto: '+ $('#c_concepto').val());
                    }
                    if($('#d_objeto_hecho').val() != ''){
                        filtros_arr_deuda.push('Objeto Hecho: '+ $('#d_objeto_hecho').val());
                    }
                    if($('#c_tipo_plan').val() != ''){
                        filtros_arr_deuda.push('Código Tipo Plan: '+ $('#c_tipo_plan').val());
                    }
                    if($('#f_actualizacion').val() != ''){
                        filtros_arr_deuda.push('F. Actualización: '+ $('#f_actualizacion').val());
                    }
                    if($('#c_delegacion').val() != ''){
                        filtros_arr_deuda.push('Código Delegación: '+ $('#c_delegacion').val());
                    }
                    if($('#d_observaciones').val() != ''){
                        filtros_arr_deuda.push('Observaciones: '+ $('#d_observaciones').val());
                    }
                    filtros_no_nativos_ar['deuda_declarada_grid'] = filtros_arr_deuda;
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    limpiar();
                    return;
                }
            }
        });
    }else{
        mostrar_error('Debe ingresar: Contribuyente, Tributo, Tipo de Plan, Fecha de Actualización y Delegación. Si el Tributo es sellos debe ingresar Concepto.');
        return;
    }
}

function mostrar_datos(){

    if(ctrl_tiene_deuda_sellos > 0 || ctrl_tiene_deuda_comun > 0){
		    

			  $('#i_intereses_ori').val("0");
			  $('#i_intereses').val("0");
			  $('#i_capital').val("0");
			  $('#i_capital_ori').val("0");
			  $('#i_hist_int_desc').val("0");
		
			  datos_del_plan(true, false);
			
			  deuda();
			  
			  deuda_sellos();
			     		  
    }else{		 
            if (ctrl_tiene_juicios_cq > 0){
                mostrar_cuadro("I", 'Información', 'No se encontró deuda, pero tiene objetos en juicio o concurso/quiebra.');
            }else{
                mostrar_cuadro("I", 'Información', 'No se encontró deuda.');
            }
		    	
    }    
    
    
    // si tiene obj en juicio los muestro...
    
    if (ctrl_tiene_juicios_cq > 0 ){
	     $('#btn_obj_gest_j').prop('disabled', false);	
	     
	     if  (param_concurso_quiebra != 'C' && param_concurso_quiebra != 'Q' && param_concurso_quiebra != 'J'){ 	
	     	
	     	//:ctrl.item_actual_1 := :system.cursor_item;
	     	 if(tpp_n_cuota_max == 1 && (tpp_c_tipo_gestion == 'C' || tpp_c_tipo_gestion == 'P')) {
	     	  $('#c_msg_juicio').text('Los objetos listados a continuación tienen Deuda Prejudicial o están en '+
	     	                        'Juicios confirmados o Concurso o Quiebra(sin confirmar o confirmados).'+
                                'RECUERDE: si hay deuda PREJUDICIAL deberá confeccionar plan contado PREJUDICIAL '+
                                'por el TOTAL de la deuda O uno Prejudicial contado y otro común contado incluyendo '+
                                'el total de la deuda entre ambos.');
            }else{
	     	  $('#c_msg_juicio').text('Los objetos listados a continuación tienen Deuda Prejudicial o están en '+
	     	                        'Juicios confirmados o Concurso o Quiebra(sin confirmar o confirmados). '+
	     	                        'Si hay deuda prejudicial: el TOTAL de la deuda debería regularizarse con '+
	     	                        'un plan de deuda PREJUDICIAL.');
            }
	     	 
           juicios();
           $('#juicios_modal').modal('show');
            $(window).resize();
        }
	       
    }else{
        $('#btn_obj_gest_j').prop('disabled', true);	
    }
}

function setea_solapas(tipo_seteo){

$("#tabs_grid").show();
  if (tipo_seteo == 'DEUDA'){
  	
     // me paro en una solapa activa
     $('#btn_tab_deuda_declarada').removeClass('tab-deshabilitado');
     $('#btn_tab_deuda_declarada').attr('data-toggle', 'tab');
     $("#btn_tab_deuda_declarada").click();

     $('#btn_tab_datos_plan').addClass('tab-deshabilitado');
     $('#btn_tab_datos_plan').removeAttr('data-toggle');
     $('#btn_tab_deuda_declarada_sellos').addClass('tab-deshabilitado');
     $('#btn_tab_deuda_declarada_sellos').removeAttr('data-toggle');
     $('#btn_tab_cuotas_plan').addClass('tab-deshabilitado');
     $('#btn_tab_cuotas_plan').removeAttr('data-toggle');

  }else if (tipo_seteo == 'SELLO' ){

     $('#btn_tab_deuda_declarada_sellos').removeClass('tab-deshabilitado');
     $('#btn_tab_deuda_declarada_sellos').attr('data-toggle', 'tab');
     $("#btn_tab_deuda_declarada_sellos").click();

     $('#btn_tab_datos_plan').addClass('tab-deshabilitado');
     $('#btn_tab_datos_plan').removeAttr('data-toggle');
     $('#btn_tab_deuda_declarada').addClass('tab-deshabilitado');
     $('#btn_tab_deuda_declarada').removeAttr('data-toggle');
     $('#btn_tab_cuotas_plan').addClass('tab-deshabilitado');
     $('#btn_tab_cuotas_plan').removeAttr('data-toggle');

  }else if (tipo_seteo == 'CUOTAS' ){
  	
     $('#btn_tab_cuotas_plan').removeClass('tab-deshabilitado');
     $('#btn_tab_cuotas_plan').attr('data-toggle', 'tab');
     $("#btn_tab_cuotas_plan").click();
  }

  $(window).resize();
  
}

function datos_del_plan(mostrar, ref_2006){
    
    $.ajax({                     
        url: "alta_planes_pago/php/funciones.php",                     
        type:"POST",                     
        dataType: "JSON",                     
        data:{p_oper : 'getDatosPlan', p_id_sesion: sesion},                     
        success: function (res) {  
            if (res){
                $('#i_capital').val(res.I_CAPITAL);
                $('#i_capital_ori').val(res.I_CAPITAL_ORI);
                $('#i_intereses').val(res.I_INTERESES);
                $('#i_intereses_ori').val(res.I_INTERESES_ORI);
                $('#i_actualizado').val(res.I_ACTUALIZADO);
                $('#i_hist_int_desc').val(res.I_HIST_INT_DESC);
                $('#total_seleccionado').val(res.I_TOT_SEL_COMUN);
                $('#total_seleccionado_sellos').val(res.I_TOT_SEL_SELLOS);
                $('#f_vto_1').val(res.F_VTO_1);
                $('#n_cuotas').val(res.N_CUOTAS);
                if(res.I_ANTICIPO_MIN != "0"){
                    $('#i_anticipo_min').val(res.I_ANTICIPO_MIN);
                }
                $('#i_valor_cuota').val(res.I_VALOR_CUOTA);
                // $('#i_anticipo_pagar').val(res.I_ANTICIPO_PAGAR);
                // $('#i_anticipo_pagar').replace(/\./g, '').replace(',', '.')
                $('#c_valor_periodo').val(res.C_VALOR_PERIODO);
                $('#d_periodicidad').val(res.D_PERIODICIDAD);
                $('#m_ges_judicial').val(res.M_GES_JUDICIAL);
                $('#m_es_deuda_sellos').val(res.M_ES_DEUDA_SELLOS);
                $('#f_actualizacion').val(res.F_EMISION);
                $('#p_descuento_interes').val(res.P_DESCUENTO_INTERES + '%');
                $('#c_delegacion').val(res.C_DELEGACION);
                $('#n_plan_de_pago').val(res.N_PLAN_DE_PAGO );
                $('#c_tipo_calculo').val(res.C_TIPO_CALCULO);
                $('#p_anticipo_tpp').val(res.P_ANTICIPO_TPP);

                $('.mascara_importe').focusout();
                if(mostrar){
                    if (res.M_ES_DEUDA_SELLOS == 'N'){
                        setea_solapas('DEUDA'); 
                    }else{
                        setea_solapas('SELLO');		       
                    }
                }
                if(ref_2006){
                    if ($('#c_tipo_plan').val() == '152'){
                        $('#i_valor_cuota').val((Number($('#i_actualizado').val()) / Number($('#N_CUOTAS').val())).toFixed(2));
                      }
                      g_ref_2006 = false;
                }
            }
        }                 
    });
}

function deuda(){
    setea_parametros('#deuda_declarada_grid',{':p_id_sesion': sesion });
}

function deuda_sellos(){
    setea_parametros('#deuda_declarada_sellos_grid',{':p_id_sesion': sesion });
}

function juicios(){
    setea_parametros('#juicios_grid',{':p_id_sesion': sesion });
    var filtros_arr_juicio =[];
        if($('#n_cuit').val() != ''){
            filtros_arr_juicio.push('Nro. Cuit: '+ $('#n_cuit').val());
        }
        if($('#d_denominacion').val() != ''){
            filtros_arr_juicio.push('Denominación: '+ $('#d_denominacion').val());
        }
        if($('#c_tipo_documento').val() != ''){
            filtros_arr_juicio.push('Código Tipo Documento: '+ $('#c_tipo_documento').val());
        }
        if($('#n_documento').val() != ''){
            filtros_arr_juicio.push('Nro. Documento: '+ $('#n_documento').val());
        }
        if($('#c_tributo').val() != ''){
            filtros_arr_juicio.push('Código Tributo: '+ $('#c_tributo').val());
        }
        if($('#c_concepto').val() != ''){
            filtros_arr_juicio.push('Código Concepto: '+ $('#c_concepto').val());
        }
        if($('#d_objeto_hecho').val() != ''){
            filtros_arr_juicio.push('Objeto Hecho: '+ $('#d_objeto_hecho').val());
        }
        if($('#c_tipo_plan').val() != ''){
            filtros_arr_juicio.push('Código Tipo Plan: '+ $('#c_tipo_plan').val());
        }
        if($('#f_actualizacion').val() != ''){
            filtros_arr_juicio.push('F. Actualización: '+ $('#f_actualizacion').val());
        }
        if($('#c_delegacion').val() != ''){
            filtros_arr_juicio.push('Código Delegación: '+ $('#c_delegacion').val());
        }
        if($('#d_observaciones').val() != ''){
            filtros_arr_juicio.push('Observaciones: '+ $('#d_observaciones').val());
        }
        filtros_no_nativos_ar['juicios_grid'] = filtros_arr_juicio;
}

function detalle_deuda(id){
    setea_parametros('#detalle_deuda_grid',{':p_id_sesion': sesion, ':p_id_obligacion': $('#deuda_declarada_grid').getCell(id,'id_obligacion')});
    if($('#detalle_deuda_grid').getCell(1,'m_tipo_reg') == 'C'){
        $('#d_objeto_hecho_modal').val($('#deuda_declarada_grid').getCell(id,'d_objeto_hecho') || "");
        $('#d_tributo_modal').val($('#deuda_declarada_grid').getCell(id,'d_tributo') || "");
        $('#d_concepto_modal').val($('#deuda_declarada_grid').getCell(id,'d_concepto') || "");
        $('#n_posicion_fiscal_modal').val($('#deuda_declarada_grid').getCell(id,'n_posicion_fiscal') || "");
        $('#cuota_anticipo_modal').val($('#deuda_declarada_grid').getCell(id,'n_cuota_anticipo') || "");
        $('#f_vto_modal').val($('#deuda_declarada_grid').getCell(id,'f_vto_pago') || "");

        $('#n_posicion_fiscal_modal').mask('9999/99');
        
        var filtros_arr_detalle =[];
        if($('#d_objeto_hecho_modal').val() != ''){
            filtros_arr_detalle.push('Objeto Hecho: '+ $('#d_objeto_hecho_modal').val());
        }
        if($('#d_tributo_modal').val() != ''){
            filtros_arr_detalle.push('Tributo: '+ $('#d_tributo_modal').val());
        }
        if($('#d_concepto_modal').val() != ''){
            filtros_arr_detalle.push('Concepto: '+ $('#d_concepto_modal').val());
        }
        if($('#n_posicion_fiscal_modal').val() != ''){
            filtros_arr_detalle.push('Pos. Fiscal: '+ $('#n_posicion_fiscal_modal').val());
        }
        if($('#cuota_anticipo_modal').val() != ''){
            filtros_arr_detalle.push('Cuota Anticipo: '+ $('#cuota_anticipo_modal').val());
        }
        if($('#f_vto_modal').val() != ''){
            filtros_arr_detalle.push('F. Vto: '+ $('#f_vto_modal').val());
        }
        filtros_no_nativos_ar['detalle_deuda_grid'] = filtros_arr_detalle;

        $('#detalle_deuda_modal').modal('show');
        $(window).resize();
    }
}

function to_date(fecha){
    var dateParts = fecha.split("/");
    var day = parseInt(dateParts[0], 10);
    var month = parseInt(dateParts[1], 10) - 1; 
    var year = parseInt(dateParts[2], 10);
    var resultDate = new Date(year, month, day);
    return resultDate;
}

function getCheckboxNumber(checkboxId) {
    const match = checkboxId.match(/\d+/);
    return match ? parseInt(match[0]) : null;
  }

function setear_evento_checkboxes(){
        $('.deuda_checkbox').change(async function(id){
            let checkbox = id.currentTarget;
            let id_row = getCheckboxNumber(checkbox.id);

            g_objeto_actual_sel = 'X';
            $('#div_search').procOverlay({visible:true});
            if(await CONTROLAR_SEL_CUOTA(id_row)){
                await CONTROLAR_SEL_BOLETA(id_row);
                await SUMA_DEUDA(id_row, false);
                if(checkbox.checked){
                    seleccionados_comun.push($('#deuda_declarada_grid').getCell(id_row,'id_obligacion'));
                    seleccionados_id.push(id_row);
                } else {
                    let index = seleccionados_comun.indexOf($('#deuda_declarada_grid').getCell(id_row,'id_obligacion'));
                    seleccionados_comun.splice(index, 1);
                    let index2 = seleccionados_id.indexOf(id_row);
                    seleccionados_id.splice(index2, 1)
                }
            }
            $('#div_search').procOverlay({visible:false});
        });
}

async function recargar_sel(){
        await seleccionar_guardados();
        $('#div_search').procOverlay({visible:false});
}

async function seleccionar_guardados(){
    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < guardados_id.length; i++) {
            let id = guardados_id[i];
            try{
                $('#div_search').procOverlay({visible:true});
                g_objeto_actual_sel = 'X';
                await CONTROLAR_SEL_CUOTA(id);
                $('#div_search').procOverlay({visible:true});
                await CONTROLAR_SEL_BOLETA(id);
                $('#div_search').procOverlay({visible:true});
                await SUMA_DEUDA(id, false);
                seleccionados_comun.push($('#deuda_declarada_grid').getCell(id,'id_obligacion'));
                seleccionados_id.push(id);
            } catch (error) {
                break;
            }
        }
        resolve();
    });
}

async function CONTROLAR_SEL_CUOTA(id_row){
    return new Promise((resolve, reject) => {
        $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{  
            'p_tpp_c_tipo_gestion': tpp_c_tipo_gestion,
            'p_deuda_m_inspeccion': $('#deuda_declarada_grid').getCell(id_row,'m_inspeccion'),
            'p_sesion_m_ges_judic':$('#m_ges_judicial').val(),
            'p_deuda_d_objeto_hec':$('#deuda_declarada_grid').getCell(id_row,'d_objeto_hecho'),
            'P_DEUDA_N_POSICION_FISCAL':$('#deuda_declarada_grid').getCell(id_row,'n_posicion_fiscal'),
            'P_N_CUOTA_ANTICIPO':$('#deuda_declarada_grid').getCell(id_row,'n_cuota_anticipo'),
            'p_deuda_m_rechazo':$('#deuda_declarada_grid').getCell(id_row,'m_rechazo'),
            'p_g_objeto_actual_sel':g_objeto_actual_sel,
         "id_menu":v_id_menu,
         "n_orden":4
        },
        dataType:'json',
        beforeSend: function(xhr, settings){},
            global: false,
            complete:function(xhr, settings){},
            success:  function( data ) {
                if(data.resultado == 'OK'){
                    if(data.p_deuda_marca == 0){
                        $('#deuda_checkbox_'+id_row).prop( "checked", false );
                    }else if(data.p_deuda_marca == 1){
                        $('#deuda_checkbox_'+id_row).prop( "checked", true );
                    }
                    g_objeto_actual_sel = data.p_g_objeto_actual_sel || g_objeto_actual_sel;
                    resolve(true);
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    if(data.p_deuda_marca == 0){
                        $('#deuda_checkbox_'+id_row).prop( "checked", false );
                    }else if(data.p_deuda_marca == 1){
                        $('#deuda_checkbox_'+id_row).prop( "checked", true );
                    }
                    g_objeto_actual_sel = data.p_g_objeto_actual_sel || g_objeto_actual_sel;
                    resolve(false);
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                reject(errorThrown);
            }
        });
    });
}

async function CONTROLAR_SEL_BOLETA(id_row){
    return new Promise((resolve, reject) => {
         $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{  
            'p_param_concurso_quiebra':param_concurso_quiebra,
            'p_deuda_marca':$('#deuda_checkbox_'+id_row).is(":checked") ? 1: 0,
            'p_g_boleta_actual_sel': g_boleta_actual_sel,
            'p_deuda_id_boleta_deuda':$('#deuda_declarada_grid').getCell(id_row,'id_boleta_deuda'),
            'p_deuda_c_tributo':$('#deuda_declarada_grid').getCell(id_row,'c_tributo'),
            'p_deuda_d_objeto_hecho':$('#deuda_declarada_grid').getCell(id_row,'d_objeto_hecho'),
            'p_g_boleta_nueva_sel':g_boleta_nueva_sel,
            'p_g_cant_marcadas_deuda': g_cant_marcadas_deuda,
            'p_param_p_exigir_honorarios':param_exigir_honorarios,
         "id_menu":v_id_menu,
         "n_orden":5
        },
        dataType:'json',
        beforeSend: function(xhr, settings){},
            global: false,
            complete:function(xhr, settings){},
            success: function( data ) {
                if(data.resultado == 'OK'){

                    if(data.p_preguntar == 'S'){
                        resolve(mostrar_cuadro('C','Confirmación', 'La boleta de deuda correspondiente a esta deuda de honorarios, esta ANULADA. Desea continuar?', async function(){
                            if(data.p_deuda_marca == 0){
                                $('#deuda_checkbox_'+id_row).prop( "checked", false );
                            }else if(data.p_deuda_marca == 1){
                                $('#deuda_checkbox_'+id_row).prop( "checked", true );
                            }
                            g_boleta_actual_sel = data.p_g_boleta_actual_sel || g_boleta_actual_sel;
                            g_boleta_nueva_sel = data.p_g_boleta_nueva_sel || g_boleta_nueva_sel;
                            g_boleta_vieja_sel = data.p_g_boleta_vieja_sel || g_boleta_vieja_sel;
            
                            if (!$('#deuda_checkbox_'+id_row).is(":checked")){
                                g_cant_marcadas_deuda = Number(g_cant_marcadas_deuda) - 1;
                            }else{
                                g_cant_marcadas_deuda = Number(g_cant_marcadas_deuda) + 1;
                            }
            
                            g_modifico_seleccion = 'S';
                            
                            
                        }, async function(){
                            $('#deuda_checkbox_'+id_row).prop( "checked", false );
                            mostrar_cuadro('I','Informacion','Selección cancelada.');
                            if(data.p_deuda_marca == 0){
                                $('#deuda_checkbox_'+id_row).prop( "checked", false );
                            }else if(data.p_deuda_marca == 1){
                                $('#deuda_checkbox_'+id_row).prop( "checked", true );
                            }
                            g_boleta_actual_sel = data.p_g_boleta_actual_sel || g_boleta_actual_sel;
                            g_boleta_nueva_sel = data.p_g_boleta_nueva_sel || g_boleta_nueva_sel;
                            g_boleta_vieja_sel = data.p_g_boleta_vieja_sel || g_boleta_vieja_sel;
            
                            if (!$('#deuda_checkbox_'+id_row).is(":checked")){
                                g_cant_marcadas_deuda = g_cant_marcadas_deuda - 1;
                            }else{
                                g_cant_marcadas_deuda = g_cant_marcadas_deuda + 1;
                            }
            
                            g_modifico_seleccion = 'S';
                            
                        }));
                    }else{

                        if(data.p_deuda_marca == 0){
                            $('#deuda_checkbox_'+id_row).prop( "checked", false );
                        }else if(data.p_deuda_marca == 1){
                            $('#deuda_checkbox_'+id_row).prop( "checked", true );
                        }
                        g_boleta_actual_sel = data.p_g_boleta_actual_sel || g_boleta_actual_sel;
                        g_boleta_nueva_sel = data.p_g_boleta_nueva_sel || g_boleta_nueva_sel;
                        g_boleta_vieja_sel = data.p_g_boleta_vieja_sel || g_boleta_vieja_sel;

                        if (!$('#deuda_checkbox_'+id_row).is(":checked")){
                            g_cant_marcadas_deuda = Number(g_cant_marcadas_deuda) - 1;
                        }else{
                            g_cant_marcadas_deuda = Number(g_cant_marcadas_deuda) + 1;
                        }

                        g_modifico_seleccion = 'S';
                        resolve();
                    }
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                reject(errorThrown);
            }
        });
    });
}

async function SUMA_DEUDA(id_row, p_sellos){
    await $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{  
         'p_sellos':p_sellos ? 1 : 0,
        'p_deuda_marca':$('#deuda_checkbox_'+id_row).is(":checked") ? 1: 0,
        'p_sesion_i_capital':$('#i_capital').val().replace(/\./g, '').replace(',', '.'),
        'p_sesion_i_capital_ori':$('#i_capital_ori').val().replace(/\./g, '').replace(',', '.'),
        'p_sesion_i_intereses':$('#i_intereses').val().replace(/\./g, '').replace(',', '.'),
        'p_sesion_i_intereses_ori':$('#i_intereses_ori').val().replace(/\./g, '').replace(',', '.'),
        'p_sesion_i_hist_int_desc':$('#i_hist_int_desc').val(),
        'p_deuda_i_adeudado':$('#deuda_declarada_grid').getCell(id_row,'i_adeudado') ? $('#deuda_declarada_grid').getCell(id_row,'i_adeudado').replace(/\./g, '').replace(',', '.') : 0,
        'p_deuda_i_adeudado_ori':$('#deuda_declarada_grid').getCell(id_row,'i_adeudado_ori') ? $('#deuda_declarada_grid').getCell(id_row,'i_adeudado_ori').replace(/\./g, '').replace(',', '.') : 0,
        'p_deuda_i_actualizado':$('#deuda_declarada_grid').getCell(id_row,'i_actualizado') ? $('#deuda_declarada_grid').getCell(id_row,'i_actualizado').replace(/\./g, '').replace(',', '.') : 0,
        'p_deuda_i_actuali_con_desc':$('#deuda_declarada_grid').getCell(id_row,'i_actualizado_con_desc') ? $('#deuda_declarada_grid').getCell(id_row,'i_actualizado_con_desc').replace(/\./g, '').replace(',', '.') : 0,
        'p_deuda_i_hist_int_desc':$('#deuda_declarada_grid').getCell(id_row,'i_hist_int_desc') || 0,
        'p_sellos_marca':$('#sellos_checkbox_'+id_row).is(":checked") ? 1: 0,
        'p_sellos_i_adeudado':$('#deuda_declarada_sellos_grid').getCell(id_row,'i_adeudado') ? $('#deuda_declarada_sellos_grid').getCell(id_row,'i_adeudado').replace(/\./g, '').replace(',', '.') : 0,
        'p_sellos_i_adeudado_ori':$('#deuda_declarada_sellos_grid').getCell(id_row,'i_adeudado_ori') ? $('#deuda_declarada_sellos_grid').getCell(id_row,'i_adeudado_ori').replace(/\./g, '').replace(',', '.') : 0,
        'p_sellos_i_actualizado':$('#deuda_declarada_sellos_grid').getCell(id_row,'i_actualizado') ? $('#deuda_declarada_sellos_grid').getCell(id_row,'i_actualizado').replace(/\./g, '').replace(',', '.') : 0,
        'p_sellos_i_actuali_con_desc':$('#deuda_declarada_sellos_grid').getCell(id_row,'i_actualizado_con_desc') ? $('#deuda_declarada_sellos_grid').getCell(id_row,'i_actualizado_con_desc').replace(/\./g, '').replace(',', '.') : 0,
        'p_sellos_i_hist_int_desc':$('#deuda_declarada_sellos_grid').getCell(id_row,'i_hist_int_desc') || 0,
        'p_tpp_i_minimo_finan':$('#tpp_i_minimo_finan').val().replace(/\./g, '').replace(',', '.'),
        'p_tpp_i_maximo_finan':$('#tpp_i_maximo_finan').val().replace(/\./g, '').replace(',', '.'),
         "id_menu":v_id_menu,
         "n_orden":6
        },
        dataType:'json',
        beforeSend: function(xhr, settings){},
            global: false,
            complete:function(xhr, settings){},
        success: function( data ) {
            if(data.resultado == 'OK'){

                $('#i_capital').val(data.p_sesion_i_capital || $('#i_capital').val());
                $('#i_capital_ori').val(data.p_sesion_i_capital_ori || $('#i_capital_ori').val());
                $('#i_intereses').val(data.p_sesion_i_intereses || $('#i_intereses').val());
                $('#i_intereses_ori').val(data.p_sesion_i_intereses_ori || $('#i_intereses_ori').val());
                $('#i_hist_int_desc').val(data.p_sesion_i_hist_int_desc || $('#i_hist_int_desc').val());
                $('#i_actualizado').val(data.p_sesion_i_actualizado || $('#i_actualizado').val());
                $('#total_seleccionado').val(data.p_ses_tot_seleccionado_comun || $('#total_seleccionado').val());
                $('#total_seleccionado_sellos').val(data.p_ses_tot_seleccionado_sellos || $('#total_seleccionado_sellos').val());
                if(Number(data.p_enabled_datos_plan)){
                    $('#btn_tab_datos_plan').removeClass('tab-deshabilitado');
                    $('#btn_tab_datos_plan').attr('data-toggle', 'tab');
                }else{
                    $('#btn_tab_datos_plan').addClass('tab-deshabilitado');
                    $('#btn_tab_datos_plan').removeAttr('data-toggle');
                }
                $('#n_cuotas').val(data.p_sesion_N_CUOTAS || $('#n_cuotas').val());
                $('#i_anticipo_pagar').val(data.p_sesion_I_ANTICIPO_PAGAR || $('#i_anticipo_pagar').val());

                $('.mascara_importe').focusout();

                $('#btn_tab_cuotas_plan').addClass('tab-deshabilitado');
                $('#btn_tab_cuotas_plan').removeAttr('data-toggle')

                if(param_concurso_quiebra == 'J'){      
                    if ($('#total_seleccionado').val() == '0,00'){
                        g_boleta_actual_sel = 0;
                    }
                }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function calcular_cuotas(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{  
            'p_n_cuotas':$('#n_cuotas').val(),
            'p_i_anticipo_min':$('#i_anticipo_min').val().replace(/\./g, '').replace(',', '.'),
            'p_c_tipo_calculo':$('#c_tipo_calculo').val(),
            'p_i_valor_cuota':$('#i_valor_cuota').val().replace(/\./g, '').replace(',', '.'),
            'p_i_anticipo_pagar':$('#i_anticipo_pagar').val().replace(/\./g, '').replace(',', '.'),
            'p_i_actualizado':$('#i_actualizado').val().replace(/\./g, '').replace(',', '.'),
            'p_tpp_m_anticipo':tpp_m_anticipo,
            'p_id_sesion':sesion,
         "id_menu":v_id_menu,
         "n_orden":7
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#i_anticipo_min').val(data.p_i_anticipo_min);
                $('#n_plan_de_pago').val(data.p_n_plan_de_pago)
	
				datos_del_plan(false, false);
	
				setea_parametros('#cuotas_grid',{':p_id_sesion': sesion });

                setea_solapas('CUOTAS');



            }
            else{
                var errorMessage = data.resultado;
                var regex = /Error : -\d+-ORA-20000: (.+)/;
                var matches = errorMessage.match(regex);
                if (matches) {
                    var parteError = matches[1]; // La parte del mensaje que deseas está en el índice 1
                    mostrar_cuadro('E', 'Error', parteError);
                } else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                }
                return;
            }
        }
    });
}

function calcula_anticipo_minimo(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{ 
            'p_i_anticipo_tpp':$('#i_anticipo_tpp').val(), 
            'p_p_anticipo_tpp':$('#p_anticipo_tpp').val(),
            'p_i_actualizado':$('#i_actualizado').val().replace(/\./g, '').replace(',', '.'),
            'p_c_tipo_calculo':$('#c_tipo_calculo').val(),
            'p_i_valor_cuota':$('#i_valor_cuota').val().replace(/\./g, '').replace(',', '.'),
            'p_n_cuotas':$('#n_cuotas').val(),
         "id_menu":v_id_menu,
         "n_orden":8
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){

                $('#i_anticipo_min').val(data.p_i_anticipo_min)
                $('.mascara_importe').focusout();
                $('#i_anticipo_pagar').val(data.p_i_anticipo_min);
            
                g_modifico_plan = 'S';

                if($('#i_anticipo_pagar').val() != ''){
                    $("#i_anticipo_pagar").trigger('focusout');
                }



            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}


function datos_adicionales(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{ 
            'p_id_contribuyente':$('#id_contribuyente').val(),
            'p_desc_denom':$('#d_denominacion').val(),
         "id_menu":v_id_menu,
         "n_orden":10
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#telefono_1').val(data.p_telefono1 || "");
                $('#telefono_2').val(data.p_telefono2 || "");
                $('#telefono_3').val(data.p_telefono3 || "");
                $('#usuario_act').val(data.p_usr || "");
                $('#f_actualizacion_modal').val(data.p_f_actualizacion || "");
                $('#d_denominacion_telefonos').text(data.p_telefonos_nombre || "");
                $('#telefonos_modal').modal('show');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function guardar_telefono(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{ 
            'p_id_contribuyente':$('#id_contribuyente').val(),
            'p_telefono1':$('#telefono_1').val(),
            'p_telefono2':$('#telefono_2').val(),
            'p_telefono3':$('#telefono_3').val(),
         "id_menu":v_id_menu,
         "n_orden":11
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                mostrar_cuadro('S', 'Éxito', "Teléfonos guardados exitosamente.");
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function generar_plan(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{ 
            'p_g_modifico_seleccion':g_modifico_seleccion,
            'p_sum_t_final':$('#sum_t_final').val().replace(/\./g, '').replace(',', '.'),
            'p_c_tributo':$('#c_tributo').val(),
            'p_pph_n_cuit_acreedor': $('#pph_n_cuit_acreedor').val(),
            'p_id_contribuyente':$('#id_contribuyente').val(),
         "id_menu":v_id_menu,
         "n_orden":12
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK' || data.resultado.startsWith('Plan de Pago Nro:') || data.resultado.startsWith('Contribuyente sin mail')){
                
                if(data.p_error_mail == 1){
                    mostrar_cuadro('I', 'Información', 'Contribuyente sin mail declarado. Sugiera declarar el mismo a través del servicio web de la Agencia.', function(){
                        if(data.p_preguntar == 1){
                            mostrar_cuadro('V','Atención', 'El contribuyente no tiene telefonos cargados, desea cargarlos ahora?',function(){
                                datos_adicionales();
                            }, function(){
                                grabar_plan_de_pagos();
                            });
                        }else{
                            grabar_plan_de_pagos();
                        }
                    });
                }else if(data.p_preguntar == 1){
                    mostrar_cuadro('C','Atención', 'El contribuyente no tiene telefonos cargados, desea cargarlos ahora?',function(){
                        datos_adicionales();
                    }, function(){
                        grabar_plan_de_pagos();
                    } );
                }else{
                    grabar_plan_de_pagos();
                }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}


function grabar_plan_de_pagos(){

    $.ajax({ //prc_guardar_honorarios_en_tmp
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{ 
            'p_tributo':$('#c_tributo').val(),
            'p_pph_n_cuit_acreedor': $('#pph_n_cuit_acreedor').val(),
            'p_id_sesion':sesion,
            'p_pph_d_denominacion_rc': $('#pph_d_denominacion_rc').val(),
            'p_pph_d_caracter_rc': $('#pph_d_caracter_rc').val(),
            'p_pph_d_acredita_rc': $('#pph_d_acredita_rc').val(),
            'p_pph_d_caratula': $('#pph_d_caratula').val(),
            'p_pph_d_expediente': $('#pph_d_expediente').val(),
            'p_pph_n_juzgado': $('#pph_n_juzgado').val(),
            'p_pph_d_juzgado': $('#pph_d_juzgado').val(),
            'p_pph_n_secretaria': $('#pph_n_secretaria').val(),
            'p_pph_d_circunscripcion': $('#pph_d_circunscripcion').val(),
            'p_pph_n_cuit_patrocinante': $('#pph_n_cuit_patrocinante').val(),
         "id_menu":v_id_menu,
         "n_orden":15
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                if (param_exigir_honorarios == 'N' && !data.p_hay_planes_rel){         
                    //si no exijo planes relacionado y no cargó,...por las dudas aviso.

                    mostrar_cuadro('I', 'Información', 'Recuerde que NO cargo ningún plan relacionado!, continúa generando el plan? ',function(){
                        if (param_exigir_honorarios == 'S' && !data.p_hay_planes_rel){
 
                            //si exijo planes relacionado y no cargó ninguno,... no dejo continuar...
                    
                             mostrar_error('NO cargo ningún plan relacionado en Datos del Juicio! ');
                             return;
                    
                        }
                        grabar();

                    }, function(){
                        mostrar_error('Cargue los planes relacionados y vuelva a generar el plan.');
                        return;
                    });
                }else{
                    if (param_exigir_honorarios == 'S' && !data.p_hay_planes_rel){
 
                        //si exijo planes relacionado y no cargó ninguno,... no dejo continuar...
                
                         mostrar_error('NO cargo ningún plan relacionado en Datos del Juicio! ');
                         return;
                
                    }
                    grabar();
                }
                    
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
            }
        });
}

function grabar(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{ 
            'p_id_sesion':sesion,
        "id_menu":v_id_menu,
        "n_orden":13
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK' || data.resultado.startsWith('Plan de Pago Nro:')){
                mostrar_cuadro('S','Éxito', data.resultado);
                $('#n_plan').val(data.p_sesion_n_plan_de_pago);
                clear_pph();
                clear_ppr();
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function SOLAPA_PLAN(ref_2006){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{ 
            'p_id_sesion':sesion,
            'p_g_modifico_seleccion':g_modifico_seleccion,
            'p_g_cant_marcadas_deuda':g_cant_marcadas_deuda,
            'p_tpp_c_tipo_gestion':tpp_c_tipo_gestion,
            'p_g_cant_marcadas_sellos':g_cant_marcadas_sellos,
            'p_seleccionados_comun':to_string(seleccionados_comun),
            'p_seleccionados_sellos':to_string(seleccionados_sellos),
        "id_menu":v_id_menu,
        "n_orden":9
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
            calcula_anticipo_minimo();
            g_modifico_seleccion = data.p_g_modifico_seleccion || g_modifico_seleccion;
            guardados_id = seleccionados_id.slice();

            datos_del_plan(false, ref_2006);
            
            //deuda();
            
            deuda_sellos();

                $('#btn_tab_cuotas_plan').addClass('tab-deshabilitado');
                $('#btn_tab_cuotas_plan').removeAttr('data-toggle');

                // $("#btn_calcular_cuotas").attr('disabled',true);

                if($("#n_cuotas").val() != null || $("#n_cuotas").val() != ""){
                    
                }
                
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                $("#btn_tab_deuda_declarada").click();
                return;
            }
        },
    });
}

function to_string(selecc){
    let string = '';
    selecc.forEach(fecha => {
        string += fecha + '|';
    });
    return string;
}

function imprimir_reporte() {
    $('#main').procOverlay({visible: true});
    let params = 'p_plan|' + $('#n_plan').val()+ '&p_tipo_plan|' + $('#c_tipo_plan').val();
    llamar_report('FACPL002', params, 'PDF');
}

function cargar_deuda_parametro(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{ 
        "p_param_id_oblig_min":param_id_oblig_min,
         "id_menu":v_id_menu,
         "n_orden":14
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
               $('#n_cuit').val(data.p_n_cuit);
               $('#n_cuit').focusout();
               $('#c_tributo').val(data.p_c_tributo);
               $('#c_tributo').blur();
               $('#c_tipo_plan').val(param_tipo_plan);
               $('#c_tipo_plan').blur();
               $('#c_delegacion').val(param_deleg);
               $('#c_delegacion').blur();
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function reformulacion_2006(){
    if (!param_c_tributo ||
        !param_n_cuit ||
        !param_tipo_plan ||
        !param_f_emision ||
        !param_deleg ||
        !param_n_plan_pago_ori ||
        !param_tipo_plan_ori ||
        !param_deuda){
        
          mostrar_error('Falta pasar datos por parámetros');
          return;
      
    }
  
    if (   param_tipo_plan == 152 && 
         !param_d_objeto_hecho){
           mostrar_error('Falta el objeto hecho');
           return;
         }

    $('#n_cuit').val(param_n_cuit);
    $('#n_cuit').focusout();
  
    $('#c_tributo').val(param_c_tributo);
    $('#c_tributo').blur();
  
    if ($('#c_tributo').val() == g_sellos){
      $('#c_concepto').val(param_c_concepto);
      $('#c_concepto').blur();
    }
  
    $('#d_objeto_hecho').val(param_d_objeto_hecho);
    $('#d_objeto_hecho').blur();
  
    $('#c_tipo_plan').val(param_tipo_plan);
    $('#c_tipo_plan').blur();
  
  /*
    if ($('#d_objhecho is null) then
      $('#rb_deuda:= 'C';
    else
      $('#rb_deuda:= 'T';
    end if;
  */
    if(param_deuda == 'C'){
        $('#tipo_deuda_C').prop("checked", true);
    }else if(param_deuda == 'T'){
        $('#tipo_deuda_T').prop("checked", true);
    }
  
    $('#f_actualizacion').val(param_f_emision);
  
    $('#c_delegacion').val(param_deleg);
    $('#c_delegacion').blur();
    $('#d_observaciones').val(param_d_observaciones);
    g_ref_2006 = true;
    buscar(true);
  
}

function limpiar(){
    g_descuento = 'N';

    $('#n_cuit').prop('disabled', false);
    $('#n_cuit').prop('readonly', false);
    $('#d_denominacion').prop('disabled', false);
    $('#d_denominacion').prop('readonly', false);
    $('#c_tipo_documento').prop('disabled', false);
    $('#c_tipo_documento').prop('readonly', false);
    $('#n_documento').prop('disabled', false);
    $('#n_documento').prop('readonly', false);
    $('#c_tributo').prop('disabled', false);
    $('#c_tributo').prop('readonly', false);
    $('#c_tipo_imponible').prop('disabled', false);
    $('#c_tipo_imponible').prop('readonly', false);
    $('#c_concepto').prop('disabled', false);
    $('#c_concepto').prop('readonly', false);
    $('#d_objeto_hecho').prop('disabled', false);
    $('#d_objeto_hecho').prop('readonly', false);
    $('#c_tipo_plan').prop('disabled', false);
    $('#c_tipo_plan').prop('readonly', false);
    $('.rb_deuda').attr('readonly', false);
    $('.rb_deuda').attr('disabled', false);
    $('#f_actualizacion').attr('readonly', false);
    $('#f_actualizacion').attr('disabled', false);
    $('#c_delegacion').attr('readonly', false);
    $('#c_delegacion').attr('disabled', false);
    $('#d_observaciones').attr('readonly', false);
    $('#d_observaciones').attr('disabled', false);
    $('#mascara_lupa_d_denominacion').show();
    $('#lupa_d_denominacion').hide();
    $('#lupa_c_tributo').show();
    $('#mascara_lupa_d_objeto_hecho').show();
    $('#lupa_d_objeto_hecho').hide();
    $('#lupa_c_tipo_plan').show();
    $('#lupa_c_delegacion').show();
    $('#lupa_c_concepto').show();
    $('#btn_buscar').attr('disabled', false);
    $("#tabs_grid").hide();

    $('#n_cuit').val("");
    $('#d_denominacion').val("");
    $('#c_tipo_documento').val("");
    $('#d_tipo_documento').val("");
    $('#n_documento').val("");
    $('#c_tributo').val("");
    $('#d_tributo').val("");
    $('#c_tipo_imponible').val("");
    $('#c_concepto').val("");
    $('#d_concepto').val("");
    $('#d_objeto_hecho').val("");
    $('#c_tipo_plan').val("");
    $('#d_tipo_plan').val("");
    $('#tipo_deuda_C').prop("checked", true);
    $('#f_actualizacion').val("");
    $('#c_delegacion').val("");
    $('#d_delegacion').val("");
    $('#d_observaciones').val("");
    $('#n_plan').val("");
    $('#id_contribuyente').val("");

    $('#btn_obj_gest_j').attr('disabled', true);
    $('#btn_datos_juicio_honorarios').attr('disabled', true);
    sesion = 0;

    g_obj_anterior = 'X';
    g_color_objeto = 'VA_1';

    g_boleta_actual_sel = 0;

    g_objeto_actual_sel = '????';

    g_boleta_nueva_sel = null;
    g_boleta_vieja_sel = null;

    g_cant_marcadas_deuda = 0;
    g_cant_marcadas_sellos = 0;

    g_modifico_seleccion = 'N';
    g_modifico_plan = 'N';

    g_descuento = 'N';

    g_ref_2006 = null;

    ctrl_tiene_deuda_comun = null;
    ctrl_tiene_deuda_sellos = null;
    ctrl_tiene_juicios_cq = null;

    tpp_c_indice_act = null;
    tpp_n_dia_vto = null;
    tpp_n_meses_vto = null;
    tpp_n_cuota_min = null;
    tpp_n_cuota_max = null;
    tpp_c_interes_finan = null;
    tpp_tributo = null;
    tpp_c_concepto = null;
    tpp_p_descuento_interes = null;
    tpp_m_anticipo = null;
    tpp_n_dias_vto_2 = null;
    tpp_i_tasa_sellado = null;
    tpp_n_dias_max_emision = null;
    tpp_m_tipo_minimo_cuota = null;
    tpp_d_tipo_minimo_cuota = null;
    tpp_f_vig_hasta = null;
    tpp_m_multiobjeto = null;
    tpp_p_COND_INTERES_CAPITAL = null;
    tpp_I_COND_DEUDA_SUPERIOR = null;
    tpp_c_periodicidad = null;
    tpp_F_DEUDA_DESDE = null;
    tpp_F_DEUDA_HASTA = null;
    tpp_N_TABLA_PERIOD = null;
    tpp_N_TABLA_TIPO_CALC = null;
    tpp_c_seg_riesgo = null;
    tpp_c_tipo_gestion = null;

    seleccionados_comun = [];
    seleccionados_id = [];
    guardados_id = [];
    seleccionados_sellos = [];

    habilitar_honorarios();
}

function habilitar_honorarios(){
    if ($('#c_tributo').val() == 110){
  	
    //null;
   
    }else{
        
        if ($('#pph_n_cuit_acreedor').val()){
            clear_pph();
        }
        
        if ($('#planes_pago_grid').getCell(1,'n_plan_pago_rel')){
            clear_ppr();
        }            
    }
}

function abm_ppr(params){
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: params,
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                $('#planes_pago_grid').trigger('reloadGrid');
                $('#abm_modal').modal("hide");
                clear_modal_inputs();
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function clear_modal_inputs(){
    $('#n_plan_rel_modal').val("");
}

function clear_pph(){
    $('#pph_n_cuit_acreedor').val("");
    $('#pph_d_denominacion_acreedor').val("");
    $('#pph_d_denominacion_rc').val("");
    $('#pph_d_caracter_rc').val("");
    $('#pph_d_acredita_rc').val("");
    $('#pph_d_caratula').val("");
    $('#pph_d_expediente').val("");
    $('#pph_n_juzgado').val("");
    $('#pph_d_juzgado').val("");
    $('#pph_n_secretaria').val("");
    $('#pph_d_circunscripcion').val("");
    $('#pph_n_cuit_patrocinante').val("");
    $('#pph_d_patrocinante').val("");
}

function clear_ppr(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{ 
        "p_id_sesion":sesion,
         "id_menu":v_id_menu,
         "n_orden":17
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#planes_pago_grid').trigger('reloadGrid');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function validate_n_plan_pago_rel(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{ 
        "p_id_contribuyente":$('#id_contribuyente').val(),
        'p_n_plan_pago_rel':$('#n_plan_rel_modal').val(),
        'p_d_objeto_hecho': $('#deuda_declarada_grid').getCell(1,'d_objeto_hecho'),
         "id_menu":v_id_menu,
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

function datos_honorarios(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{ 
        "p_c_tributo":$('#c_tributo').val(),
        "p_g_boleta_nueva_sel": g_boleta_nueva_sel,
         "id_menu":v_id_menu,
         "n_orden":19
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#pph_d_expediente').val(data.p_pph_d_expediente      || $('#pph_d_expediente').val() );
                $('#pph_n_cuit_acreedor').val(data.p_pph_n_cuit_acreedor   || $('#pph_n_cuit_acreedor').val() );
                $('#pph_n_cuit_acreedor').blur();
                $('#pph_d_juzgado').val(data.p_pph_d_juzgado         || $('#pph_d_juzgado').val() );
                $('#pph_d_circunscripcion').val(data.p_pph_d_circunscripcion || $('#pph_d_circunscripcion').val() );
                $('#pph_n_cuit_patrocinante').val(data.p_pph_n_cuit_patrocinante || $('#pph_n_cuit_patrocinante').val());
                $('#pph_n_cuit_patrocinante').blur();
                $('#pph_n_secretaria').val(data.p_pph_n_secretaria      || $('#pph_n_secretaria').val() );
                $('#pph_n_juzgado').val(data.p_pph_n_juzgado         || $('#pph_n_juzgado').val() );
                $('#pph_d_caratula').val(data.p_pph_d_caratula        || $('#pph_d_caratula').val() );

                if(data.p_bloquear == 1){
                    if ($('#c_tributo').val() == "110"){
  	
                        $('#pph_n_cuit_acreedor').prop('disabled', true);
                        $('#pph_n_cuit_patrocinante').prop('disabled', true);
                        $('#pph_d_expediente').prop('disabled', true);	
                        $('#pph_d_circunscripcion').prop('disabled', true);
                        $('#pph_d_caratula').prop('disabled', true);	
                        $('#pph_n_secretaria').prop('disabled', true);
                        $('#pph_n_juzgado').prop('disabled', true);
                        $('#pph_d_juzgado').prop('disabled', true);
                    }
                }
                setea_parametros('#planes_pago_grid',{':p_id_sesion': sesion });
                $('#honorarios_modal').modal('show');
                $(window).resize();
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}


