function init_grillas() {
    $("#emisiones_grid").jqGrid({
        colNames: emisiones_grid.colNames(),
        colModel: emisiones_grid.colModel(),
        postData: emisiones_grid.postData(),
        caption: "Emisiones",
        pager: $('#emisiones_grid_pager'),
        autowidth: false,
        sortname: "id_sesion",
        sortorder: " desc, n_posicion_fiscal desc ,n_cuota desc",
        onSelectRow: function(id){
            var v_id_sesion = $("#emisiones_grid").getCell(id,"id_sesion");
            setea_parametros('#boletas_emitidas_grid',{
                ':id_sesion': v_id_sesion}
            );
            if($('#emisiones_grid').getCell(id, 'c_control') == 'C'){
                $("#btn_imprimir_emision").show();
                $("#btn_aprobar_emision").hide();
            }else{
                if($('#emisiones_grid').getCell(id, 'd_estado') == 'EMITIDA'){
                    $("#btn_imprimir_emision").hide();
                    $("#btn_aprobar_emision").show();
                }else{
                    // la emision tiene errores, estado LIQUIDADO
                    $("#btn_aprobar_emision").hide();
                }
            }
            
            if($('#emisiones_grid').getCell(id, 'n_errores') > 0){
                $("#btn_errores_emisiones").show();
            }else{
                $("#btn_errores_emisiones").hide();
            }
        }
    }).navGrid('#emisiones_grid_pager',{add:false, edit:false, del:false}
    ).navButtonAdd('#emisiones_grid_pager',{
        id:'btn_errores_emisiones',
        caption:"Errores",
        position:"last",
        buttonicon: "",
        title:"Errores",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#emisiones_grid").getGridParam('selrow');
            if (id) {
                setea_parametros('#errores_emisiones_grid',{
                    ':c_tributo': $("#c_tributo").val(),
                    ':c_concepto': $("#c_concepto").val(),
                    ':n_anio': $("#n_anio").val(),
                    ':n_cuota': $("#n_cuota").val()
                });
                $("#modal_errores_emi").modal('show');
                $(window).resize();
            }else {
                mostrar_validacion('Debe seleccionar un registro de la grilla.');
            }
        }
    });

    $("#boletas_emitidas_grid").jqGrid({
        colNames: boletas_emitidas_grid.colNames(),
        colModel: boletas_emitidas_grid.colModel(),
        postData: boletas_emitidas_grid.postData(),
        caption: "Boletas Emitidas",
        pager: $('#boletas_emitidas_grid_pager'),
        autowidth: false,
        sortname: "n_orden",
        sortorder: "asc"
    }).navGrid('#boletas_emitidas_grid_pager',{add:false, edit:false, del:false});

    $("#errores_emisiones_grid").jqGrid({
        colNames: errores_emisiones_grid.colNames(),
        colModel: errores_emisiones_grid.colModel(),
        postData: errores_emisiones_grid.postData(),
        caption: "Errores",
        pager: $('#errores_emisiones_grid_pager'),
        autowidth: false,
        sortname: "n_posicion_fiscal",
        sortorder: "desc ,n_cuota desc"
    }).navGrid('#errores_emisiones_grid_pager',{add:false, edit:false, del:false});
}