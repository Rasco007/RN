function establecer_diseño() {
    // Actualiza la vista para la app y establece las lupas correspondientes
    if (p_tributo == v_c_inmobiliario){
        $('#d_tributo').val('INMOBILIARIO');
        $('#lupa_objeto_hecho').attr('id', 'lupa_inmuebles');
        $('#div_tributo').removeClass('col-md-offset-4').addClass('col-md-offset-3');
        $('#div_dom_anterior, #div_d_verif_dom').css('display', 'none');
        $('#div_nomenclatura').css('display', 'block');
    }
    else if(p_tributo == v_c_automotor){
        $('#d_tributo').val('AUTOMOTOR');
        $('#lupa_objeto_hecho').attr('id', 'lupa_automotor');
        $('#div_tributo').removeClass('col-md-offset-4').addClass('col-md-offset-2');
        $('#div_nomenclatura').css('display', 'none');
        $('#div_dom_anterior, #div_d_verif_dom').css('display', 'block');
    }
    else{
        $('#div_nomenclatura, #div_dom_anterior, #div_d_verif_dom').css('display', 'none');
    }
}

function validacion_prequery() {
    if(p_tributo == v_c_inmobiliario){
        if($('#d_objeto_hecho').val() == ""){
            mostrar_error('Ingrese un valor en el campo Objeto'); return false;
        }
    }
    else if (p_tributo == v_c_automotor){
        if($('#d_objeto_hecho').val() == "" && $('#d_patente_vieja').val() == ""){
            mostrar_error('Ingrese Objeto/Dominio Anterior'); return false;
        }
        if(p_modo != 'C'){
            if ( ($('#d_verif_dom').val() == "" && $('#d_objeto_hecho').val() != "")
                || ($('#d_verif_dom_ant').val() == "" && $('#d_patente_vieja').val() != "")){
                mostrar_error('Ingrese el valor del Digito Verificador.'); return false;
            }
        }
    }
    return true;
}

function lupas_grilla(formid) {
    $("#n_cuit",formid).lupa_generica({
        id_lista: v_lista_contribuyente_cuit,
        titulos:['Denominación','Id Contribuyente', 'Cuit', 'Tipo Doc.', 'Nro. Doc.'],
        grid:[  {index:'d_denominacion',width:280},
            {index:'id_contribuyente', width:80, hidden:true},
            {index:'n_cuit',width:100},
            {index:'c_tipo_documento',width:90},
            {index:'n_documento',width:100}
        ],
        caption:'Contribuyentes',
        campos:{d_denominacion:'d_denominacion', id_contribuyente:'id_contribuyente_tmp',
                n_cuit:'n_cuit', c_tipo_documento: 'c_tipo_documento', n_documento: 'n_documento'},
        filtros:['#n_cuit'],
        filtrosNulos:[true],
        filtrosTitulos:['Cuit'],
        keyNav:true,
        searchInput: '#n_cuit',
        onClick:false,
        onKeydown:false,
        filtroBuscar: '#n_cuit'
    });

    $("#c_tipo_documento",formid).lupa_generica({
        id_lista:v_lista_documentos,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:350}],
        caption:'Tipos de Documento',
        sortname:'c_dato',
        sortorder:'asc',
        campos:{c_dato:'c_tipo_documento'},
        searchCode:true,
        searchInput: '#c_tipo_documento',
        keyNav:true,
        exactField: 'c_dato'
    });

    $("#d_denominacion",formid).lupa_generica({
        id_lista: v_lista_contribuyente,
        titulos:['Denominación','Id Contribuyente', 'Cuit', 'Tipo Doc.', 'Nro. Doc.'],
        grid:[  {index:'d_denominacion',width:430},
            {index:'id_contribuyente', width:80, hidden:true},
            {index:'n_cuit',width:100},
            {index:'c_tipo_documento',width:90},
            {index:'n_documento',width:100}
        ],
        caption:'Contribuyentes',
        campos:{d_denominacion:'d_denominacion', id_contribuyente:'id_contribuyente_tmp',
            n_cuit:'n_cuit', c_tipo_documento: 'c_tipo_documento', n_documento: 'n_documento'},
        filtros:['#d_denominacion'],
        filtrosNulos:[true],
        filtrosTitulos:['Denominación'],
        keyNav:true,
        exactField: 'd_denominacion',
        onClick:false,
        onKeydown:false
    });

    $("#c_tipo_respon",formid).lupa_generica({
        id_lista:v_lista_tipo_respon,
        titulos:['C&oacute;digo','Descripci&oacute;n', 'Tabla'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:350},
            {index:'n_tabla', width: 50, hidden:true}],
        caption:'Tipos de Responsabilidades',
        sortname:'c_dato',
        sortorder:'asc',
        campos:{c_dato:'c_tipo_respon', d_dato: 'd_tipo_resp', n_tabla: 'n_tabla_tipo_resp'},
        filtros:[$('#c_tributo').val(), $('#d_objeto_hecho').val()],
        filtrosTitulos:['Cod. Tributo', 'Objeto Hecho'],
        keyNav:true,
        exactField: 'c_tipo_respon'
    });
}

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

