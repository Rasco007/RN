function inicializarLupas(){
    $("#lupa_tipo_imp").lupa_generica({
        id_lista: v_lista_tipo_imponible,
        titulos:['Código', 'Descripción'],
        grid:[  
            {index:'c_codigo',width:115},
            {index:'d_descrip',width:450}],
        caption:'Listado de Tipos Imponibles',
        sortname:'d_descrip',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_tipo_imp',
        exactField: 'c_codigo',
        campos:{c_codigo:'c_tipo_imp', d_descrip:'d_tipo_imp'},
        keyNav:true,
        limpiarCod: true,
    });

    $("#lupa_tributo").lupa_generica({
        id_lista: v_lista_tributos,
        titulos:['Código', 'Descripción'],
        grid:[  
            {index:'c_codigo',width:100},
            {index:'d_descrip',width:449}],
        caption:'Listado de Tributos',
        sortname:'d_descrip',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_tributo',
        exactField: 'c_codigo',
        campos:{c_codigo:'c_tributo', d_descrip:'d_tributo'},
        keyNav:true,
        limpiarCod: true,
    });

    $("#lupa_tributo_contrib").lupa_generica({
        id_lista: v_lista_tributos,
        titulos:['Código', 'Descripción'],
        grid:[  
            {index:'c_codigo',width:100},
            {index:'d_descrip',width:449}],
        caption:'Listado de Tributos',
        sortname:'d_descrip',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_tributo_contrib',
        exactField: 'c_codigo',
        campos:{c_codigo:'c_tributo_contrib', d_descrip:'d_tributo_contrib'},
        keyNav:true,
        limpiarCod: true,
    });

    $("#lupa_n_doc").lupa_generica({
        id_lista: v_lista_contrib_interm,
        titulos:['Razón Social', 'CUIT', 'Documento', 'Categoría'],
        grid:[  
            {index:'razonsocial',width:450},
            {index:'n_cuit',width:150},
            {index:'n_documento',width:150},
            {index:'categoria',width:350},
        ],
        caption:'Listado de Contribuyentes Intermediarios',
        sortname:'razonsocial',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#n_documento',
        exactField: 'n_documento',
        campos:{razonsocial:'d_denominacion', n_cuit:'n_cuit_intermed', n_documento:'n_documento'},
        keyNav:true,
        limpiarCod: true,
    });

    $("#lupa_cuit").lupa_generica({
        id_lista: v_lista_contrib_interm,
        titulos:['Razón Social', 'CUIT', 'Documento', 'Categoría'],
        grid:[  
            {index:'razonsocial',width:450},
            {index:'n_cuit',width:150},
            {index:'n_documento',width:150},
            {index:'categoria',width:350},
        ],
        caption:'Listado de Contribuyentes Intermediarios',
        sortname:'razonsocial',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#n_cuit_intermed',
        exactField: 'n_cuit',
        campos:{razonsocial:'d_denominacion', n_cuit:'n_cuit_intermed', n_documento:'n_documento'},
        keyNav:true,
        limpiarCod: true,
    });

    $("#lupa_provincia").lupa_generica({
        id_lista: v_lista_provincias,
        titulos:['Código', 'Descripción'],
        grid:[  
            {index:'c_codigo',width:100},
            {index:'d_descrip',width:449}],
        caption:'Listado de Provincias',
        sortname:'d_descrip',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_provincia',
        exactField: 'c_codigo',
        campos:{c_codigo:'c_provincia', d_descrip:'d_provincia'},
        keyNav:true,
        limpiarCod: true,
    });

    $("#lupa_tipo_doc_hab").lupa_generica({
        id_lista: v_lista_tipo_doc_habilitante,
        titulos:['Código', 'Descripción'],
        grid:[
            {index:'c_dato',width:150},
            {index:'d_dato',width:400}
            ],
        caption:'Listado de Tipo Documentos Habilitantes',
        sortname:'d_dato',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_tipo_doc_hab',
        exactField: 'c_dato',
        campos:{c_dato:'c_tipo_doc_hab', d_dato:'d_tipo_doc_hab'},
        keyNav:true,
        limpiarCod: true,
    });

    $("#lupa_d_denominacion").lupa_generica({
        id_lista:v_lista_denominaciones,
        titulos:['Razón Social', 'ID Contribuyente', 'CUIT', 'Cod. Tipo Documento', 'Tipo Documento', 'Nro. Documento', 'Categoría', 'F. Alta'],
        grid:[
            {index:'d_denominacion',width:450},
            {index:'id_contribuyente',width:450, hidden: true},
            {index:'n_cuit',width:100},
            {index:'c_tipo_documento',width:100, hidden: true},
            {index:'d_tipo_documento',width:150, hidden: true},
            {index:'n_documento',width:150},
            {index:'categoria',width:150},
            {index:'f_alta',width:100, hidden: true}
        ],
        caption:'Listado de Contribuyentes Intermediarios',
        sortname:'d_denominacion',
        sortorder:'asc',
        filtros:['#d_denominacion'],
        filtrosNulos:[true],
        campos:{
            n_cuit: 'n_cuit_intermed',
            d_denominacion:'d_denominacion',
            c_tipo_documento: 'c_tipo_doc',
            d_tipo_documento: 'd_tipo_doc',
            n_documento: 'n_documento'
        },
        keyNav:true,
        draggable:true,
    });

    $("#lupa_d_denominacion_contrib").lupa_generica({
        id_lista:v_lista_denom_gral,
        titulos:['Razón Social', 'ID Contribuyente', 'CUIT'],
        grid:[
            {index:'d_razon_social',width:400},
            {index:'id_contribuyente',width:450, hidden: true},
            {index:'n_cuit',width:100}
        ],
        caption:'Listado de Contribuyentes',
        sortname:'d_razon_social',
        sortorder:'asc',
        filtros:['#d_denominacion_contrib'],
        filtrosNulos:[true],
        campos:{
            n_cuit: 'n_cuit_contrib',
            d_razon_social:'d_denominacion_contrib'
        },
        keyNav:true,
        draggable:true,
    });

    $("#lupa_cuit_contrib").lupa_generica({
        id_lista:v_lista_denom_gral,
        titulos:['CUIT', 'ID Contribuyente', 'Razón Social'],
        grid:[
            {index:'n_cuit',width:148},
            {index:'id_contribuyente',width:450, hidden: true},
            {index:'d_razon_social',width:400}
        ],
        caption:'Listado de Cuit',
        sortname:'d_razon_social',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#n_cuit_contrib',
        exactField: 'n_cuit',
        filtros:[''],
        filtrosNulos:[true],
        campos:{
            n_cuit: 'n_cuit_contrib',
            d_razon_social:'d_denominacion_contrib'
        },
        keyNav:true,
        draggable:true,
    });

    $("#lupa_tipo_doc").lupa_generica({
        id_lista: v_lista_tipo_doc,
        titulos:['Código', 'Descripción'],
        grid:[  
            {index:'c_dato',width:100},
            {index:'d_dato',width:449}],
        caption:'Listado de Tipos de Documentos',
        sortname:'c_dato',
        sortorder:'asc',
        searchCode:true,
        searchInput: '#c_tipo_doc',
        exactField: 'c_dato',
        campos:{c_dato:'c_tipo_doc', d_dato:'d_tipo_doc'},
        keyNav:true,
        limpiarCod: true,
    });
};

