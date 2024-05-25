function inicializarEventos() {
    $('#n_cuit').mask('99-99999999-9');
    $('#n_pos_fiscal_desde, #n_pos_fiscal_hasta').mask('9999/00');
    $('#cuota_desde, #cuota_hasta').mask('99');

    //Completamos Datos del Contribuyente
    $("#d_denominacion").autocomplete({
        source: function( request, response ) {

            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "alta_baja_prescrip/autocomplete.php",
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
        }else{
            $("#d_denominacion").val(null);
            $("#n_cuit").val(null);
            $("#id_contribuyente").val(null);
        }
    });

    $(".input_fecha").datepicker({
        changeMonth:true,
        changeYear:true,
        dateFormat:'dd/mm/yy',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá']
    }).mask('99/99/9999').change(function () {
        if ($(this).val().length > 0 && $(this).val().length != 10){
            mostrar_error("El Formato de la Fecha ingresada no es válido.");
            $(this).val(null);
        }
    });

    $('#btn_buscar').click(function () {

        if ($('#frm_consulta').validationEngine('validate')){
            if (!$('#id_contribuyente').val() && $('#d_objeto_hecho').val()){
                fun_ajax_objeto_hecho();
            }
            $('#main').procOverlay({visible:true});
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{
                    "p_c_tributo":$('#c_tributo').val(),
                    "p_d_objeto_hecho":$('#d_objeto_hecho').val(),
                    "p_pos_fis_desde":fun_convierte_pos_fiscal_a_num($('#n_pos_fiscal_desde').val()),
                    "p_cuota_desde":$('#cuota_desde').val(),
                    "p_pos_fis_hasta":fun_convierte_pos_fiscal_a_num($('#n_pos_fiscal_hasta').val()),
                    "p_cuota_hasta":$('#cuota_hasta').val(),
                    "p_id_sesion":v_id_sesion,
                    "id_menu":10859,
                    "n_orden":0
                },
                dataType:'json',
                success: function( data ) {
                    $('#main').procOverlay({visible:false});
                    if(data.resultado == 'OK'){
                        setea_parametros('#main_grid',{':p_id_sesion':v_id_sesion});
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });
   
    $('#btn_limpiar').click(function(){
        $('#frm_consulta :input').val(null);
        $('#main_grid').jqGrid('clearGridData');
    });

    $('#btn_modal_aceptar').click(function () {
        if ($('#form_modal_f_prescrip').validationEngine('validate')) {
            $('#main').procOverlay({visible:true});
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{
                    "p_id_sesion":$('#modal_id_sesion').val(),
                    "p_id_obligacion":$('#modal_id_obligacion').val(),
                    "p_f_prescripcion":$('#f_prescrip').val(),
                    "id_menu":v_id_menu,
                    "n_orden":2
                },
                dataType:'json',
                success: function( data ) {
                    $('#main').procOverlay({visible:false});
                    if(data.resultado == 'OK'){
                        $('#main_grid').trigger('reloadGrid');
                        $('#modal_f_prescrip').modal("hide");
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    $('#main_grid_checkbox').unbind();
    $('#check_select_all').click(function () {
        if ($('#main_grid').getGridParam('reccount') > 0) {
            var v_marca = 0;
            if ($('#check_select_all').is(':checked')){
                v_marca = 1;
            }
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{
                    "p_id_sesion":v_id_sesion,
                    "p_marca":v_marca,
                    "id_menu":10859,
                    "n_orden":4
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        $('#main_grid').trigger('reloadGrid');
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        if (v_marca == 1){
                            $('#check_select_all').prop('checked',false);
                        }else {
                            $('#check_select_all').prop('checked',true);
                        }
                        return;
                    }
                }
            });
        }
    });

    $('#btn_procesar').click(function () {
       mostrar_cuadro('C','Procesar','Ud. grabará los cambios efectuados.<br>¿Desea Continuar?',function () {
           $.ajax({
               type:'POST',
               url: FUNCIONES_BASEPATH+'maestro_abm.php',
               data:{
                   "p_sesion":v_id_sesion,
                   "id_menu":10859,
                   "n_orden":1
               },
               dataType:'json',
               success: function( data ) {
                   if(data.resultado == 'OK'){
                       if (data.cantidad == 0){
                           mostrar_confirmacion('El proceso Finalizó Correctamente.');
                           $('#main_grid').trigger('reloadGrid');
                       }else {
                           mostrar_error('Error al prescribir obligaciones.');
                       }
                   }
                   else{
                       mostrar_cuadro('E', 'Error', data.resultado);
                       return;
                   }
               }
           });
       });
    });

}