function inicializarGrillas(){

   
    $("#main_grid").jqGrid({
        colNames:datos_main_grid.colNames(),
        colModel:datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption:"DDJJ" ,
        postData:datos_main_grid.postData(),
        autowidth: false,
        height:120,
        keyNav:false,
        sortname:'n_remito,n_cabezal,n_orden,n_posicion_fiscal,n_cuota_anticipo',
        sortorder:'asc',
        loadComplete:function(){
            $('#main').procOverlay({visible:false});
            $('#detalles_grid').clearGridData();

            if($('#main_grid').getGridParam('records') <= 0){
                $('#refresh_main_grid').hide();
            }else{
                var id = $("#main_grid").jqGrid('getDataIDs')[0];
                $("#main_grid").jqGrid('setSelection', id);
                $('#refresh_main_grid').show();
            }
        },
        onSelectRow: function(id) {
            id_ddjj = $('#main_grid').getCell(id, 'id_ddjj');
            n_cuit = $('#main_grid').getCell(id, 'n_cuit');
            d_deno = $('#main_grid').getCell(id, 'd_denominacion');
            c_tributo_g = $('#main_grid').getCell(id, 'c_tributo');
            d_objeto = $('#main_grid').getCell(id, 'd_objeto_hecho');
            concepto = $('#main_grid').getCell(id, 'c_concepto');
            c_tipo_form = $('#main_grid').getCell(id, 'c_tipo_form');

            $("#n_cuit").val(n_cuit);
            $("#c_tributo").val(c_tributo_g);
            $("#d_objeto_hecho").val(d_objeto);
            $("#c_concepto").val(concepto);
            $('#c_tributo,#c_concepto,#n_cuit').blur();
            $("#n_cuit").mask("99-99999999-9");

            setea_parametros('#detalles_grid',{':p_id_ddjj':id_ddjj, ':p_c_tipo_form':c_tipo_form});

        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:true, del:false}, //options
        {closeAfterEdit: true,
            afterComplete:function() {
                mostrar_confirmacion( 'Proceso Exitoso');
                $('#detalles_grid').clearGridData();

            },
            onInitializeForm: defaultInitForm(function(formid){
                inicializa_lupas_main_grid(formid);
            }),},//edit,
        {},//alta
        {},//del
        {}//search
    )

    $("#detalles_grid").jqGrid({
        colNames:datos_detalles_grid.colNames(),
        colModel:datos_detalles_grid.colModel(),
        pager: $('#detalles_grid_pager'),
        caption:"DETALLE DE LA DDJJ" ,
        postData:datos_detalles_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: true,
        height:120,
        rowNum: 50,
        shrinkToFit: true,
        gridview: false,
        sortname:'n_orden',
        sortorder:'asc',
        onSelectRow: function(id) {
        }
    }).navGrid('#detalles_grid_pager',
        {add:false, edit:false, del:false}, //options
        { 
        }, // edit options
        { 
        }, // add options
        {}, // del options
        {} // search options
    );
}