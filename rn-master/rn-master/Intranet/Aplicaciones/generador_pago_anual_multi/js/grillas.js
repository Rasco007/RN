function init_grillas(){

    $("#det_pago_anual_grid").jqGrid({
        colNames: datos_det_pago_anual_grid.colNames(),
        colModel: datos_det_pago_anual_grid.colModel(),
        pager: $('#det_pago_anual_grid_pager'),
        postData: datos_det_pago_anual_grid.postData(),
        caption: "Detalle de Pagos Anuales",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:300,
        sortname: 'd_objeto_hecho',
        sortorder: 'asc',
        rowattr: function(row){
            if(row.estado == 'E'){
                return {'class': 'rojo'};
            }
        },
        loadComplete:function(data){
            setear_ids_checkboxes();
            setear_evento_checkboxes();
            actualizar_checkboxes();
            actualizar_error(1);
        },
        onSelectRow: function(rowid) {
            actualizar_error(rowid);
        }
        }).navGrid('#det_pago_anual_grid_pager',
            {add:false, edit:false, del:false}, //options
            {},//edit,
            {},//alta
            {}//del
        )
}