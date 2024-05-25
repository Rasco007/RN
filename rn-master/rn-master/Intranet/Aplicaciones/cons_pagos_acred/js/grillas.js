function init_grillas(p_n_id_menu) {
    $("#cons_pagos_acred_grid").jqGrid({
        colNames: cons_pagos_acred_grid.colNames(),
        colModel: cons_pagos_acred_grid.colModel(),
        pager: $('#cons_pagos_acred_grid_pager'),
        caption: "Consulta de Pagos Acreditados",
        postData: cons_pagos_acred_grid.postData(),
        autowidth: false,
        width: 960,
        ondblClickRow: function(){
            mostrar_error('Le ha dado doble click a la grilla.');
        }
    }).navGrid('#cons_pagos_acred_grid_pager',
        {add:true, edit:true, del:true}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
}

