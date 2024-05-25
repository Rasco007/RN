function completarDenominacion(origen){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "legajo_contribuyente/php/autocomplete.php",
        type:"POST",
        data:{ p_oper:'getContribuyente', filtro: limpia_cuit($('#n_cuit',"#frm_busqueda").val())},
        success: function(response){
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res){
                $("#d_denominacion").val(res['DENOMINACION']);
                $("#id_contribuyente").val(res['ID_CONTRIBUYENTE']);
                //$("#id_contribuyente_tmp","#frm_busqueda",'#frm_busqueda').val(res['ID_CONTRIBUYENTE_TMP']);
                $("#c_tipo_documento").val(res['C_TIPO_DOCUMENTO']);
                $("#d_tipo_documento").val(res['D_TIPO_DOCUMENTO']);
                $("#n_documento").val(res['N_DOCUMENTO']);
                /*if(p_consulta == 'S'){
                    $("#btn_continuar").click();
                }*/
            }
        }
    });
}
function n_cuit_focusout(){
    if ($('#n_cuit',"#frm_busqueda").val() && $('#n_cuit',"#frm_busqueda").val().length == 13){
        $('#main').procOverlay({visible:true});
        $.ajax({
            url: "legajo_contribuyente/php/autocomplete.php",
            type:"POST",
            dataType: 'JSON',
            data:{ p_oper:'cuit', filtro: limpia_cuit($('#n_cuit',"#frm_busqueda").val())},
            success: function(response){
                $('#main').procOverlay({visible:false});
                if (response){
                    $("#d_denominacion","#frm_busqueda").val(response['DENOMINACION']);
                    $("#id_contribuyente","#frm_busqueda").val(response['ID_CONTRIBUYENTE']);
                    $("#c_tipo_documento","#frm_busqueda").val(response['C_TIPO_DOCUMENTO']);
                    $("#d_tipo_documento","#frm_busqueda").val(response['D_TIPO_DOCUMENTO']);
                    $("#n_documento","#frm_busqueda").val(response['N_DOCUMENTO']);
                }
            }
        });
    }
}
function n_documento_focusout(){
    if ($('#general').length) {
        id_contribuyente = null;
    }
    if ($('#c_tipo_documento',"#frm_busqueda").val() && $('#d_tipo_documento',"#frm_busqueda").val() && ($('#n_documento',"#frm_busqueda").val().length == 8 || $('#n_documento',"#frm_busqueda").val().length == 7) ){
        $('#main').procOverlay({visible:true});
        $.ajax({
            url: "legajo_contribuyente/php/autocomplete.php",
            type:"POST",
            dataType: 'JSON',
            data:{ p_oper:'documento',
                c_tipo_documento: $("#c_tipo_documento").val(),
                n_documento: $("#n_documento").val()},
            success: function(response){
                $('#main').procOverlay({visible:false});
                if (response){
                    $("#n_cuit","#frm_busqueda").val(response['CUIT']);
                    $("#d_denominacion","#frm_busqueda").val(response['DENOMINACION']);
                    $("#id_contribuyente","#frm_busqueda").val(response['ID_CONTRIBUYENTE']);
                    $("#c_tipo_documento","#frm_busqueda").val(response['C_TIPO_DOCUMENTO']);
                    $("#d_tipo_documento","#frm_busqueda").val(response['D_TIPO_DOCUMENTO']);
                    $("#n_documento","#frm_busqueda").val(response['N_DOCUMENTO']);
                }
            }
        });
    }
}
function limpiar_busqueda() {
    $('#frm_busqueda input').val(null);

    $('#n_cuit, #d_denominacion, #c_tipo_documento, #n_documento').attr('readonly', false);
    $('#n_cuit').prop('disabled', false);
    $("#btn_continuar_abm").prop('disabled', false);
    $("#lupa_c_tipo_documento").prop('disabled', false);
    $('#general').hide();
}

function abrir_modal(modal){
    $(modal).modal('show');
    $(window).resize();
}

