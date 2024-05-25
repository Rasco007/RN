function inicializarEventos() {

    document.getElementById('grid_obligaciones').style.display="none";

    $('#lupa_d_denominacion').hide();
    $('#lupa_obj_hecho').hide();
    $("#n_cuit").mask("99-99999999-9");

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    $('#d_objeto_hecho').on('keydown focusout', function (event) {
        if(!$('#n_cuit').val() && !$('#c_tributo').val()){
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
        }else{
            $('#lupa_obj_hecho').show().css('display', 'table-cell');
            $('#mascara_lupa_obj_hecho').hide();
        }
    });

    $('#n_cuit, #c_tributo').focusout(function(){
        if ($('#n_cuit').val() && $('#c_tributo').val()){
            $('#lupa_obj_hecho').show().css('display', 'table-cell');
            $('#mascara_lupa_obj_hecho').hide();
        }else{
            $('#lupa_obj_hecho').hide();
            $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
        }
    });


    $('#desc_denom').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 4) {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        }
    });

    $('#btn_imprimir').click(function(){
        $('#main').procOverlay({visible:true});
        if (!$('#id_contribuyente').val()){
            mostrar_cuadro('E', 'Error', 'Debe seleccionar un Contribuyente.',null,null,350);
            $('#main').procOverlay({visible:false});
            return;
        }
        if (!$('#f_vto_desde').val()){
            mostrar_cuadro('E', 'Error', 'El campo F. Vto. Obligación Desde no puede quedar vacío.',null,null,350);
            $('#main').procOverlay({visible:false});
            return;
        }if ($.datepicker.parseDate('dd/mm/yy', $('#f_vto_desde').val()) > $.datepicker.parseDate('dd/mm/yy', $('#f_vto_hasta').val())){
            mostrar_error('Debe ingresar una Fecha de Vto. Obligación Desde menor a Fecha de Vto. Obligación Hasta.', 'E', true);
            $('#main').procOverlay({visible:false});
        }
        else{
            imprimir();
        }
    });

    $('#btn_excel').click(function(){
        $('#main').procOverlay({visible:true});
        if (!$('#id_contribuyente').val()){
            $('#main').procOverlay({visible:false});
            mostrar_cuadro('E', 'Error', 'Debe seleccionar un Contribuyente.',null,null,350);
            return;
        }if (!$('#c_tributo').val()){
            $('#main').procOverlay({visible:false});
            mostrar_cuadro('E', 'Error', 'El campo Tributo no puede quedar vacío.',null,null,350);
            return;
        }if (!$('#d_objeto_hecho').val()){
            $('#main').procOverlay({visible:false});
            mostrar_cuadro('E', 'Error', 'El campo Objeto/Hecho no puede quedar vacío.',null,null,350);
            return;
        // }if (!$('#c_concepto').val()){
        //     $('#main').procOverlay({visible:false});
        //     mostrar_cuadro('E', 'Error', 'El campo Concepto no puede quedar vacío.',null,null,350);
        //     return;
        }if (!$('#f_vto_desde').val()){
            $('#main').procOverlay({visible:false});
            mostrar_cuadro('E', 'Error', 'El campo F. Vto. Obligación Desde no puede quedar vacío.',null,null,350);
            return;
        }if ($.datepicker.parseDate('dd/mm/yy', $('#f_vto_desde').val()) > $.datepicker.parseDate('dd/mm/yy', $('#f_vto_hasta').val())){
            $('#main').procOverlay({visible:false});
            mostrar_error('Debe ingresar una Fecha de Vto. Obligación Desde menor a Fecha de Vto. Obligación Hasta.', 'E', true);
        }else{
            excel();
        }
    });

    $('#btn_limpiar').click(function(){
        document.getElementById('grid_obligaciones').style.display="none";

        $('#id_contribuyente').val(null);
        $('#c_tipo_imponible').val(null);
        $('#n_cuit').val(null);
        $('#desc_denom').val(null);
        $('#c_tipo_documento').val(null);
        $('#d_tipo_documento').val(null);
        $('#n_documento').val(null);
        $('#c_tributo').val(null);
        $('#d_tributo').val(null);
        $('#d_objeto_hecho').val(null);
        $('#c_concepto').val(null);
        $('#d_concepto').val(null);
        $('#f_vto_desde').val(null);
        $('#f_vto_hasta').val(fecha_hoy);
        $('#lupa_obj_hecho').hide();
        $('#lupa_d_denominacion').hide();
        $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        $('#main_grid_obligaciones').clearGridData();
    });

    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() !== ''){
            if( limpia_cuit($('#n_cuit').val()).length === 11 ){
                autocompleta_contrib_por_cuit();
            }else{
                $('#id_contribuyente').val(null);
                $('#c_tipo_imponible').val(null);
                $('#n_cuit').val(null);
                $('#desc_denom').val(null);
                $('#c_tipo_documento').val(null);
                $('#d_tipo_documento').val(null);
                $('#n_documento').val(null);
                $('#c_tributo').val(null);
                $('#d_tributo').val(null);
                $('#d_objeto_hecho').val(null);
                $('#c_concepto').val(null);
                $('#d_concepto').val(null);
                $('#f_vto_desde').val(null);
            }
        }
    });

    $('#n_documento, #c_tipo_documento').focusout(function(){
        if ($('#c_tipo_documento').val() && $('#n_documento').val()){
            if(!$('#id_contribuyente').val()){
                autocompleta_por_doc();
            }
        }
    });

    $('#c_tributo, #d_objeto_hecho').focusout(function(){
        if ($('#c_tributo').val() && $('#d_objeto_hecho').val()){
            if(!$('#id_contribuyente').val()){
                autocompleta_por_tributo_y_objeto();
            }
        }
    });
}

