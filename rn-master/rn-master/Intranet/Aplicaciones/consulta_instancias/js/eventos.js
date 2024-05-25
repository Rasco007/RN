function init_eventos() {

    $("#n_cuit").mask("99-99999999-9");

    $("#d_denominacion").autocomplete({
        source: function( request, response ) {
            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "consulta_instancias/consultas_ajax.php",
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
                                        id_contribuyente: item.id_contribuyente,
                                        c_tipo_documento: item.c_tipo_documento,
                                        d_tipo_documento: item.d_tipo_documento,
                                        n_documento: item.n_documento
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
            $("#c_tipo_documento").val(ui.item.c_tipo_documento);
            $("#d_tipo_documento").val(ui.item.d_tipo_documento);
            $("#n_documento").val(ui.item.n_documento);
            return false;
        }
    });

    $('#n_cuit').change(function(){
        n_cuit_focusout();
    });

    $('#n_orden').change(function(){
        if($("#n_instancia").val() == ""){
            $('#n_orden').val(null);
            mostrar_validacion('Debe ingresar el campo Número de Instancia para filtrar por Orden.');
        }
    });

    $("#btn_limpiar").click(function(){
        $('#frm_busqueda').validationEngine('hide')
        id_contribuyente = null;
        $(".limpiar").attr('readonly',false);
        $(".btn_lupa").show();
        $("#btn_buscar").attr('disabled',false);
        $("#frm_busqueda input").val(null);
        $("#instancias_grid").jqGrid('clearGridData');
    });

    $("#btn_buscar").click(function(){
        if($('#frm_busqueda').validationEngine('validate')){
            $(".limpiar").attr('readonly',true);
            $(".btn_lupa").hide();
            $("#btn_buscar").attr('disabled',true);
            id_contribuyente = $("#id_contribuyente").val();
            setea_parametros('#instancias_grid',{
                ':id_contribuyente': id_contribuyente,
                ':c_tributo': $("#c_tributo").val(),
                ':d_objeto_hecho': $("#d_objeto").val(),
                ':n_control': $("#n_control").val(),
                ':n_anio_expediente': p_n_anio_expediente,
                ':n_expediente': p_n_expediente,
                ':n_instancia': $("#n_instancia").val(),
                ':n_orden': $("#n_orden").val(),
                ':c_tipo_instancia': $("#c_tipo_instancia").val(),
                ':id_obligacion_bd': p_id_obligacion_bd,
                ':id_obligacion': p_id_obligacion}, 'S'
            );
        }
    });

    // boton imprmir del modal detalle de instancia
    $("#btn_imprimir_instancia_det").click(function(){
        var id = $("#instancias_grid").getGridParam('selrow');
        if (id) {
            llamar_report('COFL_010',
                'p_n_instancia|'+$("#instancias_grid").getCell(id,"n_instancia")+
                '&p_n_orden|'+$("#instancias_grid").getCell(id,"n_orden"),
                'PDF');
        }else{
            mostrar_validacion('Debe seleccionar un registro de la grilla principal.');
        }
    });

    if(id_contribuyente){
        $("#btn_buscar").click();
        $("#btn_buscar, #btn_limpiar").hide();
    }

    $("#lupa_c_tipo_documento").lupa_generica({
        id_lista: lista_tipos_documentos,
        titulos: ['C&oacute;digo', 'Descripci&oacute;n'],
        grid: [{index: 'c_dato', width: 100},
            {index: 'd_dato', width: 350}],
        caption: 'Tipos de Documento',
        sortname: 'c_dato',
        sortorder: 'asc',
        campos: {c_dato: 'c_tipo_documento', d_dato: 'd_tipo_documento'},
        searchCode: true,
        searchInput: '#c_tipo_documento',
        keyNav: true,
        exactField: 'c_dato'
    });

    $("#lupa_tributo").lupa_generica({
        id_lista: lista_tributos,
        titulos: ['C&oacute;digo', 'Descripci&oacute;n'],
        grid: [{index: 'c_dato', width: 100},
            {index: 'd_dato', width: 350}],
        caption: 'Tributos',
        sortname: 'c_dato',
        sortorder: 'asc',
        campos: {c_dato: 'c_tributo', d_dato: 'd_tributo'},
        searchCode: true,
        searchInput: '#c_tributo',
        keyNav: true,
        exactField: 'c_dato'
    });

    $("#lupa_objeto").lupa_generica({
        id_lista: lista_objetos,
        titulos: ['Objeto'],
        grid: [{index: 'd_objeto_hecho', width: 300}],
        caption: 'Objetos',
        sortname: 'd_objeto_hecho',
        sortorder: 'asc',
        campos: {d_objeto_hecho: 'd_objeto'},
        filtros:['#id_contribuyente','#c_tributo'],
        filtrosTitulos:['Contribuyente','Tributo'],
        filtrosNulos:[false,false],
        keyNav: true,
        exactField: 'd_objeto_hecho'
    });

    $("#lupa_obligacion").lupa_generica({
        id_lista: lista_obligaciones,
        titulos: ['Obligación', 'Posición fiscal','Cuota','Cod. Concepto','Concepto'],
        grid: [{index: 'id_obligacion', width: 150}, {index: 'n_posicion_fiscal', width: 100},
            {index: 'n_cuota_anticipo', width: 100}, {index: 'c_concepto', width: 100},
            {index: 'concepto', width: 350}],
        caption: 'Obligaciones Intimadas',
        sortname: 'n_posicion_fiscal',
        sortorder: 'desc, n_cuota_anticipo desc',
        campos: {id_obligacion: 'id_obligacion'},
        filtros:['#id_contribuyente','#c_tributo','#d_objeto'],
        filtrosTitulos:['Contribuyente','Tributo','Objeto'],
        filtrosNulos:[false,false,false],
        keyNav: true,
        exactField: 'id_obligacion'
    });

    $("#lupa_tipo_instancia").lupa_generica({
        id_lista: lista_tipos_instancia,
        titulos: ['C&oacute;digo', 'Descripci&oacute;n'],
        grid: [{index: 'c_dato', width: 100},
            {index: 'd_dato', width: 350}],
        caption: 'Tipos de Instancia',
        sortname: 'c_dato',
        sortorder: 'asc',
        campos: {c_dato: 'c_tipo_instancia', d_dato: 'd_tipo_instancia'},
        searchCode: true,
        searchInput: '#c_tipo_instancia',
        keyNav: true,
        exactField: 'c_dato'
    });
}