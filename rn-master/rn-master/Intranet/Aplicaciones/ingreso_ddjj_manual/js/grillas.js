function inicializarGrillas(){
    $("#personales_grid").jqGrid({
        colNames: personales_grid.colNames(),
        colModel: personales_grid.colModel(),
        pager: $('#personales_grid_pager'),
        postData: personales_grid.postData(),
        autowidth: false,
        width: 1480,
        loadComplete: function(){
            if($('#personales_grid').getGridParam('records') > 0){
                $('#personales_grid').jqGrid('setSelection', 1);
                $('#btn_grabar').prop('disabled', false);
                
            }
        },
        onSelectRow: function(id){
            $('#d_calle').val($('#personales_grid').getCell(id, 'd_calle'));
            $('#n_numero').val($('#personales_grid').getCell(id, 'n_numero'));
            $('#d_monoblock').val($('#personales_grid').getCell(id, 'd_monoblock'));
            $('#d_puerta').val($('#personales_grid').getCell(id, 'd_puerta'));
            $('#d_piso').val($('#personales_grid').getCell(id, 'd_piso'));
            $('#d_depto').val($('#personales_grid').getCell(id, 'd_depto'));
            $('#d_oficina').val($('#personales_grid').getCell(id, 'd_oficina'));
            $('#d_manzana').val($('#personales_grid').getCell(id, 'd_manzana'));
            $('#c_bepo').val($('#personales_grid').getCell(id, 'c_bepo'));
            $('#d_bepo').val($('#personales_grid').getCell(id, 'd_bepo'));
            $('#d_localidad').val($('#personales_grid').getCell(id, 'd_localidad'));
            $('#c_postal').val($('#personales_grid').getCell(id, 'c_postal'));
            $('#n_telefono_1').val($('#personales_grid').getCell(id, 'n_telefono_1'));
            $('#n_telefono_2').val($('#personales_grid').getCell(id, 'n_telefono_2'));
            $('#n_fax_1').val($('#personales_grid').getCell(id, 'n_fax_1'));
        },
    }).navGrid('#personales_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#percepciones_grid").jqGrid({
        colNames: percepciones_grid.colNames(),
        colModel: percepciones_grid.colModel(),
        pager: $('#percepciones_grid_pager'),
        postData: percepciones_grid.postData(),
        caption: "Determinación de Percepciones",
        autowidth: false,
        width: 1480,
        shrinkToFit: true,
        sortname: 'n_fila',
        sortorder: 'asc', 
        loadComplete: function(){
            if($('#percepciones_grid').getGridParam('records') > 0){
                $('#percepciones_grid').jqGrid('setSelection', 1);
                
            }else{
                $('#ti_retencion_per').val(null);
            }
        },
        onSelectRow: function(id){
            $('#ti_retencion_per').val($('#percepciones_grid').getCell(id, 'ti_retencion'));
        }
            
    }).navGrid('#percepciones_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    ).navButtonAdd('#percepciones_grid_pager',
    {
        id:'btn_baja_percepciones',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-trash",
        title:"Baja",
        cursor:"pointer",
        onClickButton:function() {
            v_oper = 'delete';
            abm_percepciones(); 
        }
    }).navButtonAdd('#percepciones_grid_pager',
    {
        id:'btn_modif_percepciones',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-edit",
        title:"Modificacion",
        cursor:"pointer",
        onClickButton:function() {
            v_oper = 'edit';
            $('#abm_percepciones_title').text('Modificación Percepciones');
            let row_id = $('#percepciones_grid').getGridParam('selrow');
            $('#n_cuit_per').val($('#percepciones_grid').getCell(row_id, 'n_cuit'));
            $('#d_denominacion_per').val($('#percepciones_grid').getCell(row_id, 'd_denominacion'));
            $('#d_objeto_hecho_per').val($('#percepciones_grid').getCell(row_id, 'n_hecho'));
            $('#f_cobranza_per').val($('#percepciones_grid').getCell(row_id, 'f_cobranza'));
            $('#i_percibido_per').val($('#percepciones_grid').getCell(row_id, 'i_percibido'));
            $('#i_base_imponible_per').val($('#percepciones_grid').getCell(row_id, 'i_base_imponible'));
            $('#f_comprobante_per').val($('#percepciones_grid').getCell(row_id, 'f_comprobante'));
            $('#n_comprobante_per').val($('#percepciones_grid').getCell(row_id, 'n_comprobante'));

            $('#abm_percepciones_modal').modal('show');
        }
    }).navButtonAdd('#percepciones_grid_pager',
    {
        id:'btn_alta_percepciones',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-plus",
        title:"Alta",
        cursor:"pointer",
        onClickButton:function() {
            v_oper = 'add';
            $('#abm_percepciones_title').text('Alta Percepciones');
            $('#abm_percepciones_modal').modal('show');
        }
    });

    $("#retenciones_grid").jqGrid({
        colNames: retenciones_grid.colNames(),
        colModel: retenciones_grid.colModel(),
        pager: $('#retenciones_grid_pager'),
        postData: retenciones_grid.postData(),
        caption: "Determinación de Retenciones",
        autowidth: false,
        width: 1480,
        shrinkToFit: true,
        sortname: 'n_fila',
        sortorder: 'asc',
        loadComplete: function(){
            if($('#retenciones_grid').getGridParam('records') > 0){
                $('#retenciones_grid').jqGrid('setSelection', 1);   
            } else{
                $('#ti_retencion_ret').val(null);
            }
        },
        onSelectRow: function(id){
            $('#ti_retencion_ret').val($('#retenciones_grid').getCell(id, 'ti_retencion'));
        }
    }).navGrid('#retenciones_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    ).navButtonAdd('#retenciones_grid_pager',
    {
        id:'btn_baja_retenciones',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-trash",
        title:"Baja",
        cursor:"pointer",
        onClickButton:function() {
            v_oper = 'delete';
            abm_retenciones(); 
        }
    }).navButtonAdd('#retenciones_grid_pager',
    {
        id:'btn_modif_retenciones',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-edit",
        title:"Modificacion",
        cursor:"pointer",
        onClickButton:function() {
            v_oper = 'edit';
            $('#abm_retenciones_title').text('Modificación retenciones');
            let row_id = $('#retenciones_grid').getGridParam('selrow');
            $('#n_cuit_ret').val($('#retenciones_grid').getCell(row_id, 'n_cuit'));
            $('#d_denominacion_ret').val($('#retenciones_grid').getCell(row_id, 'd_denominacion'));
            $('#d_objeto_hecho_ret').val($('#retenciones_grid').getCell(row_id, 'n_hecho'));
            $('#f_retencion_ret').val($('#retenciones_grid').getCell(row_id, 'f_retencion'));
            $('#i_retenido_ret').val($('#retenciones_grid').getCell(row_id, 'i_retenido'));
            $('#p_coeficiente_ret').val($('#retenciones_grid').getCell(row_id, 'p_coeficiente'));
            $('#n_recibo_ret').val($('#retenciones_grid').getCell(row_id, 'n_recibo'));

            $('#abm_retenciones_modal').modal('show');
        }
    }).navButtonAdd('#retenciones_grid_pager',
    {
        id:'btn_alta_retenciones',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-plus",
        title:"Alta",
        cursor:"pointer",
        onClickButton:function() {
            v_oper = 'add';
            $('#abm_retenciones_title').text('Alta Retenciones');
            $('#abm_retenciones_modal').modal('show');
        }
    });

    $("#sellos_grid").jqGrid({
        colNames: sellos_grid.colNames(),
        colModel: sellos_grid.colModel(),
        pager: $('#sellos_grid_pager'),
        postData: sellos_grid.postData(),
        autowidth: false,
        width: 1480,
        shrinkToFit: true,
        sortname: 'n_fila',
        sortorder: 'asc',
        loadComplete: function(){
            if($('#sellos_grid').getGridParam('records') > 0){
                $('#sellos_grid').jqGrid('setSelection', 1);
            } else{
                $('#ti_retencion_sellos').val(null);
            }
        },
        onSelectRow: function(id){
            $('#ti_retencion_sellos').val($('#sellos_grid').getCell(id, 'ti_retencion'));
        }
            
    }).navGrid('#sellos_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    ).navButtonAdd('#sellos_grid_pager',
    {
        id:'btn_baja_sellos',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-trash",
        title:"Baja",
        cursor:"pointer",
        onClickButton:function() {
            v_oper = 'delete';
            abm_sellos(); 
        }
    }).navButtonAdd('#sellos_grid_pager',
    {
        id:'btn_modif_sellos',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-edit",
        title:"Modificacion",
        cursor:"pointer",
        onClickButton:function() {
            v_oper = 'edit';
            $('#abm_sellos_title').text('Modificación Sellos');
            let row_id = $('#sellos_grid').getGridParam('selrow');

            $('#n_cuit_sellos').val($('#sellos_grid').getCell(row_id, 'n_cuit'));
            $('#d_denominacion_sellos').val($('#sellos_grid').getCell(row_id, 'd_denominacion'));
            $('#i_retencion_sellos').val($('#sellos_grid').getCell(row_id, 'i_retencion'));
            $('#f_retencion_sellos').val($('#sellos_grid').getCell(row_id, 'f_retencion'));
            $('#f_instrumento_sellos').val($('#sellos_grid').getCell(row_id, 'f_instrumento'));
            $('#i_base_imponible_sellos').val($('#sellos_grid').getCell(row_id, 'i_base_imponible'));
            $('#i_alicuota_sellos').val($('#sellos_grid').getCell(row_id, 'i_alicuota'));
            $('#i_impuesto_sellos').val($('#sellos_grid').getCell(row_id, 'i_impuesto'));

            $('#abm_sellos_modal').modal('show');
        }
    }).navButtonAdd('#sellos_grid_pager',
    {
        id:'btn_alta_sellos',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-plus",
        title:"Alta",
        cursor:"pointer",
        onClickButton:function() {
            v_oper = 'add';
            $('#abm_sellos_title').text('Alta Sellos');
            $('#abm_sellos_modal').modal('show');
        }
    });

    $("#errores_grid").jqGrid({
        colNames: errores_grid.colNames(),
        colModel: errores_grid.colModel(),
        pager: $('#errores_grid_pager'),
        postData: errores_grid.postData(),
        autowidth: false,
        width: 1480,
        shrinkToFit: true,
        sortname: 'n_fila',
        sortorder: 'asc',
        loadComplete: function(){
            if($('#errores_grid').getGridParam('records') > 0){
                $('#errores_grid').jqGrid('setSelection', 1);
                $('#errores_modal').show();
                $(window).resize();
            }

            $('#')
        },
            
    }).navGrid('#errores_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    )
}