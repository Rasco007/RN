function inicializar_grillas() {
    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Valuaciones",
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH + "maestro_abm_grid.php",
        sortname:'n_modelo_año, n_año_fiscal',
        sortorder:'desc',
        rowList: [50, 100, 500, 1000],
        onSelectRow: function (id) {
            let v_c_marca = $("#main_grid").getCell(id,'c_marca_aut');
            let v_d_marca = $("#main_grid").getCell(id,'d_marca_aut');
            let v_id_modelo = $("#main_grid").getCell(id,'id_modelo');
            let v_d_modelo = $("#main_grid").getCell(id,'d_modelo');
            let v_id_descripcion = $("#main_grid").getCell(id,'id_descripcion');
            let v_d_descrip = $("#main_grid").getCell(id,'d_descrip');
            let v_n_modelo_anio = $("#main_grid").getCell(id,'n_modelo_año');
            let v_n_anio_fiscal = $("#main_grid").getCell(id,'n_año_fiscal');
            let v_n_mes_fiscal = $("#main_grid").getCell(id,'n_mes_fiscal');
            let v_c_grupo = $("#main_grid").getCell(id,'c_grupo');
            let v_d_grupo = $("#main_grid").getCell(id,'d_grupo');
            let v_m_nacional_importado = $("#main_grid").getCell(id,'m_nacional_importado');
            let v_n_valuacion = $("#main_grid").getCell(id,'n_valuacion');
            let v_c_origen = $("#main_grid").getCell(id,'c_origen');
            let v_d_origen = $("#main_grid").getCell(id,'d_origen');
            let v_m_proyecto = $("#main_grid").getCell(id,'m_proyecto');
            let v_c_moneda = $("#main_grid").getCell(id,'c_moneda');

            $('#c_marca_edit').val(v_c_marca);
            $('#d_marca_edit').val(v_d_marca);
            $('#c_modelo_edit').val(v_id_modelo);
            $('#d_modelo_edit').val(v_d_modelo);
            $('#c_descrip_edit').val(v_id_descripcion);
            $('#d_descrip_edit').val(v_d_descrip);
            $('#anio_fiscal_edit').val(v_n_anio_fiscal);
            $('#mes_fiscal_edit').val(v_n_mes_fiscal);
            $('#modelo_anio_edit').val(v_n_modelo_anio);
            $('#nac_imp_edit').val(v_m_nacional_importado);
            $('#c_grupo_edit').val(v_c_grupo);
            $('#d_grupo_edit').val(v_d_grupo);
            $('#c_origen_edit').val(v_c_origen);
            $('#d_origen_edit').val(v_d_origen);
            $('#valuacion_edit').val(v_n_valuacion);

            $('#c_marca_inicial').val(v_c_marca);
            $('#c_modelo_inicial').val(v_id_modelo);
            $('#c_descrip_inicial').val(v_id_descripcion);
            $('#anio_fiscal_inicial').val(v_n_anio_fiscal);
            $('#mes_fiscal_inicial').val(v_n_mes_fiscal);
            $('#modelo_anio_inicial').val(v_n_modelo_anio);
            $('#c_moneda_inicial').val(v_c_moneda);

            if(v_m_proyecto == 'SI'){
                $('#proyecto_ley_edit').val('S');
            } else {
                $('#proyecto_ley_edit').val('N');
            }
        },
        loadComplete: function () {
            gridParentWidth = $('#main_grid_grid').parent().parent().width();
            $('#main_grid').setGridWidth(gridParentWidth);

            if(p_modo == 'C'){
                $('#btn_editar_valuacion').hide();
            } else {
                $('#btn_editar_valuacion').show();
            }
        }
    }).navGrid('#main_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    ).navButtonAdd('#main_grid_pager',{
        id: 'btn_editar_valuacion',
        caption: "",
        position: "first",
        buttonicon: "glyphicon glyphicon-edit",
        title: "Editar",
        cursor: "pointer",
        onClickButton: function () {
            var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
            if (!rowid){
                mostrar_validacion('Debe seleccionar un registro de la grilla');
            }else {
                $('#modal_edit_valuacion').modal('show');
            }
        }}
    );

    $("#detail_grid").jqGrid({
        colNames: datos_detalle_grid.colNames(),
        colModel: datos_detalle_grid.colModel(),
        pager: $('#detail_grid_pager'),
        caption: "Detalles de autos",
        postData: datos_detalle_grid.postData(),
        editurl: FUNCIONES_BASEPATH + "maestro_abm_grid.php",
        shrinkToFit: true,
        autowidth: false,
        rowList: [50, 100, 500, 1000],
        onSelectRow: function (id) {},
        gridComplete: function () {},
        loadComplete: function () {
            gridParentWidth = $('#detail_grid_pager').parent().parent().width();
            $('#detail_grid').setGridWidth(gridParentWidth);
        }
    }).navGrid('#detail_grid_pager',
        {add: false, edit: false, del: false}, //options
        {}, //edit
        {}, //add
        {} //del
    );
}