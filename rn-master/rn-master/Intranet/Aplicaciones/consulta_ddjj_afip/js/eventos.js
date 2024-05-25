function inicializarEventos(){
    if(p_cuit){
        $('#n_cuit').val(p_cuit);
        $('#d_denominacion').val(p_deno);
        $('#btn_legajo_siat').prop('disabled', true);
        $('#btn_padron_afip').prop('disabled', true);
        if(p_volver){
            $('#btn_volver').hide();
        }else{
            $('#btn_volver').show();
        }
        
    } else{
        $('#btn_legajo_siat').prop('disabled', false);
        $('#btn_padron_afip').prop('disabled', false);
    }

    $('#lupa_d_denominacion').hide();
    $("#n_cuit").mask("99-99999999-9");
    $("#n_cuit_reemp").mask("99-99999999-9");

    $('#d_denominacion').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 4) {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        }
    });

    $('#btn_buscar').click(function(){
        
        if($('#n_cuit').val()){
            $('#main').procOverlay({visible:true});
            setea_parametros('#iva_grid', {':p_n_cuit': limpia_cuit($('#n_cuit').val())});
            $('#btn_buscar').prop('disabled',true);
        } else{
            mostrar_cuadro('I', 'Información', 'Debe ingresar CUIT o Razón para realizar la búsqueda');
        };

        filtros_no_nativos_ar['iva_grid'] = [];
        if($('#n_cuit').val() != ''){
            filtros_no_nativos_ar['iva_grid'].push('Cuit: ' + $('#n_cuit').val());
        }
        if($('#d_denominacion').val() != ''){
            filtros_no_nativos_ar['iva_grid'].push('Razon: ' + $('#d_denominacion').val());
        }
        if($('#n_cuit_reemp').val() != ''){
            filtros_no_nativos_ar['iva_grid'].push('CUIT reemplazo: ' + $('#n_cuit_reemp').val());
        }

    });

    $('#btn_limpiar').click(function(){
        desbloquear_filtros();
        deshabilitar_botones();

        $('#btn_buscar').prop('disabled',false);

        $('#n_cuit').val(null);
        $('#d_denominacion').val(null);
        $('#n_cuit_reemp').val(null);

        $('#iva_grid').clearGridData();
        $('#iva_web_grid').clearGridData();
        $('#iva_web_ii_grid').clearGridData();
        $('#empleadores_grid').clearGridData();
        $('#ganancias_pf_grid').clearGridData();
        $('#ganancias_soc_grid').clearGridData();
        $('#iva_simp_grid').clearGridData();
        $('#libro_iva_grid').clearGridData();

        $('#bloque_libro_iva').prop('hidden', true);
        $('#bloque_iva_web').prop('hidden', true);
        $('#bloque_iva_simp').prop('hidden', true);
        $('#bloque_iva_web_ii').prop('hidden', true);
        $('#bloque_ganancias_pf').prop('hidden', true);
        $('#bloque_ganancias_soc').prop('hidden', true);
        //$('#bloque_iva').prop('hidden', true);
        $('#bloque_empleadores').prop('hidden', true);
        $('#bloque_btns').prop('hidden', true);

        $('#lupa_d_denominacion').hide();
        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');

        

        v_solapa_actual = null;
    });

    $('#btn_volver').click(function(){
        post_to_url('consulta_padron_AFIP.php', {
            'p_n_id_menu': 100162,
            'p_n_cuit': $('#n_cuit').val(),
        },'');
    });

    $('#btn_iva').click(function(){
        $('#main').procOverlay({visible:true});
        setea_parametros('#iva_grid', {':p_n_cuit': limpia_cuit($('#n_cuit').val())});

        if($('#iva_grid').getGridParam('records') == 0){
            $("#btn_exportar_excel").hide();
        }else{
            $("#btn_exportar_excel").show();
        }

        filtros_no_nativos_ar['iva_grid'] = [];
        if($('#n_cuit').val() != ''){
            filtros_no_nativos_ar['iva_grid'].push('Cuit: ' + $('#n_cuit').val());
        }
        if($('#d_denominacion').val() != ''){
            filtros_no_nativos_ar['iva_grid'].push('Razon: ' + $('#d_denominacion').val());
        }
        if($('#n_cuit_reemp').val() != ''){
            filtros_no_nativos_ar['iva_grid'].push('CUIT reemplazo: ' + $('#n_cuit_reemp').val());
        }

    });

    $('#btn_empleadores').click(function(){
        $('#main').procOverlay({visible:true});
        setea_parametros('#empleadores_grid', {':p_n_cuit': limpia_cuit($('#n_cuit').val())});

        if($('#empleadores_grid').getGridParam('records') == 0){
            $("#btn_exportar_excel").hide();
        }else{
            $("#btn_exportar_excel").show();
        }

        filtros_no_nativos_ar['empleadores_grid'] = [];
        if($('#n_cuit').val() != ''){
            filtros_no_nativos_ar['empleadores_grid'].push('Cuit: ' + $('#n_cuit').val());
        }
        if($('#d_denominacion').val() != ''){
            filtros_no_nativos_ar['empleadores_grid'].push('Razon: ' + $('#d_denominacion').val());
        }
        if($('#n_cuit_reemp').val() != ''){
            filtros_no_nativos_ar['empleadores_grid'].push('CUIT reemplazo: ' + $('#n_cuit_reemp').val());
        }
    });

    $('#btn_ganancias_pf').click(function(){
        $('#main').procOverlay({visible:true});
        setea_parametros('#ganancias_pf_grid', {':p_n_cuit': limpia_cuit($('#n_cuit').val())});

        if($('#ganancias_pf_grid').getGridParam('records') == 0){
            $("#btn_exportar_excel").hide();
        }else{
            $("#btn_exportar_excel").show();
        }

        filtros_no_nativos_ar['ganancias_pf_grid'] = [];
        if($('#n_cuit').val() != ''){
            filtros_no_nativos_ar['ganancias_pf_grid'].push('Cuit: ' + $('#n_cuit').val());
        }
        if($('#d_denominacion').val() != ''){
            filtros_no_nativos_ar['ganancias_pf_grid'].push('Razon: ' + $('#d_denominacion').val());
        }
        if($('#n_cuit_reemp').val() != ''){
            filtros_no_nativos_ar['ganancias_pf_grid'].push('CUIT reemplazo: ' + $('#n_cuit_reemp').val());
        }
    });

    $('#btn_ganancias_soc').click(function(){
        $('#main').procOverlay({visible:true});
        setea_parametros('#ganancias_soc_grid', {':p_n_cuit': limpia_cuit($('#n_cuit').val())});

        if($('#ganancias_soc_grid').getGridParam('records') == 0){
            $("#btn_exportar_excel").hide();
        }else{
            $("#btn_exportar_excel").show();
        }

        filtros_no_nativos_ar['ganancias_pf_grid'] = [];
        if($('#n_cuit').val() != ''){
            filtros_no_nativos_ar['ganancias_pf_grid'].push('Cuit: ' + $('#n_cuit').val());
        }
        if($('#d_denominacion').val() != ''){
            filtros_no_nativos_ar['ganancias_pf_grid'].push('Razon: ' + $('#d_denominacion').val());
        }
        if($('#n_cuit_reemp').val() != ''){
            filtros_no_nativos_ar['ganancias_pf_grid'].push('CUIT reemplazo: ' + $('#n_cuit_reemp').val());
        }
    });

    $('#btn_iva_web').click(function(){
        $('#main').procOverlay({visible:true});
        setea_parametros('#iva_web_grid', {':p_n_cuit': limpia_cuit($('#n_cuit').val())});

        if($('#iva_web_grid').getGridParam('records') == 0){
            $("#btn_exportar_excel").hide();
        }else{
            $("#btn_exportar_excel").show();
        }

        filtros_no_nativos_ar['iva_web_grid'] = [];
        if($('#n_cuit').val() != ''){
            filtros_no_nativos_ar['iva_web_grid'].push('Cuit: ' + $('#n_cuit').val());
        }
        if($('#d_denominacion').val() != ''){
            filtros_no_nativos_ar['iva_web_grid'].push('Razon: ' + $('#d_denominacion').val());
        }
        if($('#n_cuit_reemp').val() != ''){
            filtros_no_nativos_ar['iva_web_grid'].push('CUIT reemplazo: ' + $('#n_cuit_reemp').val());
        }
    });

    $('#btn_iva_web_ii').click(function(){
        $('#main').procOverlay({visible:true});
        setea_parametros('#iva_web_ii_grid', {':p_n_cuit': limpia_cuit($('#n_cuit').val())});

        if($('#iva_web_ii_grid').getGridParam('records') == 0){
            $("#btn_exportar_excel").hide();
        }else{
            $("#btn_exportar_excel").show();
        }

        filtros_no_nativos_ar['iva_web_ii_grid'] = [];
        if($('#n_cuit').val() != ''){
            filtros_no_nativos_ar['iva_web_ii_grid'].push('Cuit: ' + $('#n_cuit').val());
        }
        if($('#d_denominacion').val() != ''){
            filtros_no_nativos_ar['iva_web_ii_grid'].push('Razon: ' + $('#d_denominacion').val());
        }
        if($('#n_cuit_reemp').val() != ''){
            filtros_no_nativos_ar['iva_web_ii_grid'].push('CUIT reemplazo: ' + $('#n_cuit_reemp').val());
        }
    });

    $('#btn_iva_simp').click(function(){
        $('#main').procOverlay({visible:true});
        setea_parametros('#iva_simp_grid', {':p_n_cuit': limpia_cuit($('#n_cuit').val())});

        if($('#iva_simp_grid').getGridParam('records') == 0){
            $("#btn_exportar_excel").hide();
        }else{
            $("#btn_exportar_excel").show();
        }

        

        filtros_no_nativos_ar['iva_simp_grid'] = [];
        if($('#n_cuit').val() != ''){
            filtros_no_nativos_ar['iva_simp_grid'].push('Cuit: ' + $('#n_cuit').val());
        }
        if($('#d_denominacion').val() != ''){
            filtros_no_nativos_ar['iva_simp_grid'].push('Razon: ' + $('#d_denominacion').val());
        }
        if($('#n_cuit_reemp').val() != ''){
            filtros_no_nativos_ar['iva_simp_grid'].push('CUIT reemplazo: ' + $('#n_cuit_reemp').val());
        }
    });

    $('#btn_libro_iva').click(function(){
        $('#main').procOverlay({visible:true});
        setea_parametros('#libro_iva_grid', {':p_n_cuit': limpia_cuit($('#n_cuit').val())});

        if($('#libro_iva_grid').getGridParam('records') == 0){
            $("#btn_exportar_excel").hide();
        }else{
            $("#btn_exportar_excel").show();
        }

        filtros_no_nativos_ar['libro_iva_grid'] = [];
        if($('#n_cuit').val() != ''){
            filtros_no_nativos_ar['libro_iva_grid'].push('Cuit: ' + $('#n_cuit').val());
        }
        if($('#d_denominacion').val() != ''){
            filtros_no_nativos_ar['libro_iva_grid'].push('Razon: ' + $('#d_denominacion').val());
        }
        if($('#n_cuit_reemp').val() != ''){
            filtros_no_nativos_ar['libro_iva_grid'].push('CUIT reemplazo: ' + $('#n_cuit_reemp').val());
        }
    });

    /*$('#btn_legajo_siat').click(function(){
        post_to_url('legajo_contribuyente.php', {
            'p_id_contribuyente': $('#id_contribuyente').val(),
            'p_n_id_menu': 10932,
            'p_n_cuit':$('#n_cuit').val()
        }, 
        '_blank'
        );
    });


    /**/ 
    
    $('#btn_legajo_siat').click(function(){
        post_to_url('legajo_contribuyente.php', {
            'p_id_contribuyente': $('#id_contribuyente').val(),
            'p_n_id_menu': 10886,
            'p_n_cuit':$('#n_cuit').val(),
            'p_volver':'ddjj_afip'
        }, 
        '_blank'
        );
    });

    $('#btn_padron_afip').click(function(){
        post_to_url('consulta_padron_AFIP.php', {
            'p_n_cuit': limpia_cuit($('#n_cuit').val()),
            'p_n_id_menu': 100162
        }, 
        '_blank'
        );
    });

    $('#btn_exportar_excel').click(function(){
        let params =  {
                'p_n_id_menu':v_id_menu,
                'p_tipo_consulta': v_solapa_actual,
                'p_n_cuit': limpia_cuit($('#n_cuit').val()) 
            };
        post_to_url(BASEPATH_ENTORNO+'Aplicaciones/consulta_ddjj_afip/php/armar_csv_iva.php', params ,'_blank', 'POST');
    });

    $('#btn_exportar_todo').click(function(){
        let solapas = ['iva', 'empleadores', 'gan pf', 'gan soc', 'iva web', 'iva web ii'];

        for(let i = 0; i < solapas.length; i++){
            let params =  {
                'p_n_id_menu':v_id_menu,
                'p_tipo_consulta': solapas[i],
                'p_n_cuit': limpia_cuit($('#n_cuit').val()) 
            };
            post_to_url(BASEPATH_ENTORNO+'Aplicaciones/consulta_ddjj_afip/php/armar_csv_iva.php', params ,'_blank', 'POST');
        }
    });

    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() != ''){
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_n_cuit": limpia_cuit($('#n_cuit').val()),
                 "id_menu":v_id_menu,
                 "n_orden":0
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        $('#d_denominacion').val(data.p_d_denominacion);
                        try{
                            if( limpia_cuit($('#n_cuit').val()).length == 11 ){
                                $.ajax({
                                    type:'POST',
                                    url: "ajax_genericos/autocomplete.php",
                                    data: {oper:'3',term: limpia_cuit($('#n_cuit').val())},
                                    dataType: 'json',
                                    success: function( data ) {
                                        ajax_autocomplete = null;
                                        if(data) {
                                            $("#id_contribuyente").val(data.data_raz[0].id_contribuyente);
                                        }
                                    }
                                });
                    
                            }else{
                                $('#btn_limpiar').click();
                            }
                        }catch(err){
                        }
                    }
                    else{
                        try{
                            if( limpia_cuit($('#n_cuit').val()).length == 11 ){
                                $.ajax({
                                    type:'POST',
                                    url: "ajax_genericos/autocomplete.php",
                                    data: {oper:'3',term: limpia_cuit($('#n_cuit').val())},
                                    dataType: 'json',
                                    success: function( data ) {
                                        ajax_autocomplete = null;
                                        if(data) {
                                            $("#id_contribuyente").val(data.data_raz[0].id_contribuyente);
                                            $("#d_denominacion").val(data.data_raz[0].razon_social);
                                        }
                                    }
                                });
                    
                            }else{
                                $('#btn_limpiar').click();
                            }
                        }catch(err){
                        }
                    }
                }
            }); 
        }
    });


    
    
}





