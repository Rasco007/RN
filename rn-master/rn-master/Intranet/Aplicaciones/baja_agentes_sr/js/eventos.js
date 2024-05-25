function inicializarEventosGrilla(formid,id_inspeccion, oper) {   
    let p_tipo_consulta = formid[0].id;
    let p_id_inspeccion = id_inspeccion;

    // switch (p_tipo_consulta) {
    //     case "FrmGrid_main_grid":
           
    //         break;
    //     default:
    //         break;
    // }
}

$('#btn_limpiar').click(function(){
    $('#d_denominacion').val(null);
    $('#c_tipo_documento').val(null);
    $('#d_tipo_documento').val(null);
    $('#n_cuit').val(null);
    $('#n_posicion_fiscal').val(null);
    $('#n_cuota').val(null);

    $('#d_objeto_hecho').val(null);

    $('#c_tributo').val(null);
    $('#d_tributo').val(null);


    $('#c_concepto').val(null);
    $('#d_concepto').val(null);
    $('#n_comprobante').val(null);
    $('#i_saldo').val(null);
    $('#f_presentacion').val(null);
    $('#id_obligacion').val(null);
    
    

    $('#nro_documento').val(null);
    $('#id_contribuyente').val(null);
    $('#main_grid').clearGridData();
    $('#detalles_grid').clearGridData();
    $('#lupa_d_denominacion').hide();
	$('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
   
    
    $('#d_denominacion').attr('readonly', false);
    $('#d_denominacion').attr('disabled', false);
    $('#c_tipo_documento').attr('readonly', false);
    $('#c_tipo_documento').attr('disabled', false);
    $('#d_tipo_documento').attr('readonly', false);
    $('#d_tipo_documento').attr('disabled', false);
    $('#nro_documento').attr('readonly', false);
    $('#nro_documento').attr('disabled', false);
    $('#lupa_tipo_documento').show();
    //$('#main_grid').hide();
    
});

$('#btn_buscar').click(function(){
    //let n_cuit = $("#n_cuit").val();
    let d_denominacion = $("#d_denominacion").val();
    let c_tributo = $("#c_tributo").val();
    let n_documento = limpia_dni($("#nro_documento").val());
    let n_cuit = limpiar_formato_cuit($('#n_cuit').val());
    let n_posicion_fiscal = $("#n_posicion_fiscal").val(); 
    let n_cuota = $("#n_cuota").val(); 
   
    if (n_posicion_fiscal == '' ) {
        mostrar_cuadro('E', 'Error', 'Debe cargar una posición fiscal.')

        
    }else if(n_cuota == ''){
        mostrar_cuadro('E', 'Error', 'Debe cargar una cuota.')

    }else if(n_cuit == ''){
        mostrar_cuadro('E', 'Error', 'Debe cargar un cuit')

       
    }else if(c_tributo == ''){
        mostrar_cuadro('E', 'Error', 'Debe cargar un tributo')

       
    }else if(n_cuota > 12){
        mostrar_cuadro('E', 'Error', 'La cuota no puede ser mayor a 12');

    }else{
        $.ajax({
            type:'POST',
            url: "baja_de_ddjj_sr/php/autocomplete.php",
            data: {oper:'1',term: $('#id_contribuyente').val(),
            term1: n_posicion_fiscal,
            term2: n_cuota},
            dataType: 'json',
            success: function( data ) {
                ajax_autocomplete = null;
                if(data) {
                   
                    $("#id_obligacion").val(data.ID_OBLIGACION);
                   
                    $("#f_presentacion").val(data.F_PRESENTACION);

                    $("#i_saldo").val(data.I_SALDO);                            
                    $("#n_comprobante").val(data.N_COMPROBANTE);     
                    $("#id_ddjj").val(data.ID_DDJJ);     
                    $("#c_tipo_form").val(data.C_TIPO_FORM);     
                    $("#m_erronea").val(data.M_ERRONEA);     
                    $("#m_favor_rentas").val(data.M_FAVOR_RENTAS);     
                    $("#n_secuencia_pres").val(data.N_SECUENCIA_PRES);     
                    $("#n_remito").val(data.N_REMITO);     
                    let id_ddjj = $("#id_ddjj").val();     
                    let c_tipo_form = $("#c_tipo_form").val();     
                    
                    setea_parametros('#main_grid',{':p_id_contribuyente':$("#id_contribuyente").val(),
                    ':p_N_POSICION_FISCAL':$("#n_posicion_fiscal").val(),
                    ':p_n_cuota_anticipo':$("#n_cuota").val(),
                    ':p_c_tributo':$("#c_tributo").val(),
                    ':p_d_objeto_hecho':$("#d_objeto_hecho").val()});

                   
                  }       
            }
        });
        
    }

   
});

$('#n_posicion_fiscal').focusout(function(){
    if ($('#n_posicion_fiscal').val().length != 6){
        mostrar_cuadro('E', 'Error', 'Formato de Posición Fiscal inválido.')

    }
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
	$("#n_cuota").mask("99");
    $("#n_posicion_fiscal").mask("999999");

    $('#lupa_d_denominacion').hide();
    //$('#main_grid').hide();
    

    

   
}

function inicializa_lupas(){
    

    $("#lupa_tipo_documento").lupa_generica({
        id_lista:v_lista_lista_documentos,
        titulos:['Codigo','Descripcion'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:300}],
        caption:'LISTADO DE TIPOS DE DOCUMENTO',
        sortname:'c_dato',
        sortorder:'asc',
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
        {index:'n_cuit',width:100},
            {index:'d_denominacion',width:200},
            {index:'c_tipo_documento',width:200, hidden: true},
            {index:'d_tipo_documento',width:140},
            {index:'n_documento',width:160},
            {index:'f_alta',width:80, hidden: true}],
        caption:'Lista de Denominaciones',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#d_denominacion'],
        filtrosTitulos:['Denominación'],
        filtrosNulos:[false],
        campos:{id_contribuyente: 'id_contribuyente',n_cuit: 'n_cuit', d_denominacion:'d_denominacion',
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

    $("#lupa_objeto_hecho").lupa_generica({
        id_lista: v_lista_objeto_hecho,
        titulos:['Objeto Hecho', 'ID Contribuyente','CUIT', 'Denominación','Tributo' ],
        grid:[
        {index:'D_OBJETO_HECHO',width:100},
        {index:'ID_CONTRIBUYENTE',width:100},
            {index:'N_CUIT',width:200},
            {index:'D_DENOMINACION',width:200},
            {index:'C_TRIBUTO',width:200},
            
        ],
        caption:'Lista de Objetos Hecho',
       
        filtros:['#c_tributo','#id_contribuyente','#d_objeto_hecho'],
        filtrosTitulos:['Tributo','ID Contribuyente', 'Objeto Hecho'],
        filtrosNulos:[true, true, true],
        campos:{D_OBJETO_HECHO: 'd_objeto_hecho',D_DENOMINACION: 'd_denominacion', N_CUIT: 'n_cuit'},
        keyNav:true,
        draggable:true
        
    });

    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_tributo,
        titulos:['Tipo','Descrip'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'LISTADO DE TRIBUTOS IB',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
        exactField: 'c_codigo'

    });

    $("#lupa_d_concepto").lupa_generica({
        id_lista:v_lista_concepto,
        titulos:['Tipo','Descrip'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'LISTADO DE CONCEPTOS',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_concepto',d_descrip: 'd_concepto'},
        keyNav:true,
        searchInput: '#c_concepto',
        searchCode: true,
        exactField: 'c_codigo'

    });
    function limpia_cuit(cuit){
        var cuit_sin_guiones;
        var valida_cuit_completo = cuit.indexOf('_');
        if(valida_cuit_completo == -1 && cuit != ''){
            var aux = cuit.split('-');
            cuit_sin_guiones = aux[0]+aux[1]+aux[2];
        }
        return cuit_sin_guiones;
    }
    $('#d_denominacion').keydown(function () {
		if ($('#d_denominacion').val().length >= 4){
			$('#lupa_d_denominacion').show().css('display', 'table-cell');
			$('#mascara_lupa_d_denominacion').hide();
		} else {
			$('#lupa_d_denominacion').hide();
			$('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
		}
	});

    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() != ''){
            try{
                if( limpia_cuit($('#n_cuit').val()).length == 11 ){
                    $.ajax({
                        type:'POST',
                        url: "baja_de_ddjj_sr/php/autocomplete.php",
                        data: {oper:'2',term: limpia_cuit($('#n_cuit').val())},
                        dataType: 'json',
                        success: function( data ) {
                            ajax_autocomplete = null;
                            if(data) {
                                $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
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
                        url: "baja_de_ddjj_sr/php/autocomplete.php",
                        data: {oper:'3',term: limpia_dni($('#nro_documento').val())},
                        dataType: 'json',
                        success: function( data ) {
                            ajax_autocomplete = null;
                            if(data) {
                                $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
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