function inicializarLupas(){

    $("#lupa_c_tipo_imponible").lupa_generica({
        id_lista:v_lista_tipo_imponible,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:465}],
        caption:'Tipo Imponible',
        sortname:'d_descrip',
        sortorder:'asc',
        campos:{c_codigo:'c_tipo_imponible',d_descrip:'d_tipo_imponible'},
        searchCode:true,
        searchInput: '#c_tipo_imponible',
        keyNav:true,
        onClose: function(){
            if(!$('#d_tipo_imponible').val()){
                $('#c_tipo_imponible').val('');
            }
        }
    });

    $("#main_grid_planes_de_pago").jqGrid({
        colNames:datos_main_grid_planes_de_pago.colNames(),
        colModel:datos_main_grid_planes_de_pago.colModel(),
        pager: $('#main_grid_planes_de_pago_pager'),
        caption:"Planes de Pago por Objeto/Hecho" ,
        postData:datos_main_grid_planes_de_pago.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: false,
        height:250,
        sortname:'n_plan_pago',
        sortorder:'asc',
        loadComplete:function(){
            asignar_ids_btn_pfp();
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
        }
    }).navGrid('#main_grid_planes_de_pago_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    )
}