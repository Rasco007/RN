function n_cuit_focusout(){
    if ($('#n_cuit').val() && $('#n_cuit').val().length == 13){
        $('#main').procOverlay({visible:true});
        $.ajax({
            url: "consulta_instancias/consultas_ajax.php",
            type:"POST",
            dataType: 'JSON',
            data:{ p_oper:'cuit', filtro: limpia_cuit($('#n_cuit').val())},
            success: function(response){
                $('#main').procOverlay({visible:false});
                if (response){
                    $("#d_denominacion").val(response['D_DENOMINACION']);
                    $("#id_contribuyente").val(response['ID_CONTRIBUYENTE']);
                    $("#c_tipo_documento").val(response['C_TIPO_DOCUMENTO']);
                    $("#d_tipo_documento").val(response['D_TIPO_DOCUMENTO']);
                    $("#n_documento").val(response['N_DOCUMENTO']);
                }
            }
        });
    }
}

function abrir_modal(modal){
    $(modal).modal('show');
    $(window).resize();
}