function valida_rango_fechas(formid) {
    var f_vig_hasta = $("#f_vig_hasta",formid).val();
    if (f_vig_hasta != "" && !compara_fechas($("#f_vig_desde",formid).val(), f_vig_hasta)){
        return false;
    }
    return true;
}

function participacion_valida(p_participacion) {
    return (parse(p_participacion) <= 100 && parse(p_participacion) >= 0);
}

function check_digito_verificador(param, digito) {
    $.ajax({
        url: "ingreso_copropietarios/php/consultas_ajax.php",
        type:"POST",
        dataType: "JSON",
        data:{ p_oper:'checkDigito', param: param},
        success: function (res) {
            $('#main').procOverlay({visible:false});
            if(res){
                if(res['DIGITO'] != digito){
                    mostrar_error('El Dígito Verificador no es correcto.');
                    /*$('#d_verif_dom, #d_verif_dom_ant').attr('readonly', false);*/
                    return;
                }
                else{
                    fun_completa_dominio();
                }
            }
            else{
                mostrar_error('Ocurrió un error al comprobar el Digito Verificador.');
            }
        }
    });
}

function limpia_cuit(cuit){
    var cuit_sin_guiones;
    var valida_cuit_completo = cuit.indexOf('_');
    if(valida_cuit_completo == -1 && cuit != ''){
        var aux = cuit.split('-');
        cuit_sin_guiones = aux[0]+aux[1]+aux[2];
    }
    return cuit_sin_guiones;
}

function lupas_modal() {
    $("#lupa_cuit", "#form_modificacion_datos").lupa_generica({
        id_lista: v_lista_contribuyente_cuit,
        titulos:['Denominación','Id Contribuyente', 'Cuit', 'Tipo Doc.', 'Nro. Doc.'],
        grid:[  {index:'d_denominacion',width:280},
            {index:'id_contribuyente', width:80, hidden:true},
            {index:'n_cuit',width:100},
            {index:'c_tipo_documento',width:90},
            {index:'n_documento',width:100}
        ],
        caption:'Contribuyentes',
        campos:{d_denominacion:'d_denominacion', id_contribuyente:'id_contribuyente',
            n_cuit:'n_cuit', c_tipo_documento: 'c_tipo_documento', n_documento: 'n_documento'},
        filtros:["#n_cuit"],
        filtrosNulos:[true],
        filtrosTitulos:['Cuit'],
        keyNav:true
    });

    $("#c_tipo_documento, #lupa_documento","#form_modificacion_datos").lupa_generica({
        id_lista:v_lista_documentos,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:350}],
        caption:'Tipos de Documento',
        sortname:'c_dato',
        sortorder:'asc',
        campos:{c_dato:'c_tipo_documento'},
        searchCode:true,
        searchInput: '#c_tipo_documento',
        keyNav:true,
        exactField: 'c_dato'
    });

    $("#d_denominacion, #lupa_denominacion","#form_modificacion_datos").lupa_generica({
        id_lista: v_lista_contribuyente,
        titulos:['Denominación','Id Contribuyente', 'Cuit', 'Tipo Doc.', 'Nro. Doc.'],
        grid:[  {index:'d_denominacion',width:430},
            {index:'id_contribuyente', width:80, hidden:true},
            {index:'n_cuit',width:100},
            {index:'c_tipo_documento',width:90},
            {index:'n_documento',width:100}
        ],
        caption:'Contribuyentes',
        campos:{d_denominacion:'d_denominacion', id_contribuyente:'id_contribuyente',
            n_cuit:'n_cuit', c_tipo_documento: 'c_tipo_documento', n_documento: 'n_documento'},
        filtros:['#d_denominacion'],
        filtrosNulos:[true],
        filtrosTitulos:['Denominación'],
        keyNav:true,
        exactField: 'd_denominacion'
    });

    $("#c_tipo_respon, #lupa_respon","#form_modificacion_datos").lupa_generica({
        id_lista:v_lista_tipo_respon,
        titulos:['C&oacute;digo','Descripci&oacute;n', 'Tabla'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:350},
            {index:'n_tabla', width: 50, hidden:true}],
        caption:'Tipos de Responsabilidades',
        sortname:'c_dato',
        sortorder:'asc',
        campos:{c_dato:'c_tipo_respon', d_dato: 'd_respon', n_tabla: 'n_tabla_tipo_resp'},
        filtros:[p_tributo, $('#d_objeto_hecho').val()],
        filtrosTitulos:['Cod. Tributo', 'Objeto Hecho'],
        keyNav:true,
        exactField: 'c_tipo_respon'
    });
}

function valida_seleccion_grilla(id_grid){
    var rowid = $(id_grid).getGridParam('selrow');
    if (rowid) {
        return rowid;
    }else{
        mostrar_validacion('Debe seleccionar un registro de la grilla para operar.');
        return false;
    }
}

