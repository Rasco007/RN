function init_eventos() {
    $('#mascara_lupa_d_denominacion').show();
    $('#desc_denom_filtro_lupa').hide();
    $('#c_cbu').mask('9999999999999999999999');

    if(p_modo=='C'){
        $("#consulta_grilla").show();
        
        
    }
    else{
        $("#grilla_principal").show();
        
    }
    
    
    $('#sData').click(function () {
        var c_banco = $('#c_banco').val();
        var d_banco = $('#d_banco').val();
        console.log('estoy en banco');
        if(c_banco != ''){
            if(d_banco == ''){
                mostrar_cuadro('E', 'Error', 'La descripción del Banco no puede quedar vacía.');
                return;

            }
        }
    });

    $('#desc_denom_filtro').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            $('#desc_denom_filtro_lupa').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
        } else if (event.type === 'keydown') {
            $('#desc_denom_filtro_lupa').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 4) {
            $('#desc_denom_filtro_lupa').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell'); 
        }
    });


    $('#lupa_obj_hecho_filtro').hide();

    //Como es el único medio, lo seteamos por defecto para facilitar al usuario
    $("#c_medio_pago").val(10);
    $("#d_medio_pago").val('DEBITO DIRECTO');

    $("#c_banco").mask("9999");
    $("#c_producto").mask("9999");
    $("#c_sucursal").mask("9999");
    $('#n_cuit').mask('99-99999999-9');
    $('#n_cuit_filtro').mask('99-99999999-9');
    $('#n_cuit_cbu').mask('99-99999999-9');
    $('#c_cbu').mask('9999999999999999999999');
    

    $('#d_objeto_hecho_filtro').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 2) {
            $('#lupa_obj_hecho_filtro').show().css('display', 'table-cell');
            $('#mascara_lupa_obj_hecho_filtro').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_obj_hecho_filtro').hide();
            $('#mascara_lupa_obj_hecho_filtro').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 2) {
            $('#lupa_obj_hecho_filtro').hide();
            $('#mascara_lupa_obj_hecho_filtro').show().css('display', 'table-cell');
        }
    });

    /*$('#c_tributo, #d_objeto_hecho').focusout(function(){
        if ($('#d_objeto_hecho').val() !== '' && $('#c_tributo').val() !== ''){
            autocompleta_contribuyente();
        }
    });*/

    $('#n_cuit_filtro').focusout(function(){
        if ($('#n_cuit_filtro').val() != ''){
            if( limpia_cuit($('#n_cuit_filtro').val()).length == 11 ){
                $.ajax({
                    url: "ajax_genericos/autocomplete.php",
                    data: {oper:'3', term:limpia_cuit($("#n_cuit_filtro").val())},
                    type:"POST",
                    async:true,
                    success: function(data){
                        ret = eval('('+data+')');
                        if(ret != null){
                            $("#n_cuit_filtro").val(ret.data_raz[0].cuit);
                            $("#desc_denom_filtro").val(ret.data_raz[0].razon_social);
                            $("#id_contribuyente_filtro").val(ret.data_raz[0].id_contribuyente);
                        }else{
                            mostrar_cuadro('E', 'Error', 'No existe un contribuyente asociado a ese CUIT');
                            $("#n_cuit_filtro").val(null);
                            $("#desc_denom_filtro").val(null);
                            $("#id_contribuyente_filtro").val(null);
                        }
                    }
                });

            }else{
                $('#btn_limpiar').click();
            }
        }
    });

    
/*
    $("#desc_denom").autocomplete({
        source: function( request, response ) {
            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "ajax_genericos/autocomplete.php",
                    data: {oper:'1', term: request.term},
                    dataType: 'json',
                    success: function( data ) {
                        ajax_autocomplete = null;
                        if(data) {
                            response(
                                $.map(data.data_raz, function( item ) {
                                    return {
                                        label: item.label,
                                        value: item.razon_social,
                                        cuit: item.cuit,
                                        id_contribuyente: item.id_contribuyente
                                    }
                                })
                            );
                        }
                    }
                });
        },
        minLength:1,
        select:function(event,ui){
            $("#desc_denom").val(ui.item.value);
            $("#n_cuit").val(ui.item.cuit);
            $("#id_contribuyente").val(ui.item.id_contribuyente);
            return false;
        }
    });*/

    //A PARTIR DE 5 CHAR DEBE HABER UNA LUPA
