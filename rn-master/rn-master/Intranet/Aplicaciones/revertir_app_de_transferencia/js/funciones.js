function inicializarLupas() {
    $("#lupa_n_transfer").lupa_generica({
        id_lista:v_lista_n_transfer,
        titulos:['Número','Id Transfer.','Bono','','Especie','F. Transfer.'],
        grid:[
            {index:'n_transfer',width:150},
            {index:'id_transfer',width:100,hidden:true},
            {index:'c_bono',width:150},
            {index:'d_dato',width:200},
            {index:'c_especie',width:365},
            {index:'f_transfer',width:100,hidden:true}],
        caption:'Transferencias',
        sortname:'n_transfer',
        sortorder:'desc',
        limpiarCod: true,
        width: 1000,
        campos:{n_transfer:'n_transfer',
            id_transfer:'id_transfer',
            c_bono:'c_bono',
            d_dato:'d_bono',
            c_especie:'c_especie',
            f_transfer:'f_transfer'},
        keyNav:true,
        searchInput: '#n_transfer'
    });

    $("#lupa_n_comprobante").lupa_generica({
        id_lista:v_lista_n_comprobante,
        titulos:['Número','Tipo','Fecha','Pesos','Bonos'],
        grid:[
            {index:'n_comprobante',width:150},
            {index:'d_tipo_comprobante',width:265},
            {index:'f_imputacion',width:150},
            {index:'i_pesos_imputados',width:150},
            {index:'i_bonos_imputados',width:150}],
        caption:'Comprobantes',
        sortname:'n_comprobante',
        sortorder:'desc',
        filtros:['#id_transfer'],
        filtrosTitulos:['Número de Transferencia'],
        limpiarCod: true,
        width: 750,
        campos:{n_comprobante:'n_comprobante',
            d_tipo_comprobante:'d_t_comprobante',
            f_imputacion:'f_imputacion',
            i_pesos_imputados:'i_pesos_imputados',
            i_bonos_imputados:'i_bonos_imputados'},
        keyNav:true
    });

}

function revertir(params){
    params.id_menu = v_id_menu;
    params.n_orden = 0;
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:params,
        dataType:'json',
        success: function( data ) {
            if(data.resultado === 'OK'){
                mostrar_mensaje_modal('I','Información',data.p_estado);
                limpiar_datos();
                return;
            }else{
                mostrar_error(data.resultado);
                return;
            }
        }
    });
}
