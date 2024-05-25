function inicializar_eventos(){
    $('#btn_erronea').attr('disabled', true);
    if(v_p_modo == 'P'){
        $('#div_f_pago').attr('hidden', true);
        $('#div_f_acred').attr('hidden', true);
    }
    if(v_p_modo == 'T'){
        $('#div_f_pago').attr('hidden', false);
        $('#div_f_acred').attr('hidden', false);
    }

    $("#n_cuota_desde").datepicker({
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

    $("#n_cuota_hasta").datepicker({
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

    $("#btn_lupa_nro_envio").lupa_generica({
        id_lista:v_lista_envios,
        titulos:['Nro. Envío', 'Archivo', 'Fecha', 'C1e', 'C2e', 'C3e', 'C4pe', 'C4de', 'C5e', 'C6e', 'C7e', 'C8e', 'C1', 'C2', 'C3', 'C4p', 'C4d', 'C5', 'C6', 'C7', 'C8'],
        grid:[
            {index:'nro_envio',width:150},
            {index:'archivo',width:200},
            {index:'fecha',width:100},
            {index:'c1_err',width:50},
            {index:'c2_err',width:50},
            {index:'c3_err',width:50},
            {index:'c4p_err',width:50},
            {index:'c4d_err',width:50},
            {index:'c5_err',width:50},
            {index:'c6_err',width:50},
            {index:'c7_err',width:50},
            {index:'c8_err',width:50},
            {index:'c1_ok',width:50},
            {index:'c2_ok',width:50},
            {index:'c3_ok',width:50},
            {index:'c4p_ok',width:50},
            {index:'c4d_ok',width:50},
            {index:'c5_ok',width:50},
            {index:'c6_ok',width:50},
            {index:'c7_ok',width:50},
            {index:'c8_ok',width:50},
        ],
        caption:'Listado de Envíos',
        sortname:'nro_envio',
        sortorder:'desc',
        width: 1000,
        exactField: 'nro_envio',
        campos:{nro_envio: 'nro_envio'},
        keyNav:true,
        draggable:true,
    });

    $("#btn_seleccionar").lupa_generica({
        id_lista:v_lista_semanas,
        titulos:['Semana', 'Desde', 'Hasta'],
        grid:[
            {index:'semana_año', width:150},
            {index:'desde', width:200},
            {index:'hasta', width:200},
        ],
        caption:'Rango de Días a Generar',
        sortname:'semana_año',
        sortorder:'desc',
        campos:{semana_año: 'semana', desde: 'n_cuota_desde', hasta: 'n_cuota_hasta'},
        keyNav:true,
        draggable:true,
    });

    $("#f_pago").datepicker({
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

    $("#f_acred").datepicker({
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

    $('#btn_cargar').click(function(){
        var valido = $('#frm_archivo').validationEngine('validate');
        $('#comentarios').val(null);
        if(valido) {
            mostrar_cuadro('C', 'Advertencia', '¿Desea cargar este Archivo RNPA?: ' + $('#d_imagen_diag').val(),
                function () {
                    fun_guarda_archivo('MOVIMIENTOS_SUCERP', 'd_imagen_diag', 'imagen_diag');
                });
        }
    });

    $('#btn_corregir').click(function () {
        post_to_url('correccion_errores_mov_rnpa.php', {
            'p_n_id_menu': 100170,
            'p_nro_envio': $('#nro_envio').val(),
        }, '_blank');
    });

    $('#btn_procesar').click(function () {
        if($('#nro_envio').val() == '') {
            mostrar_cuadro('I', 'Advertencia', 'Debe seleccionar un numero de envío.');
        } else {
            mostrar_cuadro('C', 'Advertencia', '¿Desea procesar el archivo cargado?',
                function () {
                    fun_procesar($('#nro_envio').val());
                });
        }
    });

    $('#btn_erronea').click(function () {
        $("#modal_errores").modal('show');
        $(window).resize();
    });

    $('#btn_excel').click(function () {
        $("#modal_excel").modal('show');
    });

    $('#btn_generar').click(function() {

        if(!$('#semana').val()){
            $('#semana').val(semanadelanio($('#n_cuota_hasta').val()))
        }

        post_to_url('incorporacion_mov_sucerp/php/exportar_archivo.php',
            {
                'p_semana':$('#semana').val(),
                'p_desde': $('#n_cuota_desde').val(),
                'p_hasta': $('#n_cuota_hasta').val(),
                'p_n_id_menu': v_id_menu,
            },
            'POST');
        $('#semana').val(null);
        $('#n_cuota_desde').val(null);
        $('#n_cuota_hasta').val(null);
    });
}