function inicializarLupas(){
    $("#lupa_d_denominacion").lupa_generica({
        id_lista:v_lista_denominaciones,
        titulos:['ID Contribuyente', 'CUIT', 'Apellidos y Nombre / Razón Social', 'Tipo', 'Tipo Documento', 'Nro. Documento'],
        grid:[
            {index:'id_contribuyente',width:450, hidden: true},
            {index:'n_cuit',width:100},
            {index:'d_denominacion',width:450},
            {index:'c_tipo_documento',width:100},
            {index:'d_tipo_documento',width:150, hidden: true},
            {index:'n_documento',width:150}
        ],
        caption:'Listado de Contribuyentes',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#d_denominacion'],
        filtrosNulos:[true],
        campos:{
            id_contribuyente: 'id_contribuyente',
            n_cuit: 'n_cuit',
            d_denominacion:'d_denominacion',
            c_tipo_documento: 'c_tipo_doc',
            d_tipo_documento: 'd_tipo_doc',
            n_documento: 'n_documento'
        },
        keyNav:true,
        draggable:true,
        onClose: function(){
            if($('#n_cuit').val()){
                $('#lupa_d_objeto_hecho_2').show()
                $('#mascara_lupa_d_objeto_hecho_2').hide();
            } else{
                $('#lupa_d_objeto_hecho_2').hide();
                $('#mascara_lupa_d_objeto_hecho_2').show();
            }
        }
    });


    $("#lupa_d_objeto_hecho_2").lupa_generica({
        id_lista:v_lista_objetos,
        titulos:['Objeto / Hecho', 'ID contribuyente', 'Nro. Plan de Pago'],
        grid:[
            {index:'d_objeto_hecho',width:200},
            {index:'id_contribuyente',width:200, hidden:true},
            {index:'n_plan_pago',width:200}
        ],
        caption:'Listado de Objetos / Hechos',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        filtros:['#c_tipo_imp', '#d_objeto_hecho_2', '#id_contribuyente'],
        filtrosNulos:[false, true, true],
        filtrosTitulos: ['Tipo Imponible'],
        campos:{
            d_objeto_hecho: 'd_objeto_hecho_2',
            id_contribuyente: 'id_contribuyente',
            n_plan_pago: 'n_plan_pago'
        },
        keyNav:true,
        draggable:true,
    });

    $("#lupa_tipo_doc").lupa_generica({
        id_lista:v_lista_tipo_doc,
        titulos:['Código', 'Descripción'],
        grid:[
            {index:'c_dato',width:100},
            {index:'d_dato',width:450}
        ],
        caption:'Listado de Tipos de Documentos',
        sortname:'c_dato',
        sortorder:'asc',
        searchInput: '#c_tipo_doc',
        searchCode: true,
        exactField: 'c_dato',
        campos:{
            c_dato: 'c_tipo_doc',
            d_dato: 'd_tipo_doc'
        },
        keyNav:true,
        draggable:true,
    });

    $("#lupa_tipo_imp").lupa_generica({
        id_lista:v_lista_tipo_imp,
        titulos:['Código', 'Descripción'],
        grid:[
            {index:'c_dato',width:100},
            {index:'d_dato',width:450}
        ],
        caption:'Listado de Tipos Imponibles',
        sortname:'c_dato',
        sortorder:'asc',
        searchInput: '#c_tipo_imp',
        searchCode: true,
        exactField: 'c_dato',
        campos:{
            c_dato: 'c_tipo_imp',
            d_dato: 'd_tipo_imp'
        },
        keyNav:true,
        draggable:true,
    });

    $("#lupa_n_plan_pago").lupa_generica({
        id_lista:v_lista_planes_pago,
        titulos:['Cód. Tipo Plan Pago', 'Nro. Plan', 'Descripción', 'CUIT', 'Contribuyente', 'T. Imponible', 'Objeto / Hecho'],
        grid:[
            {index:'c_tipo_plan_pago',width:100},
            {index:'n_plan_pago',width:100},
            {index:'d_descrip',width:450},
            {index:'n_cuit',width:100},
            {index:'d_denominacion',width:450},
            {index:'c_tipo_imponible',width:100},
            {index:'d_objeto_hecho',width:150},
        ],
        caption:'Lista de Planes de Pago',
        sortname:'n_plan_pago',
        sortorder:'desc',
        /*searchInput: '#n_plan_pago',
        searchCode: true,
        exactField: 'n_plan_pago',*/
        filtros:['#operacion', '#id_contribuyente'],
        filtrosNulos:[true, false],
        filtrosTitulos:[null, 'CUIT o Denominación'],
        campos:{
            n_plan_pago: 'n_plan_pago',
            n_cuit: 'n_cuit',
            d_denominacion: 'd_denominacion',
            c_tipo_imponible: 'c_tipo_imp',
            d_objeto_hecho: 'd_objeto_hecho_2',
            c_tipo_plan_pago: 'c_tipo_plan_pago'
        },
        keyNav:true,
        draggable:true,
        onClose: function(){
            if($('#c_tipo_imp').val()){
                $('#c_tipo_imp').blur();
            }
        }
    });

    $("#lupa_caducidad").lupa_generica({
        id_lista:v_lista_motivo_cad,
        titulos:['Código', 'Descripción'],
        grid:[
            {index:'c_dato',width:100},
            {index:'d_dato',width:450}
        ],
        caption:'Listado de Motivos Caducidad',
        sortname:'c_dato',
        sortorder:'asc',
        searchInput: '#c_caducidad',
        searchCode: true,
        exactField: 'c_dato',
        campos:{
            c_dato: 'c_caducidad',
            d_dato: 'd_caducidad'
        },
        keyNav:true,
        draggable:true,
    });
}

