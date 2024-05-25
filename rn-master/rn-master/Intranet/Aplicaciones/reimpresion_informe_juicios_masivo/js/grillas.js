function inicializarGrillas(){
    $("#resultado_generacion_grid").jqGrid({
        colNames: resultado_generacion_grid.colNames(),
        colModel: resultado_generacion_grid.colModel(),
        pager: $('#resultado_generacion_grid_pager'),
        caption: "Resultado Generación",
        postData: resultado_generacion_grid.postData(),
        autowidth: false,
        width: 940,
        sortname: 'id_boleta_deuda',
        sortorder: 'asc',
        rowNum: 10000,
        loadComplete: function(){
            if(resultado_cargado){
                let cant_boletas = $("#resultado_generacion_grid").getGridParam("records");
                let imp_liq_ori;
                let imp_dem_bco;
                let imp_dem_bie;
                let imp_dem_inh;
                let id_boleta_actual;
                let boton;
                let tributo;
                let deno_pre;
                let deno_patro;

                for(let i = 1; i <= cant_boletas; i++){
                    id_boleta_actual = $("#resultado_generacion_grid").getCell(i, 'id_boleta_deuda');
                    imp_liq_ori = $("#resultado_generacion_grid").getCell(i, 'imp_liq_ori');
                    imp_dem_bco = $("#resultado_generacion_grid").getCell(i, 'imp_dem_bco');
                    imp_dem_bie = $("#resultado_generacion_grid").getCell(i, 'imp_dem_bie');
                    imp_dem_inh = $("#resultado_generacion_grid").getCell(i, 'imp_dem_inh');
                    boton = $("#resultado_generacion_grid").getCell(i, 'boton');
                    tributo = $("#resultado_generacion_grid").getCell(i, 'c_tributo');
                    deno_pre = $("#resultado_generacion_grid").getCell(i, 'd_repre_fiscal');
                    deno_patro = $("#resultado_generacion_grid").getCell(i, 'd_patro');

                    if(imp_liq_ori == 1){
                        imprimir_liq_original(id_boleta_actual, boton, tributo,deno_pre,deno_patro);
                    }

                    if(imp_dem_bco == 1){
                        imprimir_demanda(id_boleta_actual, boton, tributo,deno_pre,deno_patro);
                    }

                    if(imp_dem_bie == 1){
                        imprimir_demanda(id_boleta_actual, boton, tributo,deno_pre,deno_patro);
                    }

                    if(imp_dem_inh == 1){
                        imprimir_demanda(id_boleta_actual, boton, tributo,deno_pre,deno_patro);
                    }

                    imp_liq_ori = 0;
                    imp_dem_bco = 0;
                    imp_dem_bie = 0;
                    imp_dem_inh = 0;
                    boton = null;
                    tributo = null;
                    deno_pre = null;
                    deno_patro = null;
                }
            }
        }
    }).navGrid('#resultado_generacion_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
}
