function inicializar_eventos(){
    $('#lupa_d_denominacion').hide();
    $('#n_cuit').mask('99-99999999-9');

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

    $("#lupa_d_denominacion").lupa_generica({
        id_lista: id_lista_denominaciones,
        titulos:['id_contribuyente', 'CUIT', 'Denominación', 'c_tipo_documento', 'Tipo de Documento', 'Numero de Documento', 'F. Alta'],
        grid:[ {index:'id_contribuyente',width:100, hidden: true},
            {index:'n_cuit',width:100},
            {index:'d_denominacion',width:200},
            {index:'c_tipo_documento',width:140, hidden: true},
            {index:'d_tipo_documento',width:140},
            {index:'n_documento',width:160},
            {index:'f_alta',width:80}],
        caption:'Lista de Denominaciones',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#d_denominacion_mayuscula'],
        filtrosTitulos:['Denominación'],
        filtrosNulos:[false],
        campos:{n_cuit: 'n_cuit', d_denominacion:'d_denominacion', d_denominacion:'d_denominacion_mayuscula', d_tipo_documento: 'd_tipo_doc', c_tipo_documento: 'c_tipo_doc', n_documento: 'n_documento'},
        keyNav:true,
        draggable:true,
        onClose(){
            if($('#n_cuit').val() != ''){
                completarDenominacion();
            }
        }
    });

    $("#btn_lupa_tipo_doc").lupa_generica({
        id_lista: id_lista_documentos,
        titulos: ['Código', 'Descripción'],
        grid: [
            {index: 'c_dato', width: 150},
            {index: 'd_dato', width: 450}
        ],
        caption: 'Tipo de Documento',
        campos: {d_dato: 'd_tipo_doc', c_dato: 'c_tipo_doc'},
        keyNav: true,
    });

    $("#btn_lupa_tributo").lupa_generica({
        id_lista: id_lista_tributos,
        titulos: ['Código', 'Descripción', 'c_tipo_imponible', 'd_dato'],
        grid: [
            {index: 'c_dato', width: 150},
            {index: 'd_descrip', width: 450},
            {index: 'c_tipo_imponible', width: 450, hidden: true},
            {index: 'd_dato', width: 450, hidden: true}
        ],
        caption: 'Tributos',
        campos: {d_descrip: 'd_tributo', c_dato: 'c_tributo', d_dato: 'd_tipo_imponible'},
        keyNav: true,
        onClose() {
            $('#d_objeto_hecho').val(null);
        }
    });

    $("#btn_lupa_objeto_hecho").lupa_generica({
        id_lista: id_lista_objetos,
        titulos: ['Objeto/Hecho', 'Contribuyente'],
        grid: [
            {index: 'd_objeto_hecho', width: 400},
            {index: 'd_denominacion', width: 400}
        ],
        caption: 'Objetos/Hechos',
        filtros: ['#c_tributo', '#id_contribuyente'],
        filtrosTitulos:['Tributo', 'CUIT'],
        filtrosNulos:[true,true],
        campos: {d_objeto_hecho: 'd_objeto_hecho'},
        keyNav: true
    });

    $("#btn_lupa_form").lupa_generica({
        id_lista: id_lista_forms,
        titulos: ['Código', 'Descripción'],
        grid: [
            {index: 'c_dato', width: 150},
            {index: 'd_descrip', width: 450}
        ],
        caption: 'Forms',
        campos: {c_dato: 'c_tipo_form'},
        keyNav: true
    });

    $('#btn_buscar').click(function () {
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                "p_n_cuit": limpia_cuit($('#n_cuit').val()),
                "p_c_tipo_documento": $('#c_tipo_doc').val(),
                "p_c_tributo": $('#c_tributo').val(),
                "p_d_objeto_hecho": $('#d_objeto_hecho').val(),
                "p_n_remito": $('#nro_remesa').val(),
                "p_c_tipo_form": $('#c_tipo_form').val(),
                "p_n_comprobante": $('#comprobante').val(),
                "id_menu": v_id_menu,
                "n_orden": 0
            },
            dataType: 'json',
            success: function (data) {
                if (data.resultado == 'OK') {
                    $.ajax({
                        type: 'POST',
                        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                        data: {
                            "p_n_cuit": limpia_cuit($('#n_cuit').val()),
                            "p_n_documento": limpia_documento($('#n_documento').val()),
                            "p_c_tipo_documento": $('#c_tipo_doc').val(),
                            "p_c_tributo": $('#c_tributo').val(),
                            "p_d_objeto_hecho": $('#d_objeto_hecho').val(),
                            "id_menu": v_id_menu,
                            "n_orden": 1
                        },
                        dataType: 'json',
                        success: function (data) {
                            $('#main').procOverlay({visible: false});
                            if (data.resultado == 'OK') {
                                $('#lupa_d_denominacion').css("visibility", "hidden");
                                $('#btn_lupa_tipo_doc').css("visibility", "hidden");
                                $('#btn_lupa_tributo').css("visibility", "hidden");
                                $('#btn_lupa_objeto_hecho').css("visibility", "hidden");
                                $('#btn_lupa_form').css("visibility", "hidden");
                                $('#btn_buscar').attr('disabled', true);
                                $('#frm_consulta :input').attr('readonly', true);
                                $('#id_contribuyente').val(data.p_id_contribuyente);
                                setea_parametros('#main_grid',{':p_elimina_sircar':p_elimina_sircar,
                                    ':p_id_contribuyente': $('#id_contribuyente').val(), ':p_c_tributo':$('#c_tributo').val(),
                                    ':p_d_objeto_hecho': $('#d_objeto_hecho').val(), ':p_n_comprobante': $('#comprobante').val(),
                                    ':p_c_tipo_from': $('#c_tipo_form').val()});
                            } else {
                                mostrar_cuadro('E', 'Error', data.resultado);
                                return;
                            }
                        }
                    });
                } else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    });

    $('#btn_limpiar').click(function(){
        $("#main_grid").jqGrid("clearGridData");
        $('#btn_buscar').attr('disabled', false);
        $('#frm_consulta :input').val(null);
        $('#frm_consulta :input').attr('readonly', false);
        $('#d_tipo_doc').attr('readonly', true);
        $('#d_tributo').attr('readonly', true);
        $('#d_objeto_hecho').attr('readonly', true);
        $('#c_tipo_form').attr('readonly', true);
        $("#frm_consulta").validationEngine('hideAll');
        $('#lupa_d_denominacion').css("visibility", "visible");
        $('#lupa_d_denominacion').hide();
        $('#btn_lupa_tipo_doc').css("visibility", "visible");
        $('#btn_lupa_tributo').css("visibility", "visible");
        $('#btn_lupa_objeto_hecho').css("visibility", "visible");
        $('#btn_lupa_form').css("visibility", "visible");
        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        $('#seccion_2').hide();
        $('#seccion_3').hide();
        $('#seccion_4').hide();
        $('#seccion_5').hide();
        $('#div_botones').attr('hidden', true);
        filtros_no_nativos_ar['main_grid'] = [];
        filtros_no_nativos_ar['detail_reten_grid'] = [];
        filtros_no_nativos_ar['detail_percep_grid'] = [];
        filtros_no_nativos_ar['detail_sellos_grid'] = [];
        filtros_no_nativos_ar['detail_recau_grid'] = [];
    });

    $('#btn_baja_ddjj').click(function () {
        var rowid = $('#main_grid').jqGrid ('getGridParam', 'selrow');
        if (!rowid){
            mostrar_validacion('Debe seleccionar un registro de la grilla');
        }else{
            var rowid_cell = $("#main_grid").getGridParam('selrow');
            mostrar_cuadro('C',
                'Baja de DDJJ',
                'Se dará de Baja la DDJJ. ¿Desea continuar?',
                function () {
                    confirmar_baja($("#main_grid").getCell(rowid_cell,'id_obligacion'), $("#main_grid").getCell(rowid_cell,'id_ddjj'));
                });
        }
    });
}