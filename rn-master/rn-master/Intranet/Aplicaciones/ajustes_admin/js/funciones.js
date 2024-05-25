function inicializarLupas() {
    $("#c_tipo_doc").lupa_generica({
        id_lista:v_lista_tipos_documentos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_dato',width:100},
            {index:'d_dato',width:450}],
        caption:'Tipos Documentos',
        sortname:'c_dato',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_tipo_doc',
        exactField: 'c_dato',
        campos:{c_dato:'c_tipo_doc'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onKeydown:false,
        onClose:function(){
            $("#n_documento").val('');
        }
    });

    $("#btn_lupa_tipo_imponible").lupa_generica({
        id_lista:v_lista_tipos_imponibles,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_dato',width:100},
            {index:'d_dato',width:450}],
        caption:'Tipos Imponibles',
        sortname:'c_dato',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_tipo_imponible',
        exactField: 'c_dato',
        filtros:["#id_contribuyente",v_m_solo_honorarios],
        filtrosTitulos:["CUIT","Solo Honorarios"],
        filtrosNulos:[true,false],
        campos:{c_dato:'c_tipo_imponible',d_dato:'d_tipo_imponible'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose:function(){
            $("#d_objeto_hecho, #c_tributo,#d_tributo, #c_concepto,#d_concepto").val('');
        }
    });

    $("#btn_lupa_objeto").lupa_generica({
        id_lista:v_lista_objetos,
        titulos:['Objeto'],
        grid:[  {index:'d_objeto_hecho',width:200}],
        caption:'Objetos',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        filtros:[null,"#c_tipo_imponible",'#id_contribuyente'],
        filtrosTitulos:['Tributo','Tipo Imponible','CUIT'],
        filtrosNulos:[true,true,true],
        campos:{d_objeto_hecho:'d_objeto_hecho'},
        keyNav:true,
        foco:"#d_label",
        onClose:function(){
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
        }
    });

    $("#btn_lupa_tributo").lupa_generica({
        id_lista:v_lista_tributos,
        titulos:['Código','Descripción','c_tipo_imponible','d_tipo_imponible'],
        grid:[  {index:'c_tributo',width:100},
            {index:'d_descrip',width:450},
            {index:'c_tipo_imponible',hidden:true},
            {index:'d_tipo_imponible',hidden:true}],
        caption:'Tributos',
        sortname:'c_tributo',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_tributo',
        exactField: 'c_tributo',
        filtros:["#id_contribuyente","#c_tipo_imponible","#d_objeto_hecho",v_m_solo_honorarios],
        filtrosTitulos:["CUIT","Tipo Imponible","Objeto","Solo Honorarios"],
        filtrosNulos:[false,true,true,true],
        campos:{c_tributo:'c_tributo',d_descrip:'d_tributo',c_tipo_imponible:'c_tipo_imponible',d_tipo_imponible:'d_tipo_imponible'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label",
        onClose:function(){
            $("#c_concepto, #d_concepto").val('');
        }
    });

    $("#btn_lupa_concepto").lupa_generica({
        id_lista:v_lista_conceptos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_concepto',width:100},
            {index:'d_concepto',width:450}],
        caption:'Conceptos',
        sortname:'c_concepto',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_concepto',
        exactField: 'c_concepto',
        filtros:["#id_contribuyente","#c_tipo_imponible","#d_objeto_hecho","#c_tributo"],
        filtrosTitulos:["CUIT","Tipo Imponible","Objeto","Tributo"],
        filtrosNulos:[false,true,true,false],
        campos:{c_concepto:'c_concepto',d_concepto:'d_concepto'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label"
    });

    $("#btn_lupa_movimiento_ajuste").lupa_generica({
        id_lista:v_lista_tipos_mov_cc,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_dato',width:100},
            {index:'d_dato',width:450}],
        caption:'Tipos de Movimiento',
        sortname:'d_dato',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_tipo_mov_ajuste',
        exactField: 'c_dato',
        filtros:["#c_tributo","#c_concepto"],
        filtrosTitulos:["Tributo","Concepto"],
        campos:{c_dato:'c_tipo_mov_ajuste',d_dato:'d_tipo_mov_ajuste'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label"
    });

    $("#btn_lupa_motivo").lupa_generica({
        id_lista:v_lista_motivos_ajuste,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_dato',width:100},
            {index:'d_dato',width:450}],
        caption:'Motivos de Ajuste',
        sortname:'d_dato',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_motivo',
        exactField: 'c_dato',
        filtros:["#c_tributo"],
        filtrosTitulos:["Tributo"],
        campos:{c_dato:'c_motivo',d_dato:'d_motivo'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label"
    });

    $("#btn_lupa_moneda_ajuste").lupa_generica({
        id_lista:v_lista_monedas,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'Modedas',
        sortname:'c_codigo',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_tipo_moneda_ajuste',
        exactField: 'c_codigo',
        campos:{c_codigo:'c_tipo_moneda_ajuste',d_descrip:'d_tipo_moneda_ajuste'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label"
    });

    $("#btn_lupa_concepto_mov_ajuste").lupa_generica({
        id_lista:v_lista_conceptos_ajuste,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_concepto',width:100},
            {index:'d_concepto',width:450}],
        caption:'Conceptos de Movimiento de Ajuste',
        sortname:'c_concepto',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_concepto_mov_ajuste',
        exactField: 'c_concepto',
        filtros:["#c_tributo", "#c_concepto_mov", "#c_concepto", "#id_oblig_ajustada"],
        filtrosTitulos:["Tributo","Concepto del Mov.","Concepto","ID Obligación"],
        filtrosNulos:[false,true,false,false],
        campos:{c_concepto:'c_concepto_mov_ajuste',d_concepto:'d_concepto_mov_ajuste'},
        keyNav:true,
        limpiarCod: true,
        foco:"#d_label"
    });
}

function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "ajustes_admin/autocomplete.php",
        type:"POST",
        data:{  p_oper:'getDenominacion',p_filtro: cuit_sin_guiones},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res){
                $("#cuit_limpio").val(res['CUIT_LIMPIO']);
                $("#d_denominacion").val(res['DENOMINACION']);
                $("#id_contribuyente").val(res['ID_CONTRIBUYENTE']);
                $("#c_tipo_doc").val(res['C_TIPO_DOCUMENTO']);
                $("#n_documento").val(res['N_DOCUMENTO']);
            }else{
                $("#cuit_limpio").val(null);
                $("#d_denominacion").val(null);
                $("#id_contribuyente").val(null);
                $("#c_tipo_doc").val(null);
                $("#n_documento").val(null);
            }
        }
    });
}

