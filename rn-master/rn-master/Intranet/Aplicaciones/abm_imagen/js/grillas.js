function inicializarGrillas(p_n_id_menu){

    $("#main_grid").jqGrid({
        colNames:datos_main_grid.colNames(),
        colModel:datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption:"Imágenes" ,
        sortname:'c_img',
        sortorder:'asc',
        postData:datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",

    }).navGrid('#main_grid_pager',
        {add:true, edit:true, del:true}, //options
        {
			onInitializeForm: defaultInitForm(function(formid) {
				$('#tr_c_imagen #c_imagen').prop('readonly', true);
				$('#tr_c_imagen #c_imagen').prop('disabled', true);
			})
        }, // edit options
        {

            closeAfterAdd:true
        }, // add options
        {}, // del options
        {} // search options
    );

}