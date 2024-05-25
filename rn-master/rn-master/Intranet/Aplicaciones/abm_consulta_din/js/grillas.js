function inicializarGrillas(){
    $("#parametros_grid").jqGrid({
        colNames: parametros_grid.colNames(),
        colModel: parametros_grid.colModel(),
        pager: $('#parametros_grid_pager'),
        caption: "Parámetros Consulta",
        sortname:'n_secuencia',
        sortorder:'asc',
        postData: parametros_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
    }).navGrid('#parametros_grid_pager',
        {add: true, edit: true, del: true}, //options
        {
            onInitializeForm: defaultInitForm(function(formid){
                inicializarLupasParams();
                
            }),
            closeAfterEdit: true
        }, //edit
        {
            onInitializeForm: defaultInitForm(function(formid){
                inicializarLupasParams();
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $('#id_cons_dinamica').val(v_id_cons_dinamica);
                $('#tr_n_secuencia').hide();
            }),
            closeAfterAdd: true
        }, //add
        {} //del
    ).navButtonAdd('#parametros_grid_pager',{caption:"Activar Orden&nbsp;&nbsp;&nbsp;",buttonicon:"ui-icon-arrow-2-n-s",
        onClickButton:function() {

            activarDragDropColumnas('parametros_grid');

        },position:"right", title:"Activar Orden Draggable", cursor:"pointer", id:'bt_activar_orden_parametros_grid'}
    ).navButtonAdd('#parametros_grid_pager',{caption:"Aplicar/Corregir&nbsp;&nbsp;&nbsp;",buttonicon:"ui-icon-disk",
        onClickButton:function() {
            guardarOrdenCampos('parametros_grid');
        },position:"right", title:"Aplicar cambios y/o corregir orden.", cursor:"pointer", id:'bt_aplicar_cambios_orden_parametros_grid'}
    );
    $('#bt_aplicar_cambios_orden_parametros_grid').hide();

    $("#resultados_grid").jqGrid({
        colNames: resultados_grid.colNames(),
        colModel: resultados_grid.colModel(),
        pager: $('#resultados_grid_pager'),
        caption: "Resultados Consulta",
        sortname:'n_orden_resu',
        sortorder:'asc',
        postData: resultados_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
    }).navGrid('#resultados_grid_pager',
        {add: true, edit: true, del: true}, //options
        {
            onInitializeForm: defaultInitForm(function(formid){
                inicializarLupasResul();
                
            }),
            closeAfterEdit: true
        }, //edit
        {
            onInitializeForm: defaultInitForm(function(formid){
                inicializarLupasResul();
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $('#id_cons_dinamica').val(v_id_cons_dinamica);
                $('#tr_n_orden_resu').hide();
            }),
            closeAfterAdd: true
        }, //add
        {} //del
    ).navButtonAdd('#resultados_grid_pager',{caption:"Activar Orden&nbsp;&nbsp;&nbsp;",buttonicon:"ui-icon-arrow-2-n-s",
        onClickButton:function() {

            activarDragDropColumnas('resultados_grid');

        },position:"right", title:"Activar Orden Draggable", cursor:"pointer", id:'bt_activar_orden_resultados_grid'}
    ).navButtonAdd('#resultados_grid_pager',{caption:"Aplicar/Corregir&nbsp;&nbsp;&nbsp;",buttonicon:"ui-icon-disk",
        onClickButton:function() {
            guardarOrdenCampos('resultados_grid');
        },position:"right", title:"Aplicar cambios y/o corregir orden.", cursor:"pointer", id:'bt_aplicar_cambios_orden_resultados_grid'}
    );
    $('#bt_aplicar_cambios_orden_resultados_grid').hide();

    $("#consultas_grid").jqGrid({
        colNames: consultas_grid.colNames(),
        colModel: consultas_grid.colModel(),
        pager: $('#consultas_grid_pager'),
        caption: "Consultas Dinámicas",
        sortname:'id_cons_dinamica',
        sortorder:'asc',
        postData: consultas_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        onSelectRow: function(id){
            v_id_cons_dinamica = $("#consultas_grid").getCell(id,"id_cons_dinamica");
            setea_parametros('#parametros_grid',{':p_id_cons_dinamica': v_id_cons_dinamica});
            setea_parametros('#resultados_grid',{':p_id_cons_dinamica': v_id_cons_dinamica});
        },
        loadComplete:function(){
            $("#consultas_grid").setSelection(1);
        },
    }).navGrid('#consultas_grid_pager',
        {add: true, edit: true, del: true}, //options
        {
            onInitializeForm: defaultInitForm(function(formid){
                inicializarLupasConsDin();
            }),
            closeAfterEdit: true
        },
        {
            onInitializeForm: defaultInitForm(function(formid){
                inicializarLupasConsDin();
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $('#tr_id_cons_dinamica').hide();
            }),
            closeAfterAdd: true
        }, //add
        {
            afterComplete:function(formid){
                $('#resultados_grid').trigger('reloadGrid');
                $('#parametros_grid').trigger('reloadGrid');
                v_id_cons_dinamica = null;
            }
        } //del
    );
}