function inicializarGrillas(){

    $("#lupa_d_denominacion").lupa_generica({
        id_lista:v_lista_denominaciones,
        titulos:[ 'ID Contribuyente', 'CUIT', 'Denominación', 'Cod. Tipo Documento', 'Tipo Documento', 'Nro. Documento', 'F. Alta'],
        grid:[
            {index:'id_contribuyente',width:450, hidden: true},
            {index:'n_cuit',width:100},
            {index:'d_denominacion',width:450},
            {index:'c_tipo_documento',width:150, hidden: true},
            {index:'d_tipo_documento',width:150},
            {index:'n_documento',width:150},
            {index:'f_alta',width:100}
        ],
        caption:'Lista de Denominaciones',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#desc_denom'],
        filtrosTitulos:['Denominación'],
        filtrosNulos:[true],
        campos:{
            id_contribuyente: 'id_contribuyente',
            n_cuit: 'n_cuit',
            d_denominacion:'desc_denom',
            c_tipo_documento:'c_tipo_documento',
            d_tipo_documento:'d_tipo_documento',
            n_documento: 'n_documento',
            f_alta:'f_alta'
        },
        keyNav:true,
        draggable:true
    });

    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_trib,
        titulos:['Cód. Tributo','Tributo'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'Lista de Tributos',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
    });

    $("#lupa_c_tipo").lupa_generica({
        id_lista:v_lista_tipo,
        titulos:['Código','Descripción'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'Lista de Tipos de Boleta',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tipo',d_descrip: 'd_tipo'},
        keyNav:true,
        searchInput: '#c_tipo',
        searchCode: true,
    });

    $("#lupa_obj_hecho").lupa_generica({
        id_lista:v_lista_obj_hecho,
        titulos:['Objeto Hecho'],
        grid:[  {index:'d_objeto_hecho',width:550}],
        caption:'Lista de Objetos - Hechos',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        filtros:['#c_tributo','#d_objeto_hecho','#id_contribuyente'],
        filtrosNulos:[false,true,true],
        filtrosTitulos:['Tributo','Objeto','Contribuyente'],
        campos:{d_objeto_hecho:'d_objeto_hecho'},
        keyNav:true,
        draggable:true
    });

    $("#main_grid_boletas").jqGrid({
        colNames:datos_main_grid_boletas.colNames(),
        colModel:datos_main_grid_boletas.colModel(),
        pager: $('#main_grid_boletas_pager'),
        postData:datos_main_grid_boletas.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'id_boleta_agr',
        sortorder:'desc',
        autowidth: false,
        height:300,
        loadComplete:function(){
            var rowCount = $(this).jqGrid("getGridParam", "records");
            if(rowCount === 0 && ($('#n_boleta').val() || $('#id_contribuyente').val() || ($('#c_tributo').val() && $('#d_objeto_hecho').val()))){
                buscar_boletas_sellos()
            }
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
            let id_boleta_agr = $('#main_grid_boletas').getCell(id, 'id_boleta_agr');
            let f_emision_agr = $('#main_grid_boletas').getCell(id, 'f_emision_agr');

            $('#n_boleta').val(id_boleta_agr);
            $('#c_tributo').val($('#main_grid_boletas').getCell(id, 'c_tributo')).blur();
            $('#d_objeto_hecho').val($('#main_grid_boletas').getCell(id, 'd_objeto_hecho'));
            if ($('#d_objeto_hecho').val() !== '') {
                autocompleta_por_tributo_y_objeto_grilla(f_emision_agr);
            }

            filtros_no_nativos = [];
            filtros_arr_main = [];
            if($('#n_cuit').val() !== ''){filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());}
            if($('#desc_denom').val() !== ''){filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());}
            if($('#c_tributo').val() !== ''){filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());}
            if($('#d_objeto_hecho').val() !== ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());}
            if($('#c_tipo').val() !== ''){filtros_arr_main.push('Tipo: '+ $('#c_tipo_documento').val());}
            if($('#n_boleta').val() !== ''){filtros_arr_main.push('Nro. Boleta: '+ $('#n_boleta').val());}

            filtros_no_nativos_ar['detalles_grid_boletas'] = filtros_arr_main;

            setea_parametros('#detalles_grid_boletas',{
                ':p_id_boleta_agr':id_boleta_agr});
        },
        ondblClickRow: function(rowid){
            $('#main').procOverlay({visible: true});
            let id_boleta_agr = $('#main_grid_boletas').getCell(rowid, 'id_boleta_agr');
            let c_tributo = $('#main_grid_boletas').getCell(rowid, 'c_tributo');
            let d_objeto_hecho = $('#main_grid_boletas').getCell(rowid, 'd_objeto_hecho');
            buscar_detalles(id_boleta_agr, c_tributo, d_objeto_hecho);
        }
    }).navGrid('#main_grid_boletas_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    ).navButtonAdd('#main_grid_boletas_pager',
        {
            caption: "Mails",
            buttonicon:"",
            position:"right",
            title:"Mails",
            cursor:"pointer",
            onClickButton:function () {
                var id = $("#main_grid_boletas").getGridParam('selrow');
                var mail = $("#main_grid_boletas").getCell(id,"mail");
                id_boleta_agr = $('#main_grid_boletas').getCell(id, 'id_boleta_agr');

                if (id) {
                    if(mail === 'S'){

                        filtros_no_nativos = [];
                        filtros_arr_main = [];
                        if($('#n_cuit').val() !== ''){filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());}
                        if($('#desc_denom').val() !== ''){filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());}
                        if($('#c_tributo').val() !== ''){filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());}
                        if($('#d_objeto_hecho').val() !== ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());}
                        if($('#c_tipo').val() !== ''){filtros_arr_main.push('Tipo: '+ $('#c_tipo_documento').val());}
                        if($('#n_boleta').val() !== ''){filtros_arr_main.push('Nro. Boleta: '+ $('#n_boleta').val());}

                        filtros_no_nativos_ar['mails_grid'] = filtros_arr_main;

                        setea_parametros('#mails_grid',{':p_id_boleta':id_boleta_agr});
                        $('#mails_grid_modal').modal("show");
                    }else{
                        mostrar_cuadro('I', 'Informaci&oacute;n', 'No posee mails.');
                        return false;
                    }
                }else {
                    mostrar_error('Debe seleccionar una Fila de la grilla.');
                    return false;
                }

            }
        }).navButtonAdd('#main_grid_boletas_pager',
        {
            caption: "Detalle",
            buttonicon:"",
            position:"right",
            title:"Detalle",
            cursor:"pointer",
            onClickButton:function () {
                var rowid = $("#main_grid_boletas").getGridParam('selrow');
                if (rowid) {
                    $('#main').procOverlay({visible: true});
                    let id_boleta_agr = $('#main_grid_boletas').getCell(rowid, 'id_boleta_agr');
                    let c_tributo = $('#main_grid_boletas').getCell(rowid, 'c_tributo');
                    let d_objeto_hecho = $('#main_grid_boletas').getCell(rowid, 'd_objeto_hecho');
                    buscar_detalles(id_boleta_agr, c_tributo, d_objeto_hecho);
                }else {
                    mostrar_error('Debe seleccionar una Fila de la grilla.');
                    return false;
                }
            }
        }).navButtonAdd('#main_grid_boletas_pager',
        {
            caption: "Reimprimir Boleta",
            buttonicon:"",
            position:"right",
            title:"Reimprimir Boleta",
            cursor:"pointer",
            onClickButton:function () {
                var rowid = $("#main_grid_boletas").getGridParam('selrow');
                if (rowid) {
                    $('#main').procOverlay({visible: true});
                    let id_boleta_agr = $('#main_grid_boletas').getCell(rowid, 'id_boleta_agr');
                    let c_tributo = $('#main_grid_boletas').getCell(rowid, 'c_tributo');
                    if(id_boleta_agr){
                        reportes(id_boleta_agr, c_tributo);
                    }
                }else {
                    mostrar_error('Debe seleccionar una Fila de la grilla.');
                    return false;
                }
            }
        });


    $("#main_grid_boletas_pagas").jqGrid({
        colNames:datos_main_grid_boletas_pagas.colNames(),
        colModel:datos_main_grid_boletas_pagas.colModel(),
        pager: $('#main_grid_boletas_pagas_pager'),
        postData:datos_main_grid_boletas_pagas.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'id_boleta_agr',
        sortorder:'desc',
        autowidth: false,
        height:300,
        loadComplete:function(){
            var rowCount = $(this).jqGrid("getGridParam", "records");
            if(rowCount === 0 && ($('#n_boleta').val() || $('#id_contribuyente').val() || ($('#c_tributo').val() && $('#d_objeto_hecho').val()))){
                buscar_boletas_sellos()
            }
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
            let id_boleta_agr = $('#main_grid_boletas_pagas').getCell(id, 'id_boleta_agr');
            let f_emision_agr = $('#main_grid_boletas_pagas').getCell(id, 'f_emision_agr');

            $('#n_boleta').val(id_boleta_agr);
            $('#c_tributo').val($('#main_grid_boletas_pagas').getCell(id, 'c_tributo')).blur();
            $('#d_objeto_hecho').val($('#main_grid_boletas_pagas').getCell(id, 'd_objeto_hecho'));
            if ($('#d_objeto_hecho').val() !== '') {
                autocompleta_por_tributo_y_objeto_grilla(f_emision_agr);
            }

            filtros_no_nativos = [];
            filtros_arr_main = [];
            if($('#n_cuit').val() !== ''){filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());}
            if($('#desc_denom').val() !== ''){filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());}
            if($('#c_tributo').val() !== ''){filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());}
            if($('#d_objeto_hecho').val() !== ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());}
            if($('#c_tipo').val() !== ''){filtros_arr_main.push('Tipo: '+ $('#c_tipo_documento').val());}
            if($('#n_boleta').val() !== ''){filtros_arr_main.push('Nro. Boleta: '+ $('#n_boleta').val());}

            filtros_no_nativos_ar['detalles_grid_boletas'] = filtros_arr_main;

            setea_parametros('#detalles_grid_boletas',{
                ':p_id_boleta_agr':id_boleta_agr});
        },
        ondblClickRow: function(rowid){
            $('#main').procOverlay({visible: true});
            let id_boleta_agr = $('#main_grid_boletas_pagas').getCell(rowid, 'id_boleta_agr');
            let c_tributo = $('#main_grid_boletas_pagas').getCell(rowid, 'c_tributo');
            let d_objeto_hecho = $('#main_grid_boletas_pagas').getCell(rowid, 'd_objeto_hecho');
            buscar_detalles(id_boleta_agr, c_tributo, d_objeto_hecho);
        }
    }).navGrid('#main_grid_boletas_pagas_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    ).navButtonAdd('#main_grid_boletas_pagas_pager',
        {
            caption: "Mails",
            buttonicon:"",
            position:"right",
            title:"Mails",
            cursor:"pointer",
            onClickButton:function () {
                var id = $("#main_grid_boletas_pagas").getGridParam('selrow');
                var mail = $("#main_grid_boletas_pagas").getCell(id,"mail");
                id_boleta_agr = $('#main_grid_boletas_pagas').getCell(id, 'id_boleta_agr');

                if (id) {
                    if(mail === 'S'){

                        filtros_no_nativos = [];
                        filtros_arr_main = [];
                        if($('#n_cuit').val() !== ''){filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());}
                        if($('#desc_denom').val() !== ''){filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());}
                        if($('#c_tributo').val() !== ''){filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());}
                        if($('#d_objeto_hecho').val() !== ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());}
                        if($('#c_tipo').val() !== ''){filtros_arr_main.push('Tipo: '+ $('#c_tipo_documento').val());}
                        if($('#n_boleta').val() !== ''){filtros_arr_main.push('Nro. Boleta: '+ $('#n_boleta').val());}

                        filtros_no_nativos_ar['mails_grid'] = filtros_arr_main;

                        setea_parametros('#mails_grid',{':p_id_boleta':id_boleta_agr});
                        $('#mails_grid_modal').modal("show");
                    }else{
                        mostrar_cuadro('I', 'Informaci&oacute;n', 'No posee mails.');
                        return false;
                    }
                }else {
                    mostrar_error('Debe seleccionar una Fila de la grilla.');
                    return false;
                }

            }
        }).navButtonAdd('#main_grid_boletas_pagas_pager',
        {
            caption: "Detalle",
            buttonicon:"",
            position:"right",
            title:"Detalle",
            cursor:"pointer",
            onClickButton:function () {
                var rowid = $("#main_grid_boletas_pagas").getGridParam('selrow');

                if (rowid) {
                    $('#main').procOverlay({visible: true});
                    let id_boleta_agr = $('#main_grid_boletas_pagas').getCell(rowid, 'id_boleta_agr');
                    let c_tributo = $('#main_grid_boletas_pagas').getCell(rowid, 'c_tributo');
                    let d_objeto_hecho = $('#main_grid_boletas_pagas').getCell(rowid, 'd_objeto_hecho');
                    buscar_detalles(id_boleta_agr, c_tributo, d_objeto_hecho);
                }else {
                    mostrar_error('Debe seleccionar una Fila de la grilla.');
                    return false;
                }
            }
        }).navButtonAdd('#main_grid_boletas_pagas_pager',
        {
            caption: "Reimprimir Boleta",
            buttonicon:"",
            position:"right",
            title:"Reimprimir Boleta",
            cursor:"pointer",
            onClickButton:function () {
                var rowid = $("#main_grid_boletas_pagas").getGridParam('selrow');
                if (rowid) {
                    $('#main').procOverlay({visible: true});
                    let id_boleta_agr = $('#main_grid_boletas_pagas').getCell(rowid, 'id_boleta_agr');
                    let c_tributo = $('#main_grid_boletas_pagas').getCell(rowid, 'c_tributo');
                    if(id_boleta_agr){
                        reportes(id_boleta_agr, c_tributo);
                    }
                }else {
                    mostrar_error('Debe seleccionar una Fila de la grilla.');
                    return false;
                }
            }
        });


    $("#main_grid_boletas_impagas").jqGrid({
        colNames:datos_main_grid_boletas_impagas.colNames(),
        colModel:datos_main_grid_boletas_impagas.colModel(),
        pager: $('#main_grid_boletas_impagas_pager'),
        postData:datos_main_grid_boletas_impagas.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'id_boleta_agr',
        sortorder:'desc',
        autowidth: false,
        height:300,
        loadComplete:function(){
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
            let id_boleta_agr = $('#main_grid_boletas_impagas').getCell(id, 'id_boleta_agr');
            let f_emision_agr = $('#main_grid_boletas_impagas').getCell(id, 'f_emision_agr');

            $('#n_boleta').val(id_boleta_agr);
            $('#c_tributo').val($('#main_grid_boletas_impagas').getCell(id, 'c_tributo')).blur();
            $('#d_objeto_hecho').val($('#main_grid_boletas_impagas').getCell(id, 'd_objeto_hecho'));
            if ($('#d_objeto_hecho').val() !== '') {
                autocompleta_por_tributo_y_objeto_grilla(f_emision_agr);
            }

            filtros_no_nativos = [];
            filtros_arr_main = [];
            if($('#n_cuit').val() !== ''){filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());}
            if($('#desc_denom').val() !== ''){filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());}
            if($('#c_tributo').val() !== ''){filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());}
            if($('#d_objeto_hecho').val() !== ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());}
            if($('#c_tipo').val() !== ''){filtros_arr_main.push('Tipo: '+ $('#c_tipo_documento').val());}
            if($('#n_boleta').val() !== ''){filtros_arr_main.push('Nro. Boleta: '+ $('#n_boleta').val());}

            filtros_no_nativos_ar['detalles_grid_boletas'] = filtros_arr_main;

            setea_parametros('#detalles_grid_boletas',{
                ':p_id_boleta_agr':id_boleta_agr});
        },
        ondblClickRow: function(rowid){
            $('#main').procOverlay({visible: true});
            let id_boleta_agr = $('#main_grid_boletas_impagas').getCell(rowid, 'id_boleta_agr');
            let c_tributo = $('#main_grid_boletas_impagas').getCell(rowid, 'c_tributo');
            let d_objeto_hecho = $('#main_grid_boletas_impagas').getCell(rowid, 'd_objeto_hecho');
            buscar_detalles(id_boleta_agr, c_tributo, d_objeto_hecho);
        }
    }).navGrid('#main_grid_boletas_impagas_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    ).navButtonAdd('#main_grid_boletas_impagas_pager',
        {
            caption: "Mails",
            buttonicon:"",
            position:"right",
            title:"Mails",
            cursor:"pointer",
            onClickButton:function () {
                var id = $("#main_grid_boletas_impagas").getGridParam('selrow');
                var mail = $("#main_grid_boletas_impagas").getCell(id,"mail");
                id_boleta_agr = $('#main_grid_boletas_impagas').getCell(id, 'id_boleta_agr');

                if (id) {
                    if(mail === 'S'){

                        filtros_no_nativos = [];
                        filtros_arr_main = [];
                        if($('#n_cuit').val() !== ''){filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());}
                        if($('#desc_denom').val() !== ''){filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());}
                        if($('#c_tributo').val() !== ''){filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());}
                        if($('#d_objeto_hecho').val() !== ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());}
                        if($('#c_tipo').val() !== ''){filtros_arr_main.push('Tipo: '+ $('#c_tipo_documento').val());}
                        if($('#n_boleta').val() !== ''){filtros_arr_main.push('Nro. Boleta: '+ $('#n_boleta').val());}

                        filtros_no_nativos_ar['mails_grid'] = filtros_arr_main;

                        setea_parametros('#mails_grid',{':p_id_boleta':id_boleta_agr});
                        $('#mails_grid_modal').modal("show");
                    }else{
                        mostrar_cuadro('I', 'Informaci&oacute;n', 'No posee mails.');
                        return false;
                    }
                }else {
                    mostrar_error('Debe seleccionar una Fila de la grilla.');
                    return false;
                }

            }
        }).navButtonAdd('#main_grid_boletas_impagas_pager',
        {
            caption: "Detalle",
            buttonicon:"",
            position:"right",
            title:"Detalle",
            cursor:"pointer",
            onClickButton:function () {
                var rowid = $("#main_grid_boletas_impagas").getGridParam('selrow');

                if (rowid) {
                    $('#main').procOverlay({visible: true});
                    let id_boleta_agr = $('#main_grid_boletas_impagas').getCell(rowid, 'id_boleta_agr');
                    let c_tributo = $('#main_grid_boletas_impagas').getCell(rowid, 'c_tributo');
                    let d_objeto_hecho = $('#main_grid_boletas_impagas').getCell(rowid, 'd_objeto_hecho');
                    buscar_detalles(id_boleta_agr, c_tributo, d_objeto_hecho);
                }else {
                    mostrar_error('Debe seleccionar una Fila de la grilla.');
                    return false;
                }
            }
        }).navButtonAdd('#main_grid_boletas_impagas_pager',
        {
            caption: "Reimprimir Boleta",
            buttonicon:"",
            position:"right",
            title:"Reimprimir Boleta",
            cursor:"pointer",
            onClickButton:function () {
                var rowid = $("#main_grid_boletas_impagas").getGridParam('selrow');
                if (rowid) {
                    $('#main').procOverlay({visible: true});
                    let id_boleta_agr = $('#main_grid_boletas_impagas').getCell(rowid, 'id_boleta_agr');
                    let c_tributo = $('#main_grid_boletas_impagas').getCell(rowid, 'c_tributo');
                    if(id_boleta_agr){
                        reportes(id_boleta_agr, c_tributo);
                    }
                }else {
                    mostrar_error('Debe seleccionar una Fila de la grilla.');
                    return false;
                }
            }
        });


    $("#main_grid_boletas_sellos").jqGrid({
        colNames:datos_main_grid_boletas_sellos.colNames(),
        colModel:datos_main_grid_boletas_sellos.colModel(),
        pager: $('#main_grid_boletas_sellos_pager'),
        postData:datos_main_grid_boletas_sellos.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'id_boleta_agr',
        sortorder:'desc',
        autowidth: false,
        height:300,
        loadComplete:function(){
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
            let id_boleta_agr = $('#main_grid_boletas_sellos').getCell(id, 'id_boleta_agr');
            let f_emision_agr = $('#main_grid_boletas_sellos').getCell(id, 'f_emision_agr');

            $('#n_boleta').val(id_boleta_agr);
            $('#c_tributo').val($('#main_grid_boletas_sellos').getCell(id, 'c_tributo')).blur();
            $('#d_objeto_hecho').val($('#main_grid_boletas_sellos').getCell(id, 'd_objeto_hecho'));
            if ($('#d_objeto_hecho').val() !== '') {
                autocompleta_por_tributo_y_objeto_grilla(f_emision_agr);
            }

            filtros_no_nativos = [];
            filtros_arr_main = [];
            if($('#n_cuit').val() !== ''){filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());}
            if($('#desc_denom').val() !== ''){filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());}
            if($('#c_tributo').val() !== ''){filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());}
            if($('#d_objeto_hecho').val() !== ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());}
            if($('#c_tipo').val() !== ''){filtros_arr_main.push('Tipo: '+ $('#c_tipo_documento').val());}
            if($('#n_boleta').val() !== ''){filtros_arr_main.push('Nro. Boleta: '+ $('#n_boleta').val());}

            filtros_no_nativos_ar['detalles_grid_boletas_sellos'] = filtros_arr_main;

            setea_parametros('#detalles_grid_boletas_sellos',{
                ':p_id_boleta_agr':id_boleta_agr});
        },
        ondblClickRow: function(rowid){
            $('#main').procOverlay({visible: true});
            let id_boleta_agr = $('#main_grid_boletas_sellos').getCell(rowid, 'id_boleta_agr');
            let c_tributo = $('#main_grid_boletas_sellos').getCell(rowid, 'c_tributo');
            let d_objeto_hecho = $('#main_grid_boletas_sellos').getCell(rowid, 'd_objeto_hecho');
            buscar_detalles(id_boleta_agr, c_tributo, d_objeto_hecho);
        }
    }).navGrid('#main_grid_boletas_sellos_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    ).navButtonAdd('#main_grid_boletas_sellos_pager',
        {
            caption: "Mails",
            buttonicon:"",
            position:"right",
            title:"Mails",
            cursor:"pointer",
            onClickButton:function () {
                var id = $("#main_grid_boletas_sellos").getGridParam('selrow');
                var mail = $("#main_grid_boletas_sellos").getCell(id,"mail");
                id_boleta_agr = $('#main_grid_boletas_sellos').getCell(id, 'id_boleta_agr');

                if (id) {
                    if(mail === 'S'){

                        filtros_no_nativos = [];
                        filtros_arr_main = [];
                        if($('#n_cuit').val() !== ''){filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());}
                        if($('#desc_denom').val() !== ''){filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());}
                        if($('#c_tributo').val() !== ''){filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());}
                        if($('#d_objeto_hecho').val() !== ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());}
                        if($('#c_tipo').val() !== ''){filtros_arr_main.push('Tipo: '+ $('#c_tipo_documento').val());}
                        if($('#n_boleta').val() !== ''){filtros_arr_main.push('Nro. Boleta: '+ $('#n_boleta').val());}

                        filtros_no_nativos_ar['mails_grid'] = filtros_arr_main;

                        setea_parametros('#mails_grid',{':p_id_boleta':id_boleta_agr});
                        $('#mails_grid_modal').modal("show");
                    }else{
                        mostrar_cuadro('I', 'Informaci&oacute;n', 'No posee mails.');
                        return false;
                    }
                }else {
                    mostrar_error('Debe seleccionar una Fila de la grilla.');
                    return false;
                }

            }
        }).navButtonAdd('#main_grid_boletas_sellos_pager',
        {
            caption: "Detalle",
            buttonicon:"",
            position:"right",
            title:"Detalle",
            cursor:"pointer",
            onClickButton:function () {
                var rowid = $("#main_grid_boletas_sellos").getGridParam('selrow');

                if (rowid) {
                    $('#main').procOverlay({visible: true});
                    let id_boleta_agr = $('#main_grid_boletas_sellos').getCell(rowid, 'id_boleta_agr');
                    let c_tributo = $('#main_grid_boletas_sellos').getCell(rowid, 'c_tributo');
                    let d_objeto_hecho = $('#main_grid_boletas_sellos').getCell(rowid, 'd_objeto_hecho');
                    buscar_detalles(id_boleta_agr, c_tributo, d_objeto_hecho);
                }else {
                    mostrar_error('Debe seleccionar una Fila de la grilla.');
                    return false;
                }
            }
        }).navButtonAdd('#main_grid_boletas_sellos_pager',
        {
            caption: "Reimprimir Boleta",
            buttonicon:"",
            position:"right",
            title:"Reimprimir Boleta",
            cursor:"pointer",
            onClickButton:function () {
                var rowid = $("#main_grid_boletas_sellos").getGridParam('selrow');
                if (rowid) {
                    $('#main').procOverlay({visible: true});
                    let id_boleta_agr = $('#main_grid_boletas_sellos').getCell(rowid, 'id_boleta_agr');
                    let c_tributo = $('#main_grid_boletas_sellos').getCell(rowid, 'c_tributo');
                    if(id_boleta_agr){
                        reportes(id_boleta_agr, c_tributo);
                    }
                }else {
                    mostrar_error('Debe seleccionar una Fila de la grilla.');
                    return false;
                }
            }
        });


    $("#main_grid_boletas_tasa_externa").jqGrid({
        colNames:datos_main_grid_boletas_tasa_externa.colNames(),
        colModel:datos_main_grid_boletas_tasa_externa.colModel(),
        pager: $('#main_grid_boletas_tasa_externa_pager'),
        postData:datos_main_grid_boletas_tasa_externa.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        sortname:'id_boleta_agr',
        sortorder:'desc',
        autowidth: false,
        height:300,
        loadComplete:function(){
        },
        gridComplete: function() {
        },
        onSelectRow: function(id) {
            let id_boleta_agr = $('#main_grid_boletas_tasa_externa').getCell(id, 'id_boleta_agr');
            let f_emision_agr = $('#main_grid_boletas_tasa_externa').getCell(id, 'f_emision_agr');

            $('#n_boleta').val(id_boleta_agr);
            $('#c_tributo').val($('#main_grid_boletas_tasa_externa').getCell(id, 'c_tributo')).blur();
            $('#d_objeto_hecho').val($('#main_grid_boletas_tasa_externa').getCell(id, 'd_objeto_hecho'));
            if ($('#d_objeto_hecho').val() !== '') {
                autocompleta_por_tributo_y_objeto_grilla(f_emision_agr);
            }

            filtros_no_nativos = [];
            filtros_arr_main = [];
            if($('#n_cuit').val() !== ''){filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());}
            if($('#desc_denom').val() !== ''){filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());}
            if($('#c_tributo').val() !== ''){filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());}
            if($('#d_objeto_hecho').val() !== ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());}
            if($('#c_tipo').val() !== ''){filtros_arr_main.push('Tipo: '+ $('#c_tipo_documento').val());}
            if($('#n_boleta').val() !== ''){filtros_arr_main.push('Nro. Boleta: '+ $('#n_boleta').val());}

            filtros_no_nativos_ar['detalles_grid_boletas_sellos'] = filtros_arr_main;

            setea_parametros('#detalles_grid_boletas_sellos',{
                ':p_id_boleta_agr':id_boleta_agr});
        },
        ondblClickRow: function(rowid){
            $('#main').procOverlay({visible: true});
            let id_boleta_agr = $('#main_grid_boletas_tasa_externa').getCell(rowid, 'id_boleta_agr');
            let d_objeto_hecho = $('#main_grid_boletas_tasa_externa').getCell(rowid, 'd_objeto_hecho');
            let c_tributo = $('#main_grid_boletas_tasa_externa').getCell(rowid, 'c_tributo');
            buscar_detalles(id_boleta_agr, c_tributo, d_objeto_hecho);
        }
    }).navGrid('#main_grid_boletas_tasa_externa_pager',
        {add:false, edit:false, del:false}, //options
        {},//edit,
        {},//alta
        {},//del
        {}//search
    ).navButtonAdd('#main_grid_boletas_tasa_externa_pager',
        {
            caption: "Mails",
            buttonicon:"",
            position:"right",
            title:"Mails",
            cursor:"pointer",
            onClickButton:function () {
                var id = $("#main_grid_boletas_tasa_externa").getGridParam('selrow');
                var mail = $("#main_grid_boletas_tasa_externa").getCell(id,"mail");
                id_boleta_agr = $('#main_grid_boletas_tasa_externa').getCell(id, 'id_boleta_agr');

                if (id) {
                    if(mail === 'S'){

                        filtros_no_nativos = [];
                        filtros_arr_main = [];
                        if($('#n_cuit').val() !== ''){filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());}
                        if($('#desc_denom').val() !== ''){filtros_arr_main.push('Denominación: '+ $('#desc_denom').val());}
                        if($('#c_tributo').val() !== ''){filtros_arr_main.push('Tributo: '+ $('#c_tributo').val());}
                        if($('#d_objeto_hecho').val() !== ''){filtros_arr_main.push('Objeto/Hecho: '+ $('#d_objeto_hecho').val());}
                        if($('#c_tipo').val() !== ''){filtros_arr_main.push('Tipo: '+ $('#c_tipo_documento').val());}
                        if($('#n_boleta').val() !== ''){filtros_arr_main.push('Nro. Boleta: '+ $('#n_boleta').val());}

                        filtros_no_nativos_ar['mails_grid'] = filtros_arr_main;

                        setea_parametros('#mails_grid',{':p_id_boleta':id_boleta_agr});
                        $('#mails_grid_modal').modal("show");
                    }else{
                        mostrar_cuadro('I', 'Informaci&oacute;n', 'No posee mails.');
                        return false;
                    }
                }else {
                    mostrar_error('Debe seleccionar una Fila de la grilla.');
                    return false;
                }

            }
        }).navButtonAdd('#main_grid_boletas_tasa_externa_pager',
        {
            caption: "Detalle",
            buttonicon:"",
            position:"right",
            title:"Detalle",
            cursor:"pointer",
            onClickButton:function () {
                var rowid = $("#main_grid_boletas_tasa_externa").getGridParam('selrow');

                if (rowid) {
                    $('#main').procOverlay({visible: true});
                    let id_boleta_agr = $('#main_grid_boletas_tasa_externa').getCell(rowid, 'id_boleta_agr');
                    let d_objeto_hecho = $('#main_grid_boletas_tasa_externa').getCell(rowid, 'd_objeto_hecho');
                    let c_tributo = $('#main_grid_boletas_tasa_externa').getCell(rowid, 'c_tributo');
                    buscar_detalles(id_boleta_agr, c_tributo, d_objeto_hecho);
                }else {
                    mostrar_error('Debe seleccionar una Fila de la grilla.');
                    return false;
                }
            }
        }).navButtonAdd('#main_grid_boletas_tasa_externa_pager',
        {
            caption: "Reimprimir Boleta",
            buttonicon:"",
            position:"right",
            title:"Reimprimir Boleta",
            cursor:"pointer",
            onClickButton:function () {
                var rowid = $("#main_grid_boletas_tasa_externa").getGridParam('selrow');
                if (rowid) {
                    $('#main').procOverlay({visible: true});
                    let id_boleta_agr = $('#main_grid_boletas_tasa_externa').getCell(rowid, 'id_boleta_agr');
                    let c_tributo = $('#main_grid_boletas_tasa_externa').getCell(rowid, 'c_tributo');
                    if(id_boleta_agr){
                        reportes(id_boleta_agr, c_tributo);
                    }
                }else {
                    mostrar_error('Debe seleccionar una Fila de la grilla.');
                    return false;
                }
            }
        });


    $("#detalles_grid_boletas").jqGrid({
        colNames:datos_detalles_grid_boletas.colNames(),
        colModel:datos_detalles_grid_boletas.colModel(),
        pager: $('#detalles_grid_boletas_pager'),
        postData:datos_detalles_grid_boletas.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: true,
        height:150,
        rowNum: 50,
        gridview: false
    }).navGrid('#detalles_grid_boletas_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

    $("#detalles_grid_boletas_sellos").jqGrid({
        colNames:datos_detalles_grid_boletas_sellos.colNames(),
        colModel:datos_detalles_grid_boletas_sellos.colModel(),
        pager: $('#detalles_grid_boletas_sellos_pager'),
        postData:datos_detalles_grid_boletas_sellos.postData(),
        editurl: FUNCIONES_BASEPATH+"maestro_abm.php",
        autowidth: true,
        height:150,
        rowNum: 50,
        gridview: false
    }).navGrid('#detalles_grid_boletas_sellos_pager',
        {add:false, edit:false, del:false}, //options
        {}, // edit options
        {}, // add options
        {}, // del options
        {} // search options
    );

}