function ejecutar_tarea(id){
    let obj_invocar = $('#workflow_grid').getCell(id, 'd_objeto_invocar');
    let m_barra_progreso = $('#workflow_grid').getCell(id, 'm_barra_progreso');
    let c_tarea_ant = $('#workflow_grid').getCell(id, 'c_tarea_ant');
    console.log($('#workflow_grid').getCell(id, 'c_tipo_obj_invocar'));
    $.ajax({
        url:'workflow_general/php/traer_params_tarea.php',
        type:"POST",
        data:{
            p_id_workflow_log: v_id_workflow_log,
            p_c_tarea: $('#workflow_grid').getCell(id, 'c_tarea'),
            p_c_tarea_ant: c_tarea_ant
        },
        dataType:'json',
        async:true
    }).done(function(data) {
        if(data.resultado == 'OK'){
            var datos = data.datos;

            if(c_tarea_ant && datos[0]['C_ESTADO_ANT'] == 'P'){
                mostrar_cuadro('I', 'Información', 'Debe ejecutar la tarea anterior antes de ejecutar esta tarea');
                return;
            }

            
            var params = {};
            var param_list = [];
            for (const param of data.datos){
                if (param['C_TIPO_PARAM'] == 'F'){
                    params[param['D_PARAMETRO_INVOCADO']] = param['D_VALOR_FIJO'];
                    param_list.push(param['D_VALOR_FIJO']);
                } else if(param['C_TIPO_PARAM'] == 'A'){
                    params[param['D_PARAMETRO_INVOCADO']] = $('#'+param['D_CAMPO_PHP']).val();
                    param_list.push($('#'+param['D_CAMPO_PHP']).val());
                }
            }

            guardar_parametros(param_list, v_id_workflow_log, $('#workflow_grid').getCell(id, 'c_tarea'));
            if ($('#workflow_grid').getCell(id, 'c_tipo_obj_invocar') == 'PHP'){
                params['p_n_id_menu'] = $('#workflow_grid').getCell(id, 'n_id_menu')? $('#workflow_grid').getCell(id, 'n_id_menu'): v_id_menu;
                params['p_id_workflow_log'] = v_id_workflow_log;
                params['p_c_tarea'] = $('#workflow_grid').getCell(id, 'c_tarea');
                post_to_url(BASEPATH_ENTORNO+obj_invocar,
                params
                ,'_blank');
            } else if ($('#workflow_grid').getCell(id, 'c_tipo_obj_invocar') == 'CONS'){

                var vector_params = [];

                Object.keys(params).forEach((key) => {
                    const value = params[key];
                    const match = key.match(/p_orden_(\d+)/);
                    
                    if (match) {
                      const orden = parseInt(match[1], 10);
                      vector_params.push({ key, value, orden });
                    }
                });
            
                vector_params.sort((a, b) => a.orden - b.orden);
            
                vector_params = vector_params.map((item) => item.value);

                var params_php = {};
                params_php['p_n_id_menu'] = 100016;
                params_php['p_id_workflow_log'] = v_id_workflow_log;
                params_php['p_c_tarea'] = $('#workflow_grid').getCell(id, 'c_tarea');
                params_php['p_id_cons_dinamica'] = obj_invocar;
                params_php['p_parametros_din'] = JSON.stringify(vector_params);
                post_to_url(BASEPATH_ENTORNO+'Aplicaciones/consulta_din.php',
                params_php
                ,'_blank');
            } else if ($('#workflow_grid').getCell(id, 'c_tipo_obj_invocar') == 'JASPER'){
                var jasper_params = '';
                for (var key in params) {
                    if (jasper_params != '') {
                        jasper_params += '&';
                    }
                    jasper_params += key + '|' + params[key];
                }

                llamar_report(obj_invocar,jasper_params,'PDF');
                actualizar_tarea_workflow(v_id_workflow_log, $('#workflow_grid').getCell(id, 'c_tarea'), 'R', 0, 'N');
            } else if ($('#workflow_grid').getCell(id, 'c_tipo_obj_invocar') == 'PROC'){
                actualizar_tarea_workflow(v_id_workflow_log, $('#workflow_grid').getCell(id, 'c_tarea'), 'E', 0, 'N');
                $.ajax({
                    url:'workflow_general/php/llamar_proceso_base.php',
                    type:"POST",
                    data:{
                        p_obj_invocar: obj_invocar,
                        p_params: JSON.stringify(params),
                    },
                    dataType:'json'
                }).done(function(data) {
                    var params = data.p_params;
                    if(data.resultado == 'OK'){
                        if (params['p_mensaje_usuario']){
                            mostrar_cuadro('I', 'Información', params['p_mensaje_usuario']);
                        }

                        var out_params = datos.filter(function (el) {
                            return el['C_INOUT'] == 'OUT';
                        });

                        var out_params_str = '';
                        for (const param of out_params){
                            out_params_str += param['D_PARAMETRO_INVOCADO'] + ': ' + params[param['D_PARAMETRO_INVOCADO']] + '\n';
                        }


                        mostrar_cuadro('S', 'Proceso ejecutado correctamente', out_params_str);
                        actualizar_tarea_workflow(v_id_workflow_log, $('#workflow_grid').getCell(id, 'c_tarea'), 'R', 0, 'S');
                    } else{
                        mostrar_cuadro('E', 'Error al ejecutar el proceso', data.resultado);
                        actualizar_tarea_workflow(v_id_workflow_log, $('#workflow_grid').getCell(id, 'c_tarea'), 'P', 0, 'N');
                        return;
                    }
                });
            } else if ($('#workflow_grid').getCell(id, 'c_tipo_obj_invocar') == 'SCHED'){
                $.ajax({
                    url:'workflow_general/php/estado_job.php',
                    type:"POST",
                    data:{
                        p_id_workflow_log: v_id_workflow_log,
                        p_c_tarea: $('#workflow_grid').getCell(id, 'c_tarea'),
                        p_obj_invocar: obj_invocar
                    },
                    async:true,
                    dataType:'json'
                }).done(function(data) {
                    if(data.resultado == 'OK'){
                        if(data.p_estado == 'RUNNING'){
                            mostrar_cuadro('I', 'Información', 'El job ya está corriendo');
                            if(m_barra_progreso == 'S'){
                                var prog_id = $("#main").barraProceso({visible:true});
                            }
                            monitorear_estado_job(v_id_workflow_log, $('#workflow_grid').getCell(id, 'c_tarea'), obj_invocar, 0, prog_id);
                            return;
                        } else {
                            actualizar_tarea_workflow(v_id_workflow_log, $('#workflow_grid').getCell(id, 'c_tarea'), 'E', 0, 'N');
                            var job_params = [];
                            for (var key in params) {
                                job_params.push(params[key]);
                            }

                            //Agrego dos parametros mas a mano. No se si esto se va a quedar
                            job_params.push(v_id_workflow_log);
                            job_params.push($('#workflow_grid').getCell(id, 'c_tarea'));

                            $.ajax({
                                url:'workflow_general/php/llamar_job_base.php',
                                type:"POST",
                                data:{
                                    p_obj_invocar: obj_invocar,
                                    p_params: JSON.stringify(job_params),
                                    p_id_workflow_log: v_id_workflow_log,
                                    p_c_tarea: $('#workflow_grid').getCell(id, 'c_tarea')
                                },
                                dataType:'json'
                            }).done(function(data) {
                                if(data.resultado == 'OK'){
                                    if(m_barra_progreso == 'S'){
                                        var prog_id = $("#main").barraProceso({visible:true});
                                    }
                                    monitorear_estado_job(v_id_workflow_log, $('#workflow_grid').getCell(id, 'c_tarea'), obj_invocar, 0, prog_id);
                                } else {
                                    mostrar_cuadro('E', 'Error al ejecutar el job', data.resultado);
                                    actualizar_tarea_workflow(v_id_workflow_log, $('#workflow_grid').getCell(id, 'c_tarea'), 'P', 0, 'N');
                                    return;
                                }
                            });
                        }
                    } else {
                        mostrar_cuadro('E', 'Error al actualizar workflow', data.resultado);
                        return;
                    }
                });
            } else {
                mostrar_error("Tipo de objeto de invocación no implementado");
            }
        } else {
            mostrar_cuadro('E', 'Error', data.resultado);
            return;
        }
    });
}

