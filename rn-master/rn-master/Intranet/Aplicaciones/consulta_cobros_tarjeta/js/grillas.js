function inicializarGrillas(){


    $("#main_grid").jqGrid({
        colNames:datos_main_grid.colNames(),
        colModel:datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption:"Solicitudes" ,
        postData:datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'n_id_solicitud',
        sortorder:'desc',
        autowidth: false,
        height:300,
        rowattr: function (rd) {
            if (rd.estado == 'RECHAZADA'){
                return {'class': 'RECHAZADA'};
            }
            else if(rd.f_reversa != null){
                return {'style':'background-color: rgb(255, 55, 55);'};
            }
        },
        loadComplete:function(){
            
            if($('#main_grid').getGridParam('postData').m_autoquery == 'S'){
                if($(this).jqGrid('getGridParam','records') == 0){
                    mostrar_cuadro('I', 'Atención', 'No se han encontrado registros para la consulta realizada.');
                    //$('#btn_limpiar').click();
                }
            }
            $("#main_grid").setSelection(1);

        },
        
        gridComplete: function() {
           
            $( "#main_grid" ).removeClass( "table-striped" );
        },
        onSelectRow: function(id) {
            n_id_solicitud = $('#main_grid').getCell(id, 'n_id_solicitud');
            f_cartera = $('#main_grid').getCell(id, 'f_cartera');
            $('#f_cartera').val(f_cartera.substring(f_cartera.length - 7));
            $('#f_envio_tran').val($('#main_grid').getCell(id, 'f_envio_tran'));
            $('#f_reversa').val($('#main_grid').getCell(id, 'f_reversa'));
            $('#f_recepcion_tran').val($('#main_grid').getCell(id, 'f_recepcion_tran'));
            $('#c_tributo').val($('#main_grid').getCell(id, 'c_tributo'));
            $('#d_objeto_hecho').val($('#main_grid').getCell(id, 'd_objeto_hecho'));
            $('#estado').val($('#main_grid').getCell(id, 'estado'));
            $('#c_disco_recepcionado').val($('#main_grid').getCell(id, 'c_disco_recepcion'));
            $('#c_disco_envio').val($('#main_grid').getCell(id, 'c_disco_envio'));
            $('#d_medio_pago').val($('#main_grid').getCell(id, 'd_medio_pago'));
            $('#c_medio_pago').val($('#main_grid').getCell(id, 'c_medio_pago'));
            $('#d_producto').val($('#main_grid').getCell(id, 'd_producto'));
            $('#c_producto').val($('#main_grid').getCell(id, 'c_producto'));
            $('#d_motivo_rechazo').val($('#main_grid').getCell(id, 'd_dato'));
            $('#c_motivo_rechazo').val($('#main_grid').getCell(id, 'c_rechazo'));
            $('#n_solicitud').val($('#main_grid').getCell(id, 'n_id_solicitud'));
            $('#d_denominacion').val($('#main_grid').getCell(id, 'd_contribuyente'));
            $('#n_medio_pago').val($('#main_grid').getCell(id, 'n_medio_pago'));
            $('#fec_cartera').val($('#main_grid').getCell(id, 'f_cartera'));
            $('#i_total').val($('#main_grid').getCell(id, 'n_tot_importe'));
            setea_parametros('#detalles_grid',{':p_n_id_solicitud':n_id_solicitud});
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    )

    $("#detalles_grid").jqGrid({
        colNames:datos_detalles_grid.colNames(),
        colModel:datos_detalles_grid.colModel(),
        pager: $('#detalles_grid_pager'),
        caption:"Detalle de Solicitudes" ,
        postData:datos_detalles_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: true,
        height:150,
        rowNum: 50,
        gridview: false,
        sortname: 'd_tributo',
        sortorder:'desc',
    }).navGrid('#detalles_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
}