function inicializar_grillas() {
    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Instancias" ,
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        shrinkToFit: true,
        rowList: [50, 100, 500, 1000],
        onSelectRow: function (id) {
            $('#div_botones').show();
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
    );

    $("#detail_grid").jqGrid({
        colNames: datos_detail_grid.colNames(),
        colModel: datos_detail_grid.colModel(),
        pager: $('#detail_grid_pager'),
        caption: "Obligaciones Compensadas" ,
        postData: datos_detail_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        sortname:'f_vto asc, n_posicion_fiscal asc, n_cuota asc, id_obligacion asc, c_concepto',
        sortorder:'desc',
        shrinkToFit: true,
        autowidth: false,
        rowList: [50, 100, 500, 1000],
        onSelectRow: function (id) {
            let v_i_monto_comp = $("#detail_grid").getCell(id,'i_monto_comp');

            $('#i_saldo_compensado').val(v_i_monto_comp);
        },
        loadComplete: function () {
            gridParentWidth = $('#gbox_detail_grid').parent().parent().width();
            $('#detail_grid').setGridWidth(gridParentWidth);

            if(ext_obj == 'N'){
                $('#btn_editar').hide();
            } else {
                $('#btn_editar').show();
            }
        }
    }).navGrid('#detail_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    ).navButtonAdd('#detail_grid_pager',{
        id: 'btn_editar',
        caption: "",
        position: "first",
        buttonicon: "glyphicon glyphicon-edit",
        title: "Modificar",
        cursor: "pointer",
        onClickButton: function () {
            var rowid = $('#detail_grid').jqGrid ('getGridParam', 'selrow');
            if (!rowid){
                mostrar_validacion('Debe seleccionar un registro de la grilla');
            }else {
                $('#modal_edicion').modal('show');
            }
        }
    });
}