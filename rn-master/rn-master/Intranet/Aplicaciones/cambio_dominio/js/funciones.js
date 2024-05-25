function check_digito_verificador(param, digito) {
    $.ajax({
        url: "cambio_dominio/php/consultas_ajax.php",
        type:"POST",
        dataType: "JSON",
        data:{ p_oper:'checkDigito', param: param},
        success: function (res) {
            if(res){
                if(res['DIGITO'] != digito){
                    $('#main').procOverlay({visible:false});
                    mostrar_error('El Dígito Verificador no es correcto.');
                    bloquear_campos(false);
                    return;
                }
                else{
                    if($('#d_patente').val() == '') {
                        completar_informacion($('#d_patente_vieja').val());
                    }else{
                        cargar_datos($('#d_patente').val());
                    }
                    $('#btn_cambiar').attr('disabled', false);
                }
            }
            else{
                $('#main').procOverlay({visible:false});
                bloquear_campos(false);
                mostrar_error('Ocurrió un error al comprobar el Digito Verificador.'); return;
            }
        }
    });
}

function completar_informacion(param){
    $.ajax({
        url: "cambio_dominio/php/consultas_ajax.php",
        type:"POST",
        dataType: "JSON",
        data:{ p_oper:'completarInfo', param: param},
        success: function (res) {
            if(res){
                $("#d_patente").val(res['D_PATENTE']);
                $("#d_verif_dom").val(res['C_VERIFICADOR']);
                cargar_datos(res['D_PATENTE']);
            }
            else{
                $('#main').procOverlay({visible:false});
                bloquear_campos(false);
            }
        }
    });
}

function cargar_datos(param) {
    $.ajax({
        url: "cambio_dominio/php/consultas_ajax.php",
        type:"POST",
        dataType: "JSON",
        data:{ p_oper:'cargarDatos', param: param},
        success: function (res) {
            $('#main').procOverlay({visible:false});
            if(res){
                $("#c_marca").val(res['C_MARCA_AUT']);
                $("#d_marca").val(res['D_MARCA']);
                $("#c_modelo").val(res['ID_MODELO']);
                $("#d_modelo").val(res['D_MODELO']);
                $("#c_descrip").val(res['ID_DESCRIPCION']);
                $("#d_descrip").val(res['D_DESCRIPCION']);
                $("#c_tipo").val(res['C_TIPO']);
                $("#d_tipo").val(res['D_TIPO']);
                $("#n_modelo_año").val(res['N_MODELO_AÑO']);
                $("#n_peso_cilindrada").val(res['N_PESO_CILINDRADA']);
                $("#c_grupo").val(res['C_GRUPO']);
                $("#d_grupo").val(res['D_GRUPO']);
                $("#c_combustible").val(res['C_COMBUSTIBLE']);
                $("#d_combustible").val(res['D_COMBUSTIBLE']);
                $("#f_inscripcion").val(res['F_INSCRIPCION']);
                $("#f_radicacion").val(res['F_RADICACION']);
                $("#d_patente_vieja").val(res['D_PATENTE_VIEJA']);
                $("#d_verif_dom_ant").val(res['C_VERIFICADOR_ANT']);
                if (res['M_NACIONAL_IMPORTADO'] == 'N'){
                    $("#m_origen").val('NACIONAL');
                } else if (res['M_NACIONAL_IMPORTADO'] == 'I'){
                    $("#m_origen").val('IMPORTADO');
                }
                /*$("#chk_convocatoria").val(res['M_SIN_CONVOCATORIA']);*/
                if (res['M_SIN_CONVOCATORIA'] == 'S') $("#chk_convocatoria").prop("checked", true);
                $('#btn_buscar').attr('disabled', true);
                $('#d_patente_nueva').attr('readonly',false);
                $('#d_patente_vieja_nueva').attr('readonly',false);
            }
            else{
                bloquear_campos(false);
            }
        }
    });
}

