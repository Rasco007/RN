function inicializarEventos(){
    $(".dominio").each(function() {
        var events = $._data(this,'events');
        if(events && events['keyup']) return;
        $(this).keyup(function(){
            if($(this).prop('readonly')) return;
            $(this).val( $(this).val().toUpperCase() );
        }).css("text-transform","uppercase");
    });

    $('.dominio').keypress(function (tecla) {
        return (((tecla.charCode >= 48 && tecla.charCode <= 90) || (tecla.charCode >= 97 && tecla.charCode <= 122)) && $(this).val().length < 9);
    });

    $(".mascara_importe").each(function () {
        var events = $._data(this, 'events');
        // if (events && events['keydown']) return;
        $(this).keydown(function (event) {
            if ($(this).prop('readonly')) return;
            return controla_number(event, this, 2);
        });
    }).css('text-align', 'right');

    $('#btn_confirmar').click(function () {
        if ($('#frm_consulta').validationEngine('validate')){
            comprar_pago_ant();
        }
    });
}