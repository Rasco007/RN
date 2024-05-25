function inicializa_lupas(){
    var v_c_org_filtro = 'DPA';

    $("#btn_lupa_tipo").lupa_generica({
        id_lista:v_lista_tipos_consorcios,
        titulos:['Código','Descripcion'],
        grid:[  {index:'c_tipo',width:100},
            {index:'d_dato',width:450}],
        caption:'Tipos de Consorcio',
        sortname:'d_dato',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_tipo',
        exactField: 'c_tipo',
        searchOnInitialize: true,
        campos:{c_tipo:'c_tipo',d_dato:'d_tipo'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose:function(){
            $("#c_organismo, #d_organismo, #c_region, #d_region, #c_area, #d_area").val("");
        }
    });

    $("#btn_lupa_organismo").lupa_generica({
        id_lista:v_lista_consorcios,
        titulos:['Código','Descripcion'],
        grid:[  {index:'c_organismo',width:100},
            {index:'d_dato',width:450}],
        caption:'Consorcios',
        sortname:'c_organismo',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_organismo',
        exactField: 'c_organismo',
        searchOnInitialize: true,
        filtros:["#c_tipo"],
        filtrosTitulos:['Tipo de Consorcio'],
        filtroNull:true,
        campos:{c_organismo:'c_organismo',d_dato:'d_organismo'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose:function(){
            $("#c_region, #d_region, #c_area, #d_area").val("");
            v_c_org_filtro = $("#c_organismo").val();
        }
    });

    $("#btn_lupa_region").lupa_generica({
        id_lista:v_lista_regiones_consorcio,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_region',width:100},
            {index:'d_dato',width:450}],
        caption:'Regiones',
        sortname:'c_region',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#frm_consulta #c_region',
        exactField: 'c_region',
        filtros:['#c_tipo','#c_organismo'],
        filtrosTitulos:['Tipo de Consorcio','Consorcio'],
        filtroNull:true,
        campos:{c_region:'c_region',d_dato:'d_region'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose:function(){
            $("#c_area,#d_area").val("");
        }
    });

    $("#btn_lupa_area").lupa_generica({
        id_lista:v_lista_areas_consorcio,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_area',width:100},
            {index:'d_dato',width:450}],
        caption:'Áreas',
        sortname:'c_area',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#frm_consulta #c_area',
        exactField: 'c_area',
        filtros:['#c_tipo','#c_organismo','#c_region'],
        filtrosTitulos:['Tipo de Consorcio','Consorcio','Región'],
        filtrosNulos:[true,true,false],
        campos:{c_area:'c_area',d_dato:'d_area'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label"
    });
}

function inicializa_lupas_main_grid(formid){
    $("#d_tipo",formid).lupa_generica({
        id_lista:v_lista_tipos_consorcios,
        titulos:['Código','Descripcion'],
        grid:[  {index:'c_tipo',width:100},
            {index:'d_dato',width:450}],
        caption:'Tipos de Consorcio',
        sortname:'d_dato',
        sortorder:'asc',
        exactField: 'c_tipo',
        campos:{c_tipo:'c_tipo',d_dato:'d_tipo'},
        keyNav:true,
        foco:"#d_label"
    });
}

function inicializa_lupas_second_grid(formid){
    var id = $("#main_grid").getGridParam('selrow');
    var v_c_tipo = $("#main_grid").getCell(id,'c_tipo');

    $("#d_region",formid).lupa_generica({
        id_lista:v_lista_regiones,
        titulos:['Código','Descripcion'],
        grid:[  {index:'c_region',width:100},
            {index:'d_dato',width:450}],
        caption:'Regiones',
        sortname:'d_dato',
        sortorder:'asc',
        exactField: 'c_region',
        /*filtros:[v_c_tipo],*/
        filtroNull: true,
        campos:{c_region:'c_region',d_dato:'d_region'},
        keyNav:true,
        foco:"#d_label",
        onClose: function(){
            $("#c_area, #d_area").val('');
        }
    });


    $("#d_area",formid).lupa_generica({
        id_lista:v_lista_areas,
        titulos:['Código','Descripcion'],
        grid:[  {index:'c_area',width:100},
            {index:'d_dato',width:450}],
        caption:'Áreas',
        sortname:'d_dato',
        sortorder:'asc',
        exactField: 'c_area',
        filtros:['#c_region','asd'],
        /*filtrosTitulos:['Región','Tipo de Consorcio'],*/
        campos:{c_area:'c_area',d_dato:'d_area'},
        keyNav:true,
        foco:"#d_label"
    });
}

function mayusculas(e) {
    e.value = e.value.toUpperCase();
}

function set_fechas_min_max(formid){
    $("#f_vig_desde",formid).datepicker("option","onClose", function (selectedDate,obj) {
        $("#f_vig_hasta",formid).datepicker("option", "minDate", selectedDate);
    });
    
    $("#f_vig_hasta",formid).datepicker("option", "minDate", $("#f_vig_desde",formid).val());

    $("#f_vig_hasta",formid).datepicker("option","onClose", function (selectedDate,obj) {
        $("#f_vig_desde",formid).datepicker("option", "maxDate", selectedDate);
    });

    $("#f_vig_desde",formid).datepicker("option", "maxDate", $("#f_vig_hasta",formid).val());
}

function valida_fechas(formid){
    var f_desde = $("#f_vig_desde",formid).val();
    var f_hasta = $("#f_vig_hasta",formid).val();

    if(f_desde != "" && f_hasta != ""){
        return f_desde <= f_hasta;
    }else{
        return true;
    }
}

function compara_desde_hasta(numero_desde,numero_hasta){
    return numero_desde <= numero_hasta;
}

function deshabilita_campos(v_o_f){
    $(".limpiar","#frm_consulta").attr('readonly',v_o_f);
    $(".datepicker, .btn_lupa","#frm_consulta").attr('disabled',v_o_f);
}