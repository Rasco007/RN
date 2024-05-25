function init_eventos(){

    $('#lupa_d_dominio').hide();
    $('#lupa_d_dominio_viejo').hide();

    $("#c_tipo, #c_marca, #id_modelo, #id_descripcion").on('input', function (evt) {
        // Allow only numbers.
        jQuery(this).val(jQuery(this).val().replace(/[^0-9]/g, ''));
    });

    $("#fecha").val(fecha_hoy);

    $("#fecha").datepicker(
        {   dateFormat:'dd/mm/yy',
            changeMonth:true,
            changeYear:true,
            dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
            monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
            monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
        })
        .blur(function(){
            formatearFecha($(this));
        }).mask('99/99/99ZZ', {translation: {'Z': {pattern: /[0-9]/, optional: true}}}
    );

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    });

    $("#d_patente").focusout(function(){
        if(($("#d_patente").val().length === 6 || $("#d_patente").val().length === 7)){
            p_d_patente=$("#d_patente").val();
            obtener_datos_automotor(p_d_patente ,p_c_marca_aut , p_d_texto_marca , p_id_modelo , p_d_Texto_modelo, p_id_descripcion,
                p_d_texto_descripcion, p_n_peso_cilindrada , p_n_modelo_año , p_c_tipo, p_c_grupo , p_c_fmcamod ,
                p_n_hp, p_d_descrip_marca,p_d_descrip_modelo , p_d_descrip_des , p_d_descrip_tipo);
        }
    });

    $("#btn_generar_reporte").click(function(){
        
        if(!$("#d_patente").val()){
            mostrar_cuadro('E', 'Error', 'El campo Dominio es obligatorio',
                null,null,300);
        }else{
            
            datos_calendario_fiscal(p_fecha, p_pos, p_cuota)
        }
    });

    $('#btn_limpiar').click(function(){
        $('#d_patente').val(null);
        $('#d_patente_vieja').val(null);
        $('#c_marca').val(null);
        $('#d_descrip_marca').val(null);
        $('#id_modelo').val(null);
        $('#d_descrip_modelo').val(null);
        $('#id_descripcion').val(null);
        $('#d_descrip').val(null);
        $('#d_texto_marca').val(null);
        $('#d_texto_modelo').val(null);
        $('#d_texto_descripcion').val(null);
        $('#c_tipo').val(null);
        $('#d_descrip_tipo').val(null);
        $('#c_grupo').val(null);
        $('#d_grupo').val(null);
        $('#n_modelo_año').val(null);
        $('#n_peso_cilindrada').val(null);
        $('#c_fmcamod').val(null);
        $('#n_hp').val(null);
        $("#fecha").val(fecha_hoy);
        $('#lupa_d_dominio').hide();
        $('#lupa_d_dominio_viejo').hide();
        $('#mascara_lupa_d_dominio').show().css('display', 'table-cell');
        $('#mascara_lupa_d_dominio_viejo').show().css('display', 'table-cell');
    });

    $('#d_patente').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 2) {
            $('#lupa_d_dominio').show().css('display', 'table-cell');
            $('#mascara_lupa_d_dominio').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_dominio').hide();
            $('#mascara_lupa_d_dominio').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 2) {
            $('#lupa_d_dominio').hide();
            $('#mascara_lupa_d_dominio').show().css('display', 'table-cell');
        }
    });

    $('#d_patente_vieja').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 2) {
            $('#lupa_d_dominio_viejo').show().css('display', 'table-cell');
            $('#mascara_lupa_d_dominio_viejo').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_dominio_viejo').hide();
            $('#mascara_lupa_d_dominio_viejo').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 2) {
            $('#lupa_d_dominio_viejo').hide();
            $('#mascara_lupa_d_dominio_viejo').show().css('display', 'table-cell');
        }
    });

}


/* Formatted on 8/1/2024 12:48:45 (QP5 v5.381) */
