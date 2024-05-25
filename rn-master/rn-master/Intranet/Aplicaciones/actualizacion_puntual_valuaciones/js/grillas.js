function inicializarGrillas(){

    $("#lupa_d_dominio").lupa_generica({
        id_lista:v_lista_dominio,
        titulos:['Patente', 'Patente Vieja'],
        grid:[
            {index:'d_patente',width:280},
            {index:'d_patente_vieja',width:285}
        ],
        caption:'Lista de Dominios',
        sortname:'d_patente',
        sortorder:'asc',
        filtros:['#d_patente'],
        filtrosTitulos:['Dominio'],
        filtrosNulos:[false],
        campos:{
            d_patente: 'd_patente',
            d_patente_vieja: 'd_patente_vieja'
        },
        keyNav:true,
        draggable:true,
        onClose: function(){
            if($("#d_patente").val()!==''){
                p_d_patente=$("#d_patente").val();
                obtener_datos_automotor(p_d_patente ,p_c_marca_aut , p_d_texto_marca , p_id_modelo , p_d_Texto_modelo, p_id_descripcion,
                    p_d_texto_descripcion, p_n_peso_cilindrada , p_n_modelo_año , p_c_tipo, p_c_grupo , p_c_fmcamod ,
                    p_n_hp, p_d_descrip_marca,p_d_descrip_modelo , p_d_descrip_des , p_d_descrip_tipo);
            }
        }
    });

    $("#lupa_d_dominio_viejo").lupa_generica({
        id_lista:v_lista_dominio_viejo,
        titulos:['Patente', 'Patente Vieja'],
        grid:[
            {index:'d_patente',width:280},
            {index:'d_patente_vieja',width:285}
        ],
        caption:'Lista de Dominios',
        sortname:'d_patente',
        sortorder:'asc',
        filtros:['#d_patente_vieja'],
        filtrosTitulos:['Dominio anterior'],
        filtrosNulos:[false],
        campos:{
            d_patente: 'd_patente',
            d_patente_vieja: 'd_patente_vieja'
        },
        keyNav:true,
        draggable:true,
        onClose: function(){
            if($("#d_patente").val()!==''){
                p_d_patente=$("#d_patente").val();
                obtener_datos_automotor(p_d_patente ,p_c_marca_aut , p_d_texto_marca , p_id_modelo , p_d_Texto_modelo, p_id_descripcion,
                    p_d_texto_descripcion, p_n_peso_cilindrada , p_n_modelo_año , p_c_tipo, p_c_grupo , p_c_fmcamod ,
                    p_n_hp, p_d_descrip_marca,p_d_descrip_modelo , p_d_descrip_des , p_d_descrip_tipo);
            }
        }
    });

    $("#lupa_grupo").lupa_generica({
        id_lista:v_lista_grupos,
        titulos:['C&oacute;digo','Descripci&oacute;n'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:465}],
        caption:'Grupos',
        sortname:'d_dato',
        sortorder:'asc',
        campos:{c_dato:'c_grupo',d_dato:'d_grupo'},
        searchCode:true,
        searchInput: '#c_grupo',
        keyNav:true,
        exactField: 'c_dato',
        onClose: function(){
            if (!$('#d_grupo').val()){
                $('#c_grupo').val(null);
            }
        }
    });

    $("#lupa_tipo").lupa_generica({
        id_lista:v_lista_tipos,
        titulos:['Tipos','Descripci&oacute;n','Grupo','Descripci&oacute;n'],
        grid:[{index:'c_dato_t',width:140},
            {index:'d_dato_t',width:165},
            {index:'c_dato_g',width:130},
            {index:'d_dato_g',width:130}],
        caption:'Lista de Tipo de Automotores',
        campos:{c_dato_t:'c_tipo',d_dato_t:'d_descrip_tipo',c_dato_g:'c_grupo',d_dato_g:'d_grupo'},
        searchCode:true,
        searchInput: '#c_tipo',
        keyNav:true,
        exactField: 'c_dato_t',
        onClose: function(){
            if (!$('#d_descrip_tipo').val()){
                $('#c_tipo').val(null);
            }
        }
    });

    $("#lupa_marca").lupa_generica({
        id_lista:v_lista_marcas,
        titulos:['C&oacute;digo','Marca'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:465}],
        caption:'Lista de Marcas de Automotores',
        campos:{c_dato:'c_marca',d_dato:'d_descrip_marca'},
        searchCode:true,
        searchInput: '#c_marca',
        keyNav:true,
        exactField: 'c_dato',
        onClose: function(){
            if (!$('#d_descrip_marca').val()){
                $('#c_marca').val(null);
            }
        }
    });

    $("#lupa_modelo").lupa_generica({
        id_lista:v_lista_modelos,
        titulos:['Modelo','Descripción'],
        grid:[{index:'id_modelo',width:100},
            {index:'d_descrip',width:465}],
        caption:'Lista de Modelos',
        campos:{id_modelo:'id_modelo',d_descrip:'d_descrip_modelo'},
        searchCode:true,
        searchInput: '#id_modelo',
        filtros:['#c_marca'],
        filtrosTitulos:['Marca'],
        filtrosNulos:[false],
        keyNav:true,
        exactField: 'id_modelo',
        onClose: function(){
            if (!$('#d_descrip_modelo').val()){
                $('#id_modelo').val(null);
            }
        }
    });

    $("#lupa_descripcion").lupa_generica({
        id_lista:v_lista_descripciones,
        titulos:['Código','Descripción'],
        grid:[{index:'id_descripcion',width:100},
            {index:'d_descrip',width:465}],
        caption:'Lista de Descripciones',
        sortname:'d_descrip',
        sortorder:'asc',
        campos:{id_descripcion:'id_descripcion',d_descrip:'d_descrip'},
        searchCode:true,
        searchInput: '#id_descripcion',
        filtros:['#c_marca','#id_modelo'],
        filtrosTitulos:['Marca','Modelo'],
        filtrosNulos:[false,false],
        keyNav:true,
        exactField: 'id_descripcion'
    });



}