var datos_main_grid = new GridParam({
    id_menu: v_id_menu,
    n_grid:0,
    n_orden:0,
    m_autoquery:v_m_autoquery,
    param:{':c_organismo':null,
        ':c_tipo':null,
        ':c_region': null,
        ':c_area': null}
});

var datos_second_grid = new GridParam({
    id_menu: v_id_menu,
    n_grid:1,
    m_autoquery:v_m_autoquery,
    param:{':c_organismo':null}
});

$(document).ready(function() {

    $("#btn_buscar").click(function(){
        deshabilita_campos(true);
        setea_parametros('#main_grid',{
            ':c_organismo': $("#c_organismo").val(),
            ':c_tipo': $("#c_tipo").val(),
            ':c_region': $("#c_region").val(),
            ':c_area': $("#c_area").val()
        });
    });

    $("#btn_limpiar").click(function(){
        setea_parametros('#main_grid',{
            ':c_organismo': null,
            ':c_tipo': null,
            ':c_region': null,
            ':c_area': null
        });
        $("#second_grid").jqGrid("clearGridData", true);
        $("#frm_consulta").trigger('reset');
        deshabilita_campos(false);
    });

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Consorcios",
        postData: datos_main_grid.postData(),
    	editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        onSelectRow: function(id){
            var v_c_organismo = $(this).getCell(id,'c_organismo');
            setea_parametros('#second_grid',{
                ':c_organismo': v_c_organismo
            });
        },
        loadComplete: function(){
            $("#second_grid").jqGrid("clearGridData", true);
        }
    }).navGrid('#main_grid_pager',
        {add:true, edit:true, del:true}, //options
        {
            width: 600,
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $(formid).validationEngine({promptPosition:'inline'});
            }),
            onInitializeForm: defaultInitForm(function(formid){
                inicializa_lupas_main_grid(formid);

                $("#tr_c_organismo",formid).hide();
            }),
            closeAfterEdit: true
        }, //edit
        {
            width: 600,
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $(formid).validationEngine({promptPosition:'inline'});
            }),
            onInitializeForm: defaultInitForm(function(formid){
                inicializa_lupas_main_grid(formid);
            }),
            closeAfterAdd: true
        }, //add
        {} //del
    );

    $("#second_grid").jqGrid({
        colNames: datos_second_grid.colNames(),
        colModel: datos_second_grid.colModel(),
        pager: $('#second_grid_pager'),
        caption: "Áreas" ,
        postData: datos_second_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
    }).navGrid('#second_grid_pager',
        {add:true, edit:true, del:true}, //options
        {
            editCaption: 'Modificar Área',
            width: 600,
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $(formid).validationEngine({promptPosition:'inline'});
            }),
            onInitializeForm: defaultInitForm(function(formid){
                set_fechas_min_max(formid);
                var id = $("#main_grid").getGridParam('selrow');
                $("#c_organismo",formid).val($("#main_grid").getCell(id,'c_organismo'));
                $("#c_ente",formid).val("DPA");
                $("#tr_d_region, #tr_d_area, #tr_f_vig_desde, #d_region_lupa, #d_area_lupa", formid).hide();
                $("#f_vig_desde", formid).attr('disabled',true);
                $('#f_vig_hasta',formid).addClass('validate[required,custom[validaFecha],]');
                $('#tr_f_vig_hasta' ).find("label[for =f_vig_hasta]").text('F. Vig. Hasta (*)');
            }),
            beforeInitData: function(formid) {
                var id = $("#main_grid").getGridParam('selrow');
                if (!id) {
                    mostrar_validacion('Debe seleccionar un registro de la grilla superior.');
                    return false;
                }
            },
            closeAfterEdit: true
        }, //edit
        {
            addCaption: 'Asociar Área',
            width: 600,
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $(formid).validationEngine({promptPosition:'inline'});
            }),
            onInitializeForm: defaultInitForm(function(formid){
                inicializa_lupas_second_grid(formid);
                set_fechas_min_max(formid);
                var id = $("#main_grid").getGridParam('selrow');
                $("#c_organismo",formid).val($("#main_grid").getCell(id,'c_organismo'));
                $("#c_ente",formid).val("DPA");
            }),
            beforeInitData: function(formid) {
                var id = $("#main_grid").getGridParam('selrow');
                if (!id) {
                    mostrar_validacion('Debe seleccionar un registro de la grilla superior.');
                    return false;
                }    
            },
            closeAfterAdd: true
        }, //add
        {
            caption: 'Desasociar Área',
            msg: '¿Desea desasociar el Área seleccionada?',
            bSubmit: 'Aceptar'
        } //del
    );

    $('#add_second_grid').text('Asociar');
    $('#edit_second_grid').text('Modificar');
    $('#del_second_grid').text('Desasociar');

    inicializa_lupas();

});