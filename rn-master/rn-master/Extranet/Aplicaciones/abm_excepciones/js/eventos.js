function inicializarEventos() {
    $('#n_cuit').mask('99-99999999-9');
    $("#n_documento").mask("999999999");
    $('.numero').keypress(function (tecla) {
        return (tecla.charCode >= 48 && tecla.charCode <= 57);
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

    $('#excep_f_desde').datepicker("option","beforeShowDay",function(date){return disableDays(date,1)}).change(function() {
        $('#excep_f_desde').datepicker("setDate",setDay($('#excep_f_desde').val(),1));
    });
    $('#excep_f_hasta').datepicker("option","beforeShowDay",function(date){return disableDays(date,0)}).change(function() {
        $('#excep_f_hasta').datepicker("setDate",setDay($('#excep_f_hasta').val(),0))
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

    /* $('#d_objeto_hecho').keyup(function () {
        if ($('#d_objeto_hecho').val().length >= 3){
            $('#lupa_d_objeto_hecho').show();
        }else {
            $('#lupa_d_objeto_hecho').hide();
        }
    }); */

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
        if (!$('#frm_consulta').validationEngine('validate')){
            return;
        }

        if (!$('#id_contribuyente').val() && !$('#d_objeto_hecho').val()){
            mostrar_cuadro('V', 'Atención', 'Debe ingresar CUIT o Nro. de Inscripción para realizar la busqueda.',null,null,400);
            return;
        }

        setea_parametros('#main_grid',{':p_id_contrib':$('#id_contribuyente').val(),
            ':p_c_timp':$('#c_tipo_imponible').val(),
            ':p_c_trib':$('#c_tributo').val(),
            ':p_objeto':$('#d_objeto_hecho').val()});
    });
   
    $('#btn_limpiar').click(function(){
        $('.limpiar, .lupa').val(null);
        $('#d_objeto_hecho').attr('disabled',true);
        $('#main_grid,#actividades_grid,#regimenes_grid,#excepciones_grid').jqGrid('clearGridData');
        id_contrib = null;
        objeto_hecho = null;
        c_tipo_imponible = null;
        c_tributo = null;
        f_vig_desde_obj = null;
    });

    //LLAMA UN REPORTE DISTINTO SEGUN EL MOTIVO (3 REP EN TOTAL)
    $('#btn_imp_const').click(function() {
        var id = $("#excepciones_grid").getGridParam('selrow');
        if (id) {
            var c_mot = parse($('#excepciones_grid').getCell(id, 'c_motivo'));
            if (c_mot == 88) {
                /*llamar_report('', 'p_id_excepcion|' + $('#excepciones_grid').getCell(id, 'id_excepcion'), 'PDF');*/
                mostrar_mensaje('Imprimir Constancia','Funcionalidad en construcción.');
            }else if (c_mot == 87){
                $('#main').procOverlay({visible:true});
                $.ajax({
                    url: "abm_excepciones/php/funciones.php",
                    type:"POST",
                    data:{p_oper:'controlarActividades',
                        p_id_contrib: id_contrib,
                        p_c_trib: c_tributo,
                        p_objeto: objeto_hecho,
                        p_id_excep: $('#excepciones_grid').getCell(id, 'id_excepcion')},
                    success: function(response)
                    {
                        $('#main').procOverlay({visible:false});
                        res = JSON.parse(response);
                        if (res){
                            if (parse(res['CONTADOR']) > 0) {
                                mostrar_validacion('El contribuyente tiene actividades que no estan cargadas.');
                            }else{
                                /*llamar_report('', 'p_id_excepcion|' + $('#excepciones_grid').getCell(id, 'id_excepcion'), 'PDF');*/
                                mostrar_mensaje('Imprimir Constancia','Funcionalidad en construcción.');
                            }
                        }else{
                            $('#n_cuit').val(null);
                            $("#d_denominacion").val(null);
                            $("#id_contribuyente").val(null);
                        }
                    }
                });
            }else {
                /*llamar_report('', 'p_id_excepcion|' + $('#excepciones_grid').getCell(id, 'id_excepcion'), 'PDF');*/
                mostrar_mensaje('Imprimir Constancia','Funcionalidad en construcción.');
            }
        }else {
            mostrar_validacion('Debe seleccionar una Excepción de la grilla.');
            return false;
        }
    });
}