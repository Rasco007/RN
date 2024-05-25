async function obtener_constantes(){
    return new Promise(function(resolve, reject){
        $.ajax({                     
            url: "validacion_contrib_cese/php/funciones.php",                     
            type:"POST",                     
            dataType: "JSON",                     
            data:{p_oper : 'getConst'},                     
            success: function (res) {  
                if (res){

                    g_inmueble = res.INMUEBLE || "";
                    g_provincia = res.PROVINCIA || "";
                    g_ibd = res.IBD || "";
                    g_ibcm = res.IBCM || "";
                    g_plan = res.PLAN || "";
                    g_ap = res.AP || "";
                    g_ar = res.AR || "";
                    g_sec_ibd = res.SEC_IBD || "";
                    g_sec_cm = res.SEC_CM || "";
                    g_sec_ap = res.SEC_AP || "";
                    g_sec_ar = res.SEC_AR || "";
                    g_jur_neuquen = res.JUR_NEUQUEN || "";
                    g_ute = res.UTE || "";
                    g_dep_cm = res.DEP_CM || "";
                    g_loc_c = res.LOC_C || "";
                    sesion = res.SESION || "";
                    resolve();
                }
            },
            error: function(jqXHR, textStatus, errorThrown) {
                reject(errorThrown);
            }                 
        });
    });
}

