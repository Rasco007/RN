function init_eventos() {

    $("#n_cuit").mask("99-99999999-9");

    $("#d_denominacion").autocomplete({
        source: function( request, response ) {
            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "legajo_contribuyente/php/autocomplete.php",
                    data: {p_oper:'denominacion', filtro: request.term},
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

    $('#n_cuit').change(function(){
        n_cuit_focusout();
    });

    $("#btn_limpiar").click(function(){
        id_contribuyente = null;
        $(".limpiar").attr('readonly',false);
        $(".btn_lupa").show();
        $("#btn_consultar").attr('disabled',false);
        $("#frm_busqueda input").val(null);
        $("#planes_grid").jqGrid('clearGridData');
        $("#tabs").hide();
    });

    $("#btn_consultar").click(function(){
        if($('#frm_busqueda').validationEngine('validate')){
            $(".limpiar").attr('readonly',true);
            $(".btn_lupa").hide();
            $("#btn_consultar").attr('disabled',true);
            id_contribuyente = $("#id_contribuyente").val();
            setea_parametros('#planes_grid',{
                ':id_contribuyente':id_contribuyente,
                ':c_tributo': $("#c_tributo").val(),
                ':c_tipo_imponible': $("#c_tipo_imponible").val(),
                ':d_objeto_hecho': $("#d_objeto").val()}
            );
            inicializa_grillas_tabs();
        }
    });

    // solucion para visualizar correctamente grillas en los tabs
    $("#tabs > ul > li").hover(function(){
        $(window).resize();
    });
    $("#tabs > ul > li").click(function(){
        $(window).resize();
    });

    // botones con acciones segun registro seleccionado en la grilla planes_grid
    $("#btn_const_plan").click(function(){
        evento_boton("btn_const_plan");
    });

    $("#btn_honorarios").click(function(){
        evento_boton("btn_honorarios");
    });

    $("#btn_emitir_chequera").click(function(){
        evento_boton("btn_emitir_chequera");
    });

    $("#btn_contrato").click(function(){
        evento_boton("btn_contrato");
    });

    $("#btn_const_cad").click(function(){
        evento_boton("btn_const_cad");
    });

    $("#btn_contrato_pdf").click(function(){
        evento_boton("btn_contrato_pdf");
    });

    ////////////////////////////////////////// LUPAS //////////////////////////////////////////
    $("#lupa_c_tributo").lupa_generica({
        id_lista: lista_tributos_planes,
        titulos:['C&oacute;digo','Descripci&oacute;n','c_tipo_imponible','d_tipo_imponible'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:350},
            {index:'c_tipo_imponible',width:100, hidden:true},
            {index:'d_tipo_imponible',width:350, hidden:true}],
        caption:'Tributos Planes',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tributo',d_descrip:'d_tributo',
            c_tipo_imponible:'c_tipo_imponible',d_tipo_imponible:'d_tipo_imponible'},
        filtros:['#id_contribuyente'],
        filtrosTitulos:['Contribuyente'],
        searchCode:true,
        searchInput: '#c_tributo',
        keyNav:true,
        exactField: 'c_codigo'
    });

    $("#lupa_c_tipo_imponible").lupa_generica({
        id_lista: lista_tipo_imponible_planes,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:350}],
        caption:'Tipo Imponibles Planes',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tipo_imponible',d_descrip:'d_tipo_imponible'},
        filtros:['#id_contribuyente','#c_tributo'],
        filtrosTitulos:['Contribuyente','Tributo'],
        searchCode:true,
        searchInput: '#c_tipo_imponible',
        keyNav:true,
        exactField: 'c_codigo'
    });

    $("#lupa_d_objeto").lupa_generica({
        id_lista: lista_objetos_planes,
        titulos:['Objeto'],
        grid:[{index:'d_objeto_hecho',width:150}],
        caption:'Objetos Planes',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        campos:{d_objeto_hecho:'d_objeto'},
        filtros:['#id_contribuyente','#c_tributo','#c_tipo_imponible'],
        filtrosTitulos:['Contribuyente','Tributo','Tipo Imponible'],
        keyNav:true,
        exactField: 'd_objeto_hecho'
    });

    $("#lupa_c_tipo_plan_pago").lupa_generica({
        id_lista: lista_tipo_planes,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_tipo_plan_pago',width:150},
            {index:'d_tipo_plan_pago',width:350}],
        caption:'Tipos de Planes de Pago',
        sortname:'c_tipo_plan_pago',
        sortorder:'asc',
        campos:{c_tipo_plan_pago:'c_tipo_plan_pago',d_tipo_plan_pago:'d_tipo_plan_pago'},
        filtros:['#id_contribuyente','#c_tributo'],
        filtrosTitulos:['Contribuyente','Tributo'],
        filtrosNulos:[true,true],
        searchCode:true,
        searchInput: '#c_tipo_plan_pago',
        keyNav:true,
        exactField: 'c_tipo_plan_pago'
    });

    $("#lupa_n_plan_pago").lupa_generica({
        id_lista: lista_planes,
        titulos:['Número de Plan','id_contribuyente','n_cuit','d_denominacion'],
        grid:[{index:'n_plan_pago',width:150},
            {index:'id_contribuyente',width:100,hidden:true},
            {index:'n_cuit',width:100,hidden:true},
            {index:'d_denominacion',width:100,hidden:true}],
        caption:'Planes de Pago',
        sortname:'n_plan_pago',
        sortorder:'asc',
        campos:{n_plan_pago:'n_plan_pago',id_contribuyente:'id_contribuyente',
            n_cuit:'n_cuit',d_denominacion:'d_denominacion'},
        filtros:['#id_contribuyente','#c_tributo','#c_tipo_plan_pago'],
        filtrosTitulos:['Contribuyente','Tributo','Tipo Plan'],
        filtrosNulos:[true,true,true],
        searchCode:true,
        searchInput: '#n_plan_pago',
        keyNav:true,
        exactField: 'n_plan_pago'
    });
    ////////////////////////////////////////// LUPAS //////////////////////////////////////////
    
    $("#tabs").tabs({
        collapsible: true
    });

    if(p_modo == 'C'){
        $("#btn_consultar, #btn_limpiar").hide();
        $("#btn_consultar").click();
    }
}