function inicializarEventos(){


    limpiar_tmp();


    if(p_remito == 1){
        //acred_agrupada
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{
                "p_n_pagos_procesados": 0,
                "p_n_pagos_acreditados": 0,
                "p_n_pagos_erroneos": 0,
                "p_estado": null,
                "p_c_banco": $('#c_banco').val(),
                "p_d_banco": $('#d_banco').val(),
                "p_i_remito": null,
                "id_menu":p_id_menu,
                "n_orden":6
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    if(data.p_estado == 'PROCESO FINALIZADO CORRECTAMENTE'){
                        mostrar_cuadro('S', 'Remito Procesado', data.p_estado);
                    } else {
                        mostrar_cuadro('I', 'Informaci&oacute;n', data.p_estado);
                    }
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });
    }


    $("#mascara_lupa_banco").hide();
    $("#mascara_lupa_sucursal").hide();
    $("#mascara_lupa_remito").hide();


   $('#f_desde').datepicker("option",'maxDate',fecha_hoy).change(function () {
       if($('#f_desde').val() && $('#f_hasta').val()){
           if ($.datepicker.parseDate('dd/mm/yy', $('#f_desde').val()) > $.datepicker.parseDate('dd/mm/yy', $('#f_hasta').val())){
               mostrar_error('La fecha Desde no puede ser mayor a la fecha Hasta', 'E', true);
               $('#f_desde').val(null);
               return;
           }
       }
   });

  $('#f_hasta').datepicker("option",'maxDate',fecha_hoy).change(function () {
      if($('#f_desde').val() && $('#f_hasta').val()){
          if ($.datepicker.parseDate('dd/mm/yy', $('#f_desde').val()) > $.datepicker.parseDate('dd/mm/yy', $('#f_hasta').val())){
              mostrar_error('La fecha Desde no puede ser mayor a la fecha Hasta', 'E', true);
              $('#f_hasta').val(null);
              return;
          }
      }

   });

    $('#f_hasta').focusout(function(){
        if ($('#f_hasta').val() > fecha_hoy){
            mostrar_error('La fecha hasta no puede ser posterior a la fecha del dia.', 'E', true);
            $('#f_hasta').val(null);
        }
    });

    $('#f_desde').focusout(function(){
        if ($('#f_desde').val() > fecha_hoy){
            mostrar_error('La fecha desde no puede ser posterior a la fecha del dia.', 'E', true);
            $('#f_desde').val(null);
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


  $('#btn_buscar').click(function(){
      let valido = valida_nulo_consulta_remesa();
      if(valido){
         let tipo_rem = definir_checks();
         if(!$('#f_hasta').val()){ 
            $('#f_hasta').val(fecha_hoy);
         }

          filtros_no_nativos = [];
          filtros_arr_main = [];
          if($('#c_banco').val() != ''){
              filtros_arr_main.push('Banco: '+ $('#c_banco').val()+ ' - ' +$('#d_banco').val());
          }
          if($('#c_sucursal').val() != ''){
              filtros_arr_main.push('Sucursal: '+ $('#c_sucursal').val()+ ' - '+$('#d_sucursal').val());
          }
          if($('#f_desde').val() != ''){
              filtros_arr_main.push('F. Desde: '+ $('#f_desde').val());
          }
          if($('#f_hasta').val() != ''){
              filtros_arr_main.push('F. Hasta: '+ $('#f_hasta').val());
          }
          if($('#n_remito').val() != ''){
              filtros_arr_main.push('Nro. Remito: '+ $('#n_remito').val());
          }
          filtros_no_nativos_ar['agrup_det_grid'] = filtros_arr_main;
          filtros_no_nativos_ar['casos_especiales_grid'] = filtros_arr_main;

         //buscar_remesas_imputacion
         $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{
             "p_n_remito": $('#n_remito').val(),      
             "p_c_banco": $('#c_banco').val(),
             "p_c_sucursal":$('#c_sucursal').val(),
             "p_c_manual": tipo_rem[1],
             "p_c_automatica": tipo_rem[0],
             "p_f_desde": $('#f_desde').val(),
             "p_f_hasta": $('#f_hasta').val(),
             "id_menu":p_id_menu,
             "n_orden":0
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                  setea_parametros('#agrup_det_grid', {});

                    $('#btn_buscar').attr('disabled',true);
                    $('#c_banco').attr('disabled',true);
                    $('#d_banco').attr('disabled',true);
                    $('#c_sucursal').attr('disabled',true);
                    $('#d_sucursal').attr('disabled',true);
                    $('#f_desde').attr('disabled',true);
                    $('#f_hasta').attr('disabled',true);
                    $('#n_remito').attr('disabled',true);
                    $('#check_automat').attr('disabled',true);
                    $('#check_manual').attr('disabled',true);
                    $('#check_marcar_todas').attr('disabled',true);
                    $('#mascara_lupa_banco').show().css('display', 'table-cell');
                    $('#mascara_lupa_sucursal').show().css('display', 'table-cell');
                    $('#mascara_lupa_remito').show().css('display', 'table-cell');
                    $("#lupa_banco").hide();
                    $("#lupa_sucursal").hide();
                    $("#lupa_remito").hide();
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        }); 
      }
  });


  $('#check_marcar_todas').change(function(){
      let accion = 0;
      if(!marcar_todas_seleccionado){
         //$("#agrup_det_grid input[type='checkbox']").prop("checked", true);
         accion = 1;
         marcar_todas_seleccionado = true;
      }else{
         accion = 0;
         //$("#agrup_det_grid input[type='checkbox']").prop("checked", false);
         marcar_todas_seleccionado = false;
      }

      //MARCAR_TODAS
      $.ajax({
         type:'POST',
         url: FUNCIONES_BASEPATH+'maestro_abm.php',
         data:{      
          "p_marca": accion,
          "id_menu":p_id_menu,
          "n_orden":8
         },
         dataType:'json',
         success: function( data ) {
             if(data.resultado == 'OK'){
               $('#agrup_det_grid').trigger('reloadGrid');
             }
             else{
                 mostrar_cuadro('E', 'Error', data.resultado);
                 return;
             }
         }
     }); 
      
  });

  $('#btn_limpiar').click(function(){
      $('#c_banco').val('');
      $('#d_banco').val('');
      $('#c_sucursal').val('');
      $('#d_sucursal').val('');
      $('#n_remito').val('');
      $('#f_desde').val('');
      $('#f_hasta').val('');
      $('#d_estado').val('');
      $('#n_ddjj_procesados').val('');
      $('#n_ddjj_acred').val('');
      $('#n_ddjj_err').val('');
      $("#check_automat").prop("checked", false);
      $("#check_manual").prop("checked", false);
      $("#agrup_det_grid").jqGrid('clearGridData');
      $('#btn_procesar').prop('disabled', false);
      $('#btn_procesar_casos').prop('disabled', false);
      llenar_checks();

      $('#btn_buscar').attr('disabled',false);
      $('#c_banco').attr('disabled',false);
      $('#d_banco').attr('disabled',false);
      $('#c_sucursal').attr('disabled',false);
      $('#d_sucursal').attr('disabled',false);
      $('#f_desde').attr('disabled',false);
      $('#f_hasta').attr('disabled',false);
      $('#n_remito').attr('disabled',false);
      $('#check_automat').attr('disabled',false);
      $('#check_manual').attr('disabled',false);
      $('#check_marcar_todas').attr('disabled',false);
      $('#mascara_lupa_banco').hide();
      $('#mascara_lupa_sucursal').hide();
      $('#mascara_lupa_remito').hide();
      $("#lupa_banco").show().css('display', 'table-cell');
      $("#lupa_sucursal").show().css('display', 'table-cell');
      $("#lupa_remito").show().css('display', 'table-cell');
      
      setea_parametros('#agrup_det_grid',{},'N');

  });

   $('#btn_casos_especiales').click(function(){
       let idRow = $('#agrup_det_grid').getGridParam('selrow');
       let cant_marcados = 0;
       let cant_filas = $('#agrup_det_grid').getGridParam('records');
       let aux = 0;
       for(let i = 0; i <= cant_filas; i++){
           if($('#check_select_'+i).is(":checked")){
               cant_marcados++;
               aux = i;
           }

       }
      if(cant_marcados == 1){
          p_remito_esp = parseInt($('#agrup_det_grid').getCell(aux, 'n_remito'));
          f_acred_esp = $('#agrup_det_grid').getCell(aux, 'f_acred');
          f_pago_esp = $('#agrup_det_grid').getCell(aux, 'f_pago');
          n_cantidad_procesados_esp = parseInt($('#agrup_det_grid').getCell(aux, 'n_cantidad_procesados'));

         cargar_casos_especiales();
      }else  if(cant_marcados > 1){
          mostrar_error('Debe tener seleccionado solo un item de la grilla.', 'E', true);

      }else{
         mostrar_error('Debe seleccionar un Remito', 'E', true);
      }
      
   });

   $('#btn_volver_casos').click(function(){
      borrar_tmp_casos_especiales();
      $('#casos_especiales_modal').modal('hide');
      $("#casos_especiales_grid").jqGrid('clearGridData');
   });


   $('#btn_procesar').click(function(){
      let cant_marcados = 0;
      let cant_filas = $('#agrup_det_grid').getGridParam('records');
      
      for(let i = 0; i <= cant_filas; i++){
         if($('#check_select_'+i).is(":checked")){
            cant_marcados++;
        }
      }

      if(cant_marcados <= 0){
         mostrar_error('Debe seleccionar una fila de la Tabla.');
      }else{
         mostrar_cuadro('Q', 'Confirmación',
	                    "Ud. Grabar&aacute; los cambios - Desea continuar?",
	                    function(){
	                    	procesar_remito();
	                    },
	                    function(){}, 500);
      }

      
      
   });

   $('#btn_procesar_casos').click(function(){
      let cant_filas = $('#casos_especiales_grid').getGridParam('records');
      let cant_marcados = 0;
      for(let i = 1; i <= cant_filas; i++){
         if($('#check_select_casos_'+i).is(":checked")){
            cant_marcados++;
         }
      }

      if(!$("#casos_especiales_grid").getGridParam('selrow') && cant_marcados <= 0 ){
         mostrar_error('Debe seleccionar al menos un registro para poder procesar', 'E', true);
      }else{
         mostrar_cuadro('Q', 'Confirmación',
	                    "Ud. Grabar&aacute; los cambios - Desea continuar?",
	                    function(){
                     
	                    	//procesar_casos_especiales
                        let idRow = $('#casos_especiales_grid').getGridParam('selrow');
                        
                         $.ajax({
                           type:'POST',
                           url: FUNCIONES_BASEPATH+'maestro_abm.php',
                           data:{      
                            "p_n_remito": p_remito_esp,
                            "p_estado": null,
                            "p_n_pagos_procesados": 0,
                            "p_n_pagos_acreditados": 0,
                            "p_n_pagos_erroneos": 0,
                            "p_n_ddjj_procesados": 0,
                            "p_n_ddjj_acreditados": 0,
                            "p_n_ddjj_erroneos": 0,
                            "p_f_remesa_rem": f_acred_esp,
                            "p_f_pago_rem": f_pago_esp,
                            "p_c_banco_rem": $('#c_banco').val(),
                            "p_d_banco_rem": $('#d_banco').val(),
                            "p_n_cantidad_rem": null,
                            "p_i_remito_rem": null,
                            "p_n_cantidad_procesados_rem": n_cantidad_procesados_esp,
                            "id_menu":p_id_menu,
                            "n_orden":1
                           },
                           dataType:'json',
                           success: function( data ) {
                              if(data.resultado == 'OK'){ 
                                 if(data.p_estado == 'Proceso de Acreditación Especial Finalizado Correctamente'){
                                    mostrar_cuadro('S', 'Caso Especial Procesado', data.p_estado);
                                 } else{
                                    mostrar_cuadro('I', 'Informaci&oacute;n', data.p_estado);
                                 }
                                 $('#btn_procesar').prop('disabled', true);

                                 //actualizar_tmp_acred_agrupado
                                 $.ajax({
                                    type:'POST',
                                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                                    data:{      
                                     "p_n_remito": p_remito_esp,
                                     "p_n_pagos_procesados": data.p_n_pagos_procesados,
                                     "p_n_pagos_acreditados": data.p_n_pagos_acreditados,
                                     "p_n_pagos_erroneos": data.p_n_pagos_erroneos,
                                     "id_menu":p_id_menu,
                                     "n_orden":5
                                    },
                                    dataType:'json',
                                    success: function( data ) {
                                        if(data.resultado == 'OK'){
                                          setea_parametros('#agrup_det_grid', {});
                                          $('#casos_especiales_modal').modal('hide');
                                          $('#casos_especiales_grid').jqGrid('clearGridData');
                                        }
                                        else{
                                            mostrar_cuadro('E', 'Error', data.resultado);
                                            return;
                                        }
                                    }
                                });
                                borrar_tmp_casos_especiales();
                              }
                              else{
                                 mostrar_cuadro('E', 'Error', data.resultado);
                                 return;
                              }
                           }
                       }); 
	                    },
	                    function(){}, 500);
      }

   
      
   });

    $('#f_hasta').datepicker("option",'maxDate',fecha_hoy);
    $('#f_desde').datepicker("option",'maxDate',fecha_hoy);
};