function inicializar_eventos() {
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

    $('#btn_buscar').click(function () {
        if($('#frm_consulta').validationEngine('validate')) {
            setea_parametros('#main_grid', {':p_id_grupo': $('#c_grupo_juicios').val()});
        }
    });

    $('#btn_limpiar').click(function () {
        setea_parametros('#main_grid', {':p_id_grupo': null});
        $('#main_grid').jqGrid('clearGridData');
        $('#frm_consulta :input').val(null);
        $("#frm_consulta").validationEngine('hideAll');
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
                    'n_orden': 0
                },
                dataType: 'json',
                success: function (data) {
                    $('#main').procOverlay({ visible: false });
                    if (data.resultado == 'OK') {
                        mostrar_confirmacion('Edición realizada con éxito.');
                        $('#main_grid').trigger("reloadGrid");
                        $("#modal_editar_juicio").modal('hide');
                    }else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                    }
                }
            });
        }
    });
}