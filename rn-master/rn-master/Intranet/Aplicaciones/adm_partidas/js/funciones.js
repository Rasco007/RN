function inicializa_lupas(){
    $("#btn_lupa_consorcio").lupa_generica({
        id_lista:v_lista_consorcios,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_organismo',width:100},
            {index:'d_dato',width:450}],
        caption:'Consorcios',
        sortname:'c_organismo',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_organismo',
        exactField: 'c_organismo',
        campos:{c_organismo:'c_organismo',d_dato:'d_organismo'},
        filtros:[null],
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose:function(){
            $("#c_region,#d_region,#c_area,#d_area").val('');
        }
    });
    
    $("#btn_lupa_region").lupa_generica({
        id_lista:v_lista_regiones_consorcio,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_region',width:100},
            {index:'d_dato',width:450}],
        caption:'Regiones',
        sortname:'c_region',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_region',
        exactField: 'c_region',
        filtros:[null,'#c_organismo'],
        filtrosTitulos:['Tipo','Consorcio'],
        filtrosNulos:[true,true],
        campos:{c_region:'c_region',d_dato:'d_region'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose:function(){
            $("#c_area,#d_area").val("");
        }
    });

    $("#btn_lupa_area").lupa_generica({
        id_lista:v_lista_areas_consorcio,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_area',width:100},
            {index:'d_dato',width:450}],
        caption:'Áreas',
        sortname:'c_area',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_area',
        exactField: 'c_area',
        filtros:[null,'#c_organismo','#c_region'],
        filtrosTitulos:['Tipo','Consorcio','Región'],
        filtrosNulos:[true,true,false],
        campos:{c_area:'c_area',d_dato:'d_area'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label"
    });
}

function autocompletecuitdenominacion(formid){
    //Completamos Datos del Contribuyente
    $("#d_denominacion",formid).autocomplete({
        source: function( request, response ) {

            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "adm_partidas/autocomplete.php",
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
            $("#d_denominacion",formid).val(ui.item.value);
            $("#n_cuit",formid).val(ui.item.cuit);
            $("#id_contribuyente",formid).val(ui.item.id_contribuyente);
            return false;
        }
    });

    $("#n_cuit",formid).mask("99-99999999-9");
    $('#n_cuit',formid).change(function (){
        if ($('#n_cuit',formid).val() && $('#n_cuit',formid).val().length == 13){
            completarDenominacion(formid);
        }else{
            $("#d_denominacion",formid).val(null);
            $("#n_cuit",formid).val(null);
            $("#id_contribuyente",formid).val(null);
        }
    });
}