function limpiar_todo(){
    $('#n_cuit_intermed').val(null);
        $('#c_tipo_imp').val(null);
        $('#d_tipo_imp').val(null);
        $('#n_documento').val(null);
        $('#c_tipo_doc').val(null);
        $('#d_tipo_doc').val(null);
        $('#d_denominacion').val(null);
        $('#d_objeto_hecho').val(null);
        $('#c_tributo').val(null);
        $('#d_tributo').val(null);

        $('#n_cuit_contrib').val(null);
        $('#d_denominacion_contrib').val(null)
        $('#d_objeto_hecho_contrib').val(null);
        $('#d_tributo_contrib').val(null);
        $('#existia_alta').val(null);
        $('#c_provincia').val(null);
        $('#c_tributo_contrib').val(null);
        $('#d_localidad').val(null);
        $('#c_postal').val(null);
        $('#d_calle').val(null);
        $('#n_numero').val(null);
        $('#piso').val(null);
        $('#d_email').val(null);
        $('#depto').val(null);
        $('#n_telefono').val(null);
        $('#f_desde').val(null);
        $('#f_hasta').val(null);
        $('#cta_contable').val(null);
        $('#n_orden').val(null);
        $('#c_tipo_doc_hab').val(null);
        $('#d_tipo_doc_hab').val(null);
        $('#d_provincia').val(null);

        $('#n_cuit_intermed').prop('disabled', false);
        $('#d_objeto_hecho').prop('disabled', false);
        $('#d_denominacion').prop('disabled', false);
        $('#c_tipo_doc').prop('disabled', false);
        $('#n_documento').prop('disabled', false);
        $('#c_tipo_imp').prop('disabled', false);
        $('#c_tributo').prop('disabled', false);
        $('#n_cuit_contrib').prop('disabled', false);
        $('#d_denominacion_contrib').prop('disabled', false);
        $('#d_objeto_hecho_contrib').prop('disabled', false);
        $('#existia_alta').prop('disabled', false);
        $('#c_tributo_contrib').prop('disabled', false);
        $('#c_provincia').prop('disabled', false);
        $('#d_localidad').prop('disabled', false);
        $('#c_postal').prop('disabled', false);
        $('#d_calle').prop('disabled', false);
        $('#n_numero').prop('disabled', false);
        $('#piso').prop('disabled', false);
        $('#depto').prop('disabled', false);
        $('#d_email').prop('disabled', false);
        $('#n_telefono').prop('disabled', false);
        $('#f_desde').prop('disabled', false);
        $('#f_hasta').prop('disabled', false);
        $('#cta_contable').prop('disabled', false);
        $('#n_orden').prop('disabled', false);
        $('#c_tipo_doc_hab').prop('disabled', false);
        $('#separador').prop('disabled', true);
        $('#separador').val(',');
        $('#lupa_cuit').show().css('display', 'table-cell');
        $('#mascara_lupa_cuit').hide();
        $('#lupa_tipo_doc').show().css('display', 'table-cell');
        $('#mascara_lupa_tipo_doc').hide();
        $('#lupa_n_doc').show().css('display', 'table-cell');
        $('#mascara_lupa_n_doc').hide();
        $('#lupa_tipo_imp').show().css('display', 'table-cell');
        $('#mascara_lupa_tipo_imp').hide();
        $('#lupa_tributo').show().css('display', 'table-cell');
        $('#mascara_lupa_tributo').hide();
        //2do Form
        $('#lupa_cuit_contrib').show().css('display', 'table-cell');
        $('#mascara_lupa_cuit_contrib').hide();
        $('#lupa_tributo_contrib').show().css('display', 'table-cell');
        $('#mascara_lupa_tributo_contrib').hide();
        $('#lupa_provincia').show().css('display', 'table-cell');
        $('#mascara_lupa_provincia').hide();
        $('#lupa_tipo_doc_hab').show().css('display', 'table-cell');
        $('#mascara_lupa_tipo_doc_hab').hide();

        v_es_carga_inicial = true;

        //PRC_BORRAR_TMP_CONS_REG_INTERM
        $.ajax({
            type:'POST',
            url: FUNCIONES_BASEPATH+'maestro_abm.php',
            data:{
                "id_menu":v_id_menu,
                "n_orden":1
            },
            dataType:'json',
            success: function( data ) {
                if(data.resultado == 'OK'){
                    $("#main_grid").jqGrid('clearGridData');
                }
                else{
                    mostrar_cuadro('E', 'Error', data.resultado);
                    return;
                }
            }
        });



}