/*
    $("#desc_denom_filtro").autocomplete({
        source: function( request, response ) {
            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "ajax_genericos/autocomplete.php",
                    data: {oper:'1', term: request.term},
                    dataType: 'json',
                    success: function( data ) {
                        ajax_autocomplete = null;
                        if(data) {
                            response(
                                $.map(data.data_raz, function( item ) {
                                    return {
                                        label: item.label,
                                        value: item.razon_social,
                                        cuit: item.cuit,
                                        id_contribuyente: item.id_contribuyente
                                    }
                                })
                            );
                        }
                    }
                });
        },
        minLength:1,
        select:function(event,ui){
            $("#desc_denom_filtro").val(ui.item.value);
            $("#n_cuit_filtro").val(ui.item.cuit);
            $("#id_contribuyente_filtro").val(ui.item.id_contribuyente);
            return false;
        }
    });*/


    //DEBE HABER UNA LUPA
    /*
    $("#desc_denom_cbu","#FrmGrid_main_grid").autocomplete({
        source: function( request, response ) {
            if (ajax_autocomplete) ajax_autocomplete.abort();
            ajax_autocomplete =
                $.ajax({
                    type:'POST',
                    url: "ajax_genericos/autocomplete.php",
                    data: {oper:'1', term: request.term},
                    dataType: 'json',
                    success: function( data ) {
                        ajax_autocomplete = null;
                        if(data) {
                            response(
                                $.map(data.data_raz, function( item ) {
                                    return {
                                        label: item.label,
                                        value: item.razon_social,
                                        cuit: item.cuit,
                                        id_contribuyente: item.id_contribuyente
                                    }
                                })
                            );
                        }
                    }
                });
        },
        minLength:1,
        select:function(event,ui){
            $("#desc_denom_cbu").val(ui.item.value);
            $("#n_cuit_cbu").val(ui.item.cuit);
            $("#id_contribuyente_cbu").val(ui.item.id_contribuyente);
            return false;
        }
    });*/

    $("#telefono_1").on('input', function (evt) {
        // Allow only numbers.
        jQuery(this).val(jQuery(this).val().replace(/[^0-9]/g, ''));
    });

    $("#telefono_2").on('input', function (evt) {
        // Allow only numbers.
        jQuery(this).val(jQuery(this).val().replace(/[^0-9]/g, ''));
    });

    $("#telefono_3").on('input', function (evt) {
        // Allow only numbers.
        jQuery(this).val(jQuery(this).val().replace(/[^0-9]/g, ''));
    });

    $('#btn_mail_tel_aceptar').click(function () {
        var email1 = $('#email_1').val();
        var email2 = $('#email_2').val();
        var telefono_1 = $('#telefono_1').val();
        var telefono_2 = $('#telefono_2').val();
        var telefono_3 = $('#telefono_3').val();

        var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;

        if(email1 != ''){
            if( !validEmail.test( $('#email_1').val())  ){
                mostrar_cuadro('E','Error','Email inválido');
                return;
            
        }if( email2 != ''){
            if ( !validEmail.test( $('#email_2').val())) {
                mostrar_cuadro('E','Error','Email inválido');
                return;
            }
        }

       
            
       
    }
    if ($('#form_mail_tel_modal').validationEngine('validate')){
        var params = {
            id_contribuyente : $('#id_contribuyente').val(),
            p_email_1 : $('#email_1').val(),
            p_email_2 :$('#email_2').val(),
            p_telefono_1: $('#telefono_1').val(),
            p_telefono_2: $('#telefono_2').val(),
            p_telefono_3: $('#telefono_3').val(),
        };
        abm_mail_telefonos(params);
    }        
       
    });

   

    $('#btn_buscar').click(function(){

        if($('#n_cuit_filtro').val() == '' && $('#desc_denom_filtro').val() != ''){
            mostrar_cuadro('E', 'Error', 'Debe ingresar el cuit para realizar la búsqueda.');

        }
        if($('#c_tributo_filtro').val() || $('#n_cuit_filtro').val() || $('#d_objeto_hecho_filtro').val()){
            filtros_no_nativos = [];
            filtros_arr_main = [];
            if($('#c_tributo_filtro').val() != ''){
                filtros_arr_main.push('Tributo: '+ $('#c_tributo_filtro').val());
            }
            if($('#desc_denom_filtro').val() != ''){
                filtros_arr_main.push('Denominación: '+ $('#desc_denom_filtro').val());
            }
            if($('#n_cuit_filtro').val() != ''){
                filtros_arr_main.push('CUIT: '+ $('#n_cuit_filtro').val());
            }
            if($('#d_objeto_hecho_filtro').val() != ''){
                filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho_filtro').val());
            }
            filtros_no_nativos_ar['main_grid'] = filtros_arr_main;
            
                v_carga_grilla_manual = true;
                if(p_modo=='C'){
                   
                    setea_parametros('#consulta_grid',{
                        ':p_c_tributo':$('#c_tributo_filtro').val(),
                        ':p_d_objeto_hecho':$('#d_objeto_hecho_filtro').val(),
                        ':p_id_contribuyente':$('#id_contribuyente_filtro').val(),
                        ':p_desc_denom':$('#desc_denom_filtro').val()
                    });
                }else{
                
                    setea_parametros('#main_grid',{
                    ':p_c_tributo':$('#c_tributo_filtro').val(),
                    ':p_d_objeto_hecho':$('#d_objeto_hecho_filtro').val(),
                    ':p_id_contribuyente':$('#id_contribuyente_filtro').val(),
                    ':p_desc_denom':$('#desc_denom_filtro').val()
                });}
                

            
                
            
            

            

            $('#n_cuit_filtro').attr('disabled',true);
            $('#d_objeto_hecho_filtro').attr('disabled',true);
            $('#c_tributo_filtro').attr('disabled',true);
            $('#desc_denom_filtro').attr('disabled',true);
            $('#lupa_d_objeto_hecho_filtro').hide();
        }else{
            mostrar_cuadro('E', 'Error', 'Debe cargar al menos un filtro para realizar la búsqueda');
        }
    });
    


    $('#btn_limpiar').click(function(){
        $('#mascara_lupa_d_denominacion').show();
    $('#desc_denom_filtro_lupa').hide()
        $('#id_contribuyente_filtro').val(null);
        $('#n_cuit_filtro').val(null);
        $('#d_objeto_hecho_filtro').val(null);
        $('#c_tributo_filtro').val(null);
        $('#d_tributo_filtro').val(null);
        $('#desc_denom_filtro').val(null);
        $('#n_cuit_filtro').attr('disabled',false);
        $('#d_objeto_hecho_filtro').attr('disabled',false);
        $('#c_tributo_filtro').attr('disabled',false);
        $('#desc_denom_filtro').attr('disabled',false);
        $('#lupa_d_objeto_hecho_filtro').show();
        $('#main_grid').jqGrid('clearGridData');
        $('#consulta_grid').jqGrid('clearGridData');
    });
}