function bloquear_campos(condicion) {
    $('#d_verif_dom, #d_verif_dom_ant, #d_patente, #d_patente_vieja').attr('readonly', condicion);
    if (condicion){
        $('#div_input_patente, #div_input_patente_vieja').addClass('lupa_oculta').removeClass('input-group');
        $('#div_input_patente .btn_lupa,#div_input_patente_vieja .btn_lupa').hide();
    }else{
        $('#div_input_patente, #div_input_patente_vieja').addClass('input-group').removeClass('lupa_oculta');
        $('#div_input_patente .btn_lupa,#div_input_patente_vieja .btn_lupa').show();
    }
}

function validar_patente_nueva(patente_nueva) {
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "p_d_patente_nueva": patente_nueva,
            "p_d_patente_vieja": $('#d_patente_vieja').val(),
            "p_m_sin_convocatoria": $("#chk_convocatoria").is(":checked") ? 'S' : 'N',
            "p_c_grupo": $('#c_grupo').val(),
            "p_f_inscripcion": $('#f_inscripcion').val(),
            "p_f_radicacion": $('#f_radicacion').val(),
            "usuario": v_usuario,
            "id_menu":v_id_menu,
            "n_orden":1
        },
        dataType:'json',
        success: function( data ) {
            $('#main').procOverlay({visible:false});
            if(data.resultado == 'OK'){
                cambiar_dominio(patente_nueva, $('#patente_vieja_nueva').val());
            }
            else{
                mostrar_error(data.resultado);
                $('#d_patente_nueva').val('');
                return;
            }
        }
    });
}

function validar_patente_vieja_nueva(patente_vieja_nueva){
    $('#main').procOverlay({visible:true});
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "d_patente": $('#d_patente').val(),
            "d_patente_vieja_nueva": patente_vieja_nueva,
            "id_menu": v_id_menu,
            "n_orden":0
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                validar_patente_ingresada(patente_vieja_nueva);
            }
            else{
                $('#main').procOverlay({visible:false});
                mostrar_error(data.resultado);
                $('#d_patente_vieja_nueva').val('');
                return;
            }
        }
    });
}

function validar_patente_ingresada(patente_vieja_nueva) {
    $.ajax({
        url: "cambio_dominio/php/consultas_ajax.php",
        type:"POST",
        dataType: "JSON",
        data:{ p_oper:'validaPatenteVieja', patente: patente_vieja_nueva},
        success: function (res) {
            $('#main').procOverlay({visible:false});
            if(res){
                if (res['RETORNO'] == 'mostrar_alerta2'){
                    mostrar_cuadro(
                        'Q', 'Está seguro que el dominio anterior es correcto?',
                        'Presione OK para confirmar.',
                        function () {
                            cambiar_dominio($('#d_patente_nueva').val(), patente_vieja_nueva);
                        },
                        function () {
                            return;
                        });
                }
                else if (res['RETORNO'] != null){
                    mostrar_error(res['RETORNO']); return;
                }
                else cambiar_dominio($('#d_patente_nueva').val(), patente_vieja_nueva);
            }
            else{
                mostrar_error('Ocurrió un error al validar los datos.'); return;
            }
        }
    });
}

function cambiar_dominio(patente_nueva, patente_vieja_nueva) {
    mostrar_cuadro('Q', 'Confirmación', 'Ud. grabará los cambios ¿Desea continuar?',
        function () {
            $('#main').procOverlay({visible:true});
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{
                    "p_d_patente": $('#d_patente').val(),
                    "p_d_patente_nueva": patente_nueva,
                    "p_d_patente_vieja": $('#d_patente_vieja').val(),
                    "p_d_patente_vieja_nueva": patente_vieja_nueva,
                    "id_menu":v_id_menu,
                    "n_orden":2
                },
                dataType:'json',
                success: function( data ) {
                    $('#main').procOverlay({visible:false});
                    if(data.resultado == 'OK'){
                        mostrar_validacion('El Dominio se ha cambiado exitosamente');
                        $('#btn_limpiar').click();
                    }
                    else{
                        mostrar_error(data.resultado);
                        return;
                    }
                }
            });
        },
        function () {
            return;
        });
}