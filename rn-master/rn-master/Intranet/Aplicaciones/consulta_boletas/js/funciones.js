function autocompleta_contrib_por_cuit() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: "consulta_boletas/php/autocomplete.php",
        data: {oper:'cuit', term: limpia_cuit($('#n_cuit').val())},
        dataType: 'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data){
                ajax_autocomplete = null;
                if(data) {
                    $("#desc_denom").val(data.DENOMINACION);
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

function autocompleta_por_tributo_y_objeto(){
    $.ajax({
        type:'POST',
        url: "consulta_boletas/php/autocomplete.php",
        data: {
            oper:'tributo_y_objeto',
            p_c_tributo: $('#c_tributo').val(),
            p_d_obj_hecho: $('#d_objeto_hecho').val()
        },
        dataType: 'json',
        success: function( data ) {
            if(data){
                ajax_autocomplete = null;
                $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                $("#n_cuit").val(data.N_CUIT);
                $("#desc_denom").val(data.D_DENOMINACION);

                $("#n_cuit").mask("99-99999999-9");

            }
        }
    });
}
//TODO: probar
function autocompleta_por_tributo_y_objeto_grilla(f_emision_agr){
    $.ajax({
        type:'POST',
        url: "consulta_boletas/php/autocomplete.php",
        data: {
            oper:'tributo_y_objeto_grilla',
            p_c_tributo: $('#c_tributo').val(),
            p_d_obj_hecho: $('#d_objeto_hecho').val(),
            p_f_emision_agr: f_emision_agr
        },
        dataType: 'json',
        success: function( data ) {
            if(data){
                ajax_autocomplete = null;
                $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                $("#n_cuit").val(data.N_CUIT);
                $("#desc_denom").val(data.D_DENOMINACION);

                $("#n_cuit").mask("99-99999999-9");

            }
        }
    });
}

function ocultar_botones(){
    $('#n_cuit').attr('disabled', true);
    $('#desc_denom').attr('disabled', true);
    $('#c_tributo').attr('disabled', true);
    $('#d_objeto_hecho').attr('disabled', true);
    $('#c_tipo').attr('disabled', true);
    $('#n_boleta').attr('disabled', true);
    $('#check_boletas_pagas').attr('disabled', true);
    $('#check_boletas_impagas').attr('disabled', true);
    $('#mascara_lupa_c_tributo').show().css('display', 'table-cell');
    $('#lupa_c_tributo').hide();
    $('#mascara_lupa_c_tipo').show().css('display', 'table-cell');
    $('#lupa_c_tipo').hide();
    $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
    $('#lupa_d_denominacion').hide();
    $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
    $('#lupa_obj_hecho').hide();
    $('#btn_consulta').attr('disabled', true);
}

function busco_tasa_externa(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: "consulta_boletas/php/busca_datos.php",
        data: {
            oper:'tasa_ext',
            p_n_boleta: $('#n_boleta').val()
        },
        dataType: 'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data){
                if(data.TASAS_EXT){
                    $("#tasas_ext").val(data.TASAS_EXT);
                    $("#n_cuit").val(data.N_CUIT_RESPONSABLE).mask("99-99999999-9");
                    $("#desc_denom").val(data.D_RESPONSABLE);
                }
                ocultar_grillas();
            }
        }
    });

}

