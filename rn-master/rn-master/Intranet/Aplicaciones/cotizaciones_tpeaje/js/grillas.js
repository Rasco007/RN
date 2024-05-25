var datos_main_grid = new GridParam({
    id_menu: v_id_menu,
    n_grid: 0,
    m_autoquery: v_m_autoquery,
    param: {
        ':p_c_cotizador': null,
        ':p_f_cotizador': null
    }
});

$(document).ready(function () {


    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Datos",
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        height: 300
    }).navGrid('#main_grid_pager',
        {add: true, edit: true, del: true}, //options
        {
            top:500,
            left: 0,
            width: 600,
            onInitializeForm: defaultInitForm(function(formid){
                $('#d_unidad',formid).lupa_generica({
                    titulos:['Código.','Descripción'],
                    grid:[  {index:'c_codigo',width:100},
                        {index:'d_descrip',width:250}],
                    caption:'Unidades',
                    sortname:'c_codigo',
                    sortorder:'asc',
                    searchCode:true,
                    searchInput: '#c_cotizador',
                    exactField: 'c_codigo',
                    campos:{c_codigo:'c_cotizador',d_descrip:'d_unidad'},
                    keyNav:true,
                    onClose:function(){

                    }
                });

                $("#n_tabla_cotizador",formid).val(43);
                $("#f_cotizador",formid).attr('disabled',true);
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $(formid).validationEngine({
                    promptPosition:'inline'
                });
                $('#tr_c_cotizador').hide();
                $('#c_cotizador').attr('disabled',true);
                $('#d_unidad').attr('disabled',true);
                $('#d_unidad_lupa').hide();
                $('#f_cotizacion').datepicker("disable");
            }),
            afterSubmit: function(response,postdata){
                var res = $.parseJSON(response.responseText);
                // Los otros errores estan contemplados, solo sale ese msj para el error de PK de código
                if(res.resultado == "Se produjo un error al  realizar la operacion add"){
                    return[false,"Ya existe una parametrización para la Unidad y Fecha ingresada."];
                }else{
                    if(res.resultado != 'OK'){
                        return[false,res.resultado];
                    }else{
                        return[true,''];
                    }
                }
            },
            closeAfterEdit: true
        }, //edit
        {
            top:500,
            left: 0,
            width: 600,
            onInitializeForm: defaultInitForm(function(formid){
                // Definición lupa Entes
                $('#d_unidad',formid).lupa_generica({
                    titulos:['Código.','Descripción'],
                    grid:[  {index:'c_codigo',width:100},
                        {index:'d_descrip',width:250}],
                    caption:'Unidades',
                    sortname:'c_codigo',
                    sortorder:'asc',
                    searchCode:true,
                    searchInput: '#c_cotizador',
                    exactField: 'c_codigo',
                    campos:{c_codigo:'c_cotizador',d_descrip:'d_unidad'},
                    keyNav:true,
                    onClose:function(){

                    }
                });

                $("#n_tabla_cotizador",formid).val(43);
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $(formid).validationEngine({
                    promptPosition:'inline'
                });
                $('#tr_c_cotizador').hide();
            }),
            afterSubmit: function(response,postdata){
                var res = $.parseJSON(response.responseText);
                // Los otros errores estan contemplados, solo sale ese msj para el error de PK de código
                if(res.resultado == "Se produjo un error al  realizar la operacion add"){
                    return[false,"Ya existe una parametrización para la Unidad y Fecha ingresada."];
                }else{
                    if(res.resultado != 'OK'){
                        return[false,res.resultado];
                    }else{
                        return[true,''];
                    }
                }
            },
            closeAfterAdd: true
        }, //add
        {} //del
    );


});