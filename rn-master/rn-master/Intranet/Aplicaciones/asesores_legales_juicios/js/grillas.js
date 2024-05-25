function inicializar_grillas(){
    $("#asesores_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#asesores_grid_pager'),
        caption: "Asesores Legales" ,
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        shrinkToFit: true,
        sortname:'n_cuit_asesor_legal, d_circunscripcion',
        sortorder:'desc',
        rowList: [50, 100, 500, 1000],
        onSelectRow: function (id) {
            let v_n_cuit_asesor_legal = $("#asesores_grid").getCell(id,'n_cuit_asesor_legal');
            let v_cant_juicios_con_cta_banc = $("#asesores_grid").getCell(id,'cant_juicios_con_cta_banc');
            let v_cant_juicios_sin_cta_banc = $("#asesores_grid").getCell(id,'cant_juicios_sin_cta_banc');
            let v_puntaje_final = $("#asesores_grid").getCell(id,'puntaje_final');
            let v_coeficiente_manual = $("#asesores_grid").getCell(id,'coeficiente_manual');

            $('#n_cuit_asesor_legal').val(v_n_cuit_asesor_legal);
            $('#cant_juicios_con_cta_banc').val(v_cant_juicios_con_cta_banc);
            $('#cant_juicios_sin_cta_banc').val(v_cant_juicios_sin_cta_banc);
            $('#puntaje_final').val(v_puntaje_final);
            $('#n_coeficiente').val(v_coeficiente_manual);
        },
        gridComplete: function (){
        },
        loadComplete: function () {
            gridParentWidth = $('#gbox_asesores_grid').parent().parent().width();
            $('#asesores_grid').setGridWidth(gridParentWidth);
        }
    }).navGrid('#asesores_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    ).navButtonAdd('#asesores_grid_pager',{
        id: 'btn_editar_asesores',
        caption: "",
        position: "first",
        buttonicon: "glyphicon glyphicon-edit",
        title: "Editar",
        cursor: "pointer",
        onClickButton: function () {
            var rowid = $('#asesores_grid').jqGrid ('getGridParam', 'selrow');
            if (!rowid){
                mostrar_validacion('Debe seleccionar un registro de la grilla.');
            }else {
                $("#modal_editar").modal('show');
            }
        }
    });

    $("#juicios_grid").jqGrid({
        colNames: datos_detail_grid.colNames(),
        colModel: datos_detail_grid.colModel(),
        pager: $('#juicios_grid_pager'),
        caption: "Juicios" ,
        postData: datos_detail_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        shrinkToFit: true,
        rowList: [50, 100, 500, 1000],
        autowidth: false,
        sortname:'n_cuit_representante_fiscal, d_circunscripcion',
        sortorder:'desc',
        onSelectRow: function (id) {
            let v_n_cuit_representante_fiscal = $("#juicios_grid").getCell(id,'n_cuit_representante_fiscal');
            let v_d_representante_fiscal = $("#juicios_grid").getCell(id,'d_representante_fiscal');
            let v_n_cuit_patrocinante = $("#juicios_grid").getCell(id,'n_cuit_patrocinante');
            let v_d_patrocinante = $("#juicios_grid").getCell(id,'d_patrocinante');
            let v_n_cant_firmantes = $("#juicios_grid").getCell(id,'n_cant_firmantes');
            let v_id_boleta_deuda = $("#juicios_grid").getCell(id,'id_boleta_deuda');

            $('#n_cuit_represen').val(v_n_cuit_representante_fiscal);
            $('#d_denominacion_represen').val(v_d_representante_fiscal);
            $('#n_cuit_patro').val(v_n_cuit_patrocinante);
            $('#d_denominacion_patro').val(v_d_patrocinante);
            $('#firmantes').val(v_n_cant_firmantes);
            $('#id_boleta_deuda').val(v_id_boleta_deuda);
        },
        loadComplete: function () {
            gridParentWidth = $('#gbox_juicios_grid').parent().parent().width();
            $('#juicios_grid').setGridWidth(gridParentWidth);
        }
    }).navGrid('#juicios_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    ).navButtonAdd('#juicios_grid_pager',{
        id: 'btn_editar_juicio',
        caption: "",
        position: "first",
        buttonicon: "glyphicon glyphicon-edit",
        title: "Editar",
        cursor: "pointer",
        onClickButton: function () {
            var rowid = $('#juicios_grid').jqGrid ('getGridParam', 'selrow');
            if (!rowid){
                mostrar_validacion('Debe seleccionar un registro de la grilla.');
            }else {
                $("#modal_editar_juicio").modal('show');
            }
        }
    });
}