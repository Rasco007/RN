function init_elementos(){
    $("#lupa_patente").lupa_generica({
        id_lista: v_lista_patentes,
        titulos:['Dominio','Dominio Anterior'],
        grid:[{index:'d_patente',width:200},
            {index:'d_patente_vieja',width:200}],
        caption:'Dominios',
        sortname:'d_patente',
        sortorder:'asc',
        campos:{d_patente:'d_patente',d_patente_vieja:'d_patente_vieja'},
        filtros:["#d_patente", "#d_patente_vieja"],
        filtrosNulos:[false,true],
        filtrosTitulos:['Dominio','Dominio Anterior'],
        keyNav:true,
        limpiarCod: true
    });

    $("#lupa_patente_vieja").lupa_generica({
        id_lista: v_lista_patentes,
        titulos:['Dominio','Dominio Anterior'],
        grid:[{index:'d_patente',width:200},
            {index:'d_patente_vieja',width:200}],
        caption:'Dominios',
        sortname:'d_patente_vieja',
        sortorder:'asc',
        campos:{d_patente:'d_patente',d_patente_vieja:'d_patente_vieja'},
        filtros:["#d_patente", "#d_patente_vieja"],
        filtrosNulos:[true,false],
        filtrosTitulos:['Dominio','Dominio Anterior'],
        keyNav:true,
        limpiarCod: true
    });
}