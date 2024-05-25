function inicializarGrillas(){
    $('#d_dominio,#btn_lupa_dominio').lupa_generica({
        id_lista:v_lista_dominios,
        titulos:['Dominio','id_contribuyente','CUIT', 'Denominación', ],
        grid:[  {index:'dominio',width:100},
            {index:'id_contribuyente',width: 100, hidden:true},
            {index:'cuit',width: 120},
            {index:'denominacion',width: 400},],
        caption:'Dominios',
        sortname:'dominio',
        sortorder:'asc',
        filtroNull:true,
        filtros: ['#id_contribuyente'],
        campos:{dominio:'d_dominio'},
        keyNav:true
    });

    $('#d_concepto, #btn_lupa_concepto').lupa_generica({
        id_lista:v_lista_conceptos,
        titulos:['Código','Descripcion'],
        grid:[  {index:'c_concepto',width:100},
            {index:'d_concepto',width:450}],
        caption:'Conceptos',
        sortname:'d_concepto',
        sortorder:'asc',
        filtros:[170],
        campos:{c_concepto:'c_concepto',d_concepto:'d_concepto'},
        keyNav:true,
        foco:"#d_label"
    });
    
    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Cuenta Corriente Telepeaje" ,
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#detalle_grid").jqGrid({
        colNames: datos_detalles_grid.colNames(),
        colModel: datos_detalles_grid.colModel(),
        pager: $('#detalle_grid_pager'),
        postData: datos_detalles_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth:false,
        shrinkToFit: true,
        loadComplete: function () {
            gridParentWidth = $('#gbox_detalle_grid').parent().parent().width();
            $('#detalle_grid').setGridWidth(gridParentWidth);
        }
    }).navGrid('#detalle_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

}