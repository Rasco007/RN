var datos_main_grid = new GridParam({
    id_menu: v_id_menu,
    n_grid: 0,
    m_autoquery: v_m_autoquery,
    param: {
        ':p_id_bonificacion': null,
        ':p_f_vigencia': null
    }
});

$(document).ready(function () {


    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Detalle",
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        height: 300,
    }).navGrid('#main_grid_pager',
        {add: true, edit: true, del: true}, //options
        {
            width:500,
            onInitializeForm: defaultInitForm(function(formid){
                set_fechas_min_max(formid);
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $(formid).validationEngine({
                    promptPosition:'inline'
                });
                $('#tr_n_periodo_desde_s_deuda').show();
                $('#tr_n_cuota_desde_s_deuda').show();
                $('#tr_n_periodo_hasta_s_deuda').show();
                $('#tr_n_cuota_hasta_s_deuda').show();
            }),
            closeAfterEdit: true
        }, //edit
        {
            width:500,
            onInitializeForm: defaultInitForm(function(formid){
                set_fechas_min_max(formid);
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                $(formid).validationEngine({
                    promptPosition:'inline'
                });
                $('#tr_id_bonificacion').hide();
                $('#tr_n_periodo_desde_s_deuda').show();
                $('#tr_n_cuota_desde_s_deuda').show();
                $('#tr_n_periodo_hasta_s_deuda').show();
                $('#tr_n_cuota_hasta_s_deuda').show();
            }),
            closeAfterAdd: true
        }, //add
        {} //del
    );

    $('#btn_lupa_bonificacion').lupa_generica({
        id_lista:v_lista_bonificaciones,
        titulos:['Código','Descripcion'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'Bonificaciones',
        sortname:'c_codigo',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#filtro_id_bonificacion',
        exactField: 'c_codigo',
        campos:{c_codigo:'filtro_id_bonificacion',d_descrip:'filtro_d_bonificacion'},
        keyNav:true,
        limpiarCod: true
    });

    $('#filtro_id_bonificacion').mask('999999');
});