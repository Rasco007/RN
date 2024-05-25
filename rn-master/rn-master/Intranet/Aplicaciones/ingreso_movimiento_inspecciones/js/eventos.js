function inicializarEventosGrilla(formid,id_inspeccion, oper) {   
    let p_tipo_consulta = formid[0].id;
    let p_id_inspeccion = id_inspeccion;

    switch (p_tipo_consulta) {
        case "FrmGrid_main_grid":
            if(oper == 'ALTA'){
                $("#id_inspeccion").val(parseInt(p_id_inspeccion,10));
                $.ajax({
                    type: "POST",
                    url: "ingreso_movimiento_inspecciones/php/datos_grillas.php",
                    data: {
                        "p_tipo_consulta":p_tipo_consulta,
                        "p_id_inspeccion": p_id_inspeccion
            
                    },
                    dataType: "json",
                    success: function (resp) {
                        $('#main').procOverlay({visible:false});
                        $("#n_movimiento").val(resp.N_MOVIMIENTO);
                    },
                    error: function (data, status, e) {
                        mostrar_cuadro('E','Error','No se puede ingresar un registro '+ status +'<br /><b>Error:</b> '+e+'</p>','','');
                    }
                });
            }else if(oper == 'EDIT'){
                $('#id_evento').attr("readonly","readonly");

            }
            break;
        default:
            break;
    }
}