function init_eventos_main_grid(formid){

    $('#d_objeto_hecho_lupa',formid).prop('disabled',true);

    $('#n_cuit_cbu',formid).focusout(function(){
        if ($('#n_cuit_cbu',formid).val() != ''){
            if( limpia_cuit($('#n_cuit_cbu',formid).val()).length == 11 ){
                $.ajax({
                    url: "ajax_genericos/autocomplete.php",
                    data: {oper:'3', term:limpia_cuit($("#n_cuit_cbu",formid).val())},
                    type:"POST",
                    async:true,
                    success: function(data){
                        ret = eval('('+data+')');
                        if(ret != null){
                            $("#n_cuit_cbu",formid).val(ret.data_raz[0].cuit);
                            $("#desc_denom_cbu",formid).val(ret.data_raz[0].razon_social);
                            $("#id_contribuyente_cbu",formid).val(ret.data_raz[0].id_contribuyente);
                        }else{
                            mostrar_cuadro('E', 'Error', 'No existe un contribuyente asociado a ese CUIT');
                            $("#n_cuit_cbu",formid).val(null);
                            $("#desc_denom_cbu",formid).val(null);
                            $("#id_contribuyente_cbu",formid).val(null);
                        }
                    }
                });
            }else{
                $("#n_cuit_cbu",formid).val(null);
            }
        }
    });

    $('#n_cuit',formid).focusout(function(){
        if ($('#n_cuit',formid).val() != ''){
            if( limpia_cuit($('#n_cuit',formid).val()).length == 11 ){
                $.ajax({
                    url: "ajax_genericos/autocomplete.php",
                    data: {oper:'3', term:limpia_cuit($("#n_cuit").val())},
                    type:"POST",
                    async:true,
                    success: function(data){
                        ret = eval('('+data+')');
                        if(ret != null){
                            $("#n_cuit",formid).val(ret.data_raz[0].cuit);
                            $("#desc_denom",formid).val(ret.data_raz[0].razon_social);
                            $("#id_contribuyente",formid).val(ret.data_raz[0].id_contribuyente);
                            $('#d_objeto_hecho_lupa',formid).prop('disabled',false);
                            $('#desc_denom',formid).prop('disabled',true);
                        }else{
                            mostrar_cuadro('E', 'Error', 'No existe un contribuyente asociado a ese CUIT');
                            $("#n_cuit",formid).val(null);
                            $("#desc_denom",formid).val(null);
                            $("#id_contribuyente",formid).val(null);
                        }
                    }
                });

            }else{
                $("#n_cuit",formid).val('');
            }
        } 
    });

    
    $('#d_objeto_hecho').focusout(function(){
        var objeto_hecho = $('#d_objeto_hecho').val()
        if($('#d_objeto_hecho').val() && $('#c_tributo').val() && !$('#n_cuit').val()){
            //PRC_BUSCAR_CONTRIBUYENTE
            
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_c_tributo": $('#c_tributo').val(),
                 "p_d_objeto_hecho": $('#d_objeto_hecho').val(),
                 "id_menu":11007,
                 "n_orden":3
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        $('#id_contribuyente').val(data.p_id_contribuyente);
                        $('#n_cuit').val(data.p_n_cuit);
                        $('#n_cuit').mask('99-99999999-9');
                        $('#desc_denom').val(data.p_d_denominacion);
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 
        }
    });

    $("#f_vig_hasta").datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    });

    $("#c_cbu").attr("autocomplete", "off");
}