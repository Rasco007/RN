function inicializa_lupas(){


    $("#lupa_d_denominacion").lupa_generica({
        id_lista: vg_lista_denominaciones,
        titulos:['Razón', 'CUIT', 'CUIT Reemplazo', 'Domicilio'],
        grid:[
            {index:'d_denominacion',width:350},
            {index:'n_cuit',width:120},
            {index:'n_cuit_reemp',width:120},
            {index:'domicilio',width:350},
        ],
        caption:'Padrón AFIP',
        sortname:'d_denominacion, n_cuit',
        sortorder:'asc',
        width:1000,
        filtros:['#d_denominacion_filtro'],
        filtrosTitulos:['Denominación'],
        filtrosNulos:[false],
        campos:{d_denominacion:'d_denominacion_filtro', n_cuit: 'n_cuit_filtro'},
        keyNav:true,
        draggable:true,
        onClose(){}
    });

    $("#lupa_pc_cuit_filtro").lupa_generica({
        id_lista: v_lista_pc_cuit,
        titulos:['CUIT','Razón', 'CUIT Reemplazo', 'Domicilio'],
        grid:[
            {index:'n_cuit',width:120},
            {index:'d_denominacion',width:315},
            {index:'n_cuit_reemp',width:120},
            {index:'domicilio',width:310},
        ],
        caption:'Padrón AFIP',
        sortname:'d_denominacion, n_cuit',
        sortorder:'asc',
        width:1000,
        filtros:['#n_pc_cuit_filtro'],
        filtrosTitulos:['PC Cuit'],
        filtrosNulos:[false],
        campos:{n_cuit: 'n_cuit_filtro',d_denominacion: 'd_denominacion_filtro'},
        keyNav:true,
        draggable:true,
        onClose(){}
    });





}