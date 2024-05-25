function init_grillas() {

    $("#datos_generales_grid").jqGrid({
        colNames: datos_generales_grid.colNames(),
        colModel: datos_generales_grid.colModel(),
        pager: $('#datos_generales_grid_pager'),
        caption: "Datos Generales",
        postData: datos_generales_grid.postData(),
        autowidth: false,
        width: 1250,
        onSelectRow: function () {
            $("#d_partida").val($('#datos_generales_grid').getCell($('#datos_generales_grid').getGridParam('selrow'),'d_nomenclatura'));
            $("#d_nomenclatura").val($('#datos_generales_grid').getCell($('#datos_generales_grid').getGridParam('selrow'),'d_nomenclatura_real'));

        }
    }).navGrid('#datos_generales_grid_pager',{add:false, edit:false, del:false});

    $("#valuaciones_grid").jqGrid({
        colNames: valuaciones_grid.colNames(),
        colModel: valuaciones_grid.colModel(),
        pager: $('#valuaciones_grid_pager'),
        caption: "Valuaciones",
        postData: valuaciones_grid.postData(),
        autowidth: false,
        width: 1250,
        sortname: 'f_valuacion',
        sortorder: 'desc'
    }).navGrid('#valuaciones_grid_pager',{add:false, edit:false, del:false});
    $("#gview_valuaciones_grid > .ui-jqgrid-titlebar").hide();

    $("#impuesto_grid").jqGrid({
        colNames: impuesto_grid.colNames(),
        colModel: impuesto_grid.colModel(),
        pager: $('#impuesto_grid_pager'),
        caption: "Impuestos",
        postData: impuesto_grid.postData(),
        autowidth: false,
        width: 800,
        sortname: 'n_anio',
        sortorder: 'desc',
        shrinkToFit: true
    }).navGrid('#impuesto_grid_pager',{add:false, edit:false, del:false});
    $("#gview_impuesto_grid > .ui-jqgrid-titlebar").hide();

    $("#propietarios_1_grid").jqGrid({
        colNames: propietarios_1_grid.colNames(),
        colModel: propietarios_1_grid.colModel(),
        pager: $('#propietarios_1_grid_pager'),
        caption: "Responsables",
        postData: propietarios_1_grid.postData(),
        autowidth: false,
        width: 1250,
        onSelectRow: function () {
            var id2_p1 = $('#propietarios_1_grid').getGridParam('selrow');
            if (id2_p1!=null){
                cons_prop_2();
            }
        }
    }).navGrid('#propietarios_1_grid_pager',{add:false, edit:false, del:false});


    $("#propietarios_2_grid").jqGrid({
        colNames: propietarios_2_grid.colNames(),
        colModel: propietarios_2_grid.colModel(),
        pager: $('#propietarios_2_grid_pager'),
        caption: "Domicilios",
        postData: propietarios_2_grid.postData(),
        autowidth: false,
        width: 1250
    }).navGrid('#propietarios_2_grid_pager',{add:false, edit:false, del:false});

    $("#responsables_1_grid").jqGrid({
        colNames: responsables_1_grid.colNames(),
        colModel: responsables_1_grid.colModel(),
        pager: $('#responsables_1_grid_pager'),
        caption: "Responsables",
        postData: responsables_1_grid.postData(),
        autowidth: false,
        width: 1250,
        onSelectRow: function () {
            //var id_dg_r1 = $('#datos_generales_grid').getGridParam('selrow');
            var id2_r1 = $('#responsables_1_grid').getGridParam('selrow');
            if (id2_r1!=null){
                    cons_resp_2();
            }
        }
    }).navGrid('#responsables_1_grid_pager',{add:false, edit:false, del:false});

    $("#responsables_2_grid").jqGrid({
        colNames: responsables_2_grid.colNames(),
        colModel: responsables_2_grid.colModel(),
        pager: $('#responsables_2_grid_pager'),
        caption: "Domicilios",
        postData: responsables_2_grid.postData(),
        autowidth: false,
        width: 1250
    }).navGrid('#responsables_2_grid_pager',{add:false, edit:false, del:false});

/* // FUNCIONALIDAD BOTON IRC COMENTADA PORQUE EN EL FORM ESTÁ PERO NO SE USA NI SE MUESTRA
    $("#datos_irc_1_grid").jqGrid({
        colNames: datos_irc_1_grid.colNames(),
        colModel: datos_irc_1_grid.colModel(),
        pager: $('#datos_irc_1_grid_pager'),
        caption: "Domicilios",
        postData: datos_irc_1_grid.postData(),
        autowidth: false,
        width: 480,
        onSelectRow: function () {

        }
    }).navGrid('#datos_irc_1_grid_pager',{add:false, edit:false, del:false});

    $("#datos_irc_2_grid").jqGrid({
        colNames: datos_irc_2_grid.colNames(),
        colModel: datos_irc_2_grid.colModel(),
        pager: $('#datos_irc_2_grid_pager'),
        caption: "Responsables",
        postData: datos_irc_2_grid.postData(),
        autowidth: false,
        width: 480
    }).navGrid('#datos_irc_2_grid_pager',{add:false, edit:false, del:false});
*/
    $("#movimientos_grid").jqGrid({
        colNames: movimientos_grid.colNames(),
        colModel: movimientos_grid.colModel(),
        pager: $('#movimientos_grid_pager'),
        caption: "Movimientos",
        postData: movimientos_grid.postData(),
        autowidth: false,
        width: 480,
        sortname: 'f_movimiento',
        sortorder: 'desc'//,
        //shrinkToFit: true
    }).navGrid('#movimientos_grid_pager',{add:false, edit:false, del:false});

    $("#partidas_madre_grid").jqGrid({
        colNames: partidas_madre_grid.colNames(),
        colModel: partidas_madre_grid.colModel(),
        pager: $('#partidas_madre_grid_pager'),
        caption: "Partidas Madre",
        postData: partidas_madre_grid.postData(),
        autowidth: false,
        width: 480,
        shrinkToFit: true
    }).navGrid('#partidas_madre_grid_pager',{add:false, edit:false, del:false});
}