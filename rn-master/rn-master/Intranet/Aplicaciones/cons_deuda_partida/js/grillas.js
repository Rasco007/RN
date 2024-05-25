function inicializarGrillas(){

    $("#main_grid").jqGrid({
        colNames: v_datos_grilla.colNames(),
        colModel: v_datos_grilla.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Deudas",
        postData: v_datos_grilla.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        rownumbers: true,
        sortname: 'n_posicion_fiscal',
        sortorder: 'desc',
        ondblClickRow:function(rowid){
            setea_parametros("#detalle_grid",
                {':p_f_actualizacion':$('#f_actualizacion').val(),
                ':id_obligacion':$("#main_grid").getCell(rowid,'id_obligacion')
                },'S'
            );
            $("#modal_detalle").modal('show');
            $(window).resize();
        }
    }).navGrid('#main_grid_pager', {refresh:true});

    $("#detalle_grid").jqGrid({
        colNames: datos_detalle_grid.colNames(),
        colModel: datos_detalle_grid.colModel(),
        pager: $('#detalle_grid_pager'),
        postData: datos_detalle_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        sortname: 'n_secuencia_obl',
        sortorder: 'asc',
        autowidth:false
    }).navGrid('#detalle_grid_pager', {refresh:true});
    
    $("#ajustes_grid").jqGrid({
        colNames:datos_ajustes_grid.colNames(),
        colModel:datos_ajustes_grid.colModel(),
        postData:datos_ajustes_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        pager: $('#ajustes_grid_pager'),
        height:150,
        autowidth:false
    }).navGrid('#ajustes_grid_pager', {add:false, edit:false, del:false,refresh:false});

}