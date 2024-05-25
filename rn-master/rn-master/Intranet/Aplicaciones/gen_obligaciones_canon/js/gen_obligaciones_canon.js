var datos_grid_errores = new GridParam({
    id_menu: v_id_menu,
    n_grid:0,
    n_orden:0,
    m_autoquery:v_m_autoquery,
    param:{':c_codigo_error':null}
});

$(document).ready(function() {

    $("#n_posicion_fiscal").mask("9999");
    $("#n_cuit").mask("99-99999999-9");

    $("#n_posicion_fiscal").change(function(event) {
        if ($("#n_posicion_fiscal").val() != "" && $("#n_cuota").val() != "") {
            $('#main').procOverlay({visible: true});
            $.ajax({
                url: "gen_obligaciones_canon/autocomplete.php",
                type: "POST",
                data: {
                    p_oper: 'datos_cuota',
                    p_n_posicion_fiscal: $("#n_posicion_fiscal").val(),
                    p_n_cuota: $("#n_cuota").val()
                },
                success: function(response) {
                    $('#main').procOverlay({visible: false});
                    res = JSON.parse(response);
                    if (res) {
                        $("#n_periodo_desde").val(res['PERIODO_DESDE']);
                        $("#n_periodo_hasta").val(res['PERIODO_HASTA']);
                        $("#f_vtop").val(res['F_VTOP']);
                        $("#f_vtop2").val(res['F_VTOP2']);
                        $("#f_vto_prox").val(res['F_VTO_PROX']);
                    } else {
                        $("#n_periodo_desde,#n_periodo_hasta,#f_vtop,#f_vtop2,#f_vto_prox").val(null);
                    }
                }
            });
        }else{
            if ($("#n_posicion_fiscal").val() == ""){
                $("#n_periodo_desde,#n_periodo_hasta,#f_vtop,#f_vtop2,#f_vto_prox").val(null);    
            }
        }
    });

    $("#n_cuota").change(function(event) {
        if ($("#n_posicion_fiscal").val() != "" && $("#n_cuota").val() != "") {
            $('#main').procOverlay({visible: true});
            $.ajax({
                url: "gen_obligaciones_canon/autocomplete.php",
                type: "POST",
                data: {
                    p_oper: 'datos_cuota',
                    p_n_posicion_fiscal: $("#n_posicion_fiscal").val(),
                    p_n_cuota: $("#n_cuota").val()
                },
                success: function(response) {
                    $('#main').procOverlay({visible: false});
                    res = JSON.parse(response);
                    if (res) {
                        $("#n_periodo_desde").val(res['PERIODO_DESDE']);
                        $("#n_periodo_hasta").val(res['PERIODO_HASTA']);
                        $("#f_vtop").val(res['F_VTOP']);
                        $("#f_vtop2").val(res['F_VTOP2']);
                        $("#f_vto_prox").val(res['F_VTO_PROX']);
                    } else {
                        $("#n_periodo_desde,#n_periodo_hasta,#f_vtop,#f_vtop2,#f_vto_prox").val(null);
                    }
                }
            });
        }else{
            if ($("#n_cuota").val() == ""){
                $("#n_periodo_desde,#n_periodo_hasta,#f_vtop,#f_vtop2,#f_vto_prox").val(null);     
            }
        }
    });

    $("#btn_liquidar").click(function(){
        var valido = $("#form_liquidacion").validationEngine("validate");
        var valida_posiciones = fun_valida_posiciones();
        if (valido && valida_posiciones) {
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                    "p_c_tributo":$("#c_tributo").val(),
                    "p_c_concepto":$("#c_concepto").val(),
                    "p_n_posicion_fiscal":$("#n_posicion_fiscal").val(),
                    "p_n_cuota":$("#n_cuota").val(),
                    "p_c_region":$("#c_region").val(),
                    "p_c_area":$("#c_area").val(),
                    "p_id_contribuyente":$("#id_contribuyente").val(),
                    "p_d_objeto":$("#d_objeto").val(),
                    "p_m_emision_masiva":$("#m_masiva").is(":checked")?'S':'N',
                    "id_menu":v_id_menu,
                    "n_orden":0
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        if(data.p_n_cant_gen > 0){
                            if(data.p_n_cant_gen == data.p_n_cant_tot){
                                if($("#m_masiva").is(":checked")){
                                    mostrar_cuadro('S', 'Confirmación', msj_obligs_generadas(data)+'<br><br>Se abrirá una nueva ventana con el detalle de la Emisión Generada.',
                                        function() {
                                            post_to_url('cons_emisiones_canon.php', {
                                                'p_n_id_menu': 10956,
                                                "p_n_pos_fiscal": $("#n_posicion_fiscal").val(),
                                                "p_n_cuota": $("#n_cuota").val(),
                                                "p_c_region": $("#c_region").val(),
                                                "p_c_area": $("#c_area").val(),
                                                'p_m_autoquery': 'S',
                                                'ruta': '[]'
                                            }, '_blank');
                                            $(".limpiar","#form_liquidacion").val('');
                                        },
                                        function() {$(".limpiar","#form_liquidacion").val('');}, 500
                                    );
                                }else{
                                    mostrar_confirmacion(msj_obligs_generadas(data),500);
                                }
                            }else{
                                if($("#m_masiva").is(":checked")){
                                    mostrar_mensaje('Atención',
                                        msj_obligs_generadas(data)+
                                        '<br><br>Se abrirá una nueva ventana con el detalle de la Emisión Generada.'+
                                        '<br><br>A continuación se detallarán los errores.',
                                        function() {
                                            fun_mostrar_errores(data.p_c_cod_err);
                                            post_to_url('cons_emisiones_canon.php', {
                                                'p_n_id_menu': 10956,
                                                "p_n_pos_fiscal": $("#n_posicion_fiscal").val(),
                                                "p_n_cuota": $("#n_cuota").val(),
                                                "p_c_region": $("#c_region").val(),
                                                "p_c_area": $("#c_area").val(),
                                                'p_m_autoquery': 'S',
                                                'ruta': '[]'
                                            }, '_blank');
                                        }, 500
                                    );
                                }else{
                                    mostrar_mensaje('Atención',msj_obligs_generadas(data)+'<br><br>A continuación se detallarán los errores.',fun_mostrar_errores(data.p_c_cod_err),500);
                                }
                            }
                        }else{
                            if(data.p_c_cod_err == null){
                                mostrar_mensaje('Atención','No se encontraron obligaciones a generar para los filtros ingresados.');
                            }else{
                                mostrar_error('Se han producido errores, a continuación se detallarán.');
                                fun_mostrar_errores(data.p_c_cod_err);
                            }
                        }
                    }else{
                        mostrar_error(data.resultado);
                        return;
                    }
                }
            });
        }
    });

    $("#grid_errores").jqGrid({
        colNames: datos_grid_errores.colNames(),
        colModel: datos_grid_errores.colModel(),
        pager: $('#grid_errores_pager'),
        postData: datos_grid_errores.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",
        sortname:'d_descrip',
        sortorder:'asc',
        autowidth:false
    }).navGrid('#grid_errores_pager',
        {add:false, edit:false, del:false}, //options
        {}, //edit
        {}, //add
        {} //del
    );

    inicializa_lupas();

    autocompletecuitdenominacion();
    
});