function bloquear_filtros(){
    $('#n_cuit_intermed').prop('disabled', true);
    $('#d_objeto_hecho').prop('disabled', true);
    $('#d_denominacion').prop('disabled', true);
    $('#c_tipo_doc').prop('disabled', true);
    $('#n_documento').prop('disabled', true);
    $('#c_tipo_imp').prop('disabled', true);
    $('#c_tributo').prop('disabled', true);
    $('#n_cuit_contrib').prop('disabled', true);
    $('#d_denominacion_contrib').prop('disabled', true);
    $('#d_objeto_hecho_contrib').prop('disabled', true);
    $('#existia_alta').prop('disabled', true);
    $('#c_tributo_contrib').prop('disabled', true);
    $('#c_provincia').prop('disabled', true);
    $('#d_localidad').prop('disabled', true);
    $('#c_postal').prop('disabled', true);
    $('#d_calle').prop('disabled', true);
    $('#n_numero').prop('disabled', true);
    $('#piso').prop('disabled', true);
    $('#depto').prop('disabled', true);
    $('#d_email').prop('disabled', true);
    $('#n_telefono').prop('disabled', true);
    $('#f_desde').prop('disabled', true);
    $('#f_hasta').prop('disabled', true);
    $('#cta_contable').prop('disabled', true);
    $('#n_orden').prop('disabled', true);
    $('#c_tipo_doc_hab').prop('disabled', true);
    $('#mascara_lupa_cuit').show().css('display', 'table-cell');
    $('#lupa_cuit').hide();
    $('#lupa_tipo_doc').show().hide();
    $('#mascara_lupa_tipo_doc').css('display', 'table-cell');
    $('#lupa_n_doc').show().hide();
    $('#mascara_lupa_n_doc').css('display', 'table-cell');
    $('#lupa_tipo_imp').show().hide();
    $('#mascara_lupa_tipo_imp').css('display', 'table-cell');
    $('#lupa_tributo').show().hide();
    $('#mascara_lupa_tributo').css('display', 'table-cell');
    //2do Form
    $('#lupa_cuit_contrib').show().hide();
    $('#mascara_lupa_cuit_contrib').css('display', 'table-cell');
    $('#lupa_tributo_contrib').show().hide();
    $('#mascara_lupa_tributo_contrib').css('display', 'table-cell');
    $('#lupa_provincia').show().hide();
    $('#mascara_lupa_provincia').css('display', 'table-cell');
    $('#lupa_tipo_doc_hab').show().hide();
    $('#mascara_lupa_tipo_doc_hab').css('display', 'table-cell');
}

