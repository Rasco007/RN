function inicializarLupas(){
    $("#lupa_tipo_form").lupa_generica({
        id_lista:v_lista_tipo_form,
        titulos:['Código', 'Descripción'],
        grid:[
            {index:'c_dato',width:100},
            {index:'d_dato',width:450}
        ],
        caption:'Listado de Formularios',
        sortname:'c_dato',
        sortorder:'asc',
        searchInput: '#c_tipo_form',
        searchCode: true,
        exactField: 'c_dato',
        campos:{
            c_dato: 'c_tipo_form',
            d_dato: 'd_tipo_form'
        },
        keyNav:true,
        draggable:true,
        onClose: function(){
            $('#c_tipo_form').trigger('change');
            if($('#c_tipo_form').val()){
                $('#div_d_comprobante').prop('hidden', false);
            }
            v_hay_cambios = 'S';
        }
    });

    $("#lupa_tributo").lupa_generica({
        id_lista:v_lista_tributo,
        titulos:['Código', 'Descripción', 'Tipo Imponible', 'n_tabla', 'Cod. Concepto', 'Desc. Concepto'],
        grid:[
            {index:'c_tributo',width:100},
            {index:'d_descrip',width:450},
            {index:'c_tipo_imponible',width:100},
            {index:'n_tabla_tipo_imp',width:100, hidden: true},
            {index:'c_concepto',width:100},
            {index:'d_concepto',width:450}
        ],
        caption:'Listado de Tributos',
        sortname:'c_tributo',
        sortorder:'asc',
        searchInput: '#c_tributo',
        searchCode: true,
        exactField: 'c_tributo',
        filtros:['#c_tipo_form'],
        filtrosNulos:[false],
        filtrosTitulos:['Formulario'],
        campos:{
            c_tributo: 'c_tributo',
            d_descrip: 'd_tributo',
            c_concepto: 'c_concepto',
            d_concepto: 'd_concepto'
        },
        keyNav:true,
        draggable:true,
    });

    $("#lupa_concepto").lupa_generica({
        id_lista:v_lista_concepto,
        titulos:['Código', 'Descripción'],
        grid:[
            {index:'c_concepto',width:100},
            {index:'d_concepto',width:450}
        ],
        caption:'Listado de Conceptos',
        sortname:'c_concepto',
        sortorder:'asc',
        searchInput: '#c_concepto',
        searchCode: true,
        exactField: 'c_concepto',
        filtros:['#c_tributo', '#c_tipo_form'],
        filtrosNulos:[false, false],
        filtrosTitulos:['Tributo', 'Formulario'],
        campos:{
            c_concepto: 'c_concepto',
            d_concepto: 'd_concepto'
        },
        keyNav:true,
        draggable:true,
    });
    $("#lupa_objeto_hecho").lupa_generica({
        id_lista:v_lista_objeto_hecho,
        titulos:['Nro. Inscripción', 'N° Cuit', 'Contribuyente', 'id_contribuyente'],
        grid:[
            {index:'d_objeto_hecho',width:200},
            {index:'n_cuit',width:100, hidden: true},
            {index:'d_denominacion',width:450},
            {index:'id_contribuyente', width:100, hidden: true}
        ],
        caption:'Listado de Números de Inscripción',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        filtros:['#c_tributo', '#c_concepto', '#id_contribuyente', '#d_objeto_hecho'],
        filtrosNulos:[false, false, true, true],
        filtrosTitulos:['Tributo', 'Concepto'],
        campos:{
            d_objeto_hecho: 'd_objeto_hecho',
            n_cuit: 'n_cuit',
            d_denominacion: 'd_denominacion',
            id_contribuyente: 'id_contribuyente'
        },
        keyNav:true,
        draggable:true,
        onClose: function(){
            $("#n_cuit").mask("99-99999999-9");
            $('#n_cuit').trigger('focusout');
            v_hay_cambios = 'S';
        }
    });

    $("#lupa_pos_fiscal").lupa_generica({
        id_lista:v_lista_pos_fiscal,
        titulos:['Nro. Pos. Fiscal', 'n_secuencia_obl', 'Id Obligacion', 'Intimacion', 'Id Plan Pago', 'Cuota'],
        grid:[
            {index:'n_posicion_fiscal',width:150},
            {index:'n_secuencia_obl',width:100, hidden: true},
            {index:'id_obligacion',width:100, hidden:true},
            {index:'m_intimacion', width:100, hidden: true},
            {index:'id_plan_pago', width:100, hidden: true},
            {index:'n_cuota_anticipo', width:100}
        ],
        caption:'Listado Posición Fiscal',
        sortname:'n_posicion_fiscal',
        sortorder:'desc',
        filtros:['#id_contribuyente', '#c_tributo', '#c_concepto', '#d_objeto_hecho'],
        filtrosNulos:[false, false, false, false],
        filtrosTitulos:['Contribuyente', 'Tributo', 'Concepto', 'Nro. Inscripción'],
        campos:{
            n_posicion_fiscal: 'n_pos_fiscal',
            n_cuota_anticipo: 'n_cuota',
            id_obligacion: 'id_obligacion',
            n_secuencia_obl: 'n_secuencia_obl'
        },
        keyNav:true,
        draggable:true,
        onClose: function(){
            if($('#n_pos_fiscal').val()){
                $('#n_pos_fiscal').trigger('focusout');
            }
            v_hay_cambios = 'S';
        }
    });

    $("#lupa_denominacion_per").lupa_generica({
        id_lista:v_lista_denominacion,
        titulos:['n_cuit', 'CUIT', 'Nombre', 'N° de Inscripción', 'ID Contribuyente'],
        grid:[
            {index:'n_cuit', width:100, hidden: true},
            {index:'cuit_format',width:100},
            {index:'d_denominacion',width:450},
            {index:'n_hecho',width:200},
            {index:'id_contribuyente', width:100, hidden: true}
        ],
        caption:'Listado de Nombres',
        width: 900,
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#d_denominacion_per'],
        filtrosNulos:[false],
        campos:{
            cuit_format: 'n_cuit_per',
            d_denominacion: 'd_denominacion_per',
            n_hecho: 'd_objeto_hecho_per',
            id_contribuyente: 'id_contribuyente_per'
        },
        keyNav:true,
        draggable:true
    });

    $("#lupa_denominacion_ret").lupa_generica({
        id_lista:v_lista_denominacion,
        titulos:['n_cuit', 'CUIT', 'Nombre', 'N° de Inscripción', 'ID Contribuyente'],
        grid:[
            {index:'n_cuit', width:100, hidden: true},
            {index:'cuit_format',width:100},
            {index:'d_denominacion',width:450},
            {index:'n_hecho',width:200},
            {index:'id_contribuyente', width:100, hidden: true}
        ],
        caption:'Listado de Nombres',
        width: 900,
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#d_denominacion_ret'],
        filtrosNulos:[false],
        campos:{
            cuit_format: 'n_cuit_ret',
            d_denominacion: 'd_denominacion_ret',
            n_hecho: 'd_objeto_hecho_ret',
            id_contribuyente: 'id_contribuyente_ret'
        },
        keyNav:true,
        draggable:true
    });

    $("#lupa_cuit").lupa_generica({
        id_lista:v_lista_contribuyentes,
        titulos:['id contribuyente', 'CUIT', 'Denominación', 'cod tipo documento', 'desc tipo documento'],
        grid:[
            {index:'id_contribuyente', width:100, hidden: true},
            {index:'n_cuit', width:100},
            {index:'d_denominacion',width:450},
            {index:'c_tipo_documento',width:100, hidden: true},
            {index:'d_tipo_documento',width:300, hidden: true}
        ],
        caption:'Listado de Contribuyentes',
        sortname:'n_cuit',
        sortorder:'asc',
        filtros:['#c_tributo', '#c_concepto', '#d_objeto_hecho'],
        filtrosNulos:[false, false, true],
        filtrosTitulos:['Tributo', 'Concepto'],
        campos:{
            n_cuit: 'n_cuit',
            d_denominacion: 'd_denominacion'
        },
        keyNav:true,
        draggable:true,
        onClose: function(){
            $("#n_cuit").mask("99-99999999-9");
            $('#n_cuit').trigger('focusout');
        }
    });
}

