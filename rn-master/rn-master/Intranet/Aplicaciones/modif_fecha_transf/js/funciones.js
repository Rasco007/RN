function completarDenominacion(){
    let cuit_sin_guiones =limpia_cuit($('#n_cuit').val());
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: "modif_fecha_transf/php/autocomplete.php",
        type:"POST",
        data:{  p_oper:'getContribuyente',p_filtro: cuit_sin_guiones},
        success: function(response)
        {
            $('#main').procOverlay({visible:false});
            res = JSON.parse(response);
            if (res){
                $("#d_denominacion").val(res['DENOMINACION']);
                $("#id_contribuyente").val(res['ID_CONTRIBUYENTE']);
                $('#c_tipo_documento').val(res['C_TIPO_DOCUMENTO']);
                $('#d_tipo_documento').val(res['D_TIPO_DOCUMENTO']);
                $('#n_documento').val(res['N_DOCUMENTO']);
            }else{
                $('#n_cuit').val(null);
                $("#d_denominacion").val(null);
                $("#id_contribuyente").val(null);
            }
        }
    });
}

function fun_ajax_documento(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        url: 'modif_fecha_transf/php/autocomplete.php',
        type:"POST",
        data:{
            "p_oper": 5,
            "c_tipo_documento":$("#c_tipo_documento").val(),
            "n_documento":$("#n_documento").val()
        },
        async:true,
        success: function(data){
            resp = JSON.parse(data);
            console.log(resp);
            if(resp){
                $('#n_cuit').val(resp['N_CUIT']);
                $("#id_contribuyente").val(resp['ID_CONTRIBUYENTE']);
                $("#d_denominacion").val(resp['D_DENOMINACION']);
            }else{
                mostrar_cuadro('I', 'Atención', 'No se han encontrado registros para la consulta realizada.');
                $("#id_contribuyente").val(null);
                $("#n_cuit").val(null);
                $("#d_denominacion").val(null);
                $('#c_tipo_documento').val(null);
                $("#n_documento").val(null);
            }
        }
    });
}

function fun_update_fecha(){
    var id = $("#main_grid").getGridParam('selrow');
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_id_contribuyente":$('#main_grid').getCell(id, 'id_contribuyente'),
            "p_id_contribuyente_old":$('#id_contrib_old').val(),
            "p_c_tipo_imponible":$('#main_grid').getCell(id, 'c_tipo_imponible'),
            "p_c_tributo":$('#main_grid').getCell(id, 'c_tributo'),
            "p_d_objeto_hecho":$('#main_grid').getCell(id, 'd_objeto_hecho'),
            "p_f_vig_desde":$('#main_grid').getCell(id, 'f_vig_desde'),
            "p_c_motivo_alta":$('#main_grid').getCell(id, 'c_motivo_alta'),
            "p_f_vig_hasta":$('#main_grid').getCell(id, 'f_vig_hasta'),
            "p_c_motivo_baja":$('#main_grid').getCell(id, 'c_motivo_baja'),
            "p_f_cese_provisorio":$('#main_grid').getCell(id, 'f_cese_provisorio'),
            "p_c_motivo_cese_prov":$('#main_grid').getCell(id, 'c_motivo_cese_prov'),
            "p_f_altabaja":$('#f_altabaja_fecha').val(),
            "p_c_motivo":$('#c_motivo_fecha').val(),
            "p_f_altabaja_old":$('#foriginal_fecha').val(),
            "p_c_delegacion":$('#c_deleg_fecha').val(),
            "p_n_tabla_deleg":$('#ntabla_deleg_fecha').val(),
            "p_posee_deuda":0,
            "id_menu":10973,
            "n_orden":1
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                if (data.p_posee_deuda == 1){
                    mostrar_cuadro('C', 'Atención',
                        'El contribuyente posee deuda por este dominio<br>¿Desea continuar?',
                        function () {
                            $.ajax({
                                type:'POST',
                                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                                data:{
                                    "p_id_contribuyente":$('#main_grid').getCell(id, 'id_contribuyente'),
                                    "p_id_contribuyente_old":$('#id_contrib_old').val(),
                                    "p_c_tipo_imponible":$('#main_grid').getCell(id, 'c_tipo_imponible'),
                                    "p_c_tributo":$('#main_grid').getCell(id, 'c_tributo'),
                                    "p_d_objeto_hecho":$('#main_grid').getCell(id, 'd_objeto_hecho'),
                                    "p_f_vig_desde":$('#main_grid').getCell(id, 'f_vig_desde'),
                                    "p_c_motivo_alta":$('#main_grid').getCell(id, 'c_motivo_alta'),
                                    "p_f_vig_hasta":$('#main_grid').getCell(id, 'f_vig_hasta'),
                                    "p_c_motivo_baja":$('#main_grid').getCell(id, 'c_motivo_baja'),
                                    "p_f_cese_provisorio":$('#main_grid').getCell(id, 'f_cese_provisorio'),
                                    "p_c_motivo_cese_prov":$('#main_grid').getCell(id, 'c_motivo_cese_prov'),
                                    "p_f_altabaja":$('#f_altabaja_fecha').val(),
                                    "p_c_motivo":$('#c_motivo_fecha').val(),
                                    "p_f_altabaja_old":$('#foriginal_fecha').val(),
                                    "p_c_delegacion":$('#c_deleg_fecha').val(),
                                    "p_n_tabla_deleg":$('#ntabla_deleg_fecha').val(),
                                    "p_posee_deuda":1,
                                    "id_menu":10973,
                                    "n_orden":1
                                },
                                dataType:'json',
                                success: function( data ) {
                                    if(data.resultado == 'OK'){
                                        if (data.p_msj_actctacte){
                                            mostrar_cuadro('I', 'Información', data.p_msj_actctacte);
                                        }
                                        if (data.p_msj_actexen){
                                            mostrar_cuadro('I', 'Información', data.p_msj_actexen);
                                        }
                                        $('#modal_fecha').modal("hide");
                                        $('#main_grid').trigger('reloadGrid');
                                        mostrar_confirmacion('La operación se realizó con éxito.');
                                    }
                                    else{
                                        mostrar_cuadro('E', 'Error', data.resultado);
                                        return;
                                    }
                                }
                            });
                        }, function () {
                            return;
                        }
                    );
                }else{
                    if (data.p_msj_actctacte){
                        mostrar_cuadro('I', 'Información', data.p_msj_actctacte);
                    }
                    if (data.p_msj_actexen){
                        mostrar_cuadro('I', 'Información', data.p_msj_actexen);
                    }
                    $('#modal_fecha').modal("hide");
                    $('#main_grid').trigger('reloadGrid');
                    mostrar_confirmacion('La operación se realizó con éxito.');
                }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}