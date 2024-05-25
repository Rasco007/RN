function init_grillas(){
    main_grid_datos = new GridParam({
        id_menu: v_id_menu,
        n_grid: 0,
        m_autoquery:'N',
        param:{}
    });

    $("#main_grid").jqGrid({
        colNames: main_grid_datos.colNames(),
        colModel: main_grid_datos.colModel(),
        pager: $('#main_grid_pager'),
        postData: main_grid_datos.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        shrinkToFit: true,
        height: 180,
        sortname:'n_posicion_fiscal,n_cuota_anticipo',
        sortorder:'asc',
        loadComplete: function(){
            let i_deuda = $('#main_grid').getCell(1,'suma_adeudado');
            if(i_deuda){
                $("#i_adeudado").val(i_deuda);
            }

            let i_interes = $('#main_grid').getCell(1,'suma_interes');
            if(i_interes){
                $("#i_interes").val(i_interes);
            }

            let i_actualizado = $('#main_grid').getCell(1,'suma_actualizado');
            if(i_actualizado){
                $("#i_actualizado").val(i_actualizado);
            }
        }
    }).navGrid('#main_grid_pager',
    {add:false, edit:false, del:false}, //options 
    {}, // edit options
    {}, // add options
    {}, // del options 
    {} // search options 
);

    grid_instancia = new GridParam({
        id_menu: v_id_menu,
        n_grid: 1,
        m_autoquery:'N',
        param:{}
    });

    $("#grid_instancias").jqGrid({
        colNames: grid_instancia.colNames(),
        colModel: grid_instancia.colModel(),
        pager: $('#grid_instancias_pager'),
        postData: grid_instancia.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        height: 180,
        sortname:'n_orden',
        sortorder:'asc',
        loadComplete: function(){
        },
        onSelectRow: function(id) {
            f_confirmacion = $('#grid_instancias').getCell(id,'f_confirmacion');
            $("#f_confirmacion").val(f_confirmacion);

            var id_boleta_deuda = $('#grid_instancias').getCell(id,'id_boleta_deuda');
            $('#boleta_deuda').val(id_boleta_deuda);

            var c_expediente = $('#grid_instancias').getCell(id,'c_expediente');
            $('#c_expediente').val(c_expediente);
            
            setea_parametros('#main_grid',{
                ':p_n_instancia':$('#grid_instancias').getCell(id,'n_instancia'),
                ':p_n_orden': $('#grid_instancias').getCell(id,'n_orden'),
            });
            $('#btn_pre_judicial').attr('disabled',false);
            $('#btn_anular_juicio').attr('disabled',false);
        }
    }).navGrid('#grid_instancias_pager',
    {add:false, edit:false, del:false}, //options 
    {}, // edit options
    {}, // add options
    {}, // del options 
    {} // search options 
);
    
    
}