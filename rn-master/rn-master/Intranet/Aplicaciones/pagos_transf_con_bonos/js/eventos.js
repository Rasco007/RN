function init_eventos(){

    $('#c_provincia').val(null);

    $("#n_cuit").mask("99-99999999-9");

    $('#btn_cons_imputaciones').click(function(){
        if($('#fecha_emision').val() != ''){
            setea_parametros('#grid_aplicacion_bonos',{
                ':n_transfer': $("#transferencia").val(),
            });

            $('#transferencia_aplicacion').val($('#transferencia').val());
            $('#c_bono_aplicacion').val($('#c_bonos').val());
            $('#d_bono_aplicacion').val($('#d_bonos').val());
            $('#especie_aplicacion').val($('#especie').val());
            $('#f_bono_aplicacion').val($('#fecha').val());
            $('#valor_nominal_aplicacion').val($('#v_nominal').val());
            $('#cotizacion_aplicacion').val($('#cotizacion').val());
            $('#cta_comitente_aplicacion').val($('#cta_comitente').val());
        }
        abrir_modal("#modal_aplicacion");
    });

    $('#btn_imputar').click(function(){
        if($('#c_provincia').val() == ''){
            mostrar_cuadro('E', 'Error', 'El campo delegación no puede quedar vacío');
            return;
        }

        

        let tipo_comprobante = $('#tipo_comprobante').val();

        if(tipo_comprobante == 'O'){

            let comprobante;

            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_id_obligacion":$('#nro_comprobante').val(),
                 "id_menu":v_id_menu,
                 "n_orden":1
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        let n_obligacion = $('#nro_comprobante').val()
                        $('#doc_modal').val(data.p_desc_tdoc);
                        $('#d_denominacion_modal').val(data.p_desc_denom);
                        $('#n_cuit_modal').val(data.p_n_cuit);
                        $('#n_doc').val(data.p_n_documento);
                        $('#c_doc_modal').val(data.p_c_tipo_documento);
                        $('#c_concepto_modal').val(data.p_c_concepto);
                        $('#concepto_modal').val(data.p_desc_concepto);
                        $('#nro_comprobante').val(data.p_formulario);
                        $('#c_tributo_modal').val(data.p_c_tributo);
                        $('#d_tributo_modal').val(data.p_desc_tributo);
                        $('#objeto').val(data.p_m_objeto_hecho);
                        $('#obligacion_modal').val(n_obligacion);
                        $('#pos_fiscal').val(data.p_n_posicion_fiscal);
                        $('#cuota_anticipo').val(data.p_n_cuota_anticipo);

                        comprobante = data.p_formulario;
    
                        abrir_modal("#modal_detalle");
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 

            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_id_obligacion":$('#importe').val().replace('.','').replace(',','.'),
                 "p_c_concepto":$('#grid_tranf_bonos').getCell(1,'c_concepto'),
                 "p_importe_total_act":$('#importe').val().replace('.','').replace(',','.'),
                 "p_f_transfer":$('#fecha').val(),
                 "p_id_transfer":$('#transferencia').val(),
                 "p_id_boleta_agr":comprobante,
                 "p_i_cotizacion":$('#cotizacion').val().replace('.','').replace(',','.'),
                 "p_c_delegacion":$('#c_provincia').val(),
                 "id_menu":v_id_menu,
                 "n_orden":5
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                      
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 
        }

        total = $('#importe').val().replace('.','').replace(',','.');

        if(tipo_comprobante === 'B'){
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_id_boleta_agr":$('#nro_comprobante').val(),
                 "p_f_transfer":$('#fecha').val(),
                 "p_id_transfer":$('#transferencia').val(),
                 "p_total":total,
                 "p_i_cotizacion":$('#cotizacion').val().replace('.','').replace(',','.'),
                 "p_c_delegacion":$('#c_provincia').val(),
                 "id_menu":v_id_menu,
                 "n_orden":4
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado === 'OK'){
                      
                    }
                    else{
                        mostrar_cuadro('I', 'Información', data.resultado);
                    }
                }
            }); 
        }
    });
    
    $("#btn_limpiar").click();

    $("#btn_consultar").click(function(){
        if($(!'#nro_comprobante').val() || $('#nro_comprobante').val() == ''){
            mostrar_cuadro('E', 'Error', 'Debe ingresar un numero de boleta u obligación');
            return;
        }
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_id_boleta_agr":$('#nro_comprobante').val(),
             "p_tipo_comprobante":$('#tipo_comprobante').val(),
             "id_menu":v_id_menu,
             "n_orden":0
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'SI'){
                    setea_parametros('#grid_tranf_bonos',{
                        ':p_id_boleta': $("#nro_comprobante").val(),
                    });
                    $('#lupa_transf').prop( "disabled", false );
                    $('#transferencia').prop( "disabled", false );
                  return;
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
        filtros_no_nativos = [];
        filtros_arr_main = [];

        if($('#tipo_comprobante').val() != ''){
            if($('#tipo_comprobante').val() == "B"){
                var aux = 'Boleta';
            }else{
                var aux = 'Obligación';
            }
            filtros_arr_main.push('Tipo Comprobante: '+ aux);
        }
        if($('#nro_comprobante').val() != ''){
            filtros_arr_main.push('N° Comprobante: '+ $('#nro_comprobante').val());
        }
        if($('#n_cuit').val() != ''){
            filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());
        }
        if($('#d_denominacion').val() != ''){
            filtros_arr_main.push('Contribuyente: '+ $('#d_denominacion').val());
        }
        if($('#d_provincia').val() != ''){
            filtros_arr_main.push('Prov/Oficina: '+ $('#d_provincia').val());
        }
        filtros_no_nativos_ar['grid_tranf_bonos'] = filtros_arr_main;
        filtros_no_nativos_ar['datos_grid_aplicacion_bonos'] = filtros_arr_main;
    });

    $("#btn_cons_transf").click(function(){
        post_to_url('cons_transf_bonos.php',
                            {
                            'p_n_id_menu':100040,
                            'p_m_autoquery':'N',
                            'n_transfer':$("#transferencia").val(),
                            'ruta':'[]'
                        },'_blank','POST');
    });

    $('#lupa_provincia').lupa_generica({
        titulos:['Cod.Provincia','Provincia'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:465}],
        caption:'Lista de Provincias/Oficinas',
        sortname:'d_dato',
        sortorder:'asc',
        filtros:[''],
        campos:{c_dato:'c_provincia', d_dato:'d_provincia'},
        id_lista:v_lista_prov,
        keyNav:true,
        searchInput: '#c_provincia',
        exactField: 'c_dato',
        searchCode: true,
        limpiarCod: true,
        onClose: function(){
        }
    });

    

    $('#lupa_bonos_transf').lupa_generica({
        id_lista:lista_bonos_transf,
        titulos:['Nro.de Transferencia','c_bono','Descripción','f_transfer','i_valor_nominal','i_cotizacion','Saldo Pesos','i_saldo_pesos','i_valor_residual','n_cta_comitente'],
        grid:[{index:'n_transfer',width:150},
            {index:'c_bono',hidden:true},
            {index:'c_especie',width:300},
            {index:'f_transfer',hidden:true},
            {index:'i_valor_nominal',hidden:true},
            {index:'i_cotizacion',hidden:true},
            {index:'i_valor_pesos',width:150},
            {index:'i_saldo_pesos',hidden:true},
            {index:'i_valor_residual',hidden:true},
            {index:'n_cta_comitente',hidden:true}],
        caption:'Transferencias habilitadas para imputar',
        filtros:[],
        campos:{n_transfer:'transferencia', c_bono:'c_bonos',c_especie:'d_bonos',c_especie:'especie',f_transfer:'fecha',i_valor_nominal:'v_nominal',i_cotizacion:'cotizacion',i_valor_pesos:'v_nominal_pesos',i_saldo_pesos:'saldo_pesos',n_cta_comitente:'cta_comitente',i_valor_residual:'v_residual'},
        keyNav:true,
        onClose: function(){
            if($("#saldo_pesos").val()[0] == '.'){
                let con_cero_a_izq = '0' + $("#saldo_pesos").val();
                $("#saldo_pesos").val(con_cero_a_izq);
            }
            if($("#v_nominal").val()[0] == '.'){
                let con_cero_a_izq = '0' + $("#v_nominal").val();
                $("#v_nominal").val(con_cero_a_izq);
            }
            if($("#v_nominal_pesos").val()[0] == '.'){
                let con_cero_a_izq = '0' + $("#v_nominal_pesos").val();
                $("#v_nominal_pesos").val(con_cero_a_izq);
            }
            if($("#importe").val()[0] == '.'){
                let con_cero_a_izq = '0' + $("#importe").val();
                $("#importe").val(con_cero_a_izq);
            }
            if($("#cotizacion").val()[0] == '.'){
                let con_cero_a_izq = '0' + $("#cotizacion").val();
                $("#cotizacion").val(con_cero_a_izq);
                
            }
            total = $('#importe').val().replace('.','').replace('.','').replace(',','.');
            if($("#transferencia").val()){
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                     "p_i_saldo_pesos":$("#saldo_pesos").val().replace('.','').replace(',','.'),
                     "p_tipo_comprobante":$("#tipo_comprobante").val(),
                     "p_n_tabla_bono":110,
                     "p_id_obligacion":$('#nro_comprobante').val(),
                     "p_c_bono":$('#c_bonos').val(),
                     "p_f_transfer":$('#fecha').val(),
                     "p_f_vencimiento_2":f_vto_2,
                     "p_i_valor_nominal":$('#v_nominal').val().replace('.','').replace(',','.'),
                     "p_n_cta_comitente":$('#cta_comitente').val(),
                     "p_i_valor_pesos":$('#v_nominal_pesos').val().replace('.','').replace(',','.'),
                     "p_importe_saldo":importe_saldo,
                     "p_vto_origal_pago":$('#fecha_emision').val(),
                     "p_f_vto_agr":$('#fecha_vto').val(),
                     "p_total":total,
                     "p_i_cotizacion":$('#cotizacion').val().replace('.','').replace(',','.'),
                     "id_menu":v_id_menu,
                     "n_orden":2
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                            
                            if(data.p_imputar_transferencia){
                                mostrar_cuadro('E', 'Error', data.p_imputar_transferencia);
                                return;
                            }

                            // mostrar_cuadro('S', 'Puede Continuar', data.resultado);
                            $('#btn_imputar').prop( "disabled", false );
                            $('#d_bonos').val(data.p_d_bono);
                            $('#titular').val(data.p_d_titular);
                            $('#cta_cliente').val(data.p_d_cta_cliente);
                            $('#indice').val($('#transferencia').val());
                            // $('#v_nominal_pesos').val(data.p_i_valor_nominal);
                            $('#valor_pesos').val($("#saldo_pesos").val());
                        }
                        else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                }); 
            }
        }
    });

    $("#btn_limpiar").click(function(){
        $('#n_cuit').val(null);
        $('#d_denominacion').val(null);
        $('#nro_comprobante').val(null);
        $('#c_provincia').val(null);
        $('#d_provincia').val(null);

        $('#transferencia').val(null);
        $('#indice').val(null);
        $('#fecha').val(null);
        $('#especie').val(null);
        $('#cta_cliente').val(null);
        $('#titular').val(null);
        $('#c_bonos').val(null);
        $('#d_bonos').val(null);
        $('#v_nominal').val(null);
        $('#cta_comitente').val(null);
        $('#descripcion').val(null);
        $('#v_residual').val(null);
        $('#cotizacion').val(null);
        $('#v_nominal_pesos').val(null);
        $('#saldo_pesos').val(null);
        $('#valor_pesos').val(null);

        $('#lupa_transf').prop( "disabled", true );
        $('#transferencia').prop( "disabled", true );

        $('#grid_aplicacion_bonos').jqGrid('clearGridData');
        $('#grid_tranf_bonos').jqGrid('clearGridData');

        
                    $('#fecha_vto').val(null);
                    $('#fecha_emision').val(null);
                    $('#importe').val(null);
    });

    $("#n_cuit").mask("99-99999999-9");

    $(".mascara_importe").keydown(function(event){
        return controla_number(event, this,2);
    });

    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() != ''){
            try{
                if( limpia_cuit($('#n_cuit').val()).length == 11 ){
                    $.ajax({
                        url: 'ajax_genericos/autocomplete.php',
                        type:"POST",
                        data:{oper:3,term:limpia_cuit($("#n_cuit").val())},
                        async:true,
                        dataType: 'json',
                        success: function(data){
                            if(data){
                                data = data.data_raz[0];
                                $("#d_denominacion").val(data.razon_social);
                                $("#id_contribuyente").val(data.id_contribuyente);
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

    $("#btn_identificar").prop('disabled',true);

    $('#tipo_comprobante').change(function() {    
        let tipo_comprobante = $('#tipo_comprobante').val();
        
        if(tipo_comprobante == 'O'){
            $("#btn_identificar").prop('disabled',false);
        }
        if(tipo_comprobante == 'B'){
            $("#btn_identificar").prop('disabled',true);
        }
    });

    $("#btn_identificar").click(function(){
        if($.trim($('#nro_comprobante').val()) === ""){
            mostrar_cuadro('E', 'Error', 'El campo N° Comprobante es obligatorio');
        }else{
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                "p_id_obligacion":$('#nro_comprobante').val(),
                "id_menu":v_id_menu,
                "n_orden":1
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        let n_obligacion = $('#nro_comprobante').val()
                        $('#doc_modal').val(data.p_desc_tdoc);
                        $('#d_denominacion_modal').val(data.p_desc_denom);
                        $('#n_cuit_modal').val(data.p_n_cuit);
                        $('#n_doc').val(data.p_n_documento);
                        $('#c_doc_modal').val(data.p_c_tipo_documento);
                        $('#c_concepto_modal').val(data.p_c_concepto);
                        $('#concepto_modal').val(data.p_desc_concepto);
                        $('#nro_comprobante').val(data.p_formulario);
                        $('#c_tributo_modal').val(data.p_c_tributo);
                        $('#d_tributo_modal').val(data.p_desc_tributo);
                        $('#objeto').val(data.p_m_objeto_hecho);
                        $('#obligacion_modal').val(n_obligacion);
                        $('#pos_fiscal').val(data.p_n_posicion_fiscal);
                        $('#cuota_anticipo').val(data.p_n_cuota_anticipo);

                        abrir_modal("#modal_detalle");
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
 
    });

}