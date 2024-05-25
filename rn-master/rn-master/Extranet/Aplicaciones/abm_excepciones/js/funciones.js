function disableDays(date,posicion) {
    var day = date.getDate()
    var last=(new Date(date.getFullYear(),date.getMonth() + 1, 0, 23, 59, 59)).getDate();

    if (posicion == 1) {
        if (day==1) {
            return [true, "", "Available"];
        } else {
            return [false, "", "unAvailable"];
        }    
    } else if (posicion == 0) {
        if (day==last) {
            return [true, "", "Available"];
        } else {
            return [false, "", "unAvailable"];
        }   
    }
}

function setDay(date,posicion) {
    try {
        var completedate = $.datepicker.parseDate('dd/mm/yy',date)
        var day = completedate.getDate();
        var month = completedate.getMonth();
        var year = completedate.getFullYear();
        var lastday=(new Date(completedate.getFullYear(),completedate.getMonth() + 1, 0, 23, 59, 59)).getDate();

        if (posicion == 1) {
            if (day==1) {
                return new Date(year,month,day);
            } else {
                return new Date(year,month,1);
            }    
        } else if (posicion == 0) {
            if (day==lastday) {
                return new Date(year,month,day);
            } else {
                return new Date(year,month,lastday);
            }   
        }
    } catch (error) {
        return null;
    }
    
}

function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "abm_excepciones/php/autocomplete.php",
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
        url: 'abm_excepciones/php/autocomplete.php',
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
        url: 'abm_excepciones/php/autocomplete.php',
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

function abm_excepcion(params){
    params.id_menu = v_id_menu;
    params.n_orden = 0;
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
            if(data.resultado == 'OK'){
                if (parse(params.p_c_motivo)==87 && params.p_oper != 'D'){
                    $('#excep_modal').modal('hide');
                    $('#excepciones_grid').trigger('reloadGrid');
                    setea_parametros('#excep_act_grid',{'p_id_excepcion':data.p_id_excepcion});
                    $('#excep_act_id_excep').val(data.p_id_excepcion);
                    $('#excep_act_c_mot').val(params.p_c_motivo);
                    $('#excep_act_f_desde').val(params.p_f_vig_desde);
                    $('#excep_act_f_hasta').val(params.p_f_vig_hasta);
                    $('#exc_act_modal').modal('show');
                }else{
                    $('#excepciones_grid').trigger('reloadGrid');
                    $('#excep_modal').modal('hide');
                    mostrar_confirmacion('Operación realizada con éxito.');
                }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}


function abm_actividad(params){
    params.id_menu = v_id_menu;
    params.n_orden = 1;

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#excep_act_grid').trigger('reloadGrid');
                $('#act_modal').modal('hide');
                mostrar_confirmacion('Operación realizada con éxito.');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}