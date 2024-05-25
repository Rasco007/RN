function init_eventos(){
    $('#lupa_d_denominacion').hide();
    $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');

    $("#total_seleccionado").val('0.00');
    $.ajax({                     
        url: "generador_pago_anual_multi/php/funciones.php",                     
        type:"POST",                     
        dataType: "JSON",                     
        data:{"p_oper": "getAnio"},                     
        success: function (res) {       
            $("#year").val(res.ANIO);  
            $("#cuota").val(0);                 
        }                 
    });

    $("#btn_limpiar").click(function(){
        $("#n_cuit").attr('disabled',false);
        $("#c_tributo").attr('readonly',false);
        $("#year").attr('disabled',false);
        $("#cuota").attr('disabled',false);
        $("#d_denominacion").attr('readonly',false);
        $("#lupa_c_tributo").show();
        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        $("#lupa_d_denominacion").hide();
        $("#f_vto1").val(""); 
        $("#f_vto1").text("");    
        $("#f_vto2").val("");   
        $("#f_vto2").text("");

        //DATOS PERSONALES
        $("#n_cuit").val(null);
        $("#d_denominacion").val(null);
        $("#id_contribuyente").val(null);
        $("#c_tipo_imponible").val(null);
        $("#c_tributo").val(null);
        $("#d_tributo").val(null);
        $.ajax({                     
            url: "generador_pago_anual_multi/php/funciones.php",                     
            type:"POST",                     
            dataType: "JSON",                     
            data:{"p_oper": "getAnio"},                     
            success: function (res) {       
                $("#year").val(res.ANIO);  
                $("#cuota").val(0);                 
            }                 
        });
        id_sesion = null;
        setea_parametros('#det_pago_anual_grid', {
            ':p_sesion': id_sesion,
        }, 'S');
        $('#det_pago_anual_grid').trigger('reloadGrid');
        seleccionados = [];
        total_seleccionado = '0.00';
        $("#total_seleccionado").val(total_seleccionado);
        actualizar_error(null);
    })

    $("#btn_buscar").click(function(){
        if(!$("#n_cuit").val() || !$("#c_tributo").val() || !$("#year").val() || !$("#cuota").val()){
            mostrar_cuadro('E', 'Error', 'Debe completar todos los campos');
            return;
        }
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_cuit":$("#n_cuit").val().replace(/-/g, ''),
             "p_tributo":$("#c_tributo").val(),
             "p_anio":$("#year").val(),
             "id_menu":v_id_menu,
             "n_orden":0
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    $("#n_cuit").attr('disabled',true);
                    $("#d_denominacion").attr('readonly',true);
                    $("#c_tributo").attr('readonly',true);
                    $("#year").attr('disabled',true);
                    $("#cuota").attr('disabled',true);
                    $("#lupa_c_tributo").hide();
                    $('#lupa_d_denominacion').hide();

                    filtros_arr_main = [];
                    if($('#n_cuit').val() != ''){
                        filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());
                    }
                    if($('#d_denominacion').val() != ''){
                        filtros_arr_main.push('Denominación: '+ $('#d_denominacion').val());
                    }
                    if($('#c_tributo').val() != ''){
                        filtros_arr_main.push('Código Tributo: '+ $('#c_tributo').val());
                    }
                    if($('#c_concepto').val() != ''){
                        filtros_arr_main.push('Código Concepto: '+ $('#c_concepto').val());
                    }
                    if($('#year').val() != ''){
                        filtros_arr_main.push('Año: '+ $('#year').val());
                    }
                    if($('#cuota').val() != ''){
                        filtros_arr_main.push('Cuota: '+ $('#cuota').val());
                    }
                    filtros_no_nativos_ar['det_pago_anual_grid'] = filtros_arr_main;

                    setea_parametros('#det_pago_anual_grid', {
                        ':p_sesion': data.p_sesion,
                    }, 'S');
                    id_sesion = data.p_sesion
                    $('#det_pago_anual_grid').trigger('reloadGrid');
                    seleccionados = [];
                    total_seleccionado = '0.00';
                    $("#total_seleccionado").val(total_seleccionado);
                    get_fecha_vencimiento($("#c_tributo").val(), $("#year").val());
                    

                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado, function(){$('#btn_limpiar').click();});
                    return;
                }
            }
        }); 
    })

    $("#btn_imprimir").click(function(){

        if (seleccionados.length <= 0){             
            mostrar_cuadro('I', 'Advertencia', 'Debe seleccionar al menos un PAGO ANUAL!');
            return;       
        }else{            
            guardar_seleccion(false);  
        }
     });

     $("#btn_imp_pagar").click(function(){
        if (seleccionados.length <= 0){             
            mostrar_cuadro('I', 'Advertencia', 'Debe seleccionar al menos un PAGO ANUAL!');
            return;        
        }else{            
            guardar_seleccion(true);  
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
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
    });

    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() != ''){
            try{
                if( limpia_cuit($('#n_cuit').val()).length == 11 ){
                    $.ajax({
                        url: 'ajax_genericos/autocomplete.php',
                        type:"POST",
                        data:{
                            "term":limpia_cuit($("#n_cuit").val()),
                            "oper":3
                        },
                        async:true,
                        success: function(data){
                            ret = eval('('+data+')');
                            if(ret != null){
                                $("#d_denominacion").val(ret.data_raz[0].razon_social);
                                $("#id_contribuyente").val(ret.data_raz[0].id_contribuyente);
                            }else{
                                $("#d_denominacion").val(null);
                                $("#id_contribuyente").val(null);
                            }
                        }
                    });
        
                }else{
                    $('#btn_limpiar').click();
                }
            }catch(err){
            }
        }
    });

    $("#lupa_d_denominacion").lupa_generica({
		id_lista:vg_lista_denominaciones,
		titulos:['ID contribuyente', 'CUIT', 'Denominación','Código de Documento', 'Tipo de Documento', 'Numero de Documento', 'F. Alta'],
		grid:[{index:'id_contribuyente',width:100, hidden:true}, {index:'n_cuit',width:100}, {index:'d_denominacion',width:200},{index:'c_tipo_documento',width:140, hidden:true}, {index:'d_tipo_documento',width:140}, {index:'n_documento',width:160}, {index:'f_alta',width:80}],
		caption:'Lista de Denominaciones',
		sortname:'d_denominacion',
		sortorder:'asc',
		filtros:['#d_denominacion'],
		filtrosTitulos:['Denominación'],
		filtrosNulos:[false],
		campos:{id_contribuyente:'id_contribuyente', n_cuit: 'n_cuit', d_denominacion:'d_denominacion', d_tipo_documento:'d_tipo_documento', n_documento: 'n_documento', f_alta:'f_alta'},
		keyNav:true,
		draggable:true,
	});

    $('#d_denominacion').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 4) {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell'); 
        }
    });
}