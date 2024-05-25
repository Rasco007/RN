function init_grillas(){

    $("#detalle_deuda_grid").jqGrid({
        colNames: datos_detalle_deuda_grid.colNames(),
        colModel: datos_detalle_deuda_grid.colModel(),
        pager: $('#detalle_deuda_grid_pager'),
        postData: datos_detalle_deuda_grid.postData(),
        caption: "Detalle de deuda",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:300,
        sortname: 'linea',
        sortorder: 'asc',
        rowNum:2000,
        rowattr: function(row){
            if(row.c_concepto == 980){
                return {'class': 'tasa_de_liq'};
            }
            if(row.c_en_inspeccion == 'S'){
                return {'class': 'en_inspeccion'};
            }
        },
        loadComplete:function(data){
            if(data.rows){
                checkeos_deuda(data.rows);
            }
            setear_ids();
            setear_evento_checkboxes();
            calcular_totales(id_sesion);
            actualizar_total_y_restante();
        },
    }).navGrid('#detalle_deuda_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    );
}