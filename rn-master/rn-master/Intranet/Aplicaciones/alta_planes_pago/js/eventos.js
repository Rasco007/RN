async function init_eventos(){
    if (param_tipo == 'COMUN') {
        if (param_concurso_quiebra == 'C') {
            $('#title').text('Alta Planes de Pago de Concurso');
        }else if(param_concurso_quiebra == 'J') {
            $('#title').text('Alta Planes de Pago de Juicios');       
        }else if(param_concurso_quiebra == 'Q') {
            $('#title').text('Alta Planes de Pago de Quiebra'); 
        }else{ 
            $('#title').text('Alta Planes de Pago');  
        }
    }else{ 
        if (param_concurso_quiebra == 'C') { 
            $('#title').text('Alta Planes de Pago de Concurso');   
        }else if(param_concurso_quiebra == 'J') {
            $('#title').text('Alta Planes de Pago de Juicios');       
        }else if(param_concurso_quiebra == 'Q') { 
            $('#title').text('Alta Planes de Pago de Quiebra');   
        }else{
            $('#title').text('Alta Planes de Pago Retroactivos');
        }
    }

    $('#lupa_d_objeto_hecho').hide();
    $("#n_cuit").mask("99-99999999-9");
    $('#lupa_d_denominacion').hide();
    $('#btn_obj_gest_j').attr('disabled', true);
    $('#btn_datos_juicio_honorarios').attr('disabled', true);

    await obtener_constantes();

    $(".datepicker").datepicker({
        changeMonth:true,
        changeYear:true,
        dateFormat:'dd/mm/yy',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],

        
    }).mask('99/99/9999').change(function () {
        if ($(this).val().length > 0 && $(this).val().length != 10){
            mostrar_error("El Formato de la Fecha ingresada no es válido.");
            $(this).val("");
        }
    });

    $('.numerico').on('input', function() {
        let inputValue = $(this).val();
    
        inputValue = inputValue.replace(/\D/g, '');
    
        $(this).val(inputValue);
      });

      $('.importe').keypress(function(tecla){
        if(tecla.charCode<48 || tecla.charCode>57){
            if(tecla.charCode !== 44 && tecla.charCode !== 46){
                return false;
            }
        }
        });
    
    $('.importe').focusout(function(){
        if (!isNaN($(this).val().replace(/\./g, '').replace(',', '.')) && $(this).val()){
            $(this).val(Number($(this).val().replace(/\./g, '').replace(',', '.')).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        }
    }).css('text-align', 'right');
    
    //le damos el formato de importe con 2 decimales 0,00
    $(".mascara_importe").focusout(function () {
        if (!isNaN($(this).val()) && $(this).val()){
            $(this).val(Number($(this).val()).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
        }
    }).css('text-align', 'right');


    $('#btn_limpiar').click(function(){
        limpiar();
    });

    $('#btn_buscar').click(function(){
        buscar();
    });

    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_tributos,
        titulos:['Cód. Tributo','Tributo', 'Tipo Imponible'],
        grid:[  {index:'c_codigo',width:200},
            {index:'d_descrip', width:350}, {index:'c_tipo_imponible', width:350, hidden:true}],
        caption:'Lista de Tributos',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo', c_tipo_imponible:'c_tipo_imponible'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
        limpiarCod: true,
        onClose:function(){
            ingresar_primero_contrib();
            if(!$('#c_tributo').val()){
                $('#d_tributo').val("");
            }

            if(param_exigir_honorarios == 'N'){
	
                if ($('#c_tributo').val() && $('#c_tributo').val() != '110'){
                    
                    $('#c_tributo').val("");
                    $('#d_tributo').val("");
                    mostrar_error('Usted entro por la opción FULL HONORARIOS de PFP que solo permite generar planes de Honorarios.');   
                    return;            
                }
                
            }


            if ($('#c_tributo').val() == "" && $('#d_tributo').val()){
                $('#d_tributo').val("");
            }


            $('#c_tipo_plan').val("");
            $('#d_tipo_plan').val("");

            if ($('#c_tributo').val() == g_sellos){
                $('#lupa_c_concepto').show();
                $('#c_concepto').attr('readonly', false);
            }else{
                $('#lupa_c_concepto').hide();
                $('#c_concepto').attr('readonly', true);
                $('#c_concepto').val("");
                $('#d_concepto').val("");
            }

            if ($('#c_tributo').val() == '10' || $('#c_tributo').val() == '20'){
                $('.rb_deuda').attr('readonly', true);
                $('.rb_deuda').attr('disabled', true);
                $('#tipo_deuda_C').prop("checked", true);
            }else{
                $('.rb_deuda').attr('readonly', false);
                $('.rb_deuda').attr('disabled', false);
                $('#tipo_deuda_C').prop("checked", true);
            }
            habilitar_honorarios();
        }
    });

    $("#lupa_d_objeto_hecho").lupa_generica({
		id_lista:vg_lista_objetos,
		titulos:['Objeto-Hecho','Dato Adicional'],
		grid:[{index:'d_objeto_hecho',width:250},  {index:'d_dato_adi_1',width:300}],
		caption:'Lista de Objetos - Hechos',
		sortname:'d_objeto_hecho',
		sortorder:'desc',
		filtros:['#c_tributo','#id_contribuyente', '#d_objeto_hecho'],
		filtrosTitulos:['Tributo','ID Contribuyente', 'Objeto'],
		filtrosNulos:[false, true, true],
		campos:{d_objeto_hecho:'d_objeto_hecho'},
		keyNav:true,
		draggable:true,
        onClose:function(){
            ingresar_primero_contrib();

            if ($('#d_objeto_hecho').val() ) {
   
                BUSQUEDA_POR_OBJETO(); 
            
            }
        }
	});
    $('#d_objeto_hecho').focusout(function(){
        ingresar_primero_contrib();

            if ($('#d_objeto_hecho').val() ) {
   
                BUSQUEDA_POR_OBJETO(); 
            
            }
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
		id_lista:v_lista_denom,
		titulos:['Id Contribuyente','CUIT', 'Denominación', 'Cód. Tipo Documento','Tipo de Documento', 'Nro. Documento', 'F. Alta'],
		grid:[{index:'id_contribuyente',width:100, hidden:true}, {index:'n_cuit',width:100}, {index:'d_denominacion',width:200},{index:'c_tipo_documento',width:100}, {index:'d_tipo_documento',width:100}, {index:'n_documento',width:160}, {index:'f_alta',width:80}],
		caption:'Lista de Denominaciones',
		sortname:'d_denominacion',
		sortorder:'asc',
		filtros:['#d_denominacion'],
		filtrosTitulos:['Denominación'],
		filtrosNulos:[true],
		campos:{id_contribuyente:'id_contribuyente', n_cuit: 'n_cuit', d_denominacion:'d_denominacion', c_tipo_documento:'c_tipo_documento', d_tipo_documento:'d_tipo_documento', n_documento: 'n_documento'},
		keyNav:true,
		draggable:true,
        onClose:function(){
            $("#n_cuit").mask("99-99999999-9");
            $("#d_ctrl_denominacion").val($("#d_denominacion").val());
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

    $("#lupa_c_tipo_documento").lupa_generica({
        id_lista:v_lista_tbl_gen,
        titulos:['Cód Documento','Documento', 'N Tabla'],
        grid:[  {index:'c_codigo',width:200},
            {index:'d_descrip', width:350}, {index:'n_tabla',width:250, hidden:true}],
        caption:'Lista de Documentos',
        sortname:'c_codigo',
        sortorder:'asc',
        filtros:['TIPDOC'],
        campos:{c_codigo:'c_tipo_documento',d_descrip: 'd_tipo_documento', n_tabla:'n_tabla_doc'},
        keyNav:true,
        searchInput: '#c_tipo_documento',
        searchCode: true,
        onClose:function(){
            if(!$('#c_tipo_documento').val()){
                $('#d_tipo_documento').val("");
            }
        }
    });

    $("#lupa_c_concepto").lupa_generica({
        id_lista:v_lista_conceptos,
        titulos:['Cód. Concepto','Descripción del Concepto'],
        grid:[  {index:'c_codigo',width:120},
            {index:'d_descrip',width:299}],
        caption:'Lista de Conceptos',
        filtros:['#c_tributo'],
        filtrosTitulos:['Tributo'],
        filtrosNulos: [false],
        campos:{c_codigo:'c_concepto',d_descrip: 'd_concepto'},
        keyNav:true,
        searchInput: '#c_concepto',
        searchCode: true,
        limpiarCod: true,
        onClose:function(){
            if(!$('#c_concepto').val()){
                $('#d_concepto').val("");
            }
            if ($('#c_tributo').val() == g_sellos){
                $('#lupa_c_concepto').show();
                $('#c_concepto').attr('readonly', false);
            }else{
                $('#lupa_c_concepto').hide();
                $('#c_concepto').attr('readonly', true);
                $('#c_concepto').val("");
                $('#d_concepto').val("");
            }
            habilitar_honorarios();
        }
    });

    $("#lupa_c_tipo_plan").lupa_generica({
        id_lista:v_lista_tipo_planes,
        titulos:['Cód. Tipo Plan Pago','Descripción del Plan de Pago', 'Cód. Indice Act.', 'Importe Mínimo Cuota', 'Importe Mínimo Finan.',
        'Importe Anticipo', 'P Anticipo', 'Nro. Dias Vto.', 'Nro. Meses Vto.', 'Nro. Cuota Min.', 'Nro. Cuota Max.', 'Cód. Interés Finan.',
        'Cód. Concepto', 'Cód. Periodicidad', 'Cód. Tipo Calculo', 'F. Deuda Desde', 'F. Deuda Hasta', 'Nro. Tabla Period.', 'Nro. Tabla Tipo Calc' 
    ],
        grid:[{index:'c_codigo',width:65},{index:'d_descrip',width:600},{index:'c_indice_act',width:100, hidden:true},
        {index:'i_minimo_cuota',width:100, hidden:true},{index:'i_minimo_finan',width:100, hidden:true},{index:'i_anticipo',width:100, hidden:true},
        {index:'p_anticipo',width:100, hidden:true},{index:'n_dia_vto',width:100, hidden:true},{index:'n_meses_vto',width:100, hidden:true},{index:'n_cuota_min',width:100, hidden:true},
        {index:'n_cuota_max',width:100, hidden:true},{index:'c_interes_finan',width:100, hidden:true},{index:'c_concepto',width:100, hidden:true},{index:'c_periodicidad',width:100, hidden:true},
        {index:'c_tipo_calculo',width:100, hidden:true},{index:'f_deuda_desde',width:100, hidden:true},{index:'f_deuda_hasta',width:100, hidden:true},{index:'n_tabla_period',width:100, hidden:true},{index:'n_tabla_tipo_calc',width:100, hidden:true}
        ],
        caption:'Lista de Tipos de Plan de Pago',
        filtros:['#id_contribuyente','#c_tributo', '#d_objeto_hecho',param_concurso_quiebra, '#c_concepto'],
        filtrosTitulos:['ID Contribuyente','Tributo', 'Objeto/Hecho', 'Concurso Quiebra', 'Concepto'],
        filtrosNulos: [true, false, true, true, true],
        campos:{c_codigo:'c_tipo_plan',d_descrip: 'd_tipo_plan'},
        sortname:'d_descrip',
        sortorder:'asc',
        keyNav:true,
        searchInput: '#c_tipo_plan',
        searchCode: true,
        limpiarCod: true,
        onClose:function(){
            if(!$('#c_tipo_plan').val()){
                $('#d_tipo_plan').val("");
            }
            if ($('#c_tipo_plan').val()){
	
                BUSCAR_DATOS_TIPO_PLAN();
            
            }
        }
    });

    $("#lupa_c_delegacion").lupa_generica({
        id_lista:v_lista_tbl_gen,
        titulos:['Cód delegación','Descripción', 'N Tabla'],
        grid:[  {index:'c_codigo',width:200},
            {index:'d_descrip', width:350}, {index:'n_tabla',width:250, hidden:true}],
        caption:'Lista de Delegaciones',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:['DELEG'],
        campos:{c_codigo:'c_delegacion',d_descrip: 'd_delegacion', n_tabla:'n_tabla_deleg'},
        keyNav:true,
        searchInput: '#c_delegacion',
        searchCode: true,
        onClose:function(){
            if(!$('#c_delegacion').val()){
                $('#d_delegacion').val("");
            }
        }
    });

    $("#lupa_c_tipo_calculo").lupa_generica({
        id_lista:v_lista_tipo_calculo,
        titulos:['Cód. Cálculo','Método de Cálculo'],
        grid:[  {index:'c_codigo',hidden:true, width:120},
            {index:'d_descrip',width:299}],
        caption:'Lista de Métodos de Cálculo',
        filtros:['#c_tipo_calculo'],
        filtrosTitulos:['Método Cálculo'],
        filtrosNulos: [true],
        campos:{c_codigo:'c_tipo_calculo',d_descrip: 'd_tipo_calculo'},
        keyNav:true,
        searchInput: '#c_tipo_calculo',
        searchCode: true,
        limpiarCod: true,
        onClose:function(){
            if(!$('#c_tipo_calculo').val()){
                $('#d_tipo_calculo').val("");
            }
            if ($('#c_tipo_calculo').val() == '3'){
                $('#n_cuotas').attr('disabled', true);
                $('#n_cuotas').attr('readonly', true);
                $('#i_valor_cuota').attr('disabled', false);
                $('#i_valor_cuota').attr('readonly', false);
            }else{
                $('#n_cuotas').attr('disabled', false);
                $('#n_cuotas').attr('readonly', false);
                $('#i_valor_cuota').attr('disabled', true);
                $('#i_valor_cuota').attr('readonly', true);
            }
          

            if ($('#c_tipo_calculo').val() == 3){
                $('#n_cuotas').val("");
            }else{
                $('#i_valor_cuota').val("");
            }

            g_modifico_plan = 'S'; 
            
            if (($('#c_tipo_plan').val() == '152' || $('#c_tipo_plan').val() == '157') && $('#c_tipo_calculo').val() != '3'){
                mostrar_error('Solo puede seleccionar el Método de Cálculo de cuotas fijas');
                return;
            }
        }

    });

    $("#lupa_pph_n_cuit_acreedor").lupa_generica({
        id_lista:v_lista_asesores,
        titulos:['CUIT','Denominación', 'Descripción Juzgado', 'Circunscripcion'],
        grid:[  {index:'c_codigo',width:200},
            {index:'d_descrip', width:350}, {index:'d_juzgado',width:250}, {index:'d_circunscripcion',width:250}],
        caption:'Lista de Asesores',
        campos:{c_codigo:'pph_n_cuit_acreedor',d_descrip: 'pph_d_denominacion_acreedor'},
        keyNav:true,
        searchInput: '#pph_n_cuit_acreedor',
        searchCode: true,
        onClose:function(){
            if(!$('#pph_d_denominacion_acreedor').val()){
                $('#pph_n_cuit_acreedor').val("");
            }
        }
    });

    $("#lupa_pph_n_cuit_patrocinante").lupa_generica({
        id_lista:v_lista_patrocinantes,
        titulos:['CUIT','Denominación',],
        grid:[  {index:'c_codigo',width:200},
            {index:'d_descrip', width:350}],
        caption:'Lista de Patrocinantes',
        campos:{c_codigo:'pph_n_cuit_patrocinante',d_descrip: 'pph_d_patrocinante'},
        keyNav:true,
        searchInput: '#pph_n_cuit_patrocinante',
        searchCode: true,
        onClose:function(){
            if(!$('#pph_d_patrocinante').val()){
                $('#pph_n_cuit_patrocinante').val("");
            }
        }
    });

    $("#lupa_n_plan_rel_modal").lupa_generica({
        id_lista:v_lista_plan_pago_rel,
        titulos:['Nro. Plan Pago','Descripción', 'Importe Actualizado', 'Nro Cuotas', 'Importe Total','Cód. Tipo Plan Pago'],
        grid:[  {index:'c_codigo', width:120},
            {index:'d_descrip',width:299}, {index:'i_actualizado',width:299}, {index:'n_cuotas',width:299}, {index:'i_total',width:299}, {index:'c_tipo_plan_pago',width:299}],
        caption:'Lista de Planes Pago Relacionados',
        filtros:['#id_contribuyente', g_boleta_nueva_sel],
        filtrosTitulos:['ID Contribuyente', 'Boleta Nueva Sel'],
        filtrosNulos: [false, true],
        campos:{c_codigo:'n_plan_rel_modal'},
        keyNav:true,
        searchInput: '#n_plan_rel_modal',
        searchCode: true,
        limpiarCod: true,
        onClose:function(){
            if($('#n_plan_rel_modal').val()){
                validate_n_plan_pago_rel();
            }
        }
    });

    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() != ''){
            try{
                if( limpia_cuit($('#n_cuit').val()).length == 11 ){
                    $.ajax({
                        url: 'ajax_genericos/autocomplete.php',
                        type:"POST",
                        data:{
                            "term":limpia_cuit($("#n_cuit").val()),
                            "oper":3
                        },
                        async:true,
                        success: function(data){
                            ret = eval('('+data+')');
                            if(data){
                                $("#d_denominacion").val(ret.data_raz[0].razon_social);
                                $("#id_contribuyente").val(ret.data_raz[0].id_contribuyente);

                                $.ajax({
                                    type:'POST',
                                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                                    data:{  
                                     'p_id_contribuyente':ret.data_raz[0].id_contribuyente,
                                     "id_menu":v_id_menu,
                                     "n_orden":0
                                    },
                                    dataType:'json',
                                    success: function( data2 ) {
                                        if(data2.resultado == 'OK'){
                                            $("#d_denominacion").val(data2.p_desc_denom);
                                            $("#d_ctrl_denominacion").val(data2.p_ctrl_desc_demom);
                                            $("#n_cuit").val(data2.p_n_cuit);
                                            $("#n_cuit").mask("99-99999999-9");
                                            $("#c_tipo_documento").val(data2.p_c_tipo_documento);
                                            $("#c_tipo_documento").blur();
                                            $("#n_documento").val(data2.p_n_documento);
                                            $("#id_contribuyente").val(data2.p_id_contribuyente);
                                        }
                                        else{
                                            mostrar_cuadro('E', 'Error', data2.resultado);
                                            return;
                                        }
                                    }
                                });
                            }else{
                                $("#d_denominacion").val(null);
                                $("#id_contribuyente").val(null);
                            }
                        }
                    });
        
                }else{
                    $('#btn_limpiar').click();
                }
            }catch(err){
            }
        }else{
            $("#id_contribuyente").val("");
            if(param_concurso_quiebra == 'J'){
                
                $('#c_tributo').val("");
                $('#d_objeto_hecho').val("");

            }
        }
    });

    $('#f_actualizacion').click(function(){
        if ($(this).val() == "" && ((param_tipo == 'COMUN') || 
	        (param_concurso_quiebra == 'C' || param_concurso_quiebra == 'Q'))){ 
                obtener_f_vto();
        }
    })
    $('#f_actualizacion').change(function(){
        if($(this).val()){
            if (param_concurso_quiebra == 'C' || param_concurso_quiebra == 'Q'){
        
                if (to_date($(this).val()) < to_date(fecha_hoy)){
                    param_tipo = 'RETROACTIVO';
                }else if (to_date($(this).val()) >= to_date(fecha_hoy)){
                    param_tipo = 'COMUN';
                }
                
            }else if (param_concurso_quiebra == 'J'){
                    
                if (to_date($(this).val()) < to_date(fecha_hoy)){
                    mostrar_error('No puede ingresar una fecha anterior a hoy!');
                    $(this).val("");
                    return;
                }else{
                    param_tipo = 'COMUN';   
                }	 
            
            }
        }
    })
    

    $("#btn_selec_todo_comun").click(async function(){

        let len = $('.deuda_checkbox:checkbox').toArray().length
        $('#div_search').procOverlay({visible:true});
        for (let id = 0; id < len; id++) {
            if(!$('#deuda_checkbox_' + (id + 1)).is(':checked')){
                try{
                    $("#btn_deselec_todo_comun").show();
                    $("#btn_selec_todo_comun").hide();
                    $('#deuda_checkbox_' + (id + 1)).prop('checked', true);
                    g_objeto_actual_sel = 'X';
                    await CONTROLAR_SEL_CUOTA(id + 1);
                    await CONTROLAR_SEL_BOLETA(id + 1);
                    await SUMA_DEUDA(id + 1, false);
                    seleccionados_comun.push($('#deuda_declarada_grid').getCell(id + 1,'id_obligacion'));
                    seleccionados_id.push(id + 1);
                    
                } catch (error) {
                    break;
                }
            }
        }
        $('#div_search').procOverlay({visible:false});
    });

    $("#btn_deselec_todo_comun").click(async function(){

        $("#refresh_deuda_declarada_grid").trigger('click');
        $("#btn_deselec_todo_comun").hide();
        $("#btn_selec_todo_comun").show();
    });

    $("#btn_tab_datos_plan").click(function(){
        $('#c_tipo_calculo').blur();
        if($("#n_cuotas").val() > 0){
            calcula_anticipo_minimo();
            $("#btn_calcular_cuotas").attr('disabled',false);
        }
        else{
            $("#btn_calcular_cuotas").attr('disabled',true);
        }
        // $("#n_cuotas").val('');
        $('#btn_tab_cuotas_plan').addClass('tab-deshabilitado');
        $('#btn_tab_cuotas_plan').removeAttr('data-toggle');
    });

    $('#btn_calcular_cuotas').click(function(){
        if ($('#c_tributo').val() == '110'){
            $('#btn_datos_juicio_honorarios').attr('disabled', false);
        }else{
			$('#btn_datos_juicio_honorarios').attr('disabled', true);
		}
        calcular_cuotas();
        
    })

    $('#i_anticipo_pagar').dblclick(function(){
        if ($(this).val() == ""){
            $(this).val($('#i_anticipo_min').val());
        }
    })
    $('#i_anticipo_pagar').mousedown(function(){
        if ($(this).val() == ""){
            $(this).val($('#i_anticipo_min').val());
        }
    })
    $('#i_anticipo_pagar').focusout(function(){
        if($(this).val() == ""){
            $(this).val("0,00");
        }

        g_modifico_plan = 'S'; 
    })
    $('#i_valor_cuota').focusout(function(){
        if ($(this).val() == ""){

        }else{

            if ((tpp_m_tipo_minimo_cuota == 'C' || tpp_m_tipo_minimo_cuota == 'T') && 
            (Number($(this).val().replace(/\./g, '').replace(',', '.')) < Number($('#tpp_i_minimo_cuota').text().replace(/\./g, '').replace(',', '.')))){
                
                mostrar_error('El valor mínimo de la cuota es de: $' + $('#tpp_i_minimo_cuota').text());
                return;
                
            }
            
                $('#n_cuotas').val( Math.ceil(Number($('#i_actualizado').val().replace(/\./g, '').replace(',', '.')) / Number($(this).val()).replace(/\./g, '').replace(',', '.')));

                calcula_anticipo_minimo();
                
        }
                g_modifico_plan = 'S'; 
    });

    $('#n_cuotas').mousedown(function(){
        if (param_max_cuotas != null && 
            $(this).val() == ""){
            
              if (param_max_cuotas <= tpp_n_cuota_max){
                $(this).val(param_max_cuotas);
              }else{
                $(this).val(tpp_n_cuota_max);
              }
              
        }
    })
    $('#n_cuotas').focusout(function(){
        calcula_anticipo_minimo();
        if($('#n_cuotas').val() > 0){
            $("#btn_calcular_cuotas").attr('disabled',false);
        }
    })

    $('#etiqueta_tab_datos_plan').click(async function(){
        SOLAPA_PLAN(false);
        $(window).resize();
    })
    $('#etiqueta_tab_deuda_declarada').click(function(){
        if ($('#c_tributo').val() == 76) {
            $('.deuda_checkbox').prop('disabled', true);
            $('#btn_selec_todo_comun').prop('disabled', true);
        }else{
            $('.deuda_checkbox').prop('disabled', false);
            $('#btn_selec_todo_comun').prop('disabled', false);
        }
        $(window).resize();
    })
    $('#etiqueta_tab_deuda_declarada_sellos').click(function(){
        if ($('#c_tributo').val() == 76) {
            $('.sellos_checkbox').prop('disabled', true);
            $('#btn_selec_todo_sellos').prop('disabled', true);
        }else{
            $('.sellos_checkbox').prop('disabled', false);
            $('#btn_selec_todo_sellos').prop('disabled', false);
        }
        $(window).resize();
    })
    $('#etiqueta_tab_cuotas_plan').click(function(){
        $(window).resize();
    })

    $('#btn_completar_telefonos').click(function(){
        datos_adicionales();
    });

    $('#btn_guardar_telefono').click(function(){
        guardar_telefono();
    });

    $('#btn_generar_plan').click(function(){
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
                    generar_plan();
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    });

    $('#btn_imprimir_constancia').click(function(){
        if ($('#n_plan').val() > 0){
            imprimir_reporte();
        }
    });

    $('#btn_obj_gest_j').click(function(){
        juicios();
        $('#juicios_modal').modal('show');
        $(window).resize();
    });

    $('#btn_datos_juicio_honorarios').click(function(){
        datos_honorarios();
    });

    $('#btn_aceptar').click(function () {
            if ($('#frm_ppr').validationEngine('validate')) {
                var params = {
                    p_id_contribuyente:$('#id_contribuyente').val(),
                    p_id_sesion : sesion,
                    p_n_plan_pago_rel: $('#n_plan_rel_modal').val(),
                    id_menu: v_id_menu,
                    n_orden: 16,
                    p_oper: $('#p_oper').val()
                };
                abm_ppr(params);
            }
    });

    $('#btn_habilitar_filtros').click(function(){
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
        if ($('#c_tributo').val() == g_sellos){
            $('#lupa_c_concepto').show();
            $('#c_concepto').attr('readonly', false);
        }else{
            $('#lupa_c_concepto').hide();
            $('#c_concepto').attr('readonly', true);
            $('#c_concepto').val("");
            $('#d_concepto').val("");
        }

        if ($('#c_tributo').val() == '10' || $('#c_tributo').val() == '20'){
            $('.rb_deuda').attr('readonly', true);
            $('.rb_deuda').attr('disabled', true);
        }else{
            $('.rb_deuda').attr('readonly', false);
            $('.rb_deuda').attr('disabled', false);
        }
        $('#btn_buscar').attr('disabled', false);
        $("#tabs_grid").hide();

        $('#btn_obj_gest_j').attr('disabled', true);
        $('#btn_datos_juicio_honorarios').attr('disabled', true);

        seleccionados_comun = [];
        seleccionados_id = [];
        guardados_id = [];
        seleccionados_sellos = [];
        $('#n_plan').val("");
        $('#d_observaciones').val("");
    })

    if (param_id_oblig_min  && param_id_oblig_max){
        cargar_deuda_parametro();
    }

    if (param_llamado_desde == 'REFOR_2006'){
        reformulacion_2006();
    }
}