function obtener_url(id_btn){
    let id_row = id_btn.slice(4);
    let v_url;
    //FUN_TRAER_URL_PDF
    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_id_contrib_intermed": $('#main_grid').getCell(id_row, 'id_contribuyente_intermediario'),
         "p_id_pdf": $('#main_grid').getCell(id_row, 'n_id_pdf'),
         "id_menu":v_id_menu,
         "n_orden":2
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
              v_url = data.retorno;

              if(v_url.slice(0,5) == 'Error'){
                mostrar_error(v_url, 'E', true);
                return;
              } else{
                window.open(v_url, "_blank");
              }
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    }); 
}

function asignar_ids_btn_pdf(){
    for(let i = 1; i <= $('#main_grid').getGridParam('records'); i++){
        let rowData = $('#main_grid').jqGrid('getRowData', i);
        let nuevo_id = 'btn_' + i;

        rowData.boton_pdf = '<button type="button" id="' + nuevo_id + '" class="ui-button ui-corner-all ui-widget btn_pdf" onclick="obtener_url(this.id)">PDF</button>';
        $('#main_grid').jqGrid('setRowData', i, rowData);
    }
}

function cargar_tmp_grilla(){

    $.ajax({
        type:'POST',
        url: FUNCIONES_BASEPATH+'maestro_abm.php',
        data:{      
         "p_n_cuit_intermediario": v_filtros_ingresados[0],
         "p_d_denom_intermediario": v_filtros_ingresados[3],
         "p_n_doc_intermediario": v_filtros_ingresados[2],
         "p_c_tributo_interm": v_filtros_ingresados[6],
         "p_c_tipo_imp_interm": v_filtros_ingresados[5],
         "p_c_tipo_doc": v_filtros_ingresados[1],
         "p_n_cuit_contrib": v_filtros_ingresados[7],
         "p_d_denom_contrib": v_filtros_ingresados[8],
         "p_d_objeto_hecho_contrib": v_filtros_ingresados[9],
         "p_existia_alta": v_filtros_ingresados[10],
         "p_tributo_contrib": v_filtros_ingresados[11],
         "p_c_provincia": v_filtros_ingresados[12],
         "p_d_localidad": v_filtros_ingresados[13],
         "p_c_postal": v_filtros_ingresados[14],
         "p_d_calle": v_filtros_ingresados[15],
         "p_n_numero": v_filtros_ingresados[16],
         "p_piso": v_filtros_ingresados[17],
         "p_depto": v_filtros_ingresados[18],
         "p_email": v_filtros_ingresados[19],
         "p_n_telefono": v_filtros_ingresados[20],
         "p_f_vig_desde": v_filtros_ingresados[21],
         "p_f_vig_hasta": v_filtros_ingresados[22],
         "p_cta_contable": v_filtros_ingresados[23],
         "p_orden": v_filtros_ingresados[24],
         "p_c_tipo_doc_hab": v_filtros_ingresados[25],
         "p_d_objeto_hecho_interm": v_filtros_ingresados[4],
         "id_menu":v_id_menu,
         "n_orden":3
        },
        dataType:'json',
        success: function( data ) {
            if(data.resultado == 'OK'){
                setea_parametros('#main_grid', {});
            }
            else{
                mostrar_cuadro('E', 'Error', data.resultado);
                return;
            }
        }
    });
}


