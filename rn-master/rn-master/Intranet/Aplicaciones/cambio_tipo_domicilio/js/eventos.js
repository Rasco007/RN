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

    $('#d_objeto_hecho').change(function () {
       if (!$('#id_contribuyente').val()){
           fun_ajax_objeto_hecho();
       }
    });

    $("#d_denominacion").autocomplete({
        source: function( request, response ) {

            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "cambio_tipo_domicilio/php/autocomplete.php",
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
            if (!$('#c_tipo_documento').val() || !$('#n_documento').val()){
                if (!$('#d_objeto_hecho').val()) {
                  mostrar_cuadro('V', 'Atención', 'Debe ingresar al menos uno de los siguientes filtros:<br>-CUIT<br>-Tipo y Nro. de Documento<br>-Tipo Imponible, Tributo y Objeto/Hecho',null,null,400);
                  return;
                }
            }
        }

        setea_parametros('#main_grid',{':p_id_contrib':$('#id_contribuyente').val(),
            ':p_c_timp':$('#c_tipo_imponible').val(),
            ':p_c_trib':$('#c_tributo').val(),
            ':p_objeto':$('#objeto_hecho').val()});
    });
   
    $('#btn_limpiar').click(function(){
        $('#frm_consulta :input').val(null);
        $('#d_objeto_hecho').attr('readonly',true);
        $('#main_grid, #conceptos_grid').jqGrid('clearGridData');
        $('#btn_domicilios').hide();
        id_contrib = null;
        objeto_hecho = null;
        c_tipo_imponible = null;
        c_tributo = null;
        f_vig_desde_obj = null;
    });

    $('#btn_domicilios').click(function () {
        post_to_url('contribuyentes.php', {
            'p_domicilio_telefono': 'S',
            'p_consulta': 'S',
            'cuit': $("#n_cuit").val(),
            'ruta':"[]",
            'p_n_id_menu': 10885}, '_blank');
    });
}