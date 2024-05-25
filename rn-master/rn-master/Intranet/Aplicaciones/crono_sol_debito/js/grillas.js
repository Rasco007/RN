function inicializarGrillas(){
    $("#crono_grid").jqGrid({
        colNames:crono_grid.colNames(),
        colModel:crono_grid.colModel(),
        autowidth:false,
        height:300,
        pager: $('#crono_grid_pager'),
        caption:"Cronogramas de Solicitud de Débito" ,
        postData:crono_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'f_cartera'
    }).navGrid('#crono_grid_pager',
        {add:true, edit:true, del:true}, //options
        {
            onInitializeForm: defaultInitForm(function(formid) {
            }),
            beforeSubmit: function(postdata, formid) {
                var error = valida_fecha();
                var valido = error == '';
                return [valido ,error];
            },
            closeAfterAdd:true
        }, // edit options
        {
            onInitializeForm: defaultInitForm(function(formid) {
                $('#tr_n_id_cartera').hide();
                $('#d_forma_pago').val($('#d_forma_pago_filtro').val())
                $('#c_forma_pago').val($('#c_forma_pago_filtro').val())
            }),
            beforeSubmit: function(postdata, formid) {
                var error = valida_fecha();
                var valido = error == '';
                return [valido ,error];
            },
            closeAfterAdd:true
        }, // add options
        {}, // del options
    );
}