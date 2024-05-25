function inicializarGrillas(){


    $("#main_grid").jqGrid({
        colNames:datos_main_grid.colNames(),
        colModel:datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
       // caption:"Novedades" ,
        postData:datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
       // sortname:'f_novedad',
       // sortorder:'desc',
        shrinkToFit: true,
        autowidth: false,
        height:140,
        onSelectRow: function(id) {
           // id_evento = $('#main_grid').getCell(id, 'id_evento');
           // id_inspeccion = $('#main_grid').getCell(id, 'id_inspeccion');
            //n_movimiento = $('#main_grid').getCell(id, 'n_movimiento');

            //setea_parametros('#detalles_grid', {':p_id_evento': id_evento, ':p_id_inspeccion': id_inspeccion});

        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {
            onInitializeForm: defaultInitForm(function(formid){
                inicializarEventosGrillaEdit();
    
                inicializarLupasGrilla(formid);
                
    
            })
        },//edit,
        {
            
        onInitializeForm: defaultInitForm(function(formid){
            inicializarEventosGrillaEdit();

            inicializarLupasGrilla(formid);
            

        }),
        
        beforeShowForm: defaultBeforeShowForm(function(formid){
            if($('#c_marca_filtro').val() != ''){
                $('#c_marca_aut').val($('#c_marca_filtro').val());
                $('#d_marca').val($('#d_marca_filtro').val());
                $('#c_marca_aut').attr('readonly',true);
                $('#d_marca').attr('disabled',true);

                $('#c_marca_aut').attr('readonly',true);
                $('#d_marca').attr('disabled',true);

                
                $('#c_marca_aut_lupa').hide();

            }
            if($('#c_modelo_filtro').val() != '' ){
                $('#id_modelo').val($('#c_modelo_filtro').val());
                $('#d_modelo').val($('#d_modelo_filtro').val());
                $('#id_modelo').attr('readonly',true);
                $('#id_modelo').attr('disabled',true);
                
                $('#id_modelo_lupa').hide();

                $('#d_modelo').attr('readonly',true);
                $('#d_modelo').attr('disabled',true);
            }
            if( $('#c_descrip_filtro').val() != ''){
                $('#id_descripcion').val($('#c_descrip_filtro').val());
                $('#id_descripcion').attr('readonly',true);
                $('#id_descripcion').attr('disabled',true);
                $('#d_descrip').val($('#d_descrip_filtro').val());

                $('#d_descrip').attr('readonly',true);
                $('#d_descrip').attr('disabled',true);
                $('#id_descripcion_lupa').hide();
            }
            if( $('#c_grupo_filtro').val() != ''){
                $('#c_grupo').val($('#c_grupo_filtro').val());
                $('#c_grupo').attr('readonly',true);
                $('#c_grupo').attr('disabled',true);
                $('#c_grupo_lupa').hide();
                
            }
            if( $('#anio_filtro').val() != ''){
                $('#anio').val($('#anio_filtro').val());

            }
            if($('#mes_filtro').val() != ''){
                $('#mes').val($('#mes_filtro').val());

            }
        }),
        closeAfterAdd: true,
        beforeSubmit: function(postdata, formid) {
            var valido = $(formid).validationEngine('validate');


             setea_parametros('#main_grid',{
                 ':p_c_marca_aut':$('#c_marca_aut').val(),
                 ':p_id_modelo':$('#id_modelo').val(),
                 ':p_id_descripcion':$('#id_descripcion').val(),
                 ':p_c_grupo':$('#c_grupo').val(),
                 ':p_n_año_fiscal':$('#n_año_fiscal').val(),
                ':p_n_mes_fiscal':$('#n_mes_fiscal').val()});

            return[valido,'Controle los datos ingresados.'];
        },
        afterComplete:function() {
            
            mostrar_cuadro('I', 'Informaci&oacute;n', 'Se ha dado de alta Correctamente');
           
        }

        },//alta
        {
            afterComplete:function() {
                
                mostrar_cuadro('I', 'Informaci&oacute;n', 'Se ha eliminado Correctamente');
                
            }},//del
        {}//search
    );






function inicializarLupasGrilla(formid){
   

    $("#c_marca_aut_lupa", formid).lupa_generica({
        id_lista:v_lista_marcas,
        titulos:['Codigo Marca','Descripción Marca', 'Nro Tabla'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:465},
            {index:'n_tabla',width:465, hidden:true}],
        caption:'LISTADO DE MARCAS',
        sortname:'d_dato',
        sortorder:'asc',
        widthGrid:150,
        campos:{c_dato:'c_marca_aut',d_dato: 'd_marca'},
        keyNav:true,
        searchInput: '#c_marca_aut',
        searchCode: true,
        exactField: 'c_dato'
    });


    $("#id_modelo_lupa", formid).lupa_generica({
        id_lista:v_lista_modelos,
        titulos:['Codigo Modelo','Descripción Modelo'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:465}],
        caption:'LISTADO DE MODELOS',
        sortname:'d_dato',
        sortorder:'desc',
        widthGrid:150,
        campos:{c_dato:'id_modelo',d_dato: 'd_modelo'},
        keyNav:true,
        searchInput: '#id_modelo',
        searchCode: true,
        filtros:["#c_marca_aut"],
        filtrosTitulos:['Marca'],
        filtrosNulos:[false],
        exactField: 'c_dato'
    });

    $("#id_descripcion_lupa", formid).lupa_generica({
        id_lista:v_lista_descripciones,
        titulos:['Codigo Descrip','Descripción', 'Tipo'],
        grid:[{index:'id_descripcion',width:100},
            {index:'d_descrip',width:465},
            {index:'c_tipo',width:465, hidden:true}],
        caption:'LISTADO DE DESCRIPCIONES',
        sortname:'d_descrip',
        sortorder:'desc',
        widthGrid:150,
        campos:{id_descripcion:'id_descripcion',d_descrip: 'd_descrip'},
        keyNav:true,
        searchInput: '#id_descripcion',
        searchCode: true,
        filtros:["#c_marca_aut","#id_modelo"],
        filtrosTitulos:['Marca', 'Modelo'],
        filtrosNulos:[false, false],
        exactField: 'id_descripcion'
    });


    $("#c_grupo_lupa", formid).lupa_generica({
        id_lista:v_lista_grupos,
        titulos:['Codigo Grupo','Descripción Grupo'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:465}],
        caption:'LISTADO DE GRUPOS',
        sortname:'d_dato',
        sortorder:'asc',
        widthGrid:150,
        campos:{c_dato:'c_grupo',d_dato: 'd_grupo'},
        keyNav:true,
        searchInput: '#c_grupo',
        searchCode: true,
        exactField: 'c_dato',
        onclose(){
            if ($('#c_grupo').val() != '' && 
        $('#n_año_fiscal').val() != '' && 
        $('#n_mes_fiscal').val() != '' ){
            try{
                    $.ajax({
                        type:'POST',
                        url: "valuaciones/php/autocomplete.php",
                        data: {oper:'2',term: $('#n_año_fiscal').val(),
                        term1: $('#n_mes_fiscal').val(),
                        term2: $('#c_grupo').val()},
                        dataType: 'json',
                        success: function( data ) {
                            ajax_autocomplete = null;
                            if(data) {
                               
                                $("#n_alicuota").val(data.N_ALICUOTA.replace(/./g, ','));                            
                                
                                                   
                              }  else{
                                mostrar_cuadro('I', 'Advertencia', 'No existe Nro. de Alicuota para este año y grupo.');
                            }        
                        }
                    });
                
            }catch(err){
            }
        }
        }
    });


    $("#c_moneda_lupa").lupa_generica({
        id_lista:v_lista_moneda,
        titulos:['Codigo Moneda','Descripción Moneda'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:465}],
        caption:'LISTADO DE MONEDAS',
        sortname:'c_codigo',
        sortorder:'asc',
        widthGrid:150,
        campos:{c_codigo:'c_moneda',d_descrip: 'd_moneda'},
        keyNav:true,
        searchInput: '#c_moneda',
        searchCode: true,
        exactField: 'c_codigo'
    });

    $("#c_origen_lupa").lupa_generica({
        id_lista:v_lista_origen,
        titulos:['Codigo Origen','Descripción Origen'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:465}],
        caption:'LISTADO DE ORIGENES',
        sortname:'c_dato',
        sortorder:'asc',
        widthGrid:150,
        campos:{c_dato:'c_origen',d_dato: 'd_origen'},
        keyNav:true,
        searchInput: '#c_origen',
        searchCode: true,
        exactField: 'c_dato'
    });

    
}


}

