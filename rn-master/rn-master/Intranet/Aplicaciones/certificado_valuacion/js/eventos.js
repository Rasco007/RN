function init_eventos(){

    $('.numero').keypress(function (tecla) {
        return (tecla.charCode >= 48 && tecla.charCode <= 57);
    });

    $('.alfanumerico').keypress(function (tecla) {
        return (tecla.charCode >= 48 && tecla.charCode <= 57) || (tecla.charCode >= 65 && tecla.charCode <= 90) || (tecla.charCode >= 97 && tecla.charCode <= 122);
    });

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']}
    ).mask("99/99/9999").val(fecha_hoy);

    $('#btn_buscar').click(function () {

        if(!$('#frm_consulta').validationEngine('validate')) {
            mostrar_validacion("Faltan ingresar datos obligatorios");
            return;
        }
        $('#d_nomenclatura,#d_partida,#f_emision').prop('disabled', true);
        $('#lupa_partida, #lupa_nomenclatura, #date_emision').hide();
        $('#contenedor_boton, #contenedor_responsables_de_pago').show();
        buscar_responsable();
    });

    $('#btn_limpiar').click(function () {
        limpiarFiltros();
    });

    $('#btn_imprimir_certificado').click(function () {
        $('#main').procOverlay({visible:true});
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{
                "p_d_nomenclatura":$('#d_partida').val(),
                "p_d_nomenclatura_real":$('#d_nomenclatura').val(),
                "p_f_emision":$('#f_emision').val(),
                "id_menu":v_id_menu,
                "n_orden":0
            },
            dataType:'json',
            success: function( data ) {
                $('#main').procOverlay({visible:false});
                if(data.resultado == 'OK'){
                    $('#n_cuit').val(data.p_n_cuit);
                    $('#d_denominacion').val(data.p_d_denominacion);
                    //var parametros_reporte =  Seguir por aca
                    if (valorFecha() >= "20080101") {
                        llamar_report('INML_028_B','p_id_inmueble|'+data.p_id_inmueble+
                            '&p_pos_fiscal|'+data.p_n_posicion_fiscal+'&p_nomenclatura|'+$('#d_nomenclatura').val()+
                            '&p_partida|'+$('#d_partida').val()+'&p_emision|'+$('#f_emision').val()+
                            '&p_id_contribuyente|'+data.p_id_contribuyente,'PDF');
                    } else {
                        llamar_report('INML_028','p_id_inmueble|'+data.p_id_inmueble+
                            '&p_pos_fiscal|'+data.p_n_posicion_fiscal+'&p_nomenclatura|'+$('#d_nomenclatura').val()+
                            '&p_partida|'+$('#d_partida').val()+'&p_emision|'+$('#f_emision').val()+
                            '&p_id_contribuyente|'+data.p_id_contribuyente,'PDF');
                    }
                }
                else{
                    limpiarFiltros();
                    mostrar_error(data.resultado);
                    return;
                }
            }
        });
    });
}
