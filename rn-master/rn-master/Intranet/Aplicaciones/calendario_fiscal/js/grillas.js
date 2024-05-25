function init_grillas() {
    $("#calendarios_grid")
        .jqGrid({
            colNames: calendarios_grid.colNames(),
            colModel: calendarios_grid.colModel(),
            postData: calendarios_grid.postData(),
            caption: "Calendario Fiscal",
            pager: $("#calendarios_grid_pager"),
            editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
            autowidth: false,
            sortname: "d_tipo, d_concepto, c_ultdig, n_posicion_fiscal, n_cuota",
            sortorder: "asc",
            onSelectRow: function (id) {
                setea_parametros("#plantillas_grid", {
                    ":p_c_tributo": $("#calendarios_grid").getCell(id, "c_tributo"),
                    ":p_c_concepto": $("#calendarios_grid").getCell(id, "c_concepto"),
                    ":p_c_ultdig": $("#calendarios_grid").getCell(id, "c_ultdig"),
                    ":p_n_posicion_fiscal": $("#calendarios_grid").getCell(id, "n_posicion_fiscal"),
                    ":p_n_cuota": $("#calendarios_grid").getCell(id, "n_cuota"),
                    ":p_c_tipo": $("#calendarios_grid").getCell(id, "c_tipo"),
                });
                $("#div_plantillas").show();
            },
        })
        .navGrid(
            "#calendarios_grid_pager",
            {
                add: true,
                edit: true,
                del: true,
            },
            {
                onInitializeForm: defaultInitForm(function (formid) {
                    $("#d_tributo_lupa").lupa_generica({
                        id_lista: lista_tributos,
                        titulos: ["Código", "Descripción"],
                        grid: [
                            { index: "c_codigo", width: 100 },
                            { index: "d_descrip", width: 350 },
                        ],
                        caption: "Tributos",
                        sortname: "c_codigo",
                        sortorder: "asc",
                        campos: { c_codigo: "c_tributo", d_descrip: "d_tributo" },
                        keyNav: true,
                        onClose: function () {
                            $('#c_concepto').val('');
                            $('#d_concepto').val('');
                        }
                    });

                    $("#d_concepto_lupa").lupa_generica({
                        id_lista: lista_conceptos,
                        titulos: ["Código", "Descripción"],
                        grid: [
                            { index: "c_concepto", width: 100 },
                            { index: "d_concepto", width: 350 },
                        ],
                        caption: "Conceptos",
                        sortname: "c_concepto",
                        sortorder: "asc",
                        filtros: ["#c_tributo"],
                        filtrosNulos: [false],
                        mensajeRelacionado: ['Debe ingresar el tributo primero'],
                        campos: { c_concepto: "c_concepto", d_concepto: "d_concepto" },
                        keyNav: true,
                    });

                    $("#d_tipo_lupa").lupa_generica({
                        id_lista: lista_tablas_generales,
                        titulos: ["Código", "Descripción"],
                        grid: [
                            { index: "c_codigo", width: 100 },
                            { index: "d_descrip", width: 350 },
                        ],
                        caption: "Tipos",
                        sortname: "c_codigo",
                        sortorder: "asc",
                        filtros: ["227"],
                        campos: { c_codigo: "c_tipo", d_descrip: "d_tipo" },
                        keyNav: true,
                    });
                    $("#d_posicion_fiscal").change(function () {
                        $("#n_posicion_fiscal").val($("#d_posicion_fiscal").val().replace(/\//g, ''));
                    });
                }),
                beforeShowForm: defaultBeforeShowForm(function (formid) {
                    $("#d_posicion_fiscal").mask("9999/99");
                    $("#d_posicion_fiscal").css("text-align", "right");
                    $("#c_ultdig").attr("maxlength", 1);
                    $("#c_ultdig").css("text-transform", "uppercase");
                }),
                closeAfterEdit: true,

            }, //edit
            {
                onInitializeForm: defaultInitForm(function (formid) {
                    $("#d_tributo_lupa").lupa_generica({
                        id_lista: lista_tributos,
                        titulos: ["Código", "Descripción"],
                        grid: [
                            { index: "c_codigo", width: 100 },
                            { index: "d_descrip", width: 350 },
                        ],
                        caption: "Tributos",
                        sortname: "c_codigo",
                        sortorder: "asc",
                        campos: { c_codigo: "c_tributo", d_descrip: "d_tributo" },
                        keyNav: true,
                        onClose: function () {
                            $('#c_concepto').val('');
                            $('#d_concepto').val('');
                        }
                    });

                    $("#d_concepto_lupa").lupa_generica({
                        id_lista: lista_conceptos,
                        titulos: ["Código", "Descripción"],
                        grid: [
                            { index: "c_concepto", width: 100 },
                            { index: "d_concepto", width: 350 },
                        ],
                        caption: "Conceptos",
                        sortname: "c_concepto",
                        sortorder: "asc",
                        filtros: ["#c_tributo"],
                        filtrosNulos: [false],
                        mensajeRelacionado: ['Debe ingresar el tributo primero'],
                        campos: { c_concepto: "c_concepto", d_concepto: "d_concepto" },
                        keyNav: true,
                    });

                    $("#d_tipo_lupa").lupa_generica({
                        id_lista: lista_tablas_generales,
                        titulos: ["Código", "Descripción"],
                        grid: [
                            { index: "c_codigo", width: 100 },
                            { index: "d_descrip", width: 350 },
                        ],
                        caption: "Tipos",
                        sortname: "c_codigo",
                        sortorder: "asc",
                        filtros: ["227"],
                        campos: { c_codigo: "c_tipo", d_descrip: "d_tipo" },
                        keyNav: true,
                    });
                    $("#d_posicion_fiscal").change(function () {
                        $("#n_posicion_fiscal").val($("#d_posicion_fiscal").val().replace(/\//g, ''));
                    });
                }),
                beforeShowForm: defaultBeforeShowForm(function (formid) {
                    // $("#c_workflow").val(v_c_workflow);
                    $("#d_posicion_fiscal").mask("9999/99");
                    $("#d_posicion_fiscal").css("text-align", "right");
                    $("#c_ultdig").attr("maxlength", 1);
                    $("#c_ultdig").css("text-transform", "uppercase");
                }),
                closeAfterAdd: true,
            }, //add
            {} //del
        );

    $("#plantillas_grid")
        .jqGrid({
            colNames: plantillas_grid.colNames(),
            colModel: plantillas_grid.colModel(),
            postData: plantillas_grid.postData(),
            caption: "Plantilla de Mail",
            pager: $("#plantillas_grid_pager"),
            autowidth: false,
            editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
            sortname: "d_distribucion",
            sortorder: "asc",
        })
        .navGrid(
            "#plantillas_grid_pager",
            {
                add: true,
                edit: true,
                del: true,
            },
            {
                onInitializeForm: defaultInitForm(function (formid) {
                    $("#d_distribucion_lupa").lupa_generica({
                        id_lista: lista_tablas_generales,
                        titulos: ["Código", "Descripción"],
                        grid: [
                            { index: "c_codigo", width: 100 },
                            { index: "d_descrip", width: 350 },
                        ],
                        caption: "Tipos",
                        sortname: "c_codigo",
                        sortorder: "asc",
                        filtros: ["225"],
                        campos: { c_codigo: "c_distribucion", d_descrip: "d_distribucion" },
                        keyNav: true,
                    });

                    $("#d_plantilla_mail_lupa").lupa_generica({
                        id_lista: lista_plantillas_mail,
                        titulos: ["Código", "Descripción"],
                        grid: [
                            { index: "c_codigo", width: 100 },
                            { index: "d_descrip", width: 350 },
                        ],
                        caption: "Plantillas de Mail",
                        sortname: "c_codigo",
                        sortorder: "asc",
                        filtros: ["AUT"],
                        campos: { c_codigo: "id_plantilla_mail", d_descrip: "d_plantilla_mail" },
                        keyNav: true,
                    });
                })
            }, //edit
            {
                onInitializeForm: defaultInitForm(function (formid) {
                    $("#d_distribucion_lupa").lupa_generica({
                        id_lista: lista_tablas_generales,
                        titulos: ["Código", "Descripción"],
                        grid: [
                            { index: "c_codigo", width: 100 },
                            { index: "d_descrip", width: 350 },
                        ],
                        caption: "Tipos",
                        sortname: "c_codigo",
                        sortorder: "asc",
                        filtros: ["225"],
                        campos: { c_codigo: "c_distribucion", d_descrip: "d_distribucion" },
                        keyNav: true,
                    });
                    
                    $("#d_plantilla_mail_lupa").lupa_generica({
                        id_lista: lista_plantillas_mail,
                        titulos: ["Código", "Descripción"],
                        grid: [
                            { index: "c_codigo", width: 100 },
                            { index: "d_descrip", width: 350 },
                        ],
                        caption: "Plantillas de Mail",
                        sortname: "c_codigo",
                        sortorder: "asc",
                        filtros: ["AUT"],
                        campos: { c_codigo: "id_plantilla_mail", d_descrip: "d_plantilla_mail" },
                        keyNav: true,
                    });
                }),
                beforeShowForm: defaultBeforeShowForm(function (formid) {
                    var id = $("#calendarios_grid").getGridParam('selrow');

                    $("#TblGrid_plantillas_grid #c_tributo").val($("#calendarios_grid").getCell(id, "c_tributo"));
                    $("#TblGrid_plantillas_grid #c_concepto").val($("#calendarios_grid").getCell(id, "c_concepto"));
                    $("#TblGrid_plantillas_grid #c_ultdig").val($("#calendarios_grid").getCell(id, "c_ultdig"));
                    $("#TblGrid_plantillas_grid #n_posicion_fiscal").val($("#calendarios_grid").getCell(id, "n_posicion_fiscal"));
                    $("#TblGrid_plantillas_grid #n_cuota").val($("#calendarios_grid").getCell(id, "n_cuota"));
                    $("#TblGrid_plantillas_grid #c_tipo").val($("#calendarios_grid").getCell(id, "c_tipo"));
                }),
                closeAfterAdd: true,
            }, //add
            {} //del
        );
}
