function solicitar_cae_afip(n_lote,n_secuencia ){
    n_secuencia = n_secuencia || 1;
    return $.ajax({
        type: "post",
        url: AFIP_BASEPATH + "solicitar_cae_afip.php",
        data: {            
            'p_n_lote': n_lote,
            'p_n_secuencia': n_secuencia
        },
        dataType: "json"/*,
        success: function (response) {
            $('#resultado').val(JSON.stringify(response));
        },
        error: function(xhr, status, error) {
            $('#resultado').val(JSON.stringify(xhr));
        }*/
    });
    
}

