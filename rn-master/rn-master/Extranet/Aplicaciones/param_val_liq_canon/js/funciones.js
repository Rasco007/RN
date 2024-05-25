function inicializa_lupas(){
    $("#btn_lupa_organismo_1").lupa_generica({
        id_lista:v_lista_consorcios,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_organismo',width:100},
            {index:'d_dato',width:450}],
        caption:'Consorcios',
        sortname:'c_organismo',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#frm_consulta #c_organismo_1',
        exactField: 'c_organismo',
        campos:{c_organismo:'c_organismo_1',d_dato:'d_organismo_1'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose:function(){
            $("#c_region_1,#d_region_1,#c_area_1,#d_area_1,#c_concepto_1,#d_concepto_1").val('');
        }
    });

    $("#btn_lupa_region_1").lupa_generica({
        id_lista:v_lista_regiones_consorcio,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_region',width:100},
            {index:'d_dato',width:450}],
        caption:'Regiones',
        sortname:'c_region',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#frm_consulta #c_region_1',
        exactField: 'c_region',
        filtros:['#c_organismo_1'],
        filtrosTitulos:['Consorcio'],
        filtroNull:true,
        campos:{c_region:'c_region_1',d_dato:'d_region_1'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose:function(){
            $("#c_area_1,#d_area_1").val("");
        }
    });

    $("#btn_lupa_area_1").lupa_generica({
        id_lista:v_lista_areas_consorcio,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_area',width:100},
            {index:'d_dato',width:450}],
        caption:'Áreas',
        sortname:'c_area',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#frm_consulta #c_area_1',
        exactField: 'c_area',
        filtros:['#c_organismo_1','#c_region_1'],
        filtrosTitulos:['Consorcio','Región'],
        filtrosNulos:[true,false],
        campos:{c_area:'c_area_1',d_dato:'d_area_1'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label"
    });

    $("#btn_lupa_concepto_1").lupa_generica({
        id_lista:v_lista_conceptos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_concepto',width:100},
            {index:'d_dato',width:450}],
        caption:'Conceptos',
        sortname:'c_concepto',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#frm_consulta #c_concepto_1',
        exactField: 'c_concepto',
        filtros:['#c_organismo_1',"#c_region_1","#c_area_1"],
        filtrosTitulos:['Consorcio','Región','Área'],
        filtrosNulos:[false,true,true],
        campos:{c_concepto:'c_concepto_1',d_dato:'d_concepto_1'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label"
    });
}

function inicializa_lupas_main_grid(formid){
    $("#d_concepto, #btn_lupa_concepto",formid).lupa_generica({
        id_lista:v_lista_conceptos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_concepto',width:100},
            {index:'d_dato',width:450}],
        caption:'Conceptos',
        sortname:'c_concepto',
        sortorder:'asc',
        exactField: 'c_concepto',
        filtros:['#c_organismo',"#c_region","#c_area"],
        filtrosTitulos:['Consorcio','Región','Área'],
        filtrosNulos:[true,false,false],
        campos:{c_concepto:'c_concepto',d_dato:'d_concepto'},
        keyNav:true,
        foco:"#d_label",
        onClose:function(){
            var v_c_region = $("#c_region",formid).val();
            var v_c_area = $("#c_area",formid).val()
            var v_c_concepto = $("#c_concepto",formid).val();
            if(v_c_region != "" && v_c_area != "" && v_c_concepto != ""){
                fun_get_consorcio(formid,v_c_region, v_c_area, v_c_concepto);
            }
        }
    });

    $("#d_region, #btn_lupa_region",formid).lupa_generica({
        id_lista:v_lista_regiones_consorcio,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_region',width:100},
            {index:'d_dato',width:450}],
        caption:'Regiones',
        sortname:'c_region',
        sortorder:'asc',
        exactField: 'c_region',
        filtros:[null],
        filtrosTitulos:['Consorcio'],
        filtroNull:true,
        campos:{c_region:'c_region',d_dato:'d_region'},
        keyNav:true,
        foco:"#d_label",
        onClose:function(){
            $("#c_area,#d_area,#c_organismo,#d_organismo",formid).val("");
        }
    });

    $("#d_area, #btn_lupa_area",formid).lupa_generica({
        id_lista:v_lista_areas_consorcio,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_area',width:100},
            {index:'d_dato',width:450}],
        caption:'Áreas',
        sortname:'c_area',
        sortorder:'asc',
        exactField: 'c_area',
        filtros:[null,'#c_region'],
        filtrosTitulos:['Consorcio','Región'],
        filtrosNulos:[true,false],
        campos:{c_area:'c_area',d_dato:'d_area'},
        keyNav:true,
        foco:"#d_label",
        onClose: function(){
            var v_c_region = $("#c_region",formid).val();
            var v_c_area = $("#c_area",formid).val()
            var v_c_concepto = $("#c_concepto",formid).val();
            if(v_c_region != "" && v_c_area != "" && v_c_concepto != ""){
                fun_get_consorcio(formid,v_c_region, v_c_area, v_c_concepto);
            }else{
                $("#c_organismo,#d_organismo",formid).val("");
            }
        }
    });

    $("#d_actividad, #btn_lupa_actividad",formid).lupa_generica({
        id_lista:v_lista_actividades,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'Áreas',
        sortname:'c_codigo',
        sortorder:'asc',
        exactField: 'c_codigo',
        campos:{c_codigo:'c_actividad',d_descrip:'d_actividad'},
        keyNav:true,
        foco:"#d_label"
    });
}

