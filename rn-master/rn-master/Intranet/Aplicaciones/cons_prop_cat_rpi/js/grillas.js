function init_grillas() {
    $("#catastro_grid").jqGrid({
        colNames: catastro_grid.colNames(),
        colModel: catastro_grid.colModel(),
        pager: $('#catastro_grid_pager'),
        caption: "Catastro",
        postData: catastro_grid.postData(),
        autowidth: false,
        width: 800,
        sortname: 'fecha_condicion',
        sortorder: 'desc',
        shrinkToFit: true,
        height: 110,
        onSelectRow: function () {
            $('#cat_dom').val($('#catastro_grid').getCell($('#catastro_grid').getGridParam('selrow'),'domicilio'));
        }
    }).navGrid('#catastro_grid_pager',{add:false, edit:false, del:false});

    $("#rpi_grid").jqGrid({
        colNames: rpi_grid.colNames(),
        colModel: rpi_grid.colModel(),
        pager: $('#rpi_grid_pager'),
        caption: "RPI",
        postData: rpi_grid.postData(),
        autowidth: false,
        width: 800,
        sortname: 'f_escritura',
        sortorder: 'desc',
        shrinkToFit: true,
        height: 110,
        onSelectRow: function () {
            $('#rpi_dom').val($('#rpi_grid').getCell($('#rpi_grid').getGridParam('selrow'),'domicilio'));
        }
    }).navGrid('#rpi_grid_pager',{add:false, edit:false, del:false});

    $("#siat_grid").jqGrid({
        colNames: siat_grid.colNames(),
        colModel: siat_grid.colModel(),
        pager: $('#siat_grid_pager'),
        caption: "RPI",
        postData: siat_grid.postData(),
        autowidth: false,
        width: 800,
        sortname: 'f_vig_desde',
        sortorder: 'desc',
        shrinkToFit: true,
        height: 110,
        onSelectRow: function () {
            cons_dom_siat();
        }
    }).navGrid('#siat_grid_pager',{add:false, edit:false, del:false});
}