function inicializarEventosGrillaEdit(){
    if($('#n_alicuota').val() != ''){
        Number($("#n_alicuota").val()).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    }

    $('#n_año_fiscal').attr('disabled', true);
    $('#n_mes_fiscal').attr('disabled', true);
    $('#n_modelo_anio').attr('disabled', true);
    $('#id_modelo').attr('disabled', true);
    $('#c_grupo').attr('disabled', true);
    $('#c_origen').attr('disabled', true);
    $('#c_marca_aut').attr('disabled', true);
    $('#m_nacional_importado').attr('disabled', true);
    $('#id_descripcion').attr('disabled', true);
    

    $('#n_año_fiscal').attr('readonly', true);
    $('#n_mes_fiscal').attr('readonly', true);
    $('#n_modelo_anio').attr('readonly', true);
    $('#id_modelo').attr('readonly', true);
    $('#c_grupo').attr('readonly', true);
    $('#c_origen').attr('readonly', true);
    $('#c_marca_aut').attr('readonly', true);
    $('#m_nacional_importado').attr('readonly', true);
    $('#id_descripcion').attr('readonly', true);
    

    $('#c_marca_aut_lupa').hide();
    $('#id_modelo_lupa').hide();
    $('#id_descripcion_lupa').hide();
    $('#c_grupo_lupa').hide();


}

