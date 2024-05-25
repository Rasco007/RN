
function inicializa_eventos(){

    $("#anio_filtro").mask("9999");
    $("#mes_filtro").mask("99");

    if(p_modo == 'C'){
        $('#edit_main_grid').hide();
        $('#add_main_grid').hide();
        $('#del_main_grid').hide();
       }
    
    
    $(".datepicker").datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    });
   

    $('#btn_limpiar').click(function(){
        
        $('#c_marca_filtro').val(null);
        $('#d_marca_filtro').val(null);
        
        $('#c_modelo_filtro').val(null);
        $('#d_modelo_filtro').val(null);
        $('#c_descrip_filtro').val(null);
        $('#d_descrip_filtro').val(null);
        $('#anio_filtro').val(null);
        $('#mes_filtro').val(null);
        $('#c_grupo_filtro').val(null);
        $('#d_grupo_filtro').val(null);
        

        $('#c_marca_filtro').attr('disabled', false);
        $('#c_modelo_filtro').attr('disabled', false);
        $('#c_descrip_filtro').attr('disabled', false);
        $('#anio_filtro').attr('disabled', false);
        $('#mes_filtro').attr('disabled', false);
        $('#c_grupo_filtro').attr('disabled', false);
        $('#d_grupo_filtro').attr('disabled', false);
            
        //$('#gridWrapper').hide();

        $('#main_grid').clearGridData();

        /*setea_parametros('#main_grid',{
            ':p_c_marca_aut':null,
            ':p_id_modelo':null,
            ':p_id_descripcion':null,
            ':p_c_grupo':null,
            ':p_n_año_fiscal':null,
            ':p_n_mes_fiscal':null});*/
        

    });
    $("#btn_buscar").click(function(){

        if($('#c_marca_filtro').val() == '' &&
        $('#c_modelo_filtro').val() == ''&&
        $('#c_descrip_filtro').val() == '' &&
        $('#anio_filtro').val() == '' &&
        $('#mes_filtro').val() == '' &&
        $('#grupo_filtro').val() == ''){
            mostrar_cuadro('E', 'Error', 'Debe ingresar al menos un filtro');
    
        }else if( $('#anio_filtro').val() == '' &&
        $('#mes_filtro').val() != ''){
            mostrar_cuadro('E', 'Error', 'Debe ingresar el Año también');

        }else{

            $('#c_marca_filtro').attr('disabled', true);
            $('#c_modelo_filtro').attr('disabled', true);
            $('#c_descrip_filtro').attr('disabled', true);
            $('#anio_filtro').attr('disabled', true);
            $('#mes_filtro').attr('disabled', true);
            $('#c_grupo_filtro').attr('disabled', true);
            $('#d_grupo_filtro').attr('disabled', true);
            
            

             setea_parametros('#main_grid',{
        ':p_c_marca_aut':$('#c_marca_filtro').val(),
        ':p_id_modelo':$('#c_modelo_filtro').val(),
        ':p_id_descripcion':$('#c_descrip_filtro').val(),
        ':p_c_grupo':$('#c_grupo_filtro').val(),
        ':p_n_año_fiscal':$('#anio_filtro').val(),
        ':p_n_mes_fiscal':$('#mes_filtro').val()});


        }
        
       
    });



    
     
}


function inicializa_lupas(){

    

    $("#lupa_c_marca").lupa_generica({
        id_lista:v_lista_marcas,
        titulos:['Codigo Marca','Descripción Marca', 'Nro Tabla'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:465},
            {index:'n_tabla',width:465, hidden:true}],
        caption:'LISTADO DE MARCAS',
        sortname:'d_dato',
        sortorder:'asc',
        widthGrid:150,
        campos:{c_dato:'c_marca_filtro',d_dato: 'd_marca_filtro'},
        keyNav:true,
        searchInput: '#c_marca_filtro',
        searchCode: true,
        exactField: 'c_dato'
    });


    $("#lupa_c_modelo").lupa_generica({
        id_lista:v_lista_modelos,
        titulos:['Codigo Modelo','Descripción Modelo'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:465}],
        caption:'LISTADO DE MODELOS',
        sortname:'d_dato',
        sortorder:'desc',
        widthGrid:150,
        campos:{c_dato:'c_modelo_filtro',d_dato: 'd_modelo_filtro'},
        keyNav:true,
        searchInput: '#c_modelo_filtro',
        searchCode: true,
        filtros:["#c_marca_filtro"],
        filtrosTitulos:['Marca'],
        filtrosNulos:[false],
        exactField: 'c_dato'
    });

    $("#lupa_c_descrip").lupa_generica({
        id_lista:v_lista_descripciones,
        titulos:['Codigo Descrip','Descripción', 'Tipo'],
        grid:[{index:'id_descripcion',width:100},
            {index:'d_descrip',width:465},
            {index:'c_tipo',width:465, hidden:true}],
        caption:'LISTADO DE DESCRIPCIONES',
        sortname:'d_descrip',
        sortorder:'desc',
        widthGrid:150,
        campos:{id_descripcion:'c_descrip_filtro',d_descrip: 'd_descrip_filtro'},
        keyNav:true,
        searchInput: '#c_descrip_filtro',
        searchCode: true,
        filtros:["#c_marca_filtro","#c_modelo_filtro"],
        filtrosTitulos:['Marca', 'Modelo'],
        filtrosNulos:[false, false],
        exactField: 'id_descripcion'
    });


    $("#lupa_grupo_filtro").lupa_generica({
        id_lista:v_lista_grupos,
        titulos:['Codigo Grupo','Descripción Grupo'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:465}],
        caption:'LISTADO DE GRUPOS',
        sortname:'d_dato',
        sortorder:'asc',
        widthGrid:150,
        campos:{c_dato:'c_grupo_filtro',d_dato: 'd_grupo_filtro'},
        keyNav:true,
        searchInput: '#c_grupo_filtro',
        searchCode: true,
        exactField: 'c_dato'
    });

}



