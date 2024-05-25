function ver_detalle(id_obl){
    if (id_obl){
        setea_parametros('#detalle_grid',{':p_id_obligacion':id_obl});
        $('#detalle_modal').modal('show');
    }
}

function ver_foto(source){
    $('#foto_path').val(source);
    $('#foto_modal').modal('show');
}

function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "consulta_telepeaje/autocomplete.php",
        type:"POST",
        data:{  p_oper:'getContribuyente',p_filtro: cuit_sin_guiones},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res){
                $("#d_denominacion").val(res['DENOMINACION']);
                $("#id_contribuyente").val(res['ID_CONTRIBUYENTE']);
                $("#d_dominio").val(null);
            }else{
                $("#d_denominacion").val(null);
                $("#id_contribuyente").val(null);
                $("#d_dominio").val(null);
            }
        }
    });
}