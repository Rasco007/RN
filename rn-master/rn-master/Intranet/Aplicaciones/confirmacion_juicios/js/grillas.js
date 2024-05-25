function inicializarGrillas(){

    $("#main_grid_datos_instancia").jqGrid({
        colNames:datos_main_grid_datos_instancia.colNames(),
        colModel:datos_main_grid_datos_instancia.colModel(),
        pager: $('#main_grid_datos_instancia_pager'),
        caption:"Datos de la Instancia" ,
        postData:datos_main_grid_datos_instancia.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'n_instancia,n_orden',
        sortorder:'asc',
        autowidth: false,
        height:150,
        loadComplete:function(){
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
            $('#c_expediente').val($('#main_grid_datos_instancia').getCell(id, 'c_expediente'));
            $('#n_instancia').val($('#main_grid_datos_instancia').getCell(id, 'n_instancia'));
            $('#n_orden').val($('#main_grid_datos_instancia').getCell(id, 'n_orden'));
            $('#c_instancia').val($('#main_grid_datos_instancia').getCell(id, 'c_instancia'));
            $('#d_instancia').val($('#main_grid_datos_instancia').getCell(id, 'tipo_instancia'));
            $('#n_cuit').val($('#main_grid_datos_instancia').getCell(id, 'n_cuit')).mask("99-99999999-9");
            $('#desc_denom').val($('#main_grid_datos_instancia').getCell(id, 'desc_denom'));
            $('#c_tipo_documento').val($('#main_grid_datos_instancia').getCell(id, 'c_tipo_doc'));
            $('#n_documento').val($('#main_grid_datos_instancia').getCell(id, 'n_documento'));
            $('#c_sector_origen').val($('#main_grid_datos_instancia').getCell(id, 'c_sector_origen'));
            $('#sector_origen').val($('#main_grid_datos_instancia').getCell(id, 'd_sector_origen'));
            $('#f_origen').val($('#main_grid_datos_instancia').getCell(id, 'f_origen'));
            $('#c_motivo_origen').val($('#main_grid_datos_instancia').getCell(id, 'c_motivo_origen'));
            $('#motivo_origen').val($('#main_grid_datos_instancia').getCell(id, 'd_motivo_origen'));
            $('#f_vto').val($('#main_grid_datos_instancia').getCell(id, 'f_vto'));
            $('#d_resolucion').val($('#main_grid_datos_instancia').getCell(id, 'd_resolucion'));
            $('#f_resolucion').val($('#main_grid_datos_instancia').getCell(id, 'f_resolucion'));
            $('#d_observ').val($('#main_grid_datos_instancia').getCell(id, 'd_observ'));

            filtros_arr_main.length = 0;
            filtros_arr_main_detalles.length = 0;
            n_instancia = $('#main_grid_datos_instancia').getCell(id, 'n_instancia');

            //Grilla Datos de la Intancia
            if ($('#id_boleta_deuda').val() != '') filtros_arr_main.push('Boleta de Deuda: ' + $('#id_boleta_deuda').val());

            //Grilla Detalle de Instancia
            if ($('#id_boleta_deuda').val() != '') filtros_arr_main_detalles.push('Boleta de Deuda: ' + $('#id_boleta_deuda').val());
            if ($('#n_instancia').val() != '') filtros_arr_main_detalles.push('Instancia: ' + $('#n_instancia').val());
         
            filtros_no_nativos_ar['main_grid_datos_instancia'] = filtros_arr_main;
            filtros_no_nativos_ar['main_grid_detalle_instancia'] = filtros_arr_main_detalles;

            setea_parametros('#main_grid_detalle_instancia',{':p_n_instancia':n_instancia});

            document.getElementById('grid_detalle_instancia').style.display="block";
            document.getElementById('totalizador').style.display="flex";
            $(window).resize();
        }
    }).navGrid('#main_grid_datos_instancia_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    )

    $("#main_grid_detalle_instancia").jqGrid({
        colNames:datos_main_grid_detalle_instancia.colNames(),
        colModel:datos_main_grid_detalle_instancia.colModel(),
        pager: $('#main_grid_detalle_instancia_pager'),
        caption:"Detalle de la Instancia" ,
        postData:datos_main_grid_detalle_instancia.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        height:150,
        loadComplete:function(){
        },
        gridComplete: function() {
            try{
                var ids = $("#main_grid_detalle_instancia").jqGrid('getDataIDs');
                var rowData = $("#main_grid_detalle_instancia").jqGrid('getRowData', ids[0]);
                var cellValueSumAdeudado = rowData.sum_adeudado;
                var cellValueSumActualizado = rowData.sum_actualizado;
                var cellValueSumInteres = rowData.sum_interes;
                $('#sum_adeudado').val(cellValueSumAdeudado);
                $('#sum_actualizado').val(cellValueSumActualizado);
                $('#sum_interes').val(cellValueSumInteres);
            }catch (e) {}
        },
        onSelectRow: function(id) {
        }
    }).navGrid('#main_grid_detalle_instancia_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    )



}