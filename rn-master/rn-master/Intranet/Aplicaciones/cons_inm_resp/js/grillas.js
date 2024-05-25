function inicializarGrillas(){
    $("#lupa_c_tipo_documento").lupa_generica({
        id_lista:v_lista_tdoc,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_codigo',width:100},
        {index:'d_descrip',width:250}],
        caption:'Tipo de Documento',
        sortname:'d_descrip',
        sortorder:'asc',
        searchInput: '#c_tipo_documento',
        searchCode: true,
        limpiarCod: true,
        campos:{c_codigo:'c_tipo_documento',d_descrip:'d_tipo_documento'},
        keyNav:true,
        onClose: function(){
            $('#n_documento').val(null);
        }
    });


    $("#main_grid").jqGrid({
        colNames:datos_main_grid.colNames(),
        colModel:datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption:"Inmuebles:" ,
        postData:datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        sortorder:'desc',
        loadComplete:function(data){
            if($('#main_grid').getGridParam('postData').m_autoquery == 'S'){
                if($(this).jqGrid('getGridParam','records') == 0){
                    mostrar_cuadro('I', 'Atención', 'No se han encontrado registros para la consulta realizada.');
                    id_titular = null;
                    $('#btn_imp_inmuebles').attr('disabled',true);
                }else{
                    $('#btn_imp_inmuebles').attr('disabled',false);
                    id_titular = $('#id_contribuyente').val();
                }
            }
        },
        ondblClickRow: function (rowid) {
            post_to_url('cons_inmuebles.php', {
                'p_d_partida': $('#main_grid').getCell(rowid, 'd_nomenclatura_inf'),
                'p_n_id_menu': 10930}, '_blank');
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    );

    $('#bt_informe_main_grid_pager').unbind();
    $('#bt_informe_main_grid_pager').click(function () {
        var cant_registros =  $('#main_grid').jqGrid('getGridParam', 'records');
        var id_grid = $('#main_grid').jqGrid('getGridParam', 'id');
        var tmp_pager_id = 'main_grid_pager';
        if(cant_registros <= 0){
            mostrar_cuadro('E','Error', 'La grilla no posee registros para generar el informe.');
        }else{

            var tmp_posDataInforme = $('#main_grid').getGridParam('postData');
            tmp_posDataInforme.id_grid = id_grid;


            modalInformes( tmp_posDataInforme, tmp_pager_id );
            config_modalInformes(tmp_pager_id,id_grid);
        }
    });

}
/*

function exportGrilla(){
    mya = $("#" + table).getDataIDs(); // Get All IDs
    var data = $("#" + table).getRowData(mya[0]); // Get First row to get the
// labels
    var colNames = new Array();
    var ii = 0;
    for ( var i in data) {
        colNames[ii++] = i;
    } // capture col names

    var html = "<html><head>"
        + "<style script=&quot;css/text&quot;>"
        + "table.tableList_1 th {border:1px solid black; text-align:center; "
        + "vertical-align: middle; padding:5px;}"
        + "table.tableList_1 td {border:1px solid black; text-align: left; vertical-align: top; padding:5px;}"
        + "</style>"
        + "</head>"
        + "<body style=&quot;page:land;&quot;>";


    for ( var k = 0; k < colNames.length; k++) {
        html = html + "<th>" + colNames[k] + "</th>";
    }
    html = html + "</tr>"; // Output header with end of line
    for (i = 0; i < mya.length; i++) {
        html = html + "<tr>";
        data = $("#" + table).getRowData(mya[i]); // get each row
        for ( var j = 0; j < colNames.length; j++) {
            html = html + "<td>" + data[colNames[j]] + "</td>"; // output each Row as
            // tab delimited
        }
        html = html + "</tr>"; // output each row with end of line
    }
    html = html + "</table></body></html>"; // end of line at the end
    alert(html);
    html = html.replace(/'/g, '&apos;');
    var form = "<form name='pdfexportform' action='generategrid' method='post'>";
    form = form + "<input type='hidden' name='pdfBuffer' value='" + html + "'>";
    form = form + "</form><script>document.pdfexportform.submit();</sc"
        + "ript>";
    OpenWindow = window.open('', '');
    OpenWindow.document.write(form);
    OpenWindow.document.close();
}

*/
