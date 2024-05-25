function inicializarLupas() {
    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_trib,
        titulos:['Cód. Tributo','Tributo'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'Lista de Tributos',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
    });

    $("#lupa_c_concepto").lupa_generica({
        id_lista:v_lista_conceptos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'Lista de Conceptos',
        sortname:'c_codigo',
        sortorder:'asc',
        filtrosTitulos:['Tributo'],
        filtros:['#c_tributo'],
        campos:{c_codigo:'c_concepto',d_descrip: 'd_concepto'},
        keyNav:true,
        searchInput: '#c_concepto',
        searchCode: true,
    });

    $("#lupa_nombre").lupa_generica({
        id_lista:v_lista_nombres,
        titulos:['Denominación','Objeto/Hecho','CUIT','Tipo Doc.','Nro. Doc.','Contribuyente','Tipo Imp.','Desc. Documento','Desc. Tipo Imponible'],
        grid:[
            {index:'d_denominacion',width:400},
            {index:'d_objeto_hecho',width:100},
            {index:'n_cuit',width:100},
            {index:'c_tipo_documento',width:70},
            {index:'n_documento',width:120},
            {index:'id_contribuyente',width:100,hidden:true},
            {index:'c_tipo_imponible',width:70},
            {index:'d_documento',width:100,hidden:true},
            {index:'d_tipo_imponible',width:100,hidden:true}],
        caption:'Lista de Contribuyentes',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#c_tributo','#c_concepto','#c_documento','#documento','#obj_hecho','#c_tipo_imponible','#nombre'],
        filtrosNulos: [false, false, true, true, true, true,true],
        filtrosTitulos:['Tributo','Concepto','Tipo Documento','Nro. Documento','Objeto/Hecho','Tipo Imponible','Denominación'],
        limpiarCod: true,
        width: 1000,
        campos:{d_denominacion:'nombre',
            d_objeto_hecho:'obj_hecho',
            n_cuit:'n_cuit',
            c_tipo_documento:'c_documento',
            n_documento:'documento',
            id_contribuyente:'id_contribuyente',
            c_tipo_imponible:'c_tipo_imponible',
            d_documento:'d_documento',
            d_tipo_imponible:'d_tipo_imponible'},
        keyNav:true
    });

    $("#lupa_c_documento").lupa_generica({
        id_lista:v_lista_doc,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:450}],
        caption:'Tipos de Documento',
        sortname:'c_dato',
        sortorder:'asc',
        campos:{c_dato:'c_documento',d_dato:'d_documento'},
        searchCode:true,
        searchInput: '#c_documento',
        keyNav:true,
        exactField: 'c_dato'
    });

    $("#lupa_c_tipo_imponible").lupa_generica({
        id_lista:v_lista_tipo_imponible,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:450}],
        caption:'Tipos Imponibles',
        sortname:'c_dato',
        sortorder:'asc',
        filtros:['#id_contribuyente','#c_tributo'],
        filtrosNulos: [true,true],
        filtrosTitulos:['CUIT','Tributo'],
        campos:{c_dato:'c_tipo_imponible',d_dato:'d_tipo_imponible'},
        searchCode:true,
        searchInput: '#c_tipo_imponible',
        keyNav:true,
        exactField: 'c_dato'
    });

    $("#lupa_obj_hecho").lupa_generica({
        id_lista:v_lista_obj_hecho,
        titulos:['Objeto Hecho'],
        grid:[  {index:'d_objeto_hecho',width:550}],
        caption:'Objeto Hecho',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        filtros:['#c_tributo','#id_contribuyente','#obj_hecho'],
        filtrosNulos: [false, true, true],
        filtrosTitulos:['Tributo','CUIT','Objeto Hecho'],
        exactField: 'd_objeto_hecho',
        limpiarCod: true,
        campos:{d_objeto_hecho:'obj_hecho'},
        keyNav:true,
    });
}

function generar(params){
    params.id_menu = v_id_menu;
    params.n_orden = 0;
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            if(data.resultado === 'OK'){
                mostrar_mensaje_modal('I','Información',data.p_estado);
                limpiar_datos_contribuyente();
                return;
            }else{
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}

function valida_periodo(campo, f_periodo) {

    if (!/^\d+$/.test(f_periodo)) {
        $('#'+campo).val('');
        mostrar_cuadro('I', 'Advertencia', 'El campo debe tener formato 999999.', '', '', 300, 200);
        return;
    }

    if (f_periodo.length === 4 && $('#c_concepto').val() !== '110'){
        if($('#'+campo).val() < 1970){
            mostrar_cuadro('E', 'Error', 'El año debe ser de 1970 en adelante.', '', '', 300, 200);
            $('#'+campo).val('');
            return;
        }else{
            $('#'+campo).val(f_periodo * 100 +1);
        }
    }else{
        if($('#'+campo).val() < 197000){
            mostrar_cuadro('E', 'Error', 'El año debe ser de 1970 en adelante.', '', '', 300, 200);
            $('#'+campo).val('');
            return;
        }
        if( $('#c_concepto').val() === '110'){
            if(f_periodo.substr(4,2) !== '00'){
                mostrar_cuadro('E', 'Error', 'Debe ingresar el mes = 00.', '', '', 300, 200);
            }
        }else{
            if(f_periodo.substr(4,2) < 1 || f_periodo.substr(4,2) > 12){
                mostrar_cuadro('E', 'Error', 'El mes debe estar entre 1 y 12.', '', '', 300, 200);
            }
        }
    }
}

function limpiar_generador_individual() {
    $('#div_input_tributo :input').val(null);
    $('#div_input_concepto :input').val(null);
    $('#f_periodo_desde').val(null);
    $('#f_periodo_hasta').val(null);
}

function limpiar_datos_contribuyente() {
    $('#div_cuit :input').val(null);
    $('#nombre').val(null);
    $('#div_input_documento :input').val(null);
    $('#documento').val(null);
    $('#div_input_tipo_imponible :input').val(null);
    $('#div_input_obj_hecho :input').val(null);
}

function autocompleta_contrib_por_doc(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: "generacion_individual_obligaciones_IB/php/autocomplete.php",
        data: {oper:'doc', c_documento: $('#c_documento').val(), documento: $('#documento').val()},
        dataType: 'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado === 'OK'){
                ajax_autocomplete = null;
                if(data) {
                    $("#nombre").val(data.DENOMINACION);
                    $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                    $("#n_cuit").val(data.CUIT);
                }
            }else{
                mostrar_cuadro('E', 'Error', 'Error al buscar el Documento');
                return;
            }
        }
    });
}

