function inicializar_grillas() {
    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Contribuyentes y Objetos para Juicios",
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH + "maestro_abm_grid.php",
        shrinkToFit: true,
        rowList: [50, 100, 500, 1000],
        onSelectRow: function (id) {
        },
        gridComplete: function () {
        },
        loadComplete: function () {
            gridParentWidth = $('#main_grid_grid').parent().parent().width();
            $('#main_grid').setGridWidth(gridParentWidth);
        }
    }).navGrid('#main_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    ).navButtonAdd('#main_grid_pager',{
        id: 'btn_incluir',
        caption: "Incluir en Juicio",
        position: "last",
        buttonicon: "ui-icon-arrowthickstop-1-s",
        title: "Incluir en Juicio",
        cursor: "pointer",
        onClickButton: function () {
            if(contribuyentes.length <= 0){
                mostrar_cuadro('E', 'Error', 'Debe seleccionar un checkbox de la grilla antes de procesar');
                return;
            } else {
                incluir_excluir_juicios('S');
            }
        }}
    ).navButtonAdd('#main_grid_pager',{
        id: 'btn_excluir',
        caption: "Excluir en Juicio",
        position: "last",
        buttonicon: "ui-icon-arrowthickstop-1-s",
        title: "Excluir de Juicio",
        cursor: "pointer",
        onClickButton: function () {
            if(contribuyentes.length <= 0){
                mostrar_cuadro('E', 'Error', 'Debe seleccionar un checkbox de la grilla antes de procesar');
                return;
            } else {
                incluir_excluir_juicios('N');
            }
        }}
    );
}