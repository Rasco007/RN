function iniciarGrillas() {
    $("#planes_grid").jqGrid({
        caption: "Planes Del Contribuyente",
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        colNames: datos_planes_grid.colNames(),
        colModel: datos_planes_grid.colModel(),
        postData: datos_planes_grid.postData(),
        pager: $('#planes_grid_pager'),
        autowidth: false,
        width: 960,
        onSelectRow: function(id){
            var v_c_tipo_plan_pago = $("#planes_grid").getCell(id, 'c_tipo_plan_pago');
            var v_n_plan_pago = $('#planes_grid').getCell(id, 'n_plan_pago');
            var v_c_tributo = $('#planes_grid').getCell(id, 'c_tributo');
            if(v_c_tributo == 110){
                $("#btn_honorarios").attr('disabled',false);
            }else{
                $("#btn_honorarios").attr('disabled',true);
            }

            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{
                    "p_c_tipo_plan_pago": v_c_tipo_plan_pago,
                    "p_n_plan_pago": v_n_plan_pago,
                    "id_menu":10891,
                    "n_orden":0
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        // Traigo datos para pestaña resumen
                        $("#c_tributo","#frm_tab1").val(data.p_c_tributo);
                        $("#d_tributo","#frm_tab1").val(data.p_d_tributo);
                        $("#c_concepto","#frm_tab1").val(data.p_c_concepto);
                        $("#d_concepto","#frm_tab1").val(data.p_d_concepto);
                        $("#d_objeto_hecho","#frm_tab1").val(data.p_d_objeto_hecho);
                        $("#c_tipo_imponible","#frm_tab1").val(data.p_c_tipo_imponible);
                        $("#d_tipo_imponible","#frm_tab1").val(data.p_d_tipo_imponible);
                        $("#i_original","#frm_tab1").val(data.p_i_capital_ori);
                        $("#i_original_dto","#frm_tab1").val(data.p_i_capital);
                        $("#i_intereses_resarc","#frm_tab1").val(data.p_i_intereses_ori);
                        $("#p_dto_interes","#frm_tab1").val(data.p_p_dto_interes);
                        $("#i_intereses_dto","#frm_tab1").val(data.p_i_interes_mora);
                        $("#i_total_financiar","#frm_tab1").val(data.p_i_actualizado);
                        $("#n_cuotas","#frm_tab1").val(data.p_n_cuotas);
                        $("#d_metodo","#frm_tab1").val(data.p_d_metodo);
                        $("#d_periodicidad","#frm_tab1").val(data.p_d_periodicidad);
                        $("#i_anticipo","#frm_tab1").val(data.p_i_anticipo);
                        $("#i_intereses","#frm_tab1").val(data.p_i_intereses);
                        $("#i_tasas","#frm_tab1").val(data.p_i_tasas);
                        $("#i_total","#frm_tab1").val(data.p_i_total);
                        $("#f_confirmacion","#frm_tab1").val(data.p_f_efectivacion);
                        $("#c_usuario_efec","#frm_tab1").val(data.p_c_usuario_efec);
                        $("#f_actualizacion","#frm_tab1").val(data.p_f_emision);
                        $("#c_motivo","#frm_tab1").val(data.p_c_caducidad);
                        $("#d_motivo","#frm_tab1").val(data.p_d_caducidad);
                        $("#c_usuario_act","#frm_tab1").val(data.p_c_usuarioact);
                        $("#f_finalizacion","#frm_tab1").val(data.p_f_caducidad);
                        $("#n_cuit_alter","#frm_tab1").val(data.p_n_cuit_alter);
                        $("#d_denominacion_alter","#frm_tab1").val(data.p_d_deno_alter);
                        $("#d_situacion","#frm_tab1").val(data.p_d_situacion);
                        $("#f_alta","#frm_tab1").val(data.p_f_alta);
                        $("#c_usuario_alta","#frm_tab1").val(data.p_c_usuarioalt);

                        setea_parametros('#detalle_grid',{
                            ':c_tipo_plan_pago': v_c_tipo_plan_pago,
                            ':n_plan_pago': v_n_plan_pago}
                        );

                        setea_parametros('#cuotas_grid',{
                            ':c_tipo_plan_pago': v_c_tipo_plan_pago,
                            ':n_plan_pago': v_n_plan_pago}
                        );

                        $.ajax({
                            type:'POST',
                            url: FUNCIONES_BASEPATH+'maestro_abm.php',
                            data:{
                             "p_c_tipo_plan_pago": v_c_tipo_plan_pago,
                             "p_n_plan_pago": v_n_plan_pago,
                             "id_menu":10891,
                             "n_orden":1
                            },
                            dataType:'json',
                            success: function( data ) {
                                if(data.resultado == 'OK'){
                                    $("#i_saldo_total").val(data.p_i_saldo_total);
                                    $("#d_membrete_plan").val(data.p_d_membrete);
                                }
                                else{
                                    mostrar_error(data.resultado);
                                    return;
                                }
                            }
                        });

                        $("#tabs").show();
                    }
                    else{
                        mostrar_error(data.resultado);
                        return;
                    }
                }
            }); 
        }
    }).navGrid('#planes_grid_pager',{add:false, edit:false, del:false});
}

function inicializa_grillas_tabs(){
    $("#detalle_grid").jqGrid({
        colNames: datos_detalle_grid.colNames(),
        colModel: datos_detalle_grid.colModel(),
        pager: $('#detalle_grid_pager'),
        postData: datos_detalle_grid.postData(),
        autowidth: false,
        width: 960,
        ondblClickRow: function(id){
            post_to_url('consulta_cuenta_corr.php', {
                'p_n_id_menu': 10852,
                'p_m_autoquery': 'S',
                'id_contribuyente': id_contribuyente,
                'c_tipo_imponible': $("#detalle_grid").getCell(id, 'c_tipo_imponible'),
                'c_tributo': $("#detalle_grid").getCell(id, 'c_tributo'),
                'd_objeto_hecho': $("#detalle_grid").getCell(id, 'd_objeto_hecho')
            }, '_blank');
        }
    }).navGrid('#detalle_grid_pager',{add:false, edit:false, del:false});

    $("#cuotas_grid").jqGrid({
        colNames: datos_cuotas_grid.colNames(),
        colModel: datos_cuotas_grid.colModel(),
        pager: $('#cuotas_grid_pager'),
        postData: datos_cuotas_grid.postData(),
        autowidth: false,
        width: 960,
        ondblClickRow: function(id){
            post_to_url('consulta_cuenta_corr.php', {
                'p_n_id_menu': 10852,
                'p_m_autoquery': 'S',
                'id_contribuyente': id_contribuyente,
                'c_tipo_imponible': $("#cuotas_grid").getCell(id, 'c_tipo_imponible'),
                'c_tributo': $("#cuotas_grid").getCell(id, 'c_tributo'),
                'd_objeto_hecho': $("#cuotas_grid").getCell(id, 'd_objeto_hecho')
            }, '_blank');
        }
    }).navGrid('#cuotas_grid_pager',{add:false, edit:false, del:false});
}

