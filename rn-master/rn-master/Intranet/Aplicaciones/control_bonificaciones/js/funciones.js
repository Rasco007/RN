function validarPosicionFiscal(){
    var ultimosDigitosPosFiscal = $('#n_posicion_fiscal').val().substr(5,2);
    return parseInt(ultimosDigitosPosFiscal) <= 12;
}

function poblarTablaTemporal() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_tributo":$("#c_tributo").val(),
            "p_posicion_fiscal":desenmascararPosicionFiscal(),
            "p_cuota":$("#n_cuota").val(),
            "p_objeto_desde":$("#objeto_desde").val(),
            "p_objeto_hasta":$("#objeto_hasta").val(),
            "id_menu":v_id_menu,
            "n_orden":2
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
                setea_parametros('#bonificaciones_grid',{':p_n_lote':data.p_n_lote},'S');
                $("#check_select_all").attr('p_n_lote',data.p_n_lote);

                if(v_id_workflow_log){
                    actualizar_tarea_workflow(v_id_workflow_log, v_c_tarea, 'R', 0, 'N');
                }
            }
            else{
                mostrar_error(data.p_error);
                return;
            }
        }
    });
}

function desenmascararPosicionFiscal() {
    return $('#n_posicion_fiscal').val().substr(0,4).concat($('#n_posicion_fiscal').val().substr(5,2));
}

function actualizarMarca(p_n_lote,p_rowid) {
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_n_lote":p_n_lote,
            "p_row_id":p_rowid,
            "id_menu":v_id_menu,
            "n_orden":4
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
            }
            else{
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}

function actualizarTodasLasMarcas(p_n_lote,m_check){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_n_lote":p_n_lote,
            "p_m_check":m_check,
            "id_menu":v_id_menu,
            "n_orden":5
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){

            }
            else{
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}

function resetearFiltros(){
    $('#frm_consulta :input').val(null);
    $('.entrada_filtro').prop('readonly', false);
    $("#check_select_all").prop('checked',false);
    $('#bonificaciones_grid').jqGrid('clearGridData');
    $('#contenedor_grilla, #contenedor_botones').hide();
    $('#lupa_c_tipo_imponible, #lupa_c_tributo').show();
    $("#frm_consulta").validationEngine('hideAll');
}