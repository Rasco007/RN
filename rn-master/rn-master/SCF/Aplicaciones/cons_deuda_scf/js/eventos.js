function inicializarEventos(){
    $('#n_cuit').mask('99-99999999-9');

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        minDate:fecha_hoy,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999").change(function () {
        if ($(this).val().length != 10){
            mostrar_validacion("El Formato de la Fecha ingresada no es válido.");
            $(this).val(null);
        }
    });

    $('#f_actualizacion').change(function () {
        if ($.datepicker.parseDate('dd/mm/yy', $(this).val()) < $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
            mostrar_validacion("La Fecha ingresada no puede ser Menor a la fecha actual.");
            $(this).val(fecha_hoy);
        } else {
            if ($('#div_detalle').is(":visible")){
                $('#btn_actualizar').click();
            }
        }
    });

    $('#f_actualizacion').datepicker('setDate', fecha_hoy);

    $("#f_actualizacion").datepicker("option", "beforeShowDay", function (date) {
        return noWeekendsOrHolidays(date, disabledDays);
    });

    $("#f_actualizacion").datepicker("option","maxDate",maxDay);

    $("#btn_buscar").click(function (){
        if ($('#frm_consulta').validationEngine('validate')){
			recuperaDeuda();
        }
    });
    
    $('#btn_limpiar').click(function () {
        location.reload(true);
        id_sesion = null;
    });

    $('#btn_actualizar').click(function () {
        $('#main').procOverlay({visible:true});
        $.ajax({
            url: "cons_deuda_scf/autocomplete.php",
            type:"POST",
            dataType:"json",
            data:{  p_oper:'actualizarDeuda',
				p_id_menu: v_id_menu,
                p_f_actualizacion:$('#f_actualizacion').val(),
                p_id_sesion: id_sesion
            },
            success: function(res)
            {
                $('#main').procOverlay({visible:false});                
                if (res.resultado == 'OK'){
                    $('#f_actualizacion').val(res.data[0]['FECHADEACTUALIZACION']);  
                    $('#table_body').empty();
                    
                    fun_puebla_tabla_deuda(res.data);             
                }else {
                    
                    mostrar_error(res.error);
                }
            }
        });
    });

    $('#emitir_boleta').click(function(){
        var cant_chequeados = 0;
        var emitir = "$";
		
        $('#table_body :input:checkbox').each(function () {
            if ($(this).is(':checked') && $(this).attr('id') != 'chkbox_mobile'){
                cant_chequeados = cant_chequeados + 1;
                emitir = emitir + addLeadingZeros($(this).val(),4) + '$';                
            }
        });
		
        if (cant_chequeados == 0){
            mostrar_validacion("Debe seleccionar al menos una Multa para Emitir la Boleta.");
        }else{
            $('#main').procOverlay({visible:true});
            $.ajax({
                url: "cons_deuda_scf/autocomplete.php",
                type:"POST",
                data:{  p_oper:'emitirBoleta',
					p_id_menu: v_id_menu,
                    p_filas: emitir,
					p_c_tributo: v_tributo,
                    p_f_actualizacion:$('#f_actualizacion').val(),
                    p_id_sesion: id_sesion
                },
                success: function(response)
                {
                    $('#main').procOverlay({visible:false});
                    res = JSON.parse(response);
                    if (res.resultado == 'OK'){
                        if (res.error){
                            mostrar_cuadro('E', 'Error', res.error);
                        }else{
                            v_id_boleta_impresa = res.n_comprobante;
                            llamar_report('BOLETA_AGR','p_id_boleta|'+v_id_boleta_impresa,'PDF');                               
                            mostrar_mensaje_modal('Q','Emitir Boleta','Se ha generado con éxito la Boleta N°: '+v_id_boleta_impresa+'. ¿Desea pagarla ahora?.',
                                function () {
                                    pagar_boleta(v_id_boleta_impresa);
                                },
                                function () {
                                }
                            );

                            $("#pagar_boleta").show();
                        }
                    }else {
                        mostrar_cuadro('V','Emitir Boleta',res.error);
                    }
                } 
            });
        }
    });

    $('#pagar_boleta').click(function(){
        pagar_boleta(v_id_boleta_impresa);

        $('#table_body').find('input:checkbox').prop('checked', false);
        $('#chkbox_all').prop('checked',false);
        $('.totalizador').html(0);
    });
} 