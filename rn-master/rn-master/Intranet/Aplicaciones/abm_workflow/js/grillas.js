function inicializarGrillas(){
    $("#tareas_grid").jqGrid({
        colNames: tareas_grid.colNames(),
        colModel: tareas_grid.colModel(),
        pager: $('#tareas_grid_pager'),
        caption: "Tareas Workflow",
        sortname:'n_orden',
        sortorder:'asc',
        postData: tareas_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        onSelectRow: function(id){
            v_c_tarea = $("#tareas_grid").getCell(id,"c_tarea");
            setea_parametros('#parametros_grid',{':p_c_workflow': v_c_workflow, ':p_c_tarea': v_c_tarea});
        },
        loadComplete:function(){
            $("#tareas_grid").setSelection(1);
        },
    }).navGrid('#tareas_grid_pager',
        {add: true, edit: true, del: true}, //options
        {
            onInitializeForm: defaultInitForm(function(formid){
                inicializarLupasTareas();
                
            }),
            closeAfterEdit: true,
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $('#c_tarea').attr('readonly',true);
            }),
        }, //edit
        {
            onInitializeForm: defaultInitForm(function(formid){
                inicializarLupasTareas();
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $('#c_workflow').val(v_c_workflow);
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                     "p_c_workflow":v_c_workflow,
                     "id_menu":v_id_menu,
                     "n_orden":0
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                            $('#n_orden').val(data.retorno);
                        }
                        else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                });
            }),
            closeAfterAdd: true
        }, //add
        {} //del
    ).navButtonAdd('#tareas_grid_pager',{caption:"Activar Orden&nbsp;&nbsp;&nbsp;",buttonicon:"ui-icon-arrow-2-n-s",
        onClickButton:function() {

            activarDragDropColumnas('tareas_grid');

        },position:"right", title:"Activar Orden Draggable", cursor:"pointer", id:'bt_activar_orden_tareas_grid'}
    ).navButtonAdd('#tareas_grid_pager',{caption:"Aplicar/Corregir&nbsp;&nbsp;&nbsp;",buttonicon:"ui-icon-disk",
        onClickButton:function() {
            guardarOrdenCampos('tareas_grid');
        },position:"right", title:"Aplicar cambios y/o corregir orden.", cursor:"pointer", id:'bt_aplicar_cambios_orden_tareas_grid'}
    );
    $('#bt_aplicar_cambios_orden_tareas_grid').hide();

    $("#tributos_grid").jqGrid({
        colNames: tributos_grid.colNames(),
        colModel: tributos_grid.colModel(),
        pager: $('#tributos_grid_pager'),
        caption: "Tributos Asociados",
        sortname:'c_tributo',
        sortorder:'asc',
        postData: tributos_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
    }).navGrid('#tributos_grid_pager',
        {add: true, edit: false, del: true}, //options
        {}, //edit
        {
            onInitializeForm: defaultInitForm(function(formid){
                inicializarLupasTrib();
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $('#c_workflow').val(v_c_workflow);
            }),
            closeAfterAdd: true
        }, //add
        {} //del
    );

    $("#workflow_grid").jqGrid({
        colNames: workflow_grid.colNames(),
        colModel: workflow_grid.colModel(),
        pager: $('#workflow_grid_pager'),
        caption: "Workflows",
        sortname:'c_workflow',
        sortorder:'asc',
        postData: workflow_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        onSelectRow: function(id){
            v_c_workflow = $("#workflow_grid").getCell(id,"c_workflow");
            setea_parametros('#tributos_grid',{':p_c_workflow': v_c_workflow});
            setea_parametros('#tareas_grid',{':p_c_workflow': v_c_workflow});
        },
        loadComplete:function(){
            $("#workflow_grid").setSelection(1);
        },
    }).navGrid('#workflow_grid_pager',
        {add: true, edit: true, del: true}, //options
        {
            onInitializeForm: defaultInitForm(function(formid){
                inicializarLupasWork();
            }),
            closeAfterEdit: true,
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $('#c_workflow').attr('readonly',true);
            }),
        },
        {
            onInitializeForm: defaultInitForm(function(formid){
                inicializarLupasWork();
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                // $('#tr_id_cons_dinamica').hide();
            }),
            closeAfterAdd: true
        }, //add
        {
            afterComplete:function(formid){
                $('#tributos_grid').trigger('reloadGrid');
                $('#tareas_grid').trigger('reloadGrid');
                v_c_workflow = null;
            }
        } //del
    );

    $("#parametros_grid").jqGrid({
        colNames: parametros_grid.colNames(),
        colModel: parametros_grid.colModel(),
        pager: $('#parametros_grid_pager'),
        caption: "Parámetros",
        sortname:'n_orden',
        sortorder:'asc',
        postData: parametros_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
    }).navGrid('#parametros_grid_pager',
        {add: true, edit: true, del: true}, //options
        {
            onInitializeForm: defaultInitForm(function(formid){
                inicializarLupasParam();
                
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $('#c_workflow').val(v_c_workflow);
                $('#c_tarea').val(v_c_tarea);
                if($('#c_tipo_param').val() == 'F'){
                    $('#tr_d_campo_php').hide();
                } else if($('#c_tipo_param').val() == 'A'){
                    $('#tr_d_valor_fijo').hide();
                }
            }),
            closeAfterEdit: true
        }, //edit
        {
            onInitializeForm: defaultInitForm(function(formid){
                inicializarLupasParam();
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $('#c_workflow').val(v_c_workflow);
                $('#c_tarea').val(v_c_tarea);
                $('#c_tipo_parametro_invocado').val("VARCHAR2");
                $('#tr_d_campo_php').hide();
                $('#tr_d_valor_fijo').hide();

                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                     "p_c_workflow":v_c_workflow,
                     "p_c_tarea":v_c_tarea,
                     "id_menu":v_id_menu,
                     "n_orden":1
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                            $('#n_orden').val(data.retorno);
                        }
                        else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                });
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
}