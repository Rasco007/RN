function inicializarGrillas(){
    $("#boletas_grid").jqGrid({
        colNames:boletas_grid.colNames(),
        colModel:boletas_grid.colModel(),
        autowidth:false,
        height:300,
        pager: $('#boletas_grid_pager'),
        caption:"Boletas Agrupadas" ,
        postData:boletas_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname: 'c_tributo, d_objeto_hecho, n_posicion_fiscal, n_cuota_anticipo',
        sortorder: 'asc',
        onSelectRow: function(id) {
            $('#f_emision_agr').val($('#boletas_grid').getCell(id, 'f_emision_agr'));
            $('#f_vto_agr').val($('#boletas_grid').getCell(id, 'f_vto_agr'));
            $('#f_vto_2').val($('#boletas_grid').getCell(id, 'f_vto_2'));
            $('#total_2dovto').val(formatearNumero($('#boletas_grid').getCell(id, 'i_importe_2')));
            //$('#total_2dovto').val($('#boletas_grid').getCell(id, 'i_importe_2'));
        },
        loadComplete:function(){
            $("#boletas_grid").setSelection(1);
        },
    }).navGrid('#boletas_grid_pager',
        {add:false, edit:false, del:false}, //options
        {
            width:700,
            beforeInitData: function(formid) { 
                if(!boleta_editable()){
                    mostrar_error('No se puede editar el importe de esta boleta.');
                    return false;        
                }
                return true;
            },
        }, // edit options
        {}, // add options
        {}, // del options
    );
}