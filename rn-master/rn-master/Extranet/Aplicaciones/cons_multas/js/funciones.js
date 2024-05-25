function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "cons_multas_oe/autocomplete.php",
        type:"POST",
        data:{  p_oper:'getContribuyente',p_filtro: cuit_sin_guiones},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res){
                $("#d_denominacion").val(res['DENOMINACION']);
                $("#id_contribuyente").val(res['ID_CONTRIBUYENTE']);
            }else{
                $("#d_denominacion").val(null);
                $("#id_contribuyente").val(null);
            }
        }
    });
}

function sumar_saldos(){
    var ids = $("#main_grid").getGridParam('selarrrow');
    var saldo_total = 0;
    ids.forEach(rowid => {
        var saldo = parse($("#main_grid").getCell(rowid,'i_saldo_actualizado'));
        if(parseFloat(saldo) >= 0){
            saldo_total = parseFloat(saldo_total) + parseFloat(saldo);
        }    
    });
    
    $("#i_saldo_total").val(redondear((saldo_total)));
}