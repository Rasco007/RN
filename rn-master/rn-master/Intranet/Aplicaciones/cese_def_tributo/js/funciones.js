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
        filtros:['#id_contribuyente'],
        filtrosNulos:[true],
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
        id_lista:v_lista_obj,
        titulos:['Objeto/Hecho','Denominación','CUIT','Código Tipo Documento','Tipo Documento','Número de Documento','ID Contribuyente'],
        grid:[{index:'c_codigo',width:200},{index:'denominacion', width:200},{index:'cuit', width:200},{index:'c_tipo_documento',hidden:false},{index:'d_tipo_documento',hidden:false},{index:'n_documento',hidden:false},{index:'id_contribuyente',hidden:false}],
        caption:'Lista de Objeto/Hecho',
        sortname:'c_codigo',
        sortorder:'asc',
        searchInput: '#d_objeto_hecho',
        searchCode: true,
        exactField: 'c_codigo',
        filtros:['#c_tributo', '#id_contribuyente', '#d_objeto_hecho'],
        filtrosNulos:[false, true, true],
        filtrosTitulos: ['Código de Tributo','Contribuyente','Objeto Hecho'],
        campos:{c_codigo:'d_objeto_hecho',denominacion:'d_denominacion' ,cuit:'n_cuit',c_tipo_documento:'c_tipo_doc',d_tipo_documento:'d_tipo_doc',n_documento:'n_documento',id_contribuyente:'id_contribuyente'},
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

    $("#lupa_motivo_cese").lupa_generica({
        id_lista:v_lista_motivo_baja,
        titulos:['Código', 'Descripción', 'Tabla'],
        grid:[
            {index:'c_dato',width:100},
            {index:'d_dato',width:450},
            {index:'n_tabla',width:100, hidden: true}
        ],
        caption:'Listado de Motivos de Baja',
        sortname:'c_dato',
        sortorder:'asc',
        searchInput: '#c_motivo_cese',
        searchCode: true,
        exactField: 'c_dato',
        campos:{
            c_dato: 'c_motivo_cese',
            d_dato: 'd_motivo_cese',
            n_tabla: 'n_tabla_mot_baja'
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
    $('#btn_buscar').prop('disabled', true);
    $('#btn_cese_def').prop('disabled', false);

    $('#lupa_d_objeto_hecho').hide();
    $('#mascara_lupa_d_objeto_hecho').show();                
    $('#lupa_tipo_doc').hide();
    $('#mascara_lupa_tipo_doc').show();
    $('#lupa_tributo').hide();
    $('#mascara_lupa_tributo').show();
}

