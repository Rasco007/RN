function inicializar_eventos(){
    const nombre = document.querySelector("#d_grupo");
    nombre.addEventListener("keydown", (evento) => {
        if (evento.key == "Enter") {
            evento.preventDefault();
            return false;
        }
    });

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
        campos: {d_descrip: 'd_grupo_juicios', c_codigo: 'c_grupo_juicios', f_creacion: 'fecha_creacion', n_seleccion: 'n_seleccion', f_fin_proceso: 'fecha_finalizacion', c_usuario_fin: 'usuario_cierre'},
        keyNav: true
    });

    $('#btn_nuevo_grupo').click(function () {
        $("#modal_nuevo_grupo").modal('show');
    });

    $('#modal_nuevo_grupo').on('hidden.bs.modal', function (e) {
        $("#form_alta").validationEngine('hideAll');
        $('#form_alta :input').val(null);
    });

    $('#btn_limpiar').click(function () {
        $('#workflow_grid').jqGrid('clearGridData');
        setea_parametros('#workflow_grid', {':p_id_workflow': null});
        $('#frm_consulta :input').val(null);
        $('#frm_finalizacion :input').val(null);
        $('#btn_confirmar_proceso').attr('disabled', false);
        $('#btn_buscar').attr('disabled', false);
        $('.btn-ejecutar-workflow').attr('disabled', false);
    });

    $('#btn_guardar_grupo').click(function () {
        if($('#form_alta').validationEngine('validate')) {
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_d_grupo": $('#d_grupo').val(),
                    "id_menu": v_id_menu,
                    "n_orden": 0
                },
                dataType: 'json',
                success: function (data) {
                    $('#main').procOverlay({visible: false});
                    if (data.resultado == 'OK') {
                        mostrar_cuadro('I', 'Alta de Grupo', 'El grupo se genero correctamente.');
                        $("#modal_nuevo_grupo").modal('hide');
                        $('#fecha_creacion').val(data.p_f_creacion);
                        $('#c_grupo_juicios').val(data.p_id_grupo);
                        $('#d_grupo_juicios').val($('#d_grupo').val());
                        $('#n_seleccion').val(data.p_n_seleccion);
                    } else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    $('#btn_buscar').click(function () {
        if($('#frm_consulta').validationEngine('validate')) {
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_id_grupo": $('#c_grupo_juicios').val(),
                    "id_menu": v_id_menu,
                    "n_orden": 1
                },
                dataType: 'json',
                success: function (data) {
                    $('#main').procOverlay({visible: false});
                    if (data.resultado == 'OK') {
                        setea_parametros('#workflow_grid', {':p_id_workflow': data.p_id_workflow_log});
                        v_id_workflow_log = data.p_id_workflow_log;
                    } else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    $('#btn_confirmar_proceso').click(function () {
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                "p_id_grupo": $('#c_grupo_juicios').val(),
                "id_menu": v_id_menu,
                "n_orden": 2
            },
            dataType: 'json',
            success: function (data) {
                $('#main').procOverlay({visible: false});
                if (data.resultado == 'OK') {
                    $('#btn_confirmar_proceso').attr('disabled', true);
                    $('#btn_buscar').attr('disabled', true);
                    $('.btn-ejecutar-workflow').attr('disabled', true);
                    $('#fecha_finalizacion').val(data.p_f_fin_proceso);
                    $('#usuario_cierre').val(data.p_c_usuario_fin);
                } else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    });
}