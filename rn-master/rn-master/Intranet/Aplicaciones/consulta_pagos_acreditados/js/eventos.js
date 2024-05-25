function inicializarEventos() {
    document.getElementById('totalizador').style.display="none";
    document.getElementById('grid_remito').style.display="none";
    document.getElementById('grid_id_contribuyente').style.display="none";
    document.getElementById('grid_sin_remito_ni_id_contrib').style.display="none";

    $("#mascara_lupa_c_documento").hide();
    $("#mascara_lupa_c_tributo").hide();
    $("#mascara_lupa_c_concepto").hide();

    $('#f_desde').change(function () {
        if($('#f_desde').val() && $('#f_hasta').val()){
            if ($.datepicker.parseDate('dd/mm/yy', $('#f_desde').val()) > $.datepicker.parseDate('dd/mm/yy', $('#f_hasta').val())){
                mostrar_error('La fecha Desde no puede ser mayor a la fecha Hasta', 'E', true);
                $('#f_desde').val(null);
                return;
            }
        }
    });

    $('#f_hasta').change(function () {
        if($('#f_desde').val() && $('#f_hasta').val()){
            if ($.datepicker.parseDate('dd/mm/yy', $('#f_desde').val()) > $.datepicker.parseDate('dd/mm/yy', $('#f_hasta').val())){
                mostrar_error('La fecha Hasta no puede ser menor a la fecha Desde', 'E', true);
                $('#f_hasta').val(null);
                return;
            }
        }

    });

    $("#lupa_d_denominacion").lupa_generica({
        id_lista:v_lista_denominaciones,
        titulos:[ 'ID Contribuyente', 'CUIT', 'Denominación', 'Cod. Tipo Documento', 'Tipo Documento', 'Nro. Documento', 'F. Alta'],
        grid:[
            {index:'id_contribuyente',width:450, hidden: true},
            {index:'n_cuit',width:100},
            {index:'d_denominacion',width:450},
            {index:'c_tipo_documento',width:150},
            {index:'d_tipo_documento',width:150},
            {index:'n_documento',width:150},
            {index:'f_alta',width:100}
        ],
        width: 1000,
        caption:'Lista de Denominaciones',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#desc_denom'],
        filtrosTitulos:['Denominación'],
        filtrosNulos:[false],
        limpiarCod: true,
        campos:{
            id_contribuyente: 'id_contribuyente',
            n_cuit: 'n_cuit',
            d_denominacion:'desc_denom',
            c_tipo_documento:'c_tipo_documento',
            d_tipo_documento:'d_tipo_documento',
            n_documento: 'n_documento',
            f_alta:'f_alta'
        },
        keyNav:true,
        draggable:true
    });

    $("#lupa_c_documento").lupa_generica({
        id_lista:v_lista_doc,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:449}],
        caption:'Tipos de Documento',
        sortname:'c_dato',
        sortorder:'asc',
        campos:{c_dato:'c_tipo_documento',d_dato:'d_tipo_documento'},
        searchCode:true,
        searchInput: '#c_tipo_documento',
        limpiarCod: true,
        keyNav:true,
        exactField: 'c_dato'
    });

    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_trib,
        titulos:['Cód. Tributo','Tributo'],
        grid:[  {index:'c_codigo',width:120},
            {index:'d_descrip',width:429}],
        caption:'Lista de Tributos',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        limpiarCod: true,
        searchCode: true,
    });

    $("#lupa_obj_hecho").lupa_generica({
        id_lista:v_lista_obj_hecho,
        titulos:['Objeto Hecho'],
        grid:[  {index:'d_objeto_hecho',width:565}],
        caption:'Lista de Objetos - Hechos',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        filtros:['#c_tributo','#d_objeto_hecho','#id_contribuyente'],
        filtrosNulos:[false,true,true],
        filtrosTitulos:['Tributo','Objeto','Contribuyente'],
        campos:{d_objeto_hecho:'d_objeto_hecho'},
        limpiarCod: true,
        keyNav:true,
        draggable:true
    });

    $("#lupa_c_concepto").lupa_generica({
        id_lista:v_lista_concepto,
        titulos:['Cód. Concepto','Concepto'],
        grid:[  {index:'c_codigo',width:140},
            {index:'d_descrip',width:409}],
        caption:'Lista de Conceptos',
        sortname:'c_codigo',
        sortorder:'asc',
        filtros:['#c_tributo','#n_cuit','c_tipo_documento','#n_documento','#d_objeto_hecho'],
        filtrosNulos: [true,false,true,true,true],
        filtrosTitulos:['Tributo','CUIT o Denominación'],
        campos:{c_codigo:'c_concepto',d_descrip: 'd_concepto'},
        searchInput: '#c_concepto',
        limpiarCod: true,
        searchCode: true,
        keyNav:true
    });

    $('#i_desde,#i_hasta').keypress(function(tecla){
        if(tecla.charCode<48 || tecla.charCode>57){
            if(tecla.charCode !== 44 && tecla.charCode !== 46){
                return false;
            }
        }
    });

    $('#lupa_d_denominacion').hide();

    $('#lupa_obj_hecho').hide();
    $("#n_posicion_fiscal").mask("9999/99");
    $("#n_cuit").mask("99-99999999-9");

    $('#i_desde').change(function () {
        $('#i_desde').val(formatea_number(mascara_numero(parse($('#i_desde').val()).toFixed(2), ',', -1, 2), ''));
    });

    $('#i_hasta').change(function () {
        $('#i_hasta').val(formatea_number(mascara_numero(parse($('#i_hasta').val()).toFixed(2), ',', -1, 2), ''));
    });

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    $('#d_objeto_hecho').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 2) {
            $('#lupa_obj_hecho').show().css('display', 'table-cell');
            $('#mascara_lupa_obj_hecho').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_obj_hecho').hide();
            $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 2) {
            $('#lupa_obj_hecho').hide();
            $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
        }
    });

    $('#desc_denom').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 5) {
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 5) {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        }
    });

    $('#btn_consulta').click(function(){
        if ((!$('#n_cuit').val()) &&
            (!$('#c_tipo_documento').val() && !$('#n_documento').val()) &&
            (!$('#remito').val()) &&
            (!$('#n_comprobante').val()) &&
            (!$('#f_desde').val() && !$('#f_hasta').val()) &&
            (!$('#i_desde').val() && !$('#i_hasta').val())){
            if (!$('#c_tributo').val() && !$('#d_objeto_hecho').val()){
                mostrar_cuadro('E', 'Error', 'El campo CUIT o Tipo y Documento o Remesa o Nro. Comprobante o Fechas de pago o Importes no puede quedar vacío.',
                    null,null,400);
            }else{
                autocompleta_por_tributo_y_objeto();
            }
        }else{
            document.getElementById('totalizador').style.display="flex";
            if($('#id_contribuyente').val()){

                document.getElementById('grid_id_contribuyente').style.display="block";
                document.getElementById('grid_remito').style.display="none";
                document.getElementById('grid_sin_remito_ni_id_contrib').style.display="none";
                $(window).resize();

                if($('#i_desde').val() === 0 || $('#i_desde').val() === ''){$('#i_desde').val(0)}
                if($('#i_hasta').val() === 0 || $('#i_hasta').val() === ''){$('#i_hasta').val(99999999999)}

                $('#i_desde').val(formatea_number(mascara_numero(parse($('#i_desde').val()).toFixed(2), ',', -1, 2), ''));
                $('#i_hasta').val(formatea_number(mascara_numero(parse($('#i_hasta').val()).toFixed(2), ',', -1, 2), ''));

                filtros_no_nativos = [];
                filtros_arr_main = [];
                if($('#n_cuit').val() != ''){
                    filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());
                }
                if($('#desc_denom').val() != ''){
                    filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());
                }
                if($('#c_tipo_documento').val() != ''){
                    filtros_arr_main.push('Tipo Documento: '+ $('#c_tipo_documento').val());
                }
                if($('#n_documento').val() != ''){
                    filtros_arr_main.push('Documento: '+ $('#n_documento').val());
                }
                if($('#remito').val() != ''){
                    filtros_arr_main.push('Remesa: '+ $('#remito').val());
                }
                if($('#cabezal').val() != ''){
                    filtros_arr_main.push('Lote: '+ $('#cabezal').val());
                }
                if($('#c_tributo').val() != ''){
                    filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());
                }
                if($('#c_tipo_form').val() != ''){
                    filtros_arr_main.push('Formulario: '+ $('#c_tipo_form').val());
                }
                if($('#n_comprobante').val() != ''){
                    filtros_arr_main.push('Nro. Comprobante: '+ $('#n_comprobante').val());
                }
                if($('#d_objeto_hecho').val() != ''){
                    filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());
                }
                if($('#c_concepto').val() != ''){
                    filtros_arr_main.push('Concepto: '+ $('#c_concepto').val());
                }
                if($('#n_posicion_fiscal').val() != ''){
                    filtros_arr_main.push('Posición Fiscal: '+ $('#n_posicion_fiscal').val());
                }
                if($('#n_cuota_anticipo').val() != ''){
                    filtros_arr_main.push('Nro. de Cuota o Anticipo: '+ $('#n_cuota_anticipo').val());
                }
                if($('#f_desde').val() != ''){
                    filtros_arr_main.push('F. Pago Desde: '+ $('#f_desde').val());
                }
                if($('#f_hasta').val() != ''){
                    filtros_arr_main.push('F. Pago Hasta: '+ $('#f_hasta').val());
                }
                if($('#i_desde').val() != ''){
                    filtros_arr_main.push('Importe Desde: '+ $('#i_desde').val());
                }
                if($('#i_hasta').val() != ''){
                    filtros_arr_main.push('Importe Hasta: '+ $('#i_hasta').val());
                }
                if($('#estado').val() != ''){
                    filtros_arr_main.push('Estado: '+ $('#estado').val());
                }

                filtros_no_nativos_ar['main_grid_id_contribuyente'] = filtros_arr_main;

                $('#n_cuit').attr('disabled', true);
                $('#desc_denom').attr('disabled', true);
                $('#c_tipo_documento').attr('disabled', true);
                $('#d_tipo_documento').attr('disabled', true);
                $('#n_documento').attr('disabled', true);
                $('#remito').attr('disabled', true);
                $('#cabezal').attr('disabled', true);
                $('#c_tributo').attr('disabled', true);
                $('#d_tributo').attr('disabled', true);
                $('#c_tipo_form').attr('disabled', true);
                $('#n_comprobante').attr('disabled', true);
                $('#d_objeto_hecho').attr('disabled', true);
                $('#c_concepto').attr('disabled', true);
                $('#d_concepto').attr('disabled', true);
                $('#n_posicion_fiscal').attr('disabled', true);
                $('#n_cuota_anticipo').attr('disabled', true);
                $('#f_desde').attr('disabled', true);
                $('#f_hasta').attr('disabled', true);
                $('#i_desde').attr('disabled', true);
                $('#i_hasta').attr('disabled', true);
                $('#estado').attr('disabled', true);
                $('#btn_consulta').attr('disabled', true);
                $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
                $('#lupa_d_denominacion').hide();
                $('#mascara_lupa_c_documento').show().css('display', 'table-cell');
                $('#lupa_c_documento').hide();
                $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
                $('#lupa_obj_hecho').hide();
                $('#mascara_lupa_c_tributo').show().css('display', 'table-cell');
                $('#lupa_c_tributo').hide();
                $('#mascara_lupa_c_concepto').show().css('display', 'table-cell');
                $('#lupa_c_concepto').hide();

                setea_parametros('#main_grid_id_contribuyente',{
                    ':p_remito':$('#remito').val(),
                    ':p_id_contribuyente':$('#id_contribuyente').val(),
                    ':p_c_tipo_imponible':$('#c_tipo_imponible').val(),
                    ':p_d_objeto_hecho':$('#d_objeto_hecho').val(),
                    ':p_c_tributo':$('#c_tributo').val(),
                    ':p_c_concepto':$('#c_concepto').val(),
                    ':p_n_posicion_fiscal':$('#n_posicion_fiscal').val().replace("/", ""),
                    ':p_n_cuota_anticipo':$('#n_cuota_anticipo').val(),
                    ':p_f_desde':$('#f_desde').val(),
                    ':p_f_hasta':$('#f_hasta').val(),
                    ':p_i_desde':($('#i_desde').val()).replace(/\./g, '').replace(',', '.'),
                    ':p_i_hasta':($('#i_hasta').val()).replace(/\./g, '').replace(',', '.'),
                    ':p_n_cabezal':$('#cabezal').val(),
                    ':p_c_estado_pago':$('#estado').val(),
                    ':p_c_tipo_form':$('#c_tipo_form').val()
                });
            } else if($('#remito').val()){

                document.getElementById('grid_remito').style.display="block";
                document.getElementById('grid_id_contribuyente').style.display="none";
                document.getElementById('grid_sin_remito_ni_id_contrib').style.display="none";

                $(window).resize();

                if($('#i_desde').val() === 0 || $('#i_desde').val() === ''){$('#i_desde').val(0)}
                if($('#i_hasta').val() === 0 || $('#i_hasta').val() === ''){$('#i_hasta').val(99999999999)}

                $('#i_desde').val(formatea_number(mascara_numero(parse($('#i_desde').val()).toFixed(2), ',', -1, 2), ''));
                $('#i_hasta').val(formatea_number(mascara_numero(parse($('#i_hasta').val()).toFixed(2), ',', -1, 2), ''));

                filtros_no_nativos = [];
                filtros_arr_main = [];
                if($('#n_cuit').val() != ''){
                    filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());
                }
                if($('#desc_denom').val() != ''){
                    filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());
                }
                if($('#c_tipo_documento').val() != ''){
                    filtros_arr_main.push('Tipo Documento: '+ $('#c_tipo_documento').val());
                }
                if($('#n_documento').val() != ''){
                    filtros_arr_main.push('Documento: '+ $('#n_documento').val());
                }
                if($('#remito').val() != ''){
                    filtros_arr_main.push('Remesa: '+ $('#remito').val());
                }
                if($('#cabezal').val() != ''){
                    filtros_arr_main.push('Lote: '+ $('#cabezal').val());
                }
                if($('#c_tributo').val() != ''){
                    filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());
                }
                if($('#c_tipo_form').val() != ''){
                    filtros_arr_main.push('Formulario: '+ $('#c_tipo_form').val());
                }
                if($('#n_comprobante').val() != ''){
                    filtros_arr_main.push('Nro. Comprobante: '+ $('#n_comprobante').val());
                }
                if($('#d_objeto_hecho').val() != ''){
                    filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());
                }
                if($('#c_concepto').val() != ''){
                    filtros_arr_main.push('Concepto: '+ $('#c_concepto').val());
                }
                if($('#n_posicion_fiscal').val() != ''){
                    filtros_arr_main.push('Posición Fiscal: '+ $('#n_posicion_fiscal').val());
                }
                if($('#n_cuota_anticipo').val() != ''){
                    filtros_arr_main.push('Nro. de Cuota o Anticipo: '+ $('#n_cuota_anticipo').val());
                }
                if($('#f_desde').val() != ''){
                    filtros_arr_main.push('F. Pago Desde: '+ $('#f_desde').val());
                }
                if($('#f_hasta').val() != ''){
                    filtros_arr_main.push('F. Pago Hasta: '+ $('#f_hasta').val());
                }
                if($('#i_desde').val() != ''){
                    filtros_arr_main.push('Importe Desde: '+ $('#i_desde').val());
                }
                if($('#i_hasta').val() != ''){
                    filtros_arr_main.push('Importe Hasta: '+ $('#i_hasta').val());
                }
                if($('#estado').val() != ''){
                    filtros_arr_main.push('Estado: '+ $('#estado').val());
                }

                filtros_no_nativos_ar['main_grid_remito'] = filtros_arr_main;

                setea_parametros('#main_grid_remito',{
                    ':p_remito':$('#remito').val(),
                    ':p_id_contribuyente':$('#id_contribuyente').val(),
                    ':p_c_tipo_imponible':$('#c_tipo_imponible').val(),
                    ':p_d_objeto_hecho':$('#d_objeto_hecho').val(),
                    ':p_c_tributo':$('#c_tributo').val(),
                    ':p_c_concepto':$('#c_concepto').val(),
                    ':p_n_posicion_fiscal':$('#n_posicion_fiscal').val().replace("/", ""),
                    ':p_n_cuota_anticipo':$('#n_cuota_anticipo').val(),
                    ':p_f_desde':$('#f_desde').val(),
                    ':p_f_hasta':$('#f_hasta').val(),
                    ':p_i_desde':($('#i_desde').val()).replace(/\./g, '').replace(',', '.'),
                    ':p_i_hasta':($('#i_hasta').val()).replace(/\./g, '').replace(',', '.'),
                    ':p_n_cabezal':$('#cabezal').val(),
                    ':p_c_estado_pago':$('#estado').val(),
                    ':p_c_tipo_form':$('#c_tipo_form').val()
                });
            } else{

                document.getElementById('grid_sin_remito_ni_id_contrib').style.display="block";
                document.getElementById('grid_remito').style.display="none";
                document.getElementById('grid_id_contribuyente').style.display="none";
                $(window).resize();

                if($('#i_desde').val() === 0 || $('#i_desde').val() === ''){$('#i_desde').val(0)}
                if($('#i_hasta').val() === 0 || $('#i_hasta').val() === ''){$('#i_hasta').val(99999999999)}

                $('#i_desde').val(formatea_number(mascara_numero(parse($('#i_desde').val()).toFixed(2), ',', -1, 2), ''));
                $('#i_hasta').val(formatea_number(mascara_numero(parse($('#i_hasta').val()).toFixed(2), ',', -1, 2), ''));

                filtros_no_nativos = [];
                filtros_arr_main = [];
                if($('#n_cuit').val() != ''){
                    filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());
                }
                if($('#desc_denom').val() != ''){
                    filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());
                }
                if($('#c_tipo_documento').val() != ''){
                    filtros_arr_main.push('Tipo Documento: '+ $('#c_tipo_documento').val());
                }
                if($('#n_documento').val() != ''){
                    filtros_arr_main.push('Documento: '+ $('#n_documento').val());
                }
                if($('#remito').val() != ''){
                    filtros_arr_main.push('Remesa: '+ $('#remito').val());
                }
                if($('#cabezal').val() != ''){
                    filtros_arr_main.push('Lote: '+ $('#cabezal').val());
                }
                if($('#c_tributo').val() != ''){
                    filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());
                }
                if($('#c_tipo_form').val() != ''){
                    filtros_arr_main.push('Formulario: '+ $('#c_tipo_form').val());
                }
                if($('#n_comprobante').val() != ''){
                    filtros_arr_main.push('Nro. Comprobante: '+ $('#n_comprobante').val());
                }
                if($('#d_objeto_hecho').val() != ''){
                    filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());
                }
                if($('#c_concepto').val() != ''){
                    filtros_arr_main.push('Concepto: '+ $('#c_concepto').val());
                }
                if($('#n_posicion_fiscal').val() != ''){
                    filtros_arr_main.push('Posición Fiscal: '+ $('#n_posicion_fiscal').val());
                }
                if($('#n_cuota_anticipo').val() != ''){
                    filtros_arr_main.push('Nro. de Cuota o Anticipo: '+ $('#n_cuota_anticipo').val());
                }
                if($('#f_desde').val() != ''){
                    filtros_arr_main.push('F. Pago Desde: '+ $('#f_desde').val());
                }
                if($('#f_hasta').val() != ''){
                    filtros_arr_main.push('F. Pago Hasta: '+ $('#f_hasta').val());
                }
                if($('#i_desde').val() != ''){
                    filtros_arr_main.push('Importe Desde: '+ $('#i_desde').val());
                }
                if($('#i_hasta').val() != ''){
                    filtros_arr_main.push('Importe Hasta: '+ $('#i_hasta').val());
                }
                if($('#estado').val() != ''){
                    filtros_arr_main.push('Estado: '+ $('#estado').val());
                }

                filtros_no_nativos_ar['main_grid_sin_remito_ni_id_contrib'] = filtros_arr_main;

                setea_parametros('#main_grid_sin_remito_ni_id_contrib',{
                    ':p_remito':$('#remito').val(),
                    ':p_id_contribuyente':$('#id_contribuyente').val(),
                    ':p_c_tipo_imponible':$('#c_tipo_imponible').val(),
                    ':p_d_objeto_hecho':$('#d_objeto_hecho').val(),
                    ':p_c_tributo':$('#c_tributo').val(),
                    ':p_c_concepto':$('#c_concepto').val(),
                    ':p_n_posicion_fiscal':$('#n_posicion_fiscal').val().replace("/", ""),
                    ':p_n_cuota_anticipo':$('#n_cuota_anticipo').val(),
                    ':p_f_desde':$('#f_desde').val(),
                    ':p_f_hasta':$('#f_hasta').val(),
                    ':p_i_desde':($('#i_desde').val()).replace(/\./g, '').replace(',', '.'),
                    ':p_i_hasta':($('#i_hasta').val()).replace(/\./g, '').replace(',', '.'),
                    ':p_n_cabezal':$('#cabezal').val(),
                    ':p_c_estado_pago':$('#estado').val(),
                    ':p_c_tipo_form':$('#c_tipo_form').val()
                });
            }
        }

    });

    $('#btn_limpiar').click(function(){

        document.getElementById('grid_remito').style.display="none";
        document.getElementById('grid_id_contribuyente').style.display="none";
        document.getElementById('grid_sin_remito_ni_id_contrib').style.display="none";
        document.getElementById('totalizador').style.display="none";

        $('#id_contribuyente').val(null);
        $('#n_cuit').val(null);
        $('#desc_denom').val(null);
        $('#c_tipo_documento').val(null);
        $('#d_tipo_documento').val(null);
        $('#n_documento').val(null);
        $('#remito').val(null);
        $('#cabezal').val(null);
        $('#c_tributo').val(null);
        $('#d_tributo').val(null);
        $('#c_tipo_form').val(null);
        $('#n_comprobante').val(null);
        $('#d_objeto_hecho').val(null);
        $('#c_concepto').val(null);
        $('#d_concepto').val(null);
        $('#n_posicion_fiscal').val(null);
        $('#n_cuota_anticipo').val(null);
        $('#f_desde').val(null);
        $('#f_hasta').val(null);
        $('#i_desde').val(null);
        $('#i_hasta').val(null);
        $('#estado').val(null);

        $('#tot_obj_hecho').val(null);
        $('#tot_cuit').val(null);
        $('#tot_nombre').val(null);
        $('#tot_importe_pagado').val(null);

        $('#n_cuit').attr('disabled', false);
        $('#desc_denom').attr('disabled', false);
        $('#c_tipo_documento').attr('disabled', false);
        $('#d_tipo_documento').attr('disabled', false);
        $('#n_documento').attr('disabled', false);
        $('#remito').attr('disabled', false);
        $('#cabezal').attr('disabled', false);
        $('#c_tributo').attr('disabled', false);
        $('#d_tributo').attr('disabled', false);
        $('#c_tipo_form').attr('disabled', false);
        $('#n_comprobante').attr('disabled', false);
        $('#d_objeto_hecho').attr('disabled', false);
        $('#c_concepto').attr('disabled', false);
        $('#d_concepto').attr('disabled', false);
        $('#n_posicion_fiscal').attr('disabled', false);
        $('#n_cuota_anticipo').attr('disabled', false);
        $('#f_desde').attr('disabled', false);
        $('#f_hasta').attr('disabled', false);
        $('#i_desde').attr('disabled', false);
        $('#i_hasta').attr('disabled', false);
        $('#estado').attr('disabled', false);
        $('#btn_consulta').attr('disabled', false);
        $('#lupa_d_denominacion').show().css('display', 'table-cell');
        $('#mascara_lupa_d_denominacion').hide();
        $('#lupa_c_documento').show().css('display', 'table-cell');
        $('#mascara_lupa_c_documento').hide();
        $('#lupa_obj_hecho').show().css('display', 'table-cell');
        $('#mascara_lupa_obj_hecho').hide();
        $('#lupa_c_tributo').show().css('display', 'table-cell');
        $('#mascara_lupa_c_tributo').hide();
        $('#lupa_c_concepto').show().css('display', 'table-cell');
        $('#mascara_lupa_c_concepto').hide();
    });

    $('#n_documento, #c_tipo_documento').focusout(function(){
        if ($('#c_tipo_documento').val() && $('#n_documento').val()){
            if(!$('#id_contribuyente').val()){
                autocompleta_por_doc();
            }
        }
    });

    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() !== ''){
            if( limpia_cuit($('#n_cuit').val()).length === 11 ){
                autocompleta_contrib_por_cuit();
            }else{
                $('#id_contribuyente').val(null);
                $('#n_cuit').val(null);
                $('#desc_denom').val(null);
                $('#c_tipo_documento').val(null);
                $('#d_tipo_documento').val(null);
                $('#n_documento').val(null);
            }
        }
    });
}

