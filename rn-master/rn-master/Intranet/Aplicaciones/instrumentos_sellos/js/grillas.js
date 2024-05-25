function iniciarGrillas() {
    $("#inst_sellos_grid").jqGrid({
        colNames: inst_sellos_grid.colNames(),
        colModel: inst_sellos_grid.colModel(),
        pager: $('#regimenes_grid_pager'),
        caption: " ",
        postData: inst_sellos_grid.postData(),
        autowidth: false,
        width: 940
    }).navGrid('#inst_sellos_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );
}