function habilitar_filtros(){
    $('#c_tipo_form').prop('disabled', false);
    $('#f_presentacion').prop('disabled', false);
    $('#c_tributo').prop('disabled', false);
    $('#c_concepto').prop('disabled', false);
    $('#d_objeto_hecho').prop('disabled', false);
    $('#n_cuit').prop('disabled', false);
    $('#n_pos_fiscal').prop('disabled', false);
    $('#n_cuota').prop('disabled', false);
    $('#d_comprobante').prop('disabled', false);
}

function deshabilitar_filtros(){
    $('#c_tipo_form').prop('disabled', true);
    $('#f_presentacion').prop('disabled', true);
    $('#c_tributo').prop('disabled', true);
    $('#c_concepto').prop('disabled', true);
    $('#d_objeto_hecho').prop('disabled', true);
    $('#n_cuit').prop('disabled', true);
    $('#n_pos_fiscal').prop('disabled', true);
    $('#n_cuota').prop('disabled', true);
    $('#d_comprobante').prop('disabled', true);
}

function habilitar_tabs(){
    deshabilitar_filtros();

    $('#lupa_objeto_hecho').hide();
    $('#mascara_lupa_objeto_hecho').show().css('display', 'table-cell');
    $('#lupa_tributo').hide();
    $('#mascara_lupa_tributo').show().css('display', 'table-cell');
    $('#lupa_concepto').hide();
    $('#mascara_lupa_concepto').show().css('display', 'table-cell');
    $('#lupa_tipo_form').hide();
    $('#mascara_lupa_tipo_form').show().css('display', 'table-cell');
    $('#lupa_pos_fiscal').hide();
    $('#mascara_lupa_pos_fiscal').show().css('display', 'table-cell');
    $('#lupa_cuit').hide();
    $('#mascara_lupa_cuit').show().css('display', 'table-cell');

    $('#tabs_grid').prop('hidden', false);

    mostrar_tabs();
    $('#btn_grabar').prop('disabled', false);
}

