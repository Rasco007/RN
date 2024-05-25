function inicializar_grillas(){
    $("#main_grid").jqGrid({
        colNames: datos_main_grid.colNames(),
        colModel: datos_main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Fiscalizaciones" ,
        postData: datos_main_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        sortname:'n_inspeccion',
        sortorder:'desc',
        shrinkToFit: false,
        rowList: [50, 100, 500, 1000],
        onSelectRow: function (id) {
            let v_id_inspeccion = $("#main_grid").getCell(id,'n_inspeccion');
            let v_d_inspector = $("#main_grid").getCell(id,'d_inspector');
            let v_n_inspector = $("#main_grid").getCell(id,'id_inspector');
            let v_d_supervisor = $("#main_grid").getCell(id,'d_supervisor');
            let v_n_supervisor = $("#main_grid").getCell(id,'id_supervisor');
            let v_id_contribuyente = $("#main_grid").getCell(id,'id_contribuyente');
            let v_n_cuit = $("#main_grid").getCell(id,'n_cuit');
            let v_d_denominacion = $("#main_grid").getCell(id,'d_denominacion');
            let v_id_plan_fis = $("#main_grid").getCell(id,'id_plan_fis');
            let v_d_plan_fis = $("#main_grid").getCell(id,'d_plan_fisca');
            let v_n_programa_fis = $("#main_grid").getCell(id,'n_programa_fis');
            let v_d_programa_fis = $("#main_grid").getCell(id,'d_programa_fis');
            let v_c_procedimiento = $("#main_grid").getCell(id,'c_procedimiento');
            let v_tipo_plan =  $("#main_grid").getCell(id,'tipo_plan');
            let v_expte_gde = $("#main_grid").getCell(id,'c_expte_gde');
            let v_c_tipo_inspec = $("#main_grid").getCell(id,'c_tipo_inspec');
            let v_c_motivo_inspec = $("#main_grid").getCell(id,'c_motivo_inspec');
            let v_f_apertura = $("#main_grid").getCell(id,'f_apertura');
            let v_d_observacion = $("#main_grid").getCell(id,'d_observacion');
            let v_d_domicilio = $("#main_grid").getCell(id,'d_domicilio');
            let v_d_articulo = $("#main_grid").getCell(id,'d_art_notif');
            let v_c_motivo_ajuste = $("#main_grid").getCell(id,'c_motivo_ajus_estimado');
            let v_c_regla =  $("#main_grid").getCell(id,'c_regla');
            let v_pos_fiscal_desde = $("#main_grid").getCell(id,'pos_fiscal_desde');
            let v_cuota_desde = $("#main_grid").getCell(id,'cuota_desde');
            let v_pos_fiscal_hasta = $("#main_grid").getCell(id,'pos_fiscal_hasta');
            let v_cuota_hasta = $("#main_grid").getCell(id,'cuota_hasta');
            let v_ajuste_estimado = $("#main_grid").getCell(id,'i_ajusteestimado');
            let v_base_estimado = $("#main_grid").getCell(id,'i_baseimpestimado');
            let v_impugnacion_estimado = $("#main_grid").getCell(id,'i_impugnacionbonif');
            let v_impugnacion_pc = $("#main_grid").getCell(id,'i_impugnacionpc');

            v_n_personal_usuario = $("#main_grid").getCell(id,'n_personal_usuario');
            v_id_inspector_inspeccion = $("#main_grid").getCell(id,'id_inspector');
            v_id_supervisor_inspeccion = $("#main_grid").getCell(id,'id_supervisor');
            v_sector_usuario = $("#main_grid").getCell(id,'sector_usuario');
            v_sector_inspeccion = $("#main_grid").getCell(id,'tipo_plan');

            evento = $("#main_grid").getCell(id,'evento');
            criterio = $("#main_grid").getCell(id,'criterio');

            setea_parametros('#detail_grid',{':p_id_inspeccion':v_id_inspeccion});
            $('#alcance_id_inspeccion').val(v_id_inspeccion);
            $('#p_id_contribuyente').val(v_id_contribuyente);

            //seteamos los filtros para imprimir el PDF y el Excel.
            filtros_no_nativos_ar['detail_grid'] = [];
            if(v_id_inspeccion != ''){
                filtros_no_nativos_ar['detail_grid'].push('Nro. Inspección: ' + v_id_inspeccion);
            }

            if(
                ((fisca_interna == 'S' && v_sector_inspeccion == 'OFI') || (fisca_total == 'S' && v_sector_inspeccion == 'FIS'))
                ||
                (v_n_personal_usuario.includes(';'+v_id_inspector_inspeccion+';') || v_n_personal_usuario.includes(';'+v_id_supervisor_inspeccion+';'))
                ){
                $('#div_botones').attr('hidden', false);
                $('#div_botones .restriccion').show();
                $('#div_botones .sin_restriccion').show();
                $('#btn_editar_inspeccion').show();
            } else {
                $('#div_botones').attr('hidden', false);
                $('#div_botones .restriccion').hide();
                $('#div_botones .sin_restriccion').show();
                $('#btn_editar_inspeccion').hide();
            }

            if( evento == 'CERRADO'){
                $('#div_botones .restriccion').hide();
                $('#btn_editar_inspeccion').hide();
            }

            //modal edit inspección
            $('#id_inspeccion_edit').val(v_id_inspeccion);
            $('#id_contribuyente_edit').val(v_id_contribuyente);
            $('#n_cuit_edit').val(v_n_cuit);
            $('#d_denominacion_edit').val(v_d_denominacion);
            $('#id_plan_fis_edit').val(v_id_plan_fis);
            $('#d_plan_fis_edit').val(v_d_plan_fis);
            $('#n_programa_fis_edit').val(v_n_programa_fis);
            $('#d_programa_fis_edit').val(v_d_programa_fis);
            $('#c_procedimiento_edit').val(v_c_procedimiento);
            if(v_c_procedimiento == '060' || v_c_procedimiento == '092'){
                $('#expte_gde_edit').val(v_expte_gde);
                $('#div_expte_edit').attr('hidden', false);
            } else {
                $('#div_expte_edit').attr('hidden', true);
            }
            $('#c_tipo_inspeccion_edit').val(v_c_tipo_inspec);
            $('#c_motivo_fiscalizacion_edit').val(v_c_motivo_inspec);

            //modal asignación
            $('#modal_id_inspeccion').val(v_id_inspeccion);
            $('#modal_d_inspector').val(v_d_inspector);
            $('#modal_d_supervisor').val(v_d_supervisor);
            $('#modal_c_inspector').val(v_n_inspector);
            $('#modal_c_supervisor').val(v_n_supervisor);
            $('#tipo_plan').val(v_tipo_plan);

            //modal apertura
            $('#apertura_id_inspeccion').val(v_id_inspeccion);
            $('#fecha_apertura').val(v_f_apertura);
            $('#d_observacion_apertura').val(v_d_observacion);
            $('#d_domicilio_apertura').val(v_d_domicilio);
            $('#d_articulo_apertura').val(v_d_articulo);

            //modal estimados
            $('#estimados_id_inspeccion').val(v_id_inspeccion);
            $('#motivo_estimado').val(v_c_motivo_ajuste);
            $('#regla_estimado').val(v_c_regla);
            $('#pos_fiscal_desde_estimado').val(v_pos_fiscal_desde);
            $('#cuota_desde_estimado').val(v_cuota_desde);
            $('#pos_fiscal_hasta_estimado').val(v_pos_fiscal_hasta);
            $('#cuota_hasta_estimado').val(v_cuota_hasta);
            $('#ajuste_estimado').val(v_ajuste_estimado);
            $('#diferencia_estimado').val(v_base_estimado);
            $('#bonificacion_estimado').val(v_impugnacion_estimado);
            $('#pagos_estimado').val(v_impugnacion_pc);

            $('#div_botones').show();

        },
        gridComplete: function (){
            $("#main_grid").jqGrid("setColProp", "d_expediente",{frozen: true});
            $("#main_grid").jqGrid('setFrozenColumns');
            $("#main_grid").jqGrid("setColProp", "n_cuit",{frozen: true});
            $("#main_grid").jqGrid('setFrozenColumns');
        },
        loadComplete: function () {
            gridParentWidth = $('#gbox_main_grid').parent().parent().width();
            $('#main_grid').setGridWidth(gridParentWidth);
            if((fisca_total == 'S' || fisca_interna == 'S') && $('#id_contribuyente').val() != '') {
                $('#btn_agregar_inspeccion').show();
            } else {
                $('#btn_agregar_inspeccion').hide();
            }
            $('#btn_editar_inspeccion').hide();
            //$('#div_botones').attr('hidden', true);
            $('#id_contribuyente_add').val($('#id_contribuyente').val());
            $('#n_cuit_add').val($('#n_cuit').val());
            $('#d_denominacion_add').val($('#d_denominacion').val());
            $("#main_grid").setSelection(1);
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    ).navButtonAdd('#main_grid_pager',{
        id: 'btn_editar_inspeccion',
        caption: "",
        position: "first",
        buttonicon: "glyphicon glyphicon-edit",
        title: "Editar inspección",
        cursor: "pointer",
        onClickButton: function () {
            var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
            if (!rowid){
                mostrar_validacion('Debe seleccionar un registro de la grilla');
            }else {
                $('#modal_edit_inspeccion').modal('show');
            }
        }}
    ).navButtonAdd('#main_grid_pager',{
        id: 'btn_agregar_inspeccion',
        caption: "",
        position: "first",
        buttonicon: "glyphicon glyphicon-plus",
        title: "Incorporar inspección",
        cursor: "pointer",
        onClickButton: function () {
            $('#modal_add_inspeccion').modal('show');
        }}
    );

    $("#detail_grid").jqGrid({
        colNames: datos_detail_grid.colNames(),
        colModel: datos_detail_grid.colModel(),
        pager: $('#detail_grid_pager'),
        caption: "Alcance de la Inspección" ,
        postData: datos_detail_grid.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        shrinkToFit: true,
        rowList: [50, 100, 500, 1000],
        loadComplete: function () {
            gridParentWidth = $('#gbox_detail_grid').parent().parent().width();
            $('#detail_grid').setGridWidth(gridParentWidth);
            $('#main_grid').setGridWidth(gridParentWidth);
            var id = $('#main_grid').jqGrid ('getGridParam', 'selrow');
            if(id){
                if(
                    (
                        ((fisca_interna == 'S' && $("#main_grid").getCell(id,'tipo_plan') == 'OFI') || (fisca_total == 'S' && $("#main_grid").getCell(id,'tipo_plan') == 'FIS'))
                        ||
                        ($("#main_grid").getCell(id,'n_personal_usuario').includes(';'+$("#main_grid").getCell(id,'id_inspector')+';') || $("#main_grid").getCell(id,'n_personal_usuario').includes(';'+$("#main_grid").getCell(id,'id_supervisor')+';'))
                    )
                    && criterio == 'CUMPLE'
                )
                {
                    $('.botones_grid').attr('hidden', false);
                    $('#btn_agregar_alcance').attr('hidden', false);
                } else if(criterio == 'SOLOALTA'){
                    $('.botones_grid').attr('hidden', true);
                    $('#btn_agregar_alcance').attr('hidden', false);
                } else {
                    $('.botones_grid').attr('hidden', true);
                    $('#btn_agregar_alcance').attr('hidden', true);
                }
            }
        }
    }).navGrid('#detail_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    ).navButtonAdd('#detail_grid_pager',{
        id: 'btn_agregar_alcance',
        caption: "",
        position: "first",
        buttonicon: "glyphicon glyphicon-plus",
        title: "Incorpora alcance a la inspección",
        cursor: "pointer",
        onClickButton: function () {
            $('#modal_add_alcance').modal('show');
        }}
    );
}