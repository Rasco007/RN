function inicializarGrillas(){

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Multas" ,
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php"/*,
        multiselect:true,
        multiboxonly:true,
        onSelectRow: function (id) {
            sumar_saldos();
        },
        onSelectAll: function(){
            sumar_saldos();
        }
        onSelectRow: function (id) {
            var saldo = $("#main_grid").getCell(id, 'i_saldo_actualizado');

            if (parse(saldo) > 0){
                $('#btn_emitir_boleta').show();
            }else{
                $('#btn_emitir_boleta').hide();
            }
           
        }*/
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    ).navButtonAdd('#main_grid_pager',{
        id:'btn_instancias',
        buttonicon: "",
        caption:"<b>Instancias</b>",
        position:"last",
        title:"Ver Instancias",
        cursor:"pointer",
        onClickButton:function() {
            var rowid = $("#main_grid").getGridParam('selrow');
            if (rowid) {
                setea_parametros('#instancias_grid',{
                    ':p_n_instancia': $("#main_grid").getCell(rowid,'n_instancia')
                });
                $("#instancias_modal").modal('show');
                $(window).resize();
            }else{
                mostrar_validacion('Debe seleccionar un registro de la grilla.');
            }
        }
    });

    $("#instancias_grid").jqGrid({
        colNames: datos_instancias_grid.colNames(),
        colModel: datos_instancias_grid.colModel(),
        pager: $('#instancias_grid_pager'),
        postData: datos_instancias_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        height:250
    }).navGrid('#instancias_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

}