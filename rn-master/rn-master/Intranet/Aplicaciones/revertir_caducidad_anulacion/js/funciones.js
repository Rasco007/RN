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
            {index:'f_alta', width:150}
        ],
        caption:'Listado de Contribuyentes',
        sortname:'d_denominacion',
        sortorder:'asc',
        width: 1000,
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
        titulos:['Nro. Plan', 'CUIT', 'Contribuyente', 'T. Imponible', 'Objeto / Hecho', 'Cód. Tipo Plan Pago', 'Descripción'],
        grid:[
            {index:'n_plan_pago',width:100},
            {index:'n_cuit',width:100},
            {index:'d_denominacion',width:450},
            {index:'c_tipo_imponible',width:100},
            {index:'d_objeto_hecho',width:150},
            {index:'c_tipo_plan_pago',width:100},
            {index:'d_descrip',width:450},
        ],
        caption:'Lista de Planes de Pago',
        sortname:'n_plan_pago',
        sortorder:'desc',
        searchInput: '#n_plan_pago',
        searchCode: true,
        exactField: 'n_plan_pago',
        filtros:['#id_contribuyente'],
        filtrosNulos:[true],
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
}

function reactivar_plan(){
    //PRC_BTN_REACTIVAR
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_c_tipo_plan_pago": $('#c_tipo_plan_pago').val(),
         "p_n_plan_pago": $('#n_plan_pago').val(),
         "id_menu":v_id_menu,
         "n_orden":3
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
              mostrar_cuadro('S', 'Exito', 'Plan Reactivado');
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