function guardar_parametros(params, p_id_workflow_log, p_c_tarea){
    $.ajax({
        url:'workflow_general/php/guardar_params_tarea.php',
        type:"POST",
        data:{
            p_id_workflow_log: p_id_workflow_log,
            p_c_tarea: p_c_tarea,
            p_params: params
        },
        dataType:'json'
    }).done(function(data) {
        if(data.resultado != 'OK'){
            mostrar_cuadro('E', 'Error', data.resultado);
            return;
        }
    });
}

function actualizar_tarea_workflow(p_id_workflow_log, p_c_tarea, p_c_estado, p_n_duracion, p_m_calcula_dur){
    $.ajax({
        url:'workflow_general/php/actualizar_estado_tarea.php',
        type:"POST",
        data:{
            p_id_workflow_log: p_id_workflow_log,
            p_c_tarea: p_c_tarea,
            p_c_estado: p_c_estado,
            p_n_duracion: p_n_duracion,
            p_m_calcula_dur: p_m_calcula_dur
        },
        dataType:'json'
    }).done(function(data) {
        if(data.resultado == 'OK'){
            if(p_c_estado == 'R'){
                $('#workflow_grid').trigger('reloadGrid');
            }
        } else {
            mostrar_cuadro('E', 'Error al actualizar workflow', data.resultado);
            return;
        }
    });
}

