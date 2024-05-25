function init_eventos(){

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        setDate: new Date(),
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");


    $('#path_arch_recibido').change(function(){
        $('#ruta_archivo_recibido').val( $('#path_arch_recibido').val() );
    });
    $('#examinar_recibido').click(function(){
        $('#path_arch_recibido').click();
    });

    $('#f_remesa').datepicker('setDate', fecha_hoy);


    $("#btn-procesar").click(function(){

        if ($('#ruta_archivo_recibido').val() == ""){
            mostrar_error('Debe indicar el nombre del archivo.'); return;
        }
        

        var extension=valida_extension($('#path_arch_recibido').val());
        
        

        var valido = $('#frm_pagos_y_ddjj').validationEngine('validate');
        if(valido && extension) {
            $('#path_archivo_recibido').val($('#ruta_archivo_recibido').val());
            $('#main').procOverlay({visible: true});
            procesar_archivo('PROCESAR_PAGOS', 'path_arch_recibido', 'd_path_arch_recibido');
        }

    })

    $('#f_remesa').datepicker("option",'maxDate',fecha_hoy).change(function () {
        if ($.datepicker.parseDate('dd/mm/yy', $('#f_remesa').val()) > $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
            mostrar_cuadro('E', 'Error',"La Fecha ingresada no puede ser mayor a la fecha actual.");
            $('#f_remesa').val(fecha_hoy);
            return;
        }});

}


$('#btn-limpiar').click(function(){
    reiniciar_valores();
})


