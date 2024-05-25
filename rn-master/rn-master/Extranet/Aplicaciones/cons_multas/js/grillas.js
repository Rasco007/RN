function inicializarGrillas(){

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Multas" ,
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        height:350/*,
        multiselect:true,
        multiboxonly:true,
        rownumbers: true,
        onSelectRow: function(rowid){ 
            sumar_saldos();
        },
        onSelectAll: function(){
            sumar_saldos();
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
            var ids = $("#main_grid").getGridParam('selarrrow');
            if(ids.length > 1){
                mostrar_cuadro('V','Atención','Debe seleccionar solo un registro de la grilla.');
            }else{
                var rowid = $("#main_grid").getGridParam('selrow');
                if (rowid) {
                    setea_parametros('#instancias_grid',{
                        ':p_n_instancia': $("#main_grid").getCell(rowid,'n_instancia')
                    });
                    $("#instancias_modal").modal('show');
                    $(window).resize();
                }else{
                    mostrar_cuadro('V','Atención','Debe seleccionar un registro de la grilla.');
                }
            }
        }
    });/*.navButtonAdd('#main_grid_pager',{
        id:'btn_detalle',
        buttonicon: "",
        caption:"<b>Detalle</b>",
        position:"last",
        title:"Ver Detalle",
        cursor:"pointer",
        onClickButton:function() {
            var ids = $("#main_grid").getGridParam('selarrrow');
            if(ids.length > 1){
                mostrar_cuadro('V','Atención','Debe seleccionar solo un registro de la grilla.');
            }else{
                var rowid = $("#main_grid").getGridParam('selrow');
                if (rowid) {
                    setea_parametros('#detalle_grid',{
                        ':p_n_instancia': $("#main_grid").getCell(rowid,'n_instancia')
                    });
                    $("#detalle_modal").modal('show');
                    $(window).resize();
                }else{
                    mostrar_cuadro('V','Atención','Debe seleccionar un registro de la grilla.');
                }
            }
        }
    });*/

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