function fun_get_consorcio(formid,region,area,concepto){
    $.ajax({
        url: 'param_val_liq_canon/ajax_operaciones.php',
        type: 'POST',
        dataType: 'JSON',
        data: {
            p_oper: 'getConsorcio',
            p_region: region,
            p_area: area,
            p_concepto: concepto
        },
        success: function( data ) {
            if(data){
                $("#c_organismo",formid).val(data.c_organismo);
                $("#d_organismo",formid).val(data.d_organismo);

                if($("#c_organismo",formid).val()=='DPA' && $("#c_concepto",formid).val()==370){
                    $("#d_actividad",formid).addClass('validate[required]');
                    $("#row_actividad label",formid).html("Actividad (*)");
                    $("#row_actividad",formid).show();
                }else{
                    $("#d_actividad",formid).removeClass('validate[required]');
                    $("#row_actividad label",formid).html("Actividad");
                    $("#row_actividad",formid).hide();
                }
                if($("#c_concepto",formid).val() == 350 || $("#c_concepto",formid).val() == 360){
                    $("#row_val_fijo",formid).hide();
                    $("#n_val_fijo",formid).val('');
                }else{
                    $("#row_val_fijo",formid).show();
                    $("#n_val_fijo",formid).val('');
                }
                $("#c_actividad",formid).val("");
            }
        }
    });
}

function mayusculas(e) {
    e.value = e.value.toUpperCase();
}

function fun_boton_operacion(operacion,formid){
    var msj = 'Complete los datos solicitados.';
    var valido1 = valida_fechas(formid);
    if(!valido1){
        msj = 'La fecha de vigencia hasta no puede ser menor a la fecha de vigencia desde.';
    }
    var valido2 = compara_desde_hasta(parse($("#n_hectarea_dsd",formid).val()),parse($("#n_hectarea_hst",formid).val()));
    if(!valido2){
        msj = 'El campo hectárea desde no puede ser mayor al campo hectárea hasta.';
    }
    var v_n_alicuota = parse($("#n_alicuota",formid).val());
    var valido3 = true;
    if(v_n_alicuota!=''){
        valido3 = /^[0-9]{1,13}(\.[0-9]{1,5})?$/.test(v_n_alicuota);
        if(!valido3){
            msj = 'El campo alícuota debe tener como máximo 5 decimales.';
        }
    }
    var valido4 = $("#n_alicuota",formid).val()=="" && $("#n_val_fijo",formid).val()=="";
    if(valido4){
        msj = 'Debe completar uno de los siguientes campos: Alícuota / Importe Fijo.';
    }else{
        valido4 = true;
    }
    var h_desde = parse($("#n_hectarea_dsd",formid).val());
    var valido5 = true;
    if(h_desde!=''){
        valido5 = /^[0-9]{1,6}$/.test(h_desde);
        if(!valido5){
            msj = 'El campo hectárea desde debe tener como máximo 6 dígitos.';
        }
    }
    var h_hasta = parse($("#n_hectarea_hst",formid).val());
    var valido6 = true;
    if(h_hasta!=''){
        valido6 = /^[0-9]{1,6}$/.test(h_hasta);
        if(!valido6){
            msj = 'El campo hectárea hasta debe tener como máximo 6 dígitos.';
        }
    }
    var valido7 = $(formid).validationEngine('validate');

    if(valido1 && valido2 && valido3 && valido4 && valido5 && valido6 && valido7){
        var v_confirmacion;
        if(operacion == 'edit'){
            v_confirmacion = 'CONFIRMAR';
            llamado_ajax(operacion,v_confirmacion);
        }else{
            v_confirmacion = 'VALIDAR';
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{
                    "c_organismo":$("#c_organismo",'#frm_abm_liq').val(),
                    "c_concepto":$("#c_concepto",'#frm_abm_liq').val(),
                    "c_region":$("#c_region",'#frm_abm_liq').val(),
                    "c_area":$("#c_area",'#frm_abm_liq').val(),
                    "f_vig_desde":$("#f_vig_desde",'#frm_abm_liq').val(),
                    "f_vig_hasta":$("#f_vig_hasta",'#frm_abm_liq').val(),
                    "n_hectarea_dsd":$("#n_hectarea_dsd",'#frm_abm_liq').val(),
                    "n_hectarea_hst":$("#n_hectarea_hst",'#frm_abm_liq').val(),
                    "n_alicuota":formatea_number($("#n_alicuota",'#frm_abm_liq').val(),''),
                    "n_val_fijo":formatea_number($("#n_val_fijo",'#frm_abm_liq').val(),''),
                    "c_actividad":$("#c_actividad",'#frm_abm_liq').val(),
                    "oper":operacion,
                    "id_liq_riego":$("#id_liq_riego",'#frm_abm_liq').val(),
                    "p_bonificacion":$("#p_bonificacion",'#frm_abm_liq').val(),
                    "p_d_confirmacion":v_confirmacion,
                    "id_menu":v_id_menu,
                    "n_orden":0
                },
                dataType:'json',
                async:false,
                success: function( data ) {
                    $('#main').procOverlay({visible:false});
                    if(data.resultado == 'OK'){
                        v_confirmacion = 'CONFIRMAR';
                        llamado_ajax(operacion,v_confirmacion);
                    }else{
                        if(data.p_d_confirmacion == 'SOLICITAR'){
                            mostrar_cuadro('C','Confirmación',
                                data.resultado,
                                function(){
                                    v_confirmacion = 'CONFIRMAR';
                                    llamado_ajax(operacion,v_confirmacion);
                                },
                                function(){
                                },450);
                        }else{
                            mostrar_error(data.resultado);
                            $('#main').procOverlay({visible:false});
                        }
                    }

                }
            });
        }
    }else{
        $('#main').procOverlay({visible:false});
        mostrar_validacion(msj);
    }
}

