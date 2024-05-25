function init_eventos(){
    if(v_id_workflow_log){
        if(v_tributo == 90){
            $('#c_tipo_imponible').val(10);
        } else {
            $('#c_tipo_imponible').val(5);
        }
        $('#c_tipo_imponible').blur();

        $('#c_tributo').val(v_tributo);
        $('#c_tributo').blur();
        $('#n_posicion_fiscal').val(v_pos_fiscal);
        $('#n_cuota').val(v_cuota);
    }

    $('.numero').keypress(function (tecla) {
        return (tecla.charCode >= 48 && tecla.charCode <= 57);
    });

    $('.alfanumerico').keypress(function (tecla) {
        return (tecla.charCode >= 48 && tecla.charCode <= 57) || (tecla.charCode >= 65 && tecla.charCode <= 90) || (tecla.charCode >= 97 && tecla.charCode <= 122);
    });

    $('#n_posicion_fiscal').mask('9999/99');

    $('#btn_buscar').click(function () {

        if(!$('#frm_consulta').validationEngine('validate')) {
            mostrar_validacion("Faltan ingresar datos obligatorios");
            return;
        }
        if(!validarPosicionFiscal()){
            mostrar_validacion("Posicion fiscal invalida");
            return;
        }
        poblarTablaTemporal();
        //inputs filtro readonly
        $('.entrada_filtro').prop('readonly', true);
        $('#lupa_c_tipo_imponible, #lupa_c_tributo').hide();
        $('#contenedor_grilla, #contenedor_botones').show();
    });

    $('#btn_limpiar').click(function () {
        resetearFiltros();
    });

    $('#check_select_all').click(function () {
        var p_n_lote = $(this).attr('p_n_lote');
        if($(this).is(':checked')){
            $('#bonificaciones_grid :input:checkbox').prop('checked',true);
            actualizarTodasLasMarcas(p_n_lote,'S');
        } else {
            $('#bonificaciones_grid :input:checkbox').prop('checked',false);
            actualizarTodasLasMarcas(p_n_lote,'N');
        }
    });

    $('#btn_borrar_temporal').click(function () {
        $('#main').procOverlay({visible:true});
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{
                "p_tributo":$("#c_tributo").val(),
                "p_posicion_fiscal":desenmascararPosicionFiscal(),
                "p_cuota":$("#n_cuota").val(),
                "id_menu":v_id_menu,
                "n_orden":3
            },
            dataType:'json',
            success: function( data ) {
                $('#main').procOverlay({visible:false});
                if(data.resultado == 'OK'){
                    mostrar_mensaje("Temporal borrado","Borrado el temporal para Tributo: "+$("#c_tributo").val()
                        +", Posición: "+$('#n_posicion_fiscal').val()+" y Cuota: "+$("#n_cuota").val());
                    resetearFiltros();
                }
                else{
                    mostrar_error(data.resultado);
                    return;
                }
            }
        });
    });

    $('#btn_procesar_cta_cte').click(function () {
        $('#main').procOverlay({visible:true});
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{
                "p_n_lote":$("#check_select_all").attr('p_n_lote'),
                "p_c_tipo_imponible":$("#c_tipo_imponible").val(),
                "p_n_posicion_fiscal":desenmascararPosicionFiscal(),
                "p_n_cuota":$("#n_cuota").val(),
                "p_c_tributo":$("#c_tributo").val(),
                "id_menu":v_id_menu,
                "n_orden":6
            },
            dataType:'json',
            success: function( data ) {
                $('#main').procOverlay({visible:false});
                if(data.resultado == 'OK'){
                    mostrar_mensaje("Transacción grabada","Transacción grabada con éxito");
                    resetearFiltros();
                }
                else{
                    mostrar_error(data.resultado);
                    return;
                }
            }
        });
    });

    if(v_id_workflow_log){
        $('#btn_buscar').click();
    }
}