function deshabilita_campos(form,v_o_f){
    $(".limpiar", form).attr('readonly',v_o_f);
    $(".limpiar", form).attr('disabled',v_o_f);
    $("#btn_buscar").attr('disabled',v_o_f);
    if (v_o_f){
        $(".btn_lupa",form).hide();
    }else{
        $(".btn_lupa",form).show();
    }
}

function fun_select_radio(){
    $("#frm_detalle_mov input, #frm_detalle_ajuste input, #d_observaciones").val(null);
    $("#btn_aplicar_ajuste").attr('disabled',false);
    $("#c_tipo_moneda_ajuste").val(1);
    $("#d_tipo_moneda_ajuste").val('PESO');
    $("#c_motivo").attr('readonly', false);
    $("#btn_lupa_motivo").show();

    if($("#m_deb_cred").is(":checked")){ //debito credito
        v_tipo_ajuste = 0;
        $("#c_tipo_mov_ajuste, #d_tipo_mov_ajuste").val(null);
        $("#btn_lupa_movimiento_ajuste").show();
        $("#c_tipo_mov_ajuste, #d_tipo_mov_ajuste, #f_ajuste, #c_concepto_mov_ajuste,#i_importe_ajuste").attr('readonly', false);
        $("#btn_cons_cta_cte").attr('disabled',true);
        $("#m_deb_cred_ajuste, .datepicker").attr('disabled', false).selectpicker('val','');
        $("#btn_lupa_concepto_mov_ajuste").show();
    }

    if($("#m_reversa").is(":checked")){ //reversa
        v_tipo_ajuste = 1;
        $("#c_tipo_mov_ajuste").val(3);
        $("#d_tipo_mov_ajuste").val('REVERSA');
        $("#btn_lupa_movimiento_ajuste").hide();
        $("#c_tipo_mov_ajuste, #d_tipo_mov_ajuste").attr('readonly', true);
        $("#f_ajuste, #c_concepto_mov_ajuste").attr('readonly', true);
        $("#btn_cons_cta_cte").attr('disabled',false);
        $("#m_deb_cred_ajuste, .datepicker").attr('disabled', true).selectpicker('val','');
        $("#btn_lupa_concepto_mov_ajuste").hide();
    }
}

function fun_aplicar_ajuste(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_c_tributo": $("#c_tributo").val(),
            "p_c_concepto": $("#c_concepto").val(),
            "p_n_posicion_fiscal": $("#n_pos_fiscal").val().split('/').join(''),
            "p_n_cuota_anticipo": $("#n_cuota").val(),
            "p_id_obligacion": $("#id_oblig_ajustada").val(),
            "p_tipo_ajuste": v_tipo_ajuste,
            "p_n_secuencia_rel": $("#n_secuencia_rel").val(),
            "p_c_tipo_movi": $("#c_tipo_mov_ajuste").val(),
            "p_c_motivo_ajuste": $("#c_motivo").val(),
            "p_f_ajuste": $("#f_ajuste").val(),
            "p_m_debe": $("#m_deb_cred_ajuste").val(),
            "p_c_concepto_mov": $("#c_concepto_mov_ajuste").val(),
            "p_i_ajuste": $("#i_importe_ajuste").val(),
            "p_c_moneda": $("#c_tipo_moneda_ajuste").val(),
            "p_d_observaciones": $("#d_observaciones").val(),
            "id_menu":10860,
            "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                mostrar_confirmacion('Se ha aplicado correctamente el ajuste número: '+data.p_n_ajuste+'.');
                $("#n_ajuste").val(data.p_n_ajuste);
                $("input").attr('readonly',true);
                $("#btn_cons_cta_cte, #btn_aplicar_ajuste").attr('disabled',true);
                $(".btn_lupa").hide();
            }
            else{
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}

