function init_grillas(){
    $("#d_historicos_grid").jqGrid({
        colNames: datos_d_historicos_grid.colNames(),
        colModel: datos_d_historicos_grid.colModel(),
        pager: $('#d_historicos_grid_pager'),
        caption: "Datos historicos",
        postData: datos_d_historicos_grid.postData(),
        autowidth: false,
        height:160,
        rownum:10,
        loadComplete:function(data){
            if($('#d_historicos_grid').getGridParam('postData').m_autoquery == 'S'){
                if($(this).jqGrid('getGridParam','records') == 0){
                    resetearFiltros();
                    mostrar_mensaje('Ningún registro','No se han encontrado registros para la consulta realizada.');
                }
            }
        },
    }).navGrid('#d_historicos_grid_pager',{add:false, edit:false, del:false},
        {}, //edit
        {}, //del
        {}  //add
    ).navButtonAdd('#d_historicos_grid_pager',
        {
            id:'btn_mod_hist',
            caption:"",
            position:"first",
            buttonicon: "glyphicon glyphicon-edit",
            title:"Modificar",
            cursor:"pointer",
            onClickButton:function() {
                var id = $("#d_historicos_grid").getGridParam('selrow');
                if (id) {
                    $('#rowid').val($('#d_historicos_grid').getCell(id, 'id_fila'));
                    $('#edit_objeto').val($('#d_historicos_grid').getCell(id, 'objeto'));
                    $('#edit_cd_mov_hist').val($('#d_historicos_grid').getCell(id, 'cd_mov_hist'));
                    $('#edit_dt_mov_hist_audit').val($('#d_historicos_grid').getCell(id, 'dt_mov_hist_audit'));
                    $('#edit_dt_mov_audit').val($('#d_historicos_grid').getCell(id, 'dt_mov_audit'));
                    $('#edit_tm_mov_audit').val($('#d_historicos_grid').getCell(id, 'tm_mov_audit'));
                    $('#edit_provincia').val($('#d_historicos_grid').getCell(id, 'cd_prov_ofic_audit'));
                    $('#edit_oficina').val($('#d_historicos_grid').getCell(id, 'cd_ofic_audit'));
                    $('#edit_cd_user_audit').val($('#d_historicos_grid').getCell(id, 'cd_user_audit'));
                    $('#edit_cd_prog_audit').val($('#d_historicos_grid').getCell(id, 'cd_prog_audit'));
                    $('#edit_cd_docu_ref').val($('#d_historicos_grid').getCell(id, 'cd_docu_ref'));
                    $('#edit_historico').modal("show");
                }else {
                    mostrar_validacion('Debe seleccionar un registro de la grilla.');
                    return false;
                }
            }
        });;
}
