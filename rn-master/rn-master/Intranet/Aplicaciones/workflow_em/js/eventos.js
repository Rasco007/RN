function inicializarEventos() {
    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");
    
    $('#btn_buscar').click(function () {
        if($('#frm_filtro').validationEngine('validate')){
            $('#btn_finalizar').prop('disabled', false);
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_c_tributo":$('#c_tributo').val(),
                 "p_c_concepto":$('#c_concepto').val(),
                 "p_n_anio":$('#n_anio').val(),
                 "p_n_cuota":$('#n_cuota').val(),
                 "id_menu":v_id_menu,
                 "n_orden":0
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){                   
                        $('#btn_buscar').prop('disabled', true);
                        $('#lupa_c_tributo').css("visibility", "hidden");
                        $('#lupa_c_concepto').css("visibility", "hidden");
                        $('#c_tributo').attr('readonly',true);
                        $('#c_concepto').attr('readonly',true);
                        $('#n_anio').attr('readonly',true);
                        $('#n_cuota').attr('readonly',true);
                        setea_parametros('#workflow_grid',{':p_id_workflow': data.p_id_workflow_log});
                        v_id_workflow_log = data.p_id_workflow_log;
                        inicializarEmisiones();
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 
        }
    });

    $('#btn_limpiar').click(function(){
        $('#workflow_grid').jqGrid('clearGridData');
        v_id_workflow_log = null;
        $('#frm_filtro').find(':input').not('#c_tributo').not('#d_tributo').val('');
        $('#btn_buscar').prop('disabled', false);
        $('#btn_finalizar').prop('disabled', false);
        $('#lupa_c_concepto').css("visibility", "visible");
        $('#c_concepto').attr('readonly',false);
        $('#n_anio').attr('readonly',false);
        $('#n_cuota').attr('readonly',false);
        $('#f_finalizacion').val('');
        $('#c_usuario_fin').val('');
        $('#f_hab_envio_ba').val('');
    });

    $("#lupa_c_tributo").lupa_generica({
        id_lista:lista_tributos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:350}],
        caption:'Tributos',
        sortname:'c_codigo',
        sortorder:'asc',
        searchInput: '#c_tributo',
        searchCode: true,
        campos:{c_codigo:'c_tributo', d_descrip:'d_tributo'},
        filtros:[''],
        keyNav:true,
        limpiarCod: true,
        onClose: function(){
            if($('#c_tributo').val() == '90'){
                $('#n_producto_dd').val(1);
            } else {
                $('#n_producto_dd').val(2); 
            }
        }
    });
    
    $("#lupa_c_concepto").lupa_generica({
        id_lista:lista_conceptos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_concepto',width:100},
            {index:'d_concepto',width:350}],
        caption:'Conceptos',
        sortname:'c_concepto',
        sortorder:'asc',
        searchInput: '#c_concepto',
        exactField: 'c_concepto',
        searchCode: true,
        campos:{c_concepto:'c_concepto', d_concepto:'d_concepto'},
        filtrosNulos:[false],
        filtros:['#c_tributo'],
        filtrosTitulos:['Tributo'],
        keyNav:true,
        limpiarCod: true,
    });

    $('#btn_finalizar').click(function(){
        if(!v_id_workflow_log){
            mostrar_cuadro('E', 'Error', 'Debe buscar un registro primero');
            return;
        }
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_id_workflow_log":v_id_workflow_log,
             "p_finalizar_proceso":'S',
             "p_f_hab_envio_ba":null,
             "id_menu":v_id_menu,
             "n_orden":1
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    inicializarEmisiones();
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    });

    $('#btn_actualizar_boleta').click(function(){
        if(!v_id_workflow_log){
            mostrar_cuadro('E', 'Error', 'Debe buscar un registro primero');
            return;
        }
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_id_workflow_log":v_id_workflow_log,
             "p_finalizar_proceso":'N',
             "p_f_hab_envio_ba":$('#f_hab_envio_ba').val(),
             "id_menu":v_id_menu,
             "n_orden":1
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    inicializarEmisiones();
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    });

    $('#n_anio').keyup(function(){
        $('#n_pos_fiscal').val($('#n_anio').val() * 100);
    });

}