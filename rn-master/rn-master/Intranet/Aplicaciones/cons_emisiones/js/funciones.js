function fun_select_todas(){
	if($("#m_todas").is(':checked')){
		$("#n_secuencia_desde, #n_secuencia_hasta").val(null);
		$('#m_todas_sin_mail').prop('checked', false);
	}
}

function fun_select_todas_mail(){
	if($("#m_todas_sin_mail").is(':checked')){
		$("#n_secuencia_desde, #n_secuencia_hasta").val(null);
		$('#m_todas').prop('checked', false);
	}
}

function aprobar_emision(){
	var id = $("#emisiones_grid").getGridParam('selrow');
    if (id) {
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{
                "p_id_sesion":$("#emisiones_grid").getCell(id,"id_sesion"),
                "id_menu":v_id_menu,
                "n_orden":0
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    mostrar_confirmacion('La emisión ha sido confirmada correctamente.');
                    $("#emisiones_grid").trigger('reloadGrid');
                }
                else{
                    mostrar_error(data.resultado);
                    return;
                }
            }
        });
    }else {
        mostrar_validacion('Debe seleccionar un registro de la grilla superior.');
    }
}

function modal_emision_masiva(){
    var id = $("#emisiones_grid").getGridParam('selrow');
    if (id) {
        if($('#emisiones_grid').getCell(id, 'c_control') == 'C'){
            $("#frm_impresion_masiva input").val(null);
            $('#m_todas, #m_todas_sin_mail').prop('checked', false);
            $("#modal_impresion_masiva").modal('show');
        }else{
            mostrar_validacion('No es posible imprimir las emisiones no aprobadas.');
        }
    }else {
        mostrar_validacion('Debe seleccionar un registro de la grilla superior.');
    }
}

function validar_campos(){
    if($("#n_secuencia_desde").val() != "" || $("#n_secuencia_hasta").val() != ""){
        return true;
    }else{
        if($("#c_distribucion").val() != ""){
            return true;
        }else{
            return false;
        }
    }
}

function imprimir_puntual(id){
    llamar_report($("#c_tributo").val() == '60' ? 'RECAL012_INMO' :'RECAL012_AUTO',
        'P_SESION|' + $('#boletas_emitidas_grid').getCell(id, 'id_sesion')+
        '&P_ID_BOLETA|' + $('#boletas_emitidas_grid').getCell(id, 'id_boletas')+
        '&P_ORDEN_DESDE|' + $('#boletas_emitidas_grid').getCell(id, 'n_orden')+
        '&P_ORDEN_HASTA|' + $('#boletas_emitidas_grid').getCell(id, 'n_orden'),
        'PDF');
}