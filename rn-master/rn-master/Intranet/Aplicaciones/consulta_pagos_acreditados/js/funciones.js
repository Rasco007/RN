function autocompleta_contrib_por_cuit() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: "consulta_pagos_acreditados/php/autocomplete.php",
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
                }
            }else{
                mostrar_cuadro('E', 'Error', 'Error al buscar el CUIT');
                return;
            }
        }
    });
}

function autocompleta_por_doc(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: "consulta_pagos_acreditados/php/autocomplete.php",
        data: {oper:'doc', c_documento: $('#c_tipo_documento').val(), documento: limpia_doc($('#n_documento').val())},
        dataType: 'json',
        success: function( data ) {
            if(data.resultado === 'OK'){
                $('#main').procOverlay({visible:false});
                if(data) {
                    ajax_autocomplete = null;
                    $("#n_cuit").val(data.CUIT).mask("99-99999999-9");
                    $("#desc_denom").val(data.DENOMINACION);
                    $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
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
        url: "consulta_pagos_acreditados/php/autocomplete.php",
        data: {
            oper:'tributo_y_objeto',
            p_c_tributo: $('#c_tributo').val(),
            p_d_obj_hecho: $('#d_objeto_hecho').val()
        },
        dataType: 'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data !== null && data.resultado == 'OK'){
                ajax_autocomplete = null;
                $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                $("#n_cuit").val(data.N_CUIT).mask("99-99999999-9");
                $("#desc_denom").val(data.D_DENOMINACION);
                $("#c_tipo_documento").val(data.C_TIPO_DOCUMENTO).blur();
                $("#n_documento").val(data.N_DOCUMENTO);

                document.getElementById('totalizador').style.display="flex";
                document.getElementById('grid_id_contribuyente').style.display="block";
                document.getElementById('grid_remito').style.display="none";
                document.getElementById('grid_sin_remito_ni_id_contrib').style.display="none";
                $(window).resize();

                if($('#i_desde').val() === 0 || $('#i_desde').val() === ''){$('#i_desde').val(0)}
                if($('#i_hasta').val() === 0 || $('#i_hasta').val() === ''){$('#i_hasta').val(99999999999)}

                $('#i_desde').val(formatea_number(mascara_numero(parse($('#i_desde').val()).toFixed(2), ',', -1, 2), ''));
                $('#i_hasta').val(formatea_number(mascara_numero(parse($('#i_hasta').val()).toFixed(2), ',', -1, 2), ''));

                setea_parametros('#main_grid_id_contribuyente',{
                    ':p_remito':$('#remito').val(),
                    ':p_id_contribuyente':$('#id_contribuyente').val(),
                    ':p_c_tipo_imponible':$('#c_tipo_imponible').val(),
                    ':p_d_objeto_hecho':$('#d_objeto_hecho').val(),
                    ':p_c_tributo':$('#c_tributo').val(),
                    ':p_c_concepto':$('#c_concepto').val(),
                    ':p_n_posicion_fiscal':$('#n_posicion_fiscal').val().replace("/", ""),
                    ':p_n_cuota_anticipo':$('#n_cuota_anticipo').val(),
                    ':p_f_desde':$('#f_desde').val(),
                    ':p_f_hasta':$('#f_hasta').val(),
                    ':p_i_desde':($('#i_desde').val()).replace(/\./g, '').replace(',', '.'),
                    ':p_i_hasta':($('#i_hasta').val()).replace(/\./g, '').replace(',', '.'),
                    ':p_n_cabezal':$('#cabezal').val(),
                    ':p_c_estado_pago':$('#estado').val(),
                    ':p_c_tipo_form':$('#c_tipo_form').val()
                });
            }
        }
    });
}

function limpia_doc(doc){
    var result;
    result=doc.replace('.','');
    result=result.replace('.','');
    return result;
}/* QUITA LOS PUNTOS DEL DOC */