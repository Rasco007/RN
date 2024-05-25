function inicializarGrillas(){

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Fiscalizaciones Asignadas" ,
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        shrinkToFit: true,
        onSelectRow: function (id) {
            let v_id_contribuyente = $("#main_grid").getCell(id,'id_contribuyente');
            let v_id_inspeccion = $("#main_grid").getCell(id,'id_inspeccion');

            $('#p_id_contribuyente').val(v_id_contribuyente);
            $('#p_id_inspeccion').val(v_id_inspeccion);

        },
        loadComplete: function () {
            gridParentWidth = $('#gbox_main_grid').parent().parent().width();
            $('#main_grid').setGridWidth(gridParentWidth);
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#detail_grid").jqGrid({
        colNames: datos_detail_grid.colNames(),
        colModel: datos_detail_grid.colModel(),
        pager: $('#detail_grid_pager'),
        caption: "Fiscalizaciones Asignadas" ,
        postData: datos_detail_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        shrinkToFit: true,
        onSelectRow: function (id) {
            $('#btn_del_alcance').show();
        },
        loadComplete: function () {
            gridParentWidth = $('#gbox_detail_grid').parent().parent().width();
            $('#detail_grid').setGridWidth(gridParentWidth);
            $('#btn_del_alcance').hide();
        }
    }).navGrid('#detail_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    ).navButtonAdd('#detail_grid_pager',{
            id: 'btn_del_alcance',
            caption: "",
            position: "first",
            buttonicon: "glyphicon glyphicon-trash",
            title: "Eliminar un alcance de la inspección",
            cursor: "pointer",
            onClickButton: function () {
                var rowid = $("#detail_grid").getGridParam('selrow');
                mostrar_cuadro(
                    'C',
                    'Eliminar Alcance',
                    'Se eliminará el alcance seleccionado. NO se podrá revertir la acción.<br>¿Desea continuar?',
                    function () {
                        $.ajax({
                            type:'POST',
                            url: FUNCIONES_BASEPATH+'maestro_abm.php',
                            data:{
                                "p_id_inspeccion":$("#p_id_inspeccion").val(),
                                "p_oper":'del',
                                "p_n_movimiento":$("#detail_grid").getCell(rowid,'n_movimiento'),
                                "p_n_secuencia":$("#detail_grid").getCell(rowid,'n_secuencia'),
                                "p_n_fila":$("#detail_grid").getCell(rowid,'n_fila'),
                                "id_menu":10753,
                                "n_orden":0
                            },
                            dataType:'json',
                            success: function( data ) {
                                if(data.resultado == 'OK'){
                                    $('#detail_grid').trigger('reloadGrid');
                                }
                                else{
                                    mostrar_cuadro('E', 'Error', data.resultado);
                                    return;
                                }
                            }
                        });
                    },
                    function () {
                        return;
                    })

            }}
    ).navButtonAdd('#detail_grid_pager',{
        id: 'btn_agregar_alcance',
        caption: "",
        position: "first",
        buttonicon: "glyphicon glyphicon-plus",
        title: "Incorpora alcance a la inspección",
        cursor: "pointer",
        onClickButton: function () {
            $('#modal_abm_alcance').modal('show');
        }}
    );


}