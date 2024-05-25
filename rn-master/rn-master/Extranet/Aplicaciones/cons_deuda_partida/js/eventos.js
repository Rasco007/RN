function inicializarEventos() {
    // comportamiento segun usuario conectado y si tiene consorcios asociados
    if(m_filtros_consorcio == 1){
        $(".filtros_consorcio").show();
        $(".filtros_contribuyente input").attr('readonly',false);
        $("#n_cuit, #d_denominacion").addClass('limpiar');
        v_datos_grilla = datos_main_grid_0;

        v_filtros_lista_regantes = ["#c_organismo","#id_contribuyente"];
        v_filtros_titulos_lista_regantes = ['Consorcio','CUIT y Denominación'];
        v_filtros_null_lista_regantes = [true,true];

        v_grid = [  {index:'n_partida',width:300}];
        v_sort_partidas = 'n_partida';
        v_campos = {n_partida:'n_partida'};
        v_filtros_lista_partidas = ["#id_contribuyente","#c_region","#c_area",'#c_organismo'];
        v_filtros_titulos_lista_partidas = ['CUIT y Denominación','Región','Área','Consorcio'];
        v_filtros_null_lista_partidas = [true, true, true, true];
    }else{
        $(".filtros_consorcio").hide();
        $(".filtros_contribuyente input").attr('readonly',true);
        $("#label_cuit").html('CUIT (*)');
        $("#n_cuit").addClass('validate[required]');
        $("#label_denominacion").html('Denominación (*)');
        $("#d_denominacion").addClass('validate[required]');
        v_datos_grilla = datos_main_grid_2;

        v_filtros_lista_regantes = ["#id_contribuyente"];
        v_filtros_titulos_lista_regantes = ['CUIT y Denominación'];
        v_filtros_null_lista_regantes = [false];

        v_grid = [  {index:'d_objeto_hecho',width:300}];
        v_sort_partidas = 'd_objeto_hecho';
        v_campos = {d_objeto_hecho:'n_partida'};
        v_filtros_lista_partidas = ['#id_contribuyente'];
        v_filtros_titulos_lista_partidas = ['Contribuyente'];
        v_filtros_null_lista_partidas = [false];
    }

    $('#n_cuit').mask('99-99999999-9');

    $('#btn_buscar').click(function () {
        if ($('#frm_consulta').validationEngine('validate')){
            v_d_nomenclatura = fun_devuelve_nomenclatura("#frm_consulta");
            if ($('#id_contribuyente').val() != '' || $("#n_partida").val() != '' || v_d_nomenclatura!= null ){
                deshabilita_campos(true);
                setea_parametros('#main_grid',{
                    ':p_f_actualizacion':$('#f_actualizacion').val(),
                    ':id_contribuyente':$('#id_contribuyente').val(),
                    ':c_organismo':$("#c_organismo").val(),
                    ':c_region':$("#c_region").val(),
                    ':c_area':$("#c_area").val(),
                    ':n_partida':$("#n_partida").val(),
                    ':d_nomenclatura':v_d_nomenclatura,
                    ':c_deuda':$("#c_deuda").val()},'S');
            }else{
                mostrar_validacion('Debe completar al menos uno de los siguientes campos: CUIT y Denominación / Partida / Nomenclatura.',400);
            }
        }
    });

    $('#btn_limpiar').click(function(){
        deshabilita_campos(false);
        v_d_nomenclatura = null;
        $("#frm_consulta").trigger('reset');
        $('.limpiar',"#frm_consulta").val('');
        $('#c_deuda').selectpicker('refresh');
        $('#f_actualizacion').datepicker('setDate', fecha_hoy);
        $('#main_grid, #detalle_grid').jqGrid('clearGridData');
    });

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    $('#f_actualizacion').datepicker("option",'minDate',fecha_hoy).change(function () {
        if ($.datepicker.parseDate('dd/mm/yy', $(this).val()) < $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
            mostrar_error("La Fecha ingresada no puede ser Menor a la fecha actual.");
            $(this).val(fecha_hoy);
        }
    });

    $('#f_actualizacion').datepicker('setDate',fecha_hoy);

    // Autocomplete por cuit y denominacion
    if(m_filtros_consorcio == 1){
        //Completamos Datos del Contribuyente
        $("#d_denominacion").autocomplete({
            source: function( request, response ) {
                if (ajax_autocomplete) ajax_autocomplete.abort();
                ajax_autocomplete =
                    $.ajax({
                        type:'POST',
                        url: "cons_deuda_partida/autocomplete.php",
                        data: {p_oper:'getAutocomplete',p_filtro: request.term,p_c_organismo: $('#c_organismo').val()},
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
                $("#d_denominacion").val(ui.item.value);
                $("#n_cuit").val(ui.item.cuit);
                $("#id_contribuyente").val(ui.item.id_contribuyente);
                return false;
            }
        });

        $('#n_cuit').change(function (){
            if ($('#n_cuit').val() && $('#n_cuit').val().length == 13){
                completarDenominacion();
            }else{
                $("#d_denominacion").val(null);
                $("#n_cuit").val(null);
                $("#id_contribuyente").val(null);
                $("#n_partida, .nomen").attr('disabled',false);
                $("#n_regante, #n_partida, .nomen").val(null);
                $("#btn_lupa_regante").show();
            }
        });
    }

    $('#n_partida').change(function () {
        if (!$('#n_partida').val()){
            $("#id_contribuyente, #n_cuit, #d_denominacion, #n_regante, .nomen").val('');
            $('.nomen').attr('disabled',false);
            $("#btn_lupa_regante").show();
        } else {
            $('#main').procOverlay({visible:true});
            $.ajax({
                url: "cons_deuda_partida/autocomplete.php",
                type:"POST",
                data:{
                    p_oper:'getDatos',
                    p_id_menu: v_id_menu,
                    p_c_organismo: $("#c_organismo").val(),
                    p_id_contribuyente: $("#id_contribuyente").val(),
                    p_n_partida: $('#n_partida').val()
                },
                success: function(response)
                {
                    $('#main').procOverlay({visible:false});
                    res = JSON.parse(response);
                    if (res.resultado == 'OK'){
                        if (res.error){
                            mostrar_error(res.error);
                        }else{
                            if(m_filtros_consorcio == 1){
                                $("#id_contribuyente").val(res.id_contribuyente);
                                $("#n_cuit").val(res.n_cuit);
                                $("#d_denominacion").val(res.d_denominacion);
                            }
                            $('#departamento').val(res.departamento);
                            $('#circunscripcion').val(res.circunscripcion);
                            $('#seccion').val(res.seccion);
                            $('#u_caracteristica').val(res.u_caracteristica);
                            $('#parcela').val(res.parcela);
                            $('#u_funcional').val(res.u_funcional);
                            $('.nomen').attr('disabled',true);
                            $("#n_regante").val(res.n_regante);
                            $("#btn_lupa_regante").hide();
                        }
                    }else {
                        if(m_filtros_consorcio == 1){
                            $("#id_contribuyente, #n_cuit, #d_denominacion").val('');
                        }
                        $('#n_regante, .nomen').val('');
                        $('.nomen').attr('disabled',false);
                        $("#btn_lupa_regante").show();
                        mostrar_validacion(res.error);
                    }
                }
            });
        }
    });

    $(".nomen").change(function () {
        v_d_nomenclatura = fun_devuelve_nomenclatura("#frm_consulta");
        
        if (
            $('#departamento').val() && $('#circunscripcion').val() && $('#seccion').val() &&
            $('#u_caracteristica').val() && $('#parcela').val() && $('#u_funcional').val()
        ){
            if (!$('#n_partida').val()) {
                $('#main').procOverlay({visible:true});
                $.ajax({
                    url: "cons_deuda_partida/autocomplete.php",
                    type:"POST",
                    data:{
                        p_oper:'getDatos',
                        p_id_menu: v_id_menu,
                        p_c_organismo: $("#c_organismo").val(),
                        p_id_contribuyente: $("#id_contribuyente").val(),
                        p_d_nomenclatura: v_d_nomenclatura
                    },
                    success: function(response)
                    {
                        $('#main').procOverlay({visible:false});
                        res = JSON.parse(response);
                        if (res.resultado == 'OK'){
                            if (res.error){
                                mostrar_error(res.error);
                            }else{
                                if(m_filtros_consorcio == 1){
                                    $("#id_contribuyente").val(res.id_contribuyente);
                                    $("#n_cuit").val(res.n_cuit);
                                    $("#d_denominacion").val(res.d_denominacion);
                                }
                                $('#n_partida').val(res.objeto);
                                $('#n_partida').attr('disabled',true);
                                $('#n_regante').val(res.n_regante);
                                $("#btn_lupa_regante").hide();
                                $('.nomen').attr('disabled',true);
                            }
                        }else {
                            if(m_filtros_consorcio == 1){
                                $("#id_contribuyente, #n_cuit, #d_denominacion").val('');
                            }
                            $('#n_regante, #n_partida').val('');
                            $("#btn_lupa_regante").show();
                            $('#n_partida, .nomen').attr('disabled',false);
                            mostrar_validacion(res.error);
                        }
                    }
                });
            }
        }else{
            if(m_filtros_consorcio == 1){
                $("#id_contribuyente, #n_cuit, #d_denominacion").val('');
            }
            $('#n_regante, #n_partida').val('');
            $("#btn_lupa_regante").show();
            $('#n_partida, .nomen').attr('disabled',false);
        }
    });
}