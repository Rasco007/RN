function inicializar_eventos(){
    $('#n_cuit').mask('99-99999999-9');

    $("#fecha_add").datepicker({
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

    $('#fecha_add').change(function () {
        fecha_en_rango($('#fecha_add').val());
    });

    $("#fecha_vencimiento_add").datepicker({
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

    $('#fecha_vencimiento_add').change(function () {
        fecha_en_rango($('#fecha_vencimiento_add').val());
    });

    $("#fecha_fin_add").datepicker({
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

    $("#fecha_fin_add").change(function () {
        if(fecha_en_rango($('#fecha_fin_add').val())){
            if ($("#fecha_fin_add").val() != ''){
                $('#d_estado_add').addClass('validate[required]');
                $('#label').html('Estado de la Acción(*)');
            } else {
                $('#d_estado_add').removeClass('validate[required]');
                $('#label').html('Estado de la Acción');
            }
        }
    });

    $("#btn_lupa_estado").lupa_generica({
        id_lista: id_lista_estados,
        titulos: ['Código', 'Descripción'],
        grid: [
            {index: 'c_dato', width: 100},
            {index: 'd_dato', width: 500}],
        caption: 'Lista de Estados',
        filtroNull: false,
        filtros: ['#c_accion_add'],
        filtrosTitulos:['Acción'],
        campos: {c_dato: 'c_estado_add',d_dato: 'd_estado_add'},
        keyNav: true
    });

    $('#modal_add_accion').on('hidden.bs.modal', function (e) {
        $("#form_add_accion").validationEngine('hideAll');
        $('#form_add_accion select').val(null);
        $('#form_add_accion input').val(null);
        $('#d_estado_add').removeClass('validate[required]');
        $('#label').html('Estado de la Acción');
    });

    $('#btn_add_accion').click(function () {
        if($('#form_add_accion').validationEngine('validate')) {
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_id_operativo_fiscalizacion": p_id_operativo,
                    "p_f_accion": $('#fecha_add').val(),
                    "p_c_accion": $('#c_accion_add').val(),
                    "p_d_observacion": $('#d_observacion_add').val(),
                    "p_n_acto" : $('#d_acto_add').val(),
                    "p_f_vencimiento" : $('#fecha_vencimiento_add').val(),
                    "p_f_fin" : $('#fecha_fin_add').val(),
                    "p_c_estado" : $('#c_estado_add').val(),
                    "p_n_orden": p_n_orden,
                    "p_oper": 'add',
                    "id_menu": v_id_menu,
                    "n_orden": 0
                },
                dataType: 'json',
                success: function (data) {
                    $('#main').procOverlay({visible: false});
                    if (data.resultado == 'OK') {
                        mostrar_cuadro('I', 'Alta de Acción', 'El alta de acción finalizo correctamente.');
                        $("#modal_add_accion").modal('hide');
                        $("#main_grid").trigger("reloadGrid");
                    } else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });
}