function autocompleta_contrib_por_cuit(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: "generacion_individual_obligaciones_IB/php/autocomplete.php",
        data: {oper:'cuit', term: limpia_cuit($('#n_cuit').val())},
        dataType: 'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado === 'OK'){
                ajax_autocomplete = null;
                if(data) {
                    $("#nombre").val(data.DENOMINACION);
                    $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                    $("#c_documento").val(data.C_TIPO_DOCUMENTO);
                    $("#documento").val(data.N_DOCUMENTO);
                    $("#d_documento").val(data.D_DOCUMENTO);
                    $('#div_input_tipo_imponible :input').val(null);
                    $('#div_input_obj_hecho :input').val(null);
                }
            }else{
                mostrar_cuadro('E', 'Error', 'Error al buscar el CUIT');
                return;
            }
        }
    });
}

function autocompleta_contrib_por_cuit_tributo_concepto(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: "generacion_individual_obligaciones_IB/php/autocomplete.php",
        data: {oper:'cuit_trib_concep',
            cuit: limpia_cuit($('#n_cuit').val()),
            tributo: $('#c_tributo').val(),
            concepto: $('#c_concepto').val(),
        },
        dataType: 'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado === 'OK'){
                ajax_autocomplete = null;
                if(data) {
                    $("#nombre").val(data.DENOMINACION);
                    $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                    $("#c_documento").val(data.C_TIPO_DOCUMENTO);
                    $("#documento").val(data.N_DOCUMENTO);
                    $("#d_documento").val(data.D_DOCUMENTO);
                    $("#c_tipo_imponible").val(data.C_TIPO_IMPONIBLE).blur();
                    $("#obj_hecho").val(data.D_OBJETO_HECHO);
                }
            }else{
                mostrar_cuadro('E', 'Error', 'Error al buscar los datos con CUIT, Tributo y Concepto');
                return;
            }
        }
    });
}

function autocompleta_contrib_por_doc_tributo_concepto(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: "generacion_individual_obligaciones_IB/php/autocomplete.php",
        data: {oper:'doc_trib_concep',
            doc: $('#documento').val(),
            tipo_doc: $('#c_documento').val(),
            tributo: $('#c_tributo').val(),
            concepto: $('#c_concepto').val(),
        },
        dataType: 'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado === 'OK'){
                ajax_autocomplete = null;
                if(data) {
                    $("#nombre").val(data.DENOMINACION);
                    $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                    $("#c_documento").val(data.C_TIPO_DOCUMENTO);
                    $("#documento").val(data.N_DOCUMENTO);
                    $("#d_documento").val(data.D_DOCUMENTO);
                    $("#c_tipo_imponible").val(data.C_TIPO_IMPONIBLE).blur();
                    $("#obj_hecho").val(data.D_OBJETO_HECHO);
                    $("#n_cuit").val(data.CUIT);
                }
            }else{
                mostrar_cuadro('E', 'Error', 'Error al buscar los datos con Documento, Tributo y Concepto');
                return;
            }
        }
    });
}

function autocompleta_contrib_por_obj_tributo_concepto(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: "generacion_individual_obligaciones_IB/php/autocomplete.php",
        data: {oper:'obj_trib_concep',
            obj: $('#obj_hecho').val(),
            tipo_impo: $('#c_tipo_imponible').val(),
            tributo: $('#c_tributo').val(),
            concepto: $('#c_concepto').val(),
        },
        dataType: 'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado === 'OK'){
                ajax_autocomplete = null;
                if(data) {
                    $("#nombre").val(data.DENOMINACION);
                    $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                    $("#c_documento").val(data.C_TIPO_DOCUMENTO);
                    $("#documento").val(data.N_DOCUMENTO);
                    $("#d_documento").val(data.D_DOCUMENTO);
                    $("#c_tipo_imponible").val(data.C_TIPO_IMPONIBLE).blur();
                    $("#obj_hecho").val(data.D_OBJETO_HECHO);
                    $("#n_cuit").val(data.CUIT);
                }
            }else{
                mostrar_cuadro('E', 'Error', 'Error al buscar los datos con Documento, Tributo y Concepto');
                return;
            }
        }
    });
}