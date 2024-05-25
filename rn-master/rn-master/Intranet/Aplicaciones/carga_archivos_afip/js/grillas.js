function inicializarGrillas(){
    $("#archivos_grid").jqGrid({
        colNames: archivos_grid.colNames(),
        colModel: archivos_grid.colModel(),
        pager: $('#archivos_grid_pager'),
        caption: "Archivos Cargados",
        postData: archivos_grid.postData(),
        autowidth: false,
        width: 1450,
        height: 700,
        sortname: 'id_archivo',
        sortorder: 'desc',
        shrinkToFit: true,
        loadComplete: function(){
            if($('#archivos_grid').getGridParam('records') > 0){
                $('#archivos_grid').jqGrid('setSelection', 1);
            }
        },
        onSelectRow: function(id){
            $('#cant_011').val($('#archivos_grid').getCell(id, 'reg_f011'));
            $('#cant_030').val($('#archivos_grid').getCell(id, 'reg_f030'));
            $('#cant_030_ali').val($('#archivos_grid').getCell(id, 'reg_f030_ali'));
            $('#cant_030_web').val($('#archivos_grid').getCell(id, 'reg_f030_web'));
            $('#cant_010').val($('#archivos_grid').getCell(id, 'reg_f010'));
            $('#cant_301').val($('#archivos_grid').getCell(id, 'reg_f301'));
            $('#cant_8100').val($('#archivos_grid').getCell(id, 'reg_8100'));
            $('#cant_2082').val($('#archivos_grid').getCell(id, 'reg_f2082'));
            $('#cant_2083').val($('#archivos_grid').getCell(id, 'reg_f2083'));
            $('#cant_contribuyentes').val($('#archivos_grid').getCell(id, 'reg_contribuyentes'));
            $('#cant_err').val($('#archivos_grid').getCell(id, 'reg_err'));
            $('#cant_descartados').val($('#archivos_grid').getCell(id, 'reg_descartados'));
            $('#cant_reg_tot').val($('#archivos_grid').getCell(id, 'reg_total'));
            
        }
    }).navGrid('#archivos_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    ).navButtonAdd('#archivos_grid_pager',
    {
        id:'btn_baja_archivos',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-trash",
        title:"Baja",
        cursor:"pointer",
        onClickButton:function() {
            eliminar_archivo();
        }
    });

    $("#logs_grid").jqGrid({
        colNames: logs_grid.colNames(),
        colModel: logs_grid.colModel(),
        pager: $('#logs_grid_pager'),
        caption: "Mensajes de la base",
        postData: logs_grid.postData(),
        autowidth: false,
        width: 1450,
        height: 400,
        sortname: 'id_log',
        sortorder: 'desc',
        shrinkToFit: true,
        loadComplete: function(){
            if($('#logs_grid').getGridParam('records') > 0){
                $('#logs_grid').jqGrid('setSelection', 1);
                $('#logs_modal').show()
                $(window).resize();  
            } else{
                if(v_carga_inicial_logs){
                    mostrar_cuadro('I', 'Información', 'No hay logs asociados al archivo seleccionado');
                    $('#logs_modal').hide();
                    return;
                } else{
                    v_carga_inicial_logs = true;
                }
            }
        },
        onSelectRow: function(id){
            
        }
    }).navGrid('#logs_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
}