function inicializarEventos() {
    $('#btn_buscar').click(function () {
        if(!$('#d_consulta').val()){
            mostrar_error('Debe seleccionar una consulta en el filtro superior.');
            return;
        }
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_id_cons_dinamica":$('#id_cons_dinamica').val(),
             "id_menu":v_id_menu,
             "n_orden":0
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    v_id_consulta_din = data.p_id_consulta_din;
                    v_id_cons_dinamica = $('#id_cons_dinamica').val();
                    $('#btn_buscar').prop('disabled', true);
                    $('#lupa_d_consulta').css("visibility", "hidden");
                    v_filtro_buscado = true;

                    if(v_id_workflow_log){
                        $.ajax({
                            url:'consulta_din/php/guardar_params.php',
                            type:"POST",
                            data:{
                                p_id_cons_dinamica: v_id_cons_dinamica,
                                p_id_consulta_din: v_id_consulta_din,
                                p_solo_valores: 'S',
                                parametros: v_parametros_din
                            },
                            dataType:'json'
                        }).done(function(data) {
            
                            if(data.resultado != 'OK'){
                                mostrar_error(data.resultado);
                            }else{
                                setea_parametros('#param_grid',{
                                    ':p_id_consulta_din': v_id_consulta_din
                                });
                                $('#btn_ejecutar').click();
                            }
                        });
                    } else {
                        setea_parametros('#param_grid',{
                            ':p_id_consulta_din': data.p_id_consulta_din
                        });
                    }
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    });

    $('#btn_limpiar').click(function(){
        $('#param_grid').jqGrid('clearGridData');
        $('#result_grid').jqGrid('clearGridData');
        $('#id_cons_dinamica').val(null);
        $('#d_proceso').val(null);
        $('#d_consulta').val(null);
        $('#desc_consulta').val(null);
        $('#btn_buscar').prop('disabled', false);
        $('#lupa_d_consulta').css("visibility", "visible"); 
        $.jgrid.gridUnload("#result_grid");
        v_filtro_buscado = false;
    });

    $("#lupa_d_consulta").lupa_generica({
        id_lista:lista_consultas,
        titulos:['Código','Título', '', 'Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:350},
            {index:'d_procedimiento',hidden:true},
            {index:'d_descrip2',width:600}],
        caption:'Consultas',
        sortname:'d_descrip',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#id_cons_dinamica',
        campos:{c_codigo:'id_cons_dinamica', d_descrip:'d_consulta', d_procedimiento:'d_procedimiento', d_descrip2:'desc_consulta'},
        filtros:[''],
        keyNav:true,
        limpiarCod: true,
        onClose:function(){
            if(v_id_workflow_log){
                $('#btn_buscar').click();
            }
        }
    });

    if (v_id_cons_dinamica){
        $('#id_cons_dinamica').val(v_id_cons_dinamica).blur();
        $('#btn_limpiar').hide();
    }


    $('#btn_guardar_modal_parametros').click(function () {
        if($('#frm_parametros').validationEngine('validate')){
            $.ajax({
                url:'consulta_din/php/guardar_params.php',
                type:"POST",
                data:{
                    p_id_cons_dinamica: v_id_cons_dinamica,
                    p_id_consulta_din: v_id_consulta_din,
                    p_solo_valores: 'N',
                    parametros:JSON.stringify($('#frm_parametros').serializeObject())
                },
                dataType:'json'
            }).done(function(data) {

                if(data.resultado != 'OK'){
                    mostrar_error(data.resultado);
                }else{
                    $("#param_grid").trigger('reloadGrid');
                    $('#modal_parametros').modal('hide');
                    $('#borrar').remove();
                }
            });
        }
    });

    $('#btn_salir_modal_parametros').click(function () {
        $('#borrar').remove();
        $('#modal_parametros').modal('hide');
    });

    $('#modal_parametros .close').click(function () {
        $('#borrar').remove();
        $('#modal_parametros').modal('hide');
    });

    $('#btn_ejecutar').click(function () {
        if(!v_filtro_buscado){
            mostrar_error('Debe seleccionar una consulta en el filtro superior.');
            return;
        }
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_d_procedimiento": $('#d_procedimiento').val(),
             "p_id_consulta_din":v_id_consulta_din,
             "id_menu":v_id_menu,
             "n_orden":2
            },
            dataType:'json',
            success: function( data ) {
                $.jgrid.gridUnload("#result_grid");
                if(data.resultado == 'OK'){
                    $.ajax({
                        url:'consulta_din/php/ajax_info.php',
                        type:"POST",
                        data:{
                            p_id_cons_dinamica: v_id_cons_dinamica
                        },
                        dataType:'json',
                        success: function( data ) {
                            if(v_id_workflow_log){
                                actualizar_tarea_workflow(v_id_workflow_log, v_c_tarea, 'R', 0, 'N');
                            }

                            var resultados = new GridParam({
								id_menu:v_id_menu,
								n_grid:1,
								m_autoquery:'S',
								param:{'p_id_consulta_din': v_id_consulta_din}
							});
							
							// funcion que crea la grilla nueva
							$("#result_grid").jqGrid({
                                colNames:eval(data.colnames),
                                colModel:eval(data.colmodel),
                                autowidth:false,
                                height:300,
                                pager: $('#result_grid_pager'),
                                caption:"Resultados" ,
                                postData:resultados.postData(),
                                editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
							}).navGrid('#result_grid_pager',
                                {add:false, edit:false, del:false}, //options
                                {}, // edit options
                                {}, // add options
                                {}, // del options
                            ).navButtonAdd('#result_grid_pager',{
                                title:"Generar Excel",
                                caption:"Generar Excel",
                                id:"gen_excel",
                                onClickButton:function() {
                                    if(!v_filtro_buscado){
                                        mostrar_error('Debe seleccionar una consulta en el filtro superior.');
                                        return;
                                    }
                                    post_to_url("consulta_din/php/excel_emisiones.php", {
                                        'p_n_id_menu':v_id_menu,
                                        'p_id_cons_dinamica': v_id_cons_dinamica,
                                        'p_id_consulta_din': v_id_consulta_din,
                                        'p_consulta':$('#d_consulta').val(),
                                        'ruta': '[]'}, "_blank", "post");
                                },
                                position:"last",
                                cursor:"pointer"}
                            );

                            $('#bt_informe_result_grid_pager').hide();
                            $(window).resize();
                        }
                    });
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
        
    });
}