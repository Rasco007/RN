function inicializa_eventos(){

    $("#n_cuit_filtro").mask("99-99999999-9");
    $('#lupa_d_denominacion').hide();
    $('#lupa_obj_hecho_filtro').hide();

    if(v_n_cuit) $('#n_cuit_filtro').val(v_n_cuit);
    if(v_d_denominacion) $('#d_denominacion_filtro').val(v_d_denominacion);
    if(v_sexo_filtro) $('#sexo_filtro').val(v_sexo_filtro);
    if(v_d_calle) $('#d_calle').val(v_d_calle);
    if(v_f_alta) $('#f_alta').val(v_f_alta);
    if(v_f_nac) $('#f_nac').val(v_f_nac);

    filtros_no_nativos = [];
    filtros_arr_main = [];

    if($('#n_cuit_filtro').val() != ''){
        filtros_arr_main.push('CUIT: '+ $('#n_cuit_filtro').val());
    }
    if($('#n_baja').val() != ''){
        filtros_arr_main.push('Baja: '+ $('#n_baja').val());
    }
    if($('#n_cuit_reemp_filtro').val() != ''){
        filtros_arr_main.push('CUIT Reemplazo: '+ $('#n_cuit_reemp_filtro').val());
    }
    if($('#sexo_filtro').val() != ''){
        filtros_arr_main.push('Sexo: '+ $('#sexo_filtro').val());
    }
    if($('#d_denominacion_filtro').val() != ''){
        filtros_arr_main.push('Denominación: '+ $('#d_denominacion_filtro').val());
    }
    if($('#d_calle').val() != ''){
        filtros_arr_main.push('Calle: '+ $('#d_calle').val());
    }
    if($('#f_alta').val() != ''){
        filtros_arr_main.push('Alta Afip: '+ $('#f_alta').val());
    }
    if($('#f_nac').val() != ''){
        filtros_arr_main.push('Fecha de Nacimiento: '+ $('#f_nac').val());
    }
    filtros_no_nativos_ar['main_grid'] = filtros_arr_main;

    $(".datepicker").datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    });

    $('#btn_volver').click(function () {
        post_to_url('consulta_padron_AFIP.php', {
            'p_n_id_menu': 100162,
            'p_n_cuit': $('#n_cuit_filtro').val(),
        },'');
    });


}



