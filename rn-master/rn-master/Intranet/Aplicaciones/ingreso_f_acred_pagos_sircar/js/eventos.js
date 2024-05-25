function init_eventos(){

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

    $('#tot_importe').change(function () {
        $(this).val(formatea_number(mascara_numero(parse($(this).val()).toFixed(2), ',', -1, 2), ''));
    });

    $('#btn_ver_pago').click(function () {
        var id = $("#pagos_grid").getGridParam('selrow');
            if (id) {
                abrir_modal(id);
            }else {
                mostrar_validacion('Debe seleccionar un Pago de la grilla.');
                return false;
            }
    });

    $('#btn_procesar').click(function () {
        if(f_pagos.length <= 0){
            mostrar_cuadro('E', 'Error', 'Debe seleccionar un checkbox de la grilla antes de procesar');
            return;
        }
        $('#f_acreditacion').val("");
        $('#procesar_modal').modal("show");
    });

    $('#btn_gen_pagos').click(function () {
        if ($('#frm_fecha_a').validationEngine('validate')) {
            let fechas_a_procesar = to_string(f_pagos);
            var params = {
                id_menu: v_id_menu,
                n_orden: 0,
                p_fechas_a_procesar: fechas_a_procesar,
                p_f_acreditacion: $('#f_acreditacion').val()
            }
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:params,
                dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                            actualizar_remesas(fechas_a_procesar, data.p_n_remitos);
                            f_pagos = [];
                            $('#procesar_modal').modal('hide');
                            mostrar_confirmacion('Operación realizada con éxito.');
                        }
                        else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                });
        }
    });
}