function llamado_ajax(operacion,confirmacion){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "c_organismo":$("#c_organismo",'#frm_abm_liq').val(),
            "c_concepto":$("#c_concepto",'#frm_abm_liq').val(),
            "c_region":$("#c_region",'#frm_abm_liq').val(),
            "c_area":$("#c_area",'#frm_abm_liq').val(),
            "f_vig_desde":$("#f_vig_desde",'#frm_abm_liq').val(),
            "f_vig_hasta":$("#f_vig_hasta",'#frm_abm_liq').val(),
            "n_hectarea_dsd":$("#n_hectarea_dsd",'#frm_abm_liq').val(),
            "n_hectarea_hst":$("#n_hectarea_hst",'#frm_abm_liq').val(),
            "n_alicuota":formatea_number($("#n_alicuota",'#frm_abm_liq').val(),''),
            "n_val_fijo":formatea_number($("#n_val_fijo",'#frm_abm_liq').val(),''),
            "c_actividad":$("#c_actividad",'#frm_abm_liq').val(),
            "oper":operacion,
            "id_liq_riego":$("#id_liq_riego",'#frm_abm_liq').val(),
            "p_bonificacion":$("#p_bonificacion",'#frm_abm_liq').val(),
            "p_d_confirmacion":confirmacion,
            "id_menu":v_id_menu,
            "n_orden":0
        },
        dataType:'json',
        async:false,
        success: function( data ) {
            if(data.resultado == 'OK'){
                if(operacion == 'edit'){
                    mostrar_confirmacion('La alícuota se modificó correctamente.');
                }else{
                    mostrar_confirmacion('La alícuota se dió de alta correctamente.');
                }
                $("#modal_abm_liq").modal('hide');
                $("#main_grid").trigger('reloadGrid');
                $('#main').procOverlay({visible:false});
            }else{
                mostrar_error(data.resultado);
            }
        }
    });
}

function valida_seleccion_grilla(id_grid){
    var rowid = $(id_grid).getGridParam('selrow');
    if (rowid) {
        return rowid;
    }else{
        mostrar_validacion('Debe seleccionar un registro de la grilla para operar.');
        return false;
    }
}

function set_fechas_min_max(formid){
    $("#f_vig_desde",formid).datepicker("option","onClose", function (selectedDate,obj) {
        $("#f_vig_hasta",formid).datepicker("option", "minDate", selectedDate);
    });
    
    $("#f_vig_hasta",formid).datepicker("option", "minDate", $("#f_vig_desde",formid).val());

    $("#f_vig_hasta",formid).datepicker("option","onClose", function (selectedDate,obj) {
        $("#f_vig_desde",formid).datepicker("option", "maxDate", selectedDate);
    });

    $("#f_vig_desde",formid).datepicker("option", "maxDate", $("#f_vig_hasta",formid).val());
}

function valida_fechas(formid){
    var f_desde = $("#f_vig_desde",formid).val();
    var f_hasta = $("#f_vig_hasta",formid).val();

    if(f_desde != "" && f_hasta != ""){
        return f_desde <= f_hasta;
    }else{
        return true;
    }
}

function compara_desde_hasta(numero_desde,numero_hasta){
    if(numero_desde!="" && numero_hasta!=""){
        return numero_desde <= numero_hasta;
    }else{
        return true;
    }
}

function deshabilita_campos(v_o_f){
    $(".limpiar","#frm_consulta").attr('readonly',v_o_f);
    $(".datepicker, .btn_lupa","#frm_consulta").attr('disabled',v_o_f);
}