function init_grillas() {

    $("#lupa_c_tipo_documento").lupa_generica({
        id_lista:v_lista_tbl_gen,
        titulos:['Cód Documento','Documento', 'N Tabla'],
        grid:[  {index:'c_codigo',width:200},
            {index:'d_descrip', width:350}, {index:'n_tabla',width:250, hidden:true}],
        caption:'Lista de Documentos',
        sortname:'c_codigo',
        sortorder:'asc',
        filtros:['TIPDOC'],
        campos:{c_codigo:'c_tipo_documento',d_descrip: 'd_tipo_documento', n_tabla:'n_tabla_doc'},
        keyNav:true,
        searchInput: '#c_tipo_documento',
        searchCode: true,
    });

    $("#lupa_c_tipo_imponible").lupa_generica({
        id_lista:v_lista_timp,
        titulos:['Cód. Tipo Imponible','Tipo Imponible'],
        grid:[{index:'c_codigo',width:150},
            {index:'d_descrip',width:400}],
        caption:'Lista de Tipos Imponibles',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:['3'],
        campos:{c_codigo:'c_tipo_imponible',d_descrip:'d_tipo_imponible'},
        keyNav:true,
        searchInput: '#c_tipo_imponible',
        searchCode: true,
    });

    $("#lupa_d_denominacion").lupa_generica({
        id_lista:v_lista_contribuyentes,
        titulos:['Denominación','CUIT', 'Cod. Tipo Doc.', 'Tipo de Documento','Nro. Documento','Id Contribuyente'],
        grid:[
            {index:'d_denominacion',width:305},
            {index:'n_cuit',width:115},
            {index:'c_tipo_documento',width:110},
            {index:'d_tipo_documento',width:165},
            {index:'n_documento',width:170},
            {index:'id_contribuyente',width:100, hidden:true},
        ],
        caption:'Listado de Contribuyentes',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#d_denominacion'],
        filtrosTitulos:['Denominación'],
        filtrosNulos:[false],
        campos:{id_contribuyente:'id_contribuyente',n_cuit: 'n_cuit', d_denominacion:'d_denominacion', c_tipo_documento:'c_tipo_documento', d_tipo_documento:'d_tipo_documento', n_documento: 'n_documento'},
        keyNav:true,
        draggable:true,
        width:1000,
        onClose:function(){
            $("#n_cuit").mask("99-99999999-9");
        }
    });

    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_tributos,
        titulos:['Cód. Tributo','Tributo', 'Tipo Imponible'],
        grid:[  {index:'c_codigo',width:200},
            {index:'d_descrip', width:365}, {index:'c_tipo_imponible', width:350, hidden:true}],
        caption:'Lista de Tributos',
        sortname:'c_codigo',
        sortorder:'asc',
        filtros:['#id_contribuyente'],
        filtrosTitulos:['ID Contribuyente'],
        filtrosNulos:[true],
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo', c_tipo_imponible:'c_tipo_imponible'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
        limpiarCod: true,
    });

    $("#lupa_d_objeto_hecho").lupa_generica({
        id_lista:vg_lista_objetos,
        titulos:['Objeto/Hecho','Id Contribuyente','Tipo Imponible', 'CUIT', 'Denominación'],
        grid:[{index:'d_objeto_hecho',width:100},
            {index:'id_contribuyente',width:100,hidden:true},
            {index:'c_tipo_imponible',width:105},
            {index:'n_cuit',width:100},
            {index:'d_denominacion',width:260}
        ],
        caption:'Listado de Objetos/Hechos',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        filtros:['#c_tributo','#id_contribuyente', '#d_objeto_hecho'],
        filtrosTitulos:['Tributo','ID Contribuyente', 'Objeto'],
        filtrosNulos:[false, true, true],
        campos:{d_objeto_hecho:'d_objeto_hecho', id_contribuyente:'id_contribuyente', c_tipo_imponible:'c_tipo_imponible', n_cuit:'n_cuit', d_denominacion:'d_denominacion'},
        keyNav:true,
        draggable:true
    });

    $("#errores_grid").jqGrid({
        colNames: datos_errores_grid.colNames(),
        colModel: datos_errores_grid.colModel(),
        pager: $('#errores_grid_pager'),
        postData: datos_errores_grid.postData(),
        caption: "Errores encontrados",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:200,
        sortname: 'n_orden',
        sortorder: 'asc',
        ondblClickRow:function(rowid){ 
        },
        loadComplete:function(data){
        },
    }).navGrid('#errores_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    )

    $("#comercios_grid").jqGrid({
        colNames: datos_comercios_grid.colNames(),
        colModel: datos_comercios_grid.colModel(),
        pager: $('#comercios_grid_pager'),
        postData: datos_comercios_grid.postData(),
        caption: "Comercios",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:100,
        sortname: 'm_comercio_ppal',
        sortorder: 'desc',
        ondblClickRow:function(rowid){ 
        },
        loadComplete:function(data){
        },
    }).navGrid('#comercios_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    )

    $("#actividades_grid").jqGrid({
        colNames: datos_actividades_grid.colNames(),
        colModel: datos_actividades_grid.colModel(),
        pager: $('#actividades_grid_pager'),
        postData: datos_actividades_grid.postData(),
        caption: "Actividades",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:200,
        sortname: 'c_actividad',
        sortorder: 'asc',
        ondblClickRow:function(rowid){ 
        },
        loadComplete:function(data){
        },
    }).navGrid('#actividades_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    )

    $("#jurisdicciones_grid").jqGrid({
        colNames: datos_jurisdicciones_grid.colNames(),
        colModel: datos_jurisdicciones_grid.colModel(),
        pager: $('#jurisdicciones_grid_pager'),
        postData: datos_jurisdicciones_grid.postData(),
        caption: "Jurisdicciones",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:100,
        ondblClickRow:function(rowid){ 
        },
        loadComplete:function(data){
        },
    }).navGrid('#jurisdicciones_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    )

    $("#inscripciones_grid").jqGrid({
        colNames: datos_inscripciones_grid.colNames(),
        colModel: datos_inscripciones_grid.colModel(),
        pager: $('#inscripciones_grid_pager'),
        postData: datos_inscripciones_grid.postData(),
        caption: "Inscripciones",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        autowidth: false,
        height:100,
        sortname: 'f_vig_desde',
        sortorder: 'asc',
        onSelectRow: function(id) {
            let id_contrib = $('#inscripciones_grid').getCell(id, 'id_contribuyente');
            let c_tributo = $('#inscripciones_grid').getCell(id, 'c_tributo');
            let d_objeto_hecho = $('#inscripciones_grid').getCell(id, 'd_objeto_hecho');
            let f_vig_desde = $('#inscripciones_grid').getCell(id, 'f_vig_desde');
            let d_tributo = $('#inscripciones_grid').getCell(id, 'd_tributo');

            $("#c_tributo").val(c_tributo);
            $("#d_tributo").val(d_tributo);
            $("#d_objeto_hecho").val(d_objeto_hecho);
            $("#f_vig_desde").val(f_vig_desde);

            filtros_arr_comercios = [];
            filtros_arr_actividades = [];
            filtros_arr_jurisdicciones = [];

            if(c_tributo == 10){
                if(id_contrib != ''){
                    filtros_arr_comercios.push('ID Contribuyente: '+ id_contrib);
                }
                if(c_tributo != ''){
                    filtros_arr_comercios.push('Código Tributo: '+ c_tributo);
                }
                if(d_objeto_hecho != ''){
                    filtros_arr_comercios.push('Objeto / Hecho: '+ d_objeto_hecho);
                }
                filtros_no_nativos_ar['comercios_grid'] = filtros_arr_comercios;

                setea_parametros('#comercios_grid',{
                    ':p_id_contribuyente': id_contrib,
                    ':p_c_tributo': c_tributo,
                    ':p_d_objeto_hecho': d_objeto_hecho,
                });
                $("#div_comercios").show();

                if(id_contrib != ''){
                    filtros_arr_actividades.push('ID Contribuyente: '+ id_contrib);
                }
                if(c_tributo != ''){
                    filtros_arr_actividades.push('Código Tributo: '+ c_tributo);
                }
                if(d_objeto_hecho != ''){
                    filtros_arr_actividades.push('Objeto / Hecho: '+ d_objeto_hecho);
                }
                filtros_no_nativos_ar['actividades_grid'] = filtros_arr_actividades;

                setea_parametros('#actividades_grid',{
                    ':p_id_contribuyente': id_contrib,
                    ':p_c_tributo': c_tributo,
                    ':p_d_objeto_hecho': d_objeto_hecho,
                });
                $("#div_actividades").show();
                $(window).resize();
            }else if(c_tributo == 20){

                if(id_contrib != ''){
                    filtros_arr_actividades.push('ID Contribuyente: '+ id_contrib);
                }
                if(c_tributo != ''){
                    filtros_arr_actividades.push('Código Tributo: '+ c_tributo);
                }
                if(d_objeto_hecho != ''){
                    filtros_arr_actividades.push('Objeto / Hecho: '+ d_objeto_hecho);
                }
                filtros_no_nativos_ar['actividades_grid'] = filtros_arr_actividades;

                setea_parametros('#actividades_grid',{
                    ':p_id_contribuyente': id_contrib,
                    ':p_c_tributo': c_tributo,
                    ':p_d_objeto_hecho': d_objeto_hecho,
                });
                $("#div_actividades").show();

                if(id_contrib != ''){
                    filtros_arr_jurisdicciones.push('ID Contribuyente: '+ id_contrib);
                }
                if(c_tributo != ''){
                    filtros_arr_jurisdicciones.push('Código Tributo: '+ c_tributo);
                }
                if(d_objeto_hecho != ''){
                    filtros_arr_jurisdicciones.push('Objeto / Hecho: '+ d_objeto_hecho);
                }
                filtros_no_nativos_ar['jurisdicciones_grid'] = filtros_arr_jurisdicciones;

                setea_parametros('#jurisdicciones_grid',{
                    ':p_id_contribuyente': id_contrib,
                    ':p_c_tributo': c_tributo,
                    ':p_d_objeto_hecho': d_objeto_hecho,
                });
                $("#div_jurisdicciones").show();
                $(window).resize();
            }else{
                $('#actividades_grid, #comercios_grid, #jurisdicciones_grid').jqGrid('clearGridData');
            }
        },
        loadComplete:function(data){
        },
    }).navGrid('#inscripciones_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {}//del
    )    
    
}

