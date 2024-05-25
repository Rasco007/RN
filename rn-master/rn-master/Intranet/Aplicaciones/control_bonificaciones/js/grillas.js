function init_grillas() {
    //Lupas
    $("#lupa_c_tipo_imponible").lupa_generica({
        id_lista:v_lista_tipos_imponibles,
        titulos:['Cód. Tipo Imponible','Tipo Imponible'],
        grid:[{index:'c_codigo',width:150},
            {index:'d_descrip',width:400}],
        caption:'Lista de Tipos Imponibles',
        sortname:'d_descrip',
        sortorder:'asc',
        campos:{c_codigo:'c_tipo_imponible',d_descrip:'d_tipo_imponible'},
        keyNav:true,
        searchInput: '#c_tipo_imponible',
        searchCode: true,
    });

    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_tributos,
        titulos:['Cód. Tributo','Tributo'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:250}],
        caption:'Lista de Tributos',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:['#c_tipo_imponible'],
        filtrosNulos:[false],
        filtrosTitulos:['Tipo Imponible'],
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
        limpiarCod: true,
    });

    //Grillas
    $("#bonificaciones_grid").jqGrid({
        colNames: datos_bonificaciones_grid.colNames(),
        colModel: datos_bonificaciones_grid.colModel(),
        pager: $('#bonificaciones_grid_pager'),
        caption: "Bonificaciones",
        postData: datos_bonificaciones_grid.postData(),
        autowidth: false,
        height:160,
        rownum:10,
        sortname: 'd_objeto_hecho,n_cuota',
        loadComplete:function(data){
            if($('#bonificaciones_grid').getGridParam('postData').m_autoquery == 'S'){
                if($(this).jqGrid('getGridParam','records') == 0){
                    $('.entrada_filtro').prop('readonly', false);
                    $("#check_select_all").prop('checked',false);
                    $('#bonificaciones_grid').jqGrid('clearGridData');
                    $('#contenedor_grilla, #contenedor_botones').hide();
                    $('#lupa_c_tipo_imponible, #lupa_c_tributo').show();
                    mostrar_mensaje('Ningún registro','No se han encontrado registros para la consulta realizada.');
                }
            }
        },
        ondblClickRow:function(rowid){
            var d_objeto_hecho = $("#bonificaciones_grid").getCell(rowid,'d_objeto_hecho');
            var c_tributo = $("#bonificaciones_grid").getCell(rowid,'c_tributo');
            if (c_tributo == 90){
                mostrar_mensaje("En desarrollo","En construcción - auta001");
                /*post_to_url('completar.php', {
                    'p_modo': 'C',
                    'p_objeto': d_objeto_hecho,
                    'p_n_id_menu':completar }, '_blank');*/
            } else if (c_tributo == 60){
                post_to_url('cons_inmuebles.php', {
                    'p_d_partida': d_objeto_hecho,
                    'p_n_id_menu': 10930}, '_blank');
            }
        }
    }).navGrid('#bonificaciones_grid_pager',{add:false, edit:false, del:false});
    $('#bonificaciones_grid_checkbox').unbind();
}