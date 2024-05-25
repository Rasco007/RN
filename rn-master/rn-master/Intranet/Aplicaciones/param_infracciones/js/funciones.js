function inicializa_lupas_main_grid(formid){
    $('#d_ente',formid).lupa_generica({
        titulos:['Código','Descripcion'],
        grid:[  {index:'c_ente',width:100},
            {index:'d_ente',width:450}],
        caption:'Entes',
        sortname:'d_ente',
        sortorder:'asc',
        campos:{c_ente:'c_ente',d_ente:'d_ente'},
        keyNav:true,
        foco:"#d_label"
    });

    $('#d_concepto_cc',formid).lupa_generica({
        titulos:['Código','Descripcion'],
        grid:[  {index:'c_concepto',width:100},
            {index:'d_concepto',width:450}],
        caption:'Conceptos',
        sortname:'d_concepto',
        sortorder:'asc',
        filtros:[100],
        campos:{c_concepto:'c_concepto_cc',d_concepto:'d_concepto_cc'},
        keyNav:true,
        foco:"#d_label"
    });
}

function inicializa_lupas_second_grid(formid){
    $('#d_tributo',formid).lupa_generica({
        titulos:['Código','Descripcion'],
        grid:[  {index:'c_dato',width:100},
            {index:'d_dato',width:450}],
        caption:'Tributos',
        sortname:'d_dato',
        sortorder:'asc',
        campos:{c_dato:'c_tributo',d_dato:'d_tributo'},
        keyNav:true,
        foco:"#d_label",
        onClose: function(){
            $('#d_concepto, #d_regimen',formid).val('');
        }
    });

    $('#d_concepto',formid).lupa_generica({
        titulos:['Código','Descripcion'],
        grid:[  {index:'c_concepto',width:100},
            {index:'d_concepto',width:450}],
        caption:'Conceptos',
        sortname:'d_concepto',
        sortorder:'asc',
        filtros:["#c_tributo"],
        filtrosTitulos: ["Tributo"],
        campos:{c_concepto:'c_concepto',d_concepto:'d_concepto'},
        keyNav:true,
        foco:"#d_label"
    });

    $('#d_regimen',formid).lupa_generica({
        titulos:['Código','Descripcion'],
        grid:[  {index:'c_dato',width:100},
            {index:'d_dato',width:450}],
        caption:'Regímenes',
        sortname:'d_dato',
        sortorder:'asc',
        filtros:["#c_tributo"],
        filtrosTitulos: ["Tributo"],
        campos:{c_dato:'c_regimen',d_dato:'d_regimen'},
        keyNav:true,
        foco:"#d_label"
    });
}

