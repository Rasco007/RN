function inicializarGrillas(){

    $("#lupa_n_plan_pago").lupa_generica({
        id_lista:v_lista_planes_pago,
        titulos:[
            'Tipo Plan',
            'Nro. Plan',
            'Descrip.',
            'CUIT',
            'Contribuyente',
            'Tipo Imp.',
            'Desc. Tipo Imp.',
            'Objeto/Hecho',
            'Cuotas',
            'Financiado',
            'Tipo de Plan'],
        grid:[
            {index:'c_tipo_plan_pago',width:105, hidden:true},
            {index:'n_plan_pago',width:90},
            {index:'d_descrip',width:120, hidden:true},
            {index:'n_cuit',width:100},
            {index:'d_denominacion',width:250},
            {index:'c_tipo_imponible',width:160, hidden:true},
            {index:'d_tipo_imponible',width:160, hidden:true},
            {index:'d_objeto_hecho',width:100},
            {index:'n_cuotas',width:55},
            {index:'i_actualizado',width:80},
            {index:'d_t_impo',width:190}
        ],
        caption:'Lista de Planes de Pago',
        sortname:'n_plan_pago',
        sortorder:'desc',
        campos:{c_tipo_plan_pago:'c_tipo_plan_pago_filtro',
            n_plan_pago:'n_plan_pago_filtro',
            d_descrip:'d_tipo_plan_pago_filtro',
            n_cuit: 'n_cuit_filtro',
            d_denominacion:'d_denominacion_filtro',
            c_tipo_imponible:'c_tipo_imponible',
            d_tipo_imponible:'d_tipo_imponible',
            d_objeto_hecho:'d_objeto_hecho_filtro'
        },
        width:1000,
        keyNav:true,
        filtros:['#n_cuit_filtro'],
        filtrosTitulos:['CUIT'],
        filtrosNulos:[true],
        searchCode:true,
        searchInput: '#n_plan_pago_filtro',
        exactField: 'n_plan_pago',
        onClose: function(){
            if (!$('#n_cuit_filtro').val()){
                $('#n_plan_pago_filtro').val(null);
            }
        }
    });

    $("#lupa_tipo_plan_pago").lupa_generica({
        id_lista:v_lista_tipos_de_plan,
        titulos:['Código Plan','Descrip Plan'],
        grid:[  {index:'c_codigo',width:120},
            {index:'d_descrip',width:423}
        ],
        caption:'LISTADO DE TIPOS DE PLANES DE PAGO',
        sortname:'c_codigo',
        sortorder:'desc',
        campos:{c_codigo:'c_tipo_plan_pago_filtro',
            d_descrip: 'd_tipo_plan_pago_filtro'},
        //width:760,
        keyNav:true,
        searchInput: '#c_tipo_plan_pago_filtro',
        searchCode: true,
        onClose: function(){
            if (!$('#d_tipo_plan_pago_filtro').val()){
                $('#c_tipo_plan_pago_filtro').val(null);
            }
        }
    });

    $("#lupa_obj_hecho_filtro").lupa_generica({
        id_lista:v_lista_de_objetos,
        titulos:['Objetos/Hechos'],
        grid:[{index:'d_objeto_hecho',width:565}],
        caption:'Lista de Objetos/Hechos',
        filtros:['#c_tipo_imponible','#d_objeto_hecho_filtro'],
        filtrosTitulos:['Tipo Imponible','Objeto/Hecho'],
        filtrosNulos:[false, true],
        campos:{d_objeto_hecho:'d_objeto_hecho_filtro'},
        keyNav:true,
        searchCode: true
    });

    $("#lupa_tipo_documento").lupa_generica({
        id_lista:v_lista_documentos,
        titulos:['Codigo','Descripcion'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:465}],
        caption:'LISTADO DE TIPOS DE DOCUMENTO',
        sortname:'c_dato',
        sortorder:'asc',
        widthGrid:150,
        campos:{c_dato:'c_tipo_documento',d_dato: 'd_tipo_documento'},
        keyNav:true,
        searchInput: '#c_tipo_documento',
        searchCode: true,
        exactField: 'c_dato',
        onClose: function(){
            if (!$('#d_tipo_documento').val()){
                $('#c_tipo_documento').val(null);
            }
        }
    });

    $("#lupa_c_tipo_imponible").lupa_generica({
        id_lista:v_lista_tipos_imponibles,
        titulos:['Codigo Tipo','Descripcion Tipo'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:465}],
        caption:'LISTADO DE TIPOS IMPONIBLES',
        sortname:'c_codigo',
        sortorder:'asc',
        widthGrid:150,
        campos:{c_codigo:'c_tipo_imponible',d_descrip: 'd_tipo_imponible'},
        keyNav:true,
        searchInput: '#c_tipo_imponible',
        searchCode: true,
        exactField: 'c_codigo',
        onClose: function(){
            if (!$('#d_tipo_imponible').val()){
                $('#c_tipo_imponible').val(null);
            }
        }
    });

    $("#lupa_d_denominacion").lupa_generica({
        id_lista: vg_lista_denominaciones,
        titulos:['ID_contribuyente','CUIT', 'Denominación', 'Código tipo de documento','Tipo de Documento', 'Numero de Documento', 'F. Alta'],
        grid:[{index:'id_contribuyente',width:100, hidden: true},
            {index:'n_cuit',width:220},
            {index:'d_denominacion',width:320},
            {index:'c_tipo_documento',width:200, hidden: true},
            {index:'d_tipo_documento',width:140},
            {index:'n_documento',width:160},
            {index:'f_alta',width:80, hidden: true}],
        caption:'Lista de Denominaciones',
        sortname:'d_denominacion',
        sortorder:'asc',
        width:760,
        filtros:['#d_denominacion_filtro'],
        filtrosTitulos:['Denominación'],
        filtrosNulos:[false],
        campos:{n_cuit: 'n_cuit_filtro', d_denominacion:'d_denominacion_filtro',
            c_tipo_documento:'c_tipo_documento',
            d_tipo_documento: 'd_tipo_documento'},
        keyNav:true,
        draggable:true,
        onClose(){
            if($('#n_cuit_filtro').val() != ''){
                completarDenominacion();
            }
        }
    });


    $("#detalles_grid").jqGrid({
        colNames:datos_detalles_grid.colNames(),
        colModel:datos_detalles_grid.colModel(),
        pager: $('#detalles_grid_pager'),
        caption:"Detalle Plan de Pago" ,
        postData:datos_detalles_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'cuota',
        sortorder:'asc',
        shrinkToFit: true,
        autowidth: false,
        height:170,
        loadComplete: function(){
        },
        onSelectRow: function(id) {

        }
    }).navGrid('#detalles_grid_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    );

    $("#cuotas_grid").jqGrid({
        colNames:datos_cuotas_grid.colNames(),
        colModel:datos_cuotas_grid.colModel(),
        pager: $('#cuotas_grid_pager'),
        caption:"Detalle de las Cuotas" ,
        postData:datos_cuotas_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        height:150,
        rowNum: 50,
        shrinkToFit: true,
        gridview: false,
        loadComplete: function(){
        },
        onSelectRow: function(id) {
           
        },
        ondblClickRow:function(rowid){
           
        }
    }).navGrid('#cuotas_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
        );


        $("#honorarios_grid").jqGrid({
            colNames: honorarios_grid.colNames(),
            colModel: honorarios_grid.colModel(),
            pager: $('#honorarios_grid_pager'),
            caption: "Datos Generales",
            postData: honorarios_grid.postData(),
            autowidth: false,
            width: 1400,
            height: 50,
            sortname: 'c_tipo_plan_pago, n_plan_pago, f_vig_desde, n_cuit_acreedor',
            sortorder: 'asc',
            loadComplete: function(){
                if($('#honorarios_grid').getGridParam('records') > 0){
                    $('#honorarios_grid').jqGrid('setSelection', 1);
                    $('#honorarios_modal').modal('show');
                    $(window).resize();
                } else{
                    if(v_no_carga_inicial_pph){
                        $('#honorarios_modal').modal('hide');
                        mostrar_cuadro('I', 'Atención', 'La consulta ingresada no devolvió datos.');

                    } else{
                        v_no_carga_inicial_pph = true;
                    }
                }
            },
            onSelectRow: function(id){
                $('#d_denominacion_rc').val($('#honorarios_grid').getCell(id, 'd_denominacion_rc'));
                $('#d_caracter_rc').val($('#honorarios_grid').getCell(id, 'd_caracter_rc'));
                $('#d_acredita_rc').val($('#honorarios_grid').getCell(id, 'd_acredita_rc'));
            }
        }).navGrid('#honorarios_grid_pager',
            {add:false, edit:false, del:false}, //options
            {}, // edit options
            {}, // add options
            {}, // del options
            {} // search options
        );
    
    
        $("#relacionados_grid").jqGrid({
            colNames: relacionados_grid.colNames(),
            colModel: relacionados_grid.colModel(),
            pager: $('#relacionados_grid_pager'),
            caption: "Planes de Pago Relacionados",
            postData: relacionados_grid.postData(),
            autowidth: false,
            width: 1400,
            height: 80,
            shrinkToFit: true,
            sortname: 'c_tipo_plan_pago, n_plan_pago, c_tipo_plan_pago_rel, n_plan_pago_rel',
            sortorder: 'asc',
            loadComplete: function(){
                if($('#relacionados_grid').getGridParam('records') > 0){
                    $(window).resize();
                }
            },
            ondblClickRow: function (rowid) {
                //LLAMA AL FACP002
                try{
                    post_to_url('consulta_de_planes.php', {
                        'p_n_id_menu': 100157,
                        'p_n_plan_pago': $('#relacionados_grid').getCell(rowid, 'n_plan_pago_rel')
                    }, '_blank');
                }catch (e) {
                    mostrar_cuadro('E', 'Error', e);
                }
            }
        }).navGrid('#relacionados_grid_pager',
            {add:false, edit:false, del:false}, //options
            {}, // edit options
            {}, // add options
            {}, // del options
            {} // search options
        );
}