function buscar_detalles(id_boleta_agr, c_tributo, d_objeto_hecho){
    if(c_tributo === '50' || ($('#tasas_ext').val() === 'S')){ //det_sellos
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                "p_c_tributo": c_tributo,
                "p_id_boleta": id_boleta_agr,
                "id_menu": v_n_id_menu,
                "n_orden": 2
            },
            dataType: 'json',
            success: function (data) {
                if (data.resultado === 'OK') {
                    $('#f_emision_sellos').val(data.p_f_emision_agr);
                    $('#f_vto_sellos').val(data.p_f_vto_agr);
                    $('#i_total_sellos').val(data.p_i_total);

                } else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
                $('#main').procOverlay({visible: false});
            }
        });

        filtros_no_nativos = [];
        filtros_arr_main = [];
        if($('#n_cuit').val() !== ''){filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());}
        if($('#desc_denom').val() !== ''){filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());}
        if($('#c_tributo').val() !== ''){filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());}
        if($('#d_objeto_hecho').val() !== ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());}
        if($('#c_tipo').val() !== ''){filtros_arr_main.push('Tipo: '+ $('#c_tipo_documento').val());}
        if($('#n_boleta').val() !== ''){filtros_arr_main.push('Nro. Boleta: '+ $('#n_boleta').val());}

        if(d_objeto_hecho === ''){
            document.getElementById('div_tabla_detalle_dbl_click_boleta_sellos').style.display="none";
            document.getElementById('div_tabla_detalle_dbl_click_boleta_sellos_sin_obj_hecho').style.display="block";
            filtros_no_nativos_ar['detalle_dbl_click_boleta_sellos_sin_obj_hecho_grid'] = filtros_arr_main;

            setea_parametros('#detalle_dbl_click_boleta_sellos_sin_obj_hecho_grid',{
                ':p_obj_hecho':d_objeto_hecho,
                ':p_id_boleta_agr':id_boleta_agr});
        }else{
            document.getElementById('div_tabla_detalle_dbl_click_boleta_sellos').style.display="block";
            document.getElementById('div_tabla_detalle_dbl_click_boleta_sellos_sin_obj_hecho').style.display="none";
            filtros_no_nativos_ar['detalle_dbl_click_boleta_sellos_grid'] = filtros_arr_main;

            setea_parametros('#detalle_dbl_click_boleta_sellos_grid',{
                ':p_d_objeto_hecho':d_objeto_hecho,
                ':p_id_boleta_agr':id_boleta_agr});
        }

        $('#detalles_boleta_sellos_modal').modal('show');
        $(window).resize();
    }else{ //det
        $.ajax({
            type: 'POST',
            url: FUNCIONES_BASEPATH + 'maestro_abm.php',
            data: {
                "p_c_tributo": c_tributo,
                "p_obj_hecho": d_objeto_hecho,
                "p_id_boleta": id_boleta_agr,
                "id_menu": v_n_id_menu,
                "n_orden": 0
            },
            dataType: 'json',
            success: function (data) {
                if (data.resultado === 'OK') {
                    $("#banelco").val(data.p_banelco);
                    $("#link").val(data.p_link);
                    $("#leyenda").val(data.p_leyenda);

                    $('#f_emision').val(data.p_f_emision_agr);
                    $('#f_vto').val(data.p_f_vto_agr);
                    $('#i_total').val(data.p_i_total);

                } else {
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
                $('#main').procOverlay({visible: false});
            }
        });

        filtros_no_nativos = [];
        filtros_arr_main = [];
        if($('#n_cuit').val() !== ''){filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());}
        if($('#desc_denom').val() !== ''){filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());}
        if($('#c_tributo').val() !== ''){filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());}
        if($('#d_objeto_hecho').val() !== ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());}
        if($('#c_tipo').val() !== ''){filtros_arr_main.push('Tipo: '+ $('#c_tipo_documento').val());}
        if($('#n_boleta').val() !== ''){filtros_arr_main.push('Nro. Boleta: '+ $('#n_boleta').val());}

        filtros_no_nativos_ar['detalle_dbl_click_boleta_grid'] = filtros_arr_main;

        setea_parametros('#detalle_dbl_click_boleta_grid',{
            ':p_id_boleta_agr':id_boleta_agr});

        $('#detalles_boleta_modal').modal('show');
        $(window).resize();
    }

}

function busca_sesion(id_boleta_agr){
    $.ajax({
        type:'POST',
        url: "consulta_boletas/php/busca_datos.php",
        data: {
            oper:'busca_sesion',
            p_id_boleta: id_boleta_agr
        },
        dataType: 'json',
        success: function( data ) {

            if (data.resultado === 'OK') {
                if(data.ID_SESION){
                    if(data.C_TIPO_IMPRESION === 'MASIVA' && data.N_ORDEN === '0'){
                        mostrar_cuadro('E', 'Error', 'La boleta no se puede reimprimir, consulte el detalle.');
                        return;
                    }
                    if(data.C_TIPO_IMPRESION === 'MASIVA' || data.C_TIPO_IMPRESION === 'PUNTUAL'){
                        if(data.C_TRIBUTO === '10'){
                            //reimprimir_10:
                            mostrar_cuadro('I', 'Atención', 'El Reporte no está disponible.');
                            //let parametros = 'P_SESION|' + data.ID_SESION + '&P_ID_BOLETA|' + id_boleta_agr;
                            //llamar_report('RECAL012_MON1',
                             //   parametros,
                             //   'PDF');
                            return;
                        }else if(data.C_TRIBUTO === '90'){
                            //reimprimir_90:
                            llamar_report('RECAL012_AUTO',
                                'P_SESION|' + data.ID_SESION + '&P_ID_BOLETA|' + id_boleta_agr + '&P_ORDEN_DESDE|' + data.N_ORDEN + '&P_ORDEN_HASTA|' + data.N_ORDEN,
                                'PDF');
                            return;

                        }else if(data.C_TRIBUTO === '60'){
                            //reimprimir_60:
                            llamar_report('RECAL012_INMO',
                                'P_SESION|' + data.ID_SESION + '&P_ID_BOLETA|' + id_boleta_agr + '&P_ORDEN_DESDE|' + data.N_ORDEN + '&P_ORDEN_HASTA|' + data.N_ORDEN,
                                'PDF');
                            return;
                        }
                    }else{
                        if(data.C_TIPO_IMPONIBLE === '6' && data.C_CONCEPTO_1 !== null){
                            //reimprimir_6:
                            let parametros = 'P_ID_SESION|' + data.ID_SESION + '&P_ID_BOLETAS|' + id_boleta_agr;
                            llamar_report('RECAL075_PDF',
                                parametros,
                                'PDF');
                            return;
                        }else{
                            //reimprimir:
                            //mostrar_cuadro('I', 'Atención', 'El Reporte no está disponible.');
                            let parametros = 'P_ID_SESION|' + data.ID_SESION + '&P_ID_BOLETAS|' + id_boleta_agr;
                            llamar_report('RECAL036', parametros, 'PDF');
                            return;
                        }
                    }
                }else{
                    mostrar_cuadro('E', 'Error', 'Es una Boleta de Migración.');
                    return;
                }
            }else{
                mostrar_cuadro('E', 'Error', 'Error al verificar sesión.');
                return;
            }
            $('#main').procOverlay({visible: false});
        }
    });
}

