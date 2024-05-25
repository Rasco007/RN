function init_eventos(){
    $('#div_grid').hide();

    $(".datepicker").datepicker({
        changeMonth:true,
        changeYear:true,
        dateFormat:'dd/mm/yy',
        currentText: 'Hoy',
        monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr', 'May','Jun','Jul','Ago','Sep', 'Oct','Nov','Dic'],
        dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        dayNamesShort: ['Dom','Lun','Mar','Mié','Juv','Vie','Sáb'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','Sá']
    }).mask('99/99/9999').change(function () {
        if ($(this).val().length > 0 && $(this).val().length != 10){
            mostrar_error("El Formato de la Fecha ingresada no es válido.");
            $(this).val(null);
        }
    });

    $('#i_tot_deb, #i_tot_cred').change(function () {
        if ($(this).val()){
            $(this).val(formatea_number(mascara_numero(parse($(this).val()).toFixed(2), ',', -1, 2), ''));
        }
    });

    $('#tipo_reg, #org_rec, #banco_adm').on('input', function() {
        let inputValue = $(this).val();
    
        inputValue = inputValue.replace(/\D/g, '');
    
        $(this).val(inputValue);
      });

    $('#btn_buscar').click(function(){
        filtros_arr_main = [];
        if($('#tipo_reg').val() != ''){
            filtros_arr_main.push('Código tipo registro: '+ $('#tipo_reg').val());
        }
        if($('#org_rec').val() != ''){
            filtros_arr_main.push('Código organismo recaudador: '+ $('#org_rec').val());
        }
        if($('#banco_adm').val() != ''){
            filtros_arr_main.push('Código banco administrador: '+ $('#banco_adm').val());
        }
        if($('#f_proceso').val() != ''){
            filtros_arr_main.push('Fecha proceso: '+ $('#f_proceso').val());
        }
        if($('#f_acred').val() != ''){
            filtros_arr_main.push('Fecha acreditación: '+ $('#f_acred').val());
        }
        if($('#i_tot_deb').val() != ''){
            filtros_arr_main.push('Total débito: '+ $('#i_tot_deb').val());
        }
        if($('#i_tot_cred').val() != ''){
            filtros_arr_main.push('Total crédito: '+ $('#i_tot_cred').val());
        }
        if($('#f_concil').val() != ''){
            filtros_arr_main.push('Fecha conciliación: '+ $('#f_concil').val());
        }
        if($('#f_acred_dgr').val() != ''){
            filtros_arr_main.push('Fecha acreditación DGR: '+ $('#f_acred_dgr').val());
        }
        filtros_no_nativos_ar['datos_mov_banc_grid'] = filtros_arr_main;

        $('#div_grid').show();
        disable_inputs();
        setea_parametros("#datos_mov_banc_grid",{':p_tipo_reg': $('#tipo_reg').val() || null, ':p_org_rec': $('#org_rec').val() || null, ':p_banco_adm': $('#banco_adm').val() || null, ':p_f_proceso': $('#f_proceso').val() || null, ':p_f_acred': $('#f_acred').val() || null, ':p_i_tot_deb': $('#i_tot_deb').val().replace(/\./g, '').replace(',', '.') || null, ':p_i_tot_cred': $('#i_tot_cred').val().replace(/\./g, '').replace(',', '.') || null, ':p_f_concil':$('#f_concil').val() || null, ':p_f_acred_dgr':$('#f_acred_dgr').val() || null});
        $("#datos_mov_banc_grid").trigger('reloadGrid');
    });

    $('#btn_limpiar').click(function(){
        $('#tipo_reg').val("");
        $('#org_rec').val("");
        $('#banco_adm').val("");
        $('#f_proceso').val("");
        $('#f_acred').val("");
        $('#i_tot_deb').val("");
        $('#i_tot_cred').val("");
        $('#f_concil').val("");
        $('#f_acred_dgr').val("");

        $('#tipo_reg').prop('disabled', false);
        $('#org_rec').prop('disabled', false);
        $('#banco_adm').prop('disabled', false);
        $('#f_proceso').prop('disabled', false);
        $('#f_acred').prop('disabled', false);
        $('#i_tot_deb').prop('disabled', false);
        $('#i_tot_cred').prop('disabled', false);
        $('#f_concil').prop('disabled', false);
        $('#f_acred_dgr').prop('disabled', false);

        $('#div_grid').hide();
    });

    $('#btn_aceptar').click(function(){
        if ($('#frm_f_acred').validationEngine('validate')) {
            ingresar_fecha_acred_dgr($('#id_archivo').val());
        }
    });
}