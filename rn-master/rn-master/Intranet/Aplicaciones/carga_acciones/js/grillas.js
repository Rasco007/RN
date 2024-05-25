function inicializar_grillas() {
    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Acciones del Caso" ,
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        shrinkToFit: true,
        rowList: [50, 100, 500, 1000],
        onSelectRow: function (id) {
            let v_c_accion = $("#main_grid").getCell(id,'d_dato1');

            filtros_no_nativos_ar['main_grid'] = [];
            filtros_no_nativos_ar['main_grid'].push('Nro. Operativo: ' + p_id_operativo);

            if(v_c_accion == 'A'){
                $('#btn_eliminar_accion').hide();
            } else {
                $('#btn_eliminar_accion').show();
            }
        },
        loadComplete: function () {
            gridParentWidth = $('#gbox_main_grid').parent().parent().width();
            $('#main_grid').setGridWidth(gridParentWidth);
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    ).navButtonAdd('#main_grid_pager',{
        id: 'btn_eliminar_accion',
        caption: "",
        position: "first",
        buttonicon: "glyphicon glyphicon-trash",
        title: "Eliminar Acción",
        cursor: "pointer",
        onClickButton: function () {
            var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
            if (!rowid){
                mostrar_validacion('Debe seleccionar un registro de la grilla');
            }else {
                mostrar_cuadro('C',
                    'Eliminar Acción',
                    'No sera posible revertir esta acción.',
                    function () {
                        eliminarAccion(p_id_operativo, p_n_orden, $("#main_grid").getCell(rowid,'n_accion'));
                    });
            }
        }}
    ).navButtonAdd('#main_grid_pager',{
        id: 'btn_agregar_accion',
        caption: "",
        position: "first",
        buttonicon: "glyphicon glyphicon-plus",
        title: "Incorporar Acción",
        cursor: "pointer",
        onClickButton: function () {
            $('#modal_add_accion').modal('show');
        }}
    );
}