function es_consulta_general(){
    return $('#n_cuit_intermed').val() == '' && $('#c_tipo_imp').val() == '' && $('#d_tipo_imp').val() == '' && $('#n_documento').val() == '' &&
        $('#c_tipo_doc').val() == '' && $('#d_tipo_doc').val() == '' && $('#d_denominacion').val() == '' && $('#d_objeto_hecho').val() == '' &&
        $('#c_tributo').val() == '' && $('#d_tributo').val() == '' && $('#n_cuit_contrib').val() == '' && $('#d_denominacion_contrib').val() == '' &&
        $('#d_objeto_hecho_contrib').val() == '' && $('#d_tributo_contrib').val() == '' && $('#existia_alta').val() == '' && $('#c_provincia').val() == '' &&
        $('#c_tributo_contrib').val() == '' && $('#d_localidad').val() == '' && $('#c_postal').val() == '' && $('#d_calle').val() == ''&&
        $('#n_numero').val() == '' && $('#piso').val() == '' && $('#d_email').val() == '' && $('#depto').val() == '' && $('#n_telefono').val() == '' &&
        $('#f_desde').val() == '' && $('#f_hasta').val() == '' && $('#cta_contable').val() == '' && $('#n_orden').val() == '' && $('#c_tipo_doc_hab').val() == '' &&
        $('#d_tipo_doc_hab').val() == '' && $('#d_provincia').val() == '';
}

function obtener_filtros_ingresados(){
    if($('#n_cuit_intermed').val()){
        v_filtros_ingresados[0] = limpia_cuit($('#n_cuit_intermed').val())
    }
    if($('#c_tipo_doc').val()){
        v_filtros_ingresados[1] = $('#c_tipo_doc').val()
    }
    if($('#n_documento').val()){
        v_filtros_ingresados[2] = $('#n_docuemento').val()
    }
    if($('#d_denominacion').val()){
        v_filtros_ingresados[3] = $('#d_denominacion').val()
    }
    if($('#d_objeto_hecho').val()){
        v_filtros_ingresados[4] = $('#d_objeto_hecho').val()
    }
    if($('#c_tipo_imp').val()){
        v_filtros_ingresados[5] = $('#c_tipo_imp').val()
    }
    if($('#c_tributo').val()){
        v_filtros_ingresados[6] = $('#c_tributo').val()
    }
    if($('#n_cuit_contrib').val()){
        v_filtros_ingresados[7] = $('#n_cuit_contrib').val()
    }
    if($('#d_denominacion_contrib').val()){
        v_filtros_ingresados[8] = $('#d_denominacion_contrib').val()
    }
    if($('#d_objeto_hecho_contrib').val()){
        v_filtros_ingresados[9] = $('#d_objeto_hecho_contrib').val()
    }
    if($('#existia_alta').val()){
        v_filtros_ingresados[10] = $('#existia_alta').val()
    }
    if($('#c_tributo_contrib').val()){
        v_filtros_ingresados[11] = $('#c_tributo_contrib').val()
    }
    if($('#c_provincia').val()){
        v_filtros_ingresados[12] = $('#c_provincia').val()
    }
    if($('#d_localidad').val()){
        v_filtros_ingresados[13] = $('#d_localidad').val()
    }
    if($('#c_postal').val()){
        v_filtros_ingresados[14] = $('#c_postal').val()
    }
    if($('#d_calle').val()){
        v_filtros_ingresados[15] = $('#d_calle').val()
    }
    if($('#n_numero').val()){
        v_filtros_ingresados[16] = $('#n_numero').val()
    }
    if($('#piso').val()){
        v_filtros_ingresados[17] = $('#piso').val()
    }
    if($('#depto').val()){
        v_filtros_ingresados[18] = $('#depto').val()
    }
    if($('#d_email').val()){
        v_filtros_ingresados[19] = $('#d_email').val()
    }
    if($('#n_telefono').val()){
        v_filtros_ingresados[20] = $('#n_telefono').val()
    }
    if($('#f_desde').val()){
        v_filtros_ingresados[21] = $('#f_desde').val()
    }
    if($('#f_hasta').val()){
        v_filtros_ingresados[22] = $('#f_hasta').val()
    }
    if($('#cta_contable').val()){
        v_filtros_ingresados[23] = $('#cta_contable').val()
    }
    if($('#n_orden').val()){
        v_filtros_ingresados[24] = $('#n_orden').val()
    }
    if($('#c_tipo_doc_hab').val()){
        v_filtros_ingresados[25] = $('#c_tipo_doc_hab').val()
    }
}

function limpiar_filtros_ingresados(){
    v_filtros_ingresados = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null];
}