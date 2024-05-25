function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "abm_act_tit_com/php/autocomplete.php",
        type:"POST",
        data:{  p_oper:'getContribuyente',p_filtro: cuit_sin_guiones},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res){
                $("#d_denominacion").val(res['DENOMINACION']);
                $("#id_contribuyente").val(res['ID_CONTRIBUYENTE']);
                $('#c_tipo_documento').val(res['C_TIPO_DOCUMENTO']);
                $('#d_tipo_documento').val(res['D_TIPO_DOCUMENTO']);
                $('#n_documento').val(res['N_DOCUMENTO']);
            }else{
                $('#n_cuit').val(null);
                $("#d_denominacion").val(null);
                $("#id_contribuyente").val(null);
            }
        }
    });
}

function fun_ajax_objeto_hecho(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: 'abm_act_tit_com/php/autocomplete.php',
        type:"POST",
        data:{"p_oper":4,
            "c_tributo":$("#c_tributo").val(),
            "c_tipo_imponible":$("#c_tipo_imponible").val(),
            "contrib":$("#id_contribuyente").val(),
            "objeto_hecho":($("#d_objeto_hecho").val()).trim()},
        async:false,
        success: function(data){
            $('#main').procOverlay({visible:false});
            resp = JSON.parse(data);
            if(resp){
                $('#n_cuit').val(resp['N_CUIT']);
                $("#id_contribuyente").val(resp['ID_CONTRIBUYENTE']);
                $("#d_denominacion").val(resp['D_DENOMINACION']);
                $('#c_tipo_documento').val(resp['C_TIPO_DOCUMENTO']);
                $('#d_tipo_documento').val(resp['D_TIPO_DOCUMENTO']);
                $('#n_documento').val(resp['N_DOCUMENTO']);
            }else{
                mostrar_cuadro('I', 'Atención', 'No se han encontrado registros para la consulta realizada.');
                $("#n_cuit").val(null);
                $("#id_contribuyente").val(null);
                $("#d_denominacion").val(null);
                $("#d_objeto_hecho").val(null);
            }
        }
    });

}

function fun_ajax_documento(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: 'abm_act_tit_com/php/autocomplete.php',
        type:"POST",
        data:{
            "p_oper": 5,
            "c_tipo_documento":$("#c_tipo_documento").val(),
            "n_documento":$("#n_documento").val()
        },
        async:true,
        success: function(data){
            resp = JSON.parse(data);
            console.log(resp);
            if(resp){
                $('#n_cuit').val(resp['N_CUIT']);
                $("#id_contribuyente").val(resp['ID_CONTRIBUYENTE']);
                $("#d_denominacion").val(resp['D_DENOMINACION']);
            }else{
                mostrar_cuadro('I', 'Atención', 'No se han encontrado registros para la consulta realizada.');
                $("#id_contribuyente").val(null);
                $("#n_cuit").val(null);
                $("#d_denominacion").val(null);
                $('#c_tipo_documento').val(null);
                $("#n_documento").val(null);
            }
        }
    });
}

