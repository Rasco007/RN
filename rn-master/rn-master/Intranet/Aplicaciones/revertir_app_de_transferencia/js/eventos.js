function init_eventos(){

    $('#n_transfer').focusout(function(){
        autocompleta_datos_transferencia();
    });

    $('#n_comprobante').focusout(function(){
        if ($('#n_comprobante').val() != '' && $('#id_transfer').val() != ''){
            autocompleta_datos_comprobante();
        }
    });

    $('#btn_cancelar').click(function(){
        limpiar_datos();
    });

    $('#btn_revertir').click(function(){

        var valido = $('#frm_revertir_app_de_transferencia').validationEngine('validate');
        if(valido) {
            var params = {
                p_n_comprobante : $('#n_comprobante').val(),
                p_n_transfer : $('#n_transfer').val()
            };
            revertir(params);
        }
    });

}

function limpiar_datos() {

    //Datos Transferencia:
    $('#div_n_transfer :input').val(null);
    $('#div_input_bono :input').val(null);
    $('#c_especie').val(null);
    $('#f_transfer').val(null);
    //Datos Comprobante:
    $('#div_n_comprobante :input').val(null);
    $('#f_imputacion').val(null);
    $('#i_pesos_imputados').val(null);
    $('#i_bonos_imputados').val(null);
    $('#d_t_comprobante').val(null);

}

function autocompleta_datos_transferencia(){
    $.ajax({
        type:'POST',
        url: "revertir_app_de_transferencia/php/autocomplete.php",
        data: {oper:'transferencia', n_transfer: $('#n_transfer').val()},
        dataType: 'json',
        success: function( data ) {
            if(data !== null){
                ajax_autocomplete = null;
                $("#id_transfer").val(data[0].ID_TRANSFER);
                $("#f_transfer").val(data[0].F_TRANSFER);
                $("#c_bono").val(data[0].C_BONO);
                $("#d_bono").val(data[0].D_DATO);
                $("#c_especie").val(data[0].C_ESPECIE);
            }
        }
    });
}

function autocompleta_datos_comprobante(){
    $.ajax({
        type:'POST',
        url: "revertir_app_de_transferencia/php/autocomplete.php",
        data: {oper:'comprobante', id_transfer: $('#id_transfer').val(), n_comprobante: $('#n_comprobante').val()},
        dataType: 'json',
        success: function( data ) {
            if(data !== null){
                ajax_autocomplete = null;
                $("#d_t_comprobante").val(data[0].D_TIPO_COMPROBANTE);
                $("#f_imputacion").val(data[0].F_IMPUTACION);
                $("#i_pesos_imputados").val(data[0].I_PESOS_IMPUTADOS);
                $("#i_bonos_imputados").val(data[0].I_BONOS_IMPUTADOS);
            }
        }
    });
}




