function init_eventos() {
    $("#btn_limpiar").click(function(){
        $(".limpiar").attr('readonly',false);
        $(".btn_lupa").css("visibility", "visible");
        $("#btn_buscar").attr('disabled',false);
        $("#frm_filtro input").val(null);
        $("#calendarios_grid, #plantillas_grid").jqGrid('clearGridData');
        $("#div_calendarios").hide();
        $("#div_plantillas").hide();
    });

    $("#btn_buscar").click(function(){
        if($('#frm_filtro').validationEngine('validate')){
            $(".limpiar").attr('readonly',true);
            $("#frm_filtro .btn_lupa").css("visibility", "hidden");
            setea_parametros('#calendarios_grid',{
                ':p_c_tributo': $("#c_tributo").val(),
                ':p_c_concepto': $("#c_concepto").val(),
                ':p_n_anio': $("#n_anio").val(),
            });
            $("#div_calendarios").show();
        }
    });

    $("#lupa_c_tributo").lupa_generica({
        id_lista:lista_tributos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:350}],
        caption:'Tributos',
        sortname:'c_codigo',
        sortorder:'asc',
        searchInput: '#c_tributo',
        searchCode: true,
        campos:{c_codigo:'c_tributo', d_descrip:'d_tributo'},
        filtros:[''],
        keyNav:true,
        limpiarCod: true,
        onClose: function(){
            if($('#c_tributo').val() == '90'){
                $('#n_producto_dd').val(1);
            } else {
                $('#n_producto_dd').val(2); 
            }
        }
    });
    
    $("#lupa_c_concepto").lupa_generica({
        id_lista:lista_conceptos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_concepto',width:100},
            {index:'d_concepto',width:350}],
        caption:'Conceptos',
        sortname:'c_concepto',
        sortorder:'asc',
        searchInput: '#c_concepto',
        exactField: 'c_concepto',
        searchCode: true,
        campos:{c_concepto:'c_concepto', d_concepto:'d_concepto'},
        filtrosNulos:[false],
        filtros:['#c_tributo'],
        filtrosTitulos:['Tributo'],
        keyNav:true,
        limpiarCod: true,
    });
}

