function limpia_cuit(cuit){
    var cuit_sin_guiones;
    var valida_cuit_completo = cuit.indexOf('_');
    if(valida_cuit_completo == -1 && cuit != ''){
        var aux = cuit.split('-');
        cuit_sin_guiones = aux[0]+aux[1]+aux[2];
    }
    return cuit_sin_guiones;
}