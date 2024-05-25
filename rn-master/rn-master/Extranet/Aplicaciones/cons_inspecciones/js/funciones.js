function verDetalle(n_instancia, n_orden, n_exp, n_a_exp){
    $('#detalle_title').text("Expediente: "+n_exp+" - Año: "+n_a_exp);
    $('#modal_n_instancia').val(n_instancia);
    $('#modal_n_orden').val(n_orden);
    setea_parametros("#detalle_grid", {
        ':p_n_instancia':n_instancia,
        ':p_n_orden':n_orden
    });
    $('#detalle_modal').modal('show');
};

function verDescargo(n_instancia, n_orden, n_exp, n_a_exp){
    $('#modal_descargo_n_instancia').val(n_instancia);
    $('#modal_descargo_n_orden').val(n_orden);

    $.ajax({
        type: "POST",
        url: "cons_inspecciones/php/funciones.php",
        data: {
            'p_oper': 'get_sol_req',
            'p_n_instancia': n_instancia,
            'p_n_orden': n_orden
        },
        dataType: "json",
        success: function (response) {
            if (response.resultado == 'OK') {
                $('#modal_id_sol_req').val(response.id_sol_req);
                build_grid_adjuntos(response.id_sol_req, ['info', 'adjuntar', 'eliminar'],1,'n');
                $('#adjuntos_modal').modal('show');
            } else {
                mostrar_error(response.resultado);
            }
        }
    });
};

function _agregar_quitar_instancia(element) {
    var params = {
        id_menu: v_id_menu,
        n_orden: 0,
        p_marca: 'N'
    };

    if (element){
        if ($(element).is(':checked') == true){
            params.p_marca = 'S';
        }
        params.p_n_instancia = $(element).attr('n_instancia');
        params.p_n_orden = $(element).attr('n_orden');
        params.p_id_obligacion = $(element).attr('id_obligacion');
        params.p_oper = 'I'
    }else {
        if ($('#check_select_all').is(':checked') == true){
            params.p_marca = 'S';
        }
        params.p_n_instancia = $('#modal_n_instancia').val();
        params.p_n_orden = $('#modal_n_orden').val();
        params.p_oper = 'T'
    }

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#detalle_grid').trigger('reloadGrid');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function get_max_adjunto() {
    return new Promise(function(resolve, reject){
        $.ajax({
            type: "POST",
            url: "cons_inspecciones/php/funciones.php",
            data: {
                'p_oper': 'get_max_adjunto',
                'id_sol_req': $('#modal_id_sol_req').val()
            },
            dataType: "json",
            success: function (response) {
                resolve(response.id_adjunto);
            }
        });
    });
}