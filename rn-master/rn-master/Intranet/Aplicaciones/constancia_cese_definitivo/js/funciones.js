function autocompleta_contrib_por_cuit() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: "constancia_cese_definitivo/php/autocomplete.php",
        data: {oper:'cuit', term: limpia_cuit($('#n_cuit').val())},
        dataType: 'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado === 'OK'){
                ajax_autocomplete = null;
                if(data) {
                    $("#desc_denom").val(data.DENOMINACION);
                    $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                    /*$("#c_tipo_documento").val(data.C_TIPO_DOCUMENTO);
                    $("#n_documento").val(data.N_DOCUMENTO);
                    $("#d_tipo_documento").val(data.D_DOCUMENTO);*/
                    //Lo dejo comentado porque se suele completar tambien el documento, pero el Form solo completa el nombre al cargar el CUIT.
                    $('#c_tributo').val(null);
                    $('#d_tributo').val(null);
                    $('#d_objeto_hecho').val(null);
                }
            }else{
                mostrar_cuadro('E', 'Error', 'Error al buscar el CUIT');
            }
        }
    });
}

function autocompleta_por_doc(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: "constancia_cese_definitivo/php/autocomplete.php",
        data: {oper:'doc', c_documento: $('#c_tipo_documento').val(), documento: limpia_doc($('#n_documento').val())},
        dataType: 'json',
        success: function( data ) {
            if(data.resultado === 'OK'){
                ajax_autocomplete = null;
                if(data) {
                    $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                    $("#n_cuit").val(data.CUIT).mask("99-99999999-9");
                    $("#desc_denom").val(data.DENOMINACION);
                    $('#c_tributo').val(null);
                    $('#d_tributo').val(null);
                    $('#d_objeto_hecho').val(null);
                }
            }else{
                mostrar_cuadro('E', 'Error', 'Error al buscar el Documento');
                $('#main').procOverlay({visible:false});
            }
        }
    });
}

function imprimir_reporte() {
    $('#main').procOverlay({visible: true});
    let params = 'p_contribuyente|' + $("#id_contribuyente").val() + '&p_tributo|' + $('#c_tributo').val() + '&p_objeto|' + $('#d_objeto_hecho').val();
    llamar_report('CONTL042', params, 'PDF');
}

function limpia_doc(doc){
    var result;
    result=doc.replaceAll('.','');
    return result;
}/* QUITA LOS PUNTOS DEL DOC */
