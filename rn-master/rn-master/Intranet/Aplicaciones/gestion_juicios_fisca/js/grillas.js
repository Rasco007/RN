function inicializar_grillas(){
    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Juicios" ,
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        shrinkToFit: true,
        rowList: [50, 100, 500, 1000],
        autowidth: false,
        onSelectRow: function (id) {
            let v_n_cuit_representante_fiscal = $("#main_grid").getCell(id,'n_cuit_representante_fiscal');
            let v_d_representante_fiscal = $("#main_grid").getCell(id,'d_representante_fiscal');
            let v_n_cuit_patrocinante = $("#main_grid").getCell(id,'n_cuit_patrocinante');
            let v_d_patrocinante = $("#main_grid").getCell(id,'d_patrocinante');
            let v_n_cant_firmantes = $("#main_grid").getCell(id,'n_cant_firmantes');
            let v_id_boleta_deuda = $("#main_grid").getCell(id,'id_boleta_deuda');

            $('#n_cuit_represen').val(v_n_cuit_representante_fiscal);
            $('#d_denominacion_represen').val(v_d_representante_fiscal);
            $('#n_cuit_patro').val(v_n_cuit_patrocinante);
            $('#d_denominacion_patro').val(v_d_patrocinante);
            $('#firmantes').val(v_n_cant_firmantes);
            $('#id_boleta_deuda').val(v_id_boleta_deuda);
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
        id: 'btn_editar_grupo',
        caption: "",
        position: "first",
        buttonicon: "glyphicon glyphicon-edit",
        title: "Editar",
        cursor: "pointer",
        onClickButton: function () {
            var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
            if (!rowid){
                mostrar_validacion('Debe seleccionar un registro de la grilla.');
            }else {
                $("#modal_editar_juicio").modal('show');
            }
        }
    });
}