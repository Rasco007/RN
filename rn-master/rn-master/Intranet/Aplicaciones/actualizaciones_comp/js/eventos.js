function inicializarEventos() {
    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");


    $('#btn_compensaciones').click(()=>validar_jobs(function(){
        if(!validar_nulos_desde_comp() || !validar_nulos_hasta_comp() || !validar_anio_cuota_comp()){
            return;
        }

        var c_tipo = $('input[name=c_tipo]:checked').val();

        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_c_tributo": p_tributo,
             "p_c_concepto": p_concepto,
             "p_n_anio_desde": $('#n_anio_desde').val(),
             "p_n_anio_hasta": $('#n_anio_hasta').val(),
             "p_n_cuota_desde": $('#n_cuota_desde').val(),
             "p_n_cuota_hasta": $('#n_cuota_hasta').val(),
             "p_n_anio_masiv":p_anio_masiv,
             "p_n_cuota_masiv":p_cuota_masiv,
             "p_c_tipo": c_tipo,
             "id_menu":v_id_menu,
             "n_orden":0
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    switch(c_tipo){
                        case 'nc_normal':
                            $('#d_estado').val('Generando Compensaciones Normales');
                            break;
                        case 'nc_pago_anual':
                            $('#d_estado').val('Generando Compensaciones Pago Anual');
                            break;
                        case 'nc_pago_anual_comp':
                            $('#d_estado').val('Generando Compensaciones Pago Anual Comp');
                            break;
                        case 'nc_pago_anual_bis':
                            $('#d_estado').val('Generando Compensaciones Pago Anual Bis');
                            break;
                        case 'nc_fruti':
                            $('#d_estado').val('Generando Compensaciones Fruticultores');
                            break;
                        case 'nc_linea_sur':
                            $('#d_estado').val('Generando Compensaciones Linea Sur');
                            break;
                        case 'nc_saldogral':
                            $('#d_estado').val('Generando Compensaciones Saldo General');
                            break;   
                        case 'nc_saldogral_comp':
                            $('#d_estado').val('Generando Compensaciones Saldo General Comp');
                            break; 
                        case 'nc_saldo_interes':
                            $('#d_estado').val('Generando Compensaciones Saldo Interés');
                            break; 
                        default:
                            $('#d_estado').val('');
                    }
                  
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    }));

    $('#btn_actualizar').click(()=>validar_jobs(function(){
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_n_anio_masiv": p_anio_masiv,
             "p_n_cuota_masiv": p_cuota_masiv,
             "id_menu": v_id_menu,
             "n_orden":1
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    $('#d_estado').val('Actualizando Mat. View...');
                    mostrar_cuadro('I', 'Información', 'TOME NOTA DEL NOMBRE DEL PROCESO PARA MONITOREO: ' + data.p_nombre_job);
                    $('#nom_job').val(data.p_nombre_job);
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    }));
        

    $('#btn_verificacion').click(function(){
        if(!validar_nulos_desde_comp()){
            return;
        }
        setea_parametros('#compensaciones_grid',{':p_c_tributo': p_tributo, ':p_c_concepto': p_concepto, ':p_n_anio': p_anio_masiv, ':p_n_cuota': p_cuota_masiv, ':p_n_anio_desde': $('#n_anio_desde').val(), ':p_n_cuota_desde': $('#n_cuota_desde').val()});
    });

    $('#btn_tiempos').click(function(){
        $.ajax({
            url:'actualizaciones_comp/php/traer_detalles_jobs.php',
            type:"POST",
            data:{
                p_cod_job: 'EM',
                "p_n_anio_masiv": p_anio_masiv,
                "p_n_cuota_masiv": p_cuota_masiv,
            },
            dataType:'json'
        }).done(function(data) {
            if(data.resultado == 'OK'){
                if(data.datos.length == 0){
                    mostrar_cuadro('I', 'Información', 'No se encontro ningun proceso ejecutandose en la base');
                    return;
                }
    
                var jobs_fallidos = data.datos.filter(function(row) {
                    return row['STATUS'] == 'FAILED';
                });
    
                if( jobs_fallidos.length > 0){
                    mostrar_cuadro('E', 'Error', 'Hay procesos fallidos en la base');
                    return;
                }

                monitorear_estado_jobs_em(data.datos)
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        });
    });
}