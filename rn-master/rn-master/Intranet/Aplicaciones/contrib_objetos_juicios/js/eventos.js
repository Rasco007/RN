function inicializar_eventos(){
    if(p_id_workflow_log != '' && p_c_tarea != ''){
        actualizar_tarea_workflow(p_id_workflow_log, p_c_tarea, 'R', 0, 'N');
        $('#n_seleccion').val(p_n_seleccion);
        $('#c_grupo_juicios').val(p_id_grupo);
        $('#d_grupo_juicios').val(p_d_grupo);
        $('#fecha_creacion').val(fecha_creacion);
    }

    $("#lupa_grupo").lupa_generica({
        id_lista: id_lista_grupos,
        titulos: ['Codigo', 'Descripción', 'Fecha Creación', 'Selección', 'Fecha Fin', 'Usuario Fin'],
        grid: [
            {index: 'c_codigo', width: 70},
            {index: 'd_descrip', width: 600},
            {index: 'f_creacion', width: 600, hidden: true},
            {index: 'n_seleccion', width: 600, hidden: true},
            {index: 'f_fin_proceso', width: 600, hidden: true},
            {index: 'c_usuario_fin', width: 600, hidden: true}
        ],
        caption: 'Lista de Grupos',
        filtroNull: false,
        filtros: [],
        campos: {d_descrip: 'd_grupo_juicios', c_codigo: 'c_grupo_juicios', f_creacion: 'fecha_creacion', n_seleccion: 'n_seleccion'},
        keyNav: true
    });

    $('#btn_buscar').click(function () {
        if($('#frm_consulta').validationEngine('validate')) {
            setea_parametros('#main_grid', {':p_id_grupo': $('#c_grupo_juicios').val()});
        }
    });

    $('#btn_limpiar').click(function () {
        setea_parametros('#main_grid', {':p_id_grupo': null});
        $('#main_grid').jqGrid('clearGridData');
        $('#frm_consulta :input').val(null);
        $('#frm_finalizacion :input').val(null);
        $("#frm_consulta").validationEngine('hideAll');
        $("#frm_finalizacion").validationEngine('hideAll');
    });

    $('#btn_levantar').click(function() {
        if($("#frm_finalizacion").validationEngine('validate')){
            if($("#frm_consulta").validationEngine('validate')){
                $("#modal_levantar").modal('show');
            }
        }
    });

    $('#btn_excel_contrib').click(function() {
        fun_guarda_archivo('d_imagen_diag','imagen_diag', 1);
    });

    $('#btn_excel_contrib_obj').click(function() {
        fun_guarda_archivo('d_imagen_diag','imagen_diag', 2);
    });

    $('#btn_excel_rpi').click(function() {
        fun_guarda_archivo('d_imagen_diag','imagen_diag', 3);
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

    $('#btn_contrib_obj').click(function() {
        post_to_url('contrib_objetos_juicios/php/exportar_archivo.php',
            {
                'p_id_grupo':$('#c_grupo_juicios').val(),
                'p_n_id_menu': v_id_menu,
                'p_c_archivo': 2,
                'n_grid':0
            },
            'POST');
    });

    $('#btn_registros_rpi').click(function() {
        post_to_url('contrib_objetos_juicios/php/exportar_archivo.php',
            {
                'p_id_grupo':$('#c_grupo_juicios').val(),
                'p_n_id_menu': v_id_menu,
                'p_c_archivo': 3,
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
                    "id_menu": id_menu,
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