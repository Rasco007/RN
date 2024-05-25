
function ocultarLupa(){
        $('#lupa_d_objeto_hecho').hide();
        $('#mascara_lupa_d_objeto_hecho').show().css('display', 'table-cell');
}




function mostrarLupa(){
    $('#lupa_d_objeto_hecho').show().css('display', 'table-cell');
    $('#mascara_lupa_d_objeto_hecho').hide();
}

function apagar_grillas(){

    $("#div_3142").hide();
    $("#div_det").hide();

    $("#div_ret").hide();
    $("#div_ret20").hide();
    $("#div_percepciones").hide();
    $("#div_aduana").hide();
    $("#div_retbco").hide();
    $("#div_djc").hide();
    $("#div_grilla11").hide();
    $("#div_grilla12").hide();
    $("#div_grilla14").hide();
    $("#div_grilla15").hide();
    $("#div_grilla16").hide();
    $("#div_grilla17").hide();
    $("#div_grilla18").hide();
    $("#div_grilla19").hide();
    $("#div_grilla20").hide();
    $("#div_grilla21").hide();
    $("#div_grilla22").hide();
    $("#div_grilla24").hide();


}

function sumCol(grid,col){
    return formatear_numero($("#"+grid).jqGrid('getCol', col, false).reduce( (a,b) => a + parse(b), 0),2);
}