function reportes(id_boleta_agr, c_tributo){
    valida_pago_efectuado(c_tributo, id_boleta_agr);
}

function reimprimir_sellos(id_boleta_agr){
    $.ajax({
        type:'POST',
        url: "consulta_boletas/php/busca_datos.php",
        data: {
            oper:'reimprimir_sellos',
            p_id_boleta: id_boleta_agr
        },
        dataType: 'json',
        success: function( data ) {

            if (data.resultado === 'OK') {
                if(data.ID_SESION){
                    if(data.C_TIPO_IMPRESION === 'AGRUPADA'){
                        //reimprimir_sellos:
                        //mostrar_cuadro('I', 'Atención', 'El Reporte no está disponible.');
                        let parametros = 'P_ID_SESION|' + data.ID_SESION + '&P_ID_BOLETAS|' + id_boleta_agr;
                        llamar_report('RECAL036', parametros, 'PDF');
                        return;
                    }else{
                        //reimprimir_sellos:
                        let parametros = 'P_USER|' + data.USER + '&P_ID_BOLETA|' + id_boleta_agr + '&P_ORDEN_DESDE|' + data.N_ORDEN + '&P_ORDEN_HASTA|' + data.N_ORDEN;
                        llamar_report('SELL027G', parametros, 'PDF');
                        return;
                    }
                }else{
                    mostrar_cuadro('E', 'Error', 'Es una Boleta de Migración.');
                    return;
                }
            }else{
                mostrar_cuadro('E', 'Error', 'Error al recuperar obligacion y orden de boleta.');
                return;
            }
            $('#main').procOverlay({visible: false});
        }
    });
}

function boleta_canon(id_boleta_agr){
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_id_boleta": id_boleta_agr,
            "id_menu": v_n_id_menu,
            "n_orden": 3
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado === 'OK') {
                post_to_url(data.p_l_url,
                    {},
                    '_blank', 'POST');
            }else{
                mostrar_cuadro('E', 'Error', data.resultado);
            }
            $('#main').procOverlay({visible: false});
            return;
        }
    });
}

function valida_pago_efectuado(c_tributo, id_boleta_agr){
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_tributo": c_tributo,
            "p_id_boleta": id_boleta_agr,
            "id_menu": v_n_id_menu,
            "n_orden": 1
        },
        dataType: 'json',
        success: function (data) {
            if (data.resultado === 'OK'){
                if(c_tributo === '50'){
                    reimprimir_sellos(id_boleta_agr);
                }else if(c_tributo === '160'){
                    boleta_canon(id_boleta_agr);
                }else{
                    busca_sesion(id_boleta_agr);
                }
            }else{
                mostrar_cuadro('E', 'Error', data.resultado);
            }
            $('#main').procOverlay({visible: false});
        }
    });
}

