function init_grillas(){
    //Grilla principal
    $("#main_grid").jqGrid({
        colNames: main_grid.colNames(),
        colModel: main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Acreditación de Pagos",
        postData: main_grid.postData(),
        autowidth: false,
        width: 940,
        shrinkToFit: true,
        sortname:'h_fecha_archivo',
        sortorder:'desc',
        rowNum:500,
        loadComplete: function(){
            $(this).getGridParam('records') <= 0
        },
        onSelectRow:function(id){
            p_h_fecha_acreditacion=$(this).getCell(id,'h_fecha_acreditacion');
            p_id_archivo=$(this).getCell(id,'id_archivo');

            setea_parametros('#detalle_grid',{
                'p_id_archivo':p_id_archivo,
                'p_archivo':p_archivo
            });
            

        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
    $("#detalle_grid").jqGrid({
        colNames: detalle_grid.colNames(),
        colModel: detalle_grid.colModel(),
        pager: $('#detalle_grid_pager'),
        caption: textoGrilla,
        postData: detalle_grid.postData(),
        autowidth: false,
        width: 940,
        shrinkToFit: true
    }).navGrid('#detalle_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
    $("#suma_grid").jqGrid({
        colNames: suma_grid.colNames(),
        colModel: suma_grid.colModel(),
        pager: $('#suma_grid_pager'),
        caption: "BLOQUE DE DATOS ACUMULADOS",
        postData: suma_grid.postData(),
        autowidth: false,
        width: 940,
        shrinkToFit: true
    }).navGrid("suma_grid_pager",
    {add:false, edit:false, del:false},
    {},
    {},
    {});

    $("#main_grid_ban").jqGrid({
        colNames: main_grid_ban.colNames(),
        colModel: main_grid_ban.colModel(),
        pager: $('#main_grid_ban_pager'),
        caption: "Acreditación de Pagos",
        postData: main_grid_ban.postData(),
        autowidth: true,
        shrinkToFit: true,
        loadComplete: function(){
            $("#sel_todo").prop('disabled',false);

            $("#modificar_f_acreditacion").prop('disabled',false);

            $("#desel_todo").prop('disabled',false);

            $("#sel_todo").prop('disabled',false);

            $("#btn_generar_planilla").prop('disabled',false);

            $("#f_acreditacion").prop('disabled',false);
            if($("#main_grid_ban").getGridParam('records') <= 0){
                $("#bt_informe_main_grid_ban_pager").attr('disabled',true);
            }
        },
        rowattr: function (rd) {
            if (rd.selec == 'S'){
                return {'checkbox':'checked'};
            }
        },
        onSelectRow:function(id){
            p_h_fecha_acreditacion=$(this).getCell(id,'h_fecha_acreditacion');


            p_id_archivo=$(this).getCell(id,'id_archivo');

            p_tipo_archivo=$(this).getCell(id,'tipo_archivo');

            setea_parametros('#detalle_grid',{
                'p_id_archivo':p_id_archivo,
                'p_archivo':p_archivo
            });

            $("#detalle_grid").trigger('reloadGrid');
            

        }
    }).navGrid('#main_grid_ban_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#main_grid_intbk").jqGrid({
        colNames: main_grid_intbk.colNames(),
        colModel: main_grid_intbk.colModel(),
        pager: $('#main_grid_intbk_pager'),
        caption: "Acreditación de Pagos",
        postData: main_grid_intbk.postData(),
        autowidth: true,
        shrinkToFit: true,
        loadComplete: function(){

            $("#sel_todo").prop('disabled',false);

            $("#modificar_f_acreditacion").prop('disabled',false);

            $("#desel_todo").prop('disabled',false);

            $("#sel_todo").prop('disabled',false);

            $("#btn_generar_planilla").prop('disabled',false);

            if($("#main_grid_intbk").getGridParam('records') <= 0){
                $("#bt_informe_main_grid_ban_pager").attr('disabled',true);
            }
        },
        rowattr: function (rd) {
            if (rd.selec == 'S'){
                return {'checkbox':'checked'};
            }
        },
        onSelectRow:function(id){
            p_h_fecha_acreditacion=$(this).getCell(id,'h_fecha_acreditacion');
            p_id_archivo=$(this).getCell(id,'id_archivo');

            setea_parametros('#detalle_grid',{
                'p_id_archivo':p_id_archivo,
                'p_archivo':p_archivo
            });

            $("#detalle_grid").trigger('reloadGrid');

        }
    }).navGrid('#main_grid_intbk_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#main_grid_epago").jqGrid({
        colNames: main_grid_epago.colNames(),
        colModel: main_grid_epago.colModel(),
        pager: $('#main_grid_epago_pager'),
        caption: "Acreditación de Pagos EPAGO",
        postData: main_grid_epago.postData(),
        autowidth:true,
        shrinkToFit: true,
        loadComplete: function(){

            $("#sel_todo").prop('disabled',false);

            $("#modificar_f_acreditacion").prop('disabled',false);

            $("#desel_todo").prop('disabled',false);

            $("#sel_todo").prop('disabled',false);

            $("#btn_generar_planilla").prop('disabled',false);
            
            if($("#main_grid_epago").getGridParam('records') <= 0){
                $("#bt_informe_main_grid_ban_pager").attr('disabled',true);
            }
        },
        rowattr: function (rd) {
            if (rd.selec == 'S'){
                return {'checkbox':'checked'};
            }
        },
        onSelectRow:function(id){
            let numberFound = false;


            p_h_fecha_acreditacion=$(this).getCell(id,'h_fecha_acreditacion');


            p_id_archivo=$(this).getCell(id,'id_archivo');


            setea_parametros('#detalle_grid',{
                'p_id_archivo':p_id_archivo,
                'p_archivo':p_archivo
            });
            
            $("#detalle_grid").trigger('reloadGrid');

        }
    }).navGrid('#main_grid_epago_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

};