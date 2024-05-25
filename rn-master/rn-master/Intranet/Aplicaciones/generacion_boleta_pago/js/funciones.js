function selectCheck(rowid){
    let importe = $('#grid_cons_deuda').getCell(rowid,'i_vencimiento_1').split('.').join('').split(',').join('.');
    let pos_fiscal = $('#grid_cons_deuda').getCell(rowid,'n_posicion_fiscal').split('/').join('');
    let cuota = $('#grid_cons_deuda').getCell(rowid,'n_cuota');
    let f_vencimiento = $('#grid_cons_deuda').getCell(rowid,'vencimiento_1');
    let check = $('#check_select_'+rowid).is(':checked')?'S':'N';

    let id_obligacion = $('#grid_cons_deuda').getCell(rowid,'id_obligacion');

    if(check == 'S'){
        seleccionados.push(rowid);
    }
    else{
        seleccionados = seleccionados.filter((item) => item != rowid)
    }

    $.ajax({
    type:'POST',
    url: FUNCIONES_BASEPATH+'maestro_abm.php',
    data:{      
     "p_f_actual":fecha_hoy,
     "p_vencimiento_1":f_vencimiento,
     "p_vencimiento_2":f_vencimiento,
     "p_i_actual":$("#i_actual").val(),
     "p_id_obligacion":id_obligacion,
     "p_d_objeto_hecho":$("#objeto").val(),
     "p_n_posicion_fiscal":pos_fiscal,
     "p_n_cuota":cuota,
     "p_i_vencimiento_1":importe,
     "p_imp":check,
     "p_c_tipo_imponible":$("#c_tipo_imponible").val(),
     "id_menu":11013,
     "n_orden":3
    },
    dataType:'json',
    success: function( data ) {
        if(data.resultado == 'OK'){
            
        }
        else{
            $('#check_select_'+rowid).attr("checked", false);
            $('#check_select_'+rowid).prop("checked", false);
            mostrar_cuadro('E', 'Error', data.resultado);
            return;
        }
    }
}); 
}