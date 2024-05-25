function inicializarGrillas(){

    $("#main_grid").jqGrid({
        colNames:datos_main_grid.colNames(),
        colModel:datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption:"DDJJ" ,
        postData:datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'f_presentacion',
        sortorder:'desc',
        autowidth: false,
        height:150,
        loadComplete:function(){
            setea_parametros('#detalles_grid',{},'N');
        },
        onSelectRow: function(id) {
            c_tipo_form = $('#main_grid').getCell(id, 'c_tipo_form');
            id_ddjj = $('#main_grid').getCell(id, 'id_ddjj');
            setea_parametros('#detalles_grid',{':p_id_ddjj':id_ddjj,
             ':p_c_tipo_form':c_tipo_form});
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:true}, //options
        {},//edit,
        {},//alta
        {top:500,
            left: 0,
            width: 500,
            onInitializeForm: defaultInitForm(function(formid){
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
            }),
            afterSubmit: function(response,postdata){
                var res = $.parseJSON(response.responseText);
                if(res.resultado != "OK"){
                    return[false,res.resultado];
                }else{
                    setea_parametros('#detalles_grid',{},'N');
                    return[true,''];
                }
            },
            closeAfterDelete: true},//del
        {}//search
    );

    $("#detalles_grid").jqGrid({
        colNames:datos_detalles_grid.colNames(),
        colModel:datos_detalles_grid.colModel(),
        pager: $('#detalles_grid_pager'),
        caption:"Detalle de Ingresos Brutos" ,
        postData:datos_detalles_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: true,
        height:150,
        rowNum: 50,
        sortname:'c_renglon',
        sortorder:'asc',
        shrinkToFit: true,
        gridview: false, 
        onSelectRow: function(id) {
           
        }
    }).navGrid('#detalles_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
}





function inicializa_lupas_main_grid(formid){

    $("#id_evento_lupa",formid).lupa_generica({
        id_lista:v_lista_eventos,
        titulos:['Id Evento','Descrip Evento'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'LISTADO DE EVENTOS DE MOVIMIENTOS',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'id_evento',d_descrip: 'd_evento'},
        keyNav:true,
        searchInput: '#id_evento',
        searchCode: true
        
    });
    

   
}



