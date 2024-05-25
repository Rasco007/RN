function buscar_plan() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            'p_n_plan_pago':$('#n_plan_pago_filtro').val(),
            "id_menu":v_id_menu,
            "n_orden":5
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado === 'OK'){
                $('#c_tipo_plan_pago_filtro').val(data.p_c_tipo_plan_pago);
                $('#d_tipo_plan_pago_filtro').val(data.p_d_tipo_plan_pago);
                $('#c_tipo_documento').val(data.p_c_tipo_documento).blur();
                $('#d_objeto_hecho_filtro').val(data.p_d_objeto2);
                $('#d_denominacion_filtro').val(data.p_desc_denom);
                $('#c_tipo_imponible').val(data.p_imponible).blur();
                $('#n_cuit_filtro').val(data.p_n_cuit).mask("99-99999999-9");
                $('#n_documento').val(data.p_n_documento);
                $('#c_tributo').val(data.p_c_tributo);

                $('#d_tributo').val(data.p_d_tributo);
                $('#c_concepto').val(data.p_c_concepto);
                $('#d_concepto').val(data.p_d_concepto);
                $('#d_objeto_hecho').val(data.p_d_objeto2);
                $('#c_tipo_imponible_desc').val(data.p_imponible);
                $('#d_tipo_imponible_desc').val(data.p_d_tipo_imponible);
                $('#deuda_original').val(data.p_i_capital_ori);
                $('#importe_capital').val(data.p_i_capital_aux);
                $('#intereses_resarcitorios').val(data.p_i_intereses_ori);
                $('#n_descuento').val(data.p_descuento_interes);
                $('#intereses_descuento').val(data.p_i_interes_mora);
                $('#importe_actualizado').val(data.p_i_actualizado_aux);

                $('#cant_cuotas').val(data.p_n_cuotas);
                $('#importe_total').val(data.p_i_total);
                $('#importe_anticipo').val(data.p_i_anticipo);
                $('#calc_cuotas').val(data.p_d_metodo);
                $('#periodicidad_cuotas').val(data.p_d_periodicidad);
                $('#calculo_cuota_metodo').val(data.p_i_intereses);

                $('#f_actualizacion').val(data.p_f_emision);

                $('#1').attr('data-toggle', 'tab');
                $('#2').attr('data-toggle', 'tab');

                setea_parametros('#detalles_grid',{
                    ':p_n_plan_pago':$('#n_plan_pago_filtro').val()
                });

                setea_parametros('#cuotas_grid',{
                    ':p_n_plan_pago':$('#n_plan_pago_filtro').val()
                });

                if(to_date(data.p_f_aux) < to_date(fecha_hoy)){
                    mostrar_cuadro('E', 'Error', 'No se puede confirmar un Plan de Pago con Fechas de Vencimientos de Cuotas menor a la del día.');
                    $('#f_confirmacion').attr('disabled', true);
                }else{
                    $('#btn_confirmar').attr('disabled', false);
                }

                deshabilitar_campos();


            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);

            }
        }
    });

    $('#btn_honorarios').attr('disabled', false);
    $('#btn_constancia').attr('disabled', false);
}

function to_date(fecha){
    var dateParts = fecha.split("/");
    var day = parseInt(dateParts[0], 10);
    var month = parseInt(dateParts[1], 10) - 1; 
    var year = parseInt(dateParts[2], 10);
    var resultDate = new Date(year, month, day);
    return resultDate;
}



function deshabilitar_campos() {
    $('#lupa_n_plan_pago').hide();
    $('#lupa_tipo_documento').hide();
    $('#lupa_tipo_plan_pago').hide();
    $('#lupa_c_tipo_imponible').hide();
    $('#lupa_obj_hecho_filtro').hide();
    $('#lupa_d_denominacion').hide();

    $('#mascara_lupa_n_plan_pago').show();
    $('#mascara_lupa_tipo_documento').show();
    $('#mascara_lupa_tipo_plan_pago').show();
    $('#mascara_lupa_c_tipo_imponible').show();
    $('#mascara_lupa_obj_hecho_filtro').show();
    $('#mascara_lupa_d_denominacion').show();

    $('#n_plan_pago_filtro').attr('disabled', true);
    $('#c_tipo_plan_pago_filtro').attr('disabled', true);
    $('#n_cuit_filtro').attr('disabled', true);
    $('#d_denominacion_filtro').attr('disabled', true);
    $('#c_tipo_documento').attr('disabled', true);
    $('#n_documento').attr('disabled', true);
    $('#c_tipo_imponible').attr('disabled', true);
    $('#d_objeto_hecho_filtro').attr('disabled', true);
    $('#btn_buscar').attr('disabled', true);
}