function completarDenominacion(formid){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit',formid).val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "adm_partidas/autocomplete.php",
        type:"POST",
        data:{  p_oper:'getContribuyente',p_filtro: cuit_sin_guiones},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res){
                $("#d_denominacion",formid).val(res['DENOMINACION']);
                $("#id_contribuyente",formid).val(res['ID_CONTRIBUYENTE']);
            }else{
                $("#d_denominacion",formid).val(null);
                $("#id_contribuyente",formid).val(null);
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

function valida_campos_liq(id_grid, rowid){
    return $(id_grid).getCell(rowid,'n_hectareas') != "" /*&& $(id_grid).getCell(rowid,'c_actividad') != ""*/ && $(id_grid).getCell(rowid,'f_inscripcion') != "";
}

function inicializa_botones(){
    $("#btn_inscripcion").click(function(){
        var rowid = valida_seleccion_grilla("#main_grid");
        if(rowid){
            if(!valida_campos_liq("#main_grid", rowid)){
                    $("#frm_inscripcion_tributo").validationEngine('hideAll');
                    $("input","#frm_inscripcion_tributo").val('');
                    if (!$("#inscripcion_tributo.modal.in").length) { $("#inscripcion_tributo>.modal-dialog").css({ top: 0, left: 0 }); }
                    obtener_contribuyente_activo(rowid);
            }else{
                if($("#main_grid").getCell(rowid,'f_baja') == ""){
                    mostrar_validacion("La partida seleccionada ya se encuentra inscripta al tributo.");
                }else{
                    mostrar_validacion("La partida seleccionada fue dada de baja del tributo.");
                }
            }   
        }
    });

    $("#btn_baja_tributo").click(function(){
        var rowid = valida_seleccion_grilla("#main_grid");
        if(rowid){
            if(valida_campos_liq("#main_grid", rowid)){
                if($("#main_grid").getCell(rowid,'f_baja') == ""){
                    $("#frm_cese_tributo").validationEngine('hideAll');
                    $("input, textarea","#frm_cese_tributo").val('');
                    $("#f_baja",'#frm_cese_tributo').datepicker("option",'minDate',$("#main_grid").getCell(rowid,'f_inscripcion'));
                    $("#cese_tributoLabel").html('Baja de Partida<br>'+
                        'Nro. Partida: '+$("#main_grid").getCell(rowid,'n_partida')+
                        ' - Nomen.: '+$("#main_grid").getCell(rowid,'d_nomenclatura_real')+
                        (($("#main_grid").getCell(rowid,'n_regante') != '')? ' - Nro. Regante / Parcela: '+$("#main_grid").getCell(rowid,'n_regante') : ''));
                    $("#cese_tributo").modal('show');
                }else{
                    mostrar_validacion("La partida seleccionada fue dada de baja del tributo.");
                }
            }else{
                mostrar_validacion("La partida seleccionada no se encuentra inscripta al tributo.");
            }   
        }
    });

    $("#btn_modificacion").click(function(){
        var rowid = valida_seleccion_grilla("#main_grid");
        if(rowid){
            if(valida_campos_liq("#main_grid", rowid)){
                if($("#main_grid").getCell(rowid,'f_baja') == ""){
                    $("#frm_modificacion_datos").validationEngine('hideAll');
                    $("#n_hectareas","#frm_modificacion_datos").val($("#main_grid").getCell(rowid,'n_hectareas'));
                    $("#c_unid_med_m","#frm_modificacion_datos").val($("#main_grid").getCell(rowid,'c_unid_med'));
                    $("#d_unid_med_m","#frm_modificacion_datos").val($("#main_grid").getCell(rowid,'d_unid_med'));
                    $("#c_actividad_m","#frm_modificacion_datos").val($("#main_grid").getCell(rowid,'c_actividad'));
                    $("#d_actividad_m","#frm_modificacion_datos").val($("#main_grid").getCell(rowid,'d_actividad'));
                    $("#n_cuit","#frm_modificacion_datos").val($("#main_grid").getCell(rowid,'n_cuit_resp'));
                    $("#d_denominacion","#frm_modificacion_datos").val($("#main_grid").getCell(rowid,'d_denominacion_resp'));
                    $("#n_regante","#frm_modificacion_datos").val($("#main_grid").getCell(rowid,'n_regante'));
                    $("#modificacion_datosLabel").html('Modificacion Datos<br>'+
                        'Nro. Partida: '+$("#main_grid").getCell(rowid,'n_partida')+
                        ' - Nomen.: '+$("#main_grid").getCell(rowid,'d_nomenclatura_real')+
                        (($("#main_grid").getCell(rowid,'n_regante') != '')? ' - Nro. Regante / Parcela: '+$("#main_grid").getCell(rowid,'n_regante') : ''));
                    $("#modificacion_datos").modal('show');
                }else{
                    mostrar_validacion("La partida seleccionada fue dada de baja del tributo.");
                }
            }else{
                mostrar_validacion("La partida seleccionada no se encuentra inscripta al tributo.");
            }   
        }
    });

    $("#btn_extincion").click(function(){
        var rowid = valida_seleccion_grilla("#main_grid");
        if(rowid){
            if($("#main_grid").getCell(rowid,'m_extincion') == "N"){
                var f_baja = $("#main_grid").getCell(rowid,'f_baja');
                if(valida_campos_liq("#main_grid", rowid) && f_baja != ""){
                    $("#frm_liq_extincion").validationEngine('hideAll');
                    $("input","#frm_liq_extincion").val('');
                    $("#f_vto","#frm_liq_extincion").datepicker("option",'minDate',f_baja);
                    $("#liq_extincionLabel").html('Liquidación de Extinción<br>'+
                        'Nro. Partida: '+$("#main_grid").getCell(rowid,'n_partida')+
                        ' - Nomen.: '+$("#main_grid").getCell(rowid,'d_nomenclatura_real')+
                        (($("#main_grid").getCell(rowid,'n_regante') != '')? ' - Nro. Regante / Parcela: '+$("#main_grid").getCell(rowid,'n_regante') : ''));
                    $("#liq_extincion").modal('show');
                }else{
                    mostrar_validacion("La partida seleccionada no se encuentra dada de baja del tributo.");
                }
            }else{
                mostrar_validacion("La extinción ya se encuentra liquidada para la partida seleccionada.");
            }
        }
    });

    $("#btn_reinscripcion").click(function(){
        var rowid = valida_seleccion_grilla("#main_grid");
        if(rowid){
            if($("#main_grid").getCell(rowid,'m_extincion') == "N"){
                var f_baja = $("#main_grid").getCell(rowid,'f_baja');
                if(valida_campos_liq("#main_grid", rowid) && f_baja != ""){
                    mostrar_cuadro('Q','Atención', 'Se revertirá el cese de inscripción de la partida seleccionada, ¿Desea continuar?.',
                        function(){
                            revertir_cese();
                        },function(){});
                }else{
                    mostrar_validacion("La partida seleccionada no se encuentra dada de baja del tributo.");
                }
            }else{
                mostrar_validacion("La partida seleccionada ya posee liquidada la extinción. No puede inscribir esta partida.");
            }
        }
    });

    ///////////// Botones de consulta de historial /////////////
    $("#btn_hist_hectareas").click(function(){
        var rowid = valida_seleccion_grilla("#main_grid");
        if(rowid){
            if(valida_campos_liq("#main_grid", rowid)){
                var v_partida = $("#main_grid").getCell(rowid,'n_partida');
                setea_parametros("#grid_hist_hectareas",{":n_partida":v_partida});
				
				$("#grid_hist_hectareas_title").html('Histórico de Hectáreas<br>'+'Nro. Partida: '+v_partida+' - Nomen.: '+$("#main_grid").getCell(rowid,'d_nomenclatura_real'));
					
                $("#modal_grid_hist_hectareas").modal('show');
                $(window).resize();
            }else{
                mostrar_validacion("La partida seleccionada no se encuentra inscripta al tributo.");
            }
        }
    });

    $("#btn_hist_actividades").click(function(){
        var rowid = valida_seleccion_grilla("#main_grid");
        if(rowid){
            if(valida_campos_liq("#main_grid", rowid)){
                var v_partida = $("#main_grid").getCell(rowid,'n_partida');
                setea_parametros("#grid_hist_actividades",{":n_partida":v_partida});
				
				$("#grid_hist_actividades_title").html('Histórico de Actividades<br>'+'Nro. Partida: '+v_partida+' - Nomen.: '+$("#main_grid").getCell(rowid,'d_nomenclatura_real'));
				
                $("#modal_grid_hist_actividades").modal('show');
                $(window).resize();
            }else{
                mostrar_validacion("La partida seleccionada no se encuentra inscripta al tributo.");
            }
        }
    });
    
    $("#btn_hist_responsables").click(function(){
        var rowid = valida_seleccion_grilla("#main_grid");
        if(rowid){
            if(valida_campos_liq("#main_grid", rowid)){
                var v_partida = $("#main_grid").getCell(rowid,'n_partida');
                setea_parametros("#grid_hist_responsables",{":n_partida":v_partida});
				
				$("#grid_hist_responsables_title").html('Histórico de Responsables<br>'+'Nro. Partida: '+v_partida+' - Nomen.: '+$("#main_grid").getCell(rowid,'d_nomenclatura_real'));
				
                $("#modal_grid_hist_responsables").modal('show');
                $(window).resize();
            }else{
                mostrar_validacion("La partida seleccionada no se encuentra inscripta al tributo.");
            }
        }
    });
}

function fun_devuelve_nomenclatura(formid){
    if($("#departamento",formid).val()=="" && $("#circunscripcion",formid).val()=="" && $("#seccion",formid).val()=="" && $("#u_caracteristica",formid).val()=="" && $("#parcela",formid).val()=="" && $("#u_funcional",formid).val()==""){
        return null;
    }else{
        return $("#departamento",formid).val() +'-'+ $("#circunscripcion",formid).val() +'-'+ $("#seccion",formid).val() +'-'+ $("#u_caracteristica",formid).val() +'-'+ $("#parcela",formid).val() +'-'+ $("#u_funcional",formid).val();
    }
}

function deshabilita_campos(v_o_f){
    $(".limpiar","#frm_consulta").attr('readonly',v_o_f);
    $("select","#frm_consulta").attr('disabled',v_o_f);
}

function obtener_contribuyente_activo(rowid){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "adm_partidas/autocomplete.php",
        type:"POST",
        data:{  p_oper:'getContribuyenteActivo',p_filtro: $("#main_grid").getCell(rowid,'n_partida')},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res){
                $("#n_cuit","#frm_inscripcion_tributo").val(res['CUIT']);
                $("#d_denominacion","#frm_inscripcion_tributo").val(res['DENOMINACION']);
                $("#id_contribuyente","#frm_inscripcion_tributo").val(res['ID_CONTRIBUYENTE']);
				
				$("#inscripcion_tributoLabel").html('Alta de Partida<br>'+
					'Nro. Partida: '+$("#main_grid").getCell(rowid,'n_partida')+
					' - Nomen.: '+$("#main_grid").getCell(rowid,'d_nomenclatura_real'));
				$("#inscripcion_tributo").modal('show');
            }else{
				mostrar_validacion('La partida ingresada no se encuentra inscripta al tributo de Inmobiliario.');
                $("#n_cuit","#frm_inscripcion_tributo").val(null);
                $("#d_denominacion","#frm_inscripcion_tributo").val(null);
                $("#id_contribuyente","#frm_inscripcion_tributo").val(null);
            }
        }
    });
}