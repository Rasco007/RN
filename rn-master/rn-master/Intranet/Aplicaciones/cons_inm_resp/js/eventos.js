function inicializarEventos() {
    $('#n_cuit').mask('99-99999999-9');
    $("#n_documento").mask("999999999");
    $('.numero').keypress(function (tecla) {
        return (tecla.charCode >= 48 && tecla.charCode <= 57);
    });
    //Completamos Datos del Contribuyente
    $('#n_cuit').change(function (){
        if ($('#n_cuit').val() && $('#n_cuit').val().length == 13){
            completarDenominacion();
        }else{
            $("#d_denominacion").val(null);
            $("#n_cuit").val(null);
            $("#id_contribuyente").val(null);
        }
    });

    $('#n_documento').change(function () {
        if (!$('#id_contribuyente').val() && $('#c_tipo_documento').val() && $('#n_documento').val()){
            fun_ajax_documento();
        }
    });


    $("#d_denominacion").autocomplete({
        source: function( request, response ) {
            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "cons_inm_resp/php/autocomplete.php",
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

    $('#btn_buscar').click(function () {
        if (!$('#id_contribuyente').val()){
            mostrar_cuadro('V', 'Atención', 'Debe completar uno de los siguientes filtros de búsqueda:<br>-CUIT Contribuyente<br>-Denominación Contribuyente<br>-Tipo y Nro. de Documento',null,null,400);
            return;
        }

        setea_parametros('#main_grid',{':p_id_contrib':$('#id_contribuyente').val()});
    });

    $('#btn_imp_inmuebles').click(function () {
        if (id_titular) {
            llamar_report('TRIBL_044','p_id_contribuyente|'+id_titular,'PDF')
        }else {
            mostrar_validacion('El contribuyente buscado no posee inmuebles.');
        }
    });

    $('#btn_limpiar').click(function(){
        $('#frm_consulta :input').val(null).validationEngine('hideAll');
        $('#btn_imp_inmuebles').attr('disabled',true);
        $('#main_grid').jqGrid('clearGridData');
        id_titular = null;
    });
}