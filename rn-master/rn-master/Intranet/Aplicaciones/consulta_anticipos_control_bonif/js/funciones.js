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
                if($('#c_tributo').val() != 10 && $('#c_tributo').val() != 20){
                    mostrar_error('El tributo debe ser 10 o 20','E',true);
                    $('#c_tributo').val(null);
                    $('#d_tributo').val(null);
                } 
                else if(!$('#c_tipo_imp').val()){
                    if($('#c_tributo').val() == 10){
                        $('#c_tipo_imp').val(1);
                        $('#c_tipo_imp').blur();
                    } 
                    else if($('#c_tributo').val() == 20){
                        $('#c_tipo_imp').val(2);
                        $('#c_tipo_imp').blur();
                    }
                }
            }
        }
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
        filtrosNulos:[true, true, true, true, true, true, true],
        filtrosTitulos: ['', 'Tributo'],
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
        }
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
        filtros:["#id_contribuyente"],
        filtrosNulos:[true],
        searchCode:true,
        searchInput: '#c_tipo_imp',
        exactField: 'c_dato',
        campos:{c_dato:'c_tipo_imp', d_dato:'d_tipo_imp'},
        keyNav:true,
        limpiarCod: true,
        onClose: function(){
            if($('#c_tipo_imp').val()){
                if($('#c_tipo_imp').val() != 1 && $('#c_tipo_imp').val() != 2){
                    mostrar_error('El Tipo Imponible debe ser 1 o 2','E',true);
                    $('#c_tipo_imp').val(null);
                    $('#d_tipo_imp').val(null);
                } 
                else if(!$('#c_tributo').val()){
                    if($('#c_tipo_imp').val() == 1){
                        $('#c_tributo').val(10);
                        $('#c_tributo').blur();
                    } 
                    else if($('#c_tipo_imp').val() == 2){
                        $('#c_tributo').val(20);
                        $('#c_tributo').blur();
                    }
                }

                if($('#d_objeto_hecho').val()){
                    $('#c_tipo_imp').trigger('focusout');
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
        onClose: function(){
            if($('#n_documento').val()){
                $('#n_documento').trigger('focusout');
            }
        }
    });
};

function imprimir_detalle(){
    let parametros = 'P_ID_CONTRIBUYENTE|' + $("#id_contribuyente").val() +
                       '&P_p_fiscal|' + $('#periodo').val() +
                       '&P_C_TRIBUTO|' + $('#c_tributo').val() +
                       '&P_D_OBJETO_HECHO|' + $('#d_objeto_hecho').val() +
                       '&P_SESION|' + v_id_sesion +
                       '&P_VTO_PAGO|' + v_f_vto_pago +
                       '&P_VTO_PRES|' + v_f_vto_pres +
                       '&p_titulo|' + "";

    llamar_report('TRIBL053', parametros, 'PDF');

};

function bloquear_filtros(){
    $('#n_cuit').prop('disabled', true);
    $('#d_denominacion').prop('disabled', true);
    $('#c_tipo_doc').prop('disabled', true);
    $('#n_documento').prop('disabled', true);
    $('#c_tipo_imp').prop('disabled', true);
    $('#d_objeto_hecho').prop('disabled', true);
    $('#c_tributo').prop('disabled', true);

    $('#lupa_d_denominacion').hide();
    $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');

    $('#lupa_tributo').hide();
    $('#mascara_lupa_c_tributo').show().css('display', 'table-cell');

    $('#lupa_tipo_imp').hide();
    $('#mascara_lupa_c_tipo_imp').show().css('display', 'table-cell');

    $('#lupa_tipo_doc').hide();
    $('#mascara_lupa_c_tipo_doc').show().css('display', 'table-cell');
}

function desbloquear_filtros(){
    $('#n_cuit').prop('disabled', false);
    $('#d_denominacion').prop('disabled', false);
    $('#c_tipo_doc').prop('disabled', false);
    $('#c_tipo_imp').prop('disabled', false);
    $('#n_documento').prop('disabled', false);
    $('#d_objeto_hecho').prop('disabled', false);
    $('#c_tributo').prop('disabled', false);

    $('#lupa_tributo').show().css('display', 'table-cell');
    $('#mascara_lupa_c_tributo').hide();

    $('#lupa_tipo_imp').show().css('display', 'table-cell');
    $('#mascara_lupa_c_tipo_imp').hide();

    $('#lupa_tipo_doc').show().css('display', 'table-cell');
    $('#mascara_lupa_c_tipo_doc').hide();
}
