function inicializarEventos(){
    $('#path_arch_recibido').change(function(){
            $('#ruta_archivo_recibido').val( $('#path_arch_recibido').val() );
    });

    $('#btn_selecc_archivo').click(function(){
        $('#path_arch_recibido').click();
    });

    $('#examinar_recibido').click(function(){
        $('#path_arch_recibido').click();
    });

    $('#btn_procesar_archivo').click(function(){
        procesar_archivo('LEVANTAR_CARGA_AFIP', 'path_arch_recibido', 'd_path_arch_recibido');
    })

    $('#btn_logs').click(function(){
        let row_id = $('#archivos_grid').getGridParam('selrow');
        if(!row_id){
            mostrar_cuadro('E', 'Error', 'Debe seleccionar una fila');
            return;
        } else{
            setea_parametros('#logs_grid',{':p_id_archivo': $('#archivos_grid').getCell(row_id, 'id_archivo')}); 
        }
    });

    $('#btn_volver_logs').click(function(){
        $('#logs_modal').hide();
        $('#logs_grid').clearGridData();
    });

    $('#btn_f711').click(function(){
        filtros_no_nativos_ar = [];
        filtros_archivos = [];
    
        filtros_archivos.push('Tipo: '+ 'GAPFIS');

        filtros_no_nativos_ar['archivos_grid'] = filtros_archivos;
        setea_parametros('#archivos_grid',{':p_filtro': 'GAPFIS'});
    });

    $('#btn_f731').click(function(){
        filtros_no_nativos_ar = [];
        filtros_archivos = [];
    
        filtros_archivos.push('Tipo: '+ 'IVA');

        filtros_no_nativos_ar['archivos_grid'] = filtros_archivos;
        setea_parametros('#archivos_grid',{':p_filtro': 'IVA'});
    });

    $('#btn_f731_alic').click(function(){
        filtros_no_nativos_ar = [];
        filtros_archivos = [];
    
        filtros_archivos.push('Tipo: '+ 'IVA_ALIC');

        filtros_no_nativos_ar['archivos_grid'] = filtros_archivos;
        setea_parametros('#archivos_grid',{':p_filtro': 'IVA_ALIC'});
    });

    $('#btn_f731_agro').click(function(){
        filtros_no_nativos_ar = [];
        filtros_archivos = [];
    
        filtros_archivos.push('Tipo: '+ 'IVA_AGRO');

        filtros_no_nativos_ar['archivos_grid'] = filtros_archivos;
        setea_parametros('#archivos_grid',{':p_filtro': 'IVA_AGRO'});
    });

    $('#btn_f2002').click(function(){
        filtros_no_nativos_ar = [];
        filtros_archivos = [];
    
        filtros_archivos.push('Tipo: '+ 'IVA_WEB');

        filtros_no_nativos_ar['archivos_grid'] = filtros_archivos;
        setea_parametros('#archivos_grid',{':p_filtro': 'IVA_WEB'});
    });

    $('#btn_f2082').click(function(){
        filtros_no_nativos_ar = [];
        filtros_archivos = [];
    
        filtros_archivos.push('Tipo: '+ 'IVA_WEB_82');

        filtros_no_nativos_ar['archivos_grid'] = filtros_archivos;
        setea_parametros('#archivos_grid',{':p_filtro': 'IVA_WEB_82'});
    });

    $('#btn_f2083').click(function(){
        filtros_no_nativos_ar = [];
        filtros_archivos = [];
    
        filtros_archivos.push('Tipo: '+ 'IVA_WEB_83');

        filtros_no_nativos_ar['archivos_grid'] = filtros_archivos;
        setea_parametros('#archivos_grid',{':p_filtro': 'IVA_WEB_83'});
    });

    $('#btn_c_raad').click(function(){
        filtros_no_nativos_ar = [];
        filtros_archivos = [];
    
        filtros_archivos.push('Tipo: '+ 'C-RAAD');

        filtros_no_nativos_ar['archivos_grid'] = filtros_archivos;
        setea_parametros('#archivos_grid',{':p_filtro': 'C-RAAD'});
    });

    $('#btn_c_prov').click(function(){
        filtros_no_nativos_ar = [];
        filtros_archivos = [];
    
        filtros_archivos.push('Tipo: '+ 'C-PROV');

        filtros_no_nativos_ar['archivos_grid'] = filtros_archivos;
        setea_parametros('#archivos_grid',{':p_filtro': 'C-PROV'});
    });

    $('#btn_todos').click(function(){
        filtros_no_nativos_ar = [];
        filtros_archivos = [];
    
        filtros_archivos.push('Tipo: '+ 'Todos');

        filtros_no_nativos_ar['archivos_grid'] = filtros_archivos;
        setea_parametros('#archivos_grid',{':p_filtro': '%'});
    });

    $('#btn_error').click(function(){
        $('#error_modal').show();
    })

    $('#btn_volver_error').click(function(){
        $('#error_modal').hide();
    })
}
