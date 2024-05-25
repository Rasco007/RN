function init_grillas(){

    if(v_modo == 'C'){
        datos_grid_impuesto_anual = new GridParam({
            id_menu: v_id_menu,
            n_grid: 0,
            m_autoquery: 'N'
        });

        $("#grid_impuesto_anual").jqGrid({
        colNames: datos_grid_impuesto_anual.colNames(),
        colModel: datos_grid_impuesto_anual.colModel(),
        pager: $('#grid_impuesto_anual_pager'),
        postData: datos_grid_impuesto_anual.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        shrinkToFit: true,
        height: 300,    
        })
        .navGrid('#grid_impuesto_anual_pager',
        
    );
    }
    else{
        datos_main_grid = new GridParam({
            id_menu: v_id_menu,
            n_grid: 0,
            n_orden:0,
            m_autoquery: 'N'
        });

        $("#main_grid").jqGrid({
            colNames: datos_main_grid.colNames(),
            colModel: datos_main_grid.colModel(),
            pager: $('#main_grid_pager'),
            caption:"Impuesto Anual",
            postData: datos_main_grid.postData(),
            editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
            shrinkToFit: true,
            height: 300,
            })
    .navGrid(
      "#main_grid_pager",
      { add: true, edit: true, del: false },
      {
        top: 500,
        left: 0,
        width: 700,
        onInitializeForm: defaultInitForm(function (formid) {
          inicializa_lupas_main_grid(formid);
          $('#sData .glyphicon').removeClass('glyphicon-save').addClass('glyphicon-floppy-disk');
        }),
        closeAfterEdit: true,
      }, //edit
      {
        top: 500,
        left: 0,
        width: 700,
        onInitializeForm: defaultInitForm(function (formid) {
          inicializa_lupas_main_grid(formid);
          $('#sData .glyphicon').removeClass('glyphicon-save').addClass('glyphicon-floppy-disk');
        }),
        closeAfterAdd: true,
      }, //add
      {} //del
    );
    }

        
}