function init_grillas() {

    $("#pagos_grid").jqGrid({
        colNames: datos_pagos_grid.colNames(),
        colModel: datos_pagos_grid.colModel(),
        pager: $('#pagos_grid_pager'),
        postData: datos_pagos_grid.postData(),
        caption: "Ingreso de Fecha de Acreditación para Pagos SIRCAR ",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:400,
        sortname: 'f_pago',
        sortorder: 'asc',
        ondblClickRow:function(rowid){ 
            abrir_modal(rowid);
        },
        loadComplete:function(data){

                $('.f_acred').change(function(id){
                    let checkbox = id.currentTarget;
                    if(checkbox.checked){
                        f_pagos.push(checkbox.id);
                    } else {
                        let index = f_pagos.indexOf(checkbox.id);
                        f_pagos.splice(index, 1);
                    }
                });
                actualizar_checkboxes();
        },
    }).navGrid('#pagos_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    )

    $("#detalle_pagos_grid").jqGrid({
        colNames: datos_detalle_pagos_grid.colNames(),
        colModel: datos_detalle_pagos_grid.colModel(),
        pager: $('#detalle_pagos_grid_pager'),
        postData: datos_detalle_pagos_grid.postData(),
        caption: "Detalle de Pagos",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:300,
        sortname: 'n_cuit',
        sortorder: 'asc',
     }).navGrid('#detalle_pagos_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    )
    
}

