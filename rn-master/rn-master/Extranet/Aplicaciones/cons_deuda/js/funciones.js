function fade_pages(page){
    if (page == 2){
        $('#datos_deuda').fadeOut(300,function(){
            $('#div_search').fadeIn(300); 
        });
    }else{
        $('#div_search').fadeOut(300,function(){
            $('#datos_deuda').fadeIn(300);  
            $( window ).resize();  
        });
    }
    
}


function sumar_saldos(){
    var ids = $("#main_grid").getGridParam('selarrrow');
    var saldo_total = 0;
    var capital_total = 0;
    var interes_total = 0;
    ids.forEach(rowid => {
        var capital = parse($("#main_grid").getCell(rowid,'i_capital'));
        var interes = parse($("#main_grid").getCell(rowid,'i_interes'));
        var saldo = parse($("#main_grid").getCell(rowid,'i_actual'));
        if(parseFloat(saldo) >= 0){
            capital_total = parseFloat(capital_total) + parseFloat(capital);
            interes_total = parseFloat(interes_total) + parseFloat(interes);
            saldo_total = parseFloat(saldo_total) + parseFloat(saldo);
        }    
    });
    
    $("#i_capital_total").val(redondear((capital_total)));
    $("#i_interes_total").val(redondear((interes_total)));
    $("#i_saldo_total").val(redondear((saldo_total)));
}
