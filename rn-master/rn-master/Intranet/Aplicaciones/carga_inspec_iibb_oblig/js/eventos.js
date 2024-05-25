function inicializarEventos() {
    _get_datos(v_n_instancia, v_n_orden, v_id_obligacion);

    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "onclick": null,
        "showDuration": "1000",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    window.addEventListener('click', function(e){
        if (
            !(document.getElementById('actividades_grid').contains(e.target))
            &&
            $('#actividades_grid input').length > 0 ){
            toastr["warning"]("Existen modificaciones en la grilla de actividades sin guardar.", "Edición de Actividades");
        }
    });

    $('#btn_i_ret_b_verif').click(function () {
        _show_modal_deducciones('banco');
    });

    $('#btn_i_ret_verif').click(function () {
        _show_modal_deducciones('iibb');
    });

    $('#btn_i_p_verif').click(function () {
        _show_modal_deducciones('percep');
    });

    $('#btn_i_p_ad_verif').click(function () {
        _show_modal_deducciones('aduana');
    });

    $('#btn_inf_adicional').click(function () {
       setea_parametros('#inf_adicional_grid',
           {':p_n_instancia':v_n_instancia,
                        ':p_n_orden':v_n_orden,
                        ':p_id_obligacion':v_id_obligacion});
       $('#inf_adicional_modal').modal('show');
    });

    $('#ant_pos').click(function () {
        let id_obligacion = $('#obl_anterior').val();
        if (id_obligacion) {
            v_id_obligacion = id_obligacion;
            _get_datos(v_n_instancia, v_n_orden, v_id_obligacion);
        }
    });

    $('#sig_pos').click(function () {
        let id_obligacion = $('#obl_siguiente').val();
        if (id_obligacion){
            v_id_obligacion = id_obligacion;
            _get_datos(v_n_instancia, v_n_orden, v_id_obligacion);
        }
    });

    $('#check_trasladar').click(function () {
        let v_m_trasladar;

        if ($(this).is(':checked')){
            v_m_trasladar = 'S';
        }else {
            v_m_trasladar = 'N';
        }

        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{
                "p_n_instancia":v_n_instancia,
                "p_n_orden":v_n_orden,
                "p_id_obligacion":v_id_obligacion,
                "p_m_trasladar":v_m_trasladar,
                "id_menu":v_id_menu,
                "n_orden":7
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){

                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    $('#check_trasladar').prop('checked',false);
                    return;
                }
            }
        });
    });

    $('#btn_rec_pagos').click(function () {
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{
                "p_id_obligacion":v_id_obligacion,
                "p_n_instancia":v_n_instancia,
                "p_n_orden":v_n_orden,
                "id_menu":v_id_menu,
                "n_orden":2
            },
            dataType:'json',
            success: function( data ) {
                $('#main').procOverlay({visible:false});
                if(data.resultado == 'OK'){
                   /* $('#i_cred_ant_verif').val(formatea_number(data.p_cred_ant.replace('.',','),0));
                    $('#i_cred_post_verif').val(formatea_number(data.p_cred_post.replace('.',','),0));
                    //SALDO CONTR. / SALDO ART
                    let saldo = data.p_saldo_fisca.replace('.',',')
                    if (parse(saldo) < 0){
                        $('#i_saldo_contrib').val(formatea_number(saldo.replace('-',''),0));
                        $('#i_saldo_art').val('0,00');
                    }else if (parse(saldo) > 0){
                        $('#i_saldo_art').val(formatea_number(saldo.replace('-',''),0));
                        $('#i_saldo_contrib').val('0,00')
                    }else {
                        $('#i_saldo_contrib, #i_saldo_art').val(formatea_number(saldo.replace('-',''),0));
                    }*/

                   //recuperamos todos los datos porque cambian intereses
                    _get_datos(v_n_instancia,v_n_orden,v_id_obligacion);

                }else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    });

    $('#regimen_verif, #tipo_act_verif, #categoria_verif').change(function () {
        if(!$(this).val()){
            $(this).val($('#original_'+$(this).attr('name')).val());
            $(this).selectpicker('refresh');
        }
    });

    $('#regimen_verif').change(function () {
        get_options_tipo_act( $('#tipo_act_verif').val(),$('#categoria_verif').val());
    });

    $('#tipo_act_verif').change(function () {
        get_categorias( $('#categoria_verif').val());
    });

    $('#btn_act_reg_verif').click(function () {
        if ($('#frm_regimen').validationEngine('validate')){
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{
                    "p_n_instancia":v_n_instancia,
                    "p_n_orden":v_n_orden,
                    "p_id_obligacion":v_id_obligacion,
                    "p_c_regimen":$('#regimen_verif').val(),
                    "p_c_tipo_act":$('#tipo_act_verif').val(),
                    "p_c_categoria":$('#categoria_verif').val(),
                    "id_menu":v_id_menu,
                    "n_orden":3
                },
                dataType:'json',
                success: function( data ) {
                    $('#main').procOverlay({visible:false});
                    if(data.resultado == 'OK'){
                        $('#original_regimen_verif').val($('#regimen_verif').val());
                        $('#original_tipo_act_verif').val($('#categoria_verif').val());
                        $('#original_categoria_verif').val($('#categoria_verif').val());
                        _get_datosVerif(v_n_instancia,v_n_orden,v_id_obligacion);
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    $(".mascara_importe").each(function () {
        var events = $._data(this, 'events');
        if (events && events['keydown']) return;
        $(this).keydown(function (event) {
            if ($(this).prop('readonly')) return;
            return controla_number(event, this, 2);
        });
    }).css('text-align', 'right');

    $('#i_saldo_favor_verif, #i_otros_cred_verif, #i_otros_deb_verif, #i_bonif_verif, #i_ajus_min_verif').blur(function () {
        if ($(this).val()){
            let campo = $(this);
            let campo_original = $('#'+campo.attr('id')+'_orig');
            if (campo.val() != campo_original.val()){
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{
                        "p_n_instancia":v_n_instancia,
                        "p_n_orden": v_n_orden,
                        "p_id_obligacion": v_id_obligacion,
                        "p_i_saldo_favor_verif": $('#i_saldo_favor_verif').val(),
                        "p_i_otr_creditos_verif": $('#i_otros_cred_verif').val(),
                        "p_i_otr_debitos_verif": $('#i_otros_deb_verif').val(),
                        "p_i_bonificaciones_verif": $('#i_bonif_verif').val(),
                        "p_i_ajuste_minimo_verif": $('#i_ajus_min_verif').val(),
                        "id_menu":v_id_menu,
                        "n_orden":4
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                            campo_original.val(campo.val());
                            _get_datosVerif(v_n_instancia,v_n_orden,v_id_obligacion);
                        }
                        else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            _get_datosVerif(v_n_instancia,v_n_orden,v_id_obligacion);
                        }
                    }
                });
            }
        }else{
            $(this).val($('#'+$(this).attr('id')+'_orig').val());
        }
    });

    $('#deduc_p_desde, #deduc_p_hasta, #alta_deduc_pfisc').mask('999999');
    $('#alta_deduc_anio').mask('9999');
    $('#alta_deduc_mes').mask('99');
    $('#alta_deduc_cuit').mask('99-99999999-9');

    $('#alta_deduc_cuit').change(function (){
        if ($('#alta_deduc_cuit').val() && $('#alta_deduc_cuit').val().length == 13){
            completarDenominacion();
        }else{
            $("#alta_deduc_id_contrib").val(null);
            $("#alta_deduc_cuit").val(null);
            $("#alta_deduc_denominacion").val(null);
        }
    });

    $('#alta_deduc_mes').change(function () {
        if ($('#alta_deduc_mes').val() && ($('#alta_deduc_mes').val().length < 2 || (parse($('#alta_deduc_mes').val()) > 12 || parse($('#alta_deduc_mes').val()) < 0)) ){
            toastr["error"]("El mes ingresado no es correcto, verifique el formato establecido.", "Mes de la deducción");
            $('#alta_deduc_mes').val(null);
        }

        check_pos_fiscal_ded (this);
        bloquear_calendar_alta_deducciones ();
    });

    $('#alta_deduc_anio').change(function () {
        if ($('#alta_deduc_anio').val() && ($('#alta_deduc_anio').val().length < 4 || parse($('#alta_deduc_mes').val()) < 0)){
            toastr["error"]("El año ingresado no es correcto, verifique el formato establecido.", "Año de la deducción");
            $('#alta_deduc_anio').val(null);
        }

        if( parse($('#alta_deduc_anio').val()) > v_anio){
            toastr["error"]("El año ingresado no puede ser mayor al de la posición fiscal actual.", "Año de la deducción");
            $('#alta_deduc_anio').val('');
        }

        check_pos_fiscal_ded (this);
        bloquear_calendar_alta_deducciones ();
    });

    $('#alta_deduc_pfisc').change(function () {
        if ($('#alta_deduc_pfisc').val() && ($('#alta_deduc_pfisc').val().length < 6 || parse($('#alta_deduc_pfisc').val()) < 0)){
            toastr["error"]("La posición fiscal ingresada no es correcta, verifique el formato establecido.", "Pos Fiscal de la deducción");
            $('#alta_deduc_pfisc').val(null);
        }

        let pos_fiscal_ded = parse($('#alta_deduc_pfisc').val());
        if (pos_fiscal_ded > v_pos_fiscal) {
            toastr["error"]("La posición fiscal de la deducción no puede ser superior a la posición fiscal actual.", "Pos. Fiscal de la deducción");
            $('#alta_deduc_pfisc').val(null);
        }

        check_pos_fiscal_ded (this);
    });

    $('#alta_deduc_letra').keypress(function (tecla) {
        return ((tecla.charCode >= 65 && tecla.charCode <= 90) ||  (tecla.charCode >= 95 && tecla.charCode <= 122));
    });

    $("#alta_deduc_denominacion").autocomplete({
        source: function( request, response ) {
            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "carga_inspec_iibb_oblig/php/autocomplete.php",
                    data: {p_oper:'getAutocomplete',p_filtro: request.term},
                    dataType: 'json',
                    success: function( data ) {
                        ajax_autocomplete = null;
                        if(data) {
                            response(
                                $.map(data.data_contrib, function( item ) {
                                    return {
                                        label: item.label,
                                        value: item.razon_social,
                                        cuit: item.cuit,
                                        id_contribuyente: item.id_contribuyente
                                    }
                                })
                            );
                        }
                    }
                });
        },
        minLength:1,
        select:function(event,ui){
            $("#alta_deduc_denominacion").val(ui.item.value);
            $("#alta_deduc_cuit").val(ui.item.cuit);
            $("#alta_deduc_id_contrib").val(ui.item.id_contribuyente);
            return false;
        }
    });

    $(".input_fecha").datepicker({
        changeMonth:true,
        changeYear:true,
        dateFormat:'dd/mm/yy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá']
    }).change(function () {
        if ($(this).val().length > 0 && $(this).val().length != 10){
            mostrar_error("El Formato de la Fecha ingresada no es válido.");
            $(this).val(null);
        }
    }).mask("99/99/9999");

    $('#deduc_f_desde').change(function () {
        $('#deduc_f_hasta').datepicker('option','minDate',$('#deduc_f_desde').val());
    });

    $('#deduc_f_hasta').change(function () {
        $('#deduc_f_desde').datepicker('option','maxDate',$('#deduc_f_hasta').val());
    });

    $('#modal_alta_deduc').on('shown.bs.modal', function (e) {
        bloquear_calendar_alta_deducciones ();
    })

    $('#modal_deduc_grilla1_checkbox').unbind();

    $('#check_select_all').click(function () {
        if($(this).is(':checked') == true && $('#modal_deduc_grilla1').getGridParam('reccount') > 0){
            $('.checkbox_deducciones').prop('checked', true);
            _agregar_quitar_deduccion(null,'CT');
        }
    });

    $('#deduccion_origen').change(function(){
        if ($('#deduccion_origen').val() == 1){
            $('#pos_fiscal_ded').hide();
        }else{
            $('#pos_fiscal_ded').show()
        }
    });

    $('#btn_deduc_buscar').click(function () {
        if ($('#modal_deduc_form').validationEngine('validate')){
            let v_origen = $('#origen_modal').val();
            if ($('#deduccion_origen').val() == 1){
                v_origen = v_origen + '_CONTRIB';
            }

            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{
                    "p_n_instancia":v_n_instancia,
                    "p_n_orden":v_n_orden,
                    "p_id_obligacion":v_id_obligacion,
                    "p_origen":v_origen,
                    "p_pos_fiscal_desde":$('#deduc_p_desde').val(),
                    "p_pos_fiscal_hasta":$('#deduc_p_hasta').val(),
                    //"p_f_desde":$('#deduc_f_desde').val(),
                    //"p_f_hasta":$('#deduc_f_hasta').val(),
                    "id_menu":v_id_menu,
                    "n_orden":5
                },
                dataType:'json',
                success: function( data ) {
                    $('#main').procOverlay({visible:false});
                    if(data.resultado == 'OK'){
                        _mostrar_ocultar_columnas($('#deduccion_origen').val(),$('#origen_modal').val());
                        setea_parametros('#modal_deduc_grilla1',{':p_n_instancia':v_n_instancia,':p_n_orden':v_n_orden,':p_id_obligacion':v_id_obligacion});
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        }
    });

    $('#btn_alta_deduc').click(function () {
        if ($('#modal_alta_deduc_form').validationEngine('validate')){
            _agregar_quitar_deduccion(null,$('#alta_deduc_oper').val());

        }
    });

    $("#btn_cerrar").click(function(){
        window.close();
    });
}