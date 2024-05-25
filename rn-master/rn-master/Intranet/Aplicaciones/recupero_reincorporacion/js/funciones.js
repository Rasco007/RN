function check_digito_verificador(param, digito) {
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "recupero_reincorporacion/php/consultas_ajax.php",
        type:"POST",
        dataType: "JSON",
        data:{ p_oper:'checkDigito', param: param},
        success: function (res) {
            if(res){
                if(res['DIGITO'] != digito){
                    $('#main').procOverlay({visible:false});
                    mostrar_error('El Dígito Verificador no es correcto.');
                    return;
                }
                else{
                    cargar_informacion_patentes();
                    cargar_datos_contribuyente($("#d_patente").val());
                    setea_parametros('#tributos_grid',
                        {':p_c_tributo': p_tributo, ':p_d_patente': $('#d_patente').val(),
                            ':id_contribuyente': $('#id_contribuyente').val(), ':c_tipo_imponible': $('#c_tipo_imponible').val(),
                            ':d_objeto_hecho': $('#d_patente').val()});
                    $('#main').procOverlay({visible:false});
                    $('#btn_otro_contrib').attr('disabled', true);
                }
            }
            else{
                $('#main').procOverlay({visible:false});
                mostrar_error('Ocurrió un error al comprobar el Digito Verificador.'); return;
            }
        }
    });
}

function cargar_informacion_patentes(){
    $.ajax({
        url: "recupero_reincorporacion/php/consultas_ajax.php",
        type:"POST",
        async:false,
        dataType: "JSON",
        data:{ p_oper:'infoPatentes',
               d_patente: $("#d_patente").val(), d_patente_vieja: $("#d_patente_vieja").val(),
               c_tributo: p_tributo},
        success: function (res) {
            if(res){
                $("#d_patente").val(res['D_PATENTE']);
                $("#d_patente_vieja").val(res['D_PATENTE_VIEJA']);
                $("#d_verif_dom").val(res['DIGITO_PATENTE']);
                $("#d_verif_dom_ant").val(res['DIGITO_PATENTE_VIEJA']);
                $("#c_tipo_imponible").val(res['C_TIPO_IMPONIBLE']);
            }
            else{
                $('#main').procOverlay({visible:false});
                mostrar_error('Ocurrió un error al cargar los datos.'); return;
            }
        }
    });
}

function cargar_datos_contribuyente(objeto_hecho){
    $.ajax({
        url: "recupero_reincorporacion/php/consultas_ajax.php",
        type:"POST",
        async:false,
        dataType: "JSON",
        data:{ p_oper:'datosContribuyente', n_cuit: limpia_cuit($('#n_cuit').val()),
               n_documento:  $('#n_documento').val(), d_patente: objeto_hecho},
        success: function (res) {
            if(res){
                var resultado = res['existe_contribuyente'];
                if (resultado != 0){
                    if (resultado == - 1){
                        mostrar_error('No se encontraron datos para el objeto elegido');
                    } else mostrar_error(resultado);
                }
                else{
                    $("#n_cuit").val(res['n_cuit']);
                    $("#n_documento").val(res['n_documento']);
                    $("#c_tipo_documento").val(res['c_tipo_documento']);
                    if($("#c_tipo_documento").val() != '') $("#c_tipo_documento").blur();
                    $("#id_contribuyente").val(res['id_contribuyente']);
                    $("#d_denominacion").val(res['d_denominacion']);
                }
            }
            else{
                $('#main').procOverlay({visible:false});
                mostrar_error('Ocurrió un error al cargar los datos.'); return;
            }
        }
    });
}

function cargar_datos_automotor() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "recupero_reincorporacion/php/consultas_ajax.php",
        type:"POST",
        dataType: "JSON",
        async:true,
        data:{ p_oper:'datosAutomotor', d_patente: $("#d_patente").val()},
        success: function (res) {
            $('#main').procOverlay({visible:false});
            if(res){
                $('#c_grupo', '#frm_reincorporacion').val(res['C_GRUPO']);
                if(res['C_FMCAMOD']){
                    $('#c_fmcamod', '#frm_reincorporacion').val(res['C_FMCAMOD']);
                    $('#d_fmcamod', '#frm_reincorporacion').val(res['D_MARCA'] +'-'+ res['D_DESCRIPCION'] +'-'+ res['D_TIPO']);
                    guardar_mtm = 'N';
                    $('#lupa_fmcamod').hide();
                } else{
                    guardar_mtm = 'S';
                    $('#lupa_fmcamod').show();
                }
            }
        }
    });
}

