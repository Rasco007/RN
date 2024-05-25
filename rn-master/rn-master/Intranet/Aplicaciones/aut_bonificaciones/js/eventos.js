function inicializarEventos() {
    $('#n_cuit').mask('99-99999999-9');
    $("#n_documento").mask("999999999");
    $('#n_pos_desde,#n_pos_hasta').mask("9999/99");
    $('#n_cta_desde,#n_cta_hasta').mask("99");
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

    $('#n_pos_desde,#n_pos_hasta').change(function() {
       if ($(this).val().length != 7) {
            mostrar_validacion('El formato para la posición fiscal debe ser "aaaa/mm" Ej:2020/00');
            $(this).val(null);
       } 
    });

    $("#d_denominacion").autocomplete({
        source: function( request, response ) {

            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "aut_bonificaciones/php/autocomplete.php",
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

    $('#d_objeto_hecho').change(function () {
        if ($('#d_objeto_hecho').val()){
            fun_ajax_objeto_hecho();
        }else{
            $('#n_cuit').val(null);
            $("#id_contribuyente").val(null);
            $("#d_denominacion").val(null);
            $('#c_tipo_documento').val(null);
            $('#d_tipo_documento').val(null);
            $('#n_documento').val(null);
        }
     });

    $('#btn_buscar').click(function () {
        if (!$('#frm_consulta').validationEngine('validate')){
            return;
        }

        if (!$('#id_contribuyente').val() && !$('#d_objeto_hecho').val()){
            mostrar_cuadro('V', 'Atención', 'Ingrese Nro. de cuit o (tipo y nro. de Documento) o (Tributo y Nro. de Inscripción) para realizar la busqueda.',null,null,400);
            return;
        }

        setea_parametros('#main_grid',{':p_id_contrib':$('#id_contribuyente').val(),
            ':p_n_pos_desde':limpia_pos_fisc($('#n_pos_desde').val()),
            ':p_n_cta_desde':$('#n_cta_desde').val(),
            ':p_n_pos_hasta':limpia_pos_fisc($('#n_pos_hasta').val()),
            ':p_n_cta_hasta':$('#n_cta_hasta').val()});
        
    });
   
    $('#btn_limpiar').click(function(){
        $('#frm_consulta :input').val(null).attr('disabled',false).validationEngine('hideAll');
        $('#d_objeto_hecho').attr('disabled',true);
        $('#d_tributo').attr('readonly',true);
        $('#main_grid').jqGrid('clearGridData');
        $('#lupa_c_tipo_documento,#lupa_c_tributo').show();
        id_contrib = null;
        objeto_hecho = null;
        c_tipo_imponible = null;
        c_tributo = null;
    });

    $('#btn_reconf_bon').click(function() {
        var id = $("#main_grid").getGridParam('selrow');
        if (id) {
            $('#main').procOverlay({visible:true});
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                     "p_id_obligacion":$('#main_grid').getCell(id, 'id_obligacion'),
                     "id_menu":v_id_menu,
                     "n_orden":0
                    },
                    dataType:'json',
                    success: function( data ) {
                        $('#main').procOverlay({visible:false});
                        if(data.resultado == 'OK'){
                            mostrar_confirmacion('Operación realizada con éxito.');
                            $('#main_grid').trigger('reloadGrid');
                        }
                        else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                }); 
        }else {
            mostrar_validacion('Debe seleccionar una Autorización Bonificada de la grilla.');
            return false;
        } 
    });
}