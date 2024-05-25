function inicializarEventos() {
    $('#n_cuit').mask('99-99999999-9');
    $("#n_documento").mask("999999999");
    $('.numero').keypress(function (tecla) {
        return (tecla.charCode >= 48 && tecla.charCode <= 57);
    });
    
    //Selectpicker
    $('#c_constancia').change(function() {
        if ($('#c_constancia').val()){
            $('#d_objeto_hecho').val(null);
            pide_objeto = $('#c_constancia').find(':selected').attr('data-obj');
            if (pide_objeto == 'S'){
                $('#d_objeto_hecho').addClass("validate[required]").attr("disabled",false);
            }else{
                $('#d_objeto_hecho').removeClass("validate[required]").attr("disabled",true);
            }
        }else{
            pide_objeto = null;
        }    
    });

    //Eventos Datos del Contribuyente
    $('#n_cuit').change(function (){
        if ($('#n_cuit').val() && $('#n_cuit').val().length == 13){
            completarDenominacion();
        }else{
            //limpiaDatosCont();
        }
    });

    $('#n_documento').change(function () {
        if (!$('#id_contribuyente').val() && $('#c_tipo_documento').val() && $('#n_documento').val()){
            fun_ajax_documento();
        }else if(!$('#c_tipo_documento').val()){
            mostrar_cuadro('V', 'Atención', 'Debe ingresar Tipo de Documento.',null,null,400);
            $('#n_documento').val(null);
            return;
        }
    });

    $("#d_denominacion").autocomplete({
        source: function( request, response ) {

            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "reimprimir_constancias/php/autocomplete.php",
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
            $("#d_denominacion").val(ui.item.value);
            $("#n_cuit").val(ui.item.cuit);
            $("#id_contribuyente").val(ui.item.id_contribuyente);
            $('#c_tipo_documento').val(ui.item.c_tipo_documento);
            $('#d_tipo_documento').val(ui.item.d_tipo_documento);
            $('#n_documento').val(ui.item.n_documento);
            return false;
        }
    });


    $('#btn_imprimir').click(function () {
        if (!$('#frm_consulta').validationEngine('validate')){
            return;
        }

        if (!$('#n_cuit').val() && !$('#n_documento').val()){
            mostrar_cuadro('V', 'Atención', 'Debe ingresar Nro. de CUIT o Nro. de Documento.',null,null,400);
            return;
        }
        
        $('#main').procOverlay({visible:true});
        let params;
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_c_constancia":$('#c_constancia').val(),
             "p_id_contribuyente":$('#id_contribuyente').val(),
             "id_menu":v_id_menu,
             "n_orden":0
            },
            dataType:'json',
            success: function( data ) {
                $('#main').procOverlay({visible:false});
                if(data.resultado == 'OK'){
                    if (data.p_report == 'RECAL012_IIBB') {
                        params = 'p_id_sesion|'+data.p_id_session
                    }else{
                        params = 'p_id_contribuyente|'+$('#id_contribuyente').val()+'&p_tributo|'+data.p_c_tributo
                    }

                    if (pide_objeto == 'S') {
                        params = params+'&pd_objeto_hecho|'+$('#d_objeto_hecho').val();
                    }

                    llamar_report(data.p_report, params, 'PDF');
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    });

    $('#btn_limpiar').click(function () {
        $('#c_constancia').selectpicker("val","");
        $('#d_objeto_hecho').attr("disabled",true);
        limpiaDatosCont();
        pide_objeto = null;
    });
}