function lupas_grilla(formid) {

    $("#c_fmcamod",formid).lupa_generica({
        id_lista: v_lista_cod_rnpa,
        titulos:['Código','Descripción'],
        grid:[  {index:'codigo',width:100},
            {index:'descripcion', width:446}
        ],
        caption:'Codigos RNPA',
        campos:{codigo:'c_fmcamod', descripcion:'d_descripcion'},
        keyNav:true,
        sortname:'descripcion',
        sortorder:'asc',
        onClick:false,
        onKeydown:false
    });



}