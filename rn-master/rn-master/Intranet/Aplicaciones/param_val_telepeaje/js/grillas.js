var datos_main_grid = new GridParam({
    id_menu: v_id_menu,
    n_grid: 0,
    n_orden:0,
    m_autoquery: v_m_autoquery,
    param: {
        ':p_c_tipo_imp': v_c_tipo_imp,
        ':p_c_tributo': v_c_tributo,
        ':p_c_concepto':null,
        ':p_f_vigencia':null
    }
});

$(document).ready(function () {


    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Detalle",
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        height: 300,
        sortname:"C_CODIGO1"
    }).navGrid('#main_grid_pager',
        {add: true, edit: true, del: true}, //options
        {
            top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
                inicializar_lupas(formid);
                set_fechas_min_max(formid)
                $("#c_tipo_imponible",formid).val(v_c_tipo_imp);
                $("#c_tributo",formid).val(v_c_tributo);
                $("#n_tabla_tipo_imp",formid).val(3);
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $('#pData,#nData').remove();
                $('#tr_c_codigo1, #tr_d_concepto, #tr_c_codigo2, #tr_d_tipo_automotor, #tr_c_codigo3, #tr_n_cant_ut').hide();
                $('#tr_c_codigo2' ).find("label[for =c_codigo2]").text('Cod. T. Automotor (*)');
                $('#tr_d_tipo_automotor' ).find("label[for =d_tipo_automotor]").text('Tipo Automotor (*)');
                $('#tr_n_cant_ut' ).find("label[for =n_cant_ut]").text('Cantidad de Unidad Tributaria (*)');
                $('#tr_n_val_fijo' ).find("label[for =n_val_fijo]").text('Importe (*)');
                if ($('#c_codigo1', formid).val() == 310){
                    $('#tr_n_cant_ut, #tr_d_unidad').show();
                    $('#n_cant_ut, #d_unidad', formid).addClass('validate[required]');
                    $('#tr_n_val_fijo').hide();
                    $('#n_val_fijo',formid).removeClass('validate[required]').val(null);
                }else {
                    $('#tr_n_cant_ut, #tr_d_unidad').hide();
                    $('#n_cant_ut, d_unidad', formid).removeClass('validate[required]').val(null);
                    $('#tr_n_val_fijo').show();
                    $('#n_val_fijo',formid).addClass('validate[required]');
                }
                $(formid).validationEngine({
                    promptPosition:'inline'
                });
            }),
            closeAfterEdit: true
        }, //edit
        {
            top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
                $("#c_peaje",formid).val('1');
                buscar_desc_peaje($("#c_peaje",formid).val());
                inicializar_lupas(formid);
                set_fechas_min_max(formid)
                $("#c_tipo_imponible",formid).val(v_c_tipo_imp);
                $("#c_tributo",formid).val(v_c_tributo);
                $("#n_tabla_tipo_imp",formid).val(3);
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $('#tr_c_codigo1, #tr_c_codigo3, #tr_n_cant_ut, #tr_d_unidad, #tr_n_val_fijo').hide();
                $('#tr_c_codigo2' ).find("label[for =c_codigo2]").text('Cod. T. Automotor (*)');
                $('#tr_d_tipo_automotor' ).find("label[for =d_tipo_automotor]").text('Tipo Automotor (*)');
                $('#tr_n_cant_ut' ).find("label[for =n_cant_ut]").text('Cantidad de Unidad Tributaria (*)');
                $('#tr_n_val_fijo' ).find("label[for =n_val_fijo]").text('Importe (*)');
                $(formid).validationEngine({
                    promptPosition:'inline'
                });
            }),
            closeAfterAdd: true
        }, //add
        {} //del
    );


});