function fun_guarda_archivo(archivo, d_archivo, m_archivo) {
    $('#main').procOverlay({ visible: true });
    $.ajaxFileUpload({
        url: 'contrib_objetos_juicios/php/levantar_archivo.php?archivo=' + d_archivo + '&marca=' + m_archivo,
        secureuri: false,
        fileElementId: archivo,
        dataType: 'json',
        success: function (data) {
            let resp = JSON.parse(data);

            if (resp.resultado != 'OK') {
                mostrar_error(resp.resultado);
                $('#main').procOverlay({ visible: false });
            } else {
                if (resp.filas_insertadas > 0) {
                    mostrar_cuadro('C',
                        'Advertencia',
                        'El proceso procederá a eliminar definitivamente los datos importados en el archivo Excel que posean la marca "N" en la columna "Incluir en Juicio". ¿Desea continuar?.',
                        function () {
                            fun_procesa_archivo(resp.id_archivo, resp.codigo_archivo);
                        });
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

function fun_procesa_archivo(id_archivo, codigo_archivo) {
    if (id_archivo == null){
        mostrar_cuadro('E', 'Error', 'Debe subir un archivo a procesar.');
    } else {
        $('#main').procOverlay({ visible: true });
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            async: false,
            data: {
                'p_id_archivo': id_archivo,
                'p_c_archivo': codigo_archivo,
                'p_id_grupo': $('#c_grupo_juicios').val(),
                "id_menu": id_menu,
                'n_orden': 0
            },
            dataType: 'json',
            success: function (data) {
                $('#main').procOverlay({ visible: false });
                if (data.resultado == 'OK') {
                    mostrar_cuadro('S', 'Archivo Procesado', 'Importación finalizada con éxito.', '', '', 400, 200);
                    $('#main_grid').trigger("reloadGrid");
                    $('#d_imagen_diag').val(null);
                    $("#modal_levantar").modal('hide');
                }else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                }
            }
        });
    }
}

function actualizar_checkboxes(){
    contribuyentes.forEach(id_cuenta_emerix => {
        let checkbox = document.getElementById(id_cuenta_emerix);
        if(checkbox != null){
            checkbox.checked= true;
        }
    });
}

function to_string(contribuyentes){
    let string = '';
    contribuyentes.forEach(contrib => {
        string += contrib + '|';
    });
    return string;
}

function incluir_excluir_juicios(p_marca){
    let contribuyentes_a_procesar = to_string(contribuyentes);
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_contribs_a_procesar": contribuyentes_a_procesar,
            "p_marca": p_marca,
            "p_id_grupo": $('#c_grupo_juicios').val(),
            "id_menu": v_id_menu,
            "n_orden": 1
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#main_grid').trigger("reloadGrid");
                contribuyentes = [];
                actualizar(contribuyentes_a_procesar);
                mostrar_confirmacion('Operación realizada con éxito.');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function actualizar(contribuyentes_a_procesar){
    let contribs = contribuyentes_a_procesar.split('|');
    for (let i = 0; i < contribs.length; i++){
        let contrib = document.getElementById(contribs[i]);
        if(contribs[i] != '' && contrib != null){
            contrib.checked = false;
            contrib.disabled = true;
        }
    }
}