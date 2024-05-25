function init_eventos() {
    $(".datepicker")
        .datepicker({
            dateFormat: "dd/mm/yy",
            changeMonth: true,
            changeYear: true,
            dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
            monthNamesShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun","Jul","Ago","Sep","Oct","Nov","Dic",],
            monthNames: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre",],
        }).mask("99/99/9999");

    $("#n_cuit").mask("99-99999999-9");
    $("#n_cuit_alter").mask("99-99999999-9");
    $('#1').attr('data-toggle', 'none');
    $('#2').attr('data-toggle', 'none');
    $('#0').click();

    $('#lupa_d_denominacion').hide();

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

    $('#n_cuit').focusout(function(){
        if($('#n_cuit').val()){
            $('#n_cuit_sin_formato').val(limpia_cuit($('#n_cuit').val()))
        }
    })

    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() != ''){
            try{
                if( limpia_cuit($('#n_cuit').val()).length == 11 ){
                    $.ajax({
                        type:'POST',
                        url: "ajax_genericos/autocomplete.php",
                        data: {oper:'3',term: limpia_cuit($('#n_cuit').val())},
                        dataType: 'json',
                        success: function( data ) {
                            ajax_autocomplete = null;
                            if(data) {
                                $("#d_denominacion").val(data.data_raz[0].razon_social);
                                $("#id_contribuyente").val(data.data_raz[0].id_contribuyente);
                                $('#objeto').keydown();
                            }
                        }
                    });
        
                }else{
                    $('#btn_limpiar').click();
                }
            }catch(err){
            }
        }
    });

    $('#nro_plan').focusout(function(){
        if ($('#nro_plan').val()!= ''){
            $.ajax({
                type: "POST",
                url: FUNCIONES_BASEPATH + "maestro_abm.php",
                data: {
                    p_n_plan_pago: $("#nro_plan").val(),
                    id_menu: v_id_menu,
                    n_orden: 0,
                },
                dataType: "json",
                success: function (data) {
                    if (data.resultado == "OK") {
                        $("#c_plan").val(data.p_c_tipo_plan_pago);
                        $("#d_plan").val(data.p_desc_tipo_plan);
                        $("#c_tributo_plan").val();
                        $("#d_tributo_plan").val();
                        $("#n_cuit").val(data.p_n_cuit);
                        $("#d_denominacion").val(data.p_desc_denom);
                        $("#c_documento").val(data.p_c_tipo_documento);
                        $("#c_documento").blur();
                        $("#documento").val(data.p_n_documento);
                        $("#tipo_imponible").val(data.p_imponible);
                        $("#c_tipo_imponible").val(data.p_imponible);

                        $("#objeto").val(data.p_d_objeto2);
                        $("#c_sector_origen").val(data.p_c_delegacion);
                        $("#d_sector_origen").val(data.p_d_delegacion);
                        $("#observaciones").val(data.p_d_observaciones);

                        $("#id_contribuyente").val(data.p_id_contribuyente);


                        $.ajax({
                            type: "POST",
                            url: FUNCIONES_BASEPATH + "maestro_abm.php",
                            data: {
                                p_n_plan_pago: $("#nro_plan").val(),
                                id_menu: v_id_menu,
                                n_orden: 2,
                            },
                            dataType: "json",
                            success: function (data) {
                                if (data.resultado == "OK") {
                                    $("#tributo_plan").val(data.p_d_tributo_plan);
                                    $("#c_tributo_plan").val(data.p_c_tributo_plan);
                                } else {
                                    mostrar_cuadro("E", "Error", data.resultado);
                                    return;
                                }
                            },
                        });
                    } else {
                        mostrar_cuadro("E", "Error", data.resultado);
                        return;
                    }
                },
            });
        }
    });

    $('#mascara_lupa_c_plan').hide();
    // $('#mascara_lupa_c_tributo_plan').hide();
    $('#mascara_lupa_c_documento').hide();
    $('#mascara_lupa_c_sector_origen').hide();
    $('#mascara_lupa_objeto').hide();
    $('#mascara_lupa_c_tipo_imponible').hide();
    $('#mascara_lupa_n_plan_pago').hide();

    if(param_n_plan_pago){
        $('#nro_plan').val(param_n_plan_pago);
        funcion_btn_consultar();
    }


    function bloquear_filtros(aux){
        $("#nro_plan").prop("disabled", aux);
        $("#c_plan").prop("disabled", aux);
        $("#c_tributo_plan").prop("disabled", aux);
        $("#n_cuit").prop("disabled", aux);
        $("#d_denominacion").prop("disabled", aux);
        $("#c_documento").prop("disabled", aux);
        $("#documento").prop("disabled", aux);
        $("#tipo_imponible").prop("disabled", aux);
        $("#objeto").prop("disabled", aux);
        $("#c_sector_origen").prop("disabled", aux);
        $("#observaciones").prop("disabled", aux);
        $("#btn_consultar").prop("disabled", aux);

        if(aux){
            $('#mascara_lupa_c_plan').show();
            // $('#mascara_lupa_c_tributo_plan').show();
            $('#mascara_lupa_c_documento').show();
            $('#mascara_lupa_c_sector_origen').show();
            $('#mascara_lupa_objeto').show();
            $('#mascara_lupa_c_tipo_imponible').show();
            $('#mascara_lupa_n_plan_pago').show();
            $('#lupa_c_plan').hide();
            // $('#lupa_c_tributo_plan').hide();
            $('#lupa_c_documento').hide();
            $('#lupa_c_sector_origen').hide();
            $('#lupa_objeto').hide();
            $('#lupa_c_tipo_imponible').hide();
            $('#lupa_n_plan_pago').hide();

            $('#1').attr('data-toggle', 'tab');
            $('#2').attr('data-toggle', 'tab');
        }else{
            $('#mascara_lupa_c_plan').hide();
            // $('#mascara_lupa_c_tributo_plan').hide();
            $('#mascara_lupa_c_documento').hide();
            $('#mascara_lupa_c_sector_origen').hide();
            $('#lupa_c_plan').show();
            // $('#lupa_c_tributo_plan').show();
            $('#lupa_c_documento').show();
            $('#lupa_c_sector_origen').show();
            // //deshabilita los tab
            $('#1').attr('data-toggle', 'none');
            $('#2').attr('data-toggle', 'none');
            $('#0').click();

            $('#mascara_lupa_objeto').hide();
            $('#mascara_lupa_c_tipo_imponible').hide();
            $('#mascara_lupa_n_plan_pago').hide();
            $('#lupa_objeto').show();
            $('#lupa_c_tipo_imponible').show();
            $('#lupa_n_plan_pago').show();
        }
    };

    $("#btn_limpiar").click(function () {
        bloquear_filtros(false);
        $(".limpiar").val("");
        $("#btn_pdf").prop("disabled", true);
        $("#btn_contrato").prop("disabled", true);
        $("#btn_constancia").prop("disabled", true);
        $("#btn_imprimir").prop("disabled", true);
        $("#btn_honorarios").prop("disabled", true);
        $("#btn_chequera").prop("disabled", true);

        $('#lupa_d_denominacion').hide();
        $('#mascara_lupa_d_denominacion').show();

        setea_parametros('#main_grid',{},'N');
        setea_parametros('#secondary_grid',{},'N');
        setea_parametros('#resumen_grid',{},'N');

        $('#n_cuit_sin_formato').val(null);
    });

    $('#0').on('shown.bs.tab', function (e) {
        $('#tab_principal').resize();
    });

    $('#1').on('shown.bs.tab', function (e) {
        $('#tab_secundario').resize();
    });
    $('#2').on('shown.bs.tab', function (e) {
        $('#tab_tercero').resize();
    });

    $("#btn_imprimir").click(function () {
        llamar_report(
            "FACPL002",
            "P_PLAN|" + $("#nro_plan").val() + "&P_TIPO_PLAN|" + $("#c_plan").val(),
            "PDF"
        );
    });

    $("#btn_honorarios").click(function () {
        $("#honorarios_modal").modal("show");
        $(window).resize();

        setea_parametros("#honorarios_grid", {
            ":p_n_plan_pago": $("#nro_plan").val(),
        });
        setea_parametros("#relacionados_grid", {
            ":p_n_plan_pago": $("#nro_plan").val(),
        });
    });

    $("#btn_chequera").click(function () {
        $.ajax({
            type: "POST",
            url: FUNCIONES_BASEPATH + "maestro_abm.php",
            data: {
                p_d_objeto_hecho: $("#objeto").val(),
                p_c_tributo: $("#c_tributo").val(),
                p_c_tipo_imponible: $("#tipo_imponible").val(),
                p_id_contribuyente: $("#id_contribuyente").val(),
                id_menu: v_id_menu,
                n_orden: 3,
            },
            dataType: "json",
            success: function (data) {
                if (data.resultado == "OK") {
                    $.ajax({
                        type: "POST",
                        url: FUNCIONES_BASEPATH + "maestro_abm.php",
                        data: {
                            p_c_tipo_plan_pago: $("#c_plan").val(),
                            p_n_plan_pago: $("#nro_plan").val(),
                            id_menu: v_id_menu,
                            n_orden: 4,
                        },
                        dataType: "json",
                        success: function (data) {
                            if (data.resultado == "OK") {
                                $("#n_cuota_desde").val(data.p_n_cuota_desde);
                                $("#n_cuota_hasta").val(data.p_n_cuota_hasta);

                                $("#modal_chequera").modal("show");
                                $(window).resize();
                            } else {
                                mostrar_cuadro("E", "Error", data.resultado);
                                return;
                            }
                        },
                    });
                } else {
                    mostrar_cuadro("E", "Error", data.resultado);
                    return;
                }
            },
        });
    });

    $("#btn_constancia").click(function () {
        llamar_report(
            "FACPL041",
            "N_PLAN_PAGO|" +
            $("#nro_plan").val() +
            "&C_TIPO_PLAN_PAGO|" +
            $("#c_plan").val(),
            "PDF"
        );
    });

    $("#btn_emitir").click(function () {
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "p_n_cuota_desde":$("#n_cuota_desde").val(),
             "p_n_cuota_hasta":$("#n_cuota_hasta").val(),
             "p_n_plan_pago":$("#nro_plan").val(),
             "p_c_tipo_plan_pago":$("#c_plan").val(),
             "id_menu":100157,
             "n_orden":5
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    llamar_report("RECAL075_PDF","P_ID_SESION|"+data.p_sesion,"PDF");
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 

        
    });

    $("#btn_contrato").click(function () {
        if (
            $("#archivo_contrato").val() == null ||
            $("#archivo_contrato").val() == ""
        ) {
            mostrar_cuadro(
                "E",
                "Error",
                "No está parametrizado el nombre del reporte del contrato para este tipo de plan de pago"
            );
            return;
        }

        llamar_report(
            $("#archivo_contrato").val(),
            "P_PLAN|" + $("#nro_plan").val() + "&P_TIPO_PLAN|" + $("#c_plan").val(),
            "PDF"
        );
    });

    $("#btn_pdf").click(function () {
        if (
            $("#archivo_contrato").val() == null ||
            $("#archivo_contrato").val() == ""
        ) {
            mostrar_cuadro(
                "E",
                "Error",
                "No está parametrizado el nombre del reporte del contrato para este tipo de plan de pago"
            );
            return;
        }

        llamar_report(
            $("#archivo_contrato").val(),
            "P_PLAN|" + $("#nro_plan").val() + "&P_TIPO_PLAN|" + $("#c_plan").val(),
            "PDF"
        );
    });

    $("#lupa_c_plan").lupa_generica({
        id_lista: v_lista_tipo_pp,
        titulos: ["C&oacute;digo", "Descripci&oacute;n"],
        grid: [
            { index: "c_tipo_plan_pago", width: 100 },
            { index: "d_descrip", width: 350 },
        ],
        caption: "Tipos de Plan",
        sortname: "c_tipo_plan_pago",
        sortorder: "asc",
        filtros: [""],
        campos: { c_tipo_plan_pago: "c_plan", d_descrip: "d_plan" },
        searchCode: true,
        searchInput: "#c_plan",
        keyNav: true,
        filtroNull: true,
        exactField: 'c_tipo_plan_pago',
        onClose: function () {},
    });

    $("#lupa_objeto").lupa_generica({
        id_lista: v_lista_objetos,
        titulos: [ "Descripci&oacute;n","Plan de Pago", "Objeto / Hecho", "CUIT"],
        grid: [
            { index: "id_contribuyente", width: 100 , hidden: true},
            { index: "n_plan_pago", width: 150 },
            { index: "d_objeto_hecho", width: 600 },
            { index: "n_cuit", width: 100, hidden: true },
        ],
        caption: "Lista de Objetos / Hechos",
        sortname: "d_objeto_hecho",
        sortorder: "asc",
        filtros: ["#tipo_imponible","#id_contribuyente"],
        filtrosTitulos: ["Tipo Imponible", "Contribuyente"],
        filtrosNulos: [false, true],
        campos: { id_contribuyente: "id_contribuyente", n_plan_pago: "nro_plan", d_objeto_hecho: "objeto", n_cuit: "n_cuit" },
        searchCode: true,
        // searchInput: "#objeto",
        keyNav: true,
        exactField: 'd_objeto_hecho',
        onClose: function () {},
    });

    $("#lupa_c_documento").lupa_generica({
        id_lista:v_lista_doc,
        titulos:['Codigo','Descripcion'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:465}],
        caption:'LISTADO DE TIPOS DE DOCUMENTO',
        sortname:'c_dato',
        sortorder:'asc',
        widthGrid:150,
        campos:{c_dato:'c_documento',d_dato: 'd_documento'},
        keyNav:true,
        searchInput: '#c_documento',
        searchCode: true,
        exactField: 'c_dato'
    });

    $("#lupa_c_tipo_imponible").lupa_generica({
        id_lista: v_lista_tipo_imp,
        titulos: ["Código", "Descripción"],
        grid: [
            { index: "c_dato", width: 100 },
            { index: "d_dato", width: 450 },
        ],
        caption: "Listado de Tipos Imponibles",
        sortname: "c_dato",
        sortorder: "asc",
        searchInput: "#c_tipo_imponible",
        searchCode: true,
        exactField: "c_dato",
        campos: {
            c_dato: "tipo_imponible",
            //d_dato: "d_tipo_imponible",
        },
        keyNav: true,
        draggable: true,
    });

    $("#lupa_n_plan_pago").lupa_generica({
        id_lista: v_lista_plan_pago,
        titulos: ["Nro. Plan de Pago", "Cod. Tipo Plan", "Desc. Tipo Plan", "Cuit", "Denominación", "Tipo Imponible", "Objeto / Hecho"],
        grid: [
            { index: "n_plan_pago", width: 150 },
            { index: "c_tipo_plan_pago", width: 100 },
            { index: "d_descrip", width: 450 },
            { index: "n_cuit", width: 100 },
            { index: "d_denominacion", width: 450 },
            { index: "c_tipo_imponible", width: 100 },
            { index: "d_objeto_hecho", width: 150 },
        ],
        caption: "Listado de Planes de Pago",
        sortname: "n_plan_pago",
        sortorder: "desc",
        //searchInput: "#nro_plan",
        //searchCode: true,
        exactField: "n_plan_pago",
        width: 1000,
        filtros: ["#id_contribuyente"],
        filtrosNulos: [true],
        campos: {
            n_plan_pago: "nro_plan",
        },
        keyNav: true,
        draggable: true,
        onClose: function(){
            $('#nro_plan').trigger('focusout');
        }
    });

    $("#lupa_d_denominacion").lupa_generica({
        id_lista:v_lista_denominacion,
        titulos:[ 'ID Contribuyente', 'CUIT', 'Denominación', 'Cod. Tipo Documento', 'Tipo Documento', 'Nro. Documento', 'F. Alta'],
        grid:[
            {index:'id_contribuyente',width:450, hidden: true},
            {index:'n_cuit',width:100},
            {index:'d_denominacion',width:450},
            {index:'c_tipo_documento',width:100, hidden: true},
            {index:'d_tipo_documento',width:150},
            {index:'n_documento',width:100},
            {index:'f_alta',width:100, hidden: true}
        ],
        caption:'Contribuyentes',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#d_denominacion'],
        filtrosNulos:[true],
        campos:{
            n_cuit: 'n_cuit',
            d_denominacion:'d_denominacion',
            id_contribuyente:'id_contribuyente',
        },
        keyNav:true,
        draggable:true,
        onClose: function(){
            // $('#n_cuit_lupa_obj').val(limpia_cuit($('#n_cuit').val()));
            // $("#n_cuit").mask("99-99999999-9");

            // if($('#n_cuit').val()){
            //     $('#lupa_d_objeto_hecho').show().css('display', 'table-cell');
            //     $('#mascara_lupa_obj_hecho').hide();
            // } else{
            //     $('#lupa_d_objeto_hecho').hide();
            //     $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
            // }
        }
    });

    $("#lupa_c_sector_origen").lupa_generica({
        id_lista: v_lista_deleg,
        titulos: ["Código", "Descripción"],
        grid: [
            { index: "c_dato", width: 100 },
            { index: "d_dato", width: 300 },
        ],
        caption: "Delegaciones",
        sortname: "c_dato",
        sortorder: "asc",
        campos: { c_dato: "c_sector_origen", d_dato: "d_sector_origen" },
        filtros: ["#id_contribuyente"],
        filtrosTitulos: ["Contribuyente"],
        filtrosNulos: [true],
        searchCode: true,
        searchInput: "#c_sector_origen",
        exactField: "c_dato",
        keyNav: true,
        limpiarCod: true,
    });

    $("#btn_consultar").click(function () {
        funcion_btn_consultar();
    });


    function buscar_plan(){
        if ($("#nro_plan").val() != "") {
            $.ajax({
                type: "POST",
                url: FUNCIONES_BASEPATH + "maestro_abm.php",
                data: {
                    p_n_plan_pago: $("#nro_plan").val(),
                    id_menu: v_id_menu,
                    n_orden: 0,
                },
                dataType: "json",
                success: function (data) {
                    if (data.resultado == "OK") {
                        bloquear_filtros(true);
                        $("#c_plan").val(data.p_c_tipo_plan_pago);
                        $("#d_plan").val(data.p_desc_tipo_plan);
                        $("#c_tributo_plan").val();
                        $("#d_tributo_plan").val();
                        $("#n_cuit").val(data.p_n_cuit);
                        $("#d_denominacion").val(data.p_desc_denom);
                        $("#c_documento").val(data.p_c_tipo_documento);
                        $("#c_documento").blur();
                        $("#documento").val(data.p_n_documento);
                        $("#tipo_imponible").val(data.p_imponible);
                        $("#c_tipo_imponible").val(data.p_imponible);

                        $("#objeto").val(data.p_d_objeto2);
                        $("#objeto_tab_resumen").val(data.p_d_objeto2);
                        $("#c_sector_origen").val(data.p_c_delegacion);
                        $("#d_sector_origen").val(data.p_d_delegacion);
                        $("#observaciones").val(data.p_d_observaciones);
                        $("#c_tributo").val(data.p_c_tributo);
                        $("#d_tributo").val(data.p_desc_tributo);
                        $("#c_concepto").val(data.p_c_concepto);

                        $("#id_contribuyente").val(data.p_id_contribuyente);
                        $("#i_total").val(data.p_i_total);
                        $("#i_anticipo").val(data.p_i_anticipo);
                        $("#cant_cuotas").val(data.p_n_cuotas);
                        $("#f_confirmacion").val(data.p_f_efectivacion);
                        $("#user").val(data.p_c_usuario_efec);
                        $("#f_actualizacion").val(data.p_f_emision);
                        $("#c_caducidad").val(data.p_c_caducidad);
                        $("#user_act").val(data.p_c_usuarioact);
                        $("#f_finalizacion").val(data.p_f_caducidad);
                        $("#f_alta").val(data.p_f_alta);
                        $("#user_alt").val(data.p_c_usuarioalt);
                        $("#archivo_contrato").val(data.p_arch);

                        if (data.p_f_efectivacion == null || data.p_f_efectivacion == "" ) {
                            $("#btn_pdf").prop("disabled", true);
                            $("#btn_contrato").prop("disabled", true);
                        }
                        else{
                            $("#btn_pdf").prop("disabled", false);
                            $("#btn_contrato").prop("disabled", false);
                        }

                        if (
                            data.p_f_caducidad != null &&
                            data.p_f_caducidad != "" &&
                            data.p_l_cant > 0
                        ) {
                            $("#btn_constancia").prop("disabled", false);
                        }

                        $("#btn_imprimir").prop("disabled", false);
                        $("#btn_honorarios").prop("disabled", false);

                        $.ajax({
                            type: "POST",
                            url: FUNCIONES_BASEPATH + "maestro_abm.php",
                            data: {
                                p_n_plan_pago: $("#nro_plan").val(),
                                id_menu: v_id_menu,
                                n_orden: 2,
                            },
                            dataType: "json",
                            success: function (data) {
                                if (data.resultado == "OK") {
                                    bloquear_filtros(true);
                                    $("#deuda_original").val(data.p_i_capital_ori);
                                    $("#deuda_original_descuentos").val(data.p_i_capital);
                                    $("#intereses_resarcitorios").val(data.p_i_intereses_ori);
                                    $("#porcentaje_descuento_interes").val(
                                        data.p_descuento_interes
                                    );
                                    $("#intereses_con_descuentos").val(data.p_i_interes_mora);
                                    $("#i_actualizado").val(data.p_i_actualizado);
                                    $("#metodo_cuotas").val(data.p_d_metodo);
                                    $("#periodicidad_ctas").val(data.p_d_periodicidad);
                                    $("#i_intereses").val(data.p_i_intereses);
                                    $("#i_tasas").val(data.p_i_tasas);
                                    $("#n_cuit_alter").val(data.p_n_cuit_alter);
                                    $("#d_denominacion_alter").val(data.p_d_deno_alter);
                                    $("#situacion").val(data.p_situacion);
                                    $("#tributo_plan").val(data.p_d_tributo_plan);
                                    $("#c_tributo_plan").val(data.p_c_tributo_plan);
                                    $("#d_caducidad").val(data.p_caducidad);

                                    $("#d_tributo").val(data.p_desc_tributo);
                                    $("#d_tipo_imponible").val(data.p_desc_impon);
                                    $("#d_concepto").val(data.p_desc_concepto);

                                    
                                    if($('#f_confirmacion').val() != null || $('#finalizacion').val() == null){
                                        $("#btn_chequera").prop("disabled", false);
                                    }else{
                                        $("#btn_chequera").prop("disabled", true);
                                    }

                                    setea_parametros("#resumen_grid", {
                                        ":p_n_plan_pago": $("#nro_plan").val(),
                                    });

                                    setea_parametros("#main_grid", {
                                        ":p_plan_pago": $("#nro_plan").val(),
                                    });

                                    setea_parametros("#secondary_grid", {
                                        ":p_plan_pago": $("#nro_plan").val(),
                                    });
                                } else {
                                    mostrar_cuadro("E", "Error", data.resultado);
                                    return;
                                }
                            },
                        });
                    } else {
                        mostrar_cuadro("E", "Error", data.resultado);
                        return;
                    }
                },
            });
        }
    }

    function funcion_btn_consultar(){
        if ((!$("#n_cuit").val() && !($("#c_documento").val() && $("#documento").val())
            && !($("#objeto").val()  && $("#tipo_imponible").val() )
            &&(!$("#nro_plan").val() ))) {
            mostrar_cuadro("E", "Error",
                "El Campo CUIT o Tipo y Nro. de Documento u Objeto Hecho y Tipo Imponible o Nro. de Plan de Pago no puede quedar vacio"
            );
            return;
        }

        if ($("#n_cuit").val() != "" && $("#nro_plan").val() == '' ||($("#c_documento").val() != "" && $("#documento").val() != "" && $("#nro_plan").val() == '' )) {
            $.ajax({
                type: "POST",
                url: FUNCIONES_BASEPATH + "maestro_abm.php",
                data: {
                    p_n_cuit: limpia_cuit($("#n_cuit").val()),
                    p_n_documento: $("#documento").val(),
                    p_c_tipo_documento: $("#c_documento").val(),
                    id_menu: v_id_menu,
                    n_orden: 1,
                },
                dataType: "json",
                success: function (data) {
                    if (data.resultado == "OK") {
                        $("#nro_plan").val(data.p_n_plan_pago);
                        bloquear_filtros(true);
                        buscar_plan();
                    } else {
                        mostrar_cuadro("E", "Error", data.resultado);
                        return;
                    }
                },
            });
        }else{
            buscar_plan();
        }
    }
}
