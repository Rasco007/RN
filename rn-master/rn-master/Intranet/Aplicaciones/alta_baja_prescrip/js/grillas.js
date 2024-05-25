function inicializarGrillas(){
    $("#lupa_c_tipo_imponible").lupa_generica({
        id_lista:v_lista_timp,
        titulos:['Cód. Tipo Imponible','Tipo Imponible'],
        grid:[{index:'c_codigo',width:150},
            {index:'d_descrip',width:400}],
        caption:'Lista de Tipos Imponibles',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:['#id_contribuyente'],
        filtroNull:true,
        campos:{c_codigo:'c_tipo_imponible',d_descrip:'d_tipo_imponible'},
        keyNav:true,
        searchInput: '#c_tipo_imponible',
        searchCode: true,
        onClose: function(){
            tipo_imponible = $('#c_tipo_imponible').val();
            $('#c_tributo').val(null);
            $('#d_tributo').val(null);
            $('#d_objeto_hecho').val(null);
            if( $('#id_contribuyente').val() == ''){
                $('#id_contribuyente').val(null);
            }
        }
    });

    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_trib,
        titulos:['Cód. Tributo','Tributo'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:250}],
        caption:'Lista de Tributos',
        sortname:'d_descrip',
        sortorder:'desc',
        filtros:['#c_tipo_imponible','#id_contribuyente'],
        filtroNull:true,
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
        onClose: function(){
        $('#d_objeto_hecho').val(null);
        }
    });

    $("#lupa_d_objeto_hecho").lupa_generica({
        id_lista:v_lista_obj,
        titulos:['Descripción Objeto-Hecho','cuit','denominacion','id_contribuyente'],
        grid:[{index:'d_objeto_hecho',width:250},
            {index:'n_cuit',hidden:true},
            {index:'denominacion',hidden:true},
            {index:'contrib',hidden:true}],
        caption:'Lista de Objetos - Hechos',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        filtros:['#c_tipo_imponible','#c_tributo','#id_contribuyente'],
        filtrosNulos:[false,false,true],
        filtrosTitulos:['Tipo Imponible','Tributo'],
        campos:{d_objeto_hecho:'d_objeto_hecho',n_cuit:'n_cuit',denominacion:'d_denominacion',contrib:'id_contribuyente'},
        keyNav:true
    });

    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Obligaciones" ,
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        sortname: 'n_posicion_fiscal, n_cuota_anticipo',
        sortorder: 'asc',
        shrinkToFit: true,
        gridview:false,
        afterInsertRow: function(rowid, rowData, rowelem) {
            if(rowData.auxjuicio || rowData.auxinsp){
                $(this).jqGrid('setRowData', rowid, false, {'background-color':'yellow'});
            }
        },
        ondblClickRow : function(rowid){
            $('#btn_edi_obl').click();
        },
        gridComplete: function () {
            if( $('#main_grid').getGridParam('reccount') == 0){
                $('#check_select_all').prop('checked', false);
            }else {
                if ($('#main_grid').getCell(1, 'total_check') == 0){
                    $('#check_select_all').prop('checked', true);
                }else {
                    $('#check_select_all').prop('checked', false);
                }
            }
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    ).navButtonAdd('#main_grid_pager',{
        id:'btn_edi_obl',
        caption:"",
        position:"first",
        buttonicon: "glyphicon glyphicon-edit",
        title:"Editar Fecha Prescripción",
        cursor:"pointer",
        onClickButton:function() {
            var id = $("#main_grid").getGridParam('selrow');
            if (id) {
                $('#modal_id_obligacion').val($('#main_grid').getCell(id, 'id_obligacion'));
                $('#modal_id_sesion').val($('#main_grid').getCell(id, 'id_session'));
                $('#f_prescrip').datepicker("option",'minDate',$('#main_grid').getCell(id,'f_prescripcion_normal')).datepicker("option",'maxDate',fecha_hoy);
                $('#f_prescrip').datepicker('setDate',fecha_hoy);
                $('#modal_f_prescrip').modal("show");
            }else {
                mostrar_validacion('Debe seleccionar una Obligación de la grilla.');
                return false;
            }
        }
    });
}