function inicializarEventos(){
    $('#f_remesa').datepicker("option",'minDate',fecha_hoy).change(function () {         
        if ($.datepicker.parseDate('dd/mm/yy', $('#f_remesa').val()) > $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){             
            mostrar_error('La fecha ingresada no puede ser mayor a la actual', 'E', true);             
            $('#f_remesa').val(fecha_hoy);             
            return;         
        }});

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    $('#f_remesa').dblclick(function(){
        let fecha_actual = new Date();
        let dia = fecha_actual.getDate();
        let mes = fecha_actual.getMonth() +1;
        if(dia < 10){
            dia = '0' + dia;
        }
        if(mes < 10){
            mes = '0' + mes;
        }
        let fecha = dia + '/' + mes + '/' + fecha_actual.getFullYear();

        $('#f_remesa').val(fecha); 
    });

    $('#btn_procesar').click(function(){
        
        let valido = $("#form_consulta_proceso").validationEngine('validate')
        if(valido){
            if($('#c_banco').val() == 902){
                procesar_archivo('LEVANTAR_PAGOS_LINK', 'path_arch_recibido', 'd_path_arch_recibido');
            }
            else{
                procesar_archivo('LEVANTAR_PAGOS_BANELCO', 'path_arch_recibido', 'd_path_arch_recibido');
            }
            
        }
    });

    $('#btn_limpiar').click(function(){
        $('#c_banco').val(null);
        $('#d_descrip_banco').val(null);
        $('#f_remesa').val(null);
        $('#n_remesa').val(null);
        $('#path_arch_recibido').val(null);
        $('#ruta_archivo_recibido').val(null);
        $('#d_estado').val(null);
        $('#d_pagos_tot').val(null);
        $('#d_pagos_ok').val(null);
        $('#d_pagos_err').val(null);
    });
}