function buscar_boletas(){
    //Boletas Pagas
    if ((document.getElementById('check_boletas_pagas').checked) && !(document.getElementById('check_boletas_impagas').checked)){

        filtros_no_nativos = [];
        filtros_arr_main = [];
        if($('#n_cuit').val() != ''){filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());}
        if($('#desc_denom').val() != ''){filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());}
        if($('#c_tributo').val() != ''){filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());}
        if($('#d_objeto_hecho').val() != ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());}
        if($('#c_tipo').val() != ''){filtros_arr_main.push('Tipo: '+ $('#c_tipo_documento').val());}
        if($('#n_boleta').val() != ''){filtros_arr_main.push('Nro. Boleta: '+ $('#n_boleta').val());}

        filtros_no_nativos_ar['main_grid_boletas_pagas'] = filtros_arr_main;

        setea_parametros('#main_grid_boletas_pagas',{
            ':p_c_tributo':$('#c_tributo').val(),
            ':p_obj_hecho':$('#d_objeto_hecho').val(),
            ':p_id_boleta':$('#n_boleta').val(),
            ':p_id_contribuyente':$('#id_contribuyente').val(),
            ':p_m_tipo':$('#c_tipo').val()
        });

        document.getElementById('div_grid_boletas').style.display="none";
        document.getElementById('div_grid_boletas_pagas').style.display="block";
        document.getElementById('div_grid_boletas_impagas').style.display="none";
        document.getElementById('div_grid_boletas_sellos').style.display="none";
        document.getElementById('div_grid_boletas_tasa_externa').style.display="none";
        document.getElementById('div_detalle_boletas').style.display="block";
        document.getElementById('div_detalle_boletas_sellos').style.display="none";

        return;
    }

    //Boletas Impagas
    if (!(document.getElementById('check_boletas_pagas').checked) && (document.getElementById('check_boletas_impagas').checked)){

        filtros_no_nativos = [];
        filtros_arr_main = [];
        if($('#n_cuit').val() !== ''){filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());}
        if($('#desc_denom').val() !== ''){filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());}
        if($('#c_tributo').val() !== ''){filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());}
        if($('#d_objeto_hecho').val() !== ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());}
        if($('#c_tipo').val() !== ''){filtros_arr_main.push('Tipo: '+ $('#c_tipo_documento').val());}
        if($('#n_boleta').val() !== ''){filtros_arr_main.push('Nro. Boleta: '+ $('#n_boleta').val());}

        filtros_no_nativos_ar['main_grid_boletas_impagas'] = filtros_arr_main;

        setea_parametros('#main_grid_boletas_impagas',{
            ':p_c_tributo':$('#c_tributo').val(),
            ':p_obj_hecho':$('#d_objeto_hecho').val(),
            ':p_id_boleta':$('#n_boleta').val(),
            ':p_id_contribuyente':$('#id_contribuyente').val(),
            ':p_m_tipo':$('#c_tipo').val()
        });

        document.getElementById('div_grid_boletas').style.display="none";
        document.getElementById('div_grid_boletas_pagas').style.display="none";
        document.getElementById('div_grid_boletas_impagas').style.display="block";
        document.getElementById('div_grid_boletas_sellos').style.display="none";
        document.getElementById('div_grid_boletas_tasa_externa').style.display="none";
        document.getElementById('div_detalle_boletas').style.display="block";
        document.getElementById('div_detalle_boletas_sellos').style.display="none";

        return;
    }

    filtros_no_nativos = [];
    filtros_arr_main = [];
    if($('#n_cuit').val() !== ''){filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());}
    if($('#desc_denom').val() !== ''){filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());}
    if($('#c_tributo').val() !== ''){filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());}
    if($('#d_objeto_hecho').val() !== ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());}
    if($('#c_tipo').val() !== ''){filtros_arr_main.push('Tipo: '+ $('#c_tipo_documento').val());}
    if($('#n_boleta').val() !== ''){filtros_arr_main.push('Nro. Boleta: '+ $('#n_boleta').val());}

    filtros_no_nativos_ar['main_grid_boletas'] = filtros_arr_main;

    //Todas las Boletas
    setea_parametros('#main_grid_boletas',{
        ':p_c_tributo':$('#c_tributo').val(),
        ':p_obj_hecho':$('#d_objeto_hecho').val(),
        ':p_id_boleta':$('#n_boleta').val(),
        ':p_id_contribuyente':$('#id_contribuyente').val(),
        ':p_m_tipo':$('#c_tipo').val()
    });

    document.getElementById('div_grid_boletas').style.display="block";
    document.getElementById('div_grid_boletas_pagas').style.display="none";
    document.getElementById('div_grid_boletas_impagas').style.display="none";
    document.getElementById('div_grid_boletas_sellos').style.display="none";
    document.getElementById('div_grid_boletas_tasa_externa').style.display="none";
    document.getElementById('div_detalle_boletas').style.display="block";
    document.getElementById('div_detalle_boletas_sellos').style.display="none";

    return;
}

