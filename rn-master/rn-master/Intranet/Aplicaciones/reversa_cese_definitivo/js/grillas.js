function inicializarGrillas(){
    $("#actividades_cm_grid").jqGrid({
        colNames: actividades_cm_grid.colNames(),
        colModel: actividades_cm_grid.colModel(),
        pager: $('#actividades_cm_grid_pager'),
        caption: "Actividades",
        postData: actividades_cm_grid.postData(),
        autowidth: false,
        shrinkToFit: true,
        width: 1480,
        //sortname: '',
        //sortorder: 'asc',
        loadComplete: function(){
            if($('#actividades_cm_grid').getGridParam('records') > 0){
                $('#div_actividades_cm').prop('hidden', false);
            } else{
                if(v_no_carga_inicial_act_cm){
                    mostrar_cuadro('I', 'Atención', 'La consulta ingresada no devolvió datos');
                } else{
                    v_no_carga_inicial_act_cm = true;
                }
            }
        }
    }).navGrid('#actividades_cm_grid_pager',
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
        caption: "jurisdicciones",
        postData: jurisdicciones_grid.postData(),
        autowidth: false,
        shrinkToFit: true,
        width: 1480,
        //sortname: '',
        //sortorder: 'asc',
        loadComplete: function(){
            if($('#jurisdicciones_grid').getGridParam('records') > 0 && $('#actividades_cm_grid').getGridParam('records') > 0){
                $('#div_jurisdicciones').prop('hidden', false);
            } 
            else if($('#jurisdicciones_grid').getGridParam('records') <= 0 || $('#actividades_cm_grid').getGridParam('records') <= 0){
                $('#div_jurisdicciones').prop('hidden', true);
                $('#div_actividades_cm').prop('hidden', true);
                $('#f_vig_desde').val(null);
            }
            else{
                if(v_no_carga_inicial_juris){
                    mostrar_cuadro('I', 'Atención', 'La consulta ingresada no devolvió datos');
                } else{
                    v_no_carga_inicial_juris = true;
                }
            }
        }
    }).navGrid('#jurisdicciones_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#establecimientos_grid").jqGrid({
        colNames: establecimientos_grid.colNames(),
        colModel: establecimientos_grid.colModel(),
        pager: $('#establecimientos_grid_pager'),
        caption: "Comercios",
        postData: establecimientos_grid.postData(),
        autowidth: false,
        shrinkToFit: true,
        width: 1480,
        //sortname: '',
        //sortorder: 'asc',
        loadComplete: function(){
            if($('#establecimientos_grid').getGridParam('records') > 0){
                $('#div_establecimientos').prop('hidden', false);
            } else{
                if(v_no_carga_inicial_establ){
                    mostrar_cuadro('I', 'Atención', 'La consulta ingresada no devolvió datos');
                } else{
                    v_no_carga_inicial_establ = true;
                }
            }
        }
    }).navGrid('#establecimientos_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#actividades_ibd_grid").jqGrid({
        colNames: actividades_ibd_grid.colNames(),
        colModel: actividades_ibd_grid.colModel(),
        pager: $('#actividades_ibd_grid_pager'),
        caption: "Actividades",
        postData: actividades_ibd_grid.postData(),
        autowidth: false,
        shrinkToFit: true,
        width: 1480,
        sortname: 'c_actividad',
        sortorder: 'desc',
        loadComplete: function(){
            if($('#actividades_ibd_grid').getGridParam('records') > 0 && $('#establecimientos_grid').getGridParam('records') > 0){
                $('#div_actividades_ibd').prop('hidden', false);
            } 
            else if($('#establecimientos_grid').getGridParam('records') <= 0 || $('#actividades_ibd_grid').getGridParam('records') <= 0){
                $('#div_establecimientos').prop('hidden', true);
                $('#div_actividades_ibd').prop('hidden', true);
                $('#f_vig_desde').val(null);
            }
            else{
                if(v_no_carga_inicial_act_ibd){
                    mostrar_cuadro('I', 'Atención', 'La consulta ingresada no devolvió datos');
                } else{
                    v_no_carga_inicial_act_ibd = true;
                }
            }
        }
    }).navGrid('#actividades_ibd_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#contrib_tributo_grid").jqGrid({
        colNames: contrib_tributo_grid.colNames(),
        colModel: contrib_tributo_grid.colModel(),
        pager: $('#contrib_tributo_grid_pager'),
        caption: "Inscripciones por Contribuyente",
        postData: contrib_tributo_grid.postData(),
        autowidth: false,
        shrinkToFit: true,
        height: 100,
        width: 1480,
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
                $('#d_tributo').val($('#contrib_tributo_grid').getCell(row_id, 'desc_tributo'));
            } else{
                if(v_no_carga_inicial_ct){
                    mostrar_cuadro('I', 'Atención', 'La consulta ingresada no devolvió datos');
                    $('#btn_reversa').prop('disabled', true);
                    $('#btn_limpiar').trigger('click');
                } else{
                    v_no_carga_inicial_ct = true;
                }
            }
        },
        onSelectRow: function(id){
            $('#div_actividades_cm').prop('hidden', true);
            $('#div_jurisdicciones').prop('hidden', true);
            $('#div_actividades_ibd').prop('hidden', true);
            $('#div_establecimientos').prop('hidden', true);
            $('#actividades_cm_grid').jqGrid('clearGridData');
            $('#jurisdicciones_grid').jqGrid('clearGridData');
            $('#actividades_ibd_grid').jqGrid('clearGridData');
            $('#establecimientos_grid').jqGrid('clearGridData');

            if($('#contrib_tributo_grid').getCell(id, 'f_cese_provisorio')){
                $('#leyenda').text('CESE PROVISORIO: ' + $('#contrib_tributo_grid').getCell(id, 'f_cese_provisorio'));
            }else{
                $('#leyenda').text('');
            }

            $('#d_objeto_hecho').val($('#contrib_tributo_grid').getCell(id, 'd_objeto_hecho'));
            $('#f_vig_desde').val($('#contrib_tributo_grid').getCell(id, 'f_vig_desde'));
            $('#f_cese_provisorio').val($('#contrib_tributo_grid').getCell(id, 'f_cese_provisorio'));
            $('#c_tributo').val($('#contrib_tributo_grid').getCell(id, 'c_tributo'));
            $('#c_tipo_imp').val($('#contrib_tributo_grid').getCell(id, 'c_tipo_imponible'));
            $('#f_nueva').val($('#contrib_tributo_grid').getCell(id, 'f_vig_hasta'));
            
            if($('#c_tributo').val() == 20){
                setea_parametros('#actividades_cm_grid', {':p_id_contribuyente':$('#id_contribuyente').val(),
                                                                ':p_d_objeto_hecho': $('#d_objeto_hecho').val()});
                setea_parametros('#jurisdicciones_grid', {':p_id_contribuyente':$('#id_contribuyente').val(),
                                                                ':p_d_objeto_hecho': $('#d_objeto_hecho').val()});
            }
            else if($('#c_tributo').val() == 10){
                setea_parametros('#establecimientos_grid', {':p_id_contribuyente':$('#id_contribuyente').val(),
                                                                ':p_d_objeto_hecho': $('#d_objeto_hecho').val()});
                setea_parametros('#actividades_ibd_grid', {':p_id_contribuyente':$('#id_contribuyente').val(),
                                                              ':p_d_objeto_hecho': $('#d_objeto_hecho').val()});
            }
        }
    }).navGrid('#contrib_tributo_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
}