function bloquear_filtros(){
    $('#n_plan_pago').prop('disabled', true);
    $('#c_tipo_plan_pago').prop('disabled', true);
    $('#n_cuit').prop('disabled', true);
    $('#d_denominacion').prop('disabled', true);
    $('#c_tipo_doc').prop('disabled', true);
    $('#d_tipo_doc').prop('disabled', true);
    $('#n_documento').prop('disabled', true);
    $('#c_tipo_imp').prop('disabled', true);
    $('#d_tipo_imp').prop('disabled', true);
    $('#d_objeto_hecho_2').prop('disabled', true);

    $('#lupa_n_plan_pago').hide();
    $('#mascara_lupa_n_plan_pago').show().css('display', 'table-cell');
    $('#lupa_tipo_doc').hide();
    $('#mascara_lupa_tipo_doc').show().css('display', 'table-cell');
    $('#lupa_tipo_imp').hide();
    $('#mascara_lupa_tipo_imp').show().css('display', 'table-cell');
    $('#lupa_d_objeto_hecho_2').hide();
    $('#mascara_lupa_d_objeto_hecho_2').show().css('display', 'table-cell');
}

function desbloquear_filtros(){
    $('#n_plan_pago').prop('disabled', false);
    $('#c_tipo_plan_pago').prop('disabled', false);
    $('#n_cuit').prop('disabled', false);
    $('#d_denominacion').prop('disabled', false);
    $('#c_tipo_doc').prop('disabled', false);
    $('#d_tipo_doc').prop('disabled', false);
    $('#n_documento').prop('disabled', false);
    $('#c_tipo_imp').prop('disabled', false);
    $('#d_tipo_imp').prop('disabled', false);
    $('#d_objeto_hecho_2').prop('disabled', false);

    $('#lupa_n_plan_pago').show().css('display', 'table-cell');
    $('#mascara_lupa_n_plan_pago').hide();
    $('#lupa_tipo_doc').show().css('display', 'table-cell');
    $('#mascara_lupa_tipo_doc').hide();
    $('#lupa_tipo_imp').show().css('display', 'table-cell');
    $('#mascara_lupa_tipo_imp').hide();
}

