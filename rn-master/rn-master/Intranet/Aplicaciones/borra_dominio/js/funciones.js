function limpiar_formulario(){
    $('#frm_consulta :input').val(null);
    $('#d_dominio,#c_verificador_dom,#d_dominio_anterior,#c_verificador_dom_ant,#btn_buscar').prop('disabled', false);
    $('#contenedor_detalle, #contenedor_boton,#lupa_dominio, #lupa_dominio_anterior').hide();
    $('#mascara_lupa_dominio, #mascara_lupa_dominio_anterior').show();
    $('#contenedor_detalle :input').val(null);
    $("#frm_consulta").validationEngine('hideAll');
}

function validar_form() {
    return !(($('#d_dominio').val() == '' || $('#c_verificador_dom').val()=='')
                && ($('#d_dominio_anterior').val() == '' || $('#c_verificador_dom_ant').val()==''));
}

function obtiene_detalle(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type: 'POST',
        url: "borra_dominio/php/consultas_ajax.php",
        data: {
            p_oper: 'buscaDetalle',
            p_d_dominio: $('#d_dominio').val(),
            p_d_dominio_ant: $('#d_dominio_anterior').val()
        },
        dataType: 'json',
        success: function (res) {
            /*if (Object.keys (res) .length  <= 1) {  //Porque siempre va a llegar el dominio.
                mostrar_mensaje('Ningún registro','No encuentra datos del dominio.');
                return;
            }*/

            if (res.ERROR == 'OK'){
                $('#d_dominio').val(res.D_DOMINIO);
                if (!$('#c_verificador_dom').val()){
                    $('#c_verificador_dom').val(res.C_VERIF_DOM);
                }
                $('#d_dominio_anterior').val(res.D_PATENTE_VIEJA);
                if (!$('#c_verificador_dom_ant').val()){
                    $('#c_verificador_dom_ant').val(res.C_VERIF_DOM_ANT);
                }

                $('#c_marca').val(res.C_MARCA_AUT);
                $('#c_modelo').val(res.ID_MODELO);
                $('#c_descripcion').val(res.ID_DESCRIPCION);
                $('#c_tipo').val(res.C_TIPO);
                $('#d_marca').val(res.D_MARCA);
                $('#d_modelo').val(res.D_MODELO);
                $('#d_descripcion').val(res.D_DESCRIPCION);
                $('#d_tipo').val(res.D_TIPO);


                $('#d_modelo_año').val(res.N_MODELO_AÑO);
                $('#d_peso_cilin').val(res.N_PESO_CILINDRADA);
                $('#f_radicacion').val(res.F_RADICACION);

                $('#main').procOverlay({visible:false});
                $('#d_dominio,#c_verificador_dom,#d_dominio_anterior,#c_verificador_dom_ant,#btn_buscar').prop('disabled', true);
                $('#lupa_dominio, #lupa_dominio_anterior,#mascara_lupa_dominio, #mascara_lupa_dominio_anterior').hide();
                $('#contenedor_detalle, #contenedor_boton').show();
            }else{
                mostrar_validacion(res.ERROR);
            }


        }
    });
}

function borrar_dominio(){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_d_patente":$('#d_dominio').val(),
            "id_menu":v_id_menu,
            "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
                mostrar_confirmacion('Se ha borrado el dominio '+$('#d_dominio').val()+' con éxito');
            }
            else{
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}