function init_eventos(){
    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    $("#f_proceso").val(fecha_hoy);

    $('#examinar_transferencias').click(function(){
        $('#d_path_arch_transferencias').click();
    });
    $('#d_path_arch_transferencias').change(function(){
        $('#ruta_archivo_transferencias').val( $('#d_path_arch_transferencias').val() );
    });
    $('#examinar_cuentas').click(function(){
        $('#d_path_arch_cuentas').click();
    });
    $('#d_path_arch_cuentas').change(function(){
        $('#ruta_archivo_cuentas').val( $('#d_path_arch_cuentas').val() );
    });

    $('#btn_procesar').click(function() {
        if($('#d_path_arch_transferencias').val()){
            fun_guarda_archivo('d_path_arch_transferencias', 'path_arch_transferencias','T');
        }
        if($('#d_path_arch_cuentas').val()){
            fun_guarda_archivo('d_path_arch_cuentas', 'path_arch_cuentas','C');
        }
        if(!$('#d_path_arch_cuentas').val() && !$('#d_path_arch_transferencias').val()){
            mostrar_cuadro('I', 'Información', 'Debe ingresar un archivo para procesar');
        }
    });

    $('#btn_errores').click(function() {
        $('#main_grid_modal').modal('show');
        $(window).resize();
    });

    $('#btn_limpiar').click(function(){
        
        $("#cant_procesados_transf").val(null);
        $("#estado_transf").val(null);
        $("#transf_incorporadas").val(null);
        $("#transf_existentes").val(null);
        $("#transf_err").val(null);
        $("#n_proceso").val(null);

        $("#cant_procesados_cuentas").val(null);
        $("#estado_cuenta").val(null);
        $("#cuentas_incorporadas").val(null);
        $("#cuentas_existentes").val(null);
        $("#cuentas_err").val(null);

        $('#div_input_archivo_transferencias :input').val(null);
        $('#div_input_archivo_cuentas :input').val(null);

        $("#d_path_arch_transferencias").val(null);
        $("#d_path_arch_cuentas").val(null);
        
        $("#ruta_archivo_transferencias").val(null);
        $("#ruta_archivo_cuentas").val(null);
        

        $('#btn_errores').attr('disabled',true);

    });
}