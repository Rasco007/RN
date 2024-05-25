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

    $('#btn_continuar').click(function () {
        if ($('#frm_consulta').validationEngine('validate')){
            $('#d_dominio').attr('disabled',true);
            get_datos();
        }
    });

    $('#btn_cancelar').click(function () {
        $('#frm_consulta :input').val(null);
        $('#d_dominio').attr('disabled',false);
        $('#campo_importe').val(null);
        $('#campo_importe').text(null);
        $('#div_radio_buttons').empty();
        $('#btn_continuar').show();
        $('#frm_tipos_aut, #div_si_tipo_aut, #campo_importe, #btn_comprar, #btn_cancelar').hide();
    });

    $('#btn_comprar').click(function () {
        validar_vigencia();
    });
}