function definir_caducidad(row_id){
    //VALIDACION_CADUCIDAD_ANULACION
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_c_tipo_plan_pago": $('#c_tipo_plan_pago').val(),
         "p_n_plan_pago": $('#n_plan_pago').val(),
         "p_operacion": v_operacion,
         "id_menu":v_id_menu,
         "n_orden":2
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
              if(data.p_mensaje_error){
                mostrar_cuadro('E', 'Error', data.p_mensaje_error);
              }
              $('#btn_editar_resumen').show();
              v_c_caducidad_aux = data.p_c_caducidad_aux;
              v_d_caducidad = data.p_d_caducidad;
              $('#resumen_grid').setCell(row_id, 'c_caducidad', v_c_caducidad_aux);
              $('#resumen_grid').setCell(row_id, 'd_caducidad', v_d_caducidad);

              if(v_operacion == 'CADUCIDAD' && v_c_caducidad_aux){
                if(!$('#resumen_grid').getCell(row_id, 'f_caducidad')){
                    $('#btn_aviso_caducidad').show();
                    $('#btn_const_caducidad').hide();
                } else{
                    $('#btn_aviso_caducidad').hide();
                    $('#btn_const_caducidad').show();
                }
              }
              return;
            }
            else{
                $('#btn_editar_resumen').hide();
                mostrar_cuadro('E', 'Error', data.resultado);
                if(data.resultado == 'El plan no esta en condiciones de caducidad'){
                    $('#resumen_grid').jqGrid('delRowData',row_id);
                    if($('#resumen_grid').getGridParam('records') <= 0){
                        $('#btn_limpiar').trigger('click');
                    }
                    else if($('#resumen_grid').getGridParam('records') == 1){
                        $('#resumen_grid').jqGrid('setSelection', 1);
                    }
                    return;
                }
                if(data.p_mensaje_error){
                    mostrar_cuadro('E', 'Error', data.p_mensaje_error);
                }
                if(v_operacion == 'CADUCIDAD'){
                    return;
                } else{
                    v_c_caducidad_aux = data.p_c_caducidad_aux;
                    v_d_caducidad = data.p_d_caducidad;
                    $('#resumen_grid').setCell(row_id, 'c_caducidad', v_c_caducidad_aux);
                    $('#resumen_grid').setCell(row_id, 'd_caducidad', v_d_caducidad);
                    return;
                }
            }
        }
    }); 
}

function imprimir_reporte_aviso_caduc(){
    let parametros = 'N_PLAN_PAGO|' + $('#n_plan_pago').val() + 
                    '&C_TIPO_PLAN_PAGO|' + $('#c_tipo_plan_pago').val();
            
    llamar_report('FACPL042', parametros, 'PDF');
}

function imprimir_reporte_constancia_caduc(){
    let parametros = 'N_PLAN_PAGO|' + $('#n_plan_pago').val() + 
                    '&C_TIPO_PLAN_PAGO|' + $('#c_tipo_plan_pago').val();
            
    llamar_report('FACPL041', parametros, 'PDF');
}

function actualizacion_anulacion_caducidad(){
    let row_id = $('#resumen_grid').getGridParam('selrow');

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_operacion": v_operacion,
         "p_n_plan_pago": $('#n_plan_pago').val(),
         "p_c_tipo_plan_pago": $('#c_tipo_plan_pago').val(),
         "p_f_emision": $('#resumen_grid').getCell(row_id, 'f_emision'),
         "id_menu":v_id_menu,
         "n_orden":4
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado === 'OK'){
              $('#modificacion_modal').modal('hide');
              $('#c_caducidad').val(null);
              $('#f_caducidad').val(null);
              if(v_operacion === 'ANULACION'){
                mostrar_cuadro('S', 'Información', 'Se ha anulado el plan.',function(){
                    $("#resumen_grid").trigger("reloadGrid");
                    $('#btn_limpiar').trigger('click');
                    v_no_carga_inicial_pp = false;
                    },null,400);
              } else{
                mostrar_cuadro('S', 'Información', 'Se ha caducado el plan.',function(){
                    $("#resumen_grid").trigger("reloadGrid");
                    $('#btn_limpiar').trigger('click');
                    v_no_carga_inicial_pp = false;
                    },null,400);
                if(!$('#resumen_grid').getCell(row_id, 'f_caducidad')){
                    $('#btn_aviso_caducidad').show();
                    $('#btn_const_caducidad').hide();
                } else{
                    $('#btn_aviso_caducidad').hide();
                    imprimir_reporte_constancia_caduc();
                }
              }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
            }
        }
    }); 
}