function validar_pos_fiscal(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_id_contribuyente": $('#id_contribuyente').val(),
         "p_d_objeto_hecho": $('#d_objeto_hecho').val(),
         "p_c_tributo": $('#c_tributo').val(),
         "p_c_concepto": $('#c_concepto').val(),
         "p_c_caracteristica": null,
         "p_c_tipo_form": $('#c_tipo_form').val(),
         "p_n_cuit": limpia_cuit($('#n_cuit').val()),
         "p_f_presentacion": $('#f_presentacion').val(),
         "p_n_posicion_fiscal": $('#n_pos_fiscal').val(),
         "p_n_cuota": $('#n_cuota').val(),
         "p_id_obligacion": $('#id_obligacion').val(),
         "p_n_secuencia_pres": $('#n_secuencia_pres').val(),
         "id_menu":v_id_menu,
         "n_orden":2
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
              if(data.p_alerta){
                mostrar_cuadro('Q', 'Confirmación',
	                    "EL AGENTE DEBE PRESENTAR DJS POR SIRCAR. ESTA SEGURO QUE CORRESPONDE LA CARGA DE UNA DJ MANUAL?. ",
	                    function(){
	                    	$('#d_presentacion').val(data.p_d_presentacion);
                            $('#n_secuencia_pres').val(data.p_n_secuencia_pres);
                            $('#id_obligacion').val(data.p_id_obligacion);
                            $('#n_cuota').val(data.p_n_cuota);
                            $('#id_ddjj').val(data.p_id_ddjj);

                            habilitar_tabs();
	                    },
	                    function(){
                            limpiar_form();
                        }, 500);
              } else{
                    $('#d_presentacion').val(data.p_d_presentacion);
                    $('#n_secuencia_pres').val(data.p_n_secuencia_pres);
                    $('#id_obligacion').val(data.p_id_obligacion);
                    $('#n_cuota').val(data.p_n_cuota);
                    $('#id_ddjj').val(data.p_id_ddjj);

                    habilitar_tabs();
              }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function mostrar_tabs(){
    if($('#c_tipo_form').val() == v_form_ret || $('#c_tipo_form').val() == v_form_ret1){
        $('#etiqueta_tab_retenciones').show();
        $('#btn_tab_retenciones').trigger('click');
    } 
    else if($('#c_tipo_form').val() == v_form_per){
        $('#etiqueta_tab_percepciones').show();
        $('#btn_tab_percepciones').trigger('click');
    }
    else{
        $('#etiqueta_tab_sellos').show();
        $('#btn_tab_sellos').trigger('click');
    }
}

function abm_percepciones(){
    let v_fila;
    if(v_oper == 'add'){
        v_fila = $('#percepciones_grid').getGridParam('records') + 1;
        if($('#aux_hijos_per').val()){
            $('#aux_hijos_per').val($('#aux_hijos_per').val() + 1)
        }else{$('#aux_hijos_per').val(1)};

        $('#n_secuencia_det_per').val($('#aux_hijos_per').val());
        $('#n_comprobante_dep_per').val($('#d_comprobante_2').val());
        $('#n_comprobante_ddjj_per').val($('#d_comprobante').val());
    } else{
        v_fila = $('#percepciones_grid').getCell($('#percepciones_grid').getGridParam('selrow'), 'n_fila');
    }

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_oper": v_oper,
         "p_id_ddjj": $('#id_ddjj').val(),
         "p_n_secuencia_det": $('#n_secuencia_det_per').val(),
         "p_id_obligacion": $('#id_obligacion').val(),
         "p_n_secuencia_obl": $('#n_secuencia_obl').val(),
         "p_n_secuencia_pres": $('#n_secuencia_pres').val(),
         "p_f_cobranza": $('#f_cobranza_per').val(),
         "p_id_contribuyente": $('#id_contribuyente_per').val(),
         "p_d_denominacion": $('#d_denominacion_per').val(),
         "p_n_hecho": $('#d_objeto_hecho_per').val(),
         "p_n_cuit": limpia_cuit($('#n_cuit_per').val()),
         "p_i_base_imponible": $('#i_base_imponible_per').val(),
         "p_i_percibido": $('#i_percibido_per').val(),
         "p_n_comprobante_dep": $('#n_comprobante_dep_per').val(),
         "p_n_comprobante": $('#n_comprobante_per').val(),
         "p_f_comprobante": $('#f_comprobante_per').val(),
         "p_n_comprobante_ddjj": $('#n_comprobante_ddjj_per').val(),
         "p_p_coeficiente":null,
         "p_c_tipo_comprobante":null,
         "p_f_percepcion_original":null,
         "p_c_concepto":null,
         "p_n_tabla_concepto":null,
         "p_c_origen_fondos":null,
         "p_p_coef_distrib":null,
         "p_factor_de_impuesto":null,
         "p_autodecl_o_padron":null,
         "p_n_fila": v_fila,
         "id_menu":v_id_menu,
         "n_orden":4
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                if(v_oper == 'add' || v_oper == 'edit'){
                    $('#abm_percepciones_modal').modal('hide');
                    $('#btn_limpiar_per').trigger('click');
                }
                $("#percepciones_grid").trigger("reloadGrid");
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function abm_retenciones(){
    let v_fila;
    if(v_oper == 'add'){
        v_fila = $('#retenciones_grid').getGridParam('records') + 1;

        if($('#aux_hijos_ret').val()){
            $('#aux_hijos_ret').val(parseInt($('#aux_hijos_ret').val()) + 1)
        }else{$('#aux_hijos_ret').val(parseInt(1))};

        $('#n_secuencia_det_ret').val($('#aux_hijos_ret').val());
        $('#d_comprobante_ret').val($('#d_comprobante').val());
        if(!$('#p_coeficiente_ret').val()){
            $('#p_coeficiente_ret').val(0);
        }
    } else{
        v_fila = $('#retenciones_grid').getCell($('#retenciones_grid').getGridParam('selrow'), 'n_fila');
    }

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_oper": v_oper,
         "p_id_ddjj": $('#id_ddjj').val(),
         "p_n_secuencia_det": $('#n_secuencia_det_ret').val(),
         "p_id_obligacion": $('#id_obligacion').val(),
         "p_n_secuencia_obl": $('#n_secuencia_obl').val(),
         "p_n_secuencia_pres": $('#n_secuencia_pres').val(),
         "p_f_retencion": $('#f_retencion_ret').val(),
         "p_id_contribuyente": $('#id_contribuyente_ret').val(),
         "p_d_denominacion": $('#d_denominacion_ret').val(),
         "p_n_hecho": $('#d_objeto_hecho_ret').val(),
         "p_n_cuit": limpia_cuit($('#n_cuit_ret').val()),
         "p_i_retenido": $('#i_retenido_ret').val(),
         "p_i_base_imponible": null, //verificar con el original
         "p_d_comprobante": $('#d_comprobante_ret').val(),
         "p_n_recibo": $('#n_recibo_ret').val(),
         "p_p_coeficiente": $('#p_coeficiente_ret').val(),
         "p_c_tipo_comprobante": null,
         "p_c_concepto": null,
         "p_n_tabla_concepto":null,
         "p_n_constancia_anulada":null,
         "p_f_retencion_anulada":null,
         "p_i_monto_original":null,
         "p_n_constancia":null,
         "p_n_fila": v_fila,
         "id_menu":v_id_menu,
         "n_orden":5
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                if(v_oper == 'add' || v_oper == 'edit'){
                    $('#abm_retenciones_modal').modal('hide');
                    $('#btn_limpiar_ret').trigger('click');
                }
                $("#retenciones_grid").trigger("reloadGrid");
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function abm_sellos(){
    let v_fila;
    if(v_oper == 'add'){
        v_fila = $('#sellos_grid').getGridParam('records') + 1;

        if($('#aux_hijos_ret').val()){
            $('#aux_hijos_ret').val($('#aux_hijos_ret').val() + 1)
        }else{$('#aux_hijos_ret').val(1)};
        $('#n_secuencia_det_sellos').val($('#aux_hijos_ret').val());
    } else{
        v_fila = $('#sellos_grid').getCell($('#sellos_grid').getGridParam('selrow'), 'n_fila');
        
    }

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_oper": v_oper,
         "p_id_ddjj": $('#id_ddjj').val(),
         "p_n_secuencia_det": $('#n_secuencia_det_sellos').val(),
         "p_f_retencion": $('#f_retencion_sellos').val(),
         "p_n_cuit": limpia_cuit($('#n_cuit_sellos').val()),
         "p_d_denominacion": $('#d_denominacion_sellos').val(),
         "p_f_instrumento": $('#f_instrumento_sellos').val(),
         "p_i_base_imponible": $('#i_base_imponible_sellos').val(),
         "p_i_alicuota": $('#i_alicuota_sellos').val(),
         "p_i_impuesto": $('#i_impuesto_sellos').val(),
         "p_i_retencion": $('#i_retencion_sellos').val(),
         "p_n_fila": v_fila,
         "id_menu":v_id_menu,
         "n_orden":6
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                if(v_oper == 'add' || v_oper == 'edit'){
                    $('#abm_sellos_modal').modal('hide');
                    $('#btn_limpiar_sellos').trigger('click');
                }
                $("#sellos_grid").trigger("reloadGrid");
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function formatear_fecha(p_fecha){
  var partesFecha = p_fecha.split('/');
  var mes = partesFecha[1];
  var anio = partesFecha[2];

  return anio + mes;
}

function borrar_tabla_temporal(){
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_id_ddjj": $('#id_ddjj').val(),
         "p_c_tipo_form": $('#c_tipo_form').val(),
         "id_menu":v_id_menu,
         "n_orden":9
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
}

function ver_errores(){
    setea_parametros('#errores_grid', {':p_id_ddjj':$('#id_ddjj').val()});
}

function mostrar_cuadro_cambios(){
    $('#guardar_cambios_modal').show();
}

function limpiar_form(){
    $('#c_tipo_form').val(null);
            $('#d_tipo_form').val(null);
            $('#f_presentacion').val(null);
            $('#id_contribuyente').val(null);
            $('#c_tributo').val(null);
            $('#d_tributo').val(null);
            $('#c_concepto').val(null);
            $('#d_concepto').val(null);
            $('#d_objeto_hecho').val(null);
            $('#n_cuit').val(null);
            $('#d_denominacion').val(null);
            $('#n_pos_fiscal').val(null);
            $('#n_cuota').val(null);
            $('#id_obligacion').val(null);
            $('#d_presentacion').val(null);
            $('#d_comprobante').val(null);
            $('#n_secuencia_pres').val(null);
            $('#n_secuencia_obl').val(null);
            $('#id_ddjj').val(null);

            $('#n_secuencia_det_per').val(null);
            $('#n_secuencia_det_ret').val(null);
            $('#n_secuencia_det_sellos').val(null);
            $('#d_comprobante_ret').val(null);
            $('#n_comprobante_dep_per').val(null);
            $('#n_comprobante_ddjj_per').val(null);

            $('#aux_hijos_per').val(null);
            $('#aux_hijos_ret').val(null);
            $('#n_comprobante_ddjj_per').val(null);
            $('#n_comprobante_ddjj_per').val(null);
            $('#n_comprobante_ddjj_per').val(null);

            v_oper = null;

            $('#d_calle').val(null);
            $('#n_numero').val(null);
            $('#d_monoblock').val(null);
            $('#d_puerta').val(null);
            $('#d_piso').val(null);
            $('#d_depto').val(null);
            $('#d_oficina').val(null);
            $('#d_manzana').val(null);
            $('#c_bepo').val(null);
            $('#d_bepo').val(null);
            $('#d_localidad').val(null);
            $('#c_postal').val(null);
            $('#n_telefono_1').val(null);
            $('#n_telefono_2').val(null);
            $('#n_fax_1').val(null);

            $('#btn_grabar').prop('disabled', true);

            habilitar_filtros();
            $('#f_presentacion').val(v_f_hoy);

            $('#mascara_lupa_tipo_form').hide();
            $('#lupa_tipo_form').show().css('display', 'table-cell');
            $('#mascara_lupa_tributo').hide();
            $('#lupa_tributo').show().css('display', 'table-cell');
            $('#mascara_lupa_concepto').hide();
            $('#lupa_concepto').show().css('display', 'table-cell');
            $('#mascara_lupa_pos_fiscal').hide();
            $('#lupa_pos_fiscal').show().css('display', 'table-cell');
            $('#mascara_lupa_cuit').hide();
            $('#lupa_cuit').show().css('display', 'table-cell');

            $('#div_d_comprobante').prop('hidden', true);
            $('#d_leyenda').text(null);

            $('#etiqueta_tab_retenciones').hide();
            $('#etiqueta_tab_percepciones').hide();
            $('#etiqueta_tab_sellos').hide();

            $('#btn_buscar').prop('disabled', true);
            $('#tabs_grid').prop('hidden', true);

            $('#personales_grid').clearGridData();
            $('#retenciones_grid').clearGridData();
            $('#percepciones_grid').clearGridData();
            $('#sellos_grid').clearGridData();

            v_hay_cambios = 'N';
            v_i_saldo_declarado = null;
            v_m_favor_rentas = null;
}