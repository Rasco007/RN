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
        filtros:['#c_tributo','#c_documento','#documento','#obj_hecho','#c_tipo_imponible','#nombre'],
        filtrosNulos: [false, true, true, true, true,true],
        filtrosTitulos:['Tributo','Tipo Documento','Nro. Documento','Objeto/Hecho','Tipo Imponible','Denominación'],
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
        filtros:['#id_contribuyente'],
        filtrosNulos: [true],
        sortorder:'asc',
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
        filtros:['#c_tributo','#id_contribuyente'],
        filtrosNulos: [false, false],
        filtrosTitulos:['Tributo','CUIT'],
        exactField: 'd_objeto_hecho',
        limpiarCod: true,
        campos:{d_objeto_hecho:'obj_hecho'},
        searchInput: '#obj_hecho',
        keyNav:true
    });

    $("#lupa_c_tipo_ajuste").lupa_generica({
        id_lista:v_lista_tipo_ajuste,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:450}],
        caption:'Tipos de Ajuste',
        sortname:'c_dato',
        sortorder:'asc',
        campos:{c_dato:'c_tipo_ajuste',d_dato:'d_tipo_ajuste'},
        searchCode:true,
        searchInput: '#c_tipo_ajuste',
        keyNav:true,
        exactField: 'c_dato'
    });

}

function limpia_f_periodo(f_periodo){
    var result;
    result = f_periodo.replace('/','');
    return result;
}/* QUITA LA MASCARA DEL PERIODO */

function llama_exena(params){
    params.id_menu = v_id_menu;
    params.n_orden = 0;
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            if(data.resultado === 'OK'){
                if(data.p_aux === '0'){
                    mostrar_mensaje_modal('E','Error','No hay exenciones para el Objeto seleccionado.');
                    return;
                }else{
                    post_to_url('excenciones_hechos.php',
                    {
                    "p_n_id_menu":10910,
                    "p_c_trib": $('#c_tributo').val(),
                    "p_d_trib": $('#d_tributo').val(),
                    "p_objeto":$('#obj_hecho').val(),
                    "p_c_timp":$('#c_tipo_imponible').val(),
                    "p_d_timp":$('#d_tipo_imponible').val(),
                    "p_documento":$('#documento').val(),
                    "p_n_cuit":$('#n_cuit').val(),
                    "p_nombre":$('#nombre').val(),
                    "p_c_documento":$('#c_documento').val(),
                    "p_d_documento":$('#d_documento').val(),
                    "p_id_contrib":$('#id_contribuyente').val(),
                    "p_modo":'C'
                    
                    
                },
                    '_blank', 'POST');
                }
            }else{
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}

function llama_bonif(params){
    params.id_menu = v_id_menu;
    params.n_orden = 1;
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            if(data.resultado === 'OK'){
                if(data.p_aux === '0'){
                    mostrar_mensaje_modal('E','Error','No hay bonificaciones para el Objeto seleccionado.');
                    return;
                }else{
                    post_to_url("abm_bonificaciones.php",
                    {
                    "p_n_id_menu":10888,
                    "p_c_trib": $('#c_tributo').val(),
                    "p_d_trib": $('#d_tributo').val(),
                    "p_objeto":$('#obj_hecho').val(),
                    "p_c_timp":$('#c_tipo_imponible').val(),
                    "p_d_timp":$('#d_tipo_imponible').val(),
                    "p_documento":$('#documento').val(),
                    "p_n_cuit":$('#n_cuit').val(),
                    "p_nombre":$('#nombre').val(),
                    "p_c_documento":$('#c_documento').val(),
                    "p_d_documento":$('#d_documento').val(),
                    "p_id_contrib":$('#id_contribuyente').val(),
                    "p_modo":'C'
                    },
                    '_blank', 'POST');
                }
            }else{
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}

function generar_recalculo(params){
    params.id_menu = v_id_menu;
    params.n_orden = 2;
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            if(data.resultado === 'OK'){
                mostrar_mensaje_modal('I','Información','El proceso finalizo correctamente.');
                return;
            }else{
                mostrar_error('Error no contemplado.');
                return;
            }
        }
    });
}

function autocompleta_tipo_imp_y_obj(){
    $.ajax({
        type:'POST',
        url: "recalculo_obligaciones/php/autocomplete.php",
        data: {
            oper:'tipo_imp_y_objeto',
            p_n_cuit: limpia_cuit($('#n_cuit').val()),
            p_c_tributo: $('#c_tributo').val()
        },
        dataType: 'json',
        success: function( data ) {
            if(data !== null){
                ajax_autocomplete = null;
                $("#nombre").val(data[0].DENOMINACION);
                $("#id_contribuyente").val(data[0].ID_CONTRIBUYENTE);
                $("#c_documento").val(data[0].C_TIPO_DOCUMENTO);
                $("#documento").val(data[0].N_DOCUMENTO);
                $("#d_documento").val(data[0].D_DOCUMENTO);
                $("#c_tipo_imponible").val(data[0].C_TIPO_IMPONIBLE);
                $("#d_tipo_imponible").val(data[0].D_TIPO_IMPONIBLE);
                $("#obj_hecho").val(data[0].D_OBJETO_HECHO);
            }
        }
    });
}

function autocompleta_contrib_por_doc(){
    $.ajax({
        type:'POST',
        url: "generacion_individual_obligaciones_IB/php/autocomplete.php",
        data: {oper:'doc', c_documento: $('#c_documento').val(), documento: $('#documento').val()},
        dataType: 'json',
        success: function( data ) {
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

function limpiar_datos_objeto() {
    $('#div_cuit :input').val(null);
    $('#nombre').val(null);
    $('#div_input_documento :input').val(null);
    $('#documento').val(null);
    $('#div_input_tipo_imponible :input').val(null);
    $('#div_input_obj_hecho :input').val(null);
    $('#div_input_tipo_ajuste :input').val(null);
    document.getElementById('checkbox_tipo_ajuste').checked = false;
    document.getElementById('checkbox_tipo_ajuste').disabled  = false;
    mostrar_ocultar_tipo_ajuste();
}
