function inicializar_eventos(){
    const nombre = document.querySelector("#n_operativo");
    nombre.addEventListener("keydown", (evento) => {
        if (evento.key == "Enter") {
            evento.preventDefault();
            return false;
        }
    });

    $('#btn_buscar').click(function () {
        filtros_no_nativos_ar['main_grid'] = [];
        if ($('#frm_consulta').validationEngine('validate')){
            setea_parametros('#main_grid',
                {':p_n_operativo':$('#n_operativo').val(),
                'p_c_inconsistencia': $('#tipo_inconsistencia').val(),
                'p_c_estado':$('#estado').val(),
                'p_c_departamento': $('#departamento').val()});
            //seteamos los filtros para imprimir el PDF y el Excel.
            if($('#n_operativo').val() != ''){
                filtros_no_nativos_ar['main_grid'].push('Nro. Operativo: ' + $('#n_operativo').val());
            }
            if($('#tipo_inconsistencia').val() != ''){
                filtros_no_nativos_ar['main_grid'].push('Tipo Inconsistencia: ' + $('#tipo_inconsistencia option:selected').text());
            }
            if($('#estado').val() != ''){
                filtros_no_nativos_ar['main_grid'].push('Estado: ' + $('#estado option:selected').text());
            }
            if($('#departamento').val() != ''){
                filtros_no_nativos_ar['main_grid'].push('Departamento: ' + $('#departamento option:selected').text());
            }
        }
    });

    $("#btn_plan_fis").lupa_generica({
        id_lista: id_lista_planes,
        titulos: ['Código', 'Descripción', 'Tipo Plan', 'Año'],
        grid: [
            {index: 'id_plan_fis', width: 60},
            {index: 'd_plan', width: 280},
            {index: 'tipo_plan', width: 150},
            {index: 'n_anio', width: 70}
        ],
        caption: 'Lista de Planes',
        filtroNull: false,
        sortname:'n_anio',
        sortorder:'desc',
        campos: {id_plan_fis: 'id_plan_fis_add', d_plan: 'd_plan_fis_add'},
        keyNav: true,
        onClose(){
            $('#d_programa_fis_add').val(null);
            $('#n_programa_fis_add').val(null);
        }
    });

    $("#btn_plan_fis_edit").lupa_generica({
        id_lista: id_lista_planes,
        titulos: ['Código', 'Descripción', 'Tipo Plan', 'Año'],
        grid: [
            {index: 'id_plan_fis', width: 60},
            {index: 'd_plan', width: 280},
            {index: 'tipo_plan', width: 150},
            {index: 'n_anio', width: 70}
        ],
        caption: 'Lista de Planes',
        filtroNull: false,
        sortname:'n_anio',
        sortorder:'desc',
        campos: {id_plan_fis: 'id_plan_fis_edit', d_plan: 'd_plan_fis_edit'},
        keyNav: true,
        onClose(){
            $('#d_programa_fis_edit').val(null);
            $('#n_programa_fis_edit').val(null);
        }
    });

    $("#btn_programa_fis").lupa_generica({
        id_lista: id_lista_programas,
        titulos: ['Código', 'Descripción'],
        grid: [
            {index: 'n_programa_fis', width: 130},
            {index: 'd_programa', width: 450}
        ],
        caption: 'Lista de Programas',
        filtros: ['#id_plan_fis_add'],
        filtrosTitulos:['Plan de Fiscalización'],
        campos: {n_programa_fis: 'n_programa_fis_add', d_programa: 'd_programa_fis_add'},
        keyNav: true
    });

    $("#btn_programa_fis_edit").lupa_generica({
        id_lista: id_lista_programas,
        titulos: ['Código', 'Descripción'],
        grid: [
            {index: 'n_programa_fis', width: 130},
            {index: 'd_programa', width: 450}
        ],
        caption: 'Lista de Programas',
        filtros: ['#id_plan_fis_edit'],
        filtrosTitulos:['Plan de Fiscalización'],
        campos: {n_programa_fis: 'n_programa_fis_edit', d_programa: 'd_programa_fis_edit'},
        keyNav: true
    });

    $('#btn_limpiar').click(function(){
        $('#n_operativo').val(null);
        $('#tipo_inconsistencia').val(null);
        $('#estado').val(null);
        $("#frm_consulta").validationEngine('hideAll');
        setea_parametros('#main_grid',{':p_n_operativo':null,'p_c_inconsistencia': null, 'p_c_estado':null, 'p_c_departamento': null});
        filtros_no_nativos_ar['main_grid'] = [];
        setea_parametros('#detail_grid',{':p_n_operativo':null});
        filtros_no_nativos_ar['detail_grid'] = [];
        $('#seccion_2').hide();
    });

    //Funcionalidad modal alta operativo
    $('#modal_add_operativo').on('hidden.bs.modal', function (e) {
        $("#form_alta").validationEngine('hideAll');
        $('#modal_add_operativo input').val(null);
        $('#modal_add_operativo .limpiar').val(null);
    });

    if($('#c_departamento_add').val() == ';OFI;'){
        $('#div_tributo_add').attr('hidden', false);
        $('#div_procedimiento_add').attr('hidden', false);
        $('#div_plan_add').attr('hidden', false);
        $('#div_programa_add').attr('hidden', false);
    }

    if($('#c_departamento_edit').val() == ';OFI;'){
        $('#div_tributo_edit').attr('hidden', false);
        $('#div_procedimiento_edit').attr('hidden', false);
        $('#div_plan_edit').attr('hidden', false);
        $('#div_programa_edit').attr('hidden', false);
    }

    $('#n_periodo_desde_add').mask('9999/99');
    $('#n_periodo_desde_add').change(function () {
        if ($(this).val().length != 7){
            mostrar_error("Formato de Periodo Desde incorrecto.");
            $(this).val(null);
        }
    });
    $('#n_periodo_hasta_add').mask('9999/99');
    $('#n_periodo_hasta_add').change(function () {
        if ($(this).val().length != 7){
            mostrar_error("Formato de Periodo Hasta incorrecto.");
            $(this).val(null);
        }
    });

    $('#btn_guardar_operativo').click(function () {
        if($('#form_alta').validationEngine('validate')) {
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_c_departamento": $('#c_departamento_add').val(),
                    "p_d_titulo": $('#d_titulo_add').val(),
                    "p_n_periodo_desde": desenmascararPeriodo($('#n_periodo_desde_add').val()),
                    "p_n_periodo_hasta": desenmascararPeriodo($('#n_periodo_hasta_add').val()),
                    "p_n_inconsistencia": $('#c_inconsistencia_add').val(),
                    "p_c_tributo": $('#c_tributo_add').val(),
                    "p_id_plan_fis": $('#id_plan_fis_add').val(),
                    "p_n_programa_fis": $('#n_programa_fis_add').val(),
                    "p_c_procedimiento": $('#c_procedimiento_add').val(),
                    "p_c_formato_archivo": $('#c_formato_add').val(),
                    "p_id_plantilla_mail": $('#plantilla_mail_add').val(),
                    "p_oper": 'add',
                    "id_menu": v_id_menu,
                    "n_orden": 0
                },
                dataType: 'json',
                success: function (data) {
                    $('#main').procOverlay({visible: false});
                    if (data.resultado == 'OK') {
                        mostrar_cuadro('I', 'Alta de Operativo', 'El alta de operativo finalizo correctamente.');
                        $("#modal_add_operativo").modal('hide');
                        $("#main_grid").trigger('reloadGrid');
                        $('#seccion_2').hide();
                    } else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    //Funcionalidad modal edit operativo
    $('#modal_edit_operativo').on('hidden.bs.modal', function (e) {
        $("#form_edicion").validationEngine('hideAll');
    });

    $('#n_periodo_desde_edit').mask('9999/99');
    $('#n_periodo_desde_edit').change(function () {
        if ($(this).val().length != 7){
            mostrar_error("Formato de Periodo Desde incorrecto.");
            $(this).val(null);
        }
    });
    $('#n_periodo_hasta_edit').mask('9999/99');
    $('#n_periodo_hasta_edit').change(function () {
        if ($(this).val().length != 7){
            mostrar_error("Formato de Periodo Hasta incorrecto.");
            $(this).val(null);
        }
    });

    $('#btn_editar_operativo').click(function () {
        if($('#form_edicion').validationEngine('validate')) {
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_id_operativo_fiscalizacion": $('#n_operativo_edit').val(),
                    "p_d_titulo": $('#d_titulo_edit').val(),
                    "p_n_periodo_desde": desenmascararPeriodo($('#n_periodo_desde_edit').val()),
                    "p_n_periodo_hasta": desenmascararPeriodo($('#n_periodo_hasta_edit').val()),
                    "p_n_inconsistencia": $('#c_inconsistencia_edit').val(),
                    "p_c_tributo": $('#c_tributo_edit').val(),
                    "p_id_plan_fis": $('#id_plan_fis_edit').val(),
                    "p_n_programa_fis": $('#n_programa_fis_edit').val(),
                    "p_c_procedimiento": $('#c_procedimiento_edit').val(),
                    "p_c_formato_archivo": $('#c_formato_edit').val(),
                    "p_id_plantilla_mail": $('#plantilla_mail_edit').val(),
                    "p_oper": 'edit',
                    "id_menu": v_id_menu,
                    "n_orden": 0
                },
                dataType: 'json',
                success: function (data) {
                    $('#main').procOverlay({visible: false});
                    if (data.resultado == 'OK') {
                        mostrar_cuadro('I', 'Edición de Operativo', 'La edición del operativo finalizo correctamente.');
                        $("#modal_edit_operativo").modal('hide');
                        $("#main_grid").trigger('reloadGrid');
                        $('#seccion_2').hide();
                    } else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    //Funcionalidad boton administrar casos

    $('#btn_administrar').click(function () {
        var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
        if (!rowid){
            mostrar_validacion('Debe seleccionar un registro de la grilla');
        }else{
            var rowid_cell = $("#main_grid").getGridParam('selrow');
            post_to_url("carga_casos.php", {
                    'p_n_id_menu': 100038,
                    'p_n_operativo':$("#main_grid").getCell(rowid_cell,'id_operativo_fiscalizacion'),
                    'p_periodo_desde': $("#main_grid").getCell(rowid_cell,'n_periodo_desde'),
                    'p_periodo_hasta': $("#main_grid").getCell(rowid_cell,'n_periodo_hasta'),
                    'p_d_tipo_inconsistencia': $("#main_grid").getCell(rowid_cell,'d_inconsistencia'),
                    'p_c_formato_archivo': $("#main_grid").getCell(rowid_cell,'c_formato_archivo'),
                    'p_c_sector': $("#main_grid").getCell(rowid_cell,'codigo_departamento'),
                    'p_d_titulo': $("#main_grid").getCell(rowid_cell,'d_descripcion'),
                    'p_c_tributo': $("#main_grid").getCell(rowid_cell,'c_tributo'),
                    'p_id_plantilla': $("#main_grid").getCell(rowid_cell,'id_plantilla_mail')},
                "_blank","POST");
        }
    });

    //Funcionalidad boton ver errores

    $('#btn_errores').click(function () {
        var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
        if (!rowid){
            mostrar_validacion('Debe seleccionar un registro de la grilla');
        }else{
            var rowid_cell = $("#main_grid").getGridParam('selrow');
            $('#modal_errores_operativo').modal('show');
            $(window).resize();
            setea_parametros('#errores_grid',
                {':p_n_operativo':$("#main_grid").getCell(rowid_cell,'id_operativo_fiscalizacion')});
        }
    });

    //Funcionalidad boton cambiar estado

    $('#modal_estado').on('hidden.bs.modal', function (e) {
        $("#form_add_estado").validationEngine('hideAll');
    });

    $('#c_procedimiento_estado').change(function () {
        if ($('#c_procedimiento_estado').val() == '060' || $('#c_procedimiento_estado').val() == '092'){
            $('#div_expte_estado').attr('hidden', false);
        } else {
            $('#div_expte_estado').attr('hidden', true);
            $('#expte_estado').val(null);
        }
    });

    $('#c_estado_form').change(function () {
        if ($('#c_estado_form').val() == '7' && $('#c_departamento_estado').val() == ';OFI;'){
            $('#div_procedimiento_estado').attr('hidden', false);
        } else {
            $('#div_procedimiento_estado').attr('hidden', true);
            $('#div_expte_estado').attr('hidden', true);
            $('#expte_estado').val(null);
            $('#c_procedimiento_estado').val(null);
        }
    });

    $('#btn_cambiar_estado').click(function () {
        if($('#form_add_estado').validationEngine('validate')) {
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_id_operativo_fiscalizacion": $('#id_operativo_estado').val(),
                    "p_n_orden": $('#n_orden_estado').val(),
                    "p_c_estado": $('#c_estado_form').val(),
                    "p_c_procedimiento": $('#c_procedimiento_estado').val(),
                    "p_expte_gde": $('#expte_estado').val(),
                    "id_menu": v_id_menu,
                    "n_orden": 1
                },
                dataType: 'json',
                success: function (data) {
                    $('#main').procOverlay({visible: false});
                    if (data.resultado == 'OK') {
                        mostrar_cuadro('I', 'Modificación de Estado', 'El estado fue modificado correctamente.');
                        $("#modal_estado").modal('hide');
                        $("#detail_grid").trigger('reloadGrid');
                    } else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        $("#modal_estado").modal('hide');
                        return;
                    }
                }
            });
        }
    });

    //Funcionalidad boton validar

    $('#btn_validar').click(function () {
        var rowid_cell = $("#main_grid").getGridParam('selrow');
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                "p_id_operativo_fiscalizacion": $("#main_grid").getCell(rowid_cell,'id_operativo_fiscalizacion'),
                "id_menu": v_id_menu,
                "n_orden": 2
            },
            dataType: 'json',
            success: function (data) {
                $('#main').procOverlay({visible: false});
                if (data.resultado == 'OK') {
                    mostrar_cuadro('I', 'Validación de Operativo', 'Validación finalizada.');
                } else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    });

    //Funcionalidad boton cerrar

    $('#btn_cerrar').click(function () {
        var rowid_cell = $("#main_grid").getGridParam('selrow');
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                "p_id_operativo_fiscalizacion": $("#main_grid").getCell(rowid_cell,'id_operativo_fiscalizacion'),
                "id_menu": v_id_menu,
                "n_orden": 3
            },
            dataType: 'json',
            success: function (data) {
                $('#main').procOverlay({visible: false});
                if (data.resultado == 'OK') {
                    mostrar_cuadro('I', 'Cierre de Operativo', 'Cierre finalizado.');
                    $("#main_grid").trigger('reloadGrid');
                    $("#detail_grid").trigger('reloadGrid');
                } else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    });

    //Funcionalidad boton notificar

    $('#btn_notificar').click(function () {
        var rowid_cell = $("#main_grid").getGridParam('selrow');
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                "p_id_operativo": $("#main_grid").getCell(rowid_cell,'id_operativo_fiscalizacion'),
                "id_menu": v_id_menu,
                "n_orden": 4
            },
            dataType: 'json',
            success: function (data) {
                $('#main').procOverlay({visible: false});
                if (data.resultado == 'OK') {
                    mostrar_cuadro('I', 'Notificación de Operativo', 'Notificación finalizada.');
                    $("#main_grid").trigger('reloadGrid');
                    $("#detail_grid").trigger('reloadGrid');
                } else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    });
}