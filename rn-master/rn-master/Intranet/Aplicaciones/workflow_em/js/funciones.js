function inicializarFiltro() {
    if(p_tributo){
        $('#c_tributo').val(p_tributo);
        $('#lupa_c_tributo').css("visibility", "hidden");
        $('#c_tributo').blur();
    }
}

function inicializarEmisiones(){
    $.ajax({
        url: 'workflow_em/php/traer_datos_finalizacion.php',
        type:"POST",
        data:{
            "p_id_workflow_log": v_id_workflow_log,
        },
        async:true,
        dataType:'json',
        success: function(data){
            if(data.resultado == 'OK'){
                if(data.datos[0]){
                    $('#f_finalizacion').val(data.datos[0]['F_FINALIZACION']);
                    $('#c_usuario_fin').val(data.datos[0]['C_USUARIO_FIN']);
                    $('#f_hab_envio_ba').val(data.datos[0]['F_HAB_ENVIO_BA']);
                    deshabilitarBotonesFinalizacion();
                }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function deshabilitarBotonesFinalizacion(){
    if($('#f_finalizacion').val()){
        $('#btn_finalizar').prop('disabled', true);
        $('.btn-ejecutar-workflow').prop('disabled', true);
    }
}