function inicializarEventos(){
    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    $("#n_cuit").mask("99-99999999-9");
    $("#n_documento").mask("09.999.999");

    $('#lupa_d_denominacion').hide();
    $('#lupa_d_objeto_hecho').hide();
    $('#mascara_lupa_tipo_doc').hide();
    $('#mascara_lupa_tributo').hide();
    $('#btn_cese_def').prop('disabled', true);

    // $('#d_objeto_hecho').on('focusout', function () {
    //     if($('#d_objeto_hecho').val().length >= 3){
    //         $("#lupa_d_objeto_hecho").click();
    //     }
    // });

    $('#d_denominacion').on('keydown focusout', function (event) {
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

    $('#d_objeto_hecho').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 2) {
            $('#lupa_d_objeto_hecho').show().css('display', 'table-cell');
            $('#mascara_lupa_d_objeto_hecho').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_objeto_hecho').hide();
            $('#mascara_lupa_d_objeto_hecho').show().css('display', 'table-cell');
        } 
    });

    $('#btn_limpiar').click(function(){
        $('#n_cuit').val(null);
        $('#d_denominacion').val(null);
        $('#c_tipo_doc').val(null);
        $('#d_tipo_doc').val(null);
        $('#c_tributo').val(null);
        $('#d_tributo').val(null);
        $('#f_vig_desde').val(null);
        $('#f_cese_provisorio').val(null);
        $('#n_documento').val(null);
        $('#d_objeto_hecho').val(null);
        $('#id_contribuyente').val(null);
        $('#leyenda').text('');

        $('#lupa_d_denominacion').hide();
        $('#lupa_d_objeto_hecho').hide();
        $('#mascara_lupa_d_objeto_hecho').show();
        $('#mascara_lupa_d_denominacion').show();
       
        $('#lupa_tipo_doc').show();
        $('#mascara_lupa_tipo_doc').hide();
        $('#lupa_tributo').show();
        $('#mascara_lupa_tributo').hide();

        $('#n_cuit').prop('disabled', false);
        $('#d_denominacion').prop('disabled', false);
        $('#c_tipo_doc').prop('disabled', false);
        $('#c_tributo').prop('disabled', false);
        $('#f_vig_desde').prop('disabled', false);
        $('#n_documento').prop('disabled', false);
        $('#d_objeto_hecho').prop('disabled', false);
        $('#btn_reversa').prop('disabled', true);
        $('#btn_buscar').prop('disabled', false);
        $('#btn_cese_def').prop('disabled', true);

        $('#contrib_tributo_grid').jqGrid('clearGridData');
        $('#jurisdicciones_grid').jqGrid('clearGridData');
        $('#actividades_grid').jqGrid('clearGridData');
        $('#comercios_grid').jqGrid('clearGridData');
        $('#contrib_tributo_grid').jqGrid('clearGridData');
        $('#div_jurisdicciones').prop('hidden', true);
        $('#div_actividades').prop('hidden', true);
        $('#div_comercios').prop('hidden', true);
        $('#div_contrib_tributo').prop('hidden', true);

        var labelElement = document.getElementById("cese_prov");
        labelElement.textContent = "";
    });

    $('#btn_limpiar_baja').click(function(){
        $('#c_motivo_cese').val(null);
        $('#d_motivo_cese').val(null);
    });

    $('#n_cuit').change(function(){
        if($('#n_cuit').val()){
            if(!$('#d_denominacion').val()){
                $.ajax({
                    type:'POST',
                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                    data:{      
                     "p_n_cuit": limpia_cuit($('#n_cuit').val()),
                     "id_menu":v_id_menu,
                     "n_orden":1
                    },
                    dataType:'json',
                    success: function( data ) {
                        if(data.resultado == 'OK'){
                          $('#id_contribuyente').val(data.p_id_contribuyente);
                          $('#d_denominacion').val(data.p_d_denominacion);
                          $('#n_documento').val(data.p_n_documento);
                          $('#c_tipo_doc').val(data.p_c_tipo_documento);
                          $('#c_tipo_doc').blur();
                        }
                        else{
                            mostrar_cuadro('E', 'Error', data.resultado);
                            return;
                        }
                    }
                }); 
            }
        }
    });

    $('#btn_buscar').click(function(){
        //BUSQUEDA_CONTRIBUYENTE_REV
        if (!$('#id_contribuyente').val() && (!$('#c_tributo').val() || !$('#d_objeto_hecho').val() )  && (!$('#c_tipo_doc').val() || !$('#n_documento').val() )){
            mostrar_cuadro('E', 'Error', 'Debe ingresar al menos uno de los siguientes criterios de busqueda: Nro de cuit o (tipo y Nro. de Documento) o (Tributo y Objeto/Hecho).',
                null,null,400);
            return;
        }
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
            "p_c_tributo": $('#c_tributo').val(),
            "p_obj_hecho": $('#d_objeto_hecho').val(),
            "p_n_cuit": limpia_cuit($('#n_cuit').val()),
            "p_n_documento": $('#n_documento').val().replace(/\./g, ''),
            "p_c_tipo_documento": $('#c_tipo_doc').val(),
            "id_menu":v_id_menu,
            "n_orden":0
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    $('#div_contrib_tributo').prop('hidden', false);
                    $('#id_contribuyente').val(data.p_id_contribuyente);
                    setea_parametros('#contrib_tributo_grid', {':p_id_contribuyente':$('#id_contribuyente').val(),
                                                        ':p_c_tributo': $('#c_tributo').val(),
                                                        ':p_d_objeto_hecho': $('#d_objeto_hecho').val()});
                    bloquear_filtros();
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 

        //filtros
        //filtros_no_nativos_ar = [];
        filtros_arr_main = [];
        if($('#n_cuit').val() !== ''){filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());}
        if($('#d_denominacion').val() !== ''){filtros_arr_main.push('Denominación: '+ $('#d_denominacion').val());}
        if($('#c_tributo').val() !== ''){filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());}
        if($('#d_objeto_hecho').val() !== ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());}
        if($('#c_tipo_doc').val() !== ''){filtros_arr_main.push('Tipo:' + $('#d_tipo_doc').val());}
        if($('#n_documento').val() !== ''){filtros_arr_main.push('Nro.: '+ $('#n_documento').val());}

        filtros_no_nativos_ar['contrib_tributo_grid'] = filtros_arr_main;
        filtros_no_nativos_ar['comercios_grid'] = filtros_arr_main;
        filtros_no_nativos_ar['actividades_grid'] = filtros_arr_main;
        filtros_no_nativos_ar['jurisdicciones_grid'] = filtros_arr_main;
    });

    //En el form XXXXXX estos botones (Consultar Cese y Imprimir) siempre quedan desactivados --> revisar con ART

     $("#btn_cese_def").click(function () {
        if ($("#f_cese_provisorio").val() === "") {
            mostrar_cuadro(
                "E",
                "Error","Para dar Cese Definitivo primero debe dar el Provisorio.");
        }else{
            let row_id = $("#contrib_tributo_grid").getGridParam("selrow");
            if (!row_id) {
                mostrar_cuadro(
                    "E",
                    "Error",
                    "Debe seleccionar un elemento de la grilla"
                );
                return;
            }
            $.ajax({
                type: "POST",
                url: FUNCIONES_BASEPATH + "maestro_abm.php",
                data: {
                    p_c_tributo: $("#c_tributo").val(),
                    p_f_vig_desde: $("#f_vig_desde").val(),
                    p_f_vig_hasta: $("#f_cese_provisorio").val(),
                    p_id_contribuyente: $("#id_contribuyente").val(),
                    p_n_cuit: limpia_cuit($("#n_cuit").val()),
                    p_obj_hecho: $("#d_objeto_hecho").val(),
                    p_c_tipo_imponible: $("#c_tipo_imp").val(),
                    id_menu: v_id_menu,
                    n_orden: 2,
                },
                dataType: "json",
                success: function (data) {
                    if (data.resultado == "OK") {
                        if (data.p_procesar) {
                            let row_id = $('#contrib_tributo_grid').getGridParam('selrow');
                            mostrar_cuadro(
                                "Q",
                                "Va a procesar la baja al contribuyente en el Tributo " + $("#d_tributo").val(),
                                "¿Desea continuar con la operación?",
                                function () {
                                    if($('#contrib_tributo_grid').getCell(row_id, 'c_motivo_cese_prov')){
                                        $("#c_motivo_cese").val($('#contrib_tributo_grid').getCell(row_id, 'c_motivo_cese_prov'));
                                        $("#c_motivo_cese").blur();
                                    }
                                    $("#baja_modal").modal("show");
                                    $(window).resize();
                                },
                                function () {
                                    return;
                                },
                                500
                            );
                        }
                        if (data.p_id_sesion) {
                            setea_parametros("#contrib_tributo_grid", {
                                ":p_id_sesion": data.p_id_sesion,
                            });
                            
                            $("#errores_title").val(data.resultado);
                            $("#errores_modal").modal("show");
                            $(window).resize();


                            setea_parametros("#errores_grid", {
                                ":p_id_sesion": data.p_id_sesion,
                            });

                        }
                    }else {
                        mostrar_cuadro("E", "Error", data.resultado);
                        return;
                    }
                },
            });
        }
        
    });
    
    $('#btn_cancelar_baja').click(function(){
        $('#c_motivo_cese').val(null);
        $('#d_motivo_cese').val(null);
    });

    $('#btn_grabar').click(function(){
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{
             "p_c_tributo": $('#c_tributo').val(),
             "p_f_vig_hasta":$("#f_cese_provisorio").val(),
             "p_id_contribuyente": $("#id_contribuyente").val(),
             "p_obj_hecho": $("#d_objeto_hecho").val(),
             "p_c_tipo_imponible": $("#c_tipo_imp").val(),
             "p_c_motivo_baja": $('#c_motivo_cese').val(),
             "p_n_tabla_mot_baja": $('#n_tabla_mot_baja').val(),
             "id_menu":v_id_menu,
             "n_orden":3
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    $('#leyenda').text('TRIBUTO DADO DE BAJA');
                    mostrar_cuadro('S', 'Exito', 'El Proceso de baja DEFINITIVA termino OK');
                    $('#baja_modal').modal('hide');
                    $('#c_motivo_cese').val(null);
                    $('#d_motivo_cese').val(null);
                    $('#n_tabla_mot_baja').val(null);
                } else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    $('#leyenda').text('NO SE PUDO OTORGAR LA BAJA');
                    return;
                }
            }
        });
    });
}