function inicializarEventos(){
    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");
    
    $('.numerico').keypress(function(tecla){
        if(tecla.charCode<48 || tecla.charCode>57){
            if(tecla.charCode !== 44 && tecla.charCode !== 46){
                return false;
            }
        }
    });

    $('#f_presentacion').val(v_f_hoy);

    $('#path_arch_recibido').change(function(){
        $('#ruta_archivo_recibido').val( $('#path_arch_recibido').val() );
        $('#f_presentacion').prop('disabled', false);
    });

    $('#examinar_recibido').click(function(){
        $('#path_arch_recibido').click();
    });

    $('#btn_explorar').click(function(){
        if($('#path_arch_recibido').val()){
            procesar_archivo('LEVANTAR_ARCHIVO_SIRPEI', 'path_arch_recibido', 'd_path_arch_recibido');
        } else{
            mostrar_cuadro('E', 'Error', 'Debe ingresar el path del directorio donde se encuentra el archivo a procesar');
            return;
        }
    });

    $('#btn_limpiar').click(function(){
        $('#path_arch_recibido').val(null);
        $('#ruta_archivo_recibido').val(null);
        $('#cant_reg').val(null);
        $('#secuencia').val(null);
        $('#d_denominacion').val(null);
        $('#estado').val(null);
        $('#n_id_disco').val(null);
        $('#f_presentacion').val(v_f_hoy);
        $('#f_presentacion').prop('disabled', true);
        $('#btn_procesar').prop('disabled', true);
        $('#btn_corregir').prop('disabled', true);
        $('#btn_explorar').prop('disabled', false);
        $('#examinar_recibido').prop('disabled', false);

        $("#fechas_grid").clearGridData();

        buscar_agente('S');

    });

    $('#btn_procesar').click(function(){
        barra_progreso(true);
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_cod_agente":v_cod_agente,
             "p_n_agente":$('#n_agente').val(),
             "p_n_agente_c":$('#n_agente_c').val(),
             "p_id_sesion":$('#id_sesion').val(),
             "p_posicion_fiscal":$('#pos_fiscal').val(),
             "p_n_id_disco":$('#n_id_disco').val(),
             "p_f_presentacion":$('#f_presentacion').val(),
             "p_d_agente":$('#d_agente').val(),
             "id_menu":v_id_menu,
             "n_orden":1
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    barra_progreso(false);
                    $('#estado').val(resp.p_estado);
                    mostrar_cuadro('I', 'Información', resp.p_mensaje_salida);
                    setea_parametros('#fechas_grid',{':p_id_sesion':$('#id_sesion').val()});
                }
                else{
                    barra_progreso(false);
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    });

    $('#btn_corregir').click(function(){
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_n_id_disco":$('#n_id_disco').val(),
             "p_id_sesion":$('#id_sesion').val(),
             "p_n_agente_c":$('#n_agente_c').val(),
             "p_f_presentacion":$('#f_presentacion').val(),
             "id_menu":v_id_menu,
             "n_orden":2
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    post_to_url('TRIBA009.php',
                    {
                        'p_n_id_disco':$('#n_id_disco').val(),
                        'p_n_comprob_rectif':null,
                        'p_n_id_menu': v_id_menu
                    },
                    'POST');
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
    });

}