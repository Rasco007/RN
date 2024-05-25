function inicializarGrillas(){

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        postData: datos_main_grid.postData(),
        pager: $('#main_grid_pager'),
        caption: "Obligaciones Destino",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        sortname: 'n_posicion_fiscal desc, n_cuota',
        sortorder: 'desc',
        rownumbers: true,
        autowidth:false,
        ondblClickRow:function(rowid){
            if ($("#main_grid").getCell(rowid,'m_seleccionada') == 'NO') {
                if(v_i_credito_disponible > 0){
                    $("#main_grid").setCell(rowid,'m_seleccionada','SI');
                    modificar_saldo_imputable(rowid);
                }else{
                    mostrar_validacion('No posee crédito disponible.');
                }
            }else{
                $("#main_grid").setCell(rowid,'m_seleccionada','NO');
                modificar_saldo_imputable(rowid);
            }
        }
    }).navGrid('#main_grid_pager', {refresh:true});

    $("#creditos_grid").jqGrid({
        colNames: datos_creditos_grid.colNames(),
        colModel: datos_creditos_grid.colModel(),
        postData: datos_creditos_grid.postData(),
        pager: $('#creditos_grid_pager'),
        caption: "Creditos",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        rownumbers: true,
        autowidth:true,
        ondblClickRow:function(rowid){
            v_id_nota_cred = $("#creditos_grid").getCell(rowid,'id_nota_cred');
            v_i_credito = redondear($("#creditos_grid").getCell(rowid,'i_credito'),2);
			
			aplicar_pendiente();
			
			$("#listado_creditos").modal('hide');
        }
    }).navGrid('#creditos_grid_pager', {refresh:true});
}