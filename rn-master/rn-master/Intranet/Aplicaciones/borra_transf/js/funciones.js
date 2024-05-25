function borrar_transferencia(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_id_contribuyente":$('#id_contribuyente').val(),
            "p_n_tabla_mot_alta":$('#n_tabla_mot_alta').val(),
            "p_c_tributo":p_c_tributo,
            "p_f_desde_obj":$('#f_desde').val(),
            "p_recupero":$('#f_recupero').val(),
            "p_c_motivo_alta":$('#c_motivo').val(),
            "p_modo":p_modo,
            "p_d_objeto_hecho":$('#d_partida').val(),
            "id_menu":v_id_menu,
            "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
                mostrar_confirmacion('Se ha borrado el movimiento exitosamente. Verifique exenciones');
            }
            else{
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}

function borrar_responsabilidad(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_id_contribuyente":$('#id_contribuyente').val(),
            "p_c_tributo":p_c_tributo,
            "p_f_desde_obj":$('#f_desde').val(),
            "p_d_objeto_hecho":$('#d_partida').val(),
            "id_menu":v_id_menu,
            "n_orden":1
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
                mostrar_confirmacion('Se ha borrado el movimiento exitosamente, Verifique exenciones');
            }
            else{
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}

function limpiar_formulario(){
    $('#contenedor_contribuyente, #contenedor_descripcion').hide();
    $('#lupa_partida, #lupa_nomenclatura').show();
    $('#frm_consulta :input').val(null);
    $('#frm_consulta :input').prop('readonly', false);
    $('#contenedor_contribuyente :input').val(null);
    $('#contenedor_descripcion :input').val(null);
    $("#frm_consulta").validationEngine('hideAll');
    $('#btn_buscar').attr('disabled',false);
}

function check_digito_verificador(param, digito) {
    $.ajax({
        url: "borra_transf/php/consultas_ajax.php",
        type:"POST",
        dataType: "JSON",
        data:{ p_oper:'checkDigito', param: param},
        success: function (res) {
            $('#main').procOverlay({visible:false});
            if(res){
                if(res['DIGITO'] != digito){
                    mostrar_error('El Dígito Verificador no es correcto.');
                    return;
                }
                else{
                    getDatosFiltros();
                }
            }
            else{
                mostrar_error('Ocurrió un error al comprobar el Digito Verificador.');
            }
        }
    });
}

function getDatosFiltros(){
    var params = {p_oper:'getDatosFiltros',
        p_tributo: p_c_tributo,
        p_partida: $('#d_partida').val(),
        p_nomenclatura: $('#d_nomenclatura').val()};
    $.ajax({
        url: "borra_transf/php/consultas_ajax.php",
        type:"POST",
        dataType: "JSON",
        data:params,
        success: function (res) {
            $('#main').procOverlay({visible:false});
            if(res){
                $('#d_partida').val(res['OBJETO1']);
                $('#d_nomenclatura').val(res['OBJETO2']);
                if(p_c_tributo == 90){
                    $('#d_verif_dom').val(res['DIGITO1']);
                    $('#d_verif_dom_ant').val(res['DIGITO2']);
                }
                cons_principal();
            }
        }
    });
}

function cons_principal() {
    $('#main').procOverlay({visible:true});
    $.ajax({
        type: 'POST',
        url: "borra_transf/php/consultas_ajax.php",
        data: {p_oper: 'partida',
            p_d_objeto_hecho:$('#d_partida').val(),
            p_modo: p_modo,
            p_c_tributo: p_c_tributo},
        dataType: 'json',
        success: function (res) {
            if (res == null) {
                mostrar_error('Ocurrio un error al realizar la consulta.');
                return;
            }
            if (res.error){
                if (res.error == 'PRINCIPAL'){
                    mostrar_mensaje('Ningún registro','No encuentra datos para la consulta realizada.');
                    return;
                }else if (res.error == 'CONTRIB'){
                    mostrar_mensaje('Ningún registro','No encuentra datos del contribuyente.');
                    return;
                }else if(res.error == 'RESPONS'){
                    mostrar_mensaje('Ningún registro','No encuentra datos del responsable de pago.');
                    return;
                }
            }
            $('#n_cuit').val(res.N_CUIT);
            $('#c_tipo_documento').val(res.C_TIPO_DOCUMENTO);
            $('#d_tipo_documento').val(res.D_TIPO_DOCUMENTO);
            $('#n_documento').val(res.N_DOCUMENTO);
            $('#d_denominacion').val(res.D_DENOMINACION);

            $('#f_desde').val(res.F_DESDE_OBJ);
            $('#c_motivo').val(res.C_MOTIVO_ALTA);
            $('#d_motivo').val(res.D_BAJA);

            $('#id_contribuyente').val(res.ID_CONTRIBUYENTE);
            $('#n_tabla_mot_alta').val(res.N_TABLA_MOT_ALTA);

            $('#main').procOverlay({visible:false});
            $('#contenedor_contribuyente, #contenedor_descripcion').show();
            $('#lupa_partida, #lupa_nomenclatura').hide();
            $('#btn_buscar').attr('disabled',true);
            $('#frm_consulta :input').prop('readonly', true);
        }
    });
}