function inicializarEventosGrilla(){

    $("#n_año_fiscal").mask("9999");
    $("#n_mes_fiscal").mask("99");
    $("#n_modelo_año").mask("9999");
    
    


    $('#c_grupo').focusout(function(){
        if ($('#c_grupo').val() != '' && 
        $('#n_año_fiscal').val() != '' && 
        $('#n_mes_fiscal').val() != '' ){
            try{
                    $.ajax({
                        type:'POST',
                        url: "valuaciones/php/autocomplete.php",
                        data: {oper:'2',term: $('#n_año_fiscal').val(),
                        term1: $('#n_mes_fiscal').val(),
                        term2: $('#c_grupo').val()},
                        dataType: 'json',
                        success: function( data ) {
                            ajax_autocomplete = null;
                            if(data) {
                              
                                $("#n_alicuota").val( data.N_ALICUOTA);                            
                                $("#n_alicuota_oculto").val( data.N_ALICUOTA);                            
                                $("#n_alicuota_oculto").val($("#n_alicuota_oculto").val().replace(/\./g, '').replace(',', '.')); 
                                                   
                            }else{
                                mostrar_cuadro('I', 'Advertencia', 'No existe Nro. de Alicuota para este año y grupo.');
                            }       
                        }
                    });
                
            }catch(err){
            }
        }
    });



    $('#n_valuacion').focusout(function(){
        if ($('#n_valuacion').val() != '' && 
        $('#n_alicuota').val() != '' ){
            try{
                    $.ajax({
                        type:'POST',
                        url: "valuaciones/php/autocomplete.php",
                        data: {oper:'3',term: $('#n_valuacion').val(),
                        term1:  $('#n_alicuota').val().replace(/\./g, '').replace(',', '.')},
                        dataType: 'json',
                        success: function( data ) {
                            ajax_autocomplete = null;
                            if(data) {
                               
                                $("#importe_total").val(data.IMPORTE_TOTAL);                            
                                
                                                   
                              }       
                        }
                    });
                
            }catch(err){
            }
        }
    });

}