function fun_abm_actibd(params){
    params.id_menu = v_id_menu;
    params.n_orden = 1;
    params.p_id_contribuyente = id_contrib;
    params.p_c_tipo_imponible = c_tipo_imponible;
    params.p_c_tributo = c_tributo;
    params.p_d_objeto_hecho = objeto_hecho;
    if (params.p_oper != 'A'){
        params.p_n_sec_act = $('#actividades_ibd_grid').getCell($("#actividades_ibd_grid").getGridParam('selrow'), 'n_secuencia_act');
        params.p_c_articulo = $('#actividades_ibd_grid').getCell($("#actividades_ibd_grid").getGridParam('selrow'), 'c_articulo');
        params.p_f_inicio_ant = $('#actividades_ibd_grid').getCell($("#actividades_ibd_grid").getGridParam('selrow'), 'f_inicio_act');
    }

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
                mostrar_confirmacion('Operación realizada con éxito.');
                $('#actividades_ibd_grid').trigger('reloadGrid');
                $('#actibd_modal').modal('hide');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function fun_cambiar_act_ppal(params) {
    params.id_menu = v_id_menu;
    params.n_orden = 2;
    params.p_id_contribuyente = id_contrib;
    params.p_c_tipo_imponible = c_tipo_imponible;
    params.p_c_tributo = c_tributo;
    params.p_d_objeto_hecho = objeto_hecho;
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
                $('#actividades_ibd_grid, #actividades_cm_grid').trigger('reloadGrid');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function fun_abm_unidad(params) {
    params.id_menu = v_id_menu;
    params.n_orden = 3;
    params.p_id_contribuyente = id_contrib;
    params.p_c_tipo_imponible = c_tipo_imponible;
    params.p_c_tributo = c_tributo;
    params.p_d_objeto_hecho = objeto_hecho;
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: params,
        dataType: 'json',
        success: function (data) {
            $('#main').procOverlay({visible:false});
            if (data.resultado == 'OK') {
                mostrar_confirmacion('Operación realizada con éxito.');
                $('#uni_modal').modal('hide');
                $('#unidades_grid').trigger('reloadGrid');
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function fun_abm_comercio(params){
    params.id_menu = v_id_menu;
    params.n_orden = 4;
    params.p_id_contribuyente = id_contrib;
    params.p_c_tipo_imponible = c_tipo_imponible;
    params.p_c_tributo = c_tributo;
    params.p_d_objeto_hecho = objeto_hecho;
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
                $('#comercios_grid').trigger('reloadGrid');
                $('#com_modal').modal('hide');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function fun_cambiar_com_ppal(params) {
    params.id_menu = v_id_menu;
    params.n_orden = 5;
    params.p_id_contribuyente = id_contrib;
    params.p_c_tipo_imponible = c_tipo_imponible;
    params.p_c_tributo = c_tributo;
    params.p_d_objeto_hecho = objeto_hecho;
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
                $('#comercios_grid').trigger('reloadGrid');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function fun_abm_actcm(params){
    params.id_menu = v_id_menu;
    params.n_orden = 6;
    params.p_id_contribuyente = id_contrib;
    params.p_c_tipo_imponible = c_tipo_imponible;
    params.p_c_tributo = c_tributo;
    params.p_d_objeto_hecho = objeto_hecho;
    if (params.p_oper != 'A'){
        params.p_n_sec_act = $('#actividades_cm_grid').getCell($("#actividades_cm_grid").getGridParam('selrow'), 'n_secuencia_act');
        params.p_f_inicio_ant = $('#actividades_cm_grid').getCell($("#actividades_cm_grid").getGridParam('selrow'), 'f_inicio_act');
    }

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
                mostrar_confirmacion('Operación realizada con éxito.');
                $('#actividades_cm_grid').trigger('reloadGrid');
                $('#actcm_modal').modal('hide');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function fun_abm_jurisdiccion(params){
    params.id_menu = v_id_menu;
    params.n_orden = 7;
    params.p_id_contribuyente = id_contrib;
    params.p_c_tipo_imponible = c_tipo_imponible;
    params.p_c_tributo = c_tributo;
    params.p_d_objeto_hecho = objeto_hecho;
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
                $('#jurisdicciones_grid').trigger('reloadGrid');
                $('#jur_modal').modal('hide');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function fun_cambiar_jur_ppal(params) {
    params.id_menu = v_id_menu;
    params.n_orden = 8;
    params.p_id_contribuyente = id_contrib;
    params.p_c_tipo_imponible = c_tipo_imponible;
    params.p_c_tributo = c_tributo;
    params.p_d_objeto_hecho = objeto_hecho;
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
                $('#jurisdicciones_grid').trigger('reloadGrid');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function useron() {
    if (desactivar == 'S'){
        $('#n_cuit, #d_denominacion,#c_tipo_documento, #n_documento').attr('disabled',true);
        $('#lupa_c_tipo_documento').hide();
    }else {
        $('#n_cuit, #d_denominacion').attr('disabled',false);
    }
}