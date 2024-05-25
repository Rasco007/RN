function inicializarEventos() {

    document.getElementById('div_grid_boletas').style.display="none";
    document.getElementById('div_grid_boletas_pagas').style.display="none";
    document.getElementById('div_grid_boletas_impagas').style.display="none";
    document.getElementById('div_grid_boletas_sellos').style.display="none";
    document.getElementById('div_grid_boletas_tasa_externa').style.display="none";
    document.getElementById('div_detalle_boletas').style.display="none";
    document.getElementById('div_detalle_boletas_sellos').style.display="none";
    document.getElementById('div_tabla_detalle_dbl_click_boleta_sellos').style.display="none";
    document.getElementById('div_tabla_detalle_dbl_click_boleta_sellos_sin_obj_hecho').style.display="none";

    $('#n_cuit').mask("99-99999999-9");

    $('#lupa_d_denominacion').hide();
    $('#mascara_lupa_c_tributo').hide();
    $('#mascara_lupa_c_tipo').hide();
    $('#lupa_obj_hecho').hide();

    $('#mascara_lupa_c_tipo').hide();
    $('#mascara_lupa_c_tributo').hide();

    $('#d_objeto_hecho').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 2) {
            $('#lupa_obj_hecho').show().css('display', 'table-cell');
            $('#mascara_lupa_obj_hecho').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_obj_hecho').hide();
            $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 2) {
            $('#lupa_obj_hecho').hide();
            $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
        }
    });

    $('#desc_denom').on('keydown focusout', function (event) {
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

    $('#n_boleta').focusout(function(){
        if($('#n_boleta').val()!==''){
            //Busco tasa externa
            busco_tasa_externa();
        }
    });

    $('#c_tributo, #d_objeto_hecho').on('focusout', function() {
        var c_tributo = $('#c_tributo').val();
        var d_objeto_hecho = $('#d_objeto_hecho').val();
        var n_cuit = $('#n_cuit').val();
        if (c_tributo && (d_objeto_hecho !== '') && !n_cuit) {
            autocompleta_por_tributo_y_objeto();
        }
    });

    $('#btn_consulta').click(function(){

        limpiar_grillas();

        var c_tributo = $('#c_tributo').val();
        var d_objeto_hecho = $('#d_objeto_hecho').val();

        if (!$('#id_contribuyente').val() && (!$('#c_tributo').val() || !$('#d_objeto_hecho').val()) && !$('#n_boleta').val()){
            mostrar_cuadro('E', 'Error', 'El campo Contribuyente ó (Tributo y Objeto/Hecho) ó Nro. de boleta no puede quedar vacío.',
                null,null,400);
            return;
        }

        if (!(document.getElementById('check_boletas_pagas').checked) && !(document.getElementById('check_boletas_impagas').checked)){
            mostrar_cuadro('E', 'Error', 'Debe seleccionar si desea mostrar Boletas Pagas, Impagas o ambas.',
                null,null,400);
            return;
        }

        if (c_tributo && d_objeto_hecho) {
            ocultar_botones();
            if (c_tributo === '50'){
                es_migrado();
            }else{
                buscar_boletas();
            }
        }


        if ($('#n_boleta').val()){
            ocultar_botones();

            if ($('#tasas_ext').val() === 'N'){
                //GRILLA busca_boletas
                buscar_boletas();
                return;
            }

            if ($('#tasas_ext').val() === 'S' &&
                (document.getElementById('check_boletas_pagas').checked) &&
                (document.getElementById('check_boletas_impagas').checked)){
                //GRILLA busca_boletas_tasa_externa
                buscar_boletas_tasa_externa();
                return;
            }
        }


        ocultar_botones();

        //Boletas Pagas
        if ((document.getElementById('check_boletas_pagas').checked) && !(document.getElementById('check_boletas_impagas').checked)){

            filtros_no_nativos = [];
            filtros_arr_main = [];
            if($('#n_cuit').val() !== ''){filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());}
            if($('#desc_denom').val() !== ''){filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());}
            if($('#c_tributo').val() !== ''){filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());}
            if($('#d_objeto_hecho').val() !== ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());}
            if($('#c_tipo').val() !== ''){filtros_arr_main.push('Tipo: '+ $('#c_tipo_documento').val());}
            if($('#n_boleta').val() !== ''){filtros_arr_main.push('Nro. Boleta: '+ $('#n_boleta').val());}

            filtros_no_nativos_ar['main_grid_boletas_pagas'] = filtros_arr_main;

            setea_parametros('#main_grid_boletas_pagas',{
                ':p_c_tributo':$('#c_tributo').val(),
                ':p_obj_hecho':$('#d_objeto_hecho').val(),
                ':p_id_boleta':$('#n_boleta').val(),
                ':p_id_contribuyente':$('#id_contribuyente').val(),
                ':p_m_tipo':$('#c_tipo').val()
            });

            document.getElementById('div_grid_boletas').style.display="none";
            document.getElementById('div_grid_boletas_pagas').style.display="block";
            document.getElementById('div_grid_boletas_impagas').style.display="none";
            document.getElementById('div_detalle_boletas').style.display="block";
            document.getElementById('div_detalle_boletas_sellos').style.display="none";

            return;
        }

        //Boletas Imagas
        if (!(document.getElementById('check_boletas_pagas').checked) && (document.getElementById('check_boletas_impagas').checked)){

            filtros_no_nativos = [];
            filtros_arr_main = [];
            if($('#n_cuit').val() !== ''){filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());}
            if($('#desc_denom').val() !== ''){filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());}
            if($('#c_tributo').val() !== ''){filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());}
            if($('#d_objeto_hecho').val() !== ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());}
            if($('#c_tipo').val() !== ''){filtros_arr_main.push('Tipo: '+ $('#c_tipo_documento').val());}
            if($('#n_boleta').val() !== ''){filtros_arr_main.push('Nro. Boleta: '+ $('#n_boleta').val());}

            filtros_no_nativos_ar['main_grid_boletas_impagas'] = filtros_arr_main;

            setea_parametros('#main_grid_boletas_impagas',{
                ':p_c_tributo':$('#c_tributo').val(),
                ':p_obj_hecho':$('#d_objeto_hecho').val(),
                ':p_id_boleta':$('#n_boleta').val(),
                ':p_id_contribuyente':$('#id_contribuyente').val(),
                ':p_m_tipo':$('#c_tipo').val()
            });

            document.getElementById('div_grid_boletas').style.display="none";
            document.getElementById('div_grid_boletas_pagas').style.display="none";
            document.getElementById('div_grid_boletas_impagas').style.display="block";
            document.getElementById('div_detalle_boletas').style.display="block";
            document.getElementById('div_detalle_boletas_sellos').style.display="none";

            return;
        }

        if ((document.getElementById('check_boletas_pagas').checked) && (document.getElementById('check_boletas_impagas').checked)){

            filtros_no_nativos = [];
            filtros_arr_main = [];
            if($('#n_cuit').val() !== ''){filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());}
            if($('#desc_denom').val() !== ''){filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());}
            if($('#c_tributo').val() !== ''){filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());}
            if($('#d_objeto_hecho').val() !== ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());}
            if($('#c_tipo').val() !== ''){filtros_arr_main.push('Tipo: '+ $('#c_tipo_documento').val());}
            if($('#n_boleta').val() !== ''){filtros_arr_main.push('Nro. Boleta: '+ $('#n_boleta').val());}

            filtros_no_nativos_ar['main_grid_boletas'] = filtros_arr_main;

            //Traigo todas
            setea_parametros('#main_grid_boletas',{
                ':p_c_tributo':$('#c_tributo').val(),
                ':p_obj_hecho':$('#d_objeto_hecho').val(),
                ':p_id_boleta':$('#n_boleta').val(),
                ':p_id_contribuyente':$('#id_contribuyente').val(),
                ':p_m_tipo':$('#c_tipo').val()
            });

            document.getElementById('div_grid_boletas').style.display="block";
            document.getElementById('div_grid_boletas_pagas').style.display="none";
            document.getElementById('div_grid_boletas_impagas').style.display="none";
            document.getElementById('div_detalle_boletas').style.display="block";
            document.getElementById('div_detalle_boletas_sellos').style.display="none";

            return;
        }

    })

    $('#btn_limpiar').click(function(){

        limpiar_grillas();
        ocultar_grillas();

        $('#n_cuit').attr('disabled', false);
        $('#desc_denom').attr('disabled', false);
        $('#c_tributo').attr('disabled', false);
        $('#d_objeto_hecho').attr('disabled', false);
        $('#c_tipo').attr('disabled', false);
        $('#n_boleta').attr('disabled', false);
        $('#check_boletas_pagas').attr('disabled', false);
        $('#check_boletas_impagas').attr('disabled', false);

        $('#lupa_c_tributo').show().css('display', 'table-cell');
        $('#mascara_lupa_c_tributo').hide();
        $('#lupa_c_tipo').show().css('display', 'table-cell');
        $('#mascara_lupa_c_tipo').hide();
        $('#lupa_d_denominacion').hide();
        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');      

        $('#id_contribuyente').val(null);
        $('#n_cuit').val(null);
        $('#desc_denom').val(null);
        $('#c_tributo').val(null);
        $('#d_tributo').val(null);
        $('#d_objeto_hecho').val(null);
        $('#c_tipo').val(null);
        $('#d_tipo').val(null);
        $('#n_boleta').val(null);
        $('#btn_consulta').attr('disabled', false);

    });

    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() !== ''){
            if( limpia_cuit($('#n_cuit').val()).length === 11 ){
                autocompleta_contrib_por_cuit();
            }else{
                mostrar_cuadro('E', 'Error', 'CUIT no valido.');
            }
        }
    });

    $('#btn_volver_detalle').click(function(){
        $('#detalles_boleta_modal').modal('hide');
        $('#banelco').val(null);
        $('#link').val(null);
        $('#leyenda').val(null);
        $('#i_total').val(null);
        $('#f_emision').val(null);
        $('#f_vto').val(null);
        $('#detalle_dbl_click_boleta_grid').jqGrid('clearGridData');
    });

    $('#btn_volver_detalle_sellos').click(function(){
        $('#detalles_boleta_sellos_modal').modal('hide');
        $('#leyenda_sellos').val(null);
        $('#i_total_sellos').val(null);
        $('#f_emision_sellos').val(null);
        $('#f_vto_sellos').val(null);
        $('#detalle_dbl_click_boleta_sellos_grid').jqGrid('clearGridData');
    });

    $('#btn_volver_mails').click(function(){
        $('#mails_grid_modal').modal('hide');
        $('#mails_grid').jqGrid('clearGridData');
    });
}

