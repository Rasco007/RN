function inicializarGrillas(){

    $("#main_grid_cabecera_archivo").jqGrid({
        colNames:datos_main_grid_cabecera_archivo.colNames(),
        colModel:datos_main_grid_cabecera_archivo.colModel(),
        pager: $('#main_grid_cabecera_archivo_pager'),
        caption:"Cabecera de Archivo de Movimientos Bancarios" ,
        postData:datos_main_grid_cabecera_archivo.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        height:125,
        loadComplete:function(){
            var firstRowId = $("#main_grid_cabecera_archivo").jqGrid('getDataIDs')[0];
            $("#main_grid_cabecera_archivo").jqGrid('setSelection', firstRowId, true);
            $("#" + firstRowId).trigger("click");
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
            filtros_arr_main = [];
            filtros_no_nativos_ar = [];
            $('#id_archivo').val($('#main_grid_cabecera_archivo').getCell(id, 'id_archivo'));
            $('#c_tipo_registro').val($('#main_grid_cabecera_archivo').getCell(id, 'c_tipo_registro'));
            $('#n_total_debito').val($('#main_grid_cabecera_archivo').getCell(id, 'n_total_debito'));
            $('#f_proceso').val($('#main_grid_cabecera_archivo').getCell(id, 'f_proceso'));
            $('#f_acreditacion').val($('#main_grid_cabecera_archivo').getCell(id, 'f_acreditacion'));
            $('#n_total_credito').val($('#main_grid_cabecera_archivo').getCell(id, 'n_total_credito'));
            $('#c_organismo_recaudador').val($('#main_grid_cabecera_archivo').getCell(id, 'c_organismo_recaudador'));
            $('#c_banco_administrador').val($('#main_grid_cabecera_archivo').getCell(id, 'c_banco_administrador'));
            $('#n_cantidad_detalle').val($('#main_grid_cabecera_archivo').getCell(id, 'n_cantidad_detalle'));
            $('#f_concil_art').val($('#main_grid_cabecera_archivo').getCell(id, 'f_concil_art'));
            $('#fecha_acre_art').val($('#main_grid_cabecera_archivo').getCell(id, 'fecha_acre_art'));

            if($('#id_archivo').val() !== ''){filtros_arr_main.push('Nro. Archivo: '+ $('#id_archivo').val());}
            if($('#c_tipo_registro').val() !== ''){filtros_arr_main.push('Tipo de Registro: '+ $('#c_tipo_registro').val());}
            if($('#n_total_debito').val() !== ''){filtros_arr_main.push('Total Débito: '+ ($('#n_total_debito').val()).replace(/\./g, '').replace(',', '.'));}
            if($('#f_proceso').val() !== ''){filtros_arr_main.push('F. Proceso: '+ $('#f_proceso').val());}
            if($('#f_acreditacion').val() !== ''){filtros_arr_main.push('F. Acreditación MB: '+ $('#f_acreditacion').val());}
            if($('#n_total_credito').val() !== ''){filtros_arr_main.push('Total Crédito: '+ ($('#n_total_credito').val()).replace(/\./g, '').replace(',', '.'));}
            if($('#c_organismo_recaudador').val() !== ''){filtros_arr_main.push('Organismo Recaudador: '+ $('#c_organismo_recaudador').val());}
            if($('#c_banco_administrador').val() !== ''){filtros_arr_main.push('Banco Administrador: '+ $('#c_banco_administrador').val());}
            if($('#n_cantidad_detalle').val() !== ''){filtros_arr_main.push('Cant. Registros Detalle: '+ $('#n_cantidad_detalle').val());}
            if($('#f_concil_art').val() !== ''){filtros_arr_main.push('F. Conciliación ART: '+ $('#f_concil_art').val());}
            if($('#fecha_acre_art').val() !== ''){filtros_arr_main.push('F. Acreditación ART: '+ $('#fecha_acre_art').val());}
            if($('#fecha_acre_desde').val() !== ''){filtros_arr_main.push('F. Acreditación (Desde): '+ $('#fecha_acre_desde').val());}
            if($('#fecha_acre_hasta').val() !== ''){filtros_arr_main.push('F. Acreditación (Hasta): '+ $('#fecha_acre_hasta').val());}

            filtros_no_nativos_ar['main_grid_cabecera_archivo'] = filtros_arr_main;
            filtros_no_nativos_ar['main_grid_detalle_archivo'] = filtros_arr_main;
            filtros_no_nativos_ar['main_grid_totales_sifere'] = filtros_arr_main;

            setea_parametros('#main_grid_detalle_archivo',{
                ':p_id_archivo':$('#id_archivo').val()
            });

            setea_parametros('#main_grid_totales_sifere',{
                ':p_id_archivo':$('#id_archivo').val()
            });

            document.getElementById('grid_detalle_archivo').style.display="block";
            document.getElementById('grid_totales_sifere').style.display="block";
            $(window).resize();

        }
    }).navGrid('#main_grid_cabecera_archivo_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    )

    $("#main_grid_detalle_archivo").jqGrid({
        colNames:datos_main_grid_detalle_archivo.colNames(),
        colModel:datos_main_grid_detalle_archivo.colModel(),
        pager: $('#main_grid_detalle_archivo_pager'),
        caption:"Detalle de Archivo de Movimientos Bancarios" ,
        postData:datos_main_grid_detalle_archivo.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        height:300,
        loadComplete:function(){
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
        }
    }).navGrid('#main_grid_detalle_archivo_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    )

    $("#main_grid_grilla_excel_mb").jqGrid({
        colNames:datos_main_grid_grilla_excel_mb.colNames(),
        colModel:datos_main_grid_grilla_excel_mb.colModel(),
        pager: $('#main_grid_grilla_excel_mb_pager'),
        caption:"Grilla Excel" ,
        postData:datos_main_grid_grilla_excel_mb.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        height:300,
        loadComplete:function(){
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
        }
    }).navGrid('#main_grid_grilla_excel_mb_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    )

    $("#main_grid_grilla_excel_art").jqGrid({
        colNames:datos_main_grid_grilla_excel_art.colNames(),
        colModel:datos_main_grid_grilla_excel_art.colModel(),
        pager: $('#main_grid_grilla_excel_art_pager'),
        caption:"Grilla Excel" ,
        postData:datos_main_grid_grilla_excel_art.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        height:300,
        loadComplete:function(){
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
        }
    }).navGrid('#main_grid_grilla_excel_art_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    )

    $("#main_grid_totales_sifere").jqGrid({
        colNames:datos_main_grid_totales_sifere.colNames(),
        colModel:datos_main_grid_totales_sifere.colModel(),
        pager: $('#main_grid_totales_sifere_pager'),
        caption:"Totales SIFERE 916 y SIFERE Resto" ,
        postData:datos_main_grid_totales_sifere.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        height:300,
        shrinkToFit: true,
        loadComplete:function(){
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
        }
    }).navGrid('#main_grid_remito_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    )

}