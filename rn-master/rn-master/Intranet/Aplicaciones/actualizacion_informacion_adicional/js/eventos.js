function inicializarEventos(){

    $('#mascara_lupa_tributo').hide();
    $("#n_cuit").mask("99-99999999-9");
    $('#lupa_d_denominacion').hide();
    $('#lupa_d_objeto_hecho').hide();

    $('#d_denominacion').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
            $('#c_tributo').val(null);
            $('#d_tributo').val(null);
            $('#d_objeto_hecho').val(null);
        } else if (event.type === 'keydown') {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 4) {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        }
    });

    $('#d_objeto_hecho').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 2) {
            $('#lupa_d_objeto_hecho').show().css('display', 'table-cell');
            $('#mascara_lupa_d_objeto_hecho').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_objeto_hecho').hide();
            $('#mascara_lupa_d_objeto_hecho').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 2 && !$('#n_cuit').val()) {
            $('#lupa_d_objeto_hecho').hide();
            $('#mascara_lupa_d_objeto_hecho').show().css('display', 'table-cell');
        } else if(event.type === 'focusout' && $('#n_cuit').val()){
            $('#lupa_d_objeto_hecho').show().css('display', 'table-cell');
            $('#mascara_lupa_d_objeto_hecho').hide();
        }
    });

    $('#btn_limpiar').click(function(){
        $('#n_cuit').val(null);
        $('#d_denominacion').val(null);
        $('#c_tributo').val(null);
        $('#d_tributo').val(null);
        $('#f_vig_desde').val(null);
        $('#d_objeto_hecho').val(null);
        $('#id_contribuyente').val(null);

        $('#lupa_d_denominacion').hide();
        $('#lupa_d_objeto_hecho').hide();
        $('#mascara_lupa_d_objeto_hecho').show();
        $('#mascara_lupa_d_denominacion').show();
        $('#mascara_lupa_tributo').hide();
        $('#lupa_tributo').show().css('display', 'table-cell');

        $('#n_cuit').prop('disabled', false);
        $('#d_denominacion').prop('disabled', false);
        $('#c_tributo').prop('disabled', false);
        $('#d_objeto_hecho').prop('disabled', false);

        $('#btn_buscar').prop('disabled', false);
        $('#btn_procesar').prop('disabled', true);

        $("#cod_organismo").val('');                            
        $("#d_cod_organismo").val('');     
        $("#d_den_agente").val('');     
        $("#act_desarrolla").val('');     
        $("#act_retiene").val('');     
        $("#anexo_ppal").val('');     
        $("#anexo_1").val('');     
        $("#anexo_2").val('');     
        $("#cont_operativo").val('');     
        $("#cont_admin").val('');  

        $("#cod_organismo").prop('disabled', true);                            
        $("#d_cod_organismo").prop('disabled', true);     
        $("#d_den_agente").prop('disabled', true);  
        $("#act_desarrolla").prop('disabled', true);  
        $("#act_retiene").prop('disabled', true);    
        $("#anexo_ppal").prop('disabled', true);     
        $("#anexo_1").prop('disabled', true);  
        $("#anexo_2").prop('disabled', true);  
        $("#cont_operativo").prop('disabled', true);   
        $("#cont_admin").prop('disabled', true);
    });


    $('#btn_buscar').click(function(){

        if ($('#c_tributo').val() != '' && $('#c_tributo').val() !== '10' && $('#c_tributo').val() !== '30' && $('#c_tributo').val() !== '40') {
            mostrar_cuadro('E', 'Error', 'No es posible realizar un cambio de régimen en el tributo ingresado');
            return;
        }

        if ($('#c_tributo').val() == '' && $('#d_objeto_hecho').val() == '') {
            mostrar_cuadro('E', 'Error', 'Debe ingresar al menos uno de los siguientes criterios de busqueda: Nro de cuit o (Tributo y Objeto/Hecho)');
            return;
        }

        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{   
                "p_id_contribuyente": $('#id_contribuyente').val(),   
                "p_d_objeto_hecho": $('#d_objeto_hecho').val(),
                "p_c_tributo": $('#c_tributo').val(),
                "id_menu":v_id_menu,
                "n_orden":3
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){

                    $("#n_cuit").val(data.p_n_cuit);                            
                    $("#d_denominacion").val(data.p_d_denominacion);                            
                    $("#id_contribuyente").val(data.p_id_contribuyente);                            
                    $("#cod_organismo").val(data.p_cod_organismo);                            
                    $("#d_cod_organismo").val(data.p_detalle_organismo);     
                    $("#d_den_agente").val(data.p_denominacion);     
                    $("#act_desarrolla").val(data.p_act_desarrolla);     
                    $("#act_retiene").val(data.p_act_retiene);     
                    $("#anexo_ppal").val(data.p_anexo_principal);     
                    $("#anexo_1").val(data.p_anexo1);     
                    $("#anexo_2").val(data.p_anexo2);     
                    $("#cont_operativo").val(data.p_contacto_operativo);     
                    $("#cont_admin").val(data.p_contacto_administrativo);     

                    if (data.p_cod_organismo) {
                        $('#act_desarrolla').prop('disabled', false);
                        $('#act_retiene').prop('disabled', false);
                        $('#cont_operativo').prop('disabled', false);
                        $('#cont_admin').prop('disabled', false);
                        if ($('#c_tributo').val() != 40) {
                            $('#anexo_ppal').prop('disabled', false);
                            $('#anexo_1').prop('disabled', false);
                            $('#anexo_2').prop('disabled', false);
                        }
                    }
                    
                    $('#lupa_d_denominacion').hide();
                    $('#lupa_d_objeto_hecho').hide();
                    $('#mascara_lupa_d_objeto_hecho').show();
                    $('#mascara_lupa_d_denominacion').show();
                    $('#mascara_lupa_tributo').show();
                    $('#lupa_tributo').hide();
            
                    $('#n_cuit').prop('disabled', true);
                    $('#d_denominacion').prop('disabled', true);
                    $('#c_tributo').prop('disabled', true);
                    $('#d_objeto_hecho').prop('disabled', true);
            
                    $('#btn_buscar').prop('disabled', true);
                    $('#btn_procesar').prop('disabled', false);
                }
                else{
                    mostrar_cuadro('E', 'Error', data.ora);
                    return;
                }
            }
        }); 
    });


    $('#btn_procesar').click(function(){

        if ($("#cod_organismo").val() == '') {
            mostrar_cuadro('E', 'Error', 'Debe seleccionar el Organismo ');
            return;
        }
        if ($("#cont_admin").val() == '') {
            mostrar_cuadro('E', 'Error', 'Debe Ingresar el contacto administrativo ');
            return;
        }
        if ($("#d_den_agente").val() == '' && $("#cod_organismo").val() != '0') {
            mostrar_cuadro('E', 'Error', 'Debe Ingresar la denominación ');
            return;
        }
        if ($("#d_den_agente").val() != '' && $("#cod_organismo").val() === '0') {
            mostrar_cuadro('E', 'Error', 'No corresponde ingresar la denominación o el organismo no es correcto ');
            return;
        }
        if ($("#cont_operativo").val() == '') {
            mostrar_cuadro('E', 'Error', 'Debe Ingresar el contacto operativo ');
            return;
        }
        if ($("#anexo_ppal").val() == $("#anexo_1").val() && $("#anexo_1").val()!= nulll) {
            mostrar_cuadro('E', 'Error', 'No se puede repetir el nro de anexo ');
            return;
        }
        if ($("#anexo_ppal").val() == $("#anexo_2").val()&& $("#anexo_2").val()!= null) {
            mostrar_cuadro('E', 'Error', 'No se puede repetir el nro de anexo ');
            return;
        }
        if ($("#anexo_2").val() == $("#anexo_1").val() && $("#anexo_1").val()!=null) {
            mostrar_cuadro('E', 'Error', 'No se puede repetir el nro de anexo ');
            return;
        }
        
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{  
             "p_id_contribuyente": $('#id_contribuyente').val(),    
             "p_d_objeto_hecho": $('#d_objeto_hecho').val(),
             "p_c_tributo": $('#c_tributo').val(),
             "p_cod_organismo": $('#cod_organismo').val(),
             "p_denominacion": $('#d_den_agente').val(),
             "p_act_desarrolla": $('#act_desarrolla').val(),
             "p_act_retiene": $('#act_retiene').val(),
             "p_anexo_principal": $('#anexo_ppal').val(),
             "p_anexo1": $('#anexo_1').val(),
             "p_anexo2": $('#anexo_2').val(),
             "p_contacto_operativo": $('#cont_operativo').val(),
             "p_contacto_administrativo": $('#cont_admin').val(), 
             "id_menu":v_id_menu,
             "n_orden":4
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    mostrar_cuadro('I', 'Error', 'Se Actualizo con Exito');
                    $('#btn_limpiar').click();
                }
                else{
                    mostrar_cuadro('E', 'Error', data.ora);
                    return;
                }
            }
        }); 
    });

}