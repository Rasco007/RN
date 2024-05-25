function inicializarLupas() {
    $("#btn_lupa_tributo").lupa_generica({
        id_lista:v_lista_tributos,
        titulos:['Código','Descripción','Tipo Imponible'],
        grid:[  {index:'c_tributo',width:100},
            {index:'d_descrip',width:450},
            {index:'c_tipo_imponible',width:450,hidden:true}],
        caption:'Tributos',
        sortname:'c_tributo',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_tributo',
        exactField: 'c_tributo',
        filtros:["#id_contribuyente"],
        filtroNull:true,
        filtrosTitulos:["Contribuyente"],
        campos:{c_tributo:'c_tributo',d_descrip:'d_tributo',c_tipo_imponible:'c_tipo_imponible_destino'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose:function(){
            $("#d_objeto_hecho").val('');
        }
    });

    $("#btn_lupa_tributo_destino").lupa_generica({
        id_lista:v_lista_tributos_destino,
        titulos:['Código','Descripción','Tipo Imponible'],
        grid:[  {index:'c_tributo',width:100},
            {index:'d_descrip',width:450},
            {index:'c_tipo_imponible',width:450,hidden:true}],
        caption:'Tributos Destino',
        sortname:'c_tributo',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_tributo_destino',
        exactField: 'c_tributo',
        filtros:["#id_contribuyente_destino"],
        filtrosTitulos:["CUIT Destino"],
        filtroNull:true,
        campos:{c_tributo:'c_tributo_destino',d_descrip:'d_tributo_destino',c_tipo_imponible:'c_tipo_imponible_destino'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose:function(){
            $("#d_objeto_hecho_destino").val('');
        }
    });

    $("#btn_lupa_objeto").lupa_generica({
        id_lista:v_lista_objetos_destino,
        titulos:['Objeto'],
        grid:[  {index:'d_objeto_hecho',width:200}],
        caption:'Objetos',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        filtros:['#c_tributo',null,'#id_contribuyente'],
        filtrosNulos:[false,true,true],
        filtrosTitulos:['Tributo','Tipo Imponible','CUIT'],
        campos:{d_objeto_hecho:'d_objeto_hecho'},
        keyNav:true,
        foco:"#d_label",
        onClose:function(){
            if($("#d_objeto_hecho").val() && $("#c_tributo").val()){
                completarObjeto();
            }
        }
    });

    $("#btn_lupa_objeto_destino").lupa_generica({
        id_lista:v_lista_objetos_destino,
        titulos:['Objeto'],
        grid:[  {index:'d_objeto_hecho',width:200}],
        caption:'Objetos',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        filtros:['#c_tributo_destino','#c_tipo_imponible_destino','#id_contribuyente_destino'],
        filtrosTitulos:['Tributo Destino','Tipo Imponible Destino','CUIT Destino'],
        filtrosNulos:[false,true,true],
        campos:{d_objeto_hecho:'d_objeto_hecho_destino'},
        keyNav:true,
        foco:"#d_label"
    });
}

function completarObjeto(destino){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "gen_nota_credito/autocomplete.php",
        type:"POST",
        data:{
            p_oper:'getDatos',
            p_id_menu: v_id_menu,
            p_id_contribuyente: $("#id_contribuyente"+destino).val(),
            p_c_tributo: $("#c_tributo"+destino).val(),
            p_d_objeto_hecho: $('#d_objeto_hecho'+destino).val()
        },
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res.resultado == 'OK'){
                if (res.error){
                    mostrar_error(res.error);
                }else{
                    $("#n_cuit").val(res.n_cuit);
                    $("#d_denominacion").val(res.d_denominacion);
                    $("#id_contribuyente").val(res.id_contribuyente);
                }
            }else {
                mostrar_validacion(res.error);
            }
        }
    });
}

function completarDenominacion(destino){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit'+destino).val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "gen_nota_credito/autocomplete.php",
        type:"POST",
        data:{  p_oper:'getDenominacion',p_filtro: cuit_sin_guiones},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res){
                $("#d_denominacion"+destino).val(res['DENOMINACION']);
                $("#id_contribuyente"+destino).val(res['ID_CONTRIBUYENTE']);
            }else{
                $("#n_cuit"+destino).val(null);
                $("#d_denominacion"+destino).val(null);
                $("#id_contribuyente"+destino).val(null);
            }
        }
    });
}

function deshabilita_campos(v_o_f){
    $("#btn_buscar").attr('disabled',v_o_f);
    $(".limpiar", '#frm_consulta').attr('readonly',v_o_f);
    $(".limpiar", '#frm_consulta').attr('disabled',v_o_f);
    if (v_o_f){
        $(".btn_lupa").hide();
    }else{
        $(".btn_lupa").show();
    }
}

function puebla_main_grid(){
    // lleno la tabla TMP_GEN_NOTA_CRED
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_c_tributo":$("#c_tributo").val(),
            "p_d_objeto_hecho":$("#d_objeto_hecho").val(),
            "id_menu":v_id_menu,
            "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                if(data.p_n_insertados > 0){
                    deshabilita_campos(true);
                    v_id_sesion = data.p_id_sesion;
                    setea_parametros('#main_grid',{':id_sesion':v_id_sesion},'S');
                    $("#div_obligaciones").show();
                    $(window).resize();
                    $("#btn_lupa_tributo_destino, #btn_lupa_objeto_destino").show();
                    $("#id_contribuyente_destino").val($('#id_contribuyente').val());
                    $("#n_cuit_destino").val($("#n_cuit").val());
                    $("#d_denominacion_destino").val($("#d_denominacion").val());
                    $("#c_tributo_destino").val($("#c_tributo").val());
                    $("#d_tributo_destino").val($("#d_tributo").val());
                    $("#d_objeto_hecho_destino").val($("#d_objeto_hecho").val());
                    if ($('#c_tributo').val() == 160){
                        $("#c_tributo_destino, #d_tributo_destino").attr('disabled',true);
                        $("#btn_lupa_tributo_destino").hide();
                    }
                }else{
                    mostrar_validacion('No se encontraron obligaciones con saldo a favor.');
                }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function aplicar_credito(){
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            'p_c_tributo_origen': $("#c_tributo").val(),
            'p_d_objeto_origen': $("#d_objeto_hecho").val(),
            "p_c_tipo_imponible_destino": $("#c_tipo_imponible_destino").val(),
            'p_c_tributo_destino': $("#c_tributo_destino").val(),
            'p_d_objeto_destino': $("#d_objeto_hecho_destino").val(),
            "p_d_observaciones": $("#d_observaciones").val(),
            "p_id_sesion": v_id_sesion,
            "id_menu": v_id_menu,
            "n_orden": 1
        },
        dataType: 'json',
        success: function(data) {
            if (data.resultado == 'OK') {
                mostrar_confirmacion('Se ha generado Nota de Crédito correctamente.');
                $("#btn_limpiar").click();
            } else {
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}