function n_cuit_focusout(){
        $('#main').procOverlay({visible:true});
        $.ajax({
            url: "cons_inmuebles/php/autocomplete.php",
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

function n_documento_focusout(){
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

function n_partida_focusout(){
        $('#main').procOverlay({visible:true});
        $.ajax({
            url: "cons_inmuebles/php/autocomplete.php",
            type:"POST",
            dataType: 'JSON',
            data:{ p_oper:'partida', filtro: $('#d_partida',"#frm_busqueda").val()},
            success: function(response){
                $('#main').procOverlay({visible:false});
                if (response){
                    $("#d_denominacion","#frm_busqueda").val(response['D_DENOMINACION']);
                    $("#n_cuit","#frm_busqueda").val(response['N_CUIT']);
                    $("#id_contribuyente","#frm_busqueda").val(response['ID_CONTRIBUYENTE']);
                    $("#c_tipo_documento","#frm_busqueda").val(response['C_TIPO_DOCUMENTO']);
                    $("#d_tipo_documento","#frm_busqueda").val(response['D_TIPO_DOCUMENTO']);
                    $("#n_documento","#frm_busqueda").val(response['N_DOCUMENTO']);
                    $("#d_partida","#frm_busqueda").val(response['D_NOMENCLATURA']);
                    $("#d_nomenclatura","#frm_busqueda").val(response['D_NOMENCLATURA_REAL']);
                    $(".input-sm", "#frm_busqueda").attr('readonly', true);
                    $("#lupa_partida, #lupa_nomenclatura").hide();
                }
            }
        });
}

function limpiar_form() {
    $('#tabs').css('display', 'none').tabs('refresh');
    $('#div_datos_generales').css('display', 'none');
    $('#btn_mostrar').prop('disabled', false);
    $("#frm_busqueda input").attr('disabled', false).val(null);
    $('#frm_busqueda .btn_lupa').show();
    $('#datos_generales_grid, #valuaciones_grid, #impuesto_grid, #propietarios_1_grid').clearGridData();
    $('#propietarios_2_grid, #responsables_1_grid, #responsables_2_grid').clearGridData();
    $("#d_tipo_documento").prop('placeholder','Seleccione un tipo de documento');
    $("#d_partida").prop('placeholder','Seleccione una partida');
    $("#d_nomenclatura").prop('placeholder','Seleccione una nomenclatura');
    $('#gbox_propietarios_2_grid, #gbox_responsables_2_grid').css('display', 'none');
    $('.div_validacion').css('display','none');
    $(".input-sm", "#frm_busqueda").attr('readonly', false);
    $("#d_tipo_documento", "#frm_busqueda").attr('readonly', true);
}

function imprimir_reporte(reporte) {
    $('#main').procOverlay({visible:true});
    if(reporte == 'INMR_010'){
        let params = 'p_d_nomenclatura|'+ $('#datos_generales_grid').getCell($('#datos_generales_grid').getGridParam('selrow'),'d_nomenclatura');
        llamar_report(reporte, params, 'PDF');
    }
}

    // ----------------- CONSULTAS DE DATOS PARA GRILLAS ------------------

function cons_datos_generales(){
    $('.div_validacion').css('display','none');
    $.ajax({
        url: "cons_inmuebles/php/consultas_ajax.php",
        type:"POST",
        data:{ p_oper:'datos_generales',
            id_contribuyente: $('#id_contribuyente',"#frm_busqueda").val(),
            d_nomenclatura: $('#d_partida',"#frm_busqueda").val(),
            d_nomenclatura_real: $('#d_nomenclatura',"#frm_busqueda").val()},
        dataType: 'json'
    }).done(function(response){
        if(response.CANT > 0){
            $("#div_datos_generales").css('display', 'block');
            setea_parametros('#datos_generales_grid',
                {':p_id_contribuyente': $('#id_contribuyente',"#frm_busqueda").val(),
                    ':p_d_partida': $('#d_partida',"#frm_busqueda").val(),
                    ':p_d_nomenclatura': $('#d_nomenclatura',"#frm_busqueda").val()});
        }else{
            mostrar_validacion('No existen datos para el contribuyente selecionado.');
            limpiar_form();
        }
    }).fail(function () {
        mostrar_error('Error en el acceso a los datos');
    });
}


function cons_valuaciones(){
    var i = $('#datos_generales_grid').getCell($('#datos_generales_grid').getGridParam('selrow'),'id_inmueble');
    $.ajax({
        url: "cons_inmuebles/php/consultas_ajax.php",
        type:"POST",
        data:{ p_oper:'valuaciones', id_inmueble: i},
        dataType: 'json'
    }).done(function(response){
        if(response.CANT > 0){
            $('#gbox_valuaciones_grid').css('display','block');
            $('#tabs-1 .div_botones').css('display','block');
            setea_parametros('#valuaciones_grid', {':p_id_inmueble': i});
        }else{
            $('#no_hay_val').css('display','block');
        }
    }).fail(function () {
        mostrar_error('Error en el acceso a los datos');
    });
}

function cons_impuesto(){
    var i2 = $('#datos_generales_grid').getCell($('#datos_generales_grid').getGridParam('selrow'),'id_inmueble');
    $.ajax({
        url: "cons_inmuebles/php/consultas_ajax.php",
        type:"POST",
        data:{ p_oper:'impuesto', id_inmueble: i2},
        dataType: 'json'
    }).done(function(response){
        if(response.CANT > 0){
            $('#gbox_impuesto_grid').css('display','block');
            $('#tabs-2 .div_botones').css('display','block');
            setea_parametros('#impuesto_grid', {':p_id_inmueble': i2});
        }else{
            $('#no_hay_imp').css('display','block');
        }
    }).fail(function () {
        mostrar_error('Error en el acceso a los datos');
    });
}

function cons_prop_1(){
    var n = $('#datos_generales_grid').getCell($('#datos_generales_grid').getGridParam('selrow'),'d_nomenclatura');
    $.ajax({
        url: "cons_inmuebles/php/consultas_ajax.php",
        type:"POST",
        data:{ p_oper:'respon_prop', d_nomenclatura: n},
        dataType: 'json'
    }).done(function(response){
        if(response.CANT > 0){
            $('#gbox_propietarios_1_grid').css('display','block');
            $('#tabs-3 .div_botones').css('display','block');
            $('#consigna_prop').css('display','block');
            setea_parametros('#propietarios_1_grid',{':p_d_nomenclatura': n});
        }else{
            $('#no_hay_prop').css('display','block');
        }
    }).fail(function () {
        mostrar_error('Error en el acceso a los datos');
    });
}

function cons_prop_2(){
    var n2 = $('#propietarios_1_grid').getCell($('#propietarios_1_grid').getGridParam('selrow'),'d_objeto_hecho');
    var c = $('#propietarios_1_grid').getCell($('#propietarios_1_grid').getGridParam('selrow'),'id_contribuyente');
    $.ajax({
        url: "cons_inmuebles/php/consultas_ajax.php",
        type:"POST",
        data:{ p_oper:'domic_prop', d_nomenclatura: n2, id_contribuyente: c},
        dataType: 'json'
    }).done(function(response){
        if(response.CANT = 1){
            $('#gbox_propietarios_2_grid').css('display','block');
            setea_parametros('#propietarios_2_grid', {':p_id_contribuyente': c, ':p_d_nomenclatura': n2});
        }else{
            mostrar_validacion('No existen domicilios para el propietario selecionado.');
        }
    }).fail(function () {
        mostrar_error('Error en el acceso a los datos');
    });
}

function cons_resp_1(){
    var n3 = $('#datos_generales_grid').getCell($('#datos_generales_grid').getGridParam('selrow'),'d_nomenclatura');
    $.ajax({
        url: "cons_inmuebles/php/consultas_ajax.php",
        type:"POST",
        data:{ p_oper:'otros_resp', d_nomenclatura: n3},
        dataType: 'json'
    }).done(function(response){
        if(response.CANT > 0){
            $('#gbox_responsables_1_grid').css('display','block');
            $('#tabs-4 .div_botones').css('display','block');
            $('#consigna_resp').css('display','block');
            setea_parametros('#responsables_1_grid', {':p_d_nomenclatura': n3});
        }else{
            $('#no_hay_resp').css('display','block');
        }
    }).fail(function () {
        mostrar_error('Error en el acceso a los datos');
    });
}

function cons_resp_2(){
    var n4 = $('#responsables_1_grid').getCell($('#responsables_1_grid').getGridParam('selrow'),'d_objeto_hecho');
    var c2 = $('#responsables_1_grid').getCell($('#responsables_1_grid').getGridParam('selrow'),'id_contribuyente');
    $.ajax({
        url: "cons_inmuebles/php/consultas_ajax.php",
        type:"POST",
        data:{ p_oper:'otros_resp_dom', d_nomenclatura: n4, id_contribuyente: c2},
        dataType: 'json'
    }).done(function(response){
        if(response.CANT > 0){
            $('#gbox_responsables_2_grid').css('display','block');
            setea_parametros('#responsables_2_grid',
                {':p_id_contribuyente': c2, ':p_d_nomenclatura': n4});
        }else{
            mostrar_validacion('No existen domicilios para el responsable selecionado.');
        }
    }).fail(function () {
        mostrar_error('Error en el acceso a los datos');
    });
}

    // ------------- FUNCIONALIDAD BOTONES --------------
function abrir_modal(modal){
    $(modal).modal('show');
    $(window).resize();
}

function cons_movimientos() {
    if($('#d_partida',"#frm_busqueda").val()){
        $.ajax({
            url: "cons_inmuebles/php/consultas_ajax.php",
            type:"POST",
            data:{ p_oper:'tiene_movs', d_nomenclatura: $('#d_partida',"#frm_busqueda").val()},
            dataType: 'json'
        }).done(function(response){
            if(response.CANT > 0){
                abrir_modal("#modal_movimientos");
                setea_parametros('#movimientos_grid',{':p_d_nomenclatura': $('#d_partida',"#frm_busqueda").val()});
                let partida = $('#d_partida',"#frm_busqueda").val();
                $('#partida_mov').val(partida);
            }else{
                mostrar_validacion('No existen movimientos para la partida selecionada1.');
            }
        }).fail(function () {
            mostrar_error('Error en el acceso a los datos');
        });
    }
    else if($('#datos_generales_grid').getCell($('#datos_generales_grid').getGridParam('selrow'),'d_nomenclatura')!=''){
        $.ajax({
            url: "cons_inmuebles/php/consultas_ajax.php",
            type:"POST",
            data:{ p_oper:'tiene_movs', d_nomenclatura: $('#datos_generales_grid').getCell($('#datos_generales_grid').getGridParam('selrow'),'d_nomenclatura')},
            dataType: 'json'
        }).done(function(response){
            if(response.CANT > 0){
                abrir_modal("#modal_movimientos");
                setea_parametros('#movimientos_grid',{':p_d_nomenclatura': $('#datos_generales_grid').getCell($('#datos_generales_grid').getGridParam('selrow'),'d_nomenclatura')});
                let partida = $('#datos_generales_grid').getCell($('#datos_generales_grid').getGridParam('selrow'),'d_nomenclatura');
                $('#partida_mov').val(partida);
            }else{
                mostrar_validacion('No existen movimientos para la partida selecionada2.');
            }
        }).fail(function () {
            mostrar_error('Error en el acceso a los datos');
        });
    }
}

/* // FUNCIONALIDAD BOTON IRC COMENTADA PORQUE EN EL FORM ESTÁ PERO NO SE USA NI SE MUESTRA
function cons_datos_irc() {
    $.ajax({
        url: "cons_inmuebles/php/consultas_ajax.php",
        type:"POST",
        data:{ p_oper:'tiene_datos_irc_1', d_nomenclatura: $('#d_partida',"#frm_busqueda").val()},
        dataType: 'json'
    }).done(function(response){
        if(response.CANT > 0){
            abrir_modal("#modal_datos_irc");
            setea_parametros('#datos_irc_1_grid',{':p_d_nomenclatura': $('#d_partida',"#frm_busqueda").val()});
            let partida = $('#d_partida',"#frm_busqueda").val();
            $('#partida_mov_irc').val(partida);
            $.ajax({
                url: "cons_inmuebles/php/consultas_ajax.php",
                type:"POST",
                data:{ p_oper:'tiene_datos_irc_2', d_nomenclatura: $('#d_partida',"#frm_busqueda").val()},
                dataType: 'json'
            }).done(function(response){
                if(response.CANT > 0){
                    setea_parametros('#datos_irc_2_grid',{':p_d_nomenclatura': $('#d_partida',"#frm_busqueda").val()});
                }else{
                    mostrar_validacion('No existen datos IRC VOL 2 para la partida selecionada.');
                }
            }).fail(function () {
                mostrar_error('Error en el acceso a los datos');
            });
        }else{
            mostrar_validacion('No existen datos IRC para la partida selecionada.');
        }
    }).fail(function () {
        mostrar_error('Error en el acceso a los datos');
    });

}
*/
function cons_partidas_madre() {
    let id = $('#datos_generales_grid').getGridParam('selrow');
    let id_inmueble = $('#datos_generales_grid').getCell(id,'id_inmueble');
    if(id_inmueble){
        $.ajax({
            url: "cons_inmuebles/php/consultas_ajax.php",
            type:"POST",
            data:{ p_oper:'tiene_part_madres', id_inmueble: id_inmueble}, //TODO CAMBIAR CONSULTA
            dataType: 'json'
        }).done(function(response){
            if(response.CANT > 0){
                abrir_modal("#modal_partidas_madre");
                setea_parametros('#partidas_madre_grid',{':p_id_inmueble': id_inmueble});
            }else{
                mostrar_validacion('No existen partidas madre para el inmueble selecionado.');
            }
        }).fail(function () {
            mostrar_error('Error en el acceso a los datos');
        });
    }
    else mostrar_error('Debe seleccionar una fila de la tabla');
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

    document.body.appendChild(form);
    // Ver si es necesario...
    form.submit();
}
////////////////////////////////////// COPIA DE LA FUNCION DEL FRAME //////////////////////////////////////