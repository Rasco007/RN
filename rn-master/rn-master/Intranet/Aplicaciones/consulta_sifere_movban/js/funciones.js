function buscar_datos_grilla_cabecera(){
    filtros_no_nativos_ar = [];
    filtros_arr_main = [];
    if($('#id_archivo').val() !== ''){filtros_arr_main.push('Nro. Archivo: '+ $('#id_archivo').val());}
    if($('#c_tipo_registro').val() !== ''){filtros_arr_main.push('Tipo de Registro: '+ $('#c_tipo_registro').val());}
    if($('#n_total_debito').val() !== ''){filtros_arr_main.push('Total Débito: '+ ($('#n_total_debito').val()).replace(/\./g, '').replace(',', '.'));}
    if($('#f_proceso').val() !== ''){filtros_arr_main.push('F. Proceso: '+ $('#f_proceso').val());}
    if($('#f_acreditacion').val() !== ''){filtros_arr_main.push('F. Acreditación MB: '+ $('#f_acreditacion').val());}
    if($('#n_total_credito').val() !== ''){filtros_arr_main.push('Total Crédito: '+ ($('#n_total_credito').val()).replace(/\./g, '').replace(',', '.'));}
    if($('#c_organismo_recaudador').val() !== ''){filtros_arr_main.push('Organismo Recaudador: '+ $('#c_organismo_recaudador').val());}
    if($('#c_banco_administrador').val() !== ''){filtros_arr_main.push('Banco Administrador: '+ $('#c_banco_administrador').val());}
    if($('#n_cantidad_detalle').val() !== ''){filtros_arr_main.push('Cant. Registros Detalle: '+ $('#n_cantidad_detalle').val());}
    if($('#f_concil_art').val() !== ''){filtros_arr_main.push('F. Conciliación ART: '+ $('#f_concil_art').val());}
    if($('#fecha_acre_art').val() !== ''){filtros_arr_main.push('F. Acreditación ART: '+ $('#fecha_acre_art').val());}
    if($('#fecha_acre_desde').val() !== ''){filtros_arr_main.push('F. Acreditación (Desde): '+ $('#fecha_acre_desde').val());}
    if($('#fecha_acre_hasta').val() !== ''){filtros_arr_main.push('F. Acreditación (Hasta): '+ $('#fecha_acre_hasta').val());}

    filtros_no_nativos_ar['main_grid_cabecera_archivo'] = filtros_arr_main;
    filtros_no_nativos_ar['main_grid_detalle_archivo'] = filtros_arr_main;
    filtros_no_nativos_ar['main_grid_totales_sifere'] = filtros_arr_main;
    filtros_no_nativos_ar['main_grid_grilla_excel_mb'] = filtros_arr_main;
    filtros_no_nativos_ar['main_grid_grilla_excel_art'] = filtros_arr_main;

    setea_parametros('#main_grid_cabecera_archivo',{
        ':p_id_archivo':$('#id_archivo').val(),
        ':p_c_tipo_registro':$('#c_tipo_registro').val(),
        ':p_n_total_debito':($('#n_total_debito').val()).replace(/\./g, '').replace(',', '.'),
        ':p_f_proceso':$('#f_proceso').val(),
        ':p_f_acreditacion':$('#f_acreditacion').val(),
        ':p_n_total_credito':($('#n_total_credito').val()).replace(/\./g, '').replace(',', '.'),
        ':p_c_organismo_recaudador':$('#c_organismo_recaudador').val(),
        ':p_c_banco_administrador':$('#c_banco_administrador').val(),
        ':p_n_cantidad_detalle':$('#n_cantidad_detalle').val(),
        ':p_f_concil_art':$('#f_concil_art').val(),
        ':p_fecha_acre_art':$('#fecha_acre_art').val(),
        ':p_fecha_acre_desde':$('#fecha_acre_desde').val(),
        ':p_fecha_acre_hasta':$('#fecha_acre_hasta').val()
    });

    document.getElementById('grid_cabecera_archivo').style.display="block";
    $(window).resize();
}

function ocultar_grillas(){
    document.getElementById('grid_detalle_archivo').style.display="none";
    document.getElementById('grid_cabecera_archivo').style.display="none";
    //document.getElementById('grid_cabecera_archivo_art').style.display="none";
    document.getElementById('grid_totales_sifere').style.display="none";
}

function bloquea_campos(){
    $('#id_archivo').prop('disabled', true);
    $('#c_tipo_registro').prop('disabled', true);
    $('#n_total_debito').prop('disabled', true);
    $('#f_proceso').prop('disabled', true);
    $('#f_acreditacion').prop('disabled', true);
    $('#n_total_credito').prop('disabled', true);
    $('#c_organismo_recaudador').prop('disabled', true);
    $('#c_banco_administrador').prop('disabled', true);
    $('#n_cantidad_detalle').prop('disabled', true);
    $('#f_concil_art').prop('disabled', true);
    $('#fecha_acre_art').prop('disabled', true);
    $('#btn_buscar').prop('disabled', true);
}

function limpiar_grillas(){
    $('#main_grid_cabecera_archivo').jqGrid('clearGridData');
    $('#main_grid_detalle_archivo').jqGrid('clearGridData');
    $('#main_grid_totales_sifere').jqGrid('clearGridData');
    $('#main_grid_grilla_excel_mb').jqGrid('clearGridData');
    $('#main_grid_grilla_excel_art').jqGrid('clearGridData');
}