function inicializarEventos() {

    $('#lupa_d_objeto_hecho').hide();
    $('#lupa_c_banco_emisor').hide();
    $('#div_grid').hide();
    

    $('.datepicker.no_maxdate').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    });

    $('.datepicker.maxdate').datepicker({
        maxDate: 0,
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    });

    

    $("#f_pago").change(function (){
        if (to_date($(this).val()) > to_date(fecha_hoy)){ 
            mostrar_cuadro('E', 'Error', 'Debe ingresar una fecha menor a la del día de hoy.');
            $(this).val("");
            return;
        }
        let f_pago_mas_90 = f_mas_90_dias($(this).val());
        if (to_date(f_pago_mas_90)  < to_date($('#f_interes').val())){
            mostrar_cuadro('E', 'Error', 'La fecha de Vto de Liquidación no puede superar a la fecha de pago por más de 90 días');
            $(this).val("");
            return;
        }

            $('#f_interes_real').val($('#f_interes').val());
            if (to_date($(this).val()) > to_date($('#f_interes').val()) &&
                !$('#chk_aut').is(':checked')){
                $('#f_interes_real').val($(this).val());
            }

        $('#f_acred').val("");
        $('#f_interes').val("");
    });

    $("#f_pago").focus(function (){
        if ($(this).val() == ""){
            $(this).val(fecha_hoy);
            $(this).change();
        }else{
            $('#f_acred').val("");
            $('#f_interes').val("");
        }
    });

    $("#f_acred").change(function (){
        if (to_date($(this).val()) > to_date(fecha_hoy)){ 
            mostrar_cuadro('E', 'Error', 'Debe ingresar una fecha menor a la del día de hoy.');
            $(this).val("");
            return;
        }else if(to_date($(this).val()) < to_date($("#f_pago").val())){
            mostrar_cuadro('E', 'Error', 'Debe estar comprendido en un rango de ' + $("#f_pago").val() + ' a ...');
            $(this).val("");
            return;
        }
    });

    $("#f_acred").dblclick(function (){
        if ($(this).val() == ""){
            $(this).val(fecha_hoy);
            $(this).change();
        }
    });

    $("#f_acred").focus(function (){
        if ($(this).val() == ""){
            $(this).val($('#f_pago').val());
            $(this).change();
        }
    });

    $("#f_interes").change(function (){

        let f_pago_mas_90 = f_mas_90_dias($('#f_pago').val());
        if (to_date(f_pago_mas_90)  < to_date($(this).val())){
            mostrar_cuadro('E', 'Error', 'La fecha de Vto de Liquidación no puede superar a la fecha de pago por más de 90 días');
            $(this).val("");
            return;
        }

        $( "#chk_aut" ).prop( "checked", false);
        if (to_date($('#f_pago').val()) > to_date($(this).val())){
            mostrar_cuadro('C', 'Pago fuera de termino', '¿Esta autorizado a pagar liquidación vencida?', function(){
                $( "#chk_aut" ).prop( "checked", true);
                $( "#chk_aut" ).change();
            });
        }else{
            $( "#chk_aut" ).prop( "checked", false);
            $( "#chk_aut" ).change();
        }
        $('#f_interes_real').val($(this).val());
        if (to_date($('#f_pago').val()) > to_date($(this).val()) &&
            !$('#chk_aut').is(':checked')){
            $('#f_interes_real').val($('#f_pago').val());
        }
    });

    $("#f_interes").dblclick(function (){
        if ($(this).val() == ""){
            $(this).val(fecha_hoy);
            $(this).change();
        }
    });

    $("#f_interes").focus(function (){
        if ($(this).val() == ""){
            $(this).val($('#f_pago').val());
            $(this).change();
        }
    });

    $('#chk_aut').change(function(){
        $('#f_interes_real').val($('#f_interes').val());
        if (to_date($('#f_pago').val()) > to_date($('#f_interes').val()) &&
            !$(this).is(':checked')){
            $('#f_interes_real').val($('#f_pago').val());
        }
    });

    $('#c_medio_pago').focus(function(){
        if ($(this).val() == ""){
            $(this).val(1);
        }
    });

    $('#pos_fiscal').change(function(){
        buscar_obligacion();
    });

    $('#n_cuota').change(function(){
        buscar_obligacion();
    });

    $('#i_total').focusout(function(){
        calcular_capital_interes($(this).val());
    });

    $('#i_total, #i_capital, #i_interes, #i_saldo_actual, #tot_capital, #tot_interes, #tot_totales').change(function () {
        $(this).val(formatea_number(mascara_numero(parse($(this).val()).toFixed(2), ',', -1, 2), ''));
    });

    $('#pos_fiscal, #n_cuota, #c_concepto, #c_concepto_mov, #c_tributo, #n_comprobante, #c_banco_rec, #c_sucursal_rec, #c_medio_pago, #c_banco_emisor, #n_cheque').on('input', function() {
        let inputValue = $(this).val();
    
        inputValue = inputValue.replace(/\D/g, '');
    
        $(this).val(inputValue);
      });

    $('#btn_imputar').click(function(){
        if ($('#frm_contrib').validationEngine('validate') && $('#frm_datos_pago').validationEngine('validate')){
            if ($('#main_grid')[0].rows.length <= 1 || id_ing_indiv_pagos_def == null){
                mostrar_cuadro('E', 'Error', 'Debe ingresar datos en las Cuotas que se van a imputar');
                return;
            }
            procesar_pago();
        }
    });

    $('#btn_limpiar').click(function(){
        clear_inputs();
        $('#div_grid').hide();
    });

    $('#btn_cargar').click(function(){
        if ($('#frm_contrib').validationEngine('validate') && $('#frm_datos_pago').validationEngine('validate')){
            disable_inputs();
            set_id_ing_indiv_pagos_def();
            $('#div_grid').show();
            $(window).resize();
        }
    });

    $('#btn_aceptar').click(function () {
        if ($('#id_obligacion').val() != ""){
            if ($('#frm_cuota').validationEngine('validate')) {
                var params = {
                    p_c_concepto:$('#c_concepto').val(),
                    p_pos_fiscal:$('#pos_fiscal').val(),
                    p_n_cuota:$('#n_cuota').val(),
                    p_f_vto:$('#f_vto').val(),
                    p_c_concepto_mov: $('#c_concepto_mov').val(),
                    p_i_capital: $('#i_capital').val().replace(/\./g, '').replace(',', '.'),
                    p_i_interes: $('#i_interes').val().replace(/\./g, '').replace(',', '.'),
                    p_i_total: $('#i_total').val().replace(/\./g, '').replace(',', '.'),
                    p_i_saldo_actual: ($('#i_saldo_actual').val().replace(/\./g, '').replace(',', '.') || 0.00),
                    p_id_obligacion: $('#id_obligacion').val(),
                    p_id_ing_indiv_pagos_def: id_ing_indiv_pagos_def,
                    p_n_fila: $('#n_fila').val(),
                    id_menu: v_id_menu,
                    n_orden: 3,
                    p_oper: $('#p_oper').val()
                };
                abm_cuotas(params);
            }
        }else{
            mostrar_cuadro('E', 'Error', 'No se pudo determinar la obligacion con los datos del Contribuyente');
        }
    });

    $('#btn_cargar_datos').click(function () {
        cargar_datos();
    });


    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_trib,
        titulos:['Cód. Tributo','Tributo', 'Tipo Imponible'],
        grid:[{index:'c_codigo',width:150},
            {index:'d_tributo',width:400},
            {index:'c_tipo_imponible',width:150}],
        caption:'Lista de Tributos',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tributo',d_tributo:'d_tributo', c_tipo_imponible: 'c_tipo_imponible'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
    });

    $("#lupa_d_objeto_hecho").lupa_generica({
		id_lista:v_lista_obj,
		titulos:['Objeto-Hecho','CUIT', 'Denominación', 'ID Contribuyente'],
		grid:[{index:'d_objeto_hecho',width:150}, {index:'n_cuit',width:100}, {index:'d_denominacion',width:200}, {index:'id_contribuyente',width:120}],
		caption:'Lista de Objetos - Hechos',
		sortname:'d_objeto_hecho',
		sortorder:'asc',
		filtros:['#c_tributo','#d_objeto_hecho'],
		filtrosTitulos:['Tributo','Objeto'],
		filtrosNulos:[true, true],
		campos:{d_objeto_hecho:'d_objeto_hecho',n_cuit:'n_cuit', d_denominacion:'d_denominacion', id_contribuyente:'id_contribuyente'},
		keyNav:true,
		draggable:true
	});

    $("#lupa_inmueble").lupa_generica({
		id_lista:v_lista_nomen,
		titulos:['Nomenclatura Real', 'Nomenclatura'],
		grid:[{index:'d_nomenclatura_real',width:200}, {index:'d_nomenclatura',width:100}],
		caption:'Lista de Nomenclaturas',
		sortname:'d_nomenclatura_real',
		sortorder:'asc',
		campos:{d_nomenclatura_real:'d_nomenclatura_real', d_nomenclatura: 'd_objeto_hecho'},
		keyNav:true,
		draggable:true
	});

    $("#btn_lupa_inmueble").click(function(){
        if ($('#c_tributo').val() == 60){
            $("#lupa_inmueble").click();
        }
    });

	$('#d_objeto_hecho').keydown(function () {
		if ($('#d_objeto_hecho').val().length >= 2){
			$('#lupa_d_objeto_hecho').show().css('display', 'table-cell');
			$('#mascara_lupa_d_objeto_hecho').hide();
		} else {
			$('#lupa_d_objeto_hecho').hide();
			$('#mascara_lupa_d_objeto_hecho').show().css('display', 'table-cell');
		}
	});

    $("#lupa_c_tipo_form").lupa_generica({
        id_lista:v_lista_tipo_form,
        titulos:['Cód. Tipo Form','Tipo Form'],
        grid:[{index:'c_codigo',width:150},
            {index:'d_descrip',width:415}],
        caption:'Lista de Tipos de Forms',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:['239'],
        campos:{c_codigo:'c_tipo_form',d_descrip:'d_tipo_form'},
        keyNav:true,
        searchInput: '#c_tipo_form',
        searchCode: true,
        limpiarCod: true,
    });

    $("#lupa_c_banco_rec").lupa_generica({
        id_lista:v_lista_bancos,
        titulos:['Cód. Banco','Banco'],
        grid:[{index:'c_codigo',width:150},
            {index:'d_descrip',width:415}],
        caption:'Lista de Bancos',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_banco_rec',d_descrip:'d_banco_rec'},
        keyNav:true,
        searchInput: '#c_banco_rec',
        searchCode: true,
        limpiarCod: true,
        onClose: function(){
            $('#c_sucursal_rec').val(null);
            $('#d_sucursal_rec').val(null);
        }
    });

    $("#lupa_c_sucursal_rec").lupa_generica({
        id_lista:v_lista_sucur,
        titulos:['Cód. Sucursal','Sucursal'],
        grid:[{index:'c_codigo',width:150},
            {index:'d_descrip',width:415}],
        caption:'Lista de Sucursales',
        sortname:'c_codigo',
        sortorder:'asc',
        filtros:['#c_banco_rec'],
		filtrosTitulos:['Banco Receptor'],
		filtrosNulos:[false],
        campos:{c_codigo:'c_sucursal_rec',d_descrip:'d_sucursal_rec'},
        keyNav:true,
        searchInput: '#c_sucursal_rec',
        searchCode: true,
        limpiarCod: true,
    });

    $("#lupa_c_medio_pago").lupa_generica({
        id_lista:v_lista_mp,
        titulos:['Cód. Medio de Pago','Medio de Pago'],
        grid:[{index:'c_codigo',width:150},
            {index:'d_descrip',width:415}],
        caption:'Lista de Sucursales',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_medio_pago',d_descrip:'d_medio_pago'},
        keyNav:true,
        searchInput: '#c_medio_pago',
        searchCode: true,
        limpiarCod: true,
        onClose: function(){
            habilitar_campos();
        }
    });

    $("#lupa_c_banco_emisor").lupa_generica({
        id_lista:v_lista_bancos,
        titulos:['Cód. Banco','Banco'],
        grid:[{index:'c_codigo',width:150},
            {index:'d_descrip',width:415}],
        caption:'Lista de Bancos',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_banco_emisor',d_descrip:'d_banco_emisor'},
        keyNav:true,
        searchInput: '#c_banco_emisor',
        searchCode: true,
        limpiarCod: true,
    });

    $("#lupa_c_concepto").lupa_generica({
        id_lista:v_lista_conceptos,
        titulos:['Cód. Concepto','Concepto'],
        grid:[{index:'c_codigo',width:150},
            {index:'d_descrip',width:415}],
        caption:'Lista de Conceptos',
        sortname:'c_codigo',
        sortorder:'asc',
        filtros:['#c_tributo', '#d_objeto_hecho', '#c_tipo_imponible'],
		filtrosTitulos:['Tributo', 'Objeto', 'Tipo Imponible'],
		filtrosNulos:[false, false, false],
        campos:{c_codigo:'c_concepto',d_descrip:'d_concepto'},
        keyNav:true,
        searchInput: '#c_concepto',
        searchCode: true,
        limpiarCod: true,
        onClose: function(){
           buscar_obligacion();
        }
    });

    $("#lupa_c_concepto_mov").lupa_generica({
        id_lista:v_lista_conceptos_mov,
        titulos:['Cód. Concepto Mov','Concepto Mov'],
        grid:[{index:'c_codigo',width:150},
            {index:'d_descrip',width:415}],
        caption:'Lista de Conceptos de Movimiento',
        sortname:'c_codigo',
        sortorder:'asc',
        filtros:['#c_tributo'],
		filtrosTitulos:['Tributo'],
		filtrosNulos:[false],
        campos:{c_codigo:'c_concepto_mov',d_descrip:'d_concepto_mov'},
        keyNav:true,
        searchInput: '#c_concepto_mov',
        searchCode: true,
        limpiarCod: true,
        onClose: function(){
            buscar_saldos();
         }
    });
}