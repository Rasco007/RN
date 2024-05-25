function inicializarGrillas(){
    $("#main_grid").jqGrid({
        colNames: main_grid.colNames(),
        colModel: main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "",
        postData: main_grid.postData(),
        autowidth: false,
        width: 940,
        sortname: 'id_contribuyente_intermediario, f_alta',
        sortorder: 'asc',
        keyNav:false,
        onSelectRow: function(id){
            $('#d_objeto_hecho').val($('#main_grid').getCell(id, 'd_objeto_hecho_intermediario'));
            $('#d_denominacion').val($('#main_grid').getCell(id, 'dsp_intermediario'));
            $('#n_cuit_intermed').val($('#main_grid').getCell(id, 'n_cuit_intermediario'));
            $('#n_documento').val($('#main_grid').getCell(id, 'n_documento_intermediario'));
            $('#d_tipo_doc').val($('#main_grid').getCell(id, 'dsp_tipo_doc_intermediario'));
            $('#c_tipo_imp').val($('#main_grid').getCell(id, 'c_tipo_imponible_intermediario'));
            $('#d_tipo_imp').val($('#main_grid').getCell(id, 'dsp_tipo_imp_intermediario'));
            $('#c_tipo_doc').val($('#main_grid').getCell(id, 'c_tipo_documento'));
            $('#c_tributo').val($('#main_grid').getCell(id, 'c_tributo_intermediario'));
            $('#d_tributo').val($('#main_grid').getCell(id, 'dsp_tributo_intermediario'));

            $('#n_cuit_contrib').val($('#main_grid').getCell(id, 'n_cuit'));
            $('#d_denominacion_contrib').val($('#main_grid').getCell(id, 'd_razon_social'));
            $('#d_objeto_hecho_contrib').val($('#main_grid').getCell(id, 'd_objeto_hecho'));
            $('#d_tributo_contrib').val($('#main_grid').getCell(id, 'dsp_tributo'));
            $('#existia_alta').val($('#main_grid').getCell(id, 'existia_alta'));
            $('#c_provincia').val($('#main_grid').getCell(id, 'c_provincia'));
            $('#c_tributo_contrib').val($('#main_grid').getCell(id, 'c_tributo_contrib'));
            $('#d_localidad').val($('#main_grid').getCell(id, 'd_localidad'));
            $('#c_postal').val($('#main_grid').getCell(id, 'c_postal'));
            $('#d_calle').val($('#main_grid').getCell(id, 'd_calle'));
            $('#n_numero').val($('#main_grid').getCell(id, 'n_numero'));
            $('#piso').val($('#main_grid').getCell(id, 'd_piso'));
            $('#d_email').val($('#main_grid').getCell(id, 'd_email'));
            $('#depto').val($('#main_grid').getCell(id, 'd_depto'));
            $('#n_telefono').val($('#main_grid').getCell(id, 'n_telefono'));
            $('#f_desde').val($('#main_grid').getCell(id, 'f_vig_desde'));
            $('#f_hasta').val($('#main_grid').getCell(id, 'f_vig_hasta'));
            $('#cta_contable').val($('#main_grid').getCell(id, 'n_cuenta_contable'));
            $('#n_orden').val($('#main_grid').getCell(id, 'd_orden'));
            $('#c_tipo_doc_hab').val($('#main_grid').getCell(id, 'c_tipo_doc_habilitante'));
            $('#d_tipo_doc_hab').val($('#main_grid').getCell(id, 'dsp_tipo_doc_habilitante'));
            $('#d_provincia').val($('#main_grid').getCell(id, 'dsp_provincia'));
        },
        loadComplete: function(){
            if($('#main_grid').getGridParam('records') > 0){
                var id = $("#main_grid").jqGrid('getDataIDs')[0];
                $("#main_grid").jqGrid('setSelection', id);
                $('#separador').prop('readonly', false);
                asignar_ids_btn_pdf();
            }
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
}