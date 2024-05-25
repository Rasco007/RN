function init_eventos(){
    $('#lupa_d_objeto_hecho').hide();
    $('#lupa_d_denominacion').hide();
    set_monto_tasa_980();
    set_const_dias_futuro();
    $("#n_cuit").mask("99-99999999-9");

    $("#div_inmueble").hide();
    $("#div_auto").hide();
    $("#div_generar_boleta").hide();
    $("#div_domicilio").hide();

    $('#btn_limpiar').click(function(){
        $("#n_cuit").attr('disabled',false);
        $("#d_objeto_hecho").attr('disabled',false);
        $("#d_denominacion").attr('readonly',false);
        $("#c_tipo_imponible").attr('readonly',false);
        $("#c_tributo").attr('readonly',false);
        $("#pos_fiscal_desde").val(null);
        $("#pos_fiscal_hasta").val(null);
        $("#c_concepto").val(null);
        $("#d_concepto").val(null);
        $("#pos_fiscal_desde").prop('disabled',false);
        $("#pos_fiscal_hasta").prop('disabled',false);
        $("#c_concepto").prop('disabled',false);
        $("#tipo_oper").prop('disabled',false);
        $('#lupa_d_objeto_hecho').hide();
		$('#mascara_lupa_d_objeto_hecho').show().css('display', 'table-cell');
        $('#lupa_d_denominacion').hide();
		$('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        $('#lupa_c_tipo_imponible').show().css('display', 'table-cell');
        $('#lupa_c_tributo').show().css('display', 'table-cell');
        //DATOS PERSONALES
        $("#n_cuit").val(null);
        $("#d_denominacion").val(null);
        $("#id_contribuyente").val(null);
        $("#c_tipo_imponible").val(null);
        $("#c_tributo").val(null);
        $("#d_tipo_imponible").val(null);
        $("#d_tributo").val(null);
        $("#d_objeto_hecho").val(null);
        //DATOS BOLETA
        $("#f_vto_pago_anticipado").val(null);
        $("#importe").val(null);
       //DATOS DOMICILIO
         $('#calle').val(null);
         $('#nro').val(null);
         $('#piso').val(null);
         $('#dpto').val(null);
         $('#of').val(null);
         $('#monoblock').val(null);
         $('#puerta').val(null);
         $('#manzana').val(null);
         $('#c_postal').val(null);
         $('#localidad').val(null);
         $('#depto_localidad').val(null);
         $('#provincia').val(null);
       //DATOS INMUEBLE
         $('#partida').val(null);
         $('#nomenclatura').val(null);
         $('#titular').val(null);
         $('#domicilio').val(null);
         $('#sup_terreno').val(null);
         $('#valor_terreno').val(null);
         $('#sup_edificada').val(null);
         $('#valor_sup_edificada').val(null);
       //DATOS RODADO
         $('#dominio').val(null);
         $('#dominio_anterior').val(null);
         $('#marca').val(null);
         $('#modelo').val(null);
         $('#descripcion').val(null);
         $('#año_modelo').val(null);
        $("#f_vto_pago_anticipado,#importe").prop('disabled',true);
        //OCULTAR SOLAPAS
        $("#div_inmueble").hide();
        $("#div_auto").hide();
        $("#div_generar_boleta").hide();
        $("#div_domicilio").hide();
    });

    $("#btn_buscar").click(function(){
        if($("#c_tributo").val() &&  $("#d_objeto_hecho").val()){
            v_n_cuit = $("#n_cuit").val();

            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{     
                 "d_objeto_hecho":$("#d_objeto_hecho").val(),
                 "id_contribuyente":$("#id_contribuyente").val(),
                 "c_tributo":$("#c_tributo").val(),
                 "id_menu":v_id_menu,
                 "n_orden":6
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        $("#f_vto_pago_anticipado,#importe").prop('disabled',false);
                        $("#n_cuit").attr('disabled',true);
                        $("#d_objeto_hecho").attr('disabled',true);
                        $("#d_denominacion").attr('readonly',true);
                        $("#c_tipo_imponible").attr('readonly',true);
                        $("#c_tributo").attr('readonly',true);
                        $('#lupa_d_objeto_hecho').hide();
                        $('#lupa_c_tipo_imponible').hide();
                        $('#lupa_c_tributo').hide();
                        $('#lupa_d_denominacion').hide();
                    //DATOS PERSONALES
                     $("#n_cuit").val(data.v_n_cuit);
                     $("#d_denominacion").val(data.v_d_denominacion);
                     $("#id_contribuyente").val(data.v_id_contrib);
                     $("#c_tipo_imponible").val(data.v_c_tipo_imponible);
                     $("#c_tipo_imponible").blur();

                     $("#d_objeto_hecho").val(data.v_d_objeto_hecho);
                    //DATOS DOMICILIO
                      $('#calle').val(data.v_d_calle);
                      $('#nro').val(data.v_n_numero);
                      $('#piso').val(data.v_d_piso);
                      $('#dpto').val(data.v_d_depto);
                      $('#of').val(data.v_d_oficina);
                      $('#monoblock').val(data.v_d_monoblock);
                      $('#puerta').val(data.v_d_puerta);
                      $('#manzana').val(data.v_d_manzana);
                      $('#c_postal').val(data.v_c_postal);
                      $('#localidad').val(data.v_localidad);
                      $('#depto_localidad').val(data.v_departamento);
                      $('#provincia').val(data.v_provincia);
                    //DATOS INMUEBLE
                      $('#partida').val(data.v_d_nomenclatura);
                      $('#nomenclatura').val(data.v_d_nomenclatura_real);
                      $('#titular').val(data.v_d_titular);
                      $('#domicilio').val(data.v_d_domicilio);
                      $('#sup_terreno').val(data.v_n_superficie_terr);
                      $('#valor_terreno').val(data.v_i_avaluo_tierra);
                      $('#sup_edificada').val(data.v_n_superficie_edif);
                      $('#valor_sup_edificada').val(data.v_i_avaluo_edif);
                    //DATOS RODADO
                      $('#dominio').val(data.v_d_patente);
                      $('#dominio_anterior').val(data.v_d_patente_vieja);
                      $('#marca').val(data.v_d_descrip_marca);
                      $('#modelo').val(data.v_d_descrip_modelo);
                      $('#descripcion').val(data.v_d_texto_descripcion);
                      $('#año_modelo').val(data.v_n_modelo_año);

                      if(data.v_d_patente){
                        $("#div_auto").show();
                      }
                      if(data.v_d_nomenclatura){
                        $("#div_inmueble").show();
                        $("#div_generar_boleta").show();                        
                      }
                      $("#div_generar_boleta").show();
                      $("#div_domicilio").show();

                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
            return;
        }
        mostrar_cuadro('I','Atención','Debe completar los campos: Tributo, y Objeto');
        return;
    });

    $("#btn_consultar").click(function(){
        cant_marcadas    = 0;
        tiene_dj_error   = 'N';
        tiene_inspeccion = 'N';
        selecciono_980 = 'N';
        distribuir       = 'N';
        cuota_parcial    =  0;
        filtros_no_nativos = [];
        filtros_arr_main = [];
        if($('#pos_fiscal_desde').val() != ''){
            filtros_arr_main.push('Posición Fiscal Desde: '+ $('#pos_fiscal_desde').val());
        }
        if($('#pos_fiscal_hasta').val() != ''){
            filtros_arr_main.push('Posición Fiscal Hasta: '+ $('#pos_fiscal_hasta').val());
        }
        if($('#c_concepto').val() != ''){
            filtros_arr_main.push('Código concepto: '+ $('#c_concepto').val());
        }
        filtros_no_nativos_ar['detalle_deuda_grid'] = filtros_arr_main;
        let cuit = null;
        if (v_n_cuit){
            cuit = v_n_cuit.replace(/-/g, '');
        }
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_cuit": $('#n_cuit').val().replace(/-/g, ''),
                 "p_cuit_ingresado": cuit,   
                 "p_objeto_hecho":$("#d_objeto_hecho").val(),
                 "p_tributo":$("#c_tributo").val(),
                 "p_tipo_imponible":$("#c_tipo_imponible").val(),
                 "p_concepto":$("#c_concepto").val(),
                 "p_pos_desde":$("#pos_fiscal_desde").val(),
                 "p_pos_hasta":$("#pos_fiscal_hasta").val(),
                 "p_tipo_oper":$("#tipo_oper").find(":selected").val(),
                 "p_consulta_juicio":v_consulta_juicio,
                 "id_menu":v_id_menu,
                 "n_orden":1
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        if (data.p_rta == 'OK' || data.p_rta == 'OK-CQC'){
                            $('#chk_marcar_todas').prop('checked', false);
                            $('#dinero_pagar').val('0,00');
                            $('#tot_pagar').val('0,00');
                            $('#restante').val('0,00');
                            $('#modif_f_vencimiento').val($('#f_vencimiento').val());
                            $('#modif_f_actualiza').val($('#f_actualiza').val());
                            color_imp_restante();
                            disable_btns();
                            if(!($("#c_tributo").val() == 10 || $("#c_tributo").val() == 20)){
                                $("#detalle_deuda_grid").jqGrid('hideCol',['error_dj']);
                            }
                            id_sesion = data.p_id_sesion;
                            setea_parametros('#detalle_deuda_grid',{':p_id_sesion':data.p_id_sesion});
                            id_sesion_impresion = null;
                            $("#f_vencimiento").val(data.p_f_venc);
                            $("#f_actualiza").val(data.p_f_actualiza);
                            //calcular_totales(data.p_id_sesion);
                            evento_dinero_para_pagar();
                            $('#deuda_modal').modal("show");
                            $(window).resize();
                            alertas_deuda(data.p_rta);
                            return;
                        }else{
                            mostrar_cuadro('E', 'Error', data.p_rta);
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

    $("#btn_limpiar_modal").click(function(){
        $('#dinero_pagar').val('0,00');

        if (cuota_parcial != 0){
            distribuir_dinero();
        }else{
            distribuir = 'N';
            actualizar_total_y_restante();
        }
    });

    $("#btn_distribuir").click(function(){
        let tipo_oper = $("#tipo_oper").find(":selected").val();
        if(tipo_oper == 'J' && cant_marcadas == 0 ){
            mostrar_cuadro('E', 'Error', 'Debe marcar un Juicio antes de Distribuir!!');
        }else{		
            distribuir_dinero();
        }
    });

    $("#chk_marcar_todas").change(function(){
        if($("#chk_marcar_todas").is(':checked')){
            $('.checkbox:checkbox:not(:checked)').click();
            $('.checkbox:checkbox:checked').click().click();
        }else{
            $('.checkbox:checkbox:checked').click();
        }
    });

    $("#btn_modif_fecha").click(function(){
        let tipo_oper = $("#tipo_oper").find(":selected").val();
        if (tipo_oper =='J' || tipo_oper == 'T' || tipo_oper == 'B'|| tipo_oper == 'D'|| tipo_oper =='F'|| tipo_oper == 'V'){
            $("#modif_f_actualiza").attr('disabled',false);
        }else{
            $("#modif_f_actualiza").attr('disabled',true);  
        }
        $('#modif_f_vencimiento').val($('#f_vencimiento').val());
        $('#modif_f_actualiza').val($('#f_actualiza').val());
        $('#modif_f_modal').modal("show");
        // $( ".datepicker" ).datepicker( "option", "changeMonth", true );
        // $( ".datepicker" ).datepicker( "option", "changeYear", true );
        $( "#modif_f_actualiza" ).datepicker( "option", "changeMonth", true );
        $( "#modif_f_vencimiento" ).datepicker( "option", "changeYear", true );
        $( "#modif_f_actualiza" ).datepicker( "option", "changeYear", true );
        $( "#modif_f_vencimiento" ).datepicker( "option", "changeMonth", true );
    });

    $("#btn_aceptar").click(function(){
        $('#main').procOverlay({visible:true});
        modificar_fechas();
    });

    $("#btn_hoy").click(function(){
        $('#modif_f_vencimiento').val(fecha_hoy);
        $('#modif_f_actualiza').val(fecha_hoy);
    });

    $("#btn_emitir").click(function(){
        $('#main').procOverlay({visible:true});
        emitir_y_pagar(false);
    });

    $("#btn_emitir_y_pagar").click(function(){
        $('#main').procOverlay({visible:true});
        emitir_y_pagar(true);
    });

    $('#pos_fiscal_desde, #pos_fiscal_hasta, #c_tipo_imponible, #c_concepto, #c_tributo').on('input', function() {
        let inputValue = $(this).val();
    
        inputValue = inputValue.replace(/\D/g, '');
    
        $(this).val(inputValue);
      });

    $(".datepicker").datepicker({
        // changeMonth:true,
        // changeYear:true,
        dateFormat:'dd/mm/yy',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá']
    }).mask('99/99/9999').change(function () {
        if ($(this).val().length > 0 && $(this).val().length != 10){
            mostrar_error("El Formato de la Fecha ingresada no es válido.");
            $(this).val(null);
        }
    });

    $(".mascara_importe").keydown(function(event){
        return controla_number(event, this, 2);
    });

    $("#lupa_c_tipo_imponible").lupa_generica({
        id_lista:v_lista_timp,
        titulos:['Cód. Tipo Imponible','Tipo Imponible'],
        grid:[{index:'c_codigo',width:150},
            {index:'d_descrip',width:400}],
        caption:'Lista de Tipos Imponibles',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:['3'],
        campos:{c_codigo:'c_tipo_imponible',d_descrip:'d_tipo_imponible'},
        keyNav:true,
        searchInput: '#c_tipo_imponible',
        searchCode: true,
    });

    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_trib,
        titulos:['Cód. Tributo','Tributo'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:250}],
        caption:'Lista de Tributos',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:['#c_tipo_imponible'],
        filtrosNulos:[true],
        filtrosTitulos:['Tipo Imponible'],
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
        limpiarCod: true,
    });

    $("#lupa_c_concepto").lupa_generica({
        id_lista:v_lista_concepto,
        titulos:['Cód. Conceptos','Conceptos'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:250}],
        caption:'Lista de Conceptoss',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:['#c_tributo', '#d_objeto_hecho'],
        filtrosNulos:[false],
        filtrosTitulos:['Tributo, Objeto Hecho'],
        campos:{c_codigo:'c_concepto',d_descrip: 'd_concepto'},
        keyNav:true,
        searchInput: '#c_concepto',
        searchCode: true,
        limpiarCod: true,
    });

    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() != ''){
            try{
                if( limpia_cuit($('#n_cuit').val()).length == 11 ){
                    $.ajax({
                        type:'POST',
                        url: "ajax_genericos/autocomplete.php",
                        data: {oper:'3',term: limpia_cuit($('#n_cuit').val())},
                        dataType: 'json',
                        success: function( data ) {
                            ajax_autocomplete = null;
                            if(data) {
                                $("#d_denominacion").val(data.data_raz[0].razon_social);
                                $("#id_contribuyente").val(data.data_raz[0].id_contribuyente);
                                $('#d_objeto_hecho').keydown();
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

    $("#lupa_d_objeto_hecho").lupa_generica({
		id_lista:vg_lista_objetos,
		titulos:['Objeto-Hecho', 'ID Contribuyente', 'CUIT', 'Denominación', 'Tributo'],
		grid:[{index:'d_objeto_hecho',width:100}, {index:'id_contribuyente',width:100}, {index:'n_cuit',width:100}, {index:'d_denominacion',width:200}, {index:'c_tributo',width:100}],
		caption:'Lista de Objetos - Hechos',
		sortname:'d_objeto_hecho',
		sortorder:'desc',
		filtros:['#c_tributo','#id_contribuyente', '#d_objeto_hecho'],
		filtrosTitulos:['Tributo','ID Contribuyente', 'Objeto'],
		filtrosNulos:[false, true, true],
		campos:{d_objeto_hecho:'d_objeto_hecho', id_contribuyente:'id_contribuyente', n_cuit:'n_cuit', d_denominacion:'d_denominacion', c_tributo:'c_tributo'},
		keyNav:true,
		draggable:true
	});

	$('#d_objeto_hecho').keydown(function () {
		if ($('#d_objeto_hecho').val().length >= 2 || $('#id_contribuyente').val()){
			$('#lupa_d_objeto_hecho').show().css('display', 'table-cell');
			$('#mascara_lupa_d_objeto_hecho').hide();
		} else {
			$('#lupa_d_objeto_hecho').hide();
			$('#mascara_lupa_d_objeto_hecho').show().css('display', 'table-cell');
		}
	});

    $("#lupa_d_denominacion").lupa_generica({
		id_lista:vg_lista_denominaciones,
		titulos:['ID contribuyente', 'CUIT', 'Denominación','Código de Documento', 'Tipo de Documento', 'Numero de Documento', 'F. Alta'],
		grid:[{index:'id_contribuyente',width:100, hidden:true}, {index:'n_cuit',width:100}, {index:'d_denominacion',width:200},{index:'c_tipo_documento',width:140, hidden:true}, {index:'d_tipo_documento',width:140}, {index:'n_documento',width:160}, {index:'f_alta',width:80}],
		caption:'Lista de Denominaciones',
		sortname:'d_denominacion',
		sortorder:'asc',
		filtros:['#d_denominacion'],
		filtrosTitulos:['Denominación'],
		filtrosNulos:[false],
		campos:{id_contribuyente:'id_contribuyente', n_cuit: 'n_cuit', d_denominacion:'d_denominacion', d_tipo_documento:'d_tipo_documento', n_documento: 'n_documento', f_alta:'f_alta'},
		keyNav:true,
		draggable:true,
        onClose:function(){
            $('#d_objeto_hecho').keydown();
        }
	});

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

}
