function inicializarGrillas(){


    $("#main_grid").jqGrid({
        colNames:datos_main_grid.colNames(),
        colModel:datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption:"Novedades" ,
        postData:datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'f_novedad',
        sortorder:'desc',
        shrinkToFit: true,
        autowidth: false,
        height:170,
        rowattr: function () {
            return {'class': 'grupo'};
        },
        onSelectRow: function(id) {
            n_cuit = $('#main_grid').getCell(id, 'n_cuit');
            d_denominacion = $('#main_grid').getCell(id, 'd_denominacion');
            f_nac_contrato = $('#main_grid').getCell(id, 'f_nac_contrato');
            c_sexo = $('#main_grid').getCell(id, 'c_sexo');
            domicilio = $('#main_grid').getCell(id, 'domicilio');
            f_alta_afip = $('#main_grid').getCell(id, 'f_alta_afip');

            $('#n_cuit_filtro').val(n_cuit);
            $('#d_denominacion_filtro').val(d_denominacion);
            $('#f_nac').val(f_nac_contrato);
            $('#sexo_filtro').val(c_sexo);
            $('#d_calle').val(domicilio);
            $('#f_alta').val(f_alta_afip);
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    );

   
}



