function fun_guarda_archivo(archivo, d_archivo,tipo_proceso) {
    $('#main').procOverlay({ visible: true });
    $.ajaxFileUpload({
        url: 'incorporacion_transf/php/levantar_archivo.php?archivo=' + d_archivo,
        secureuri: false,
        fileElementId: archivo,
        dataType: 'json',
        success: function (data) {
            var resp = eval('('+data+')');
            if (resp.resultado != 'OK') {
                mostrar_error(resp.resultado);
                $('#main').procOverlay({ visible: false });
            } else {
                if (resp.filas_insertadas > 0) {
                    fun_procesa_archivo(resp.id_archivo,tipo_proceso);
                }
                else {
                    mostrar_error('El archivo seleccionado no tiene filas cargadas.');
                    $('#main').procOverlay({ visible: false });
                }
            }
        },
        error: function (data, status, e) {
            mostrar_cuadro('E', 'Error', '<p style="margin:0;" align="left">Error al subir el archivo<br /><b>Status:</b> ' + status
                + '<br /><b>Error:</b> ' + e + '</p>');
            $('#main').procOverlay({ visible: false });
        }
    });
}

function fun_procesa_archivo(id_archivo,tipo_proceso) {
    $('#main').procOverlay({ visible: true });
    $('#btn_errores').attr('disabled',false);
    flag=false;
    if(tipo_proceso == 'T'){
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_path":$('#d_path_arch_transferencias').val(),
             "p_path_c":null,
             "p_id_archivo":id_archivo,
             "id_menu":v_id_menu,
             "n_orden":0
            },
            dataType:'json',
            success: function (data) {
                $('#main').procOverlay({ visible: false });
                if (data.resultado == 'OK') {
                    flag = true;
                    mostrar_cuadro('S', 'Archivo Procesado', 'Importación finalizada con éxito.');
                    $('#cant_procesados_transf').val(data.p_cant_reg_t);
                    $('#estado_transf').val(data.p_estado);
                    $('#transf_incorporadas').val(data.p_t_incorporadas);
                    $('#transf_existentes').val(data.p_t_existentes);
                    $('#transf_err').val(data.p_t_erroneos);
                    $('#n_proceso').val(data.p_n_proceso);

                    setea_parametros('#main_grid',{
                        ':n_proceso_err': $("#n_proceso").val()
                    });
                }else {
                    mostrar_cuadro('E', 'Error archivo transferencias', data.resultado);
                }
            }
        }); 
    }
    if(tipo_proceso == 'C'){
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_path":null,
             "p_path_c":$('#d_path_arch_cuentas').val(),
             "p_id_archivo":id_archivo,
             "id_menu":v_id_menu,
             "n_orden":0
            },
            dataType:'json',
            success: function (data) {
                $('#main').procOverlay({ visible: false });
                if (data.resultado == 'OK') {
                    if(!flag){
                        mostrar_cuadro('S', 'Archivo Procesado', 'Importación finalizada con éxito.');
                    }
                    $('#cant_procesados_cuentas').val(data.p_cant_reg_c);
                    $('#estado_cuenta').val(data.p_estado_c);
                    $('#cuentas_incorporadas').val(data.p_c_incorporadas);
                    $('#cuentas_existentes').val(data.p_c_existentes);
                    $('#cuentas_err').val(data.p_c_erroneos);
                    $('#n_proceso').val(data.p_n_proceso);

                    setea_parametros('#main_grid',{
                        ':n_proceso_err': $("#n_proceso").val()
                    });
                }else {
                    mostrar_cuadro('E', 'Error archivo de cuentas', data.resultado);
                }
            }
        }); 

        $('#examinar_transferencias').click(function(){
            $('#d_path_arch_transferencias').click();
        });
        $('#d_path_arch_transferencias').change(function(){
            $('#ruta_archivo_transferencias').val( $('#d_path_arch_transferencias').val() );
        });
        $('#examinar_cuentas').click(function(){
            $('#d_path_arch_cuentas').click();
        });
        $('#d_path_arch_cuentas').change(function(){
            $('#ruta_archivo_cuentas').val( $('#d_path_arch_cuentas').val() );
        });
    }
}

function actualizar_input(){
        $('#ruta_archivo_transferencias').val( $('#d_path_arch_transferencias').val() );
        $('#ruta_archivo_cuentas').val( $('#d_path_arch_cuentas').val() );
    }