function init_eventos(){

    $('#lupa_d_patente').hide();
    $('#lupa_d_patente_vieja').hide();

    $("#btn_buscar").click(function(){
        if(!$("#d_patente").val()){
            mostrar_cuadro('E','Error','Debe ingresar patente actual');
            $("#main_grid").jqGrid('clearGridData');
        }
        else{
            $("#d_patente").prop('disabled', true);
            $("#d_patente_vieja").prop('disabled', true);
            $("#btn_buscar").prop('disabled', true);
            $('#lupa_d_patente').hide();
            $('#lupa_d_patente_vieja').hide();
            filtros_no_nativos = [];
            filtros_arr_main = [];
            if($("#d_patente").val() != ''){
                filtros_arr_main.push('Dominio: '+ $("#d_patente").val());
            }
            if($("#d_patente_vieja").val() != ''){
                filtros_arr_main.push('Dominio Anterior: '+ $("#d_patente_vieja").val());
            }
            filtros_no_nativos_ar['main_grid'] = filtros_arr_main;
            setea_parametros("#main_grid",{':p_d_patente':$("#d_patente").val(), ':p_d_patente_ant':$("#d_patente_vieja").val()})
            llenar_dominio_anterior();
        }
    });

    $("#btn_limpiar").click(function(){
        $("#d_patente").val("");
        $("#d_patente_vieja").val("");
        $("#d_patente").prop('disabled', false);
        $("#d_patente_vieja").prop('disabled', false);
        $("#btn_buscar").prop('disabled', false);
        $('#mascara_lupa_d_patente').show().css('display', 'table-cell');
        $('#mascara_lupa_d_patente_vieja').show().css('display', 'table-cell');
        $('#lupa_d_patente').hide();
        $('#lupa_d_patente_vieja').hide();

        $("#main_grid").jqGrid('clearGridData');
        setea_parametros("#main_grid",{':p_d_patente':null, ':p_d_patente_ant':null});
    })

    $('#d_patente').keyup(function () {
		if ($('#d_patente').val().length >= 3){
			$('#lupa_d_patente').show().css('display', 'table-cell');
			$('#mascara_lupa_d_patente').hide();
		} else {
			$('#lupa_d_patente').hide();
			$('#mascara_lupa_d_patente').show().css('display', 'table-cell');
		}
	});

    $('#d_patente_vieja').keyup(function () {
		if ($('#d_patente_vieja').val().length >= 3){
			$('#lupa_d_patente_vieja').show().css('display', 'table-cell');
			$('#mascara_lupa_d_patente_vieja').hide();
		} else {
			$('#lupa_d_patente_vieja').hide();
			$('#mascara_lupa_d_patente_vieja').show().css('display', 'table-cell');
		}
	});

    $("#lupa_d_patente").lupa_generica({
        id_lista: v_lista_dominio,
        titulos:['Dominio','Dominio Anterior'],
        grid:[{index:'d_patente',width:300},
            {index:'d_patente_vieja',width:300}],
        caption:'Lista de Dominios',
        sortname:'d_patente',
        sortorder:'asc',
        campos:{d_patente:'d_patente',d_patente_vieja:'d_patente_vieja'},
        filtros:['#d_patente'],
        filtrosTitulos:['Dominio'],
        filtrosNulos:[false],
        keyNav:true,
    });

    $("#lupa_d_patente_vieja").lupa_generica({
        id_lista: v_lista_dominio_viejo,
        titulos:['Dominio','Dominio Anterior'],
        grid:[{index:'d_patente',width:200},
            {index:'d_patente_vieja',width:200}],
        caption:'Lista de Dominios Anteriores',
        sortname:'d_patente',
        sortorder:'asc',
        campos:{d_patente:'d_patente',d_patente_vieja:'d_patente_vieja'},
        filtros:['#d_patente_vieja'],
        filtrosTitulos:['Dominio Anterior'],
        filtrosNulos:[false],
        keyNav:true,
    });
}
