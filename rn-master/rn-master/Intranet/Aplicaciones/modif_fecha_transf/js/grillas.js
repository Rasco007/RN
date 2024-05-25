function inicializarGrillas(){
    $("#lupa_c_tipo_documento").lupa_generica({
        id_lista:v_lista_tdoc,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_codigo',width:100},
        {index:'d_descrip',width:250}],
        caption:'Tipo de Documento',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:[],
        searchInput: '#c_tipo_documento',
        searchCode: true,
        limpiarCod: true,
        campos:{c_codigo:'c_tipo_documento',d_descrip:'d_tipo_documento'},
        keyNav:true,
        onClose: function(){
            $('#n_documento').val(null);
        }
    });

    if (v_tributo == 60){
        var v_titulos1 = ['Partida', 'Nomenclatura'];
        var v_titulos2 = ['Nomenclatura', 'Partida'];
        var v_caption1 = 'Lista de Partidas';
        var v_caption1 = 'Lista de Nomenclaturas';
        var v_campos1 = {objeto_hecho1:'d_partida',objeto_hecho2:'d_nomenclatura'};
        var v_campos2 = {objeto_hecho1:'d_nomenclatura',objeto_hecho2:'d_partida'};
    }else{
        var v_titulos1 = ['Dominio', 'Dominio Anterior'];
        var v_titulos2 = ['Dominio Anterior', 'Dominio'];
        var v_caption1 = 'Lista de Dominios';
        var v_caption2 = 'Lista de Dominios Anteriores';
        var v_campos1 = {objeto_hecho1:'d_partida'};
        var v_campos2 = {objeto_hecho1:'d_nomenclatura'};
    }
    $("#lupa_partida").lupa_generica({
        id_lista:v_lista_objeto1,
        titulos:v_titulos1,
        grid:[{index:'objeto_hecho1',width:250},
            {index:'objeto_hecho2',width:250}],
        caption:v_caption1,
        sortname:'objeto_hecho1',
        sortorder:'asc',
        filtros:[v_tributo,'#d_partida'],
        filtrosNulos:[true,true],
        campos:v_campos1,
        keyNav:true,
        searchCode: true,
        searchInput: '#d_partida',
        exactField: 'objeto_hecho1',
        notFoundDialog: false
    });

    $("#lupa_nomenclatura").lupa_generica({
        id_lista:v_lista_objeto2,
        titulos:v_titulos2,
        grid:[{index:'objeto_hecho1',width:250},
            {index:'objeto_hecho2',width:250}],
        caption:v_caption2,
        sortname:'objeto_hecho1',
        sortorder:'asc',
        filtros:[v_tributo,'#d_nomenclatura'],
        filtroNull:true,
        campos:v_campos2,
        keyNav:true
    });

    if (v_tributo == 60){
        v_caption1 = 'Inmuebles:';
    }else{
        v_caption1 = 'Automotores:';
    }

    $("#main_grid").jqGrid({
        colNames:datos_main_grid.colNames(),
        colModel:datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption:v_caption1,
        postData:datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        loadComplete:function(data){
            if($('#main_grid').getGridParam('postData').m_autoquery == 'S'){
                if($(this).jqGrid('getGridParam','records') == 0){
                    mostrar_cuadro('I', 'Atención', 'No se han encontrado registros para la consulta realizada.');
                }
            }
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    );

    if (v_tributo == 90){
        jQuery("#main_grid").jqGrid('setLabel','d_objeto_hecho','Dominio');
        jQuery("#main_grid").jqGrid('setLabel','d_nomenclatura','Dominio Ant.');
        $('#jqgh_main_grid_d_objeto_hecho, #jqgh_main_grid_d_nomenclatura').append('<span class="s-ico" style="display:none">' +
            '<span sort="asc" class="ui-grid-ico-sort ui-icon-asc ui-sort-ltr ui-disabled glyphicon glyphicon-triangle-top"></span>' +
            '<span sort="desc" class="ui-grid-ico-sort ui-icon-desc ui-sort-ltr ui-disabled glyphicon glyphicon-triangle-bottom"></span>' +
            '</span><a class="colmenu"><span class="colmenuspan glyphicon glyphicon-menu-hamburger"></span></a></div>');
    }
}