$('#btn_limpiar').click(function(){
    $('#d_denominacion').val(null);
    $('#c_tipo_documento').val(null);
    $('#d_tipo_documento').val(null);
    $('#n_cuit').val(null);
    $('#d_programa').val(null);
    $('#c_programa').val(null);
    $('#n_año').val(null);
    $('#d_plan_fisca').val(null);
    $('#c_expediente').val(null);
    $('#d_expediente').val(null);
    $('#nro_documento').val(null);
    $('#id_contribuyente').val(null);
    $('#id_inspeccion_i').val(null);

    $('#lupa_c_expediente').show().css('pointer-events', 'auto');
    $('#lupa_tipo_documento').show().css('pointer-events', 'auto');

    $('#main_grid').clearGridData();
    setea_parametros('#main_grid',{':p_n_expediente':null, ':p_n_cuit' :null
    , ':p_d_denominacion' :null, ':p_n_documento' :null});
    $('#detalles_grid').clearGridData();

    setea_parametros('#detalles_grid', {':p_id_evento': null, ':p_id_inspeccion': null});


    $('#modal_detalle_grid').clearGridData();


    $('#grid_inspecciones').clearGridData();

    setea_parametros('#grid_inspecciones',{ ':p_n_cuit' :null,':p_n_expediente':null,
    ':p_n_documento' :null});



    $('#lupa_d_denominacion').hide();
	$('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
    $('#c_expediente').attr('readonly', false);
    $('#c_expediente').attr('disabled', false);
    /*$('#d_expediente').attr('readonly', false);
    $('#d_expediente').attr('disabled', false);*/
    $('#lupa_c_expediente').show();
    /*$('#d_plan_fisca').attr('readonly', false);
    $('#d_plan_fisca').attr('disabled', false);
    $('#n_año').attr('readonly', false);
    $('#n_año').attr('disabled', false);
    $('#c_programa').attr('readonly', false);
    $('#c_programa').attr('disabled', false);
    $('#d_programa').attr('readonly', false);
    $('#d_programa').attr('disabled', false);*/
    $('#n_cuit').attr('readonly', false);
    $('#n_cuit').attr('disabled', false);
    $('#d_denominacion').attr('readonly', false);
    $('#d_denominacion').attr('disabled', false);
    $('#c_tipo_documento').attr('readonly', false);
    $('#c_tipo_documento').attr('disabled', false);
    /*$('#d_tipo_documento').attr('readonly', false);
    $('#d_tipo_documento').attr('disabled', false);*/
    $('#nro_documento').attr('readonly', false);
    $('#nro_documento').attr('disabled', false);
    $('#lupa_tipo_documento').show();
    $('#add_main_grid').hide();
    $('#edit_main_grid').hide();
    $('#del_main_grid').hide();
    $('#btn_editar_detalle_movimiento').hide();
    p_modo = '';
    p_m_autoquery = 'N';
    $('#d_plan_fisca').attr('disabled', false);
    $('#n_año').attr('disabled', false);
    $('#c_programa').attr('disabled', false);
    $('#n_cuit').attr('disabled', false);
    $('#d_denominacion').attr('disabled', false);
    $('#c_tipo_documento').attr('disabled', false);
    $('#d_tipo_documento').attr('disabled', false);
    $('#nro_documento').attr('disabled', false);
    $('#d_expediente').attr('disabled', false);
    $('#d_expediente').attr('disabled', false);
    $('#c_expediente').attr('disabled', false);

});

$('#btn_buscar').click(function(){
    let n_expediente = $("#c_expediente").val();
    //let n_cuit = $("#n_cuit").val();
    let d_denominacion = $("#d_denominacion").val();
    let n_documento = limpia_dni($("#nro_documento").val());
    let n_cuit = limpiar_formato_cuit($('#n_cuit').val());
    filtros_no_nativos = [];
    filtros_arr_main = [];

    if($('#d_denominacion').val() != ''){
        filtros_arr_main.push('Denominación: '+ $('#d_denominacion').val());
    }
    if($('#n_cuit').val() != ''){
        filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());
    }
    if($('#nro_documento').val() != ''){
        filtros_arr_main.push('Documento: '+ $('#nro_documento').val());
    }
    filtros_no_nativos_ar['grid_inspecciones'] = filtros_arr_main;
    filtros_no_nativos_ar['main_grid'] = filtros_arr_main;
    filtros_no_nativos_ar['detalles_grid'] = filtros_arr_main;

    $('#lupa_c_expediente').show().css('pointer-events', 'none');
    $('#lupa_tipo_documento').show().css('pointer-events', 'none');


    
    if ($("#c_expediente").val() && $("#d_expediente").val() ) {
       

        setea_parametros('#grid_inspecciones',{ ':p_n_cuit' :n_cuit,':p_n_expediente':n_expediente,
          ':p_n_documento' :n_documento});
    }else if($("#n_cuit").val()){
        setea_parametros('#grid_inspecciones',{ ':p_n_cuit' :n_cuit,':p_n_expediente':n_expediente,
          ':p_n_documento' :n_documento});
        
    }else if($("#nro_documento").val()){
        setea_parametros('#grid_inspecciones',{ ':p_n_cuit' :n_cuit,':p_n_expediente':n_expediente,
          ':p_n_documento' :n_documento});
        // setea_parametros('#main_grid',{':p_n_expediente':n_expediente, ':p_n_cuit' :n_cuit
        // , ':p_d_denominacion' :d_denominacion, ':p_n_documento' :n_documento});
    }
    if($('#n_cuit').val() == ''){
        mostrar_cuadro('I', 'Advertencia', 'Debe cargar un CUIT válido.')
    } else {
        $('#d_plan_fisca').attr('disabled', true);
        $('#n_año').attr('disabled', true);
        $('#c_programa').attr('disabled', true);
        $('#n_cuit').attr('disabled', true);
        $('#d_denominacion').attr('disabled', true);
        $('#c_tipo_documento').attr('disabled', true);
        $('#d_tipo_documento').attr('disabled', true);
        $('#nro_documento').attr('disabled', true);
        $('#d_expediente').attr('disabled', true);
        $('#d_expediente').attr('disabled', true);
        $('#c_expediente').attr('disabled', true);
        
        
        
        if(p_modo == 'C'){
            $('#add_main_grid').hide();
            $('#edit_main_grid').hide();
            $('#del_main_grid').hide();
            $('#btn_editar_detalle_movimiento').hide();
            $('#btn_alta_grupo').hide();
            $('#btn_editar_grupo').hide();
            $('#btn_eliminar_grupo').hide();
        } else if(p_modo == 'A' || p_modo == ''){
            $('#add_main_grid').show();
            $('#edit_main_grid').show();
            $('#del_main_grid').show();
            $('#btn_editar_detalle_movimiento').show();
            $('#btn_alta_grupo').show();
            $('#btn_editar_grupo').show();
            $('#btn_eliminar_grupo').show();
        }
    }
});

