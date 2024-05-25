function init_eventos(){
    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    $("#n_cuit").mask("99-99999999-9");

    $("#btn_limpiar").click(function(){
        $('#n_cuit').val('');
        $('#d_denominacion').val('');
        $('#boleta_deuda').val('');
        $('#c_expediente').val('');
        $('#instancia').val('');
        $('#n_orden').val('');
        $('#c_instancia').val('');
        $('#d_instancia').val('');
        $('#c_sector_origen').val('');
        $('#d_sector_origen').val('');
        $('#f_origen').val('');
        $('#c_motivo_origen').val('');
        $('#d_motivo_origen').val('');

        $('#btn_consultar').attr('disabled',false);

        $('#f_vto').val('');
        $('#d_resolucion').val('');
        $('#f_resolucion').val('');
        $('#observaciones').val('');
        $('#f_confirmacion').val('');

        $('#c_documento').val('');
        $('#d_documento').val('');
        $('#documento').val('');

        $('#i_adeudado').val('');
        $('#i_interes').val('');
        $('#i_actualizado').val('');
        $('#f_anulacion').val('')

        $('#n_cuit').attr('disabled',false);
                    $('#d_denominacion').attr('disabled',false);
                    $('#c_documento').attr('disabled',false);
                    $('#documento').attr('disabled',false);
                    $('#instancia').attr('disabled',false);
                    $('#n_orden').attr('disabled',false);
                    $('#c_instancia').attr('disabled',false);
                    $('#c_sector_origen').attr('disabled',false);
                    $('#f_origen').attr('disabled',false);
                    $('#c_motivo_origen').attr('disabled',false);           
                    $('#f_vto').attr('disabled',false);
                    $('#d_resolucion').attr('disabled',false);
                    $('#f_resolucion').attr('disabled',false);
                    $('#observaciones').attr('disabled',false);
                    $('#f_confirmacion').attr('disabled',false);
                    $('#c_expediente').attr('disabled',false);
                    $('#boleta_deuda').attr('disabled',false);
                    $('#btn_revertir_juicio').attr('disabled',true);

                    $('#btn_pre_judicial').attr('disabled',true);
            $('#btn_anular_juicio').attr('disabled',true);

                    $('#main_grid').jqGrid('clearGridData');
                    $('#grid_instancias').jqGrid('clearGridData');
    });

    $("#btn_pre_judicial").click(function(){
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_f_confirmacion":f_confirmacion,
             "p_f_anulacion":$('#f_anulacion').val(),
             "p_id_boleta_deuda":$('#boleta_deuda').val(),
             "id_menu":v_id_menu,
             "n_orden":1
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == "Proceso finalizado OK."){
                    $('#main').procOverlay({visible:false});
                    mostrar_cuadro('S', 'Pre-Judicial Exitoso', data.resultado);
                    $('#btn_limpiar').click();
                    return;
                }
                else{
                    $('#main').procOverlay({visible:false});
                    mostrar_cuadro('E', 'Error', data.resultado.replace(/ORA-20000:/g,""));
                    return;
                }
            }
        }); 
    });

    $("#btn_anular_juicio").click(function(){
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_f_confirmacion":f_confirmacion,
             "p_f_anulacion":$('#f_anulacion').val(),
             "p_id_boleta_deuda":$('#boleta_deuda').val(),
             "id_menu":v_id_menu,
             "n_orden":2
            },
            dataType:'json',
            success: function( data ) {
                $('#main').procOverlay({visible:false});
                if(data.resultado == "El Juicio ha sido ANULADO satisfactoriamente."){
                    mostrar_cuadro('S', 'Anulación Exitosa', data.resultado);
                    $('#btn_limpiar').click();
                    $('#observaciones_anulacion').val(data.p_d_obs);
                    return;
                }
                else{
                    $('#main').procOverlay({visible:false});
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    });

    $("#btn_consultar").click(function(){
        if( $('#boleta_deuda').val() == '' && $('#c_expediente').val() == ''){
            mostrar_cuadro('E', 'Error', 'Debe ingresar Boleta de Deuda o Expediente');
            return;
        }

        filtros_arr_main = [];

        if($('#boleta_deuda').val() != ''){
            filtros_arr_main.push('Boleta deuda: '+ $('#boleta_deuda').val());
        }
        if($('#c_expediente').val() != ''){
            filtros_arr_main.push('Expediente: '+ $('#c_expediente').val());
        }

        filtros_no_nativos_ar['main_grid'] = filtros_arr_main;
        filtros_no_nativos_ar['grid_instancias'] = filtros_arr_main;
        

        $('#c_expediente').attr('disabled',true);
        $('#boleta_deuda').attr('disabled',true);
        $('#btn_consultar').attr('disabled',true);


        $('#f_anulacion').val(fecha_hoy)

        setea_parametros('#grid_instancias',{
                        ':p_c_expediente':$('#c_expediente').val(),
                        ':p_id_boleta_deuda': $('#boleta_deuda').val(),
        });
    });

    $('#lupa_c_instancia').lupa_generica({
        titulos:['Cod.Instancia','Instancia'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:300}],
        caption:'Lista de Instancias',
        sortname:'d_dato',
        sortorder:'asc',
        filtros:[''],
        campos:{c_dato:'c_instancia', d_dato:'d_instancia'},
        id_lista:v_lista_instancias,
        keyNav:true,
        searchInput: '#c_instancia',
        searchCode: true,
        exactField: 'c_dato',
        onClose: function(){
        }
    });

    $('#lupa_c_sector_origen').lupa_generica({
        titulos:['Cod.Sector','Sector'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:300}],
        caption:'Lista Sector Origen',
        sortname:'d_dato',
        sortorder:'asc',
        filtros:[''],
        campos:{c_dato:'c_sector_origen', d_dato:'d_sector_origen'},
        id_lista:v_lista_sec_ori,
        keyNav:true,
        searchInput: '#c_sector_origen',
        searchCode: true,
        filtroNull:true,
        exactField: 'c_dato',
        onClose: function(){
        }
    });

    $('#lupa_c_motivo_origen').lupa_generica({
        titulos:['Cod.Motivo','Motivo'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:300}],
        caption:'Lista Motivo Origen',
        sortname:'d_dato',
        sortorder:'asc',
        filtros:[''],
        campos:{c_dato:'c_motivo_origen', d_dato:'d_motivo_origen'},
        id_lista:v_lista_mot_ori,
        keyNav:true,
        searchInput: '#c_motivo_origen',
        searchCode: true,
        filtroNull:true,
        exactField: 'c_dato',
        onClose: function(){
        }
    });

    $("#lupa_c_documento").lupa_generica({
        id_lista:v_lista_doc,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_dato',width:100},
			{index:'d_dato',width:350}],
		caption:'Tipos de Documento',
		sortname:'c_dato',
		sortorder:'asc',
        filtros:[''],
		campos:{c_dato:'c_documento',d_dato:'d_documento'},
		searchCode:true,
		searchInput: '#c_documento',
		keyNav:true,
        filtroNull:true,
		exactField: 'c_dato',
        onClose: function(){
        }
    });

    $("#frm_busqueda #d_denominacion").autocomplete({
        source: function( request, response ) {
            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "ajax_genericos/autocomplete.php",
                    data: {oper:'1',term: request.term},
                    dataType: 'json',
                    success: function( data ) {
                        ajax_autocomplete = null;
                        if(data) {
                            response(
                                $.map(data.data_raz, function( item ) {
                                    return {
                                        label: item.razon_social,
                                        value: item.razon_social,
                                        cuit: item.cuit,
                                        id_contribuyente: item.id_contribuyente
                                    }
                                })
                            );
                        }
                    }
                });
        },
        minLength:3,
        select:function(event,ui){
            $("#d_denominacion").val(ui.item.value);
            $("#n_cuit").val(ui.item.cuit);
            $("#id_contribuyente").val(ui.item.id_contribuyente);
            return false;
        }
    });

    

    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() != ''){
            try{
                if( limpia_cuit($('#n_cuit').val()).length == 11 ){
                    $.ajax({
                        type:'POST',
                        url: "ajax_genericos/autocomplete.php",
                        data: {oper:'3',term: limpia_cuit($('#n_cuit').val())},
                        dataType: 'json',
                        success: function( data ) {
                            ajax_autocomplete = null;
                            if(data) {
                                $("#d_denominacion").val(data.data_raz[0].razon_social);
                                $("#id_contribuyente").val(data.data_raz[0].id_contribuyente);
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
}