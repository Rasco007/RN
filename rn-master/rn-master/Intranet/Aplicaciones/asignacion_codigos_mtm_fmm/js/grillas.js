function init_grillas(){

    var main_grid_datos = new GridParam({
        id_menu: v_id_menu,
        n_grid: 0,
        n_orden:0,
        m_autoquery:'S',
        param:{':p_marca':null,':p_c_fmcamod':p_c_fmcamod}
    });

    var asignados_datos = new GridParam({
        id_menu: v_id_menu,
        n_grid: 1,
        n_orden:0,
        m_autoquery:'S',
        param:{':p_marca':null,':p_c_fmcamod':p_c_fmcamod}
    });

    var no_asignados_datos = new GridParam({
        id_menu: v_id_menu,
        n_grid: 2,
        n_orden:0,
        m_autoquery:'S',
        param:{':p_marca':null,':p_c_fmcamod':p_c_fmcamod}
    });

    $("#main_grid").jqGrid({
        colNames: main_grid_datos.colNames(),
        colModel: main_grid_datos.colModel(),
        pager: $('#main_grid_pager'),
        postData: main_grid_datos.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        shrinkToFit: true,
        autowidth: false,
        height: 350,
        sortname:'rownum',
        sortorder:'asc',
        onSelectRow: function (id) {
            var rnpa_val = $("#main_grid").getCell(id, 'd_marca') + "  " + $("#main_grid").getCell(id, 'd_descripcion') + "  "+ $("#main_grid").getCell(id, 'd_tipo');
            var siat_val = $("#main_grid").getCell(id, 'd_marca_siat') + "  " + $("#main_grid").getCell(id, 'd_modelo_siat') + "  "+ $("#main_grid").getCell(id, 'd_descripcion_siat');

            if(rnpa_val){
                $('#rnpa').val(rnpa_val);
            }

            if(siat_val){
                $('#siat').val(siat_val);
                return;
            }

            $('#siat').val('');
        },
        loadComplete: function(){
            
        }}).navGrid('#main_grid_pager',
        {add:false, edit:true, del:false},
        {
            top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
                // inicializa_lupas_main_grid(formid);
            }),
            closeAfterEdit: true
        }, //edit
        {
            top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
                // inicializa_lupas_main_grid(formid);
            }),
            closeAfterAdd: true
        }, //add
        {} //del
    );

        $("#asignados_grid").jqGrid({
            colNames: asignados_datos.colNames(),
            colModel: asignados_datos.colModel(),
            pager: $('#asignados_grid_pager'),
            postData: asignados_datos.postData(),
            editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
            shrinkToFit: true,
            autowidth: false,
            height: 350,
            sortname:'rownum',
        sortorder:'asc',
            onSelectRow: function (id) {
                var rnpa_val = $("#asignados_grid").getCell(id, 'd_marca') + "  " + $("#asignados_grid").getCell(id, 'd_descripcion') + "  "+ $("#asignados_grid").getCell(id, 'd_tipo');
                var siat_val = $("#asignados_grid").getCell(id, 'd_marca_siat') + "  " + $("#asignados_grid").getCell(id, 'd_modelo_siat') + "  "+ $("#asignados_grid").getCell(id, 'd_descripcion_siat');
    
                if(rnpa_val){
                    $('#rnpa').val(rnpa_val);
                }
    
                if(siat_val){
                    $('#siat').val(siat_val);
                    return;
                }

                $('#siat').val('');
                
            },
            loadComplete: function(){
                
            }}).navGrid('#asignados_grid_pager',
            {add:false, edit:true, del:false},
            {
                top:500,
                left: 0,
                width: 700,
                onInitializeForm: defaultInitForm(function(formid){
                    // inicializa_lupas_main_grid(formid);
                }),
                closeAfterEdit: true
            }, //edit
            {
                top:500,
                left: 0,
                width: 700,
                onInitializeForm: defaultInitForm(function(formid){
                    // inicializa_lupas_main_grid(formid);
                }),
                closeAfterAdd: true
            }, //add
            {} //del
        );

            $("#no_asignados_grid").jqGrid({
                colNames: no_asignados_datos.colNames(),
                colModel: no_asignados_datos.colModel(),
                pager: $('#no_asignados_grid_pager'),
                postData: no_asignados_datos.postData(),
                editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
                shrinkToFit: true,
                autowidth: false,
                height: 350,
                sortname:'rownum',
                sortorder:'asc',
                onSelectRow: function (id) {
                    var rnpa_val = $("#no_asignados_grid").getCell(id, 'd_marca') + "  " + $("#no_asignados_grid").getCell(id, 'd_descripcion') + "  "+ $("#no_asignados_grid").getCell(id, 'd_tipo');

                    var siat_val = $("#no_asignados_grid").getCell(id, 'd_marca_siat') + "  " + $("#no_asignados_grid").getCell(id, 'd_modelo_siat') + "  "+ $("#no_asignados_grid").getCell(id, 'd_descripcion_siat');
        
                    if(rnpa_val){
                        $('#rnpa').val(rnpa_val);
                    }
        
                    if(siat_val){
                        $('#siat').val(siat_val);
                        return;
                    }
    
                    $('#siat').val('');
                },
                loadComplete: function(){
                    
                }}).navGrid('#no_asignados_grid_pager',
                {add:false, edit:true, del:false},
                {
                    top:500,
                    left: 0,
                    width: 700,
                    onInitializeForm: defaultInitForm(function(formid){
                        // inicializa_lupas_main_grid(formid);
                    }),
                    closeAfterEdit: true
                }, //edit
                {
                    top:500,
                    left: 0,
                    width: 700,
                    onInitializeForm: defaultInitForm(function(formid){
                        // inicializa_lupas_main_grid(formid);
                    }),
                    closeAfterAdd: true
                }, //add
                {} //del
            );
}