function buscar(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{    
            'p_n_cuit': limpia_cuit($('#n_cuit').val()),     
            'p_c_tributo': $('#c_tributo').val(),
            'p_obj_hecho': $('#d_objeto_hecho').val(),          
         "id_menu":v_id_menu,
         "n_orden":1
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                disable_inputs();
                $('#id_contribuyente').val(data.p_id_contribuyente);

                if (data.p_n_cuit_out){
                    $('#n_cuit').val(data.p_n_cuit_out);
                    $('#d_denominacion').val(data.p_d_razon_soc);
                }

                filtros_arr_inscripciones = [];
                if(limpia_cuit($("#n_cuit").val()) != ''){
                    filtros_arr_inscripciones.push('Nro. CUIT: '+ $("#n_cuit").val());
                }
                if($("#c_tributo").val() != ''){
                    filtros_arr_inscripciones.push('Código Tributo: '+ $("#c_tributo").val());
                }
                if($("#d_objeto_hecho").val() != ''){
                    filtros_arr_inscripciones.push('Objeto / Hecho: '+ $("#d_objeto_hecho").val());
                }
                if($("#f_vig_desde").val() != ''){
                    filtros_arr_inscripciones.push('F. Vig. Desde '+ $("#f_vig_desde").val());
                }
                filtros_no_nativos_ar['inscripciones_grid'] = filtros_arr_inscripciones;

                setea_parametros('#inscripciones_grid',{
                    ':p_n_cuit': limpia_cuit($("#n_cuit").val()) || null,
                    ':p_c_tributo': $("#c_tributo").val() || null,
                    ':p_d_objeto_hecho': $("#d_objeto_hecho").val() || null,
                    ':p_f_vig_desde': $("#f_vig_desde").val() || null,
                });
                $('#btn_buscar').attr('disabled', true);
                $('#f_vig_hasta').attr('disabled', false);
                $("#div_inscripciones_grid").show();
                $(window).resize(); 
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function baja(id){

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{  
            'p_sesion': sesion,           
            'p_id_contribuyente': $('#inscripciones_grid').getCell(id, 'id_contribuyente'),
            'p_n_cuit': $('#inscripciones_grid').getCell(id, 'n_cuit'),
            'p_c_tributo': $('#inscripciones_grid').getCell(id, 'c_tributo'),
            'p_obj_hecho': $('#inscripciones_grid').getCell(id, 'd_objeto_hecho'),      
            'p_c_tipo_imponible':  $('#inscripciones_grid').getCell(id, 'c_tipo_imponible'),
            'p_f_vig_desde': $('#inscripciones_grid').getCell(id, 'f_vig_desde'),
            'p_f_vig_hasta': $('#f_vig_hasta').val(),     
         "id_menu":v_id_menu,
         "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                if(data.p_c_orden > 0 || (data.p_resultado == 'TRUE' || data.p_resultado == 'BONIF')){
                    errores();
                }else{
                    mostrar_cuadro('S','Éxito','No hay errores');
                }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function disable_inputs(){
    $('#n_cuit').attr('disabled', true);
    $('#f_vig_desde').attr('disabled', true);
    $('#d_objeto_hecho').attr('disabled', true);
    $('#d_denominacion').attr('disabled', true);
    $('#c_tributo').attr('disabled', true);

    $('#n_cuit').attr('readonly', true);
    $('#f_vig_desde').attr('readonly', true);
    $('#d_objeto_hecho').attr('readonly', true);
    $('#d_denominaicion').attr('readonly', true);
    $('#c_tributo').attr('readonly', true);

    $('#lupa_c_tributo').hide();
    $('#lupa_d_objeto_hecho').hide();
    $('#lupa_d_denominacion').hide();
    $('#mascara_lupa_d_objeto_hecho').show().css('display', 'table-cell');
    $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
}

function limpiar(){
    $('#n_cuit').attr('disabled', false);
    $('#f_vig_desde').attr('disabled', false);
    $('#d_objeto_hecho').attr('disabled', false);
    $('#d_denominacion').attr('disabled', false);
    $('#c_tributo').attr('disabled', false);

    $('#n_cuit').attr('readonly', false);
    $('#f_vig_desde').attr('readonly', false);
    $('#d_objeto_hecho').attr('readonly', false);
    $('#d_denominacion').attr('readonly', false);
    $('#c_tributo').attr('readonly', false);
    
    $('#n_cuit').val("");
    $('#f_vig_desde').val("");
    $('#f_vig_hasta').val("");
    $('#d_objeto_hecho').val("");
    $('#d_denominacion').val("");
    $('#c_tributo').val("");
    $('#d_tributo').val("");
    $('#c_tipo_documento').val("");
    $('#d_tipo_documento').val("");
    $('#n_documento').val("");
    $('#id_contribuyente').val("");
    $('#c_tipo_imponible').val("");

    $("#div_comercios").hide();
    $("#div_actividades").hide();
    $("#div_jurisdicciones").hide();
    $("#div_inscripciones_grid").hide()
    $('#actividades_grid, #comercios_grid, #jurisdicciones_grid, #inscripciones_grid').jqGrid('clearGridData');
    $('#btn_buscar').attr('disabled', false);
    $('#lupa_c_tributo').show();
    $('#mascara_lupa_d_objeto_hecho').show();
    $('#lupa_d_denominacion').hide();
    $('#mascara_lupa_d_denominacion').show();
}

function errores(){
    filtros_arr_errores = [];
    if(sesion != ''){
        filtros_arr_errores.push('ID Sesión: '+ sesion);
    }
    filtros_no_nativos_ar['errores_grid'] = filtros_arr_errores;
    $('#datos_errores_modal').modal('show');
    setea_parametros('#errores_grid',{
        ':p_n_sesion': sesion
    });
    $(window).resize();
}

function imprimir(){
    let id = $("#inscripciones_grid").getGridParam('selrow');
    if(id){
        let params = 'P_ID_CONTRIBUYENTE|' + $('#inscripciones_grid').getCell(id, 'id_contribuyente') 
                    + '&P_F_CESE|' + $('#f_vig_hasta').val() 
                    + '&P_C_TRIBUTO|' + $('#inscripciones_grid').getCell(id, 'c_tributo') 
                    + '&P_D_OBJETO_HECHO|' + $('#inscripciones_grid').getCell(id, 'd_objeto_hecho') 
                    + '&P_SESION|' + sesion;

        llamar_report('CONTL017', params, 'PDF');
    }
}

function to_date(fecha){
    var dateParts = fecha.split("/");
    var day = parseInt(dateParts[0], 10);
    var month = parseInt(dateParts[1], 10) - 1; 
    var year = parseInt(dateParts[2], 10);
    var resultDate = new Date(year, month, day);
    return resultDate;
}

function autocompleta_contrib_por_cuit() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: "validacion_contrib_cese/php/autocomplete.php",
        data: {oper:'cuit', term: limpia_cuit($('#n_cuit').val())},
        dataType: 'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado === 'OK'){
                ajax_autocomplete = null;
                if(data) {
                    $("#d_denominacion").val(data.DENOMINACION);
                    $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                    $("#c_tipo_documento").val(data.C_TIPO_DOCUMENTO);
                    $("#n_documento").val(data.N_DOCUMENTO);
                    $("#d_tipo_documento").val(data.D_DOCUMENTO);
                }
            }else{
                mostrar_cuadro('E', 'Error', 'Error al buscar el CUIT');
            }
        }
    });
}


