function inicializarLupas() {
    $("#btn_lupa_consorcio").lupa_generica({
        id_lista:v_lista_consorcios,
        titulos:['Código','Descripción','Ente'],
        grid:[  {index:'c_organismo',width:100},
            {index:'d_dato',width:450},
            {index:'c_ente',width:100,hidden:true}],
        caption:'Consorcios',
        sortname:'c_organismo',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_organismo',
        exactField: 'c_organismo',
        campos:{c_organismo:'c_organismo',d_dato:'d_organismo',c_ente:'c_ente'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose:function(){
            $("#c_region,#d_region,#c_area,#d_area").val('');
        }
    });

    $("#btn_lupa_region").lupa_generica({
        id_lista:v_lista_regiones_consorcio,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_region',width:100},
            {index:'d_dato',width:450}],
        caption:'Regiones',
        sortname:'c_region',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_region',
        exactField: 'c_region',
        filtros:['#c_organismo'],
        filtrosNulos:[true],
        filtrosTitulos:['Consorcio'],
        campos:{c_region:'c_region',d_dato:'d_region'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose:function(){
            $("#c_area,#d_area,#n_partida,.nomen").val("");
        }
    });

    $("#btn_lupa_area").lupa_generica({
        id_lista:v_lista_areas_consorcio,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_area',width:100},
            {index:'d_dato',width:450}],
        caption:'Áreas',
        sortname:'c_area',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_area',
        exactField: 'c_area',
        filtros:['#c_organismo','#c_region'],
        filtrosNulos:[true,false],
        filtrosTitulos:['Consorcio','Región'],
        campos:{c_area:'c_area',d_dato:'d_area'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose:function(){
            $("#n_partida,.nomen").val("");
        }
    });

    $("#btn_lupa_regante").lupa_generica({
        id_lista:v_lista_regantes,
        titulos:['Regante / Parcela','CUIT','Denominación','Partida','Nomenclatura'],
        grid:[  {index:'n_regante',width:125},
            {index:'n_cuit',width:100},
            {index:'d_denominacion',width:150},
            {index:'objeto',width:100},
            {index:'nomenclatura',width:125}],
        caption:'Regante / Parcela',
        sortname:'n_regante, objeto',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#n_regante',
        exactField: 'n_regante',
        filtros: v_filtros_lista_regantes,
        filtrosTitulos: v_filtros_titulos_lista_regantes,
        filtrosNulos: v_filtros_null_lista_regantes,
        campos:{n_regante:'n_regante',n_cuit:'n_cuit',d_denominacion:'d_denominacion',d_objeto:'n_partida'},
        keyNav:true,
        foco:"#d_label",
        onClose:function(){
            if (!$('#n_regante').val()){
                $('#n_partida, .nomen').val('');
                $('#n_partida, .nomen').attr('disabled',false);
            } else {
                $('#main').procOverlay({visible:true});
                $.ajax({
                    url: "cons_deuda_partida/autocomplete.php",
                    type:"POST",
                    data:{
                        p_oper:'getDatos',
                        p_id_menu: v_id_menu,
                        p_c_organismo: $("#c_organismo").val(),
                        p_id_contribuyente: $("#id_contribuyente").val(),
                        p_n_regante: $('#n_regante').val()
                    },
                    success: function(response)
                    {
                        $('#main').procOverlay({visible:false});
                        res = JSON.parse(response);
                        if (res.resultado == 'OK'){
                            if (res.error){
                                mostrar_error(res.error);
                            }else{
                                if(m_filtros_consorcio == 1){
                                    $("#id_contribuyente").val(res.id_contribuyente);
                                    $("#n_cuit").val(res.n_cuit);
                                    $("#d_denominacion").val(res.d_denominacion);
                                }
                                $('#n_partida').val(res.objeto);
                                $('#departamento').val(res.departamento);
                                $('#circunscripcion').val(res.circunscripcion);
                                $('#seccion').val(res.seccion);
                                $('#u_caracteristica').val(res.u_caracteristica);
                                $('#parcela').val(res.parcela);
                                $('#u_funcional').val(res.u_funcional);
                                $("#n_partida, .nomen").attr('disabled',true);
                            }
                        }else {
                            mostrar_validacion(res.error);
                        }
                    }
                });
            }
        }
    });

    $("#btn_lupa_partida").lupa_generica({
        id_lista:v_lista_partidas,
        titulos:['Número'],
        grid: v_grid,
        caption:'Partidas',
        sortname: v_sort_partidas,
        sortorder:'asc',
        // exactField: 'n_partida',
        filtros: v_filtros_lista_partidas,
        filtrosTitulos: v_filtros_titulos_lista_partidas,
        filtrosNulos: v_filtros_null_lista_partidas,
        campos: v_campos,
        keyNav:true,
        foco:"#d_label",
        onClose:function(){
            autocomplete_por_partida();
        }
    });
}

function autocomplete_por_partida(){
    if (!$('#n_partida').val()){
        $('#n_regante').val('');
        $('.nomen').val('');
        $('.nomen').attr('disabled',false);
        $("#btn_lupa_regante").show();
    } else {
        $('#main').procOverlay({visible:true});
        $.ajax({
            url: "cons_deuda_partida/autocomplete.php",
            type:"POST",
            data:{
                p_oper:'getDatos',
                p_id_menu: v_id_menu,
                p_c_organismo: $("#c_organismo").val(),
                p_id_contribuyente: $("#id_contribuyente").val(),
                p_n_partida: $('#n_partida').val()
            },
            success: function(response)
            {
                $('#main').procOverlay({visible:false});
                res = JSON.parse(response);
                if (res.resultado == 'OK'){
                    if (res.error){
                        mostrar_error(res.error);
                    }else{
                        $("#id_contribuyente").val(res.id_contribuyente);
                        $("#n_cuit").val(res.n_cuit);
                        $("#d_denominacion").val(res.d_denominacion);
                        $('#departamento').val(res.departamento);
                        $('#circunscripcion').val(res.circunscripcion);
                        $('#seccion').val(res.seccion);
                        $('#u_caracteristica').val(res.u_caracteristica);
                        $('#parcela').val(res.parcela);
                        $('#u_funcional').val(res.u_funcional);
                        $('.nomen').attr('disabled',true);
                        $("#n_regante").val(res.n_regante);
                        $("#btn_lupa_regante").hide();
                    }
                }else {
                    mostrar_validacion(res.error);
                }
            }
        });
    }
}

function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "cons_deuda_partida/autocomplete.php",
        type:"POST",
        data:{  p_oper:'getContribuyente',p_filtro: cuit_sin_guiones,p_c_organismo: $('#c_organismo').val()},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res){
                $("#d_denominacion").val(res['DENOMINACION']);
                $("#id_contribuyente").val(res['ID_CONTRIBUYENTE']);
                $('#n_regante, #n_partida, .nomen').val('');
                $("#btn_lupa_regante").show();
                $('#n_partida, .nomen').attr('disabled',false);
            }else{
                $("#d_denominacion").val(null);
                $("#id_contribuyente").val(null);
            }
        }
    });
}

