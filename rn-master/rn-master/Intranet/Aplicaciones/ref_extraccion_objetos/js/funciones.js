function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "ajax_genericos/autocomplete.php",
        type:"POST",
        dataType: "JSON",
        data:{oper: 3,term: cuit_sin_guiones},
        success: function(res) {
            $('#main').procOverlay({visible:false});
            if(res != null){
                var info = res.data_raz[0];
                $("#d_denominacion").val(info.razon_social);
                $("#id_contribuyente").val(info.id_contribuyente);
                $('#lupa_d_denominacion').show().css('display', 'table-cell');
                $('#mascara_lupa_d_denominacion').hide();
                $('#d_denominacion_mayuscula').val($('#d_denominacion').val().toUpperCase());
                $('#btn_buscar').attr('disabled', false);
            }else{
                mostrar_cuadro('E', 'Error', 'No se ha encontrado un contribuyente para el cuit ingresado.');
                $("#d_denominacion").val(null);
                $("#id_contribuyente").val(null);
                $("#n_cuit").val(null);
            }
        }
    });
}

function tomar_datos(){
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_n_plan_pago": $('#d_plan_pago').val(),
            "p_c_tipo_plan_pago": $('#c_tipo_plan_pago').val(),
            "p_id_contribuyente": $('#id_contribuyente').val(),
            "p_n_tabla_deleg": $('#n_tabla_deleg').val(),
            "p_c_delegacion": $('#c_delegacion').val(),
            "id_menu": v_id_menu,
            "n_orden": 1
        },
        dataType: 'json',
        success: function (data) {
            $('#main').procOverlay({visible: false});
            if (data.resultado == 'OK') {
                $('#main_grid').trigger('reloadGrid');
                $('#d_denominacion').val(data.p_desc_denom);
                $('#n_cuit').val(data.p_n_cuit);
                $('#d_tipo_doc').val(data.p_n_documento);
                $('#c_tipo_doc').val(data.p_c_tipo_documento);
                $('#d_provincia').val(data.p_d_delegacion);
                $('#c_tributo_plan').val(data.p_tributo_plan);
                $('#situacion').val(data.p_situacion);
                $('#c_provincia').val($('#c_delegacion').val());
                $('#provincia_reformular').val($('#c_delegacion').val());
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                $('#main_grid').trigger('reloadGrid');
                return;
            }
        }
    });
}

