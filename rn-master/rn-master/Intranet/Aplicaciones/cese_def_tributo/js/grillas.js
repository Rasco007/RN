function inicializarGrillas(){
    $("#contrib_tributo_grid").jqGrid({
        colNames: contrib_tributo_grid.colNames(),
        colModel: contrib_tributo_grid.colModel(),
        pager: $('#contrib_tributo_grid_pager'),
        caption: "Inscripciones por Contribuyente",
        postData: contrib_tributo_grid.postData(),
        autowidth: false,
        shrinkToFit: true,
        height: 100,
        loadComplete: function(){
            if($('#contrib_tributo_grid').getGridParam('records') > 0){
                $('#div_contrib_tributo').prop('hidden', false);
                $('#contrib_tributo_grid').jqGrid('setSelection', 1);
                let row_id = $('#contrib_tributo_grid').getGridParam('selrow');
                $('#d_objeto_hecho').val($('#contrib_tributo_grid').getCell(row_id, 'd_objeto_hecho'));
                $('#f_vig_desde').val($('#contrib_tributo_grid').getCell(row_id, 'f_vig_desde'));
                $('#f_cese_provisorio').val($('#contrib_tributo_grid').getCell(row_id, 'f_cese_provisorio'));
                $('#c_tipo_imp').val($('#contrib_tributo_grid').getCell(row_id, 'c_tipo_imponible'));
                $('#c_tributo').val($('#contrib_tributo_grid').getCell(row_id, 'c_tributo'));
                $('#d_tributo').val('');
                $('#c_tributo').blur();

            } else{
                if(v_no_carga_inicial_ct){
                    mostrar_cuadro('I', 'Atención', 'La consulta ingresada no devolvió datos');
                } else{
                    v_no_carga_inicial_ct = true;
                }
            }
        },
        onSelectRow: function(id){
            $('#d_objeto_hecho').val($('#contrib_tributo_grid').getCell(id, 'd_objeto_hecho'));
            $('#f_vig_desde').val($('#contrib_tributo_grid').getCell(id, 'f_vig_desde'));
            $('#f_cese_provisorio').val($('#contrib_tributo_grid').getCell(id, 'f_cese_provisorio'));
            $('#c_tributo').val($('#contrib_tributo_grid').getCell(id, 'c_tributo'));
            $('#d_tributo').val('');
            $('#c_tributo').blur();
            $('#c_tipo_imp').val($('#contrib_tributo_grid').getCell(id, 'c_tipo_imponible'));

            var labelElement = document.getElementById("cese_prov");
            if($("#f_cese_provisorio").val() != ''){
                labelElement.textContent = "CESE PROVISORIO " + $("#f_cese_provisorio").val();
            }else{
                labelElement.textContent = "";
            }

            if($('#c_tributo').val() == 10){
                $('#div_jurisdicciones').prop('hidden', true);
                $('#div_comercios').prop('hidden', false);
                setea_parametros('#comercios_grid', {':p_id_contribuyente':$('#id_contribuyente').val(),
                ':p_c_tributo': $('#c_tributo').val(),
                ':p_c_tipo_imponible': $('#contrib_tributo_grid').getCell(id, 'c_tipo_imponible'),
                ':p_obj_hecho': $('#d_objeto_hecho').val()});
                $('#div_actividades').prop('hidden', false);
                setea_parametros('#actividades_grid', {':p_id_contribuyente':$('#id_contribuyente').val(),
                ':p_c_tributo': $('#c_tributo').val(),
                ':p_c_tipo_imponible': $('#contrib_tributo_grid').getCell(id, 'c_tipo_imponible'),
                ':p_obj_hecho': $('#d_objeto_hecho').val()});
            } else if ($('#c_tributo').val() == 20){
                $('#div_comercios').prop('hidden', true);
                $('#div_actividades').prop('hidden', false);
                setea_parametros('#actividades_grid', {':p_id_contribuyente':$('#id_contribuyente').val(),
                ':p_c_tributo': $('#c_tributo').val(),
                ':p_c_tipo_imponible': $('#contrib_tributo_grid').getCell(id, 'c_tipo_imponible'),
                ':p_obj_hecho': $('#d_objeto_hecho').val()});
                $('#div_jurisdicciones').prop('hidden', false);
                setea_parametros('#jurisdicciones_grid', {':p_id_contribuyente':$('#id_contribuyente').val(),
                ':p_c_tributo': $('#c_tributo').val(),
                ':p_c_tipo_imponible': $('#contrib_tributo_grid').getCell(id, 'c_tipo_imponible'),
                ':p_obj_hecho': $('#d_objeto_hecho').val()});
            } else {
                $('#div_actividades').prop('hidden', true);
                $('#div_jurisdicciones').prop('hidden', true);
            }
           
        }
    }).navGrid('#contrib_tributo_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#actividades_grid").jqGrid({
        colNames: actividades_grid.colNames(),
        colModel: actividades_grid.colModel(),
        pager: $('#actividades_grid_pager'),
        caption: "Actividades",
        postData: actividades_grid.postData(),
        autowidth: false,
        height: 100,
        sortname:'f_fin_act',
        sortorder:'desc',
    }).navGrid('#actividades_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
    
    $("#jurisdicciones_grid").jqGrid({
        colNames: jurisdicciones_grid.colNames(),
        colModel: jurisdicciones_grid.colModel(),
        pager: $('#jurisdicciones_grid_pager'),
        caption: "Jurisdicciones",
        postData: jurisdicciones_grid.postData(),
        autowidth: false,
        height: 100,
        loadComplete: function(){
            filtros_no_nativos_ar['jurisdicciones_grid'] = filtros_arr_main;
        }
    }).navGrid('#jurisdicciones_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
    
    $("#comercios_grid").jqGrid({
        colNames: comercios_grid.colNames(),
        colModel: comercios_grid.colModel(),
        pager: $('#comercios_grid_pager'),
        caption: "Comercios",
        postData: comercios_grid.postData(),
        autowidth: false,
        height: 100
    }).navGrid('#comercios_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
   
    $("#errores_grid").jqGrid({
        colNames: errores_grid.colNames(),
        colModel: errores_grid.colModel(),
        pager: $('#errores_grid_pager'),
        caption: "Errores",
        postData: errores_grid.postData(),
        autowidth: false,
        height: 200,
        sortname:'n_orden',
        sortorder:'asc'
    }).navGrid('#errores_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
}