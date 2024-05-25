function init_eventos(){
    $("#n_cuit").blur(function(){
        $("#n_cuit").mask("99-99999999-9");
    })
    $("#n_cuit").mask("99-99999999-9");

    $("#i_actual").val(0)

    $("#div_inmueble").hide();
    $("#div_auto").hide();
    $("#div_generar_boleta").hide();
    $("#div_domicilio").hide();


    $("#btn_estado").attr('disabled',true);

    $('#lupa_obj_hecho').hide();

    $('#btn_limpiar').click(function(){
        $("#n_cuit").attr('disabled',false);
        $("#objeto").attr('disabled',false);
        $("#d_denominacion").attr('disabled',false);
        $("#c_tipo_imponible").attr('disabled',false);
        $("#c_tributo").attr('disabled',false);
        $("#c_documento").attr('disabled',false);
        $("#documento").attr('disabled',false);
        //DATOS PERSONALES
        $("#n_cuit").val(null);
        $("#d_denominacion").val(null);
        $("#id_contribuyente").val(null);
        $("#c_tipo_imponible").val(null);
        $("#c_tributo").val(null);
        $("#c_documento").val(null);
        $("#d_documento").val(null);
        $("#documento").val(null);
        $("#d_tipo_imponible").val(null);
        $("#d_tributo").val(null);
        $("#objeto").val(null);
        $("#d_documento").attr('disabled',false);
        $("#d_tributo").attr('disabled',false);
        $("#d_tipo_imponible").attr('disabled',false);
        //DATOS BOLETA
        // $("#f_vto_pago_anticipado").val(null);
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
         $('#tipo').val(null);
         $('#peso_cilindrada').val(null);
         $('#grupo').val(null);
        // $("#f_vto_pago_anticipado,#importe").prop('disabled',true);
        //OCULTAR SOLAPAS
        $("#div_inmueble").hide();
        $("#div_auto").hide();
        $("#div_generar_boleta").hide();
        $("#div_domicilio").hide();
        $("#btn_estado").attr('disabled',true);
        $('#lupa_obj_hecho').hide();
        $('#mascara_lupa_obj_hecho').show().css('pointer-events', 'auto');
        $('#lupa_denominacion').hide();
        $('#mascara_lupa_denominacion').show().css('display', 'table-cell');
        $('#lupa_c_documento').show().css('pointer-events', 'auto');
        $('#lupa_c_tipo_imponible').show().css('pointer-events', 'auto');
        $('#lupa_c_tributo').show().css('pointer-events', 'auto');
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
                 "n_orden":4
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        $("#btn_estado").attr('disabled',false);
                        $("#n_cuit").attr('disabled',true);
                        $("#objeto").attr('disabled',true);
                        $("#d_denominacion").attr('disabled',true);
                        $("#c_tipo_imponible").attr('disabled',true);
                        $("#d_documento").attr('disabled',true);
                        $("#d_tipo_imponible").attr('disabled',true);
                        $("#d_tributo").attr('disabled',true);
                        $("#c_tributo").attr('disabled',true);
                        $("#c_documento").attr('disabled',true);
                        $("#documento").attr('disabled',true);
                        $('#lupa_denominacion').hide();
                        $('#lupa_c_documento').css('pointer-events', 'none');
                        $('#lupa_c_tipo_imponible').css('pointer-events', 'none');
                        $('#lupa_c_tributo').css('pointer-events', 'none');
                        $('#lupa_obj_hecho').css('pointer-events', 'none');
                    //DATOS PERSONALES
                     $("#n_cuit").val(data.v_n_cuit);
                     $("#d_denominacion").val(data.v_d_denominacion);
                     $("#id_contribuyente").val(data.v_id_contrib);
                     $("#c_tipo_imponible").val(data.v_c_tipo_imponible);
                     $("#c_documento").val(data.v_c_documento);
                     $("#d_documento").val(data.v_d_documento);
                     $("#documento").val(data.v_n_documento);

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
                    //DATOS RODADOS
                      $('#dominio').val(data.v_d_patente);
                      $('#dominio_anterior').val(data.v_d_patente_vieja);
                      $('#marca').val(data.v_d_descrip_marca);
                      $('#modelo').val(data.v_d_descrip_modelo);
                      $('#descripcion').val(data.v_d_texto_descripcion);
                      $('#año_modelo').val(data.v_n_modelo_año);
                      $('#tipo').val(data.v_tipo);
                      $('#peso_cilindrada').val(data.v_peso_cilindrada);
                      $('#grupo').val(data.v_grupo);

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

    

    $("#marcar_todos").click(function(){
        $(".a_marcar").prop("checked", true);
        $(":checkbox").attr("checked", true);
        $("#desmarcar_todos").show();
        $("#marcar_todos").hide();
        for(let i = 1;$('#grid_cons_deuda').getCell(i,'n_cuota');i++){
            seleccionados.push(i)
        }
    })

    $("#desmarcar_todos").click(function(){
        $(".a_marcar").prop("checked", false);
        $(":checkbox").attr("checked", false);
        $("#marcar_todos").show();
        $("#desmarcar_todos").hide();
        seleccionados = [];
    })

    $("#btn_volver_cons_deuda").click(function(){
        seleccionados = [];
    })

    $("#btn_estado").click(function(){
        $('#main').procOverlay({visible:true});

        datos_cons_deuda = new GridParam({
            id_menu: v_id_menu,
            n_grid: 0,
            m_autoquery: 'S',
            param: {':d_objeto_hecho': $("#objeto").val()}
        });

        crea_grilla_cons_deuda();

        $(".a_marcar").prop("checked", false);
        $(":checkbox").attr("checked", false);
        $("#marcar_todos").show();
        $("#desmarcar_todos").hide();
        seleccionados = [];

        setea_parametros('#grid_cons_deuda',{':d_objeto_hecho': $("#objeto").val()},'S');

        abrir_modal("#modal_cons_deuda");
        $('#main').procOverlay({visible:false});
        
    });

    $("#btn_emitir").click(function(){

        for(let i = 0;seleccionados[i];i++){
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{      
                 "p_c_tributo":$("#c_tributo").val(),
                 "p_d_concepto":$('#grid_cons_deuda').getCell(seleccionados[i],'DSP_D_CONCEPTO'),
                 "p_n_cuota": $('#grid_cons_deuda').getCell(seleccionados[i],'n_cuota'),
                 "p_n_posicion_fiscal":$('#grid_cons_deuda').getCell(seleccionados[i],'n_posicion_fiscal').split('/').join(''),
                 "p_id_obligacion":$('#grid_cons_deuda').getCell(seleccionados[i],'id_obligacion'),
                 "id_menu":v_id_menu,
                 "n_orden":2
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado == 'OK'){
                        if($("#c_tributo").val() == 90){
                            llamar_report('RECAL012_AUTO',
                            'P_SESION|' + data.p_id_sesion + '&p_orden_desde|' + 0 + '&p_orden_hasta|' + 0,
                            'PDF');
                            return;
                        }
                        else{
                            llamar_report('RECAL012_INMO',
                            'P_SESION|' + data.p_id_sesion + '&p_orden_desde|' + 0 + '&p_orden_hasta|' + 0,
                            'PDF');
                            return;
                        }
                    }
                    else{
                        mostrar_cuadro('E', 'Error', data.resultado);
                        return;
                    }
                }
            }); 
        }

        seleccionados = [];
        
    });

    function abrir_modal(modal){
        $(modal).modal('show');
        $(window).resize();
    }

    function crea_grilla_cons_deuda(){
        $("#grid_cons_deuda").jqGrid({
            colNames:datos_cons_deuda.colNames(),
            colModel:datos_cons_deuda.colModel(),
            autowidth: false,
            height: 180,
            pager: $('#grid_cons_deuda_pager'),
            caption:"Cuotas Adeudadas:",
            sortname:'rownum',
            sortorder:'asc',
            rowNum: 1000,
            postData: datos_cons_deuda.postData(),
            editurl: FUNCIONES_BASEPATH+"maestro_abm_grid.php",             
            loadComplete: function(){
                let i_total = $('#grid_cons_deuda').getCell(1,'I_VENC_TOTAL');
                if(i_total){
                    $("#i_total").val(i_total);
                }
                else{
                    $("#i_total").val("0,00");
                }
                
            }
        })
    //     .navGrid('#grid_cons_deuda_pager',
    //     {add:false, edit:false, del:false,refresh:true},
    //     {}, 
    //     {}, 
    //     {}, 
    //     {}   
    // );
    }

    $('.datepicker').datepicker({
        dateFormat:'dd/mm/yy',
        changeMonth:true,
        changeYear:true,
        dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
        monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
    }).mask("99/99/9999");

    // $('#f_vto_pago_anticipado').datepicker("option",'minDate',fecha_hoy).change(function () {
    //     if ($.datepicker.parseDate('dd/mm/yy', $(this).val()) < $.datepicker.parseDate('dd/mm/yy', fecha_hoy)){
    //         mostrar_error("La Fecha ingresada no puede ser Menor a la fecha actual.");
    //         $(this).val(fecha_hoy);
    //         return;
    //     }
    //     $.ajax({
    //         type:'POST',
    //         url: FUNCIONES_BASEPATH+'maestro_abm.php',
    //         data:{      
    //          "fecha":$('#f_vto_pago_anticipado').val(),
    //          "id_menu":11005,
    //          "n_orden":3
    //         },
    //         dataType:'json',
    //         success: function( data ) {
    //             if(data.resultado == 'OK'){
    //                 $('#f_vto_pago_anticipado').val(data.retorno)
    //             }
    //             else{
    //                 mostrar_cuadro('E', 'Error', data.resultado);
    //                 return;
    //             }
    //         }
    //     });
    // });

    // $('#f_vto_pago_anticipado').datepicker('setDate',fecha_hoy);

    $(".mascara_importe").keydown(function(event){
        return controla_number(event, this, 2);
    });

    $("#lupa_c_tipo_imponible").lupa_generica({
        id_lista:v_lista_timp,
        titulos:['Cód. Tipo Imponible','Tipo Imponible'],
        grid:[{index:'c_codigo',width:150},
            {index:'d_descrip',width:420}],
        caption:'Lista de Tipos Imponibles',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:['O','#id_contribuyente'],
        filtroNull:true,
        campos:{c_codigo:'c_tipo_imponible',d_descrip:'d_tipo_imponible'},
        keyNav:true,
        searchInput: '#c_tipo_imponible',
        searchCode: true,
    });

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

    $("#lupa_obj_hecho").lupa_generica({
        id_lista:v_lista_obj,
        titulos:['Objeto/Hecho','Denominación','CUIT','Cód.Tributo','id_contribuyente'],
        grid:[{index:'d_descrip',width:150},{index:'denominacion',width:215},{index:'cuit',width:100},{index:'c_tributo',width:100},{index:'id_contribuyente',hidden:true}],
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

    $("#lupa_denominacion").lupa_generica({
        id_lista: id_lista_contribuyentes,
        titulos:['id_contribuyente','CUIT','Denominación','c_tipo_doc','Tipo Documento','Nro. Documento', 'F. Alta'],
        grid:[
            {index:'id_contribuyente', hidden: true},
            {index:'n_cuit',width:120},{index:'d_denominacion',width:350},{index:'c_tipo_documento', hidden: true},
            {index:'d_tipo_documento', width:120},{index:'n_documento',width:150},{index:'f_alta',width:100}],
        caption:'Denominación / Razón Social',
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

    $('#objeto').on('keydown focusout', function (event) {
        if ((event.type === 'keydown' && $(this).val().length >= 3) || ($("#n_cuit").val() || $("#c_tributo").val())) {
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

    $("#lupa_c_documento").lupa_generica({
        id_lista:v_lista_doc,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
		grid:[{index:'c_dato',width:120},
			{index:'d_dato',width:450}],
		caption:'Tipos de Documento',
		sortname:'c_dato',
		sortorder:'asc',
		campos:{c_dato:'c_documento',d_dato:'d_documento'},
		searchCode:true,
		searchInput: '#c_tipo_documento',
		keyNav:true,
		exactField: 'c_dato'
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
