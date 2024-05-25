function inicializarGrillas(){
    $("#param_grid").jqGrid({
        colNames:param_grid.colNames(),
        colModel:param_grid.colModel(),
        autowidth:false,
        height:85,
        pager: $('#param_grid_pager'),
        caption:"Parámetros" ,
        postData:param_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        onSelectRow: function(id) {

        },
        loadComplete:function(){

        },
    }).navGrid('#param_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
    ).navButtonAdd('#param_grid_pager',{
        title:"Parámetros",
        caption:"Parámetros",
        id:"edit_params",
        onClickButton:function() {
            if(!v_filtro_buscado){
                mostrar_error('Debe seleccionar una consulta en el filtro superior.');
                return;
            }
            fun_parametros(v_id_cons_dinamica, v_id_consulta_din);
        },
        position:"last",
        cursor:"pointer"});
}