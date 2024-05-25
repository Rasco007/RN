function inicializarElementos(){
    $("#lupa_c_tipo_documento").lupa_generica({
        id_lista:v_lista_tdoc,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_codigo',width:100},
        {index:'d_descrip',width:250}],
        caption:'Tipo de Documento',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:[],
        searchInput: '#c_tipo_documento',
        searchCode: true,
        limpiarCod: true,
        campos:{c_codigo:'c_tipo_documento',d_descrip:'d_tipo_documento'},
        keyNav:true,
        onClose: function(){
            $('#n_documento').val(null);
            if ($('#c_tipo_documento').val()){
                $('#n_documento').attr("disabled",false);
            }else {
                $('#btn_limpiar').click();
            }
        }
    });

    $("#lupa_unif_c_tipo_documento").lupa_generica({
        id_lista:v_lista_tdoc,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:250}],
        caption:'Tipo de Documento',
        sortname:'d_descrip',
        sortorder:'asc',
        filtros:[],
        searchInput: '#unif_c_tipo_documento',
        searchCode: true,
        limpiarCod: true,
        campos:{c_codigo:'unif_c_tipo_documento',d_descrip:'unif_d_tipo_documento'},
        keyNav:true,
        onClose: function(){
            $('#unif_n_documento').val(null);
            if ($('#unif_c_tipo_documento').val()){
                $('#unif_n_documento').attr("disabled",false);
            }else {
                $('#frm_datos_unif :input').val(null);
                $('#btn_unif_datos_contrib').attr('disabled',true);
                $('#btn_procesar').hide();
            }
        }
    });
}