function init_eventos(){

    $('#lupa_c_instancia').hide();
    $('#lupa_c_documento').hide();
    $('#lupa_c_sector_origen').hide();
    $('#lupa_c_motivo_origen').hide();

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");


    $('#btn_actualizar').click(function(){
        mostrar_cuadro('C','Confirmar Actualización','Este proceso actualizara la deuda registrada a la nueva fecha de presentación. ¿Desea Continuar con la operación?',
				function(){
					$.ajax({
                        type:'POST',
                        url: FUNCIONES_BASEPATH+'maestro_abm.php',
                        data:{      
                         "p_f_origen_nuevo":$('#f_pres_juicio').val(),
                         "p_id_boleta_deuda":$("#boleta_deuda").val(),
                         "id_menu":v_id_menu,
                         "n_orden":1
                        },
                        dataType:'json',
                        success: function(data) {
                            if(data.resultado == 'OK'){
                                mostrar_cuadro('S', 'Información', 'La fecha de envío a juicio ha sido actualizada satisfactoriamente');
                                $('#btn_limpiar').click();
                                return;
                            }
                            else{
                                mostrar_cuadro('E', 'Error', data.resultado);
                                return;
                            }
                        }
                    }); 
				}
				,function(){return}
			);
        
    });

    $("#btn_consultar").click(function(){boleta_deuda
        if($("#boleta_deuda").val() == '' || $("#boleta_deuda").val() == null){
            mostrar_cuadro('E', 'Error', 'Debe ingresar un número de boleta');
            return;
        }

        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_id_boleta_deuda":$("#boleta_deuda").val(),
             "id_menu":v_id_menu,
             "n_orden":0
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    $('#n_cuit').val(data.p_n_cuit).blur();
                                $('#d_denominacion').val(data.p_desc_denom);
                                $('#c_documento').val(data.p_c_tipo_documento).blur();
                                $('#documento').val(data.p_n_documento);
                                $('#instancia').val(data.p_n_instancia);
                                $('#n_orden').val(data.p_n_orden);
                                $('#c_instancia').val('0'+data.p_c_instancia).blur();
                                $('#c_sector_origen').val(data.p_c_sector_origen).blur();
                                $('#f_origen').val(data.p_f_origen);
                                $('#c_motivo_origen').val(data.p_c_motivo_origen).blur();            
                                $('#f_vto').val(data.p_f_vto);
                                $('#d_resolucion').val(data.p_d_resolucion);
                                $('#f_resolucion').val(data.p_f_resolucion);
                                $('#observaciones').val(data.p_d_observacion);
                                $('#boleta_deuda').val(data.p_id_boleta_deuda);
                                $('#id_contribuyente').val(data.p_id_contribuyente);

                                $('#f_pres_juicio').attr('disabled',false);
                                $('#btn_actualizar').attr('disabled',false);

                                setea_parametros('#main_grid',{
                                                    ':p_n_instancia': data.p_n_instancia,
                                                    ':p_n_orden': data.p_n_orden,
                                                });
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    });

    $('#btn_limpiar').click(function(){
        $('.limpiar').val(null);
        $('#f_pres_juicio').attr('disabled',true);
        $('#btn_actualizar').attr('disabled',true);
        $('#main_grid').jqGrid('clearGridData');
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
}