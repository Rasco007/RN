function inicializarEventos() {
    $('#n_cuit,#n_cuit_destino').mask('99-99999999-9');

    $('.numero').keypress(function (tecla) {
        return (tecla.charCode >= 48 && tecla.charCode <= 57);
    });

    $('#n_cuit').change(function (){
        if ($('#n_cuit').val() && $('#n_cuit').val().length == 13){
            completarDenominacion();
        }else{
            $("#frm_consulta input").val(null);
        }
    });

    $('#n_cuit_destino').change(function (){
        if ($('#n_cuit_destino').val() && $('#n_cuit_destino').val().length == 13){
            completarDenominacion("_destino");
        }else{
            $("#n_cuit_destino,#id_contribuyente_destino,#d_denominacion_destino").val(null);
        }
    });

    //Completamos Datos del Contribuyente
    $("#d_denominacion").autocomplete({
        source: function(request, response) {
            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "gen_nota_credito/autocomplete.php",
                    data: {p_oper:'getCUIT',p_filtro: request.term},
                    dataType: 'json',
                    success: function( data ) {
                        ajax_autocomplete = null;
                        if(data) {
                            response(
                                $.map(data.data_contrib, function( item ) {
                                    return {
                                        label: item.label,
                                        cuit: item.cuit,
                                        value: item.razon_social,
                                        id_contribuyente: item.id_contribuyente
                                    }
                                })
                            );
                        }
                    }
                });
        },
        minLength:1,
        select:function(event,ui){
            $("#n_cuit").val(ui.item.cuit);
            $("#d_denominacion").val(ui.item.value);
            $("#id_contribuyente").val(ui.item.id_contribuyente);
            return false;
        }
    });

    $("#d_denominacion_destino").autocomplete({
        source: function(request, response) {
            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "gen_nota_credito/autocomplete.php",
                    data: {p_oper:'getCUIT',p_filtro: request.term},
                    dataType: 'json',
                    success: function( data ) {
                        ajax_autocomplete = null;
                        if(data) {
                            response(
                                $.map(data.data_contrib, function( item ) {
                                    return {
                                        label: item.label,
                                        cuit: item.cuit,
                                        value: item.razon_social,
                                        id_contribuyente: item.id_contribuyente
                                    }
                                })
                            );
                        }
                    }
                });
        },
        minLength:1,
        select:function(event,ui){
            $("#n_cuit_destino").val(ui.item.cuit);
            $("#d_denominacion_destino").val(ui.item.value);
            $("#id_contribuyente_destino").val(ui.item.id_contribuyente);
            return false;
        },
        change:function (event,ui) {
            if (!$(this).val()){
                $("#n_cuit_destino").val(null);
                $("#id_contribuyente_destino").val(null);
            }
        }
    });

    $('#d_objeto_hecho').change(function () {
        if($("#d_objeto_hecho").val()){
            if($("#c_tributo").val()){
                completarObjeto();
            }else{
                mostrar_validacion('Debe ingresar primero el tributo para poder filtrar por objeto.');
                $('#d_objeto_hecho').val('');
            }
        }
    });
    
    $("#btn_buscar").click(function(){        
        if($("#frm_consulta").validationEngine('validate')){
            puebla_main_grid();
        }
    });

    $('#btn_limpiar').click(function(){
        deshabilita_campos(false);
        $("#frm_consulta, #frm_datos_destino").trigger('reset');
        $("#frm_consulta input,#frm_datos_destino input").val('');
        $("#btn_lupa_tributo_destino, #btn_lupa_objeto_destino").show();
        $("#c_tributo_destino, #d_tributo_destino").attr('disabled',false);
        $("#div_obligaciones").hide();
    });

    $("#btn_generar_credito").click(function(){
        if($("#frm_datos_destino").validationEngine('validate')){
            aplicar_credito();
        }
    });
}