function cargar_campos(rowid){
    $("input","#form_modificacion_datos").attr('disabled', false).val('');
    $(".btn_lupa" ,"#form_modificacion_datos").show();
    $("#btn_editar").attr('disabled', false);
    $("#n_cuit",'#form_modificacion_datos').val($("#tmp_coprop_grid").getCell(rowid,'n_cuit'));
    $("#c_tipo_documento",'#form_modificacion_datos').val($("#tmp_coprop_grid").getCell(rowid,'c_tipo_documento'));
    $("#n_documento",'#form_modificacion_datos').val($("#tmp_coprop_grid").getCell(rowid,'n_documento'));
    $("#d_denominacion",'#form_modificacion_datos').val($("#tmp_coprop_grid").getCell(rowid,'d_denominacion'));
    $("#c_tipo_respon",'#form_modificacion_datos').val($("#tmp_coprop_grid").getCell(rowid,'c_tipo_respon'));
    $("#d_respon",'#form_modificacion_datos').val($("#tmp_coprop_grid").getCell(rowid,'d_tipo_resp')).attr('disabled',true);
    $("#p_participacion",'#form_modificacion_datos').val($("#tmp_coprop_grid").getCell(rowid,'p_participacion'));
    $("#f_vig_desde",'#form_modificacion_datos').val($("#tmp_coprop_grid").getCell(rowid,'f_vig_desde'));
    $("#f_vig_hasta",'#form_modificacion_datos').val($("#tmp_coprop_grid").getCell(rowid,'f_vig_hasta'));

    $("#id_contribuyente",'#form_modificacion_datos').val($("#tmp_coprop_grid").getCell(rowid,'id_contribuyente_tmp'));
    $("#rid",'#form_modificacion_datos').val($("#tmp_coprop_grid").getCell(rowid,'rid'));

    var m_tocar = $("#tmp_coprop_grid").getCell(rowid,'m_tocar');
    if (m_tocar == 'N') {
        $('input', '#form_modificacion_datos').attr('disabled', true);
        $(".btn_lupa" ,"#form_modificacion_datos").hide();
        if ($('#c_tipo_respon', '#form_modificacion_datos').val() == v_cod) { //v_cod = 6
            $('#p_participacion', '#form_modificacion_datos').attr('disabled', false);
        }
        else{
            $("#btn_editar").attr('disabled', true);
        }
    }
    else {
        if ($('#c_tipo_respon', '#form_modificacion_datos').val() == v_pro){ //v_pro = 4
            $('input', '#form_modificacion_datos').attr('disabled', true);
            $(".btn_lupa" ,"#form_modificacion_datos").hide();
            $('#p_participacion', '#form_modificacion_datos').attr('disabled', false);
        }
    }
}

function fun_cargar_tmp(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_n_sesion":p_n_sesion,
            "p_c_tributo":p_tributo,
            "p_d_objeto_hecho":$('#d_objeto_hecho').val(),
            "p_modo":p_modo,
            "id_menu":10953,
            "n_orden":1
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#main').procOverlay({visible:false});
                if (data.p_cantidad === 0){
                    mostrar_mensaje('Atención','No se han encontrado registros asociados a la búsqueda.');
                }else{
                    setea_parametros('#tmp_coprop_grid',
                        {':p_n_sesion': p_n_sesion});
                    $('#modal_coprop').modal('show');
                }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function fun_completa_dominio(){
    var params = {p_oper:'getDominio'};
    if ($('#d_objeto_hecho').val()){
        params.dominio = $('#d_objeto_hecho').val();
        params.obtener = 'patente_vieja';
    }else if($('#d_patente_vieja').val()){
        params.dominio = $('#d_patente_vieja').val();
        params.obtener = 'patente';
    }

    $.ajax({
        url: "ingreso_copropietarios/php/consultas_ajax.php",
        type:"POST",
        dataType: "JSON",
        data:params,
        success: function (res) {
            $('#main').procOverlay({visible:false});
            if(res){
                if(params.obtener == 'patente_vieja'){
                    $('#d_patente_vieja').val(res['OBJETO']);
                    $('#d_verif_dom_ant').val(res['DIGITO']);
                }else if(params.obtener == 'patente'){
                    $('#d_objeto_hecho').val(res['OBJETO']);
                    $('#d_verif_dom').val(res['DIGITO']);
                }
                $('#div_input_objeto, #div_input_nomenclatura, #div_input_patente_vieja').addClass('lupa_oculta').removeClass('input-group');
                $('#div_input_objeto .btn_lupa, #div_input_nomenclatura .btn_lupa,#div_input_patente_vieja .btn_lupa').hide();
                $('#d_objeto_hecho').attr('readonly', true);
                $('#d_verif_dom, #d_patente_vieja, #d_verif_dom_ant').attr('readonly', true);
                $('#d_nomenclatura').attr('readonly', true);
                setea_parametros('#ingreso_coprop_grid',
                    {':p_modo':p_modo,
                        ':p_tributo': p_tributo,
                        ':p_objeto': $('#d_objeto_hecho').val()});
            }
            else{
                mostrar_error('Ocurrió un error al obtener los datos de los dominios.');
            }
        }
    });
}