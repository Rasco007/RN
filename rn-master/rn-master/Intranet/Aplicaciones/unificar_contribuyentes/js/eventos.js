function inicializarEventos() {
    $('#n_cuit, #unif_n_cuit').mask('99-99999999-9');
    $("#n_documento, #unif_n_documento").mask("999999999");
    $('.numero').keypress(function (tecla) {
        return (tecla.charCode >= 48 && tecla.charCode <= 57);
    });
    //Completamos Datos del Contribuyente
    $('#n_cuit').change(function (){
        if ($('#n_cuit').val() && $('#n_cuit').val().length == 13){
            completarDenominacion("");
        }else{
            $('#btn_limpiar').click();
        }
    });

    $('#unif_n_cuit').change(function (){
        if ($('#unif_n_cuit').val() && $('#unif_n_cuit').val().length == 13){
            completarDenominacion("unif_");
        }else{
            $('#frm_datos_unif :input').val(null);
            $('#btn_unif_datos_contrib').attr('disabled',true);
            $('#btn_procesar').hide();
        }
    });

    $('#n_documento').change(function () {
        if (!$('#id_contribuyente').val() && $('#c_tipo_documento').val() && $('#n_documento').val()){
            fun_ajax_documento("");
        }else if(!$('#n_documento').val()){
            $('#btn_limpiar').click();
        }
    });

    $('#unif_n_documento').change(function () {
        if (!$('#unif_id_contribuyente').val() && $('#unif_c_tipo_documento').val() && $('#unif_n_documento').val()){
            fun_ajax_documento("unif_");
        }else if(!$('#n_documento').val()){
            $('#frm_datos_unif :input').val(null);
            $('#btn_unif_datos_contrib').attr('disabled',true);
            $('#btn_procesar').hide();
        }
    });

    //autocomplete contribuyente erroneo
    $("#d_denominacion").autocomplete({
        source: function( request, response ) {

            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "unificar_contribuyentes/php/autocomplete.php",
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
                $('#d_denominacion').change();
                return false;
            }
        },
        change:function (event,ui) {
            if ($('#d_denominacion').val()){
                $('#frm_datos_unif :input, #btn_datos_contrib').attr('disabled',false);
                $('#lupa_unif_c_tipo_documento').show();
            }else {
                $('#btn_limpiar').click();
            }
        }
    });

    //autocomplete contribuyente correcto
    $("#unif_d_denominacion").autocomplete({
        source: function( request, response ) {

            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "unificar_contribuyentes/php/autocomplete.php",
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
                $('#unif_d_denominacion').val(ui.item.value);
                $("#unif_n_cuit").val(ui.item.cuit);
                $("#unif_id_contribuyente").val(ui.item.id_contribuyente);
                $('#unif_c_tipo_documento').val(ui.item.c_tipo_documento);
                $('#unif_d_tipo_documento').val(ui.item.d_tipo_documento);
                $('#unif_n_documento').val(ui.item.n_documento);
                $('#unif_d_denominacion').change();
                return false;
            }
        },
        change:function (event,ui) {
            if ($('#unif_d_denominacion').val()){
                $('#btn_unif_datos_contrib').attr('disabled',false);
                $('#btn_procesar').show();
            }else {
                $('#frm_datos_unif :input').val(null);
                $('#btn_unif_datos_contrib').attr('disabled',true);
                $('#btn_procesar').hide();
            }
        }
    });
   
    $('#btn_limpiar').click(function(){
        $('#frm_consulta :input, #frm_datos_unif :input').val(null);
        $('#n_documento,#frm_datos_unif :input').attr("disabled",true);
        $('#btn_procesar, #lupa_unif_c_tipo_documento').hide();
        id_contrib = null;
    });

    $('#btn_datos_contrib').click(function () {
        fun_datos_contrib($("#n_cuit").val());
    });

    $('#btn_unif_datos_contrib').click(function () {
        fun_datos_contrib($("#unif_n_cuit").val());
    });

    $('#btn_procesar').click(function () {
        if ($('#frm_cuit').validationEngine('validate')){
            if ($('#frm_datos_unif').validationEngine('validate')){
                if (limpia_cuit($('#n_cuit').val()) != limpia_cuit($('#unif_n_cuit').val())){
                    mostrar_cuadro('C','Unificar Contribuyentes','Va a unificar al Contribuyente:<br>' +
                        $('#n_cuit').val()+' '+$('#d_denominacion').val()+
                        '<br>En el Contribuyente:<br>'+$('#unif_n_cuit').val()+' '+$('#unif_d_denominacion').val()+
                        '<br>¿Desea continuar con la operación?',function () {
                        fun_valida_unificacion();
                    },null,400);
                }else {
                    mostrar_validacion('Los cuits ingresados son iguales.');
                }
            }
        }
    })
}