////////////////////////////////////// COPIA DE LA FUNCION DEL FRAME //////////////////////////////////////
// Crea un form "on the fly" con campos hidden, para pasar parámetros que no figuren en la url.
function post_to_url2(path, params, target, method) {
    // path es la url. Por ejemplo: web_solicitud_imp.php
    // params es un array asociativo (clave, valor). Por ejemplo: {'parametro1':'val1','parametro2','val2'}
    // method indica si es post o get. Si no se pasa nada, es post.

    method = method || "post";
    // Si no se pasa como parámetro, el método será post.

    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);
    if (target != '') {
        form.setAttribute("target", target);
    }

    for (var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);

        form.appendChild(hiddenField);
    }

    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "ruta");
    hiddenField.setAttribute("value", "[]");

    form.appendChild(hiddenField);

    //console.log(form);
    document.body.appendChild(form);
    // Ver si es necesario...

    form.submit();
}
////////////////////////////////////// COPIA DE LA FUNCION DEL FRAME //////////////////////////////////////

function cons_contrib(){
    post_to_url2('consulta_contribuyentes.php', {
        'p_consulta': 'S',
        'cuit': $("#n_cuit").val(),
        'p_n_id_menu': 10885}, '_blank');
}

function cons_inmuebles(){
    $.ajax({
        url: "legajo_contribuyente/php/consultas_ajax.php",
        type:"POST",
        data:{ p_oper:'tiene_inmuebles', id_contribuyente: $('#id_contribuyente',"#frm_busqueda").val()},
        dataType: 'json'
    }).done(function(response){
        if(response.CANT_OBJ > 0){
            abrir_modal("#modal_inmuebles");
            setea_parametros('#inmuebles_grid',{':p_id_contribuyente': $('#id_contribuyente',"#frm_busqueda").val()});
        }else{
            mostrar_validacion('No existen datos para el contribuyente selecionado.');
        }
    }).fail(function () {
        mostrar_error('Error en el acceso a los datos');
    })
}

function cons_automotor(){
    $.ajax({
        url: "legajo_contribuyente/php/consultas_ajax.php",
        type:"POST",
        data:{ p_oper:'tiene_automotor', id_contribuyente: $('#id_contribuyente',"#frm_busqueda").val()},
        dataType: 'json'
    }).done(function(response){
        if(response.CANT_OBJ > 0){
            abrir_modal("#modal_automotor");
            setea_parametros('#automotor_grid',{':p_id_contribuyente': $('#id_contribuyente',"#frm_busqueda").val()});
        }else{
            mostrar_validacion('No existen datos para el contribuyente selecionado.');
        }
    }).fail(function () {
        mostrar_error('Error en el acceso a los datos');
    });
}

function cons_ddjj(){
    $.ajax({
        url: "legajo_contribuyente/php/consultas_ajax.php",
        type:"POST",
        data:{ p_oper:'tiene_ddjj', id_contribuyente: $('#id_contribuyente',"#frm_busqueda").val()},
        success: function(response){
            if(response.CANT > 0){
                mostrar_validacion('A desarrollar.');
            }else{
                mostrar_validacion('No existen datos para el contribuyente selecionado.');
            }
        }
    });
}

function cons_ddjj_pendientes(){

}

function cons_ddjj_ret_perc(){

}

function cons_ddjj_pend_agentes(){

}

function cons_dj_no_pres(){
    $.ajax({
        url: "legajo_contribuyente/php/consultas_ajax.php",
        type:"POST",
        data:{ p_oper:'ddjj_no_presentadas', id_contribuyente: $('#id_contribuyente',"#frm_busqueda").val()},
        dataType: "json"
    }).done(function(response){
        if(response.CANT > 0){
            abrir_modal("#modal_ddjj_no_presentadas");
            setea_parametros('#ddjj_no_presentadas_grid', {":p_id_contribuyente": $('#id_contribuyente', '#frm_busqueda').val()});
        }else{
            mostrar_validacion('No existen DDJJ No Presentadas para el Contribuyente.');
        }
    });
}

function cons_ddjj_no_pagadas(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_id_contribuyente": $("#id_contribuyente","#frm_busqueda").val(),
            "id_menu":v_id_menu,
            "n_orden":1
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                var cantidad = data.p_n_cant_filas;
                if(cantidad > 0){
                    abrir_modal("#modal_ddjj_no_pagadas");
                    setea_parametros('#ddjj_no_pagadas_grid',{
                        ':p_n_lote': data.p_n_lote
                    });
                }
                else{
                    mostrar_validacion('No posee Declaraciones Juradas no pagadas');
                    return;
                }
            }
            else{
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}

