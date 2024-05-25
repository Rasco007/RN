function init_eventos (){

    $('#lupa_d_denominacion').hide();
    $('#n_orden').val(1);
    $("#grid_detalle").hide();
    $("#div_leyenda_datos_juicio").hide();
    $('#btn_limpiar_grilla').attr('disabled',true);

    $('#mascara_lupa_c_instancia').hide();
    $('#mascara_lupa_c_documento').hide();
    $('#mascara_lupa_c_sector_origen').hide();
    $('#mascara_lupa_c_motivo_origen').hide();

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

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

    $("#n_cuit").on('input', function() {
        if($("#n_cuit").val().length > 10){
            var n_cuit = $(this).val().trim();
            $(this).val(n_cuit);
            $(this).mask("99-99999999-9");
        }
    });

    $("#btn_limpiar").click(function(){
        $('.limpiar').val('');
        $('#boleta_deuda').attr('disabled',false);
        $('#main_grid').clearGridData();
        $('#secondary_grid').clearGridData();
        $("#btn_select_all").hide();
        $("#btn_desmarcar_todos").hide();
        $('#lupa_d_denominacion').hide();
        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        v_sesion = null;
        seleccionados = [];
    });

    if(v_modo == 'A'){
        $('.alta').attr('disabled',false);
        $('.alta').attr('readonly',false);
        $("#btn_consultar").hide();
        $("#btn_modificar").hide();
        $("#btn_generar").show();
        

        $('#n_cuit').focusout(function(){
            if ($('#n_cuit').val() !== ''){
                if( limpia_cuit($('#n_cuit').val()).length === 11 ){
                    autocompleta_contrib_por_cuit();
                }else{
                    $('#btn_limpiar').click();
                }
            }
        });

        $('#boleta_deuda').focusout(function(){
            if($('#boleta_deuda').val() != ''){
                // mostrar_cuadro('E', 'Error', 'Debe ingresar una boleta valida');
                // return;

                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                    "p_id_boleta_deuda":$('#boleta_deuda').val(),
                    "id_menu":v_id_menu,
                    "n_orden":7
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
        });

        $('#c_expediente').focusout(function(){
            if($('#c_expediente').val() != ''){
                // mostrar_cuadro('E', 'Error', 'Debe ingresar un expediente valido');
                // return;

                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                    "p_c_expediente":$('#c_expediente').val(),
                    "id_menu":v_id_menu,
                    "n_orden":8
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                            $.ajax({
                                type:'POST',
                                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                                data:{      
                                "p_c_expediente":$('#c_expediente').val(),
                                "id_menu":v_id_menu,
                                "n_orden":9
                                },
                                dataType:'json',
                                success: function( data ) {
                                    if(data.resultado == 'OK'){
                                        $.ajax({
                                            type:'POST',
                                            url: FUNCIONES_BASEPATH+'maestro_abm.php',
                                            data:{      
                                            "p_c_expediente":$('#c_expediente').val(),
                                            "id_menu":v_id_menu,
                                            "n_orden":10
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
                                    else{
                                        mostrar_cuadro('E', 'Error', data.resultado);
                                        return;
                                    }
                                }
                            }); 
                        }
                        else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                }); 
            }
        });

        $('#lupa_c_instancia').lupa_generica({
            titulos:['Código','Descripción'],
            grid:[{index:'c_dato',width:100},
                {index:'d_dato',width:465}],
            caption:'Instancias',
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
            titulos:['Código','Descripción'],
            grid:[{index:'c_dato',width:100},
                {index:'d_dato',width:465}],
            caption:'Lista de Oficinas',
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
            titulos:['Código','Descripción'],
            grid:[{index:'c_dato',width:100},
                {index:'d_dato',width:465}],
            caption:'Lista de Motivos de Origen',
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
    }

        $("#check_all").click(function(){
            let check = $('#check_all').is(':checked')?'S':'N'
            if( check == 'S'){
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                    "p_session":v_sesion,
                    "p_marca":'ST',
                    "id_menu":v_id_menu,
                    "n_orden":4
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                            setea_parametros('#secondary_grid',{
                                ':p_sesion': v_sesion,
                            });
                        }
                        else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                }); 
            }
            else{
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                    "p_session":v_sesion,
                    "p_marca":'NT',
                    "id_menu":v_id_menu,
                    "n_orden":4
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                            setea_parametros('#secondary_grid',{
                                ':p_sesion': v_sesion,
                            });
                        }
                        else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                }); 
            }
        });

        $("#btn_consultar").click(function(){
            let msje = 'Debe ingresar un número de boleta'
            if( $('#boleta_deuda').val() == '' && v_modo != 'A'){
                mostrar_cuadro('E', 'Error', msje );
                return;
            }
            if(v_modo == 'A'){
                msje = 'Debe ingresar un número de boleta, el tipo de juicio y un contribuyente';
                if($('#boleta_deuda').val() == '' || $('#c_instancia').val() == '' || $('#id_contribuyente').val() == ''){
                    mostrar_cuadro('E', 'Error', msje );
                    return;
                }
            }

            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                "p_id_boleta_deuda":$('#boleta_deuda').val(),
                "p_c_instancia":$('#c_instancia').val(),
                "p_n_tabla_instancia":null,
                "p_id_contribuyente":$('#id_contribuyente').val(),
                "id_menu":v_id_menu,
                "n_orden":0
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        if(data.p_id_contribuyente == null){
                            mostrar_cuadro('E', 'Error', 'No se han encontrado resultados');
                            return;
                        }
                        $('#n_cuit').val(data.p_n_cuit).blur();
                        $('#d_denominacion').val(data.p_desc_denom);
                        $('#id_contribuyente').val(data.p_id_contribuyente);
                        $('#c_documento').val(data.p_c_tipo_documento).blur();
                        $('#documento').val(data.p_n_documento);
                        $('#instancia').val(data.p_c_instancia);
                        $('#n_orden').val(data.p_n_orden);
                        $('#c_instancia').val('0'+data.p_c_instancia)
                        $('#d_instancia').val(data.p_d_instancia)
                        $('#c_sector_origen').val(data.p_c_sector_origen);
                        $('#d_sector_origen').val(data.p_sector_origen);
                        $('#f_origen').val(data.p_f_origen);
                        $('#c_motivo_origen').val(data.p_c_motivo_origen);
                        $('#d_motivo_origen').val(data.p_motivo_origen);             
                        $('#f_vto').val(data.p_f_vto);
                        $('#d_resolucion').val(data.p_d_resolucion);
                        $('#f_resolucion').val(data.p_f_resolucion);
                        $('#observaciones').val(data.p_d_observ);
                        $('#c_expediente').val(data.p_c_expediente);
                        $('#boleta_deuda').val(data.p_id_boleta_deuda);
                        $('#id_grupo').val(data.p_id_grupo);
                        $('#n_seleccion').val(data.p_n_seleccion);

                        $("#n_cuit").mask("99-99999999-9");

                        
                                        
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 

            $('#boleta_deuda').attr('disabled',true);
        });

        $("#btn_cargar_obj").click(function(){

            $('#n_orden').val(1);

            if($('#c_instancia').val() === ''){
                mostrar_cuadro('E', 'Error', 'El campo Tipo de Juicio no puede quedar vacío.');
                return;
            }

            if($('#n_cuit').val() === ''){
                mostrar_cuadro('E', 'Error', 'El campo CUIT no puede quedar vacío.');
                return;
            }

            if($('#c_sector_origen').val() === ''){
                mostrar_cuadro('E', 'Error', 'El campo Oficina no puede quedar vacío.');
                return;
            }

            if($('#c_motivo_origen').val() === ''){
                mostrar_cuadro('E', 'Error', 'El campo Motivo no puede quedar vacío.');
                return;
            }

            if($('#f_origen').val() === ''){
                mostrar_cuadro('E', 'Error', 'El campo F. Pres. Juicio no puede quedar vacío.');
                return;
            }

            

            setea_parametros('#main_grid',{
                ':p_id_contribuyente': $('#id_contribuyente').val(),
                ':p_f_origen':$('#f_origen').val(),
                ':p_id_boleta_deuda':$('#boleta_deuda').val(),
                ':p_n_instancia': $('#d_instancia').val(),
                ':p_c_instancia':$('#instancia').val(),
                ':p_n_orden':$('#n_orden').val(),
            });

            $("#grid_detalle").show();
            $("#btn_select_all").show();
            $("#div_leyenda_datos_juicio").show();
            $(window).resize();
            $('#btn_limpiar_grilla').attr('disabled',false);
            $('#btn_limpiar').attr('disabled',true);
            $('#btn_cargar_obj').attr('disabled',true);

            $('#boleta_deuda').attr('disabled',true);
            $('#c_expediente').attr('disabled',true);
            $('#c_instancia').attr('disabled',true);
            $('#n_cuit').attr('disabled',true);
            $('#d_denominacion').attr('disabled',true);
            $('#c_documento').attr('disabled',true);
            $('#documento').attr('disabled',true);
            $('#c_sector_origen').attr('disabled',true);
            $('#f_origen').attr('disabled',true);
            $('#c_motivo_origen').attr('disabled',true);
            $('#observaciones').attr('disabled',true);

            $('#mascara_lupa_c_instancia').show();
            $('#mascara_lupa_c_documento').show();
            $('#mascara_lupa_c_sector_origen').show();
            $('#mascara_lupa_c_motivo_origen').show();
            $('#mascara_lupa_d_denominacion').show();
            $('#lupa_c_instancia').hide();
            $('#lupa_c_documento').hide();
            $('#lupa_c_sector_origen').hide();
            $('#lupa_c_motivo_origen').hide();
            $('#lupa_d_denominacion').hide();

            //filtros
            filtros_arr_main = [];
            if($('#boleta_deuda').val() !== ''){filtros_arr_main.push('Boleta de Deuda: '+ $('#boleta_deuda').val());}
            if($('#c_expediente').val() !== ''){filtros_arr_main.push('Exp. Adm.: '+ $('#c_expediente').val());}
            if($('#n_orden').val() !== ''){filtros_arr_main.push('Nro. de Orden: '+ $('#n_orden').val());}
            if($('#c_instancia').val() !== ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#c_instancia').val()+' - '+ $('#d_instancia').val());}
            if($('#n_cuit').val() !== ''){filtros_arr_main.push('CUIT:' + $('#n_cuit').val());}
            if($('#d_denominacion').val() !== ''){filtros_arr_main.push('Denominación: '+ $('#d_denominacion').val());}
            if($('#c_documento').val() !== ''){filtros_arr_main.push('Tipo Documento: '+ $('#c_documento').val()+' - ' + $('#d_documento').val());}
            if($('#documento').val() !== ''){filtros_arr_main.push('Nro. Documento: '+ $('#documento').val());}
            if($('#c_sector_origen').val() !== ''){filtros_arr_main.push('Oficina: '+ $('#c_sector_origen').val()+' - '+ $('#d_sector_origen').val());}
            if($('#f_origen').val() !== ''){filtros_arr_main.push('F. Pres. Juicio : '+ $('#f_origen').val());}
            if($('#c_motivo_origen').val() !== ''){filtros_arr_main.push('Motivo: '+ $('#c_motivo_origen').val());}            

            filtros_no_nativos_ar['secondary_grid'] = filtros_arr_main;
            filtros_no_nativos_ar['main_grid'] = filtros_arr_main;
        });

        $("#btn_select_all").click(function(){
            $(".a_marcar").prop("checked", true);
            $("#btn_desmarcar_todos").show();
            $("#btn_select_all").hide();
            let cantidad_de_instancias = $('#main_grid').jqGrid('getGridParam','records');
            for(cantidad_de_instancias; cantidad_de_instancias > 0;cantidad_de_instancias--){
                seleccionados.push(cantidad_de_instancias);
            }
        });

        $("#btn_desmarcar_todos").click(function(){
            $(".a_marcar").prop("checked", false);
            $("#btn_select_all").show();
            $("#btn_desmarcar_todos").hide();
            seleccionados = [];
            $('#secondary_grid').clearGridData();
        });

        $("#btn_limpiar_grilla").click(function(){
            $('#main_grid').clearGridData();
            $('#secondary_grid').clearGridData();
            $("#btn_select_all").hide();
            $("#btn_desmarcar_todos").hide();
            $("#grid_detalle").hide();
            $("#div_leyenda_datos_juicio").hide();
            $('#btn_cargar_obj').attr('disabled',false);
            $('#btn_limpiar_grilla').attr('disabled',true);
            $('#btn_limpiar').attr('disabled',false);
            v_sesion = null;
            seleccionados = [];

            $('#boleta_deuda').attr('disabled',false);
            $('#c_expediente').attr('disabled',false);
            $('#c_instancia').attr('disabled',false);
            $('#n_cuit').attr('disabled',false);
            $('#d_denominacion').attr('disabled',false);
            $('#c_documento').attr('disabled',false);
            $('#documento').attr('disabled',false);
            $('#c_sector_origen').attr('disabled',false);
            $('#f_origen').attr('disabled',false);
            $('#c_motivo_origen').attr('disabled',false);
            $('#observaciones').attr('disabled',false);

            $('#mascara_lupa_c_instancia').hide();
            $('#mascara_lupa_c_documento').hide();
            $('#mascara_lupa_c_sector_origen').hide();
            $('#mascara_lupa_c_motivo_origen').hide();
            $('#mascara_lupa_d_denominacion').hide();
            $('#lupa_c_instancia').show();
            $('#lupa_c_documento').show();
            $('#lupa_c_sector_origen').show();
            $('#lupa_c_motivo_origen').show();
            $('#lupa_d_denominacion').show();
        });

        $("#btn_modificar").click(function(){
            let cant_seleccionados = $('#secondary_grid').getCell(1,'cant_seleccionados');
                if(cant_seleccionados === 0){
                    mostrar_cuadro('Q', 'Atención', 'No ha seleccionado ninguna deuda. Esto ELIMINARÁ los objetos seleccionados del juicio. ¿Desea continuar?',
                function () {
                    if(!v_mas_de_un_registro){
                        mostrar_error('No puede eliminar completamente un Juicio, ingrese por la opción de Anulación de Juicio.', 'E', true);
                    }else{
                        modificar_juicio('N');
                        $("#btn_limpiar").click();
                    }
                },
                function () {

                });
                }
                else{
                    mostrar_cuadro('Q', 'Atención', 'Usted está por MODIFICAR el juicio. ¿Desea continuar?',
                function () {
                    modificar_juicio('N');
                    $("#btn_limpiar").click();
                },
                function () {
                    return;
                });
            }
        });

        $("#btn_generar").click(function(){
            let cant_seleccionados = $('#secondary_grid').getCell(1,'cant_seleccionados');
                if(cant_seleccionados == 0){
                    mostrar_cuadro('I', 'Atención', 'No ha seleccionado ninguna deuda.')
                }
                else{
                    modificar_juicio('S');
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
}
