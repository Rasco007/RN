function init_grillas(){
    $("#main_grid").jqGrid({
        colNames: main_grid.colNames(),
        colModel: main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Bonificaciones especiales",
        postData: main_grid.postData(),
        autowidth: false,
        width: 940,
        shrinkToFit: true,
        loadComplete: function(){
            
        }
    }).navGrid('#main_grid_pager',
        {add:true, edit:false, del:false}, //options
        {}, // edit options
        {onInitializeForm: defaultInitForm(function(formid){
            init_lupas(formid);
            
        }),
        
        beforeShowForm: defaultBeforeShowForm(function(formid){
            
        
        }),
        closeAfterAdd: true,
        beforeSubmit: function(postdata, formid) {
            var valido = $(formid).validationEngine('validate');


             setea_parametros('#main_grid',{});

            return[valido,'Controle los datos ingresados.'];
        },
        afterComplete:function() {
            
            mostrar_cuadro('I', 'Informaci&oacute;n', 'Se ha dado de alta Correctamente');
            setea_parametros('#main_grid',{});
        }
            
        }, // add options
        {}, // del options
        {} // search options
    );
}