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
        titulos:['Objeto / Hecho','ID Contribuyente','CUIT','Denominación'],
        grid:[{index:'d_objeto_hecho',width:150},{index:'id_contribuyente', width:20,hidden: true},{index:'n_cuit', width:200},{index:'d_denominacion', width:200}],
        caption:'Listado de Objetos / Hechos',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        filtros:['#c_tributo', '#d_objeto_hecho', '#id_contribuyente'],
        filtrosNulos:[false, true, true],
        filtrosTitulos: ['Tributo'],
        campos:{
            d_objeto_hecho: 'd_objeto_hecho',  id_contribuyente:'id_contribuyente', n_cuit:'n_cuit', d_denominacion:'d_denominacion'
        },
        keyNav:true,
        draggable:true,
    });
}