function inicializar_eventos(){
    $('#anio_desde').mask('9999');
    $('#anio_hasta').mask('9999');

    $("#btn_lupa_representante").lupa_generica({
        id_lista: id_lista_asesores,
        titulos: ['Cuit', 'Denominación'],
        grid: [
            {index: 'n_cuit', width: 130},
            {index: 'd_denominacion', width: 450}
        ],
        caption: 'Lista de Cuits de Representante',
        filtros: [],
        filtrosTitulos:[],
        campos: {n_cuit: 'n_cuit_represen', d_denominacion: 'd_denominacion_represen'},
        keyNav: true
    });

    $("#btn_lupa_patrocinador").lupa_generica({
        id_lista: id_lista_asesores,
        titulos: ['Cuit', 'Denominación'],
        grid: [
            {index: 'n_cuit', width: 130},
            {index: 'd_denominacion', width: 450}
        ],
        caption: 'Lista de Cuits de Patrocinadores',
        filtros: [],
        filtrosTitulos:[],
        campos: {n_cuit: 'n_cuit_patro', d_denominacion: 'd_denominacion_patro'},
        keyNav: true
    });

    $(".nav-item").click(function () {
        $(window).resize();
    });

    actualizar_tarea_workflow(p_id_workflow_log, p_c_tarea, 'R', 0, 'N');
    $('#c_grupo_asesores').val(p_id_grupo);
    $('#d_grupo_asesores').val(p_d_grupo);
    $('#c_grupo_juicios').val(p_id_grupo);
    $('#d_grupo_juicios').val(p_d_grupo);

    $('#btn_guardar_coeficiente').click(function () {
        if($('#form_alta').validationEngine('validate')) {
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                async: false,
                data: {
                    'p_n_cuit_asesor_legal': limpia_cuit($('#n_cuit_asesor_legal').val()),
                    'p_cant_juicios_con_cta_banc': $('#cant_juicios_con_cta_banc').val(),
                    'p_cant_juicios_sin_cta_banc': $('#cant_juicios_sin_cta_banc').val(),
                    'p_puntaje_final' : $('#puntaje_final').val(),
                    'p_coeficiente_manual': $('#n_coeficiente').val(),
                    "id_menu": id_menu,
                    'n_orden': 0
                },
                dataType: 'json',
                success: function (data) {
                    $('#main').procOverlay({ visible: false });
                    if (data.resultado == 'OK') {
                        mostrar_confirmacion('Edición realizada con éxito.');
                        $('#asesores_grid').trigger("reloadGrid");
                        $("#modal_editar").modal('hide');
                    }else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                    }
                }
            });
        }
    });

    $('#btn_guardar_juicio').click(function () {
        if($('#form_edit_juicio').validationEngine('validate')) {
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                async: false,
                data: {
                    'p_n_cuit_representante_fiscal': limpia_cuit($('#n_cuit_represen').val()),
                    'p_n_cuit_patrocinante': limpia_cuit($('#n_cuit_patro').val()),
                    'p_n_cant_firmantes': $('#firmantes').val(),
                    'p_id_boleta' : $('#id_boleta_deuda').val(),
                    "id_menu": id_menu,
                    'n_orden': 4
                },
                dataType: 'json',
                success: function (data) {
                    $('#main').procOverlay({ visible: false });
                    if (data.resultado == 'OK') {
                        mostrar_confirmacion('Edición realizada con éxito.');
                        $('#juicios_grid').trigger("reloadGrid");
                        $("#modal_editar_juicio").modal('hide');
                    }else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                    }
                }
            });
        }
    });

    $('#btn_calcular').click(function () {
        $("#modal_calcular_puntaje").modal('show');
    });

    $('#btn_calcular_puntaje').click(function () {
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            async: false,
            data: {
                "p_anio_desde": $('#anio_desde').val(),
                "p_anio_hasta": $('#anio_hasta').val(),
                "id_menu": id_menu,
                'n_orden': 3
            },
            dataType: 'json',
            success: function (data) {
                $('#main').procOverlay({ visible: false });
                if (data.resultado == 'OK') {
                    mostrar_confirmacion('Operación realizada con éxito.');
                    $('#asesores_grid').trigger("reloadGrid");
                    $("#modal_calcular_puntaje").modal('hide');
                }else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                }
            }
        });
    });

    $('#btn_recalcular').click(function () {
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                async: false,
                data: {
                    "p_aux": null,
                    "id_menu": id_menu,
                    'n_orden': 1
                },
                dataType: 'json',
                success: function (data) {
                    $('#main').procOverlay({ visible: false });
                    if (data.resultado == 'OK') {
                        mostrar_confirmacion('Operación realizada con éxito.');
                        $('#asesores_grid').trigger("reloadGrid");
                    }else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                    }
                }
            });
    });

    $('#btn_distribuir').click(function () {
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                async: false,
                data: {
                    "p_id_grupo": p_id_grupo,
                    "p_n_seleccion": p_n_seleccion,
                    "id_menu": id_menu,
                    'n_orden': 2
                },
                dataType: 'json',
                success: function (data) {
                    $('#main').procOverlay({ visible: false });
                    if (data.resultado == 'OK') {
                        mostrar_confirmacion('Operación realizada con éxito.');
                        $('#asesores_grid').trigger("reloadGrid");
                    }else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                    }
                }
            });
    });

    $('#btn_asignar').click(function () {
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            async: false,
            data: {
                "p_id_grupo": p_id_grupo,
                "p_n_seleccion": p_n_seleccion,
                "id_menu": id_menu,
                'n_orden': 2
            },
            dataType: 'json',
            success: function (data) {
                $('#main').procOverlay({ visible: false });
                if (data.resultado == 'OK') {
                    mostrar_confirmacion('Operación realizada con éxito.');
                    $('#juicios_grid').trigger("reloadGrid");
                }else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                }
            }
        });
    });
}