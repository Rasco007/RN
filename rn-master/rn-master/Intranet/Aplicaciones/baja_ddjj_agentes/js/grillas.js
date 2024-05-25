function inicializar_grillas() {
    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Cabecera de DDJJ",
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH + "maestro_abm_grid.php",
        sortname:'id_obligacion, n_secuencia_pres',
        sortorder:'desc',
        rowList: [50, 100, 500, 1000],
        onSelectRow: function (id) {
            let v_id_ddjj = $("#main_grid").getCell(id,'id_ddjj');
            let v_c_tipo_form = $("#main_grid").getCell(id,'c_tipo_form');

            if(v_c_tipo_form == p_form_ret || v_c_tipo_form == p_form_ret1 || v_c_tipo_form == 'SIRCAR_AR' || v_c_tipo_form =='SIAFIP_AR'){
                setea_parametros('#detail_reten_grid',{':p_id_ddjj':v_id_ddjj});
                $('#seccion_2').show();
                $('#seccion_3').hide();
                $('#seccion_4').hide();
                $('#seccion_5').hide();
                $('#div_botones').attr('hidden', false);
            }else {
                if(v_c_tipo_form == p_form_per || v_c_tipo_form == 'SIRPEI' || v_c_tipo_form == 'SIRCAR_AP' || v_c_tipo_form == 'SIAFIP_AP'){
                    setea_parametros('#detail_percep_grid',{':p_id_ddjj':v_id_ddjj});
                    $('#seccion_3').show();
                    $('#seccion_2').hide();
                    $('#seccion_4').hide();
                    $('#seccion_5').hide();
                    $('#div_botones').attr('hidden', false);
                } else {
                    if(v_c_tipo_form != 'AR04' && v_c_tipo_form.substr(0,2) == 'AR'){
                        setea_parametros('#detail_sellos_grid',{':p_id_ddjj':v_id_ddjj});
                        $('#seccion_4').show();
                        $('#seccion_2').hide();
                        $('#seccion_3').hide();
                        $('#seccion_5').hide();
                        $('#div_botones').attr('hidden', false);
                    } else {
                        if(v_c_tipo_form == 'AR03' || v_c_tipo_form == 'AR04'){
                            setea_parametros('#detail_recau_grid',{':p_id_ddjj':v_id_ddjj});
                            $('#seccion_5').show();
                            $('#seccion_2').hide();
                            $('#seccion_3').hide();
                            $('#seccion_4').hide();
                            $('#div_botones').attr('hidden', false);
                        } else {
                            $('#seccion_2').hide();
                            $('#seccion_3').hide();
                            $('#seccion_4').hide();
                            $('#seccion_5').hide();
                            $('#div_botones').attr('hidden', false);
                        }
                    }
                }
            }
        },
        loadComplete: function () {
            gridParentWidth = $('#main_grid_grid').parent().parent().width();
            $('#main_grid').setGridWidth(gridParentWidth);
        }
    }).navGrid('#main_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#detail_reten_grid").jqGrid({
        colNames: datos_detail_reten_grid.colNames(),
        colModel: datos_detail_reten_grid.colModel(),
        pager: $('#detail_reten_grid_pager'),
        caption: "Detalle Retenciones",
        postData: datos_detail_reten_grid.postData(),
        editurl: FUNCIONES_BASEPATH + "maestro_abm_grid.php",
        shrinkToFit: true,
        rowList: [50, 100, 500, 1000],
        loadComplete: function () {
            gridParentWidth = $('#detail_reten_grid_pager').parent().parent().width();
            $('#detail_reten_grid').setGridWidth(gridParentWidth);
        }
    }).navGrid('#detail_reten_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#detail_percep_grid").jqGrid({
        colNames: datos_detail_percep_grid.colNames(),
        colModel: datos_detail_percep_grid.colModel(),
        pager: $('#detail_percep_grid_pager'),
        caption: "Detalle Percepciones",
        postData: datos_detail_percep_grid.postData(),
        editurl: FUNCIONES_BASEPATH + "maestro_abm_grid.php",
        rowList: [50, 100, 500, 1000],
        shrinkToFit: true,
        loadComplete: function () {
            gridParentWidth = $('#detail_percep_grid_pager').parent().parent().width();
            $('#detail_percep_grid').setGridWidth(gridParentWidth);
        }
    }).navGrid('#detail_percep_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#detail_sellos_grid").jqGrid({
        colNames: datos_detail_sellos_grid.colNames(),
        colModel: datos_detail_sellos_grid.colModel(),
        pager: $('#detail_sellos_grid_pager'),
        caption: "Detalle Agentes",
        postData: datos_detail_sellos_grid.postData(),
        editurl: FUNCIONES_BASEPATH + "maestro_abm_grid.php",
        rowList: [50, 100, 500, 1000],
        shrinkToFit: false,
        loadComplete: function () {
            gridParentWidth = $('#detail_sellos_grid_pager').parent().parent().width();
            $('#detail_sellos_grid').setGridWidth(gridParentWidth);
        }
    }).navGrid('#detail_sellos_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#detail_recau_grid").jqGrid({
        colNames: datos_detail_recau_grid.colNames(),
        colModel: datos_detail_recau_grid.colModel(),
        pager: $('#detail_recau_grid_pager'),
        caption: "Detalle Agentes",
        postData: datos_detail_recau_grid.postData(),
        editurl: FUNCIONES_BASEPATH + "maestro_abm_grid.php",
        shrinkToFit: true,
        rowList: [50, 100, 500, 1000],
        loadComplete: function () {
            gridParentWidth = $('#detail_recau_grid_pager').parent().parent().width();
            $('#detail_recau_grid').setGridWidth(gridParentWidth);
        }
    }).navGrid('#detail_recau_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    );
}