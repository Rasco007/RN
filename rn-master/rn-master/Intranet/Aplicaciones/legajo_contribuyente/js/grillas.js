function init_grillas() {
    
    $("#ddjj_no_pagadas_grid").jqGrid({
        colNames: datos_ddjj_no_pagadas_grid.colNames(),
        colModel: datos_ddjj_no_pagadas_grid.colModel(),
        pager: $('#ddjj_no_pagadas_grid_pager'),
        caption: "Declaraciones Juradas",
        postData: datos_ddjj_no_pagadas_grid.postData(),
        autowidth: false,
        width: 480,
        ondblClickRow: function(){
            mostrar_error('Le ha dado doble click a la grilla.');
        },
        onSelectRow: function (id) {
            var d_descrip = $(this).getCell(id,'d_descrip');
            var d_concepto = $(this).getCell(id,'d_concepto');
            var m_intimacion = $(this).getCell(id,'m_intimacion');
            var m_bd = $(this).getCell(id,'m_bd');
            var m_expediente = $(this).getCell(id,'m_expediente');
            $("#d_descrip").val(d_descrip);
            $("#d_concepto").val(d_concepto);
            if(m_intimacion=='S'){
                $('#chk_intimacion').prop('checked',true)
            }
            if(m_bd=='S'){
                $('#chk_boleta_deuda').prop('checked',true)
            }
            if(m_expediente=='S'){
                $('#chk_gestion_judicial').prop('checked',true)
            }
        }
    }).navGrid('#ddjj_no_pagadas_grid_pager',{add:false, edit:false, del:false});

    $("#inmuebles_no_pagados_grid").jqGrid({
        colNames: datos_inmuebles_no_pagados_grid.colNames(),
        colModel: datos_inmuebles_no_pagados_grid.colModel(),
        pager: $('#inmuebles_no_pagados_grid_pager'),
        caption: "Registros de Inmuebles no pagados",
        postData: datos_inmuebles_no_pagados_grid.postData(),
        sortname:'c_tributo, d_objeto_hecho, id_obligacion',
        autowidth: false,
        width: 480,
        height:160,
        sortorder:'desc',
        onSelectRow: function () {
            var id = $('#inmuebles_no_pagados_grid').getGridParam('selrow');
            var d_tributo = $('#inmuebles_no_pagados_grid').getCell(id,'d_tributo');
            var d_concepto = $('#inmuebles_no_pagados_grid').getCell(id,'d_concepto');
            var m_intimacion = $('#inmuebles_no_pagados_grid').getCell(id,'m_intimacion'); // Intimacion y Boleta de Deuda
            var m_expediente = $('#inmuebles_no_pagados_grid').getCell(id,'m_expediente'); // Gestión Judicial
            $('#form_inmuebles_no_pagados #d_tributo').val(d_tributo);
            $('#form_inmuebles_no_pagados #d_concepto').val(d_concepto);
            $('#form_inmuebles_no_pagados #chk_intimacion').prop('checked',false);
            $('#form_inmuebles_no_pagados #chk_boleta_deuda').prop('checked',false);
            $('#form_inmuebles_no_pagados #chk_gestion_judicial').prop('checked',false);
            if (m_intimacion=='S')  $('#form_inmuebles_no_pagados #chk_intimacion').prop('checked',true);
            if (m_intimacion=='B')  $('#form_inmuebles_no_pagados #chk_boleta_deuda').prop('checked',true);
            if (m_expediente=='S')  $('#form_inmuebles_no_pagados #chk_gestion_judicial').prop('checked',true);
        },
        ondblClickRow: function(){
            mostrar_error('Le ha dado doble click a la grilla.');
        }
    }).navGrid('#inmuebles_no_pagados_grid_pager',{add:false, edit:false, del:false});

    $("#automotor_grid").jqGrid({
        colNames: datos_automotor_grid.colNames(),
        colModel: datos_automotor_grid.colModel(),
        pager: $('#automotor_grid_pager'),
        caption: "Responsables",
        postData: datos_automotor_grid.postData(),
        autowidth: false,
        width: 480,
        ondblClickRow: function(){
            mostrar_validacion('El redireccionamiento no está desarrollado aún.');
        }
    }).navGrid('#automotor_grid_pager',{add:false, edit:false, del:false});

    $("#ddjj_no_presentadas_grid").jqGrid({
        colNames: datos_ddjj_no_presentadas_grid.colNames(),
        colModel: datos_ddjj_no_presentadas_grid.colModel(),
        pager: $('#ddjj_no_presentadas_grid_pager'),
        caption: "Declaraciones Juradas",
        postData: datos_ddjj_no_presentadas_grid.postData(),
        autowidth: false,
        width: 480,
        sortname: 'c_tributo,d_objeto_hecho,id_obligacion',
        sortorder: "desc",
        onSelectRow: function(){
            var row = $('#ddjj_no_presentadas_grid').getGridParam('selrow');
            var d_concepto = $('#ddjj_no_presentadas_grid').getCell(row,'d_concepto');
            var d_descrip = $('#ddjj_no_presentadas_grid').getCell(row,'d_descrip');
            var chk_intimacion = $('#ddjj_no_presentadas_grid').getCell(row,'m_intimacion');
            var chk_gestion = $('#ddjj_no_presentadas_grid').getCell(row,'m_expediente');
            var chk_boleta = $('#ddjj_no_presentadas_grid').getCell(row,'boleta');

            $('#form_ddjj_no_presentadas #d_concepto').val(d_concepto);
            $('#form_ddjj_no_presentadas #d_descrip').val(d_descrip);
            if(chk_intimacion == 'S'){
                $('#form_ddjj_no_presentadas #chk_int_no_pres').prop('checked', true);
            }
            if(chk_gestion == 'S'){
                $('#form_ddjj_no_presentadas #chk_gestion_no_pres').prop('checked', true);
            }
            if(chk_boleta == 'S'){
                $('#form_ddjj_no_presentadas #chk_boleta_no_pres').prop('checked', true);
            }
        }
    }).navGrid('#ddjj_no_presentadas_grid_pager',{add:false, edit:false, del:false},);

    $("#inmuebles_grid").jqGrid({
        colNames: datos_inmuebles_grid.colNames(),
        colModel: datos_inmuebles_grid.colModel(),
        pager: $('#inmuebles_grid_pager'),
        caption: "Responsables",
        postData: datos_inmuebles_grid.postData(),
        autowidth: false,
        width: 480
    }).navGrid('#inmuebles_grid_pager',{add:false, edit:false, del:false});
}