function valida_fecha(){
    let anio = $('#f_cartera').val()?.split('/')[2];
    if (anio && anio  != $('#n_anio').val()) {
        return 'La fecha de Cobro de la Forma de Pago debe estar entre 01/01/'+$('#n_anio').val()+' y el 31/12/'+$('#n_anio').val();
    }

    return '';
}