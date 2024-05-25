function inicializarGrillas(){
    $("#main_grid").jqGrid({
        colNames: main_grid.colNames(),
        colModel: main_grid.colModel(),
        pager: $('#main_grid_pager'),
        caption: "Registros informados por el RNPA",
        postData: main_grid.postData(),
        autowidth: false,
        width: 1480,
        height: 250,
        sortname: 'tipo_registro, dominio_nuevo',
        sortorder: 'asc',
        shrinkToFit: true,
        loadComplete: function(){
            if($('#main_grid').getGridParam('records') > 0){
                $('#main_grid').jqGrid('setSelection', 1);
            }
        },
        onSelectRow: function(id){
            $('#d_error').val($('#main_grid').getCell(id, 'd_error'));
            if($('#main_grid').getCell(id, 'tipo_registro') == 'C4'){
                $('#jqgh_main_grid_n_cuit').text('Estado Pago');
                $('#jqgh_main_grid_d_denominacion').text('Datos Pago');
            } else{
                $('#jqgh_main_grid_n_cuit').text('CUIT');
                $('#jqgh_main_grid_d_denominacion').text('Denominación');
            }


        },
        ondblClickRow: function (rowid) {
            if($('#main_grid').getCell(rowid, 'tipo_registro') == 'C2'){
                setea_parametros('#c2_grid', {':p_n_secuencia': $('#main_grid').getCell(rowid, 'n_secuencia')});
                $('#c2_modal').show();
                $(window).resize();
            }
            else if($('#main_grid').getCell(rowid, 'tipo_registro') == 'C4'){
                setea_parametros('#c4_grid', {':p_n_secuencia': $('#main_grid').getCell(rowid, 'n_secuencia')});
                $('#c4_modal').show();
                $(window).resize();
            }
            else if($('#main_grid').getCell(rowid, 'tipo_registro') == 'C6'){
                setea_parametros('#c6_grid', {':p_n_secuencia': $('#main_grid').getCell(rowid, 'n_secuencia')});
                $('#c6_modal').show();
                $(window).resize();
            }

            else if($('#main_grid').getCell(rowid, 'tipo_registro') == 'C7'){
                setea_parametros('#c7_grid', {':p_n_secuencia': $('#main_grid').getCell(rowid, 'n_secuencia')});
                $('#c7_modal').show();
                $(window).resize();
            }

            else if($('#main_grid').getCell(rowid, 'tipo_registro') == 'C8'){
                setea_parametros('#c8_grid', {':p_n_secuencia': $('#main_grid').getCell(rowid, 'n_secuencia')});
                $('#c8_modal').show();
                $(window).resize();
            }

            else if($('#main_grid').getCell(rowid, 'tipo_registro') == 'C1'){
                if($('#main_grid').getCell(rowid, 'c_estado') != 'PROCESADO' && $('#main_grid').getCell(rowid, 'c_estado') != 'NO PROCESAR' && p_modo == 'M'){
                    //validacion_c1
                    $.ajax({
                        type:'POST',
                        url: FUNCIONES_BASEPATH+'maestro_abm.php',
                        data:{      
                        "p_nro_secuencia": $('#main_grid').getCell(rowid, 'n_secuencia'),
                        "id_menu":v_id_menu,
                        "n_orden":2
                        },
                        dataType:'json',
                        success: function( data ) {
                            if(data.resultado == 'OK'){
                                setea_parametros('#c1_grid', {':p_n_secuencia': $('#main_grid').getCell(rowid, 'n_secuencia')});
                                $('#c1_modal').show();
                                $(window).resize();
                            }
                            else{
                                mostrar_cuadro('E', 'Error', data.resultado);
                                return;
                            }
                        }
                    }); 
                } else{
                    setea_parametros('#c1_grid', {':p_n_secuencia': $('#main_grid').getCell(rowid, 'n_secuencia')});
                    $('#c1_modal').show();
                    $(window).resize();
                }
            }
        }
    }).navGrid('#main_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#c2_grid").jqGrid({
        colNames: c2_grid.colNames(),
        colModel: c2_grid.colModel(),
        pager: $('#c2_grid_pager'),
        postData: c2_grid.postData(),
        autowidth: false,
        width: 1480,
        loadComplete: function(){
            if($('#c2_grid').getGridParam('records') > 0){
                $('#c2_grid').jqGrid('setSelection', 1);
                if($('#c_estado_c2').val() != 'PROCESADO' && $('#c_estado_c2').val() != 'NO PROCESAR' && p_modo == 'M'){
                    $('#btn_no_procesar_c2').prop('disabled', false);
                    $('#btn_procesar_sin_validar_c2').prop('disabled', false);
                    $('#btn_procesar_c2').prop('disabled', false);
                    $('#btn_guardar_c2').prop('disabled', false);
                } else{
                    modo_consulta_c2();
                }
            }
        },
        onSelectRow: function(id){
            $('#dominio_nuevo_c2').val($('#c2_grid').getCell(id, 'dominio_nuevo'));
            $('#dominio_viejo_c2').val($('#c2_grid').getCell(id, 'dominio_viejo'));
            $('#marca_c2').val($('#c2_grid').getCell(id, 'c_marca'));
            $('#modelo_c2').val($('#c2_grid').getCell(id, 'c_modelo'));
            $('#n_anio_modelo_c2').val($('#c2_grid').getCell(id, 'n_anio_modelo'));
            $('#d_tipo_c2').val($('#c2_grid').getCell(id, 'c_tipo'));
            $('#cilindrada_c2').val($('#c2_grid').getCell(id, 'n_cilindrada'));
            $('#n_peso_c2').val($('#c2_grid').getCell(id, 'n_peso'));
            $('#valuacion_c2').val($('#c2_grid').getCell(id, 'n_valuacion'));
            $('#carga_c2').val($('#c2_grid').getCell(id, 'n_carga'));
            $('#c_tipo_uso_c2').val($('#c2_grid').getCell(id, 'c_tipo_uso'));
            $('#d_tipo_uso_c2').val($('#c2_grid').getCell(id, 'd_tipo_uso'));
            $('#f_radicacion_c2').val($('#c2_grid').getCell(id, 'f_radicacion'));

            $('#categoria_c2').val($('#c2_grid').getCell(id, 'c_categoria'));
            $('#origen_c2').val($('#c2_grid').getCell(id, 'c_origen'));
            $('#fmcamod_c2').val($('#c2_grid').getCell(id, 'fmcamod'));

            $('#c_reg_secc_c2').val($('#c2_grid').getCell(id, 'c_reg_secc'));
            $('#d_reg_secc_c2').val($('#c2_grid').getCell(id, 'd_reg_secc'));
            $('#f_operacion_c2').val($('#c2_grid').getCell(id, 'f_operacion'));
            $('#cant_titulares_c2').val($('#c2_grid').getCell(id, 'cant_titulares'));

            $('#d_parametros_adic_c2').val($('#c2_grid').getCell(id, 'd_parametros_adic'));
            $('#d_reservado_c2').val($('#c2_grid').getCell(id, 'd_reservado'));
            $('#d_observaciones_c2').val($('#c2_grid').getCell(id, 'd_observaciones'));

            $('#n_tramite_c2').val($('#c2_grid').getCell(id, 'nro_tramite'));
            $('#tipo_form_c2').val($('#c2_grid').getCell(id, 'tipo_formulario'));
            $('#n_form_c2').val($('#c2_grid').getCell(id, 'nro_formulario'));
            $('#c_tipo_tramite_c2').val($('#c2_grid').getCell(id, 'c_tipo_tramite'));
            $('#d_tipo_tramite_c2').val($('#c2_grid').getCell(id, 'd_tipo_tramite'));
            $('#c_accion_c2').val($('#c2_grid').getCell(id, 'c_tipo_accion'));
            $('#d_accion_c2').val($('#c2_grid').getCell(id, 'd_tipo_accion'));

            $('#n_envio_c2').val($('#c2_grid').getCell(id, 'nro_envio'));
            $('#n_secuencia_c2').val($('#c2_grid').getCell(id, 'nro_secuencia'));
            $('#tipo_registro_c2').val($('#c2_grid').getCell(id, 'tipo_registro'));
            $('#tipo_sub_registro_c2').val($('#c2_grid').getCell(id, 'tipo_sub_registro'));
            $('#cod_organismo_c2').val($('#c2_grid').getCell(id, 'cod_organismo'));
            $('#c_estado_c2').val($('#c2_grid').getCell(id, 'c_estado'));

            $('#d_error_c2').val($('#c2_grid').getCell(id, 'd_error'));

            $('.c2').each(function () {
                var id = $(this).attr('id');
                inputs_iniciales[id] = $(this).val();
            });
        },
    }).navGrid('#c2_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#c4_grid").jqGrid({
        colNames: c4_grid.colNames(),
        colModel: c4_grid.colModel(),
        pager: $('#c4_grid_pager'),
        postData: c4_grid.postData(),
        autowidth: false,
        width: 1480,
        loadComplete: function(){
            if($('#c4_grid').getGridParam('records') > 0){
                $('#c4_grid').jqGrid('setSelection', 1);
                formatear_importes_c4();
            }
        },
        onSelectRow: function(id){
            $('#dominio_nuevo_c4').val($('#c4_grid').getCell(id, 'dominio_nuevo'));
            $('#n_pos_fiscal_c4').val($('#c4_grid').getCell(id, 'n_posicion_fiscal'));
            $('#n_cuota_anticipo_c4').val($('#c4_grid').getCell(id, 'n_cuota_anticipo'));

            $('#c_reg_secc_c4').val($('#c4_grid').getCell(id, 'c_registro_seccional'));
            $('#d_reg_secc_c4').val($('#c4_grid').getCell(id, 'd_registro_seccional'));
            $('#trans_n_envio_c4').val($('#c4_grid').getCell(id, 'trans_nro_envio'));
            $('#trans_f_pago_c4').val($('#c4_grid').getCell(id, 'trans_f_pago'));
            $('#trans_f_acred_c4').val($('#c4_grid').getCell(id, 'trans_f_acred'));
            $('#f_proceso_c4').val($('#c4_grid').getCell(id, 'f_proceso'));
            $('#n_tramite_c4').val($('#c4_grid').getCell(id, 'n_tramite'));
            $('#n_remito_c4').val($('#c4_grid').getCell(id, 'n_remito'));
            $('#i_impuesto_c4').val($('#c4_grid').getCell(id, 'i_impuesto'));
            $('#f_deposito_c4').val($('#c4_grid').getCell(id, 'f_deposito'));
            $('#i_comun_c4').val($('#c4_grid').getCell(id, 'i_comun'));
            $('#f_cobro_c4').val($('#c4_grid').getCell(id, 'f_cobro'));
            $('#i_bonificado_c4').val($('#c4_grid').getCell(id, 'i_bonificado'));
            $('#f_vencimiento_c4').val($('#c4_grid').getCell(id, 'f_vencimiento'));
            $('#i_intereses_c4').val($('#c4_grid').getCell(id, 'i_intereses'));
            $('#i_total_c4').val($('#c4_grid').getCell(id, 'i_total'));
            $('#n_cheque_c4').val($('#c4_grid').getCell(id, 'n_cheque'));
            $('#c_forma_pago_c4').val($('#c4_grid').getCell(id, 'c_forma_pago'));
            $('#c_moneda_c4').val($('#c4_grid').getCell(id, 'c_moneda'));
            $('#c_banco_c4').val($('#c4_grid').getCell(id, 'c_entidad_bancaria'));
            $('#d_banco_c4').val($('#c4_grid').getCell(id, 'd_entidad_bancaria'));
            $('#n_envio_c4').val($('#c4_grid').getCell(id, 'nro_envio'));
            $('#n_secuencia_c4').val($('#c4_grid').getCell(id, 'nro_secuencia'));
            $('#c_tipo_mov_c4').val($('#c4_grid').getCell(id, 'tipo_registro'));
            $('#c_tipo_registro_c4').val($('#c4_grid').getCell(id, 'c_tipo_registro'));
            $('#cod_organismo_c4').val($('#c4_grid').getCell(id, 'c_organismo'));
            $('#error_ac_prov_c4').val($('#c4_grid').getCell(id, 'error_ac_prov'));
            $('#error_ac_def_c4').val($('#c4_grid').getCell(id, 'error_ac_def'));
            $('#c_estado_prov_c4').val($('#c4_grid').getCell(id, 'c_estado_prov'));
            $('#c_estado_def_c4').val($('#c4_grid').getCell(id, 'c_estado_def'));
            $('#reservado_c4').val($('#c4_grid').getCell(id, 'reservado'));
            $('#observaciones_c4').val($('#c4_grid').getCell(id, 'observaciones'));
            
        },
    }).navGrid('#c4_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#c6_grid").jqGrid({
        colNames: c6_grid.colNames(),
        colModel: c6_grid.colModel(),
        pager: $('#c6_grid_pager'),
        postData: c6_grid.postData(),
        autowidth: false,
        width: 1480,
        loadComplete: function(){
            if($('#c6_grid').getGridParam('records') > 0){
                $('#c6_grid').jqGrid('setSelection', 1);
                if($('#c_estado_c6').val() != 'PROCESADO' && $('#c_estado_c6').val() != 'NO PROCESAR' && p_modo == 'M'){
                    $('#btn_no_procesar_c6').prop('disabled', false);
                    $('#btn_procesar_sin_validar_c6').prop('disabled', false);
                    $('#btn_procesar_c6').prop('disabled', false);
                    $('#btn_guardar_c6').prop('disabled', false);
                    $('#btn_cambiar_dom_proc_c6').prop('disabled', false);
                    $('#btn_copy_c6').prop('disabled', false);
                } else{
                    modo_consulta_c6();
                }
            }
        },
        onSelectRow: function(id){
            $('#dominio_nuevo_c6').val($('#c6_grid').getCell(id, 'dominio_nuevo'));
            $('#dominio_viejo_c6').val($('#c6_grid').getCell(id, 'dominio_viejo'));
            $('#marca_c6').val($('#c6_grid').getCell(id, 'c_marca'));
            $('#modelo_c6').val($('#c6_grid').getCell(id, 'c_modelo'));
            $('#n_anio_modelo_c6').val($('#c6_grid').getCell(id, 'n_anio_modelo'));
            $('#d_tipo_c6').val($('#c6_grid').getCell(id, 'c_tipo'));
            $('#cilindrada_c6').val($('#c6_grid').getCell(id, 'n_cilindrada'));
            $('#n_peso_c6').val($('#c6_grid').getCell(id, 'n_peso'));
            $('#valuacion_c6').val($('#c6_grid').getCell(id, 'n_valuacion'));
            $('#carga_c6').val($('#c6_grid').getCell(id, 'n_carga'));
            $('#c_tipo_uso_c6').val($('#c6_grid').getCell(id, 'c_tipo_uso'));
            $('#d_tipo_uso_c6').val($('#c6_grid').getCell(id, 'd_tipo_uso'));
            $('#f_radicacion_c6').val($('#c6_grid').getCell(id, 'f_radicacion'));
            $('#categoria_c6').val($('#c6_grid').getCell(id, 'c_categoria'));
            $('#origen_c6').val($('#c6_grid').getCell(id, 'c_origen'));
            $('#fmcamod_c6').val($('#c6_grid').getCell(id, 'fmcamod'));
            $('#c_reg_secc_c6').val($('#c6_grid').getCell(id, 'c_reg_secc'));
            $('#d_reg_secc_c6').val($('#c6_grid').getCell(id, 'd_reg_secc'));
            $('#f_operacion_c6').val($('#c6_grid').getCell(id, 'f_operacion'));
            $('#cant_titulares_c6').val($('#c6_grid').getCell(id, 'cant_titulares'));
            $('#d_parametros_adic_c6').val($('#c6_grid').getCell(id, 'd_parametros_adic'));
            $('#d_reservado_c6').val($('#c6_grid').getCell(id, 'd_reservado'));
            $('#d_observaciones_c6').val($('#c6_grid').getCell(id, 'd_observaciones'));
            $('#n_tramite_c6').val($('#c6_grid').getCell(id, 'nro_tramite'));
            $('#tipo_form_c6').val($('#c6_grid').getCell(id, 'tipo_formulario'));
            $('#n_form_c6').val($('#c6_grid').getCell(id, 'nro_formulario'));
            $('#c_tipo_tramite_c6').val($('#c6_grid').getCell(id, 'c_tipo_tramite'));
            $('#d_tipo_tramite_c6').val($('#c6_grid').getCell(id, 'd_tipo_tramite'));
            $('#c_accion_c6').val($('#c6_grid').getCell(id, 'c_tipo_accion'));
            $('#d_accion_c6').val($('#c6_grid').getCell(id, 'd_tipo_accion'));
            $('#n_envio_c6').val($('#c6_grid').getCell(id, 'nro_envio'));
            $('#n_secuencia_c6').val($('#c6_grid').getCell(id, 'nro_secuencia'));
            $('#tipo_registro_c6').val($('#c6_grid').getCell(id, 'tipo_registro'));
            $('#tipo_sub_registro_c6').val($('#c6_grid').getCell(id, 'tipo_sub_registro'));
            $('#cod_organismo_c6').val($('#c6_grid').getCell(id, 'cod_organismo'));
            $('#c_estado_c6').val($('#c6_grid').getCell(id, 'c_estado'));
            $('#d_error_c6').val($('#c6_grid').getCell(id, 'd_error'));
            
            $('#n_cuit_c6').val($('#c6_grid').getCell(id, 'n_cuit'));
            $('#d_denominacion_c6').val($('#c6_grid').getCell(id, 'd_denominacion'));
            $('#d_denominacion_siat_c6').val($('#c6_grid').getCell(id, 'd_denominacion_siat'));
            $('#d_denominacion_afip_c6').val($('#c6_grid').getCell(id, 'd_denominacion_afip'));
            $('#c_tipo_doc_c6').val($('#c6_grid').getCell(id, 'c_tipo_documento'));
            $('#n_documento_c6').val($('#c6_grid').getCell(id, 'n_documento'));
            $('#calle_c6').val($('#c6_grid').getCell(id, 'd_calle'));
            $('#cod_postal_c6').val($('#c6_grid').getCell(id, 'c_postal'));
            $('#numero_c6').val($('#c6_grid').getCell(id, 'n_numero'));
            $('#piso_c6').val($('#c6_grid').getCell(id, 'd_piso'));
            $('#barrio_c6').val($('#c6_grid').getCell(id, 'd_barrio'));
            $('#localidad_c6').val($('#c6_grid').getCell(id, 'd_localidad'));
            $('#localidad_siat_c6').val($('#c6_grid').getCell(id, 'c_localidad_siat'));
            $('#provincia_c6').val($('#c6_grid').getCell(id, 'c_provincia'));

            $("#n_cuit_c6").mask("99-99999999-9");

            $('.c6').each(function () {
                var id = $(this).attr('id');
                inputs_iniciales[id] = $(this).val();
            });
        },
    }).navGrid('#c6_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#c7_grid").jqGrid({
        colNames: c7_grid.colNames(),
        colModel: c7_grid.colModel(),
        pager: $('#c7_grid_pager'),
        postData: c7_grid.postData(),
        autowidth: false,
        width: 1480,
        loadComplete: function(){
            if($('#c7_grid').getGridParam('records') > 0){
                $('#c7_grid').jqGrid('setSelection', 1);
                if($('#c_estado_c7').val() == 'PROCESADO'){
                    modo_consulta_c7();
                } else{
                    $('#btn_no_procesar_c7').prop('disabled', false);
                    $('#btn_procesar_c7').prop('disabled', false);
                    $('#btn_guardar_c7').prop('disabled', false);
                }
            }
        },
        onSelectRow: function(id){
            $('#dominio_nuevo_c7').val($('#c7_grid').getCell(id, 'dominio_nuevo'));
            $('#f_alta_c7').val($('#c7_grid').getCell(id, 'f_alta'));
            $('#f_baja_c7').val($('#c7_grid').getCell(id, 'f_baja'));
            $('#c_reg_secc_c7').val($('#c7_grid').getCell(id, 'c_reg_secc'));
            $('#d_reg_secc_c7').val($('#c7_grid').getCell(id, 'd_reg_secc'));
            $('#c_origen_info_c7').val($('#c7_grid').getCell(id, 'c_origen_info'));
            $('#c_radicacion_c7').val($('#c7_grid').getCell(id, 'c_radicacion'));
            $('#c_estado_rad_c7').val($('#c7_grid').getCell(id, 'c_estado_rad'));
            $('#n_envio_c7').val($('#c7_grid').getCell(id, 'nro_envio'));
            $('#n_secuencia_c7').val($('#c7_grid').getCell(id, 'nro_secuencia'));
            $('#tipo_registro_c7').val($('#c7_grid').getCell(id, 'tipo_registro'));
            $('#tipo_sub_registro_c7').val($('#c7_grid').getCell(id, 'tipo_sub_registro'));
            $('#cod_organismo_c7').val($('#c7_grid').getCell(id, 'cod_organismo'));
            $('#c_estado_c7').val($('#c7_grid').getCell(id, 'c_estado'));
            $('#d_error_c7').val($('#c7_grid').getCell(id, 'd_error'));
            
            $('.c7').each(function () {
                var id = $(this).attr('id');
                inputs_iniciales[id] = $(this).val();
            });
        },
    }).navGrid('#c7_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#c8_grid").jqGrid({
        colNames: c8_grid.colNames(),
        colModel: c8_grid.colModel(),
        pager: $('#c8_grid_pager'),
        postData: c8_grid.postData(),
        autowidth: false,
        width: 1480,
        loadComplete: function(){
            if($('#c8_grid').getGridParam('records') > 0){
                $('#c8_grid').jqGrid('setSelection', 1);
                if($('#c_estado_c8').val() != 'PROCESADO' && $('#c_estado_c8').val() != 'NO PROCESAR' && p_modo == 'M'){
                    $('#btn_no_procesar_c8').prop('disabled', false);
                    $('#btn_procesar_c8').prop('disabled', false);
                    $('#btn_guardar_c8').prop('disabled', false);
                } else{
                    modo_consulta_c8();
                }
            }
        },
        onSelectRow: function(id){
            $('#dominio_nuevo_c8').val($('#c8_grid').getCell(id, 'dominio_nuevo'));
            $('#dominio_viejo_c8').val($('#c8_grid').getCell(id, 'dominio_viejo'));
            $('#marca_c8').val($('#c8_grid').getCell(id, 'c_marca'));
            $('#modelo_c8').val($('#c8_grid').getCell(id, 'c_modelo'));
            $('#d_tipo_c8').val($('#c8_grid').getCell(id, 'c_tipo'));
            $('#n_anio_modelo_c8').val($('#c8_grid').getCell(id, 'n_anio_modelo'));

            $('#categoria_c8').val($('#c8_grid').getCell(id, 'c_categoria'));
            $('#origen_c8').val($('#c8_grid').getCell(id, 'c_origen'));
            $('#fmcamod_c8').val($('#c8_grid').getCell(id, 'fmcamod'));

            $('#n_tramite_c8').val($('#c8_grid').getCell(id, 'nro_tramite'));
            $('#tipo_form_c8').val($('#c8_grid').getCell(id, 'tipo_formulario'));
            $('#n_form_c8').val($('#c8_grid').getCell(id, 'nro_formulario'));
            $('#c_tipo_tramite_c8').val($('#c8_grid').getCell(id, 'c_tipo_tramite'));
            $('#d_tipo_tramite_c8').val($('#c8_grid').getCell(id, 'd_tipo_tramite'));
            $('#c_accion_c8').val($('#c8_grid').getCell(id, 'c_tipo_accion'));
            $('#d_accion_c8').val($('#c8_grid').getCell(id, 'd_tipo_accion'));
            $('#reservado_c8').val($('#c8_grid').getCell(id, 'd_reservado'));
            $('#observaciones_c8').val($('#c8_grid').getCell(id, 'd_observaciones'));

            $('#c_reg_secc_c8').val($('#c8_grid').getCell(id, 'c_reg_secc'));
            $('#d_reg_secc_c8').val($('#c8_grid').getCell(id, 'd_reg_secc'));
            
            $('#n_envio_c8').val($('#c8_grid').getCell(id, 'nro_envio'));
            $('#n_secuencia_c8').val($('#c8_grid').getCell(id, 'nro_secuencia'));
            $('#tipo_registro_c8').val($('#c8_grid').getCell(id, 'tipo_registro'));
            $('#tipo_sub_registro_c8').val($('#c8_grid').getCell(id, 'tipo_sub_registro'));
            $('#cod_organismo_c8').val($('#c8_grid').getCell(id, 'cod_organismo'));
            $('#c_estado_c8').val($('#c8_grid').getCell(id, 'c_estado'));
            $('#d_error_c8').val($('#c8_grid').getCell(id, 'd_error'));

            $('#i_monto_adi_c8').val($('#c8_grid').getCell(id, 'i_monto_adi'));
            $('#i_monto_pun_c8').val($('#c8_grid').getCell(id, 'i_monto_pun'));
            $('#i_monto_imp_c8').val($('#c8_grid').getCell(id, 'i_monto_imp'));
            $('#i_monto_total_c8').val($('#c8_grid').getCell(id, 'i_monto_total'));
            $('#f_cobro_c8').val($('#c8_grid').getCell(id, 'f_cobro'));
            $('#f_deposito_c8').val($('#c8_grid').getCell(id, 'f_deposito'));
            $('#f_tramite_c8').val($('#c8_grid').getCell(id, 'f_tramite'));
            $('#f_baja_c8').val($('#c8_grid').getCell(id, 'f_baja'));
            $('#c_banco_c8').val($('#c8_grid').getCell(id, 'c_banco'));
            $('#d_banco_c8').val($('#c8_grid').getCell(id, 'd_banco'));
            $('#c_moneda_c8').val($('#c8_grid').getCell(id, 'c_moneda'));
            $('#cant_detalle_c8').val($('#c8_grid').getCell(id, 'cant_detalle'));

            $('.c8').each(function () {
                var id = $(this).attr('id');
                inputs_iniciales[id] = $(this).val();
            });
        },
    }).navGrid('#c8_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#c1_grid").jqGrid({
        colNames: c1_grid.colNames(),
        colModel: c1_grid.colModel(),
        pager: $('#c1_grid_pager'),
        postData: c1_grid.postData(),
        autowidth: false,
        width: 1480,
        loadComplete: function(){
            if($('#c1_grid').getGridParam('records') > 0){
                $('#c1_grid').jqGrid('setSelection', 1);
                if($('#c_estado_c1').val() != 'PROCESADO' && $('#c_estado_c1').val() != 'NO PROCESAR' && p_modo == 'M'){
                    $('#btn_no_procesar_c1').prop('disabled', false);
                    $('#btn_procesar_c1').prop('disabled', false);
                    $('#btn_guardar_c1').prop('disabled', false);
                    $('#btn_tabla_cod_rnpa_c1').prop('disabled', false);
                    $('#btn_confirm_baja_y_proc_c1').prop('disabled', false);
                    $('#btn_cambiar_dom_y_proc_c1').prop('disabled', false);
                    $('#btn_leer_cod_rnpa').prop('disabled', false);
                    $('#btn_copy_c1').prop('disabled', false);
                } else{
                    modo_consulta_c1();
                }
            }
        },
        onSelectRow: function(id){
            $('#dominio_nuevo_c1').val($('#c1_grid').getCell(id, 'dominio_nuevo'));
            $('#dominio_viejo_c1').val($('#c1_grid').getCell(id, 'dominio_viejo'));
            $('#marca_c1').val($('#c1_grid').getCell(id, 'd_marca'));
            $('#modelo_c1').val($('#c1_grid').getCell(id, 'd_modelo'));
            $('#n_anio_modelo_c1').val($('#c1_grid').getCell(id, 'n_anio_modelo'));
            $('#d_tipo_c1').val($('#c1_grid').getCell(id, 'd_tipo'));
            $('#cilindrada_c1').val($('#c1_grid').getCell(id, 'n_cilindrada'));
            $('#n_peso_c1').val($('#c1_grid').getCell(id, 'n_peso'));
            $('#valuacion_c1').val($('#c1_grid').getCell(id, 'n_valuacion'));
            $('#carga_c1').val($('#c1_grid').getCell(id, 'n_carga'));
            $('#c_tipo_uso_c1').val($('#c1_grid').getCell(id, 'c_tipo_uso'));
            $('#d_tipo_uso_c1').val($('#c1_grid').getCell(id, 'd_tipo_uso'));
            $('#f_radicacion_c1').val($('#c1_grid').getCell(id, 'f_radicacion'));
            $('#categoria_c1').val($('#c1_grid').getCell(id, 'c_categoria'));
            $('#origen_c1').val($('#c1_grid').getCell(id, 'c_origen'));
            $('#fmcamod_c1').val($('#c1_grid').getCell(id, 'fmcamod'));
            $('#c_reg_secc_c1').val($('#c1_grid').getCell(id, 'c_reg_secc'));
            $('#d_reg_secc_c1').val($('#c1_grid').getCell(id, 'd_reg_secc'));
            $('#f_inscripcion_c1').val($('#c1_grid').getCell(id, 'f_inscripcion'));
            $('#cant_titulares_c1').val($('#c1_grid').getCell(id, 'cant_titulares'));
            $('#d_parametros_adic_c1').val($('#c1_grid').getCell(id, 'd_parametros_adic'));
            $('#d_reservado_c1').val($('#c1_grid').getCell(id, 'd_reservado'));
            $('#d_observaciones_c1').val($('#c1_grid').getCell(id, 'd_observaciones'));
            $('#n_tramite_c1').val($('#c1_grid').getCell(id, 'nro_tramite'));
            $('#tipo_form_c1').val($('#c1_grid').getCell(id, 'tipo_formulario'));
            $('#n_form_c1').val($('#c1_grid').getCell(id, 'nro_formulario'));
            $('#c_tipo_tramite_c1').val($('#c1_grid').getCell(id, 'c_tipo_tramite'));
            $('#d_tipo_tramite_c1').val($('#c1_grid').getCell(id, 'd_tipo_tramite'));
            $('#c_accion_c1').val($('#c1_grid').getCell(id, 'c_tipo_accion'));
            $('#d_accion_c1').val($('#c1_grid').getCell(id, 'd_tipo_accion'));
            $('#n_envio_c1').val($('#c1_grid').getCell(id, 'nro_envio'));
            $('#n_secuencia_c1').val($('#c1_grid').getCell(id, 'nro_secuencia'));
            $('#tipo_registro_c1').val($('#c1_grid').getCell(id, 'tipo_registro'));
            $('#tipo_sub_registro_c1').val($('#c1_grid').getCell(id, 'tipo_sub_registro'));
            $('#cod_organismo_c1').val($('#c1_grid').getCell(id, 'cod_organismo'));
            $('#c_estado_c1').val($('#c1_grid').getCell(id, 'c_estado'));
            $('#d_error_c1').val($('#c1_grid').getCell(id, 'd_error'));
            
            $('#n_cuit_c1').val($('#c1_grid').getCell(id, 'n_cuit'));
            $('#d_denominacion_c1').val($('#c1_grid').getCell(id, 'd_denominacion'));
            $('#d_denominacion_siat_c1').val($('#c1_grid').getCell(id, 'd_denominacion_siat'));
            $('#d_denominacion_afip_c1').val($('#c1_grid').getCell(id, 'd_denominacion_afip'));
            $('#c_tipo_doc_c1').val($('#c1_grid').getCell(id, 'c_tipo_documento'));
            $('#n_documento_c1').val($('#c1_grid').getCell(id, 'n_documento'));
            $('#calle_c1').val($('#c1_grid').getCell(id, 'd_calle'));
            $('#cod_postal_c1').val($('#c1_grid').getCell(id, 'c_postal'));
            $('#numero_c1').val($('#c1_grid').getCell(id, 'n_numero'));
            $('#piso_c1').val($('#c1_grid').getCell(id, 'd_piso'));
            $('#barrio_c1').val($('#c1_grid').getCell(id, 'd_barrio'));
            $('#localidad_c1').val($('#c1_grid').getCell(id, 'd_localidad'));
            $('#localidad_siat_c1').val($('#c1_grid').getCell(id, 'c_localidad_siat'));
            $('#provincia_c1').val($('#c1_grid').getCell(id, 'c_provincia'));

            $('#c_grupo_siat_c1').val($('#c1_grid').getCell(id, 'c_grupo_siat'));
            $('#c_marca_siat_c1').val($('#c1_grid').getCell(id, 'c_marca_siat'));
            $('#id_modelo_siat_c1').val($('#c1_grid').getCell(id, 'id_modelo_siat'));
            $('#id_descripcion_sait_c1').val($('#c1_grid').getCell(id, 'id_descripcion_siat'));
            $('#c_tipo_siat_c1').val($('#c1_grid').getCell(id, 'c_tipo_siat'));
            $('#c_reg_secc_ori_c1').val($('#c1_grid').getCell(id, 'c_reg_secc_ori'));
            $('#d_reg_secc_ori_c1').val($('#c1_grid').getCell(id, 'd_reg_secc_ori'));
            $('#d_muni_origen_c1').val($('#c1_grid').getCell(id, 'd_mun_origen'));
            $('#f_operacion_c1').val($('#c1_grid').getCell(id, 'f_operacion'));

            $("#n_cuit_c1").mask("99-99999999-9");

            $('.c1').each(function () {
                var id = $(this).attr('id');
                inputs_iniciales[id] = $(this).val();
            });
        },
    }).navGrid('#c1_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#c8_det_grid").jqGrid({
        colNames: c8_det_grid.colNames(),
        colModel: c8_det_grid.colModel(),
        pager: $('#c8_det_grid_pager'),
        postData: c8_det_grid.postData(),
        autowidth: false,
        shrinkToFit: true,
        width: 1480,
        loadComplete: function(){
            if($('#c8_det_grid').getGridParam('records') > 0){
                $('#c8_det_grid').jqGrid('setSelection', 1);
                
            }
        },
        onSelectRow: function(id){
            
        },
    }).navGrid('#c8_det_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#titulares_grid").jqGrid({
        colNames: titulares_grid.colNames(),
        colModel: titulares_grid.colModel(),
        pager: $('#titulares_grid_pager'),
        postData: titulares_grid.postData(),
        autowidth: false,
        shrinkToFit: true,
        width: 1700,
        height: 100,
        loadComplete: function(){
            if($('#titulares_grid').getGridParam('records') > 0){
                $('#titulares_grid').jqGrid('setSelection', 1);  
            }
        },
        onSelectRow: function(id){
            $('#d_denominacion_tit').val($('#titulares_grid').getCell(id, 'd_denominacion'));
            $('#d_denominacion_siat_tit').val($('#titulares_grid').getCell(id, 'd_denominacion_siat'));
            $('#d_denominacion_afip_tit').val($('#titulares_grid').getCell(id, 'd_denominacion_afip'));
            $('#n_cuit_tit').val($('#titulares_grid').getCell(id, 'n_cuit'));
            $('#porcentaje_tit').val($('#titulares_grid').getCell(id, 'd_porcentaje'));
            $('#tipo_cuerpo_tit').val($('#titulares_grid').getCell(id, 'tipo_cuerpo'));
            $('#c_tipo_doc_tit').val($('#titulares_grid').getCell(id, 'c_tipo_documento'));
            $('#n_documento_tit').val($('#titulares_grid').getCell(id, 'n_documento'));
            $('#tipo_sub_registro_tit').val($('#titulares_grid').getCell(id, 'tipo_sub_registro'));
            $('#calle_tit').val($('#titulares_grid').getCell(id, 'd_calle'));
            $('#barrio_tit').val($('#titulares_grid').getCell(id, 'd_barrio'));
            $('#n_numero_tit').val($('#titulares_grid').getCell(id, 'n_numero'));
            $('#piso_tit').val($('#titulares_grid').getCell(id, 'd_piso'));
            $('#depto_tit').val($('#titulares_grid').getCell(id, 'd_depto'));
            $('#d_localidad_tit').val($('#titulares_grid').getCell(id, 'd_localidad'));
            $('#tipo_titular_tit').val($('#titulares_grid').getCell(id, 'c_tipo_titular'));
            $('#cod_postal_tit').val($('#titulares_grid').getCell(id, 'c_postal'));
            $('#d_localidad_siat_tit').val($('#titulares_grid').getCell(id, 'c_localidad_siat'));
            $('#reservado_tit').val($('#titulares_grid').getCell(id, 'd_reservado'));
            $('#c_provincia_tit').val($('#titulares_grid').getCell(id, 'c_provincia'));
            $('#c_estado_tit').val($('#titulares_grid').getCell(id, 'c_estado'));

            $('.titulares').each(function () {
                var id = $(this).attr('id');
                inputs_iniciales_tit[id] = $(this).val();
            });
        },
    }).navGrid('#titulares_grid_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );
}