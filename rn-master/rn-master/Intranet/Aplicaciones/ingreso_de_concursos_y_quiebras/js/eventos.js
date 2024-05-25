function init_eventos(){
    $('#lupa_d_denominacion').hide();
    $('#div_main_grid').hide();
    $('#div_check_marcar_todas').hide();

    $('#btn_pasaje_tmps').hide();
    $("#n_cuit").mask("99-99999999-9");

   $('#c_tipo_instancia').attr('disabled', true);
   $('#d_tipo_instancia').attr('disabled', true);
   $('#n_cuit').attr('disabled', true);
   $('#d_denominacion').attr('disabled', true);
   $('#c_tipo_documento').attr('disabled', true);
   $('#d_tipo_documento').attr('disabled', true);
   $('#c_oficina').attr('disabled', true);
   $('#d_oficina').attr('disabled', true);
   $('#c_motivo').attr('disabled', true);
   $('#d_motivo').attr('disabled', true);
   $('#resolucion').attr('disabled', true);
   $('#f_conc_quiebra').attr('disabled', true);
   $('#f_vto').attr('disabled', true);
   $('#f_resolucion').attr('disabled', true);
   $('#observaciones').attr('disabled', true);

   $(".datepicker").datepicker({
    dateFormat:'dd/mm/yy',
    changeMonth:true,
    changeYear:true,
    dayNamesMin:['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
    monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
});

    $('#c_expediente').focusout(function(){
            try{
                if( $('#c_expediente').val() != '' ){

                    $.ajax({
                        type:'POST',
                        url: FUNCIONES_BASEPATH+'maestro_abm.php',
                        data:{
                            'p_c_expediente': $('#c_expediente').val(),
                            // 'p_f_origen':                 $('#f_origen').val(),
                            //   'p_id_contribuyente':        $('#id_contribuyente').val(),
                            //   'P_C_INSTANCIA':              $('#C_INSTANCIA').val(),
                            //   'P_C_SECTOR_ORIGEN':          $('#C_SECTOR_ORIGEN').val(),
                            //   'P_C_MOTIVO_ORIGEN':          $('#C_MOTIVO_ORIGEN').val(),
                            //   'P_F_RESOLUCION':            $('#F_RESOLUCION').val(),
                            //   'P_D_OBSERV':                 $('#D_OBSERV').val(),
                            //   'p_c_tributo':                 $('#c_tributo').val(),
                            //   'p_d_objeto_hecho'  :            $('#d_objeto_hecho').val(),
                            //   'p_f_vig_desde'      :           $('#f_vig_desde').val(),
                            //   'p_f_vig_hasta'       :         $('#f_vig_hasta').val(),
                            //   'p_f_cese_provisorio'  :          $('#f_cese_provisorio').val(),
                            //   'p_d_tributo'           :        $('#d_tributo').val(),
                            //   'p_m_ingresado_expediente':      $('#m_ingresado_expediente').val(),
                            //   'p_m_ingreso_expediente_vt':      $('#m_ingreso_expediente_vt').val(),
                            //   'p_m_juicio'                :    $('#m_juicio').val(),
                            //   'p_m_inspeccion'             :    $('#m_inspeccion').val(),
                            //   'p_m_intimacion'              :   $('#m_intimacion').val(),
                            //   'p_m_pfp'                      :  $('#m_pfp').val(),
                            "n_orden":0,
                            "id_menu":100132
                        },
                        dataType:'json',
                        success: function( data ) {
                            if(data.resultado != 'No se puede ingresar o modificar un concurso o quiebra homologado'){
                                $.ajax({
                                    type:'POST',
                                    url: FUNCIONES_BASEPATH+'maestro_abm.php',
                                   data:{
                                       'p_c_expediente': $('#c_expediente').val(),
                                      
                                       "n_orden":2,
                                       "id_menu":100132
                                    },
                                    dataType:'json',
                                   success: function( data ) {
                                       
                                    if(data.resultado != 'No se puede trabajar sobre instancias determinadas en termino cuando existen instancias determinadas en forma tardia'){
                                        $.ajax({
                                            type:'POST',
                                            url: "ingreso_de_concursos_y_quiebras/php/autocomplete.php",
                                              data: {oper:'2',term: $('#c_expediente').val()},
                                              dataType: 'json',
                                              success: function( data ) {
                                                  if(data) {
                                                       $("#c_tipo_instancia").val(data.C_INSTANCIA);
                                                       $("#d_tipo_instancia").val(data.D_INSTANCIA);
                                                       $("#n_cuit").val(data.N_CUIT);
                                                       $("#c_tributo").val(data.C_TRIBUTO);
                                                       $("#d_objeto_hecho").val(data.D_OBJETO_HECHO);
                                                       $("#d_denominacion").val(data.D_DENOMINACION);
                                                       $("#c_tipo_documento").val(data.C_TIPO_DOCUMENTO);
                                                       $("#d_tipo_documento").val(data.D_TIPO_DOCUMENTO);
                                                      $("#c_oficina").val(data.C_SECTOR_ORIGEN);
                                                      $("#d_oficina").val(data.D_SECTOR_ORIGEN);
                                                       $("#c_motivo").val(data.C_MOTIVO_ORIGEN);
                                                       $("#d_motivo").val(data.D_MOTIVO_ORIGEN);
                                                      $("#resolucion").val(data.D_RESOLUCION);
                                                       $("#f_conc_quiebra").val(data.F_ORIGEN);
                                                       $("#f_vto").val(data.F_VTO);
                                                      $("#f_resolucion").val(data.F_RESOLUCION);
                                                       $("#observaciones").val(data.D_OBSERV);
                                                       $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);
                                                             
                                                  }       
                                              }
                                          });
                                    }
                                    else {
                                           mostrar_cuadro('E', 'Error', 'No se puede trabajar sobre instancias determinadas en termino cuando existen instancias determinadas en forma tardia'); 
                                            return;
                                       }
                                    }
                                });        

                            }
                            else {
                                mostrar_cuadro('E', 'Error', 'No se puede ingresar o modificar un concurso o quiebra homologado'); 
                                return;
                            }
                        }
                    });        
        
                }
            }catch(err){
            }
    });

    $('#btn_buscar').click(function(){     
        $('#lupa_c_formulario').hide();
        $('#lupa_c_origen').hide();
        $('#lupa_c_tributo').hide();
        $('#lupa_c_concepto').hide();

        if( $('#c_expediente').val() == ''){
            mostrar_cuadro('E', 'Error','Se debe ingresar el expediente');
        }else{
            $('#c_expediente').attr('disabled', true);
            $('#c_tipo_instancia').attr('disabled', true);
            $('#d_tipo_instancia').attr('disabled', true);
            $('#n_cuit').attr('disabled', true);
            $('#d_denominacion').attr('disabled', true);
            $('#c_tipo_documento').attr('disabled', true);
            $('#d_tipo_documento').attr('disabled', true);
            $('#c_oficina').attr('disabled', true);
            $('#d_oficina').attr('disabled', true);
            $('#c_motivo').attr('disabled', true);
            $('d_motivo').attr('disabled', true);
            $('#resolucion').attr('disabled', true);
            $('#f_conc_quiebra').attr('disabled', true);
            $('#f_vto').attr('disabled', true);
            $('#f_resolucion').attr('disabled', true);
            $('#observaciones').attr('disabled', true);
            $('#div_main_grid').show();
            $('#div_check_marcar_todas').show();


          
            $.ajax({
                type:'POST',
                url: FUNCIONES_BASEPATH+'maestro_abm.php',
                data:{
                    'p_f_origen':                 $('#f_conc_quiebra').val(),
                    'p_id_contribuyente':        $('#id_contribuyente').val(),
                    'p_c_tributo':                 null,

                    'p_c_expediente': $('#c_expediente').val(),
                       
                       'P_D_OBSERV':                 $('#observaciones').val(),
                       'P_F_RESOLUCION':            $('#f_resolucion').val(),

                       'p_d_objeto_hecho'  :            null,
                       'p_f_vig_desde'      :           null,
                       'p_f_vig_hasta'       :         null,
                       'p_f_cese_provisorio'  :          null,
                       'p_d_tributo'           :        null,
                       'p_m_ingresado_expediente':      null,
                       'p_m_ingreso_expediente_vt':      null,
                       'p_m_juicio'                :    null,
                       'p_m_inspeccion'             :   null,
                       'p_m_intimacion'              :   null,
                       'p_m_pfp'                      :  null,
                       'p_c_instancia':              $('#c_tipo_instancia').val(),
                       'p_sector_origen':          $('#c_oficina').val(),
                       'p_c_motivo_origen':          $('#c_motivo').val(),
                    "n_orden":1,
                    "id_menu":100132
                },
                dataType:'json',
                success: function( data ) {
                    if(data.resultado != 'OK'){

                        mostrar_cuadro('E', 'Error', 'Falló la carga de datos a la grilla'); 
                    }else{
                         setea_parametros('#main_grid',{':p_c_expediente':$('#c_expediente').val()});
                         $('#btn_buscar').attr('disabled', true);
                         //$('#1').attr('data-toggle', 'tab');


                    }
                }
            });
        } 
    });
    
    $('#btn_limpiar').click(function(){
        $('#n_cuit').val(null);
        $('#d_denominacion').val(null);
        $('#c_expediente').val(null);
        $('#c_tipo_instancia').val(null);
        $('#d_tipo_instancia').val(null);
        $('#c_oficina').val(null);
        $('#d_oficina').val(null);
        $('#resolucion').val(null);
        $('#f_conc_quiebra').val(null);
        $('#f_vto').val(null);
        $('#f_resolucion').val(null);
        $('#observaciones').val(null);
        $('#c_motivo').val(null);
        $('#d_motivo').val(null);

        $('#main_grid').clearGridData();
        $('#detalles_grid').clearGridData();
        setea_parametros('#main_grid',{':p_c_expediente':null});
        setea_parametros('#detalles_grid',{':p_c_expediente':null});

        $('#lupa_d_denominacion').hide();
        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');

        $('#c_expediente').attr('disabled', false);

        $('#lupa_c_formulario').show();
        $('#lupa_c_origen').show();
        $('#lupa_c_tributo').show();
        $('#lupa_c_concepto').show();
        $('#div_main_grid').hide();
        $('#btn_pasaje_tmps').hide();
    });
}


