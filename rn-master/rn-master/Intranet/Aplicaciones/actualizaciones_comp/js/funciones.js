function validar_nulos_desde_comp(){
    if($('#n_anio_desde').val() == '' || $('#n_cuota_desde').val() == ''){
        mostrar_cuadro('E', 'Error', 'Debe ingresar un año y una cuota desde');
        return false;
    } else{
        return true;
    }
}

function validar_nulos_hasta_comp(){
    if($('#n_anio_hasta').val() == '' || $('#n_cuota_hasta').val() == ''){
        mostrar_cuadro('E', 'Error', 'Debe ingresar un año y una cuota hasta');
        return false;
    } else{
        return true;
    }
}

function validar_anio_cuota_comp(){
    if( (p_anio_masiv*100 + p_cuota_masiv) <= ($('#n_anio_hasta').val()*100 + $('#n_cuota_hasta').val()) ){
        mostrar_cuadro('E', 'Error', 'El Año/Cuota Hasta no puede ser mayor o igual al Año/Cuota que se esta emitiendo');
        return false;
    } else if( (p_anio_masiv*100 + p_cuota_masiv)  <= ($('#n_anio_desde').val()*100 + $('#n_cuota_desde').val()) ){
        mostrar_cuadro('E', 'Error', 'El Año/Cuota Desde no puede ser mayor o igual al Año/Cuota que se esta emitiendo');
        return false;
    } else if( ($('#n_anio_hasta').val()*100 + $('#n_cuota_hasta').val()) < ($('#n_anio_desde').val()*100 + $('#n_cuota_desde').val()) ){
        mostrar_cuadro('E', 'Error', 'El Año/Cuota Desde no puede ser mayor al Año/Cuota Hasta');
        return false;
    } else{
        return true;
    }
}

function validar_jobs(callback){
    $.ajax({
        url:'actualizaciones_comp/php/traer_detalles_jobs.php',
        type:"POST",
        data:{
            p_cod_job: 'EM',
            p_n_anio_masiv: p_anio_masiv,
            p_n_cuota_masiv: p_cuota_masiv,
        },
        dataType:'json'
    }).done(function(data) {
        if(data.resultado == 'OK'){
            var jobs_fallidos = data.datos.filter(function(row) {
                return row['STATUS'] == 'FAILED';
            });

            if( jobs_fallidos.length > 0){
                mostrar_cuadro('E', 'Error', 'Hay procesos fallidos en la base');
                return;
            }

            var jobs_corriendo = data.datos.filter(function(row) {
                return row['STATUS'] == 'RUNNING';
            });

            if( jobs_corriendo.length > 1){
                mostrar_cuadro('E', 'Error', 'Está ejecutandose: Más de un proceso');
                return;
            } else if (jobs_corriendo.length == 1){
                mostrar_cuadro('E', 'Error', 'Está ejecutandose: ' + jobs_fallidos[0]['JOB_NAME']);
                return;
            }

            callback();
        }
        else{
            mostrar_cuadro('E', 'Error', data.resultado);
            return;
        }
    });
}

function monitorear_estado_jobs_em(estado_anterior){
    $.ajax({
        url:'actualizaciones_comp/php/traer_detalles_jobs.php',
        type:"POST",
        data:{
            p_cod_job: 'EM',
            p_n_anio_masiv: p_anio_masiv,
            p_n_cuota_masiv: p_cuota_masiv,
        },
        async:true,
        dataType:'json',
        beforeSend: function(xhr, settings){}
    }).done(function(data) {
        if(data.resultado == 'OK'){            
            var jobs_corriendo = data.datos.filter(function(row) {
                return row['STATUS'] == 'RUNNING';
            });

            if( jobs_corriendo.length > 0){
                if(jobs_corriendo[0]['JOB_NAME'].indexOf('EM_VMW_') == 0){
                    $('#d_estado').val('Actualizando Mat. View...');
                } else {
                    $('#d_estado').val('Generando Compensaciones');
                }
            }
            
            var jobs_terminados = data.datos.filter(function(row) {
                return row['STATUS'] != 'RUNNING' && estado_anterior.some(function(row2) {
                    return row2['JOB_NAME'] == row['JOB_NAME'] && row2['STATUS'] == 'RUNNING';
                });
            });

            if( jobs_terminados.length > 0){
                if(jobs_terminados[0]['STATUS'] == 'FAILED'){
                    $('#d_estado').val('El proceso ha fallado');
                } else {
                    $('#d_estado').val('Actualización Completa');
                    if(jobs_corriendo[0]['JOB_NAME'].indexOf('EM_VMW_') == 0){
                        mostrar_cuadro('I', 'Información', 'Proceso Finalizado');
                    }
                }
                return;
            }

            setTimeout(function(){ monitorear_estado_jobs_em(data.datos); }, 600000); // 10 minutos
        } else {
            mostrar_cuadro('E', 'Error Inesperado', data.resultado);
            return;
        }
    });
}