function inicializarEventos(){
    $("#n_pos_fiscal").mask("9999/99");

    $('#n_pos_fiscal').focusout(function(){
        var string = $('#n_pos_fiscal').val();
        if(string != ''){
            var res;
            var retorno;
            res = string.split("/");
            if(res.length >1){
                retorno = res[0] + res[1];
            }else{
                retorno = res[0];
            }
            if(retorno.length != 6 ){
                mostrar_cuadro('I', 'Advertencia', 'El formato de la posicion fiscal es incorrecto. Debe tener el siguiente formato: aaaa/mm. ', '', '', 400, 200);
                $('#n_pos_fiscal').val(null);
                $('#n_pos_fiscal').focus();
            }else{
                if(retorno.substring(4) > 12) {
                    mostrar_cuadro('I', 'Advertencia', 'El formato de la posicion fiscal es incorrecto. El mes no puede ser mayor a 12.', '', '', 400, 200);
                    $('#n_pos_fiscal').val(null);
                    $('#n_pos_fiscal').focus();
                }else {
                    $('#n_pos_fiscal').val(retorno.substring(0, 4) + '/' + retorno.substring(4));
                }
            }
        }

    });

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        maxDate:fecha_hoy,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999").change(function () {
        if ($(this).val() && $(this).val().length != 10){
            mostrar_validacion("El Formato de la Fecha ingresada no es válido.");
            $(this).val(null);
        }else if ($.datepicker.parseDate('dd/mm/yy', $(this).val()) > $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
            $(this).datepicker("setDate" , fecha_hoy);
        }
    });

    $("#n_cuit").mask("99-99999999-9");
    $('#n_cuit').change(function (){
        if ($('#n_cuit').val() && $('#n_cuit').val().length == 13){
            completarDenominacion();
        }else{
            $("#d_denominacion").val(null);
            $("#n_cuit").val(null);
            $("#cuit_limpio").val(null);
            $("#id_contribuyente").val(null);
            $("#d_objeto_hecho").val('');
        }
    });

    $('.numerico').keypress(function (tecla) {
        return (tecla.charCode >= 48 && tecla.charCode <= 57);
    });

    $(".mascara_importe").each(function () {
        var events = $._data(this, 'events');
        // if (events && events['keydown']) return;
        $(this).keydown(function (event) {
            if ($(this).prop('readonly')) return;
            return controla_number(event, this, 2);
        });
    }).css('text-align', 'right');

    //Completamos Datos del Contribuyente
    $("#d_denominacion").autocomplete({
        source: function( request, response ) {
            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "ajustes_admin/autocomplete.php",
                    data: {p_oper:'getCUIT',p_filtro: request.term},
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
                                        id_contribuyente: item.id_contribuyente,
                                        c_tipo_documento: item.c_tipo_documento,
                                        n_documento: item.n_documento
                                    }
                                })
                            );
                        }
                    }
                });
        },
        minLength:1,
        select:function(event,ui){
            $("#d_denominacion").val(ui.item.value);
            $("#n_cuit").val(ui.item.cuit);
            $("#cuit_limpio").val(ui.item.cuit_limpio);
            $("#id_contribuyente").val(ui.item.id_contribuyente);
            $("#c_tipo_doc").val(ui.item.c_tipo_documento);
            $("#n_documento").val(ui.item.n_documento);
            return false;
        }
    });

    $('#n_documento').change(function () {
        if($("#n_documento").val()){
            if($("#c_tipo_doc").val()){
                $('#main').procOverlay({visible:true});
                $.ajax({
                    url: "ajustes_admin/autocomplete.php",
                    type:"POST",
                    data:{
                        p_oper:'getDatosDocumento',
                        p_id_menu: v_id_menu,
                        p_id_contribuyente: $("#id_contribuyente").val(),
                        p_c_tipo_imponible: $("#c_tipo_imponible").val(),
                        p_c_tipo_doc: $('#c_tipo_doc').val(),
                        p_n_documento: $('#n_documento').val()
                    },
                    success: function(response)
                    {
                        $('#main').procOverlay({visible:false});
                        res = JSON.parse(response);
                        if (res.resultado == 'OK'){
                            if (res.error){
                                mostrar_error(res.error);
                            }else{
                                $("#n_cuit").val(res.n_cuit);
                                $("#cuit_limpio").val(res.cuit_limpio);
                                $("#d_denominacion").val(res.d_denominacion);
                                $("#id_contribuyente").val(res.id_contribuyente);
                            }
                        }else {
                            mostrar_validacion(res.error);
                        }
                    }
                });
            }else{
                mostrar_validacion('Debe ingresar primero el tipo de documento para poder filtrar por documento.');
                $('#d_objeto_hecho').val('');
            }
        }
    });

    $('#d_objeto_hecho').change(function () {
        if($("#d_objeto_hecho").val()){
            if($("#c_tipo_imponible").val()){
                $('#main').procOverlay({visible:true});
                $.ajax({
                    url: "ajustes_admin/autocomplete.php",
                    type:"POST",
                    data:{
                        p_oper:'getDatosObjeto',
                        p_id_menu: v_id_menu,
                        p_id_contribuyente: $("#id_contribuyente").val(),
                        p_c_tipo_imponible: $("#c_tipo_imponible").val(),
                        p_d_objeto_hecho: $('#d_objeto_hecho').val(),
                        p_c_tipo_doc: $('#c_tipo_doc').val(),
                        p_n_documento: $('#n_documento').val()
                    },
                    success: function(response)
                    {
                        $('#main').procOverlay({visible:false});
                        res = JSON.parse(response);
                        if (res.resultado == 'OK'){
                            if (res.error){
                                mostrar_error(res.error);
                            }else{
                                $("#n_cuit").val(res.n_cuit);
                                $("#cuit_limpio").val(res.cuit_limpio);
                                $("#d_denominacion").val(res.d_denominacion);
                                $("#id_contribuyente").val(res.id_contribuyente);
                                $("#c_tipo_doc").val(res.c_tipo_documento);
                                $("#n_documento").val(res.n_documento);
                            }
                        }else {
                            mostrar_validacion(res.error);
                        }
                    }
                });
            }else{
                mostrar_validacion('Debe ingresar primero el tipo imponible para poder filtrar por objeto.');
                $('#d_objeto_hecho').val('');
            }
        }
    });

    $("#btn_buscar").click(function(){
        if($("#frm_contrib").validationEngine('validate') && $("#frm_oblig").validationEngine('validate')){
            if(v_m_solo_honorarios == 'S' && $("#c_tributo").val() != 110){
                mostrar_validacion('Este menú sólo está habilitado para trabajar sobre el tributo HONORARIOS.');
                return;
            }
            fun_get_obligaciones();
        }
    });

    $('#btn_limpiar').click(function(){
        deshabilita_campos('#frm_contrib',false);
        deshabilita_campos('#frm_oblig',false);
        $("input, #d_observaciones").val('').validationEngine('hideAll');
        $("#ajustes_obligacion").hide();
        $("#c_tipo_moneda_ajuste").val(1);
        $("#d_tipo_moneda_ajuste").val('PESO');
        /*setea_parametros('#main_grid',{
                ':id_contribuyente': null,
                ':c_tipo_imponible': null,
                ':c_tributo': null,
                ':c_concepto': null,
                ':d_objeto_hecho': null,
                ':n_pos_fiscal': null,
                ':n_cuota': null
            });*/
        $('#div_main_grid').hide();
        $('#main_grid').getGridParam('postData').m_autoquery = 'N';
        $('#main_grid').clearGridData();
    });

    $("#btn_cons_cta_cte").click(function(){
        if($("#id_oblig_ajustada").val()){
            setea_parametros('#cta_cte_grid',{
                ':c_tributo': $("#c_tributo").val(),
                ':id_obligacion': $("#id_oblig_ajustada").val()
            });
            $("#modal_cons_cta_cte").modal('show');
            $(window).resize();
        }
    });

    $("#btn_volver_cta_cte").click(function(){
        $("#frm_detalle_mov input, #frm_detalle_ajuste input").val(null);
        $("#c_tipo_mov_ajuste",'#frm_detalle_ajuste').val(3);
        $("#d_tipo_mov_ajuste",'#frm_detalle_ajuste').val('REVERSA');
        $("#btn_lupa_movimiento_ajuste").hide();
        $("#f_ajuste, #c_concepto_mov_ajuste, #c_tipo_moneda_ajuste",'#frm_detalle_ajuste').attr('readonly',true);
        $("#btn_cons_cta_cte").attr('disabled',false);
        $("#m_deb_cred_ajuste, .datepicker").attr('disabled',false);
        $("#btn_lupa_concepto_mov_ajuste").show();
    });

    $("#btn_aplicar_ajuste").click(function(){
        if($("#frm_contrib").validationEngine('validate') && $("#frm_oblig").validationEngine('validate')){
            var valido;
            if($("#m_deb_cred").is(":checked")){ //debito credito
                valido = $("#frm_detalle_ajuste").validationEngine('validate');
            }
            if($("#m_reversa").is(":checked")){ //reversa
                valido = $("#frm_detalle_mov").validationEngine('validate') && $("#frm_detalle_ajuste").validationEngine('validate');
            }
            if(valido){
                fun_aplicar_ajuste();
            }
        }
    });
}