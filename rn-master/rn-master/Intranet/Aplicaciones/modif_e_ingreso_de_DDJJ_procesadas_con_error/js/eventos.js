

function initEventos(){
    $('#lupa_d_denominacion').hide();
    $('#lupa_d_objeto_hecho').hide();
    $('#mascara_lupa_tipo_documento').hide();
    $('#mascara_lupa_c_tributo').hide();
    $('#mascara_lupa_c_concepto').hide();

   $("#n_cuit").mask("99-99999999-9");

   if(p_modo == 'C'){
    $('#edit_main_grid').hide();
    $('#titulo_cabecera').text('Consulta DDJJ Procesadas con Error');
   } else{
    $('#titulo_cabecera').text('Modif. e ingreso de DDJJ procesadas con error');
   }


    $('#btn_buscar').click(function(){
        if(p_modo == 'C'){
            if ($('#c_tributo').val() === '' && $('#d_objeto_hecho').val() === '' || $('#c_tributo').val() !== '' && $('#d_objeto_hecho').val() === '' || $('#c_tributo').val() === '' && $('#d_objeto_hecho').val() !== '') {
                if($('#n_cuit').val() === ''){
                    mostrar_cuadro('E', 'Error', 'Debe ingresar Tributo y Objeto o Nro. CUIT.', null, null, 400);
                    return;
                }
            }
        }
        $('#main').procOverlay({visible:true});

        filtros_no_nativos = [];
        filtros_arr_main = [];

        if($('#d_denominacion').val() != ''){
            filtros_arr_main.push('Denominación: '+ $('#d_denominacion').val());
        }
        if($('#n_cuit').val() != ''){
            filtros_arr_main.push('CUIT: '+ $('#n_cuit').val());
        }
        if($('#c_tipo_documento').val() != ''){
            filtros_arr_main.push('Tipo documento: '+ $('#c_tipo_documento').val() +' - '+$('#d_tipo_documento').val());
        }
        if($('#nro_documento').val() != ''){
            filtros_arr_main.push('Documento: '+ $('#nro_documento').val());
        }
        if($('#d_objeto_hecho').val() != ''){
            filtros_arr_main.push('Objeto Hecho: '+ $('#d_objeto_hecho').val());
        }
        if($('#c_tributo').val() != ''){
            filtros_arr_main.push('Tributo: '+ $('#c_tributo').val() + ' - '+$('#d_tributo').val());
        }
        if($('#c_concepto').val() != ''){
            filtros_arr_main.push('Concepto: '+ $('#c_concepto').val() + ' - '+$('#d_concepto').val());
        }
        filtros_no_nativos_ar['main_grid'] = filtros_arr_main;
        filtros_no_nativos_ar['detalles_grid'] = filtros_arr_main;

        $('#btn_buscar').attr('disabled', true);
        $('#n_cuit').attr('disabled', true);
        $('#d_denominacion').attr('disabled', true);
        $('#c_tipo_documento').attr('disabled', true);
        $('#d_tipo_documento').attr('disabled', true);
        $('#nro_documento').attr('disabled', true);
        $('#c_tributo').attr('disabled', true);
        $('#d_tributo').attr('disabled', true);
        $('#d_objeto_hecho').attr('disabled', true);
        $('#c_concepto').attr('disabled', true);
        $('#d_concepto').attr('disabled', true);
        $('#mascara_d_objeto_hecho').show().css('display', 'table-cell');
        $('#lupa_d_objeto_hecho').hide();
        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        $('#lupa_d_denominacion').hide();
        $('#mascara_lupa_tipo_documento').show().css('display', 'table-cell');
        $('#lupa_tipo_documento').hide();
        $('#mascara_lupa_c_tributo').show().css('display', 'table-cell');
        $('#lupa_c_tributo').hide();
        $('#mascara_lupa_c_concepto').show().css('display', 'table-cell');
        $('#lupa_c_concepto').hide();


        /*setea_parametros('#main_grid',{
            ':p_d_denominacion':$("#d_denominacion").val(),
            ':p_n_cuit':limpia_cuit($('#n_cuit').val()),
            ':p_n_documento':limpia_dni($("#nro_documento").val()),
            ':p_c_tributo':$("#c_tributo").val(),
            ':p_c_concepto':$("#c_concepto").val(),
            ':p_d_objeto_hecho':$("#d_objeto_hecho").val()

        });*/

        setea_parametros('#main_grid',{
            ':p_d_denominacion':$("#d_denominacion").val(),
            ':p_n_cuit':limpia_cuit($('#n_cuit').val()),
            ':p_n_documento':null,
            ':p_c_tributo':$("#c_tributo").val(),
            ':p_c_concepto':$("#c_concepto").val(),
            ':p_d_objeto_hecho':$("#d_objeto_hecho").val()

        });
    
    });
    
    $('#btn_limpiar').click(function(){
        $('#n_cuit').val(null);
        $('#d_denominacion').val(null);
        $('#c_tipo_documento').val(null);
        $('#d_tipo_documento').val(null);
        $('#c_tributo').val(null);
        $('#d_tributo').val(null);
        $('#d_objeto_hecho').val(null);
        $('#c_concepto').val(null);
        $('#d_concepto').val(null);
        $('#nro_documento').val(null);

        $('#n_cuit').attr('disabled', false);
        $('#d_denominacion').attr('disabled', false);
        $('#c_tipo_documento').attr('disabled', false);
        $('#d_tipo_documento').attr('disabled', false);
        $('#nro_documento').attr('disabled', false);
        $('#c_tributo').attr('disabled', false);
        $('#d_tributo').attr('disabled', false);
        $('#d_objeto_hecho').attr('disabled', false);
        $('#c_concepto').attr('disabled', false);
        $('#d_concepto').attr('disabled', false);
        
        $('#main_grid').clearGridData();
        $('#detalles_grid').clearGridData();
        $('#btn_buscar').attr('disabled', false);
        $('#lupa_tipo_documento').show().css('display', 'table-cell');
        $('#mascara_lupa_tipo_documento').hide();
        $('#lupa_c_tributo').show().css('display', 'table-cell');
        $('#mascara_lupa_c_tributo').hide();
        $('#lupa_c_concepto').show().css('display', 'table-cell');
        $('#mascara_lupa_c_concepto').hide();

        $('#mascara_d_objeto_hecho').show().css('display', 'table-cell');
        $('#lupa_d_objeto_hecho').hide();

        if($('#main_grid').getGridParam('records') <= 0){
            $('#refresh_main_grid').hide();
        }

        $('#lupa_d_denominacion').hide();
        $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        $('#d_denominacion').attr('readonly', false);
        $('#d_denominacion').attr('disabled', false);

        setea_parametros('#main_grid',{},'N');
        setea_parametros('#detalles_grid',{},'N');
    });
    
}
function limpia_dni(dni){
	var result;
	if (dni != null){
		result=dni.replace(/\./gi, '');
		return result;
	}else{
		return null;
	}
}



