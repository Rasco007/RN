function init_grillas(){

    $("#plan_pagos_grid").jqGrid({
        colNames: datos_plan_pagos_grid.colNames(),
        colModel: datos_plan_pagos_grid.colModel(),
        pager: $('#plan_pagos_grid_pager'),
        postData: datos_plan_pagos_grid.postData(),
        caption: "Datos de Planes de Pago",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:300,
        sortname: 'c_tributo, c_concepto, n_plan_pago',
        sortorder: 'asc',
        loadComplete:function(){
            if($("#plan_pagos_grid").jqGrid('getGridParam', 'reccount') > 0){
                $('#div_grid').show();
                $('#div_datos_planes').hide();
            }else{
                $('#div_grid').hide();
                $('#div_datos_planes').show();
            }
            $(window).resize();
        }
    }).navGrid('#plan_pagos_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    );
}