function actualizar_registro(d_objeto_hecho, id_fila){
    var v_marca;
    if($('#' + id_fila).is(':checked')){
        v_marca = 'S';
    } else {
        v_marca = 'N';
    }
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_d_objeto_hecho": d_objeto_hecho,
            "p_marca": v_marca,
            "id_menu": v_id_menu,
            "n_orden": 5
        },
        dataType: 'json',
        success: function (data) {
            $('#main').procOverlay({visible: false});
            if (data.resultado == 'OK') {
                $('#main_grid').trigger('reloadGrid');
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function aceptar_reformulacion(){
    $.ajax({
        type: 'POST',
        url: FUNCIONES_BASEPATH + 'maestro_abm.php',
        data: {
            "p_c_tipo_imponible": $('#d_tipo_imponible').val(),
            "p_c_concepto": $('#c_concepto').val(),
            "p_fecha_reformulacion": $('#fecha_reformulacion').val(),
            "p_provincia_reformulacion": $('#provincia_reformular').val(),
            "p_c_tipo_plan_pago": $('#c_tipo_plan_pago').val(),
            "p_n_plan_pago": $('#d_plan_pago').val(),
            "p_id_contribuyente": $('#id_contribuyente').val(),
            "p_f_emision": $('#f_emision').val(),
            "p_c_provincia": $('#c_provincia').val(),
            "p_n_tabla_deleg": $('#n_tabla_deleg').val(),
            "p_c_tipo_calculo": $('#c_tipo_calculo').val(),
            "p_n_plan_desde": $('#desde').val(),
            "p_n_plan_hasta": $('#hasta').val(),
            "p_tributo_plan": $('#c_tributo_plan').val(),
            "p_c_origen_deuda": $('#c_origen_deuda').val(),
            "p_c_seg_riesgo": $('#c_seg_riesgo').val(),
            "p_confirmacion": 'N',
            "p_id_sesion_refor": null,
            "id_menu": v_id_menu,
            "n_orden": 7
        },
        dataType: 'json',
        success: function (data) {
            $('#main').procOverlay({visible: false});
            if (data.resultado == 'OK') {
                //mostrar_cuadro('S', 'Finalizado', 'Se ha reformulado el plan de pago exitosamente.');
                $('#f_caducidad').val($('#fecha_reformulacion').val());
                $('#c_caducidad').val('9');
                $('#n_tabla_tipo_cad').val(data.p_n_tabla_tipo_cad);
                $('#desde').val(data.p_n_plan_desde_retorno);
                $('#hasta').val(data.p_n_plan_hasta_retorno);
                $('#modal_reformular').modal('show');
                $(window).resize();

                filtros_no_nativos_ar = [];
                filtros_arr_main = [];

                if($('#d_plan_pago').val() != ''){
                    filtros_arr_main.push('Nro. Plan de Pago: '+ $('#d_plan_pago').val());
                }
                if($('#c_tipo_plan_pago').val() != ''){
                    filtros_arr_main.push('Tipo Plan Pago: '+ $('#c_tipo_plan_pago').val() +' - '+$('#d_tipo_plan_pago').val());
                }
                if($('#n_cuit').val() != ''){
                    filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());
                }
                if($('#d_denominacion').val() != ''){
                    filtros_arr_main.push('Denominación: '+ $('#d_denominacion').val());
                }
                if($('#c_tipo_doc').val() != ''){
                    filtros_arr_main.push('Tipo Doc.: '+ $('#c_tipo_doc').val() +' - '+$('#d_tipo_doc').val());
                }
                if($('#d_tipo_imponible').val() != ''){
                    filtros_arr_main.push('Tipo Imponible: '+ $('#d_tipo_imponible').val());
                }
                if($('#d_objeto_hecho').val() != ''){
                    filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());
                }
                if($('#c_provincia').val() != ''){
                    filtros_arr_main.push('Prov./Oficina: '+ $('#c_provincia').val() +' - '+$('#d_provincia').val());
                }
                if($('#observacion').val() != ''){
                    filtros_arr_main.push('Observación: '+ $('#observacion').val());
                }

                filtros_no_nativos_ar['detalle_grid'] = filtros_arr_main;
                filtros_no_nativos_ar['cuotas_grid'] = filtros_arr_main;

                setea_parametros('#detalle_grid', {
                    ':p_id_sesion': data.p_id_sesion
                });
                setea_parametros('#cuotas_grid', {
                    ':p_id_sesion': data.p_id_sesion
                });
                p_id_sesion_refor = data.p_id_sesion;
            } else {
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

function autocompleta_datos_por_nro_plan() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: "ref_extraccion_objetos/php/autocomplete.php",
        data: {oper:'plan', term: $('#d_plan_pago').val()},
        dataType: 'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data){
                $("#c_concepto").val(data.C_CONCEPTO);
                $("#c_delegacion").val(data.C_DELEGACION);
                $("#c_origen_deuda").val(data.C_ORIGEN_DEUDA);
                $("#c_seg_riesgo").val(data.C_SEG_RIESGO);
                $("#c_tipo_calculo").val(data.C_TIPO_CALCULO);
                $("#d_tipo_imponible").val(data.C_TIPO_IMPONIBLE);
                $("#c_tipo_plan_pago").val(data.C_TIPO_PLAN_PAGO);
                $("#c_tributo").val(data.C_TRIBUTO);
                $("#d_denominacion").val(data.D_DENOMINACION);
                $("#d_tipo_plan_pago").val(data.D_DESCRIP);
                $("#d_objeto_hecho").val(data.D_OBJETO_HECHO);
                $("#observacion").val(data.D_OBSERVACIONES);
                $("#f_emision").val(data.F_EMISION);
                $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                $("#n_cuit").val(data.N_CUIT);
                $("#n_tabla_deleg").val(data.N_TABLA_DELEG);
            }else{
                mostrar_cuadro('E', 'Error', 'El Nro. Plan de Pago ingresado es inválido o no se encuentran registros asociados al mismo.');
                $('#d_plan_pago').val(null);
            }
        },
        error: function (data, status, e) {
            mostrar_cuadro('E','Error','Error al buscar el Nro. Plan de Pago: '+ status +'<br/><b>Error:</b> '+e+'</p>','','');
        }
    });
}