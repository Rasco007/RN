function init_grillas (){

    $("#lupa_d_denominacion").lupa_generica({
        id_lista:v_lista_denominaciones,
        titulos:[ 'ID Contribuyente', 'CUIT', 'Denominación', 'Cod. Tipo Documento', 'Tipo Documento', 'Nro. Documento', 'F. Alta'],
        grid:[
            {index:'id_contribuyente',width:450, hidden: true},
            {index:'n_cuit',width:100},
            {index:'d_denominacion',width:370},
            {index:'c_tipo_documento',width:150, hidden: true},
            {index:'d_tipo_documento',width:145},
            {index:'n_documento',width:150},
            {index:'f_alta',width:100}
        ],
        caption:'Lista de Denominaciones',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#d_denominacion'],
        filtrosTitulos:['Denominación'],
        filtrosNulos:[true],
        width:1000,
        campos:{
            id_contribuyente: 'id_contribuyente',
            n_cuit: 'n_cuit',
            d_denominacion:'d_denominacion',
            c_tipo_documento:'c_documento',
            d_tipo_documento:'d_documento',
            n_documento: 'documento'
        },
        keyNav:true,
        draggable:true
    });

    main_grid_datos = new GridParam({
        id_menu: v_id_menu,
        n_grid: 2,
        m_autoquery:'N',
        param:{}
    });

    $("#main_grid").jqGrid({
        colNames: main_grid_datos.colNames(),
        colModel: main_grid_datos.colModel(),
        pager: $('#main_grid_pager'),
        postData: main_grid_datos.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        shrinkToFit: false,
        height: 180,
        rowNum: 10000,
        sortname:'rownum',
        sortorder:'asc',
        loadComplete: function(){
            if($('#main_grid').getGridParam('records') > 1){
                v_mas_de_un_registro = true;
            }
        }}).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options 
        {}, // edit options
        {}, // add options
        {}, // del options 
        {} // search options 
    );


    secondary_grid_datos = new GridParam({
        id_menu: v_id_menu,
        n_grid: 1,
        m_autoquery:'N',
        param:{}
    });

    $("#secondary_grid").jqGrid({
        colNames: secondary_grid_datos.colNames(),
        colModel: secondary_grid_datos.colModel(),
        pager: $('#secondary_grid_pager'),
        caption:"Deuda Asociada al Contribuyente" ,
        postData: secondary_grid_datos.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        shrinkToFit: false,
        height: 180,
        rowNum: 1000,
        sortname:'rownum',
        sortorder:'asc',
        loadComplete: function(){

            if($("#secondary_grid").jqGrid('getGridParam','records') > 0){
                $("#check_all").prop('disabled',false);
                $("#sola_sin_prescribir").prop('disabled',false);
                $("#btn_modificar").prop('disabled',false);
            }
            let i_deuda = $('#secondary_grid').getCell(1,'suma_adeudado');
            if(i_deuda){
                $("#i_adeudado").val(i_deuda);
            }

            let i_interes = $('#secondary_grid').getCell(1,'suma_interes');
            if(i_interes){
                $("#i_interes").val(i_interes);
            }

            let i_actualizado = $('#secondary_grid').getCell(1,'suma_actualizado');
            if(i_actualizado){
                $("#i_actualizado").val(i_actualizado);
            }

            let suma_total = $('#secondary_grid').getCell(1,'suma_total');
            if(suma_total){
                $("#suma_seleccionado").val(suma_total);
            }
        }});
}
