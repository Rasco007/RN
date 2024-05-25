function inicializarLupas(){
    $("#lupa_d_denominacion").lupa_generica({
        id_lista:v_lista_denominaciones,
        titulos:['ID Contribuyente', 'CUIT', 'Apellidos y Nombre / Razón Social', 'Tipo', 'Tipo Documento', 'Nro. Documento', 'F. Alta'],
        grid:[
            {index:'id_contribuyente',width:450, hidden: true},
            {index:'n_cuit',width:100},
            {index:'d_denominacion',width:450},
            {index:'c_tipo_documento',width:100},
            {index:'d_tipo_documento',width:150, hidden: true},
            {index:'n_documento',width:150},
            {index:'f_alta',width:150}
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
            n_documento: 'n_documento',
            f_alta: 'f_alta'
        },
        keyNav:true,
        draggable:true,
        onClose: function(){
            if($('#n_cuit').val()){
                $('#lupa_d_objeto_hecho').show()
                $('#mascara_lupa_d_objeto_hecho').hide();
            } else{
                $('#lupa_d_objeto_hecho').hide();
                $('#mascara_lupa_d_objeto_hecho').show();
            }
        }
    });

    $("#lupa_tributo").lupa_generica({
        id_lista:v_lista_tributos,
        titulos:['Código', 'Descripción'],
        grid:[
            {index:'c_tributo',width:100},
            {index:'d_descrip',width:450}
        ],
        caption:'Listado de Tributos',
        sortname:'c_tributo',
        sortorder:'asc',
        filtros:['#p_tributo', '#id_contribuyente'],
        filtrosNulos:[false, true],
        searchInput: '#c_tributo',
        searchCode: true,
        exactField: 'c_tributo',
        campos:{
            c_tributo: 'c_tributo',
            d_descrip: 'd_tributo'
        },
        keyNav:true,
        draggable:true,
    });

    $("#lupa_d_objeto_hecho").lupa_generica({
        id_lista:v_lista_objetos,
        titulos:['Objeto / Hecho'],
        grid:[
            {index:'d_objeto_hecho',width:565}
        ],
        caption:'Listado de Objetos / Hechos',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        filtros:['#c_tributo', '#id_contribuyente', '#d_objeto_hecho'],
        filtrosNulos:[false, true, true],
        filtrosTitulos: ['Tributo'],
        campos:{
            d_objeto_hecho: 'd_objeto_hecho'
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
}

function bloquear_filtros(){
    $('#n_cuit').prop('disabled', true);
    $('#d_denominacion').prop('disabled', true);
    $('#c_tipo_doc').prop('disabled', true);
    $('#c_tributo').prop('disabled', true);
    $('#f_vig_desde').prop('disabled', true);
    $('#n_documento').prop('disabled', true);
    $('#d_objeto_hecho').prop('disabled', true);
    $('#f_nueva').prop('disabled', true);
    $('#lupa_d_objeto_hecho').hide();
    $('#mascara_lupa_d_objeto_hecho').show().css('display', 'table-cell');
    $('#lupa_tributo').hide();
    $('#mascara_lupa_tributo').show().css('display', 'table-cell');
    $('#lupa_tipo_doc').hide();
    $('#mascara_lupa_tipo_doc').show().css('display', 'table-cell');
    $('#lupa_d_denominacion').hide();
    $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');

}

function validar_btn_baja(resultado){
    //PRC_VALIDAR_RESULTADO_BTN_BAJA
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_resultado": resultado,
         "p_id_contribuyente": $('#id_contribuyente').val(),
         "p_obj_hecho": $('#d_objeto_hecho').val(),
         "p_f_vig_hasta": $('#f_nueva').val(),
         "p_c_tributo": $('#c_tributo').val(),
         "p_f_vig_desde": $('#f_vig_desde').val(),
         "id_menu":v_id_menu,
         "n_orden":2
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
              if(!data.p_mensaje_salida){
                mostrar_cuadro('S', 'Exito', 'Operación realizada con exito');
                return;
              } else{
                mostrar_error(data.p_mensaje_salida, 'E', true);
                return
              }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}