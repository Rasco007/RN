function inicializar_eventos(){
    $('#btn_buscar').attr('disabled', true);
    $('#lupa_d_denominacion').hide();
    $('#n_cuit').mask('99-99999999-9');
    $('#d_anio_exp').mask('9999');
    $('#d_anio_exp').change(function () {
        if ($(this).val().length != 4){
            mostrar_error("Formato de Año incorrecto.");
            $(this).val(null);
        }
    });

    $("#id_plan_fis").focusout(function () {
        if($('#id_plan_fis').val() == "" && ('#n_cuit').val() == "" && $('#d_denominacion').val() == "" && $('#n_inspeccion').val() == "" && $('#d_expediente').val() == ""){
            $('#btn_buscar').attr('disabled', true);
        } else{
            $('#btn_buscar').attr('disabled', false);
        }
    });

    $("#n_inspeccion").focusout(function () {
        if($('#n_cuit').val() == "" && $('#d_denominacion').val() == "" && $('#n_inspeccion').val() == "" && $('#d_expediente').val() == ""){
            $('#btn_buscar').attr('disabled', true);
        } else{
            $('#btn_buscar').attr('disabled', false);
        }
    });

    $("#d_expediente").focusout(function () {
        if($('#n_cuit').val() == "" && $('#d_denominacion').val() == "" && $('#n_inspeccion').val() == "" && $('#d_expediente').val() == ""){
            $('#btn_buscar').attr('disabled', true);
        } else{
            $('#btn_buscar').attr('disabled', false);
        }
    });

    $("#d_denominacion").focusout(function () {
        if($('#d_denominacion').val() == "" && $('#n_inspeccion').val() == "" && $('#d_expediente').val() == ""){
            $('#btn_buscar').attr('disabled', true);
        } else{
            $('#btn_buscar').attr('disabled', false);
        }
    });

    $("#lupa_d_denominacion").lupa_generica({
        id_lista: id_lista_denominaciones,
        titulos:['id_contribuyente', 'CUIT', 'Denominación', 'Tipo de Documento', 'Numero de Documento', 'F. Alta'],
        grid:[ {index:'id_contribuyente',width:100, hidden: true},
            {index:'n_cuit',width:100},
            {index:'d_denominacion',width:200},
            {index:'d_tipo_documento',width:140},
            {index:'n_documento',width:160},
            {index:'f_alta',width:80}],
        caption:'Lista de Denominaciones',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#d_denominacion_mayuscula'],
        filtrosTitulos:['Denominación'],
        filtrosNulos:[false],
        campos:{n_cuit: 'n_cuit', d_denominacion:'d_denominacion', d_denominacion:'d_denominacion_mayuscula'},
        keyNav:true,
        draggable:true,
        onClose(){
            if($('#n_cuit').val() != ''){
                completarDenominacion();
            }
        }
    });

    $('#d_denominacion').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
            $('#d_denominacion_mayuscula').val($('#d_denominacion').val().toUpperCase());
        } else if (event.type === 'keydown') {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
            $('#id_contribuyente').val(null);
            $('#n_cuit').val(null);
        } else if (event.type === 'focusout' && $(this).val().length <= 4) {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
            $('#id_contribuyente').val(null);
            $('#n_cuit').val(null);
        }
    });

    $("#btn_lupa_plan_fis").lupa_generica({
        id_lista: c_id_lista_planes,
        titulos: ['Código', 'Descripción', 'Tipo Plan', 'Año'],
        grid: [
            {index: 'id_plan_fis', width: 60},
            {index: 'd_plan', width: 280},
            {index: 'tipo_plan', width: 150},
            {index: 'n_anio', width: 70}
        ],
        caption: 'Lista de Planes - Consulta',
        filtroNull: false,
        sortname:'n_anio',
        sortorder:'desc',
        campos: {id_plan_fis: 'id_plan_fis', d_plan: 'd_plan_fis'},
        keyNav: true,
        onClose(){
            if($('#id_plan_fis').val() == "" && ('#n_cuit').val() == "" && $('#d_denominacion').val() == "" && $('#n_inspeccion').val() == "" && $('#d_expediente').val() == ""){
                $('#btn_buscar').attr('disabled', true);
            } else{
                $('#btn_buscar').attr('disabled', false);
            }
            $('#d_programa_fis').val(null);
            $('#n_programa_fis').val(null);
        }
    });

    $("#btn_lupa_programa_fis").lupa_generica({
        id_lista: id_lista_programas,
        titulos: ['Código', 'Descripción'],
        grid: [
            {index: 'n_programa_fis', width: 130},
            {index: 'd_programa', width: 450}
        ],
        caption: 'Lista de Programas',
        filtros: ['#id_plan_fis'],
        filtrosTitulos:['Plan de Fiscalización'],
        campos: {n_programa_fis: 'n_programa_fis', d_programa: 'd_programa_fis'},
        keyNav: true
    });

    $('#btn_buscar').click(function () {
        if($('#id_plan_fis').val()  == "" && $('#n_cuit').val() == "" && $('#d_denominacion').val() == "" && $('#n_inspeccion').val() == "" && $('#d_expediente').val() == ""){
            mostrar_cuadro('I', 'Advertencia', 'Debe cargar al menos uno de los siguientes campos: Cuit, Nro. Inspección, Expediente, Plan de Fiscalización.')
        } else {
            filtros_no_nativos_ar['main_grid'] = [];
            if ($('#frm_consulta').validationEngine('validate')){
                setea_parametros('#main_grid',{':p_n_expediente':$('#d_expediente').val(),'p_n_anio': $('#d_anio_exp').val(),
                    'p_id_contribuyente':$('#id_contribuyente').val(), ':p_n_inspeccion':$('#n_inspeccion').val(),
                    ':p_id_plan_fis':$('#id_plan_fis').val(), ':p_n_programa_fis':$('#n_programa_fis').val()});
                $('#seccion_2').hide();

                //seteamos los filtros para imprimir el PDF y el Excel.
                if($('#d_expediente').val() != ''){
                    filtros_no_nativos_ar['main_grid'].push('Expediente: ' + $('#d_expediente').val());
                }
                if($('#d_anio_exp').val() != ''){
                    filtros_no_nativos_ar['main_grid'].push('Año Expediente: ' + $('#d_anio_exp').val());
                }
                if($('#id_contribuyente').val() != ''){
                    filtros_no_nativos_ar['main_grid'].push('Cuit: ' + $('#n_cuit').val() + ' - ' + 'Denominación: ' + $('#d_denominacion').val());
                }
                if($('#n_inspeccion').val() != ''){
                    filtros_no_nativos_ar['main_grid'].push('Nro. Inspección: ' + $('#n_inspeccion').val());
                }
                if($('#id_plan_fis').val() != ''){
                    filtros_no_nativos_ar['main_grid'].push('Plan de Fiscalización: ' + $('#d_plan_fis').val());
                }
                if($('#n_programa_fis').val() != ''){
                    filtros_no_nativos_ar['main_grid'].push('Programa de Fiscalización: ' + $('#d_programa_fis').val());
                }
                $('#btn_lupa_plan_fis').css("visibility", "hidden");
                $('#btn_lupa_programa_fis').css("visibility", "hidden");
                $('#lupa_d_denominacion').css("visibility", "hidden");
                $('#btn_buscar').attr('disabled', true);
                $('#frm_consulta :input').attr('readonly', true);
            }
        }
    });

    $('#btn_limpiar').click(function(){
        //setea_parametros('#main_grid',{':p_n_expediente':null,'p_n_anio': null, 'p_id_contribuyente':null, ':p_n_inspeccion':null, ':p_id_plan_fis': null, ':p_n_programa_fis': null});
        $("#main_grid").jqGrid("clearGridData");
        $('#div_botones').attr('hidden', true);
        $('#seccion_2').hide();
        $('#frm_consulta :input').val(null);
        $('#frm_consulta :input').attr('readonly', false);
        $("#frm_consulta").validationEngine('hideAll');
        $('#lupa_d_denominacion').css("visibility", "visible");
        $('#lupa_d_denominacion').hide();
        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        $('#btn_agregar_inspeccion').hide();
        $('#btn_editar_inspeccion').hide();
        $('#btn_lupa_plan_fis').css("visibility", "visible");
        $('#btn_lupa_programa_fis').css("visibility", "visible");
        filtros_no_nativos_ar['main_grid'] = [];
        filtros_no_nativos_ar['detail_grid'] = [];
    });

    $('#n_cuit').change(function (){
        if ($('#n_cuit').val() && $('#n_cuit').val().length == 13){
            completarDenominacion();
        }else if ($('#n_cuit').val() == ""){
            $('#n_cuit, #d_denominacion, #id_contribuyente').val(null);
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
            if($('#n_cuit').val() == "" && $('#d_denominacion').val() == "" && $('#n_inspeccion').val() == "" && $('#d_expediente').val() == ""){
                $('#btn_buscar').attr('disabled', true);
            } else{
                $('#btn_buscar').attr('disabled', false);
            }
        }else {
            mostrar_error("El formato del CUIT ingresado es incorrecto.");
            $('#n_cuit, #d_denominacion, #id_contribuyente').val(null);
        }
    });

    //Funcionalidad de modal abm de inspección

    $('#modal_add_inspeccion').on('hidden.bs.modal', function (e) {
        $("#form_add_inspeccion").validationEngine('hideAll');
        $('#form_add_inspeccion select').val(null);
        $('#id_plan_fis_add').val(null);
        $('#d_plan_fis_add').val(null);
        $('#n_programa_fis_add').val(null);
        $('#d_programa_fis_add').val(null);
        $('#expte_gde_add').val(null);
        $('#div_expte').attr('hidden', true);
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

    $('#c_procedimiento_add').change(function () {
        if ($('#c_procedimiento_add').val() == '060' || $('#c_procedimiento_add').val() == '092'){
            $('#div_expte').attr('hidden', false);
        } else {
            $('#div_expte').attr('hidden', true);
            $('#expte_gde_add').val(null);
        }
    });

    $('#c_procedimiento_edit').change(function () {
        if ($('#c_procedimiento_edit').val() == '060' || $('#c_procedimiento_edit').val() == '092'){
            $('#div_expte_edit').attr('hidden', false);
        } else {
            $('#div_expte_edit').attr('hidden', true);
            $('#expte_gde_edit').val(null);
        }
    });

    $('#btn_add_inspeccion').click(function () {
        if($('#form_add_inspeccion').validationEngine('validate')) {
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_id_contribuyente": $('#id_contribuyente_add').val(),
                    "p_id_plan_fis": $('#id_plan_fis_add').val(),
                    "p_n_programa_fis": $('#n_programa_fis_add').val(),
                    "p_c_procedimiento": $('#c_procedimiento_add').val(),
                    "p_expte_gde": $('#expte_gde_add').val(),
                    "p_c_tipo_inspec": $('#c_tipo_inspeccion_add').val(),
                    "p_c_motivo_inspec": $('#c_motivo_fiscalizacion_add').val(),
                    "p_oper": 'add',
                    "id_menu": v_id_menu,
                    "n_orden": 5
                },
                dataType: 'json',
                success: function (data) {
                    $('#main').procOverlay({visible: false});
                    if (data.resultado == 'OK') {
                        mostrar_cuadro('I', 'Alta de Inspección', 'El alta de inspección finalizo correctamente.');
                        $("#modal_add_inspeccion").modal('hide');
                        setea_parametros('#main_grid',{':p_n_expediente':null,'p_n_anio': null, 'p_id_contribuyente':null, ':p_n_inspeccion':data.p_id_inspeccion_cargada, ':p_id_plan_fis': null, ':p_n_programa_fis': null});
                    } else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    $('#btn_edit_inspeccion').click(function () {
        if($('#form_edit_inspeccion').validationEngine('validate')) {
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_id_inspeccion": $('#id_inspeccion_edit').val(),
                    "p_id_contribuyente": $('#id_contribuyente_edit').val(),
                    "p_id_plan_fis": $('#id_plan_fis_edit').val(),
                    "p_n_programa_fis": $('#n_programa_fis_edit').val(),
                    "p_c_procedimiento": $('#c_procedimiento_edit').val(),
                    "p_expte_gde": $('#expte_gde_edit').val(),
                    "p_c_tipo_inspec": $('#c_tipo_inspeccion_edit').val(),
                    "p_c_motivo_inspec": $('#c_motivo_fiscalizacion_edit').val(),
                    "p_oper": 'edit',
                    "id_menu": v_id_menu,
                    "n_orden": 5
                },
                dataType: 'json',
                success: function (data) {
                    $('#main').procOverlay({visible: false});
                    if (data.resultado == 'OK') {
                        mostrar_cuadro('I', 'Edición de Inspección', 'La edición de inspección finalizo correctamente.');
                        $("#modal_edit_inspeccion").modal('hide');
                        setea_parametros('#main_grid',{':p_n_expediente':null,'p_n_anio': null, 'p_id_contribuyente':null, ':p_n_inspeccion':$('#id_inspeccion_edit').val(), ':p_id_plan_fis': null, ':p_n_programa_fis': null});
                    } else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    //Funcionalidad de modal asignación

    $('#btn_asignacion').click(function () {
        var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
        if (!rowid){
            mostrar_validacion('Debe seleccionar un registro de la grilla');
        }else if(evento == 'CERRADO'){
            mostrar_cuadro('I', 'Asignación', 'No es posible realizar la asignación debido a que la inspección posee movimientos de cierre.');
        } else {
            $('#modal_asignacion').modal('show');
        }
    });

    $("#btn_lupa_inspector").lupa_generica({
        id_lista: id_lista_inspectores,
        titulos: ['Codigo', 'Descripcion'],
        grid: [
            {index: 'c_codigo', width: 130},
            {index: 'd_descrip', width: 450}
        ],
        caption: 'Lista de Inspectores',
        filtros: ['#tipo_plan'],
        searchCode: true,
        searchInput: '#modal_c_inspector',
        campos: {c_codigo: 'modal_c_inspector', d_descrip: 'modal_d_inspector'},
        keyNav: true
    });

    $("#btn_lupa_supervisor").lupa_generica({
        id_lista: id_lista_supervisores,
        titulos: ['Codigo', 'Descripcion'],
        grid: [
            {index: 'c_codigo', width: 130},
            {index: 'd_descrip', width: 450}
        ],
        caption: 'Lista de Supervisores',
        filtros: ['#tipo_plan'],
        searchCode: true,
        searchInput: '#modal_c_supervisor',
        campos: {c_codigo: 'modal_c_supervisor', d_descrip: 'modal_d_supervisor'},
        keyNav: true
    });

    $('#btn_guardar_asignacion').click(function () {
        if($('#form_asignacion').validationEngine('validate')) {
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_id_inspeccion": $('#modal_id_inspeccion').val(),
                    "p_n_inspector": $('#modal_c_inspector').val(),
                    "p_n_supervisor": $('#modal_c_supervisor').val(),
                    "id_menu": v_id_menu,
                    "n_orden": 1
                },
                dataType: 'json',
                success: function (data) {
                    $('#main').procOverlay({visible: false});
                    if (data.resultado == 'OK') {
                        mostrar_cuadro('I', 'Asignación', 'La asignación finalizo correctamente.');
                        setea_parametros('#main_grid',{':p_n_expediente':null,'p_n_anio': null, 'p_id_contribuyente':null, ':p_n_inspeccion':$('#modal_id_inspeccion').val(), ':p_id_plan_fis': null, ':p_n_programa_fis': null});
                        $("#modal_asignacion").modal('hide');
                    } else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    //Funcionalidad modal de apertura

    $("#fecha_apertura").datepicker({
        changeMonth:true,
        changeYear:true,
        dateFormat:'dd/mm/yy',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá']
    }).mask('99/99/9999').change(function () {
        if ($(this).val().length > 0 && $(this).val().length != 10){
            mostrar_error("El Formato de la Fecha ingresada no es válido.");
            $(this).val(null);
        }
    });

    $('#fecha_apertura').change(function () {
        fecha_en_rango();
    });

    $('#btn_apertura').click(function () {
        var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
        if (!rowid){
            mostrar_validacion('Debe seleccionar un registro de la grilla');
        }else{
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{
                    "p_id_inspeccion": $('#apertura_id_inspeccion').val(),
                    "id_menu":v_id_menu,
                    "n_orden":2
                },
                dataType:'json',
                success: function( data ) {
                    $('#main').procOverlay({visible:false});
                    if(data.resultado == 'OK' && data.retorno != 'OK' && data.retorno != 'TMP'){
                        mostrar_cuadro('I', 'Apertura', data.retorno);
                    }
                    if(data.retorno == 'TMP'){
                        posee_tmp = true;
                        $('#modal_apertura').modal('show');
                    }

                    if(data.retorno == 'OK'){
                        $('#modal_apertura').modal('show');
                    }
                }
            });
        }
    });

    $('#btn_guardar_apertura').click(function () {
        if($('#form_apertura').validationEngine('validate')){
            if (posee_tmp) {
                mostrar_cuadro('C',
                    'Advertencia',
                    'El proceso procederá a reestablecer las obligaciones de la inspección y recuperar nuevamente las ' +
                    'Declaraciones Juradas, por lo que se perderán los ajustes cargados hasta el momento. ¿Desea continuar?',
                    function () {
                        guardar_inspeccion($('#apertura_id_inspeccion').val(),
                            $('#fecha_apertura').val(),
                            $('#d_observacion_apertura').val(),
                            $('#d_domicilio_apertura').val(),
                            $('#d_articulo_apertura').val());
                    });
            } else {
                guardar_inspeccion($('#apertura_id_inspeccion').val(),
                                   $('#fecha_apertura').val(),
                                   $('#d_observacion_apertura').val(),
                                   $('#d_domicilio_apertura').val(),
                                   $('#d_articulo_apertura').val());
            }
        }
    });

    // F Asig. Expedientes

    $('#btn_asig_expte').click(function () {
        var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
        if (!rowid){
            mostrar_validacion('Debe seleccionar un registro de la grilla');
        }else{
            var rowid_cell = $("#main_grid").getGridParam('selrow');
            post_to_url("ingreso_movimiento_inspecciones.php", {
                'p_n_id_menu': 100055,
                'p_modo': 'A',
                'p_id_contribuyente':$("#main_grid").getCell(rowid_cell,'id_contribuyente'),
                'p_id_inspeccion':$("#main_grid").getCell(rowid_cell,'n_inspeccion'),
                'p_n_cuit':$("#main_grid").getCell(rowid_cell,'n_cuit'),
                'p_d_denominacion':$("#main_grid").getCell(rowid_cell,'d_denominacion'),
                'p_d_plan_fisca':$("#main_grid").getCell(rowid_cell,'d_plan_fisca'),
                'p_n_programa_fis':$("#main_grid").getCell(rowid_cell,'n_programa_fis'),
                'p_d_programa_fis':$("#main_grid").getCell(rowid_cell,'d_programa_fis'),
                'p_n_anio_plan':$("#main_grid").getCell(rowid_cell,'n_anio_plan'),
                'p_c_tipo_doc':$("#main_grid").getCell(rowid_cell,'c_tipo_doc'),
                'p_d_tipo_doc':$("#main_grid").getCell(rowid_cell,'d_tipo_doc'),
                'p_n_documento':$("#main_grid").getCell(rowid_cell,'n_documento'),
                'p_n_expediente':$("#main_grid").getCell(rowid_cell,'n_expediente'),
                'p_n_anio_expediente':$("#main_grid").getCell(rowid_cell,'n_anio_expediente')},
                "_blank","POST");
        }
    });

    //Funcionalidad modal de ver alcance

    $('#btn_ver_alcance').click(function () {
        var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
        if (!rowid){
            mostrar_validacion('Debe seleccionar un registro de la grilla');
        }else{
            let id_insp = $("#main_grid").getCell(rowid, 'n_inspeccion');
            let id_contrib = $("#main_grid").getCell(rowid, 'id_contribuyente');
            setea_parametros('#detail_grid',{':p_id_inspeccion':id_insp});
            $('#seccion_2').show();
            $('#alcance_id_inspeccion').val(id_insp);
            $('#p_id_contribuyente').val(id_contrib);
            $('#edit_id_inspeccion').val(id_insp);
        }
    });

    $('#n_pos_fiscal_desde').mask('9999');
    $('#cuota_desde').mask('99');
    $('#n_pos_fiscal_hasta').mask('9999');
    $('#cuota_hasta').mask('99');
    $('#edit_n_pos_fiscal_desde').mask('9999');
    $('#edit_cuota_desde').mask('99');
    $('#edit_n_pos_fiscal_hasta').mask('9999');
    $('#edit_cuota_hasta').mask('99');

    $('#modal_add_alcance').on('hidden.bs.modal', function (e) {
        $('#modal_add_alcance input').not(document.getElementsByName("alcance_id")).val(null);
    });

    $('#modal_edit_alcance').on('hidden.bs.modal', function (e) {
        $('#modal_edit_alcance input').not(document.getElementsByName("alcance_id")).val(null);
    });

    $("#btn_inscripcion").lupa_generica({
        id_lista: id_lista_inscripciones,
        titulos: ['c_codigo', 'Objeto', 'Descripción'],
        grid: [
            {index: 'c_tributo', width: 70, hidden: true},
            {index: 'd_objeto_hecho', width: 100, hidden: true},
            {index: 'd_descrip', width: 600}
        ],
        caption: 'Lista de Inscripciones',
        filtroNull: false,
        filtros: ['#p_id_contribuyente'],
        campos: {d_objeto_hecho: 'p_d_objeto_hecho', d_descrip: 'd_inscripcion', c_tributo: 'p_c_tributo'},
        keyNav: true
    });

    $('#btn_add_alcance').click(function () {
        if ($('#form_alcance').validationEngine('validate')) {
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_id_inspeccion": $('#alcance_id_inspeccion').val(),
                    "p_c_tributo": $('#p_c_tributo').val(),
                    "p_d_objeto_hecho": $('#p_d_objeto_hecho').val(),
                    "p_n_pos_fiscal_desde": $('#n_pos_fiscal_desde').val(),
                    "p_n_cuota_desde": $('#cuota_desde').val(),
                    "p_n_pos_fiscal_hasta": $('#n_pos_fiscal_hasta').val(),
                    "p_n_cuota_hasta": $('#cuota_hasta').val(),
                    "p_oper": 'add',
                    "id_menu": v_id_menu,
                    "n_orden": 4
                },
                dataType: 'json',
                success: function (data) {
                    if (data.resultado == 'OK') {
                        $('#detail_grid').trigger('reloadGrid');
                        $('#modal_add_alcance').modal('hide');
                    } else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    $('#btn_edit_alcance').click(function () {

        let rowid = $('#detail_grid').jqGrid ('getGridParam', 'selrow');
        let n_pos_desde_grid = $("#detail_grid").getCell(rowid,'n_pos_fiscal_desde') * 1;
        let n_pos_hasta_grid = $("#detail_grid").getCell(rowid,'n_pos_fiscal_hasta') * 1;

        let n_pos_desde_form = $('#edit_n_pos_fiscal_desde').val()*100 + $('#edit_cuota_desde').val()*1;
        let n_pos_hasta_form = $('#edit_n_pos_fiscal_hasta').val()*100 + $('#edit_cuota_hasta').val()*1;

        let posee_tmp;
            rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
        if ($("#main_grid").getCell(rowid,'oblig_carga') * 1 > 0 ){
            posee_tmp = true;
        }else{
            posee_tmp = false;
        }

        if(posee_tmp && (( n_pos_desde_form > n_pos_desde_grid ) || (n_pos_hasta_form < n_pos_hasta_grid) )){
            mostrar_cuadro('C',
                'Editar Alcance',
                'Si continua, se perderán los ajustes cargados en las posiciones fiscales excluidas. Esta acción es irreversible. ¿Desea continuar?',
                function () {
                    confirmar_edicion();
                });
        }else{
            confirmar_edicion();
        }
    });

    //Funcionalidad modal estimados

    $('#pos_fiscal_desde_estimado').mask('9999');
    $('#cuota_desde_estimado').mask('99');
    $('#pos_fiscal_desde_estimado').change(function () {
        if ($(this).val().length != 4){
            mostrar_error("Formato de Periodo Desde incorrecto.");
            $(this).val(null);
        }
    });

    $('#pos_fiscal_hasta_estimado').mask('9999');
    $('#cuota_hasta_estimado').mask('99');
    $('#pos_fiscal_hasta_estimado').change(function () {
        if ($(this).val().length != 4){
            mostrar_error("Formato de Periodo Desde incorrecto.");
            $(this).val(null);
        }
    });

    $('.numerico').keypress(function(tecla){   //Validamos que los input de importes sean solo numeros, puntos o comas.
        if(tecla.charCode<48 || tecla.charCode>57){
            if(tecla.charCode !== 44 && tecla.charCode !== 46){
                return false;
            }
        }
    });

    $(".mascara_importe").focusout(function () { //le damos el formato de importe con 2 decimales 0,00
        $(this).val($(this).val().replace(/\./g, ','));
        $(this).val(formatea_number(mascara_numero(parse($(this).val()).toFixed(2), ',', -1, 2), ''));
        if($(this).val() == '0,00'){
            $(this).val(null);
        }
    }).css('text-align', 'right');

    $('#btn_estimados').click(function () {
        var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
        if (!rowid){
            mostrar_validacion('Debe seleccionar un registro de la grilla');
        }else if(evento == 'CERRADO'){
            $('#form_estimados .estimados').attr('readonly', 'readonly');
            $('#form_estimados .estimados').attr('disabled', 'disabled');
            $('#div_botones_estimados').attr('hidden', true);
            $('#modal_estimados').modal('show');
        } else {
            $('#form_estimados .estimados').attr('readonly', false);
            $('#form_estimados .estimados').attr('disabled', false);
            $('#div_botones_estimados').attr('hidden', false);
            $('#modal_estimados').modal('show');
        }
    });

    $('#btn_guardar_estimados').click(function () {
        if ($('#form_estimados').validationEngine('validate')) {
            $.ajax({
                type: 'POST',
                url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                data: {
                    "p_id_inspeccion": $('#estimados_id_inspeccion').val(),
                    "p_c_motivo_ajuste": $('#motivo_estimado').val(),
                    "p_c_regla": $('#regla_estimado').val(),
                    "p_pos_fis_desde": $('#pos_fiscal_desde_estimado').val()+$('#cuota_desde_estimado').val(),
                    "p_pos_fis_hasta": $('#pos_fiscal_hasta_estimado').val()+$('#cuota_hasta_estimado').val(),
                    "p_i_ajuste_estimado":$('#ajuste_estimado').val(),
                    "p_i_base_impo":$('#diferencia_estimado').val(),
                    "p_i_impugnacion_bonif":$('#bonificacion_estimado').val(),
                    "p_i_impugnacion_pc": $('#pagos_estimado').val(),
                    "id_menu": v_id_menu,
                    "n_orden": 6
                },
                dataType: 'json',
                success: function (data) {
                    if (data.resultado == 'OK') {
                        setea_parametros('#main_grid',{':p_n_expediente':null,'p_n_anio': null, 'p_id_contribuyente':null, ':p_n_inspeccion':$('#estimados_id_inspeccion').val(), ':p_id_plan_fis': null, ':p_n_programa_fis': null});
                        $('#modal_estimados').modal('hide');
                    } else {
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    // Boton resto de movimientos

    $('#btn_movimientos').click(function () {
        var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
        if (!rowid){
            mostrar_validacion('Debe seleccionar un registro de la grilla');
        }else{
            var rowid_cell = $("#main_grid").getGridParam('selrow');
            post_to_url("ingreso_movimiento_inspecciones.php", {
                    'p_n_id_menu': 100055,
                    'p_modo': 'C',
                    'p_id_contribuyente':$("#main_grid").getCell(rowid_cell,'id_contribuyente'),
                    'p_id_inspeccion':$("#main_grid").getCell(rowid_cell,'n_inspeccion'),
                    'p_n_cuit':$("#main_grid").getCell(rowid_cell,'n_cuit'),
                    'p_d_denominacion':$("#main_grid").getCell(rowid_cell,'d_denominacion'),
                    'p_d_plan_fisca':$("#main_grid").getCell(rowid_cell,'d_plan_fisca'),
                    'p_n_programa_fis':$("#main_grid").getCell(rowid_cell,'n_programa_fis'),
                    'p_d_programa_fis':$("#main_grid").getCell(rowid_cell,'d_programa_fis'),
                    'p_n_anio_plan':$("#main_grid").getCell(rowid_cell,'n_anio_plan'),
                    'p_c_tipo_doc':$("#main_grid").getCell(rowid_cell,'c_tipo_doc'),
                    'p_d_tipo_doc':$("#main_grid").getCell(rowid_cell,'d_tipo_doc'),
                    'p_n_documento':$("#main_grid").getCell(rowid_cell,'n_documento'),
                    'p_n_expediente':$("#main_grid").getCell(rowid_cell,'n_expediente'),
                    'p_n_anio_expediente':$("#main_grid").getCell(rowid_cell,'n_anio_expediente')},
                "_blank","POST");
        }
    });

    //Funcionalidad boton resumen

    $('#btn_resumen').click(function () {
        var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
        if (!rowid){
            mostrar_validacion('Debe seleccionar un registro de la grilla');
        }else{
            var rowid_cell = $("#main_grid").getGridParam('selrow');
            post_to_url("resumen_inspeccion.php", {
                    'p_n_id_menu': 100033,
                    'p_id_inspeccion':$("#main_grid").getCell(rowid_cell,'n_inspeccion'),
                    'p_d_motivo_ajus_estimado': $("#main_grid").getCell(rowid_cell,'d_motivo_ajus_estimado'),
                    'p_pos_fis_desde_estimada': $("#main_grid").getCell(rowid_cell,'pos_fiscal_desde'),
                    'p_pos_fis_hasta_estimada': $("#main_grid").getCell(rowid_cell,'pos_fiscal_hasta'),
                    'p_d_regla': $("#main_grid").getCell(rowid_cell,'d_regla'),
                    'p_i_monto_total_ajuste': $("#main_grid").getCell(rowid_cell,'i_monto_total_ajuste'),
                    'p_i_base_estimado': $("#main_grid").getCell(rowid_cell,'i_baseimpestimado'),
                    'p_i_ajuste_estimado': $("#main_grid").getCell(rowid_cell,'i_ajusteestimado'),
                    'p_i_impug_bonif': $("#main_grid").getCell(rowid_cell,'i_impugnacionbonif'),
                    'p_i_impug_pc': $("#main_grid").getCell(rowid_cell,'i_impugnacionpc'),
                    'p_i_base_imponible_ajustada': $("#main_grid").getCell(rowid_cell,'i_base_imponible_ajustada'),
                    'p_i_impuesto_ajustado': $("#main_grid").getCell(rowid_cell,'i_impuesto_ajustado'),
                    'p_i_ajuste_bonificaciones': $("#main_grid").getCell(rowid_cell,'i_ajuste_bonificaciones'),
                    'p_i_ajuste_pac': $("#main_grid").getCell(rowid_cell,'i_ajuste_pac'),
                    'p_motivo_ajuste1': $("#main_grid").getCell(rowid_cell,'motivo_ajuste1'),
                    'p_motivo_ajuste2': $("#main_grid").getCell(rowid_cell,'motivo_ajuste2'),
                    'p_motivo_ajuste3': $("#main_grid").getCell(rowid_cell,'motivo_ajuste3'),
                    'p_otros_motivos_ajuste': $("#main_grid").getCell(rowid_cell,'otros_motivos_ajuste'),
                    'p_observaciones': $("#main_grid").getCell(rowid_cell,'observaciones')},
                "_blank","POST");
        }
    });
}