function inicializarLupas(){

    $("#lupa_d_denominacion").lupa_generica({
        id_lista:v_lista_d_denominacion,
        titulos:['Nombre','CUIT', 'Tipo Documento', 'Nro Documento'],
        grid:[{index:'c_codigo',width:300},
            {index:'d_descrip',width:100},
            {index:'c_tipo_documento',width:100},
            {index:'n_documento',width:300}],
        caption:'Listado de Nombres de Contribuyentes',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'d_denominacion',
        d_descrip: 'n_cuit',
        c_tipo_documento: 'c_tipo_documento', 
        n_documento: 'nro_documento' },
        keyNav:true,
        filtros:['#d_denominacion','#n_cuit'],
        filtrosTitulos:['Nombre', 'CUIT'],
        filtrosNulos:[true, true],
        onClose: function(){
            $('#c_tipo_documento').blur();
        }
    });

    $("#lupa_tipo_documento").lupa_generica({
        id_lista:v_lista_tipo_documento,
        titulos:['Código.','Descripción'],
        grid:[{index:'c_dato',width:100},
            {index:'d_dato',width:450}],
        caption:'Listado de Tipos de Documento',
        sortname:'c_dato',
        sortorder:'asc',
        campos:{c_dato:'c_tipo_documento',d_dato: 'd_tipo_documento'},
        keyNav:true,
        searchInput: '#c_tipo_documento',
        searchCode: true,
        exactField: 'c_dato',

    });
    
    $("#lupa_c_tributo").lupa_generica({
        id_lista:v_lista_c_tributo,
        titulos:['Código','Descripción'],
        grid:[{index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'Listado de Tributos de Ingresos Brutos',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'c_tributo',d_descrip: 'd_tributo'},
        keyNav:true,
        searchInput: '#c_tributo',
        searchCode: true,
        exactField: 'c_codigo'

    });

    $("#lupa_c_concepto").lupa_generica({
        id_lista:v_lista_conceptos_ddjj,
        titulos:['Código','Descripción'],
        grid:[{index:'c_concepto',width:100},
            {index:'d_concepto',width:450}],
        caption:'Conceptos DDJJ',
        sortname:'c_concepto',
        sortorder:'asc',
        campos:{c_concepto:'c_concepto',d_concepto: 'd_concepto'},
        keyNav:true,
        filtros:['#c_tributo'],
        filtrosTitulos:['c_tributo'],
        filtrosNulos:[true],
        searchInput: '#c_concepto',
        searchCode: true,
        exactField: 'c_concepto'

    });

    $("#lupa_d_objeto_hecho").lupa_generica({
        id_lista:v_lista_obj,
        titulos:['Objeto-Hecho','Cuit','Denominación','id_contribuyente'],
        grid:[{index:'d_objeto_hecho',width:150},
            {index:'n_cuit',width:100},
            {index:'d_denominacion',width:315},
            {index:'id_contribuyente',hidden:true}],
        caption:'Lista de Objetos Hechos y Contribuyentes',
        sortname:'d_objeto_hecho',
        sortorder:'asc',
        filtros:['#d_objeto_hecho'],
        filtrosNulos:[false],
        filtrosTitulos:['Objeto Hecho'],
        campos:{d_objeto_hecho:'d_objeto_hecho',n_cuit:'n_cuit',d_denominacion:'d_denominacion',id_contribuyente:'id_contrib'},
        keyNav:true
    });
    
    $('#n_cuit').focusout(function(){
        if ($('#n_cuit').val() != ''){
            try{
                if( limpia_cuit($('#n_cuit').val()).length == 11 ){
                    $.ajax({
                        type:'POST',
                        url: "modif_e_ingreso_de_DDJJ_procesadas_con_error/php/autocomplete.php",
                        data: {oper:'2',term: limpia_cuit($('#n_cuit').val())},
                        dataType: 'json',
                        success: function( data ) {
                            ajax_autocomplete = null;
                            if(data) {
                                $("#d_denominacion").val(data.DENOMINACION);
                                $("#c_tipo_documento").val(data.C_TIPO_DOCUMENTO);
                                $("#d_tipo_documento").val(data.D_TIPO_DOCUMENTO);
                                $("#nro_documento").val(data.N_DOCUMENTO);
                                $("#id_contrib").val(data.ID_CONTRIBUYENTE);
                                $("#c_tributo").val(data.C_TRIBUTO);
                                $("#d_tributo").val(data.D_TRIBUTO);
                                //$("#d_objeto_hecho").val(data.D_OBJETO_HECHO);

                                $("#c_concepto").val(data.C_CONCEPTO);
                                $("#d_concepto").val(data.D_CONCEPTO);                            
                                         
                              }       
                        }
                    });
        
                }else{
                    $('#btn_limpiar').click();
                }
            }catch(err){
            }
        }
    });

    $('#d_denominacion').keyup(function () {
        if ($('#d_denominacion').val().length >= 2){
            $('#lupa_d_denominacion').show().css('display', 'table-cell');
            $('#mascara_lupa_d_denominacion').hide();
        } else {
            $('#lupa_d_denominacion').hide();
            $('#mascara_lupa_d_denominacion').show().css('display', 'table-cell');
        }
    });

    $('#d_objeto_hecho').keyup(function () {
        if ($('#d_objeto_hecho').val().length >= 3) {
            $('#lupa_d_objeto_hecho').show().css('display', 'table-cell');
            $('#mascara_d_objeto_hecho').hide();
        } else {
            $('#lupa_d_objeto_hecho').hide();
            $('#mascara_d_objeto_hecho').show().css('display', 'table-cell');
        }
    });
}