$('#btn_cancelar_modal1').click(function(){
    $('#c_tributo').val(null);
    $('#nro_objeto_imponible').val(null);
    $('#posicion_desde').val(null);
    $('#cuota_desde').val(null);
    $('#posicion_hasta').val(null);
    $('#cuota_hasta').val(null);
    $('#tramite_desde').val(null);
    $('#tramite_hasta').val(null);
});

function limpia_dni(dni){
	var result;
	if (dni != null){
		result=dni.replace(/\./gi, '');
		return result;
	}else{
		return null;
	}
}

function inicializa_eventos(){
    $("#n_cuit").mask("99-99999999-9");
	$("#nro_documento").mask("99999999999");
    $('#lupa_d_denominacion').hide();
    $('#add_main_grid').hide();
    $('#edit_main_grid').hide();
    $('#del_main_grid').hide();
    $('#btn_editar_detalle_movimiento').hide();


    $("#posicion_desde").mask("999999");
    $("#posicion_hasta").mask("999999");
    $("#cuota_hasta").mask("99");
    $("#cuota_desde").mask("99");
    $("#tramite_desde").mask("99");
    $("#tramite_hasta").mask("99");
    
    
     $('#add_grid_inspecciones').hide();
    $('#edit_grid_inspecciones').hide();
    $('#del_grid_inspecciones').hide();

    $(".datepicker").datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    });

    if(p_modo == 'A' || p_modo == 'C'){
        $('#id_contribuyente').val(p_id_contribuyente);
        $('#id_inspeccion_i').val(p_id_inspeccion);
        $('#c_expediente').val(p_n_expediente);
        $('#c_expediente').attr('readonly', true);
        $('#c_expediente').attr('disabled', true);
        $('#d_expediente').val(p_n_anio_expediente);
        $('#d_expediente').attr('readonly', true);
        $('#d_expediente').attr('disabled', true);
        $('#lupa_c_expediente').hide();
        $('#d_plan_fisca').val(p_d_plan_fisca);
        $('#d_plan_fisca').attr('readonly', true);
        $('#d_plan_fisca').attr('disabled', true);
        $('#n_año').val(p_n_anio_plan);
        $('#n_año').attr('readonly', true);
        $('#n_año').attr('disabled', true);
        $('#c_programa').val(p_n_programa_fis);
        $('#c_programa').attr('readonly', true);
        $('#c_programa').attr('disabled', true);
        $('#d_programa').val(p_d_programa_fis);
        $('#d_programa').attr('readonly', true);
        $('#d_programa').attr('disabled', true);
        $('#n_cuit').val(p_n_cuit);
        $('#n_cuit').attr('readonly', true);
        $('#n_cuit').attr('disabled', true);
        $('#d_denominacion').val(p_d_denominacion);
        $('#d_denominacion').attr('readonly', true);
        $('#d_denominacion').attr('disabled', true);
        $('#c_tipo_documento').val(p_c_tipo_doc);
        $('#c_tipo_documento').attr('readonly', true);
        $('#c_tipo_documento').attr('disabled', true);
        $('#d_tipo_documento').val(p_d_tipo_doc);
        $('#d_tipo_documento').attr('readonly', true);
        $('#d_tipo_documento').attr('disabled', true);
        $('#nro_documento').val(p_n_documento);
        $('#nro_documento').attr('readonly', true);
        $('#nro_documento').attr('disabled', true);
        $('#lupa_tipo_documento').hide();
        $('#btn_buscar').click();

    }
}

