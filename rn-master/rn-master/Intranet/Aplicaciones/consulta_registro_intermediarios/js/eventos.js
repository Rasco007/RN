function inicializarEventos(){


    $('#separador').val(',');

    //PRC_BORRAR_TMP_CONS_REG_INTERM
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{
            "id_menu":v_id_menu,
            "n_orden":1
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){

            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });

    $('#f_desde').datepicker("option",'minDate',fecha_hoy).change(function () {  
        if($('#f_desde').val() && $('#f_hasta').val()){
            if ($.datepicker.parseDate('dd/mm/yy', $('#f_desde').val()) > $.datepicker.parseDate('dd/mm/yy', $('#f_hasta').val())){             
                mostrar_error('La fecha Vigencia Desde no puede ser mayor a la fecha Vigencia Hasta', 'E', true);                         
                return;         
            }    
        }});

    $('#f_hasta').datepicker("option",'minDate',fecha_hoy).change(function () {   
        if($('#f_desde').val() && $('#f_hasta').val()){
            if ($.datepicker.parseDate('dd/mm/yy', $('#f_hasta').val()) < $.datepicker.parseDate('dd/mm/yy', $('#f_desde').val())){             
                mostrar_error('La fecha Vigencia Desde no puede ser mayor a la fecha Vigencia Hasta', 'E', true);              
                return;         
            }
        }});
    
    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    $('.numerico').keypress(function(tecla){
        if(tecla.charCode<48 || tecla.charCode>57){
            if(tecla.charCode !== 44 && tecla.charCode !== 46){
                return false;
            }
        }
    });

    $("#n_cuit_intermed").mask("99-99999999-9");
    $("#n_cuit_contrib").mask("99-99999999-9");

    $('#lupa_d_denominacion').hide();
    $('#lupa_d_denominacion_contrib').hide();

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

    $('#d_denominacion_contrib').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            $('#lupa_d_denominacion_contrib').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion_contrib').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_d_denominacion_contrib').hide();
            $('#mascara_lupa_d_denominacion_contrib').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 4) {
            $('#lupa_d_denominacion_contrib').hide();
            $('#mascara_lupa_d_denominacion_contrib').show().css('display', 'table-cell');
        }
    });

    $('#btn_limpiar').click(function(){
        v_consulta_general = false;
        $('#btn_buscar').attr('disabled', false);
        limpiar_todo();
        $('#lupa_d_denominacion').hide();
        $('#lupa_d_denominacion_contrib').hide();
        $('#mascara_lupa_d_denominacion').show();
        $('#mascara_lupa_d_denominacion_contrib').show();
        limpiar_filtros_ingresados();
    });

    $('#btn_buscar').click(function(){

        filtros_no_nativos = [];
        filtros_arr_main = [];

        if($('#d_denominacion').val() != ''){
            filtros_arr_main.push('Denominación: '+ $('#d_denominacion').val());
        }
        if($('#n_cuit_intermed').val() != ''){
            filtros_arr_main.push('CUIT: '+ $('#n_cuit_intermed').val());
        }
        if($('#n_documento').val() != ''){
            filtros_arr_main.push('Documento: '+ $('#n_documento').val());
        }
        if($('#d_objeto_hecho').val() != ''){
            filtros_arr_main.push('Nro. Inscripción: '+ $('#d_objeto_hecho').val());
        }
        if($('#c_tipo_imp').val() != ''){
            filtros_arr_main.push('Tipo Imponible: '+ $('#c_tipo_imp').val() + ' - '+$('#d_tipo_imp').val());
        }
        if($('#c_tributo').val() != ''){
            filtros_arr_main.push('Tributo: '+ $('#c_tributo').val() + ' - '+$('#d_tributo').val());
        }
        filtros_no_nativos_ar['main_grid'] = filtros_arr_main;
        v_consulta_general = es_consulta_general();
        obtener_filtros_ingresados();

        $('#btn_buscar').attr('disabled', true);

        cargar_tmp_grilla();

        bloquear_filtros();
    })

   

    $('#btn_exportar_actual').click(function(){
        let cant_filas = $('#main_grid').getGridParam('records');
        
        if(cant_filas > 0){
            let separador = $('#separador').val();
            if(separador == ';'){
                separador = 'punto_coma';
            } 
            
            let params = {
                'p_n_id_menu':v_id_menu,
                'p_tipo_consulta': 'ACTUAL', 
                'p_separador': separador,
                'p_n_cuit_interm': limpia_cuit($('#n_cuit_intermed').val()),
                'p_d_denom_interm': $('#d_denominacion').val(),
                'p_n_doc_interm': $('#n_documento').val().replace(/\./g, ''),
                'p_c_tributo_interm': $('#c_tributo').val(),
                'p_c_tipo_imp_interm': $('#c_tipo_imp').val(),
                'p_c_tipo_doc': $('#c_tipo_doc').val(),
                'p_n_cuit_contrib': limpia_cuit($('#n_cuit_contrib').val()),
                'p_d_denom_contrib': $('#d_denominacion_contrib').val(),
                'p_d_obj_hecho_contrib': $('#d_objeto_hecho_contrib').val(),
                'p_existia_alta': $('#existia_alta').val(),
                'p_tributo_contrib':  $('#c_tributo_contrib').val(),
                'p_c_provincia': $('#c_provincia').val(),
                'p_d_localidad': $('#d_localidad').val(),
                'p_c_postal': $('#c_postal').val(),
                'p_d_calle': $('#d_calle').val(),
                'p_n_numero': $('#n_numero').val(),
                'p_piso': $('#piso').val(),
                'p_depto': $('#depto').val(),
                'p_email': $('#d_email').val(),
                'p_n_telefono': $('#n_telefono').val(),
                'p_f_vig_desde': $('#f_desde').val(),
                'p_f_vig_hasta': $('#f_hasta').val(),
                'p_cta_contable': $('#cta_contable').val(),
                'p_orden': $('#n_orden').val(),
                'p_c_tipo_doc_hab': $('#c_tipo_doc_hab').val()
            };
            post_to_url(BASEPATH_ENTORNO+'Aplicaciones/consulta_registro_intermediarios/php/armar_csv_interm.php', params ,'_blank', 'POST');
            mostrar_cuadro('S', 'Éxito', 'Se generó el archivo registro_intermediarios.csv');

        } else{
            mostrar_cuadro('I', 'Información', 'Debe Ingresar una consulta para exportar');
            return;
        }
    })

    $('#btn_exportar_todo_reg_interm').click(function(){
        if($('#main_grid').getGridParam('records') > 0){
            let separador = $('#separador').val();
            if(separador == ';'){
                separador = 'punto_coma';
            } 
            
            let params = {'p_n_id_menu':v_id_menu, 'p_tipo_consulta': 'TODOS', 'p_separador': separador};

            post_to_url(BASEPATH_ENTORNO+'Aplicaciones/consulta_registro_intermediarios/php/armar_csv_interm.php', params ,'_blank', 'POST');

            mostrar_cuadro('S', 'Éxito', 'Se generó el archivo registro_intermediarios_todos.csv');

            //PRC_BORRAR_TMP_CONS_REG_INTERM
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                "id_menu":v_id_menu,
                "n_orden":1
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                    
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
        } else{
            mostrar_cuadro('I', 'Información', 'Debe Ingresar una consulta para exportar');
            return;
        }
    });
}