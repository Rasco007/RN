function cons_dom_siat() {
    tr = $('#siat_grid').getCell($('#siat_grid').getGridParam('selrow'),'c_tipo_respon');
    $.ajax({
        url: "cons_prop_cat_rpi/php/consultas_ajax.php",
        type:"POST",
        data:{ p_oper:'tiene_resp', c_tipo_respon: tr},
        dataType: 'json'
    }).done(function(response){
        if(response.CANT > 0){
            $('#siat_dom_f').val($('#siat_grid').getCell($('#siat_grid').getGridParam('selrow'),'dom_fiscal'));
            $('#siat_dom_p').val($('#siat_grid').getCell($('#siat_grid').getGridParam('selrow'),'dom_postal'));
        }else{
            $('#div_mensaje').css('display', 'block');
            $('#msge').val('No se encontro el tipo de responsabilidad!');
        }
    }).fail(function () {
        mostrar_error('Error en el acceso a los datos de SIAT');
    });
}

function get_partida(nomenc) {
    $.ajax({
        url: "cons_prop_cat_rpi/php/consultas_ajax.php",
        type:"POST",
        data:{ p_oper:'get_partida', nomenclatura: nomenc},
        dataType: 'json'
    }).done(function(response){
        if(response.RTA != null){
            var v_d_partida = response.RTA;
        }else{
            v_d_partida = '';
        }
        $('#titulo_texto').append('<h4>Responsables Vigentes del Inmueble '+v_d_nomenclatura+' - '+v_d_partida+'</h4>');
    }).fail(function () {
        mostrar_error('Error en el acceso a los datos');
    });
}