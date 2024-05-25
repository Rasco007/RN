function inicializar_grillas() {
    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Operativos" ,
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        shrinkToFit: false,
        rowList: [50, 100, 500, 1000],
        onSelectRow: function (id) {
            let v_n_operativo = $("#main_grid").getCell(id,'id_operativo_fiscalizacion');
            let v_n_periodo_desde = $("#main_grid").getCell(id,'n_periodo_desde');
            let v_n_periodo_hasta = $("#main_grid").getCell(id,'n_periodo_hasta');
            let v_c_inconsistencia = $("#main_grid").getCell(id,'c_inconsistencia');
            let v_c_tributo = $("#main_grid").getCell(id,'c_tributo');
            let v_c_procedimiento = $("#main_grid").getCell(id,'c_procedimiento');
            let v_c_estado = $("#main_grid").getCell(id,'c_estado');
            let v_d_titulo  = $("#main_grid").getCell(id,'d_descripcion');
            let v_c_formato_archivo = $("#main_grid").getCell(id,'c_formato_archivo');
            let v_id_plantilla_mail = $("#main_grid").getCell(id,'id_plantilla_mail');
            let v_c_departamento = $("#main_grid").getCell(id,'codigo_departamento');
            let v_id_plan = $("#main_grid").getCell(id,'id_plan_fis');
            let v_d_plan = $("#main_grid").getCell(id,'d_plan_fis');
            let v_n_programa = $("#main_grid").getCell(id,'n_programa_fis');
            let v_d_programa = $("#main_grid").getCell(id,'d_programa_fis');
            $('#btn_actualizar_operativo').hide();
            $('#btn_eliminar_operativo').hide();

            if(v_c_estado == 1){ //ABIERTO
                $('#div_botones').attr('hidden', false);
                $('#div_botones #btn_administrar').show();
                $('#div_botones #btn_notificar').show();
                $('#div_botones #btn_cerrar').show();
                $('#div_botones #btn_validar').show();
                $('#div_botones #btn_errores').show();
            }

            if(v_c_estado == 2){ //NOTIFICADO
                $('#div_botones').attr('hidden', false);
                $('#div_botones #btn_administrar').hide();
                $('#div_botones #btn_notificar').hide();
                $('#div_botones #btn_cerrar').show();
                $('#div_botones #btn_validar').show();
                $('#div_botones #btn_errores').show();
            }

            if(v_c_estado == 3){ //CERRADO
                $('#div_botones').attr('hidden', false);
                $('#div_botones #btn_administrar').hide();
                $('#div_botones #btn_notificar').hide();
                $('#div_botones #btn_cerrar').hide();
                $('#div_botones #btn_validar').hide();
                $('#div_botones #btn_errores').show();
            }

            if((fisca_total == 'N' && fisca_prev == 'N') || $('#departamento').val() == ''){
                $('#div_botones').attr('hidden', true);
                $('#btn_agregar_operativo').hide();
                $('#btn_actualizar_operativo').hide();
                $('#btn_eliminar_operativo').hide();
            }

            if(v_c_departamento == ';PRE;'){
                $('#div_botones #btn_validar').hide();
            }

            filtros_no_nativos_ar['detail_grid'] = [];
            filtros_no_nativos_ar['detail_grid'].push('Nro. Operativo: ' + v_n_operativo);
            setea_parametros('#detail_grid',{':p_n_operativo':v_n_operativo});
            $('#seccion_2').show();

            //modal edit operativo
            $('#n_operativo_edit').val(v_n_operativo);
            $('#d_titulo_edit').val(v_d_titulo);
            $('#n_periodo_desde_edit').val(v_n_periodo_desde).mask('9999/99');
            $('#n_periodo_hasta_edit').val(v_n_periodo_hasta).mask('9999/99');
            $('#c_inconsistencia_edit').val(v_c_inconsistencia);
            $('#c_tributo_edit').val(v_c_tributo);
            $('#id_plan_fis_edit').val(v_id_plan);
            $('#d_plan_fis_edit').val(v_d_plan);
            $('#n_programa_fis_edit').val(v_n_programa);
            $('#d_programa_fis_edit').val(v_d_programa);
            $('#c_procedimiento_edit').val(v_c_procedimiento);
            $('#c_formato_edit').val(v_c_formato_archivo);
            $('#plantilla_mail_edit').val(v_id_plantilla_mail);
        },
        loadComplete: function () {
            gridParentWidth = $('#gbox_main_grid').parent().parent().width();
            $('#main_grid').setGridWidth(gridParentWidth);
            if((fisca_total == 'S' || fisca_prev == 'S') && $('#departamento').val() != '') {
                $('#btn_agregar_operativo').show();
                $('#div_botones #btn_administrar').hide();
                $('#div_botones #btn_notificar').hide();
                $('#div_botones #btn_cerrar').hide();
                $('#div_botones #btn_validar').hide();
                $('#div_botones #btn_errores').hide();
            } else {
                $('#btn_agregar_operativo').hide();
            }
            $('#btn_actualizar_operativo').hide();
            $('#btn_eliminar_operativo').hide();
            $('#seccion_2').hide();
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    ).navButtonAdd('#main_grid_pager',{
        id: 'btn_eliminar_operativo',
        caption: "",
        position: "first",
        buttonicon: "glyphicon glyphicon-trash",
        title: "Eliminar Operativo",
        cursor: "pointer",
        onClickButton: function () {
            var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
            if (!rowid){
                mostrar_validacion('Debe seleccionar un registro de la grilla');
            }else {
                mostrar_cuadro('C',
                    'Eliminar Operativo',
                    'Si continua, se perderán los ajustes cargados en el Operativo. Esta acción es irreversible. ¿Desea continuar?',
                    function () {
                        eliminarOperativo($("#main_grid").getCell(rowid,'id_operativo_fiscalizacion'));
                    });
            }
        }}
    ).navButtonAdd('#main_grid_pager',{
        id: 'btn_actualizar_operativo',
        caption: "",
        position: "first",
        buttonicon: "glyphicon glyphicon-edit",
        title: "Editar Operativo",
        cursor: "pointer",
        onClickButton: function () {
            var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
            if (!rowid){
                mostrar_validacion('Debe seleccionar un registro de la grilla');
            }else {
                $('#modal_edit_operativo').modal('show');
            }
            if($("#main_grid").getCell(rowid,'c_estado') == 1 && contiene_detalle){ //ABIERTO
                $('#n_periodo_desde_edit').attr('readonly', true);
                $('#n_periodo_hasta_edit').attr('readonly', true);
                $('#c_inconsistencia_edit').attr('readonly', true);
                $('#c_inconsistencia_edit').attr('disabled', true);
                $('#c_tributo_edit').attr('readonly', true);
                $('#c_tributo_edit').attr('disabled', true);
                $('#c_formato_edit').attr('readonly', true);
                $('#c_formato_edit').attr('disabled', true);
                $('#plantilla_mail_edit').attr('readonly', false);
                $('#plantilla_mail_edit').attr('disabled', false);
            } else if ($("#main_grid").getCell(rowid,'c_estado') == 1){
                $('#n_periodo_desde_edit').attr('readonly', false);
                $('#n_periodo_hasta_edit').attr('readonly', false);
                $('#c_inconsistencia_edit').attr('readonly', false);
                $('#c_inconsistencia_edit').attr('disabled', false);
                $('#c_tributo_edit').attr('readonly', false);
                $('#c_tributo_edit').attr('disabled', false);
                $('#c_formato_edit').attr('readonly', false);
                $('#c_formato_edit').attr('disabled', false);
                $('#plantilla_mail_edit').attr('readonly', false);
                $('#plantilla_mail_edit').attr('disabled', false);
            }

            if($("#main_grid").getCell(rowid,'c_estado') == 2 && contiene_detalle){ //NOTIFICADO
                $('#n_periodo_desde_edit').attr('readonly', true);
                $('#n_periodo_hasta_edit').attr('readonly', true);
                $('#c_inconsistencia_edit').attr('readonly', true);
                $('#c_inconsistencia_edit').attr('disabled', true);
                $('#c_tributo_edit').attr('readonly', true);
                $('#c_tributo_edit').attr('disabled', true);
                $('#c_formato_edit').attr('readonly', true);
                $('#c_formato_edit').attr('disabled', true);
                $('#plantilla_mail_edit').attr('readonly', true);
                $('#plantilla_mail_edit').attr('disabled', true);
            } else if ($("#main_grid").getCell(rowid,'c_estado') == 2){
                $('#n_periodo_desde_edit').attr('readonly', false);
                $('#n_periodo_hasta_edit').attr('readonly', false);
                $('#c_inconsistencia_edit').attr('readonly', false);
                $('#c_inconsistencia_edit').attr('disabled', false);
                $('#c_tributo_edit').attr('readonly', false);
                $('#c_tributo_edit').attr('disabled', false);
                $('#c_formato_edit').attr('readonly', false);
                $('#c_formato_edit').attr('disabled', false);
                $('#plantilla_mail_edit').attr('readonly', false);
                $('#plantilla_mail_edit').attr('disabled', false);
            }
        }}
    ).navButtonAdd('#main_grid_pager',{
        id: 'btn_agregar_operativo',
        caption: "",
        position: "first",
        buttonicon: "glyphicon glyphicon-plus",
        title: "Incorporar Operativo",
        cursor: "pointer",
        onClickButton: function () {
            $('#modal_add_operativo').modal('show');
        }}
    );

    $("#detail_grid").jqGrid({
        colNames: datos_detail_grid.colNames(),
        colModel: datos_detail_grid.colModel(),
        pager: $('#detail_grid_pager'),
        caption: "Detalle Operativo" ,
        postData: datos_detail_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        shrinkToFit: false,
        rowList: [50, 100, 500, 1000],
        loadComplete: function (data) {
            gridParentWidth = $('#gbox_main_grid').parent().parent().width();
            $('#detail_grid').setGridWidth(gridParentWidth);
            $('#main_grid').setGridWidth(gridParentWidth);
            contiene_detalle = data.records > 0;

            var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');

            if((fisca_total == 'S' || fisca_prev == 'S')) {
                if ($("#main_grid").getCell(rowid, 'c_estado') == 1) {
                    $('.botones_grid').attr('hidden', false);
                    $('#btn_actualizar_operativo').show();
                    $('#btn_eliminar_operativo').show();
                }
                if($("#main_grid").getCell(rowid,'c_estado') == 2){
                    $('#btn_actualizar_operativo').show();
                    $('#btn_eliminar_operativo').hide();
                }
                if($("#main_grid").getCell(rowid,'c_estado') == 3){
                    $('.botones_grid').attr('hidden', true);
                    $('#btn_actualizar_operativo').hide();
                    $('#btn_eliminar_operativo').hide();
                }
            }
        }
    }).navGrid('#detail_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    $("#errores_grid").jqGrid({
        colNames: datos_errores_grid.colNames(),
        colModel: datos_errores_grid.colModel(),
        pager: $('#errores_grid_pager'),
        caption: "Errores Operativo" ,
        postData: datos_errores_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        rowList: [50, 100, 500, 1000],
        autowidth: false,
    });
}