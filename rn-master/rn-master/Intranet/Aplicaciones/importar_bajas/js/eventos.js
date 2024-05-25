function inicializar_eventos(){
    if(p_id_workflow_log != '' && p_c_tarea != ''){
        actualizar_tarea_workflow(p_id_workflow_log, p_c_tarea, 'R', 0, 'N');
        $('#n_seleccion').val(p_n_seleccion);
        $('#c_grupo_juicios').val(p_id_grupo);
        $('#d_grupo_juicios').val(p_d_grupo);
        $('#fecha_creacion').val(fecha_creacion);
    }

    $('#btn_levantar').click(function() {
        if($("#frm_finalizacion").validationEngine('validate')){
            if($("#frm_consulta").validationEngine('validate')){
                fun_guarda_archivo('d_imagen_diag','imagen_diag', 1);
            }
        }
    });

	
	$('#btn_contrib').click(function() {
        post_to_url('contrib_objetos_juicios/php/exportar_archivo.php',
            {
                'p_id_grupo':$('#c_grupo_juicios').val(),
                'p_n_id_menu': v_id_menu,
                'p_c_archivo': 1,
                'n_grid':0
            },
            'POST');
    });
	
	$('#btn_confirmar_seleccion').click(function() {
        if($('#frm_consulta').validationEngine('validate')) {
            $('#main').procOverlay({ visible: true });
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                async: false,
                data: {
                    'p_id_grupo': $('#c_grupo_juicios').val(),
                    'p_n_seleccion': $('#n_seleccion').val(),
                    "id_menu": v_id_menu,
                    'n_orden': 2
                },
                dataType: 'json',
                success: function (data) {
                    $('#main').procOverlay({ visible: false });
                    if (data.resultado == 'OK') {
                        mostrar_confirmacion('Confirmación realizada con éxito.');
                        $('#main_grid').trigger("reloadGrid");
                    }else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                    }
                }
            });
        }
    });
}