function inicializa_lupas(){
    $("#lupa_c_expediente").lupa_generica({
        id_lista:v_lista_inspecciones,
        titulos:['Expediente','Año Expediente', 'Nro. Inspección','CUIT', 'Denominación', 'Cod Tipo Doc', 'Tipo Doc', 'Documento', 'Nro. Plan', 'Nro Programa','Plan Fiscalizacion', 'Año Plan Fisca', 'Descripcion Programa', 'ID Contribuyente', 'Codigo estado'],
        grid:[  {index:'c_codigo',width:120},
            {index:'d_descrip',width:110},
            {index:'id_inspeccion',width:100, hidden:true},
            {index:'cuit',width:100},
            {index:'denominacion',width:170},
            {index:'c_tipo_doc',width:30, hidden:true},
            {index:'d_tipo_doc',width:50, hidden:true},
            {index:'documento',width:100},
            {index:'id_plan_fisca',width:67},
            {index:'n_programa',width:105},
            {index:'plan_fisca',width:100, hidden:true},
            {index:'anio_plan',width:100, hidden:true},
            {index:'d_programa',width:100, hidden:true},
            {index:'id_contribuyente',width:100, hidden:true},
            {index:'c_estado',width:100}],
        caption:'LISTADO DE EXPEDIENTES',
        sortname:'c_codigo',
        sortorder:'desc',
        campos:{c_codigo:'c_expediente',d_descrip: 'd_expediente',id_inspeccion:'id_inspeccion_i', cuit:'n_cuit',
        denominacion:'d_denominacion', c_tipo_doc: 'c_tipo_documento', d_tipo_doc: 'd_tipo_documento',documento: 'nro_documento',
        n_programa: 'c_programa', plan_fisca: 'd_plan_fisca', anio_plan: 'n_año', d_programa: 'd_programa', id_contribuyente: 'id_contribuyente',
        c_estado: 'c_estado'},
        width:760,
        keyNav:true,
        searchInput: '#c_expediente',
        searchCode: true,
        filtros:['#c_expediente'],
        filtrosNulos:[true],
        filtrosTitulos:['Código Expediente'],
        
    });

    $("#lupa_tipo_documento").lupa_generica({
        id_lista:v_lista_lista_documentos,
        titulos:['Codigo','Descripcion'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:300}],
        caption:'LISTADO DE TIPOS DE DOCUMENTO',
        sortname:'c_dato',
        sortorder:'asc',
        widthGrid:150,
        campos:{c_dato:'c_tipo_documento',d_dato: 'd_tipo_documento'},
        keyNav:true,
        searchInput: '#c_tipo_documento',
        searchCode: true,
        exactField: 'c_dato'
    });
    
    $("#lupa_d_denominacion").lupa_generica({
        id_lista: vg_lista_denominaciones,
        titulos:['ID_contribuyente','CUIT', 'Denominación', 'Código tipo de documento','Tipo de Documento', 'Numero de Documento', 'F. Alta'],
        grid:[{index:'id_contribuyente',width:100, hidden: true},
        {index:'n_cuit',width:220},
            {index:'d_denominacion',width:320},
            {index:'c_tipo_documento',width:200, hidden: true},
            {index:'d_tipo_documento',width:140},
            {index:'n_documento',width:160},
            {index:'f_alta',width:80, hidden: true}],
        caption:'Lista de Denominaciones',
        sortname:'d_denominacion',
        sortorder:'asc',
        width:760,
        filtros:['#d_denominacion'],
        filtrosTitulos:['Denominación'],
        filtrosNulos:[false],
        campos:{n_cuit: 'n_cuit', d_denominacion:'d_denominacion',
        c_tipo_documento:'c_tipo_documento',
        d_tipo_documento: 'd_tipo_documento', n_documento: 'nro_documento'},
        keyNav:true,
        draggable:true,
        onClose(){
            if($('#n_cuit').val() != ''){
                completarDenominacion();
            }
        }
    });
    $("#d_denominacion").focusout(function () {
        if($('#d_denominacion').val() == "" && $('#n_inspeccion').val() == "" && $('#d_expediente').val() == ""){
            $('#btn_buscar').attr('disabled', true);
        } else{
            $('#btn_buscar').attr('disabled', false);
        }
    });
    $('#d_denominacion').keydown(function () {
		if ($('#d_denominacion').val().length >= 2){
			$('#lupa_d_denominacion').show().css('display', 'table-cell');
			$('#mascara_lupa_d_denominacion').hide();
		} else {
			$('#lupa_d_denominacion').hide();
			$('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
		}
	});

    // $("#d_denominacion").change(function () {
    //     if($('#d_denominacion').val() == "" ){
    //         $('#lupa_d_denominacion').hide();
	// 		$('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
    //         } else{
    //         $('#btn_buscar').attr('disabled', false);
    //     }
    // });


    $('#d_denominacion').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
            $('#id_contribuyente').val(null);
            $('#n_cuit').val(null);
        } else if (event.type === 'focusout' && $(this).val().length <= 4) {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
            $('#id_contribuyente').val(null);
            $('#n_cuit').val(null);
        }});



        $('.numerico').keypress(function(tecla){   //Validamos que los input de importes sean solo numeros, puntos o comas.
            if(tecla.charCode<48 || tecla.charCode>57){
                if(tecla.charCode !== 44 && tecla.charCode !== 46){
                    return false;
                }
            }
        });
        
    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() != ''){
            try{
                if( limpia_cuit($('#n_cuit').val()).length == 11 ){
                    $.ajax({
                        type:'POST',
                        url: "ingreso_movimiento_inspecciones/php/autocomplete.php",
                        data: {oper:'2',term: limpia_cuit($('#n_cuit').val())},
                        dataType: 'json',
                        success: function( data ) {
                            ajax_autocomplete = null;
                            if(data) {
                               
                                $("#nro_documento").val(data.N_DOCUMENTO);
                                $("#d_denominacion").val(data.DENOMINACION);                            
                                $("#c_tipo_documento").val(data.C_TIPO_DOCUMENTO);                            
                                $("#d_tipo_documento").val(data.D_TIPO_DOCUMENTO);                   
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

    $('#nro_documento').focusout(function(){
        if ($('#nro_documento').val() != ''){
            try{
                if( limpia_dni($('#nro_documento').val()).length == 8 ){
                    $.ajax({
                        type:'POST',
                        url: "ingreso_movimiento_inspecciones/php/autocomplete.php",
                        data: {oper:'3',term: limpia_dni($('#nro_documento').val())},
                        dataType: 'json',
                        success: function( data ) {
                            ajax_autocomplete = null;
                            if(data) {
                                $("#c_expediente").val(data.N_EXPEDIENTE);
                                $("#d_expediente").val(data.N_ANIO_EXPEDIENTE);
                                $("#d_plan_fisca").val(data.D_PLAN);
                                $("#n_año").val(data.N_ANIO);
                                $("#c_programa").val(data.N_PROGRAMA);
                                $("#d_programa").val(data.D_PROGRAMA);
                                $("#n_cuit").val(data.CUIT);
                                $("#d_denominacion").val(data.DENOMINACION);
                                $("#c_tipo_documento").val(data.C_TIPO_DOCUMENTO);                            
                                $("#d_tipo_documento").val(data.D_TIPO_DOCUMENTO);       
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
    let cuit_sin_guiones =limpiar_formato_cuit($('#n_cuit').val());
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
                $("#d_denominacion").val(info.razon_social);
                $("#id_contribuyente").val(info.id_contribuyente);
                $('#lupa_d_denominacion').show().css('display', 'table-cell');
                $('#mascara_lupa_d_denominacion').hide();
                $('#d_denominacion_mayuscula').val($('#d_denominacion').val().toUpperCase());
            }else{
                mostrar_cuadro('E', 'Error', 'No se ha encontrado un contribuyente para el cuit ingresado.');
                $("#d_denominacion").val(null);
                $("#id_contribuyente").val(null);
                $("#n_cuit").val(null);
            }
        }
    });
}

$('#btn_aceptar_edicion_datos_mov').click(function () {
        if ($('#frm_cuota').validationEngine('validate')) {
            var params = {
                p_d_valor:$('#d_valor').val(),
                // p_i_capital: $('#i_capital').val().replace(/./g, '').replace(',', '.'),
                p_n_secuencia: $('#n_secuencia').val(),
                p_id_evento: $('#id_evento').val(),
                p_id_inspeccion: $('#id_inspeccion').val(),
                id_menu: v_id_menu,
                n_orden: 1,
                p_oper: $('#p_oper').val()
            };
            abm_datos_movimientos(params,'detalles_grid','abm_modal');
        }
    
});
   
$('#btn_aceptar_modal_1').click(function () {
    if ($('#frm_tributo_objeto_hecho').validationEngine('validate')) {
        if ($('#p_oper').val() == 'editar' ) {
            var params = {
                p_id_inspeccion: $('#id_inspeccion').val(), 
                p_n_movimiento: $('#n_movimiento').val(), 
                p_id_evento: $('#id_evento').val(), 
                p_n_secuencia: $('#n_secuencia').val(), 
                p_d_valor1:$('#c_tributo').val(),
                p_d_valor2: $('#nro_objeto_imponible').val(),
                p_d_valor3: $('#posicion_desde').val(),
                p_d_valor4: $('#cuota_desde').val(),
                p_d_valor5: $('#posicion_hasta').val(),
                p_d_valor6: $('#cuota_hasta').val(),
                p_d_valor7: $('#tramite_desde').val(),
                p_d_valor8: $('#tramite_hasta').val(),
                p_id_contribuyente: $("#id_contribuyente").val() ,
                p_n_fila: n_fila,
                id_menu: v_id_menu,
                n_orden: 2,
                p_oper: $('#p_oper').val()};
        } else {
           var params = {
            p_id_inspeccion: $('#id_inspeccion').val(), 
            p_n_movimiento: $('#n_movimiento').val(), 
            p_id_evento: $('#id_evento').val(), 
            p_n_secuencia: $('#n_secuencia').val(), 
            p_d_valor1:$('#c_tributo').val(),
            p_d_valor2: $('#nro_objeto_imponible').val(),
            p_d_valor3: $('#posicion_desde').val(),
            p_d_valor4: $('#cuota_desde').val(),
            p_d_valor5: $('#posicion_hasta').val(),
            p_d_valor6: $('#cuota_hasta').val(),
            p_d_valor7: $('#tramite_desde').val(),
            p_d_valor8: $('#tramite_hasta').val(),
            p_id_contribuyente: $("#id_contribuyente").val() ,
            id_menu: v_id_menu,
            n_orden: 2,
            p_oper: $('#p_oper').val()
        }; 
        }
        
        abm_datos_movimientos(params,'modal_detalle_grid','modal_evento_1');
    }
    //clear_modal_inputs();
});

$('#btn_aceptar_modal_6').click(function () {
    if ($('#frm_horas_afectadas').validationEngine('validate')) {
        var params = {
            p_id_inspeccion: $('#id_inspeccion').val(), 
            p_n_movimiento: $('#n_movimiento').val(), 
            p_id_evento: $('#id_evento').val(), 
            p_n_secuencia: $('#n_secuencia').val(), 
            p_d_valor1:$('#f_fecha').val(),
            p_d_valor2: $('#horas').val(),
            p_d_valor3: $('#tarea_realizada').val(),
            p_n_fila: n_fila,
            id_menu: v_id_menu,
            n_orden: 2,
            p_oper: $('#p_oper').val()
        };
        abm_datos_movimientos(params,'modal_detalle_grid', 'modal_evento_6');
    }
});

function abm_datos_movimientos(params,grilla,modal){
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: params,
        dataType: 'json',
        success: function (data) {
            if (data.resultado == 'OK') {
                $('#'+grilla).trigger('reloadGrid');
                $('#'+modal).modal("hide");
                clear_modal_inputs();
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
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