function buscar_boletas_tasa_externa(){

    filtros_no_nativos = [];
    filtros_arr_main = [];
    if($('#n_cuit').val() !== ''){filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());}
    if($('#desc_denom').val() !== ''){filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());}
    if($('#c_tributo').val() !== ''){filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());}
    if($('#d_objeto_hecho').val() !== ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());}
    if($('#c_tipo').val() !== ''){filtros_arr_main.push('Tipo: '+ $('#c_tipo_documento').val());}
    if($('#n_boleta').val() !== ''){filtros_arr_main.push('Nro. Boleta: '+ $('#n_boleta').val());}

    filtros_no_nativos_ar['main_grid_boletas_tasa_externa'] = filtros_arr_main;

    //Traigo todas
    setea_parametros('#main_grid_boletas_tasa_externa',{
        ':p_id_boleta':$('#n_boleta').val()
    });

    document.getElementById('div_grid_boletas').style.display="none";
    document.getElementById('div_grid_boletas_pagas').style.display="none";
    document.getElementById('div_grid_boletas_impagas').style.display="none";
    document.getElementById('div_grid_boletas_sellos').style.display="none";
    document.getElementById('div_grid_boletas_tasa_externa').style.display="block";
    document.getElementById('div_detalle_boletas').style.display="none";
    document.getElementById('div_detalle_boletas_sellos').style.display="block";

    return;
}

function buscar_boletas_sellos(){

    filtros_no_nativos = [];
    filtros_arr_main = [];
    if($('#n_cuit').val() !== ''){filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());}
    if($('#desc_denom').val() !== ''){filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());}
    if($('#c_tributo').val() !== ''){filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());}
    if($('#d_objeto_hecho').val() !== ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());}
    if($('#c_tipo').val() !== ''){filtros_arr_main.push('Tipo: '+ $('#c_tipo_documento').val());}
    if($('#n_boleta').val() !== ''){filtros_arr_main.push('Nro. Boleta: '+ $('#n_boleta').val());}

    filtros_no_nativos_ar['main_grid_boletas_sellos'] = filtros_arr_main;

    setea_parametros('#main_grid_boletas_sellos',{
        ':p_c_tributo':$('#c_tributo').val(),
        ':p_obj_hecho':$('#d_objeto_hecho').val(),
        ':p_id_boleta':$('#n_boleta').val(),
        ':p_id_contribuyente':$('#id_contribuyente').val(),
        ':p_m_tipo':$('#c_tipo').val()
    });

    document.getElementById('div_grid_boletas').style.display="none";
    document.getElementById('div_grid_boletas_pagas').style.display="none";
    document.getElementById('div_grid_boletas_impagas').style.display="none";
    document.getElementById('div_grid_boletas_sellos').style.display="block";
    document.getElementById('div_grid_boletas_tasa_externa').style.display="none";
    document.getElementById('div_detalle_boletas').style.display="none";
    document.getElementById('div_detalle_boletas_sellos').style.display="block";

}

function es_migrado() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "consulta_boletas/php/busca_datos.php",
        type:"POST",
        dataType: "JSON",
        data:{ oper:'es_migrado', p_d_objeto_hecho: $('#d_objeto_hecho').val()}
    }).done(function(data) {
        if(data.ES_MIGRADO === 'TRUE'){
            buscar_boletas();
        }if(data.ES_MIGRADO === 'FALSE'){
            buscar_boletas_sellos();
        }
    });
}

function limpiar_grillas() {
    $('#main_grid_boletas').jqGrid('clearGridData');
    $('#main_grid_boletas_pagas').jqGrid('clearGridData');
    $('#main_grid_boletas_impagas').jqGrid('clearGridData');
    $('#main_grid_boletas_sellos').jqGrid('clearGridData');
    $('#main_grid_boletas_tasa_externa').jqGrid('clearGridData');
    $('#mails_grid').jqGrid('clearGridData');
    $('#detalles_grid_boletas').jqGrid('clearGridData');
    $('#detalles_grid_boletas_sellos').jqGrid('clearGridData');
}

function ocultar_grillas(){
    document.getElementById('div_grid_boletas').style.display="none";
    document.getElementById('div_grid_boletas_pagas').style.display="none";
    document.getElementById('div_grid_boletas_impagas').style.display="none";
    document.getElementById('div_grid_boletas_sellos').style.display="none";
    document.getElementById('div_grid_boletas_tasa_externa').style.display="none";
    document.getElementById('div_detalle_boletas').style.display="none";
    document.getElementById('div_detalle_boletas_sellos').style.display="none";
}
