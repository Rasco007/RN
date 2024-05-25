function inicializa_lupas(){
    $("#btn_lupa_concepto").lupa_generica({
        id_lista:v_lista_conceptos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_concepto',width:100},
            {index:'d_concepto',width:450}],
        caption:'Conceptos',
        sortname:'c_concepto',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_concepto',
        exactField: 'c_concepto',
        filtros:['#c_tributo'],
        campos:{c_concepto:'c_concepto',d_concepto:'d_concepto'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label"
    });

    $("#btn_lupa_region").lupa_generica({
        id_lista:v_lista_regiones,
        titulos:['Código','Descripcion'],
        grid:[  {index:'c_region',width:100},
            {index:'d_dato',width:450}],
        caption:'Regiones',
        sortname:'d_dato',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_region',
        exactField: 'c_region',
        campos:{c_region:'c_region',d_dato:'d_region'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose: function(){
            $("#c_area, #d_area").val('');
        }
    });

    $("#btn_lupa_area").lupa_generica({
        id_lista:v_lista_areas,
        titulos:['Código','Descripcion'],
        grid:[  {index:'c_area',width:100},
            {index:'d_dato',width:450}],
        caption:'Áreas',
        sortname:'d_dato',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_area',
        exactField: 'c_area',
        filtros:['#c_region'],
        filtrosTitulos:['Región'],
        campos:{c_area:'c_area',d_dato:'d_area'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label"
    });

    $("#btn_lupa_objeto").lupa_generica({
        id_lista:v_lista_objetos,
        titulos:['Objeto','id_contribuyente','CUIT','Denominación'],
        grid:[{index:'d_objeto_hecho',width:100},
            {index:'id_contribuyente',width:100,hidden:true},
            {index:'n_cuit',width:100},
            {index:'d_denominacion',width:300}],
        caption:'Objetos',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        filtros:['#id_contribuyente'],
        filtrosNulos:[true],
        filtrosTitulos:['Contribuyente'],
        campos:{d_objeto_hecho:'d_objeto',id_contribuyente:'id_contribuyente',
            n_cuit:'n_cuit',d_denominacion:'d_denominacion'},
        keyNav:true,
        foco:"#d_label"
    });
}

function fun_muestra_datos_contrib(){
    if($("#m_individual").is(":checked")){
        $('#div_datos_contrib').show();
        $(".datos_contrib").addClass('validate[required]');
    }else{
        $('#div_datos_contrib').hide();
        $("#n_cuit, #id_contribuyente, #d_denominacion").val(null);
        $(".datos_contrib").removeClass('validate[required]');
    }
}

function autocompletecuitdenominacion(){
    //Completamos Datos del Contribuyente
    $("#d_denominacion").autocomplete({
        source: function( request, response ) {

            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "gen_obligaciones_canon/autocomplete.php",
                    data: {p_oper:'getAutocomplete',p_filtro: request.term},
                    dataType: 'json',
                    success: function( data ) {
                        ajax_autocomplete = null;
                        if(data) {
                            response(
                                $.map(data.data_contrib, function( item ) {
                                    return {
                                        label: item.label,
                                        value: item.razon_social,
                                        cuit: item.cuit,
                                        id_contribuyente: item.id_contribuyente
                                    }
                                })
                            );
                        }
                    }
                });
        },
        minLength:1,
        select:function(event,ui){
            $("#d_denominacion").val(ui.item.value);
            $("#n_cuit").val(ui.item.cuit);
            $("#id_contribuyente").val(ui.item.id_contribuyente);
            return false;
        }
    });

    $("#n_cuit").mask("99-99999999-9");
    $('#n_cuit').change(function (){
        if ($('#n_cuit').val() && $('#n_cuit').val().length == 13){
            completarDenominacion();
        }else{
            $("#d_denominacion").val(null);
            $("#n_cuit").val(null);
            $("#id_contribuyente").val(null);
            $("#d_objeto").val('');
        }
    });
}

function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "gen_obligaciones_canon/autocomplete.php",
        type:"POST",
        data:{  p_oper:'getContribuyente',p_filtro: cuit_sin_guiones},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res){
                $("#d_denominacion").val(res['DENOMINACION']);
                $("#id_contribuyente").val(res['ID_CONTRIBUYENTE']);
                $("#d_objeto").val('');
            }else{
                $("#d_denominacion").val(null);
                $("#id_contribuyente").val(null);
                $("#d_objeto").val('');
            }
        }
    });
}

function fun_valida_posiciones(){
    var v_pos_desde = parse($("#n_cuota").val());
    
    if(v_pos_desde > 12){
        mostrar_validacion('Verifique la cuota ingresada, no pueden ser mayor a 12.');
        return false;
    }
    return true;
}

function fun_mostrar_errores(c_error){
    setea_parametros("#grid_errores",{':c_codigo_error':c_error});
    $("#modal_errores").modal('show');
    $(window).resize();
}

function msj_obligs_generadas(data){
    return 'Se generaron correctamente '+data.p_n_cant_gen+' de '+data.p_n_cant_tot+' obligaciones.<br>'+
        'Importe total de las obligaciones generadas: '+redondear(data.p_i_total,2)+'<br>'+
        'Importe correspondiente a Red Principal: '+redondear(data.p_i_red_prin,2)+'<br>'+
        'Importe correspondiente a Red Secundaria: '+redondear(data.p_i_red_secu,2)+'<br>'+
        'Importe correspondiente a Mejora de Red Principal: '+redondear(data.p_i_mejora_prin,2)+'<br>'+
        'Importe correspondiente a Mejora de Red Secundaria: '+redondear(data.p_i_mejora_secu,2)+'<br>'+
        'Importe correspondiente a Regalías: '+redondear(data.p_i_regalias,2);
}