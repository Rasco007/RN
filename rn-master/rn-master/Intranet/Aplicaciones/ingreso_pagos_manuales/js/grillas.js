function inicializarGrillas(){
    $("#consulta_grid").jqGrid({
        colNames: consulta_grid.colNames(),
        colModel: consulta_grid.colModel(),
        pager: $('#consulta_grid_pager'),
        postData: consulta_grid.postData(),
        autowidth: false,
        width: 940,
        shrinkToFit: true,
    }).navGrid('#consulta_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#remesas_grid").jqGrid({
        colNames: remesas_grid.colNames(),
        colModel: remesas_grid.colModel(),
        pager: $('#remesas_grid_pager'),
        caption: "Listado de Remesas",
        postData: remesas_grid.postData(),
        autowidth: false,
        width: 940,
        shrinkToFit: true,
        sortname: 'n_remesa',
        sortorder: 'desc',
        loadComplete: function(){
            if(remesas_cargadas){
                let cant_remesas = $("#remesas_grid").jqGrid('getGridParam', 'reccount');
                if(cant_remesas > 0){
                    bloquear_filtros();
                    $('#remesas_modal').modal('show');
                    $(window).resize();
                    //verificar_estado_remesa
                    for(let i = 1; i <= cant_remesas; i++ ){
                        $.ajax({
                            type:'POST',
                            url: FUNCIONES_BASEPATH+'maestro_abm.php',
                            data:{      
                             "p_n_remesa":$('#remesas_grid').getCell(i, 'n_remesa'),
                             "p_c_banco":$('#c_banco').val(),
                             "p_c_sucursal":$('#c_sucursal').val(),
                             "p_f_acred": $('#f_acred').val(),
                             "p_f_pago": $('#f_pago').val(),
                             "id_menu":p_id_menu,
                             "n_orden":16
                            },
                            dataType:'json',
                            success: function( data ) {
                                if(data.resultado == 'OK'){
                                  if(data.retorno == 1){
                                    $('#remesas_grid').jqGrid("clearGridData");
                                    preparar_nueva_carga();
                                    mostrar_error('La remesa ya esta imputada total o parcialmente','E',true);
                                    $('#remesas_modal').modal('hide');
                                  }
                                }
                                else{
                                    mostrar_cuadro('E', 'Error', data.resultado);
                                    return;
                                }
                            }
                        }); 
 
                    }
                   
                }else {
                    $('#main').procOverlay({visible:false});
                    mostrar_cuadro('I', 'Atención', 'La consulta no devolvi&oacute; datos');
                    $('#remesas_grid').jqGrid("clearGridData");
                }
            }
        }
    }).navGrid('#remesas_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

}