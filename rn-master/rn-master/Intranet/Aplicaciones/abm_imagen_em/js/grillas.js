function init_grillas() {
    $("#imagenes_grid")
        .jqGrid({
            colNames: imagenes_grid.colNames(),
            colModel: imagenes_grid.colModel(),
            postData: imagenes_grid.postData(),
            caption: "Imágenes para Boletas",
            pager: $("#imagenes_grid_pager"),
            editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
            height:300,
            autowidth: false,
            sortname: "d_tributo, d_concepto, d_distribucion, d_criterio, d_provincia, d_departamento, d_localidad, d_consorcio, d_region, d_area, n_posfis_desde, n_cuota_desde",
            onSelectRow: function (id) {

            },
        })
        .navGrid(
            "#imagenes_grid_pager",
            {
                add: true,
                edit: true,
                del: true,
            },
            {
                onInitializeForm: defaultInitForm(function (formid) {
                    formulario_abm();
                }),
                beforeShowForm: defaultBeforeShowForm(function (formid) {
                    $("#d_posfis_desde").mask("9999/99");
                    $("#d_posfis_desde").css("text-align", "right");
                    $("#d_posfis_hasta").mask("9999/99");
                    $("#d_posfis_hasta").css("text-align", "right");
                }),
                closeAfterEdit: true,

            }, //edit
            {
                onInitializeForm: defaultInitForm(function (formid) {
                    formulario_abm();                }),
                beforeShowForm: defaultBeforeShowForm(function (formid) {
                    $("#d_posfis_desde").mask("9999/99");
                    $("#d_posfis_desde").css("text-align", "right");
                    $("#d_posfis_hasta").mask("9999/99");
                    $("#d_posfis_hasta").css("text-align", "right");
                }),
                closeAfterAdd: true,
            }, //add
            {} //del
        );
}
