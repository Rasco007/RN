function abm_bonos(params){
    params.id_menu = v_id_menu;
    params.n_orden = 0;

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#bono_modal').modal('hide');
                $('#bonos_grid').trigger('reloadGrid');
                mostrar_confirmacion('Operación realizada con éxito.');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}