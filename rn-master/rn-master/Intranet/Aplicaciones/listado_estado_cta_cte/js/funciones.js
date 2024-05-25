function autocompleta_contrib_por_cuit() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: "listado_estado_cta_cte/php/autocomplete.php",
        data: {oper:'cuit', term: limpia_cuit($('#n_cuit').val())},
        dataType: 'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado === 'OK'){
                ajax_autocomplete = null;
                if(data) {
                    $("#desc_denom").val(data.DENOMINACION);
                    $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                    $("#c_tipo_documento").val(data.C_TIPO_DOCUMENTO);
                    $("#n_documento").val(data.N_DOCUMENTO);
                    $("#d_tipo_documento").val(data.D_DOCUMENTO);
                    $('#c_tributo').val(null);
                    $('#c_tipo_imponible').val(null);
                    $('#d_tributo').val(null);
                    $('#d_objeto_hecho').val(null);
                    $('#c_concepto').val(null);
                    $('#d_concepto').val(null);
                    $('#f_vto_desde').val(null);
                }
            }else{
                mostrar_cuadro('E', 'Error', 'Error al buscar el CUIT.');
            }
        }
    });
}

function autocompleta_por_doc(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: "listado_estado_cta_cte/php/autocomplete.php",
        data: {oper:'doc', c_documento: $('#c_tipo_documento').val(), documento: limpia_doc($('#n_documento').val())},
        dataType: 'json',
        success: function( data ) {
            if(data.resultado === 'OK'){
                $('#main').procOverlay({visible:false});
                if(data) {
                    ajax_autocomplete = null;
                    $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                    $("#n_cuit").val(data.CUIT).mask("99-99999999-9");
                    $("#desc_denom").val(data.DENOMINACION);
                    $('#c_tributo').val(null);
                    $('#c_tipo_imponible').val(null);
                    $('#d_tributo').val(null);
                    $('#d_objeto_hecho').val(null);
                    $('#c_concepto').val(null);
                    $('#d_concepto').val(null);
                    $('#f_vto_desde').val(null);
                }
            }else{
                mostrar_cuadro('E', 'Error', 'Error al buscar el Documento.');
                $('#main').procOverlay({visible:false});
            }
        }
    });
}

function autocompleta_por_tributo_y_objeto(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: "listado_estado_cta_cte/php/autocomplete.php",
        data: {
            oper:'tributo_y_objeto',
            p_c_tributo: $('#c_tributo').val(),
            p_d_obj_hecho: $('#d_objeto_hecho').val()
        },
        dataType: 'json',
        success: function( data ) {
            if(data.resultado === 'OK'){
                $('#main').procOverlay({visible:false});
                if(data) {
                    ajax_autocomplete = null;
                    $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                    $("#n_cuit").val(data.N_CUIT).mask("99-99999999-9");
                    $("#desc_denom").val(data.D_DENOMINACION);
                    $("#c_tipo_documento").val(data.C_TIPO_DOCUMENTO).blur();
                    $("#n_documento").val(data.N_DOCUMENTO);
                    $('#c_concepto').val(null);
                    $('#d_concepto').val(null);
                    $('#f_vto_desde').val(null);
                }
            }else{
                mostrar_cuadro('E', 'Error', 'Error al buscar el Tributo y Objeto.');
                $('#main').procOverlay({visible:false});
            }
        }
    });
}

function imprimir(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_contrib":$('#id_contribuyente').val(),
            "p_tributo":$('#c_tributo').val(),
            "p_objeto":$('#d_objeto_hecho').val(),
            "p_concepto":$('#c_concepto').val(),
            "p_fec_desde":$('#f_vto_desde').val(),
            "p_fec_hasta":$('#f_vto_hasta').val(),
            "p_t_impo":$('#c_tipo_imponible').val(),
            "id_menu":v_id_menu,
            "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado === 'OK'){
                imprimir_reporte();
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                document.getElementById('grid_obligaciones').style.display="none";
                $('#main_grid_obligaciones').clearGridData();
            }
        }
    });
}

function imprimir_reporte() {
    let params = 'P_ID_CONTRIBUYENTE|' + $("#id_contribuyente").val() +
        '&P_TRIBUTO|' + $('#c_tributo').val() +
        '&P_OBJETO_HECHO|' + $('#d_objeto_hecho').val() +
        '&P_CONCEPTO|' + $('#c_concepto').val() +
        '&F_DESDE|' + $('#f_vto_desde').val() +
        '&F_HASTA|' + $('#f_vto_hasta').val() +
        '&P_TIPO_IMPONIBLE|' + $('#c_tipo_imponible').val();
    llamar_report('CCTEL_006', params, 'PDF');
}

function excel(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_id_contribuyente":$('#id_contribuyente').val(),
            "p_c_tributo":$('#c_tributo').val(),
            "p_concepto":$('#c_concepto').val(),
            "p_objeto_hecho":$('#d_objeto_hecho').val(),
            "p_fecha_desde":$('#f_vto_desde').val(),
            "p_fecha_hasta":$('#f_vto_hasta').val(),
            "id_menu":v_id_menu,
            "n_orden":1
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado === 'OK'){
                mostrar_grilla_obligaciones();
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                document.getElementById('grid_obligaciones').style.display="none";
                $('#main_grid_obligaciones').clearGridData();
            }
        }
    });
}

function mostrar_grilla_obligaciones() {
    filtros_no_nativos_ar = [];
    filtros_arr_main = [];

    if($('#n_cuit').val() != ''){
        filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());
    }
    if($('#c_tributo').val() != ''){
        filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());
    }
    if($('#d_objeto_hecho').val() != ''){
        filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());
    }
    if($('#c_concepto').val() != ''){
        filtros_arr_main.push('Concepto: '+ $('#c_concepto').val());
    }
    if($('#f_vto_desde').val() != ''){
        filtros_arr_main.push(' F. Vto. Obligación Desde: '+ $('#f_vto_desde').val());
    }
    if($('#f_vto_hasta').val() != ''){
        filtros_arr_main.push('F. Vto. Obligación Hasta: '+ $('#f_vto_hasta').val());
    }

    filtros_no_nativos_ar['main_grid_obligaciones'] = filtros_arr_main;

    setea_parametros('#main_grid_obligaciones',{
        ':p_id_contribuyente':$('#id_contribuyente').val(),
        ':p_c_tributo':$('#c_tributo').val(),
        ':p_concepto':$('#c_concepto').val(),
        ':p_objeto_hecho':$('#d_objeto_hecho').val(),
        ':p_fecha_desde':$('#f_vto_desde').val(),
        ':p_fecha_hasta':$('#f_vto_hasta').val()
    });

    document.getElementById('grid_obligaciones').style.display="block";
    $(window).resize();
}


function limpia_doc(doc){
    var result;
    result=doc.replace('.','');
    result=result.replace('.','');
    return result;
}/* QUITA LOS PUNTOS DEL DOC */