$('#check_marcar_todas').change(function(){
    let accion = 'N';
    if(!marcar_todas_seleccionado){
       //$("#agrup_det_grid input[type='checkbox']").prop("checked", true);
       accion = 'S';
       marcar_todas_seleccionado = true;
    }else{
       accion = 'N';
       //$("#agrup_det_grid input[type='checkbox']").prop("checked", false);
       marcar_todas_seleccionado = false;
    }

    //MARCAR_TODAS
    $.ajax({
       type:'POST',
       url: FUNCIONES_BASEPATH+'maestro_abm.php',
       data:{      
        "p_marca": accion,
        "p_c_expediente": $('#c_expediente').val(),
        "id_menu":100132,
        "n_orden":3
       },
       dataType:'json',
       success: function( data ) {
           if(data.resultado == 'OK'){
             $('#main_grid').trigger('reloadGrid');
             setea_parametros('#main_grid',{':p_c_expediente':$('#c_expediente').val()});

           }
           else{
               mostrar_cuadro('E', 'Error', data.resultado);
               return;
           }
       }
   }); 
    
});



$('#1').click(function(){  
    let idRow = $('#main_grid').getGridParam('selrow');
    let cant_marcados = 0;
    let cant_filas = $('#main_grid').getGridParam('records');
    let aux = 0;
    for(let i = 0; i <= cant_filas; i++){
        if($('#check_select_'+i).is(":checked")){
            cant_marcados++;
            aux = i;
        }
    }
    if(cant_marcados==0){
        //mostrar_error('Debe tener seleccionado por lo menos un item de la grilla.', 'E', true);
        //$('#0').addClass('active');
       // $('#1').removeClass('active');
		activeTab(0);

       return;
    }else{
        $('#1').attr('data-toggle', 'tab');

        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{   
             "p_id_sesion":   $('#main_grid').getCell(1, 'id_sesion'), 
             "id_menu":100132,
             "n_orden":4
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    setea_parametros('#detalles_grid',{':p_id_sesion':$('#main_grid').getCell(1, 'id_sesion') });
                    
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });

    }
  
} );

