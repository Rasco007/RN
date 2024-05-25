function inicializarEventos() {
    $(".datepicker").datepicker({
        changeMonth:true,
        changeYear:true,
        dateFormat:'dd/mm/yy',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá'],
        beforeShow: function(input, inst) {
            inst.dpDiv.css({
                marginTop: -input.offsetHeight + 'px',
            });
        }
    }).mask('99/99/9999').change(function () {
        if ($(this).val().length > 0 && $(this).val().length != 10){
            mostrar_error("El Formato de la Fecha ingresada no es válido.");
            $(this).val(null);
        }
    });

    $(".mascara_importe").focusout(function () {
        $(this).val(formatea_number(mascara_numero(parse($(this).val()).toFixed(2), ',', -1, 2), ''));
        if($(this).val() == '0,00'){
            $(this).val(null);
        }
    }).css('text-align', 'right');

    $(".mascara_importe").keydown(function(event){
        return controla_number(event, this, 2);
    });

    $('#btn_buscar').click(function () {
        if($('#frm_filtro').validationEngine('validate')){
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_tributo":p_tributo,
                 "p_tipo_pago":p_tipo_pago,
                 "p_id_boleta_agr":$('#id_boleta_agr').val(),
                 "id_menu":v_id_menu,
                 "n_orden":6
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        if(data.p_pregunta){
                            var division = data.p_pregunta.split('|');
                            if(p_pagos_lapos == 'N'){
                                mostrar_cuadro('Q', division[1], division[0],
                                    function () {
                                        buscar_boletas();
                                    },
                                    function () {
                                    }
                                );
                            } else{
                                buscar_boletas();
                            }
                            
                        } else {
                            buscar_boletas();
                        }
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
        $("#id_boleta_agr ").attr("readonly", false);
        $("#n_monto_boleta"). attr("readonly", false);
        $('#frm_pago :input').val(null);
        $('#frm_filtro :input').val(null);
        $('#frm_datos_bonos :input').val(null);
        $('#boletas_grid').jqGrid('clearGridData');
        $('#f_emision_agr').val(null);
        $('#f_vto_agr').val(null);
        $('#f_vto_2').val(null);
        $('#total_2dovto').val(null);
        $('#total').val(null);
        $('#btn_buscar').prop('disabled', false);
    });

    $('#btn_procesar').click(function () {
        var rowid = $("#boletas_grid").getGridParam('selrow');
        if(!rowid){
            mostrar_error('Debe seleccionar una fila en la grilla para procesar.');
            return;
        }

        if($('#frm_pago').validationEngine('validate')){
            if(p_bono_ley_4735 == 'S'){
                if(validar_bonos_4790()){
                    $.ajax({
                        type:'POST',
                        url: FUNCIONES_BASEPATH+'maestro_abm.php',
                        data:{      
                         "p_id_boleta_agr":$('#id_boleta_agr').val(),
                         "p_id_contribuyente":$('#id_contribuyente').val(),
                         "p_fecha_nota_sol":$('#f_nota_sol').val(),
                         "p_ofi_presentacion":$('#ofi_presentacion').val(),
                         "id_menu":v_id_menu,
                         "n_orden":4
                        },
                        dataType:'json',
                        success: function( data ) {
                            if(data.resultado == 'OK'){
                              continuar_procesamiento();
                            }
                            else{
                                mostrar_cuadro('E', 'Error', data.resultado);
                                return;
                            }
                        }
                    });
                } else {
                    return;
                }
            } else {
                continuar_procesamiento(); 
            }
        }
    });

    $('#btn_datos_bonos').click(function () {
        $('#modal_emitir_boleta').modal('show');
    });

    $('#f_nota_sol').change(function (event){
        var dateParts = $('#f_nota_sol').val().split("/");
        var date = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);


        if(date >= new Date()){
            mostrar_cuadro('E', 'Error', 'La fecha de presentación de BONOS no debe ser mayor a la fecha actual.');
        }
        
        if(date <= new Date(2013, 0,1)){
            mostrar_cuadro('E', 'Error', 'La fecha de presentación de BONOS debe ser mayor a 01/01/2013');
        }
    });

    $('#f_pago').change(function (){
        if($('#f_pago').val()){
            if(fecha_en_rango()){
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                     "p_pagos_lapos": p_pagos_lapos,
                     "p_f_pago":  $('#f_pago').val(),
                     "p_id_boleta_agr": $('#id_boleta_agr').val(),
                     "p_f_emision_agr": $('#f_emision_agr').val(),
                     "p_n_monto_boleta": $('#n_monto_boleta').val().replace(",","."),
                     "p_bono_ley_4735": p_bono_ley_4735,
                     "id_menu": v_id_menu,
                     "n_orden": 5
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                            if(data.p_pregunta){
                                var division = data.p_pregunta.split('|');
                                mostrar_cuadro('Q', division[1], division[0],
                                    function () {
                                    },
                                    function () {
                                        $('#f_pago').val(''); 
                                    }
                                );
                            }
                        }
                        else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            $('#f_pago').val('');
                            return;
                        }
                    }
                });
            }
        }
    });


    $('#btn_procesar_datos_bonos').click(function () {
        if($('#frm_datos_bonos').validationEngine('validate')){
            $('#modal_emitir_boleta').modal('hide');
            $('#btn_procesar').click();
        }
    });

    $('#btn_limpiar_datos_bonos').click(function(){
        $('#frm_datos_bonos :input').val(null);
    });
}