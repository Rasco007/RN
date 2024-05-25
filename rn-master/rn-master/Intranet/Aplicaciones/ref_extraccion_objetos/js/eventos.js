function inicializar_eventos(){

    $('#d_objeto_hecho').on('keyup', function (event) {
        if ($(this).val().length >= 3 || ($('#n_cuit').val() && $('#c_tributo').val())) {
            $('#btn_lupa_objeto_hecho').show().css('display', 'table-cell');
            $('#mascara_lupa_obj_hecho').hide();
        } else{
            $('#btn_lupa_objeto_hecho').hide();
            $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
        }
    });

    $('#btn_lupa_objeto_hecho').hide();
    $('#lupa_d_denominacion').hide();

    $('#n_cuit').mask('99-99999999-9');
    $('#btn_reformular').attr('disabled', true);
    $('#btn_constancia').attr('disabled', true);
    $('#btn_chequeras').attr('disabled', true);
    $('#btn_contratos').attr('disabled', true);
    $('#n_cuota_desde').mask('9999');
    $('#n_cuota_hasta').mask('9999');

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

    $("#btn_lupa_plan_pago").lupa_generica({
        id_lista: id_lista_planes,
        titulos: ['Nro. Plan', 'CUIT', 'Contribuyente', 'T. Imponible', 'Objeto Hecho', 'Tipo de Plan', 'Descripción',
            'c_tributo', 'id_contribuyente', 'n_tabla_deleg', 'c_delegacion', 'f_emision', 'c_tipo_calculo', 'c_origen_deuda',
            'c_seg_riesgo', 'c_concepto', 'd_observaciones'],
        grid: [
            {index: 'n_plan_pago', width: 90},
            {index: 'n_cuit', width: 100},
            {index: 'd_denominacion', width: 320},
            {index: 'c_tipo_imponible', width: 90},
            {index: 'd_objeto_hecho', width: 100},
            {index: 'c_tipo_plan_pago', width: 90},
            {index: 'd_descrip', width: 550},
            {index: 'c_tributo', width: 450, hidden: true},
            {index: 'id_contribuyente', width: 450, hidden: true},
            {index: 'n_tabla_deleg', width: 450, hidden: true},
            {index: 'c_delegacion', width: 450, hidden: true},
            {index: 'f_emision', width: 450, hidden: true},
            {index: 'c_tipo_calculo', width: 450, hidden: true},
            {index: 'c_origen_deuda', width: 450, hidden: true},
            {index: 'c_seg_riesgo', width: 450, hidden: true},
            {index: 'c_concepto', width: 450, hidden: true},
            {index: 'd_observaciones', width: 450, hidden: true}
        ],
        width: 1000,
        caption: 'Lista de Planes de Pago',
        filtros: ['#id_contribuyente','#d_plan_pago'],
        filtrosNulos: [true, true],
        campos: {n_plan_pago: 'd_plan_pago', n_cuit: 'n_cuit', d_denominacion: 'd_denominacion',
            c_tipo_imponible: 'd_tipo_imponible', d_objeto_hecho: 'd_objeto_hecho', c_tipo_plan_pago: 'c_tipo_plan_pago',
            d_descrip: 'd_tipo_plan_pago', c_tributo: 'c_tributo', id_contribuyente: 'id_contribuyente',
            n_tabla_deleg: 'n_tabla_deleg', c_delegacion: 'c_delegacion', f_emision: 'f_emision', c_tipo_calculo: 'c_tipo_calculo',
            c_origen_deuda: 'c_origen_deuda', c_seg_riesgo: 'c_seg_riesgo', c_concepto: 'c_concepto', d_observaciones: 'observacion'},
        keyNav: true
    });

    $("#btn_lupa_tipo_plan").lupa_generica({
        id_lista:id_lista_tipos_planes,
        titulos:['Tipo','Descripción'],
        grid:[  {index:'c_codigo',width:120},
                {index:'d_descrip',width:420}
        ],
        caption:'Lista de Tipos de Planes de Pago',
        sortname:'c_codigo',
        sortorder:'desc',
        campos:{c_codigo:'c_tipo_plan_pago', d_descrip: 'd_tipo_plan_pago'},
        keyNav:true
    });

    $("#btn_lupa_tipo_impo").lupa_generica({
        id_lista:id_lista_tipo_imponible,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_dato',width:100},
            {index:'d_dato',width:465}
        ],
        caption:'Lista de Tipos Imponibles',
        campos:{c_dato:'d_tipo_imponible'},
        searchInput: '#c_dato',
        keyNav:true,
        onClose(){
            $('#d_objeto_hecho').val(null);
        }
    });

    $("#btn_lupa_tipo_doc").lupa_generica({
        id_lista:id_lista_tipo_documento,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_dato',width:100},
                {index:'d_dato',width:465}
        ],
        caption:'Lista de Tipos de Documentos',
        campos:{d_dato:'c_tipo_doc'},
        keyNav:true
    });

    $("#btn_lupa_objeto_hecho").lupa_generica({
        id_lista: id_lista_objeto_hecho,
        titulos: ['Objeto/Hecho'],
        grid: [
            {index: 'd_objeto_hecho', width: 565}
        ],
        caption: 'Lista de Objetos/Hechos',
        filtros: ['#d_tipo_imponible', '#id_contribuyente','#d_objeto_hecho'],
        filtrosNulos: [false, true,true],
        filtrosTitulos:['Tipo Imponible', 'Cuit','Objeto/Hecho'],
        campos: {d_objeto_hecho: 'd_objeto_hecho'},
        keyNav: true
    });

    $("#btn_lupa_provincia").lupa_generica({
        id_lista:id_lista_delegacion,
        titulos:['Código','Descripción', 'n_tabla'],
        grid:[  {index:'c_dato',width:120},
                {index:'d_dato',width:420},
                {index:'n_tabla',width:80, hidden: true}
        ],
        caption:'Lista de Delegaciones',
        campos:{c_dato:'c_provincia', d_dato: 'd_provincia'},
        keyNav:true
    });

    $('#d_plan_pago').focusout(function(){
        if ($('#d_plan_pago').val() !== ''){
            autocompleta_datos_por_nro_plan();
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
        campos:{n_cuit: 'n_cuit', d_denominacion:'d_denominacion', d_denominacion:'d_denominacion_mayuscula', d_tipo_documento: 'c_tipo_doc', n_documento: 'd_tipo_doc'},
        keyNav:true,
        draggable:true,
        onClose(){
            if($('#n_cuit').val() != ''){
                completarDenominacion();
            }
        }
    });

    $('#btn_buscar').click(function () {
        if($('#d_plan_pago').val()  == ""){
            mostrar_cuadro('I', 'Advertencia', 'Debe especificar un número de Plan de Pago.')
        } else {
            if ($('#frm_consulta').validationEngine('validate')) {

                $('#btn_lupa_plan_pago').hide();
                $('#btn_lupa_tipo_plan').hide();
                $('#btn_lupa_tipo_doc').hide();
                $('#btn_lupa_tipo_impo').hide();
                $('#btn_lupa_objeto_hecho').hide();
                $('#btn_lupa_provincia').hide();

                $('#d_plan_pago').attr('disabled', true);
                $('#c_tipo_plan_pago').attr('disabled', true);
                $('#n_cuit').attr('disabled', true);
                $('#d_denominacion').attr('disabled', true);
                $('#c_tipo_doc').attr('disabled', true);
                $('#d_tipo_imponible').attr('disabled', true);
                $('#d_objeto_hecho').attr('disabled', true);
                $('#c_provincia').attr('disabled', true);
                $('#observacion').attr('disabled', true);

                $.ajax({
                    type: 'POST',
                    url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                    data: {
                        "p_n_plan_pago": $('#d_plan_pago').val(),
                        "p_c_tipo_plan_pago": $('#c_tipo_plan_pago').val(),
                        "p_c_tributo": $('#c_tributo').val(),
                        "p_id_contribuyente": $('#id_contribuyente').val(),
                        "id_menu": v_id_menu,
                        "n_orden": 0
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.resultado === 'OK') {
                            $('#btn_reformular').attr('disabled', false);

                            filtros_no_nativos_ar = [];
                            filtros_arr_main = [];

                            if($('#d_plan_pago').val() != ''){
                                filtros_arr_main.push('Nro. Plan de Pago: '+ $('#d_plan_pago').val());
                            }
                            if($('#c_tipo_plan_pago').val() != ''){
                                filtros_arr_main.push('Tipo Plan Pago: '+ $('#c_tipo_plan_pago').val() +' - '+$('#d_tipo_plan_pago').val());
                            }
                            if($('#n_cuit').val() != ''){
                                filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());
                            }
                            if($('#d_denominacion').val() != ''){
                                filtros_arr_main.push('Denominación: '+ $('#d_denominacion').val());
                            }
                            if($('#c_tipo_doc').val() != ''){
                                filtros_arr_main.push('Tipo Doc.: '+ $('#c_tipo_doc').val() +' - '+$('#d_tipo_doc').val());
                            }
                            if($('#d_tipo_imponible').val() != ''){
                                filtros_arr_main.push('Tipo Imponible: '+ $('#d_tipo_imponible').val());
                            }
                            if($('#d_objeto_hecho').val() != ''){
                                filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());
                            }
                            if($('#c_provincia').val() != ''){
                                filtros_arr_main.push('Prov./Oficina: '+ $('#c_provincia').val() +' - '+$('#d_provincia').val());
                            }
                            if($('#observacion').val() != ''){
                                filtros_arr_main.push('Observación: '+ $('#observacion').val());
                            }

                            filtros_no_nativos_ar['main_grid'] = filtros_arr_main;

                            setea_parametros('#main_grid', {
                                ':p_n_plan_pago': $('#d_plan_pago').val(),
                                ':p_c_tipo_plan_pago': $('#c_tipo_plan_pago').val(),
                                ':p_c_tipo_imponible': $('#d_tipo_imponible').val(),
                                ':p_d_objeto_hecho': $('#d_objeto_hecho').val()
                            });
                            tomar_datos();
                        } else {
                            mostrar_cuadro('E', 'Error', data.resultado);
                            $('#btn_reformular').attr('disabled', true);

                            filtros_no_nativos_ar = [];
                            filtros_arr_main = [];

                            if($('#d_plan_pago').val() != ''){
                                filtros_arr_main.push('Nro. Plan de Pago: '+ $('#d_plan_pago').val());
                            }
                            if($('#c_tipo_plan_pago').val() != ''){
                                filtros_arr_main.push('Tipo Plan Pago: '+ $('#c_tipo_plan_pago').val() +' - '+$('#d_tipo_plan_pago').val());
                            }
                            if($('#n_cuit').val() != ''){
                                filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());
                            }
                            if($('#d_denominacion').val() != ''){
                                filtros_arr_main.push('Denominación: '+ $('#d_denominacion').val());
                            }
                            if($('#c_tipo_doc').val() != ''){
                                filtros_arr_main.push('Tipo Doc.: '+ $('#c_tipo_doc').val() +' - '+$('#d_tipo_doc').val());
                            }
                            if($('#d_tipo_imponible').val() != ''){
                                filtros_arr_main.push('Tipo Imponible: '+ $('#d_tipo_imponible').val());
                            }
                            if($('#d_objeto_hecho').val() != ''){
                                filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());
                            }
                            if($('#c_provincia').val() != ''){
                                filtros_arr_main.push('Prov./Oficina: '+ $('#c_provincia').val() +' - '+$('#d_provincia').val());
                            }
                            if($('#observacion').val() != ''){
                                filtros_arr_main.push('Observación: '+ $('#observacion').val());
                            }

                            filtros_no_nativos_ar['main_grid'] = filtros_arr_main;

                            setea_parametros('#main_grid', {
                                ':p_n_plan_pago': $('#d_plan_pago').val(),
                                ':p_c_tipo_plan_pago': $('#c_tipo_plan_pago').val(),
                                ':p_c_tipo_imponible': $('#d_tipo_imponible').val(),
                                ':p_d_objeto_hecho': $('#d_objeto_hecho').val()
                            });
                            tomar_datos();
                        }
                    }
                });
            }
        }
    });

    $('#btn_limpiar').click(function () {
        $('#main_grid').jqGrid('clearGridData');
        $('#frm_consulta :input').val(null);
        $("#frm_consulta").validationEngine('hideAll');
        $('#btn_reformular').attr('disabled', true);
        $('#btn_constancia').attr('disabled', true);
        $('#btn_chequeras').attr('disabled', true);
        $('#btn_contratos').attr('disabled', true);
        $('#desde').val(null);
        $('#hasta').val(null);

        $('#btn_lupa_plan_pago').show();
        $('#btn_lupa_tipo_plan').show();
        $('#btn_lupa_tipo_doc').show();
        $('#btn_lupa_tipo_impo').show();
        $('#btn_lupa_objeto_hecho').hide();
        $('#mascara_lupa_obj_hecho').show();
        $('#btn_lupa_provincia').show();

        $('#d_plan_pago').attr('disabled', false);
        $('#c_tipo_plan_pago').attr('disabled', false);
        $('#n_cuit').attr('disabled', false);
        $('#d_denominacion').attr('disabled', false);
        $('#c_tipo_doc').attr('disabled', false);
        $('#d_tipo_imponible').attr('disabled', false);
        $('#d_objeto_hecho').attr('disabled', false);
        $('#c_provincia').attr('disabled', false);
        $('#observacion').attr('disabled', false);

    });

    $('#btn_volver').click(function () {
        $('#modal_chequera').modal('hide');
    });

    $('#btn_chequeras').click(function () {
        if($('#desde').val()  == ""){
            mostrar_cuadro('I', 'Advertencia', 'Debe ingresar una plan desde.')
        } else {
            if ($('#frm_rangos_reformulacion').validationEngine('validate')) {
                $.ajax({
                    type: 'POST',
                    url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                    data: {
                        "p_c_tipo_plan_pago": $('#c_tipo_plan_pago').val(),
                        "p_n_plan_desde": $('#desde').val(),
                        "p_n_plan_hasta": $('#hasta').val(),
                        "id_menu": v_id_menu,
                        "n_orden": 2
                    },
                    dataType: 'json',
                    success: function (data) {
                        $('#main').procOverlay({visible: false});
                        if (data.resultado == 'OK') {
                            $('#n_cuota_desde').val(data.p_n_cuota_desde_chequera);
                            $('#n_cuota_hasta').val(data.p_n_cuota_hasta_chequera);
                            $('#modal_chequera').modal('show');
                        } else {
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                });
            }
        }
    });

    $('#btn_emitir').click(function () {
        if($('#n_cuota_desde').val()  == "" && $('#n_cuota_hasta').val()  == ""){
            mostrar_cuadro('I', 'Advertencia', 'Debe ingresar la cuota desde y hasta.')
        } else {
            for (var i = $('#desde').val(); i <= $('#hasta').val(); i++){
                if ($('#form_chequera').validationEngine('validate')) {
                    $.ajax({
                        type: 'POST',
                        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                        data: {
                            "p_n_cuota_desde": $('#n_cuota_desde').val(),
                            "p_n_cuota_hasta": $('#n_cuota_hasta').val(),
                            "p_n_plan_desde": i,
                            "p_n_plan_hasta": $('#hasta').val(),
                            "p_c_tipo_plan_pago": $('#c_tipo_plan_pago').val(),
                            "id_menu": v_id_menu,
                            "n_orden": 3
                        },
                        dataType: 'json',
                        success: function (data) {
                            $('#main').procOverlay({visible: false});
                            if (data.resultado == 'OK' && data.p_id_sesion) {
                                llamar_report('RECAL075_PDF','p_id_sesion|'+data.p_id_sesion,'PDF');
                            } else {
                                mostrar_cuadro('E', 'Error', data.resultado);
                                return;
                            }
                        }
                    });
                }
            }
        }
    });

    $('#btn_contratos').click(function () {
        var i;
        if($('#desde').val()  == ""){
            mostrar_cuadro('I', 'Advertencia', 'Debe ingresar una plan desde.')
        } else {
            for (i = $('#desde').val(); i <= $('#hasta').val(); i++) {
                if ($('#frm_rangos_reformulacion').validationEngine('validate')) {
                    $.ajax({
                        type: 'POST',
                        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
                        data: {
                            "p_c_tipo_plan_pago": $('#c_tipo_plan_pago').val(),
                            "id_menu": v_id_menu,
                            "n_orden": 4
                        },
                        dataType: 'json',
                        success: function (data) {
                            $('#main').procOverlay({visible: false});
                            if (data.resultado == 'OK') {
                                llamar_report(data.p_archivo, 'p_tipo_plan|' + $('#c_tipo_plan_pago').val() + '&p_plan|' + i, 'PDF');
                            } else {
                                mostrar_cuadro('E', 'Error', data.resultado);
                                return;
                            }
                        }
                    });
                }
            }
        }
    });

    $('#btn_constancia').click(function () {
        var i;
        if($('#desde').val()  == ""){
            mostrar_cuadro('I', 'Advertencia', 'Debe ingresar una plan desde.')
        } else {
            for (i = $('#desde').val(); i <= $('#hasta').val(); i++) {
                llamar_report('FACPL002', 'p_tipo_plan|' + $('#c_tipo_plan_pago').val() + '&p_plan|' + i, 'PDF');
            }
        }
    });

    $(".nav-item").click(function () {
        $(window).resize();
    });

    $('#btn_reformular').click(function () {
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                "p_c_tipo_plan_pago": $('#c_tipo_plan_pago').val(),
                "p_n_plan_pago": $('#d_plan_pago').val(),
                "p_id_contribuyente": $('#id_contribuyente').val(),
                "p_fecha_reformulacion": $('#fecha_reformulacion').val(),
                "p_provincia_reformulacion": $('#provincia_reformular').val(),
                "id_menu": v_id_menu,
                "n_orden": 6
            },
            dataType: 'json',
            success: function (data) {
                if (data.resultado == 'OK') {
                    if(data.p_mensaje != null) {
                        $('#main').procOverlay({visible: false});
                        mostrar_cuadro('C',
                            'Advertencia',
                            data.p_mensaje,
                            function () {
                                aceptar_reformulacion();
                            });
                    } else {
                        $('#main').procOverlay({visible: true});
                        aceptar_reformulacion();
                    }
                } else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    });

    $('#btn_volver_ref').click(function () {
        $('#modal_reformular').modal('hide');
    });

    $('#btn_continuar').click(function () {
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                "p_c_tipo_imponible": $('#d_tipo_imponible').val(),
                "p_c_concepto": $('#c_concepto').val(),
                "p_fecha_reformulacion": $('#fecha_reformulacion').val(),
                "p_provincia_reformulacion": $('#provincia_reformular').val(),
                "p_c_tipo_plan_pago": $('#c_tipo_plan_pago').val(),
                "p_n_plan_pago": $('#d_plan_pago').val(),
                "p_id_contribuyente": $('#id_contribuyente').val(),
                "p_f_emision": $('#f_emision').val(),
                "p_c_provincia": $('#c_provincia').val(),
                "p_n_tabla_deleg": $('#n_tabla_deleg').val(),
                "p_c_tipo_calculo": $('#c_tipo_calculo').val(),
                "p_n_plan_desde": $('#desde').val(),
                "p_n_plan_hasta": $('#hasta').val(),
                "p_tributo_plan": $('#c_tributo_plan').val(),
                "p_c_origen_deuda": $('#c_origen_deuda').val(),
                "p_c_seg_riesgo": $('#c_seg_riesgo').val(),
                "p_confirmacion": 'S',
                "p_id_sesion_refor": p_id_sesion_refor,
                "id_menu": v_id_menu,
                "n_orden": 7
            },
            dataType: 'json',
            success: function (data) {
                $('#main').procOverlay({visible: false});
                if (data.resultado == 'OK') {
                    mostrar_cuadro('S', 'Finalizado', 'Se ha reformulado el plan de pago exitosamente.');
                    $('#f_caducidad').val($('#fecha_reformulacion').val());
                    $('#c_caducidad').val('9');
                    $('#n_tabla_tipo_cad').val(data.p_n_tabla_tipo_cad);
                    $('#modal_reformular').modal('hide');
                    $('#btn_reformular').attr('disabled', true);
                    $('#btn_constancia').attr('disabled', false);
                    $('#btn_chequeras').attr('disabled', false);
                    $('#btn_contratos').attr('disabled', false);
                } else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    });
}