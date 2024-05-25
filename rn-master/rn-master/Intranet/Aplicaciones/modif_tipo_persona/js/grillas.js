function inicializarGrillas(){
    $("#lupa_c_tipo_documento").lupa_generica({
        id_lista:v_lista_tdoc,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:250}],
        caption:'Tipo de Documento',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:[],
        searchInput: '#c_tipo_documento',
        searchCode: true,
        limpiarCod: true,
        campos:{c_codigo:'c_tipo_documento',d_descrip:'d_tipo_documento'},
        keyNav:true,
        onClose: function(){
            $('#n_documento').val(null);
        }
    });

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
            $('#c_tributo').val(null);
            $('#d_tributo').val(null);
            $('#d_objeto_hecho').val(null);
        }
    });

    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_trib,
        titulos:['Cód. Tributo','Tributo'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:250}],
        caption:'Lista de Tributos',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:['#c_tipo_imponible'],
        filtrosNulos:[false],
        filtrosTitulos:['Tipo Imponible'],
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
        onClose: function(){
            $('#d_objeto_hecho').val(null);
            if ($('#c_tributo').val()){
                $('#d_objeto_hecho').attr('readonly',false);
            }else {
                $('#d_objeto_hecho').attr('readonly',true);
            }
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
        keyNav:true,
        onClose: function(){
            if ($('#d_objeto_hecho').val()){
                fun_ajax_objeto_hecho();
            }
        }
    });

    $("#lupa_tipo_nacionalidad").lupa_generica({
        id_lista:v_lista_nacionalidad,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_dato',width:150},
            {index:'d_dato',width:350}],
        caption:'Nacionalidades',
        sortname:'d_dato',
        sortorder:'asc',
        keyNav:true,
        campos:{c_dato:'c_nacionalidad',d_dato:'d_tipo_nacionalidad'},
        searchCode:true,
        searchInput: '#c_nacionalidad',
        exactField: 'c_dato',
        limpiarCod: true
    });


    $("#lupa_tipo_estado_civil").lupa_generica({
        id_lista:v_lista_estado_civil,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_dato',width:150},
            {index:'d_dato',width:350}],
        caption:'Estados Civiles',
        sortname:'d_dato',
        sortorder:'asc',
        keyNav:true,
        campos:{c_dato:'c_estado_civil',d_dato:'d_tipo_estado_civil'},
        searchCode:true,
        searchInput: '#c_estado_civil',
        exactField: 'c_dato',
        limpiarCod: true
    });



    $("#lupa_tipo_empresa").lupa_generica({
        id_lista:v_lista_empresa,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_dato',width:150},
            {index:'d_dato',width:350}],
        caption:'Tipos de Empresa',
        sortname:'c_dato',
        sortorder:'asc',
        keyNav:true,
        campos:{c_dato:'c_tipo_empresa',d_dato:'d_tipo_empresa'},
        searchCode:true,
        searchInput: '#c_tipo_empresa',
        exactField: 'c_dato',
        limpiarCod: true
    });



    $("#lupa_tipo_forma_juridica").lupa_generica({
        id_lista:v_lista_forma_jurica,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_dato',width:150},
            {index:'d_dato',width:350}],
        caption:'Formas Jurídicas',
        sortname:'d_dato',
        sortorder:'asc',
        keyNav:true,
        campos:{c_dato:'c_forma_juridica',d_dato:'d_tipo_forma_juridica'},
        searchCode:true,
        searchInput: '#c_forma_juridica',
        foco:'#sucursales',
        exactField: 'c_dato',
        limpiarCod: true
    });

    $("#integrantes_grid").jqGrid({
        colNames:datos_integrantes_grid.colNames(),
        colModel:datos_integrantes_grid.colModel(),
        autowidth:false,
        height:90,
        pager: $('#integrantes_grid_pager'),
        caption:"Nómina de Reponsables o Componentes de la Entidad/UTE:" ,
        postData:datos_integrantes_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        loadComplete:function(data){
            gridParentWidth = $('#gbox_integrantes_grid').parent().width();
            $('#integrantes_grid').setGridWidth(gridParentWidth);
        }
    }).navGrid('#integrantes_grid_pager',
        {add:true, edit:false, del:false}, //options
        {}, // edit options
        {
            width:700,
            onInitializeForm: defaultInitForm(function(formid) {
                // Definición de lupas
                lupas_per_juridica(formid,'');
                $('#n_cuit',formid).mask("99-99999999-9");
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid) {
                $("#id_contribuyente",formid).val(id_contrib);
                $('#n_documento',formid).prop('disabled', false);
                $('#tr_d_tipo_documento',formid).show();
                $('#tr_n_documento',formid).show();
                $('#tr_n_cuit',formid).show();
                $('#tr_d_tipo_responsable',formid).show();
            }),
            afterShowForm:function(formid){
                mostrar_cuadro('I','Atención','Una vez agregado el integrante no podrá modificarlo o eliminarlo.');
                $('#n_cuit',formid).change(function(){
                    completa_integrantes(limpia_cuit($('#n_cuit',formid).val()),formid);
                });
            },
            onclickSubmit: function(params, postdata) { // Para evitar fallos en filas sin refresh
                var ret = $(this).getGridParam('postData');
                postdata.n_tabla_tipo_doc = 1;
                postdata.n_tabla_tipo_res = 52;
                postdata.n_tabla_car_firma = 48;
                postdata.n_tabla_cargo = 51;
                postdata.n_cuit=limpia_cuit(postdata.n_cuit);
                postdata.id_contribuyente = id_contrib;
                postdata = $.extend(postdata,eval('('+ret.param+')'));
                return postdata;
            },
            closeAfterAdd:true
        }, // add options
        {},
    );

    $("#integrantestmp_grid").jqGrid({
        colNames:datos_integrantestmp_grid.colNames(),
        colModel:datos_integrantestmp_grid.colModel(),
        autowidth:false,
        height:90,
        pager: $('#integrantestmp_grid_pager'),
        caption:"Nómina de Reponsables o Componentes de la Entidad/UTE:" ,
        postData:datos_integrantestmp_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        loadComplete:function(data){
            gridParentWidth = $('#gbox_integrantestmp_grid').parent().width();
            $('#integrantestmp_grid').setGridWidth(gridParentWidth);
        }
    }).navGrid('#integrantestmp_grid_pager',
        {add:true, edit:true, del:true}, //options
        {
            width:700,
            onInitializeForm: defaultInitForm(function(formid) {
                // Definición de lupas
                lupas_per_juridica(formid,'tmp');
                $('#n_cuit',formid).mask("99-99999999-9");
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid) {
                $("#id_contribuyente_tmp",formid).val(id_contrib);
                $('#n_documento',formid).prop('disabled', false);
                $('#tr_d_tipo_documento',formid).show();
                $('#tr_n_documento',formid).show();
                $('#tr_n_cuit',formid).show();
                $('#tr_d_tipo_responsable',formid).show();
            }),
            afterShowForm:function(formid){
                $('#n_cuit',formid).change(function(){
                    completa_integrantes(limpia_cuit($('#n_cuit',formid).val()),formid);
                });
            },
            onclickSubmit: function(params, postdata) { // Para evitar fallos en filas sin refresh
                var ret = $(this).getGridParam('postData');
                postdata.n_cuit=limpia_cuit(postdata.n_cuit);
                postdata = $.extend(postdata,eval('('+ret.param+')'));
                return postdata;
            }
        }, // edit options
        {
            width:700,
            onInitializeForm: defaultInitForm(function(formid) {
                // Definición de lupas
                lupas_per_juridica(formid,'tmp');
                $('#n_cuit',formid).mask("99-99999999-9");
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid) {
                $("#id_contribuyente_tmp",formid).val(id_contrib);
                $('#n_documento',formid).prop('disabled', false);
                $('#tr_d_tipo_documento',formid).show();
                $('#tr_n_documento',formid).show();
                $('#tr_n_cuit',formid).show();
                $('#tr_d_tipo_responsable',formid).show();
            }),
            afterShowForm:function(formid){
                $('#n_cuit',formid).change(function(){
                    completa_integrantes(limpia_cuit($('#n_cuit',formid).val()),formid);
                });
            },
            onclickSubmit: function(params, postdata) { // Para evitar fallos en filas sin refresh
                var ret = $(this).getGridParam('postData');
                postdata.n_tabla_tipo_doc = 1;
                postdata.n_tabla_tipo_res = 52;
                postdata.n_tabla_car_firma = 48;
                postdata.n_tabla_cargo = 51;
                postdata.n_cuit=limpia_cuit(postdata.n_cuit);
                postdata.id_contribuyente_tmp = id_contrib;
                postdata = $.extend(postdata,eval('('+ret.param+')'));
                return postdata;
            },
            closeAfterAdd:true
        }, // add options
        {}, // del options
    );
}