function selectCheck(id_fila){
    let fila_chequeada = $('#'+id_fila).is(':checked');

    let num_fila = id_fila.split('_')[2];
    let marca = 'N';

    if(fila_chequeada){
        marca = 'S';
    }
    
    //PRC_ACTUALIZAR_MARCA_ACRED
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_marca": marca,
         "p_c_expediente": $('#c_expediente').val(), //$('#agrup_det_grid').getCell(num_fila, 'n_remito'),
         "p_d_objeto_hecho": $('#main_grid').getCell(num_fila, 'd_objeto_hecho'),
         "id_menu":100132,
         "n_orden":6
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#main_grid').trigger('reloadGrid');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}

$('#check_marcar_todas_deuda').change(function(){
    let accion = 'N';
    if(!marcar_todas_seleccionado){
       //$("#agrup_det_grid input[type='checkbox']").prop("checked", true);
       accion = 'S';
       marcar_todas_seleccionado = true;
    }else{
       accion = 'N';
       //$("#agrup_det_grid input[type='checkbox']").prop("checked", false);
       marcar_todas_seleccionado = false;
    }

    //MARCAR_TODAS_DEUDA
    $.ajax({
       type:'POST',
       url: FUNCIONES_BASEPATH+'maestro_abm.php',
       data:{      
        "p_marca": accion,
        "p_id_sesion": $('#main_grid').getCell(1, 'id_sesion'),
        "id_menu":100132,
        "n_orden":8
       },
       dataType:'json',
       success: function( data ) {
           if(data.resultado == 'OK'){
             $('#detalles_grid').trigger('reloadGrid');
             setea_parametros('#detalles_grid',{':p_id_sesion':$('#main_grid').getCell(1, 'id_sesion') });

           }
           else{
               mostrar_cuadro('E', 'Error', data.resultado);
               return;
           }
       }
   }); 
    
});

$('#btn_generar').click(function(){     

      
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{
                'p_id_sesion':                $('#main_grid').getCell(1, 'id_sesion'),
                'p_c_expediente': $('#c_expediente').val(),
                "n_orden":5,
                "id_menu":100132
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado != 'El Concurso/Quiebra ha sido generado satisfactoriamente'){

                    mostrar_cuadro('E', 'Error', 'Falló la generación del concurso.'); 
                }else{
                     mostrar_cuadro('Q', 'Confirmación','Concurso generado exitosamente');
                     activeTab(0);

                     $('#2').addClass('active');


                }
            }
        });
    } );