function inicializa_lupas_main_grid(formid){

    /*$("#tipo_plan", formid).lupa_generica({
        id_lista:v_lista_tipo_plan,
        titulos:['Tipo Plan','Descripcion Plan'],
        grid:[  {index:'c_codigo',width:100},
            {index:'d_descrip',width:450}],
        caption:'LISTADO DE PLANES DE FISCALIZACION',
        sortname:'c_codigo',
        sortorder:'asc',
        campos:{c_codigo:'tipo_plan',d_descrip: 'D_TIPO_PLAN '},
        keyNav:true,
        searchInput: '#tipo_plan',
        searchCode: true
    });*/

    $("#c_concepto",formid).lupa_generica({
        id_lista:v_lista_conceptos_ddjj,
        titulos:['Código','Descripción'],
        grid:[{index:'c_concepto',width:100},
        {index:'d_concepto',width:450}],
        caption:'Conceptos DDJJ',
        sortname:'c_concepto',
        sortorder:'asc',
        campos:{c_concepto:'c_concepto',d_concepto: 'desc_concepto'},
        keyNav:true,
        filtros:['#c_tributo'],
        filtrosTitulos:['c_tributo'],
        filtrosNulos:[true],
        searchInput: '#c_concepto',
        searchCode: true,
        exactField: 'c_concepto'

    });
   
}