function fun_devuelve_nomenclatura(formid){
    if($("#departamento",formid).val()=="" && $("#circunscripcion",formid).val()=="" && $("#seccion",formid).val()=="" && $("#u_caracteristica",formid).val()=="" && $("#parcela",formid).val()=="" && $("#u_funcional",formid).val()==""){
        return null;
    }else{
        return $("#departamento",formid).val() +'-'+ $("#circunscripcion",formid).val() +'-'+ $("#seccion",formid).val() +'-'+ $("#u_caracteristica",formid).val() +'-'+ $("#parcela",formid).val() +'-'+ $("#u_funcional",formid).val();
    }
}

function deshabilita_campos(v_o_f){
    $(".limpiar",'#frm_consulta').attr('readonly',v_o_f);
    $(".limpiar",'#frm_consulta').attr('disabled',v_o_f);
    if (v_o_f){
        $(".btn_lupa").hide();
    }else{
        $(".btn_lupa").show();
    }
    if(m_filtros_consorcio){
        $(".filtros_contribuyente input").attr('readonly',v_o_f);
        if(!v_o_f){$(".filtros_contribuyente input").val('');}
    }else{
        $(".filtros_contribuyente input").attr('readonly',true);
    }
    $("#c_deuda, .datepicker").attr('disabled',v_o_f);
}