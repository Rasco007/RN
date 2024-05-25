function inicializarGrillas(){
        
    $("#main_grid").jqGrid({
        colNames:datos_main_grid.colNames(),
        colModel:datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption:"Detalle Personal de Fiscalización:" ,
        postData:datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortorder:'asc',
        shrinkToFit: true,
        autowidth: false,
        height:230,
        
        onSelectRow: function(id) {
        }
    }).navGrid('#main_grid_pager',
        {add:true, edit:true, del:false}, //options
        {top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
                inicializa_lupas_main_grid(formid);
                inicializarEventosGrilla(formid,'EDIT');
                $('#tr_c_usuario_base').hide();
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
               
            }),
            closeAfterEdit: true},//edit,
        {top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
                inicializa_lupas_main_grid(formid);
                inicializarEventosGrilla(formid, 'ALTA');
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                
            }),
            closeAfterAdd: true,
            beforeSubmit: function(postdata, formid) {
                var valido = $(formid).validationEngine('validate');
                if(valido){
                    if($('#d_denominacion_filtro').val() == ''){
                        $('#d_denominacion_filtro').val($('#d_denominacion').val());

                    }
                    if($('#c_tipo_personal_filtro').val() == ''){
                        $('#c_tipo_personal_filtro').val($('#c_tipo_personal').val());

                    }
                    if($('#c_sector_fisca_filtro').val() == ''){
                        $('#c_sector_fisca_filtro').val($('#c_sector_fisca').val());

                    }
                    
                    if($('#d_usuario_filtro').val() == ''){
                        $('#d_usuario_filtro').val( $('#c_usuario_base').val());

                    }

                    setea_parametros('#main_grid',{':p_d_denominacion':$('#d_denominacion_filtro').val(),
                    ':p_c_tipo_personal':$('#c_tipo_personal_filtro').val(),
                    ':p_c_sector_fisca':$('#c_sector_fisca_filtro').val(),
                    ':p_f_baja':null,
                    ':p_c_usuario_base':$('#d_usuario_filtro').val() });
                }
                return[valido,'Controle los datos ingresados.'];
            },
            afterComplete:function() {
                
                mostrar_cuadro('I', 'Informaci&oacute;n', 'Se ha dado de alta Correctamente');
               
            }
        },//alta
        {top:500,
            left: 0,
            width: 700,
            onInitializeForm: defaultInitForm(function(formid){
               
            }),
            beforeShowForm: defaultBeforeShowForm(function(formid){
                
            }),
            closeAfterDelete: true},//del
        {}//search
    ).navButtonAdd('#main_grid_pager',
    {
        title:"Baja",
        caption:"BAJA",
        position:"first",
        id: "btn_baja",
        buttonicon: "glyphicon",
        cursor:"pointer",
        onClickButton:function() {
            if(!$("#main_grid").getGridParam('selrow')){
                mostrar_error('Debe seleccionar una fila de la Tabla.');
                return false;
            }else{
                $('#p_oper').val('del');
                var id = $("#main_grid").getGridParam('selrow');

                clear_modal_inputs();
                set_modal_inputs(id);
               
                $('#abm_modal').modal("show");
            }
        }
    });
}

function set_modal_inputs(id){
    $('#d_denominacion_modal').val($('#main_grid').getCell(id,'d_denominacion'));
    $('#f_baja_modal').val($('#main_grid').getCell(id,'f_baja'));
    $('#c_tipo_personal').val($('#main_grid').getCell(id,'c_tipo_personal'));
    $('#c_sector_fisca').val($('#main_grid').getCell(id,'c_sector_fisca'));
    $('#id_personal').val($('#main_grid').getCell(id,'id_personal'));
}

function clear_modal_inputs(){
    $('#d_denominacion').val("");
    $('#f_baja_modal').val("");
    $('#c_tipo_personal').val("");
    $('#c_sector_fisca').val("");
    $('#id_personal').val("");
}

function inicializa_lupas_main_grid(formid){

    $("#c_sector_fisca_lupa",formid).lupa_generica({
        id_lista:v_lista_sectores_fisca,
        titulos:['Codigo','Descripcion'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:460}],
        caption:'LISTADO DE SECTORES DE FISCALIZACION',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_sector_fisca',d_descrip: 'd_sector_fisca'},
        keyNav:true,
        searchInput: '#tr_c_sector_fisca #c_sector_fisca',
        searchCode: true
        
    });
    
    $("#c_tipo_personal_lupa",formid).lupa_generica({
        id_lista:v_lista_tipos_personal,
        titulos:['Codigo','Descripcion'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:460}],
        caption:'LISTADO DE TIPOS DE PERSONAL',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tipo_personal',d_descrip: 'd_tipo_personal'},
        keyNav:true,
        searchInput: '#tr_c_tipo_personal #c_tipo_personal',
        searchCode: true,
        exactField: 'c_codigo'
        
    });

    

    $("#d_denominacion_lupa",formid).lupa_generica({
        id_lista:v_lista_usuarios_internos,
        titulos:['Usuario','Nombre'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:460}],
        caption:'LISTADO DE USUARIOS INTERNOS',
        sortname:'c_codigo',
        sortorder:'asc',
        filtros:['#d_denominacion'],
        filtrosNulos:[true],
        campos:{c_codigo:'c_usuario_base',d_descrip: 'd_denominacion'},
        keyNav:true,
        searchInput: '#d_denominacion_filtro',
        searchCode: true
        
    });

   
}