function fun_get_obligaciones() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "ajustes_admin/autocomplete.php",
        type:"POST",
        data:{
            p_oper:'getObligaciones',
            id_contribuyente: $("#id_contribuyente").val(),
            c_tipo_imponible: $("#c_tipo_imponible").val(),
            c_tributo: $("#c_tributo").val(),
            c_concepto: $("#c_concepto").val(),
            d_objeto_hecho: $("#d_objeto_hecho").val(),
            n_pos_fiscal: $("#n_pos_fiscal").val().split('/').join(''),
            n_cuota: $("#n_cuota").val()
        },
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res.resultado == 'OK'){
                if (res.cantidad === 1){
                    if (res.m_intimacion == 'S'){
                        mostrar_validacion('La obligación tiene una intimación. No puede continuar.');
                    }else if (res.m_intimacion != 'N' && res.m_intimacion != 'D') {
                        mostrar_validacion('Debe regularizar la situación de la obligación ante COF.');
                    }else{
                        deshabilita_campos('#frm_contrib',true);
                        deshabilita_campos('#frm_oblig',true);
                        deshabilita_campos('#frm_detalle_ajuste',false);
                        $("#btn_aplicar_ajuste").attr('disabled',false);
                        $('#id_oblig_ajustada').val(res.id_obligacion);
                        $('#d_objeto_hecho').val(res.d_objeto_hecho);
                        $("#ajustes_obligacion").show();
                        $("#frm_detalle_mov input, #frm_detalle_ajuste input").val(null);
                        $("#f_ajuste, #c_concepto_mov_ajuste",'#frm_detalle_ajuste').attr('readonly',false);
                        $("#m_deb_cred_ajuste, .datepicker").attr('disabled',false).selectpicker('val','');
                        $("#btn_lupa_concepto_mov_ajuste").show();
                        $('#m_deb_cred').prop('checked',true).click();
                        $('#div_main_grid').hide();
                    }
                }else{
                    deshabilita_campos('#frm_contrib',true);
                    deshabilita_campos('#frm_oblig',true);
                    deshabilita_campos('#frm_detalle_ajuste',false);
                    $("#btn_aplicar_ajuste").attr('disabled',false);
                    setea_parametros('#main_grid',{
                        ':id_contribuyente': $("#id_contribuyente").val(),
                        ':c_tipo_imponible': $("#c_tipo_imponible").val(),
                        ':c_tributo': $("#c_tributo").val(),
                        ':c_concepto': $("#c_concepto").val(),
                        ':d_objeto_hecho': $("#d_objeto_hecho").val(),
                        ':n_pos_fiscal': $("#n_pos_fiscal").val().split('/').join(''),
                        ':n_cuota': $("#n_cuota").val()
                    });
                    $('#div_main_grid').show();
                }
            }else {
                mostrar_validacion(res.error);
            }
        }
    });
}

/*if(v_m_solo_honorarios == 'S'){
                if($("#c_tributo").val() == 110){
                    deshabilita_campos('#frm_contrib',true);
                    deshabilita_campos('#frm_oblig',true);
                    deshabilita_campos('#frm_detalle_ajuste',false);
                    $("#btn_aplicar_ajuste").attr('disabled',false);
                    setea_parametros('#main_grid',{
                        ':id_contribuyente': $("#id_contribuyente").val(),
                        ':c_tipo_imponible': $("#c_tipo_imponible").val(),
                        ':c_tributo': $("#c_tributo").val(),
                        ':c_concepto': $("#c_concepto").val(),
                        ':d_objeto_hecho': $("#d_objeto_hecho").val(),
                        ':n_pos_fiscal': $("#n_pos_fiscal").val().split('/').join(''),
                        ':n_cuota': $("#n_cuota").val()
                    });
                }else{
                    mostrar_validacion('Este menú sólo está habilitado para trabajar sobre el tributo HONORARIOS.');
                }
            }else{
                deshabilita_campos('#frm_contrib',true);
                deshabilita_campos('#frm_oblig',true);
                deshabilita_campos('#frm_detalle_ajuste',false);
                $("#btn_aplicar_ajuste").attr('disabled',false);
                setea_parametros('#main_grid',{
                    ':id_contribuyente': $("#id_contribuyente").val(),
                    ':c_tipo_imponible': $("#c_tipo_imponible").val(),
                    ':c_tributo': $("#c_tributo").val(),
                    ':c_concepto': $("#c_concepto").val(),
                    ':d_objeto_hecho': $("#d_objeto_hecho").val(),
                    ':n_pos_fiscal': $("#n_pos_fiscal").val().split('/').join(''),
                    ':n_cuota': $("#n_cuota").val()
                });
            }*/