function inicializa_lupas(){
    $("#btn_lupa_infraccion").lupa_generica({
        id_lista:v_lista_infracciones,
        titulos:['Código','Descripcion'],
        grid:[  {index:'id_infraccion',width:100},
            {index:'d_infraccion',width:450}],
        caption:'Infracciones',
        sortname:'id_infraccion',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_infraccion',
        exactField: 'id_infraccion',
        campos:{id_infraccion:'c_infraccion',d_infraccion:'d_infraccion'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label"
    });

    $("#btn_lupa_ente").lupa_generica({
        id_lista:v_lista_entes,
        titulos:['Código','Descripcion'],
        grid:[  {index:'c_ente',width:100},
            {index:'d_ente',width:450}],
        caption:'Entes',
        sortname:'c_ente',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_ente',
        exactField: 'c_ente',
        campos:{c_ente:'c_ente',d_ente:'d_ente'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label"
    });
}

function mayusculas(e) {
    e.value = e.value.toUpperCase();
}

function set_fechas_min_max(formid){
    $("#f_vig_desde",formid).datepicker("option","onClose", function (selectedDate,obj) {
        $("#f_vig_hasta",formid).datepicker("option", "minDate", selectedDate);
    });
    
    $("#f_vig_hasta",formid).datepicker("option", "minDate", $("#f_vig_desde",formid).val());

    $("#f_vig_hasta",formid).datepicker("option","onClose", function (selectedDate,obj) {
        $("#f_vig_desde",formid).datepicker("option", "maxDate", selectedDate);
    });

    $("#f_vig_desde",formid).datepicker("option", "maxDate", $("#f_vig_hasta",formid).val());
}

function valida_fechas(formid){
    var f_desde = $("#f_vig_desde",formid).val();
    var f_hasta = $("#f_vig_hasta",formid).val();

    if(f_desde != "" && f_hasta != ""){
        return f_desde <= f_hasta;
    }else{
        return true;
    }
}

function compara_desde_hasta(numero_desde,numero_hasta){
    return numero_desde <= numero_hasta;
}

function deshabilita_campos(v_o_f){
    $(".limpiar","#frm_consulta").attr('readonly',v_o_f);
    $(".datepicker, .btn_lupa","#frm_consulta").attr('disabled',v_o_f);
}

function bloquear_importes(){
    $("#i_monto_fijo").focusout(function(){
        if($("#i_monto_fijo").val() != ""){
            $("#i_monto_fijo_desde, #i_monto_fijo_hasta, #p_monto_fijo, #p_monto_fijo_desde, #p_monto_fijo_hasta").val('');
            $("#i_monto_fijo_desde, #i_monto_fijo_hasta, #p_monto_fijo, #p_monto_fijo_desde, #p_monto_fijo_hasta").attr('disabled',true);
        }else{
            if($("#i_monto_fijo_desde").val() != "" || $("#i_monto_fijo_hasta").val() != ""){
                $("#i_monto_fijo_desde, #i_monto_fijo_hasta").attr('disabled',false);
            }else{
                $("#i_monto_fijo_desde, #i_monto_fijo_hasta").attr('disabled',true);
                if($("#i_monto_fijo").val()=="" && $("#i_monto_fijo_desde").val()=="" && $("#i_monto_fijo_hasta").val()=="" 
                    && $("#p_monto_fijo").val()=="" && $("#p_monto_fijo_desde").val()=="" && $("#p_monto_fijo_hasta").val()==""){
                        $("#i_monto_fijo, #i_monto_fijo_desde, #i_monto_fijo_hasta, #p_monto_fijo, #p_monto_fijo_desde, #p_monto_fijo_hasta").attr('disabled',false);
                }
            }
        }
    });

    $("#i_monto_fijo_desde, #i_monto_fijo_hasta").focusout(function(){
        if($("#i_monto_fijo_desde").val() != "" || $("#i_monto_fijo_hasta").val() != ""){
            $("#i_monto_fijo, #p_monto_fijo, #p_monto_fijo_desde, #p_monto_fijo_hasta").val('');
            $("#i_monto_fijo, #p_monto_fijo, #p_monto_fijo_desde, #p_monto_fijo_hasta").attr('disabled',true);
        }else{
            if($("#i_monto_fijo").val() != ""){
                $("#i_monto_fijo").attr('disabled',false);
            }else{
                $("#i_monto_fijo").attr('disabled',true);
                if($("#i_monto_fijo").val()=="" && $("#i_monto_fijo_desde").val()=="" && $("#i_monto_fijo_hasta").val()=="" 
                    && $("#p_monto_fijo").val()=="" && $("#p_monto_fijo_desde").val()=="" && $("#p_monto_fijo_hasta").val()==""){
                        $("#i_monto_fijo, #i_monto_fijo_desde, #i_monto_fijo_hasta, #p_monto_fijo, #p_monto_fijo_desde, #p_monto_fijo_hasta").attr('disabled',false);
                }
            }
        }
    });
}

function bloquear_porcentajes(){
    $("#p_monto_fijo").focusout(function(){
        if($("#p_monto_fijo").val() != ""){
            $("#p_monto_fijo_desde, #p_monto_fijo_hasta, #i_monto_fijo, #i_monto_fijo_desde, #i_monto_fijo_hasta").val('');
            $("#p_monto_fijo_desde, #p_monto_fijo_hasta, #i_monto_fijo, #i_monto_fijo_desde, #i_monto_fijo_hasta").attr('disabled',true);
        }else{
            if($("#p_monto_fijo_desde").val() != "" || $("#p_monto_fijo_hasta").val() != ""){
                $("#p_monto_fijo_desde, #p_monto_fijo_hasta").attr('disabled',false);
            }else{
                $("#p_monto_fijo_desde, #p_monto_fijo_hasta").attr('disabled',true);
                if($("#i_monto_fijo").val()=="" && $("#i_monto_fijo_desde").val()=="" && $("#i_monto_fijo_hasta").val()=="" 
                    && $("#p_monto_fijo").val()=="" && $("#p_monto_fijo_desde").val()=="" && $("#p_monto_fijo_hasta").val()==""){
                        $("#i_monto_fijo, #i_monto_fijo_desde, #i_monto_fijo_hasta, #p_monto_fijo, #p_monto_fijo_desde, #p_monto_fijo_hasta").attr('disabled',false);
                }
            }
        }
    });

    $("#p_monto_fijo_desde, #p_monto_fijo_hasta").focusout(function(){
        if($("#p_monto_fijo_desde").val() != "" || $("#p_monto_fijo_hasta").val() != ""){
            $("#p_monto_fijo, #i_monto_fijo, #i_monto_fijo_desde, #i_monto_fijo_hasta").val('');
            $("#p_monto_fijo, #i_monto_fijo, #i_monto_fijo_desde, #i_monto_fijo_hasta").attr('disabled',true);
        }else{
            if($("#p_monto_fijo").val() != ""){
                $("#p_monto_fijo").attr('disabled',false);
            }else{
                $("#p_monto_fijo").attr('disabled',true);
                if($("#i_monto_fijo").val()=="" && $("#i_monto_fijo_desde").val()=="" && $("#i_monto_fijo_hasta").val()=="" 
                    && $("#p_monto_fijo").val()=="" && $("#p_monto_fijo_desde").val()=="" && $("#p_monto_fijo_hasta").val()==""){
                        $("#i_monto_fijo, #i_monto_fijo_desde, #i_monto_fijo_hasta, #p_monto_fijo, #p_monto_fijo_desde, #p_monto_fijo_hasta").attr('disabled',false);
                }
            }
        }
    });
}

function solicitar_dias_dto_vto(){
    // solicitar dias de reduccion y dias de vencimiento
    $("#p_descuento_vto").focusout(function(){
        if($("#p_descuento_vto").val() != ""){
            $("#n_dias_reducc, #n_dias_vto").addClass('validate[required,minSize[1]]');
            $("#tr_n_dias_reducc td label").html("Días de Reducción (*)");
            $("#tr_n_dias_vto td label").html("Días de Vencimiento (*)");
        }else{
            $("#n_dias_reducc, #n_dias_vto").removeClass('validate[required,minSize[1]]');
            $("#tr_n_dias_reducc td label").html("Días de Reducción");
            $("#tr_n_dias_vto td label").html("Días de Vencimiento");
        }
    });
}

