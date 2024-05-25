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

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Datos",
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );
}