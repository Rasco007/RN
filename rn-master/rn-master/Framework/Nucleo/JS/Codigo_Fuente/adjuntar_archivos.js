function armar_boton_adjuntar_archivo(p_cod_archivo,
                                      p_campo_nom_original, p_campo_path_dest,
                                      p_fun_val_req_adjunto, o_fun_arch_destino){

    $('#'+p_campo_nom_original).after(
        '<div class="div_lup">'+
        '<span class="input-group-btn " id="div_span_campo">'+
        '<button class="btn-sm btn-default" type="button" id="btn_'+p_campo_nom_original+'"><span class="glyphicon glyphicon-paperclip" aria-hidden="true"></span></button>'+
        '</span>'+
        '</div>'
    );

    $('#btn_'+p_campo_nom_original).click(function(){
        if (p_fun_val_req_adjunto != '')
            var v_resu= self[p_fun_val_req_adjunto]();

        if (v_resu) {
            $('#file_adj_archivo').val('');
            $('#id_modal_adj_archivo').modal();
            $('#d_adj_archivo').val($('#' + p_campo_nom_original).val());
            $('#adj_cod_archivo').val(p_cod_archivo);
            $('#adj_fun_arch_destino').val(o_fun_arch_destino); // Utilizado para cargar el archivo
            $('#adj_archivo_dest').val($('#' + p_campo_path_dest).val());     // Utilizado para eliminar el archivo
            $('#adj_campo_nom_original').val(p_campo_nom_original);
            $('#adj_campo_path_dest').val(p_campo_path_dest);
            $('#id_modal_adj_archivo').modal();
        }
    });
}

$('#btn_confirmar_img').click(function(){
    $('#visualizador_adjunto').modal("toggle");
    //Se triggerea el evento change por si alguna aplicación debe hacer algo cuando se modifica una imagen (ej: recargar un div que contenga dicha imagen)
    $('#'+$('#adj_campo_nom_original').val()).trigger('change');
});

$('#btn_cancelar_img').click(function(){
    $('#visualizador_adjunto').modal("toggle");
    eliminar_archivo([['BORRAR', $('#adj_archivo_dest').val()]], 'del');
    $('#id_modal_adj_archivo').modal();
});

// ---------------------------------------------------------------------------------------------------------------------
function resultadoUpload(p_oper, p_resu, p_campo_nom_original, p_campo_path_dest){
    switch(p_resu){
        case 'OK':
            if (p_oper == 'SUBIR'){
                $ext= ($archivo.substring($archivo.lastIndexOf(".")+1)).toUpperCase();
                if($ext == 'JPG' || $ext == 'PNG' || $ext == 'GIF' || $ext == 'BMP'){
                    $('#visualizador_adjunto').modal();
                    var v_d_path_img = BASEPATH + $('#adj_archivo_dest').val();
                    $('#visualizador_adjunto #visualizador_foto_adjunto').html('<img src="'+v_d_path_img+'"  width="auto" height="200px" style = "display:block;margin:auto;"/>');
                }
                $('#id_modal_adj_archivo').modal('toggle');
                $('#'+p_campo_nom_original).val($('#d_adj_archivo').val());
                $('#'+p_campo_path_dest).val($('#adj_archivo_dest').val());
            }
            else if(p_oper == 'ELIMINAR'){
                //$('#id_modal_adj_archivo').modal('toggle');
                $('#file_adj_archivo').val('');
                $('#d_adj_archivo').val('');
                $('#'+p_campo_nom_original).val('');
                $('#'+p_campo_path_dest).val('');
                //mostrar_cuadro('I', 'Atención', 'Archivo eliminado con éxito.');
            }
            break;
        default:
            mostrar_cuadro('E', 'Error', p_resu);
            break;
    }
    $('#main').procOverlay({visible:false});
}

function eliminar_archivo(p_matrix_paths, p_oper){
    //Utilizo nested functions para llamarlas en el mostrar_cuadro y poder usar los parámetros que le llegan a esta función
    //Esta primera función se llama si el usuario selecciona No en el mostrar cuadro, es decir que no desea borrar el archivo
    var v_func_no_borrar = function llamar_eliminar_archivo(){
        eliminar_archivo(p_matrix_paths, p_oper);
    }
    //Esta función se llama si el usuario selecciona Sí en el mostrar cuadro, es decir que el usuario quiere borrar el archivo
    var v_func_borrar = function borrar_archivo_llamar_eliminar_archivo(){
        form_adjuntar_submit();
        eliminar_archivo(p_matrix_paths, p_oper);
    }
    //Verifico que la matriz tenga elementos
    if(p_matrix_paths.length != 0){
        //Saco el primer elemento de la matriz (en JS se maneja como un array de arrays, asi que saco el primer array)
        var v_vector = p_matrix_paths.pop();
        var p_m_borrar = v_vector[0];
        var p_d_path = v_vector[1];
        if(p_d_path != ''){
            $('#oper').val('ELIMINAR');
            $('#adj_archivo_dest').val(p_d_path);
            if(p_m_borrar == 'PREGUNTAR'){
                var v_d_mensaje;
                if(p_oper == 'edit'){
                    v_d_mensaje = 'El archivo nuevo que seleccionó es distinto al anterior. ¿Desea borrar el archivo físico anterior?';
                }
                else{
                    var v_d_nombre_archivo = p_d_path.substring(p_d_path.lastIndexOf('/')+1);
                    v_d_mensaje = '¿Desea borrar el archivo físico "'+ v_d_nombre_archivo +'" asociado al registro que acaba de eliminar?';
                }
                mostrar_cuadro('C', 'Atención', v_d_mensaje, v_func_borrar, v_func_no_borrar);
            }
            else{
                if(p_m_borrar == 'BORRAR'){
                    form_adjuntar_submit();
                }
                eliminar_archivo(p_matrix_paths, p_oper);   
            }
        }
    }   
}

