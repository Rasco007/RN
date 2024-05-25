function inicializarEventos() {
    $('#n_cuit, #new_cuit').mask('99-99999999-9');
    $("#n_documento").mask("999999999");
    $('.numero').keypress(function (tecla) {
        return (tecla.charCode >= 48 && tecla.charCode <= 57);
    });
    //Completamos Datos del Contribuyente
    $('#n_cuit').change(function (){
        if ($('#n_cuit').val() && $('#n_cuit').val().length == 13){
            completarDenominacion();
        }else{
            $('#btn_limpiar').click();
        }
    });

    $('#n_documento').change(function () {
        if (!$('#id_contribuyente').val() && $('#c_tipo_documento').val() && $('#n_documento').val()){
            fun_ajax_documento();
        }else if(!$('#n_documento').val()){
            $('#btn_limpiar').click();
        }
    });

    $("#d_denominacion").autocomplete({
        source: function( request, response ) {

            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "cambiar_cuit/php/autocomplete.php",
                    data: {p_oper:'getAutocomplete',p_filtro: request.term},
                    dataType: 'json',
                    success: function( data ) {
                        ajax_autocomplete = null;
                        if(data) {
                            response(
                                $.map(data.data_contrib, function( item ) {
                                    return {
                                        label: item.label,
                                        value: item.razon_social,
                                        cuit: item.cuit,
                                        id_contribuyente: item.id_contribuyente,
                                        c_tipo_documento: item.c_tipo_documento,
                                        d_tipo_documento: item.d_tipo_documento,
                                        n_documento: item.n_documento
                                    }
                                })
                            );
                        }
                    }
                });
        },
        minLength:1,
        select:function(event,ui){
            if (ui.item.value) {
                $('#d_denominacion').val(ui.item.value);
                $("#n_cuit").val(ui.item.cuit);
                $("#id_contribuyente").val(ui.item.id_contribuyente);
                $('#c_tipo_documento').val(ui.item.c_tipo_documento);
                $('#d_tipo_documento').val(ui.item.d_tipo_documento);
                $('#n_documento').val(ui.item.n_documento);
                return false;
            }
        },
        change:function (event,ui) {
            if ($('#n_cuit').val()){
                $('#new_cuit,#btn_datos_contrib').attr("disabled",false);
                $('#btn_procesar').show();
            }else {
                $('#btn_limpiar').click();
            }
        }
    });
   
    $('#btn_limpiar').click(function(){
        $('#frm_consulta :input, #new_cuit').val(null);
        $('#new_cuit,#btn_datos_contrib, #n_documento').attr("disabled",true);
        $('#btn_procesar').hide();
        id_contrib = null;
    });

    $('#btn_datos_contrib').click(function () {
        post_to_url('consulta_contribuyentes.php', {
            'p_consulta': 'S',
            'cuit': $("#n_cuit").val(),
            'ruta':"[]",
            'p_n_id_menu': 10885}, '_blank');
    });

    $('#btn_procesar').click(function () {
        if ($('#frm_cuit').validationEngine('validate')){
            if (limpia_cuit($('#n_cuit').val()) != limpia_cuit($('#new_cuit').val())){
                mostrar_cuadro('C','Cambiar CUIT','Va a modificar el cuit al Contribuyente:<br>' +
                    $('#n_cuit').val()+' '+$('#d_denominacion').val()+
                    '<br>Por el cuit:<br>'+$('#new_cuit').val()+'<br>¿Desea continuar con la operación?',function () {
                    fun_cambiar_cuit();
                },null,400);
            }else {
                mostrar_validacion('Los cuits ingresados son iguales.');
            }
        }
    })
}