function cargar_datos_mtm() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "recupero_reincorporacion/php/consultas_ajax.php",
        type:"POST",
        dataType: "JSON",
        async:true,
        data:{ p_oper:'datosMTM', c_fmcamod: $("#frm_codigo #mtm").val()},
        success: function (res) {
            $('#main').procOverlay({visible:false});
            if(res) {
                $('#c_fmcamod', '#frm_reincorporacion').val(res['C_FMCAMOD']);
                $('#d_fmcamod', '#frm_reincorporacion').val(res['D_MARCA'] + '-' + res['D_DESCRIPCION'] + '-' + res['D_TIPO']);
                $('#modal_codigo_automotor').modal('hide');
            }
        }
    });
}

function valor_tipo_imponible() {
    $.ajax({
        url: "recupero_reincorporacion/php/consultas_ajax.php",
        type:"POST",
        async:false,
        dataType: "JSON",
        data:{ p_oper:'tipoImponible', c_tributo: p_tributo},
        success: function (res) {
            if(res){
                $("#c_tipo_imponible").val(res['C_TIPO_IMPONIBLE']);
            }
            else{
                $('#main').procOverlay({visible:false});
                mostrar_error('Ocurrió un error al cargar los datos.'); return;
            }
        }
    });
}

function validaciones(){
    $('#main').procOverlay({visible:true});
    validaciones_grales();

}

function validaciones_grales(){
    $.ajax({
        type:'POST',
        async: false,
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_f_desde": $('#frm_reincorporacion #f_desde').val(),
            "p_motivo_alta": $('#frm_reincorporacion #c_motivo_alta').val(),
            "p_c_tributo": p_tributo,
            "p_id_contribuyente": $('#frm_busqueda #id_contribuyente').val(),
            "p_c_tipo_imponible": $('#frm_busqueda #c_tipo_imponible').val(),
            "p_d_objeto_hecho": $('#frm_reincorporacion #d_objeto_hecho').val(),
            "p_c_fmcamod": $('#frm_reincorporacion #c_fmcamod').val(),
            "p_c_guarda_habitual": $('#frm_reincorporacion #c_guarda_habitual').val(),
            "p_c_grupo": $('#frm_reincorporacion #c_grupo').val(),
            "p_f_vig_hasta": $('#frm_reincorporacion #f_vig_hasta').val(),
            "p_f_cese_provisorio": $('#frm_reincorporacion #f_cese_prov').val(),
            "p_f_vig_desde": $('#frm_reincorporacion #f_vig_desde').val(),
            "id_menu":v_id_menu,
            "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado != 'OK'){
                mostrar_error(data.resultado); return;
            }else{
                validacion_valuac_oblig();
            }
        }
    });
}

function validacion_valuac_oblig(){
    $.ajax({
        type:'POST',
        async: false,
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_c_fmcamod": $('#frm_reincorporacion #c_fmcamod').val(),
            "p_d_patente": $('#frm_busqueda #d_patente').val(),
            "id_menu":v_id_menu,
            "n_orden":1
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado != 'OK'){
                mostrar_error(data.resultado); return;
            } else if (data.resultado == 'OK') {
                if (p_tributo == c_tributo_automotor){
                    if ($('#frm_reincorporacion #f_cese_prov').val() != ''){
                        mostrar_cuadro('Q', 'Confirmación', 'Es una baja provisoria, ¿Desea confirmarla automáticamente?',
                            function () {
                                validacion_automotor()
                            }, function () {return;});
                    }
                    else validacion_automotor();
                } else if (p_tributo != c_tributo_automotor) reincorporacion();
            }
        }
    });
}

function validacion_automotor(){
    $.ajax({
        type:'POST',
        async: false,
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_c_delegacion": $('#frm_reincorporacion #c_delegacion').val(),
            "p_id_contribuyente": $('#frm_busqueda #id_contribuyente').val(),
            "p_id_contribuyente2": $('#frm_contrib #id_otro_contribuyente').val(),
            "p_c_tributo": p_tributo,
            "p_motivo_alta": $('#frm_reincorporacion #c_motivo_alta').val(),
            "p_d_objeto_hecho": $('#frm_reincorporacion #d_objeto_hecho').val(),
            "p_f_vig_hasta": $('#frm_reincorporacion #f_vig_hasta').val(),
            "p_f_cese_provisorio": $('#frm_reincorporacion #f_cese_prov').val(),
            "p_c_motivo_cese_prov": $('#frm_reincorporacion #c_motivo_cese_prov').val(),
            "p_motivo_baja": $('#frm_reincorporacion #c_motivo_baja').val(),
            "id_menu":v_id_menu,
            "n_orden":2
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                if (data.p_mensaje) mostrar_cuadro('I','', data.p_mensaje);
                reincorporacion();
            }
            else{
                mostrar_error(data.resultado); return;
            }
        }
    });
}