function cons_cta_cte(){
    post_to_url2('consulta_cuenta_corr.php', {
        'p_n_id_menu': 10852,
        'id_contribuyente': id_contribuyente,
        'c_tipo_imponible': $("#c_tipo_imponible").val(),
        'c_tributo': $("#c_tributo").val(),
        'd_objeto_hecho': $("#d_objeto_hecho").val(),
        'p_m_autoquery': 'S'
    }, '_blank');
}

function cons_pagos_pendientes(){
    mostrar_validacion('A desarrollar');
}

function cons_planes_de_pago(){
    post_to_url2('cons_planes_pago.php', {
        'p_n_id_menu': 10891,
        'p_m_autoquery': 'S',
        'p_modo': 'C',
        'p_id_contribuyente': id_contribuyente
    }, '_blank');
}

function cons_inmuebles_no_pagados(){
    $.ajax({
        url: "legajo_contribuyente/php/consultas_ajax.php",
        type:"POST",
        data:{ p_oper:'tiene_inmuebles_no_pagados', id_contribuyente: $('#id_contribuyente',"#frm_busqueda").val()},
        dataType:"json",
        success: function(response){
            if(response.CANT > 0){
                setea_parametros('#inmuebles_no_pagados_grid', {':p_id_contribuyente': $('#id_contribuyente',"#frm_busqueda").val()});
                abrir_modal("#modal_inmuebles_no_pagados");
            }else{
                mostrar_validacion('El contribuyente no posee inmuebles no pagados.');
            }
        }
    }).fail(function () {
        mostrar_error("Ocurrió un error. Vuelve a intentarlo");
    });
}

function cons_pagos_acred(){

}

function cons_instancias(){
    $.ajax({
        url: "legajo_contribuyente/php/consultas_ajax.php",
        type:"POST",
        dataType: 'JSON',
        data:{ p_oper:'tiene_instancias', id_contribuyente: $('#id_contribuyente',"#frm_busqueda").val()},
        success: function(response){
            if(response.CANT > 0){
                post_to_url2('consulta_instancias.php', {
                    'p_n_id_menu': 10892,
                    'p_m_autoquery': 'S',
                    'p_id_contribuyente': id_contribuyente,
                    'p_c_tributo': $("#c_tributo").val(),
                    'p_d_objeto_hecho': $("#d_objeto_hecho").val()
                }, '_blank');
            }else{
                mostrar_validacion('No existen datos para el contribuyente selecionado.');
            }
        }
    });
}

function cons_inspecciones(){

}
//p
function cons_excenciones_hechos(){
    $.ajax({
        url: "legajo_contribuyente/php/consultas_ajax.php",
        type:"POST",
        dataType: 'JSON',
        data:{ p_oper:'excenciones_hechos', id_contribuyente: $('#id_contribuyente',"#frm_busqueda").val()},
        success: function(response){
            if(response.CANT > 0){
                post_to_url2('abm_excepciones.php', {
                    'p_n_id_menu': 10917,
                    'p_modo': 'C',
                    'p_m_autoquery': 'S',
                    'p_id_contrib': id_contribuyente,
                    'p_c_timp': $("#c_tipo_imponible").val(),
                    'p_c_trib': $("#c_tributo").val(),
                    'p_objeto': $("#d_objeto_hecho").val()
                }, '_blank');
            }else{
                mostrar_validacion('No existen datos para el contribuyente selecionado.');
            }
        }
    });
}

function cons_excenciones_objetos(){
    $.ajax({
        url: "legajo_contribuyente/php/consultas_ajax.php",
        type:"POST",
        dataType: 'JSON',
        data:{ p_oper:'excenciones_objetos', id_contribuyente: $('#id_contribuyente',"#frm_busqueda").val()},
        success: function(response){
            if(response.CANT > 0){

                post_to_url2(
                    'excenciones_hechos.php',
                    {
                        'p_n_id_menu': 10910,
                        'p_modo': 'C',
                        'p_m_autoquery': 'S',
                        'p_id_contrib': $('#id_contribuyente',"#frm_busqueda").val(),
                        'p_c_timp': $("#c_tipo_imponible").val(),
                        'p_c_trib': $("#c_tributo").val(),
                        'p_objeto': $("#d_objeto_hecho").val()
                    },
                    '_blank');


            }else{
                mostrar_validacion('No existen datos para el contribuyente selecionado.');
            }
        }
    });
}

function cons_instrumentos_sellos(){

}