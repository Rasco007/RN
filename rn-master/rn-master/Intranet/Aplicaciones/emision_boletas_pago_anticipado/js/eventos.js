function init_eventos(){

    $("#n_cuit").blur(function(){
        $("#n_cuit").mask("99-99999999-9");
    })
    $("#n_cuit").mask("99-99999999-9");

    $("#div_inmueble").hide();
    $("#div_auto").hide();
    $("#div_generar_boleta").hide();
    $("#div_domicilio").hide();

    $('#btn_limpiar').click(function(){
        $("#d_denominacion").attr('disabled',false);
        $("#c_tipo_imponible").attr('disabled',false);
        $("#c_tributo").attr('disabled',false);
        $("#d_tipo_imponible").attr('disabled',false);
        $("#d_tributo").attr('disabled',false);
        $("#n_cuit").attr('disabled',false);
        $("#objeto").attr('disabled',false);
        $("#d_denominacion").attr('readonly',false);
        $("#c_tipo_imponible").attr('readonly',false);
        $("#c_tributo").attr('readonly',false);
        $('#mascara_lupa_obj_hecho').show().css('pointer-events', 'auto');
        $('#lupa_c_tipo_imponible').show().css('pointer-events', 'auto');
        $('#lupa_c_tributo').show().css('pointer-events', 'auto');
        //DATOS PERSONALES
        $("#n_cuit").val(null);
        $("#d_denominacion").val(null);
        $("#id_contribuyente").val(null);
        $("#c_tipo_imponible").val(null);
        $("#c_tributo").val(null);
        $("#d_tipo_imponible").val(null);
        $("#d_tributo").val(null);
        $("#objeto").val(null);
        //DATOS BOLETA
        $("#f_vto_pago_anticipado").val(null);
        $("#importe").val(null);
       //DATOS DOMICILIO
         $('#calle').val(null);
         $('#nro').val(null);
         $('#piso').val(null);
         $('#dpto').val(null);
         $('#of').val(null);
         $('#monoblock').val(null);
         $('#puerta').val(null);
         $('#manzana').val(null);
         $('#c_postal').val(null);
         $('#localidad').val(null);
         $('#depto_localidad').val(null);
         $('#provincia').val(null);
       //DATOS RODADO
         $('#partida').val(null);
         $('#nomenclatura').val(null);
         $('#titular').val(null);
         $('#domicilio').val(null);
         $('#sup_terreno').val(null);
         $('#valor_terreno').val(null);
         $('#sup_edificada').val(null);
         $('#valor_sup_edificada').val(null);
       //DATOS INMUEBLE
         $('#dominio').val(null);
         $('#dominio_anterior').val(null);
         $('#marca').val(null);
         $('#modelo').val(null);
         $('#descripcion').val(null);
         $('#año_modelo').val(null);
        $("#f_vto_pago_anticipado,#importe").prop('disabled',true);
        //OCULTAR SOLAPAS
        $("#div_inmueble").hide();
        $("#div_auto").hide();
        $("#div_generar_boleta").hide();
        $("#div_domicilio").hide();
        $('#lupa_obj_hecho').hide();
        $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
        $('#lupa_denominacion').hide();
        $('#mascara_lupa_denominacion').show().css('display', 'table-cell');
    });

    $('#lupa_obj_hecho').hide();

    $('#objeto').on('keydown focusout', function (event) {
        if ((event.type === 'keydown' && $(this).val().length >= 2) || ($("#n_cuit").val() || $("#c_tributo").val())) {
            $('#lupa_obj_hecho').show().css('display', 'table-cell');
            $('#mascara_lupa_obj_hecho').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_obj_hecho').hide();
            $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
        }
    });

    $('#n_cuit').on('keydown focusout', function (event) {
        if($(this).val().length >= 11){
            $('#lupa_obj_hecho').show().css('display', 'table-cell');
            $('#mascara_lupa_obj_hecho').hide();
        }
        else{
            $('#lupa_obj_hecho').hide();
            $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
        }
    });

    $('#c_tributo').on('keydown focusout', function (event) {
        if($(this).val().length >= 1){
            $('#lupa_obj_hecho').show().css('display', 'table-cell');
            $('#mascara_lupa_obj_hecho').hide();
        }
        else{
            $('#lupa_obj_hecho').hide();
            $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
        }
});

    $('#lupa_denominacion').hide();

    $('#d_denominacion').on('keydown focusout', function (event) {
        if (event.type === 'keydown' && $(this).val().length >= 4) {
            $('#lupa_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_denominacion').hide();
        } else if (event.type === 'keydown') {
            $('#lupa_denominacion').hide();
            $('#mascara_lupa_denominacion').show().css('display', 'table-cell');
        } else if (event.type === 'focusout' && $(this).val().length <= 4) {
            $('#lupa_denominacion').hide();
            $('#mascara_lupa_denominacion').show().css('display', 'table-cell');
        }
    });

    $("#btn_consultar").click(function(){
        if(($('#d_denominacion').val() || $("#c_tributo").val() )&&  $("#objeto").val()){
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{     
                 "d_objeto_hecho":$("#objeto").val(),
                 "id_contribuyente":$("#id_contribuyente").val(),
                 "c_tributo":$("#c_tributo").val(),
                 "id_menu":v_id_menu,
                 "n_orden":1
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        $("#f_vto_pago_anticipado,#importe").prop('disabled',false);
                        $("#n_cuit").attr('disabled',true);
                        $("#objeto").attr('disabled',true);
                        $("#d_denominacion").attr('readonly',true);
                        $("#c_tipo_imponible").attr('readonly',true);
                        $("#c_tributo").attr('readonly',true);
      
                        $("#d_denominacion").attr('disabled',true);
                        $("#c_tipo_imponible").attr('disabled',true);
                        $("#d_tipo_imponible").attr('disabled',true);
                        $("#d_tributo").attr('disabled',true);
                        $("#c_tributo").attr('disabled',true);

                        $('#lupa_c_tipo_imponible').css('pointer-events', 'none');
                        $('#lupa_c_tributo').css('pointer-events', 'none');
                        $('#lupa_obj_hecho').css('pointer-events', 'none');
                    //DATOS PERSONALES
                     $("#n_cuit").val(data.v_n_cuit);
                     $("#d_denominacion").val(data.v_d_denominacion);
                     $("#id_contribuyente").val(data.v_id_contrib);
                     $("#c_tipo_imponible").val(data.v_c_tipo_imponible);

                     if(data.v_c_tipo_imponible == 5){
                        $("#d_tipo_imponible").val('INMOBILIARIO');
                     }
                     else{
                        $("#d_tipo_imponible").val('AUTOMOTOR');
                     }
                     $("#c_tributo").val(data.v_c_tributo);
                     if(data.v_c_tributo == 60){
                        $("#d_tributo").val('INMOBILIARIO');
                     }
                     else{
                        $("#d_tributo").val('AUTOMOTOR');
                     }
                     $("#objeto").val(data.v_d_objeto_hecho);
                    //DATOS DOMICILIO
                      $('#calle').val(data.v_d_calle);
                      $('#nro').val(data.v_n_numero);
                      $('#piso').val(data.v_d_piso);
                      $('#dpto').val(data.v_d_depto);
                      $('#of').val(data.v_d_oficina);
                      $('#monoblock').val(data.v_d_monoblock);
                      $('#puerta').val(data.v_d_puerta);
                      $('#manzana').val(data.v_d_manzana);
                      $('#c_postal').val(data.v_c_postal);
                      $('#localidad').val(data.v_localidad);
                      $('#depto_localidad').val(data.v_departamento);
                      $('#provincia').val(data.v_provincia);
                    //DATOS INMUEBLE
                      $('#partida').val(data.v_d_nomenclatura);
                      $('#nomenclatura').val(data.v_d_nomenclatura_real);
                      $('#titular').val(data.v_d_titular);
                      $('#domicilio').val(data.v_d_domicilio);
                      $('#sup_terreno').val(data.v_n_superficie_terr);
                      $('#valor_terreno').val(data.v_i_avaluo_tierra);
                      $('#sup_edificada').val(data.v_n_superficie_edif);
                      $('#valor_sup_edificada').val(data.v_i_avaluo_edif);
                    //DATOS RODADO
                      $('#dominio').val(data.v_d_patente);
                      $('#dominio_anterior').val(data.v_d_patente_vieja);
                      $('#marca').val(data.v_d_descrip_marca);
                      $('#modelo').val(data.v_d_descrip_modelo);
                      $('#descripcion').val(data.v_d_texto_descripcion);
                      $('#año_modelo').val(data.v_n_modelo_año);

                      if(data.v_d_patente){
                        $("#div_auto").show();
                        $("#div_generar_boleta").show();
                        $("#div_domicilio").show();
                      }
                      if(data.v_d_nomenclatura){
                        $("#div_inmueble").show();
                        $("#div_generar_boleta").show();
                        $("#div_domicilio").show();
                        
                      }

                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            });
            return;
        }
        mostrar_cuadro('I','Atención','Debe completar los campos: Denominacion/Razón Social o Tributo, y Objeto');
        return;
    });

    $("#btn_emitir").click(function(){
        if($('#f_vto_pago_anticipado').val()  && $("#importe").val() ){
            let n_importe = JSON.stringify($("#importe").val());
            n_importe = n_importe.split('.').join('');
            n_importe = n_importe.split(',').join('.');
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_c_tipo_imponible":$("#c_tipo_imponible").val(),
                 "p_id_contribuyente":$("#id_contribuyente").val(),
                 "p_c_tributo":$("#c_tributo").val(),
                 "p_c_objeto":$("#objeto").val(),
                 "p_f_vto_pago":$("#f_vto_pago_anticipado").val(),
                 "p_importe":n_importe,
                 "p_automotor":90,
                 "p_inmueble":60,
                 "id_menu":v_id_menu,
                 "n_orden":2
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                            llamar_report('RECAL088',
                        'p_id_sesion|' + data.p_id_sesion,
                        'PDF');
                        return;
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 
        }
        else{
            mostrar_cuadro('I','Atención','Debe completar los campos: Fecha de vencimiento de pago e importe');
            return;
        }
        
    });

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    $('#f_vto_pago_anticipado').datepicker("option",'minDate',fecha_hoy).change(function () {
        if ($.datepicker.parseDate('dd/mm/yy', $(this).val()) < $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
            mostrar_error("La Fecha ingresada no puede ser Menor a la fecha actual.");
            $(this).val(fecha_hoy);
            return;
        }
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{      
             "fecha":$('#f_vto_pago_anticipado').val(),
             "id_menu":v_id_menu,
             "n_orden":3
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    $('#f_vto_pago_anticipado').val(data.retorno)
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    });

    $('#f_vto_pago_anticipado').datepicker('setDate',fecha_hoy);

    $(".mascara_importe").keydown(function(event){
        return controla_number(event, this, 2);
    });

    $("#lupa_c_tipo_imponible").lupa_generica({
        id_lista:v_lista_timp,
        titulos:['Cód. Tipo Imponible','Tipo Imponible'],
        grid:[{index:'c_codigo',width:150},
            {index:'d_descrip',width:400}],
        caption:'Lista de Tipos Imponibles',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:['O','#id_contribuyente'],
        filtroNull:true,
        campos:{c_codigo:'c_tipo_imponible',d_descrip:'d_tipo_imponible'},
        keyNav:true,
        searchInput: '#c_tipo_imponible',
        searchCode: true,
        onClose: function(){
            
        }
    });

    $("#lupa_denominacion").lupa_generica({
        id_lista: id_lista_contribuyentes,
        titulos:['id_contribuyente','CUIT','Denominación','c_tipo_doc','Tipo Documento','Nro. Documento', 'F. Alta'],
        grid:[
            {index:'id_contribuyente', hidden: true},
            {index:'n_cuit',width:100},{index:'d_denominacion',width:450},{index:'c_tipo_documento', hidden: true},
            {index:'d_tipo_documento', width:130},{index:'n_documento',width:150},{index:'f_alta',width:100}],
        caption:'Contribuyentes',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#d_denominacion'],
        searchInput: '#d_denominacion',
        campos:{n_cuit: 'n_cuit', d_denominacion:'d_denominacion', id_contribuyente: 'id_contribuyente',c_tipo_documento:'c_documento',d_tipo_documento:'d_documento',n_documento:'documento',f_alta:'f_alta'},
        keyNav:true,
        draggable:true,
        onClose(){
            $("#n_cuit").blur();
        }
    });

    $("#lupa_obj_hecho").lupa_generica({
        id_lista:v_lista_obj,
        titulos:['Objeto/Hecho','Denominación','CUIT','Cód.Tributo','id_contribuyente'],
        grid:[{index:'d_descrip',width:100},{index:'denominacion',width:200},{index:'cuit',width:100},{index:'c_tributo',width:100},{index:'id_contribuyente',hidden:true}],
        caption:'Lista de Objeto/Hecho',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:['#objeto','#c_tributo','#id_contribuyente'],
        filtroNull:true,
        campos:{d_descrip:'objeto',denominacion:'d_denominacion',cuit:'n_cuit',c_tributo:'c_tributo',id_contribuyente:'id_contribuyente'},
        keyNav:true,
        searchInput: '#d_descrip',
        searchCode: true,
        onClose: function(){
            if($("#c_tributo").val()){
                $("#c_tributo").blur();
            }
        }
    });

    $('.numerico').keypress(function(tecla){
        if(tecla.charCode<48 || tecla.charCode>57){
            if(tecla.charCode !== 44 && tecla.charCode !== 46){
                return false;
            }
        }
    });
    
    //le damos el formato de importe con 2 decimales 0,00
    $(".mascara_importe").focusout(function () {
        $(this).val(formatea_number(mascara_numero(parse($(this).val()).toFixed(2), ',', -1, 2), ''));
        if($(this).val() == '0,00'){
            $(this).val(null);
        }
    }).css('text-align', 'right');

    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_trib,
        titulos:['Cód. Tributo','Tributo','Cód. Tipo Imp.','Tipo Imponible'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:250},
            {index:'c_tipo_imponible',width:100},
            {index:'d_dato',width:250}],
        caption:'Lista de Tributos',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:[],
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo',c_tipo_imponible:'c_tipo_imponible',d_dato:'d_tipo_imponible'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
        onClose: function(){
            
        }
    });

    // $("#frm_busqueda #d_denominacion").autocomplete({
    //     source: function( request, response ) {
    //         if (ajax_autocomplete) ajax_autocomplete.abort();
    //         ajax_autocomplete =
    //             $.ajax({
    //                 type:'POST',
    //                 url: "ajax_genericos/autocomplete.php",
    //                 data: {oper:'1',term: request.term},
    //                 dataType: 'json',
    //                 success: function( data ) {
    //                     ajax_autocomplete = null;
    //                     if(data) {
    //                         response(
    //                             $.map(data.data_raz, function( item ) {
    //                                 return {
    //                                     label: item.razon_social,
    //                                     value: item.razon_social,
    //                                     cuit: item.cuit,
    //                                     id_contribuyente: item.id_contribuyente
    //                                 }
    //                             })
    //                         );
    //                     }
    //                 }
    //             });
    //     },
    //     minLength:3,
    //     select:function(event,ui){
    //         $("#d_denominacion").val(ui.item.value);
    //         $("#n_cuit").val(ui.item.cuit);
    //         $("#id_contribuyente").val(ui.item.id_contribuyente);
    //         return false;
    //     }
    // });

    // $("#frm_busqueda #d_denominacion").autocomplete({
    //     source: function( request, response ) {
    //         if (ajax_autocomplete) ajax_autocomplete.abort();
    //         ajax_autocomplete =
    //             $.ajax({
    //                 type:'POST',
    //                 url: "ajax_genericos/autocomplete.php",
    //                 data: {oper:'1',term: request.term},
    //                 dataType: 'json',
    //                 success: function( data ) {
    //                     ajax_autocomplete = null;
    //                     if(data) {
    //                         response(
    //                             $.map(data.data_raz, function( item ) {
    //                                 return {
    //                                     label: item.razon_social,
    //                                     value: item.razon_social,
    //                                     cuit: item.cuit,
    //                                     id_contribuyente: item.id_contribuyente
    //                                 }
    //                             })
    //                         );
    //                     }
    //                 }
    //             });
    //     },
    //     minLength:3,
    //     select:function(event,ui){
    //         $("#d_denominacion").val(ui.item.value);
    //         $("#n_cuit").val(ui.item.cuit);
    //         $("#id_contribuyente").val(ui.item.id_contribuyente);
    //         return false;
    //     }
    // });

    

    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() != ''){
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
                                $("#d_denominacion").val(data.data_raz[0].razon_social);
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
    });

}
