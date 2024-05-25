function inicializa_eventos(){

    if($("#n_cuit_filtro").val()){
        buscar();
    }

    $('#n_cuit_filtro').focusout(function(){
        if ($('#n_cuit_filtro').val() != ''){
            try{
                if( limpia_cuit($('#n_cuit_filtro').val()).length == 11 ){
                    $.ajax({
                        type:'POST',
                        url: "ajax_genericos/autocomplete.php",
                        data: {oper:'3',term: limpia_cuit($('#n_cuit_filtro').val())},
                        dataType: 'json',
                        success: function( data ) {
                            ajax_autocomplete = null;
                            if(data) {
                                $("#d_denominacion_filtro").val(data.data_raz[0].razon_social);
                                $("#id_contribuyente").val(data.data_raz[0].id_contribuyente);
                                // $('#objeto').keydown();
                            }
                        }
                    });
        
                }else{
                    $('#btn_limpiar').click();
                }
            }catch(err){
            }
        }
    });

    $("#n_cuit_filtro").mask("99-99999999-9");
    $('#lupa_d_denominacion').hide();
    $('#lupa_pc_cuit_filtro').hide();
    $('#lupa_obj_hecho_filtro').hide();

     $('#btn_legajo').click(function(){
        post_to_url('legajo_contribuyente.php',{'p_n_id_menu':10886,'p_n_cuit':$('#n_cuit_filtro').val()},'','POST');
    });

    $('#btn_ddjj_datos').click(function(){
        post_to_url('consulta_ddjj_afip.php',{'p_n_id_menu':100161,'p_cuit':limpia_cuit($('#n_cuit_filtro').val()),'p_deno':$('#d_denominacion_filtro').val()},'','POST');
    });

    $('#btn_historico').click(function(){
        let barrio;
        if($('#d_barrio').val()){
            barrio = '  Barrio ' + $('#d_barrio').val();
        }else{
            barrio = ''
        }
        post_to_url('AFIP002H.php',{'p_n_id_menu':100191,
        'p_n_cuit':limpia_cuit($('#n_cuit_filtro').val()),
        'p_d_denominacion':$('#d_denominacion_filtro').val(),
        'p_sexo_filtro': $('#sexo_filtro').val(),
        'p_d_calle': $('#d_calle').val() + '   ' + $('#n_calle').val() + barrio,
        'p_f_alta': $('#f_alta').val(),
        'p_f_nac': $('#f_nacimiento').val()},'','POST');
    });

    $('#btn_limpiar').click(function(){
        $('#d_denominacion_filtro').val(null);
        $('#n_cuit_reemp_filtro').val(null);
        $('#n_baja').val(null);
        $('#n_cuit_filtro').val(null);
        $("#sexo_filtro").val(null);                            
        $("#d_casada_filtro").val(null);                            
        $("#d_materno_filtro").val(null);                            
        $("#f_primera").val(null);                            
        $("#n_primera").val(null);                            
        $("#f_segunda").val(null);                            
        $("#n_segunda").val(null);                            
        $("#f_tercera").val(null);                            
        $("#n_tercera").val(null);                            
        $("#f_nacimiento").val(null);                            
        $("#f_alta").val(null);                            
        $("#d_calle").val(null);                            
        $("#n_calle").val(null);                            
        $("#d_barrio").val(null);                            
        $("#d_manzana").val(null);                            
        $("#n_torre").val(null);                            
        $("#n_depto").val(null);                            
        $("#n_piso").val(null);                            
        $("#d_sec").val(null);                            
        $("#d_depend").val(null);                            
        $("#d_loc").val(null);                            
        $("#n_cp").val(null);                            
        $("#d_pcia").val(null);                            
        $("#n_ganancia").val(null);                            
        $("#n_iva").val(null);                            
        $("#d_autonomo").val(null);                            
        $("#d_empleador").val(null);                            
        $("#d_tipo_persona").val(null);                            
        $("#n_juridica").val(null);                            
        $("#d_emp_promovida").val(null);                            
        $("#d_gran_contr").val(null);                            
        $("#d_pasivo").val(null);                            
        $("#d_monotributo").val(null);                            
        $("#d_cat_monotributo").val(null);                            
        $("#n_act_monotributo").val(null);                            
        $("#d_cat_auto").val(null);                            
        $("#d_cat_autonomo").val(null);  
        $("#f_cquieb").val(null);  
        $("#d_cquieb").val(null);  
        $("#f_fallecimiento").val(null);  
        $("#d_sucesion").val(null);  
        $("#n_pc_cuit_filtro").val(null);

        $('#id_contribuyente').val(null);

        $('#lupa_d_denominacion').hide();
        $('#lupa_pc_cuit_filtro').hide();

        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        $('#mascara_lupa_pc_cuit_filtro').show().css('display', 'table-cell');

        $('#n_cuit_filtro').attr('disabled', false);
        $('#n_pc_cuit_filtro').attr('disabled', false);
        $('#d_denominacion_filtro').attr('disabled', false);

        $('#d_tipo_documento').attr('disabled', false);

        $('#btn_legajo').attr('disabled', true);

    });

    
    
$('#btn_buscar').click(function(){
    buscar();
});

    $('#d_denominacion_filtro').keydown(function () {
        if ($('#d_denominacion_filtro').val().length >= 2){
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
        } else {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        }
    });

    $('#n_pc_cuit_filtro').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 1) {
            $('#lupa_pc_cuit_filtro').show().css('display', 'table-cell');
            $('#mascara_lupa_pc_cuit_filtro').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_pc_cuit_filtro').hide();
            $('#mascara_lupa_pc_cuit_filtro').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 1) {
            $('#lupa_pc_cuit_filtro').hide();
            $('#mascara_lupa_pc_cuit_filtro').show().css('display', 'table-cell');
        }
    });


    $('#d_denominacion_filtro').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
            $('#id_contribuyente').val(null);
            $('#n_cuit_filtro').val(null);
        } else if (event.type === 'focusout' && $(this).val().length <= 4) {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
            $('#id_contribuyente').val(null);
            $('#n_cuit_filtro').val(null);
        }});

}



