function inicializarEventos() {
    $('#n_cuit').mask('99-99999999-9');
    $('#d_anio_exp').mask('9999');
    $('#d_anio_exp').change(function () {
        if ($(this).val().length != 4){
            mostrar_error("Formato de Año incorrecto.");
            $(this).val(null);
        }
    });

    $('#btn_buscar').click(function () {
        if ($('#frm_consulta').validationEngine('validate')){
            setea_parametros('#main_grid',{':p_n_expediente':$('#d_expediente').val(),'p_n_anio': $('#d_anio_exp').val(),
                'p_id_contribuyente':$('#id_contribuyente').val()});
        }
    });

    $('#btn_ver_detalle').click(function () {
        var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
        if (!rowid){
            mostrar_validacion('Debe seleccionar un registro de la grilla');
        }else{
            let id_insp = $("#main_grid").getCell(rowid, 'id_inspeccion');
            setea_parametros('#detail_grid',{':p_id_inspeccion':id_insp});
            /*if ($("#main_grid").getCell(rowid, 'c_estado') == 5 || parse($('#main_grid').getCell(rowid, 'estado_confirmacion')) == 0){
                $('#btn_fin_carga').hide();
            }else {
                $('#btn_fin_carga').show();
            }*/
            $('#seccion_1').hide();
            $('#seccion_2').show();
        }
    });

    $('#btn_ocultar_detalle').click(function () {
        $('#detail_grid').jqGrid('clearGridData');
        $('#seccion_1').show();
        $('#seccion_2').hide();
    });

    $('#btn_limpiar').click(function(){
        $('#frm_consulta :input').val(null);
        $('#btn_ocultar_detalle').click();
        $('#main_grid').jqGrid('clearGridData');
    });

    /*$('#btn_fin_carga').click(function () {
        var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
        var id_insp = $("#main_grid").getCell(rowid, 'id_inspeccion');
        mostrar_cuadro('Q','Finalizar Carga','Se procederá a finalizar la carga del formulario F109.<br>¿Desea continuar?',
            function () {
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{
                        "p_id_inspeccion":id_insp,
                        "id_menu":v_id_menu,
                        "n_orden":0
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                            $('#main_grid').trigger('reloadGrid');
                            $('#btn_ocultar_detalle').click();
                        }
                        else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                });
            },function () {
                return;
            });
    });*/

    //Completamos Datos del Contribuyente
    $("#d_denominacion").autocomplete({
        source: function( request, response ) {

            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "carga_inspecciones/autocomplete.php",
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
            $("#d_denominacion").val(ui.item.value);
            $("#n_cuit").val(ui.item.cuit);
            $("#id_contribuyente").val(ui.item.id_contribuyente);
            return false;
        }
    });

    $('#n_cuit').change(function (){
        if ($('#n_cuit').val() && $('#n_cuit').val().length == 13){
            completarDenominacion();
        }else if ($('#n_cuit').val() == ""){
            $('#n_cuit, #d_denominacion, #id_contribuyente').val(null);
        }else {
            mostrar_error("El formato del CUIT ingresado es incorrecto.");
            $('#n_cuit, #d_denominacion, #id_contribuyente').val(null);
        }
    });
}