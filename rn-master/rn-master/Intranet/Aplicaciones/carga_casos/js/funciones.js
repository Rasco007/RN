function desenmascararPeriodo(periodo) {
    return periodo.substr(0,4).concat(periodo.substr(5,2));
}

function eliminarDetalle(p_id_operativo, p_n_orden){
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_id_operativo_fiscalizacion": p_id_operativo,
            "p_n_orden": p_n_orden,
            "p_oper": 'del',
            "id_menu": v_id_menu,
            "n_orden": 0
        },
        dataType: 'json',
        success: function (data) {
            $('#main').procOverlay({visible: false});
            if (data.resultado == 'OK') {
                mostrar_cuadro('I', 'Eliminar Caso', 'El caso se elimino correctamente.');
                $("#main_grid").trigger("reloadGrid");
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function eliminarMasivo(p_id_operativo){
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        async: false,
        data: {
            "p_id_operativo_fiscalizacion": p_id_operativo,
            "id_menu": v_id_menu,
            'n_orden': 2
        },
        dataType: 'json',
        success: function(data){
            if(data.resultado == 'OK'){
                mostrar_cuadro('I', 'Eliminar Detalle Masivo', 'El operativo se eliminó correctamente.');
                $("#main_grid").trigger("reloadGrid");
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function fun_procesa_archivo(id_archivo, codigo_archivo) {
    if (id_archivo == null && codigo_archivo == null){
        mostrar_cuadro('E', 'Error', 'Debe subir un archivo a procesar.');
    } else {
        $('#main').procOverlay({ visible: true });
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            async: false,
            data: {
                'p_id_archivo': id_archivo,
                'p_id_operativo': p_id_operativo,
                'p_c_archivo': codigo_archivo,
                "id_menu": id_menu,
                'n_orden': 1
            },
            dataType: 'json',
            success: function (data) {
                $('#main').procOverlay({ visible: false });
                if (data.resultado == 'OK') {
                    if(data.p_cant_errores > 0){
                        mostrar_cuadro('E', 'Archivo Procesado', 'La importación del archivo finalizó con errores, por favor, revise la grilla de errores en Administración de Operativos.', '', '', 400, 200);
                    } else {
                        mostrar_cuadro('S', 'Archivo Procesado', 'Importación finalizada con éxito.', '', '', 400, 200);
                    }
                    $('#main_grid').trigger("reloadGrid");
                    $('#d_imagen_diag').val(null);
                    archivos_dropzone.removeAllFiles(true);
                    p_id_archivo = null;
                    p_codigo_archivo = null;
                }else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                }
            }
        });
    }
}