// ---------------------------------------------------------------------------------------------------------------------
$(document).ready(function() {
    $('#bt_adj_examinar').click(function(){
        $('#file_adj_archivo').click();
    });

    //-----------------------------------------------------------------
    $('#file_adj_archivo').change(function(){
        $path= $(this).val();
        $archivo= ($path.substring($path.lastIndexOf("\\")+1));
        $('#d_adj_archivo').val($archivo);
    });


    //-----------------------------------------------------------------
    $('#bt_adj_eliminar').click(function(){
        $archivo = $('#d_adj_archivo').val();
        if ( $archivo == ''){
            mostrar_cuadro('E', 'Error', 'No hay ningún archivo cargado.');
            return false;
        }
        v_input_nomb_original = $('#adj_campo_nom_original').val();
        $('#id_modal_adj_archivo').modal('hide');
        mostrar_cuadro('C', 'Advertencia', '¿Seguro que desea eliminar el archivo: '+ $archivo +'?',
			function(){
				$('#file_adj_archivo').val(''); 
				$('#d_adj_archivo').val('');
				$('#'+v_input_nomb_original).val('').trigger('change');
			},// Función por Aceptar (sube archivo)
            function(){
				$('#id_modal_adj_archivo').modal();
			},// Función por Cancelar
            400, 200);
    });

    //-----------------------------------------------------------------
    $('#bt_adj_submit').click(function(){
        $archivo = $('#file_adj_archivo').val();
        v_campo= $('#adj_campo_nom_original').val();
        if ( $('#'+v_campo).val() != ''){
            if($archivo == ''){
                mostrar_cuadro('I', 'Atención', 'No ingresó un archivo distinto al que seleccionó.');
                return false;
            }
        }
        else if($archivo == ''){
            mostrar_cuadro('E', 'Error', 'No ha seleccionado ningún archivo para subir');
            return false;
        }

        $('#oper').val('SUBIR');
        $.ajax({
            url: FUNCIONES_BASEPATH+"adjuntar_archivos_val.php",
            type: "POST",
            async: true,
            data: {"oper":'VAL_REQ',
                   "cod_archivo": $('#adj_cod_archivo').val(),
                  },
            success: function(data) {
                var ret = eval('(' +data+ ')');
                $tamaño_max_mb= ret.tam_mb;
                $ext_permitidas= ret.extensiones;


                // Verif que haya datos para el cod_archivo indicado
                if ($tamaño_max_mb == null || $ext_permitidas == null){
                    mostrar_cuadro('E', 'Error', 'No se pudo encontrar la parametrización del código de archivo: ' + $('#adj_cod_archivo').val() );
                    return false;
                }


                // Validando tamaño del archivo
                var input = document.getElementById('file_adj_archivo');
                $tamaño= input.files[0].size / 1024 / 1024;
                if ($tamaño > $tamaño_max_mb) {
                    var aux = Math.round($tamaño * 10) / 10;
                    mostrar_cuadro('E', 'Error', 'El tamaño del archivo (' + aux + ' MB) excede el permitido de hasta ' +$tamaño_max_mb+ ' MB.');
                    return false;
                }


                // Validando extensiones
                $ext= ($archivo.substring($archivo.lastIndexOf(".")+1)).toUpperCase();
                $ext_permitidas_array= $ext_permitidas.split(';');
                if ($ext_permitidas_array.indexOf($ext) == -1){
                    mostrar_cuadro('E', 'Error', 'El archivo (' +$ext+ ') no es del tipo permitido: ' + $ext_permitidas_array.toString());
                    return false;
                }

                // Invocando a la función que determina el path relativo y nombre del archivo con el que ser guarda en el servidor
                // Si la función devuelve TRUE, se veririca si el archivo ya existe
                $fun_nom_arch_det= $('#adj_fun_arch_destino').val();
                if ( self[$fun_nom_arch_det]() ) {

                    $.ajax({
                        url: FUNCIONES_BASEPATH+"adjuntar_archivos_val.php",
                        type: "POST",
                        async: true,
                        data: {"oper":'ARCH_EXISTENTE',
                               "cod_archivo": $('#adj_cod_archivo').val(),
                               "archivo_dest": $('#adj_archivo_dest').val()
                              },
                        success: function(data) {
                            var ret = eval('(' +data+ ')');
                            $('#adj_archivo_dest').val(ret.path_completo);
    
                            if  (ret.existe) {
                                $('#id_modal_adj_archivo').modal('hide');
                                mostrar_cuadro('C', 'Archivo Existente', 'El archivo seleccionado ya existe en el servidor.<br/> ¿Desea Reemplazarlo?',
                                               function(){
													$('#id_modal_adj_archivo').modal();
													form_adjuntar_submit();
											   },// Función por Aceptar (sube archivo)
                                               function(){
													$('#id_modal_adj_archivo').modal();
												},// Función por Cancelar
                                               400, 200);
                            }
                            else{
                                // Sube Archivo
                                form_adjuntar_submit();
                            }
                        }
                    });
                };
            }
        });
    });

});

function form_adjuntar_submit(){
    $('#main').procOverlay({visible:true});
    document.getElementById("frm_adjuntar").submit();
}