function reincorporacion(){
    $.ajax({
        type:'POST',
        async: false,
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_c_tributo": p_tributo,
            "p_c_tipo_imponible": $('#frm_busqueda #c_tipo_imponible').val(),
            "p_id_contribuyente": $('#frm_busqueda #id_contribuyente').val(),
            "p_d_patente": $('#frm_busqueda #d_patente').val(),
            "p_d_objeto_hecho": $('#frm_reincorporacion #d_objeto_hecho').val(),
            "p_f_desde": $('#frm_reincorporacion #f_desde').val(),
            "p_motivo_alta": $('#frm_reincorporacion #c_motivo_alta').val(),
            "p_f_vig_desde": $('#frm_reincorporacion #f_vig_desde').val(),
            "p_c_motivo_cese_prov": $('#frm_reincorporacion #c_motivo_cese_prov').val(),
            "p_n_tabla_mot_cese": $('#n_tabla_mot_cese','#frm_reincorporacion').val(),
            "p_n_tabla_mot_baja": $('#n_tabla_mot_baja','#frm_reincorporacion').val(),
            "p_n_tabla_mot_alta": $('#n_tabla_mot_alta','#frm_reincorporacion').val(),
            "p_f_vig_hasta": $('#frm_reincorporacion #f_vig_hasta').val(),
            "p_f_cese_provisorio": $('#frm_reincorporacion #f_cese_prov').val(),
            "p_c_motivo_baja": $('#frm_reincorporacion #c_motivo_baja').val(),
            "p_c_guarda_habitual": $('#frm_reincorporacion #c_guarda_habitual').val(),
            "p_c_grupo": $('#frm_reincorporacion #c_grupo').val(),
            "p_c_fmcamod": $('#frm_reincorporacion #c_fmcamod').val(),
            "p_id_contribuyente2": $('#frm_contrib #id_otro_contribuyente').val(),
            "p_c_tipo_domicilio2": $('#frm_contrib #c_domicilio_otro_cont').val(),
            "p_n_tabla_tipo_domi2": $('#frm_contrib #n_tabla_tipo_domi').val(),
            "p_c_delegacion": $('#frm_reincorporacion #c_delegacion').val(),
            "p_guardar_mtm": guardar_mtm,
            "id_menu":10986,
            "n_orden":3
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                mostrar_cuadro('S','Confirmación','Se ha realizado la incorporación.',
                    function(){
                        $('#btn_limpiar').click();
                    });
                if (data.p_mensaje || data.p_mensaje2){
                    mostrar_cuadro('I','', data.p_mensaje + data.p_mensaje2);
                }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function lupas_modal_reincorporo() {

    $("#lupa_motivo_alta", "#frm_reincorporacion").lupa_generica({
        id_lista: id_lista_motivos_alta,
        titulos:['Código','Descripción', 'Num Tabla'],
        grid:[  {index:'c_dato',width:120},
            {index:'d_dato', width:350},
            {index:'n_tabla',width:100, hidden:true}
        ],
        sortname:'c_dato',
        sortorder:'asc',
        caption:'Motivos de Alta',
        campos:{c_dato:'c_motivo_alta', d_dato:'d_motivo_alta', n_tabla:'n_tabla_motivo'},
        filtros:[p_tributo, $('#c_motivo_baja','#frm_reincorporacion').val(), $('#c_motivo_cese_prov', '#frm_reincorporacion').val()],
        filtrosNulos:[true, true, true],
        filtrosTitulos:['Tributo', 'Motivo Baja', 'Motivo Cese Provisorio'],
        searchCode: true,
        searchInput: '#c_motivo_alta',
        exactField: 'c_dato',
        limpiarCod: true,
        keyNav:true,
        onClose: function () {
            if($('#c_motivo_alta').val() == 34) $('#btn_otro_contrib').attr('disabled', false);
            else $('#btn_otro_contrib').attr('disabled', true);
        }
    });

    $("#lupa_delegacion", "#frm_reincorporacion").lupa_generica({
        id_lista: id_lista_delegaciones,
        titulos:['Código','Delegación', 'Num Tabla'],
        grid:[  {index:'c_dato',width:120},
            {index:'d_dato', width:350},
            {index:'n_tabla',width:100, hidden:true}
        ],
        sortname:'c_dato',
        sortorder:'asc',
        caption:'Delegaciones',
        campos:{c_dato:'c_delegacion', d_dato:'d_delegacion', n_tabla:'n_tabla_delegacion'},
        filtros:[$('#id_contribuyente','#frm_busqueda').val()],
        filtrosTitulos:['ID Contribuyente'],
        keyNav:true,
        searchCode: true,
        searchInput: '#c_delegacion',
        exactField: 'c_dato',
        limpiarCod: true,
    });

}

function lupas_modal_contribuyente (){
    $("#lupa_tipo_doc_contrib").lupa_generica({
        id_lista: id_lista_documento,
        titulos:['Código', 'Descripción'],
        grid:[  {index:'c_dato',width:115}, {index:'d_dato',width:115}],
        sortname:'c_dato',
        sortorder:'asc',
        caption:'Tipos de Documentos',
        campos:{c_dato:'c_tipo_documento_otro_cont', d_dato: 'd_tipo_documento_otro_cont'},
        filtros:['#c_tipo_documento_otro_cont'],
        filtrosNulos:[true],
        filtrosTitulos:['Código tipo Documento'],
        keyNav:true,
        searchInput: '#c_tipo_documento_otro_cont',
        searchCode: true,
        exactField: 'c_dato'
    });

    $("#lupa_domicilio").lupa_generica({
        id_lista: id_lista_domicilios,
        titulos:['Código', 'Descripción', 'Num tabla', 'Domicilio'],
        grid:[  {index:'c_dato',width:115}, {index:'d_dato',width:115},
                {index:'n_tabla',width:15, hidden: true}, {index:'domi',width:115}],
        caption:'Domicilios',
        campos:{c_dato:'c_domicilio_otro_cont', d_dato: 'd_tipo_domicilio_otro_cont',
                n_tabla: 'n_tabla_tipo_domi' , domi: 'd_domicilio_otro_cont'},
        filtros:['#id_otro_contribuyente'],
        filtrosTitulos:['N° de Cuit'],
        keyNav:true,
        searchCode: true,
        searchInput: '#c_domicilio_otro_cont',
        exactField: 'c_dato'
    });
}

function lupas_modal_codigo_automotor() {
    $("#lupa_marca", "#frm_codigo").lupa_generica({
        id_lista: id_lista_marcas_automotor,
        titulos:['Marca'],
        grid:[  {index:'d_marca',width:300}],
        sortname:'d_marca',
        sortorder:'asc',
        caption:'Marcas de Automotor',
        campos:{d_marca:'marca'},
        keyNav:true,
        onClose: function () {
            if ($('#marca').val()){
                setTimeout(function(){ $('#lupa_mtm').click() }, 500);
            }
        }
    });

    $("#lupa_mtm", "#frm_codigo").lupa_generica({
        id_lista: id_lista_modelos_automotor,
        titulos:['Código', 'Descripción'],
        grid:[  {index:'c_fmcamod',width:300}, {index:'detalle',width:300}],
        caption:'Modelos de Automotor',
        campos:{c_fmcamod:'mtm', detalle: 'd_descripcion'},
        filtros:['#marca'],
        filtrosNulos:[false],
        filtrosTitulos:['Marca del Automotor'],
        keyNav:true
    });
}

function guardar_datos_grilla(id) {
    $('#n_tabla_mot_cese','#frm_reincorporacion').val($('#tributos_grid').getCell(id, 'n_tabla_mot_cese'));
    $('#n_tabla_mot_baja','#frm_reincorporacion').val($('#tributos_grid').getCell(id, 'n_tabla_mot_baja'));
    $('#n_tabla_mot_alta','#frm_reincorporacion').val($('#tributos_grid').getCell(id, 'n_tabla_mot_alta'));
    $('#c_motivo_baja','#frm_reincorporacion').val($('#tributos_grid').getCell(id, 'C_MOTIVO_BAJA'));
    $('#c_motivo_cese_prov', '#frm_reincorporacion').val($('#tributos_grid').getCell(id, 'C_MOTIVO_CESE_PROV'));
    $('#f_cese_prov', '#frm_reincorporacion').val($('#tributos_grid').getCell(id, 'F_CESE_PROVISORIO'));
    $('#d_observaciones','#frm_reincorporacion').val($('#tributos_grid').getCell(id, 'd_observ'));
    $('#f_vig_hasta','#frm_reincorporacion').val($('#tributos_grid').getCell(id, 'f_vig_hasta'));
    $('#d_objeto_hecho','#frm_reincorporacion').val($('#tributos_grid').getCell(id, 'D_OBJETO_HECHO'));
    $('#f_vig_desde','#frm_reincorporacion').val($('#tributos_grid').getCell(id, 'f_vig_desde'));
}

////////////////////////////////////// COPIA DE LA FUNCION DEL FRAME //////////////////////////////////////
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
