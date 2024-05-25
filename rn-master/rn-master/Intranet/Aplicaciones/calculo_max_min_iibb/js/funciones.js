function inicializarLupas(){
    $("#lupa_tributo").lupa_generica({
        id_lista: v_lista_tributos,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_tributo',width:100},
            {index:'d_descrip',width:450}],
        caption:'Tributos',
        sortname:'c_tributo',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_tributo',
        exactField: 'c_tributo',
        campos:{c_tributo:'c_tributo', d_descrip:'d_tributo'},
        keyNav:true,
        limpiarCod: true,
        onClose: function(){
            if($('#c_tributo').val()){
                if($('#c_tributo').val() != 10){
                    mostrar_error('El tributo debe ser 10','E', true);
                    $('#c_tributo').val(10);
                    $('#c_tributo').blur();
                }
            }
        }
    });

    $("#lupa_concepto").lupa_generica({
        id_lista:v_lista_conceptos,
        titulos:['Cod. Concepto','Cod. Tributo', 'Descripción Concepto'],
        grid:[  
            {index:'c_concepto',width:100},
            {index:'c_tributo',width:100},
            {index:'d_concepto',width:450}],
        caption:'Conceptos',
        sortname:'c_concepto',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_concepto',
        exactField: 'c_concepto',
        filtros: ['#c_tributo'],
        filtrosNulos: [false],
        filtrosTitulos:['Tributo'],
        campos:{c_concepto:'c_concepto', d_concepto:'d_concepto'},
        keyNav:true,
        limpiarCod: true,
        onClose: function(){
            if($('#c_concepto').val()){
                if($('#c_concepto').val() != 100){
                    mostrar_error('Solo corresponde para concepto 100','E',true);
                    $('#c_concepto').val(100);
                    $('#c_concepto').blur();
                }
            }
        }
    });

    $("#lupa_tipo_doc").lupa_generica({
        id_lista: v_lista_documentos,
        titulos:['Código', 'Descripción'],
        grid:[  
            {index:'c_dato',width:100},
            {index:'d_dato',width:450}],
        caption:'Tipo de Documento',
        sortname:'c_dato',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_tipo_doc',
        exactField: 'c_dato',
        campos:{c_dato:'c_tipo_doc', d_dato:'d_tipo_doc'},
        keyNav:true,
        limpiarCod: true,
    });

    $("#lupa_tipo_imp").lupa_generica({
        id_lista: v_lista_tipo_imponible,
        titulos:['Código', 'Descripción'],
        grid:[  
            {index:'c_dato',width:100},
            {index:'d_dato',width:450}],
        caption:'Tipo Imponible',
        sortname:'c_dato',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_tipo_imp',
        exactField: 'c_dato',
        campos:{c_dato:'c_tipo_imp', d_dato:'d_tipo_imp'},
        keyNav:true,
        limpiarCod: true,
    });


    $("#lupa_d_denominacion").lupa_generica({
        id_lista:v_lista_denominaciones,
        titulos:[ 'ID Contribuyente', 'CUIT', 'Apellido y Nombre / Razón Social', 'Cod. Tipo Documento', 'Tipo <br> Documento', 'Nro. Documento', 'Objeto / Hecho', 'Tipo <br> Imponible', 'F. Alta'],
        grid:[
            {index:'id_contribuyente',width:450, hidden: true},
            {index:'n_cuit',width:100},
            {index:'d_denominacion',width:450},
            {index:'c_tipo_documento',width:100, hidden: true},
            {index:'d_tipo_documento',width:150},
            {index:'n_documento',width:150},
            {index:'d_objeto_hecho',width:100},
            {index:'c_tipo_imponible',width:100},
            {index:'f_alta',width:100, hidden: true}
        ],
        caption:'Contribuyentes',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#d_denominacion', '#c_tributo', '#c_concepto', '#c_tipo_doc', '#n_documento', '#d_objeto_hecho', '#c_tipo_imp'],
        filtrosNulos:[true, false, false, true, true, true, true],
        campos:{
            n_cuit: 'n_cuit',
            d_denominacion:'d_denominacion',
            d_objeto_hecho:'d_objeto_hecho',
            c_tipo_documento:'c_tipo_doc',
            n_documento:'n_documento',
            c_tipo_imponible:'c_tipo_imp',
            id_contribuyente:'id_contribuyente'
        },
        keyNav:true,
        draggable:true,
        onClose: function(){
            if($('#n_cuit').val()){
                $('#lupa_d_objeto_hecho').show().css('display', 'table-cell');
                $('#mascara_lupa_obj_hecho').hide();
            } else{
                $('#lupa_d_objeto_hecho').hide();
                $('#mascara_lupa_obj_hecho').show().css('display', 'table-cell');
            }
            $('#c_tipo_doc').blur();
            $('#c_tipo_imp').blur();
            $("#n_cuit").mask("99-99999999-9");
            id_contribuyente = $('#id_contribuyente').val();
        }
    });
};

function limpiar_formato_cuit(n_cuit){
    if(n_cuit[2] != '-'){
        return n_cuit;
    } else{
        return n_cuit.replace(/-/g, '');
    }
};

function fun_valida_cuit(n_cuit) {
    // Expresión regular para validar el formato
    var regex = /^\d{2}-\d{8}-\d{1}$/;
  
    // Comprobar si el n_cuit coincide con la expresión regular
    return regex.test(n_cuit);
};

function imprimir_reporte(){
    let parametros = 'P_ID_CONTRIBUYENTE|' + id_contribuyente + 
                     '&P_p_fiscal|' + $('#pos_fiscal').val() +
                     '&P_n_cuota|' + $('#cuota').val() +
                     '&P_C_TRIBUTO|' + $('#c_tributo').val() +
                     '&P_D_OBJETO_HECHO|' + $('#d_objeto_hecho').val() +
                     '&P_SESION|' + $('#detalle_grid').getCell(1, 'n_sesion'); 
                            
    llamar_report('TRIBL048', parametros, 'PDF');
};

function bloquear_filtros(){
    $('#pos_fiscal').prop('disabled', true);
    $('#cuota').prop('disabled', true);
    $('#d_denominacion').prop('disabled', true);
    $('#c_tipo_doc').prop('disabled', true);
    $('#c_tipo_imp').prop('disabled', true);
    $('#n_cuit').prop('disabled', true);
    $('#n_documento').prop('disabled', true);
    $('#d_objeto_hecho').prop('disabled', true);

    $('#lupa_d_denominacion').hide();
    $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
    $('#lupa_tipo_doc').hide();
    $('#mascara_lupa_tipo_doc').show().css('display', 'table-cell');
    $('#lupa_tipo_imp').hide();
    $('#mascara_lupa_tipo_imp').show().css('display', 'table-cell');
}

function desbloquear_filtros_contrib(){
    $('#d_denominacion').prop('disabled', false);
    $('#c_tipo_doc').prop('disabled', false);
    $('#c_tipo_imp').prop('disabled', false);
    $('#n_cuit').prop('disabled', false);
    $('#n_documento').prop('disabled', false);
    $('#d_objeto_hecho').prop('disabled', false);
}

function desbloquear_filtros_maxmin(){
    $('#pos_fiscal').prop('disabled', false);
    $('#cuota').prop('disabled', false);
}