function selectCheckDeuda(id_fila){
    let fila_chequeada = $('#'+id_fila).is(':checked');

    let num_fila = id_fila.split('_')[3];
    console.log('id fila:' + id_fila);
    console.log('num fila:' + num_fila);
    let marca = 'N';

    if(fila_chequeada){
        marca = 'S';
    }
    
    //PRC_ACTUALIZAR_MARCA_DET
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{     
            "p_id_sesion": $('#main_grid').getCell(1, 'id_sesion'), 
            "p_m_seleccion_deuda": marca,
            "p_id_obligacion":  $('#detalles_grid').getCell(num_fila, 'id_obligacion'),
            "p_c_concepto_mov": $('#detalles_grid').getCell(num_fila, 'c_concepto_mov'),
            "id_menu":100132,
            "n_orden":7
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                $('#main_grid').trigger('reloadGrid');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}
function inicializarLupas(){
    
    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_tributos,
        titulos:['Tipo','Descrip'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'LISTADO DE TRIBUTOS DE INGRESOS DE BRUTOS',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
        exactField: 'c_codigo'
    });

    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() != ''){
            try{
                if( limpia_cuit($('#n_cuit').val()).length == 11 ){
                    $.ajax({
                        type:'POST',
                        url: "modif_e_ingreso_de_DDJJ_procesadas_con_error/php/autocomplete.php",
                        data: {oper:'2',term: limpia_cuit($('#n_cuit').val())},
                        dataType: 'json',
                        success: function( data ) {
                            ajax_autocomplete = null;
                            if(data) {
                                $("#d_denominacion").val(data.DENOMINACION);
                                $("#c_tipo_documento").val(data.C_TIPO_DOCUMENTO);
                                $("#d_tipo_documento").val(data.D_TIPO_DOCUMENTO);
                                $("#nro_documento").val(data.N_DOCUMENTO);

                                //$("#d_objeto_hecho").val(data.D_OBJETO_HECHO);
                                $("#id_contribuyente").val(data.ID_CONTRIBUYENTE);          
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

    $('#d_denominacion').keydown(function () {
        if ($('#d_denominacion').val().length >= 2){
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
        } else {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        }
    });
}

function activeTab(tabs){
	$('#tabs a[id="'+tabs+'"]').tab('show');
	$(window).resize();
    $(".selectpicker").selectpicker('refresh');
    
}

function inicializa_lupas_main_grid(formid){

    $("#tipo_plan", formid).lupa_generica({
        id_lista:v_lista_tipo_plan,
        titulos:['Tipo Plan','Descripcion Plan'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'LISTADO DE PLANES DE FISCALIZACION',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'tipo_plan',d_descrip: 'D_TIPO_PLAN '},
        keyNav:true,
        searchInput: '#tipo_plan',
        searchCode: true
    }); 
}