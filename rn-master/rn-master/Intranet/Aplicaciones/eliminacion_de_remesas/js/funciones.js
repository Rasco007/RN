function set_fecha_pago(n_remito){
    $.ajax({                     
        url: "eliminacion_de_remesas/php/funciones.php",                     
        type:"POST",                     
        dataType: "JSON",                     
        data:{ p_oper : 'getFechaPago', p_n_remito: n_remito},                     
        success: function (res) {  
            if (res){
                $('#f_pago').val(res.F_PAGO);
            }                       
        }                 
    });
}

function buscar_datos_remito(){
    set_fecha_pago($('#remito').val());
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_n_remito": $('#remito').val(),
            "id_menu": v_id_menu,
            "n_orden": 0
        },
        dataType: 'json',
        success: function ( data ) {
            if (data.resultado == 'OK') {
                $("#btn_eliminar").attr('disabled',false);
                $("#lupa_remito").hide();
                $("#remito").attr('readonly',true);
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
            }
            $('#c_banco').val(data.p_c_banco);
            $('#f_remesa').val(data.p_f_remesa);
            $('#cant').val(data.p_n_cantidad || 0);
            if(!isNaN(Number(data.p_i_remito)) && data.p_i_remito){
                $('#importe').val(Number(data.p_i_remito).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }));
            }else{
                $('#importe').val(data.p_i_remito);
            }
            $('#d_banco').val(data.p_d_banco);
        }
    });
}

function eliminar(){
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_n_remito": $('#remito').val(),
            "p_f_remesa": $('#f_remesa').val(),
            "id_menu": v_id_menu,
            "n_orden": 1
        },
        dataType: 'json',
        success: function ( data ) {
            if (data.resultado == 'El Proceso de borrado ha finalizado correctamente') {
                mostrar_cuadro('S', 'Exito', data.resultado);
                $('#btn_limpiar').click();
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
            }
        }
    });
}