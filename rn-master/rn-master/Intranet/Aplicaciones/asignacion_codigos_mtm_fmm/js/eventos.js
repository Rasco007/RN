function init_eventos(){
    $("#asignados").click(function(){
        $("#gridWrapper").hide();
        $("#gridWrapperAsignados").show();
        $("#gridWrapperNoAsignados").hide();
        $(window).resize();
        $('#rnpa').val('');
        $('#siat').val('');
    });

    $("#no_asignados").click(function(){
        $("#gridWrapper").hide();
        $("#gridWrapperAsignados").hide();
        $("#gridWrapperNoAsignados").show();
        $(window).resize();
        $('#rnpa').val('');
        $('#siat').val('');
    });

    $("#ver_todos").click(function(){
        $("#gridWrapper").show();
        $("#gridWrapperAsignados").hide();
        $("#gridWrapperNoAsignados").hide();
        $(window).resize();
        $('#rnpa').val('');
        $('#siat').val('');
    });

    $("#btn_limpiar").click(function(){
        setea_parametros('#asignados_grid',{':p_marca':null});
        $("#ver_todos").click();
        $('#c_marca').val('');
        $('#d_marca').val('');
        $('#rnpa').val('');
        $('#siat').val('');
    });

    $("#btn_consultar").click(function(){
        if($('#c_marca').val() == ''){
            mostrar_cuadro('I', 'Información', "Debe completar el campo marca");
            return;
        }
        setea_parametros('#asignados_grid',{':p_marca':$('#c_marca').val()});
        setea_parametros('#main_grid',{':p_marca':$('#c_marca').val()});
        setea_parametros('#no_asignados_grid',{':p_marca':$('#c_marca').val()});
        $("#asignados").click();
    });

    $("#lupa_marca").lupa_generica({
        id_lista:v_lista_marcas,
        titulos:['Codigo Marca','Descripción Marca'],
        grid:[{index:'c_marca',width:100},
            {index:'d_marca',width:465}],
        caption:'LISTADO DE MARCAS',
        sortname:'c_marca',
        sortorder:'asc',
        widthGrid:150,
        campos:{c_marca:'c_marca',d_marca: 'd_marca'},
        keyNav:true,
        searchInput: '#c_marca',
        searchCode: true,
        exactField: 'c_marca'
    });
}