function monitorear_estado_job(p_id_workflow_log, p_c_tarea, p_obj_invocar, porcentaje_anterior, prog_id){
    $.ajax({
        url:'workflow_general/php/estado_job.php',
        type:"POST",
        data:{
            p_id_workflow_log: p_id_workflow_log,
            p_c_tarea: p_c_tarea,
            p_obj_invocar: p_obj_invocar
        },
        async:true,
        dataType:'json',
        beforeSend: function(xhr, settings){}
    }).done(function(data) {
        if(data.resultado == 'OK'){
            if(data.p_estado == 'RUNNING'){
                if(data.p_porcentaje != porcentaje_anterior && data.p_porcentaje > 0){
                    porcentaje_anterior = data.p_porcentaje;
                    if(prog_id != undefined){
                        $(prog_id).progressbar({value: parseInt(porcentaje_anterior)});
                    }
                }
                setTimeout(function(){ monitorear_estado_job(p_id_workflow_log, p_c_tarea, p_obj_invocar, porcentaje_anterior, prog_id); }, 2000);
            } else {
                if(prog_id != undefined){
                    prog_id = $("#main").barraProceso({visible:false});
                }

                if(data.p_estado == 'FAILED'){
                    actualizar_tarea_workflow(p_id_workflow_log, p_c_tarea, 'P', 0, 'N');
                    mostrar_cuadro('E', 'Error', 'Ocurrió un error inesperado al ejecutar el job');
                } else if(data.p_mensaje_error){
                    actualizar_tarea_workflow(p_id_workflow_log, p_c_tarea, 'P', 0, 'N');
                    mostrar_cuadro('I', 'El job no pudo finalizar', data.p_mensaje_error);
                } else {
                    actualizar_tarea_workflow(p_id_workflow_log, p_c_tarea, 'R', 0, 'S');
                    mostrar_cuadro('S', 'El job terminó correctamente', '');
                }
            }
        } else {
            mostrar_cuadro('E', 'Error al monitorear el estado del job', data.resultado);
            return;
        }
    });
}