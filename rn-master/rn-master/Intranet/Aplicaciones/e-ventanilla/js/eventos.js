function inicializarEventos() {
    $('#n_cuit').mask('99-99999999-9');
    $('#n_cuit_form').mask('99-99999999-9');

    $('#d_referencia_form').mask('99999999999');

    $('#n_cuit').change(function (){
        completar_denominacion('n_cuit','d_denominacion','id_contribuyente');
    });

    $('#n_cuit_form').change(function (){
        completar_denominacion('n_cuit_form','denominacion_form','id_contribuyente_form');
    });

    $('#f_publ_desde_form, #f_publ_hasta_form').change(function (){
        bloquearFechas()
    });

    configurarEditor('txt_mensaje_lectura', 'txt_mensaje_lectura_hide', 'visualizar');
    configurarEditor('txt_mensaje_contestar','txt_mensaje_contestar_hide','contestar');

    $('#btn_borrar_msj').click(function(){
        mostrar_cuadro('C', 'Borrar Mensaje',
            '¿Esta seguro/a que desea eliminar el mensaje?.',
            function () {
                borrar_mensaje();
            }, function () {
                return;
            }
        );
    });

    $('#btn_autorizar_msj').click(function(){
        mostrar_cuadro('C', 'Autorizar Mensaje',
            '¿Esta seguro/a que desea autorizar el mensaje?.',
            function () {
                autorizar_mensaje();
            }, function () {
                return;
            }
        );
    });

    $('#btn_enviar_msj').click(function(){
        mostrar_cuadro('C', 'Enviar Mensaje',
            '¿Esta seguro/a que desea enviar el mensaje?.',
            function () {
                enviar_mensaje();
            }, function () {
                return;
            }
        );
    });

    $('#btn_anular_msj').click(function(){
        mostrar_cuadro('C', 'Anular Mensaje',
            '¿Esta seguro/a que desea anular el mensaje?.',
            function () {
                anular_mensaje();
            }, function () {
                return;
            }
        );
    });

    $('#btn_nuevo_msj').click(function(){
        limpiar_form_nuevo_mensaje();
        $("#modal_nuevo_mensaje").modal('show');
    });

    $('#btn_editar_msj').click(function(){
        limpiar_form_nuevo_mensaje();
        recuperar_datos_form();
        $("#modal_nuevo_mensaje").modal('show');
    });

    $('#btn_abrir_redactar_msj').click(function(){
        $("#modal_redactar_msj").modal('show');
    });

    $('#btn_cerrar_redactar_msj').click(function(){
        $("#modal_nuevo_mensaje").modal('show');
    });

    $('#btn_guardar_msj').click(function(){
        guardar_mensaje();
    });

    $('#btn_notif_falta_dfe').click(function(){
        mostrar_cuadro('C', 'Notificar Falta DFE',
            '¿Esta seguro/a que desea realizar la notificación masiva por falta de DFE? El proceso podría demorar varios minutos.',
            function () {
                notificar_falta_dfe();
            }, function () {
                return;
            }
        );
    });

    //Autocomplete del Contribuyente - Búsqueda
    $("#d_denominacion").autocomplete({
        source: function( request, response ) {
            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "ajax_genericos/autocomplete.php",
                    data: {oper:'1',term: request.term},
                    dataType: 'json',
                    success: function( data ) {
                        ajax_autocomplete = null;
                        if(data) {
                            response(
                                $.map(data.data_raz, function( item ) {
                                    return {
                                        label: item.razon_social,
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
        minLength:3,
        select:function(event,ui){
            $("#d_denominacion").val(ui.item.value);
            $("#n_cuit").val(ui.item.cuit);
            $("#id_contribuyente").val(ui.item.id_contribuyente);
            return false;
        }
    });

    //Alta Msj
    $("#denominacion_form").autocomplete({
        source: function( request, response ) {
            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "ajax_genericos/autocomplete.php",
                    data: {oper:'1',term: request.term},
                    dataType: 'json',
                    success: function( data ) {
                        ajax_autocomplete = null;
                        if(data) {
                            response(
                                $.map(data.data_raz, function( item ) {
                                    return {
                                        label: item.razon_social,
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
        minLength:3,
        select:function(event,ui){
            $("#denominacion_form").val(ui.item.value);
            $("#n_cuit_form").val(ui.item.cuit);
            $("#id_contribuyente_form").val(ui.item.id_contribuyente);
            return false;
        }
    });

    $(".datepicker").datepicker({
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

    bloquearFechas();

    $('#btn_limpiar').click(function(){
        $('#frm_consulta :input').val(null);
        $('.selectpicker').selectpicker('refresh');
        $('#main_grid').jqGrid('clearGridData');
    });

    $('#btn_buscar').click(function () {
        setea_parametros(
        '#main_grid', {'p_c_tipo_conv':$('#tipo_mensaje').val(), 'p_id_contribuyente':$('#id_contribuyente').val()}
        );
    });

    $('#btn_consulta_adjuntos').click(function (){
        $('#main').procOverlay({visible:true});
        build_grid_adjuntos($('#id_sol_req_cons').val(), ['info'],1);
        $('#adjuntos_modal').modal('show');
        $('#main').procOverlay({visible:false});
    })

    $('#btn_abrir_adjuntos_msj').click(function(){
        //tomamoe el id sol req
        let id_sol_req = $('#id_sol_req_form').val();

        if (id_sol_req == '') {
            //damos de alta el sol req.
            $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{
                    "id_menu":10874,
                    "n_orden":5
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        $('#id_sol_req_form').val(data['p_id_sol_requisitos']);
                        build_grid_adjuntos(data['p_id_sol_requisitos'], ['info', 'adjuntar', 'eliminar'],1);
                        $('#adjuntos_modal').modal('show');
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
        else{
            $('#main').procOverlay({visible:true});
            build_grid_adjuntos($('#id_sol_req_form').val(), ['info', 'adjuntar', 'eliminar'],1);
            $('#adjuntos_modal').modal('show');
            $('#main').procOverlay({visible:false});
        }
    })
}